import { DestinationCreateView } from "@/features/destinations/components/admin/destination-create-view";
import { setRequestLocale } from "next-intl/server";

export default async function AdminDestinationCreatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DestinationCreateView />;
}
