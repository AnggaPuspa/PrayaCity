"use client";

import { useMemo } from "react";
import { useMapExplorer } from "../controllers/use-map-explorer";
import type { MapExplorerLabels, MapSpot } from "../types";
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
  const spotIds = useMemo(() => spots.map((spot) => spot.id), [spots]);
  const initialId = spots[0]?.id ?? "";
  const controller = useMapExplorer(initialId, spotIds);

  if (!spots.length) return null;

  return (
    <MapExplorerView labels={labels} spots={spots} {...controller} />
  );
}
