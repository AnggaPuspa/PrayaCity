import { DISCOVER_HEADER, DISCOVER_ITEMS } from "../data/discover";
import { DiscoverSectionView } from "./discover-section-view";

/** Container: supplies data to the presentational view. */
export function DiscoverSection() {
  return <DiscoverSectionView header={DISCOVER_HEADER} items={DISCOVER_ITEMS} />;
}
