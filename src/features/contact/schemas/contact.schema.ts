import { z } from "zod";

/**
 * Validation lives in its own layer so the SAME schema can be reused by the
 * server action, client-side checks, and tests — a single source of truth.
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
