import "server-only";
import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const totalEvents = await prisma.event.count();
  const publishedEvents = await prisma.event.count({ where: { status: "PUBLISHED" } });
  
  const totalDestinations = await prisma.destination.count();
  const publishedDestinations = await prisma.destination.count({ where: { status: "PUBLISHED" } });

  return {
    events: { total: totalEvents, published: publishedEvents },
    destinations: { total: totalDestinations, published: publishedDestinations }
  };
}
