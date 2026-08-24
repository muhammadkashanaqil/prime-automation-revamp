import prisma from "@/lib/db";
import { CaseStudyFormData } from "@/lib/validators";

export async function getPublishedCaseStudies(options?: {
  featuredOnly?: boolean;
  limit?: number;
  serviceSlug?: string;
  industry?: string;
}) {
  try {
    const where: any = { status: "PUBLISHED" };
    if (options?.featuredOnly) {
      where.featured = true;
    }
    if (options?.industry) {
      where.industry = options.industry;
    }

    const items = await prisma.caseStudy.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: options?.limit,
    });

    // Parse JSON fields
    return items
      .map((item) => parseCaseStudyJson(item))
      .filter((item) => {
        if (!options?.serviceSlug) return true;
        return item.servicesList.includes(options.serviceSlug);
      });
  } catch (error) {
    console.error("Error fetching published case studies:", error);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string, allowDraft = false) {
  try {
    const where: any = { slug };
    if (!allowDraft) {
      where.status = "PUBLISHED";
    }
    const item = await prisma.caseStudy.findUnique({ where });
    if (!item) return null;
    return parseCaseStudyJson(item);
  } catch (error) {
    console.error(`Error fetching case study by slug (${slug}):`, error);
    return null;
  }
}

export async function getAllCaseStudiesAdmin(query?: string, status?: string) {
  try {
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { clientName: { contains: query } },
        { industry: { contains: query } },
      ];
    }
    const items = await prisma.caseStudy.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });
    return items.map((item) => parseCaseStudyJson(item));
  } catch (error) {
    console.error("Error fetching admin case studies:", error);
    return [];
  }
}

export async function getCaseStudyById(id: string) {
  try {
    const item = await prisma.caseStudy.findUnique({ where: { id } });
    if (!item) return null;
    return parseCaseStudyJson(item);
  } catch (error) {
    console.error(`Error fetching case study by id (${id}):`, error);
    return null;
  }
}

export async function createCaseStudy(data: CaseStudyFormData) {
  return await prisma.caseStudy.create({
    data: {
      title: data.title,
      slug: data.slug,
      status: data.status,
      clientName: data.clientName || null,
      industry: data.industry,
      services: JSON.stringify(data.services),
      excerpt: data.excerpt,
      heroImageUrl: data.heroImageUrl || null,
      heroImageAlt: data.heroImageAlt || null,
      featured: data.featured,
      featuredResult: data.featuredResult || null,
      metrics: JSON.stringify(data.metrics || []),
      challenge: data.challenge,
      solution: data.solution,
      implementation: data.implementation || null,
      results: data.results,
      technologies: JSON.stringify(data.technologies || []),
      testimonial: data.testimonial ? JSON.stringify(data.testimonial) : null,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      ogImageUrl: data.ogImageUrl || null,
      noindex: data.noindex,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });
}

export async function updateCaseStudy(id: string, data: Partial<CaseStudyFormData>) {
  const current = await prisma.caseStudy.findUnique({ where: { id } });
  const updateData: any = { ...data };

  if (data.services) updateData.services = JSON.stringify(data.services);
  if (data.metrics) updateData.metrics = JSON.stringify(data.metrics);
  if (data.technologies) updateData.technologies = JSON.stringify(data.technologies);
  if (data.testimonial !== undefined) {
    updateData.testimonial = data.testimonial ? JSON.stringify(data.testimonial) : null;
  }

  if (data.status === "PUBLISHED" && current?.status !== "PUBLISHED" && !current?.publishedAt) {
    updateData.publishedAt = new Date();
  }

  return await prisma.caseStudy.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteCaseStudy(id: string) {
  return await prisma.caseStudy.delete({ where: { id } });
}

function parseCaseStudyJson(item: any) {
  let servicesList: string[] = [];
  let metricsList: Array<{ label: string; value: string; note?: string }> = [];
  let technologiesList: string[] = [];
  let testimonialObj: any = null;

  try {
    servicesList = JSON.parse(item.services || "[]");
  } catch {
    servicesList = [];
  }
  try {
    metricsList = JSON.parse(item.metrics || "[]");
  } catch {
    metricsList = [];
  }
  try {
    technologiesList = JSON.parse(item.technologies || "[]");
  } catch {
    technologiesList = [];
  }
  try {
    testimonialObj = item.testimonial ? JSON.parse(item.testimonial) : null;
  } catch {
    testimonialObj = null;
  }

  return {
    ...item,
    servicesList,
    metricsList,
    technologiesList,
    testimonialObj,
  };
}
