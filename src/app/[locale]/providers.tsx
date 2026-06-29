"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Global client-side providers.
 *
 * Lenis runs in root/native mode so it smooths the real page scroll —
 * `window.scrollY`, sticky positioning, and anchor links keep working.
 * Touch scrolling stays native (`syncTouch: false`) since mobile already has
 * good momentum scrolling.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
