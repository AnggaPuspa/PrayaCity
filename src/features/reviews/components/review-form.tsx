"use client";

import { useState } from "react";
import { Button, Input, StarRating, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { useReviewForm } from "../controllers/use-review-form";

interface ReviewFormProps {
  destinationSlug: string;
  labels: {
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

/**
 * Feature UI: declarative review form wired to the controller. Composes
 * shared atoms/molecules; all persistence/validation logic lives server-side
 * in the action, all state wiring lives in the controller.
 */
export function ReviewForm({ destinationSlug, labels }: ReviewFormProps) {
  const { state, formAction, isPending } = useReviewForm();
  const [rating, setRating] = useState(0);

  return (
    <form
      action={formAction}
      className="flex w-full flex-col gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
      noValidate
    >
      <input type="hidden" name="destinationSlug" value={destinationSlug} />

      <FormField
        label={labels.ratingLabel}
        htmlFor="rating"
        error={state.errors?.rating}
      >
        <input type="hidden" name="rating" value={rating} />
        <StarRating value={rating} onChange={setRating} size="lg" />
      </FormField>

      <FormField
        label={labels.nameLabel}
        htmlFor="authorName"
        error={state.errors?.authorName}
      >
        <Input
          id="authorName"
          name="authorName"
          placeholder={labels.namePlaceholder}
          maxLength={60}
        />
      </FormField>

      <FormField
        label={labels.commentLabel}
        htmlFor="comment"
        error={state.errors?.comment}
      >
        <Textarea
          id="comment"
          name="comment"
          placeholder={labels.commentPlaceholder}
          maxLength={1000}
          rows={4}
        />
      </FormField>

      <FormField
        label={labels.photoLabel}
        htmlFor="photo"
        error={state.errors?.imageUrl}
      >
        <Input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" />
      </FormField>

      <Button type="submit" disabled={isPending} className="self-start px-8">
        {isPending ? labels.submitting : labels.submit}
      </Button>

      {state.status === "success" ? (
        <p className="text-sm font-medium text-green-600" role="status">
          {state.message}
        </p>
      ) : null}

      {state.status === "rate_limited" ? (
        <p className="text-sm font-medium text-amber-600" role="alert">
          <strong>{labels.rateLimitedTitle}:</strong> {state.message}
        </p>
      ) : null}

      {state.status === "error" && state.message ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
