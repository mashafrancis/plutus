import tailwindcss from "@tailwindcss/vite";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const nitroPreset = process.env.VERCEL ? "vercel" : "node-server";

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
  server: {
    port: 3000,
    strictPort: true,
  },
  ssr: {
    noExternal: ["@convex-dev/better-auth"],
  },
});
