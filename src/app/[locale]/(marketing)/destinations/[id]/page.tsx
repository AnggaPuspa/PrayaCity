import {
  DestinationDetail,
  getDestinationBySlug,
} from "@/features/destinations";
import { ReviewsSection } from "@/features/reviews";
import { WeatherWidget } from "@/features/weather";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;

  try {
    const destination = await getDestinationBySlug(id, locale);
    if (destination) {
      return {
        title: `${destination.title} | Praya City`,
        description: destination.longDescription.substring(0, 160),
      };
    }
  } catch (error) {
    // ignore
  }

  return {
    title: "Destination | Praya City",
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const destination = await getDestinationBySlug(id, locale);

  return (
    <main className="flex-1 bg-white">
      <DestinationDetail id={id} locale={locale} />
      {destination ? (
        <WeatherWidget
          destinationSlug={id}
          latitude={destination.latitude}
          longitude={destination.longitude}
          locale={locale}
          destinationTitle={destination.title}
          fallbackName={destination.location}
        />
      ) : null}
      <ReviewsSection destinationSlug={id} locale={locale} />
    </main>
  );
}
