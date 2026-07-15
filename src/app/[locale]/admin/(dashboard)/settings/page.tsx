import type { Metadata } from "next";
import { SettingsForm } from "@/features/auth";
import { getSession } from "@/lib/auth/get-session";
import { getAdminUserProfile } from "@/features/auth/services/admin-user.service";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings - Admin Panel",
};

export default async function SettingsPage() {
  const session = await getSession();
  if (!session || !session.id) redirect("/en/admin/login");

  const user = await getAdminUserProfile(session.id);
  if (!user) redirect("/en/admin/login");

  return (
    <div className="w-full px-4 py-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h1>
        <p className="text-gray-500">Manage your profile and security preferences</p>
      </div>
      
      <SettingsForm user={user} />
    </div>
  );
}
