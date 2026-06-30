import { getFeaturedEvents } from "../services/events.service";
import { EventsHeroFeaturedView } from "./events-hero-featured-view";

/** Container: fetches localized featured events, then renders the view. */
export async function EventsFeatured({ locale }: { locale: string }) {
  const events = await getFeaturedEvents(locale);
  return <EventsHeroFeaturedView events={events} />;
}
