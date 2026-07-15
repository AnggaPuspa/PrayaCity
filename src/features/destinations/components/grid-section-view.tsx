import { DestinationCard } from "./destination-card";
import type { DestinationCategory, DestinationCategoryOption, DestinationGridItem } from "../types";

interface GridSectionViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: DestinationCategory;
  setActiveCategory: (category: DestinationCategory) => void;
  categories: DestinationCategoryOption[];
  filteredItems: DestinationGridItem[];
  searchPlaceholder: string;
  emptyStateMessage: string;
}

export function GridSectionView({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  filteredItems,
  searchPlaceholder,
  emptyStateMessage,
}: GridSectionViewProps) {
  return (
    <section className="relative w-full pb-24 md:pb-32 px-6">
      <div className="container mx-auto max-w-7xl">

        {/* Search & Filters Container */}
        <div className="flex flex-col mb-8 md:mb-12 mt-2 md:-mt-6 relative z-20">
          <div className="w-full">
            {/* Search Bar - CENTERED */}
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

            {/* Category Filters - LEFT ALIGNED WITH NAVBAR */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 md:px-8 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-medium transition-colors ${activeCategory === cat.value
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <DestinationCard
              key={item.id}
              item={item}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="w-full py-20 flex justify-center items-center text-white/50">
            {emptyStateMessage}
          </div>
        )}

      </div>
    </section>
  );
}
