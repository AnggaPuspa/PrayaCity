import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/** Atom: an accessible form label. */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";
