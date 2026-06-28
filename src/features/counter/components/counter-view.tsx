import { Button, Typography } from "@/components/atoms";
import type { CounterController } from "../types";

type CounterViewProps = CounterController;

/**
 * Presentational component: receives state + handlers as props and renders.
 * It has no `useState`/`useEffect` of its own — it is trivially testable and
 * could be reused with a different controller.
 */
export function CounterView({
  count,
  increment,
  decrement,
  reset,
}: CounterViewProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <Typography variant="muted">Interactive client state</Typography>
      <Typography as="span" variant="h1" aria-live="polite">
        {count}
      </Typography>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={decrement}>
          −
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={increment}>
          +
        </Button>
      </div>
    </div>
  );
}
