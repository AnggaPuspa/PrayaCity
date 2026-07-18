import { getTranslations } from "next-intl/server";
import { MAP_SPOT_MEDIA } from "../data/map-spots";
import type { MapSpot, MapSpotId } from "../types";
import { MapExplorerInteractive } from "./map-explorer-interactive";

/**
 * Server container: merges i18n copy with real coordinates + media,
 * then hands off to the interactive client boundary.
 */
export async function MapExplorerSection() {
  const t = await getTranslations("MapExplorer");
  const items = t.raw("spots") as Array<{
    id: MapSpotId;
    title: string;
    subtitle: string;
    description: string;
    tag: string;
  }>;

  const mediaById = new Map(
    MAP_SPOT_MEDIA.map((item) => [item.id as MapSpotId, item]),
  );

  const spots: MapSpot[] = [];
  for (const item of items) {
    const media = mediaById.get(item.id);
    if (!media) continue;

    spots.push({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      tag: item.tag,
      image: media.image,
      href: media.href,
      latitude: media.latitude,
      longitude: media.longitude,
      region: media.region,
      iconType: media.iconType,
    });
  }

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
