import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Fallback response engine – provides intelligent answers when n8n is offline
// ---------------------------------------------------------------------------
interface FallbackRule {
  keywords: string[];
  reply: string;
  suggestedActions?: string[];
}

const FALLBACK_RULES: FallbackRule[] = [
  {
    keywords: ["service", "services", "what do you do", "what you do", "offerings", "solutions"],
    reply:
      "Prime Automation offers five core service pillars:\n\n" +
      "🤖 **AI Agents** — Autonomous agents that handle customer support, lead qualification, and complex multi-step tasks 24/7.\n\n" +
      "⚙️ **Workflow Automation** — End-to-end business process automation using self-hosted n8n, connecting your existing tools.\n\n" +
      "📊 **Data Engineering** — Real-time data pipelines, ETL, analytics dashboards, and anomaly detection.\n\n" +
      "🔗 **System Integration** — Seamless API connections between CRMs, ERPs, payment systems, and custom platforms.\n\n" +
      "🧠 **Custom AI Solutions** — Tailored LLM fine-tuning, RAG systems, and intelligent document processing.\n\n" +
      "Would you like to learn more about a specific service?",
    suggestedActions: ["AI Agents", "Workflow Automation", "Book a Call"],
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "budget", "quote", "package"],
    reply:
      "Every project is unique, so we provide custom quotes after understanding your requirements. Here's a general guide:\n\n" +
      "• **Starter automations** — from $2,500 (simple workflow integrations)\n" +
      "• **AI agent deployments** — from $5,000 (autonomous multi-channel agents)\n" +
      "• **Enterprise solutions** — custom pricing (full-scale data engineering & AI systems)\n\n" +
      "The best way to get an accurate estimate is to schedule a **Free Automation Audit** — we'll map your processes and provide a detailed proposal.",
    suggestedActions: ["Book Free Audit", "View Case Studies"],
  },
  {
    keywords: ["contact", "reach", "email", "call", "phone", "book", "schedule", "meeting", "audit"],
    reply:
      "I'd love to connect you with our team! You can:\n\n" +
      "📧 **Email**: info@primeautomationpl.com\n" +
      "📅 **Book a Free Automation Audit**: Visit our contact page to schedule a call\n" +
      "💬 **This chat**: Tell me what you need, and I'll make sure the right person follows up.\n\n" +
      "Our audits are completely free — we'll review your current workflows and identify automation opportunities.",
    suggestedActions: ["Go to Contact Page", "Services"],
  },
  {
    keywords: ["case study", "case studies", "portfolio", "work", "example", "proof", "client", "project", "result"],
    reply:
      "Here are some highlights from our recent work:\n\n" +
      "🛍️ **OmniRetail Global** — Built an autonomous AI support agent that deflected 68% of Tier-1 tickets with 12-second average response times.\n\n" +
      "💰 **Apex FinServe** — Deployed intelligent document processing achieving 99.4% extraction accuracy across 45,000 monthly invoices.\n\n" +
      "🏥 **MedConnect Health** — Created a multi-channel patient intake system reducing manual data entry by 85%.\n\n" +
      "Visit our Case Studies page for the full breakdown with metrics, architecture details, and results.",
    suggestedActions: ["View Case Studies", "Book Free Audit"],
  },
  {
    keywords: ["ai agent", "ai agents", "chatbot", "bot", "autonomous", "gpt", "llm", "openai", "claude"],
    reply:
      "Our AI Agents are autonomous systems that go beyond simple chatbots:\n\n" +
      "• **Multi-turn reasoning** — They understand context across entire conversations\n" +
      "• **Tool-integrated** — Connected to your CRM, help desk, inventory, and other business systems\n" +
      "• **Knowledge-grounded** — Built with RAG (Retrieval Augmented Generation) so they answer from your actual data\n" +
      "• **Guardrailed** — Deterministic safety boundaries prevent hallucination and off-topic responses\n\n" +
      "They handle customer support, lead qualification, document processing, and internal operations — running 24/7 without human intervention.",
    suggestedActions: ["View Case Studies", "Book Free Audit"],
  },
  {
    keywords: ["n8n", "workflow", "automation", "automate", "integrate", "integration"],
    reply:
      "We specialize in **self-hosted n8n workflow automation**:\n\n" +
      "• Multi-step workflows connecting 400+ apps\n" +
      "• Error handling, retry logic, and exception routing\n" +
      "• Custom API integrations with your existing tools\n" +
      "• Enterprise-grade reliability with containerized deployments\n\n" +
      "Whether you're migrating from Zapier or building from scratch, we architect workflows that scale with your business.",
    suggestedActions: ["Services", "Book Free Audit"],
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    reply:
      "Hello! 👋 Welcome to Prime Automation. I'm here to help you learn about our AI agents, workflow automation, and how we can streamline your business operations.\n\nWhat would you like to know about?",
    suggestedActions: ["Services", "Case Studies", "Book Free Audit", "How it works"],
  },
  {
    keywords: ["how it works", "process", "methodology", "approach", "steps"],
    reply:
      "Our engagement process is straightforward:\n\n" +
      "**1. Free Automation Audit** — We analyze your current workflows, identify bottlenecks, and map out automation opportunities.\n\n" +
      "**2. Architecture & Proposal** — We design a tailored solution with clear deliverables, timelines, and pricing.\n\n" +
      "**3. Build & Iterate** — Agile development with weekly demos so you see progress and can provide feedback.\n\n" +
      "**4. Deploy & Monitor** — Production deployment with monitoring dashboards and ongoing optimization.\n\n" +
      "Most projects go from audit to first deployment within 4-6 weeks.",
    suggestedActions: ["Book Free Audit", "Services"],
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you"],
    reply:
      "You're welcome! 😊 If you have any more questions in the future, I'm always here. Have a great day!\n\nRemember — you can always schedule a **Free Automation Audit** whenever you're ready to explore automation for your business.",
    suggestedActions: ["Book Free Audit"],
  },
];

