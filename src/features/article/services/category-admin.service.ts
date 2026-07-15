import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * Service for category CRUD operations used by category.actions.ts.
 * All prisma calls for categories live here.
 */

export async function findCategoryByName(name: string) {
  return await prisma.category.findUnique({
    where: { name },
  });
}

export async function findCategoryByNameExcluding(name: string, excludeId: string) {
  return await prisma.category.findFirst({
    where: {
      name,
      id: { not: excludeId },
    },
  });
}

export async function createCategory(name: string) {
  return await prisma.category.create({
    data: { name },
  });
}

export async function updateCategory(id: string, name: string) {
  return await prisma.category.update({
    where: { id },
    data: { name },
  });
}

export async function findCategoryWithEventCount(id: string) {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: { events: true },
      },
    },
  });
}

export async function deleteCategory(id: string) {
  return await prisma.category.delete({
    where: { id },
  });
}
