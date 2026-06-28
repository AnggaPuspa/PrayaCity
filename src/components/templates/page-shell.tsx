import * as React from "react";
import { SiteHeader, SiteFooter } from "@/components/organisms";

interface PageShellProps {
  children: React.ReactNode;
}

/**
 * Template: the page-level layout skeleton (header + content + footer).
 * Templates arrange organisms into a reusable page structure but contain
 * no real data — pages fill them in.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
