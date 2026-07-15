import { getCategories, getExploreBlogs } from "../services/events.service";
import { EventsExploreListView } from "./events-explore-list-view";

/** Container: fetches localized blogs + categories, then renders the view. */
export async function EventsExplore({ locale }: { locale: string }) {
  const blogs = await getExploreBlogs(locale);
  const categories = await getCategories();
  return <EventsExploreListView blogs={blogs} categories={categories} />;
}
