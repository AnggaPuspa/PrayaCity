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
    <div className="flex flex-col p-6 bg-white rounded-2xl mb-5 shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-zinc-100 relative group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 text-[15px] font-semibold uppercase">
            {review.authorName.charAt(0)}
          </div>
          
          {/* Name and Date */}
          <div className="flex flex-col">
            <p className="text-[15px] font-semibold text-zinc-900">{review.authorName}</p>
            <p className="text-[13px] text-zinc-500 mt-0.5">{formattedDate}</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="pt-1">
          <StarRating value={review.rating} size="sm" />
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-zinc-700">{review.comment}</p>

      {review.imageUrl ? (
        <div className="relative mt-5 h-48 w-full sm:w-64 overflow-hidden rounded-xl border border-zinc-100">
          <Image
            src={review.imageUrl}
            alt={`Photo from ${review.authorName}'s review`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 256px"
          />
        </div>
      ) : null}
    </div>
  );
}
