import "server-only";
import { prisma } from "@/lib/prisma";

// Re-export cross-cutting audit logger from its canonical location.
export { writeAuditLog } from "@/lib/audit/write-audit-log";

export async function getAuditLogs(limit: number = 50) {
  return await prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
          role: true,
        },
      },
    },
  });
}
