import { defineRouting } from "next-intl/routing";

/**
 * Shared i18n routing config (used by the proxy and the navigation APIs).
 * - `localePrefix: "always"` → every URL is prefixed (/id, /en) for clean SEO.
 */
export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
