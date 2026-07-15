import "server-only";
import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const totalEvents = await prisma.event.count();
  const publishedEvents = await prisma.event.count({ where: { status: "PUBLISHED" } });
  
  const totalDestinations = await prisma.destination.count();
  const publishedDestinations = await prisma.destination.count({ where: { status: "PUBLISHED" } });

  const recentLogs = await prisma.auditLog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true }
  });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const recentEvents = await prisma.event.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true }
  });

  const recentDestinations = await prisma.destination.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true }
  });

  const chartData = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split("T")[0];
    const dayName = days[d.getDay()];

    const eventsCount = recentEvents.filter(e => e.createdAt.toISOString().startsWith(dateString)).length;
    const destCount = recentDestinations.filter(e => e.createdAt.toISOString().startsWith(dateString)).length;

    chartData.push({
      name: dayName,
      events: eventsCount,
      destinations: destCount
    });
  }

  return {
    events: { total: totalEvents, published: publishedEvents },
    destinations: { total: totalDestinations, published: publishedDestinations },
    recentLogs,
    chartData
  };
}
