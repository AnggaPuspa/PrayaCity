import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  HeroSection,
  LatestEvents,
  AboutSection,
  DiscoverSection,
  MustVisitSection,
} from "@/features/landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

/**
 * Pages are thin: they import from feature/component public APIs and compose.
 * No business logic, no data access, no validation lives here.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <LatestEvents />
      <AboutSection />
      <DiscoverSection />
      <MustVisitSection />
    </>
  );
}
