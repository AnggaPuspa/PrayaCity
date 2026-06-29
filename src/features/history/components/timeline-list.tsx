import { getTranslations } from "next-intl/server";
import { TIMELINE_DATA } from "../data/timeline";
import { TimelineListView } from "./timeline-list-view";

/**
 * Container component for the Timeline List section.
 * Merges static timeline domain data with translations.
 */
export async function TimelineList() {
  const t = await getTranslations("HistoryPage");

  // Type assertion for the array from messages
  const tItems = t.raw("timelineItems") as Array<{
    date: string;
    title: string;
    description: string;
  }>;

  // Merge static images with translations based on index
  const items = TIMELINE_DATA.map((data, index) => {
    const translation = tItems[index];
    return {
      ...data,
      date: translation?.date || "",
      title: translation?.title || "",
      description: translation?.description || "",
    };
  });

  return <TimelineListView items={items} />;
}
