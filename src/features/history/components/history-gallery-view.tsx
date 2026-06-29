interface HistoryGalleryViewProps {
  header: {
    eyebrow: string;
    title1: string;
    title2: string;
  };
  images: readonly string[];
}

/**
 * Presentational component for the History gallery (masonry).
 * Receives translated strings + image list as props.
 */
export function HistoryGalleryView({ header, images }: HistoryGalleryViewProps) {
  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-gray-900 font-medium text-lg mb-2">
            {header.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {header.title1}
            <span className="text-[#1860e6]">{header.title2}</span>
          </h2>
        </div>

        <div className="columns-2 md:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {images.map((src, index) => (
            <div key={index} className="break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element -- masonry relies on intrinsic image height */}
              <img
                src={src}
                alt={`History Glimpse ${index + 1}`}
                className="w-full h-auto rounded-xl md:rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
