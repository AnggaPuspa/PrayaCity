"use client";

import { useArNavigateController } from "../controllers/use-ar-navigate-controller";
import { ArNavigateView } from "./ar-navigate-view";

/**
 * AR Navigate container — wires camera + UI state into the presentational view.
 */
export function ArNavigate() {
  const controller = useArNavigateController();
  return <ArNavigateView {...controller} />;
}
