import "server-only";

import { prisma } from "@/lib/prisma";
import type { Article, RelatedArticle } from "../types";

type Lang = "en" | "id";
const lang = (locale: string): Lang => (locale === "id" ? "id" : "en");

export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<Article> {
  const l = lang(locale);
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { categories: { include: { category: true } } },
  });

  if (!event) {
    throw new Error(`Article not found: ${slug}`);
  }

  return {
    id: event.slug,
    slug: event.slug,
    category: event.categories.map(c => c.category.name).join(" | "),
    title: l === "id" ? event.titleId : event.titleEn,
    publishedAt: l === "id" ? event.dateId : event.dateEn,
    heroImage: event.image,
    paragraphs: l === "id" ? event.bodyId : event.bodyEn,
  };
}

export async function getRelatedArticles(
  locale: string,
  excludeSlug?: string,
): Promise<RelatedArticle[]> {
  const l = lang(locale);

  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      ...(excludeSlug ? { slug: { not: excludeSlug } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { categories: { include: { category: true } } },
  });

  return events.map((e) => ({
    slug: e.slug,
    category: e.categories[0]?.category.name ?? "",
    title: l === "id" ? e.titleId : e.titleEn,
    publishedAt: l === "id" ? e.dateId : e.dateEn,
    image: e.image,
  }));
}
