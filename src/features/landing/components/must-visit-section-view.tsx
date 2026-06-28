import Image from "next/image";
import type { RefObject } from "react";
import type { Destination } from "../types";

interface MustVisitSectionViewProps {
  destinations: Destination[];
  scrollRef: RefObject<HTMLDivElement | null>;
  scrollLeft: () => void;
  scrollRight: () => void;
}

/** Presentational: renders the destinations carousel from props only. */
export function MustVisitSectionView({
  destinations,
  scrollRef,
  scrollLeft,
  scrollRight,
}: MustVisitSectionViewProps) {
  return (
    <section className="w-full bg-white py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center flex flex-col items-center mb-16">
          <span className="text-[#333333] text-[18px] md:text-[20px] font-medium mb-2">
            Must-Visit Places
          </span>
          <h2 className="text-[#1A1A1A] text-[36px] md:text-[44px] font-bold tracking-tight">
            Explore popular destinations
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="flex absolute top-[40%] -translate-y-1/2 -left-4 sm:-left-6 md:left-0 md:-translate-x-1/2 w-[48px] h-[48px] md:w-[60px] md:h-[60px] bg-[#1A1A1A] hover:bg-black text-white rounded-full items-center justify-center z-10 transition-colors border-[4px] md:border-[6px] border-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="flex absolute top-[40%] -translate-y-1/2 -right-4 sm:-right-6 md:right-0 md:translate-x-1/2 w-[48px] h-[48px] md:w-[60px] md:h-[60px] bg-[#1A1A1A] hover:bg-black text-white rounded-full items-center justify-center z-10 transition-colors border-[4px] md:border-[6px] border-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
          >
            {destinations.map((item, index) => (
              <div
                key={index}
                className="flex flex-col group cursor-pointer shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start"
              >
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden rounded-[1.25rem] mb-5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <h3 className="text-[#1A1A1A] text-[18px] md:text-[20px] font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-[#737373] text-[14px] leading-[1.6] mb-5">
                  {item.description}
                </p>

                {/* Card Button */}
                <div className="mt-auto">
                  <button className="flex items-center gap-1.5 px-4 py-1.5 border border-[#E5E7EB] rounded-full w-fit text-[#4B5563] text-[12px] font-medium hover:bg-gray-50 transition-colors">
                    View More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div className="flex justify-center mt-12">
          <button className="px-7 py-3 border border-[#D1D5DB] rounded-full text-[#1A1A1A] text-[15px] font-medium hover:bg-gray-50 transition-colors">
            See More Destination
          </button>
        </div>

      </div>
    </section>
  );
}
