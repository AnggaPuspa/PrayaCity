import Image from 'next/image';
import type { CulinaryItem } from '../types';

interface CultureCulinaryViewProps {
  header: {
    subtitle: string;
    titleHighlight: string;
    titleRest: string;
  };
  footer: {
    moreHighlight: string;
    moreRest: string;
  };
  items: CulinaryItem[];
}

export function CultureCulinaryView({ header, footer, items }: CultureCulinaryViewProps) {
  return (
    <section className="relative w-full bg-[#FAFAFA] text-[#1A1A1A] pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        
        {/* Mobile Header (Hidden on desktop) */}
        <div className="flex md:hidden flex-col items-start mb-8">
          <span className="inline-flex px-4 py-1.5 bg-[#0F172A] text-white text-[13px] font-semibold rounded-full mb-4">
            {header.subtitle}
          </span>
          <h2 className="text-[#1A1A1A] text-[36px] font-extrabold tracking-tight leading-[1.15]">
            <span className="text-[#0066FF]">{header.titleHighlight}</span>{header.titleRest}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Left Column (Items 0, 1 and text) */}
          <div className="md:col-span-6 flex flex-col gap-6 lg:gap-8">
            <CulinaryCard item={items[0]} />
            <CulinaryCard item={items[1]} />
            {/* Desktop Footer Text (Hidden on mobile) */}
            <div className="hidden md:block pt-2 md:pt-4">
              <h3 className="text-[20px] md:text-[24px] font-extrabold tracking-tight text-[#1A1A1A]">
                <span className="text-[#0066FF]">{footer.moreHighlight}</span>{footer.moreRest}
              </h3>
            </div>
          </div>

          {/* Right Column (Header, Items 2, 3) */}
          <div className="md:col-span-6 flex flex-col gap-6 lg:gap-8">
            {/* Desktop Header (Hidden on mobile) */}
            <div className="hidden md:flex flex-col items-start mb-2 md:mb-6">
              <span className="inline-flex px-4 py-1.5 bg-[#0F172A] text-white text-[13px] md:text-[14px] font-semibold rounded-full mb-4">
                {header.subtitle}
              </span>
              <h2 className="text-[#1A1A1A] text-[36px] md:text-[44px] lg:text-[48px] font-extrabold tracking-tight leading-[1.15]">
                <span className="text-[#0066FF]">{header.titleHighlight}</span>{header.titleRest}
              </h2>
            </div>
            <CulinaryCard item={items[2]} />
            <CulinaryCard item={items[3]} />
          </div>

        </div>

        {/* Mobile Footer Text (Hidden on desktop) */}
        <div className="block md:hidden pt-8 mt-2">
          <h3 className="text-[20px] font-extrabold tracking-tight text-[#1A1A1A]">
            <span className="text-[#0066FF]">{footer.moreHighlight}</span>{footer.moreRest}
          </h3>
        </div>
      </div>
    </section>
  );
}

function CulinaryCard({ item }: { item: CulinaryItem }) {
  return (
    <div className="bg-white rounded-[24px] p-4 flex flex-col w-full shadow-sm">
      <div className="w-full rounded-[16px] overflow-hidden mb-4">
        <Image
          src={item.imageSrc}
          alt={item.title}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-auto object-cover"
        />
      </div>
      <h3 className="text-[18px] md:text-[20px] font-extrabold tracking-tight text-[#1A1A1A] pb-1">
        {item.title}
      </h3>
    </div>
  );
}
