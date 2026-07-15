import { AdminShell } from "@/components/templates/admin-shell";
import { setRequestLocale } from "next-intl/server";

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Note: Middleware or Server Auth Check should go here
  // to protect all (dashboard) routes.

  return <AdminShell>{children}</AdminShell>;
}
