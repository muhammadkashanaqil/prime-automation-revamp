import { notFound } from "next/navigation";
import { getFAQById } from "@/lib/cms/faqs";
import FAQForm from "@/components/admin/FAQForm";

export const dynamic = "force-dynamic";

interface EditFAQPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFAQPage({ params }: EditFAQPageProps) {
  const { id } = await params;
  const faq = await getFAQById(id);

  if (!faq) {
    notFound();
  }

  return <FAQForm initialData={faq} isEdit={true} />;
}
