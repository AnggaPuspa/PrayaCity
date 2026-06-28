"use client";

import { useActionState } from "react";
import { submitContactAction } from "../actions/submit-contact.action";
import { initialContactFormState, type ContactFormState } from "../types";

/**
 * Controller: binds the server action to React's `useActionState`, exposing
 * a clean `{ state, formAction, isPending }` contract to the view. All the
 * wiring lives here, keeping the form component declarative.
 */
export function useContactForm() {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactAction, initialContactFormState);

  return { state, formAction, isPending };
}
