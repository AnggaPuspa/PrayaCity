"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAdminLayout } from "@/hooks";
import { cn } from "@/lib/utils/cn";

interface AdminSidebarProps {
  logoutAction: () => void;
}

export function AdminSidebar({ logoutAction }: AdminSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Admin.nav");
  const { isSidebarCollapsed } = useAdminLayout();

  const sections = [
    {
      title: t("overview"),
      links: [
        {
          name: t("dashboard"),
          href: `/${locale}/admin`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9"></rect>
              <rect x="14" y="3" width="7" height="5"></rect>
              <rect x="14" y="12" width="7" height="9"></rect>
              <rect x="3" y="16" width="7" height="5"></rect>
            </svg>
          ),
        },
      ],
    },
    {
      title: t("pages"),
      links: [
        {
          name: t("destinations"),
          href: `/${locale}/admin/destinations`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          ),
        },
        {
          name: t("events"),
          href: `/${locale}/admin/events`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          ),
        },
        {
          name: t("categories"),
          href: `/${locale}/admin/categories`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          ),
        },
      ],
    },
    {
      title: t("assets"),
      links: [
        {
          name: t("media"),
          href: `/${locale}/admin/media`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          ),
        },
      ],
    },
    {
      title: t("administration"),
      links: [
        {
          name: t("auditLog"),
          href: `/${locale}/admin/audit-log`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          ),
        },
        {
          name: t("settings"),
          href: `/${locale}/admin/settings`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out z-30 h-full shrink-0",
        isSidebarCollapsed ? "w-[80px]" : "w-[260px]",
      )}
    >
      <div
        className={cn(
          "h-[70px] flex items-center border-b border-gray-100 shrink-0",
          isSidebarCollapsed ? "justify-center px-0" : "px-6",
        )}
      >
        <Link href={`/${locale}/admin`} className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 relative shrink-0">
            <Image
              src="/Desain%20tanpa%20judul%20(3).svg"
              alt="Praya City"
              fill
              className="object-contain"
            />
          </div>
          {!isSidebarCollapsed && (
            <span className="font-bold text-xl tracking-tight text-[#0f172a] whitespace-nowrap">
              rayaCity
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto overflow-x-hidden">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={cn(
              "mb-6",
              isSidebarCollapsed ? "flex flex-col items-center" : "",
            )}
          >
            {isSidebarCollapsed ? (
              <div className="text-gray-400 mb-4 tracking-widest text-lg leading-none">
                ...
              </div>
            ) : (
              <h3 className="px-3 text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}

            <div className="space-y-1 w-full">
              {section.links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== `/${locale}/admin` &&
                    pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={isSidebarCollapsed ? link.name : undefined}
                    className={cn(
                      "flex items-center rounded-lg transition-all duration-200",
                      isSidebarCollapsed
                        ? "justify-center py-3 w-12 h-12 mx-auto"
                        : "gap-3 px-3 py-2.5 w-full",
                      isActive
                        ? "bg-[#1e4db7] text-white shadow-md shadow-blue-500/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#1e4db7]",
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 flex items-center justify-center",
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-[#1e4db7]",
                      )}
                    >
                      {link.icon}
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="font-medium text-sm whitespace-nowrap overflow-hidden">
                        {link.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-100 bg-white">
        <form action={logoutAction}>
          <button
            type="submit"
            title={isSidebarCollapsed ? t("logout") : undefined}
            className={cn(
              "flex items-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
              isSidebarCollapsed
                ? "justify-center py-3 w-12 h-12 mx-auto"
                : "justify-center gap-2 px-4 py-2.5 w-full text-sm font-medium",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {!isSidebarCollapsed && t("logout")}
          </button>
        </form>
      </div>
    </aside>
  );
}
