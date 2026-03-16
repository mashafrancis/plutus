import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    ignorePatterns: [
      "**/dist",
      "**/.turbo",
      "**/dev-dist",
      "**/routeTree.gen.ts",
      "**/convex/_generated",
      "**/.next",
      "**/.zed",
      "**/.vscode",
      "**/src-tauri",
      "**/.nuxt",
      "**/.expo",
      "**/.wrangler",
      "**/.alchemy",
      "**/.svelte-kit",
      "**/.source",
    ],
  },
  staged: {
    "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["vp check --fix"],
  },
});
