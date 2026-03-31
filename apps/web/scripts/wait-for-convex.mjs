import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnvFile } from "dotenv";

const DEFAULT_CONVEX_URL = "http://127.0.0.1:3210";
const MAX_ATTEMPTS = 30;
const REQUEST_TIMEOUT_MS = 1500;
const RETRY_DELAY_MS = 1000;

const currentFileDir = path.dirname(fileURLToPath(import.meta.url));
const backendEnvPath = path.resolve(currentFileDir, "../../../packages/backend/.env.local");

function isLocalhostUrl(value) {
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

function getConvexUrl() {
  const configuredUrl = process.env.VITE_CONVEX_URL ?? process.env.CONVEX_URL;
  if (configuredUrl && !isLocalhostUrl(configuredUrl)) {
    return configuredUrl;
  }

  if (fs.existsSync(backendEnvPath)) {
    const parsed = loadEnvFile({ path: backendEnvPath, quiet: true }).parsed;
    if (parsed?.CONVEX_URL && !isLocalhostUrl(parsed.CONVEX_URL)) {
      return parsed.CONVEX_URL;
    }
  }

  return configuredUrl ?? DEFAULT_CONVEX_URL;
}

const convexUrl = getConvexUrl();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkConvexReady(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    // We only care that an HTTP response is reachable.
    await fetch(url, { method: "GET", signal: controller.signal });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const isReady = await checkConvexReady(convexUrl);
  if (isReady) {
    console.log(`[dev] Convex reachable at ${convexUrl}`);
    process.exit(0);
  }

  if (attempt === 1) {
    console.log(`[dev] Waiting for Convex at ${convexUrl}...`);
  }

  await sleep(RETRY_DELAY_MS);
}

console.warn(
  `[dev] Convex did not become reachable after ${MAX_ATTEMPTS}s. Continuing startup anyway.`,
);
