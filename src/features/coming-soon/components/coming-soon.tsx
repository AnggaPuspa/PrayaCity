import { getTranslations } from "next-intl/server";
import { ComingSoonView } from "./coming-soon-view";

/** Container: provides translated copy to the placeholder view. */
export async function ComingSoon() {
  const t = await getTranslations("ComingSoon");

  return (
    <ComingSoonView
      title={t("title")}
      description={t("description")}
      backLabel={t("back")}
    />
  );
}
