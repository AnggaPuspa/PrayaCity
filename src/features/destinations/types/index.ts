export type DestinationCategory = "All" | "Nature" | "Beach" | "Hills" | "Heritage";

export interface DestinationItem {
  id: string; // matches translation key, e.g., 'kutaMandalika'
  imageSrc: string;
  tags: DestinationCategory[]; // e.g., ['Nature', 'Beach']
}
