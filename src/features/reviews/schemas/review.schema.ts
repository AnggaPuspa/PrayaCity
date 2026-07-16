import { z } from "zod";

/**
 * Validation lives in its own layer so the SAME schema is reused by the
 * server action and, if needed later, client-side checks — single source
 * of truth.
 */
export const reviewSchema = z.object({
  destinationSlug: z.string().min(1),
  authorName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Name is too long."),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Please choose a rating.")
    .max(5, "Rating must be between 1 and 5."),
  comment: z
    .string()
    .trim()
    .min(10, "Comment must be at least 10 characters.")
    .max(1000, "Comment is too long."),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
