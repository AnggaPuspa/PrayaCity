import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely.
 * `clsx` handles conditional classes; `tailwind-merge` resolves conflicts
 * (e.g. `px-2 px-4` -> `px-4`). This is the single styling helper used by
 * every UI component in the design system.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
