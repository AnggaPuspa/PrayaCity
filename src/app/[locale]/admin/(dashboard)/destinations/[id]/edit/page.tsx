import { DestinationEditView, getAdminDestinationById } from "@/features/destinations";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function AdminDestinationEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const destination = await getAdminDestinationById(id);

  if (!destination) return notFound();

  return <DestinationEditView initialData={destination} />;
}
