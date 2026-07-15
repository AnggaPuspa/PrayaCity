import { DestinationListView, getAdminDestinations } from "@/features/destinations";
import { setRequestLocale } from "next-intl/server";

export default async function AdminDestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const destinations = await getAdminDestinations();
  
  return <DestinationListView destinations={destinations} />;
}
