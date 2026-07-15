import "server-only";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function writeAuditLog(params: {
  userId: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: any;
}) {
  const h = await headers();

  prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      metadata: params.metadata ?? undefined,
      ipAddress: h.get("x-forwarded-for") ?? h.get("x-real-ip"),
      userAgent: h.get("user-agent"),
    },
  }).catch(console.error);
}
