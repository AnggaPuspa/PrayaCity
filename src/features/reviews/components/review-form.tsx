"use client";

import { useRef, useState } from "react";
import { Button, Input, StarRating, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { useReviewForm } from "../controllers/use-review-form";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB, mirrors the server-side check
const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

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
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Reject oversized/unsupported files immediately in the browser instead of
   * letting a large multipart body hit the server (where Next.js would
   * otherwise reject the whole request before our friendly validation runs).
   */
  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setPhotoError(null);
      return;
    }

    if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
      setPhotoError("Photo must be a JPG, PNG, WEBP, or AVIF image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError(
        "Photo is too large (max 5MB). Please choose a smaller file.",
      );
      event.target.value = "";
      return;
    }

    setPhotoError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Belt-and-suspenders: block submission if an invalid file slipped
    // through (e.g. re-selected via drag & drop) rather than crashing.
    const file = fileInputRef.current?.files?.[0];
    if (
      file &&
      (file.size > MAX_PHOTO_SIZE || !ALLOWED_PHOTO_TYPES.includes(file.type))
    ) {
      event.preventDefault();
      setPhotoError(
        "Photo is too large or not a supported format. Please pick a smaller image.",
      );
    }
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100"
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
          className="rounded-xl border-zinc-200 focus-visible:ring-zinc-900/10 focus-visible:border-zinc-900/20"
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
          className="rounded-xl border-zinc-200 focus-visible:ring-zinc-900/10 focus-visible:border-zinc-900/20"
        />
      </FormField>

      <FormField
        label={labels.photoLabel}
        htmlFor="photo"
        error={photoError ?? state.errors?.imageUrl}
      >
        <Input
          ref={fileInputRef}
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handlePhotoChange}
          className="rounded-xl border-zinc-200 focus-visible:ring-zinc-900/10 focus-visible:border-zinc-900/20 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
        />
        <p className="text-xs text-zinc-400">
          Max 5MB — JPG, PNG, WEBP, or AVIF.
        </p>
      </FormField>

      <Button
        type="submit"
        disabled={isPending || !!photoError}
        className="mt-2 w-full sm:w-auto self-start rounded-full px-8 bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all"
      >
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
