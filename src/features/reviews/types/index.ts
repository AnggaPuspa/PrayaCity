import type { ReviewInput } from "../schemas/review.schema";

export type { ReviewInput };

/** A single review as rendered on the destination detail page. */
export interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: string;
}

/** Aggregate rating summary shown above the review list. */
export interface ReviewSummary {
  average: number;
  count: number;
  /** Count of reviews per star rating, keyed 1-5. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export type ReviewFormState = {
  status: "idle" | "success" | "error" | "rate_limited";
  message: string;
  errors?: Partial<Record<keyof ReviewInput, string>>;
};

export const initialReviewFormState: ReviewFormState = {
  status: "idle",
  message: "",
};
