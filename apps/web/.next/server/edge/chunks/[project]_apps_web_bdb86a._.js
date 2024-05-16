(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[project]_apps_web_bdb86a._.js", {

"[project]/apps/web/instrumentation.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "register": ()=>register
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$vercel$2b$otel$40$1$2e$8$2e$2_$40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_$40$opentelemetry$2b$ins_sgtuoxne3frxzfqjeweieiznha$2f$node_modules$2f40$vercel$2f$otel$2f$dist$2f$edge$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@vercel+otel@1.8.2_@opentelemetry+api-logs@0.51.1_@opentelemetry+api@1.8.0_@opentelemetry+ins_sgtuoxne3frxzfqjeweieiznha/node_modules/@vercel/otel/dist/edge/index.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function register() {
    // const config: Configuration = {
    //   serviceName: 'plutus',
    //   traceExporter: new OTLPTraceExporter({
    //     url: 'http://localhost:4318/v1/traces',
    //   }),
    //   instrumentationConfig: {
    //     fetch: {
    //       ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
    //       propagateContextUrls: [/^http:\/\/localhost:\d+/],
    //       dontPropagateContextUrls: [/no-propagation\=1/],
    //     },
    //   },
    // }
    //
    // registerOTel(config)
    // if (process.env.NEXT_RUNTIME === 'nodejs') {
    //   const { BaselimeSDK, VercelPlugin, BetterHttpInstrumentation } =
    //     await import('@baselime/node-opentelemetry')
    //
    //   const sdk = new BaselimeSDK({
    //     serverless: true,
    //     service: 'plutus',
    //     instrumentations: [
    //       new BetterHttpInstrumentation({
    //         plugins: [
    //           // Add the Vercel plugin to enable correlation between your logs and traces for projects deployed on Vercel
    //           new VercelPlugin(),
    //         ],
    //       }),
    //     ],
    //   })
    //
    //   sdk.start()
    const config = {
        serviceName: 'plutus',
        instrumentationConfig: {
            fetch: {
                ignoreUrls: [
                    /^https:\/\/telemetry.nextjs.org/
                ],
                propagateContextUrls: [
                    /^http:\/\/localhost:\d+/
                ],
                dontPropagateContextUrls: [
                    /no-propagation\=1/
                ]
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$vercel$2b$otel$40$1$2e$8$2e$2_$40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_$40$opentelemetry$2b$ins_sgtuoxne3frxzfqjeweieiznha$2f$node_modules$2f40$vercel$2f$otel$2f$dist$2f$edge$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["registerOTel"])(config);
}

})()),
"[project]/apps/web/edge-wrapper.js { MODULE => \"[project]/apps/web/instrumentation.ts [middleware] (ecmascript)\" } [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

self._ENTRIES ||= {};
self._ENTRIES["middleware_instrumentation"] = Promise.resolve().then(()=>__turbopack_import__("[project]/apps/web/instrumentation.ts [middleware] (ecmascript)"));

}.call(this) }),
}]);

//# sourceMappingURL=%5Bproject%5D_apps_web_bdb86a._.js.map