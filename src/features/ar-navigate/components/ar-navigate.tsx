"use client";

import { useArNavigateController } from "../controllers/use-ar-navigate-controller";
import type { ArNavigateDestination } from "../types";
import { ArNavigateView } from "./ar-navigate-view";

interface ArNavigateProps {
  destination?: ArNavigateDestination | null;
}

/**
 * AR Navigate container — wires camera, GPS, and destination into the HUD.
 */
export function ArNavigate({ destination }: ArNavigateProps) {
  const controller = useArNavigateController({ destination });
  return <ArNavigateView {...controller} />;
}
