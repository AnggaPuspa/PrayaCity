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
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY ?? "",
  /**
   * Alibaba Cloud DashScope (Qwen) — OpenAI-compatible endpoint.
   * International: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
   * China:         https://dashscope.aliyuncs.com/compatible-mode/v1
   */
  dashscopeApiKey: process.env.DASHSCOPE_API_KEY ?? "",
  dashscopeBaseUrl:
    process.env.DASHSCOPE_BASE_URL ??
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
  qwenModel: process.env.QWEN_MODEL ?? "qwen-plus",
} as const;

export type Env = typeof env;
