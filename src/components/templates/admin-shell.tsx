import { AdminSidebar } from "../organisms/admin-sidebar";
import { AdminHeader } from "../organisms/admin-header";
import { AdminLayoutProvider } from "@/hooks";
import { logoutAction } from "@/features/auth";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutProvider>
      <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
        <AdminSidebar logoutAction={logoutAction} />
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          <AdminHeader />
          <main 
            className="flex-1 overflow-y-auto p-6 md:p-8 min-h-0"
            data-lenis-prevent
          >
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminLayoutProvider>
  );
}
