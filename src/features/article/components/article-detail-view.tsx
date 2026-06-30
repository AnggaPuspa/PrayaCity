import Image from "next/image";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import { Article } from "../types";
import { ArticleShareWidget } from "./article-share-widget";

interface ArticleDetailViewProps {
  article: Article;
}

export function ArticleDetailView({ article }: ArticleDetailViewProps) {
  const t = useTranslations("Article");

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-900 transition-colors">{t("breadcrumbHome")}</Link>
          <span className="mx-2">›</span>
          <Link href="/events" className="hover:text-zinc-900 dark:hover:text-zinc-900 transition-colors">{t("breadcrumbEvents")}</Link>
          <span className="mx-2">›</span>
          <span className="text-zinc-500 dark:text-zinc-500 line-clamp-1 max-w-[200px] md:max-w-none">{article.title}</span>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-video md:h-[600px] rounded-[32px] overflow-hidden mb-16">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">

          {/* Main Article Content (Left) */}
          <div className="flex-1 max-w-3xl">
            <Typography variant="body" className="text-zinc-500 dark:text-zinc-500 text-sm mb-4 font-medium tracking-wide uppercase">
              {article.category}
            </Typography>

            <Typography as="h1" variant="h1" className="text-zinc-900 dark:text-zinc-900 text-3xl md:text-5xl lg:text-[54px] font-medium leading-[1.1] tracking-tight mb-6">
              {article.title}
            </Typography>

            <Typography variant="body" className="text-zinc-500 dark:text-zinc-500 text-[15px] mb-12">
              {article.publishedAt}
            </Typography>

            <div className="prose prose-lg prose-zinc max-w-none">
              {article.paragraphs.map((paragraph, index) => {
                // Reference design: first paragraph is larger/lighter.
                if (index === 0) {
                  return (
                    <Typography key={index} as="p" variant="body" className="text-zinc-600 dark:text-zinc-600 text-xl leading-relaxed font-light mb-8">
                      {paragraph}
                    </Typography>
                  );
                }

                // Reference design: bold the opening words of the second paragraph.
                if (index === 1) {
                  const words = paragraph.split(" ");
                  const boldPart = words.slice(0, 6).join(" ");
                  const restPart = words.slice(6).join(" ");
                  return (
                    <Typography key={index} as="p" variant="body" className="text-zinc-800 dark:text-zinc-800 text-[17px] leading-[1.8] mb-6">
                      <strong>{boldPart}</strong> {restPart}
                    </Typography>
                  );
                }

                return (
                  <Typography key={index} as="p" variant="body" className="text-zinc-800 dark:text-zinc-800 text-[17px] leading-[1.8] mb-6">
                    {paragraph}
                  </Typography>
                );
              })}
            </div>
          </div>

          {/* Share Widget (Right) */}
          <div className="hidden md:block w-full max-w-[280px] shrink-0">
            <ArticleShareWidget article={article} />
          </div>

          {/* Mobile Share Widget */}
          <div className="block md:hidden w-full mt-8 border-t border-zinc-200 pt-8">
            <ArticleShareWidget article={article} />
          </div>

        </div>
      </div>
    </div>
  );
}
