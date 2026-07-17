import { z } from "zod";

const optionalCoordinate = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    return Number(trimmed);
  }
  return value;
}, z.number().finite().optional());

export const destinationSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must only contain lowercase letters, numbers, and hyphens",
    ),
  imageSrc: z.string().min(1, "Image URL is required"),
  detailImageSrc: z.string().optional(),
  titleEn: z.string().min(3, "English title must be at least 3 characters"),
  titleId: z.string().min(3, "Indonesian title must be at least 3 characters"),
  descriptionEn: z
    .string()
    .min(10, "English description must be at least 10 characters"),
  descriptionId: z
    .string()
    .min(10, "Indonesian description must be at least 10 characters"),
  longDescriptionEn: z.string().optional(),
  longDescriptionId: z.string().optional(),
  locationEn: z.string().optional(),
  locationId: z.string().optional(),
  statusLabelEn: z.string().optional(),
  statusLabelId: z.string().optional(),
  entranceFeeEn: z.string().optional(),
  entranceFeeId: z.string().optional(),
  latitude: optionalCoordinate,
  longitude: optionalCoordinate,
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export type DestinationInput = z.infer<typeof destinationSchema>;
