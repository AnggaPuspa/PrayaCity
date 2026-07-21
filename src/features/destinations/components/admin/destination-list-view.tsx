"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { deleteDestinationAction } from "../../actions/destination.actions";
import { useEffect, useState, useTransition } from "react";

interface AdminDestination {
  id: string;
  slug: string;
  titleEn: string;
  status: string;
  isFeatured: boolean;
  imageSrc: string;
  tags: string[];
  createdAt: string;
}

interface DestinationListViewProps {
  destinations: AdminDestination[];
}

export function DestinationListView({ destinations }: DestinationListViewProps) {
  const t = useTranslations("Admin.destinations");
  const tCommon = useTranslations("Admin.common");
  const locale = useLocale();
  const router = useRouter();
  const [items, setItems] = useState(destinations);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Keep local list in sync when server data changes (create/update/refresh).
  useEffect(() => {
    setItems(destinations);
  }, [destinations]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      !confirm(
        locale === "id"
          ? "Yakin ingin menghapus destinasi ini?"
          : "Are you sure you want to delete this destination?",
      )
    ) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteDestinationAction(id);
      if (result.status === "error") {
        setError(
          result.message ||
            (locale === "id"
              ? "Gagal menghapus destinasi."
              : "Failed to delete destination."),
        );
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    });
  };

  const featuredDestinations = items.filter((d) => d.isFeatured).slice(0, 2);
  const standardDestinations = items.filter((d) => !featuredDestinations.find(f => f.id === d.id));

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header section mimicking the photo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>/</span>
            <span>{t("title")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">{t("title")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/destinations/create`}
            className="bg-[#244199] hover:bg-[#1a3072] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> {tCommon("addNew")}
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Featured Destinations (Top 2) */}
      {featuredDestinations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredDestinations.map((destination) => (
            <div key={destination.id} className="block group relative w-full h-[360px] md:h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gray-200">
                <Link href={`/admin/destinations/${destination.id}/edit`}>
                  <Image
                    src={destination.imageSrc}
                    alt={destination.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a2e]/90 via-[#2a2a4a]/70 to-transparent pointer-events-none"></div>

              {/* Top Right: Category Badge */}
              <div className="absolute top-6 right-6 z-10 pointer-events-none">
                <span className="bg-[#244199] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide shadow-sm">
                  {destination.tags[0] || tCommon("general")}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                <Link href={`/admin/destinations/${destination.id}/edit`}>
                  <h3 className="text-white text-2xl md:text-[28px] font-bold leading-tight mb-4 drop-shadow-md hover:text-gray-200 transition-colors">
                    {destination.titleEn}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between text-white/90 text-sm font-medium">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/destinations/${destination.id}/edit`} className="flex items-center gap-1.5 hover:text-white text-white/80 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                      {tCommon("edit")}
                    </Link>
                    <button onClick={(e) => handleDelete(destination.id, e)} disabled={isPending} className="flex items-center gap-1.5 hover:text-red-300 text-white/80 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      {tCommon("delete")}
                    </button>
                  </div>
                  {/* Intentionally omitted date text per user instruction (Destinations do not have a display date field) */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standard Destinations (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {standardDestinations.map((destination) => (
          <div key={destination.id} className="block group bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-[400px]">
            <Link href={`/admin/destinations/${destination.id}/edit`} className="relative w-full h-[200px] overflow-hidden bg-gray-100 shrink-0 block">
              <Image
                src={destination.imageSrc}
                alt={destination.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>

            <div className="p-6 flex flex-col flex-1 pt-5">
              <div className="mb-3">
                <span className="bg-gray-50 text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-gray-100 pointer-events-none">
                  {destination.tags[0] || tCommon("general")}
                </span>
              </div>

              <Link href={`/admin/destinations/${destination.id}/edit`}>
                <h3 className="text-[#1a1a2e] text-[19px] font-bold leading-[1.3] mb-3 group-hover:text-[#244199] transition-colors line-clamp-3">
                  {destination.titleEn}
                </h3>
              </Link>

              <div className="flex items-center justify-between text-gray-500 text-[13px] font-medium mt-auto pt-4">
                <div className="flex items-center gap-4">
                  <Link href={`/admin/destinations/${destination.id}/edit`} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    {tCommon("edit")}
                  </Link>
                  <button onClick={(e) => handleDelete(destination.id, e)} disabled={isPending} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    {tCommon("delete")}
                  </button>
                </div>
                {/* Intentionally omitted date text per user instruction (Destinations do not have a display date field) */}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="w-full py-20 flex justify-center items-center text-gray-500">
          {locale === "id" ? "Destinasi tidak ditemukan." : "No destinations found."}
        </div>
      )}
    </div>
  );
}
