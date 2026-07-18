import { z } from "zod";

const historyItemSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

/**
 * Single source of truth for chat request validation.
 * Keeps token usage and prompt-injection surface bounded.
 */
export const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(1000, "Message is too long."),
  locale: z.enum(["en", "id"]).default("en"),
  history: z.array(historyItemSchema).max(12).default([]),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
