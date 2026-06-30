import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; next/image converts on the fly and picks the
    // smallest the browser supports.
    formats: ["image/avif", "image/webp"],
    // Allow optimizing remote placeholder images (events use Unsplash).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

// Links src/i18n/request.ts so next-intl can load messages per request.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
