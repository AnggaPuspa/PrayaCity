import type { ReactNode } from "react";

// Domain types for the landing page content.

export interface EventItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  /** Grid placement classes for the masonry layout. */
  className: string;
}

export interface Destination {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface DiscoverHeader {
  title: string;
  intro: string;
}

export type MapSpotId =
  | "praya"
  | "kutaMandalika"
  | "bukitMerese"
  | "bukitLancing"
  | "gerupuk"
  | "sade";

export type MapSpotIconType = "city" | "sea" | "hill" | "culture";

export interface MapSpot {
  id: MapSpotId;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
  href: string;
  latitude: number;
  longitude: number;
  region: string;
  iconType: MapSpotIconType;
}

export interface MapExplorerController {
  activeId: MapSpotId;
  selectSpot: (id: MapSpotId) => void;
  selectNext: () => void;
  selectPrev: () => void;
}
export interface MapExplorerLabels {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  explore: string;
  openSpot: string;
  prev: string;
  next: string;
  pinHint: string;
}
