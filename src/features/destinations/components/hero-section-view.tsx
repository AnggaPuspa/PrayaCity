interface HeroSectionViewProps {
  eyebrow: string;
  title: string;
}

export function HeroSectionView({ eyebrow, title }: HeroSectionViewProps) {
  return (
    <section className="relative w-full pt-32 pb-8 md:pt-40 md:pb-24 px-6 flex flex-col items-start md:items-center text-left md:text-center">
      <span className="text-white/80 text-[16px] md:text-[22px] font-medium tracking-wide mb-4 md:mb-6">
        {eyebrow}
      </span>
      <h1 className="text-white text-[32px] md:text-[60px] lg:text-[64px] font-bold tracking-normal leading-[1.2] w-full max-w-[1200px] md:mx-auto whitespace-normal md:whitespace-pre-line">
        {title}
      </h1>
    </section>
  );
}