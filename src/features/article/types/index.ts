export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  publishedAt: string;
  heroImage: string;
  paragraphs: string[];
}

export interface RelatedArticle {
  slug: string;
  category: string;
  title: string;
  publishedAt: string;
  image: string;
}

export interface FeaturedEvent {
  title: string;
  category: string;
  slug: string;
  image: string;
}

export interface BlogEvent {
  title: string;
  publishedAt: string;
  intro: string;
  categories: string[];
  slug: string;
  image: string;
}

/** A string available in both supported locales. */
export interface LocalizedText {
  en: string;
  id: string;
}

/**
 * Raw bilingual source of truth for one event/article. Lives in the data layer
 * (NOT in i18n messages) so long-form content doesn't bloat the message files.
 */
export interface LocalizedEvent {
  slug: string;
  image: string;
  /** Filter tags (kept stable/English so the category filter keeps working). */
  categories: string[];
  date: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: { en: string[]; id: string[] };
}
