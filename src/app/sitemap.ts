import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

/**
 * Locale-aware sitemap: one entry per locale, each cross-referencing the
 * other languages via `alternates.languages` (good for multilingual SEO).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
