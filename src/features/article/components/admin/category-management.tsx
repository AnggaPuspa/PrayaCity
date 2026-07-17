"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { 
  createCategoryAction, 
  updateCategoryAction, 
  deleteCategoryAction 
} from "../../actions/category.actions";

type CategoryWithCount = {
  id: string;
  name: string;
  _count: {
    events: number;
  };
};

export function CategoryManagement({ initialCategories }: { initialCategories: CategoryWithCount[] }) {
  const t = useTranslations("Admin.categories");
  const tCommon = useTranslations("Admin.common");
  const [categories, setCategories] = useState<CategoryWithCount[]>(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const res = await createCategoryAction(formData);
    
    if (res.error) {
      setError(res.error);
    } else if (res.category) {
      setCategories([...categories, { ...res.category, _count: { events: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
      setIsAdding(false);
    }
    
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const res = await updateCategoryAction(id, formData);
    
    if (res.error) {
      setError(res.error);
    } else if (res.category) {
      setCategories(categories.map(c => c.id === id ? { ...c, name: res.category.name } : c));
      setEditingId(null);
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(t("deleteConfirm", { name }))) return;
    
    setLoading(true);
    setError(null);
    
    const res = await deleteCategoryAction(id);
    
    if (res.error) {
      setError(res.error);
    } else {
      setCategories(categories.filter(c => c.id !== id));
    }
    
    setLoading(false);
  };

  // Split categories into 3 columns for layout
  const chunkSize = Math.ceil(Math.max(categories.length, 1) / 3);
  const col1 = categories.slice(0, chunkSize);
  const col2 = categories.slice(chunkSize, chunkSize * 2);
  const col3 = categories.slice(chunkSize * 2);

  const renderCategoryList = (list: CategoryWithCount[]) => {
    if (list.length === 0) return null;

    return (
      <div className="border border-gray-100 rounded-lg overflow-hidden bg-white">
        <ul className="divide-y divide-gray-100">
          {list.map((category) => (
            <li key={category.id} className="py-3 px-4 flex justify-between items-center group hover:bg-gray-50/50 transition-colors">
              {editingId === category.id ? (
                <form onSubmit={(e) => handleUpdate(e, category.id)} className="flex gap-2 w-full">
                  <input 
                    type="text" 
                    name="name" 
                    className="flex-1 min-w-0 rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#244199] focus:border-[#244199]" 
                    defaultValue={category.name} 
                    required 
                    minLength={2}
                    autoFocus
                  />
                  <button type="submit" className="text-green-600 hover:text-green-700 p-1" disabled={loading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </button>
                  <button type="button" className="text-gray-400 hover:text-gray-600 p-1" onClick={() => setEditingId(null)} disabled={loading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-gray-400 font-mono text-sm leading-none">-</span>
                    <span className="font-medium text-gray-500 text-[15px] truncate">{category.name}</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 shrink-0">
                      {category._count.events}
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0 bg-gradient-to-l from-white pl-2">
                    <button 
                      className="p-1.5 text-[#244199] hover:bg-blue-50 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
                      onClick={() => setEditingId(category.id)}
                      disabled={loading}
                      title={t("edit")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                    <button 
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent"
                      onClick={() => handleDelete(category.id, category.name)}
                      disabled={loading || category._count.events > 0}
                      title={t("delete")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full font-sans -mt-14 relative z-10">
      {/* We use a negative margin to pull the "Add New" button up into the same horizontal line as the outer page's header */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#2143a5] hover:bg-[#1a3584] text-white px-4 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>{isAdding ? "-" : "+"}</span> {isAdding ? "Cancel" : "Add New"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] p-6 lg:p-8 border border-gray-100">
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100">
            {error}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleAdd} className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">New Category Name</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                name="name" 
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2143a5]/20 focus:border-[#2143a5] transition-all" 
                placeholder="e.g. Technology, Lifestyle..." 
                required 
                minLength={2}
                maxLength={50}
                autoFocus
              />
              <button className="bg-[#2143a5] hover:bg-[#1a3584] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-md text-sm font-medium transition-colors" onClick={() => setIsAdding(false)} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* 3-Column Layout without the fake titles */}
        {categories.length === 0 ? (
           <div className="text-center py-10 text-gray-400 border border-gray-100 rounded-lg">
             No categories found.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {col1.length > 0 && <div>{renderCategoryList(col1)}</div>}
            {col2.length > 0 && <div>{renderCategoryList(col2)}</div>}
            {col3.length > 0 && <div>{renderCategoryList(col3)}</div>}
          </div>
        )}

      </div>
    </div>
  );
}
