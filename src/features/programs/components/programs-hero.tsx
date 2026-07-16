import { getTranslations } from "next-intl/server";
import { ProgramsHeroView } from "./programs-hero-view";

export async function ProgramsHero() {
  const t = await getTranslations("ProgramsPage");

  return <ProgramsHeroView eyebrow={t("heroEyebrow")} title={t("heroTitle")} />;
}
