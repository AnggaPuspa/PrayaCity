import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { DiscoverHeader, DiscoverItem } from "../types";

interface DiscoverSectionViewProps {
  header: DiscoverHeader;
  items: DiscoverItem[];
}

/** Presentational: renders the discover list from props only. */
export function DiscoverSectionView({ header, items }: DiscoverSectionViewProps) {
  return (
    <section className="w-full bg-[#0B132B] py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-[1.2] max-w-[500px]">
            {header.title}
          </h2>
          <p className="text-white/70 text-[15px] leading-[1.6] max-w-[380px] md:text-right pb-2">
            {header.intro}
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col border-t border-white/10">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col lg:flex-row items-start lg:items-center py-8 lg:py-10 border-b border-white/10 gap-6 lg:gap-10 transition-colors cursor-pointer"
            >
              {/* Number */}
              <span className="text-white/70 text-[15px] font-medium w-[40px] shrink-0">
                {item.id}
              </span>

              {/* Image */}
              <div className="relative w-full lg:w-[260px] aspect-[16/9] lg:aspect-[1.8/1] overflow-hidden rounded-[1rem] shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="flex-1 lg:pl-4">
                <h3 className="text-white text-[24px] lg:text-[28px] font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-[15px] leading-[1.7] max-w-[800px]">
                  {item.description}
                </p>
              </div>

              {/* Icon */}
              <div className="hidden lg:flex shrink-0 w-[50px] h-[50px] rounded-full border border-white/20 items-center justify-center transition-colors group-hover:bg-[#0055FF] group-hover:border-[#0055FF] ml-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
