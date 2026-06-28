"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

const LOCALES = [
  { value: "en", label: "EN" },
  { value: "id", label: "ID" },
] as const;

interface LanguageSwitcherProps {
  /** Matches the header's scrolled state so colors stay in sync. */
  isScrolled: boolean;
}

/**
 * Molecule: switches the active locale while preserving the current pathname.
 * Styling mirrors the header so the look is unchanged; only behaviour is added.
 */
export function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {LOCALES.map(({ value, label }) => {
        const active = value === locale;
        return (
          <button
            key={value}
            type="button"
            onClick={() => router.replace(pathname, { locale: value })}
            className={cn(
              "cursor-pointer border-0 bg-transparent pb-1",
              active && isScrolled && "border-b-2 border-blue-600 text-zinc-600",
              active && !isScrolled && "border-b-2 border-blue-400 text-blue-400",
              !active && isScrolled && "text-zinc-600",
              !active && !isScrolled && "opacity-70",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
