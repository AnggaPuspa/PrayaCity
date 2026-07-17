export type WeatherCondition =
  | "clear"
  | "clouds"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "mist"
  | "unknown";

export type VisitVerdict = "great" | "good" | "caution" | "poor";

export interface WeatherSnapshot {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibilityKm: number;
  cloudiness: number;
  condition: WeatherCondition;
  description: string;
  iconCode: string;
  sunrise: string;
  sunset: string;
  fetchedAt: string;
  locationName: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  precipitationChance: number;
  condition: WeatherCondition;
  iconCode: string;
}

export interface DestinationWeather {
  current: WeatherSnapshot;
  hourly: HourlyForecastItem[];
  verdict: VisitVerdict;
  tips: string[];
}

export interface WeatherLabels {
  title: string;
  live: string;
  updated: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  visibility: string;
  cloudiness: string;
  sunrise: string;
  sunset: string;
  hourlyTitle: string;
  visitScore: string;
  tipsTitle: string;
  unavailable: string;
  conditions: Record<WeatherCondition, string>;
  verdicts: Record<VisitVerdict, string>;
  tips: Record<string, string>;
  tabs: {
    now: string;
    forecast: string;
    tips: string;
  };
}

export interface WeatherWidgetController {
  activeHour: number;
  selectHour: (index: number) => void;
  activeTab: "now" | "forecast" | "tips";
  selectTab: (tab: "now" | "forecast" | "tips") => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface WeatherCoordinates {
  latitude: number;
  longitude: number;
  label?: string;
}
