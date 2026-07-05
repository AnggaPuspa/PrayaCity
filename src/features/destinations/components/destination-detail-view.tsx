import Image from "next/image";
import { DestinationItem } from "../types";

interface DestinationDetailViewProps {
  item: DestinationItem;
  title: string;
  longDescription: string;
  location: string;
  status: string;
  entranceFee: string;
  labels: {
    currentStatus: string;
    location: string;
    entranceFee: string;
    feeLabel: string;
  };
  translatedTags: string[];
}

export function DestinationDetailView({
  item,
  title,
  longDescription,
  location,
  status,
  entranceFee,
  labels,
  translatedTags,
}: DestinationDetailViewProps) {
  return (
    <div className="w-full bg-white text-[#18181B] pb-24 pt-24">
      {/* Hero Image */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-[24px] overflow-hidden">
          <Image 
            src={item.detailImageSrc || item.imageSrc} 
            alt={title} 
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
            {translatedTags.map((tag, i) => (
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
                {status}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-[18px] text-zinc-900">{labels.location}</h3>
            <p className="text-[#0066FF] text-[15px] leading-relaxed max-w-[250px]">
              {location}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[70%] flex flex-col order-1 md:order-2">
          <h1 className="text-zinc-900 text-3xl md:text-5xl lg:text-[54px] font-medium leading-[1.1] tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-zinc-800 text-[17px] leading-[1.8] mb-12 text-justify md:text-left">
            {longDescription}
          </p>

          <h3 className="font-medium text-[20px] text-zinc-900 mb-3">{labels.entranceFee}</h3>
          <p className="text-zinc-800 text-[17px]">
            {labels.feeLabel} <span className="font-medium text-zinc-900">{entranceFee}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
