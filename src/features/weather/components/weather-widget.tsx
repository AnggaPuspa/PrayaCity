import { getTranslations } from "next-intl/server";
import {
  getDestinationWeather,
  resolveDestinationCoordinates,
} from "../services/weather.service";
import type { VisitVerdict, WeatherCondition } from "../types";
import { WeatherWidgetInteractive } from "./weather-widget-interactive";

const CONDITIONS: WeatherCondition[] = [
  "clear",
  "clouds",
  "rain",
  "drizzle",
  "thunderstorm",
  "snow",
  "mist",
  "unknown",
];

const VERDICTS: VisitVerdict[] = ["great", "good", "caution", "poor"];

const TIP_KEYS = [
  "clear",
  "clouds",
  "rain",
  "drizzle",
  "thunderstorm",
  "mist",
  "windy",
  "breeze",
  "highRainChance",
  "mediumRainChance",
  "lowVisibility",
  "balanced",
] as const;

interface WeatherWidgetProps {
  destinationSlug: string;
  latitude?: number | null;
  longitude?: number | null;
  locale: string;
  destinationTitle: string;
  fallbackName?: string;
}

/**
 * Server container: resolves coordinates, fetches live OpenWeather data,
 * builds labels, then hands off to the interactive client boundary.
 */
export async function WeatherWidget({
  destinationSlug,
  latitude,
  longitude,
  locale,
  destinationTitle,
  fallbackName,
}: WeatherWidgetProps) {
  const coordinates = resolveDestinationCoordinates({
    destinationSlug,
    latitude,
    longitude,
  });

  if (!coordinates) {
    return null;
  }

  const t = await getTranslations("DestinationsPage.weather");
  const weather = await getDestinationWeather({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    locale,
    fallbackName: fallbackName || coordinates.label,
  });

  if (!weather) {
    // Keep destination layout clean when weather is offline.
    return null;
  }

  const conditions = Object.fromEntries(
    CONDITIONS.map((key) => [key, t(`conditions.${key}`)]),
  ) as Record<WeatherCondition, string>;

  const verdicts = Object.fromEntries(
    VERDICTS.map((key) => [key, t(`verdicts.${key}`)]),
  ) as Record<VisitVerdict, string>;

  const tips = Object.fromEntries(
    TIP_KEYS.map((key) => [key, t(`tips.${key}`)]),
  );

  return (
    <WeatherWidgetInteractive
      weather={weather}
      destinationTitle={destinationTitle}
      labels={{
        title: t("title"),
        live: t("live"),
        updated: t("updated"),
        feelsLike: t("feelsLike"),
        humidity: t("humidity"),
        wind: t("wind"),
        visibility: t("visibility"),
        cloudiness: t("cloudiness"),
        sunrise: t("sunrise"),
        sunset: t("sunset"),
        hourlyTitle: t("hourlyTitle"),
        visitScore: t("visitScore"),
        tipsTitle: t("tipsTitle"),
        unavailable: t("unavailable"),
        conditions,
        verdicts,
        tips,
        tabs: {
          now: t("tabs.now"),
          forecast: t("tabs.forecast"),
          tips: t("tabs.tips"),
        },
      }}
    />
  );
}
