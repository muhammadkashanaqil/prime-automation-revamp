import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/cms/posts";
import InsightsDirectory from "./InsightsDirectory";

export const metadata: Metadata = {
  title: "Automation Insights, Guides & Engineering Architecture",
  description:
    "Actionable technical guides, n8n best practices, AI workflow strategies, and automation architecture insights from Prime Automation.",
};

export const revalidate = 60;

export default async function InsightsPage() {
  const posts = await getPublishedPosts();

  return <InsightsDirectory initialPosts={posts} />;
}
