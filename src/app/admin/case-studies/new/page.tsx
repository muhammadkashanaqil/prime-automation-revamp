import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const dynamic = "force-dynamic";

export default function NewCaseStudyPage() {
  return <CaseStudyForm isEdit={false} />;
}
