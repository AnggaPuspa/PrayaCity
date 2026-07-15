"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { useAdminLayout } from "@/hooks";

export function AdminHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { toggleSidebar } = useAdminLayout();
  
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20 sticky top-0">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <button className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <div className="hidden lg:flex items-center gap-6 ml-4 text-[15px] text-gray-600 font-medium">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="/admin/events" className="hover:text-blue-600 transition-colors">Events</Link>
          <Link href="/admin/destinations" className="hover:text-blue-600 transition-colors">Destinations</Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        {/* Language Switcher Dropdown */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-colors overflow-hidden border border-gray-100",
              langOpen ? "bg-gray-100" : "hover:bg-gray-50"
            )}
          >
            {locale === 'en' ? (
              <img src="https://flagcdn.com/w40/gb.png" alt="English" className="w-5 h-5 object-cover rounded-full" />
            ) : (
              <img src="https://flagcdn.com/w40/id.png" alt="Indonesian" className="w-5 h-5 object-cover rounded-full" />
            )}
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <button 
                onClick={() => switchLanguage('en')}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-colors text-[14px] text-gray-700"
              >
                <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="w-5 h-5 object-cover rounded-full shadow-sm" />
                English (UK)
              </button>
              <button 
                onClick={() => switchLanguage('id')}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-colors text-[14px] text-gray-700"
              >
                <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 h-5 object-cover rounded-full shadow-sm" />
                Bahasa Indonesia
              </button>
            </div>
          )}
        </div>

        {/* Notifications (Bell) */}
        <button className="text-gray-500 hover:text-gray-900 transition-colors relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {/* Blue dot indicator */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
        </button>

        {/* Separator */}
        <div className="w-[1px] h-8 bg-gray-200 hidden sm:block mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center border border-blue-100 shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-[14px] text-gray-600">Hi,</span>
            <span className="text-[14px] font-semibold text-gray-900">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
