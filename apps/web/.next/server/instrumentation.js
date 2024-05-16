const CHUNK_PUBLIC_PATH = "server/instrumentation.js";
const runtime = require("./chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/08b5e__pnpm_37f87b._.js");
runtime.loadChunk("server/chunks/instrumentation_ts_3103d0._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/web/instrumentation.ts [instrumentation] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
