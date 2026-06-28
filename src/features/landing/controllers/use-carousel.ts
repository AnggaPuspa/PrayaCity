"use client";

import { useRef } from "react";

/**
 * Controller: owns the horizontal scroll behaviour for a carousel. Keeping it
 * here leaves the view purely presentational.
 */
export function useCarousel(step = 320) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: step, behavior: "smooth" });
  };

  return { scrollRef, scrollLeft, scrollRight };
}
