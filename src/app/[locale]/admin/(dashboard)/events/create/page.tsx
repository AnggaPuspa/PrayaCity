import { EventCreateView, getCategories } from "@/features/article";
import { setRequestLocale } from "next-intl/server";

export default async function AdminEventCreatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const categories = await getCategories();

  return <EventCreateView categories={categories} />;
}
