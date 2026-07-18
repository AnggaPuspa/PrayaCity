"use client";

import { useCallback, useState } from "react";
import type { MapExplorerController, MapSpotId } from "../types";

/**
 * Controller: owns active pin state for the interactive map.
 * The view stays presentational and receives this contract.
 */
export function useMapExplorer(
  initialId: MapSpotId,
  spotIds: MapSpotId[],
): MapExplorerController {
  const [activeId, setActiveId] = useState<MapSpotId>(initialId);

  const selectSpot = useCallback((id: MapSpotId) => {
    setActiveId(id);
  }, []);

  const selectNext = useCallback(() => {
    setActiveId((current) => {
      const index = spotIds.indexOf(current);
      if (index < 0) return current;
      return spotIds[(index + 1) % spotIds.length] ?? current;
    });
  }, [spotIds]);

  const selectPrev = useCallback(() => {
    setActiveId((current) => {
      const index = spotIds.indexOf(current);
      if (index < 0) return current;
      return spotIds[(index - 1 + spotIds.length) % spotIds.length] ?? current;
    });
  }, [spotIds]);

  return {
    activeId,
    selectSpot,
    selectNext,
    selectPrev,
  };
}
