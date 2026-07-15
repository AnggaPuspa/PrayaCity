"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { logoutAction } from "@/features/auth/actions/auth.actions";

export function AdminSidebar() {
  const pathname = usePathname();
  const locale = useLocale();

  const links = [
    { name: "Dashboard", href: `/${locale}/admin` },
    { name: "Events", href: `/${locale}/admin/events` },
    { name: "Destinations", href: `/${locale}/admin/destinations` },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen shadow-xl">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          PrayaAdmin
        </h2>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
