"use client";

import { useCarousel } from "../controllers/use-carousel";
import type { Destination } from "../types";
import { MustVisitSectionView } from "./must-visit-section-view";

interface MustVisitSectionClientProps {
  eyebrow: string;
  heading: string;
  viewMore: string;
  seeMore: string;
  destinations: Destination[];
}

/** Client container: wires carousel controller into the presentational view. */
export function MustVisitSectionClient({
  eyebrow,
  heading,
  viewMore,
  seeMore,
  destinations,
}: MustVisitSectionClientProps) {
  const { scrollRef, scrollLeft, scrollRight } = useCarousel();

  return (
    <MustVisitSectionView
      eyebrow={eyebrow}
      heading={heading}
      viewMore={viewMore}
      seeMore={seeMore}
      destinations={destinations}
      scrollRef={scrollRef}
      scrollLeft={scrollLeft}
      scrollRight={scrollRight}
    />
  );
}
