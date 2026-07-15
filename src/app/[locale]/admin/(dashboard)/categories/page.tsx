import type { Metadata } from "next";
import { getCategoriesAdmin, CategoryManagement } from "@/features/article";

export const metadata: Metadata = {
  title: "Manage Categories - PrayaCity Admin",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesAdmin();

  return (
    <div className="w-full px-4 py-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Categories</h1>
        <p className="text-gray-500">Manage categories used for events and articles</p>
      </div>
        
      <CategoryManagement initialCategories={categories} />
    </div>
  );
}
