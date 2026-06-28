"use client";

import { DESTINATIONS } from "../data/destinations";
import { useCarousel } from "../controllers/use-carousel";
import { MustVisitSectionView } from "./must-visit-section-view";

/** Container: wires the carousel controller to the presentational view. */
export function MustVisitSection() {
  const { scrollRef, scrollLeft, scrollRight } = useCarousel();

  return (
    <MustVisitSectionView
      destinations={DESTINATIONS}
      scrollRef={scrollRef}
      scrollLeft={scrollLeft}
      scrollRight={scrollRight}
    />
  );
}
