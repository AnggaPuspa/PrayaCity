"use client";

import { useWeatherWidgetController } from "../controllers/use-weather-widget";
import type { DestinationWeather, WeatherLabels } from "../types";
import { WeatherWidgetView } from "./weather-widget-view";

interface WeatherWidgetInteractiveProps {
  weather: DestinationWeather;
  labels: WeatherLabels;
  destinationTitle: string;
}

/**
 * Client container: the only client boundary for weather interactivity.
 * Wires the controller (logic) to the view (UI).
 */
export function WeatherWidgetInteractive({
  weather,
  labels,
  destinationTitle,
}: WeatherWidgetInteractiveProps) {
  const controller = useWeatherWidgetController(0);

  return (
    <WeatherWidgetView
      weather={weather}
      labels={labels}
      destinationTitle={destinationTitle}
      {...controller}
    />
  );
}
