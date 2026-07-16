/**
 * Controller for the Programs Contact form.
 * Wraps the shared useContactForm hook from the contact feature.
 * Presentational component receives everything via props from here.
 */

import { useContactForm } from "@/features/contact";
import type { ProgramsContactFormController } from "../types";

export function useProgramsContactController(): ProgramsContactFormController {
  const { state, formAction, isPending } = useContactForm();

  return { state, formAction, isPending };
}
