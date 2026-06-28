// Public API for the `counter` feature.
// Other modules import from here, never from deep internals.
export { Counter } from "./components/counter";
export { useCounterController } from "./controllers/use-counter-controller";
export type { CounterController, CounterControllerOptions } from "./types";
