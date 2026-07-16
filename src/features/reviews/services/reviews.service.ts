import "server-only";

import { prisma } from "@/lib/prisma";
import type { ReviewInput } from "../schemas/review.schema";
import type { ReviewItem, ReviewSummary } from "../types";

/** Reviews are anonymous and auto-published, so rate limiting is the only spam guard. */
const COOLDOWN_MS = 60 * 1000; // min gap between any two reviews from the same IP
const MAX_REVIEWS_PER_DESTINATION_PER_DAY = 1; // per IP, per destination
const MAX_REVIEWS_PER_DAY_GLOBAL = 5; // per IP, across all destinations

export async function getReviewsByDestination(
  destinationSlug: string,
): Promise<ReviewItem[]> {
  const reviews = await prisma.review.findMany({
    where: { destinationSlug },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => ({
    id: r.id,
    authorName: r.authorName,
    rating: r.rating,
    comment: r.comment,
    imageUrl: r.imageUrl ?? undefined,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getReviewSummary(
  destinationSlug: string,
): Promise<ReviewSummary> {
  const reviews = await prisma.review.findMany({
    where: { destinationSlug },
    select: { rating: true },
  });

  const distribution: ReviewSummary["distribution"] = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let total = 0;
  for (const { rating } of reviews) {
    const bucket = Math.min(5, Math.max(1, rating)) as 1 | 2 | 3 | 4 | 5;
    distribution[bucket] += 1;
    total += rating;
  }

  const count = reviews.length;
  return {
    average: count > 0 ? Math.round((total / count) * 10) / 10 : 0,
    count,
    distribution,
  };
}

/**
 * Returns an error message if the given IP is currently rate-limited for
 * submitting a review, or `null` if it's allowed to proceed.
 */
export async function checkReviewRateLimit(
  ipAddress: string | null,
  destinationSlug: string,
): Promise<string | null> {
  if (!ipAddress) return null; // can't rate-limit what we can't identify

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [lastAny, sameDestinationCount, globalCount] = await Promise.all([
    prisma.review.findFirst({
      where: { ipAddress },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
    prisma.review.count({
      where: { ipAddress, destinationSlug, createdAt: { gte: since24h } },
    }),
    prisma.review.count({
      where: { ipAddress, createdAt: { gte: since24h } },
    }),
  ]);

  if (lastAny && Date.now() - lastAny.createdAt.getTime() < COOLDOWN_MS) {
    return "You're posting too quickly. Please wait a moment before submitting another review.";
  }

  if (sameDestinationCount >= MAX_REVIEWS_PER_DESTINATION_PER_DAY) {
    return "You've already reviewed this destination recently. Try again tomorrow.";
  }

  if (globalCount >= MAX_REVIEWS_PER_DAY_GLOBAL) {
    return "You've reached the daily review limit. Please try again tomorrow.";
  }

  return null;
}

export async function createReview(
  data: ReviewInput,
  ipAddress: string | null,
) {
  return await prisma.review.create({
    data: {
      destinationSlug: data.destinationSlug,
      authorName: data.authorName,
      rating: data.rating,
      comment: data.comment,
      imageUrl: data.imageUrl || null,
      ipAddress: ipAddress ?? undefined,
    },
  });
}
