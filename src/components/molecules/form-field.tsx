import * as React from "react";
import { Label } from "@/components/atoms";
import { cn } from "@/lib/utils/cn";

interface FormFieldProps {
  /** Visible label text. */
  label: string;
  /** Must match the `id` of the control passed as children. */
  htmlFor: string;
  /** Validation error to surface below the control. */
  error?: string;
  /** Optional helper text shown when there is no error. */
  hint?: string;
  className?: string;
  /** The form control (an atom such as Input or Textarea). */
  children: React.ReactNode;
}

/**
 * Molecule: composes a Label + control + validation message.
 * Depends ONLY on atoms — never on organisms or features.
 */
export function FormField({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
