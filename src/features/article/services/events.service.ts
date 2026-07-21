import "server-only";

import { prisma } from "@/lib/prisma";
import type { BlogEvent, FeaturedEvent, LatestEvent } from "../types";

type Lang = "en" | "id";
const lang = (locale: string): Lang => (locale === "id" ? "id" : "en");

/**
 * Latest published events for the home page's "Latest from Praya" section.
 * Real data straight from the same `Event` table that backs the Events page —
 * never static/translation-only content.
 */
export async function getLatestEvents(
  locale: string,
  limit = 5,
): Promise<LatestEvent[]> {
  const l = lang(locale);

  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      categories: {
        some: {
          category: { name: "Events" },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { categories: { include: { category: true } } },
  });

  return events.map((e) => ({
    slug: e.slug,
    image: e.image,
    title: l === "id" ? e.titleId : e.titleEn,
    date: l === "id" ? e.dateId : e.dateEn,
    category: e.categories[0]?.category.name ?? "",
  }));
}

export async function getFeaturedEvents(
  locale: string,
): Promise<FeaturedEvent[]> {
  const l = lang(locale);

  const events = await prisma.event.findMany({
    where: { isFeatured: true, status: "PUBLISHED" },
    orderBy: { sortOrder: "desc" },
    take: 3,
    include: { categories: { include: { category: true } } },
  });

  return events.map((e) => ({
    title: l === "id" ? e.titleId : e.titleEn,
    category: e.categories[0]?.category.name ?? "",
    slug: e.slug,
    image: e.image,
  }));
}

export async function getExploreBlogs(locale: string): Promise<BlogEvent[]> {
  const l = lang(locale);

  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { categories: { include: { category: true } } },
  });

  return events.map((e) => ({
    title: l === "id" ? e.titleId : e.titleEn,
    publishedAt: l === "id" ? e.dateId : e.dateEn,
    intro: l === "id" ? e.excerptId : e.excerptEn,
    categories: e.categories.map((c) => c.category.name),
    slug: e.slug,
    image: e.image,
  }));
}

export async function getCategories(): Promise<string[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return categories.map((c) => c.name);
}

// ──────────────────────────────────────────
// ADMIN CRUD OPERATIONS
// ──────────────────────────────────────────

import type { EventInput } from "../schemas/event.schema";

/** Plain JSON-safe shape for admin client components (no Date instances). */
function serializeAdminEvent<T extends { createdAt: Date; updatedAt: Date }>(
  item: T,
) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export async function getAdminEvents() {
  const items = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { categories: { include: { category: true } } },
  });
  return items.map(serializeAdminEvent);
}

export async function getAdminEventById(id: string) {
  const item = await prisma.event.findUnique({
    where: { id },
    include: { categories: { include: { category: true } } },
  });
  if (!item) return null;
  return serializeAdminEvent(item);
}
export async function createEvent(data: EventInput) {
  return await prisma.$transaction(async (tx) => {
    const event = await tx.event.create({
      data: {
        slug: data.slug,
        image: data.image,
        titleEn: data.titleEn,
        titleId: data.titleId,
        excerptEn: data.excerptEn,
        excerptId: data.excerptId,
        bodyEn: data.bodyEn.split("\n\n").filter(Boolean),
        bodyId: data.bodyId.split("\n\n").filter(Boolean),
        dateEn: data.dateEn,
        dateId: data.dateId,
        isFeatured: data.isFeatured,
        status: data.status,
      },
    });

    for (const catName of data.categories) {
      const dbCat = await tx.category.findUnique({ where: { name: catName } });
      if (dbCat) {
        await tx.eventCategory.create({
          data: {
            eventId: event.id,
            categoryId: dbCat.id,
          },
        });
      }
    }

    return event;
  });
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
  return await prisma.$transaction(async (tx) => {
    const updateData: any = { ...data };
    if (data.bodyEn)
      updateData.bodyEn = data.bodyEn.split("\n\n").filter(Boolean);
    if (data.bodyId)
      updateData.bodyId = data.bodyId.split("\n\n").filter(Boolean);
    delete updateData.categories;

    const event = await tx.event.update({
      where: { id },
      data: updateData,
    });

    if (data.categories) {
      await tx.eventCategory.deleteMany({ where: { eventId: id } });
      for (const catName of data.categories) {
        const dbCat = await tx.category.findUnique({
          where: { name: catName },
        });
        if (dbCat) {
          await tx.eventCategory.create({
            data: { eventId: id, categoryId: dbCat.id },
          });
        }
      }
    }
    return event;
  });
}

export async function deleteEvent(id: string) {
  return await prisma.event.delete({ where: { id } });
}
