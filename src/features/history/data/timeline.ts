import type { TimelineItem } from "../types";

/**
 * Media for each timeline entry. Order + length must match the
 * `HistoryPage.timelineItems` array in the message files.
 */
export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "majapahit",
    image: "/historypage/warisanNusa_culture1majapahit.webp",
  },
  {
    id: "sasak",
    image: "/historypage/warisanNusa_culture2.webp",
  },
  {
    id: "islam",
    image: "/historypage/warisanNusa_culture3.webp",
  },
  {
    id: "colonial",
    image: "/historypage/Group 1000006138 1 (2).webp",
  },
  {
    id: "modern",
    image: "/historypage/warisanNusa_culture3 (1).webp",
  },
];
