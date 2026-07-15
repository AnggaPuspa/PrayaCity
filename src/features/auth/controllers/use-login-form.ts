"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth.actions";
import { initialAuthFormState, type AuthFormState } from "../types";

export function useLoginForm() {
  const [state, formAction, isPending] = useActionState<
    AuthFormState,
    FormData
  >(loginAction, initialAuthFormState);

  return { state, formAction, isPending };
}
