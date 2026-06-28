import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// Links src/i18n/request.ts so next-intl can load messages per request.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
