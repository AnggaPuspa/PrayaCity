import { LoginView } from "@/features/auth/components/login-view";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Praya City",
  description: "Login to Praya City Admin Portal",
};

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginView />;
}
