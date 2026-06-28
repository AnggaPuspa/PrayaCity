"use client";

import { useEffect, useState } from "react";

/**
 * App-wide shared hook. Tracks whether a CSS media query currently matches,
 * staying in sync via a subscription to the platform's `matchMedia` API.
 *
 * Feature-specific hooks belong in `features/<name>/hooks`, not here.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
