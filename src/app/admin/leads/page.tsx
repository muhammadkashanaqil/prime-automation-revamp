import prisma from "@/lib/db";
import LeadsListClient from "./LeadsListClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <LeadsListClient initialLeads={leads} />;
}
