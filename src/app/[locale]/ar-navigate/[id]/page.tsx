import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArNavigate, DEFAULT_AR_DESTINATION } from "@/features/ar-navigate";
import { getDestinationBySlug } from "@/features/destinations/services/destinations.service";

export const metadata: Metadata = {
  title: "Navigasi AR | Praya City",
  description: "Navigasi augmented reality ke destinasi wisata di Praya City.",
};

/**
 * AR Navigation — fullscreen hybrid camera + mini-map.
 * Outside (marketing) so it skips PageShell header/footer and page-enter
 * transform (which would trap position:fixed to a zero-height parent).
 */
export default async function ArNavigatePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await getDestinationBySlug(id, locale).catch(() => null);

  const destination =
    item &&
    typeof item.latitude === "number" &&
    typeof item.longitude === "number" &&
    Number.isFinite(item.latitude) &&
    Number.isFinite(item.longitude)
      ? {
          id: item.id,
          title: item.title,
          imageSrc: item.detailImageSrc || item.imageSrc,
          subtitle: item.location || "Destinasi unggulan di Praya",
          latitude: item.latitude,
          longitude: item.longitude,
        }
      : {
          ...DEFAULT_AR_DESTINATION,
          id: item?.id ?? id,
          title: item?.title ?? DEFAULT_AR_DESTINATION.title,
          imageSrc:
            item?.detailImageSrc ||
            item?.imageSrc ||
            DEFAULT_AR_DESTINATION.imageSrc,
          subtitle: item?.location || DEFAULT_AR_DESTINATION.subtitle,
        };

  return <ArNavigate destination={destination} />;
}
