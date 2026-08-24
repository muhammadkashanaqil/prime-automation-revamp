import prisma from "@/lib/db";
import PostsListClient from "./PostsListClient";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return <PostsListClient initialPosts={posts} />;
}
