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

export type LocationSuggestion = {
  id: string;
  label: string;
  secondary?: string;
  latitude: number;
  longitude: number;
};

/** Submitted form snapshot so failed validation can restore every field. */
export type DestinationFormValues = {
  slug: string;
  imageSrc: string;
  detailImageSrc: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  longDescriptionEn: string;
  longDescriptionId: string;
  locationEn: string;
  locationId: string;
  statusLabelEn: string;
  statusLabelId: string;
  entranceFeeEn: string;
  entranceFeeId: string;
  status: string;
  isFeatured: boolean;
  tags: string[];
  latitude: string;
  longitude: string;
};

export type DestinationFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  values?: DestinationFormValues;
};
