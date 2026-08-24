import prisma from "@/lib/db";
import { PostFormData } from "@/lib/validators";

export async function getPublishedPosts(options?: {
  featuredOnly?: boolean;
  limit?: number;
  category?: string;
  skip?: number;
}) {
  try {
    const where: any = { status: "PUBLISHED" };
    if (options?.featuredOnly) {
      where.featured = true;
    }

    const items = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: options?.limit,
      skip: options?.skip,
    });

    return items
      .map((item) => parsePostJson(item))
      .filter((item) => {
        if (!options?.category || options.category === "All") return true;
        return item.categoriesList.includes(options.category);
      });
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string, allowDraft = false) {
  try {
    const where: any = { slug };
    if (!allowDraft) {
      where.status = "PUBLISHED";
    }
    const item = await prisma.post.findUnique({ where });
    if (!item) return null;
    return parsePostJson(item);
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

export async function getAllPostsAdmin(query?: string, status?: string) {
  try {
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { author: { contains: query } },
        { excerpt: { contains: query } },
      ];
    }
    const items = await prisma.post.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });
    return items.map((item) => parsePostJson(item));
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    return [];
  }
}

export async function getPostById(id: string) {
  try {
    const item = await prisma.post.findUnique({ where: { id } });
    if (!item) return null;
    return parsePostJson(item);
  } catch (error) {
    console.error(`Error fetching post by id (${id}):`, error);
    return null;
  }
}

export async function createPost(data: PostFormData) {
  return await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      status: data.status,
      excerpt: data.excerpt,
      coverImageUrl: data.coverImageUrl || null,
      coverImageAlt: data.coverImageAlt || null,
      author: data.author || "Prime Automation Team",
      categories: JSON.stringify(data.categories),
      body: data.body,
      featured: data.featured,
      readingTime: data.readingTime || "5 min read",
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      ogImageUrl: data.ogImageUrl || null,
      noindex: data.noindex,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });
}

export async function updatePost(id: string, data: Partial<PostFormData>) {
  const current = await prisma.post.findUnique({ where: { id } });
  const updateData: any = { ...data };

  if (data.categories) updateData.categories = JSON.stringify(data.categories);

  if (data.status === "PUBLISHED" && current?.status !== "PUBLISHED" && !current?.publishedAt) {
    updateData.publishedAt = new Date();
  }

  return await prisma.post.update({
    where: { id },
    data: updateData,
  });
}

export async function deletePost(id: string) {
  return await prisma.post.delete({ where: { id } });
}

function parsePostJson(item: any) {
  let categoriesList: string[] = [];
  let bodyJson: any = null;

  try {
    categoriesList = JSON.parse(item.categories || "[]");
  } catch {
    categoriesList = [];
  }
  try {
    bodyJson = JSON.parse(item.body || "{}");
  } catch {
    bodyJson = item.body;
  }

  return {
    ...item,
    categoriesList,
    bodyJson,
  };
}
