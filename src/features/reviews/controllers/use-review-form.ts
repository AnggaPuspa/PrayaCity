"use client";

import { useActionState } from "react";
import { submitReviewAction } from "../actions/submit-review.action";
import { initialReviewFormState, type ReviewFormState } from "../types";

/**
 * Controller: binds the server action to React's `useActionState`, exposing
 * a clean `{ state, formAction, isPending }` contract to the view.
 */
export function useReviewForm() {
  const [state, formAction, isPending] = useActionState<
    ReviewFormState,
    FormData
  >(submitReviewAction, initialReviewFormState);

  return { state, formAction, isPending };
}
