import type { Metadata } from "next";
import { Suspense } from "react";
import ContactFormClient from "./ContactFormClient";
import { getSiteSettings } from "@/lib/cms/settings";
import { PageHero } from "@/components/prime/shared";

export const metadata: Metadata = {
  title: "Book a Free Automation Audit | Contact Prime Automation",
  description:
    "Schedule a complimentary 45-minute technical audit with our Senior Automation Architect. We'll examine your bottlenecks and blueprint an actionable ROI roadmap.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero 
        label="LET'S TALK" 
        title={<>Tell us about your<br/><span className="accent">biggest bottleneck.</span></>} 
        description="Book a free 45-minute automation audit. We'll map your workflows and outline a clear path forward."
      />
      
      <div className="wrap" style={{ paddingBottom: '100px' }}>
        <Suspense fallback={<div className="p-12 text-center text-muted-foreground">Loading audit form...</div>}>
          <ContactFormClient
            contactPhone={settings.phone || ""}
            contactEmail={settings.email || "info@primeautomationpl.com"}
            schedulingUrl={settings.schedulingUrl || ""}
          />
        </Suspense>
      </div>
    </>
  );
}
