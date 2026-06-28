"use client";

import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { LanguageSwitcher } from "@/components/molecules";
import { siteConfig } from "@/config/site";
import { useScroll } from "@/hooks";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * Organism: the global site header.
 * Composes atoms + molecules + locale-aware links. Nav labels come from the
 * `Nav` message namespace; structure/styling are unchanged.
 */
export function SiteHeader() {
  const isScrolled = useScroll(10);
  const t = useTranslations("Nav");

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        isScrolled
          ? "bg-white text-zinc-950 shadow-sm"
          : "bg-transparent text-white"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2">
          <Typography as="span" variant="h3" className={cn(
            "font-bold tracking-tight",
            !isScrolled ? "text-white" : "text-zinc-950 dark:text-zinc-950"
          )}>
            {siteConfig.name}
          </Typography>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = item.key === "home";
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
        <LanguageSwitcher isScrolled={isScrolled} />
      </div>
    </header>
  );
}
