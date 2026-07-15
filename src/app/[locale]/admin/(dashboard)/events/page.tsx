import { EventListView, getAdminEvents } from "@/features/article";

export default async function AdminEventsPage() {
  const events = await getAdminEvents();
  
  // Transform the prisma objects to match the view's expected type if needed,
  // but Prisma's return type naturally satisfies AdminEvent here because we included categories.
  return <EventListView events={events as any} />;
}
