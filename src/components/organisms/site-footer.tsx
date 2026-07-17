import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const POPULAR_DESTINATIONS = [
  { label: "Bukit Merese", href: "/destinations/bukitMerese" },
  { label: "Gerupuk Beach", href: "/destinations" },
  { label: "Sade Traditional Village", href: "/destinations" },
  { label: "Kuta Mandalika Beach", href: "/destinations/kutaMandalika" },
] as const;

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-24 pb-12">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16 md:mb-28">
          {/* Col 1 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-[28px] font-semibold text-white tracking-tight">PrayaCity</h2>
            <p className="text-[#A3A3A3] text-[15px]">
              {t("tagline")}
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-white text-[16px]">{t("link")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              {siteConfig.nav.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-white text-[16px]">{t("destination")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              {POPULAR_DESTINATIONS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-white text-[16px]">{t("socialMedia")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Tiktok</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Youtube</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-white text-[16px]">{t("contactUs")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              <li><a href="tel:+123456789" className="hover:text-white transition-colors">+123-456-789</a></li>
              <li><a href="mailto:Praya@gmail.com" className="hover:text-white transition-colors">Praya@gmail.com</a></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">{t("needHelp")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#737373] text-[14px] gap-6">
          <div>{t("copyright")}</div>
          <div className="flex gap-8">
            <Link href="/coming-soon" className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="/coming-soon" className="hover:text-white transition-colors">{t("terms")}</Link>
            <Link href="/coming-soon" className="hover:text-white transition-colors">{t("legal")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
