import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./features/auth/services/auth.service";

const intlMiddleware = createMiddleware(routing);

/**
 * Next.js 16 renamed Middleware → Proxy. This runs locale negotiation and
 * also acts as a route guard for the Admin portal.
 */
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.includes('/admin/login');
  const isAdminPage = pathname.includes('/admin');

  if (isAdminPage && !isAuthPage) {
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      const locale = pathname.match(/^\/(en|id)/)?.[1] || 'id';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }

    const payload = await verifyToken(sessionToken);
    if (!payload) {
      const locale = pathname.match(/^\/(en|id)/)?.[1] || 'id';
      const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  if (isAuthPage) {
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (sessionToken) {
      const payload = await verifyToken(sessionToken);
      if (payload) {
        const locale = pathname.match(/^\/(en|id)/)?.[1] || 'id';
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip API routes, Next internals, and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
