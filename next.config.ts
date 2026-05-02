import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // 🔧 FIX: www → non-www redirect (SEO + indexing fix)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.easeworkflow.com",
          },
        ],
        destination: "https://easeworkflow.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;