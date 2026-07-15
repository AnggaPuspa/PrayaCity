import { DashboardView, getDashboardStats } from "@/features/dashboard";
import { setRequestLocale } from "next-intl/server";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = await getDashboardStats();

  return <DashboardView locale={locale} stats={stats} />;
}
