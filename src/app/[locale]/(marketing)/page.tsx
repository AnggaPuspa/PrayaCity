import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  HeroSection,
  LatestEvents,
  AboutSection,
  DiscoverSection,
  MustVisitSection,
  CtaSection,
} from "@/features/landing";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  // hreflang alternates so search engines link the locale variants.
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  );

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}` },
    },
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
      <LatestEvents locale={locale} />
      <AboutSection />
      <DiscoverSection />
      <MustVisitSection locale={locale} />
      <CtaSection />
    </>
  );
}
