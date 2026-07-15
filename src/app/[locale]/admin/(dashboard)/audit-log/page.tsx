import type { Metadata } from "next";
import { getAuditLogs, AuditLogTable } from "@/features/audit";

export const metadata: Metadata = {
  title: "Audit Log - Admin Panel",
};

export default async function AuditLogPage() {
  const logs = await getAuditLogs(100);

  return (
    <div className="w-full px-4 py-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Audit Log</h1>
        <p className="text-gray-500">Track all administrative activities and changes across the system</p>
      </div>
      
      <AuditLogTable initialLogs={logs} />
    </div>
  );
}
