"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { LanguageSwitcher } from "@/components/molecules";
import { siteConfig } from "@/config/site";
import { useScroll } from "@/hooks";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * Organism: the global site header.
 * Desktop layout is unchanged; a hamburger menu is layered on for < md only.
 */
export function SiteHeader() {
  const isScrolled = useScroll(10);
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // On mobile, an open menu forces the light (solid) header treatment.
  const solid = isScrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        solid ? "bg-white text-zinc-950 shadow-sm" : "bg-transparent text-white"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <Typography as="span" variant="h3" className={cn(
            "font-bold tracking-tight",
            !solid ? "text-white" : "text-zinc-950 dark:text-zinc-950"
          )}>
            {siteConfig.name}
          </Typography>
        </Link>

        {/* Desktop nav (unchanged) */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : !item.href.includes("#") && pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-70 flex items-center gap-1",
                  isActive && !isScrolled ? "border-b-2 border-blue-400 text-blue-400 pb-1" : "",
                  isActive && isScrolled ? "border-b-2 border-blue-600 text-zinc-600 pb-1" : "",
                  !isActive && isScrolled ? "text-zinc-600" : "",
                  !isActive && !isScrolled ? "opacity-90" : ""
                )}
              >
                {t(item.key)}
                {item.key === "destinations" && (
                  <span className="text-xs">▼</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher isScrolled={solid} />
          {/* Hamburger — only shown below md, so desktop is untouched */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel — md:hidden, so it never renders on desktop */}
      {menuOpen && (
        <nav className="border-t border-zinc-200 bg-white text-zinc-900 md:hidden">
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-5 py-2">
            {siteConfig.nav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base font-medium text-zinc-800 transition-colors hover:text-blue-600"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
