import { getTranslations } from "next-intl/server";
import { getMustVisitDestinations } from "@/features/destinations";
import { MustVisitSectionClient } from "./must-visit-section-client";

/**
 * Server container: fetches real published destinations from DB
 * (featured first) and hands them to the interactive carousel.
 */
export async function MustVisitSection({ locale }: { locale: string }) {
  const t = await getTranslations("MustVisit");
  const destinations = await getMustVisitDestinations(locale, 8);

  return (
    <MustVisitSectionClient
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      viewMore={t("viewMore")}
      seeMore={t("seeMore")}
      destinations={destinations}
    />
  );
}
