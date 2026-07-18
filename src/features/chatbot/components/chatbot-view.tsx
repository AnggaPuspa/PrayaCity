"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScroll } from "@/hooks";
import type { ChatMessage, ChatbotLabels } from "../types";
import { ChatMessageContent } from "./chat-message-content";

interface ChatbotViewProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  input: string;
  setInput: (value: string) => void;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (raw?: string) => void;
  labels: ChatbotLabels;
}

/** Past hero (~viewport height) before the floating launcher appears. */
const HERO_SCROLL_THRESHOLD = 420;

export function ChatbotView({
  isOpen,
  setIsOpen,
  input,
  setInput,
  messages,
  isLoading,
  error,
  sendMessage,
  labels,
}: ChatbotViewProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  /** If user scrolls up, don't yank them back down on every token/update. */
  const stickToBottomRef = useRef(true);
  const pastHero = useScroll(HERO_SCROLL_THRESHOLD);
  // Keep the dock visible while a chat is open, even if user scrolls back up.
  const showDock = pastHero || isOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current;
    if (el && stickToBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading, isOpen, error]);

  useEffect(() => {
    if (isOpen) {
      stickToBottomRef.current = true;
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted || !showDock) return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="pointer-events-auto animate-fadeIn flex h-[min(78vh,36rem)] w-[min(100vw-2.5rem,24rem)] flex-col overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white text-[#18181B] shadow-[0_8px_28px_rgba(24,24,27,0.12)]">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-100 bg-white px-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium tracking-tight text-zinc-900">
                {labels.title}
              </p>
              <p className="mt-0.5 truncate text-[12px] text-zinc-500">{labels.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              aria-label={labels.closeAria}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2.5 2.5l7 7M9.5 2.5l-7 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            ref={listRef}
            onScroll={() => {
              const el = listRef.current;
              if (!el) return;
              const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
              stickToBottomRef.current = distanceFromBottom < 48;
            }}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3 [scrollbar-width:thin] [scrollbar-color:rgba(24,24,27,0.25)_transparent]"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-[13px] leading-relaxed text-zinc-500">{labels.emptyHint}</p>
                <div className="flex flex-wrap gap-2">
                  {labels.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      disabled={isLoading}
                      className="rounded-full border border-zinc-200 px-3 py-1.5 text-left text-[12px] text-zinc-700 transition-colors hover:border-[#0066FF]/40 hover:text-[#0066FF] disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#0066FF] text-white"
                      : "bg-zinc-100 text-zinc-800"
                  }`}
                >
                  <ChatMessageContent content={msg.content} variant={msg.role} />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-zinc-100 px-3.5 py-2.5 text-[13px] text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400"
                      style={{ animationDelay: "120ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400"
                      style={{ animationDelay: "240ms" }}
                    />
                    <span className="ml-1">{labels.thinking}</span>
                  </span>
                </div>
              </div>
            )}

            {error && (
              <p className="text-[12px] leading-relaxed text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>

          <form
            className="shrink-0 border-t border-zinc-100 bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              stickToBottomRef.current = true;
              sendMessage();
            }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 focus-within:border-[#0066FF]/50 focus-within:bg-white">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={labels.placeholder}
                disabled={isLoading}
                maxLength={1000}
                className="min-w-0 flex-1 bg-transparent px-1.5 py-2 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF] px-3.5 text-[12px] font-medium text-white transition-opacity disabled:opacity-40"
              >
                {labels.send}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? labels.closeAria : labels.openAria}
        className="pointer-events-auto animate-chatDropIn h-[4.75rem] w-[4.75rem] origin-bottom border-0 bg-transparent p-0 transition-transform hover:scale-[1.03] sm:h-[5.25rem] sm:w-[5.25rem]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF launcher */}
        <img
          src="/Raya.gif"
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </button>
    </div>,
    document.body,
  );
}
