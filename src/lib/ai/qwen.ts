import "server-only";

import OpenAI from "openai";
import { env } from "@/config/env";

/**
 * OpenAI SDK client pointed at Alibaba Cloud DashScope (Qwen).
 * Same API surface as OpenAI — only baseURL + model differ.
 *
 * Setup:
 * 1. Create API key in Model Studio (region must match base URL)
 * 2. .env:
 *    DASHSCOPE_API_KEY=sk-xxxxxxxx
 *    DASHSCOPE_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
 *    QWEN_MODEL=qwen-plus
 * 3. Restart Next.js after changing .env
 *
 * See docs/qwen-dashscope-setup.md
 */
export function createQwenClient() {
  const apiKey = env.dashscopeApiKey.trim();

  if (!apiKey) {
    throw new Error("DASHSCOPE_API_KEY is not configured.");
  }

  if (!apiKey.startsWith("sk-")) {
    throw new Error(
      "DASHSCOPE_API_KEY looks invalid (must start with sk-). Get a key from Alibaba Model Studio.",
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: env.dashscopeBaseUrl.replace(/\/$/, ""),
  });
}

export function getQwenModel() {
  return env.qwenModel.trim() || "qwen-plus";
}
