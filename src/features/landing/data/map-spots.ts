/**
 * Real-world map spots for Central Lombok.
 * Coordinates are approximate public points for illustration.
 */
export const MAP_SPOT_MEDIA = [
  {
    id: "praya",
    image: "/discoversection/category-information-1.webp",
    href: "/destinations",
    latitude: -8.705,
    longitude: 116.2705,
    region: "center",
    iconType: "city",
  },
  {
    id: "kutaMandalika",
    image: "/destination/kuta-mandalika-beach.webp",
    href: "/destinations/kutaMandalika",
    latitude: -8.8956,
    longitude: 116.2804,
    region: "south",
    iconType: "sea",
  },
  {
    id: "bukitMerese",
    image: "/destination/bukit-meresa.webp",
    href: "/destinations/bukitMerese",
    latitude: -8.9125,
    longitude: 116.3208,
    region: "south",
    iconType: "hill",
  },
  {
    id: "bukitLancing",
    image: "/destination/bukit-lancing.webp",
    href: "/destinations/bukitLancing",
    latitude: -8.7198,
    longitude: 116.2685,
    region: "hills",
    iconType: "hill",
  },
  {
    id: "gerupuk",
    image: "/mustvisisection/Rectangle 11.webp",
    href: "/destinations",
    latitude: -8.9158,
    longitude: 116.3512,
    region: "south",
    iconType: "sea",
  },
  {
    id: "sade",
    image: "/mustvisisection/Rectangle 10 (1).webp",
    href: "/destinations",
    latitude: -8.8465,
    longitude: 116.2928,
    region: "culture",
    iconType: "culture",
  },
] as const;

export type MapSpotMedia = (typeof MAP_SPOT_MEDIA)[number];

/** Default camera for the Central Lombok story map. */
export const MAP_VIEW = {
  // Nudge east so the floating left card doesn't cover the landmass.
  center: [-8.82, 116.34] as [number, number],
  zoom: 10.2,
  minZoom: 9,
  maxZoom: 13,
};
