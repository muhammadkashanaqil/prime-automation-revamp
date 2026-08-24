import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { createLead } from "@/lib/cms/leads";

// Rate limiting map for form submissions: ip -> { count, resetAt }
const contactRateLimits = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local_ip";
    const now = Date.now();

    // 1. Rate Limiting: 5 submissions per 10 minutes per IP
    const rateRecord = contactRateLimits.get(ip);
    if (rateRecord && rateRecord.resetAt > now) {
      if (rateRecord.count >= 5) {
        return NextResponse.json(
          {
            error: "Too many audit requests submitted recently. Please wait a few minutes or contact us directly at info@primeautomationpl.com.",
          },
          { status: 429 }
        );
      }
      rateRecord.count += 1;
    } else {
      contactRateLimits.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    // 2. Parse and validate payload
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Please correct the highlighted form errors.",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Honeypot check (websiteUrl_hp must be empty)
    if (data.websiteUrl_hp && data.websiteUrl_hp.length > 0) {
      console.warn("Spam submission blocked via honeypot from IP:", ip);
      // Return fake success to confuse bots
      return NextResponse.json({ success: true, redirect: "/thank-you" });
    }

    // 4. Store lead in database
    const savedLead = await createLead(data, "CONTACT_FORM");

    // 5. If N8N_LEAD_WEBHOOK_URL is configured, forward lead asynchronously
    const n8nLeadWebhook = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nLeadWebhook) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-sec timeout

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (process.env.N8N_LEAD_AUTH_TOKEN) {
          headers["Authorization"] = `Bearer ${process.env.N8N_LEAD_AUTH_TOKEN}`;
        }

        await fetch(n8nLeadWebhook, {
          method: "POST",
          headers,
          body: JSON.stringify({
            leadId: savedLead.id,
            fullName: data.fullName,
            workEmail: data.workEmail,
            company: data.company || "",
            website: data.website || "",
            phone: data.phone || "",
            primaryNeed: data.primaryNeed,
            message: data.message,
            budgetRange: data.budgetRange || "",
            utm: {
              source: data.utmSource || "",
              medium: data.utmMedium || "",
              campaign: data.utmCampaign || "",
              content: data.utmContent || "",
              term: data.utmTerm || "",
            },
            submittedAt: new Date().toISOString(),
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
      } catch (webhookErr: any) {
        console.error("n8n lead webhook forwarding failed (lead saved locally):", webhookErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      redirect: "/thank-you",
      message: "Your automation audit request has been successfully received!",
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        error: "Failed to submit your request due to an internal server error. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
