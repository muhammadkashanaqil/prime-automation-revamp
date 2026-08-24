import { notFound } from "next/navigation";
import { getPostById } from "@/lib/cms/posts";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostForm initialData={post} isEdit={true} />;
}
