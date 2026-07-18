import type { DestinationItem } from "../../../src/features/destinations/types";

/**
 * Real Central Lombok destinations for CMS seed.
 * Photos: Wikimedia Commons (upload.wikimedia.org) + local assets where already on disk.
 * Coordinates are approximate public map points for each site.
 */
export const DESTINATIONS_DATA: (DestinationItem & {
  latitude: number;
  longitude: number;
})[] = [
  {
    id: "kutaMandalika",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Kuta_Mandalika_Beach_Lombok_Island.jpg",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Kuta_Beach%2C_Lombok%2C_Indonesia.jpg",
    tags: ["Nature", "Beach"],
    latitude: -8.8956,
    longitude: 116.2804,
  },
  {
    id: "bukitMerese",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Bukit_Merese%2C_Lombok.jpg",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Keindahan_Bukit_Merese.jpg",
    tags: ["Nature", "Hills"],
    latitude: -8.9125,
    longitude: 116.3208,
  },
  {
    id: "bukitLancing",
    imageSrc: "/destination/bukit-lancing.webp",
    tags: ["Nature", "Hills"],
    latitude: -8.7198,
    longitude: 116.2685,
  },
  {
    id: "tanjungAan",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Tanjung_Aan_Beach.jpg",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Tanjung_Aan%2C_Lombok.jpg",
    tags: ["Nature", "Beach"],
    latitude: -8.9078,
    longitude: 116.3215,
  },
  {
    id: "mawun",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/Mawun_Beach_1.JPG",
    detailImageSrc: "/destination/detaildestination/mawun-beach-detail.jpg",
    tags: ["Nature", "Beach"],
    latitude: -8.9005,
    longitude: 116.234,
  },
  {
    id: "gerupuk",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/2/21/Gerupuk_Beach.jpg",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/Gerupuk-outside-right.jpg",
    tags: ["Nature", "Beach"],
    latitude: -8.9165,
    longitude: 116.3352,
  },
  {
    id: "seger",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/PANTAI_SEGER.jpg",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/DJI_0665_-_Mandalika_Lombok.jpg",
    tags: ["Nature", "Beach", "Heritage"],
    latitude: -8.8942,
    longitude: 116.2958,
  },
  {
    id: "sade",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Traditional_Sasak_Village_Sade_houses.JPG",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Tenun_Ikat_Lombok_Traditional_Sasak_Village_Sade.JPG",
    tags: ["Heritage"],
    latitude: -8.8458,
    longitude: 116.2921,
  },
  {
    id: "selongBelanak",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Sunset_di_Selong_Belanak.jpg",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Boats_in_selong_belanak.jpg",
    tags: ["Nature", "Beach"],
    latitude: -8.8612,
    longitude: 116.1485,
  },
  {
    id: "sukarara",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Traditional_Sasak_Village_Sade_rice_barn.JPG",
    detailImageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Tenun_Ikat_Lombok_Traditional_Sasak_Village_Sade.JPG",
    tags: ["Heritage"],
    latitude: -8.7125,
    longitude: 116.2788,
  },
];
