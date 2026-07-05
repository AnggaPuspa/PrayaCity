import { setRequestLocale } from "next-intl/server";
import { CultureHero, CultureTraditions, CultureCulinary } from "@/features/culture";
import { CtaSection } from "@/features/landing";

export default async function CulturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full min-h-screen">
      <CultureHero />
      <CultureTraditions />
      <CultureCulinary />
      <CtaSection />
    </div>
  );
}
