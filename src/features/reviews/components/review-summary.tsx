import { StarRating } from "@/components/atoms";
import type { ReviewSummary as ReviewSummaryType } from "../types";

interface ReviewSummaryProps {
  summary: ReviewSummaryType;
  basedOnLabel: string;
}

/** Presentational: average rating + review count. Receives everything via props. */
export function ReviewSummary({ summary, basedOnLabel }: ReviewSummaryProps) {
  if (summary.count === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl font-semibold text-zinc-900">
        {summary.average.toFixed(1)}
      </span>
      <div className="flex flex-col gap-1">
        <StarRating value={summary.average} size="sm" />
        <span className="text-sm text-zinc-500">{basedOnLabel}</span>
      </div>
    </div>
  );
}
