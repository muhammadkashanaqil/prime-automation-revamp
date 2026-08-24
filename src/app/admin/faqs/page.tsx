import prisma from "@/lib/db";
import FAQsListClient from "./FAQsListClient";

export const dynamic = "force-dynamic";

export default async function AdminFAQsPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return <FAQsListClient initialFaqs={faqs} />;
}
