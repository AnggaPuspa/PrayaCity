import Image from "next/image";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { Article } from "../types";

// Inline icons for the share widget (kept local to avoid an icon dependency).
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-700">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-700">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.177-.298-.018-.46.13-.61.134-.135.297-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.756.455 3.411 1.272 4.84L2 22l5.35-1.402C8.75 21.363 10.334 21.8 12 21.8c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.488 0-2.946-.381-4.225-1.1l-.303-.171-3.136.822.836-3.058-.188-.299A8.163 8.163 0 013.8 12c0-4.522 3.678-8.2 8.2-8.2s8.2 3.678 8.2 8.2-3.678 8.2-8.2 8.2z"/>
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-700">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export function ArticleShareWidget({ article }: { article: Article }) {
  const t = useTranslations("Article");

  return (
    <div className="sticky top-32 w-full max-w-sm ml-auto">
      <Typography variant="body" className="text-zinc-500 dark:text-zinc-500 text-sm mb-4">
        {t("share")}
      </Typography>

      <div className="bg-[#F5F2EC] rounded-2xl p-5 mb-4 border border-[#E8E2D6]">
        <div className="flex gap-4">
          <div className="relative w-20 h-24 shrink-0 rounded-lg overflow-hidden">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <Typography variant="body" className="text-zinc-900 dark:text-zinc-900 text-sm font-medium line-clamp-4 leading-snug">
            {article.title}
          </Typography>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" aria-label="Facebook" className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5F2EC] hover:bg-[#E8E2D6] transition-colors">
          <FacebookIcon />
        </button>
        <button type="button" aria-label="WhatsApp" className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5F2EC] hover:bg-[#E8E2D6] transition-colors">
          <WhatsAppIcon />
        </button>
        <button type="button" aria-label="Copy link" className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5F2EC] hover:bg-[#E8E2D6] transition-colors">
          <LinkIcon />
        </button>
      </div>
    </div>
  );
}
