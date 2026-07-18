"use client";

import { useMemo } from "react";
import { useMapExplorer } from "../controllers/use-map-explorer";
import type {
  MapExplorerLabels,
  MapSpot,
  MapSpotId,
} from "../types";
import { MapExplorerView } from "./map-explorer-view";

interface MapExplorerInteractiveProps {
  labels: MapExplorerLabels;
  spots: MapSpot[];
}

/**
 * Client container: wires map controller to the presentational view.
 */
export function MapExplorerInteractive({
  labels,
  spots,
}: MapExplorerInteractiveProps) {
  const spotIds = useMemo(
    () => spots.map((spot) => spot.id as MapSpotId),
    [spots],
  );
  const initialId = spots[0]?.id ?? "praya";
  const controller = useMapExplorer(initialId, spotIds);

  return (
    <MapExplorerView labels={labels} spots={spots} {...controller} />
  );
}
