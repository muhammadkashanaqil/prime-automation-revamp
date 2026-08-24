import prisma from "@/lib/db";
import { FAQFormData } from "@/lib/validators";

export async function getPublishedFAQs(options?: {
  featuredOnly?: boolean;
  category?: string;
  serviceSlug?: string;
  limit?: number;
}) {
  try {
    const where: any = { status: "PUBLISHED" };
    if (options?.featuredOnly) {
      where.featured = true;
    }
    if (options?.category && options.category !== "All") {
      where.category = options.category;
    }

    const items = await prisma.fAQ.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: options?.limit,
    });

    return items
      .map((item) => parseFaqJson(item))
      .filter((item) => {
        if (!options?.serviceSlug) return true;
        return item.relatedServicesList.includes(options.serviceSlug);
      });
  } catch (error) {
    console.error("Error fetching published FAQs:", error);
    return [];
  }
}

export async function getAllFAQsAdmin(query?: string, category?: string, status?: string) {
  try {
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (category && category !== "ALL") {
      where.category = category;
    }
    if (query) {
      where.OR = [
        { question: { contains: query } },
        { answer: { contains: query } },
        { category: { contains: query } },
      ];
    }
    const items = await prisma.fAQ.findMany({
      where,
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return items.map((item) => parseFaqJson(item));
  } catch (error) {
    console.error("Error fetching admin FAQs:", error);
    return [];
  }
}

export async function getFAQById(id: string) {
  try {
    const item = await prisma.fAQ.findUnique({ where: { id } });
    if (!item) return null;
    return parseFaqJson(item);
  } catch (error) {
    console.error(`Error fetching FAQ by id (${id}):`, error);
    return null;
  }
}

export async function createFAQ(data: FAQFormData) {
  return await prisma.fAQ.create({
    data: {
      question: data.question,
      answer: data.answer,
      category: data.category,
      relatedServices: JSON.stringify(data.relatedServices || []),
      featured: data.featured,
      sortOrder: data.sortOrder,
      status: data.status,
    },
  });
}

export async function updateFAQ(id: string, data: Partial<FAQFormData>) {
  const updateData: any = { ...data };
  if (data.relatedServices) {
    updateData.relatedServices = JSON.stringify(data.relatedServices);
  }
  return await prisma.fAQ.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteFAQ(id: string) {
  return await prisma.fAQ.delete({ where: { id } });
}

export async function reorderFAQs(items: Array<{ id: string; sortOrder: number }>) {
  for (const item of items) {
    await prisma.fAQ.update({
      where: { id: item.id },
      data: { sortOrder: item.sortOrder },
    });
  }
}

function parseFaqJson(item: any) {
  let relatedServicesList: string[] = [];
  try {
    relatedServicesList = JSON.parse(item.relatedServices || "[]");
  } catch {
    relatedServicesList = [];
  }
  return {
    ...item,
    relatedServicesList,
  };
}
