import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { TimelineItem } from "../types";

export interface TimelineItemData extends TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface TimelineListViewProps {
  items: TimelineItemData[];
}

/**
 * Presentational component for the Timeline List section.
 */
export function TimelineListView({ items }: TimelineListViewProps) {
  return (
    <section className="w-full bg-[#0A1128] py-20 md:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 md:gap-40 px-5 md:px-8">
        {items.map((item, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div
              key={item.id}
              className={cn(
                "relative flex flex-col items-center gap-10 md:gap-20",
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              {/* Image Box */}
              <div className="flex-1 w-full relative z-10">
                <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl mx-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 w-full flex flex-col justify-center relative z-10">
                <div className="max-w-lg mx-auto md:mx-0 relative">
                  <h3 className="text-white text-3xl md:text-[32px] font-bold leading-[1.3] mb-6 tracking-tight">
                    {item.date} — {item.title}
                  </h3>
                  <p className="text-[#A0A5B5] text-[14px] md:text-[15px] leading-[1.8]">
                    {item.description}
                  </p>

                  {/* Arrow Decorator (only on first two items) */}
                  {index < items.length - 1 && (
                    <div
                      className={cn(
                        "hidden md:block absolute top-[100%] mt-6 opacity-60 w-12 md:w-16",
                        isEven ? "left-1/4 -scale-x-100" : "right-1/4"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative connector SVG */}
                      <img
                        src="/historypage/garisiconbawah.svg"
                        alt=""
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
