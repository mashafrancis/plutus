/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	swcMinify: true,
	reactStrictMode: true,
	experimental: {
		appDir: true,
		instrumentationHook: true,
		typedRoutes: true
	},
}

export default nextConfig
