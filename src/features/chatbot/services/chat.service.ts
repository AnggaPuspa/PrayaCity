import "server-only";

import { createQwenClient, getQwenModel } from "@/lib/ai/qwen";
import type { ChatHistoryItem } from "../types";
import {
  buildPrayaKnowledgeContext,
  buildSystemPrompt,
} from "./knowledge.service";

interface GenerateReplyParams {
  message: string;
  locale: "en" | "id";
  history: ChatHistoryItem[];
}

/**
 * Orchestrates grounded chat: pack knowledge → system prompt → Qwen (OpenAI SDK).
 */
export async function generateChatReply({
  message,
  locale,
  history,
}: GenerateReplyParams): Promise<string> {
  const knowledge = await buildPrayaKnowledgeContext(locale);
  const system = buildSystemPrompt(locale, knowledge);
  const client = createQwenClient();

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: system },
    ...history.map((h) => ({
      role: h.role as "user" | "assistant",
      content: h.content,
    })),
    { role: "user", content: message },
  ];

  const completion = await client.chat.completions.create({
    model: getQwenModel(),
    temperature: 0.3,
    max_tokens: 700,
    messages,
  });

  const reply = completion.choices[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error("Empty model response.");
  }

  return reply;
}
