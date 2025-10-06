import type { NextConfig } from "next";
import createNextPwa from "next-pwa";

// Configure next-pwa to generate the service worker and enable offline caching
const withPWA = createNextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Use a sensible default runtime caching strategy
  runtimeCaching: require("next-pwa/cache"),
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // App Router is already in use; no special flags needed here
  },
};

export default withPWA(nextConfig);
