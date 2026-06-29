import type { HistoryHeroData } from "../types";

interface HistoryHeroViewProps {
  header: {
    eyebrow: string;
    title: string;
  };
  data: HistoryHeroData;
}

/**
 * Presentational component for the History Hero section.
 * Receives translated strings and domain data as props.
 */
export function HistoryHeroView({ header, data }: HistoryHeroViewProps) {
  return (
    <section className="relative flex flex-col justify-end min-h-[100vh] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${data.backgroundImage}')` }}
      />
      
      {/* Gradients to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/40 to-transparent w-full md:w-[70%]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-8 pb-20 md:pb-32">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-[#D4D4D4] text-[15px] md:text-[18px] font-medium tracking-wide">
            {header.eyebrow}
          </span>
          <h1 className="text-white text-[32px] sm:text-[42px] md:text-[64px] font-bold leading-[1.1] tracking-tight">
            {header.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
