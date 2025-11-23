/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./env";
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  // Enable cacheComponents (replaces experimental PPR in Next.js 16)
  // cacheComponents: true,
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plutus.francismasha.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "francismasha.com",
    "*.francismasha.com",
    "localhost",
    "127.0.0.1",
  ],
  compiler: {
    removeConsole: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // PostHog rewrites
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

const ContentSecurityPolicy = `
    default-src 'self' francismasha.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.francismasha.com *.vercel-scripts.com fonts.googleapis.com fonts.gstatic.com *.cloudfront.net api.seline.com openpanel.dev cdn.seline.so cdn.databuddy.cc assets.lemonsqueezy.com *.googletagmanager.com accounts.google.com vercel.live;
    child-src 'self' plutus.lemonsqueezy.com;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src * blob: data:;
    media-src 'self';
    connect-src *;
    font-src 'self' fonts.googleapis.com fonts.gstatic.com;
    manifest-src 'self' plutus.francismasha.com;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), autoplay=()",
  },
];

export default config;
