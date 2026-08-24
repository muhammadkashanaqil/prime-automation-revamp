import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/cms/settings";
import { siteSettingsSchema } from "@/lib/validators";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const result = siteSettingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await updateSiteSettings(result.data);

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/about");

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
