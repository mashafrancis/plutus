import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const ContentSecurityPolicy = `
    default-src 'self' francismasha.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.francismasha.com *.vercel-scripts.com fonts.googleapis.com fonts.gstatic.com *.cloudfront.net openpanel.dev cdn.seline.so assets.lemonsqueezy.com *.googletagmanager.com;
    child-src 'self' francismasha.lemonsqueezy.com;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src * blob: data:;
    media-src 'self';
    connect-src *;
    font-src 'self' fonts.googleapis.com fonts.gstatic.com;
    manifest-src 'self' plutus.francismasha.com;
`
const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), autoplay=()',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    inlineCss: true,
    cssChunking: true,
    // instrumentationHook: process.env.NODE_ENV === 'production',
  },
  serverExternalPackages: ['@sentry/nextjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plutus.francismasha.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // instrumentationHook: process.env.NODE_ENV === 'production',
  logging: {
    fetches: {
      fullUrl: process.env.LOG_FETCHES === 'true',
    },
  },
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

// export default nextConfig

export default withSentryConfig(nextConfig, {
  org: 'plutus-finance',
  project: 'plutus-finance',
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: '/monitoring',
  sourcemaps: {
    disable: true,
  },
})
