import "server-only";

import { prisma } from "@/lib/prisma";
import type { DestinationCategory } from "../types";

type Lang = "en" | "id";
const lang = (locale: string): Lang => (locale === "id" ? "id" : "en");

export async function getDestinations(locale: string) {
  const l = lang(locale);
  const items = await prisma.destination.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "desc" },
  });

  return items.map((item) => ({
    id: item.slug,
    imageSrc: item.imageSrc,
    detailImageSrc: item.detailImageSrc ?? undefined,
    tags: item.tags as Exclude<DestinationCategory, "All">[],
    title: l === "id" ? item.titleId : item.titleEn,
    description: l === "id" ? item.descriptionId : item.descriptionEn,
  }));
}

/**
 * Featured / popular destinations for the home "Must-Visit" carousel.
 * Prefers `isFeatured`, then falls back by sortOrder so the section
 * never goes empty when nothing is marked featured yet.
 */
export async function getMustVisitDestinations(locale: string, limit = 8) {
  const l = lang(locale);
  const items = await prisma.destination.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "desc" }, { createdAt: "desc" }],
    take: limit,
  });

  return items.map((item) => ({
    id: item.slug,
    title: l === "id" ? item.titleId : item.titleEn,
    description: l === "id" ? item.descriptionId : item.descriptionEn,
    image: item.imageSrc,
    href: `/destinations/${item.slug}`,
  }));
}

export async function getDestinationBySlug(slug: string, locale: string) {
  const l = lang(locale);
  const item = await prisma.destination.findUnique({
    where: { slug, status: "PUBLISHED" },
  });

  if (!item) return null;

  return {
    id: item.slug,
    imageSrc: item.imageSrc,
    detailImageSrc: item.detailImageSrc ?? undefined,
    tags: item.tags as Exclude<DestinationCategory, "All">[],
    title: l === "id" ? item.titleId : item.titleEn,
    longDescription: (l === "id" ? item.longDescriptionId : item.longDescriptionEn) ?? "",
    location: (l === "id" ? item.locationId : item.locationEn) ?? "",
    status: (l === "id" ? item.statusLabelId : item.statusLabelEn) ?? "",
    entranceFee: (l === "id" ? item.entranceFeeId : item.entranceFeeEn) ?? "",
    latitude: item.latitude,
    longitude: item.longitude,
  };
}

/**
 * Destinations with coordinates for the map explorer section
 * (history page + home). Skips rows without lat/lng.
 */
export async function getMapExplorerDestinations(locale: string, limit = 12) {
  const l = lang(locale);
  const items = await prisma.destination.findMany({
    where: {
      status: "PUBLISHED",
      latitude: { not: null },
      longitude: { not: null },
    },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "desc" }, { createdAt: "desc" }],
    take: limit,
    select: {
      slug: true,
      imageSrc: true,
      titleEn: true,
      titleId: true,
      descriptionEn: true,
      descriptionId: true,
      locationEn: true,
      locationId: true,
      tags: true,
      latitude: true,
      longitude: true,
    },
  });

  return items.map((item) => {
    const tags = item.tags as string[];
    const primaryTag = tags[0] ?? "";
    return {
      id: item.slug,
      title: l === "id" ? item.titleId : item.titleEn,
      subtitle:
        (l === "id" ? item.locationId : item.locationEn) ||
        (l === "id" ? item.descriptionId : item.descriptionEn),
      description: l === "id" ? item.descriptionId : item.descriptionEn,
      tag: primaryTag,
      image: item.imageSrc,
      href: `/destinations/${item.slug}`,
      latitude: item.latitude as number,
      longitude: item.longitude as number,
      region: primaryTag.toLowerCase() || "center",
      iconType: mapTagToIconType(tags),
    };
  });
}

function mapTagToIconType(tags: string[]): "city" | "sea" | "hill" | "culture" {
  const normalized = tags.map((t) => t.toLowerCase());
  if (normalized.some((t) => t.includes("beach") || t.includes("pantai") || t.includes("sea"))) {
    return "sea";
  }
  if (normalized.some((t) => t.includes("hill") || t.includes("bukit") || t.includes("nature"))) {
    return "hill";
  }
  if (
    normalized.some(
      (t) =>
        t.includes("heritage") ||
        t.includes("culture") ||
        t.includes("budaya") ||
        t.includes("desa"),
    )
  ) {
    return "culture";
  }
  return "city";
}

// ──────────────────────────────────────────────────────────
// ADMIN CRUD OPERATIONS
// ──────────────────────────────────────────────────────────

import type { DestinationInput } from "../schemas/destination.schema";

/** Plain JSON-safe shape for admin client components (no Date instances). */
function serializeAdminDestination<T extends {
  createdAt: Date;
  updatedAt: Date;
  latitude: number | null;
  longitude: number | null;
}>(item: T) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    // Keep numbers; null stays null — never pass Decimal/Date to the client.
    latitude: item.latitude,
    longitude: item.longitude,
  };
}

export async function getAdminDestinations() {
  const items = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });
  return items.map(serializeAdminDestination);
}

export async function getAdminDestinationById(id: string) {
  const item = await prisma.destination.findUnique({
    where: { id },
  });
  if (!item) return null;
  return serializeAdminDestination(item);
}
export async function createDestination(data: DestinationInput) {
  return await prisma.destination.create({
    data: {
      ...data,
    },
  });
}

export async function updateDestination(id: string, data: Partial<DestinationInput>) {
  return await prisma.destination.update({
    where: { id },
    data,
  });
}

export async function deleteDestination(id: string) {
  return await prisma.destination.delete({ where: { id } });
}
