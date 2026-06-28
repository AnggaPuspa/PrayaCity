export interface CounterController {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export interface CounterControllerOptions {
  initialCount?: number;
  step?: number;
}
