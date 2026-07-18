"use client";

import { useTranslations } from "next-intl";
import { useDestinationsGrid } from "../controllers/use-destinations-grid";
import { GridSectionView } from "./grid-section-view";
import type { DestinationCategoryOption, DestinationGridItem } from "../types";

export function GridSectionClient({ initialItems }: { initialItems: DestinationGridItem[] }) {
  const t = useTranslations("DestinationsPage");

  const categories: DestinationCategoryOption[] = [
    { key: "all", value: "All", label: t("categories.all") },
    { key: "nature", value: "Nature", label: t("categories.nature") },
    { key: "beach", value: "Beach", label: t("categories.beach") },
    { key: "hills", value: "Hills", label: t("categories.hills") },
    { key: "heritage", value: "Heritage", label: t("categories.heritage") },
  ];

  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    paginatedItems,
    totalItems,
    currentPage,
    totalPages,
    canGoPrev,
    canGoNext,
    goToPage,
  } = useDestinationsGrid({ items: initialItems });

  return (
    <GridSectionView
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      categories={categories}
      paginatedItems={paginatedItems}
      totalItems={totalItems}
      currentPage={currentPage}
      totalPages={totalPages}
      canGoPrev={canGoPrev}
      canGoNext={canGoNext}
      goToPage={goToPage}
      searchPlaceholder={t("searchPlaceholder")}
      emptyStateMessage={t("emptyDestinationsMessage")}
    />
  );
}
