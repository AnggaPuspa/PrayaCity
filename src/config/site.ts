/**
 * Single source of truth for site-wide, static metadata.
 * Keep environment-dependent values in `@/config/env`, not here.
 */
export const siteConfig = {
  name: "Praya City",
  description:
    "A production-grade Next.js starter using Atomic Design for UI and feature-sliced modules for business logic.",
  url: "https://praya.city",
  locale: "en",
  nav: [
    { label: "home", href: "/" },
    { label: "History", href: "#history" },
    { label: "Culture", href: "#culture" },
    { label: "Destinations", href: "#destinations" },
    { label: "Programs", href: "#programs" },
    { label: "Events", href: "#events" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavItem = SiteConfig["nav"][number];
