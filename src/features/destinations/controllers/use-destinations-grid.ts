import { useState } from "react";
import { useTranslations } from "next-intl";
import { DestinationCategory } from "../types";
import { DESTINATIONS_DATA } from "../data/destinations";

export function useDestinationsGrid() {
  const t = useTranslations("DestinationsPage");
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { key: string; value: DestinationCategory; label: string }[] = [
    { key: "all", value: "All", label: t("categories.all") },
    { key: "nature", value: "Nature", label: t("categories.nature") },
    { key: "beach", value: "Beach", label: t("categories.beach") },
    { key: "hills", value: "Hills", label: t("categories.hills") },
    { key: "heritage", value: "Heritage", label: t("categories.heritage") },
  ];

  const filteredItems = DESTINATIONS_DATA.filter((item) => {
    // Check Category
    const matchesCategory = activeCategory === "All" || item.tags.includes(activeCategory);
    
    // Check Search Query
    const title = t(`items.${item.id}.title`).toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return {
    t,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
  };
}
