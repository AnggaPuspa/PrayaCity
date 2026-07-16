import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProgramsHero, ProgramsTabs, ProgramsContact } from "@/features/programs";
import { CtaSection } from "@/features/landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProgramsPage" });

  return {
    title: t("heroTitle") + " | Praya City",
    description: t("heroEyebrow"),
  };
}

/**
 * Thin page: locale validity is already enforced by `[locale]/layout`.
 * Note: the (marketing) PageShell template already provides the <main>
 * landmark, so this wrapper is a <div> to avoid nesting <main>.
 */
export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div
        className="min-h-screen bg-[#070D1A] bg-cover bg-center bg-no-repeat bg-fixed flex flex-col"
        style={{
          backgroundImage: "url('/backgroundprogram.svg')"
        }}
      >
        <ProgramsHero />
      </div>
      <ProgramsTabs />
      <ProgramsContact />
      <CtaSection />
    </>
  );
}
