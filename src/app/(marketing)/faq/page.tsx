import type { Metadata } from "next";
import { getPublishedFAQs } from "@/lib/cms/faqs";
import FAQDirectory from "./FAQDirectory";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Automation Knowledge Base",
  description:
    "Explore common questions about Prime Automation's AI chatbots, n8n workflow systems, data pipelines, pricing models, and data security.",
};

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await getPublishedFAQs();

  return <FAQDirectory initialFaqs={faqs} />;
}
