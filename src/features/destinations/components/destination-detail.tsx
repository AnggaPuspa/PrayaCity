import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DESTINATIONS_DATA } from "../data/destinations";
import { DestinationDetailView } from "./destination-detail-view";
import type { DestinationDetailContent } from "../types";

export async function DestinationDetail({ id }: { id: string }) {
  const t = await getTranslations("DestinationsPage");
  
  const item = DESTINATIONS_DATA.find((d) => d.id === id);
  
  if (!item) {
    notFound();
  }

  const content: DestinationDetailContent = {
    ...item,
    title: t(`items.${id}.title`),
    longDescription: t(`items.${id}.longDescription`),
    location: t(`items.${id}.location`),
    status: t(`items.${id}.status`),
    entranceFee: t(`items.${id}.entranceFee`),
    translatedTags: item.tags.map((tag) => t(`categories.${tag.toLowerCase()}`)),
  };

  return (
    <DestinationDetailView
      content={content}
      labels={{
        currentStatus: t("detail.currentStatus"),
        location: t("detail.location"),
        entranceFee: t("detail.entranceFee"),
        feeLabel: t("detail.feeLabel"),
      }}
    />
  );
}
