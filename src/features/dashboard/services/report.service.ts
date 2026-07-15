import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * Service for dashboard report data access.
 * Used by dashboard.actions.ts for CSV report generation.
 */

export async function getReportStats() {
  const totalEvents = await prisma.event.count();
  const publishedEvents = await prisma.event.count({ where: { status: "PUBLISHED" } });

  const totalDestinations = await prisma.destination.count();
  const publishedDestinations = await prisma.destination.count({ where: { status: "PUBLISHED" } });

  return {
    totalEvents,
    publishedEvents,
    totalDestinations,
    publishedDestinations,
  };
}
