import "server-only";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Data-access layer for AdminUser. Actions should call these instead of
 * using prisma directly.
 */

export async function findAdminUserByEmail(email: string) {
  return await prisma.adminUser.findUnique({
    where: { email },
  });
}

export async function findAdminUserById(id: string) {
  return await prisma.adminUser.findUnique({
    where: { id },
  });
}

export async function getAdminUserProfile(id: string) {
  return await prisma.adminUser.findUnique({
    where: { id },
    select: { fullName: true, email: true, role: true },
  });
}

export async function updateAdminUserProfile(id: string, data: { fullName?: string }) {
  return await prisma.adminUser.update({
    where: { id },
    data,
  });
}

export async function updateAdminUserPassword(id: string, hashedPassword: string) {
  return await prisma.adminUser.update({
    where: { id },
    data: { password: hashedPassword },
  });
}

export async function verifyAdminUserPassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
