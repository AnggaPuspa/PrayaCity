import { getTranslations, getLocale } from "next-intl/server";
import { getMapExplorerDestinations } from "@/features/destinations";
import type { MapSpot } from "../types";
import { MapExplorerInteractive } from "./map-explorer-interactive";

/**
 * Server container: loads published destinations with coordinates from DB,
 * then hands them to the interactive map client boundary.
 * Heading/intro stay in i18n; pin content is no longer hardcoded.
 */
export async function MapExplorerSection() {
  const t = await getTranslations("MapExplorer");
  const locale = await getLocale();
  const destinations = await getMapExplorerDestinations(locale, 12);

  const spots: MapSpot[] = destinations.map((d) => ({
    id: d.id,
    title: d.title,
    subtitle: d.subtitle,
    description: d.description,
    tag: d.tag,
    image: d.image,
    href: d.href,
    latitude: d.latitude,
    longitude: d.longitude,
    region: d.region,
    iconType: d.iconType,
  }));

  if (spots.length === 0) return null;

  return (
    <MapExplorerInteractive
      spots={spots}
      labels={{
        eyebrow: t("eyebrow"),
        heading: t.rich("heading", {
          blue: (chunks) => <span className="text-[#0066FF]">{chunks}</span>,
          br: () => <br />,
        }),
        intro: t.rich("intro", {
          br: () => <br />,
        }),
        explore: t("explore"),
        openSpot: t("openSpot"),
        prev: t("prev"),
        next: t("next"),
        pinHint: t("pinHint"),
      }}
    />
  );
}
