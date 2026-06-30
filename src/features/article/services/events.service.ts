import "server-only";

import { CATEGORIES, EVENTS } from "../data/events.data";
import type { BlogEvent, FeaturedEvent } from "../types";

type Lang = "en" | "id";
const lang = (locale: string): Lang => (locale === "id" ? "id" : "en");

/** Top 3 events for the featured hero, localized. */
export async function getFeaturedEvents(
  locale: string,
): Promise<FeaturedEvent[]> {
  const l = lang(locale);

  return EVENTS.slice(0, 3).map((e) => ({
    title: e.title[l],
    category: e.categories[0] ?? "",
    slug: e.slug,
    image: e.image,
  }));
}

/** All events for the explore/blog list, localized. */
export async function getExploreBlogs(locale: string): Promise<BlogEvent[]> {
  const l = lang(locale);

  return EVENTS.map((e) => ({
    title: e.title[l],
    publishedAt: e.date[l],
    intro: e.excerpt[l],
    categories: e.categories,
    slug: e.slug,
    image: e.image,
  }));
}

export function getCategories(): string[] {
  return [...CATEGORIES];
}
