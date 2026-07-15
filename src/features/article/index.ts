// Public API for the `article` feature (article detail + events listing + admin).
export { ArticleDetail } from "./components/article-detail";
export { RelatedArticles } from "./components/related-articles";
export { EventsFeatured } from "./components/events-featured";
export { EventsExplore } from "./components/events-explore";
export { getArticleBySlug } from "./services/article.service";
export type { Article, RelatedArticle, FeaturedEvent, BlogEvent } from "./types";

// Admin components
export { EventListView } from "./components/admin/event-list-view";
export { EventCreateView } from "./components/admin/event-create-view";
export { EventEditView } from "./components/admin/event-edit-view";
export { CategoryManagement } from "./components/admin/category-management";

// Admin services (server-only — only import from server components / actions)
export {
  getAdminEvents,
  getAdminEventById,
  getCategories,
} from "./services/events.service";
export { getCategories as getCategoriesAdmin } from "./services/category.service";
