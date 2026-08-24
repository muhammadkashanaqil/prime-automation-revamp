import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/auth";
import { createFAQ, updateFAQ, deleteFAQ, reorderFAQs } from "@/lib/cms/faqs";
import { faqSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const result = faqSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const created = await createFAQ(result.data);

    revalidatePath("/");
    revalidatePath("/faq");
    revalidatePath("/services");

    return NextResponse.json({ success: true, item: created });
  } catch (error: any) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing FAQ ID" }, { status: 400 });
    }

    const result = faqSchema.partial().safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await updateFAQ(id, result.data);

    revalidatePath("/");
    revalidatePath("/faq");
    revalidatePath("/services");

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
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

    const deleted = await deleteFAQ(id);

    revalidatePath("/");
    revalidatePath("/faq");
    revalidatePath("/services");

    return NextResponse.json({ success: true, item: deleted });
  } catch (error: any) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: "Invalid payload: items array required" }, { status: 400 });
    }

    await reorderFAQs(body.items);

    revalidatePath("/");
    revalidatePath("/faq");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error reordering FAQs:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
