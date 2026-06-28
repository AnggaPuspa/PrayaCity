/**
 * Type-safe access to environment variables.
 *
 * Add `import "server-only"` to any module that reads a *secret* so it can
 * never leak into a client bundle. Public values must be prefixed with
 * `NEXT_PUBLIC_` to be available in the browser.
 */
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export type Env = typeof env;
