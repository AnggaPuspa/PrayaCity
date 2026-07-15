import "server-only";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Cross-cutting audit logger used by multiple features (article, auth, dashboard).
 * Lives in `lib/` because it is a shared infrastructure concern, not owned by one feature.
 */
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
