import { getTranslations } from "next-intl/server";
import { TimelineSectionView } from "./timeline-section-view";

/**
 * Container component for the Timeline Intro section.
 * Fetches translations and passes them to the presentational view.
 */
export async function TimelineSection() {
  const t = await getTranslations("HistoryPage");

  const header = {
    title: t("timelineTitle"),
    description: t("timelineDescription"),
  };

  return <TimelineSectionView header={header} />;
}
