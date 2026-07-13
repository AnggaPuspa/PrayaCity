export type DestinationCategory = "All" | "Nature" | "Beach" | "Hills" | "Heritage";

export interface DestinationItem {
  id: string;
  imageSrc: string;
  detailImageSrc?: string;
  tags: Exclude<DestinationCategory, "All">[];
}

export interface DestinationGridItem extends DestinationItem {
  title: string;
  description: string;
}

export interface DestinationCategoryOption {
  key: string;
  value: DestinationCategory;
  label: string;
}

export interface DestinationDetailContent extends DestinationItem {
  title: string;
  longDescription: string;
  location: string;
  status: string;
  entranceFee: string;
  translatedTags: string[];
}
