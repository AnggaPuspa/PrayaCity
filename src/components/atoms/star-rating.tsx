import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface StarRatingProps {
  /** Current rating, 0-5. Fractional values render partially filled stars in read-only mode. */
  value: number;
  /** When provided, renders as an interactive input (radio-like star picker). */
  onChange?: (value: number) => void;
  /** Hidden radio inputs' shared `name`, required when `onChange` is set and this is inside a <form>. */
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<StarRatingProps["size"]>, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
};

/**
 * Atom: renders 5 stars. Purely presentational/controlled — holds no state
 * of its own. Works both as a read-only display (e.g. review summaries) and
 * as an interactive picker when `onChange` + `name` are provided.
 */
export function StarRating({
  value,
  onChange,
  name,
  size = "md",
  className,
}: StarRatingProps) {
  const isInteractive = typeof onChange === "function";
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role={isInteractive ? "radiogroup" : "img"}
      aria-label={isInteractive ? "Select a rating" : `Rated ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(value);

        if (isInteractive) {
          return (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={star}
                checked={star === Math.round(value)}
                onChange={() => onChange?.(star)}
                className="sr-only"
              />
              <svg
                viewBox="0 0 24 24"
                className={cn(
                  sizeClass,
                  "transition-colors",
                  filled ? "fill-amber-400 text-amber-400" : "fill-transparent text-zinc-300",
                )}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </label>
          );
        }

        return (
          <svg
            key={star}
            viewBox="0 0 24 24"
            className={cn(
              sizeClass,
              filled ? "fill-amber-400 text-amber-400" : "fill-transparent text-zinc-300",
            )}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}
