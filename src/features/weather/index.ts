// Public API for the `weather` feature (OpenWeather live destination weather).
// Other modules import from here, never from deep internals.
export { WeatherWidget } from "./components/weather-widget";
export {
  getDestinationWeather,
  resolveDestinationCoordinates,
} from "./services/weather.service";
export type {
  DestinationWeather,
  HourlyForecastItem,
  VisitVerdict,
  WeatherCondition,
  WeatherCoordinates,
  WeatherLabels,
  WeatherSnapshot,
  WeatherWidgetController,
} from "./types";
