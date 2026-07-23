import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArNavigate } from "@/features/ar-navigate";

export const metadata: Metadata = {
  title: "Navigasi AR | Praya City",
  description: "Navigasi augmented reality ke destinasi wisata di Praya City.",
};

/**
 * AR Navigation — fullscreen demo page.
 * Outside (marketing) so it skips PageShell header/footer and page-enter
 * transform (which would trap position:fixed to a zero-height parent).
 */
export default async function ArNavigatePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArNavigate />;
}
