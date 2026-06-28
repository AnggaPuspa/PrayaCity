import { Typography } from "@/components/atoms";
import { siteConfig } from "@/config/site";

/** Organism: the global site footer. */
export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 sm:flex-row">
        <Typography variant="muted">
          &copy; {siteConfig.name}. Built with Next.js.
        </Typography>
        <Typography variant="muted">
          Atomic Design &middot; Feature-Sliced Logic
        </Typography>
      </div>
    </footer>
  );
}
