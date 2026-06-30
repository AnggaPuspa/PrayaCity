import "server-only";

import { EVENTS } from "../data/events.data";
import type { Article, RelatedArticle } from "../types";

type Lang = "en" | "id";
const lang = (locale: string): Lang => (locale === "id" ? "id" : "en");

/**
 * Data-access layer for article detail. Resolves bilingual content from the
 * `EVENTS` source by slug + locale. Falls back to the first event for unknown
 * slugs (mock behaviour).
 */
export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<Article> {
  const l = lang(locale);
  const event = EVENTS.find((e) => e.slug === slug) ?? EVENTS[0];

  return {
    id: event.slug,
    slug: event.slug,
    category: event.categories.join(" | "),
    title: event.title[l],
    publishedAt: event.date[l],
    heroImage: event.image,
    paragraphs: event.body[l],
  };
}

/** Up to 3 other articles, excluding the current one, localized. */
export async function getRelatedArticles(
  locale: string,
  excludeSlug?: string,
): Promise<RelatedArticle[]> {
  const l = lang(locale);

  return EVENTS.filter((e) => e.slug !== excludeSlug)
    .slice(0, 3)
    .map((e) => ({
      slug: e.slug,
      category: e.categories[0] ?? "",
      title: e.title[l],
      publishedAt: e.date[l],
      image: e.image,
    }));
}
