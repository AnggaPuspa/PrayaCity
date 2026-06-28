import { getTranslations } from "next-intl/server";
import { DISCOVER_MEDIA } from "../data/discover";
import { DiscoverSectionView } from "./discover-section-view";
import type { DiscoverItem } from "../types";

/** Container: merges translated text with id/media, then renders the view. */
export async function DiscoverSection() {
  const t = await getTranslations("Discover");
  const items = t.raw("items") as Array<
    Pick<DiscoverItem, "title" | "description">
  >;

  const discoverItems: DiscoverItem[] = items.map((item, index) => ({
    ...item,
    ...DISCOVER_MEDIA[index],
  }));

  return (
    <DiscoverSectionView
      header={{ title: t("title"), intro: t("intro") }}
      items={discoverItems}
    />
  );
}
