"use client";

import { useCallback, useState } from "react";
import type {
  CounterController,
  CounterControllerOptions,
} from "../types";

/**
 * Controller: owns ALL state and behaviour for the counter feature.
 * The UI component stays purely presentational and receives this back.
 * This is the "logic separated from UI" boundary.
 */
export function useCounterController({
  initialCount = 0,
  step = 1,
}: CounterControllerOptions = {}): CounterController {
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => setCount((c) => c + step), [step]);
  const decrement = useCallback(() => setCount((c) => c - step), [step]);
  const reset = useCallback(() => setCount(initialCount), [initialCount]);

  return { count, increment, decrement, reset };
}
