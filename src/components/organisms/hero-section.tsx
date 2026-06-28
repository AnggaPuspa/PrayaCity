import Image from "next/image";
import { Typography } from "@/components/atoms";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/pmIe2MbtIFM?autoplay=1&mute=1&loop=1&playlist=pmIe2MbtIFM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-screen w-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-125 md:scale-110"
        />
        {/* Subtle gradient overlay to make text readable */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end h-screen pb-24 px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1 max-w-3xl">
            <Typography as="h1" variant="h1" className="text-white text-5xl md:text-7xl font-bold leading-tight">
              The Soul of Central<br />Lombok
            </Typography>
          </div>

          <div className="w-full max-w-[22rem] rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium">Explore Now</span>
              <span className="text-sm">↗</span>
              <span className="ml-auto text-xs font-semibold">20+ Destination place</span>
            </div>
            <Typography variant="body" className="text-zinc-200 text-sm leading-relaxed">
              Curated travel information — from cultural events, natural destinations, local cuisine, all updated in real-time.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
