"use client";

import { useTranslations } from "next-intl";
import { DESTINATIONS_DATA } from "../data/destinations";
import { useDestinationsGrid } from "../controllers/use-destinations-grid";
import { GridSectionView } from "./grid-section-view";
import type { DestinationCategoryOption, DestinationGridItem } from "../types";

/** Container: wires translations + grid filter controller to the view. */
export function GridSection() {
  const t = useTranslations("DestinationsPage");

  const categories: DestinationCategoryOption[] = [
    { key: "all", value: "All", label: t("categories.all") },
    { key: "nature", value: "Nature", label: t("categories.nature") },
    { key: "beach", value: "Beach", label: t("categories.beach") },
    { key: "hills", value: "Hills", label: t("categories.hills") },
    { key: "heritage", value: "Heritage", label: t("categories.heritage") },
  ];

  const items: DestinationGridItem[] = DESTINATIONS_DATA.map((item) => ({
    ...item,
    title: t(`items.${item.id}.title`),
    description: t(`items.${item.id}.description`),
  }));

  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredItems,
  } = useDestinationsGrid({ items });

  return (
    <GridSectionView
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      categories={categories}
      filteredItems={filteredItems}
      searchPlaceholder={t("searchPlaceholder")}
      emptyStateMessage={t("emptyDestinationsMessage")}
    />
  );
}
