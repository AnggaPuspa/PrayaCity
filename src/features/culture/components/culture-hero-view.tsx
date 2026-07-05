import Image from "next/image";
import type { CultureHeroData } from "../types";

interface CultureHeroViewProps {
  header: {
    title: string;
    description: string;
  };
  data: CultureHeroData;
}

export function CultureHeroView({ header, data }: CultureHeroViewProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#010101] text-white overflow-hidden pt-32 md:pt-44 pb-24">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={data.backgroundPatternImage}
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center">
        {/* Text Content */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16 space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-[64px] font-semibold tracking-tight text-[#fdfdfd]">
            {header.title}
          </h1>
          <p className="text-base md:text-[18px] text-zinc-300 leading-relaxed max-w-[1000px] mx-auto">
            {header.description}
          </p>
        </div>

        {/* Bento Grid Image */}
        <div className="w-full max-w-[1240px] mx-auto mt-2 md:mt-6">
          <div className="relative w-full aspect-[2.75/1] min-h-[300px] overflow-hidden rounded-[24px] md:rounded-[32px]">
            <Image
              src={data.highlightImage}
              alt={data.highlightImageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
