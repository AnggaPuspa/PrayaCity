/** Types for the AR Navigate feature. */

export type ArLatLng = {
  lat: number;
  lng: number;
};

export type ArGpsStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "unsupported";

/** Destination payload passed into the AR screen. */
export interface ArNavigateDestination {
  id: string;
  title: string;
  imageSrc: string;
  subtitle?: string;
  latitude: number;
  longitude: number;
}

export interface ArNavigateLabels {
  brandTitle: string;
  brandSubtitle: string;
  usingAr: string;
  pointCamera: string;
  followArrows: string;
  compass: string;
  destination: string;
  sound: string;
  scan: string;
  featuredTag: string;
  viewDetail: string;
  close: string;
}

/** Fallback pin when DB coords are missing (Kuta Mandalika). */
export const DEFAULT_AR_DESTINATION: ArNavigateDestination = {
  id: "kuta-mandalika",
  title: "Pantai Kuta Mandalika",
  imageSrc: "/destination/detaildestination/kuta-mandalika-detail.jpg",
  subtitle: "Destinasi unggulan di Praya",
  latitude: -8.8956,
  longitude: 116.2804,
};
