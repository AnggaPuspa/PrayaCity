"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  DestinationWeather,
  WeatherLabels,
  WeatherWidgetController,
} from "../types";

export interface WeatherWidgetViewProps extends WeatherWidgetController {
  weather: DestinationWeather;
  labels: WeatherLabels;
  destinationTitle: string;
}

function iconUrl(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

/**
 * Presentational weather dock.
 * Portaled to document.body so `position: fixed` always tracks the viewport
 * while the user scrolls destination detail (Lenis-safe, no parent transform traps).
 */
export function WeatherWidgetView({
  weather,
  labels,
  destinationTitle,
  activeHour,
  selectHour,
  activeTab,
  selectTab,
  isOpen,
  setIsOpen,
}: WeatherWidgetViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeForecast = weather.hourly[activeHour] ?? weather.hourly[0];

  const facts = [
    { label: labels.feelsLike, value: `${weather.current.feelsLike}°` },
    { label: labels.humidity, value: `${weather.current.humidity}%` },
    { label: labels.wind, value: `${weather.current.windSpeed} m/s` },
    { label: labels.visibility, value: `${weather.current.visibilityKm} km` },
    { label: labels.sunrise, value: weather.current.sunrise },
    { label: labels.sunset, value: weather.current.sunset },
  ];

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="pointer-events-auto animate-fadeIn w-[min(100vw-2.5rem,21rem)] rounded-2xl border border-[#E8E8E8] bg-white text-[#18181B] shadow-[0_8px_28px_rgba(24,24,27,0.1)]">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-4 pt-4">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium tracking-tight text-zinc-900">
                {destinationTitle}
              </p>
              <p className="mt-0.5 truncate text-[12px] text-zinc-500">
                {weather.current.locationName}
                <span className="mx-1.5 text-zinc-300">·</span>
                {labels.updated.toLowerCase()} {weather.current.fetchedAt}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2.5 2.5l7 7M9.5 2.5l-7 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Temperature row — no badge, no nested card */}
          <div className="mt-4 flex items-center gap-3 px-4">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src={iconUrl(weather.current.iconCode)}
                alt={weather.current.description}
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-medium leading-none tracking-tight text-zinc-900">
                  {weather.current.temperature}°
                </span>
                <span className="text-sm text-zinc-400">C</span>
              </div>
              <p className="mt-1 text-[13px] text-zinc-600">
                <span className="capitalize">
                  {labels.conditions[weather.current.condition]}
                </span>
                <span className="mx-1.5 text-zinc-300">·</span>
                <span>{labels.verdicts[weather.verdict]}</span>
              </p>
            </div>
          </div>

          {/* Quiet text tabs */}
          <div className="mt-4 flex items-center gap-4 border-b border-[#EFEFEF] px-4">
            {(["now", "forecast", "tips"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectTab(tab)}
                  className={`relative pb-2.5 text-[12px] transition-colors ${
                    isActive
                      ? "font-medium text-zinc-900"
                      : "text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  {labels.tabs[tab]}
                  {isActive ? (
                    <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#0066FF]" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="px-4 py-3.5">
            {activeTab === "now" ? (
              <dl className="animate-fadeIn grid grid-cols-2 gap-x-6 gap-y-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="min-w-0">
                    <dt className="text-[11px] text-zinc-400">{fact.label}</dt>
                    <dd className="mt-0.5 text-[14px] font-medium tracking-tight text-zinc-900">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {activeTab === "forecast" ? (
              <div className="animate-fadeIn">
                {activeForecast ? (
                  <p className="mb-3 text-[12px] text-zinc-500">
                    {activeForecast.time}
                    <span className="mx-1.5 text-zinc-300">·</span>
                    <span className="capitalize text-zinc-700">
                      {labels.conditions[activeForecast.condition]}
                    </span>
                    <span className="mx-1.5 text-zinc-300">·</span>
                    <span className="text-zinc-700">
                      {activeForecast.temperature}°
                    </span>
                    <span className="mx-1.5 text-zinc-300">·</span>
                    <span className="text-zinc-700">
                      {Math.round(activeForecast.precipitationChance * 100)}%
                    </span>
                  </p>
                ) : null}

                <div className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {weather.hourly.map((hour, index) => {
                    const isActive = index === activeHour;
                    return (
                      <button
                        key={`${hour.time}-${index}`}
                        type="button"
                        onClick={() => selectHour(index)}
                        className={`min-w-[52px] rounded-lg px-1.5 py-1.5 text-center transition-colors ${
                          isActive
                            ? "bg-[#F4F7FF] text-[#0066FF]"
                            : "text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >
                        <p
                          className={`text-[10px] ${
                            isActive ? "text-[#0066FF]/80" : "text-zinc-400"
                          }`}
                        >
                          {hour.time}
                        </p>
                        <div className="relative mx-auto my-0.5 h-6 w-6">
                          <Image
                            src={iconUrl(hour.iconCode)}
                            alt={hour.condition}
                            fill
                            className="object-contain"
                            sizes="24px"
                          />
                        </div>
                        <p className="text-[12px] font-medium">{hour.temperature}°</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {activeTab === "tips" ? (
              <ul className="animate-fadeIn space-y-2.5">
                {weather.tips.map((tip) => (
                  <li
                    key={tip}
                    className="border-l-2 border-[#E5E5E5] pl-3 text-[13px] leading-relaxed text-zinc-600"
                  >
                    {labels.tips[tip] ?? tip}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Trigger — only what matters: temp + condition */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#E8E8E8] bg-white px-3 py-2 text-[13px] text-zinc-900 shadow-[0_6px_20px_rgba(24,24,27,0.1)] transition-colors hover:bg-zinc-50"
      >
        <span className="relative h-5 w-5 shrink-0">
          <Image
            src={iconUrl(weather.current.iconCode)}
            alt={weather.current.description}
            fill
            className="object-contain"
            sizes="20px"
          />
        </span>
        <span className="font-medium tracking-tight">
          {weather.current.temperature}°
        </span>
        <span className="max-w-[6.5rem] truncate text-[12px] capitalize text-zinc-500">
          {labels.conditions[weather.current.condition]}
        </span>
      </button>
    </div>,
    document.body,
  );
}
