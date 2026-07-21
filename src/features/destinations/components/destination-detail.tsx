import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "../services/destinations.service";
import { DestinationDetailView } from "./destination-detail-view";
import type { DestinationDetailContent } from "../types";

export async function DestinationDetail({ id, locale }: { id: string, locale: string }) {
  const t = await getTranslations("DestinationsPage");

  const item = await getDestinationBySlug(id, locale);

  if (!item) {
    notFound();
  }

  const content: DestinationDetailContent = {
    ...item,
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
