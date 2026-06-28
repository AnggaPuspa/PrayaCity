/**
 * Globally shared, framework-agnostic types.
 * Domain types belong inside their feature (`features/<name>/types`).
 */

/** A discriminated result type for operations that can fail gracefully. */
export type Result<T, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

/** Standard shape for paginated API responses. */
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
