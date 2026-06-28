import { getTranslations } from "next-intl/server";
import { EVENT_MEDIA } from "../data/events";
import { LatestEventsView } from "./latest-events-view";
import type { EventItem } from "../types";

/** Container: merges translated text with media, then renders the view. */
export async function LatestEvents() {
  const t = await getTranslations("LatestEvents");
  const items = t.raw("items") as Array<
    Pick<EventItem, "title" | "date" | "location">
  >;

  const events: EventItem[] = items.map((item, index) => ({
    ...item,
    ...EVENT_MEDIA[index],
  }));

  return <LatestEventsView heading={t("heading")} events={events} />;
}
