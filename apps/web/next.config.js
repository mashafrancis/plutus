import { withSentryConfig } from '@sentry/nextjs'
import createJiti from 'jiti'

const jiti = createJiti(new URL(import.meta.url).pathname)

jiti('./env')

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
// createJiti(fileURLToPath(import.meta.url))('./env')

const ContentSecurityPolicy = `
    default-src 'self' francismasha.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.francismasha.com *.vercel-scripts.com fonts.googleapis.com fonts.gstatic.com *.cloudfront.net openpanel.dev assets.lemonsqueezy.com *.googletagmanager.com;
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    taint: true,
    // reactCompiler: true,
    // ppr: 'incremental',
  },
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
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'plutus-finance',
  project: 'plutus-finance',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
