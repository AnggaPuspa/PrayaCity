import { getTranslations } from "next-intl/server";
import { ProgramsTabsClient } from "./programs-tabs-client";

export async function ProgramsTabs() {
  const t = await getTranslations("ProgramsPage");
  
  const tabs = [
    {
      id: "infrastructure",
      label: t("Tabs.infrastructure"),
      icon: "Building2",
      title: t("Infrastructure.title"),
      description: t("Infrastructure.description"),
      stats: [
        { value: t("Infrastructure.stats.stat1Value"), label: t("Infrastructure.stats.stat1Label") },
        { value: t("Infrastructure.stats.stat2Value"), label: t("Infrastructure.stats.stat2Label") },
        { value: t("Infrastructure.stats.stat3Value"), label: t("Infrastructure.stats.stat3Label") },
        { value: t("Infrastructure.stats.stat4Value"), label: t("Infrastructure.stats.stat4Label") },
      ]
    },
    {
      id: "digitalEconomy",
      label: t("Tabs.digitalEconomy"),
      icon: "Store",
      title: t("DigitalEconomy.title"),
      description: t("DigitalEconomy.description"),
      stats: [
        { value: t("DigitalEconomy.stats.stat1Value"), label: t("DigitalEconomy.stats.stat1Label") },
        { value: t("DigitalEconomy.stats.stat2Value"), label: t("DigitalEconomy.stats.stat2Label") },
        { value: t("DigitalEconomy.stats.stat3Value"), label: t("DigitalEconomy.stats.stat3Label") },
        { value: t("DigitalEconomy.stats.stat4Value"), label: t("DigitalEconomy.stats.stat4Label") },
      ]
    },
    {
      id: "cultureHeritage",
      label: t("Tabs.cultureHeritage"),
      icon: "Landmark",
      title: t("CultureHeritage.title"),
      description: t("CultureHeritage.description"),
      stats: [
        { value: t("CultureHeritage.stats.stat1Value"), label: t("CultureHeritage.stats.stat1Label") },
        { value: t("CultureHeritage.stats.stat2Value"), label: t("CultureHeritage.stats.stat2Label") },
        { value: t("CultureHeritage.stats.stat3Value"), label: t("CultureHeritage.stats.stat3Label") },
        { value: t("CultureHeritage.stats.stat4Value"), label: t("CultureHeritage.stats.stat4Label") },
      ]
    },
    {
      id: "agriculture",
      label: t("Tabs.agriculture"),
      icon: "Tractor",
      title: t("Agriculture.title"),
      description: t("Agriculture.description"),
      stats: [
        { value: t("Agriculture.stats.stat1Value"), label: t("Agriculture.stats.stat1Label") },
        { value: t("Agriculture.stats.stat2Value"), label: t("Agriculture.stats.stat2Label") },
        { value: t("Agriculture.stats.stat3Value"), label: t("Agriculture.stats.stat3Label") },
        { value: t("Agriculture.stats.stat4Value"), label: t("Agriculture.stats.stat4Label") },
      ]
    }
  ];

  return <ProgramsTabsClient tabs={tabs} />;
}
