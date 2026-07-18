"use server";

import { chatRequestSchema } from "../schemas/chat.schema";
import { generateChatReply } from "../services/chat.service";

export type ChatActionResult =
  | { ok: true; reply: string }
  | { ok: false; error: string };

function mapProviderError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.message;

  if (message.includes("DASHSCOPE_API_KEY")) {
    return "Chat is not configured yet. Add DASHSCOPE_API_KEY to .env and restart the dev server.";
  }

  const statusValue = (error as unknown as { status?: unknown }).status;
  const status = typeof statusValue === "number" ? statusValue : undefined;

  if (status === 401 || /incorrect api key|invalid_api_key|unauthorized|must start with sk-/i.test(message)) {
    return "Invalid DashScope API key. Set DASHSCOPE_API_KEY to a key that starts with sk- (Model Studio), match intl/china base URL, then restart npm run dev.";
  }

  if (status === 404 || /model.*not.*found|does not exist/i.test(message)) {
    return "Qwen model not found for this region. Check QWEN_MODEL (e.g. qwen-plus) and DASHSCOPE_BASE_URL region.";
  }

  if (status === 429 || /rate.?limit|throttl/i.test(message)) {
    return "Too many requests to the AI model. Wait a moment and try again.";
  }

  if (status === 400) {
    return "The AI request was rejected. Try a shorter question.";
  }

  return "Something went wrong talking to the AI. Please try again.";
}

/**
 * Server Action: validate → generate grounded reply → return serializable state.
 */
export async function sendChatMessageAction(input: unknown): Promise<ChatActionResult> {
  const parsed = chatRequestSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid request.",
    };
  }

  try {
    const reply = await generateChatReply({
      message: parsed.data.message,
      locale: parsed.data.locale,
      history: parsed.data.history,
    });

    return { ok: true, reply };
  } catch (error) {
    return { ok: false, error: mapProviderError(error) };
  }
}
