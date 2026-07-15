import { EventEditView, getCategories, getAdminEventById } from "@/features/article";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function AdminEventEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const [categories, event] = await Promise.all([
    getCategories(),
    getAdminEventById(id)
  ]);

  if (!event) return notFound();

  return <EventEditView initialData={event} categories={categories} />;
}
