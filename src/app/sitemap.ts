import { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { SERVICES_LIST } from "@/lib/services-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.primeautomationpl.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // 6 Services routes
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_LIST.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Case Studies (Published only)
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedCaseStudies = await prisma.caseStudy.findMany({
      where: { status: "PUBLISHED", noindex: false },
      select: { slug: true, updatedAt: true },
    });
    caseStudyRoutes = publishedCaseStudies.map((cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: cs.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Error generating sitemap case studies:", e);
  }

  // Dynamic Insights Posts (Published only)
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED", noindex: false },
      select: { slug: true, updatedAt: true },
    });
    postRoutes = publishedPosts.map((p) => ({
      url: `${baseUrl}/insights/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch (e) {
    console.error("Error generating sitemap posts:", e);
  }

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...postRoutes];
}
