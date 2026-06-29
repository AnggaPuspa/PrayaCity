import { getTranslations } from "next-intl/server";
import { GALLERY_IMAGES } from "../data/gallery";
import { HistoryGalleryView } from "./history-gallery-view";

/**
 * Container component for the History gallery section.
 * Fetches translations + image data, then renders the presentational view.
 */
export async function HistoryGallery() {
  const t = await getTranslations("HistoryPage");

  const header = {
    eyebrow: t("galleryEyebrow"),
    title1: t("galleryTitle1"),
    title2: t("galleryTitle2"),
  };

  return <HistoryGalleryView header={header} images={GALLERY_IMAGES} />;
}
