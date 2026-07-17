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
  const [activeTab, setActiveTab] = useState<"now" | "forecast" | "tips">("now");
  const [isOpen, setIsOpen] = useState(false);

  const selectHour = useCallback((index: number) => {
    setActiveHour(index);
  }, []);

  const selectTab = useCallback((tab: "now" | "forecast" | "tips") => {
    setActiveTab(tab);
  }, []);

  return { activeHour, selectHour, activeTab, selectTab, isOpen, setIsOpen };
}
