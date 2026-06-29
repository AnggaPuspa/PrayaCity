import { getTranslations } from "next-intl/server";
import { HistoryHeroView } from "./history-hero-view";
import { HISTORY_HERO_DATA } from "../data/history-hero";

/**
 * Container component for the History Hero section.
 * Fetches translations and domain data, then passes them to the presentational view.
 */
export async function HistoryHero() {
  const t = await getTranslations("HistoryPage");

  const header = {
    eyebrow: t("heroEyebrow"),
    title: t("heroTitle"),
  };

  return <HistoryHeroView header={header} data={HISTORY_HERO_DATA} />;
}
