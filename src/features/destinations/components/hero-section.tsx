import { getTranslations } from "next-intl/server";
import { HeroSectionView } from "./hero-section-view";

export async function HeroSection() {
  const t = await getTranslations("DestinationsPage");

  return <HeroSectionView eyebrow={t("heroEyebrow")} title={t("heroTitle")} />;
}
