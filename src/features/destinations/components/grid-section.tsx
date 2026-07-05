"use client";

import { useDestinationsGrid } from "../controllers/use-destinations-grid";
import { GridSectionView } from "./grid-section-view";

export function GridSection() {
  const {
    t,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
  } = useDestinationsGrid();

  return (
    <GridSectionView
      t={t}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      categories={categories}
      filteredItems={filteredItems}
    />
  );
}
