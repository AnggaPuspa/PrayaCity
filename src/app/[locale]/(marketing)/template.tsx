/**
 * Remounts on every marketing route change so the page-enter animation
 * can run. Pure presentation wrapper — does not affect SSR content or SEO.
 */
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter">{children}</div>;
}
