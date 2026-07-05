import { getTranslations } from "next-intl/server";
import { CULTURE_HERO_DATA } from "../data/culture-hero";
import { CultureHeroView } from "./culture-hero-view";

/**
 * Container component for the Culture Hero section.
 * Fetches translations and domain data, then passes them to the presentational view.
 */
export async function CultureHero() {
  const t = await getTranslations("CultureHero");

  const header = {
    title: t("title"),
    description: t("description"),
  };

  return <CultureHeroView header={header} data={CULTURE_HERO_DATA} />;
}
