import Image from "next/image";
import { Smartphone, Compass } from "lucide-react";
import type { DestinationDetailContent } from "../types";

interface DestinationDetailViewProps {
  content: DestinationDetailContent;
  labels: {
    currentStatus: string;
    location: string;
    entranceFee: string;
    feeLabel: string;
  };
}

export function DestinationDetailView({
  content,
  labels,
}: DestinationDetailViewProps) {
  return (
    <div className="w-full bg-white text-[#18181B] pb-8 pt-24">
      {/* Hero Image */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-[24px] overflow-hidden">
          <Image
            src={content.detailImageSrc || content.imageSrc}
            alt={content.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 md:gap-24">
        {/* Left Column */}
        <div className="w-full md:w-[30%] flex flex-col gap-8 md:gap-10 order-2 md:order-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {content.translatedTags.map((tag, i) => (
              <span
                key={i}
                className="px-6 py-2 rounded-full border border-[#E5E5E5] text-[#18181B]/70 text-[14px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Current Status */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-[18px] text-zinc-900">{labels.currentStatus}</h3>
            <div>
              <span className="inline-block px-4 py-2 bg-[#E6F0FF] text-[#0066FF] text-[14px] font-medium rounded-md">
                {content.status}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-[18px] text-zinc-900">{labels.location}</h3>
            <p className="text-[#0066FF] text-[15px] leading-relaxed max-w-[250px]">
              {content.location}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[70%] flex flex-col order-1 md:order-2">
          <h1 className="text-zinc-900 text-3xl md:text-5xl lg:text-[54px] font-medium leading-[1.1] tracking-tight mb-6">
            {content.title}
          </h1>
          <p className="text-zinc-800 text-[17px] leading-[1.8] mb-12 text-justify md:text-left">
            {content.longDescription}
          </p>

          <h3 className="font-medium text-[20px] text-zinc-900 mb-3">{labels.entranceFee}</h3>
          <p className="text-zinc-800 text-[17px] mb-10">
            {labels.feeLabel} <span className="font-medium text-zinc-900">{content.entranceFee}</span>
          </p>

          {/* Navigate with AR Banner */}
          <div className="w-full rounded-xl bg-[#0066FF] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
            {/* Phone Icon */}
            <div className="flex-shrink-0 w-[72px] h-[72px] rounded-full bg-white/20 flex items-center justify-center">
              <Smartphone size={32} className="text-white" strokeWidth={1.5} />
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-white font-bold text-[18px] md:text-[20px] mb-1">
                Navigate with AR
              </h4>
              <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed">
                follow direction in real-time<br />
                using your camera phone
              </p>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-[#0066FF] font-semibold text-[14px] md:text-[15px] rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
            >
              <Compass size={18} className="text-[#0066FF]" strokeWidth={1.5} />
              Start AR Navigation &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
