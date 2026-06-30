"use client";

import { useState } from "react";
import type { BlogEvent } from "../types";

/**
 * Controller: owns the category-filter state for the blog list. Keeps the
 * view presentational.
 */
export function useBlogFilter(blogs: BlogEvent[]) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? blogs.filter((blog) => blog.categories.includes(activeCategory))
    : blogs;

  const toggle = (category: string) =>
    setActiveCategory((prev) => (prev === category ? null : category));

  const clear = () => setActiveCategory(null);

  return { activeCategory, filtered, toggle, clear };
}
