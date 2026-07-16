import { getTranslations } from "next-intl/server";
import { getReviewsByDestination, getReviewSummary } from "../services/reviews.service";
import { ReviewsSectionView } from "./reviews-section-view";

/**
 * Container: fetches reviews + aggregate summary for a destination, then
 * renders the view. Real data, no admin approval step — reviews are
 * anonymous and auto-published (rate-limited server-side instead).
 */
export async function ReviewsSection({
  destinationSlug,
  locale,
}: {
  destinationSlug: string;
  locale: string;
}) {
  const t = await getTranslations("DestinationsPage.reviews");

  const [reviews, summary] = await Promise.all([
    getReviewsByDestination(destinationSlug),
    getReviewSummary(destinationSlug),
  ]);

  const basedOnLabel =
    summary.count === 1
      ? t("basedOnOne")
      : t("basedOn", { count: summary.count });

  return (
    <ReviewsSectionView
      destinationSlug={destinationSlug}
      reviews={reviews}
      summary={summary}
      dateLocale={locale === "id" ? "id-ID" : "en-US"}
      labels={{
        heading: t("heading"),
        noReviews: t("noReviews"),
        basedOnLabel,
        writeReview: t("writeReview"),
        nameLabel: t("nameLabel"),
        namePlaceholder: t("namePlaceholder"),
        ratingLabel: t("ratingLabel"),
        commentLabel: t("commentLabel"),
        commentPlaceholder: t("commentPlaceholder"),
        photoLabel: t("photoLabel"),
        submit: t("submit"),
        submitting: t("submitting"),
        rateLimitedTitle: t("rateLimitedTitle"),
      }}
    />
  );
}
