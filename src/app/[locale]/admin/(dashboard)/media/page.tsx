import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MediaGallery } from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Media Library - PrayaCity Admin",
};

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin" });

  return (
    <div className="w-full px-4 py-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Media Library</h1>
        <p className="text-gray-500">Upload and manage images for events and destinations</p>
      </div>
      <MediaGallery />
    </div>
  );
}
