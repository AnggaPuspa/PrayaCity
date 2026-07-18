import { DestinationCard } from "./destination-card";
import type { DestinationCategory, DestinationCategoryOption, DestinationGridItem } from "../types";

interface GridSectionViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: DestinationCategory;
  setActiveCategory: (category: DestinationCategory) => void;
  categories: DestinationCategoryOption[];
  paginatedItems: DestinationGridItem[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  goToPage: (page: number) => void;
  searchPlaceholder: string;
  emptyStateMessage: string;
}

export function GridSectionView({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  paginatedItems,
  totalItems,
  currentPage,
  totalPages,
  canGoPrev,
  canGoNext,
  goToPage,
  searchPlaceholder,
  emptyStateMessage,
}: GridSectionViewProps) {
  const showPagination = totalItems > 0 && totalPages > 1;

  return (
    <section className="relative w-full pb-24 md:pb-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col mb-8 md:mb-12 mt-2 md:-mt-6 relative z-20">
          <div className="w-full">
            <div className="flex justify-center w-full mb-6 md:mb-8">
              <div className="relative w-full max-w-[850px]">
                <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-[#18181B] text-white placeholder-gray-400 pl-12 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-4 rounded-xl text-[14px] md:text-[16px] focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 md:px-8 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-medium transition-colors ${
                    activeCategory === cat.value
                      ? "bg-[#0066FF] text-white"
                      : "border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedItems.map((item) => (
            <DestinationCard
              key={item.id}
              item={item}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        {totalItems === 0 && (
          <div className="w-full py-20 flex justify-center items-center text-white/50">
            {emptyStateMessage}
          </div>
        )}

        {showPagination && (
          <div className="mt-10 md:mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={!canGoPrev}
              aria-label="Previous page"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:text-white hover:border-white/40 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`h-10 min-w-10 px-3 rounded-full text-[13px] md:text-[14px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#0066FF] text-white"
                      : "border border-white/20 text-white/70 hover:text-white hover:border-white/40"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={!canGoNext}
              aria-label="Next page"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:text-white hover:border-white/40 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
