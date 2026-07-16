import Image from "next/image";
import { StarRating } from "@/components/atoms";
import type { ReviewItem } from "../types";

interface ReviewCardProps {
  review: ReviewItem;
  dateLocale: string;
}

/** Presentational: a single review. Receives everything via props. */
export function ReviewCard({ review, dateLocale }: ReviewCardProps) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString(
    dateLocale,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="flex flex-col gap-3 py-6 border-b border-zinc-200 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-medium uppercase">
            {review.authorName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900">{review.authorName}</p>
            <p className="text-xs text-zinc-500">{formattedDate}</p>
          </div>
        </div>
        <StarRating value={review.rating} size="sm" />
      </div>

      <p className="text-[15px] leading-relaxed text-zinc-700">{review.comment}</p>

      {review.imageUrl ? (
        <div className="relative mt-1 h-40 w-56 overflow-hidden rounded-lg">
          <Image
            src={review.imageUrl}
            alt={`Photo from ${review.authorName}'s review`}
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>
      ) : null}
    </div>
  );
}
