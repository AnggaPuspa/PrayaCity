import { getTranslations } from "next-intl/server";
import { ProgramsContactClient } from "./programs-contact-client";

export async function ProgramsContact() {
  const t = await getTranslations("ProgramsPage.Contact");
  
  const content = {
    title: t("title"),
    description: t("description"),
    namePlaceholder: t("namePlaceholder"),
    emailPlaceholder: t("emailPlaceholder"),
    messagePlaceholder: t("messagePlaceholder"),
    submitButton: t("submitButton"),
    sending: t("sending"),
  };

  return <ProgramsContactClient content={content} />;
}
