import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EventsFeatured, EventsExplore } from "@/features/article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen">
      <EventsFeatured locale={locale} />
      <EventsExplore locale={locale} />
    </div>
  );
}
