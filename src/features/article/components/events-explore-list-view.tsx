"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { useBlogFilter } from "../controllers/use-blog-filter";
import type { BlogEvent } from "../types";

interface EventsExploreListViewProps {
  blogs: BlogEvent[];
  categories: string[];
}

/** Presentational: blog list with category filter (state via controller). */
export function EventsExploreListView({
  blogs,
  categories,
}: EventsExploreListViewProps) {
  const t = useTranslations("Events");
  const { activeCategory, filtered, toggle, clear } = useBlogFilter(blogs);

  return (
    <section className="w-full bg-[#FAF9F6] pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-8">
          <Typography as="h2" variant="h2" className="text-zinc-900 dark:text-zinc-900 text-3xl md:text-5xl tracking-tight font-light">
            {t.rich("exploreTitle", {
              b: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </Typography>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggle(category)}
              className={cn(
                "px-5 py-2 rounded-full border text-sm transition-colors",
                activeCategory === category
                  ? "bg-zinc-900 border-zinc-900 text-white"
                  : "bg-transparent border-zinc-400 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
              )}
            >
              {category}
            </button>
          ))}
          <button
            type="button"
            onClick={clear}
            className="px-6 py-2 rounded-full border border-zinc-400 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 text-sm transition-colors flex items-center gap-2 ml-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            {t("seeAllCategories")}
          </button>
        </div>

        {/* Blog List */}
        <div className="flex flex-col gap-12 md:gap-16">
          {filtered.map((blog, index) => {
            const words = blog.intro.split(" ");
            const boldIntro = words.slice(0, 6).join(" ");
            const restIntro = words.slice(6).join(" ");

            return (
              <div key={index} className="flex flex-col md:flex-row gap-8 lg:gap-12 group">
                <Link href={`/events/${blog.slug}`} className="block w-full md:w-5/12 shrink-0">
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex flex-col w-full md:w-7/12 py-2">
                  <Link href={`/events/${blog.slug}`} className="block">
                    <Typography as="h3" variant="h3" className="text-zinc-900 dark:text-zinc-900 text-2xl lg:text-[28px] font-medium leading-[1.25] mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-600 transition-colors">
                      {blog.title}
                    </Typography>
                  </Link>
                  <Typography variant="muted" className="text-zinc-500 dark:text-zinc-500 text-[15px] mb-6">
                    {blog.publishedAt}
                  </Typography>

                  <Typography as="p" variant="body" className="text-zinc-700 dark:text-zinc-700 text-base lg:text-[17px] leading-relaxed mb-auto">
                    <strong className="text-zinc-900 dark:text-zinc-900">{boldIntro}</strong> {restIntro}
                  </Typography>

                  <div className="flex items-center justify-between mt-8">
                    <div className="flex gap-2">
                      {blog.categories.map((cat, i) => (
                        <span key={i} className="px-4 py-1.5 bg-[#F2F0E9] rounded-full text-zinc-700 dark:text-zinc-700 text-xs font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <Link href={`/events/${blog.slug}`} className="text-zinc-900 dark:text-zinc-900 text-sm font-medium hover:underline flex items-center gap-1">
                      {t("readMore")} <span className="text-[10px]">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
