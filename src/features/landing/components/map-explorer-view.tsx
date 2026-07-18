"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type {
  MapExplorerController,
  MapExplorerLabels,
  MapSpot,
} from "../types";

const InteractiveMapCanvas = dynamic(
  () =>
    import("./interactive-map-canvas").then((mod) => mod.InteractiveMapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#EAF2FF] text-sm text-zinc-500">
        Loading map…
      </div>
    ),
  },
);

export interface MapExplorerViewProps extends MapExplorerController {
  labels: MapExplorerLabels;
  spots: MapSpot[];
}

/**
 * Presentational map explorer:
 * full-bleed map stage + floating left destination card (reference layout).
 * Map engine stays untouched — this file only owns the section chrome.
 */
export function MapExplorerView({
  labels,
  spots,
  activeId,
  selectSpot,
  selectNext,
  selectPrev,
}: MapExplorerViewProps) {
  const activeIndex = Math.max(
    0,
    spots.findIndex((spot) => spot.id === activeId),
  );
  const active = spots[activeIndex] ?? spots[0];
  if (!active) return null;

  return (
    <section className="w-full bg-white pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — split: title left, intro right */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <h2 className="text-[30px] font-bold leading-[1.2] tracking-tight text-[#1A1A1A] sm:text-[40px] md:text-[48px]">
              {labels.heading}
            </h2>
          </div>
          <p className="max-w-[380px] pb-1 text-[15px] leading-[1.6] text-[#333333]/70 md:text-right">
            {labels.intro}
          </p>
        </div>

        {/* Full map stage */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#E8EEF7] bg-[#EAF2FF] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[520px] [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-control-attribution]:hidden">
            <div className="absolute inset-0">
              <InteractiveMapCanvas
                spots={spots}
                activeId={activeId}
                onSelect={selectSpot}
              />
            </div>
          </div>

          {/* Floating destination card — bottom centered with site DNA */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[560] flex justify-center px-4 md:bottom-8">
            <article className="pointer-events-auto relative w-full max-w-[340px] rounded-[24px] bg-white p-3 shadow-[0_20px_55px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] md:max-w-[380px]">
              {/* Tooltip Tail */}
              <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white shadow-[2px_2px_4px_rgba(15,23,42,0.1)]" />
              
              <div className="relative z-10 flex gap-4 bg-white">
                {/* Left Content */}
                <div className="flex flex-1 flex-col justify-between py-1 pl-2">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                      {active.tag}
                    </p>
                    <h3 className="mt-1 text-[20px] font-semibold leading-tight tracking-tight text-[#1A1A1A]">
                      {active.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[13px] font-medium text-[#0066FF]">
                      {active.subtitle}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Link
                      href={active.href}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-700 transition hover:text-[#0066FF]"
                    >
                      {labels.openSpot}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {/* Mini Navigation */}
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={selectPrev}
                        aria-label={labels.prev}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8E8E8] text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={selectNext}
                        aria-label={labels.next}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8E8E8] text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative h-[120px] w-[110px] shrink-0 overflow-hidden rounded-[16px] bg-zinc-100 md:h-[130px] md:w-[120px]">
                  <Image
                    key={active.id}
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>


      </div>
    </section>
  );
}
