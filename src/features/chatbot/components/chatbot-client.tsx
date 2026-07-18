"use client";

import { usePathname } from "@/i18n/navigation";
import { useChatbotController } from "../controllers/use-chatbot-controller";
import type { ChatbotLabels } from "../types";
import { ChatbotView } from "./chatbot-view";

interface ChatbotClientProps {
  locale: "en" | "id";
  labels: ChatbotLabels;
}

/**
 * Client container: wires controller into the presentational chat view.
 * Hidden on destination detail pages so it doesn't collide with the weather dock.
 */
export function ChatbotClient({ locale, labels }: ChatbotClientProps) {
  const pathname = usePathname();
  const controller = useChatbotController({ locale });

  // next-intl pathname is without locale prefix, e.g. /destinations/kutaMandalika
  const isDestinationDetail = /^\/destinations\/[^/]+$/.test(pathname);
  if (isDestinationDetail) return null;

  return <ChatbotView {...controller} labels={labels} />;
}
