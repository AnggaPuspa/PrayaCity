import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  HistoryHero,
  TimelineSection,
  TimelineList,
  HistoryGallery,
} from "@/features/history";
import { CtaSection, MapExplorerSection } from "@/features/landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("historyTitle"),
    description: t("historyDescription"),
  };
}

/**
 * Thin page: locale validity is already enforced by `[locale]/layout`.
 * Note: the (marketing) PageShell template already provides the <main>
 * landmark, so this wrapper is a <div> to avoid nesting <main>.
 */
export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#0A1128]">
      <HistoryHero />
      <TimelineSection />
      <TimelineList />
      <MapExplorerSection />
      <HistoryGallery />
      <CtaSection />
    </div>
  );
}
