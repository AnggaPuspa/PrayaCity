"use client";

import Image from "next/image";
import { useRef } from "react";

const DESTINATIONS = [
  {
    title: "Bukit Merese",
    description: "Central Lombok's finest sunset spot. Stand above rolling green hills as...",
    image: "/mustvisisection/Rectangle 10.svg",
  },
  {
    title: "Gerupuk Beach",
    description: "A world-class surf break that draws riders from every corner of the glob...",
    image: "/mustvisisection/Rectangle 11.svg",
  },
  {
    title: "Sade Traditional Village",
    description: "Step into a living museum of Sasak culture. 150 homes, 700 residents...",
    image: "/mustvisisection/Rectangle 10 (1).png",
  },
  {
    title: "Kuta Mandalika Beach",
    description: "The only beach in the world with pepper-shaped sand grains. Cryst...",
    image: "/mustvisisection/Rectangle 11 (2).svg",
  }
];

export function MustVisitSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

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
            {DESTINATIONS.map((item, index) => (
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
