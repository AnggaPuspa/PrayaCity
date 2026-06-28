import type { ContactInput } from "../schemas/contact.schema";

export type { ContactInput };

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level validation errors keyed by input name. */
  errors?: Partial<Record<keyof ContactInput, string>>;
}

export const initialContactFormState: ContactFormState = { status: "idle" };
