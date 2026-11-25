import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/evenement.php", destination: "/a-propos", permanent: true },
      { source: "/participer.php", destination: "/participer", permanent: true },
      { source: "/editions.php", destination: "/editions", permanent: true },
      { source: "/edition-1.php", destination: "/editions/2024", permanent: true },
      { source: "/edition-2.php", destination: "/editions/2025", permanent: true },
      { source: "/blog.php", destination: "/actualites", permanent: true },
      { source: "/partenaires.php", destination: "/partenaires", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
