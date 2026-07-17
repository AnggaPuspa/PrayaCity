"use server";

import { searchLocationSuggestions } from "../services/geocode.service";
import type { LocationSuggestion } from "../types";

/**
 * Admin autocomplete endpoint for free-text destination locations.
 * Returns a short list so the admin can pick an exact place.
 */
export async function searchLocationSuggestionsAction(
  query: string,
): Promise<LocationSuggestion[]> {
  const cleaned = query.trim();
  if (cleaned.length < 3) return [];
  return searchLocationSuggestions(cleaned, 6);
}
