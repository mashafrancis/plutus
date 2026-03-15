import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import {sentryTanstackStart} from "@sentry/tanstackstart-react/vite";
import { nitro } from 'nitro/vite'

export default defineConfig({
  plugins: [tailwindcss(), nitro({ preset: 'node-server' }), tanstackStart(), viteReact(), sentryTanstackStart({
    org: "plutus-finance",
    project: "plutus-finance",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }),],
  server: {
    port: 3000,
    strictPort: true,
  },
  ssr: {
    noExternal: ["@convex-dev/better-auth"],
  },
});
