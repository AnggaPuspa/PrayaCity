"use client";

import { useCallback, useRef, useState } from "react";
import { sendChatMessageAction } from "../actions/send-chat-message.action";
import type { ChatHistoryItem, ChatMessage, ChatSendStatus } from "../types";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface UseChatbotControllerParams {
  locale: "en" | "id";
}

/**
 * Client controller: owns chat UI state + send handler.
 * The view stays presentational.
 */
export function useChatbotController({ locale }: UseChatbotControllerParams) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatSendStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const sendingRef = useRef(false);

  const sendMessage = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text || sendingRef.current) return;

      sendingRef.current = true;
      setError(null);
      setStatus("loading");

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content: text,
      };

      const history: ChatHistoryItem[] = [...messages, userMessage]
        .slice(-10)
        .map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      try {
        const result = await sendChatMessageAction({
          message: text,
          locale,
          history: history.slice(0, -1),
        });

        if (!result.ok) {
          setError(result.error);
          setStatus("error");
          return;
        }

        setMessages((prev) => [
          ...prev,
          { id: createId(), role: "assistant", content: result.reply },
        ]);
        setStatus("idle");
      } catch {
        setError("Something went wrong. Please try again.");
        setStatus("error");
      } finally {
        sendingRef.current = false;
      }
    },
    [input, locale, messages],
  );

  return {
    isOpen,
    setIsOpen,
    input,
    setInput,
    messages,
    status,
    error,
    sendMessage,
    isLoading: status === "loading",
  };
}
