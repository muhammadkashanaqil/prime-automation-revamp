import prisma from "@/lib/db";
import { ContactFormData } from "@/lib/validators";

export async function createLead(data: ContactFormData, source: "CONTACT_FORM" | "CHATBOT" = "CONTACT_FORM") {
  try {
    return await prisma.lead.create({
      data: {
        fullName: data.fullName,
        workEmail: data.workEmail,
        company: data.company || null,
        website: data.website || null,
        phone: data.phone || null,
        primaryNeed: data.primaryNeed,
        message: data.message,
        budgetRange: data.budgetRange || null,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        utmContent: data.utmContent || null,
        utmTerm: data.utmTerm || null,
        source,
        status: "NEW",
      },
    });
  } catch (error) {
    console.error("Error saving lead in database:", error);
    throw error;
  }
}

export async function getAllLeadsAdmin(query?: string, status?: string) {
  try {
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (query) {
      where.OR = [
        { fullName: { contains: query } },
        { workEmail: { contains: query } },
        { company: { contains: query } },
        { primaryNeed: { contains: query } },
      ];
    }
    return await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
}

export async function updateLeadStatus(id: string, status: string) {
  return await prisma.lead.update({
    where: { id },
    data: { status },
  });
}

export async function deleteLead(id: string) {
  return await prisma.lead.delete({ where: { id } });
}
