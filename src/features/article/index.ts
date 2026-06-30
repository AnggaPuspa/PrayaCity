// Public API for the `article` feature (article detail + events listing).
export { ArticleDetail } from "./components/article-detail";
export { RelatedArticles } from "./components/related-articles";
export { EventsFeatured } from "./components/events-featured";
export { EventsExplore } from "./components/events-explore";
export { getArticleBySlug } from "./services/article.service";
export type { Article, RelatedArticle, FeaturedEvent, BlogEvent } from "./types";
