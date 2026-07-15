import { getDestinations } from "../services/destinations.service";
import { GridSectionClient } from "./grid-section-client";

/** Container: fetches destinations from DB and passes to the client view */
export async function GridSection({ locale }: { locale: string }) {
  const items = await getDestinations(locale);
  return <GridSectionClient initialItems={items} />;
}
