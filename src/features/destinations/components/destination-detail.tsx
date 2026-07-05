import { useTranslations } from "next-intl";
import { DESTINATIONS_DATA } from "../data/destinations";
import { DestinationDetailView } from "./destination-detail-view";
import { notFound } from "next/navigation";

export function DestinationDetail({ id }: { id: string }) {
  const t = useTranslations("DestinationsPage");
  
  const item = DESTINATIONS_DATA.find((d) => d.id === id);
  
  if (!item) {
    notFound();
  }

  // Get translated content
  const title = t(`items.${id}.title`);
  const longDescription = t(`items.${id}.longDescription`);
  const location = t(`items.${id}.location`);
  const status = t(`items.${id}.status`);
  const entranceFee = t(`items.${id}.entranceFee`);

  const labels = {
    currentStatus: t("detail.currentStatus"),
    location: t("detail.location"),
    entranceFee: t("detail.entranceFee"),
    feeLabel: t("detail.feeLabel"),
  };

  const translatedTags = item.tags.map(tag => t(`categories.${tag.toLowerCase()}`));

  return (
    <DestinationDetailView
      item={item}
      title={title}
      longDescription={longDescription}
      location={location}
      status={status}
      entranceFee={entranceFee}
      labels={labels}
      translatedTags={translatedTags}
    />
  );
}
