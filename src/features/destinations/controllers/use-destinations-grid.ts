import { useMemo, useState } from "react";
import type { DestinationCategory, DestinationGridItem } from "../types";

interface UseDestinationsGridParams {
  items: DestinationGridItem[];
}

export function useDestinationsGrid({ items }: UseDestinationsGridParams) {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.tags.includes(activeCategory);
      const matchesSearch = normalizedQuery.length === 0 || item.title.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, items, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredItems,
  };
}
