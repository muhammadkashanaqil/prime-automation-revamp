import type { Metadata } from "next";
import { getPublishedCaseStudies } from "@/lib/cms/case-studies";
import CaseStudiesDirectory from "./CaseStudiesDirectory";

export const metadata: Metadata = {
  title: "Case Studies & Measurable Automation Results",
  description:
    "Explore real-world case studies and architectural breakdowns of AI chatbots, n8n workflow automations, and data pipelines built by Prime Automation.",
};

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return <CaseStudiesDirectory initialCaseStudies={caseStudies} />;
}
