import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import ContactFormClient from "./ContactFormClient";
import { getSiteSettings } from "@/lib/cms/settings";

export const metadata: Metadata = {
  title: "Book a Free Automation Audit | Contact Prime Automation",
  description:
    "Schedule a complimentary 45-minute technical audit with our Senior Automation Architect. We'll examine your bottlenecks and blueprint an actionable ROI roadmap.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Contact & Free Audit" }]} />

      <Suspense fallback={<div className="p-12 text-center text-prime-gray">Loading audit form...</div>}>
        <ContactFormClient
          contactPhone={settings.phone || ""}
          contactEmail={settings.email || "info@primeautomationpl.com"}
          schedulingUrl={settings.schedulingUrl || ""}
        />
      </Suspense>
    </div>
  );
}
