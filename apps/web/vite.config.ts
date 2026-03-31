import fs from "node:fs";
import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { config as loadEnvFile } from "dotenv";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

const isCloudflareRuntime = Boolean(
  process.env.DEPLOY_CLOUDFLARE === "1" ||
    process.env.CLOUDFLARE_ENV ||
  process.env.CF_PAGES ||
  process.env.CF_ACCOUNT_ID ||
  process.env.WORKERS_CI,
);
const nitroPreset = isCloudflareRuntime
  ? "cloudflare_module"
  : process.env.VERCEL
    ? "vercel"
    : "node-server";
const backendEnvPath = path.resolve(__dirname, "../../packages/backend/.env.local");

function isLocalhostUrl(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function syncConvexEnvFromBackend() {
  if (!fs.existsSync(backendEnvPath)) {
    return;
  }

  const parsed = loadEnvFile({ path: backendEnvPath, quiet: true }).parsed;
  if (!parsed) {
    return;
  }

  if (
    parsed.CONVEX_URL &&
    (!process.env.VITE_CONVEX_URL || isLocalhostUrl(process.env.VITE_CONVEX_URL))
  ) {
    process.env.VITE_CONVEX_URL = parsed.CONVEX_URL;
  }

  if (
    parsed.CONVEX_SITE_URL &&
    (!process.env.VITE_CONVEX_SITE_URL || isLocalhostUrl(process.env.VITE_CONVEX_SITE_URL))
  ) {
    process.env.VITE_CONVEX_SITE_URL = parsed.CONVEX_SITE_URL;
  }
}

syncConvexEnvFromBackend();

export default defineConfig({
  plugins: [
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    nitro({ preset: nitroPreset }),
    tanstackStart(),
    viteReact(),
    sentryTanstackStart({
      org: "plutus-finance",
      project: "plutus-finance",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  ssr: {
    noExternal: ["@convex-dev/better-auth"],
  },
});
