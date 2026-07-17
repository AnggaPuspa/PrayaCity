/**
 * Non-translatable id/media/link for the "Discover Central Lombok" section.
 * Order matches the `Discover.items` array in the message files.
 * `href` points to the real page when it exists, otherwise to /coming-soon.
 */
export const DISCOVER_MEDIA = [
  { id: "01", image: "/discoversection/category-information-1.webp", href: "/history" },
  { id: "02", image: "/discoversection/category-information-2.webp", href: "/culture" },
  { id: "03", image: "/discoversection/category-information-3.webp", href: "/destinations" },
  { id: "04", image: "/discoversection/category-information-4.webp", href: "/events" },
] as const;
