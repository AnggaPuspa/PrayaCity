import "server-only";
import type { LocationSuggestion } from "../types";

export type GeocodedCoordinates = {
  latitude: number;
  longitude: number;
  displayName: string;
};

export type { LocationSuggestion };

type NominatimItem = {
  place_id?: number | string;
  lat: string;
  lon: string;
  display_name?: string;
  name?: string;
  type?: string;
  class?: string;
  address?: {
    village?: string;
    town?: string;
    city?: string;
    municipality?: string;
    county?: string;
    state?: string;
    suburb?: string;
    hamlet?: string;
    road?: string;
  };
};

function buildLabel(item: NominatimItem): { label: string; secondary?: string } {
  const full = item.display_name?.trim() || "";
  const parts = full
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const primary =
    item.name?.trim() ||
    item.address?.village ||
    item.address?.hamlet ||
    item.address?.suburb ||
    item.address?.town ||
    item.address?.city ||
    parts[0] ||
    full;

  const secondary =
    parts.length > 1
      ? parts.slice(1, 4).join(", ")
      : [item.address?.county, item.address?.state].filter(Boolean).join(", ") ||
        undefined;

  return {
    label: primary,
    secondary: secondary || undefined,
  };
}

async function nominatimSearch(
  query: string,
  limit: number,
): Promise<NominatimItem[]> {
  const cleaned = query.trim();
  if (!cleaned) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("q", cleaned);
  url.searchParams.set("countrycodes", "id");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "PrayaCityAdmin/1.0 (destination-location-autocomplete)",
    },
    cache: "no-store",
  });

  if (!response.ok) return [];
  return (await response.json()) as NominatimItem[];
}

function toSuggestion(item: NominatimItem, index: number): LocationSuggestion | null {
  const latitude = Number(item.lat);
  const longitude = Number(item.lon);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  const { label, secondary } = buildLabel(item);
  return {
    id: String(item.place_id ?? `${latitude},${longitude},${index}`),
    label,
    secondary,
    latitude: Number(latitude.toFixed(6)),
    longitude: Number(longitude.toFixed(6)),
  };
}

/**
 * Resolve free-text location into coordinates via OpenStreetMap Nominatim.
 * Used so admins only type an address/place name — no map required.
 */
export async function geocodeLocation(
  query: string,
): Promise<GeocodedCoordinates | null> {
  try {
    const results = await nominatimSearch(query, 1);
    if (!results.length) return null;

    const suggestion = toSuggestion(results[0], 0);
    if (!suggestion) return null;

    return {
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
      displayName: [suggestion.label, suggestion.secondary]
        .filter(Boolean)
        .join(", "),
    };
  } catch {
    return null;
  }
}

/**
 * Return multiple location suggestions for admin autocomplete.
 */
export async function searchLocationSuggestions(
  query: string,
  limit = 6,
): Promise<LocationSuggestion[]> {
  const cleaned = query.trim();
  if (cleaned.length < 3) return [];

  // Bias short queries toward Central Lombok for better local accuracy.
  const searchQuery = /lombok|ntb|indonesia/i.test(cleaned)
    ? cleaned
    : `${cleaned}, Lombok Tengah, Nusa Tenggara Barat, Indonesia`;

  try {
    const results = await nominatimSearch(searchQuery, limit);
    const suggestions = results
      .map((item, index) => toSuggestion(item, index))
      .filter((item): item is LocationSuggestion => item !== null);

    // Deduplicate near-identical labels.
    const seen = new Set<string>();
    return suggestions.filter((item) => {
      const key = `${item.label}|${item.secondary ?? ""}|${item.latitude}|${item.longitude}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } catch {
    return [];
  }
}
