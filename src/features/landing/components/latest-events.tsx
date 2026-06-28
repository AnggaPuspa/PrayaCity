import { LATEST_EVENTS } from "../data/events";
import { LatestEventsView } from "./latest-events-view";

/** Container: supplies data to the presentational view. */
export function LatestEvents() {
  return <LatestEventsView events={LATEST_EVENTS} />;
}
