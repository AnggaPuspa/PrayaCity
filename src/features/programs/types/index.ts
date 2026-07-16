import type { ContactFormState } from "@/features/contact";

/** Props returned by useProgramsContactController. */
export interface ProgramsContactFormController {
  state: ContactFormState;
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

/** Translated content passed to the contact view. */
export interface ProgramsContactContent {
  title: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
  sending: string;
}

/** Single tab data shape for the programs tabs section. */
export interface ProgramsTabData {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
  }[];
}
