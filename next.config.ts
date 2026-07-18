import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1MB. Review photo uploads allow up to 5MB, so give some
      // headroom for multipart/form-data overhead (boundaries, field
      // metadata) instead of Next.js rejecting the request before our own
      // friendly "file too large" validation ever runs.
      bodySizeLimit: "8mb",
    },
  },
  images: {
    // Serve modern formats; next/image converts on the fly and picks the
    // smallest the browser supports.
    formats: ["image/avif", "image/webp"],
    // Allow optimizing remote placeholder images (events use Unsplash).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "hdgxgifctnuwybqbasak.supabase.co" },
      { protocol: "https", hostname: "openweathermap.org" },
      // Real destination photography from Wikimedia Commons
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

// Links src/i18n/request.ts so next-intl can load messages per request.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
