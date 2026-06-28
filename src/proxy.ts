import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed Middleware → Proxy. This runs locale negotiation and
 * redirects requests to the correct `/{locale}` path.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
