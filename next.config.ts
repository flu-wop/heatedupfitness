import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Preview stays unindexed until launch (also set in layout metadata).
  // REMOVE this line at launch together with the robots entry in app/layout.tsx.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  turbopack: {},
  // The snack guide PDF is read from disk at runtime; make sure it ships with the function.
  outputFileTracingIncludes: { "/api/newsletter": ["./private/**/*"] },
  // No remote images are used anywhere, so no remotePatterns: an open
  // "**" pattern would let anyone proxy arbitrary images through /_next/image.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
