"use client";

import { useCounterController } from "../controllers/use-counter-controller";
import { CounterView } from "./counter-view";
import type { CounterControllerOptions } from "../types";

/**
 * Container: the only client boundary for this feature. It wires the
 * controller (logic) to the view (UI) and is what the rest of the app uses.
 */
export function Counter(props: CounterControllerOptions) {
  const controller = useCounterController(props);
  return <CounterView {...controller} />;
}
