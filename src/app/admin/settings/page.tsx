import { getSiteSettings } from "@/lib/cms/settings";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return <SettingsClient initialSettings={settings} />;
}
