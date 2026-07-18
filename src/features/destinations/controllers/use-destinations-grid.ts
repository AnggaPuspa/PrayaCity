import { useCallback, useMemo, useState } from "react";
import type { DestinationCategory, DestinationGridItem } from "../types";

/** Cards per page — 6 fills 2 rows on the 3-column desktop grid. */
const PAGE_SIZE = 6;

interface UseDestinationsGridParams {
  items: DestinationGridItem[];
}

export function useDestinationsGrid({ items }: UseDestinationsGridParams) {
  const [activeCategory, setActiveCategoryState] = useState<DestinationCategory>("All");
  const [searchQuery, setSearchQueryState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change so users never land on an empty page.
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    setCurrentPage(1);
  }, []);

  const setActiveCategory = useCallback((category: DestinationCategory) => {
    setActiveCategoryState(category);
    setCurrentPage(1);
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.tags.includes(activeCategory);
      const matchesSearch =
        normalizedQuery.length === 0 || item.title.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, items, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  // Clamp in case filtered set shrinks (e.g. after search) beyond current page.
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, safePage]);

  const goToPage = useCallback(
    (page: number) => {
      const next = Math.min(Math.max(1, page), totalPages);
      setCurrentPage(next);
    },
    [totalPages],
  );

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    /** Items for the current page only. */
    paginatedItems,
    /** Full filtered set (used for empty-state checks). */
    filteredItems,
    currentPage: safePage,
    totalPages,
    pageSize: PAGE_SIZE,
    totalItems: filteredItems.length,
    goToPage,
    canGoPrev: safePage > 1,
    canGoNext: safePage < totalPages,
  };
}
