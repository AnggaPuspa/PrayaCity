import Link from "next/link";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("Cta");

  return (
    <section 
      className="relative w-full bg-[#070D1A] py-28 md:py-36 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/ctaasset.svg')" }}
    >
      <div className="mx-auto w-full max-w-4xl px-6 relative z-10 text-center flex flex-col items-center">
        
        <span className="text-white/90 text-[18px] md:text-[20px] font-medium mb-4 block">
          {t("eyebrow")}
        </span>
        
        <h2 className="text-white text-[36px] md:text-[48px] font-bold leading-[1.2] tracking-tight mb-6">
          {t("titleLine1")} <br />
          {t("titleLine2")}
        </h2>
        
        <p className="text-[#A3A3A3] text-[14px] md:text-[15px] font-normal leading-[1.6] mb-10">
          {t("description1")} <br className="hidden md:block" />
          {t("description2")}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link 
            href="#" 
            className="flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-gray-100 transition-colors"
          >
            {t("explore")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </Link>

          <Link 
            href="#" 
            className="flex items-center gap-2 text-white px-8 py-3.5 rounded-full text-[15px] font-medium hover:text-white/80 transition-colors"
          >
            {t("more")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
