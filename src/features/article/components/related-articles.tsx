import { getRelatedArticles } from "../services/article.service";
import { RelatedArticlesView } from "./related-articles-view";

/** Container: fetches localized related articles, then renders the view. */
export async function RelatedArticles({
  locale,
  excludeSlug,
}: {
  locale: string;
  excludeSlug?: string;
}) {
  const articles = await getRelatedArticles(locale, excludeSlug);
  return (
    <div className="text-zinc-900 dark:text-zinc-100">
      <RelatedArticlesView articles={articles} />
    </div>
  );
}
