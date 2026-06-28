import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function AboutSection() {
  const t = await getTranslations("About");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-28 items-center justify-between">
          {/* Images Section */}
          <div className="relative w-full max-w-[360px] lg:max-w-[480px] mx-auto md:mx-0 shrink-0">
            {/* Main Image */}
            <div className="relative w-full h-[400px] lg:h-[480px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
              <Image
                src="/aboutsectionimg/aboutsec1.webp"
                alt="Sasak traditional dance"
                fill
                sizes="(max-width: 768px) 360px, 480px"
                className="object-cover object-[20%_center]"
              />
            </div>
            {/* Overlapping Asset (Already rounded with shadow from asset) */}
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-24 lg:-right-32 w-[240px] lg:w-[280px] h-[300px] lg:h-[340px]">
              <Image
                src="/aboutsectionimg/aboutsec2.webp"
                alt="Traditional weaving textiles"
                fill
                sizes="(max-width: 1024px) 240px, 280px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col max-w-[540px]">
            <span className="text-zinc-800 dark:text-zinc-800 text-[20px] font-medium mb-2 block">
              {t("eyebrow")}
            </span>
            <h2 className="text-[40px] md:text-[52px] font-bold text-zinc-950 dark:text-zinc-950 leading-[1.15] tracking-tight mb-6">
              {t("titleStart")}<span className="text-[#0055FF]">{t("legend")}</span>{t("middle")}<br />
              <span className="text-[#0055FF]">{t("ambition")}</span>
            </h2>

            <div className="flex flex-col gap-5 text-[#737373] text-[15px] font-normal leading-[1.8]">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
