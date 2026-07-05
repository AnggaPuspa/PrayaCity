import Image from 'next/image';
import type { Tradition } from '../types';

interface CultureTraditionsViewProps {
  subtitle: string;
  titleHighlight: string;
  titleRest: string;
  viewMore: string;
  traditions: Tradition[];
}

export const CultureTraditionsView = ({
  subtitle,
  titleHighlight,
  titleRest,
  viewMore,
  traditions,
}: CultureTraditionsViewProps) => {
  return (
    <section className="relative w-full bg-[#FAF9F6] py-24 md:py-32">
      {/* Container exactly matching site-header */}
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center w-full mx-auto mb-10 md:mb-14 flex flex-col items-center">
          <span className="text-[#333333] text-[18px] md:text-[20px] font-medium mb-1 md:mb-2">
            {subtitle}
          </span>
          <h2 className="text-[#1A1A1A] text-[36px] md:text-[44px] lg:text-[48px] font-bold tracking-tight leading-tight">
            <span className="text-[#0066FF]">{titleHighlight}</span>
            {titleRest}
          </h2>
        </div>

        {/* Sticky Cards Container */}
        <div className="relative w-full max-w-7xl mx-auto">
          {traditions.map((tradition, index) => (
            <div
              key={index}
              className={`sticky flex flex-col md:flex-row items-center gap-8 lg:gap-16 bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full ${
                index !== traditions.length - 1 ? 'mb-24' : ''
              }`}
              style={{
                top: `calc(120px + ${index * 20}px)`,
                zIndex: index,
              }}
            >
              {/* Left: Image */}
              <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                  src={tradition.imageSrc}
                  alt={tradition.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <span className="inline-block px-4 py-1.5 bg-[#1A1A1A] text-white text-[13px] md:text-[14px] font-medium rounded-full mb-5">
                  {tradition.tag}
                </span>
                <h3 className="text-[#1A1A1A] text-[24px] md:text-[28px] font-bold mb-4 leading-[1.3]">
                  {tradition.title}
                </h3>
                <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.6] mb-8">
                  {tradition.description}
                </p>
                <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-[#E5E7EB] text-[14px] font-medium text-[#4B5563] hover:bg-gray-50 transition-colors">
                  {viewMore} ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
