import { DestinationDetail } from "@/features/destinations";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "DestinationsPage.items" });

  try {
    const title = t(`${id}.title`);
    const description = t(`${id}.description`);
    return {
      title: `${title} | Praya City`,
      description,
    };
  } catch (error) {
    return {
      title: "Destination | Praya City",
    };
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1 bg-white">
      <DestinationDetail id={id} />
    </main>
  );
}
