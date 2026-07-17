import "server-only";

import { env } from "@/config/env";
import type {
  DestinationWeather,
  HourlyForecastItem,
  VisitVerdict,
  WeatherCondition,
  WeatherCoordinates,
  WeatherSnapshot,
} from "../types";

const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5";
const REVALIDATE_SECONDS = 10 * 60;

/** Known destination coordinates used as fallback when DB values are empty. */
const DESTINATION_COORDINATES: Record<string, WeatherCoordinates> = {
  kutaMandalika: {
    latitude: -8.8956,
    longitude: 116.2804,
    label: "Kuta Mandalika",
  },
  bukitMerese: {
    latitude: -8.9125,
    longitude: 116.3208,
    label: "Bukit Merese",
  },
  bukitLancing: {
    latitude: -8.7198,
    longitude: 116.2685,
    label: "Bukit Lancing",
  },
};

type OpenWeatherCurrentResponse = {
  name?: string;
  weather?: Array<{ id: number; main: string; description: string; icon: string }>;
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind?: { speed: number };
  visibility?: number;
  clouds?: { all: number };
  sys?: { sunrise: number; sunset: number };
  dt?: number;
};

type OpenWeatherForecastResponse = {
  list?: Array<{
    dt: number;
    main?: { temp: number };
    weather?: Array<{ main: string; icon: string }>;
    pop?: number;
  }>;
};

function mapCondition(main?: string): WeatherCondition {
  switch ((main ?? "").toLowerCase()) {
    case "clear":
      return "clear";
    case "clouds":
      return "clouds";
    case "rain":
      return "rain";
    case "drizzle":
      return "drizzle";
    case "thunderstorm":
      return "thunderstorm";
    case "snow":
      return "snow";
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "ash":
    case "squall":
    case "tornado":
      return "mist";
    default:
      return "unknown";
  }
}

function formatClock(unixSeconds: number, locale: string): string {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Makassar",
  }).format(new Date(unixSeconds * 1000));
}

function formatHour(unixSeconds: number, locale: string): string {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Makassar",
  }).format(new Date(unixSeconds * 1000));
}

function buildVerdict(input: {
  condition: WeatherCondition;
  windSpeed: number;
  precipitationChance: number;
  visibilityKm: number;
}): { verdict: VisitVerdict; tips: string[] } {
  const tips: string[] = [];
  let score = 100;

  if (input.condition === "thunderstorm") {
    score -= 55;
    tips.push("thunderstorm");
  } else if (input.condition === "rain") {
    score -= 30;
    tips.push("rain");
  } else if (input.condition === "drizzle") {
    score -= 18;
    tips.push("drizzle");
  } else if (input.condition === "clouds") {
    score -= 8;
    tips.push("clouds");
  } else if (input.condition === "clear") {
    tips.push("clear");
  } else if (input.condition === "mist") {
    score -= 15;
    tips.push("mist");
  }

  if (input.windSpeed >= 10) {
    score -= 20;
    tips.push("windy");
  } else if (input.windSpeed >= 6) {
    score -= 10;
    tips.push("breeze");
  }

  if (input.precipitationChance >= 0.6) {
    score -= 20;
    tips.push("highRainChance");
  } else if (input.precipitationChance >= 0.35) {
    score -= 10;
    tips.push("mediumRainChance");
  }

  if (input.visibilityKm > 0 && input.visibilityKm < 3) {
    score -= 15;
    tips.push("lowVisibility");
  }

  if (tips.length === 0) {
    tips.push("balanced");
  }

  let verdict: VisitVerdict = "great";
  if (score < 45) verdict = "poor";
  else if (score < 65) verdict = "caution";
  else if (score < 80) verdict = "good";

  return { verdict, tips: tips.slice(0, 3) };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Resolve lat/lng for a destination: prefer DB values, fall back to known pins.
 */
export function resolveDestinationCoordinates(params: {
  destinationSlug: string;
  latitude?: number | null;
  longitude?: number | null;
}): WeatherCoordinates | null {
  const fallback = DESTINATION_COORDINATES[params.destinationSlug];
  const latitude =
    typeof params.latitude === "number" && Number.isFinite(params.latitude)
      ? params.latitude
      : fallback?.latitude;
  const longitude =
    typeof params.longitude === "number" && Number.isFinite(params.longitude)
      ? params.longitude
      : fallback?.longitude;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return null;
  }

  return {
    latitude,
    longitude,
    label: fallback?.label,
  };
}

export async function getDestinationWeather(params: {
  latitude: number;
  longitude: number;
  locale: string;
  fallbackName?: string;
}): Promise<DestinationWeather | null> {
  const apiKey = env.openWeatherApiKey;
  if (!apiKey) {
    return null;
  }

  const units = "metric";
  const lang = params.locale === "id" ? "id" : "en";
  const query = `lat=${params.latitude}&lon=${params.longitude}&appid=${apiKey}&units=${units}&lang=${lang}`;

  const [currentRaw, forecastRaw] = await Promise.all([
    fetchJson<OpenWeatherCurrentResponse>(`${OPENWEATHER_BASE}/weather?${query}`),
    fetchJson<OpenWeatherForecastResponse>(`${OPENWEATHER_BASE}/forecast?${query}`),
  ]);

  if (!currentRaw?.main || !currentRaw.weather?.[0]) {
    return null;
  }

  const condition = mapCondition(currentRaw.weather[0].main);
  const visibilityKm = (currentRaw.visibility ?? 0) / 1000;
  const windSpeed = currentRaw.wind?.speed ?? 0;

  const hourly: HourlyForecastItem[] = (forecastRaw?.list ?? [])
    .slice(0, 8)
    .map((item) => ({
      time: formatHour(item.dt, params.locale),
      temperature: Math.round(item.main?.temp ?? 0),
      precipitationChance: item.pop ?? 0,
      condition: mapCondition(item.weather?.[0]?.main),
      iconCode: item.weather?.[0]?.icon ?? "01d",
    }));

  const nearestPrecipitation =
    hourly[0]?.precipitationChance ??
    (condition === "rain" ||
    condition === "drizzle" ||
    condition === "thunderstorm"
      ? 0.7
      : 0.1);

  const current: WeatherSnapshot = {
    temperature: Math.round(currentRaw.main.temp),
    feelsLike: Math.round(currentRaw.main.feels_like),
    humidity: currentRaw.main.humidity,
    windSpeed: Number(windSpeed.toFixed(1)),
    visibilityKm: Number(visibilityKm.toFixed(1)),
    cloudiness: currentRaw.clouds?.all ?? 0,
    condition,
    description: currentRaw.weather[0].description,
    iconCode: currentRaw.weather[0].icon,
    sunrise: currentRaw.sys?.sunrise
      ? formatClock(currentRaw.sys.sunrise, params.locale)
      : "--:--",
    sunset: currentRaw.sys?.sunset
      ? formatClock(currentRaw.sys.sunset, params.locale)
      : "--:--",
    fetchedAt: currentRaw.dt
      ? formatClock(currentRaw.dt, params.locale)
      : formatClock(Math.floor(Date.now() / 1000), params.locale),
    locationName: currentRaw.name || params.fallbackName || "Central Lombok",
  };

  const { verdict, tips } = buildVerdict({
    condition,
    windSpeed,
    precipitationChance: nearestPrecipitation,
    visibilityKm,
  });

  return {
    current,
    hourly,
    verdict,
    tips,
  };
}
