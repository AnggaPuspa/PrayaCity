import { Typography } from "@/components/atoms";
import { ReviewCard } from "./review-card";
import { ReviewForm } from "./review-form";
import { ReviewSummary } from "./review-summary";
import type { ReviewItem, ReviewSummary as ReviewSummaryType } from "../types";

interface ReviewsSectionViewProps {
  destinationSlug: string;
  reviews: ReviewItem[];
  summary: ReviewSummaryType;
  dateLocale: string;
  labels: {
    heading: string;
    noReviews: string;
    basedOnLabel: string;
    writeReview: string;
    nameLabel: string;
    namePlaceholder: string;
    ratingLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    photoLabel: string;
    submit: string;
    submitting: string;
    rateLimitedTitle: string;
  };
}

/** Presentational: reviews section for the destination detail page. */
export function ReviewsSectionView({
  destinationSlug,
  reviews,
  summary,
  dateLocale,
  labels,
}: ReviewsSectionViewProps) {
  return (
    <section className="w-full bg-white pb-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16 pt-10">
          {/* Left: heading + summary + list */}
          <div className="w-full md:w-[60%] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h2 className="text-zinc-900 text-2xl md:text-3xl font-semibold tracking-tight">
                {labels.heading}
              </h2>
              {summary.count > 0 && (
                <span className="flex items-center justify-center bg-blue-100 text-blue-800 text-sm font-semibold rounded-md px-2.5 py-0.5">
                  {summary.count}
                </span>
              )}
            </div>

            {summary.count > 0 ? (
              <ReviewSummary summary={summary} basedOnLabel={labels.basedOnLabel} />
            ) : (
              <p className="text-zinc-500 text-[15px]">{labels.noReviews}</p>
            )}

            <div className="flex flex-col">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} dateLocale={dateLocale} />
              ))}
            </div>
          </div>

          {/* Right: write a review */}
          <div className="w-full md:w-[40%]">
            <h3 className="text-zinc-900 text-xl font-semibold mb-6">
              {labels.writeReview}
            </h3>
            <ReviewForm
              destinationSlug={destinationSlug}
              labels={{
                nameLabel: labels.nameLabel,
                namePlaceholder: labels.namePlaceholder,
                ratingLabel: labels.ratingLabel,
                commentLabel: labels.commentLabel,
                commentPlaceholder: labels.commentPlaceholder,
                photoLabel: labels.photoLabel,
                submit: labels.submit,
                submitting: labels.submitting,
                rateLimitedTitle: labels.rateLimitedTitle,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
