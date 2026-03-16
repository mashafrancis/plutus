import tailwindcss from "@tailwindcss/vite";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { config as loadEnvFile } from "dotenv";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";
import path from "node:path";
import fs from "node:fs";

const nitroPreset = process.env.VERCEL ? "vercel" : "node-server";
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
