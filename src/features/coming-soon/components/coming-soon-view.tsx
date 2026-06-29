import { Typography, buttonVariants } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface ComingSoonViewProps {
  title: string;
  description: string;
  backLabel: string;
}

/**
 * Presentational "page under development" placeholder. Dark background so the
 * transparent site header stays readable at the top of the page.
 */
export function ComingSoonView({
  title,
  description,
  backLabel,
}: ComingSoonViewProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#0A1128] px-5 py-32 text-center text-white">
      <span className="mb-6 text-6xl" aria-hidden>
        🚧
      </span>
      <Typography
        as="h1"
        variant="h1"
        className="mb-4 text-white text-3xl md:text-5xl"
      >
        {title}
      </Typography>
      <p className="mb-8 max-w-md text-[15px] leading-7 text-white/70">
        {description}
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
        {backLabel}
      </Link>
    </section>
  );
}
