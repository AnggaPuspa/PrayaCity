import { z } from "zod";

export const eventSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  image: z.string().min(1, "Image URL is required"),
  titleEn: z.string().min(3, "English title must be at least 3 characters"),
  titleId: z.string().min(3, "Indonesian title must be at least 3 characters"),
  excerptEn: z.string().min(10, "English excerpt must be at least 10 characters"),
  excerptId: z.string().min(10, "Indonesian excerpt must be at least 10 characters"),
  bodyEn: z.string().min(20, "English body must be at least 20 characters"),
  bodyId: z.string().min(20, "Indonesian body must be at least 20 characters"),
  dateEn: z.string().min(1, "English date is required (e.g., February 2025)"),
  dateId: z.string().min(1, "Indonesian date is required (e.g., Februari 2025)"),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export type EventInput = z.infer<typeof eventSchema>;
