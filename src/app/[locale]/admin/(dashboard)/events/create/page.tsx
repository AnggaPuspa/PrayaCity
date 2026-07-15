import { EventCreateView } from "@/features/article/components/admin/event-create-view";
import { getCategories } from "@/features/article/services/events.service";
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
