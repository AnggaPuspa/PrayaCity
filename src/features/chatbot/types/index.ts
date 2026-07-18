export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatHistoryItem {
  role: ChatRole;
  content: string;
}

export type ChatSendStatus = "idle" | "loading" | "error";

export interface ChatbotLabels {
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  thinking: string;
  emptyHint: string;
  errorGeneric: string;
  openAria: string;
  closeAria: string;
  suggestions: string[];
}
