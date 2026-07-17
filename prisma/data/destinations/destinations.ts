import type { DestinationItem } from "../../../src/features/destinations/types";

export const DESTINATIONS_DATA: (DestinationItem & {
  latitude: number;
  longitude: number;
})[] = [
  {
    id: "kutaMandalika",
    imageSrc: "/destination/kuta-mandalika-beach.webp",
    detailImageSrc: "/destination/detaildestination/Tegalalang-detail-img.webp",
    tags: ["Nature", "Beach"],
    latitude: -8.8956,
    longitude: 116.2804,
  },
  {
    id: "bukitMerese",
    imageSrc: "/destination/bukit-meresa.webp",
    tags: ["Nature"],
    latitude: -8.9125,
    longitude: 116.3208,
  },
  {
    id: "bukitLancing",
    imageSrc: "/destination/bukit-lancing.webp",
    tags: ["Nature"],
    latitude: -8.7198,
    longitude: 116.2685,
  },
];
