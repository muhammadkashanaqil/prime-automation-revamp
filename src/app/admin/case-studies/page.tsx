import prisma from "@/lib/db";
import CaseStudiesListClient from "./CaseStudiesListClient";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return <CaseStudiesListClient initialCaseStudies={caseStudies} />;
}
