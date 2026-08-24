import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";
import { getSiteSettings } from "@/lib/cms/settings";

export const metadata: Metadata = {
  title: "Audit Request Confirmed | Prime Automation",
  description: "Thank you for requesting an automation audit. Our engineering team is reviewing your details.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const settings = await getSiteSettings();
  return (
    <ThankYouClient schedulingUrl={settings.schedulingUrl || ""} />
  );
}
