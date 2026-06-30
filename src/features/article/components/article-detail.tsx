import { getArticleBySlug } from "../services/article.service";
import { ArticleDetailView } from "./article-detail-view";

/** Container: fetches the localized article by slug, then renders the view. */
export async function ArticleDetail({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const article = await getArticleBySlug(slug, locale);
  return <ArticleDetailView article={article} />;
}
