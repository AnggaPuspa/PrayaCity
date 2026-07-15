import "server-only";
import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { events: true }
      }
    }
  });
}

export async function getCategoryById(id: string) {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: { events: true }
      }
    }
  });
}
