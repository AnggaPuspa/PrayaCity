import Image from "next/image";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import { RelatedArticle } from "../types";

interface RelatedArticlesViewProps {
  articles: RelatedArticle[];
}

/** Presentational: renders the related-articles grid from props only. */
export function RelatedArticlesView({ articles }: RelatedArticlesViewProps) {
  const t = useTranslations("Article");

  return (
    <section className="w-full bg-[#FAF9F6] pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-t border-zinc-200 pt-16">
          <Typography as="h2" variant="h2" className="text-zinc-900 dark:text-zinc-900 text-3xl md:text-4xl font-medium tracking-tight">
            {t.rich("related", { b: (chunks) => <strong>{chunks}</strong> })}
          </Typography>
          <Link href="/events" className="hidden md:inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#2A3439] text-white hover:bg-[#1E262A] transition-colors text-sm font-medium">
            {t("seeMore")} ↗
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link key={index} href={`/events/${article.slug}`} className="group block">
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full">
                  <span className="text-zinc-900 dark:text-zinc-900 text-xs font-medium">{article.category}</span>
                </div>
              </div>
              <Typography as="h3" variant="h3" className="text-zinc-900 dark:text-zinc-900 text-lg font-medium leading-snug mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-600 transition-colors">
                {article.title}
              </Typography>
              <Typography variant="muted" className="text-zinc-500 dark:text-zinc-500 text-sm">
                {article.publishedAt}
              </Typography>
            </Link>
          ))}
        </div>

        {/* Mobile View More Button */}
        <div className="mt-8 md:hidden">
          <Link href="/events" className="inline-flex w-full items-center justify-center h-12 px-6 rounded-full bg-[#2A3439] text-white hover:bg-[#1E262A] transition-colors text-sm font-medium">
            {t("seeMore")} ↗
          </Link>
        </div>

      </div>
    </section>
  );
}
