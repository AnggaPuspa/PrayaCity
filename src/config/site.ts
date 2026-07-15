/**
 * Single source of truth for site-wide, static metadata.
 * Keep environment-dependent values in `@/config/env`, not here.
 * Nav labels are translated via the `Nav` message namespace (keyed by `key`).
 */
export const siteConfig = {
  name: "Praya City",
  description:
    "Discover Central Lombok — explore cultural events, natural destinations, local culinary, and rich history from Putri Mandalika to Mandalika Circuit. Your bilingual tourism gateway.",
  url: "https://www.parayacity.id",
  nav: [
    { key: "home", href: "/" },
    { key: "history", href: "/history" },
    { key: "culture", href: "/culture" },
    { key: "destinations", href: "/destinations" },
    { key: "programs", href: "/coming-soon" },
    { key: "events", href: "/events" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavItem = SiteConfig["nav"][number];
