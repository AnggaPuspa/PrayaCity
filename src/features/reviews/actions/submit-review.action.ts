"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { reviewSchema, type ReviewInput } from "../schemas/review.schema";
import {
  checkReviewRateLimit,
  createReview,
} from "../services/reviews.service";
import type { ReviewFormState } from "../types";

const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip");
}

/**
 * Uploads an optional review photo to Supabase Storage. Runs AFTER the rate
 * limit check so storage can't be spammed independently of review creation.
 */
async function uploadReviewPhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `reviews/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("media")
    .upload(filename, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(data.path);
  return urlData.publicUrl;
}

/**
 * Server Action: orchestration layer for anonymous review submission.
 * (1) validates input, (2) enforces IP-based rate limiting (the only spam
 * guard since reviews are anonymous and auto-published), (3) optionally
 * uploads a photo, (4) persists via the service, (5) revalidates the page.
 */
export async function submitReviewAction(
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const parsed = reviewSchema.safeParse({
    destinationSlug: formData.get("destinationSlug"),
    authorName: formData.get("authorName"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    const errors: ReviewFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ReviewInput;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (!ALLOWED_PHOTO_TYPES.includes(photo.type)) {
      return {
        status: "error",
        message: "Photo must be a JPG, PNG, WEBP, or AVIF image.",
        errors: { imageUrl: "Unsupported file type." },
      };
    }
    if (photo.size > MAX_PHOTO_SIZE) {
      return {
        status: "error",
        message: "Photo is too large (max 5MB).",
        errors: { imageUrl: "File too large." },
      };
    }
  }

  const ip = await getClientIp();
  const rateLimitMessage = await checkReviewRateLimit(
    ip,
    parsed.data.destinationSlug,
  );

  if (rateLimitMessage) {
    return { status: "rate_limited", message: rateLimitMessage };
  }

  try {
    let imageUrl: string | undefined;
    if (photo instanceof File && photo.size > 0) {
      imageUrl = await uploadReviewPhoto(photo);
    }

    await createReview({ ...parsed.data, imageUrl }, ip);
    revalidatePath("/(marketing)/destinations/[id]", "page");
    return { status: "success", message: "Thanks for your review!" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