const DEFAULT_FALLBACK: FallbackRule = {
  keywords: [],
  reply:
    "Thanks for your question! I can help you with information about our services, pricing, case studies, and more.\n\n" +
    "For detailed or specific questions, I'd recommend scheduling a **Free Automation Audit** — our team will provide personalized answers and a tailored proposal.\n\n" +
    "What else would you like to know?",
  suggestedActions: ["Services", "Case Studies", "Book Free Audit", "How it works"],
};

function getFallbackReply(message: string): FallbackRule {
  const lower = message.toLowerCase();
  for (const rule of FALLBACK_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule;
    }
  }
  return DEFAULT_FALLBACK;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate incoming payload
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const rawMessage = body?.message;
    if (typeof rawMessage !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    const trimmedMessage = rawMessage.trim();
    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 4000) {
      return NextResponse.json(
        { error: "Message exceeds the 4000 character limit." },
        { status: 400 }
      );
    }

    // Reuse provided sessionId or generate a new UUID
    const sessionId =
      typeof body?.sessionId === "string" && body.sessionId.trim()
        ? body.sessionId.trim()
        : crypto.randomUUID();

    const pageUrl = typeof body?.pageUrl === "string" ? body.pageUrl : "";

    // 2. Validate environment variables
    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (!webhookUrl) {
      // No webhook configured — use fallback immediately
      console.warn("Chat API: N8N_CHAT_WEBHOOK_URL not configured, using fallback responses.");
      const fallback = getFallbackReply(trimmedMessage);
      return NextResponse.json({
        reply: fallback.reply,
        sessionId,
        suggestedActions: fallback.suggestedActions || [],
      });
    }

    // 3. Prepare headers and payload for n8n
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const authToken = process.env.N8N_CHAT_AUTH_TOKEN;
    if (authToken) {
      headers["X-Prime-Token"] = authToken;
    }

    const n8nPayload = {
      chatInput: trimmedMessage,
      sessionId,
      pageUrl,
    };

    // 4. Send secure request to n8n webhook
    let n8nResponse: Response;
    try {
      n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(n8nPayload),
        signal: AbortSignal.timeout(15000), // 15 second timeout
      });
    } catch (networkError: any) {
      console.error("Chat API Error: Failed to reach n8n webhook:", networkError.message);
      // Fall back to local responses instead of returning an error
      const fallback = getFallbackReply(trimmedMessage);
      return NextResponse.json({
        reply: fallback.reply,
        sessionId,
        suggestedActions: fallback.suggestedActions || [],
      });
    }

    if (!n8nResponse.ok) {
      console.error(
        `Chat API Error: n8n webhook returned HTTP ${n8nResponse.status} ${n8nResponse.statusText}`
      );
      // Fall back to local responses instead of returning an error
      const fallback = getFallbackReply(trimmedMessage);
      return NextResponse.json({
        reply: fallback.reply,
        sessionId,
        suggestedActions: fallback.suggestedActions || [],
      });
    }

    // 5. Parse n8n response and extract reply
    let responseData: any;
    try {
      responseData = await n8nResponse.json();
    } catch (jsonErr) {
      console.error("Chat API Error: Failed to parse n8n response as JSON");
      const fallback = getFallbackReply(trimmedMessage);
      return NextResponse.json({
        reply: fallback.reply,
        sessionId,
        suggestedActions: fallback.suggestedActions || [],
      });
    }

    // Handle array or object responses from n8n
    let dataObj = responseData;
    if (Array.isArray(responseData) && responseData.length > 0) {
      dataObj = responseData[0];
    }

    const replyText =
      dataObj?.reply ||
      dataObj?.output ||
      dataObj?.text ||
      dataObj?.message ||
      (typeof dataObj === "string" ? dataObj : "Thank you for reaching out. How else can I assist you?");

    const returnedSessionId =
      typeof dataObj?.sessionId === "string" && dataObj.sessionId.trim()
        ? dataObj.sessionId.trim()
        : sessionId;

    return NextResponse.json({
      reply: replyText,
      sessionId: returnedSessionId,
      suggestedActions: dataObj?.suggestedActions || [],
    });
  } catch (error: any) {
    console.error("Chat API Error (Unexpected):", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
