import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArticleDetail, RelatedArticles, getArticleBySlug } from "@/features/article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  return {
    title: article.title,
    description: article.paragraphs[0],
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ArticleDetail slug={slug} locale={locale} />
      <RelatedArticles locale={locale} excludeSlug={slug} />
    </>
  );
}
