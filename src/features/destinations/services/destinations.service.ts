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
  };
}

// ──────────────────────────────────────────
// ADMIN CRUD OPERATIONS
// ──────────────────────────────────────────

import type { DestinationInput } from "../schemas/destination.schema";

export async function getAdminDestinations() {
  return await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminDestinationById(id: string) {
  return await prisma.destination.findUnique({
    where: { id },
  });
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
