/**
 * Default camera for the Central Lombok story map.
 * Spot media/content comes from Destination DB — not hardcoded here.
 */
export const MAP_VIEW = {
  // Nudge east so the floating left card doesn't cover the landmass.
  center: [-8.82, 116.34] as [number, number],
  zoom: 10.2,
  minZoom: 9,
  maxZoom: 13,
};
