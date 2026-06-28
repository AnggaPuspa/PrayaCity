import Link from "next/link";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-24 pb-12">
      <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-28">
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
              <li><Link href="#" className="hover:text-white transition-colors">{nav("home")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{nav("history")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{nav("culture")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{nav("destinations")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{nav("programs")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{nav("events")}</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <h3 className="font-semibold text-white text-[16px]">{t("destination")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              <li><Link href="#" className="hover:text-white transition-colors">Bukit Merese</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Gerupuk Beach</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sade Traditional Village</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kuta Mandalika Beach</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-white text-[16px]">{t("socialMedia")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tiktok</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Youtube</Link></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-white text-[16px]">{t("contactUs")}</h3>
            <ul className="flex flex-col gap-4 text-[#A3A3A3] text-[14px]">
              <li><a href="#" className="hover:text-white transition-colors">+123-456-789</a></li>
              <li><a href="mailto:Praya@gmail.com" className="hover:text-white transition-colors">Praya@gmail.com</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("needHelp")}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#737373] text-[14px] gap-6">
          <div>{t("copyright")}</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t("terms")}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t("legal")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
