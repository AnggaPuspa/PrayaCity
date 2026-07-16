// Public API for the `reviews` feature (anonymous, rate-limited destination reviews).
export { ReviewsSection } from "./components/reviews-section";
export { getReviewsByDestination, getReviewSummary } from "./services/reviews.service";
export type { ReviewItem, ReviewSummary } from "./types";
