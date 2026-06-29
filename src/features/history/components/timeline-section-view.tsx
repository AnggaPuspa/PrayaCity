interface TimelineSectionViewProps {
  header: {
    title: string;
    description: string;
  };
}

/**
 * Presentational component for the Timeline intro section.
 */
export function TimelineSectionView({ header }: TimelineSectionViewProps) {
  return (
    <section className="w-full bg-[#E5E5E5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-10 px-8">
        <div className="flex-1">
          <h2 className="text-[#1A1A1A] text-4xl md:text-[42px] font-bold leading-[1.2] whitespace-pre-line tracking-tight">
            {header.title}
          </h2>
        </div>
        <div className="flex-1 md:text-right">
          <p className="text-[#4A4A4A] text-[14px] md:text-[15px] leading-relaxed max-w-md ml-auto font-medium">
            {header.description}
          </p>
        </div>
      </div>
    </section>
  );
}
