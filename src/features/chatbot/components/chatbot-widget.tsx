import { getTranslations } from "next-intl/server";
import { ChatbotClient } from "./chatbot-client";

interface ChatbotWidgetProps {
  locale: string;
}

/**
 * Server container: loads i18n labels, hands off to client chat UI.
 * Mounted on marketing layout so it is available site-wide.
 */
export async function ChatbotWidget({ locale }: ChatbotWidgetProps) {
  const t = await getTranslations("Chatbot");
  const resolvedLocale = locale === "id" ? "id" : "en";

  return (
    <ChatbotClient
      locale={resolvedLocale}
      labels={{
        title: t("title"),
        subtitle: t("subtitle"),
        placeholder: t("placeholder"),
        send: t("send"),
        thinking: t("thinking"),
        emptyHint: t("emptyHint"),
        errorGeneric: t("errorGeneric"),
        openAria: t("openAria"),
        closeAria: t("closeAria"),
        suggestions: t.raw("suggestions") as string[],
      }}
    />
  );
}
