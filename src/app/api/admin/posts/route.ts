import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/auth";
import { createPost, updatePost, deletePost, getPostById } from "@/lib/cms/posts";
import { postSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const result = postSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const created = await createPost(result.data);

    revalidatePath("/");
    revalidatePath("/insights");
    revalidatePath(`/insights/${created.slug}`);

    return NextResponse.json({ success: true, item: created });
  } catch (error: any) {
    console.error("Error creating post:", error);
    const status = error.message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message || "Server error" }, { status });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    const result = postSchema.partial().safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await updatePost(id, result.data);

    revalidatePath("/");
    revalidatePath("/insights");
    revalidatePath(`/insights/${updated.slug}`);

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Error updating post:", error);
    const status = error.message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message || "Server error" }, { status });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    const deleted = await deletePost(id);

    revalidatePath("/");
    revalidatePath("/insights");
    if (deleted.slug) revalidatePath(`/insights/${deleted.slug}`);

    return NextResponse.json({ success: true, item: deleted });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    const status = error.message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message || "Server error" }, { status });
  }
}
