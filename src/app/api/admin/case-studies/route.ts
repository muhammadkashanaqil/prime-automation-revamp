import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/auth";
import {
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  getCaseStudyById,
} from "@/lib/cms/case-studies";
import { caseStudySchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const result = caseStudySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const created = await createCaseStudy(result.data);

    // Revalidate affected public routes immediately
    revalidatePath("/");
    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${created.slug}`);

    return NextResponse.json({ success: true, item: created });
  } catch (error: any) {
    console.error("Error creating case study:", error);
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
      return NextResponse.json({ error: "Missing case study ID" }, { status: 400 });
    }

    const result = caseStudySchema.partial().safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await updateCaseStudy(id, result.data);

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${updated.slug}`);

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Error updating case study:", error);
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

    const deleted = await deleteCaseStudy(id);

    revalidatePath("/");
    revalidatePath("/case-studies");
    if (deleted.slug) revalidatePath(`/case-studies/${deleted.slug}`);

    return NextResponse.json({ success: true, item: deleted });
  } catch (error: any) {
    console.error("Error deleting case study:", error);
    const status = error.message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message || "Server error" }, { status });
  }
}
