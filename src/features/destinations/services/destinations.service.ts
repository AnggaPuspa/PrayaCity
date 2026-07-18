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
