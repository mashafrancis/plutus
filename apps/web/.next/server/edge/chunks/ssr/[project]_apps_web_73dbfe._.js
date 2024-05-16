(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/[project]_apps_web_73dbfe._.js", {

"[project]/apps/web/env.mjs [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "env": ()=>env
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$t3$2d$oss$2b$env$2d$nextjs$40$0$2e$10$2e$1_typescript$40$5$2e$4$2e$5_zod$40$3$2e$23$2e$8$2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@t3-oss+env-nextjs@0.10.1_typescript@5.4.5_zod@3.23.8/node_modules/@t3-oss/env-nextjs/dist/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/zod@3.23.8/node_modules/zod/lib/index.mjs [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$t3$2d$oss$2b$env$2d$nextjs$40$0$2e$10$2e$1_typescript$40$5$2e$4$2e$5_zod$40$3$2e$23$2e$8$2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createEnv"])({
    /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */ server: {
        NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].enum([
            'development',
            'test',
            'production'
        ]),
        // PRISMA_FIELD_ENCRYPTION_KEY: z.string().min(1),
        RESEND_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].string().min(1),
        SUPABASE_SERVICE_ROLE_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].string().min(1)
    },
    /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */ client: {
        NEXT_PUBLIC_SUPABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].string().min(1),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].string().min(1),
        NEXT_PUBLIC_HEIMDALL_API: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].string().min(1),
        NEXT_PUBLIC_BASELIME_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$23$2e$8$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["z"].string().min(1)
    },
    /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */ runtimeEnv: {
        NODE_ENV: ("TURBOPACK compile-time value", "development"),
        // PRISMA_FIELD_ENCRYPTION_KEY: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
        NEXT_PUBLIC_SUPABASE_URL: ("TURBOPACK compile-time value", "https://ymhqchadakdblttolxfh.supabase.co"),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaHFjaGFkYWtkYmx0dG9seGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3ODUwOTQsImV4cCI6MjAwMzM2MTA5NH0.3VGACvu0ce_Bm9a1lakf92wxBSMA3412BmHcPs8lho0"),
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        NEXT_PUBLIC_HEIMDALL_API: ("TURBOPACK compile-time value", "https://api.francismasha.com"),
        NEXT_PUBLIC_BASELIME_KEY: ("TURBOPACK compile-time value", "b6b9830f4f00b94fd0f5695cb210ad6438db3411")
    }
});

})()),
"[project]/apps/web/lib/supabase/middleware.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "updateSession": ()=>updateSession
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$env$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/env.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$3$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$43$2e$2$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@supabase+ssr@0.3.0_@supabase+supabase-js@2.43.2/node_modules/@supabase/ssr/dist/index.mjs [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$3$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$43$2e$2$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@supabase+ssr@0.3.0_@supabase+supabase-js@2.43.2/node_modules/@supabase/ssr/dist/index.mjs [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.3.0-canary.64_@babel+core@7.24.5_@opentelemetry+api@1.8.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.3.0-canary.64_@babel+core@7.24.5_@opentelemetry+api@1.8.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
async function updateSession(request) {
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: request.headers
        }
    });
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$3$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$43$2e$2$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createServerClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$env$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_SUPABASE_URL, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$env$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            get (name) {
                return request.cookies.get(name)?.value;
            },
            set (name, value, options) {
                request.cookies.set({
                    name,
                    value,
                    ...options
                });
                response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers: request.headers
                    }
                });
                response.cookies.set({
                    name,
                    value,
                    ...options
                });
            },
            remove (name, options) {
                request.cookies.set({
                    name,
                    value: '',
                    ...options
                });
                response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers: request.headers
                    }
                });
                response.cookies.set({
                    name,
                    value: '',
                    ...options
                });
            }
        }
    });
    await supabase.auth.getUser();
    return response;
}

})()),
"[project]/apps/web/middleware.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "config": ()=>config,
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/lib/supabase/middleware.ts [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function middleware(request) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["updateSession"])(request);
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */ '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};

})()),
}]);

//# sourceMappingURL=%5Bproject%5D_apps_web_73dbfe._.js.map