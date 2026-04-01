import fs from "node:fs/promises";
import path from "node:path";

const runtimeFile = path.resolve(process.cwd(), ".output/server/_runtime.mjs");
const pattern = /createRequire\(import\.meta\.url\)/g;
const replacement = 'createRequire(import.meta.url || "file:///")';

async function patchCloudflareRuntime() {
  let source;

  try {
    source = await fs.readFile(runtimeFile, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      console.warn(`[patch-cloudflare-runtime] File not found: ${runtimeFile}`);
      return;
    }

    throw error;
  }

  if (!pattern.test(source)) {
    console.info("[patch-cloudflare-runtime] No createRequire(import.meta.url) pattern found.");
    return;
  }

  const nextSource = source.replace(pattern, replacement);
  await fs.writeFile(runtimeFile, nextSource, "utf8");
  console.info("[patch-cloudflare-runtime] Applied createRequire guard for Cloudflare Workers.");
}

await patchCloudflareRuntime();
