import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection, GridSection } from "@/features/destinations";
import { HistoryGallery } from "@/features/history";
import { CtaSection } from "@/features/landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DestinationsPage" });

  return {
    title: t("heroTitle"),
    description: t("heroEyebrow"),
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div
      className="min-h-screen bg-[#070D1A] bg-cover bg-center bg-no-repeat bg-fixed flex flex-col"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.65)), url('/ctaasset.svg')"
      }}
    >
      <HeroSection />
      <GridSection locale={locale} />
      <HistoryGallery />
      <CtaSection />
    </div>
  );
}
