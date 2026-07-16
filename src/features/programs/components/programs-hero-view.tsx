interface ProgramsHeroViewProps {
  eyebrow: string;
  title: string;
}

export function ProgramsHeroView({ eyebrow, title }: ProgramsHeroViewProps) {
  return (
    <section className="relative flex flex-col justify-end min-h-screen w-full overflow-hidden">
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-8 pb-20 md:pb-32">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-[#D4D4D4] text-[15px] md:text-[18px] font-medium tracking-wide">
            {eyebrow}
          </span>
          <h1 className="text-white text-[32px] sm:text-[42px] md:text-[64px] font-bold leading-[1.1] tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
