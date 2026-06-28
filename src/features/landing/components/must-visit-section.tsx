"use client";

import { useTranslations } from "next-intl";
import { DESTINATION_MEDIA } from "../data/destinations";
import { useCarousel } from "../controllers/use-carousel";
import { MustVisitSectionView } from "./must-visit-section-view";
import type { Destination } from "../types";

/** Container: wires translations + carousel controller to the view. */
export function MustVisitSection() {
  const t = useTranslations("MustVisit");
  const { scrollRef, scrollLeft, scrollRight } = useCarousel();

  const items = t.raw("items") as Array<
    Pick<Destination, "title" | "description">
  >;
  const destinations: Destination[] = items.map((item, index) => ({
    ...item,
    ...DESTINATION_MEDIA[index],
  }));

  return (
    <MustVisitSectionView
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      viewMore={t("viewMore")}
      seeMore={t("seeMore")}
      destinations={destinations}
      scrollRef={scrollRef}
      scrollLeft={scrollLeft}
      scrollRight={scrollRight}
    />
  );
}
