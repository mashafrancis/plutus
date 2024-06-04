// import MillionLint from '@million/lint'

const ContentSecurityPolicy = `
    default-src 'self' francismasha.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' plutus.francismasha.com fonts.googleapis.com fonts.gstatic.com *.cloudfront.net assets.lemonsqueezy.com *.googletagmanager.com;
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
    instrumentationHook: true,
    // taint: true,
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

export default nextConfig

// export default MillionLint.next({
//   rsc: true,
// })(nextConfig)
