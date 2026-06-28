"use client";

import * as React from "react";

/**
 * Global client-side providers (theme, React Query, analytics, etc.).
 * Kept as a single client boundary so the root layout stays a Server
 * Component. Add providers here as the app grows.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
