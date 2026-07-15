"use client";

import { LanguageSwitcher } from "@/components/molecules";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle could go here */}
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Content Management System
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <LanguageSwitcher isScrolled={true} />
        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            A
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-gray-700 leading-none">Admin User</span>
            <span className="text-xs text-gray-500 mt-1">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
