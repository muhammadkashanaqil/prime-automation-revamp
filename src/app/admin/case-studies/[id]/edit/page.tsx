import { notFound } from "next/navigation";
import { getCaseStudyById } from "@/lib/cms/case-studies";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const dynamic = "force-dynamic";

interface EditCaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyForm initialData={caseStudy} isEdit={true} />;
}
