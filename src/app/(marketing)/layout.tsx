import { PageShell } from "@/components/templates";

/**
 * Layout for the public marketing route group. The `(marketing)` folder is a
 * route group — it organizes routes and shares this layout WITHOUT adding a
 * segment to the URL. `/` stays `/`.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}
