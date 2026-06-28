import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50",
      h2: "text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",
      h3: "text-xl font-semibold text-zinc-950 dark:text-zinc-50",
      body: "text-base leading-7 text-zinc-700 dark:text-zinc-300",
      muted: "text-sm text-zinc-500 dark:text-zinc-400",
    },
  },
  defaultVariants: { variant: "body" },
});

type TypographyElement = "h1" | "h2" | "h3" | "p" | "span";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** The HTML element to render. Defaults to `p`. */
  as?: TypographyElement;
}

/** Atom: consistent text styling decoupled from the rendered element. */
export function Typography({
  as: Tag = "p",
  variant,
  className,
  ...props
}: TypographyProps) {
  return (
    <Tag className={cn(typographyVariants({ variant }), className)} {...props} />
  );
}

export { typographyVariants };
