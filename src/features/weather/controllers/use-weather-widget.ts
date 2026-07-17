"use client";

import { useCallback, useState } from "react";
import type { WeatherWidgetController } from "../types";

/**
 * Controller: owns ALL interactive state for the weather widget.
 * The view stays purely presentational and receives this back.
 */
export function useWeatherWidgetController(
  initialHour = 0,
): WeatherWidgetController {
  const [activeHour, setActiveHour] = useState(initialHour);

  const selectHour = useCallback((index: number) => {
    setActiveHour(index);
  }, []);

  return { activeHour, selectHour };
}
