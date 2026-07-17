import Image from "next/image";
import type {
  DestinationWeather,
  VisitVerdict,
  WeatherCondition,
  WeatherLabels,
  WeatherWidgetController,
} from "../types";

export interface WeatherWidgetViewProps extends WeatherWidgetController {
  weather: DestinationWeather;
  labels: WeatherLabels;
  destinationTitle: string;
}

const CONDITION_THEME: Record<
  WeatherCondition,
  { gradient: string; accent: string; glow: string }
> = {
  clear: {
    gradient: "from-[#0B1B3A] via-[#123B7A] to-[#1E6BFF]",
    accent: "bg-amber-300/20 text-amber-100 border-amber-200/30",
    glow: "bg-amber-300/30",
  },
  clouds: {
    gradient: "from-[#141B2D] via-[#24314D] to-[#3B4D73]",
    accent: "bg-slate-200/15 text-slate-100 border-white/15",
    glow: "bg-slate-200/20",
  },
  rain: {
    gradient: "from-[#0B1220] via-[#10253F] to-[#1A4B7A]",
    accent: "bg-sky-300/15 text-sky-100 border-sky-200/20",
    glow: "bg-sky-300/20",
  },
  drizzle: {
    gradient: "from-[#0D1524] via-[#16324F] to-[#245F8C]",
    accent: "bg-cyan-300/15 text-cyan-100 border-cyan-200/20",
    glow: "bg-cyan-300/20",
  },
  thunderstorm: {
    gradient: "from-[#0A0D16] via-[#1A1330] to-[#3A1F66]",
    accent: "bg-violet-300/15 text-violet-100 border-violet-200/20",
    glow: "bg-violet-300/25",
  },
  snow: {
    gradient: "from-[#101826] via-[#1D2C40] to-[#4A678A]",
    accent: "bg-blue-100/15 text-blue-50 border-blue-100/20",
    glow: "bg-blue-100/20",
  },
  mist: {
    gradient: "from-[#171A20] via-[#2A3038] to-[#4B5563]",
    accent: "bg-zinc-200/15 text-zinc-100 border-white/10",
    glow: "bg-zinc-200/15",
  },
  unknown: {
    gradient: "from-[#10141F] via-[#1B2436] to-[#2C3A55]",
    accent: "bg-white/10 text-white border-white/10",
    glow: "bg-white/10",
  },
};

const VERDICT_STYLE: Record<VisitVerdict, string> = {
  great: "bg-emerald-400/15 text-emerald-100 border-emerald-300/30",
  good: "bg-sky-400/15 text-sky-100 border-sky-300/30",
  caution: "bg-amber-400/15 text-amber-100 border-amber-300/30",
  poor: "bg-rose-400/15 text-rose-100 border-rose-300/30",
};

function iconUrl(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

/**
 * Presentational component: receives weather data + controller state as props.
 * No hooks, no fetching — trivially testable and reusable.
 */
export function WeatherWidgetView({
  weather,
  labels,
  destinationTitle,
  activeHour,
  selectHour,
}: WeatherWidgetViewProps) {
  const theme = CONDITION_THEME[weather.current.condition];
  const activeForecast = weather.hourly[activeHour] ?? weather.hourly[0];

  const metrics = [
    {
      key: "feelsLike",
      label: labels.feelsLike,
      value: `${weather.current.feelsLike}°`,
    },
    {
      key: "humidity",
      label: labels.humidity,
      value: `${weather.current.humidity}%`,
    },
    {
      key: "wind",
      label: labels.wind,
      value: `${weather.current.windSpeed} m/s`,
    },
    {
      key: "visibility",
      label: labels.visibility,
      value: `${weather.current.visibilityKm} km`,
    },
    {
      key: "cloudiness",
      label: labels.cloudiness,
      value: `${weather.current.cloudiness}%`,
    },
    {
      key: "sunrise",
      label: labels.sunrise,
      value: weather.current.sunrise,
    },
    {
      key: "sunset",
      label: labels.sunset,
      value: weather.current.sunset,
    },
  ];

  return (
    <section className="w-full bg-white pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-[28px] bg-linear-to-br ${theme.gradient} p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] md:p-8`}
        >
          <div
            className={`pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl ${theme.glow}`}
          />
          <div
            className={`pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full blur-3xl ${theme.glow}`}
          />

          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                    </span>
                    {labels.live}
                  </span>
                  <span className="text-sm text-white/70">
                    {labels.updated} {weather.current.fetchedAt}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {labels.title}
                  </h2>
                  <p className="mt-1 text-sm text-white/70 md:text-base">
                    {destinationTitle} · {weather.current.locationName}
                  </p>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-medium ${VERDICT_STYLE[weather.verdict]}`}
              >
                <span>{labels.visitScore}</span>
                <span className="opacity-80">·</span>
                <span>{labels.verdicts[weather.verdict]}</span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm md:p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src={iconUrl(weather.current.iconCode)}
                      alt={weather.current.description}
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <div className="flex items-end gap-2">
                      <span className="text-6xl font-semibold tracking-tight md:text-7xl">
                        {weather.current.temperature}°
                      </span>
                      <span className="mb-2 text-lg text-white/70">C</span>
                    </div>
                    <p className="capitalize text-white/80">
                      {labels.conditions[weather.current.condition]} ·{" "}
                      {weather.current.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {metrics.map((metric) => (
                    <div
                      key={metric.key}
                      className="rounded-2xl border border-white/10 bg-black/10 px-3 py-3"
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-medium">{labels.hourlyTitle}</h3>
                    {activeForecast ? (
                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${theme.accent}`}
                      >
                        {activeForecast.time} · {activeForecast.temperature}° ·{" "}
                        {Math.round(activeForecast.precipitationChance * 100)}%
                      </span>
                    ) : null}
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {weather.hourly.map((hour, index) => {
                      const isActive = index === activeHour;
                      return (
                        <button
                          key={`${hour.time}-${index}`}
                          type="button"
                          onClick={() => selectHour(index)}
                          className={`min-w-[84px] rounded-2xl border px-3 py-3 text-left transition-all ${
                            isActive
                              ? "border-white/40 bg-white text-zinc-900 shadow-lg shadow-black/10"
                              : "border-white/10 bg-black/10 text-white hover:bg-white/10"
                          }`}
                        >
                          <p
                            className={`text-xs ${isActive ? "text-zinc-500" : "text-white/60"}`}
                          >
                            {hour.time}
                          </p>
                          <div className="relative mx-auto my-1 h-10 w-10">
                            <Image
                              src={iconUrl(hour.iconCode)}
                              alt={hour.condition}
                              fill
                              className="object-contain"
                              sizes="40px"
                            />
                          </div>
                          <p className="text-sm font-semibold">
                            {hour.temperature}°
                          </p>
                          <p
                            className={`mt-1 text-[11px] ${isActive ? "text-zinc-500" : "text-white/55"}`}
                          >
                            {Math.round(hour.precipitationChance * 100)}%
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm md:p-6">
                  <h3 className="mb-3 text-lg font-medium">{labels.tipsTitle}</h3>
                  <div className="flex flex-col gap-2">
                    {weather.tips.map((tip) => (
                      <div
                        key={tip}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/85"
                      >
                        {labels.tips[tip] ?? tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
