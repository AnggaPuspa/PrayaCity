/** Types for the AR Navigate feature. */

export interface ArNavigateDestination {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  distance: string;
  duration: string;
  location: string;
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
