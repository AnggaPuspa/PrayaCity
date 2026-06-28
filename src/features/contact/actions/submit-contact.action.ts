"use server";

import { contactSchema, type ContactInput } from "../schemas/contact.schema";
import { saveContactMessage } from "../services/contact.service";
import type { ContactFormState } from "../types";

/**
 * Server Action: the orchestration layer. It (1) validates input with the
 * schema, (2) delegates persistence to the service, (3) returns a serializable
 * state for the UI. It contains NO UI code and NO direct DB code.
 */
export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  try {
    await saveContactMessage(parsed.data);
    return { status: "success", message: "Thanks! We'll be in touch soon." };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
