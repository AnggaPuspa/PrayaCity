import type { EventItem } from "../types";

/**
 * Content for the "Latest from Praya" section. Separated from the view so it
 * can later be swapped for a CMS/API fetch without touching the UI.
 */
export const LATEST_EVENTS: EventItem[] = [
  {
    title: "Festival PesonaBau Nyale\n2025",
    date: "February 2025",
    location: "Seger Beach, Kuta Mandalika",
    image: "/landingpageasset/festivalpesonabau.png",
    className: "col-span-1 md:row-span-2 md:col-span-1 h-[400px] md:h-full",
  },
  {
    title: "MotoGP Pertamina\nGrand Prix of Indonesia",
    date: "October 2025",
    location: "Pertamina Mandalika\nInternational Circuit",
    image: "/landingpageasset/motogp.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
  {
    title: "Presean Cultural\nChampionship",
    date: "August 2025",
    location: "Sade Traditional Village, Pujut",
    image: "/landingpageasset/preseencaltural.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
  {
    title: "Lombok Tengah Weaving\nFestival",
    date: "September 2025",
    location: "Sukarara Village",
    image: "/landingpageasset/lomboktenggah.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
  {
    title: "Mandalika Korpri Fun\nNight Run",
    date: "December 2025",
    location: "Kuta Mandalika Beach Park",
    image: "/landingpageasset/mandalikakorprifun.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
];
