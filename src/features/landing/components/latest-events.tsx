import { getTranslations } from "next-intl/server";
import { getLatestEvents } from "@/features/article";
import { LatestEventsView } from "./latest-events-view";
import type { EventItem } from "../types";

/** Grid placement classes for the masonry layout, keyed by position. */
const GRID_CLASSNAMES = [
  "col-span-1 md:row-span-2 md:col-span-1 h-[400px] md:h-full",
  "col-span-1 h-[300px] md:h-auto",
  "col-span-1 h-[300px] md:h-auto",
  "col-span-1 h-[300px] md:h-auto",
  "col-span-1 h-[300px] md:h-auto",
];

/**
 * Container: fetches the latest published events straight from the database
 * (same source as the Events page) and renders the view.
 */
export async function LatestEvents({ locale }: { locale: string }) {
  const t = await getTranslations("LatestEvents");
  const latest = await getLatestEvents(locale, GRID_CLASSNAMES.length);

  const events: EventItem[] = latest.map((event, index) => ({
    slug: event.slug,
    title: event.title,
    date: event.date,
    category: event.category,
    image: event.image,
    className:
      GRID_CLASSNAMES[index] ?? GRID_CLASSNAMES[GRID_CLASSNAMES.length - 1],
  }));

  return <LatestEventsView heading={t("heading")} events={events} />;
}
