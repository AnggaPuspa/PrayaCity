import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/templates";
import { ChatbotWidget } from "@/features/chatbot";

/**
 * Layout for the public marketing route group. `(marketing)` is a route group:
 * it shares this layout without adding a segment to the URL.
 */
export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      {children}
      <ChatbotWidget locale={locale} />
    </PageShell>
  );
}
