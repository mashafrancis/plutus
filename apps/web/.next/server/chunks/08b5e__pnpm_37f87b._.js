module.exports = {

"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/platform/node/globalThis.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins
__turbopack_esm__({
    "_globalThis": ()=>_globalThis
});
var _globalThis = typeof globalThis === 'object' ? globalThis : global; //# sourceMappingURL=globalThis.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({
    "API_BACKWARDS_COMPATIBILITY_VERSION": ()=>API_BACKWARDS_COMPATIBILITY_VERSION,
    "GLOBAL_LOGS_API_KEY": ()=>GLOBAL_LOGS_API_KEY,
    "_global": ()=>_global,
    "makeGetter": ()=>makeGetter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$platform$2f$node$2f$globalThis$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/platform/node/globalThis.js [instrumentation] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var GLOBAL_LOGS_API_KEY = Symbol.for('io.opentelemetry.js.api.logs');
var _global = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$platform$2f$node$2f$globalThis$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["_globalThis"];
function makeGetter(requiredVersion, instance, fallback) {
    return function(version) {
        return version === requiredVersion ? instance : fallback;
    };
}
var API_BACKWARDS_COMPATIBILITY_VERSION = 1; //# sourceMappingURL=global-utils.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({
    "NOOP_LOGGER": ()=>NOOP_LOGGER,
    "NoopLogger": ()=>NoopLogger
});
var NoopLogger = function() {
    function NoopLogger() {}
    NoopLogger.prototype.emit = function(_logRecord) {};
    return NoopLogger;
}();
;
var NOOP_LOGGER = new NoopLogger(); //# sourceMappingURL=NoopLogger.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({
    "NOOP_LOGGER_PROVIDER": ()=>NOOP_LOGGER_PROVIDER,
    "NoopLoggerProvider": ()=>NoopLoggerProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [instrumentation] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var NoopLoggerProvider = function() {
    function NoopLoggerProvider() {}
    NoopLoggerProvider.prototype.getLogger = function(_name, _version, _options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NoopLogger"]();
    };
    return NoopLoggerProvider;
}();
;
var NOOP_LOGGER_PROVIDER = new NoopLoggerProvider(); //# sourceMappingURL=NoopLoggerProvider.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({
    "LogsAPI": ()=>LogsAPI
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [instrumentation] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
var LogsAPI = function() {
    function LogsAPI() {}
    LogsAPI.getInstance = function() {
        if (!this._instance) {
            this._instance = new LogsAPI();
        }
        return this._instance;
    };
    LogsAPI.prototype.setGlobalLoggerProvider = function(provider) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) {
            return this.getLoggerProvider();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["makeGetter"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"], provider, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"]);
        return provider;
    };
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */ LogsAPI.prototype.getLoggerProvider = function() {
        var _a, _b;
        return (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) === null || _a === void 0 ? void 0 : _a.call(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["_global"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"])) !== null && _b !== void 0 ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"];
    };
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */ LogsAPI.prototype.getLogger = function(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
    };
    /** Remove the global logger provider */ LogsAPI.prototype.disable = function() {
        delete __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]];
    };
    return LogsAPI;
}();
;
 //# sourceMappingURL=logs.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({
    "logs": ()=>logs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [instrumentation] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
var logs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["LogsAPI"].getInstance(); //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/Logger.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({});
;
 //# sourceMappingURL=Logger.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerProvider.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({});
;
 //# sourceMappingURL=LoggerProvider.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({
    "SeverityNumber": ()=>SeverityNumber
});
var SeverityNumber;
(function(SeverityNumber) {
    SeverityNumber[SeverityNumber["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    SeverityNumber[SeverityNumber["TRACE"] = 1] = "TRACE";
    SeverityNumber[SeverityNumber["TRACE2"] = 2] = "TRACE2";
    SeverityNumber[SeverityNumber["TRACE3"] = 3] = "TRACE3";
    SeverityNumber[SeverityNumber["TRACE4"] = 4] = "TRACE4";
    SeverityNumber[SeverityNumber["DEBUG"] = 5] = "DEBUG";
    SeverityNumber[SeverityNumber["DEBUG2"] = 6] = "DEBUG2";
    SeverityNumber[SeverityNumber["DEBUG3"] = 7] = "DEBUG3";
    SeverityNumber[SeverityNumber["DEBUG4"] = 8] = "DEBUG4";
    SeverityNumber[SeverityNumber["INFO"] = 9] = "INFO";
    SeverityNumber[SeverityNumber["INFO2"] = 10] = "INFO2";
    SeverityNumber[SeverityNumber["INFO3"] = 11] = "INFO3";
    SeverityNumber[SeverityNumber["INFO4"] = 12] = "INFO4";
    SeverityNumber[SeverityNumber["WARN"] = 13] = "WARN";
    SeverityNumber[SeverityNumber["WARN2"] = 14] = "WARN2";
    SeverityNumber[SeverityNumber["WARN3"] = 15] = "WARN3";
    SeverityNumber[SeverityNumber["WARN4"] = 16] = "WARN4";
    SeverityNumber[SeverityNumber["ERROR"] = 17] = "ERROR";
    SeverityNumber[SeverityNumber["ERROR2"] = 18] = "ERROR2";
    SeverityNumber[SeverityNumber["ERROR3"] = 19] = "ERROR3";
    SeverityNumber[SeverityNumber["ERROR4"] = 20] = "ERROR4";
    SeverityNumber[SeverityNumber["FATAL"] = 21] = "FATAL";
    SeverityNumber[SeverityNumber["FATAL2"] = 22] = "FATAL2";
    SeverityNumber[SeverityNumber["FATAL3"] = 23] = "FATAL3";
    SeverityNumber[SeverityNumber["FATAL4"] = 24] = "FATAL4";
})(SeverityNumber || (SeverityNumber = {})); //# sourceMappingURL=LogRecord.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerOptions.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=LoggerOptions.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/AnyValue.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_esm__({});
;
 //# sourceMappingURL=AnyValue.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NOOP_LOGGER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NOOP_LOGGER"],
    "NOOP_LOGGER_PROVIDER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"],
    "NoopLogger": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NoopLogger"],
    "NoopLoggerProvider": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["NoopLoggerProvider"],
    "SeverityNumber": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LogRecord$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["SeverityNumber"],
    "logs": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["logs"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$Logger$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/Logger.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerProvider.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LogRecord$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LoggerOptions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerOptions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$AnyValue$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/AnyValue.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NOOP_LOGGER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NOOP_LOGGER"],
    "NOOP_LOGGER_PROVIDER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NOOP_LOGGER_PROVIDER"],
    "NoopLogger": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NoopLogger"],
    "NoopLoggerProvider": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NoopLoggerProvider"],
    "SeverityNumber": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["SeverityNumber"],
    "logs": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["logs"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@vercel+otel@1.8.2_@opentelemetry+api-logs@0.51.1_@opentelemetry+api@1.8.0_@opentelemetry+ins_sgtuoxne3frxzfqjeweieiznha/node_modules/@vercel/otel/dist/node/index.js [instrumentation] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "FetchInstrumentation": ()=>ir,
    "OTLPHttpJsonTraceExporter": ()=>tr,
    "OTLPHttpProtoTraceExporter": ()=>lt,
    "registerOTel": ()=>iy
});
var __TURBOPACK__commonjs__external__url__ = __turbopack_external_require__("url", true);
var __TURBOPACK__commonjs__external__module__ = __turbopack_external_require__("module", true);
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
var __TURBOPACK__commonjs__external__$40$opentelemetry$2f$api__ = __turbopack_external_require__("@opentelemetry/api", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$facade$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [instrumentation] (ecmascript) <facade>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_resolve_absolute_path__("node_modules/.pnpm/@vercel+otel@1.8.2_@opentelemetry+api-logs@0.51.1_@opentelemetry+api@1.8.0_@opentelemetry+ins_sgtuoxne3frxzfqjeweieiznha/node_modules/@vercel/otel/dist/node/index.js")}`;
    }
};
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const require = (0, __TURBOPACK__commonjs__external__module__["createRequire"])(__TURBOPACK__import$2e$meta__.url);
const __filename = (0, __TURBOPACK__commonjs__external__url__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url);
const __dirname = __TURBOPACK__commonjs__external__path__["default"].dirname(__filename);
var bp = Object.create;
var vs = Object.defineProperty;
var Pp = Object.getOwnPropertyDescriptor;
var yp = Object.getOwnPropertyNames;
var vp = Object.getPrototypeOf, Ip = Object.prototype.hasOwnProperty;
var J = ((r)=>typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(r, {
        get: (e, t)=>(typeof require < "u" ? require : e)[t]
    }) : r)(function(r) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + r + '" is not supported');
});
var Ku = (r, e)=>()=>(r && (e = r(r = 0)), e);
var c = (r, e)=>()=>(e || r((e = {
            exports: {}
        }).exports, e), e.exports);
var qr = (r, e, t, n)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let i of yp(e))!Ip.call(r, i) && i !== t && vs(r, i, {
        get: ()=>e[i],
        enumerable: !(n = Pp(e, i)) || n.enumerable
    });
    return r;
}, ht = (r, e, t)=>(qr(r, e, "default"), t && qr(t, e, "default")), K = (r, e, t)=>(t = r != null ? bp(vp(r)) : {}, qr(e || !r || !r.__esModule ? vs(t, "default", {
        value: r,
        enumerable: !0
    }) : t, r)), f = (r)=>qr(vs({}, "__esModule", {
        value: !0
    }), r);
var d = {};
;
var h = Ku(()=>{
    ht(d, __TURBOPACK__commonjs__external__$40$opentelemetry$2f$api__);
});
var ur = c((ve)=>{
    "use strict";
    Object.defineProperty(ve, "__esModule", {
        value: !0
    });
    ve.isTracingSuppressed = ve.unsuppressTracing = ve.suppressTracing = void 0;
    var Lp = (h(), f(d)), Is = (0, Lp.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function Mp(r) {
        return r.setValue(Is, !0);
    }
    ve.suppressTracing = Mp;
    function Cp(r) {
        return r.deleteValue(Is);
    }
    ve.unsuppressTracing = Cp;
    function Np(r) {
        return r.getValue(Is) === !0;
    }
    ve.isTracingSuppressed = Np;
});
var Ls = c((H)=>{
    "use strict";
    Object.defineProperty(H, "__esModule", {
        value: !0
    });
    H.BAGGAGE_MAX_TOTAL_LENGTH = H.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = H.BAGGAGE_MAX_NAME_VALUE_PAIRS = H.BAGGAGE_HEADER = H.BAGGAGE_ITEMS_SEPARATOR = H.BAGGAGE_PROPERTIES_SEPARATOR = H.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    H.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    H.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    H.BAGGAGE_ITEMS_SEPARATOR = ",";
    H.BAGGAGE_HEADER = "baggage";
    H.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    H.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    H.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
});
var Ms = c((pe)=>{
    "use strict";
    Object.defineProperty(pe, "__esModule", {
        value: !0
    });
    pe.parseKeyPairsIntoRecord = pe.parsePairKeyValue = pe.getKeyPairs = pe.serializeKeyPairs = void 0;
    var wp = (h(), f(d)), je = Ls();
    function xp(r) {
        return r.reduce((e, t)=>{
            let n = `${e}${e !== "" ? je.BAGGAGE_ITEMS_SEPARATOR : ""}${t}`;
            return n.length > je.BAGGAGE_MAX_TOTAL_LENGTH ? e : n;
        }, "");
    }
    pe.serializeKeyPairs = xp;
    function Dp(r) {
        return r.getAllEntries().map(([e, t])=>{
            let n = `${encodeURIComponent(e)}=${encodeURIComponent(t.value)}`;
            return t.metadata !== void 0 && (n += je.BAGGAGE_PROPERTIES_SEPARATOR + t.metadata.toString()), n;
        });
    }
    pe.getKeyPairs = Dp;
    function zu(r) {
        let e = r.split(je.BAGGAGE_PROPERTIES_SEPARATOR);
        if (e.length <= 0) return;
        let t = e.shift();
        if (!t) return;
        let n = t.indexOf(je.BAGGAGE_KEY_PAIR_SEPARATOR);
        if (n <= 0) return;
        let i = decodeURIComponent(t.substring(0, n).trim()), s = decodeURIComponent(t.substring(n + 1).trim()), o;
        return e.length > 0 && (o = (0, wp.baggageEntryMetadataFromString)(e.join(je.BAGGAGE_PROPERTIES_SEPARATOR))), {
            key: i,
            value: s,
            metadata: o
        };
    }
    pe.parsePairKeyValue = zu;
    function Bp(r) {
        return typeof r != "string" || r.length === 0 ? {} : r.split(je.BAGGAGE_ITEMS_SEPARATOR).map((e)=>zu(e)).filter((e)=>e !== void 0 && e.value.length > 0).reduce((e, t)=>(e[t.key] = t.value, e), {});
    }
    pe.parseKeyPairsIntoRecord = Bp;
});
var Yu = c((Gr)=>{
    "use strict";
    Object.defineProperty(Gr, "__esModule", {
        value: !0
    });
    Gr.W3CBaggagePropagator = void 0;
    var Cs = (h(), f(d)), Up = ur(), Fe = Ls(), Ns = Ms(), ws = class {
        inject(e, t, n) {
            let i = Cs.propagation.getBaggage(e);
            if (!i || (0, Up.isTracingSuppressed)(e)) return;
            let s = (0, Ns.getKeyPairs)(i).filter((a)=>a.length <= Fe.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS).slice(0, Fe.BAGGAGE_MAX_NAME_VALUE_PAIRS), o = (0, Ns.serializeKeyPairs)(s);
            o.length > 0 && n.set(t, Fe.BAGGAGE_HEADER, o);
        }
        extract(e, t, n) {
            let i = n.get(t, Fe.BAGGAGE_HEADER), s = Array.isArray(i) ? i.join(Fe.BAGGAGE_ITEMS_SEPARATOR) : i;
            if (!s) return e;
            let o = {};
            return s.length === 0 || (s.split(Fe.BAGGAGE_ITEMS_SEPARATOR).forEach((u)=>{
                let l = (0, Ns.parsePairKeyValue)(u);
                if (l) {
                    let _ = {
                        value: l.value
                    };
                    l.metadata && (_.metadata = l.metadata), o[l.key] = _;
                }
            }), Object.entries(o).length === 0) ? e : Cs.propagation.setBaggage(e, Cs.propagation.createBaggage(o));
        }
        fields() {
            return [
                Fe.BAGGAGE_HEADER
            ];
        }
    };
    Gr.W3CBaggagePropagator = ws;
});
var Qu = c((Vr)=>{
    "use strict";
    Object.defineProperty(Vr, "__esModule", {
        value: !0
    });
    Vr.AnchoredClock = void 0;
    var xs = class {
        constructor(e, t){
            this._monotonicClock = t, this._epochMillis = e.now(), this._performanceMillis = t.now();
        }
        now() {
            let e = this._monotonicClock.now() - this._performanceMillis;
            return this._epochMillis + e;
        }
    };
    Vr.AnchoredClock = xs;
});
var rc = c((Ie)=>{
    "use strict";
    Object.defineProperty(Ie, "__esModule", {
        value: !0
    });
    Ie.isAttributeValue = Ie.isAttributeKey = Ie.sanitizeAttributes = void 0;
    var Zu = (h(), f(d));
    function qp(r) {
        let e = {};
        if (typeof r != "object" || r == null) return e;
        for (let [t, n] of Object.entries(r)){
            if (!Ju(t)) {
                Zu.diag.warn(`Invalid attribute key: ${t}`);
                continue;
            }
            if (!ec(n)) {
                Zu.diag.warn(`Invalid attribute value set for key: ${t}`);
                continue;
            }
            Array.isArray(n) ? e[t] = n.slice() : e[t] = n;
        }
        return e;
    }
    Ie.sanitizeAttributes = qp;
    function Ju(r) {
        return typeof r == "string" && r.length > 0;
    }
    Ie.isAttributeKey = Ju;
    function ec(r) {
        return r == null ? !0 : Array.isArray(r) ? Gp(r) : tc(r);
    }
    Ie.isAttributeValue = ec;
    function Gp(r) {
        let e;
        for (let t of r)if (t != null) {
            if (!e) {
                if (tc(t)) {
                    e = typeof t;
                    continue;
                }
                return !1;
            }
            if (typeof t !== e) return !1;
        }
        return !0;
    }
    function tc(r) {
        switch(typeof r){
            case "number":
            case "boolean":
            case "string":
                return !0;
        }
        return !1;
    }
});
var Ds = c((jr)=>{
    "use strict";
    Object.defineProperty(jr, "__esModule", {
        value: !0
    });
    jr.loggingErrorHandler = void 0;
    var Vp = (h(), f(d));
    function jp() {
        return (r)=>{
            Vp.diag.error(Fp(r));
        };
    }
    jr.loggingErrorHandler = jp;
    function Fp(r) {
        return typeof r == "string" ? r : JSON.stringify(Hp(r));
    }
    function Hp(r) {
        let e = {}, t = r;
        for(; t !== null;)Object.getOwnPropertyNames(t).forEach((n)=>{
            if (e[n]) return;
            let i = t[n];
            i && (e[n] = String(i));
        }), t = Object.getPrototypeOf(t);
        return e;
    }
});
var Bs = c((pt)=>{
    "use strict";
    Object.defineProperty(pt, "__esModule", {
        value: !0
    });
    pt.globalErrorHandler = pt.setGlobalErrorHandler = void 0;
    var kp = Ds(), nc = (0, kp.loggingErrorHandler)();
    function Xp(r) {
        nc = r;
    }
    pt.setGlobalErrorHandler = Xp;
    function $p(r) {
        try {
            nc(r);
        } catch  {}
    }
    pt.globalErrorHandler = $p;
});
var Us = c((cr)=>{
    "use strict";
    Object.defineProperty(cr, "__esModule", {
        value: !0
    });
    cr.TracesSamplerValues = void 0;
    var Wp;
    (function(r) {
        r.AlwaysOff = "always_off", r.AlwaysOn = "always_on", r.ParentBasedAlwaysOff = "parentbased_always_off", r.ParentBasedAlwaysOn = "parentbased_always_on", r.ParentBasedTraceIdRatio = "parentbased_traceidratio", r.TraceIdRatio = "traceidratio";
    })(Wp = cr.TracesSamplerValues || (cr.TracesSamplerValues = {}));
});
var ic = c((Fr)=>{
    "use strict";
    Object.defineProperty(Fr, "__esModule", {
        value: !0
    });
    Fr._globalThis = void 0;
    Fr._globalThis = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {};
});
var Hr = c((y)=>{
    "use strict";
    Object.defineProperty(y, "__esModule", {
        value: !0
    });
    y.getEnvWithoutDefaults = y.parseEnvironment = y.DEFAULT_ENVIRONMENT = y.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = y.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = y.DEFAULT_ATTRIBUTE_COUNT_LIMIT = y.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = void 0;
    var Le = (h(), f(d)), Kp = Us(), zp = ic(), Yp = ",", Qp = [
        "OTEL_SDK_DISABLED"
    ];
    function Zp(r) {
        return Qp.indexOf(r) > -1;
    }
    var Jp = [
        "OTEL_BSP_EXPORT_TIMEOUT",
        "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
        "OTEL_BSP_MAX_QUEUE_SIZE",
        "OTEL_BSP_SCHEDULE_DELAY",
        "OTEL_BLRP_EXPORT_TIMEOUT",
        "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
        "OTEL_BLRP_MAX_QUEUE_SIZE",
        "OTEL_BLRP_SCHEDULE_DELAY",
        "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
        "OTEL_ATTRIBUTE_COUNT_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
        "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
        "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
        "OTEL_SPAN_EVENT_COUNT_LIMIT",
        "OTEL_SPAN_LINK_COUNT_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
        "OTEL_EXPORTER_OTLP_TIMEOUT",
        "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
        "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
        "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
        "OTEL_EXPORTER_JAEGER_AGENT_PORT"
    ];
    function ef(r) {
        return Jp.indexOf(r) > -1;
    }
    var tf = [
        "OTEL_NO_PATCH_MODULES",
        "OTEL_PROPAGATORS"
    ];
    function rf(r) {
        return tf.indexOf(r) > -1;
    }
    y.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1 / 0;
    y.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    y.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 128;
    y.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 128;
    y.DEFAULT_ENVIRONMENT = {
        OTEL_SDK_DISABLED: !1,
        CONTAINER_NAME: "",
        ECS_CONTAINER_METADATA_URI_V4: "",
        ECS_CONTAINER_METADATA_URI: "",
        HOSTNAME: "",
        KUBERNETES_SERVICE_HOST: "",
        NAMESPACE: "",
        OTEL_BSP_EXPORT_TIMEOUT: 3e4,
        OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
        OTEL_BSP_MAX_QUEUE_SIZE: 2048,
        OTEL_BSP_SCHEDULE_DELAY: 5e3,
        OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
        OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
        OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
        OTEL_BLRP_SCHEDULE_DELAY: 5e3,
        OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
        OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
        OTEL_EXPORTER_JAEGER_ENDPOINT: "",
        OTEL_EXPORTER_JAEGER_PASSWORD: "",
        OTEL_EXPORTER_JAEGER_USER: "",
        OTEL_EXPORTER_OTLP_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_HEADERS: "",
        OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
        OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
        OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
        OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
        OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
        OTEL_LOG_LEVEL: Le.DiagLogLevel.INFO,
        OTEL_NO_PATCH_MODULES: [],
        OTEL_PROPAGATORS: [
            "tracecontext",
            "baggage"
        ],
        OTEL_RESOURCE_ATTRIBUTES: "",
        OTEL_SERVICE_NAME: "",
        OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: y.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_ATTRIBUTE_COUNT_LIMIT: y.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: y.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: y.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: y.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: y.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
        OTEL_SPAN_LINK_COUNT_LIMIT: 128,
        OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: y.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: y.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
        OTEL_TRACES_EXPORTER: "",
        OTEL_TRACES_SAMPLER: Kp.TracesSamplerValues.ParentBasedAlwaysOn,
        OTEL_TRACES_SAMPLER_ARG: "",
        OTEL_LOGS_EXPORTER: "",
        OTEL_EXPORTER_OTLP_INSECURE: "",
        OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
        OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
        OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
        OTEL_EXPORTER_OTLP_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
    };
    function nf(r, e, t) {
        if (typeof t[r] > "u") return;
        let n = String(t[r]);
        e[r] = n.toLowerCase() === "true";
    }
    function sf(r, e, t, n = -1 / 0, i = 1 / 0) {
        if (typeof t[r] < "u") {
            let s = Number(t[r]);
            isNaN(s) || (s < n ? e[r] = n : s > i ? e[r] = i : e[r] = s);
        }
    }
    function of(r, e, t, n = Yp) {
        let i = t[r];
        typeof i == "string" && (e[r] = i.split(n).map((s)=>s.trim()));
    }
    var af = {
        ALL: Le.DiagLogLevel.ALL,
        VERBOSE: Le.DiagLogLevel.VERBOSE,
        DEBUG: Le.DiagLogLevel.DEBUG,
        INFO: Le.DiagLogLevel.INFO,
        WARN: Le.DiagLogLevel.WARN,
        ERROR: Le.DiagLogLevel.ERROR,
        NONE: Le.DiagLogLevel.NONE
    };
    function uf(r, e, t) {
        let n = t[r];
        if (typeof n == "string") {
            let i = af[n.toUpperCase()];
            i != null && (e[r] = i);
        }
    }
    function qs(r) {
        let e = {};
        for(let t in y.DEFAULT_ENVIRONMENT){
            let n = t;
            switch(n){
                case "OTEL_LOG_LEVEL":
                    uf(n, e, r);
                    break;
                default:
                    if (Zp(n)) nf(n, e, r);
                    else if (ef(n)) sf(n, e, r);
                    else if (rf(n)) of(n, e, r);
                    else {
                        let i = r[n];
                        typeof i < "u" && i !== null && (e[n] = String(i));
                    }
            }
        }
        return e;
    }
    y.parseEnvironment = qs;
    function cf() {
        return typeof process < "u" && process && process.env ? qs(process.env) : qs(zp._globalThis);
    }
    y.getEnvWithoutDefaults = cf;
});
var oc = c((kr)=>{
    "use strict";
    Object.defineProperty(kr, "__esModule", {
        value: !0
    });
    kr.getEnv = void 0;
    var lf = J("os"), sc = Hr();
    function df() {
        let r = (0, sc.parseEnvironment)(process.env);
        return Object.assign({
            HOSTNAME: lf.hostname()
        }, sc.DEFAULT_ENVIRONMENT, r);
    }
    kr.getEnv = df;
});
var ac = c((Xr)=>{
    "use strict";
    Object.defineProperty(Xr, "__esModule", {
        value: !0
    });
    Xr._globalThis = void 0;
    Xr._globalThis = typeof globalThis == "object" ? globalThis : global;
});
var cc = c(($r)=>{
    "use strict";
    Object.defineProperty($r, "__esModule", {
        value: !0
    });
    $r.hexToBase64 = void 0;
    function uc(r) {
        return r >= 48 && r <= 57 ? r - 48 : r >= 97 && r <= 102 ? r - 87 : r - 55;
    }
    var _f = Buffer.alloc(8), hf = Buffer.alloc(16);
    function pf(r) {
        let e;
        r.length === 16 ? e = _f : r.length === 32 ? e = hf : e = Buffer.alloc(r.length / 2);
        let t = 0;
        for(let n = 0; n < r.length; n += 2){
            let i = uc(r.charCodeAt(n)), s = uc(r.charCodeAt(n + 1));
            e.writeUInt8(i << 4 | s, t++);
        }
        return e.toString("base64");
    }
    $r.hexToBase64 = pf;
});
var _c = c((Kr)=>{
    "use strict";
    Object.defineProperty(Kr, "__esModule", {
        value: !0
    });
    Kr.RandomIdGenerator = void 0;
    var ff = 8, dc = 16, Gs = class {
        constructor(){
            this.generateTraceId = lc(dc), this.generateSpanId = lc(ff);
        }
    };
    Kr.RandomIdGenerator = Gs;
    var Wr = Buffer.allocUnsafe(dc);
    function lc(r) {
        return function() {
            for(let t = 0; t < r / 4; t++)Wr.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, t * 4);
            for(let t = 0; t < r && !(Wr[t] > 0); t++)t === r - 1 && (Wr[r - 1] = 1);
            return Wr.toString("hex", 0, r);
        };
    }
});
var hc = c((zr)=>{
    "use strict";
    Object.defineProperty(zr, "__esModule", {
        value: !0
    });
    zr.otperformance = void 0;
    var Ef = J("perf_hooks");
    zr.otperformance = Ef.performance;
});
var Vs = c((Yr)=>{
    "use strict";
    Object.defineProperty(Yr, "__esModule", {
        value: !0
    });
    Yr.VERSION = void 0;
    Yr.VERSION = "1.19.0";
});
var pc = c((R)=>{
    "use strict";
    Object.defineProperty(R, "__esModule", {
        value: !0
    });
    R.MessageTypeValues = R.RpcGrpcStatusCodeValues = R.MessagingOperationValues = R.MessagingDestinationKindValues = R.HttpFlavorValues = R.NetHostConnectionSubtypeValues = R.NetHostConnectionTypeValues = R.NetTransportValues = R.FaasInvokedProviderValues = R.FaasDocumentOperationValues = R.FaasTriggerValues = R.DbCassandraConsistencyLevelValues = R.DbSystemValues = R.SemanticAttributes = void 0;
    R.SemanticAttributes = {
        AWS_LAMBDA_INVOKED_ARN: "aws.lambda.invoked_arn",
        DB_SYSTEM: "db.system",
        DB_CONNECTION_STRING: "db.connection_string",
        DB_USER: "db.user",
        DB_JDBC_DRIVER_CLASSNAME: "db.jdbc.driver_classname",
        DB_NAME: "db.name",
        DB_STATEMENT: "db.statement",
        DB_OPERATION: "db.operation",
        DB_MSSQL_INSTANCE_NAME: "db.mssql.instance_name",
        DB_CASSANDRA_KEYSPACE: "db.cassandra.keyspace",
        DB_CASSANDRA_PAGE_SIZE: "db.cassandra.page_size",
        DB_CASSANDRA_CONSISTENCY_LEVEL: "db.cassandra.consistency_level",
        DB_CASSANDRA_TABLE: "db.cassandra.table",
        DB_CASSANDRA_IDEMPOTENCE: "db.cassandra.idempotence",
        DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT: "db.cassandra.speculative_execution_count",
        DB_CASSANDRA_COORDINATOR_ID: "db.cassandra.coordinator.id",
        DB_CASSANDRA_COORDINATOR_DC: "db.cassandra.coordinator.dc",
        DB_HBASE_NAMESPACE: "db.hbase.namespace",
        DB_REDIS_DATABASE_INDEX: "db.redis.database_index",
        DB_MONGODB_COLLECTION: "db.mongodb.collection",
        DB_SQL_TABLE: "db.sql.table",
        EXCEPTION_TYPE: "exception.type",
        EXCEPTION_MESSAGE: "exception.message",
        EXCEPTION_STACKTRACE: "exception.stacktrace",
        EXCEPTION_ESCAPED: "exception.escaped",
        FAAS_TRIGGER: "faas.trigger",
        FAAS_EXECUTION: "faas.execution",
        FAAS_DOCUMENT_COLLECTION: "faas.document.collection",
        FAAS_DOCUMENT_OPERATION: "faas.document.operation",
        FAAS_DOCUMENT_TIME: "faas.document.time",
        FAAS_DOCUMENT_NAME: "faas.document.name",
        FAAS_TIME: "faas.time",
        FAAS_CRON: "faas.cron",
        FAAS_COLDSTART: "faas.coldstart",
        FAAS_INVOKED_NAME: "faas.invoked_name",
        FAAS_INVOKED_PROVIDER: "faas.invoked_provider",
        FAAS_INVOKED_REGION: "faas.invoked_region",
        NET_TRANSPORT: "net.transport",
        NET_PEER_IP: "net.peer.ip",
        NET_PEER_PORT: "net.peer.port",
        NET_PEER_NAME: "net.peer.name",
        NET_HOST_IP: "net.host.ip",
        NET_HOST_PORT: "net.host.port",
        NET_HOST_NAME: "net.host.name",
        NET_HOST_CONNECTION_TYPE: "net.host.connection.type",
        NET_HOST_CONNECTION_SUBTYPE: "net.host.connection.subtype",
        NET_HOST_CARRIER_NAME: "net.host.carrier.name",
        NET_HOST_CARRIER_MCC: "net.host.carrier.mcc",
        NET_HOST_CARRIER_MNC: "net.host.carrier.mnc",
        NET_HOST_CARRIER_ICC: "net.host.carrier.icc",
        PEER_SERVICE: "peer.service",
        ENDUSER_ID: "enduser.id",
        ENDUSER_ROLE: "enduser.role",
        ENDUSER_SCOPE: "enduser.scope",
        THREAD_ID: "thread.id",
        THREAD_NAME: "thread.name",
        CODE_FUNCTION: "code.function",
        CODE_NAMESPACE: "code.namespace",
        CODE_FILEPATH: "code.filepath",
        CODE_LINENO: "code.lineno",
        HTTP_METHOD: "http.method",
        HTTP_URL: "http.url",
        HTTP_TARGET: "http.target",
        HTTP_HOST: "http.host",
        HTTP_SCHEME: "http.scheme",
        HTTP_STATUS_CODE: "http.status_code",
        HTTP_FLAVOR: "http.flavor",
        HTTP_USER_AGENT: "http.user_agent",
        HTTP_REQUEST_CONTENT_LENGTH: "http.request_content_length",
        HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED: "http.request_content_length_uncompressed",
        HTTP_RESPONSE_CONTENT_LENGTH: "http.response_content_length",
        HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED: "http.response_content_length_uncompressed",
        HTTP_SERVER_NAME: "http.server_name",
        HTTP_ROUTE: "http.route",
        HTTP_CLIENT_IP: "http.client_ip",
        AWS_DYNAMODB_TABLE_NAMES: "aws.dynamodb.table_names",
        AWS_DYNAMODB_CONSUMED_CAPACITY: "aws.dynamodb.consumed_capacity",
        AWS_DYNAMODB_ITEM_COLLECTION_METRICS: "aws.dynamodb.item_collection_metrics",
        AWS_DYNAMODB_PROVISIONED_READ_CAPACITY: "aws.dynamodb.provisioned_read_capacity",
        AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY: "aws.dynamodb.provisioned_write_capacity",
        AWS_DYNAMODB_CONSISTENT_READ: "aws.dynamodb.consistent_read",
        AWS_DYNAMODB_PROJECTION: "aws.dynamodb.projection",
        AWS_DYNAMODB_LIMIT: "aws.dynamodb.limit",
        AWS_DYNAMODB_ATTRIBUTES_TO_GET: "aws.dynamodb.attributes_to_get",
        AWS_DYNAMODB_INDEX_NAME: "aws.dynamodb.index_name",
        AWS_DYNAMODB_SELECT: "aws.dynamodb.select",
        AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES: "aws.dynamodb.global_secondary_indexes",
        AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: "aws.dynamodb.local_secondary_indexes",
        AWS_DYNAMODB_EXCLUSIVE_START_TABLE: "aws.dynamodb.exclusive_start_table",
        AWS_DYNAMODB_TABLE_COUNT: "aws.dynamodb.table_count",
        AWS_DYNAMODB_SCAN_FORWARD: "aws.dynamodb.scan_forward",
        AWS_DYNAMODB_SEGMENT: "aws.dynamodb.segment",
        AWS_DYNAMODB_TOTAL_SEGMENTS: "aws.dynamodb.total_segments",
        AWS_DYNAMODB_COUNT: "aws.dynamodb.count",
        AWS_DYNAMODB_SCANNED_COUNT: "aws.dynamodb.scanned_count",
        AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: "aws.dynamodb.attribute_definitions",
        AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES: "aws.dynamodb.global_secondary_index_updates",
        MESSAGING_SYSTEM: "messaging.system",
        MESSAGING_DESTINATION: "messaging.destination",
        MESSAGING_DESTINATION_KIND: "messaging.destination_kind",
        MESSAGING_TEMP_DESTINATION: "messaging.temp_destination",
        MESSAGING_PROTOCOL: "messaging.protocol",
        MESSAGING_PROTOCOL_VERSION: "messaging.protocol_version",
        MESSAGING_URL: "messaging.url",
        MESSAGING_MESSAGE_ID: "messaging.message_id",
        MESSAGING_CONVERSATION_ID: "messaging.conversation_id",
        MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: "messaging.message_payload_size_bytes",
        MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES: "messaging.message_payload_compressed_size_bytes",
        MESSAGING_OPERATION: "messaging.operation",
        MESSAGING_CONSUMER_ID: "messaging.consumer_id",
        MESSAGING_RABBITMQ_ROUTING_KEY: "messaging.rabbitmq.routing_key",
        MESSAGING_KAFKA_MESSAGE_KEY: "messaging.kafka.message_key",
        MESSAGING_KAFKA_CONSUMER_GROUP: "messaging.kafka.consumer_group",
        MESSAGING_KAFKA_CLIENT_ID: "messaging.kafka.client_id",
        MESSAGING_KAFKA_PARTITION: "messaging.kafka.partition",
        MESSAGING_KAFKA_TOMBSTONE: "messaging.kafka.tombstone",
        RPC_SYSTEM: "rpc.system",
        RPC_SERVICE: "rpc.service",
        RPC_METHOD: "rpc.method",
        RPC_GRPC_STATUS_CODE: "rpc.grpc.status_code",
        RPC_JSONRPC_VERSION: "rpc.jsonrpc.version",
        RPC_JSONRPC_REQUEST_ID: "rpc.jsonrpc.request_id",
        RPC_JSONRPC_ERROR_CODE: "rpc.jsonrpc.error_code",
        RPC_JSONRPC_ERROR_MESSAGE: "rpc.jsonrpc.error_message",
        MESSAGE_TYPE: "message.type",
        MESSAGE_ID: "message.id",
        MESSAGE_COMPRESSED_SIZE: "message.compressed_size",
        MESSAGE_UNCOMPRESSED_SIZE: "message.uncompressed_size"
    };
    R.DbSystemValues = {
        OTHER_SQL: "other_sql",
        MSSQL: "mssql",
        MYSQL: "mysql",
        ORACLE: "oracle",
        DB2: "db2",
        POSTGRESQL: "postgresql",
        REDSHIFT: "redshift",
        HIVE: "hive",
        CLOUDSCAPE: "cloudscape",
        HSQLDB: "hsqldb",
        PROGRESS: "progress",
        MAXDB: "maxdb",
        HANADB: "hanadb",
        INGRES: "ingres",
        FIRSTSQL: "firstsql",
        EDB: "edb",
        CACHE: "cache",
        ADABAS: "adabas",
        FIREBIRD: "firebird",
        DERBY: "derby",
        FILEMAKER: "filemaker",
        INFORMIX: "informix",
        INSTANTDB: "instantdb",
        INTERBASE: "interbase",
        MARIADB: "mariadb",
        NETEZZA: "netezza",
        PERVASIVE: "pervasive",
        POINTBASE: "pointbase",
        SQLITE: "sqlite",
        SYBASE: "sybase",
        TERADATA: "teradata",
        VERTICA: "vertica",
        H2: "h2",
        COLDFUSION: "coldfusion",
        CASSANDRA: "cassandra",
        HBASE: "hbase",
        MONGODB: "mongodb",
        REDIS: "redis",
        COUCHBASE: "couchbase",
        COUCHDB: "couchdb",
        COSMOSDB: "cosmosdb",
        DYNAMODB: "dynamodb",
        NEO4J: "neo4j",
        GEODE: "geode",
        ELASTICSEARCH: "elasticsearch",
        MEMCACHED: "memcached",
        COCKROACHDB: "cockroachdb"
    };
    R.DbCassandraConsistencyLevelValues = {
        ALL: "all",
        EACH_QUORUM: "each_quorum",
        QUORUM: "quorum",
        LOCAL_QUORUM: "local_quorum",
        ONE: "one",
        TWO: "two",
        THREE: "three",
        LOCAL_ONE: "local_one",
        ANY: "any",
        SERIAL: "serial",
        LOCAL_SERIAL: "local_serial"
    };
    R.FaasTriggerValues = {
        DATASOURCE: "datasource",
        HTTP: "http",
        PUBSUB: "pubsub",
        TIMER: "timer",
        OTHER: "other"
    };
    R.FaasDocumentOperationValues = {
        INSERT: "insert",
        EDIT: "edit",
        DELETE: "delete"
    };
    R.FaasInvokedProviderValues = {
        ALIBABA_CLOUD: "alibaba_cloud",
        AWS: "aws",
        AZURE: "azure",
        GCP: "gcp"
    };
    R.NetTransportValues = {
        IP_TCP: "ip_tcp",
        IP_UDP: "ip_udp",
        IP: "ip",
        UNIX: "unix",
        PIPE: "pipe",
        INPROC: "inproc",
        OTHER: "other"
    };
    R.NetHostConnectionTypeValues = {
        WIFI: "wifi",
        WIRED: "wired",
        CELL: "cell",
        UNAVAILABLE: "unavailable",
        UNKNOWN: "unknown"
    };
    R.NetHostConnectionSubtypeValues = {
        GPRS: "gprs",
        EDGE: "edge",
        UMTS: "umts",
        CDMA: "cdma",
        EVDO_0: "evdo_0",
        EVDO_A: "evdo_a",
        CDMA2000_1XRTT: "cdma2000_1xrtt",
        HSDPA: "hsdpa",
        HSUPA: "hsupa",
        HSPA: "hspa",
        IDEN: "iden",
        EVDO_B: "evdo_b",
        LTE: "lte",
        EHRPD: "ehrpd",
        HSPAP: "hspap",
        GSM: "gsm",
        TD_SCDMA: "td_scdma",
        IWLAN: "iwlan",
        NR: "nr",
        NRNSA: "nrnsa",
        LTE_CA: "lte_ca"
    };
    R.HttpFlavorValues = {
        HTTP_1_0: "1.0",
        HTTP_1_1: "1.1",
        HTTP_2_0: "2.0",
        SPDY: "SPDY",
        QUIC: "QUIC"
    };
    R.MessagingDestinationKindValues = {
        QUEUE: "queue",
        TOPIC: "topic"
    };
    R.MessagingOperationValues = {
        RECEIVE: "receive",
        PROCESS: "process"
    };
    R.RpcGrpcStatusCodeValues = {
        OK: 0,
        CANCELLED: 1,
        UNKNOWN: 2,
        INVALID_ARGUMENT: 3,
        DEADLINE_EXCEEDED: 4,
        NOT_FOUND: 5,
        ALREADY_EXISTS: 6,
        PERMISSION_DENIED: 7,
        RESOURCE_EXHAUSTED: 8,
        FAILED_PRECONDITION: 9,
        ABORTED: 10,
        OUT_OF_RANGE: 11,
        UNIMPLEMENTED: 12,
        INTERNAL: 13,
        UNAVAILABLE: 14,
        DATA_LOSS: 15,
        UNAUTHENTICATED: 16
    };
    R.MessageTypeValues = {
        SENT: "SENT",
        RECEIVED: "RECEIVED"
    };
});
var fc = c((He)=>{
    "use strict";
    var mf = He && He.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), gf = He && He.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && mf(e, r, t);
    };
    Object.defineProperty(He, "__esModule", {
        value: !0
    });
    gf(pc(), He);
});
var Ec = c((k)=>{
    "use strict";
    Object.defineProperty(k, "__esModule", {
        value: !0
    });
    k.TelemetrySdkLanguageValues = k.OsTypeValues = k.HostArchValues = k.AwsEcsLaunchtypeValues = k.CloudPlatformValues = k.CloudProviderValues = k.SemanticResourceAttributes = void 0;
    k.SemanticResourceAttributes = {
        CLOUD_PROVIDER: "cloud.provider",
        CLOUD_ACCOUNT_ID: "cloud.account.id",
        CLOUD_REGION: "cloud.region",
        CLOUD_AVAILABILITY_ZONE: "cloud.availability_zone",
        CLOUD_PLATFORM: "cloud.platform",
        AWS_ECS_CONTAINER_ARN: "aws.ecs.container.arn",
        AWS_ECS_CLUSTER_ARN: "aws.ecs.cluster.arn",
        AWS_ECS_LAUNCHTYPE: "aws.ecs.launchtype",
        AWS_ECS_TASK_ARN: "aws.ecs.task.arn",
        AWS_ECS_TASK_FAMILY: "aws.ecs.task.family",
        AWS_ECS_TASK_REVISION: "aws.ecs.task.revision",
        AWS_EKS_CLUSTER_ARN: "aws.eks.cluster.arn",
        AWS_LOG_GROUP_NAMES: "aws.log.group.names",
        AWS_LOG_GROUP_ARNS: "aws.log.group.arns",
        AWS_LOG_STREAM_NAMES: "aws.log.stream.names",
        AWS_LOG_STREAM_ARNS: "aws.log.stream.arns",
        CONTAINER_NAME: "container.name",
        CONTAINER_ID: "container.id",
        CONTAINER_RUNTIME: "container.runtime",
        CONTAINER_IMAGE_NAME: "container.image.name",
        CONTAINER_IMAGE_TAG: "container.image.tag",
        DEPLOYMENT_ENVIRONMENT: "deployment.environment",
        DEVICE_ID: "device.id",
        DEVICE_MODEL_IDENTIFIER: "device.model.identifier",
        DEVICE_MODEL_NAME: "device.model.name",
        FAAS_NAME: "faas.name",
        FAAS_ID: "faas.id",
        FAAS_VERSION: "faas.version",
        FAAS_INSTANCE: "faas.instance",
        FAAS_MAX_MEMORY: "faas.max_memory",
        HOST_ID: "host.id",
        HOST_NAME: "host.name",
        HOST_TYPE: "host.type",
        HOST_ARCH: "host.arch",
        HOST_IMAGE_NAME: "host.image.name",
        HOST_IMAGE_ID: "host.image.id",
        HOST_IMAGE_VERSION: "host.image.version",
        K8S_CLUSTER_NAME: "k8s.cluster.name",
        K8S_NODE_NAME: "k8s.node.name",
        K8S_NODE_UID: "k8s.node.uid",
        K8S_NAMESPACE_NAME: "k8s.namespace.name",
        K8S_POD_UID: "k8s.pod.uid",
        K8S_POD_NAME: "k8s.pod.name",
        K8S_CONTAINER_NAME: "k8s.container.name",
        K8S_REPLICASET_UID: "k8s.replicaset.uid",
        K8S_REPLICASET_NAME: "k8s.replicaset.name",
        K8S_DEPLOYMENT_UID: "k8s.deployment.uid",
        K8S_DEPLOYMENT_NAME: "k8s.deployment.name",
        K8S_STATEFULSET_UID: "k8s.statefulset.uid",
        K8S_STATEFULSET_NAME: "k8s.statefulset.name",
        K8S_DAEMONSET_UID: "k8s.daemonset.uid",
        K8S_DAEMONSET_NAME: "k8s.daemonset.name",
        K8S_JOB_UID: "k8s.job.uid",
        K8S_JOB_NAME: "k8s.job.name",
        K8S_CRONJOB_UID: "k8s.cronjob.uid",
        K8S_CRONJOB_NAME: "k8s.cronjob.name",
        OS_TYPE: "os.type",
        OS_DESCRIPTION: "os.description",
        OS_NAME: "os.name",
        OS_VERSION: "os.version",
        PROCESS_PID: "process.pid",
        PROCESS_EXECUTABLE_NAME: "process.executable.name",
        PROCESS_EXECUTABLE_PATH: "process.executable.path",
        PROCESS_COMMAND: "process.command",
        PROCESS_COMMAND_LINE: "process.command_line",
        PROCESS_COMMAND_ARGS: "process.command_args",
        PROCESS_OWNER: "process.owner",
        PROCESS_RUNTIME_NAME: "process.runtime.name",
        PROCESS_RUNTIME_VERSION: "process.runtime.version",
        PROCESS_RUNTIME_DESCRIPTION: "process.runtime.description",
        SERVICE_NAME: "service.name",
        SERVICE_NAMESPACE: "service.namespace",
        SERVICE_INSTANCE_ID: "service.instance.id",
        SERVICE_VERSION: "service.version",
        TELEMETRY_SDK_NAME: "telemetry.sdk.name",
        TELEMETRY_SDK_LANGUAGE: "telemetry.sdk.language",
        TELEMETRY_SDK_VERSION: "telemetry.sdk.version",
        TELEMETRY_AUTO_VERSION: "telemetry.auto.version",
        WEBENGINE_NAME: "webengine.name",
        WEBENGINE_VERSION: "webengine.version",
        WEBENGINE_DESCRIPTION: "webengine.description"
    };
    k.CloudProviderValues = {
        ALIBABA_CLOUD: "alibaba_cloud",
        AWS: "aws",
        AZURE: "azure",
        GCP: "gcp"
    };
    k.CloudPlatformValues = {
        ALIBABA_CLOUD_ECS: "alibaba_cloud_ecs",
        ALIBABA_CLOUD_FC: "alibaba_cloud_fc",
        AWS_EC2: "aws_ec2",
        AWS_ECS: "aws_ecs",
        AWS_EKS: "aws_eks",
        AWS_LAMBDA: "aws_lambda",
        AWS_ELASTIC_BEANSTALK: "aws_elastic_beanstalk",
        AZURE_VM: "azure_vm",
        AZURE_CONTAINER_INSTANCES: "azure_container_instances",
        AZURE_AKS: "azure_aks",
        AZURE_FUNCTIONS: "azure_functions",
        AZURE_APP_SERVICE: "azure_app_service",
        GCP_COMPUTE_ENGINE: "gcp_compute_engine",
        GCP_CLOUD_RUN: "gcp_cloud_run",
        GCP_KUBERNETES_ENGINE: "gcp_kubernetes_engine",
        GCP_CLOUD_FUNCTIONS: "gcp_cloud_functions",
        GCP_APP_ENGINE: "gcp_app_engine"
    };
    k.AwsEcsLaunchtypeValues = {
        EC2: "ec2",
        FARGATE: "fargate"
    };
    k.HostArchValues = {
        AMD64: "amd64",
        ARM32: "arm32",
        ARM64: "arm64",
        IA64: "ia64",
        PPC32: "ppc32",
        PPC64: "ppc64",
        X86: "x86"
    };
    k.OsTypeValues = {
        WINDOWS: "windows",
        LINUX: "linux",
        DARWIN: "darwin",
        FREEBSD: "freebsd",
        NETBSD: "netbsd",
        OPENBSD: "openbsd",
        DRAGONFLYBSD: "dragonflybsd",
        HPUX: "hpux",
        AIX: "aix",
        SOLARIS: "solaris",
        Z_OS: "z_os"
    };
    k.TelemetrySdkLanguageValues = {
        CPP: "cpp",
        DOTNET: "dotnet",
        ERLANG: "erlang",
        GO: "go",
        JAVA: "java",
        NODEJS: "nodejs",
        PHP: "php",
        PYTHON: "python",
        RUBY: "ruby",
        WEBJS: "webjs"
    };
});
var mc = c((ke)=>{
    "use strict";
    var Tf = ke && ke.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), Sf = ke && ke.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Tf(e, r, t);
    };
    Object.defineProperty(ke, "__esModule", {
        value: !0
    });
    Sf(Ec(), ke);
});
var ie = c((Me)=>{
    "use strict";
    var Af = Me && Me.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), gc = Me && Me.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Af(e, r, t);
    };
    Object.defineProperty(Me, "__esModule", {
        value: !0
    });
    gc(fc(), Me);
    gc(mc(), Me);
});
var Tc = c((Qr)=>{
    "use strict";
    Object.defineProperty(Qr, "__esModule", {
        value: !0
    });
    Qr.SDK_INFO = void 0;
    var Of = Vs(), lr = ie();
    Qr.SDK_INFO = {
        [lr.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: "opentelemetry",
        [lr.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "node",
        [lr.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: lr.TelemetrySdkLanguageValues.NODEJS,
        [lr.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: Of.VERSION
    };
});
var Sc = c((Zr)=>{
    "use strict";
    Object.defineProperty(Zr, "__esModule", {
        value: !0
    });
    Zr.unrefTimer = void 0;
    function Rf(r) {
        r.unref();
    }
    Zr.unrefTimer = Rf;
});
var Ac = c((ee)=>{
    "use strict";
    var bf = ee && ee.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), Xe = ee && ee.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && bf(e, r, t);
    };
    Object.defineProperty(ee, "__esModule", {
        value: !0
    });
    Xe(oc(), ee);
    Xe(ac(), ee);
    Xe(cc(), ee);
    Xe(_c(), ee);
    Xe(hc(), ee);
    Xe(Tc(), ee);
    Xe(Sc(), ee);
});
var js = c(($e)=>{
    "use strict";
    var Pf = $e && $e.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), yf = $e && $e.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Pf(e, r, t);
    };
    Object.defineProperty($e, "__esModule", {
        value: !0
    });
    yf(Ac(), $e);
});
var Pc = c((P)=>{
    "use strict";
    Object.defineProperty(P, "__esModule", {
        value: !0
    });
    P.addHrTimes = P.isTimeInput = P.isTimeInputHrTime = P.hrTimeToMicroseconds = P.hrTimeToMilliseconds = P.hrTimeToNanoseconds = P.hrTimeToTimeStamp = P.hrTimeDuration = P.timeInputToHrTime = P.hrTime = P.getTimeOrigin = P.millisToHrTime = void 0;
    var Fs = js(), Oc = 9, vf = 6, If = Math.pow(10, vf), Jr = Math.pow(10, Oc);
    function dr(r) {
        let e = r / 1e3, t = Math.trunc(e), n = Math.round(r % 1e3 * If);
        return [
            t,
            n
        ];
    }
    P.millisToHrTime = dr;
    function Hs() {
        let r = Fs.otperformance.timeOrigin;
        if (typeof r != "number") {
            let e = Fs.otperformance;
            r = e.timing && e.timing.fetchStart;
        }
        return r;
    }
    P.getTimeOrigin = Hs;
    function Rc(r) {
        let e = dr(Hs()), t = dr(typeof r == "number" ? r : Fs.otperformance.now());
        return bc(e, t);
    }
    P.hrTime = Rc;
    function Lf(r) {
        if (ks(r)) return r;
        if (typeof r == "number") return r < Hs() ? Rc(r) : dr(r);
        if (r instanceof Date) return dr(r.getTime());
        throw TypeError("Invalid input type");
    }
    P.timeInputToHrTime = Lf;
    function Mf(r, e) {
        let t = e[0] - r[0], n = e[1] - r[1];
        return n < 0 && (t -= 1, n += Jr), [
            t,
            n
        ];
    }
    P.hrTimeDuration = Mf;
    function Cf(r) {
        let e = Oc, t = `${"0".repeat(e)}${r[1]}Z`, n = t.substr(t.length - e - 1);
        return new Date(r[0] * 1e3).toISOString().replace("000Z", n);
    }
    P.hrTimeToTimeStamp = Cf;
    function Nf(r) {
        return r[0] * Jr + r[1];
    }
    P.hrTimeToNanoseconds = Nf;
    function wf(r) {
        return r[0] * 1e3 + r[1] / 1e6;
    }
    P.hrTimeToMilliseconds = wf;
    function xf(r) {
        return r[0] * 1e6 + r[1] / 1e3;
    }
    P.hrTimeToMicroseconds = xf;
    function ks(r) {
        return Array.isArray(r) && r.length === 2 && typeof r[0] == "number" && typeof r[1] == "number";
    }
    P.isTimeInputHrTime = ks;
    function Df(r) {
        return ks(r) || typeof r == "number" || r instanceof Date;
    }
    P.isTimeInput = Df;
    function bc(r, e) {
        let t = [
            r[0] + e[0],
            r[1] + e[1]
        ];
        return t[1] >= Jr && (t[1] -= Jr, t[0] += 1), t;
    }
    P.addHrTimes = bc;
});
var vc = c((yc)=>{
    "use strict";
    Object.defineProperty(yc, "__esModule", {
        value: !0
    });
});
var Ic = c((_r)=>{
    "use strict";
    Object.defineProperty(_r, "__esModule", {
        value: !0
    });
    _r.ExportResultCode = void 0;
    var Bf;
    (function(r) {
        r[r.SUCCESS = 0] = "SUCCESS", r[r.FAILED = 1] = "FAILED";
    })(Bf = _r.ExportResultCode || (_r.ExportResultCode = {}));
});
var Mc = c((en)=>{
    "use strict";
    Object.defineProperty(en, "__esModule", {
        value: !0
    });
    en.CompositePropagator = void 0;
    var Lc = (h(), f(d)), Xs = class {
        constructor(e = {}){
            var t;
            this._propagators = (t = e.propagators) !== null && t !== void 0 ? t : [], this._fields = Array.from(new Set(this._propagators.map((n)=>typeof n.fields == "function" ? n.fields() : []).reduce((n, i)=>n.concat(i), [])));
        }
        inject(e, t, n) {
            for (let i of this._propagators)try {
                i.inject(e, t, n);
            } catch (s) {
                Lc.diag.warn(`Failed to inject with ${i.constructor.name}. Err: ${s.message}`);
            }
        }
        extract(e, t, n) {
            return this._propagators.reduce((i, s)=>{
                try {
                    return s.extract(i, t, n);
                } catch (o) {
                    Lc.diag.warn(`Failed to inject with ${s.constructor.name}. Err: ${o.message}`);
                }
                return i;
            }, e);
        }
        fields() {
            return this._fields.slice();
        }
    };
    en.CompositePropagator = Xs;
});
var Cc = c((ft)=>{
    "use strict";
    Object.defineProperty(ft, "__esModule", {
        value: !0
    });
    ft.validateValue = ft.validateKey = void 0;
    var $s = "[_0-9a-z-*/]", Uf = `[a-z]${$s}{0,255}`, qf = `[a-z0-9]${$s}{0,240}@[a-z]${$s}{0,13}`, Gf = new RegExp(`^(?:${Uf}|${qf})$`), Vf = /^[ -~]{0,255}[!-~]$/, jf = /,|=/;
    function Ff(r) {
        return Gf.test(r);
    }
    ft.validateKey = Ff;
    function Hf(r) {
        return Vf.test(r) && !jf.test(r);
    }
    ft.validateValue = Hf;
});
var Ks = c((tn)=>{
    "use strict";
    Object.defineProperty(tn, "__esModule", {
        value: !0
    });
    tn.TraceState = void 0;
    var Nc = Cc(), wc = 32, kf = 512, xc = ",", Dc = "=", Ws = class r {
        constructor(e){
            this._internalState = new Map, e && this._parse(e);
        }
        set(e, t) {
            let n = this._clone();
            return n._internalState.has(e) && n._internalState.delete(e), n._internalState.set(e, t), n;
        }
        unset(e) {
            let t = this._clone();
            return t._internalState.delete(e), t;
        }
        get(e) {
            return this._internalState.get(e);
        }
        serialize() {
            return this._keys().reduce((e, t)=>(e.push(t + Dc + this.get(t)), e), []).join(xc);
        }
        _parse(e) {
            e.length > kf || (this._internalState = e.split(xc).reverse().reduce((t, n)=>{
                let i = n.trim(), s = i.indexOf(Dc);
                if (s !== -1) {
                    let o = i.slice(0, s), a = i.slice(s + 1, n.length);
                    (0, Nc.validateKey)(o) && (0, Nc.validateValue)(a) && t.set(o, a);
                }
                return t;
            }, new Map), this._internalState.size > wc && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, wc))));
        }
        _keys() {
            return Array.from(this._internalState.keys()).reverse();
        }
        _clone() {
            let e = new r;
            return e._internalState = new Map(this._internalState), e;
        }
    };
    tn.TraceState = Ws;
});
var Uc = c((X)=>{
    "use strict";
    Object.defineProperty(X, "__esModule", {
        value: !0
    });
    X.W3CTraceContextPropagator = X.parseTraceParent = X.TRACE_STATE_HEADER = X.TRACE_PARENT_HEADER = void 0;
    var rn = (h(), f(d)), Xf = ur(), $f = Ks();
    X.TRACE_PARENT_HEADER = "traceparent";
    X.TRACE_STATE_HEADER = "tracestate";
    var Wf = "00", Kf = "(?!ff)[\\da-f]{2}", zf = "(?![0]{32})[\\da-f]{32}", Yf = "(?![0]{16})[\\da-f]{16}", Qf = "[\\da-f]{2}", Zf = new RegExp(`^\\s?(${Kf})-(${zf})-(${Yf})-(${Qf})(-.*)?\\s?$`);
    function Bc(r) {
        let e = Zf.exec(r);
        return !e || e[1] === "00" && e[5] ? null : {
            traceId: e[2],
            spanId: e[3],
            traceFlags: parseInt(e[4], 16)
        };
    }
    X.parseTraceParent = Bc;
    var zs = class {
        inject(e, t, n) {
            let i = rn.trace.getSpanContext(e);
            if (!i || (0, Xf.isTracingSuppressed)(e) || !(0, rn.isSpanContextValid)(i)) return;
            let s = `${Wf}-${i.traceId}-${i.spanId}-0${Number(i.traceFlags || rn.TraceFlags.NONE).toString(16)}`;
            n.set(t, X.TRACE_PARENT_HEADER, s), i.traceState && n.set(t, X.TRACE_STATE_HEADER, i.traceState.serialize());
        }
        extract(e, t, n) {
            let i = n.get(t, X.TRACE_PARENT_HEADER);
            if (!i) return e;
            let s = Array.isArray(i) ? i[0] : i;
            if (typeof s != "string") return e;
            let o = Bc(s);
            if (!o) return e;
            o.isRemote = !0;
            let a = n.get(t, X.TRACE_STATE_HEADER);
            if (a) {
                let u = Array.isArray(a) ? a.join(",") : a;
                o.traceState = new $f.TraceState(typeof u == "string" ? u : void 0);
            }
            return rn.trace.setSpanContext(e, o);
        }
        fields() {
            return [
                X.TRACE_PARENT_HEADER,
                X.TRACE_STATE_HEADER
            ];
        }
    };
    X.W3CTraceContextPropagator = zs;
});
var Gc = c((qc)=>{
    "use strict";
    Object.defineProperty(qc, "__esModule", {
        value: !0
    });
});
var Vc = c((ue)=>{
    "use strict";
    Object.defineProperty(ue, "__esModule", {
        value: !0
    });
    ue.getRPCMetadata = ue.deleteRPCMetadata = ue.setRPCMetadata = ue.RPCType = void 0;
    var Jf = (h(), f(d)), Ys = (0, Jf.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA"), eE;
    (function(r) {
        r.HTTP = "http";
    })(eE = ue.RPCType || (ue.RPCType = {}));
    function tE(r, e) {
        return r.setValue(Ys, e);
    }
    ue.setRPCMetadata = tE;
    function rE(r) {
        return r.deleteValue(Ys);
    }
    ue.deleteRPCMetadata = rE;
    function nE(r) {
        return r.getValue(Ys);
    }
    ue.getRPCMetadata = nE;
});
var Zs = c((nn)=>{
    "use strict";
    Object.defineProperty(nn, "__esModule", {
        value: !0
    });
    nn.AlwaysOffSampler = void 0;
    var iE = (h(), f(d)), Qs = class {
        shouldSample() {
            return {
                decision: iE.SamplingDecision.NOT_RECORD
            };
        }
        toString() {
            return "AlwaysOffSampler";
        }
    };
    nn.AlwaysOffSampler = Qs;
});
var eo = c((sn)=>{
    "use strict";
    Object.defineProperty(sn, "__esModule", {
        value: !0
    });
    sn.AlwaysOnSampler = void 0;
    var sE = (h(), f(d)), Js = class {
        shouldSample() {
            return {
                decision: sE.SamplingDecision.RECORD_AND_SAMPLED
            };
        }
        toString() {
            return "AlwaysOnSampler";
        }
    };
    sn.AlwaysOnSampler = Js;
});
var Fc = c((an)=>{
    "use strict";
    Object.defineProperty(an, "__esModule", {
        value: !0
    });
    an.ParentBasedSampler = void 0;
    var on = (h(), f(d)), oE = Bs(), jc = Zs(), to = eo(), ro = class {
        constructor(e){
            var t, n, i, s;
            this._root = e.root, this._root || ((0, oE.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured")), this._root = new to.AlwaysOnSampler), this._remoteParentSampled = (t = e.remoteParentSampled) !== null && t !== void 0 ? t : new to.AlwaysOnSampler, this._remoteParentNotSampled = (n = e.remoteParentNotSampled) !== null && n !== void 0 ? n : new jc.AlwaysOffSampler, this._localParentSampled = (i = e.localParentSampled) !== null && i !== void 0 ? i : new to.AlwaysOnSampler, this._localParentNotSampled = (s = e.localParentNotSampled) !== null && s !== void 0 ? s : new jc.AlwaysOffSampler;
        }
        shouldSample(e, t, n, i, s, o) {
            let a = on.trace.getSpanContext(e);
            return !a || !(0, on.isSpanContextValid)(a) ? this._root.shouldSample(e, t, n, i, s, o) : a.isRemote ? a.traceFlags & on.TraceFlags.SAMPLED ? this._remoteParentSampled.shouldSample(e, t, n, i, s, o) : this._remoteParentNotSampled.shouldSample(e, t, n, i, s, o) : a.traceFlags & on.TraceFlags.SAMPLED ? this._localParentSampled.shouldSample(e, t, n, i, s, o) : this._localParentNotSampled.shouldSample(e, t, n, i, s, o);
        }
        toString() {
            return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
        }
    };
    an.ParentBasedSampler = ro;
});
var Hc = c((un)=>{
    "use strict";
    Object.defineProperty(un, "__esModule", {
        value: !0
    });
    un.TraceIdRatioBasedSampler = void 0;
    var no = (h(), f(d)), io = class {
        constructor(e = 0){
            this._ratio = e, this._ratio = this._normalize(e), this._upperBound = Math.floor(this._ratio * 4294967295);
        }
        shouldSample(e, t) {
            return {
                decision: (0, no.isValidTraceId)(t) && this._accumulate(t) < this._upperBound ? no.SamplingDecision.RECORD_AND_SAMPLED : no.SamplingDecision.NOT_RECORD
            };
        }
        toString() {
            return `TraceIdRatioBased{${this._ratio}}`;
        }
        _normalize(e) {
            return typeof e != "number" || isNaN(e) ? 0 : e >= 1 ? 1 : e <= 0 ? 0 : e;
        }
        _accumulate(e) {
            let t = 0;
            for(let n = 0; n < e.length / 8; n++){
                let i = n * 8, s = parseInt(e.slice(i, i + 8), 16);
                t = (t ^ s) >>> 0;
            }
            return t;
        }
    };
    un.TraceIdRatioBasedSampler = io;
});
var Kc = c((cn)=>{
    "use strict";
    Object.defineProperty(cn, "__esModule", {
        value: !0
    });
    cn.isPlainObject = void 0;
    var aE = "[object Object]", uE = "[object Null]", cE = "[object Undefined]", lE = Function.prototype, kc = lE.toString, dE = kc.call(Object), _E = hE(Object.getPrototypeOf, Object), Xc = Object.prototype, $c = Xc.hasOwnProperty, We = Symbol ? Symbol.toStringTag : void 0, Wc = Xc.toString;
    function hE(r, e) {
        return function(t) {
            return r(e(t));
        };
    }
    function pE(r) {
        if (!fE(r) || EE(r) !== aE) return !1;
        let e = _E(r);
        if (e === null) return !0;
        let t = $c.call(e, "constructor") && e.constructor;
        return typeof t == "function" && t instanceof t && kc.call(t) === dE;
    }
    cn.isPlainObject = pE;
    function fE(r) {
        return r != null && typeof r == "object";
    }
    function EE(r) {
        return r == null ? r === void 0 ? cE : uE : We && We in Object(r) ? mE(r) : gE(r);
    }
    function mE(r) {
        let e = $c.call(r, We), t = r[We], n = !1;
        try {
            r[We] = void 0, n = !0;
        } catch  {}
        let i = Wc.call(r);
        return n && (e ? r[We] = t : delete r[We]), i;
    }
    function gE(r) {
        return Wc.call(r);
    }
});
var Jc = c((_n)=>{
    "use strict";
    Object.defineProperty(_n, "__esModule", {
        value: !0
    });
    _n.merge = void 0;
    var zc = Kc(), TE = 20;
    function SE(...r) {
        let e = r.shift(), t = new WeakMap;
        for(; r.length > 0;)e = Qc(e, r.shift(), 0, t);
        return e;
    }
    _n.merge = SE;
    function so(r) {
        return dn(r) ? r.slice() : r;
    }
    function Qc(r, e, t = 0, n) {
        let i;
        if (!(t > TE)) {
            if (t++, ln(r) || ln(e) || Zc(e)) i = so(e);
            else if (dn(r)) {
                if (i = r.slice(), dn(e)) for(let s = 0, o = e.length; s < o; s++)i.push(so(e[s]));
                else if (hr(e)) {
                    let s = Object.keys(e);
                    for(let o = 0, a = s.length; o < a; o++){
                        let u = s[o];
                        i[u] = so(e[u]);
                    }
                }
            } else if (hr(r)) if (hr(e)) {
                if (!AE(r, e)) return e;
                i = Object.assign({}, r);
                let s = Object.keys(e);
                for(let o = 0, a = s.length; o < a; o++){
                    let u = s[o], l = e[u];
                    if (ln(l)) typeof l > "u" ? delete i[u] : i[u] = l;
                    else {
                        let _ = i[u], E = l;
                        if (Yc(r, u, n) || Yc(e, u, n)) delete i[u];
                        else {
                            if (hr(_) && hr(E)) {
                                let O = n.get(_) || [], D = n.get(E) || [];
                                O.push({
                                    obj: r,
                                    key: u
                                }), D.push({
                                    obj: e,
                                    key: u
                                }), n.set(_, O), n.set(E, D);
                            }
                            i[u] = Qc(i[u], l, t, n);
                        }
                    }
                }
            } else i = e;
            return i;
        }
    }
    function Yc(r, e, t) {
        let n = t.get(r[e]) || [];
        for(let i = 0, s = n.length; i < s; i++){
            let o = n[i];
            if (o.key === e && o.obj === r) return !0;
        }
        return !1;
    }
    function dn(r) {
        return Array.isArray(r);
    }
    function Zc(r) {
        return typeof r == "function";
    }
    function hr(r) {
        return !ln(r) && !dn(r) && !Zc(r) && typeof r == "object";
    }
    function ln(r) {
        return typeof r == "string" || typeof r == "number" || typeof r == "boolean" || typeof r > "u" || r instanceof Date || r instanceof RegExp || r === null;
    }
    function AE(r, e) {
        return !(!(0, zc.isPlainObject)(r) || !(0, zc.isPlainObject)(e));
    }
});
var el = c((Et)=>{
    "use strict";
    Object.defineProperty(Et, "__esModule", {
        value: !0
    });
    Et.callWithTimeout = Et.TimeoutError = void 0;
    var hn = class r extends Error {
        constructor(e){
            super(e), Object.setPrototypeOf(this, r.prototype);
        }
    };
    Et.TimeoutError = hn;
    function OE(r, e) {
        let t, n = new Promise(function(s, o) {
            t = setTimeout(function() {
                o(new hn("Operation timed out."));
            }, e);
        });
        return Promise.race([
            r,
            n
        ]).then((i)=>(clearTimeout(t), i), (i)=>{
            throw clearTimeout(t), i;
        });
    }
    Et.callWithTimeout = OE;
});
var rl = c((mt)=>{
    "use strict";
    Object.defineProperty(mt, "__esModule", {
        value: !0
    });
    mt.isUrlIgnored = mt.urlMatches = void 0;
    function tl(r, e) {
        return typeof e == "string" ? r === e : !!r.match(e);
    }
    mt.urlMatches = tl;
    function RE(r, e) {
        if (!e) return !1;
        for (let t of e)if (tl(r, t)) return !0;
        return !1;
    }
    mt.isUrlIgnored = RE;
});
var nl = c((pn)=>{
    "use strict";
    Object.defineProperty(pn, "__esModule", {
        value: !0
    });
    pn.isWrapped = void 0;
    function bE(r) {
        return typeof r == "function" && typeof r.__original == "function" && typeof r.__unwrap == "function" && r.__wrapped === !0;
    }
    pn.isWrapped = bE;
});
var il = c((fn)=>{
    "use strict";
    Object.defineProperty(fn, "__esModule", {
        value: !0
    });
    fn.Deferred = void 0;
    var oo = class {
        constructor(){
            this._promise = new Promise((e, t)=>{
                this._resolve = e, this._reject = t;
            });
        }
        get promise() {
            return this._promise;
        }
        resolve(e) {
            this._resolve(e);
        }
        reject(e) {
            this._reject(e);
        }
    };
    fn.Deferred = oo;
});
var sl = c((En)=>{
    "use strict";
    Object.defineProperty(En, "__esModule", {
        value: !0
    });
    En.BindOnceFuture = void 0;
    var PE = il(), ao = class {
        constructor(e, t){
            this._callback = e, this._that = t, this._isCalled = !1, this._deferred = new PE.Deferred;
        }
        get isCalled() {
            return this._isCalled;
        }
        get promise() {
            return this._deferred.promise;
        }
        call(...e) {
            if (!this._isCalled) {
                this._isCalled = !0;
                try {
                    Promise.resolve(this._callback.call(this._that, ...e)).then((t)=>this._deferred.resolve(t), (t)=>this._deferred.reject(t));
                } catch (t) {
                    this._deferred.reject(t);
                }
            }
            return this._deferred.promise;
        }
    };
    En.BindOnceFuture = ao;
});
var al = c((mn)=>{
    "use strict";
    Object.defineProperty(mn, "__esModule", {
        value: !0
    });
    mn._export = void 0;
    var ol = (h(), f(d)), yE = ur();
    function vE(r, e) {
        return new Promise((t)=>{
            ol.context.with((0, yE.suppressTracing)(ol.context.active()), ()=>{
                r.export(e, (n)=>{
                    t(n);
                });
            });
        });
    }
    mn._export = vE;
});
var S = c((T)=>{
    "use strict";
    var IE = T && T.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), b = T && T.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && IE(e, r, t);
    };
    Object.defineProperty(T, "__esModule", {
        value: !0
    });
    T.internal = T.baggageUtils = void 0;
    b(Yu(), T);
    b(Qu(), T);
    b(rc(), T);
    b(Bs(), T);
    b(Ds(), T);
    b(Pc(), T);
    b(vc(), T);
    b(Ic(), T);
    T.baggageUtils = Ms();
    b(js(), T);
    b(Mc(), T);
    b(Uc(), T);
    b(Gc(), T);
    b(Vc(), T);
    b(Zs(), T);
    b(eo(), T);
    b(Fc(), T);
    b(Hc(), T);
    b(ur(), T);
    b(Ks(), T);
    b(Hr(), T);
    b(Jc(), T);
    b(Us(), T);
    b(el(), T);
    b(rl(), T);
    b(nl(), T);
    b(sl(), T);
    b(Vs(), T);
    var LE = al();
    T.internal = {
        _export: LE._export
    };
});
var ul = c((gn)=>{
    "use strict";
    Object.defineProperty(gn, "__esModule", {
        value: !0
    });
    gn.ExceptionEventName = void 0;
    gn.ExceptionEventName = "exception";
});
var co = c((Tn)=>{
    "use strict";
    Object.defineProperty(Tn, "__esModule", {
        value: !0
    });
    Tn.Span = void 0;
    var fe = (h(), f(d)), $ = S(), Ke = ie(), ME = ul(), uo = class {
        constructor(e, t, n, i, s, o, a = [], u, l, _){
            this.attributes = {}, this.links = [], this.events = [], this._droppedAttributesCount = 0, this._droppedEventsCount = 0, this._droppedLinksCount = 0, this.status = {
                code: fe.SpanStatusCode.UNSET
            }, this.endTime = [
                0,
                0
            ], this._ended = !1, this._duration = [
                -1,
                -1
            ], this.name = n, this._spanContext = i, this.parentSpanId = o, this.kind = s, this.links = a;
            let E = Date.now();
            this._performanceStartTime = $.otperformance.now(), this._performanceOffset = E - (this._performanceStartTime + (0, $.getTimeOrigin)()), this._startTimeProvided = u != null, this.startTime = this._getTime(u ?? E), this.resource = e.resource, this.instrumentationLibrary = e.instrumentationLibrary, this._spanLimits = e.getSpanLimits(), _ != null && this.setAttributes(_), this._spanProcessor = e.getActiveSpanProcessor(), this._spanProcessor.onStart(this, t), this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
        }
        spanContext() {
            return this._spanContext;
        }
        setAttribute(e, t) {
            return t == null || this._isSpanEnded() ? this : e.length === 0 ? (fe.diag.warn(`Invalid attribute key: ${e}`), this) : (0, $.isAttributeValue)(t) ? Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, e) ? (this._droppedAttributesCount++, this) : (this.attributes[e] = this._truncateToSize(t), this) : (fe.diag.warn(`Invalid attribute value set for key: ${e}`), this);
        }
        setAttributes(e) {
            for (let [t, n] of Object.entries(e))this.setAttribute(t, n);
            return this;
        }
        addEvent(e, t, n) {
            if (this._isSpanEnded()) return this;
            if (this._spanLimits.eventCountLimit === 0) return fe.diag.warn("No events allowed."), this._droppedEventsCount++, this;
            this.events.length >= this._spanLimits.eventCountLimit && (fe.diag.warn("Dropping extra events."), this.events.shift(), this._droppedEventsCount++), (0, $.isTimeInput)(t) && ((0, $.isTimeInput)(n) || (n = t), t = void 0);
            let i = (0, $.sanitizeAttributes)(t);
            return this.events.push({
                name: e,
                attributes: i,
                time: this._getTime(n),
                droppedAttributesCount: 0
            }), this;
        }
        setStatus(e) {
            return this._isSpanEnded() ? this : (this.status = e, this);
        }
        updateName(e) {
            return this._isSpanEnded() ? this : (this.name = e, this);
        }
        end(e) {
            if (this._isSpanEnded()) {
                fe.diag.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
                return;
            }
            this._ended = !0, this.endTime = this._getTime(e), this._duration = (0, $.hrTimeDuration)(this.startTime, this.endTime), this._duration[0] < 0 && (fe.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime), this.endTime = this.startTime.slice(), this._duration = [
                0,
                0
            ]), this._spanProcessor.onEnd(this);
        }
        _getTime(e) {
            if (typeof e == "number" && e < $.otperformance.now()) return (0, $.hrTime)(e + this._performanceOffset);
            if (typeof e == "number") return (0, $.millisToHrTime)(e);
            if (e instanceof Date) return (0, $.millisToHrTime)(e.getTime());
            if ((0, $.isTimeInputHrTime)(e)) return e;
            if (this._startTimeProvided) return (0, $.millisToHrTime)(Date.now());
            let t = $.otperformance.now() - this._performanceStartTime;
            return (0, $.addHrTimes)(this.startTime, (0, $.millisToHrTime)(t));
        }
        isRecording() {
            return this._ended === !1;
        }
        recordException(e, t) {
            let n = {};
            typeof e == "string" ? n[Ke.SemanticAttributes.EXCEPTION_MESSAGE] = e : e && (e.code ? n[Ke.SemanticAttributes.EXCEPTION_TYPE] = e.code.toString() : e.name && (n[Ke.SemanticAttributes.EXCEPTION_TYPE] = e.name), e.message && (n[Ke.SemanticAttributes.EXCEPTION_MESSAGE] = e.message), e.stack && (n[Ke.SemanticAttributes.EXCEPTION_STACKTRACE] = e.stack)), n[Ke.SemanticAttributes.EXCEPTION_TYPE] || n[Ke.SemanticAttributes.EXCEPTION_MESSAGE] ? this.addEvent(ME.ExceptionEventName, n, t) : fe.diag.warn(`Failed to record an exception ${e}`);
        }
        get duration() {
            return this._duration;
        }
        get ended() {
            return this._ended;
        }
        get droppedAttributesCount() {
            return this._droppedAttributesCount;
        }
        get droppedEventsCount() {
            return this._droppedEventsCount;
        }
        get droppedLinksCount() {
            return this._droppedLinksCount;
        }
        _isSpanEnded() {
            return this._ended && fe.diag.warn(`Can not execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`), this._ended;
        }
        _truncateToLimitUtil(e, t) {
            return e.length <= t ? e : e.substr(0, t);
        }
        _truncateToSize(e) {
            let t = this._attributeValueLengthLimit;
            return t <= 0 ? (fe.diag.warn(`Attribute value limit must be positive, got ${t}`), e) : typeof e == "string" ? this._truncateToLimitUtil(e, t) : Array.isArray(e) ? e.map((n)=>typeof n == "string" ? this._truncateToLimitUtil(n, t) : n) : e;
        }
    };
    Tn.Span = uo;
});
var fr = c((pr)=>{
    "use strict";
    Object.defineProperty(pr, "__esModule", {
        value: !0
    });
    pr.SamplingDecision = void 0;
    var CE;
    (function(r) {
        r[r.NOT_RECORD = 0] = "NOT_RECORD", r[r.RECORD = 1] = "RECORD", r[r.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
    })(CE = pr.SamplingDecision || (pr.SamplingDecision = {}));
});
var An = c((Sn)=>{
    "use strict";
    Object.defineProperty(Sn, "__esModule", {
        value: !0
    });
    Sn.AlwaysOffSampler = void 0;
    var NE = fr(), lo = class {
        shouldSample() {
            return {
                decision: NE.SamplingDecision.NOT_RECORD
            };
        }
        toString() {
            return "AlwaysOffSampler";
        }
    };
    Sn.AlwaysOffSampler = lo;
});
var Rn = c((On)=>{
    "use strict";
    Object.defineProperty(On, "__esModule", {
        value: !0
    });
    On.AlwaysOnSampler = void 0;
    var wE = fr(), _o = class {
        shouldSample() {
            return {
                decision: wE.SamplingDecision.RECORD_AND_SAMPLED
            };
        }
        toString() {
            return "AlwaysOnSampler";
        }
    };
    On.AlwaysOnSampler = _o;
});
var fo = c((Pn)=>{
    "use strict";
    Object.defineProperty(Pn, "__esModule", {
        value: !0
    });
    Pn.ParentBasedSampler = void 0;
    var bn = (h(), f(d)), xE = S(), cl = An(), ho = Rn(), po = class {
        constructor(e){
            var t, n, i, s;
            this._root = e.root, this._root || ((0, xE.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured")), this._root = new ho.AlwaysOnSampler), this._remoteParentSampled = (t = e.remoteParentSampled) !== null && t !== void 0 ? t : new ho.AlwaysOnSampler, this._remoteParentNotSampled = (n = e.remoteParentNotSampled) !== null && n !== void 0 ? n : new cl.AlwaysOffSampler, this._localParentSampled = (i = e.localParentSampled) !== null && i !== void 0 ? i : new ho.AlwaysOnSampler, this._localParentNotSampled = (s = e.localParentNotSampled) !== null && s !== void 0 ? s : new cl.AlwaysOffSampler;
        }
        shouldSample(e, t, n, i, s, o) {
            let a = bn.trace.getSpanContext(e);
            return !a || !(0, bn.isSpanContextValid)(a) ? this._root.shouldSample(e, t, n, i, s, o) : a.isRemote ? a.traceFlags & bn.TraceFlags.SAMPLED ? this._remoteParentSampled.shouldSample(e, t, n, i, s, o) : this._remoteParentNotSampled.shouldSample(e, t, n, i, s, o) : a.traceFlags & bn.TraceFlags.SAMPLED ? this._localParentSampled.shouldSample(e, t, n, i, s, o) : this._localParentNotSampled.shouldSample(e, t, n, i, s, o);
        }
        toString() {
            return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
        }
    };
    Pn.ParentBasedSampler = po;
});
var mo = c((yn)=>{
    "use strict";
    Object.defineProperty(yn, "__esModule", {
        value: !0
    });
    yn.TraceIdRatioBasedSampler = void 0;
    var DE = (h(), f(d)), ll = fr(), Eo = class {
        constructor(e = 0){
            this._ratio = e, this._ratio = this._normalize(e), this._upperBound = Math.floor(this._ratio * 4294967295);
        }
        shouldSample(e, t) {
            return {
                decision: (0, DE.isValidTraceId)(t) && this._accumulate(t) < this._upperBound ? ll.SamplingDecision.RECORD_AND_SAMPLED : ll.SamplingDecision.NOT_RECORD
            };
        }
        toString() {
            return `TraceIdRatioBased{${this._ratio}}`;
        }
        _normalize(e) {
            return typeof e != "number" || isNaN(e) ? 0 : e >= 1 ? 1 : e <= 0 ? 0 : e;
        }
        _accumulate(e) {
            let t = 0;
            for(let n = 0; n < e.length / 8; n++){
                let i = n * 8, s = parseInt(e.slice(i, i + 8), 16);
                t = (t ^ s) >>> 0;
            }
            return t;
        }
    };
    yn.TraceIdRatioBasedSampler = Eo;
});
var So = c((Tt)=>{
    "use strict";
    Object.defineProperty(Tt, "__esModule", {
        value: !0
    });
    Tt.buildSamplerFromEnv = Tt.loadDefaultConfig = void 0;
    var vn = (h(), f(d)), j = S(), dl = An(), go = Rn(), To = fo(), _l = mo(), BE = (0, j.getEnv)(), UE = j.TracesSamplerValues.AlwaysOn, gt = 1;
    function qE() {
        return {
            sampler: pl(BE),
            forceFlushTimeoutMillis: 3e4,
            generalLimits: {
                attributeValueLengthLimit: (0, j.getEnv)().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
                attributeCountLimit: (0, j.getEnv)().OTEL_ATTRIBUTE_COUNT_LIMIT
            },
            spanLimits: {
                attributeValueLengthLimit: (0, j.getEnv)().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
                attributeCountLimit: (0, j.getEnv)().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
                linkCountLimit: (0, j.getEnv)().OTEL_SPAN_LINK_COUNT_LIMIT,
                eventCountLimit: (0, j.getEnv)().OTEL_SPAN_EVENT_COUNT_LIMIT,
                attributePerEventCountLimit: (0, j.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
                attributePerLinkCountLimit: (0, j.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
            }
        };
    }
    Tt.loadDefaultConfig = qE;
    function pl(r = (0, j.getEnv)()) {
        switch(r.OTEL_TRACES_SAMPLER){
            case j.TracesSamplerValues.AlwaysOn:
                return new go.AlwaysOnSampler;
            case j.TracesSamplerValues.AlwaysOff:
                return new dl.AlwaysOffSampler;
            case j.TracesSamplerValues.ParentBasedAlwaysOn:
                return new To.ParentBasedSampler({
                    root: new go.AlwaysOnSampler
                });
            case j.TracesSamplerValues.ParentBasedAlwaysOff:
                return new To.ParentBasedSampler({
                    root: new dl.AlwaysOffSampler
                });
            case j.TracesSamplerValues.TraceIdRatio:
                return new _l.TraceIdRatioBasedSampler(hl(r));
            case j.TracesSamplerValues.ParentBasedTraceIdRatio:
                return new To.ParentBasedSampler({
                    root: new _l.TraceIdRatioBasedSampler(hl(r))
                });
            default:
                return vn.diag.error(`OTEL_TRACES_SAMPLER value "${r.OTEL_TRACES_SAMPLER} invalid, defaulting to ${UE}".`), new go.AlwaysOnSampler;
        }
    }
    Tt.buildSamplerFromEnv = pl;
    function hl(r) {
        if (r.OTEL_TRACES_SAMPLER_ARG === void 0 || r.OTEL_TRACES_SAMPLER_ARG === "") return vn.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${gt}.`), gt;
        let e = Number(r.OTEL_TRACES_SAMPLER_ARG);
        return isNaN(e) ? (vn.diag.error(`OTEL_TRACES_SAMPLER_ARG=${r.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${gt}.`), gt) : e < 0 || e > 1 ? (vn.diag.error(`OTEL_TRACES_SAMPLER_ARG=${r.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${gt}.`), gt) : e;
    }
});
var Oo = c((St)=>{
    "use strict";
    Object.defineProperty(St, "__esModule", {
        value: !0
    });
    St.reconfigureLimits = St.mergeConfig = void 0;
    var fl = So(), Ao = S();
    function GE(r) {
        let e = {
            sampler: (0, fl.buildSamplerFromEnv)()
        }, t = (0, fl.loadDefaultConfig)(), n = Object.assign({}, t, e, r);
        return n.generalLimits = Object.assign({}, t.generalLimits, r.generalLimits || {}), n.spanLimits = Object.assign({}, t.spanLimits, r.spanLimits || {}), n;
    }
    St.mergeConfig = GE;
    function VE(r) {
        var e, t, n, i, s, o, a, u, l, _, E, O;
        let D = Object.assign({}, r.spanLimits), z = (0, Ao.getEnvWithoutDefaults)();
        return D.attributeCountLimit = (o = (s = (i = (t = (e = r.spanLimits) === null || e === void 0 ? void 0 : e.attributeCountLimit) !== null && t !== void 0 ? t : (n = r.generalLimits) === null || n === void 0 ? void 0 : n.attributeCountLimit) !== null && i !== void 0 ? i : z.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && s !== void 0 ? s : z.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && o !== void 0 ? o : Ao.DEFAULT_ATTRIBUTE_COUNT_LIMIT, D.attributeValueLengthLimit = (O = (E = (_ = (u = (a = r.spanLimits) === null || a === void 0 ? void 0 : a.attributeValueLengthLimit) !== null && u !== void 0 ? u : (l = r.generalLimits) === null || l === void 0 ? void 0 : l.attributeValueLengthLimit) !== null && _ !== void 0 ? _ : z.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && E !== void 0 ? E : z.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && O !== void 0 ? O : Ao.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT, Object.assign({}, r, {
            spanLimits: D
        });
    }
    St.reconfigureLimits = VE;
});
var El = c((In)=>{
    "use strict";
    Object.defineProperty(In, "__esModule", {
        value: !0
    });
    In.BatchSpanProcessorBase = void 0;
    var At = (h(), f(d)), ze = S(), Ro = class {
        constructor(e, t){
            this._exporter = e, this._isExporting = !1, this._finishedSpans = [], this._droppedSpansCount = 0;
            let n = (0, ze.getEnv)();
            this._maxExportBatchSize = typeof t?.maxExportBatchSize == "number" ? t.maxExportBatchSize : n.OTEL_BSP_MAX_EXPORT_BATCH_SIZE, this._maxQueueSize = typeof t?.maxQueueSize == "number" ? t.maxQueueSize : n.OTEL_BSP_MAX_QUEUE_SIZE, this._scheduledDelayMillis = typeof t?.scheduledDelayMillis == "number" ? t.scheduledDelayMillis : n.OTEL_BSP_SCHEDULE_DELAY, this._exportTimeoutMillis = typeof t?.exportTimeoutMillis == "number" ? t.exportTimeoutMillis : n.OTEL_BSP_EXPORT_TIMEOUT, this._shutdownOnce = new ze.BindOnceFuture(this._shutdown, this), this._maxExportBatchSize > this._maxQueueSize && (At.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"), this._maxExportBatchSize = this._maxQueueSize);
        }
        forceFlush() {
            return this._shutdownOnce.isCalled ? this._shutdownOnce.promise : this._flushAll();
        }
        onStart(e, t) {}
        onEnd(e) {
            this._shutdownOnce.isCalled || e.spanContext().traceFlags & At.TraceFlags.SAMPLED && this._addToBuffer(e);
        }
        shutdown() {
            return this._shutdownOnce.call();
        }
        _shutdown() {
            return Promise.resolve().then(()=>this.onShutdown()).then(()=>this._flushAll()).then(()=>this._exporter.shutdown());
        }
        _addToBuffer(e) {
            if (this._finishedSpans.length >= this._maxQueueSize) {
                this._droppedSpansCount === 0 && At.diag.debug("maxQueueSize reached, dropping spans"), this._droppedSpansCount++;
                return;
            }
            this._droppedSpansCount > 0 && (At.diag.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`), this._droppedSpansCount = 0), this._finishedSpans.push(e), this._maybeStartTimer();
        }
        _flushAll() {
            return new Promise((e, t)=>{
                let n = [], i = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
                for(let s = 0, o = i; s < o; s++)n.push(this._flushOneBatch());
                Promise.all(n).then(()=>{
                    e();
                }).catch(t);
            });
        }
        _flushOneBatch() {
            return this._clearTimer(), this._finishedSpans.length === 0 ? Promise.resolve() : new Promise((e, t)=>{
                let n = setTimeout(()=>{
                    t(new Error("Timeout"));
                }, this._exportTimeoutMillis);
                At.context.with((0, ze.suppressTracing)(At.context.active()), ()=>{
                    let i = this._finishedSpans.splice(0, this._maxExportBatchSize), s = ()=>this._exporter.export(i, (a)=>{
                            var u;
                            clearTimeout(n), a.code === ze.ExportResultCode.SUCCESS ? e() : t((u = a.error) !== null && u !== void 0 ? u : new Error("BatchSpanProcessor: span export failed"));
                        }), o = i.map((a)=>a.resource).filter((a)=>a.asyncAttributesPending);
                    o.length === 0 ? s() : Promise.all(o.map((a)=>{
                        var u;
                        return (u = a.waitForAsyncAttributes) === null || u === void 0 ? void 0 : u.call(a);
                    })).then(s, (a)=>{
                        (0, ze.globalErrorHandler)(a), t(a);
                    });
                });
            });
        }
        _maybeStartTimer() {
            if (this._isExporting) return;
            let e = ()=>{
                this._isExporting = !0, this._flushOneBatch().then(()=>{
                    this._isExporting = !1, this._finishedSpans.length > 0 && (this._clearTimer(), this._maybeStartTimer());
                }).catch((t)=>{
                    this._isExporting = !1, (0, ze.globalErrorHandler)(t);
                });
            };
            if (this._finishedSpans.length >= this._maxExportBatchSize) return e();
            this._timer === void 0 && (this._timer = setTimeout(()=>e(), this._scheduledDelayMillis), (0, ze.unrefTimer)(this._timer));
        }
        _clearTimer() {
            this._timer !== void 0 && (clearTimeout(this._timer), this._timer = void 0);
        }
    };
    In.BatchSpanProcessorBase = Ro;
});
var ml = c((Ln)=>{
    "use strict";
    Object.defineProperty(Ln, "__esModule", {
        value: !0
    });
    Ln.BatchSpanProcessor = void 0;
    var jE = El(), bo = class extends jE.BatchSpanProcessorBase {
        onShutdown() {}
    };
    Ln.BatchSpanProcessor = bo;
});
var Sl = c((Cn)=>{
    "use strict";
    Object.defineProperty(Cn, "__esModule", {
        value: !0
    });
    Cn.RandomIdGenerator = void 0;
    var FE = 8, Tl = 16, Po = class {
        constructor(){
            this.generateTraceId = gl(Tl), this.generateSpanId = gl(FE);
        }
    };
    Cn.RandomIdGenerator = Po;
    var Mn = Buffer.allocUnsafe(Tl);
    function gl(r) {
        return function() {
            for(let t = 0; t < r / 4; t++)Mn.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, t * 4);
            for(let t = 0; t < r && !(Mn[t] > 0); t++)t === r - 1 && (Mn[r - 1] = 1);
            return Mn.toString("hex", 0, r);
        };
    }
});
var Ol = c((Ce)=>{
    "use strict";
    var HE = Ce && Ce.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), Al = Ce && Ce.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && HE(e, r, t);
    };
    Object.defineProperty(Ce, "__esModule", {
        value: !0
    });
    Al(ml(), Ce);
    Al(Sl(), Ce);
});
var Nn = c((Ye)=>{
    "use strict";
    var kE = Ye && Ye.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), XE = Ye && Ye.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && kE(e, r, t);
    };
    Object.defineProperty(Ye, "__esModule", {
        value: !0
    });
    XE(Ol(), Ye);
});
var Rl = c((xn)=>{
    "use strict";
    Object.defineProperty(xn, "__esModule", {
        value: !0
    });
    xn.Tracer = void 0;
    var F = (h(), f(d)), wn = S(), $E = co(), WE = Oo(), KE = Nn(), yo = class {
        constructor(e, t, n){
            this._tracerProvider = n;
            let i = (0, WE.mergeConfig)(t);
            this._sampler = i.sampler, this._generalLimits = i.generalLimits, this._spanLimits = i.spanLimits, this._idGenerator = t.idGenerator || new KE.RandomIdGenerator, this.resource = n.resource, this.instrumentationLibrary = e;
        }
        startSpan(e, t = {}, n = F.context.active()) {
            var i, s, o;
            t.root && (n = F.trace.deleteSpan(n));
            let a = F.trace.getSpan(n);
            if ((0, wn.isTracingSuppressed)(n)) return F.diag.debug("Instrumentation suppressed, returning Noop Span"), F.trace.wrapSpanContext(F.INVALID_SPAN_CONTEXT);
            let u = a?.spanContext(), l = this._idGenerator.generateSpanId(), _, E, O;
            !u || !F.trace.isSpanContextValid(u) ? _ = this._idGenerator.generateTraceId() : (_ = u.traceId, E = u.traceState, O = u.spanId);
            let D = (i = t.kind) !== null && i !== void 0 ? i : F.SpanKind.INTERNAL, z = ((s = t.links) !== null && s !== void 0 ? s : []).map((dt)=>({
                    context: dt.context,
                    attributes: (0, wn.sanitizeAttributes)(dt.attributes)
                })), I = (0, wn.sanitizeAttributes)(t.attributes), U = this._sampler.shouldSample(n, _, e, D, I, z);
            E = (o = U.traceState) !== null && o !== void 0 ? o : E;
            let L = U.decision === F.SamplingDecision.RECORD_AND_SAMPLED ? F.TraceFlags.SAMPLED : F.TraceFlags.NONE, m = {
                traceId: _,
                spanId: l,
                traceFlags: L,
                traceState: E
            };
            if (U.decision === F.SamplingDecision.NOT_RECORD) return F.diag.debug("Recording is off, propagating context in a non-recording span"), F.trace.wrapSpanContext(m);
            let Pe = (0, wn.sanitizeAttributes)(Object.assign(I, U.attributes));
            return new $E.Span(this, n, e, m, D, O, z, t.startTime, void 0, Pe);
        }
        startActiveSpan(e, t, n, i) {
            let s, o, a;
            if (arguments.length < 2) return;
            arguments.length === 2 ? a = t : arguments.length === 3 ? (s = t, a = n) : (s = t, o = n, a = i);
            let u = o ?? F.context.active(), l = this.startSpan(e, s, u), _ = F.trace.setSpan(u, l);
            return F.context.with(_, a, void 0, l);
        }
        getGeneralLimits() {
            return this._generalLimits;
        }
        getSpanLimits() {
            return this._spanLimits;
        }
        getActiveSpanProcessor() {
            return this._tracerProvider.getActiveSpanProcessor();
        }
    };
    xn.Tracer = yo;
});
var bl = c((Dn)=>{
    "use strict";
    Object.defineProperty(Dn, "__esModule", {
        value: !0
    });
    Dn.defaultServiceName = void 0;
    function zE() {
        return `unknown_service:${process.argv0}`;
    }
    Dn.defaultServiceName = zE;
});
var vo = c((Ot)=>{
    "use strict";
    Object.defineProperty(Ot, "__esModule", {
        value: !0
    });
    Ot.normalizeType = Ot.normalizeArch = void 0;
    var YE = (r)=>{
        switch(r){
            case "arm":
                return "arm32";
            case "ppc":
                return "ppc32";
            case "x64":
                return "amd64";
            default:
                return r;
        }
    };
    Ot.normalizeArch = YE;
    var QE = (r)=>{
        switch(r){
            case "sunos":
                return "solaris";
            case "win32":
                return "windows";
            default:
                return r;
        }
    };
    Ot.normalizeType = QE;
});
var Un = c((Bn)=>{
    "use strict";
    Object.defineProperty(Bn, "__esModule", {
        value: !0
    });
    Bn.execAsync = void 0;
    var ZE = J("child_process"), JE = J("util");
    Bn.execAsync = JE.promisify(ZE.exec);
});
var Pl = c((qn)=>{
    "use strict";
    Object.defineProperty(qn, "__esModule", {
        value: !0
    });
    qn.getMachineId = void 0;
    var em = Un(), tm = (h(), f(d));
    async function rm() {
        try {
            let e = (await (0, em.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((n)=>n.includes("IOPlatformUUID"));
            if (!e) return "";
            let t = e.split('" = "');
            if (t.length === 2) return t[1].slice(0, -1);
        } catch (r) {
            tm.diag.debug(`error reading machine id: ${r}`);
        }
        return "";
    }
    qn.getMachineId = rm;
});
var yl = c((Gn)=>{
    "use strict";
    Object.defineProperty(Gn, "__esModule", {
        value: !0
    });
    Gn.getMachineId = void 0;
    var nm = J("fs"), im = (h(), f(d));
    async function sm() {
        let r = [
            "/etc/machine-id",
            "/var/lib/dbus/machine-id"
        ];
        for (let e of r)try {
            return (await nm.promises.readFile(e, {
                encoding: "utf8"
            })).trim();
        } catch (t) {
            im.diag.debug(`error reading machine id: ${t}`);
        }
        return "";
    }
    Gn.getMachineId = sm;
});
var Il = c((Vn)=>{
    "use strict";
    Object.defineProperty(Vn, "__esModule", {
        value: !0
    });
    Vn.getMachineId = void 0;
    var om = J("fs"), am = Un(), vl = (h(), f(d));
    async function um() {
        try {
            return (await om.promises.readFile("/etc/hostid", {
                encoding: "utf8"
            })).trim();
        } catch (r) {
            vl.diag.debug(`error reading machine id: ${r}`);
        }
        try {
            return (await (0, am.execAsync)("kenv -q smbios.system.uuid")).stdout.trim();
        } catch (r) {
            vl.diag.debug(`error reading machine id: ${r}`);
        }
        return "";
    }
    Vn.getMachineId = um;
});
var Ml = c((jn)=>{
    "use strict";
    Object.defineProperty(jn, "__esModule", {
        value: !0
    });
    jn.getMachineId = void 0;
    var Ll = J("process"), cm = Un(), lm = (h(), f(d));
    async function dm() {
        let r = "QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid", e = "%windir%\\System32\\REG.exe";
        Ll.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in Ll.env && (e = "%windir%\\sysnative\\cmd.exe /c " + e);
        try {
            let n = (await (0, cm.execAsync)(`${e} ${r}`)).stdout.split("REG_SZ");
            if (n.length === 2) return n[1].trim();
        } catch (t) {
            lm.diag.debug(`error reading machine id: ${t}`);
        }
        return "";
    }
    jn.getMachineId = dm;
});
var Cl = c((Fn)=>{
    "use strict";
    Object.defineProperty(Fn, "__esModule", {
        value: !0
    });
    Fn.getMachineId = void 0;
    var _m = (h(), f(d));
    async function hm() {
        return _m.diag.debug("could not read machine-id: unsupported platform"), "";
    }
    Fn.getMachineId = hm;
});
var Nl = c((Se)=>{
    "use strict";
    Object.defineProperty(Se, "__esModule", {
        value: !0
    });
    Se.getMachineId = void 0;
    var pm = J("process"), Rt;
    Se.getMachineId = Rt;
    switch(pm.platform){
        case "darwin":
            Se.getMachineId = Rt = Pl().getMachineId;
            break;
        case "linux":
            Se.getMachineId = Rt = yl().getMachineId;
            break;
        case "freebsd":
            Se.getMachineId = Rt = Il().getMachineId;
            break;
        case "win32":
            Se.getMachineId = Rt = Ml().getMachineId;
            break;
        default:
            Se.getMachineId = Rt = Cl().getMachineId;
    }
});
var Mo = c((Hn)=>{
    "use strict";
    Object.defineProperty(Hn, "__esModule", {
        value: !0
    });
    Hn.hostDetectorSync = void 0;
    var Io = ie(), fm = Qe(), wl = J("os"), Em = vo(), mm = Nl(), Lo = class {
        detect(e) {
            let t = {
                [Io.SemanticResourceAttributes.HOST_NAME]: (0, wl.hostname)(),
                [Io.SemanticResourceAttributes.HOST_ARCH]: (0, Em.normalizeArch)((0, wl.arch)())
            };
            return new fm.Resource(t, this._getAsyncAttributes());
        }
        _getAsyncAttributes() {
            return (0, mm.getMachineId)().then((e)=>{
                let t = {};
                return e && (t[Io.SemanticResourceAttributes.HOST_ID] = e), t;
            });
        }
    };
    Hn.hostDetectorSync = new Lo;
});
var xl = c((kn)=>{
    "use strict";
    Object.defineProperty(kn, "__esModule", {
        value: !0
    });
    kn.hostDetector = void 0;
    var gm = Mo(), Co = class {
        detect(e) {
            return Promise.resolve(gm.hostDetectorSync.detect(e));
        }
    };
    kn.hostDetector = new Co;
});
var wo = c((Xn)=>{
    "use strict";
    Object.defineProperty(Xn, "__esModule", {
        value: !0
    });
    Xn.osDetectorSync = void 0;
    var Dl = ie(), Tm = Qe(), Bl = J("os"), Sm = vo(), No = class {
        detect(e) {
            let t = {
                [Dl.SemanticResourceAttributes.OS_TYPE]: (0, Sm.normalizeType)((0, Bl.platform)()),
                [Dl.SemanticResourceAttributes.OS_VERSION]: (0, Bl.release)()
            };
            return new Tm.Resource(t);
        }
    };
    Xn.osDetectorSync = new No;
});
var Ul = c(($n)=>{
    "use strict";
    Object.defineProperty($n, "__esModule", {
        value: !0
    });
    $n.osDetector = void 0;
    var Am = wo(), xo = class {
        detect(e) {
            return Promise.resolve(Am.osDetectorSync.detect(e));
        }
    };
    $n.osDetector = new xo;
});
var Bo = c((Wn)=>{
    "use strict";
    Object.defineProperty(Wn, "__esModule", {
        value: !0
    });
    Wn.processDetectorSync = void 0;
    var Om = (h(), f(d)), Ae = ie(), Rm = Qe(), bm = J("os"), Do = class {
        detect(e) {
            let t = {
                [Ae.SemanticResourceAttributes.PROCESS_PID]: process.pid,
                [Ae.SemanticResourceAttributes.PROCESS_EXECUTABLE_NAME]: process.title,
                [Ae.SemanticResourceAttributes.PROCESS_EXECUTABLE_PATH]: process.execPath,
                [Ae.SemanticResourceAttributes.PROCESS_COMMAND_ARGS]: [
                    process.argv[0],
                    ...process.execArgv,
                    ...process.argv.slice(1)
                ],
                [Ae.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION]: process.versions.node,
                [Ae.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "nodejs",
                [Ae.SemanticResourceAttributes.PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
            };
            process.argv.length > 1 && (t[Ae.SemanticResourceAttributes.PROCESS_COMMAND] = process.argv[1]);
            try {
                let n = bm.userInfo();
                t[Ae.SemanticResourceAttributes.PROCESS_OWNER] = n.username;
            } catch (n) {
                Om.diag.debug(`error obtaining process owner: ${n}`);
            }
            return new Rm.Resource(t);
        }
    };
    Wn.processDetectorSync = new Do;
});
var ql = c((Kn)=>{
    "use strict";
    Object.defineProperty(Kn, "__esModule", {
        value: !0
    });
    Kn.processDetector = void 0;
    var Pm = Bo(), Uo = class {
        detect(e) {
            return Promise.resolve(Pm.processDetectorSync.detect(e));
        }
    };
    Kn.processDetector = new Uo;
});
var Gl = c((te)=>{
    "use strict";
    var ym = te && te.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), Ze = te && te.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && ym(e, r, t);
    };
    Object.defineProperty(te, "__esModule", {
        value: !0
    });
    Ze(bl(), te);
    Ze(xl(), te);
    Ze(Ul(), te);
    Ze(Mo(), te);
    Ze(wo(), te);
    Ze(ql(), te);
    Ze(Bo(), te);
});
var qo = c((Je)=>{
    "use strict";
    var vm = Je && Je.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), Im = Je && Je.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && vm(e, r, t);
    };
    Object.defineProperty(Je, "__esModule", {
        value: !0
    });
    Im(Gl(), Je);
});
var Qe = c((zn)=>{
    "use strict";
    Object.defineProperty(zn, "__esModule", {
        value: !0
    });
    zn.Resource = void 0;
    var Vl = (h(), f(d)), et = ie(), Go = S(), Lm = qo(), Er = class r {
        constructor(e, t){
            var n;
            this._attributes = e, this.asyncAttributesPending = t != null, this._syncAttributes = (n = this._attributes) !== null && n !== void 0 ? n : {}, this._asyncAttributesPromise = t?.then((i)=>(this._attributes = Object.assign({}, this._attributes, i), this.asyncAttributesPending = !1, i), (i)=>(Vl.diag.debug("a resource's async attributes promise rejected: %s", i), this.asyncAttributesPending = !1, {}));
        }
        static empty() {
            return r.EMPTY;
        }
        static default() {
            return new r({
                [et.SemanticResourceAttributes.SERVICE_NAME]: (0, Lm.defaultServiceName)(),
                [et.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: Go.SDK_INFO[et.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE],
                [et.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: Go.SDK_INFO[et.SemanticResourceAttributes.TELEMETRY_SDK_NAME],
                [et.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: Go.SDK_INFO[et.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]
            });
        }
        get attributes() {
            var e;
            return this.asyncAttributesPending && Vl.diag.error("Accessing resource attributes before async attributes settled"), (e = this._attributes) !== null && e !== void 0 ? e : {};
        }
        async waitForAsyncAttributes() {
            this.asyncAttributesPending && await this._asyncAttributesPromise;
        }
        merge(e) {
            var t;
            if (!e) return this;
            let n = Object.assign(Object.assign({}, this._syncAttributes), (t = e._syncAttributes) !== null && t !== void 0 ? t : e.attributes);
            if (!this._asyncAttributesPromise && !e._asyncAttributesPromise) return new r(n);
            let i = Promise.all([
                this._asyncAttributesPromise,
                e._asyncAttributesPromise
            ]).then(([s, o])=>{
                var a;
                return Object.assign(Object.assign(Object.assign(Object.assign({}, this._syncAttributes), s), (a = e._syncAttributes) !== null && a !== void 0 ? a : e.attributes), o);
            });
            return new r(n, i);
        }
    };
    zn.Resource = Er;
    Er.EMPTY = new Er({});
});
var Fl = c((jl)=>{
    "use strict";
    Object.defineProperty(jl, "__esModule", {
        value: !0
    });
});
var kl = c((Hl)=>{
    "use strict";
    Object.defineProperty(Hl, "__esModule", {
        value: !0
    });
});
var $l = c((Xl)=>{
    "use strict";
    Object.defineProperty(Xl, "__esModule", {
        value: !0
    });
});
var Wl = c((Yn)=>{
    "use strict";
    Object.defineProperty(Yn, "__esModule", {
        value: !0
    });
    Yn.browserDetector = void 0;
    var Mm = tt(), Vo = class {
        detect(e) {
            return Promise.resolve(Mm.browserDetectorSync.detect(e));
        }
    };
    Yn.browserDetector = new Vo;
});
var Fo = c((Qn)=>{
    "use strict";
    Object.defineProperty(Qn, "__esModule", {
        value: !0
    });
    Qn.envDetectorSync = void 0;
    var Cm = (h(), f(d)), Nm = S(), wm = ie(), xm = Qe(), jo = class {
        constructor(){
            this._MAX_LENGTH = 255, this._COMMA_SEPARATOR = ",", this._LABEL_KEY_VALUE_SPLITTER = "=", this._ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.", this._ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
        }
        detect(e) {
            let t = {}, n = (0, Nm.getEnv)(), i = n.OTEL_RESOURCE_ATTRIBUTES, s = n.OTEL_SERVICE_NAME;
            if (i) try {
                let o = this._parseResourceAttributes(i);
                Object.assign(t, o);
            } catch (o) {
                Cm.diag.debug(`EnvDetector failed: ${o.message}`);
            }
            return s && (t[wm.SemanticResourceAttributes.SERVICE_NAME] = s), new xm.Resource(t);
        }
        _parseResourceAttributes(e) {
            if (!e) return {};
            let t = {}, n = e.split(this._COMMA_SEPARATOR, -1);
            for (let i of n){
                let s = i.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
                if (s.length !== 2) continue;
                let [o, a] = s;
                if (o = o.trim(), a = a.trim().split(/^"|"$/).join(""), !this._isValidAndNotEmpty(o)) throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
                if (!this._isValid(a)) throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
                t[o] = decodeURIComponent(a);
            }
            return t;
        }
        _isValid(e) {
            return e.length <= this._MAX_LENGTH && this._isBaggageOctetString(e);
        }
        _isBaggageOctetString(e) {
            for(let t = 0; t < e.length; t++){
                let n = e.charCodeAt(t);
                if (n < 33 || n === 44 || n === 59 || n === 92 || n > 126) return !1;
            }
            return !0;
        }
        _isValidAndNotEmpty(e) {
            return e.length > 0 && this._isValid(e);
        }
    };
    Qn.envDetectorSync = new jo;
});
var Kl = c((Zn)=>{
    "use strict";
    Object.defineProperty(Zn, "__esModule", {
        value: !0
    });
    Zn.envDetector = void 0;
    var Dm = Fo(), Ho = class {
        detect(e) {
            return Promise.resolve(Dm.envDetectorSync.detect(e));
        }
    };
    Zn.envDetector = new Ho;
});
var zl = c((ei)=>{
    "use strict";
    Object.defineProperty(ei, "__esModule", {
        value: !0
    });
    ei.browserDetectorSync = void 0;
    var Jn = ie(), ko = tt(), Bm = (h(), f(d)), Xo = class {
        detect(e) {
            if (!(typeof navigator < "u")) return ko.Resource.empty();
            let n = {
                [Jn.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "browser",
                [Jn.SemanticResourceAttributes.PROCESS_RUNTIME_DESCRIPTION]: "Web Browser",
                [Jn.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION]: navigator.userAgent
            };
            return this._getResourceAttributes(n, e);
        }
        _getResourceAttributes(e, t) {
            return e[Jn.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION] === "" ? (Bm.diag.debug("BrowserDetector failed: Unable to find required browser resources. "), ko.Resource.empty()) : new ko.Resource(Object.assign({}, e));
        }
    };
    ei.browserDetectorSync = new Xo;
});
var Yl = c((Ee)=>{
    "use strict";
    var Um = Ee && Ee.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), ti = Ee && Ee.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Um(e, r, t);
    };
    Object.defineProperty(Ee, "__esModule", {
        value: !0
    });
    ti(Wl(), Ee);
    ti(Kl(), Ee);
    ti(zl(), Ee);
    ti(Fo(), Ee);
});
var Ql = c((ri)=>{
    "use strict";
    Object.defineProperty(ri, "__esModule", {
        value: !0
    });
    ri.isPromiseLike = void 0;
    var qm = (r)=>r !== null && typeof r == "object" && typeof r.then == "function";
    ri.isPromiseLike = qm;
});
var Jl = c((Pt)=>{
    "use strict";
    Object.defineProperty(Pt, "__esModule", {
        value: !0
    });
    Pt.detectResourcesSync = Pt.detectResources = void 0;
    var mr = Qe(), bt = (h(), f(d)), Gm = Ql(), Vm = async (r = {})=>{
        let e = await Promise.all((r.detectors || []).map(async (t)=>{
            try {
                let n = await t.detect(r);
                return bt.diag.debug(`${t.constructor.name} found resource.`, n), n;
            } catch (n) {
                return bt.diag.debug(`${t.constructor.name} failed: ${n.message}`), mr.Resource.empty();
            }
        }));
        return Zl(e), e.reduce((t, n)=>t.merge(n), mr.Resource.empty());
    };
    Pt.detectResources = Vm;
    var jm = (r = {})=>{
        var e;
        let t = ((e = r.detectors) !== null && e !== void 0 ? e : []).map((i)=>{
            try {
                let s = i.detect(r), o;
                if ((0, Gm.isPromiseLike)(s)) {
                    let a = async ()=>(await s).attributes;
                    o = new mr.Resource({}, a());
                } else o = s;
                return o.waitForAsyncAttributes ? o.waitForAsyncAttributes().then(()=>bt.diag.debug(`${i.constructor.name} found resource.`, o)) : bt.diag.debug(`${i.constructor.name} found resource.`, o), o;
            } catch (s) {
                return bt.diag.error(`${i.constructor.name} failed: ${s.message}`), mr.Resource.empty();
            }
        }), n = t.reduce((i, s)=>i.merge(s), mr.Resource.empty());
        return n.waitForAsyncAttributes && n.waitForAsyncAttributes().then(()=>{
            Zl(t);
        }), n;
    };
    Pt.detectResourcesSync = jm;
    var Zl = (r)=>{
        r.forEach((e)=>{
            if (Object.keys(e.attributes).length > 0) {
                let t = JSON.stringify(e.attributes, null, 4);
                bt.diag.verbose(t);
            }
        });
    };
});
var tt = c((re)=>{
    "use strict";
    var Fm = re && re.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), rt = re && re.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Fm(e, r, t);
    };
    Object.defineProperty(re, "__esModule", {
        value: !0
    });
    rt(Qe(), re);
    rt(Fl(), re);
    rt(qo(), re);
    rt(kl(), re);
    rt($l(), re);
    rt(Yl(), re);
    rt(Jl(), re);
});
var ed = c((ni)=>{
    "use strict";
    Object.defineProperty(ni, "__esModule", {
        value: !0
    });
    ni.MultiSpanProcessor = void 0;
    var Hm = S(), $o = class {
        constructor(e){
            this._spanProcessors = e;
        }
        forceFlush() {
            let e = [];
            for (let t of this._spanProcessors)e.push(t.forceFlush());
            return new Promise((t)=>{
                Promise.all(e).then(()=>{
                    t();
                }).catch((n)=>{
                    (0, Hm.globalErrorHandler)(n || new Error("MultiSpanProcessor: forceFlush failed")), t();
                });
            });
        }
        onStart(e, t) {
            for (let n of this._spanProcessors)n.onStart(e, t);
        }
        onEnd(e) {
            for (let t of this._spanProcessors)t.onEnd(e);
        }
        shutdown() {
            let e = [];
            for (let t of this._spanProcessors)e.push(t.shutdown());
            return new Promise((t, n)=>{
                Promise.all(e).then(()=>{
                    t();
                }, n);
            });
        }
    };
    ni.MultiSpanProcessor = $o;
});
var Ko = c((ii)=>{
    "use strict";
    Object.defineProperty(ii, "__esModule", {
        value: !0
    });
    ii.NoopSpanProcessor = void 0;
    var Wo = class {
        onStart(e, t) {}
        onEnd(e) {}
        shutdown() {
            return Promise.resolve();
        }
        forceFlush() {
            return Promise.resolve();
        }
    };
    ii.NoopSpanProcessor = Wo;
});
var rd = c((nt)=>{
    "use strict";
    Object.defineProperty(nt, "__esModule", {
        value: !0
    });
    nt.BasicTracerProvider = nt.ForceFlushState = void 0;
    var yt = (h(), f(d)), It = S(), td = tt(), km = zo(), Xm = So(), $m = ed(), Wm = Ko(), Km = Nn(), zm = Oo(), vt;
    (function(r) {
        r[r.resolved = 0] = "resolved", r[r.timeout = 1] = "timeout", r[r.error = 2] = "error", r[r.unresolved = 3] = "unresolved";
    })(vt = nt.ForceFlushState || (nt.ForceFlushState = {}));
    var gr = class {
        constructor(e = {}){
            var t;
            this._registeredSpanProcessors = [], this._tracers = new Map;
            let n = (0, It.merge)({}, (0, Xm.loadDefaultConfig)(), (0, zm.reconfigureLimits)(e));
            this.resource = (t = n.resource) !== null && t !== void 0 ? t : td.Resource.empty(), this.resource = td.Resource.default().merge(this.resource), this._config = Object.assign({}, n, {
                resource: this.resource
            });
            let i = this._buildExporterFromEnv();
            if (i !== void 0) {
                let s = new Km.BatchSpanProcessor(i);
                this.activeSpanProcessor = s;
            } else this.activeSpanProcessor = new Wm.NoopSpanProcessor;
        }
        getTracer(e, t, n) {
            let i = `${e}@${t || ""}:${n?.schemaUrl || ""}`;
            return this._tracers.has(i) || this._tracers.set(i, new km.Tracer({
                name: e,
                version: t,
                schemaUrl: n?.schemaUrl
            }, this._config, this)), this._tracers.get(i);
        }
        addSpanProcessor(e) {
            this._registeredSpanProcessors.length === 0 && this.activeSpanProcessor.shutdown().catch((t)=>yt.diag.error("Error while trying to shutdown current span processor", t)), this._registeredSpanProcessors.push(e), this.activeSpanProcessor = new $m.MultiSpanProcessor(this._registeredSpanProcessors);
        }
        getActiveSpanProcessor() {
            return this.activeSpanProcessor;
        }
        register(e = {}) {
            yt.trace.setGlobalTracerProvider(this), e.propagator === void 0 && (e.propagator = this._buildPropagatorFromEnv()), e.contextManager && yt.context.setGlobalContextManager(e.contextManager), e.propagator && yt.propagation.setGlobalPropagator(e.propagator);
        }
        forceFlush() {
            let e = this._config.forceFlushTimeoutMillis, t = this._registeredSpanProcessors.map((n)=>new Promise((i)=>{
                    let s, o = setTimeout(()=>{
                        i(new Error(`Span processor did not completed within timeout period of ${e} ms`)), s = vt.timeout;
                    }, e);
                    n.forceFlush().then(()=>{
                        clearTimeout(o), s !== vt.timeout && (s = vt.resolved, i(s));
                    }).catch((a)=>{
                        clearTimeout(o), s = vt.error, i(a);
                    });
                }));
            return new Promise((n, i)=>{
                Promise.all(t).then((s)=>{
                    let o = s.filter((a)=>a !== vt.resolved);
                    o.length > 0 ? i(o) : n();
                }).catch((s)=>i([
                        s
                    ]));
            });
        }
        shutdown() {
            return this.activeSpanProcessor.shutdown();
        }
        _getPropagator(e) {
            var t;
            return (t = this.constructor._registeredPropagators.get(e)) === null || t === void 0 ? void 0 : t();
        }
        _getSpanExporter(e) {
            var t;
            return (t = this.constructor._registeredExporters.get(e)) === null || t === void 0 ? void 0 : t();
        }
        _buildPropagatorFromEnv() {
            let e = Array.from(new Set((0, It.getEnv)().OTEL_PROPAGATORS)), n = e.map((i)=>{
                let s = this._getPropagator(i);
                return s || yt.diag.warn(`Propagator "${i}" requested through environment variable is unavailable.`), s;
            }).reduce((i, s)=>(s && i.push(s), i), []);
            if (n.length !== 0) return e.length === 1 ? n[0] : new It.CompositePropagator({
                propagators: n
            });
        }
        _buildExporterFromEnv() {
            let e = (0, It.getEnv)().OTEL_TRACES_EXPORTER;
            if (e === "none" || e === "") return;
            let t = this._getSpanExporter(e);
            return t || yt.diag.error(`Exporter "${e}" requested through environment variable is unavailable.`), t;
        }
    };
    nt.BasicTracerProvider = gr;
    gr._registeredPropagators = new Map([
        [
            "tracecontext",
            ()=>new It.W3CTraceContextPropagator
        ],
        [
            "baggage",
            ()=>new It.W3CBaggagePropagator
        ]
    ]);
    gr._registeredExporters = new Map;
});
var nd = c((si)=>{
    "use strict";
    Object.defineProperty(si, "__esModule", {
        value: !0
    });
    si.ConsoleSpanExporter = void 0;
    var Yo = S(), Qo = class {
        export(e, t) {
            return this._sendSpans(e, t);
        }
        shutdown() {
            return this._sendSpans([]), this.forceFlush();
        }
        forceFlush() {
            return Promise.resolve();
        }
        _exportInfo(e) {
            var t;
            return {
                traceId: e.spanContext().traceId,
                parentId: e.parentSpanId,
                traceState: (t = e.spanContext().traceState) === null || t === void 0 ? void 0 : t.serialize(),
                name: e.name,
                id: e.spanContext().spanId,
                kind: e.kind,
                timestamp: (0, Yo.hrTimeToMicroseconds)(e.startTime),
                duration: (0, Yo.hrTimeToMicroseconds)(e.duration),
                attributes: e.attributes,
                status: e.status,
                events: e.events,
                links: e.links
            };
        }
        _sendSpans(e, t) {
            for (let n of e)console.dir(this._exportInfo(n), {
                depth: 3
            });
            if (t) return t({
                code: Yo.ExportResultCode.SUCCESS
            });
        }
    };
    si.ConsoleSpanExporter = Qo;
});
var sd = c((oi)=>{
    "use strict";
    Object.defineProperty(oi, "__esModule", {
        value: !0
    });
    oi.InMemorySpanExporter = void 0;
    var id = S(), Zo = class {
        constructor(){
            this._finishedSpans = [], this._stopped = !1;
        }
        export(e, t) {
            if (this._stopped) return t({
                code: id.ExportResultCode.FAILED,
                error: new Error("Exporter has been stopped")
            });
            this._finishedSpans.push(...e), setTimeout(()=>t({
                    code: id.ExportResultCode.SUCCESS
                }), 0);
        }
        shutdown() {
            return this._stopped = !0, this._finishedSpans = [], this.forceFlush();
        }
        forceFlush() {
            return Promise.resolve();
        }
        reset() {
            this._finishedSpans = [];
        }
        getFinishedSpans() {
            return this._finishedSpans;
        }
    };
    oi.InMemorySpanExporter = Zo;
});
var ad = c((od)=>{
    "use strict";
    Object.defineProperty(od, "__esModule", {
        value: !0
    });
});
var ud = c((ai)=>{
    "use strict";
    Object.defineProperty(ai, "__esModule", {
        value: !0
    });
    ai.SimpleSpanProcessor = void 0;
    var Ym = (h(), f(d)), Lt = S(), Jo = class {
        constructor(e){
            this._exporter = e, this._shutdownOnce = new Lt.BindOnceFuture(this._shutdown, this), this._unresolvedExports = new Set;
        }
        async forceFlush() {
            await Promise.all(Array.from(this._unresolvedExports)), this._exporter.forceFlush && await this._exporter.forceFlush();
        }
        onStart(e, t) {}
        onEnd(e) {
            var t, n;
            if (this._shutdownOnce.isCalled || !(e.spanContext().traceFlags & Ym.TraceFlags.SAMPLED)) return;
            let i = ()=>Lt.internal._export(this._exporter, [
                    e
                ]).then((s)=>{
                    var o;
                    s.code !== Lt.ExportResultCode.SUCCESS && (0, Lt.globalErrorHandler)((o = s.error) !== null && o !== void 0 ? o : new Error(`SimpleSpanProcessor: span export failed (status ${s})`));
                }).catch((s)=>{
                    (0, Lt.globalErrorHandler)(s);
                });
            if (e.resource.asyncAttributesPending) {
                let s = (n = (t = e.resource).waitForAsyncAttributes) === null || n === void 0 ? void 0 : n.call(t).then(()=>(s != null && this._unresolvedExports.delete(s), i()), (o)=>(0, Lt.globalErrorHandler)(o));
                s != null && this._unresolvedExports.add(s);
            } else i();
        }
        shutdown() {
            return this._shutdownOnce.call();
        }
        _shutdown() {
            return this._exporter.shutdown();
        }
    };
    ai.SimpleSpanProcessor = Jo;
});
var ld = c((cd)=>{
    "use strict";
    Object.defineProperty(cd, "__esModule", {
        value: !0
    });
});
var _d = c((dd)=>{
    "use strict";
    Object.defineProperty(dd, "__esModule", {
        value: !0
    });
});
var pd = c((hd)=>{
    "use strict";
    Object.defineProperty(hd, "__esModule", {
        value: !0
    });
});
var Ed = c((fd)=>{
    "use strict";
    Object.defineProperty(fd, "__esModule", {
        value: !0
    });
});
var gd = c((md)=>{
    "use strict";
    Object.defineProperty(md, "__esModule", {
        value: !0
    });
});
var zo = c((v)=>{
    "use strict";
    var Qm = v && v.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), B = v && v.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Qm(e, r, t);
    };
    Object.defineProperty(v, "__esModule", {
        value: !0
    });
    B(Rl(), v);
    B(rd(), v);
    B(Nn(), v);
    B(nd(), v);
    B(sd(), v);
    B(ad(), v);
    B(ud(), v);
    B(ld(), v);
    B(Ko(), v);
    B(An(), v);
    B(Rn(), v);
    B(fo(), v);
    B(mo(), v);
    B(fr(), v);
    B(co(), v);
    B(_d(), v);
    B(pd(), v);
    B(Ed(), v);
    B(gd(), v);
});
var it = {};
;
var ea = Ku(()=>{
    ht(it, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$facade$3e$__);
});
var Sd = c((Ne)=>{
    "use strict";
    Object.defineProperty(Ne, "__esModule", {
        value: !0
    });
    Ne.disableInstrumentations = Ne.enableInstrumentations = Ne.parseInstrumentationOptions = void 0;
    function Td(r = []) {
        let e = [];
        for(let t = 0, n = r.length; t < n; t++){
            let i = r[t];
            if (Array.isArray(i)) {
                let s = Td(i);
                e = e.concat(s.instrumentations);
            } else typeof i == "function" ? e.push(new i) : i.instrumentationName && e.push(i);
        }
        return {
            instrumentations: e
        };
    }
    Ne.parseInstrumentationOptions = Td;
    function Zm(r, e, t) {
        for(let n = 0, i = r.length; n < i; n++){
            let s = r[n];
            e && s.setTracerProvider(e), t && s.setMeterProvider(t), s.getConfig().enabled || s.enable();
        }
    }
    Ne.enableInstrumentations = Zm;
    function Jm(r) {
        r.forEach((e)=>e.disable());
    }
    Ne.disableInstrumentations = Jm;
});
var Od = c((ui)=>{
    "use strict";
    Object.defineProperty(ui, "__esModule", {
        value: !0
    });
    ui.registerInstrumentations = void 0;
    var Ad = (h(), f(d)), ta = Sd();
    function eg(r) {
        let { instrumentations: e } = (0, ta.parseInstrumentationOptions)(r.instrumentations), t = r.tracerProvider || Ad.trace.getTracerProvider(), n = r.meterProvider || Ad.metrics.getMeterProvider();
        return (0, ta.enableInstrumentations)(e, t, n), ()=>{
            (0, ta.disableInstrumentations)(e);
        };
    }
    ui.registerInstrumentations = eg;
});
var na = c((li)=>{
    "use strict";
    Object.defineProperty(li, "__esModule", {
        value: !0
    });
    li.LogRecord = void 0;
    var tg = (h(), f(d)), Tr = (h(), f(d)), ci = S(), ra = class {
        constructor(e, t, n){
            this.attributes = {}, this.totalAttributesCount = 0, this._isReadonly = !1;
            let { timestamp: i, observedTimestamp: s, severityNumber: o, severityText: a, body: u, attributes: l = {}, context: _ } = n, E = Date.now();
            if (this.hrTime = (0, ci.timeInputToHrTime)(i ?? E), this.hrTimeObserved = (0, ci.timeInputToHrTime)(s ?? E), _) {
                let O = Tr.trace.getSpanContext(_);
                O && Tr.isSpanContextValid(O) && (this.spanContext = O);
            }
            this.severityNumber = o, this.severityText = a, this.body = u, this.resource = e.resource, this.instrumentationScope = t, this._logRecordLimits = e.logRecordLimits, this.setAttributes(l);
        }
        set severityText(e) {
            this._isLogRecordReadonly() || (this._severityText = e);
        }
        get severityText() {
            return this._severityText;
        }
        set severityNumber(e) {
            this._isLogRecordReadonly() || (this._severityNumber = e);
        }
        get severityNumber() {
            return this._severityNumber;
        }
        set body(e) {
            this._isLogRecordReadonly() || (this._body = e);
        }
        get body() {
            return this._body;
        }
        get droppedAttributesCount() {
            return this.totalAttributesCount - Object.keys(this.attributes).length;
        }
        setAttribute(e, t) {
            return this._isLogRecordReadonly() ? this : t === null ? this : e.length === 0 ? (Tr.diag.warn(`Invalid attribute key: ${e}`), this) : !(0, ci.isAttributeValue)(t) && !(typeof t == "object" && !Array.isArray(t) && Object.keys(t).length > 0) ? (Tr.diag.warn(`Invalid attribute value set for key: ${e}`), this) : (this.totalAttributesCount += 1, Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, e) ? this : ((0, ci.isAttributeValue)(t) ? this.attributes[e] = this._truncateToSize(t) : this.attributes[e] = t, this));
        }
        setAttributes(e) {
            for (let [t, n] of Object.entries(e))this.setAttribute(t, n);
            return this;
        }
        setBody(e) {
            return this.body = e, this;
        }
        setSeverityNumber(e) {
            return this.severityNumber = e, this;
        }
        setSeverityText(e) {
            return this.severityText = e, this;
        }
        _makeReadonly() {
            this._isReadonly = !0;
        }
        _truncateToSize(e) {
            let t = this._logRecordLimits.attributeValueLengthLimit;
            return t <= 0 ? (Tr.diag.warn(`Attribute value limit must be positive, got ${t}`), e) : typeof e == "string" ? this._truncateToLimitUtil(e, t) : Array.isArray(e) ? e.map((n)=>typeof n == "string" ? this._truncateToLimitUtil(n, t) : n) : e;
        }
        _truncateToLimitUtil(e, t) {
            return e.length <= t ? e : e.substring(0, t);
        }
        _isLogRecordReadonly() {
            return this._isReadonly && tg.diag.warn("Can not execute the operation on emitted log record"), this._isReadonly;
        }
    };
    li.LogRecord = ra;
});
var Rd = c((di)=>{
    "use strict";
    Object.defineProperty(di, "__esModule", {
        value: !0
    });
    di.Logger = void 0;
    var rg = (h(), f(d)), ng = na(), ia = class {
        constructor(e, t){
            this.instrumentationScope = e, this._sharedState = t;
        }
        emit(e) {
            let t = e.context || rg.context.active(), n = new ng.LogRecord(this._sharedState, this.instrumentationScope, Object.assign({
                context: t
            }, e));
            this._sharedState.activeProcessor.onEmit(n, t), n._makeReadonly();
        }
    };
    di.Logger = ia;
});
var bd = c((Mt)=>{
    "use strict";
    Object.defineProperty(Mt, "__esModule", {
        value: !0
    });
    Mt.reconfigureLimits = Mt.loadDefaultConfig = void 0;
    var Sr = S();
    function ig() {
        return {
            forceFlushTimeoutMillis: 3e4,
            logRecordLimits: {
                attributeValueLengthLimit: (0, Sr.getEnv)().OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT,
                attributeCountLimit: (0, Sr.getEnv)().OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT
            },
            includeTraceContext: !0
        };
    }
    Mt.loadDefaultConfig = ig;
    function sg(r) {
        var e, t, n, i, s, o;
        let a = (0, Sr.getEnvWithoutDefaults)();
        return {
            attributeCountLimit: (n = (t = (e = r.attributeCountLimit) !== null && e !== void 0 ? e : a.OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT) !== null && t !== void 0 ? t : a.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && n !== void 0 ? n : Sr.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
            attributeValueLengthLimit: (o = (s = (i = r.attributeValueLengthLimit) !== null && i !== void 0 ? i : a.OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && s !== void 0 ? s : a.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && o !== void 0 ? o : Sr.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT
        };
    }
    Mt.reconfigureLimits = sg;
});
var Pd = c((_i)=>{
    "use strict";
    Object.defineProperty(_i, "__esModule", {
        value: !0
    });
    _i.MultiLogRecordProcessor = void 0;
    var og = S(), sa = class {
        constructor(e, t){
            this.processors = e, this.forceFlushTimeoutMillis = t;
        }
        async forceFlush() {
            let e = this.forceFlushTimeoutMillis;
            await Promise.all(this.processors.map((t)=>(0, og.callWithTimeout)(t.forceFlush(), e)));
        }
        onEmit(e, t) {
            this.processors.forEach((n)=>n.onEmit(e, t));
        }
        async shutdown() {
            await Promise.all(this.processors.map((e)=>e.shutdown()));
        }
    };
    _i.MultiLogRecordProcessor = sa;
});
var aa = c((hi)=>{
    "use strict";
    Object.defineProperty(hi, "__esModule", {
        value: !0
    });
    hi.NoopLogRecordProcessor = void 0;
    var oa = class {
        forceFlush() {
            return Promise.resolve();
        }
        onEmit(e, t) {}
        shutdown() {
            return Promise.resolve();
        }
    };
    hi.NoopLogRecordProcessor = oa;
});
var yd = c((pi)=>{
    "use strict";
    Object.defineProperty(pi, "__esModule", {
        value: !0
    });
    pi.LoggerProviderSharedState = void 0;
    var ag = aa(), ua = class {
        constructor(e, t, n){
            this.resource = e, this.forceFlushTimeoutMillis = t, this.logRecordLimits = n, this.loggers = new Map, this.registeredLogRecordProcessors = [], this.activeProcessor = new ag.NoopLogRecordProcessor;
        }
    };
    pi.LoggerProviderSharedState = ua;
});
var Ld = c((st)=>{
    "use strict";
    Object.defineProperty(st, "__esModule", {
        value: !0
    });
    st.LoggerProvider = st.DEFAULT_LOGGER_NAME = void 0;
    var Ar = (h(), f(d)), ug = (ea(), f(it)), cg = tt(), vd = S(), lg = Rd(), Id = bd(), dg = Pd(), _g = yd();
    st.DEFAULT_LOGGER_NAME = "unknown";
    var ca = class {
        constructor(e = {}){
            let { resource: t = cg.Resource.default(), logRecordLimits: n, forceFlushTimeoutMillis: i } = (0, vd.merge)({}, (0, Id.loadDefaultConfig)(), e);
            this._sharedState = new _g.LoggerProviderSharedState(t, i, (0, Id.reconfigureLimits)(n)), this._shutdownOnce = new vd.BindOnceFuture(this._shutdown, this);
        }
        getLogger(e, t, n) {
            if (this._shutdownOnce.isCalled) return Ar.diag.warn("A shutdown LoggerProvider cannot provide a Logger"), ug.NOOP_LOGGER;
            e || Ar.diag.warn("Logger requested without instrumentation scope name.");
            let i = e || st.DEFAULT_LOGGER_NAME, s = `${i}@${t || ""}:${n?.schemaUrl || ""}`;
            return this._sharedState.loggers.has(s) || this._sharedState.loggers.set(s, new lg.Logger({
                name: i,
                version: t,
                schemaUrl: n?.schemaUrl
            }, this._sharedState)), this._sharedState.loggers.get(s);
        }
        addLogRecordProcessor(e) {
            this._sharedState.registeredLogRecordProcessors.length === 0 && this._sharedState.activeProcessor.shutdown().catch((t)=>Ar.diag.error("Error while trying to shutdown current log record processor", t)), this._sharedState.registeredLogRecordProcessors.push(e), this._sharedState.activeProcessor = new dg.MultiLogRecordProcessor(this._sharedState.registeredLogRecordProcessors, this._sharedState.forceFlushTimeoutMillis);
        }
        forceFlush() {
            return this._shutdownOnce.isCalled ? (Ar.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"), this._shutdownOnce.promise) : this._sharedState.activeProcessor.forceFlush();
        }
        shutdown() {
            return this._shutdownOnce.isCalled ? (Ar.diag.warn("shutdown may only be called once per LoggerProvider"), this._shutdownOnce.promise) : this._shutdownOnce.call();
        }
        _shutdown() {
            return this._sharedState.activeProcessor.shutdown();
        }
    };
    st.LoggerProvider = ca;
});
var Md = c((fi)=>{
    "use strict";
    Object.defineProperty(fi, "__esModule", {
        value: !0
    });
    fi.ConsoleLogRecordExporter = void 0;
    var hg = S(), pg = S(), la = class {
        export(e, t) {
            this._sendLogRecords(e, t);
        }
        shutdown() {
            return Promise.resolve();
        }
        _exportInfo(e) {
            var t, n, i;
            return {
                timestamp: (0, hg.hrTimeToMicroseconds)(e.hrTime),
                traceId: (t = e.spanContext) === null || t === void 0 ? void 0 : t.traceId,
                spanId: (n = e.spanContext) === null || n === void 0 ? void 0 : n.spanId,
                traceFlags: (i = e.spanContext) === null || i === void 0 ? void 0 : i.traceFlags,
                severityText: e.severityText,
                severityNumber: e.severityNumber,
                body: e.body,
                attributes: e.attributes
            };
        }
        _sendLogRecords(e, t) {
            for (let n of e)console.dir(this._exportInfo(n), {
                depth: 3
            });
            t?.({
                code: pg.ExportResultCode.SUCCESS
            });
        }
    };
    fi.ConsoleLogRecordExporter = la;
});
var Cd = c((Ei)=>{
    "use strict";
    Object.defineProperty(Ei, "__esModule", {
        value: !0
    });
    Ei.SimpleLogRecordProcessor = void 0;
    var da = S(), _a = class {
        constructor(e){
            this._exporter = e, this._shutdownOnce = new da.BindOnceFuture(this._shutdown, this);
        }
        onEmit(e) {
            this._shutdownOnce.isCalled || this._exporter.export([
                e
            ], (t)=>{
                var n;
                if (t.code !== da.ExportResultCode.SUCCESS) {
                    (0, da.globalErrorHandler)((n = t.error) !== null && n !== void 0 ? n : new Error(`SimpleLogRecordProcessor: log record export failed (status ${t})`));
                    return;
                }
            });
        }
        forceFlush() {
            return Promise.resolve();
        }
        shutdown() {
            return this._shutdownOnce.call();
        }
        _shutdown() {
            return this._exporter.shutdown();
        }
    };
    Ei.SimpleLogRecordProcessor = _a;
});
var wd = c((mi)=>{
    "use strict";
    Object.defineProperty(mi, "__esModule", {
        value: !0
    });
    mi.InMemoryLogRecordExporter = void 0;
    var Nd = S(), ha = class {
        constructor(){
            this._finishedLogRecords = [], this._stopped = !1;
        }
        export(e, t) {
            if (this._stopped) return t({
                code: Nd.ExportResultCode.FAILED,
                error: new Error("Exporter has been stopped")
            });
            this._finishedLogRecords.push(...e), t({
                code: Nd.ExportResultCode.SUCCESS
            });
        }
        shutdown() {
            return this._stopped = !0, this.reset(), Promise.resolve();
        }
        getFinishedLogRecords() {
            return this._finishedLogRecords;
        }
        reset() {
            this._finishedLogRecords = [];
        }
    };
    mi.InMemoryLogRecordExporter = ha;
});
var xd = c((gi)=>{
    "use strict";
    Object.defineProperty(gi, "__esModule", {
        value: !0
    });
    gi.BatchLogRecordProcessorBase = void 0;
    var fg = (h(), f(d)), Ct = S(), pa = class {
        constructor(e, t){
            var n, i, s, o;
            this._exporter = e, this._finishedLogRecords = [];
            let a = (0, Ct.getEnv)();
            this._maxExportBatchSize = (n = t?.maxExportBatchSize) !== null && n !== void 0 ? n : a.OTEL_BLRP_MAX_EXPORT_BATCH_SIZE, this._maxQueueSize = (i = t?.maxQueueSize) !== null && i !== void 0 ? i : a.OTEL_BLRP_MAX_QUEUE_SIZE, this._scheduledDelayMillis = (s = t?.scheduledDelayMillis) !== null && s !== void 0 ? s : a.OTEL_BLRP_SCHEDULE_DELAY, this._exportTimeoutMillis = (o = t?.exportTimeoutMillis) !== null && o !== void 0 ? o : a.OTEL_BLRP_EXPORT_TIMEOUT, this._shutdownOnce = new Ct.BindOnceFuture(this._shutdown, this), this._maxExportBatchSize > this._maxQueueSize && (fg.diag.warn("BatchLogRecordProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"), this._maxExportBatchSize = this._maxQueueSize);
        }
        onEmit(e) {
            this._shutdownOnce.isCalled || this._addToBuffer(e);
        }
        forceFlush() {
            return this._shutdownOnce.isCalled ? this._shutdownOnce.promise : this._flushAll();
        }
        shutdown() {
            return this._shutdownOnce.call();
        }
        async _shutdown() {
            this.onShutdown(), await this._flushAll(), await this._exporter.shutdown();
        }
        _addToBuffer(e) {
            this._finishedLogRecords.length >= this._maxQueueSize || (this._finishedLogRecords.push(e), this._maybeStartTimer());
        }
        _flushAll() {
            return new Promise((e, t)=>{
                let n = [], i = Math.ceil(this._finishedLogRecords.length / this._maxExportBatchSize);
                for(let s = 0; s < i; s++)n.push(this._flushOneBatch());
                Promise.all(n).then(()=>{
                    e();
                }).catch(t);
            });
        }
        _flushOneBatch() {
            return this._clearTimer(), this._finishedLogRecords.length === 0 ? Promise.resolve() : new Promise((e, t)=>{
                (0, Ct.callWithTimeout)(this._export(this._finishedLogRecords.splice(0, this._maxExportBatchSize)), this._exportTimeoutMillis).then(()=>e()).catch(t);
            });
        }
        _maybeStartTimer() {
            this._timer === void 0 && (this._timer = setTimeout(()=>{
                this._flushOneBatch().then(()=>{
                    this._finishedLogRecords.length > 0 && (this._clearTimer(), this._maybeStartTimer());
                }).catch((e)=>{
                    (0, Ct.globalErrorHandler)(e);
                });
            }, this._scheduledDelayMillis), (0, Ct.unrefTimer)(this._timer));
        }
        _clearTimer() {
            this._timer !== void 0 && (clearTimeout(this._timer), this._timer = void 0);
        }
        _export(e) {
            return new Promise((t, n)=>{
                this._exporter.export(e, (i)=>{
                    var s;
                    if (i.code !== Ct.ExportResultCode.SUCCESS) {
                        n((s = i.error) !== null && s !== void 0 ? s : new Error(`BatchLogRecordProcessorBase: log record export failed (status ${i})`));
                        return;
                    }
                    t(i);
                });
            });
        }
    };
    gi.BatchLogRecordProcessorBase = pa;
});
var Dd = c((Ti)=>{
    "use strict";
    Object.defineProperty(Ti, "__esModule", {
        value: !0
    });
    Ti.BatchLogRecordProcessor = void 0;
    var Eg = xd(), fa = class extends Eg.BatchLogRecordProcessorBase {
        onShutdown() {}
    };
    Ti.BatchLogRecordProcessor = fa;
});
var Bd = c((Si)=>{
    "use strict";
    Object.defineProperty(Si, "__esModule", {
        value: !0
    });
    Si.BatchLogRecordProcessor = void 0;
    var mg = Dd();
    Object.defineProperty(Si, "BatchLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return mg.BatchLogRecordProcessor;
        }
    });
});
var Ud = c((Ai)=>{
    "use strict";
    Object.defineProperty(Ai, "__esModule", {
        value: !0
    });
    Ai.BatchLogRecordProcessor = void 0;
    var gg = Bd();
    Object.defineProperty(Ai, "BatchLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return gg.BatchLogRecordProcessor;
        }
    });
});
var qd = c((W)=>{
    "use strict";
    Object.defineProperty(W, "__esModule", {
        value: !0
    });
    W.BatchLogRecordProcessor = W.InMemoryLogRecordExporter = W.SimpleLogRecordProcessor = W.ConsoleLogRecordExporter = W.NoopLogRecordProcessor = W.LogRecord = W.LoggerProvider = void 0;
    var Tg = Ld();
    Object.defineProperty(W, "LoggerProvider", {
        enumerable: !0,
        get: function() {
            return Tg.LoggerProvider;
        }
    });
    var Sg = na();
    Object.defineProperty(W, "LogRecord", {
        enumerable: !0,
        get: function() {
            return Sg.LogRecord;
        }
    });
    var Ag = aa();
    Object.defineProperty(W, "NoopLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return Ag.NoopLogRecordProcessor;
        }
    });
    var Og = Md();
    Object.defineProperty(W, "ConsoleLogRecordExporter", {
        enumerable: !0,
        get: function() {
            return Og.ConsoleLogRecordExporter;
        }
    });
    var Rg = Cd();
    Object.defineProperty(W, "SimpleLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return Rg.SimpleLogRecordProcessor;
        }
    });
    var bg = wd();
    Object.defineProperty(W, "InMemoryLogRecordExporter", {
        enumerable: !0,
        get: function() {
            return bg.InMemoryLogRecordExporter;
        }
    });
    var Pg = Ud();
    Object.defineProperty(W, "BatchLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return Pg.BatchLogRecordProcessor;
        }
    });
});
var Oi = c((Or)=>{
    "use strict";
    Object.defineProperty(Or, "__esModule", {
        value: !0
    });
    Or.AggregationTemporality = void 0;
    var yg;
    (function(r) {
        r[r.DELTA = 0] = "DELTA", r[r.CUMULATIVE = 1] = "CUMULATIVE";
    })(yg = Or.AggregationTemporality || (Or.AggregationTemporality = {}));
});
var Nt = c((Rr)=>{
    "use strict";
    Object.defineProperty(Rr, "__esModule", {
        value: !0
    });
    Rr.DataPointType = void 0;
    var vg;
    (function(r) {
        r[r.HISTOGRAM = 0] = "HISTOGRAM", r[r.EXPONENTIAL_HISTOGRAM = 1] = "EXPONENTIAL_HISTOGRAM", r[r.GAUGE = 2] = "GAUGE", r[r.SUM = 3] = "SUM";
    })(vg = Rr.DataPointType || (Rr.DataPointType = {}));
});
var me = c((M)=>{
    "use strict";
    Object.defineProperty(M, "__esModule", {
        value: !0
    });
    M.equalsCaseInsensitive = M.binarySearchLB = M.setEquals = M.FlatMap = M.isPromiseAllSettledRejectionResult = M.PromiseAllSettled = M.callWithTimeout = M.TimeoutError = M.instrumentationScopeId = M.hashAttributes = M.isNotNullish = void 0;
    function Ig(r) {
        return r != null;
    }
    M.isNotNullish = Ig;
    function Lg(r) {
        let e = Object.keys(r);
        return e.length === 0 ? "" : (e = e.sort(), JSON.stringify(e.map((t)=>[
                t,
                r[t]
            ])));
    }
    M.hashAttributes = Lg;
    function Mg(r) {
        var e, t;
        return `${r.name}:${(e = r.version) !== null && e !== void 0 ? e : ""}:${(t = r.schemaUrl) !== null && t !== void 0 ? t : ""}`;
    }
    M.instrumentationScopeId = Mg;
    var Ri = class r extends Error {
        constructor(e){
            super(e), Object.setPrototypeOf(this, r.prototype);
        }
    };
    M.TimeoutError = Ri;
    function Cg(r, e) {
        let t, n = new Promise(function(s, o) {
            t = setTimeout(function() {
                o(new Ri("Operation timed out."));
            }, e);
        });
        return Promise.race([
            r,
            n
        ]).then((i)=>(clearTimeout(t), i), (i)=>{
            throw clearTimeout(t), i;
        });
    }
    M.callWithTimeout = Cg;
    async function Ng(r) {
        return Promise.all(r.map(async (e)=>{
            try {
                return {
                    status: "fulfilled",
                    value: await e
                };
            } catch (t) {
                return {
                    status: "rejected",
                    reason: t
                };
            }
        }));
    }
    M.PromiseAllSettled = Ng;
    function wg(r) {
        return r.status === "rejected";
    }
    M.isPromiseAllSettledRejectionResult = wg;
    function xg(r, e) {
        let t = [];
        return r.forEach((n)=>{
            t.push(...e(n));
        }), t;
    }
    M.FlatMap = xg;
    function Dg(r, e) {
        if (r.size !== e.size) return !1;
        for (let t of r)if (!e.has(t)) return !1;
        return !0;
    }
    M.setEquals = Dg;
    function Bg(r, e) {
        let t = 0, n = r.length - 1;
        for(; n - t > 1;){
            let i = Math.trunc((n + t) / 2);
            r[i] <= e ? t = i : n = i - 1;
        }
        return r[n] <= e ? n : r[t] <= e ? t : -1;
    }
    M.binarySearchLB = Bg;
    function Ug(r, e) {
        return r.toLowerCase() === e.toLowerCase();
    }
    M.equalsCaseInsensitive = Ug;
});
var wt = c((br)=>{
    "use strict";
    Object.defineProperty(br, "__esModule", {
        value: !0
    });
    br.AggregatorKind = void 0;
    var qg;
    (function(r) {
        r[r.DROP = 0] = "DROP", r[r.SUM = 1] = "SUM", r[r.LAST_VALUE = 2] = "LAST_VALUE", r[r.HISTOGRAM = 3] = "HISTOGRAM", r[r.EXPONENTIAL_HISTOGRAM = 4] = "EXPONENTIAL_HISTOGRAM";
    })(qg = br.AggregatorKind || (br.AggregatorKind = {}));
});
var Gd = c((bi)=>{
    "use strict";
    Object.defineProperty(bi, "__esModule", {
        value: !0
    });
    bi.DropAggregator = void 0;
    var Gg = wt(), Ea = class {
        constructor(){
            this.kind = Gg.AggregatorKind.DROP;
        }
        createAccumulation() {}
        merge(e, t) {}
        diff(e, t) {}
        toMetricData(e, t, n, i) {}
    };
    bi.DropAggregator = Ea;
});
var Oe = c((ne)=>{
    "use strict";
    Object.defineProperty(ne, "__esModule", {
        value: !0
    });
    ne.isValidName = ne.isDescriptorCompatibleWith = ne.createInstrumentDescriptorWithView = ne.createInstrumentDescriptor = ne.InstrumentType = void 0;
    var Vd = (h(), f(d)), Vg = me(), jg;
    (function(r) {
        r.COUNTER = "COUNTER", r.HISTOGRAM = "HISTOGRAM", r.UP_DOWN_COUNTER = "UP_DOWN_COUNTER", r.OBSERVABLE_COUNTER = "OBSERVABLE_COUNTER", r.OBSERVABLE_GAUGE = "OBSERVABLE_GAUGE", r.OBSERVABLE_UP_DOWN_COUNTER = "OBSERVABLE_UP_DOWN_COUNTER";
    })(jg = ne.InstrumentType || (ne.InstrumentType = {}));
    function Fg(r, e, t) {
        var n, i, s, o;
        return jd(r) || Vd.diag.warn(`Invalid metric name: "${r}". The metric name should be a ASCII string with a length no greater than 255 characters.`), {
            name: r,
            type: e,
            description: (n = t?.description) !== null && n !== void 0 ? n : "",
            unit: (i = t?.unit) !== null && i !== void 0 ? i : "",
            valueType: (s = t?.valueType) !== null && s !== void 0 ? s : Vd.ValueType.DOUBLE,
            advice: (o = t?.advice) !== null && o !== void 0 ? o : {}
        };
    }
    ne.createInstrumentDescriptor = Fg;
    function Hg(r, e) {
        var t, n;
        return {
            name: (t = r.name) !== null && t !== void 0 ? t : e.name,
            description: (n = r.description) !== null && n !== void 0 ? n : e.description,
            type: e.type,
            unit: e.unit,
            valueType: e.valueType,
            advice: e.advice
        };
    }
    ne.createInstrumentDescriptorWithView = Hg;
    function kg(r, e) {
        return (0, Vg.equalsCaseInsensitive)(r.name, e.name) && r.unit === e.unit && r.type === e.type && r.valueType === e.valueType;
    }
    ne.isDescriptorCompatibleWith = kg;
    var Xg = /^[a-z][a-z0-9_.\-/]{0,254}$/i;
    function jd(r) {
        return r.match(Xg) != null;
    }
    ne.isValidName = jd;
});
var Fd = c((Dt)=>{
    "use strict";
    Object.defineProperty(Dt, "__esModule", {
        value: !0
    });
    Dt.HistogramAggregator = Dt.HistogramAccumulation = void 0;
    var $g = wt(), Wg = Nt(), ma = Oe(), Kg = me();
    function zg(r) {
        let e = r.map(()=>0);
        return e.push(0), {
            buckets: {
                boundaries: r,
                counts: e
            },
            sum: 0,
            count: 0,
            hasMinMax: !1,
            min: 1 / 0,
            max: -1 / 0
        };
    }
    var xt = class {
        constructor(e, t, n = !0, i = zg(t)){
            this.startTime = e, this._boundaries = t, this._recordMinMax = n, this._current = i;
        }
        record(e) {
            this._current.count += 1, this._current.sum += e, this._recordMinMax && (this._current.min = Math.min(e, this._current.min), this._current.max = Math.max(e, this._current.max), this._current.hasMinMax = !0);
            let t = (0, Kg.binarySearchLB)(this._boundaries, e);
            this._current.buckets.counts[t + 1] += 1;
        }
        setStartTime(e) {
            this.startTime = e;
        }
        toPointValue() {
            return this._current;
        }
    };
    Dt.HistogramAccumulation = xt;
    var ga = class {
        constructor(e, t){
            this._boundaries = e, this._recordMinMax = t, this.kind = $g.AggregatorKind.HISTOGRAM;
        }
        createAccumulation(e) {
            return new xt(e, this._boundaries, this._recordMinMax);
        }
        merge(e, t) {
            let n = e.toPointValue(), i = t.toPointValue(), s = n.buckets.counts, o = i.buckets.counts, a = new Array(s.length);
            for(let _ = 0; _ < s.length; _++)a[_] = s[_] + o[_];
            let u = 1 / 0, l = -1 / 0;
            return this._recordMinMax && (n.hasMinMax && i.hasMinMax ? (u = Math.min(n.min, i.min), l = Math.max(n.max, i.max)) : n.hasMinMax ? (u = n.min, l = n.max) : i.hasMinMax && (u = i.min, l = i.max)), new xt(e.startTime, n.buckets.boundaries, this._recordMinMax, {
                buckets: {
                    boundaries: n.buckets.boundaries,
                    counts: a
                },
                count: n.count + i.count,
                sum: n.sum + i.sum,
                hasMinMax: this._recordMinMax && (n.hasMinMax || i.hasMinMax),
                min: u,
                max: l
            });
        }
        diff(e, t) {
            let n = e.toPointValue(), i = t.toPointValue(), s = n.buckets.counts, o = i.buckets.counts, a = new Array(s.length);
            for(let u = 0; u < s.length; u++)a[u] = o[u] - s[u];
            return new xt(t.startTime, n.buckets.boundaries, this._recordMinMax, {
                buckets: {
                    boundaries: n.buckets.boundaries,
                    counts: a
                },
                count: i.count - n.count,
                sum: i.sum - n.sum,
                hasMinMax: !1,
                min: 1 / 0,
                max: -1 / 0
            });
        }
        toMetricData(e, t, n, i) {
            return {
                descriptor: e,
                aggregationTemporality: t,
                dataPointType: Wg.DataPointType.HISTOGRAM,
                dataPoints: n.map(([s, o])=>{
                    let a = o.toPointValue(), u = e.type === ma.InstrumentType.UP_DOWN_COUNTER || e.type === ma.InstrumentType.OBSERVABLE_GAUGE || e.type === ma.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
                    return {
                        attributes: s,
                        startTime: o.startTime,
                        endTime: i,
                        value: {
                            min: a.hasMinMax ? a.min : void 0,
                            max: a.hasMinMax ? a.max : void 0,
                            sum: u ? void 0 : a.sum,
                            buckets: a.buckets,
                            count: a.count
                        }
                    };
                })
            };
        }
    };
    Dt.HistogramAggregator = ga;
});
var Hd = c((Pi)=>{
    "use strict";
    Object.defineProperty(Pi, "__esModule", {
        value: !0
    });
    Pi.Buckets = void 0;
    var Ta = class r {
        constructor(e = new Sa, t = 0, n = 0, i = 0){
            this.backing = e, this.indexBase = t, this.indexStart = n, this.indexEnd = i;
        }
        get offset() {
            return this.indexStart;
        }
        get length() {
            return this.backing.length === 0 || this.indexEnd === this.indexStart && this.at(0) === 0 ? 0 : this.indexEnd - this.indexStart + 1;
        }
        counts() {
            return Array.from({
                length: this.length
            }, (e, t)=>this.at(t));
        }
        at(e) {
            let t = this.indexBase - this.indexStart;
            return e < t && (e += this.backing.length), e -= t, this.backing.countAt(e);
        }
        incrementBucket(e, t) {
            this.backing.increment(e, t);
        }
        decrementBucket(e, t) {
            this.backing.decrement(e, t);
        }
        trim() {
            for(let e = 0; e < this.length; e++)if (this.at(e) !== 0) {
                this.indexStart += e;
                break;
            } else if (e === this.length - 1) {
                this.indexStart = this.indexEnd = this.indexBase = 0;
                return;
            }
            for(let e = this.length - 1; e >= 0; e--)if (this.at(e) !== 0) {
                this.indexEnd -= this.length - e - 1;
                break;
            }
            this._rotate();
        }
        downscale(e) {
            this._rotate();
            let t = 1 + this.indexEnd - this.indexStart, n = 1 << e, i = 0, s = 0;
            for(let o = this.indexStart; o <= this.indexEnd;){
                let a = o % n;
                a < 0 && (a += n);
                for(let u = a; u < n && i < t; u++)this._relocateBucket(s, i), i++, o++;
                s++;
            }
            this.indexStart >>= e, this.indexEnd >>= e, this.indexBase = this.indexStart;
        }
        clone() {
            return new r(this.backing.clone(), this.indexBase, this.indexStart, this.indexEnd);
        }
        _rotate() {
            let e = this.indexBase - this.indexStart;
            e !== 0 && (e > 0 ? (this.backing.reverse(0, this.backing.length), this.backing.reverse(0, e), this.backing.reverse(e, this.backing.length)) : (this.backing.reverse(0, this.backing.length), this.backing.reverse(0, this.backing.length + e)), this.indexBase = this.indexStart);
        }
        _relocateBucket(e, t) {
            e !== t && this.incrementBucket(e, this.backing.emptyBucket(t));
        }
    };
    Pi.Buckets = Ta;
    var Sa = class r {
        constructor(e = [
            0
        ]){
            this._counts = e;
        }
        get length() {
            return this._counts.length;
        }
        countAt(e) {
            return this._counts[e];
        }
        growTo(e, t, n) {
            let i = new Array(e).fill(0);
            i.splice(n, this._counts.length - t, ...this._counts.slice(t)), i.splice(0, t, ...this._counts.slice(0, t)), this._counts = i;
        }
        reverse(e, t) {
            let n = Math.floor((e + t) / 2) - e;
            for(let i = 0; i < n; i++){
                let s = this._counts[e + i];
                this._counts[e + i] = this._counts[t - i - 1], this._counts[t - i - 1] = s;
            }
        }
        emptyBucket(e) {
            let t = this._counts[e];
            return this._counts[e] = 0, t;
        }
        increment(e, t) {
            this._counts[e] += t;
        }
        decrement(e, t) {
            this._counts[e] >= t ? this._counts[e] -= t : this._counts[e] = 0;
        }
        clone() {
            return new r([
                ...this._counts
            ]);
        }
    };
});
var Oa = c((Y)=>{
    "use strict";
    Object.defineProperty(Y, "__esModule", {
        value: !0
    });
    Y.getSignificand = Y.getNormalBase2 = Y.MIN_VALUE = Y.MAX_NORMAL_EXPONENT = Y.MIN_NORMAL_EXPONENT = Y.SIGNIFICAND_WIDTH = void 0;
    Y.SIGNIFICAND_WIDTH = 52;
    var Yg = 2146435072, Qg = 1048575, Aa = 1023;
    Y.MIN_NORMAL_EXPONENT = -Aa + 1;
    Y.MAX_NORMAL_EXPONENT = Aa;
    Y.MIN_VALUE = Math.pow(2, -1022);
    function Zg(r) {
        let e = new DataView(new ArrayBuffer(8));
        return e.setFloat64(0, r), ((e.getUint32(0) & Yg) >> 20) - Aa;
    }
    Y.getNormalBase2 = Zg;
    function Jg(r) {
        let e = new DataView(new ArrayBuffer(8));
        e.setFloat64(0, r);
        let t = e.getUint32(0), n = e.getUint32(4);
        return (t & Qg) * Math.pow(2, 32) + n;
    }
    Y.getSignificand = Jg;
});
var yi = c((Bt)=>{
    "use strict";
    Object.defineProperty(Bt, "__esModule", {
        value: !0
    });
    Bt.nextGreaterSquare = Bt.ldexp = void 0;
    function eT(r, e) {
        return r === 0 || r === Number.POSITIVE_INFINITY || r === Number.NEGATIVE_INFINITY || Number.isNaN(r) ? r : r * Math.pow(2, e);
    }
    Bt.ldexp = eT;
    function tT(r) {
        return r--, r |= r >> 1, r |= r >> 2, r |= r >> 4, r |= r >> 8, r |= r >> 16, r++, r;
    }
    Bt.nextGreaterSquare = tT;
});
var Ii = c((vi)=>{
    "use strict";
    Object.defineProperty(vi, "__esModule", {
        value: !0
    });
    vi.MappingError = void 0;
    var Ra = class extends Error {
    };
    vi.MappingError = Ra;
});
var Xd = c((Li)=>{
    "use strict";
    Object.defineProperty(Li, "__esModule", {
        value: !0
    });
    Li.ExponentMapping = void 0;
    var Ut = Oa(), rT = yi(), kd = Ii(), ba = class {
        constructor(e){
            this._shift = -e;
        }
        mapToIndex(e) {
            if (e < Ut.MIN_VALUE) return this._minNormalLowerBoundaryIndex();
            let t = Ut.getNormalBase2(e), n = this._rightShift(Ut.getSignificand(e) - 1, Ut.SIGNIFICAND_WIDTH);
            return t + n >> this._shift;
        }
        lowerBoundary(e) {
            let t = this._minNormalLowerBoundaryIndex();
            if (e < t) throw new kd.MappingError(`underflow: ${e} is < minimum lower boundary: ${t}`);
            let n = this._maxNormalLowerBoundaryIndex();
            if (e > n) throw new kd.MappingError(`overflow: ${e} is > maximum lower boundary: ${n}`);
            return rT.ldexp(1, e << this._shift);
        }
        get scale() {
            return this._shift === 0 ? 0 : -this._shift;
        }
        _minNormalLowerBoundaryIndex() {
            let e = Ut.MIN_NORMAL_EXPONENT >> this._shift;
            return this._shift < 2 && e--, e;
        }
        _maxNormalLowerBoundaryIndex() {
            return Ut.MAX_NORMAL_EXPONENT >> this._shift;
        }
        _rightShift(e, t) {
            return Math.floor(e * Math.pow(2, -t));
        }
    };
    Li.ExponentMapping = ba;
});
var Kd = c((Mi)=>{
    "use strict";
    Object.defineProperty(Mi, "__esModule", {
        value: !0
    });
    Mi.LogarithmMapping = void 0;
    var qt = Oa(), $d = yi(), Wd = Ii(), Pa = class {
        constructor(e){
            this._scale = e, this._scaleFactor = $d.ldexp(Math.LOG2E, e), this._inverseFactor = $d.ldexp(Math.LN2, -e);
        }
        mapToIndex(e) {
            if (e <= qt.MIN_VALUE) return this._minNormalLowerBoundaryIndex() - 1;
            if (qt.getSignificand(e) === 0) return (qt.getNormalBase2(e) << this._scale) - 1;
            let t = Math.floor(Math.log(e) * this._scaleFactor), n = this._maxNormalLowerBoundaryIndex();
            return t >= n ? n : t;
        }
        lowerBoundary(e) {
            let t = this._maxNormalLowerBoundaryIndex();
            if (e >= t) {
                if (e === t) return 2 * Math.exp((e - (1 << this._scale)) / this._scaleFactor);
                throw new Wd.MappingError(`overflow: ${e} is > maximum lower boundary: ${t}`);
            }
            let n = this._minNormalLowerBoundaryIndex();
            if (e <= n) {
                if (e === n) return qt.MIN_VALUE;
                if (e === n - 1) return Math.exp((e + (1 << this._scale)) / this._scaleFactor) / 2;
                throw new Wd.MappingError(`overflow: ${e} is < minimum lower boundary: ${n}`);
            }
            return Math.exp(e * this._inverseFactor);
        }
        get scale() {
            return this._scale;
        }
        _minNormalLowerBoundaryIndex() {
            return qt.MIN_NORMAL_EXPONENT << this._scale;
        }
        _maxNormalLowerBoundaryIndex() {
            return (qt.MAX_NORMAL_EXPONENT + 1 << this._scale) - 1;
        }
    };
    Mi.LogarithmMapping = Pa;
});
var Qd = c((Ci)=>{
    "use strict";
    Object.defineProperty(Ci, "__esModule", {
        value: !0
    });
    Ci.getMapping = void 0;
    var nT = Xd(), iT = Kd(), sT = Ii(), zd = -10, Yd = 20, oT = Array.from({
        length: 31
    }, (r, e)=>e > 10 ? new iT.LogarithmMapping(e - 10) : new nT.ExponentMapping(e - 10));
    function aT(r) {
        if (r > Yd || r < zd) throw new sT.MappingError(`expected scale >= ${zd} && <= ${Yd}, got: ${r}`);
        return oT[r + 10];
    }
    Ci.getMapping = aT;
});
var e_ = c((Vt)=>{
    "use strict";
    Object.defineProperty(Vt, "__esModule", {
        value: !0
    });
    Vt.ExponentialHistogramAggregator = Vt.ExponentialHistogramAccumulation = void 0;
    var uT = wt(), cT = Nt(), lT = (h(), f(d)), ya = Oe(), Zd = Hd(), Jd = Qd(), dT = yi(), Gt = class r {
        constructor(e, t){
            this.low = e, this.high = t;
        }
        static combine(e, t) {
            return new r(Math.min(e.low, t.low), Math.max(e.high, t.high));
        }
    }, _T = 20, hT = 160, va = 2, Ni = class r {
        constructor(e = e, t = hT, n = !0, i = 0, s = 0, o = 0, a = Number.POSITIVE_INFINITY, u = Number.NEGATIVE_INFINITY, l = new Zd.Buckets, _ = new Zd.Buckets, E = (0, Jd.getMapping)(_T)){
            this.startTime = e, this._maxSize = t, this._recordMinMax = n, this._sum = i, this._count = s, this._zeroCount = o, this._min = a, this._max = u, this._positive = l, this._negative = _, this._mapping = E, this._maxSize < va && (lT.diag.warn(`Exponential Histogram Max Size set to ${this._maxSize},                 changing to the minimum size of: ${va}`), this._maxSize = va);
        }
        record(e) {
            this.updateByIncrement(e, 1);
        }
        setStartTime(e) {
            this.startTime = e;
        }
        toPointValue() {
            return {
                hasMinMax: this._recordMinMax,
                min: this.min,
                max: this.max,
                sum: this.sum,
                positive: {
                    offset: this.positive.offset,
                    bucketCounts: this.positive.counts()
                },
                negative: {
                    offset: this.negative.offset,
                    bucketCounts: this.negative.counts()
                },
                count: this.count,
                scale: this.scale,
                zeroCount: this.zeroCount
            };
        }
        get sum() {
            return this._sum;
        }
        get min() {
            return this._min;
        }
        get max() {
            return this._max;
        }
        get count() {
            return this._count;
        }
        get zeroCount() {
            return this._zeroCount;
        }
        get scale() {
            return this._count === this._zeroCount ? 0 : this._mapping.scale;
        }
        get positive() {
            return this._positive;
        }
        get negative() {
            return this._negative;
        }
        updateByIncrement(e, t) {
            if (e > this._max && (this._max = e), e < this._min && (this._min = e), this._count += t, e === 0) {
                this._zeroCount += t;
                return;
            }
            this._sum += e * t, e > 0 ? this._updateBuckets(this._positive, e, t) : this._updateBuckets(this._negative, -e, t);
        }
        merge(e) {
            this._count === 0 ? (this._min = e.min, this._max = e.max) : e.count !== 0 && (e.min < this.min && (this._min = e.min), e.max > this.max && (this._max = e.max)), this.startTime = e.startTime, this._sum += e.sum, this._count += e.count, this._zeroCount += e.zeroCount;
            let t = this._minScale(e);
            this._downscale(this.scale - t), this._mergeBuckets(this.positive, e, e.positive, t), this._mergeBuckets(this.negative, e, e.negative, t);
        }
        diff(e) {
            this._min = 1 / 0, this._max = -1 / 0, this._sum -= e.sum, this._count -= e.count, this._zeroCount -= e.zeroCount;
            let t = this._minScale(e);
            this._downscale(this.scale - t), this._diffBuckets(this.positive, e, e.positive, t), this._diffBuckets(this.negative, e, e.negative, t);
        }
        clone() {
            return new r(this.startTime, this._maxSize, this._recordMinMax, this._sum, this._count, this._zeroCount, this._min, this._max, this.positive.clone(), this.negative.clone(), this._mapping);
        }
        _updateBuckets(e, t, n) {
            let i = this._mapping.mapToIndex(t), s = !1, o = 0, a = 0;
            if (e.length === 0 ? (e.indexStart = i, e.indexEnd = e.indexStart, e.indexBase = e.indexStart) : i < e.indexStart && e.indexEnd - i >= this._maxSize ? (s = !0, a = i, o = e.indexEnd) : i > e.indexEnd && i - e.indexStart >= this._maxSize && (s = !0, a = e.indexStart, o = i), s) {
                let u = this._changeScale(o, a);
                this._downscale(u), i = this._mapping.mapToIndex(t);
            }
            this._incrementIndexBy(e, i, n);
        }
        _incrementIndexBy(e, t, n) {
            if (n === 0) return;
            if (t < e.indexStart) {
                let s = e.indexEnd - t;
                s >= e.backing.length && this._grow(e, s + 1), e.indexStart = t;
            } else if (t > e.indexEnd) {
                let s = t - e.indexStart;
                s >= e.backing.length && this._grow(e, s + 1), e.indexEnd = t;
            }
            let i = t - e.indexBase;
            i < 0 && (i += e.backing.length), e.incrementBucket(i, n);
        }
        _grow(e, t) {
            let n = e.backing.length, i = e.indexBase - e.indexStart, s = n - i, o = (0, dT.nextGreaterSquare)(t);
            o > this._maxSize && (o = this._maxSize);
            let a = o - i;
            e.backing.growTo(o, s, a);
        }
        _changeScale(e, t) {
            let n = 0;
            for(; e - t >= this._maxSize;)e >>= 1, t >>= 1, n++;
            return n;
        }
        _downscale(e) {
            if (e === 0) return;
            if (e < 0) throw new Error(`impossible change of scale: ${this.scale}`);
            let t = this._mapping.scale - e;
            this._positive.downscale(e), this._negative.downscale(e), this._mapping = (0, Jd.getMapping)(t);
        }
        _minScale(e) {
            let t = Math.min(this.scale, e.scale), n = Gt.combine(this._highLowAtScale(this.positive, this.scale, t), this._highLowAtScale(e.positive, e.scale, t)), i = Gt.combine(this._highLowAtScale(this.negative, this.scale, t), this._highLowAtScale(e.negative, e.scale, t));
            return Math.min(t - this._changeScale(n.high, n.low), t - this._changeScale(i.high, i.low));
        }
        _highLowAtScale(e, t, n) {
            if (e.length === 0) return new Gt(0, -1);
            let i = t - n;
            return new Gt(e.indexStart >> i, e.indexEnd >> i);
        }
        _mergeBuckets(e, t, n, i) {
            let s = n.offset, o = t.scale - i;
            for(let a = 0; a < n.length; a++)this._incrementIndexBy(e, s + a >> o, n.at(a));
        }
        _diffBuckets(e, t, n, i) {
            let s = n.offset, o = t.scale - i;
            for(let a = 0; a < n.length; a++){
                let l = (s + a >> o) - e.indexBase;
                l < 0 && (l += e.backing.length), e.decrementBucket(l, n.at(a));
            }
            e.trim();
        }
    };
    Vt.ExponentialHistogramAccumulation = Ni;
    var Ia = class {
        constructor(e, t){
            this._maxSize = e, this._recordMinMax = t, this.kind = uT.AggregatorKind.EXPONENTIAL_HISTOGRAM;
        }
        createAccumulation(e) {
            return new Ni(e, this._maxSize, this._recordMinMax);
        }
        merge(e, t) {
            let n = t.clone();
            return n.merge(e), n;
        }
        diff(e, t) {
            let n = t.clone();
            return n.diff(e), n;
        }
        toMetricData(e, t, n, i) {
            return {
                descriptor: e,
                aggregationTemporality: t,
                dataPointType: cT.DataPointType.EXPONENTIAL_HISTOGRAM,
                dataPoints: n.map(([s, o])=>{
                    let a = o.toPointValue(), u = e.type === ya.InstrumentType.UP_DOWN_COUNTER || e.type === ya.InstrumentType.OBSERVABLE_GAUGE || e.type === ya.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
                    return {
                        attributes: s,
                        startTime: o.startTime,
                        endTime: i,
                        value: {
                            min: a.hasMinMax ? a.min : void 0,
                            max: a.hasMinMax ? a.max : void 0,
                            sum: u ? void 0 : a.sum,
                            positive: {
                                offset: a.positive.offset,
                                bucketCounts: a.positive.bucketCounts
                            },
                            negative: {
                                offset: a.negative.offset,
                                bucketCounts: a.negative.bucketCounts
                            },
                            count: a.count,
                            scale: a.scale,
                            zeroCount: a.zeroCount
                        }
                    };
                })
            };
        }
    };
    Vt.ExponentialHistogramAggregator = Ia;
});
var t_ = c((Ft)=>{
    "use strict";
    Object.defineProperty(Ft, "__esModule", {
        value: !0
    });
    Ft.LastValueAggregator = Ft.LastValueAccumulation = void 0;
    var pT = wt(), Pr = S(), fT = Nt(), jt = class {
        constructor(e, t = 0, n = [
            0,
            0
        ]){
            this.startTime = e, this._current = t, this.sampleTime = n;
        }
        record(e) {
            this._current = e, this.sampleTime = (0, Pr.millisToHrTime)(Date.now());
        }
        setStartTime(e) {
            this.startTime = e;
        }
        toPointValue() {
            return this._current;
        }
    };
    Ft.LastValueAccumulation = jt;
    var La = class {
        constructor(){
            this.kind = pT.AggregatorKind.LAST_VALUE;
        }
        createAccumulation(e) {
            return new jt(e);
        }
        merge(e, t) {
            let n = (0, Pr.hrTimeToMicroseconds)(t.sampleTime) >= (0, Pr.hrTimeToMicroseconds)(e.sampleTime) ? t : e;
            return new jt(e.startTime, n.toPointValue(), n.sampleTime);
        }
        diff(e, t) {
            let n = (0, Pr.hrTimeToMicroseconds)(t.sampleTime) >= (0, Pr.hrTimeToMicroseconds)(e.sampleTime) ? t : e;
            return new jt(t.startTime, n.toPointValue(), n.sampleTime);
        }
        toMetricData(e, t, n, i) {
            return {
                descriptor: e,
                aggregationTemporality: t,
                dataPointType: fT.DataPointType.GAUGE,
                dataPoints: n.map(([s, o])=>({
                        attributes: s,
                        startTime: o.startTime,
                        endTime: i,
                        value: o.toPointValue()
                    }))
            };
        }
    };
    Ft.LastValueAggregator = La;
});
var r_ = c((Ht)=>{
    "use strict";
    Object.defineProperty(Ht, "__esModule", {
        value: !0
    });
    Ht.SumAggregator = Ht.SumAccumulation = void 0;
    var ET = wt(), mT = Nt(), we = class {
        constructor(e, t, n = 0, i = !1){
            this.startTime = e, this.monotonic = t, this._current = n, this.reset = i;
        }
        record(e) {
            this.monotonic && e < 0 || (this._current += e);
        }
        setStartTime(e) {
            this.startTime = e;
        }
        toPointValue() {
            return this._current;
        }
    };
    Ht.SumAccumulation = we;
    var Ma = class {
        constructor(e){
            this.monotonic = e, this.kind = ET.AggregatorKind.SUM;
        }
        createAccumulation(e) {
            return new we(e, this.monotonic);
        }
        merge(e, t) {
            let n = e.toPointValue(), i = t.toPointValue();
            return t.reset ? new we(t.startTime, this.monotonic, i, t.reset) : new we(e.startTime, this.monotonic, n + i);
        }
        diff(e, t) {
            let n = e.toPointValue(), i = t.toPointValue();
            return this.monotonic && n > i ? new we(t.startTime, this.monotonic, i, !0) : new we(t.startTime, this.monotonic, i - n);
        }
        toMetricData(e, t, n, i) {
            return {
                descriptor: e,
                aggregationTemporality: t,
                dataPointType: mT.DataPointType.SUM,
                dataPoints: n.map(([s, o])=>({
                        attributes: s,
                        startTime: o.startTime,
                        endTime: i,
                        value: o.toPointValue()
                    })),
                isMonotonic: this.monotonic
            };
        }
    };
    Ht.SumAggregator = Ma;
});
var n_ = c((ce)=>{
    "use strict";
    var gT = ce && ce.__createBinding || (Object.create ? function(r, e, t, n) {
        n === void 0 && (n = t), Object.defineProperty(r, n, {
            enumerable: !0,
            get: function() {
                return e[t];
            }
        });
    } : function(r, e, t, n) {
        n === void 0 && (n = t), r[n] = e[t];
    }), yr = ce && ce.__exportStar || function(r, e) {
        for(var t in r)t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && gT(e, r, t);
    };
    Object.defineProperty(ce, "__esModule", {
        value: !0
    });
    yr(Gd(), ce);
    yr(Fd(), ce);
    yr(e_(), ce);
    yr(t_(), ce);
    yr(r_(), ce);
});
var Bi = c((G)=>{
    "use strict";
    Object.defineProperty(G, "__esModule", {
        value: !0
    });
    G.DefaultAggregation = G.ExponentialHistogramAggregation = G.ExplicitBucketHistogramAggregation = G.HistogramAggregation = G.LastValueAggregation = G.SumAggregation = G.DropAggregation = G.Aggregation = void 0;
    var TT = (h(), f(d)), ot = n_(), Re = Oe(), ge = class {
        static Drop() {
            return i_;
        }
        static Sum() {
            return s_;
        }
        static LastValue() {
            return o_;
        }
        static Histogram() {
            return a_;
        }
        static ExponentialHistogram() {
            return ST;
        }
        static Default() {
            return AT;
        }
    };
    G.Aggregation = ge;
    var vr = class r extends ge {
        createAggregator(e) {
            return r.DEFAULT_INSTANCE;
        }
    };
    G.DropAggregation = vr;
    vr.DEFAULT_INSTANCE = new ot.DropAggregator;
    var kt = class r extends ge {
        createAggregator(e) {
            switch(e.type){
                case Re.InstrumentType.COUNTER:
                case Re.InstrumentType.OBSERVABLE_COUNTER:
                case Re.InstrumentType.HISTOGRAM:
                    return r.MONOTONIC_INSTANCE;
                default:
                    return r.NON_MONOTONIC_INSTANCE;
            }
        }
    };
    G.SumAggregation = kt;
    kt.MONOTONIC_INSTANCE = new ot.SumAggregator(!0);
    kt.NON_MONOTONIC_INSTANCE = new ot.SumAggregator(!1);
    var Ir = class r extends ge {
        createAggregator(e) {
            return r.DEFAULT_INSTANCE;
        }
    };
    G.LastValueAggregation = Ir;
    Ir.DEFAULT_INSTANCE = new ot.LastValueAggregator;
    var Lr = class r extends ge {
        createAggregator(e) {
            return r.DEFAULT_INSTANCE;
        }
    };
    G.HistogramAggregation = Lr;
    Lr.DEFAULT_INSTANCE = new ot.HistogramAggregator([
        0,
        5,
        10,
        25,
        50,
        75,
        100,
        250,
        500,
        750,
        1e3,
        2500,
        5e3,
        7500,
        1e4
    ], !0);
    var wi = class extends ge {
        constructor(e, t = !0){
            if (super(), this._recordMinMax = t, e === void 0 || e.length === 0) throw new Error("HistogramAggregator should be created with boundaries.");
            e = e.concat(), e = e.sort((s, o)=>s - o);
            let n = e.lastIndexOf(-1 / 0), i = e.indexOf(1 / 0);
            i === -1 && (i = void 0), this._boundaries = e.slice(n + 1, i);
        }
        createAggregator(e) {
            return new ot.HistogramAggregator(this._boundaries, this._recordMinMax);
        }
    };
    G.ExplicitBucketHistogramAggregation = wi;
    var xi = class extends ge {
        constructor(e = 160, t = !0){
            super(), this._maxSize = e, this._recordMinMax = t;
        }
        createAggregator(e) {
            return new ot.ExponentialHistogramAggregator(this._maxSize, this._recordMinMax);
        }
    };
    G.ExponentialHistogramAggregation = xi;
    var Di = class extends ge {
        _resolve(e) {
            switch(e.type){
                case Re.InstrumentType.COUNTER:
                case Re.InstrumentType.UP_DOWN_COUNTER:
                case Re.InstrumentType.OBSERVABLE_COUNTER:
                case Re.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
                    return s_;
                case Re.InstrumentType.OBSERVABLE_GAUGE:
                    return o_;
                case Re.InstrumentType.HISTOGRAM:
                    return e.advice.explicitBucketBoundaries ? new wi(e.advice.explicitBucketBoundaries) : a_;
            }
            return TT.diag.warn(`Unable to recognize instrument type: ${e.type}`), i_;
        }
        createAggregator(e) {
            return this._resolve(e).createAggregator(e);
        }
    };
    G.DefaultAggregation = Di;
    var i_ = new vr, s_ = new kt, o_ = new Ir, a_ = new Lr, ST = new xi, AT = new Di;
});
var Ca = c((Xt)=>{
    "use strict";
    Object.defineProperty(Xt, "__esModule", {
        value: !0
    });
    Xt.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = Xt.DEFAULT_AGGREGATION_SELECTOR = void 0;
    var OT = Bi(), RT = Oi(), bT = (r)=>OT.Aggregation.Default();
    Xt.DEFAULT_AGGREGATION_SELECTOR = bT;
    var PT = (r)=>RT.AggregationTemporality.CUMULATIVE;
    Xt.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = PT;
});
var wa = c((qi)=>{
    "use strict";
    Object.defineProperty(qi, "__esModule", {
        value: !0
    });
    qi.MetricReader = void 0;
    var u_ = (h(), f(d)), Ui = me(), c_ = Ca(), Na = class {
        constructor(e){
            var t, n, i;
            this._shutdown = !1, this._aggregationSelector = (t = e?.aggregationSelector) !== null && t !== void 0 ? t : c_.DEFAULT_AGGREGATION_SELECTOR, this._aggregationTemporalitySelector = (n = e?.aggregationTemporalitySelector) !== null && n !== void 0 ? n : c_.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR, this._metricProducers = (i = e?.metricProducers) !== null && i !== void 0 ? i : [];
        }
        setMetricProducer(e) {
            if (this._sdkMetricProducer) throw new Error("MetricReader can not be bound to a MeterProvider again.");
            this._sdkMetricProducer = e, this.onInitialized();
        }
        selectAggregation(e) {
            return this._aggregationSelector(e);
        }
        selectAggregationTemporality(e) {
            return this._aggregationTemporalitySelector(e);
        }
        onInitialized() {}
        async collect(e) {
            if (this._sdkMetricProducer === void 0) throw new Error("MetricReader is not bound to a MetricProducer");
            if (this._shutdown) throw new Error("MetricReader is shutdown");
            let [t, ...n] = await Promise.all([
                this._sdkMetricProducer.collect({
                    timeoutMillis: e?.timeoutMillis
                }),
                ...this._metricProducers.map((a)=>a.collect({
                        timeoutMillis: e?.timeoutMillis
                    }))
            ]), i = t.errors.concat((0, Ui.FlatMap)(n, (a)=>a.errors)), s = t.resourceMetrics.resource, o = t.resourceMetrics.scopeMetrics.concat((0, Ui.FlatMap)(n, (a)=>a.resourceMetrics.scopeMetrics));
            return {
                resourceMetrics: {
                    resource: s,
                    scopeMetrics: o
                },
                errors: i
            };
        }
        async shutdown(e) {
            if (this._shutdown) {
                u_.diag.error("Cannot call shutdown twice.");
                return;
            }
            e?.timeoutMillis == null ? await this.onShutdown() : await (0, Ui.callWithTimeout)(this.onShutdown(), e.timeoutMillis), this._shutdown = !0;
        }
        async forceFlush(e) {
            if (this._shutdown) {
                u_.diag.warn("Cannot forceFlush on already shutdown MetricReader.");
                return;
            }
            if (e?.timeoutMillis == null) {
                await this.onForceFlush();
                return;
            }
            await (0, Ui.callWithTimeout)(this.onForceFlush(), e.timeoutMillis);
        }
    };
    qi.MetricReader = Na;
});
var __ = c((Vi)=>{
    "use strict";
    Object.defineProperty(Vi, "__esModule", {
        value: !0
    });
    Vi.PeriodicExportingMetricReader = void 0;
    var l_ = (h(), f(d)), Gi = S(), yT = wa(), d_ = me(), vT = (h(), f(d)), xa = class extends yT.MetricReader {
        constructor(e){
            var t, n, i, s;
            if (super({
                aggregationSelector: (t = e.exporter.selectAggregation) === null || t === void 0 ? void 0 : t.bind(e.exporter),
                aggregationTemporalitySelector: (n = e.exporter.selectAggregationTemporality) === null || n === void 0 ? void 0 : n.bind(e.exporter),
                metricProducers: e.metricProducers
            }), e.exportIntervalMillis !== void 0 && e.exportIntervalMillis <= 0) throw Error("exportIntervalMillis must be greater than 0");
            if (e.exportTimeoutMillis !== void 0 && e.exportTimeoutMillis <= 0) throw Error("exportTimeoutMillis must be greater than 0");
            if (e.exportTimeoutMillis !== void 0 && e.exportIntervalMillis !== void 0 && e.exportIntervalMillis < e.exportTimeoutMillis) throw Error("exportIntervalMillis must be greater than or equal to exportTimeoutMillis");
            this._exportInterval = (i = e.exportIntervalMillis) !== null && i !== void 0 ? i : 6e4, this._exportTimeout = (s = e.exportTimeoutMillis) !== null && s !== void 0 ? s : 3e4, this._exporter = e.exporter;
        }
        async _runOnce() {
            try {
                await (0, d_.callWithTimeout)(this._doRun(), this._exportTimeout);
            } catch (e) {
                if (e instanceof d_.TimeoutError) {
                    l_.diag.error("Export took longer than %s milliseconds and timed out.", this._exportTimeout);
                    return;
                }
                (0, Gi.globalErrorHandler)(e);
            }
        }
        async _doRun() {
            var e, t;
            let { resourceMetrics: n, errors: i } = await this.collect({
                timeoutMillis: this._exportTimeout
            });
            i.length > 0 && l_.diag.error("PeriodicExportingMetricReader: metrics collection errors", ...i);
            let s = async ()=>{
                let o = await Gi.internal._export(this._exporter, n);
                if (o.code !== Gi.ExportResultCode.SUCCESS) throw new Error(`PeriodicExportingMetricReader: metrics export failed (error ${o.error})`);
            };
            n.resource.asyncAttributesPending ? (t = (e = n.resource).waitForAsyncAttributes) === null || t === void 0 || t.call(e).then(s, (o)=>vT.diag.debug("Error while resolving async portion of resource: ", o)) : await s();
        }
        onInitialized() {
            this._interval = setInterval(()=>{
                this._runOnce();
            }, this._exportInterval), (0, Gi.unrefTimer)(this._interval);
        }
        async onForceFlush() {
            await this._runOnce(), await this._exporter.forceFlush();
        }
        async onShutdown() {
            this._interval && clearInterval(this._interval), await this._exporter.shutdown();
        }
    };
    Vi.PeriodicExportingMetricReader = xa;
});
var p_ = c((ji)=>{
    "use strict";
    Object.defineProperty(ji, "__esModule", {
        value: !0
    });
    ji.InMemoryMetricExporter = void 0;
    var h_ = S(), Da = class {
        constructor(e){
            this._shutdown = !1, this._metrics = [], this._aggregationTemporality = e;
        }
        export(e, t) {
            if (this._shutdown) {
                setTimeout(()=>t({
                        code: h_.ExportResultCode.FAILED
                    }), 0);
                return;
            }
            this._metrics.push(e), setTimeout(()=>t({
                    code: h_.ExportResultCode.SUCCESS
                }), 0);
        }
        getMetrics() {
            return this._metrics;
        }
        forceFlush() {
            return Promise.resolve();
        }
        reset() {
            this._metrics = [];
        }
        selectAggregationTemporality(e) {
            return this._aggregationTemporality;
        }
        shutdown() {
            return this._shutdown = !0, Promise.resolve();
        }
    };
    ji.InMemoryMetricExporter = Da;
});
var E_ = c((Fi)=>{
    "use strict";
    Object.defineProperty(Fi, "__esModule", {
        value: !0
    });
    Fi.ConsoleMetricExporter = void 0;
    var f_ = S(), IT = Ca(), Ba = class r {
        constructor(e){
            var t;
            this._shutdown = !1, this._temporalitySelector = (t = e?.temporalitySelector) !== null && t !== void 0 ? t : IT.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR;
        }
        export(e, t) {
            if (this._shutdown) {
                setImmediate(t, {
                    code: f_.ExportResultCode.FAILED
                });
                return;
            }
            return r._sendMetrics(e, t);
        }
        forceFlush() {
            return Promise.resolve();
        }
        selectAggregationTemporality(e) {
            return this._temporalitySelector(e);
        }
        shutdown() {
            return this._shutdown = !0, Promise.resolve();
        }
        static _sendMetrics(e, t) {
            for (let n of e.scopeMetrics)for (let i of n.metrics)console.dir({
                descriptor: i.descriptor,
                dataPointType: i.dataPointType,
                dataPoints: i.dataPoints
            });
            t({
                code: f_.ExportResultCode.SUCCESS
            });
        }
    };
    Fi.ConsoleMetricExporter = Ba;
});
var m_ = c((Hi)=>{
    "use strict";
    Object.defineProperty(Hi, "__esModule", {
        value: !0
    });
    Hi.ViewRegistry = void 0;
    var Ua = class {
        constructor(){
            this._registeredViews = [];
        }
        addView(e) {
            this._registeredViews.push(e);
        }
        findViews(e, t) {
            return this._registeredViews.filter((i)=>this._matchInstrument(i.instrumentSelector, e) && this._matchMeter(i.meterSelector, t));
        }
        _matchInstrument(e, t) {
            return (e.getType() === void 0 || t.type === e.getType()) && e.getNameFilter().match(t.name) && e.getUnitFilter().match(t.unit);
        }
        _matchMeter(e, t) {
            return e.getNameFilter().match(t.name) && (t.version === void 0 || e.getVersionFilter().match(t.version)) && (t.schemaUrl === void 0 || e.getSchemaUrlFilter().match(t.schemaUrl));
        }
    };
    Hi.ViewRegistry = Ua;
});
var ki = c((x)=>{
    "use strict";
    Object.defineProperty(x, "__esModule", {
        value: !0
    });
    x.isObservableInstrument = x.ObservableUpDownCounterInstrument = x.ObservableGaugeInstrument = x.ObservableCounterInstrument = x.ObservableInstrument = x.HistogramInstrument = x.CounterInstrument = x.UpDownCounterInstrument = x.SyncInstrument = void 0;
    var $t = (h(), f(d)), LT = S(), Wt = class {
        constructor(e, t){
            this._writableMetricStorage = e, this._descriptor = t;
        }
        _record(e, t = {}, n = $t.context.active()) {
            if (typeof e != "number") {
                $t.diag.warn(`non-number value provided to metric ${this._descriptor.name}: ${e}`);
                return;
            }
            this._descriptor.valueType === $t.ValueType.INT && !Number.isInteger(e) && ($t.diag.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`), e = Math.trunc(e), !Number.isInteger(e)) || this._writableMetricStorage.record(e, t, n, (0, LT.millisToHrTime)(Date.now()));
        }
    };
    x.SyncInstrument = Wt;
    var qa = class extends Wt {
        add(e, t, n) {
            this._record(e, t, n);
        }
    };
    x.UpDownCounterInstrument = qa;
    var Ga = class extends Wt {
        add(e, t, n) {
            if (e < 0) {
                $t.diag.warn(`negative value provided to counter ${this._descriptor.name}: ${e}`);
                return;
            }
            this._record(e, t, n);
        }
    };
    x.CounterInstrument = Ga;
    var Va = class extends Wt {
        record(e, t, n) {
            if (e < 0) {
                $t.diag.warn(`negative value provided to histogram ${this._descriptor.name}: ${e}`);
                return;
            }
            this._record(e, t, n);
        }
    };
    x.HistogramInstrument = Va;
    var at = class {
        constructor(e, t, n){
            this._observableRegistry = n, this._descriptor = e, this._metricStorages = t;
        }
        addCallback(e) {
            this._observableRegistry.addCallback(e, this);
        }
        removeCallback(e) {
            this._observableRegistry.removeCallback(e, this);
        }
    };
    x.ObservableInstrument = at;
    var ja = class extends at {
    };
    x.ObservableCounterInstrument = ja;
    var Fa = class extends at {
    };
    x.ObservableGaugeInstrument = Fa;
    var Ha = class extends at {
    };
    x.ObservableUpDownCounterInstrument = Ha;
    function MT(r) {
        return r instanceof at;
    }
    x.isObservableInstrument = MT;
});
var g_ = c((Xi)=>{
    "use strict";
    Object.defineProperty(Xi, "__esModule", {
        value: !0
    });
    Xi.Meter = void 0;
    var se = Oe(), Kt = ki(), ka = class {
        constructor(e){
            this._meterSharedState = e;
        }
        createHistogram(e, t) {
            let n = (0, se.createInstrumentDescriptor)(e, se.InstrumentType.HISTOGRAM, t), i = this._meterSharedState.registerMetricStorage(n);
            return new Kt.HistogramInstrument(i, n);
        }
        createCounter(e, t) {
            let n = (0, se.createInstrumentDescriptor)(e, se.InstrumentType.COUNTER, t), i = this._meterSharedState.registerMetricStorage(n);
            return new Kt.CounterInstrument(i, n);
        }
        createUpDownCounter(e, t) {
            let n = (0, se.createInstrumentDescriptor)(e, se.InstrumentType.UP_DOWN_COUNTER, t), i = this._meterSharedState.registerMetricStorage(n);
            return new Kt.UpDownCounterInstrument(i, n);
        }
        createObservableGauge(e, t) {
            let n = (0, se.createInstrumentDescriptor)(e, se.InstrumentType.OBSERVABLE_GAUGE, t), i = this._meterSharedState.registerAsyncMetricStorage(n);
            return new Kt.ObservableGaugeInstrument(n, i, this._meterSharedState.observableRegistry);
        }
        createObservableCounter(e, t) {
            let n = (0, se.createInstrumentDescriptor)(e, se.InstrumentType.OBSERVABLE_COUNTER, t), i = this._meterSharedState.registerAsyncMetricStorage(n);
            return new Kt.ObservableCounterInstrument(n, i, this._meterSharedState.observableRegistry);
        }
        createObservableUpDownCounter(e, t) {
            let n = (0, se.createInstrumentDescriptor)(e, se.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER, t), i = this._meterSharedState.registerAsyncMetricStorage(n);
            return new Kt.ObservableUpDownCounterInstrument(n, i, this._meterSharedState.observableRegistry);
        }
        addBatchObservableCallback(e, t) {
            this._meterSharedState.observableRegistry.addBatchCallback(e, t);
        }
        removeBatchObservableCallback(e, t) {
            this._meterSharedState.observableRegistry.removeBatchCallback(e, t);
        }
    };
    Xi.Meter = ka;
});
var $a = c(($i)=>{
    "use strict";
    Object.defineProperty($i, "__esModule", {
        value: !0
    });
    $i.MetricStorage = void 0;
    var CT = Oe(), Xa = class {
        constructor(e){
            this._instrumentDescriptor = e;
        }
        getInstrumentDescriptor() {
            return this._instrumentDescriptor;
        }
        updateDescription(e) {
            this._instrumentDescriptor = (0, CT.createInstrumentDescriptor)(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
                description: e,
                valueType: this._instrumentDescriptor.valueType,
                unit: this._instrumentDescriptor.unit,
                advice: this._instrumentDescriptor.advice
            });
        }
    };
    $i.MetricStorage = Xa;
});
var Mr = c((zt)=>{
    "use strict";
    Object.defineProperty(zt, "__esModule", {
        value: !0
    });
    zt.AttributeHashMap = zt.HashMap = void 0;
    var NT = me(), Wi = class {
        constructor(e){
            this._hash = e, this._valueMap = new Map, this._keyMap = new Map;
        }
        get(e, t) {
            return t ?? (t = this._hash(e)), this._valueMap.get(t);
        }
        getOrDefault(e, t) {
            let n = this._hash(e);
            if (this._valueMap.has(n)) return this._valueMap.get(n);
            let i = t();
            return this._keyMap.has(n) || this._keyMap.set(n, e), this._valueMap.set(n, i), i;
        }
        set(e, t, n) {
            n ?? (n = this._hash(e)), this._keyMap.has(n) || this._keyMap.set(n, e), this._valueMap.set(n, t);
        }
        has(e, t) {
            return t ?? (t = this._hash(e)), this._valueMap.has(t);
        }
        *keys() {
            let e = this._keyMap.entries(), t = e.next();
            for(; t.done !== !0;)yield [
                t.value[1],
                t.value[0]
            ], t = e.next();
        }
        *entries() {
            let e = this._valueMap.entries(), t = e.next();
            for(; t.done !== !0;)yield [
                this._keyMap.get(t.value[0]),
                t.value[1],
                t.value[0]
            ], t = e.next();
        }
        get size() {
            return this._valueMap.size;
        }
    };
    zt.HashMap = Wi;
    var Wa = class extends Wi {
        constructor(){
            super(NT.hashAttributes);
        }
    };
    zt.AttributeHashMap = Wa;
});
var Ya = c((Ki)=>{
    "use strict";
    Object.defineProperty(Ki, "__esModule", {
        value: !0
    });
    Ki.DeltaMetricProcessor = void 0;
    var Ka = Mr(), za = class {
        constructor(e){
            this._aggregator = e, this._activeCollectionStorage = new Ka.AttributeHashMap, this._cumulativeMemoStorage = new Ka.AttributeHashMap;
        }
        record(e, t, n, i) {
            let s = this._activeCollectionStorage.getOrDefault(t, ()=>this._aggregator.createAccumulation(i));
            s?.record(e);
        }
        batchCumulate(e, t) {
            Array.from(e.entries()).forEach(([n, i, s])=>{
                let o = this._aggregator.createAccumulation(t);
                o?.record(i);
                let a = o;
                if (this._cumulativeMemoStorage.has(n, s)) {
                    let u = this._cumulativeMemoStorage.get(n, s);
                    a = this._aggregator.diff(u, o);
                }
                if (this._activeCollectionStorage.has(n, s)) {
                    let u = this._activeCollectionStorage.get(n, s);
                    a = this._aggregator.merge(u, a);
                }
                this._cumulativeMemoStorage.set(n, o, s), this._activeCollectionStorage.set(n, a, s);
            });
        }
        collect() {
            let e = this._activeCollectionStorage;
            return this._activeCollectionStorage = new Ka.AttributeHashMap, e;
        }
    };
    Ki.DeltaMetricProcessor = za;
});
var Za = c((zi)=>{
    "use strict";
    Object.defineProperty(zi, "__esModule", {
        value: !0
    });
    zi.TemporalMetricProcessor = void 0;
    var wT = Oi(), xT = Mr(), Qa = class r {
        constructor(e, t){
            this._aggregator = e, this._unreportedAccumulations = new Map, this._reportHistory = new Map, t.forEach((n)=>{
                this._unreportedAccumulations.set(n, []);
            });
        }
        buildMetrics(e, t, n, i) {
            this._stashAccumulations(n);
            let s = this._getMergedUnreportedAccumulations(e), o = s, a;
            if (this._reportHistory.has(e)) {
                let l = this._reportHistory.get(e), _ = l.collectionTime;
                a = l.aggregationTemporality, a === wT.AggregationTemporality.CUMULATIVE ? o = r.merge(l.accumulations, s, this._aggregator) : o = r.calibrateStartTime(l.accumulations, s, _);
            } else a = e.selectAggregationTemporality(t.type);
            this._reportHistory.set(e, {
                accumulations: o,
                collectionTime: i,
                aggregationTemporality: a
            });
            let u = DT(o);
            if (u.length !== 0) return this._aggregator.toMetricData(t, a, u, i);
        }
        _stashAccumulations(e) {
            let t = this._unreportedAccumulations.keys();
            for (let n of t){
                let i = this._unreportedAccumulations.get(n);
                i === void 0 && (i = [], this._unreportedAccumulations.set(n, i)), i.push(e);
            }
        }
        _getMergedUnreportedAccumulations(e) {
            let t = new xT.AttributeHashMap, n = this._unreportedAccumulations.get(e);
            if (this._unreportedAccumulations.set(e, []), n === void 0) return t;
            for (let i of n)t = r.merge(t, i, this._aggregator);
            return t;
        }
        static merge(e, t, n) {
            let i = e, s = t.entries(), o = s.next();
            for(; o.done !== !0;){
                let [a, u, l] = o.value;
                if (e.has(a, l)) {
                    let _ = e.get(a, l), E = n.merge(_, u);
                    i.set(a, E, l);
                } else i.set(a, u, l);
                o = s.next();
            }
            return i;
        }
        static calibrateStartTime(e, t, n) {
            for (let [i, s] of e.keys()){
                let o = t.get(i, s);
                o?.setStartTime(n);
            }
            return t;
        }
    };
    zi.TemporalMetricProcessor = Qa;
    function DT(r) {
        return Array.from(r.entries());
    }
});
var T_ = c((Yi)=>{
    "use strict";
    Object.defineProperty(Yi, "__esModule", {
        value: !0
    });
    Yi.AsyncMetricStorage = void 0;
    var BT = $a(), UT = Ya(), qT = Za(), GT = Mr(), Ja = class extends BT.MetricStorage {
        constructor(e, t, n, i){
            super(e), this._attributesProcessor = n, this._deltaMetricStorage = new UT.DeltaMetricProcessor(t), this._temporalMetricStorage = new qT.TemporalMetricProcessor(t, i);
        }
        record(e, t) {
            let n = new GT.AttributeHashMap;
            Array.from(e.entries()).forEach(([i, s])=>{
                n.set(this._attributesProcessor.process(i), s);
            }), this._deltaMetricStorage.batchCumulate(n, t);
        }
        collect(e, t) {
            let n = this._deltaMetricStorage.collect();
            return this._temporalMetricStorage.buildMetrics(e, this._instrumentDescriptor, n, t);
        }
    };
    Yi.AsyncMetricStorage = Ja;
});
var b_ = c((Q)=>{
    "use strict";
    Object.defineProperty(Q, "__esModule", {
        value: !0
    });
    Q.getConflictResolutionRecipe = Q.getDescriptionResolutionRecipe = Q.getTypeConflictResolutionRecipe = Q.getUnitConflictResolutionRecipe = Q.getValueTypeConflictResolutionRecipe = Q.getIncompatibilityDetails = void 0;
    function VT(r, e) {
        let t = "";
        return r.unit !== e.unit && (t += `	- Unit '${r.unit}' does not match '${e.unit}'
`), r.type !== e.type && (t += `	- Type '${r.type}' does not match '${e.type}'
`), r.valueType !== e.valueType && (t += `	- Value Type '${r.valueType}' does not match '${e.valueType}'
`), r.description !== e.description && (t += `	- Description '${r.description}' does not match '${e.description}'
`), t;
    }
    Q.getIncompatibilityDetails = VT;
    function S_(r, e) {
        return `	- use valueType '${r.valueType}' on instrument creation or use an instrument name other than '${e.name}'`;
    }
    Q.getValueTypeConflictResolutionRecipe = S_;
    function A_(r, e) {
        return `	- use unit '${r.unit}' on instrument creation or use an instrument name other than '${e.name}'`;
    }
    Q.getUnitConflictResolutionRecipe = A_;
    function O_(r, e) {
        let t = {
            name: e.name,
            type: e.type,
            unit: e.unit
        }, n = JSON.stringify(t);
        return `	- create a new view with a name other than '${r.name}' and InstrumentSelector '${n}'`;
    }
    Q.getTypeConflictResolutionRecipe = O_;
    function R_(r, e) {
        let t = {
            name: e.name,
            type: e.type,
            unit: e.unit
        }, n = JSON.stringify(t);
        return `	- create a new view with a name other than '${r.name}' and InstrumentSelector '${n}'
    	- OR - create a new view with the name ${r.name} and description '${r.description}' and InstrumentSelector ${n}
    	- OR - create a new view with the name ${e.name} and description '${r.description}' and InstrumentSelector ${n}`;
    }
    Q.getDescriptionResolutionRecipe = R_;
    function jT(r, e) {
        return r.valueType !== e.valueType ? S_(r, e) : r.unit !== e.unit ? A_(r, e) : r.type !== e.type ? O_(r, e) : r.description !== e.description ? R_(r, e) : "";
    }
    Q.getConflictResolutionRecipe = jT;
});
var y_ = c((Zi)=>{
    "use strict";
    Object.defineProperty(Zi, "__esModule", {
        value: !0
    });
    Zi.MetricStorageRegistry = void 0;
    var FT = Oe(), P_ = (h(), f(d)), Qi = b_(), eu = class r {
        constructor(){
            this._sharedRegistry = new Map, this._perCollectorRegistry = new Map;
        }
        static create() {
            return new r;
        }
        getStorages(e) {
            let t = [];
            for (let i of this._sharedRegistry.values())t = t.concat(i);
            let n = this._perCollectorRegistry.get(e);
            if (n != null) for (let i of n.values())t = t.concat(i);
            return t;
        }
        register(e) {
            this._registerStorage(e, this._sharedRegistry);
        }
        registerForCollector(e, t) {
            let n = this._perCollectorRegistry.get(e);
            n == null && (n = new Map, this._perCollectorRegistry.set(e, n)), this._registerStorage(t, n);
        }
        findOrUpdateCompatibleStorage(e) {
            let t = this._sharedRegistry.get(e.name);
            return t === void 0 ? null : this._findOrUpdateCompatibleStorage(e, t);
        }
        findOrUpdateCompatibleCollectorStorage(e, t) {
            let n = this._perCollectorRegistry.get(e);
            if (n === void 0) return null;
            let i = n.get(t.name);
            return i === void 0 ? null : this._findOrUpdateCompatibleStorage(t, i);
        }
        _registerStorage(e, t) {
            let n = e.getInstrumentDescriptor(), i = t.get(n.name);
            if (i === void 0) {
                t.set(n.name, [
                    e
                ]);
                return;
            }
            i.push(e);
        }
        _findOrUpdateCompatibleStorage(e, t) {
            let n = null;
            for (let i of t){
                let s = i.getInstrumentDescriptor();
                (0, FT.isDescriptorCompatibleWith)(s, e) ? (s.description !== e.description && (e.description.length > s.description.length && i.updateDescription(e.description), P_.diag.warn("A view or instrument with the name ", e.name, ` has already been registered, but has a different description and is incompatible with another registered view.
`, `Details:
`, (0, Qi.getIncompatibilityDetails)(s, e), `The longer description will be used.
To resolve the conflict:`, (0, Qi.getConflictResolutionRecipe)(s, e))), n = i) : P_.diag.warn("A view or instrument with the name ", e.name, ` has already been registered and is incompatible with another registered view.
`, `Details:
`, (0, Qi.getIncompatibilityDetails)(s, e), `To resolve the conflict:
`, (0, Qi.getConflictResolutionRecipe)(s, e));
            }
            return n;
        }
    };
    Zi.MetricStorageRegistry = eu;
});
var v_ = c((Ji)=>{
    "use strict";
    Object.defineProperty(Ji, "__esModule", {
        value: !0
    });
    Ji.MultiMetricStorage = void 0;
    var tu = class {
        constructor(e){
            this._backingStorages = e;
        }
        record(e, t, n, i) {
            this._backingStorages.forEach((s)=>{
                s.record(e, t, n, i);
            });
        }
    };
    Ji.MultiMetricStorage = tu;
});
var L_ = c((Qt)=>{
    "use strict";
    Object.defineProperty(Qt, "__esModule", {
        value: !0
    });
    Qt.BatchObservableResultImpl = Qt.ObservableResultImpl = void 0;
    var Yt = (h(), f(d)), I_ = Mr(), HT = ki(), ru = class {
        constructor(e, t){
            this._instrumentName = e, this._valueType = t, this._buffer = new I_.AttributeHashMap;
        }
        observe(e, t = {}) {
            if (typeof e != "number") {
                Yt.diag.warn(`non-number value provided to metric ${this._instrumentName}: ${e}`);
                return;
            }
            this._valueType === Yt.ValueType.INT && !Number.isInteger(e) && (Yt.diag.warn(`INT value type cannot accept a floating-point value for ${this._instrumentName}, ignoring the fractional digits.`), e = Math.trunc(e), !Number.isInteger(e)) || this._buffer.set(t, e);
        }
    };
    Qt.ObservableResultImpl = ru;
    var nu = class {
        constructor(){
            this._buffer = new Map;
        }
        observe(e, t, n = {}) {
            if (!(0, HT.isObservableInstrument)(e)) return;
            let i = this._buffer.get(e);
            if (i == null && (i = new I_.AttributeHashMap, this._buffer.set(e, i)), typeof t != "number") {
                Yt.diag.warn(`non-number value provided to metric ${e._descriptor.name}: ${t}`);
                return;
            }
            e._descriptor.valueType === Yt.ValueType.INT && !Number.isInteger(t) && (Yt.diag.warn(`INT value type cannot accept a floating-point value for ${e._descriptor.name}, ignoring the fractional digits.`), t = Math.trunc(t), !Number.isInteger(t)) || i.set(n, t);
        }
    };
    Qt.BatchObservableResultImpl = nu;
});
var N_ = c((es)=>{
    "use strict";
    Object.defineProperty(es, "__esModule", {
        value: !0
    });
    es.ObservableRegistry = void 0;
    var kT = (h(), f(d)), M_ = ki(), C_ = L_(), Cr = me(), iu = class {
        constructor(){
            this._callbacks = [], this._batchCallbacks = [];
        }
        addCallback(e, t) {
            this._findCallback(e, t) >= 0 || this._callbacks.push({
                callback: e,
                instrument: t
            });
        }
        removeCallback(e, t) {
            let n = this._findCallback(e, t);
            n < 0 || this._callbacks.splice(n, 1);
        }
        addBatchCallback(e, t) {
            let n = new Set(t.filter(M_.isObservableInstrument));
            if (n.size === 0) {
                kT.diag.error("BatchObservableCallback is not associated with valid instruments", t);
                return;
            }
            this._findBatchCallback(e, n) >= 0 || this._batchCallbacks.push({
                callback: e,
                instruments: n
            });
        }
        removeBatchCallback(e, t) {
            let n = new Set(t.filter(M_.isObservableInstrument)), i = this._findBatchCallback(e, n);
            i < 0 || this._batchCallbacks.splice(i, 1);
        }
        async observe(e, t) {
            let n = this._observeCallbacks(e, t), i = this._observeBatchCallbacks(e, t);
            return (await (0, Cr.PromiseAllSettled)([
                ...n,
                ...i
            ])).filter(Cr.isPromiseAllSettledRejectionResult).map((a)=>a.reason);
        }
        _observeCallbacks(e, t) {
            return this._callbacks.map(async ({ callback: n, instrument: i })=>{
                let s = new C_.ObservableResultImpl(i._descriptor.name, i._descriptor.valueType), o = Promise.resolve(n(s));
                t != null && (o = (0, Cr.callWithTimeout)(o, t)), await o, i._metricStorages.forEach((a)=>{
                    a.record(s._buffer, e);
                });
            });
        }
        _observeBatchCallbacks(e, t) {
            return this._batchCallbacks.map(async ({ callback: n, instruments: i })=>{
                let s = new C_.BatchObservableResultImpl, o = Promise.resolve(n(s));
                t != null && (o = (0, Cr.callWithTimeout)(o, t)), await o, i.forEach((a)=>{
                    let u = s._buffer.get(a);
                    u != null && a._metricStorages.forEach((l)=>{
                        l.record(u, e);
                    });
                });
            });
        }
        _findCallback(e, t) {
            return this._callbacks.findIndex((n)=>n.callback === e && n.instrument === t);
        }
        _findBatchCallback(e, t) {
            return this._batchCallbacks.findIndex((n)=>n.callback === e && (0, Cr.setEquals)(n.instruments, t));
        }
    };
    es.ObservableRegistry = iu;
});
var w_ = c((ts)=>{
    "use strict";
    Object.defineProperty(ts, "__esModule", {
        value: !0
    });
    ts.SyncMetricStorage = void 0;
    var XT = $a(), $T = Ya(), WT = Za(), su = class extends XT.MetricStorage {
        constructor(e, t, n, i){
            super(e), this._attributesProcessor = n, this._deltaMetricStorage = new $T.DeltaMetricProcessor(t), this._temporalMetricStorage = new WT.TemporalMetricProcessor(t, i);
        }
        record(e, t, n, i) {
            t = this._attributesProcessor.process(t, n), this._deltaMetricStorage.record(e, t, n, i);
        }
        collect(e, t) {
            let n = this._deltaMetricStorage.collect();
            return this._temporalMetricStorage.buildMetrics(e, this._instrumentDescriptor, n, t);
        }
    };
    ts.SyncMetricStorage = su;
});
var au = c((xe)=>{
    "use strict";
    Object.defineProperty(xe, "__esModule", {
        value: !0
    });
    xe.FilteringAttributesProcessor = xe.NoopAttributesProcessor = xe.AttributesProcessor = void 0;
    var Nr = class {
        static Noop() {
            return KT;
        }
    };
    xe.AttributesProcessor = Nr;
    var rs = class extends Nr {
        process(e, t) {
            return e;
        }
    };
    xe.NoopAttributesProcessor = rs;
    var ou = class extends Nr {
        constructor(e){
            super(), this._allowedAttributeNames = e;
        }
        process(e, t) {
            let n = {};
            return Object.keys(e).filter((i)=>this._allowedAttributeNames.includes(i)).forEach((i)=>n[i] = e[i]), n;
        }
    };
    xe.FilteringAttributesProcessor = ou;
    var KT = new rs;
});
var x_ = c((ns)=>{
    "use strict";
    Object.defineProperty(ns, "__esModule", {
        value: !0
    });
    ns.MeterSharedState = void 0;
    var zT = Oe(), YT = g_(), QT = me(), ZT = T_(), JT = y_(), eS = v_(), tS = N_(), rS = w_(), nS = au(), uu = class {
        constructor(e, t){
            this._meterProviderSharedState = e, this._instrumentationScope = t, this.metricStorageRegistry = new JT.MetricStorageRegistry, this.observableRegistry = new tS.ObservableRegistry, this.meter = new YT.Meter(this);
        }
        registerMetricStorage(e) {
            let t = this._registerMetricStorage(e, rS.SyncMetricStorage);
            return t.length === 1 ? t[0] : new eS.MultiMetricStorage(t);
        }
        registerAsyncMetricStorage(e) {
            return this._registerMetricStorage(e, ZT.AsyncMetricStorage);
        }
        async collect(e, t, n) {
            let i = await this.observableRegistry.observe(t, n?.timeoutMillis), s = this.metricStorageRegistry.getStorages(e);
            if (s.length === 0) return null;
            let o = s.map((a)=>a.collect(e, t)).filter(QT.isNotNullish);
            return o.length === 0 ? {
                errors: i
            } : {
                scopeMetrics: {
                    scope: this._instrumentationScope,
                    metrics: o
                },
                errors: i
            };
        }
        _registerMetricStorage(e, t) {
            let i = this._meterProviderSharedState.viewRegistry.findViews(e, this._instrumentationScope).map((s)=>{
                let o = (0, zT.createInstrumentDescriptorWithView)(s, e), a = this.metricStorageRegistry.findOrUpdateCompatibleStorage(o);
                if (a != null) return a;
                let u = s.aggregation.createAggregator(o), l = new t(o, u, s.attributesProcessor, this._meterProviderSharedState.metricCollectors);
                return this.metricStorageRegistry.register(l), l;
            });
            if (i.length === 0) {
                let o = this._meterProviderSharedState.selectAggregations(e.type).map(([a, u])=>{
                    let l = this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(a, e);
                    if (l != null) return l;
                    let _ = u.createAggregator(e), E = new t(e, _, nS.AttributesProcessor.Noop(), [
                        a
                    ]);
                    return this.metricStorageRegistry.registerForCollector(a, E), E;
                });
                i = i.concat(o);
            }
            return i;
        }
    };
    ns.MeterSharedState = uu;
});
var D_ = c((is)=>{
    "use strict";
    Object.defineProperty(is, "__esModule", {
        value: !0
    });
    is.MeterProviderSharedState = void 0;
    var iS = me(), sS = m_(), oS = x_(), cu = class {
        constructor(e){
            this.resource = e, this.viewRegistry = new sS.ViewRegistry, this.metricCollectors = [], this.meterSharedStates = new Map;
        }
        getMeterSharedState(e) {
            let t = (0, iS.instrumentationScopeId)(e), n = this.meterSharedStates.get(t);
            return n == null && (n = new oS.MeterSharedState(this, e), this.meterSharedStates.set(t, n)), n;
        }
        selectAggregations(e) {
            let t = [];
            for (let n of this.metricCollectors)t.push([
                n,
                n.selectAggregation(e)
            ]);
            return t;
        }
    };
    is.MeterProviderSharedState = cu;
});
var B_ = c((ss)=>{
    "use strict";
    Object.defineProperty(ss, "__esModule", {
        value: !0
    });
    ss.MetricCollector = void 0;
    var aS = S(), lu = class {
        constructor(e, t){
            this._sharedState = e, this._metricReader = t;
        }
        async collect(e) {
            let t = (0, aS.millisToHrTime)(Date.now()), n = [], i = [], s = Array.from(this._sharedState.meterSharedStates.values()).map(async (o)=>{
                let a = await o.collect(this, t, e);
                a?.scopeMetrics != null && n.push(a.scopeMetrics), a?.errors != null && i.push(...a.errors);
            });
            return await Promise.all(s), {
                resourceMetrics: {
                    resource: this._sharedState.resource,
                    scopeMetrics: n
                },
                errors: i
            };
        }
        async forceFlush(e) {
            await this._metricReader.forceFlush(e);
        }
        async shutdown(e) {
            await this._metricReader.shutdown(e);
        }
        selectAggregationTemporality(e) {
            return this._metricReader.selectAggregationTemporality(e);
        }
        selectAggregation(e) {
            return this._metricReader.selectAggregation(e);
        }
    };
    ss.MetricCollector = lu;
});
var q_ = c((as)=>{
    "use strict";
    Object.defineProperty(as, "__esModule", {
        value: !0
    });
    as.MeterProvider = void 0;
    var os = (h(), f(d)), U_ = tt(), uS = D_(), cS = B_(), du = class {
        constructor(e){
            var t;
            this._shutdown = !1;
            let n = U_.Resource.default().merge((t = e?.resource) !== null && t !== void 0 ? t : U_.Resource.empty());
            if (this._sharedState = new uS.MeterProviderSharedState(n), e?.views != null && e.views.length > 0) for (let i of e.views)this._sharedState.viewRegistry.addView(i);
        }
        getMeter(e, t = "", n = {}) {
            return this._shutdown ? (os.diag.warn("A shutdown MeterProvider cannot provide a Meter"), (0, os.createNoopMeter)()) : this._sharedState.getMeterSharedState({
                name: e,
                version: t,
                schemaUrl: n.schemaUrl
            }).meter;
        }
        addMetricReader(e) {
            let t = new cS.MetricCollector(this._sharedState, e);
            e.setMetricProducer(t), this._sharedState.metricCollectors.push(t);
        }
        async shutdown(e) {
            if (this._shutdown) {
                os.diag.warn("shutdown may only be called once per MeterProvider");
                return;
            }
            this._shutdown = !0, await Promise.all(this._sharedState.metricCollectors.map((t)=>t.shutdown(e)));
        }
        async forceFlush(e) {
            if (this._shutdown) {
                os.diag.warn("invalid attempt to force flush after MeterProvider shutdown");
                return;
            }
            await Promise.all(this._sharedState.metricCollectors.map((t)=>t.forceFlush(e)));
        }
    };
    as.MeterProvider = du;
});
var us = c((Zt)=>{
    "use strict";
    Object.defineProperty(Zt, "__esModule", {
        value: !0
    });
    Zt.ExactPredicate = Zt.PatternPredicate = void 0;
    var lS = /[\^$\\.+?()[\]{}|]/g, _u = class r {
        constructor(e){
            e === "*" ? (this._matchAll = !0, this._regexp = /.*/) : (this._matchAll = !1, this._regexp = new RegExp(r.escapePattern(e)));
        }
        match(e) {
            return this._matchAll ? !0 : this._regexp.test(e);
        }
        static escapePattern(e) {
            return `^${e.replace(lS, "\\$&").replace("*", ".*")}$`;
        }
        static hasWildcard(e) {
            return e.includes("*");
        }
    };
    Zt.PatternPredicate = _u;
    var hu = class {
        constructor(e){
            this._matchAll = e === void 0, this._pattern = e;
        }
        match(e) {
            return !!(this._matchAll || e === this._pattern);
        }
    };
    Zt.ExactPredicate = hu;
});
var V_ = c((cs)=>{
    "use strict";
    Object.defineProperty(cs, "__esModule", {
        value: !0
    });
    cs.InstrumentSelector = void 0;
    var G_ = us(), pu = class {
        constructor(e){
            var t;
            this._nameFilter = new G_.PatternPredicate((t = e?.name) !== null && t !== void 0 ? t : "*"), this._type = e?.type, this._unitFilter = new G_.ExactPredicate(e?.unit);
        }
        getType() {
            return this._type;
        }
        getNameFilter() {
            return this._nameFilter;
        }
        getUnitFilter() {
            return this._unitFilter;
        }
    };
    cs.InstrumentSelector = pu;
});
var j_ = c((ls)=>{
    "use strict";
    Object.defineProperty(ls, "__esModule", {
        value: !0
    });
    ls.MeterSelector = void 0;
    var fu = us(), Eu = class {
        constructor(e){
            this._nameFilter = new fu.ExactPredicate(e?.name), this._versionFilter = new fu.ExactPredicate(e?.version), this._schemaUrlFilter = new fu.ExactPredicate(e?.schemaUrl);
        }
        getNameFilter() {
            return this._nameFilter;
        }
        getVersionFilter() {
            return this._versionFilter;
        }
        getSchemaUrlFilter() {
            return this._schemaUrlFilter;
        }
    };
    ls.MeterSelector = Eu;
});
var H_ = c((ds)=>{
    "use strict";
    Object.defineProperty(ds, "__esModule", {
        value: !0
    });
    ds.View = void 0;
    var dS = us(), F_ = au(), _S = V_(), hS = j_(), pS = Bi();
    function fS(r) {
        return r.instrumentName == null && r.instrumentType == null && r.instrumentUnit == null && r.meterName == null && r.meterVersion == null && r.meterSchemaUrl == null;
    }
    var mu = class {
        constructor(e){
            var t;
            if (fS(e)) throw new Error("Cannot create view with no selector arguments supplied");
            if (e.name != null && (e?.instrumentName == null || dS.PatternPredicate.hasWildcard(e.instrumentName))) throw new Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.");
            e.attributeKeys != null ? this.attributesProcessor = new F_.FilteringAttributesProcessor(e.attributeKeys) : this.attributesProcessor = F_.AttributesProcessor.Noop(), this.name = e.name, this.description = e.description, this.aggregation = (t = e.aggregation) !== null && t !== void 0 ? t : pS.Aggregation.Default(), this.instrumentSelector = new _S.InstrumentSelector({
                name: e.instrumentName,
                type: e.instrumentType,
                unit: e.instrumentUnit
            }), this.meterSelector = new hS.MeterSelector({
                name: e.meterName,
                version: e.meterVersion,
                schemaUrl: e.meterSchemaUrl
            });
        }
    };
    ds.View = mu;
});
var k_ = c((g)=>{
    "use strict";
    Object.defineProperty(g, "__esModule", {
        value: !0
    });
    g.TimeoutError = g.View = g.Aggregation = g.SumAggregation = g.LastValueAggregation = g.HistogramAggregation = g.DropAggregation = g.ExponentialHistogramAggregation = g.ExplicitBucketHistogramAggregation = g.DefaultAggregation = g.MeterProvider = g.InstrumentType = g.ConsoleMetricExporter = g.InMemoryMetricExporter = g.PeriodicExportingMetricReader = g.MetricReader = g.DataPointType = g.AggregationTemporality = void 0;
    var ES = Oi();
    Object.defineProperty(g, "AggregationTemporality", {
        enumerable: !0,
        get: function() {
            return ES.AggregationTemporality;
        }
    });
    var mS = Nt();
    Object.defineProperty(g, "DataPointType", {
        enumerable: !0,
        get: function() {
            return mS.DataPointType;
        }
    });
    var gS = wa();
    Object.defineProperty(g, "MetricReader", {
        enumerable: !0,
        get: function() {
            return gS.MetricReader;
        }
    });
    var TS = __();
    Object.defineProperty(g, "PeriodicExportingMetricReader", {
        enumerable: !0,
        get: function() {
            return TS.PeriodicExportingMetricReader;
        }
    });
    var SS = p_();
    Object.defineProperty(g, "InMemoryMetricExporter", {
        enumerable: !0,
        get: function() {
            return SS.InMemoryMetricExporter;
        }
    });
    var AS = E_();
    Object.defineProperty(g, "ConsoleMetricExporter", {
        enumerable: !0,
        get: function() {
            return AS.ConsoleMetricExporter;
        }
    });
    var OS = Oe();
    Object.defineProperty(g, "InstrumentType", {
        enumerable: !0,
        get: function() {
            return OS.InstrumentType;
        }
    });
    var RS = q_();
    Object.defineProperty(g, "MeterProvider", {
        enumerable: !0,
        get: function() {
            return RS.MeterProvider;
        }
    });
    var De = Bi();
    Object.defineProperty(g, "DefaultAggregation", {
        enumerable: !0,
        get: function() {
            return De.DefaultAggregation;
        }
    });
    Object.defineProperty(g, "ExplicitBucketHistogramAggregation", {
        enumerable: !0,
        get: function() {
            return De.ExplicitBucketHistogramAggregation;
        }
    });
    Object.defineProperty(g, "ExponentialHistogramAggregation", {
        enumerable: !0,
        get: function() {
            return De.ExponentialHistogramAggregation;
        }
    });
    Object.defineProperty(g, "DropAggregation", {
        enumerable: !0,
        get: function() {
            return De.DropAggregation;
        }
    });
    Object.defineProperty(g, "HistogramAggregation", {
        enumerable: !0,
        get: function() {
            return De.HistogramAggregation;
        }
    });
    Object.defineProperty(g, "LastValueAggregation", {
        enumerable: !0,
        get: function() {
            return De.LastValueAggregation;
        }
    });
    Object.defineProperty(g, "SumAggregation", {
        enumerable: !0,
        get: function() {
            return De.SumAggregation;
        }
    });
    Object.defineProperty(g, "Aggregation", {
        enumerable: !0,
        get: function() {
            return De.Aggregation;
        }
    });
    var bS = H_();
    Object.defineProperty(g, "View", {
        enumerable: !0,
        get: function() {
            return bS.View;
        }
    });
    var PS = me();
    Object.defineProperty(g, "TimeoutError", {
        enumerable: !0,
        get: function() {
            return PS.TimeoutError;
        }
    });
});
var X_ = c((_s)=>{
    "use strict";
    Object.defineProperty(_s, "__esModule", {
        value: !0
    });
    _s.AbstractAsyncHooksContextManager = void 0;
    var yS = J("events"), vS = [
        "addListener",
        "on",
        "once",
        "prependListener",
        "prependOnceListener"
    ], gu = class {
        constructor(){
            this._kOtListeners = Symbol("OtListeners"), this._wrapped = !1;
        }
        bind(e, t) {
            return t instanceof yS.EventEmitter ? this._bindEventEmitter(e, t) : typeof t == "function" ? this._bindFunction(e, t) : t;
        }
        _bindFunction(e, t) {
            let n = this, i = function(...s) {
                return n.with(e, ()=>t.apply(this, s));
            };
            return Object.defineProperty(i, "length", {
                enumerable: !1,
                configurable: !0,
                writable: !1,
                value: t.length
            }), i;
        }
        _bindEventEmitter(e, t) {
            return this._getPatchMap(t) !== void 0 || (this._createPatchMap(t), vS.forEach((i)=>{
                t[i] !== void 0 && (t[i] = this._patchAddListener(t, t[i], e));
            }), typeof t.removeListener == "function" && (t.removeListener = this._patchRemoveListener(t, t.removeListener)), typeof t.off == "function" && (t.off = this._patchRemoveListener(t, t.off)), typeof t.removeAllListeners == "function" && (t.removeAllListeners = this._patchRemoveAllListeners(t, t.removeAllListeners))), t;
        }
        _patchRemoveListener(e, t) {
            let n = this;
            return function(i, s) {
                var o;
                let a = (o = n._getPatchMap(e)) === null || o === void 0 ? void 0 : o[i];
                if (a === void 0) return t.call(this, i, s);
                let u = a.get(s);
                return t.call(this, i, u || s);
            };
        }
        _patchRemoveAllListeners(e, t) {
            let n = this;
            return function(i) {
                let s = n._getPatchMap(e);
                return s !== void 0 && (arguments.length === 0 ? n._createPatchMap(e) : s[i] !== void 0 && delete s[i]), t.apply(this, arguments);
            };
        }
        _patchAddListener(e, t, n) {
            let i = this;
            return function(s, o) {
                if (i._wrapped) return t.call(this, s, o);
                let a = i._getPatchMap(e);
                a === void 0 && (a = i._createPatchMap(e));
                let u = a[s];
                u === void 0 && (u = new WeakMap, a[s] = u);
                let l = i.bind(n, o);
                u.set(o, l), i._wrapped = !0;
                try {
                    return t.call(this, s, l);
                } finally{
                    i._wrapped = !1;
                }
            };
        }
        _createPatchMap(e) {
            let t = Object.create(null);
            return e[this._kOtListeners] = t, t;
        }
        _getPatchMap(e) {
            return e[this._kOtListeners];
        }
    };
    _s.AbstractAsyncHooksContextManager = gu;
});
var $_ = c((hs)=>{
    "use strict";
    Object.defineProperty(hs, "__esModule", {
        value: !0
    });
    hs.AsyncLocalStorageContextManager = void 0;
    var IS = (h(), f(d)), LS = J("async_hooks"), MS = X_(), Tu = class extends MS.AbstractAsyncHooksContextManager {
        constructor(){
            super(), this._asyncLocalStorage = new LS.AsyncLocalStorage;
        }
        active() {
            var e;
            return (e = this._asyncLocalStorage.getStore()) !== null && e !== void 0 ? e : IS.ROOT_CONTEXT;
        }
        with(e, t, n, ...i) {
            let s = n == null ? t : t.bind(n);
            return this._asyncLocalStorage.run(e, s, ...i);
        }
        enable() {
            return this;
        }
        disable() {
            return this._asyncLocalStorage.disable(), this;
        }
    };
    hs.AsyncLocalStorageContextManager = Tu;
});
var Ru = c((Be)=>{
    "use strict";
    Object.defineProperty(Be, "__esModule", {
        value: !0
    });
    Be.toAnyValue = Be.toKeyValue = Be.toAttributes = void 0;
    function BS(r) {
        return Object.keys(r).map((e)=>Au(e, r[e]));
    }
    Be.toAttributes = BS;
    function Au(r, e) {
        return {
            key: r,
            value: Ou(e)
        };
    }
    Be.toKeyValue = Au;
    function Ou(r) {
        let e = typeof r;
        return e === "string" ? {
            stringValue: r
        } : e === "number" ? Number.isInteger(r) ? {
            intValue: r
        } : {
            doubleValue: r
        } : e === "boolean" ? {
            boolValue: r
        } : r instanceof Uint8Array ? {
            bytesValue: r
        } : Array.isArray(r) ? {
            arrayValue: {
                values: r.map(Ou)
            }
        } : e === "object" && r != null ? {
            kvlistValue: {
                values: Object.entries(r).map(([t, n])=>Au(t, n))
            }
        } : {};
    }
    Be.toAnyValue = Ou;
});
var Z_ = c((Ue)=>{
    "use strict";
    Object.defineProperty(Ue, "__esModule", {
        value: !0
    });
    Ue.toOtlpSpanEvent = Ue.toOtlpLink = Ue.sdkSpanToOtlpSpan = void 0;
    var bu = Ru();
    function US(r, e) {
        var t;
        let n = r.spanContext(), i = r.status;
        return {
            traceId: e.encodeSpanContext(n.traceId),
            spanId: e.encodeSpanContext(n.spanId),
            parentSpanId: e.encodeOptionalSpanContext(r.parentSpanId),
            traceState: (t = n.traceState) === null || t === void 0 ? void 0 : t.serialize(),
            name: r.name,
            kind: r.kind == null ? 0 : r.kind + 1,
            startTimeUnixNano: e.encodeHrTime(r.startTime),
            endTimeUnixNano: e.encodeHrTime(r.endTime),
            attributes: (0, bu.toAttributes)(r.attributes),
            droppedAttributesCount: r.droppedAttributesCount,
            events: r.events.map((s)=>Q_(s, e)),
            droppedEventsCount: r.droppedEventsCount,
            status: {
                code: i.code,
                message: i.message
            },
            links: r.links.map((s)=>Y_(s, e)),
            droppedLinksCount: r.droppedLinksCount
        };
    }
    Ue.sdkSpanToOtlpSpan = US;
    function Y_(r, e) {
        var t;
        return {
            attributes: r.attributes ? (0, bu.toAttributes)(r.attributes) : [],
            spanId: e.encodeSpanContext(r.context.spanId),
            traceId: e.encodeSpanContext(r.context.traceId),
            traceState: (t = r.context.traceState) === null || t === void 0 ? void 0 : t.serialize(),
            droppedAttributesCount: r.droppedAttributesCount || 0
        };
    }
    Ue.toOtlpLink = Y_;
    function Q_(r, e) {
        return {
            attributes: r.attributes ? (0, bu.toAttributes)(r.attributes) : [],
            name: r.name,
            timeUnixNano: e.encodeHrTime(r.time),
            droppedAttributesCount: r.droppedAttributesCount || 0
        };
    }
    Ue.toOtlpSpanEvent = Q_;
});
var nh = c((oe)=>{
    "use strict";
    Object.defineProperty(oe, "__esModule", {
        value: !0
    });
    oe.getOtlpEncoder = oe.encodeAsString = oe.encodeAsLongBits = oe.toLongBits = oe.hrTimeToNanos = void 0;
    var Es = S(), qS = BigInt(1e9);
    function Pu(r) {
        return BigInt(r[0]) * qS + BigInt(r[1]);
    }
    oe.hrTimeToNanos = Pu;
    function eh(r) {
        let e = Number(BigInt.asUintN(32, r)), t = Number(BigInt.asUintN(32, r >> BigInt(32)));
        return {
            low: e,
            high: t
        };
    }
    oe.toLongBits = eh;
    function yu(r) {
        let e = Pu(r);
        return eh(e);
    }
    oe.encodeAsLongBits = yu;
    function th(r) {
        return Pu(r).toString();
    }
    oe.encodeAsString = th;
    var GS = typeof BigInt < "u" ? th : Es.hrTimeToNanoseconds;
    function J_(r) {
        return r;
    }
    function rh(r) {
        if (r !== void 0) return (0, Es.hexToBase64)(r);
    }
    var VS = {
        encodeHrTime: yu,
        encodeSpanContext: Es.hexToBase64,
        encodeOptionalSpanContext: rh
    };
    function jS(r) {
        var e, t;
        if (r === void 0) return VS;
        let n = (e = r.useLongBits) !== null && e !== void 0 ? e : !0, i = (t = r.useHex) !== null && t !== void 0 ? t : !1;
        return {
            encodeHrTime: n ? yu : GS,
            encodeSpanContext: i ? J_ : Es.hexToBase64,
            encodeOptionalSpanContext: i ? J_ : rh
        };
    }
    oe.getOtlpEncoder = jS;
});
var vu = c((ms)=>{
    "use strict";
    Object.defineProperty(ms, "__esModule", {
        value: !0
    });
    ms.createExportTraceServiceRequest = void 0;
    var FS = Ru(), HS = Z_(), kS = nh();
    function XS(r, e) {
        let t = (0, kS.getOtlpEncoder)(e);
        return {
            resourceSpans: WS(r, t)
        };
    }
    ms.createExportTraceServiceRequest = XS;
    function $S(r) {
        let e = new Map;
        for (let t of r){
            let n = e.get(t.resource);
            n || (n = new Map, e.set(t.resource, n));
            let i = `${t.instrumentationLibrary.name}@${t.instrumentationLibrary.version || ""}:${t.instrumentationLibrary.schemaUrl || ""}`, s = n.get(i);
            s || (s = [], n.set(i, s)), s.push(t);
        }
        return e;
    }
    function WS(r, e) {
        let t = $S(r), n = [], i = t.entries(), s = i.next();
        for(; !s.done;){
            let [o, a] = s.value, u = [], l = a.values(), _ = l.next();
            for(; !_.done;){
                let O = _.value;
                if (O.length > 0) {
                    let { name: D, version: z, schemaUrl: I } = O[0].instrumentationLibrary, U = O.map((L)=>(0, HS.sdkSpanToOtlpSpan)(L, e));
                    u.push({
                        scope: {
                            name: D,
                            version: z
                        },
                        spans: U,
                        schemaUrl: I
                    });
                }
                _ = l.next();
            }
            let E = {
                resource: {
                    attributes: (0, FS.toAttributes)(o.attributes),
                    droppedAttributesCount: 0
                },
                scopeSpans: u,
                schemaUrl: void 0
            };
            n.push(E), s = i.next();
        }
        return n;
    }
});
var oh = c((C)=>{
    "use strict";
    Object.defineProperty(C, "__esModule", {
        value: !0
    });
    C.parseRetryAfterToMills = C.isExportRetryable = C.invalidTimeout = C.configureExporterTimeout = C.appendRootPathToUrlIfNeeded = C.appendResourcePathToUrl = C.parseHeaders = C.DEFAULT_EXPORT_BACKOFF_MULTIPLIER = C.DEFAULT_EXPORT_MAX_BACKOFF = C.DEFAULT_EXPORT_INITIAL_BACKOFF = C.DEFAULT_EXPORT_MAX_ATTEMPTS = void 0;
    var Iu = (h(), f(d)), ih = S(), sh = 1e4;
    C.DEFAULT_EXPORT_MAX_ATTEMPTS = 5;
    C.DEFAULT_EXPORT_INITIAL_BACKOFF = 1e3;
    C.DEFAULT_EXPORT_MAX_BACKOFF = 5e3;
    C.DEFAULT_EXPORT_BACKOFF_MULTIPLIER = 1.5;
    function KS(r = {}) {
        let e = {};
        return Object.entries(r).forEach(([t, n])=>{
            typeof n < "u" ? e[t] = String(n) : Iu.diag.warn(`Header "${t}" has wrong value and will be ignored`);
        }), e;
    }
    C.parseHeaders = KS;
    function zS(r, e) {
        return r.endsWith("/") || (r = r + "/"), r + e;
    }
    C.appendResourcePathToUrl = zS;
    function YS(r) {
        try {
            let e = new URL(r);
            return e.pathname === "" && (e.pathname = e.pathname + "/"), e.toString();
        } catch  {
            return Iu.diag.warn(`Could not parse export URL: '${r}'`), r;
        }
    }
    C.appendRootPathToUrlIfNeeded = YS;
    function QS(r) {
        return typeof r == "number" ? r <= 0 ? Lu(r, sh) : r : ZS();
    }
    C.configureExporterTimeout = QS;
    function ZS() {
        var r;
        let e = Number((r = (0, ih.getEnv)().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && r !== void 0 ? r : (0, ih.getEnv)().OTEL_EXPORTER_OTLP_TIMEOUT);
        return e <= 0 ? Lu(e, sh) : e;
    }
    function Lu(r, e) {
        return Iu.diag.warn("Timeout must be greater than 0", r), e;
    }
    C.invalidTimeout = Lu;
    function JS(r) {
        return [
            429,
            502,
            503,
            504
        ].includes(r);
    }
    C.isExportRetryable = JS;
    function eA(r) {
        if (r == null) return -1;
        let e = Number.parseInt(r, 10);
        if (Number.isInteger(e)) return e > 0 ? e * 1e3 : -1;
        let t = new Date(r).getTime() - Date.now();
        return t >= 0 ? t : 0;
    }
    C.parseRetryAfterToMills = eA;
});
var uh = c((gs)=>{
    "use strict";
    Object.defineProperty(gs, "__esModule", {
        value: !0
    });
    gs.OTLPExporterBase = void 0;
    var ah = (h(), f(d)), xr = S(), tA = oh(), Mu = class {
        constructor(e = {}){
            this._sendingPromises = [], this.url = this.getDefaultUrl(e), typeof e.hostname == "string" && (this.hostname = e.hostname), this.shutdown = this.shutdown.bind(this), this._shutdownOnce = new xr.BindOnceFuture(this._shutdown, this), this._concurrencyLimit = typeof e.concurrencyLimit == "number" ? e.concurrencyLimit : 30, this.timeoutMillis = (0, tA.configureExporterTimeout)(e.timeoutMillis), this.onInit(e);
        }
        export(e, t) {
            if (this._shutdownOnce.isCalled) {
                t({
                    code: xr.ExportResultCode.FAILED,
                    error: new Error("Exporter has been shutdown")
                });
                return;
            }
            if (this._sendingPromises.length >= this._concurrencyLimit) {
                t({
                    code: xr.ExportResultCode.FAILED,
                    error: new Error("Concurrent export limit reached")
                });
                return;
            }
            this._export(e).then(()=>{
                t({
                    code: xr.ExportResultCode.SUCCESS
                });
            }).catch((n)=>{
                t({
                    code: xr.ExportResultCode.FAILED,
                    error: n
                });
            });
        }
        _export(e) {
            return new Promise((t, n)=>{
                try {
                    ah.diag.debug("items to be sent", e), this.send(e, t, n);
                } catch (i) {
                    n(i);
                }
            });
        }
        shutdown() {
            return this._shutdownOnce.call();
        }
        forceFlush() {
            return Promise.all(this._sendingPromises).then(()=>{});
        }
        _shutdown() {
            return ah.diag.debug("shutdown started"), this.onShutdown(), this.forceFlush();
        }
    };
    gs.OTLPExporterBase = Mu;
});
var _h = c((AP, dh)=>{
    "use strict";
    dh.exports = iA;
    function iA(r, e) {
        for(var t = new Array(arguments.length - 1), n = 0, i = 2, s = !0; i < arguments.length;)t[n++] = arguments[i++];
        return new Promise(function(a, u) {
            t[n] = function(_) {
                if (s) if (s = !1, _) u(_);
                else {
                    for(var E = new Array(arguments.length - 1), O = 0; O < E.length;)E[O++] = arguments[O];
                    a.apply(null, E);
                }
            };
            try {
                r.apply(e || null, t);
            } catch (l) {
                s && (s = !1, u(l));
            }
        });
    }
});
var Eh = c((fh)=>{
    "use strict";
    var Ss = fh;
    Ss.length = function(e) {
        var t = e.length;
        if (!t) return 0;
        for(var n = 0; --t % 4 > 1 && e.charAt(t) === "=";)++n;
        return Math.ceil(e.length * 3) / 4 - n;
    };
    var rr = new Array(64), ph = new Array(123);
    for(le = 0; le < 64;)ph[rr[le] = le < 26 ? le + 65 : le < 52 ? le + 71 : le < 62 ? le - 4 : le - 59 | 43] = le++;
    var le;
    Ss.encode = function(e, t, n) {
        for(var i = null, s = [], o = 0, a = 0, u; t < n;){
            var l = e[t++];
            switch(a){
                case 0:
                    s[o++] = rr[l >> 2], u = (l & 3) << 4, a = 1;
                    break;
                case 1:
                    s[o++] = rr[u | l >> 4], u = (l & 15) << 2, a = 2;
                    break;
                case 2:
                    s[o++] = rr[u | l >> 6], s[o++] = rr[l & 63], a = 0;
                    break;
            }
            o > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, s)), o = 0);
        }
        return a && (s[o++] = rr[u], s[o++] = 61, a === 1 && (s[o++] = 61)), i ? (o && i.push(String.fromCharCode.apply(String, s.slice(0, o))), i.join("")) : String.fromCharCode.apply(String, s.slice(0, o));
    };
    var hh = "invalid encoding";
    Ss.decode = function(e, t, n) {
        for(var i = n, s = 0, o, a = 0; a < e.length;){
            var u = e.charCodeAt(a++);
            if (u === 61 && s > 1) break;
            if ((u = ph[u]) === void 0) throw Error(hh);
            switch(s){
                case 0:
                    o = u, s = 1;
                    break;
                case 1:
                    t[n++] = o << 2 | (u & 48) >> 4, o = u, s = 2;
                    break;
                case 2:
                    t[n++] = (o & 15) << 4 | (u & 60) >> 2, o = u, s = 3;
                    break;
                case 3:
                    t[n++] = (o & 3) << 6 | u, s = 0;
                    break;
            }
        }
        if (s === 1) throw Error(hh);
        return n - i;
    };
    Ss.test = function(e) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);
    };
});
var gh = c((RP, mh)=>{
    "use strict";
    mh.exports = As;
    function As() {
        this._listeners = {};
    }
    As.prototype.on = function(e, t, n) {
        return (this._listeners[e] || (this._listeners[e] = [])).push({
            fn: t,
            ctx: n || this
        }), this;
    };
    As.prototype.off = function(e, t) {
        if (e === void 0) this._listeners = {};
        else if (t === void 0) this._listeners[e] = [];
        else for(var n = this._listeners[e], i = 0; i < n.length;)n[i].fn === t ? n.splice(i, 1) : ++i;
        return this;
    };
    As.prototype.emit = function(e) {
        var t = this._listeners[e];
        if (t) {
            for(var n = [], i = 1; i < arguments.length;)n.push(arguments[i++]);
            for(i = 0; i < t.length;)t[i].fn.apply(t[i++].ctx, n);
        }
        return this;
    };
});
var Ph = c((bP, bh)=>{
    "use strict";
    bh.exports = Th(Th);
    function Th(r) {
        return typeof Float32Array < "u" ? function() {
            var e = new Float32Array([
                -0
            ]), t = new Uint8Array(e.buffer), n = t[3] === 128;
            function i(u, l, _) {
                e[0] = u, l[_] = t[0], l[_ + 1] = t[1], l[_ + 2] = t[2], l[_ + 3] = t[3];
            }
            function s(u, l, _) {
                e[0] = u, l[_] = t[3], l[_ + 1] = t[2], l[_ + 2] = t[1], l[_ + 3] = t[0];
            }
            r.writeFloatLE = n ? i : s, r.writeFloatBE = n ? s : i;
            function o(u, l) {
                return t[0] = u[l], t[1] = u[l + 1], t[2] = u[l + 2], t[3] = u[l + 3], e[0];
            }
            function a(u, l) {
                return t[3] = u[l], t[2] = u[l + 1], t[1] = u[l + 2], t[0] = u[l + 3], e[0];
            }
            r.readFloatLE = n ? o : a, r.readFloatBE = n ? a : o;
        }() : function() {
            function e(n, i, s, o) {
                var a = i < 0 ? 1 : 0;
                if (a && (i = -i), i === 0) n(1 / i > 0 ? 0 : 2147483648, s, o);
                else if (isNaN(i)) n(2143289344, s, o);
                else if (i > 34028234663852886e22) n((a << 31 | 2139095040) >>> 0, s, o);
                else if (i < 11754943508222875e-54) n((a << 31 | Math.round(i / 1401298464324817e-60)) >>> 0, s, o);
                else {
                    var u = Math.floor(Math.log(i) / Math.LN2), l = Math.round(i * Math.pow(2, -u) * 8388608) & 8388607;
                    n((a << 31 | u + 127 << 23 | l) >>> 0, s, o);
                }
            }
            r.writeFloatLE = e.bind(null, Sh), r.writeFloatBE = e.bind(null, Ah);
            function t(n, i, s) {
                var o = n(i, s), a = (o >> 31) * 2 + 1, u = o >>> 23 & 255, l = o & 8388607;
                return u === 255 ? l ? NaN : a * (1 / 0) : u === 0 ? a * 1401298464324817e-60 * l : a * Math.pow(2, u - 150) * (l + 8388608);
            }
            r.readFloatLE = t.bind(null, Oh), r.readFloatBE = t.bind(null, Rh);
        }(), typeof Float64Array < "u" ? function() {
            var e = new Float64Array([
                -0
            ]), t = new Uint8Array(e.buffer), n = t[7] === 128;
            function i(u, l, _) {
                e[0] = u, l[_] = t[0], l[_ + 1] = t[1], l[_ + 2] = t[2], l[_ + 3] = t[3], l[_ + 4] = t[4], l[_ + 5] = t[5], l[_ + 6] = t[6], l[_ + 7] = t[7];
            }
            function s(u, l, _) {
                e[0] = u, l[_] = t[7], l[_ + 1] = t[6], l[_ + 2] = t[5], l[_ + 3] = t[4], l[_ + 4] = t[3], l[_ + 5] = t[2], l[_ + 6] = t[1], l[_ + 7] = t[0];
            }
            r.writeDoubleLE = n ? i : s, r.writeDoubleBE = n ? s : i;
            function o(u, l) {
                return t[0] = u[l], t[1] = u[l + 1], t[2] = u[l + 2], t[3] = u[l + 3], t[4] = u[l + 4], t[5] = u[l + 5], t[6] = u[l + 6], t[7] = u[l + 7], e[0];
            }
            function a(u, l) {
                return t[7] = u[l], t[6] = u[l + 1], t[5] = u[l + 2], t[4] = u[l + 3], t[3] = u[l + 4], t[2] = u[l + 5], t[1] = u[l + 6], t[0] = u[l + 7], e[0];
            }
            r.readDoubleLE = n ? o : a, r.readDoubleBE = n ? a : o;
        }() : function() {
            function e(n, i, s, o, a, u) {
                var l = o < 0 ? 1 : 0;
                if (l && (o = -o), o === 0) n(0, a, u + i), n(1 / o > 0 ? 0 : 2147483648, a, u + s);
                else if (isNaN(o)) n(0, a, u + i), n(2146959360, a, u + s);
                else if (o > 17976931348623157e292) n(0, a, u + i), n((l << 31 | 2146435072) >>> 0, a, u + s);
                else {
                    var _;
                    if (o < 22250738585072014e-324) _ = o / 5e-324, n(_ >>> 0, a, u + i), n((l << 31 | _ / 4294967296) >>> 0, a, u + s);
                    else {
                        var E = Math.floor(Math.log(o) / Math.LN2);
                        E === 1024 && (E = 1023), _ = o * Math.pow(2, -E), n(_ * 4503599627370496 >>> 0, a, u + i), n((l << 31 | E + 1023 << 20 | _ * 1048576 & 1048575) >>> 0, a, u + s);
                    }
                }
            }
            r.writeDoubleLE = e.bind(null, Sh, 0, 4), r.writeDoubleBE = e.bind(null, Ah, 4, 0);
            function t(n, i, s, o, a) {
                var u = n(o, a + i), l = n(o, a + s), _ = (l >> 31) * 2 + 1, E = l >>> 20 & 2047, O = 4294967296 * (l & 1048575) + u;
                return E === 2047 ? O ? NaN : _ * (1 / 0) : E === 0 ? _ * 5e-324 * O : _ * Math.pow(2, E - 1075) * (O + 4503599627370496);
            }
            r.readDoubleLE = t.bind(null, Oh, 0, 4), r.readDoubleBE = t.bind(null, Rh, 4, 0);
        }(), r;
    }
    function Sh(r, e, t) {
        e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24;
    }
    function Ah(r, e, t) {
        e[t] = r >>> 24, e[t + 1] = r >>> 16 & 255, e[t + 2] = r >>> 8 & 255, e[t + 3] = r & 255;
    }
    function Oh(r, e) {
        return (r[e] | r[e + 1] << 8 | r[e + 2] << 16 | r[e + 3] << 24) >>> 0;
    }
    function Rh(r, e) {
        return (r[e] << 24 | r[e + 1] << 16 | r[e + 2] << 8 | r[e + 3]) >>> 0;
    }
});
var yh = c((exports, module)=>{
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
        try {
            var mod = eval("quire".replace(/^/, "re"))(moduleName);
            if (mod && (mod.length || Object.keys(mod).length)) return mod;
        } catch (r) {}
        return null;
    }
});
var Ih = c((vh)=>{
    "use strict";
    var Nu = vh;
    Nu.length = function(e) {
        for(var t = 0, n = 0, i = 0; i < e.length; ++i)n = e.charCodeAt(i), n < 128 ? t += 1 : n < 2048 ? t += 2 : (n & 64512) === 55296 && (e.charCodeAt(i + 1) & 64512) === 56320 ? (++i, t += 4) : t += 3;
        return t;
    };
    Nu.read = function(e, t, n) {
        var i = n - t;
        if (i < 1) return "";
        for(var s = null, o = [], a = 0, u; t < n;)u = e[t++], u < 128 ? o[a++] = u : u > 191 && u < 224 ? o[a++] = (u & 31) << 6 | e[t++] & 63 : u > 239 && u < 365 ? (u = ((u & 7) << 18 | (e[t++] & 63) << 12 | (e[t++] & 63) << 6 | e[t++] & 63) - 65536, o[a++] = 55296 + (u >> 10), o[a++] = 56320 + (u & 1023)) : o[a++] = (u & 15) << 12 | (e[t++] & 63) << 6 | e[t++] & 63, a > 8191 && ((s || (s = [])).push(String.fromCharCode.apply(String, o)), a = 0);
        return s ? (a && s.push(String.fromCharCode.apply(String, o.slice(0, a))), s.join("")) : String.fromCharCode.apply(String, o.slice(0, a));
    };
    Nu.write = function(e, t, n) {
        for(var i = n, s, o, a = 0; a < e.length; ++a)s = e.charCodeAt(a), s < 128 ? t[n++] = s : s < 2048 ? (t[n++] = s >> 6 | 192, t[n++] = s & 63 | 128) : (s & 64512) === 55296 && ((o = e.charCodeAt(a + 1)) & 64512) === 56320 ? (s = 65536 + ((s & 1023) << 10) + (o & 1023), ++a, t[n++] = s >> 18 | 240, t[n++] = s >> 12 & 63 | 128, t[n++] = s >> 6 & 63 | 128, t[n++] = s & 63 | 128) : (t[n++] = s >> 12 | 224, t[n++] = s >> 6 & 63 | 128, t[n++] = s & 63 | 128);
        return n - i;
    };
});
var Mh = c((yP, Lh)=>{
    "use strict";
    Lh.exports = sA;
    function sA(r, e, t) {
        var n = t || 8192, i = n >>> 1, s = null, o = n;
        return function(u) {
            if (u < 1 || u > i) return r(u);
            o + u > n && (s = r(n), o = 0);
            var l = e.call(s, o, o += u);
            return o & 7 && (o = (o | 7) + 1), l;
        };
    }
});
var Nh = c((vP, Ch)=>{
    "use strict";
    Ch.exports = V;
    var Dr = Ge();
    function V(r, e) {
        this.lo = r >>> 0, this.hi = e >>> 0;
    }
    var ut = V.zero = new V(0, 0);
    ut.toNumber = function() {
        return 0;
    };
    ut.zzEncode = ut.zzDecode = function() {
        return this;
    };
    ut.length = function() {
        return 1;
    };
    var oA = V.zeroHash = "\0\0\0\0\0\0\0\0";
    V.fromNumber = function(e) {
        if (e === 0) return ut;
        var t = e < 0;
        t && (e = -e);
        var n = e >>> 0, i = (e - n) / 4294967296 >>> 0;
        return t && (i = ~i >>> 0, n = ~n >>> 0, ++n > 4294967295 && (n = 0, ++i > 4294967295 && (i = 0))), new V(n, i);
    };
    V.from = function(e) {
        if (typeof e == "number") return V.fromNumber(e);
        if (Dr.isString(e)) if (Dr.Long) e = Dr.Long.fromString(e);
        else return V.fromNumber(parseInt(e, 10));
        return e.low || e.high ? new V(e.low >>> 0, e.high >>> 0) : ut;
    };
    V.prototype.toNumber = function(e) {
        if (!e && this.hi >>> 31) {
            var t = ~this.lo + 1 >>> 0, n = ~this.hi >>> 0;
            return t || (n = n + 1 >>> 0), -(t + n * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
    };
    V.prototype.toLong = function(e) {
        return Dr.Long ? new Dr.Long(this.lo | 0, this.hi | 0, !!e) : {
            low: this.lo | 0,
            high: this.hi | 0,
            unsigned: !!e
        };
    };
    var qe = String.prototype.charCodeAt;
    V.fromHash = function(e) {
        return e === oA ? ut : new V((qe.call(e, 0) | qe.call(e, 1) << 8 | qe.call(e, 2) << 16 | qe.call(e, 3) << 24) >>> 0, (qe.call(e, 4) | qe.call(e, 5) << 8 | qe.call(e, 6) << 16 | qe.call(e, 7) << 24) >>> 0);
    };
    V.prototype.toHash = function() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    V.prototype.zzEncode = function() {
        var e = this.hi >> 31;
        return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this;
    };
    V.prototype.zzDecode = function() {
        var e = -(this.lo & 1);
        return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this;
    };
    V.prototype.length = function() {
        var e = this.lo, t = (this.lo >>> 28 | this.hi << 4) >>> 0, n = this.hi >>> 24;
        return n === 0 ? t === 0 ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : n < 128 ? 9 : 10;
    };
});
var Ge = c((wu)=>{
    "use strict";
    var p = wu;
    p.asPromise = _h();
    p.base64 = Eh();
    p.EventEmitter = gh();
    p.float = Ph();
    p.inquire = yh();
    p.utf8 = Ih();
    p.pool = Mh();
    p.LongBits = Nh();
    p.isNode = !!(typeof global < "u" && global && global.process && global.process.versions && global.process.versions.node);
    p.global = p.isNode && global || typeof window < "u" && window || typeof self < "u" && self || wu;
    p.emptyArray = Object.freeze ? Object.freeze([]) : [];
    p.emptyObject = Object.freeze ? Object.freeze({}) : {};
    p.isInteger = Number.isInteger || function(e) {
        return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
    };
    p.isString = function(e) {
        return typeof e == "string" || e instanceof String;
    };
    p.isObject = function(e) {
        return e && typeof e == "object";
    };
    p.isset = p.isSet = function(e, t) {
        var n = e[t];
        return n != null && e.hasOwnProperty(t) ? typeof n != "object" || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0 : !1;
    };
    p.Buffer = function() {
        try {
            var r = p.inquire("buffer").Buffer;
            return r.prototype.utf8Write ? r : null;
        } catch  {
            return null;
        }
    }();
    p._Buffer_from = null;
    p._Buffer_allocUnsafe = null;
    p.newBuffer = function(e) {
        return typeof e == "number" ? p.Buffer ? p._Buffer_allocUnsafe(e) : new p.Array(e) : p.Buffer ? p._Buffer_from(e) : typeof Uint8Array > "u" ? e : new Uint8Array(e);
    };
    p.Array = typeof Uint8Array < "u" ? Uint8Array : Array;
    p.Long = p.global.dcodeIO && p.global.dcodeIO.Long || p.global.Long || p.inquire("long");
    p.key2Re = /^true|false|0|1$/;
    p.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    p.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    p.longToHash = function(e) {
        return e ? p.LongBits.from(e).toHash() : p.LongBits.zeroHash;
    };
    p.longFromHash = function(e, t) {
        var n = p.LongBits.fromHash(e);
        return p.Long ? p.Long.fromBits(n.lo, n.hi, t) : n.toNumber(!!t);
    };
    function wh(r, e, t) {
        for(var n = Object.keys(e), i = 0; i < n.length; ++i)(r[n[i]] === void 0 || !t) && (r[n[i]] = e[n[i]]);
        return r;
    }
    p.merge = wh;
    p.lcFirst = function(e) {
        return e.charAt(0).toLowerCase() + e.substring(1);
    };
    function xh(r) {
        function e(t, n) {
            if (!(this instanceof e)) return new e(t, n);
            Object.defineProperty(this, "message", {
                get: function() {
                    return t;
                }
            }), Error.captureStackTrace ? Error.captureStackTrace(this, e) : Object.defineProperty(this, "stack", {
                value: new Error().stack || ""
            }), n && wh(this, n);
        }
        return e.prototype = Object.create(Error.prototype, {
            constructor: {
                value: e,
                writable: !0,
                enumerable: !1,
                configurable: !0
            },
            name: {
                get: function() {
                    return r;
                },
                set: void 0,
                enumerable: !1,
                configurable: !0
            },
            toString: {
                value: function() {
                    return this.name + ": " + this.message;
                },
                writable: !0,
                enumerable: !1,
                configurable: !0
            }
        }), e;
    }
    p.newError = xh;
    p.ProtocolError = xh("ProtocolError");
    p.oneOfGetter = function(e) {
        for(var t = {}, n = 0; n < e.length; ++n)t[e[n]] = 1;
        return function() {
            for(var i = Object.keys(this), s = i.length - 1; s > -1; --s)if (t[i[s]] === 1 && this[i[s]] !== void 0 && this[i[s]] !== null) return i[s];
        };
    };
    p.oneOfSetter = function(e) {
        return function(t) {
            for(var n = 0; n < e.length; ++n)e[n] !== t && delete this[e[n]];
        };
    };
    p.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0
    };
    p._configure = function() {
        var r = p.Buffer;
        if (!r) {
            p._Buffer_from = p._Buffer_allocUnsafe = null;
            return;
        }
        p._Buffer_from = r.from !== Uint8Array.from && r.from || function(t, n) {
            return new r(t, n);
        }, p._Buffer_allocUnsafe = r.allocUnsafe || function(t) {
            return new r(t);
        };
    };
});
var Vu = c((LP, qh)=>{
    "use strict";
    qh.exports = A;
    var ae = Ge(), xu, Os = ae.LongBits, Dh = ae.base64, Bh = ae.utf8;
    function Br(r, e, t) {
        this.fn = r, this.len = e, this.next = void 0, this.val = t;
    }
    function Bu() {}
    function aA(r) {
        this.head = r.head, this.tail = r.tail, this.len = r.len, this.next = r.states;
    }
    function A() {
        this.len = 0, this.head = new Br(Bu, 0, 0), this.tail = this.head, this.states = null;
    }
    var Uh = function() {
        return ae.Buffer ? function() {
            return (A.create = function() {
                return new xu;
            })();
        } : function() {
            return new A;
        };
    };
    A.create = Uh();
    A.alloc = function(e) {
        return new ae.Array(e);
    };
    ae.Array !== Array && (A.alloc = ae.pool(A.alloc, ae.Array.prototype.subarray));
    A.prototype._push = function(e, t, n) {
        return this.tail = this.tail.next = new Br(e, t, n), this.len += t, this;
    };
    function Uu(r, e, t) {
        e[t] = r & 255;
    }
    function uA(r, e, t) {
        for(; r > 127;)e[t++] = r & 127 | 128, r >>>= 7;
        e[t] = r;
    }
    function qu(r, e) {
        this.len = r, this.next = void 0, this.val = e;
    }
    qu.prototype = Object.create(Br.prototype);
    qu.prototype.fn = uA;
    A.prototype.uint32 = function(e) {
        return this.len += (this.tail = this.tail.next = new qu((e = e >>> 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this;
    };
    A.prototype.int32 = function(e) {
        return e < 0 ? this._push(Gu, 10, Os.fromNumber(e)) : this.uint32(e);
    };
    A.prototype.sint32 = function(e) {
        return this.uint32((e << 1 ^ e >> 31) >>> 0);
    };
    function Gu(r, e, t) {
        for(; r.hi;)e[t++] = r.lo & 127 | 128, r.lo = (r.lo >>> 7 | r.hi << 25) >>> 0, r.hi >>>= 7;
        for(; r.lo > 127;)e[t++] = r.lo & 127 | 128, r.lo = r.lo >>> 7;
        e[t++] = r.lo;
    }
    A.prototype.uint64 = function(e) {
        var t = Os.from(e);
        return this._push(Gu, t.length(), t);
    };
    A.prototype.int64 = A.prototype.uint64;
    A.prototype.sint64 = function(e) {
        var t = Os.from(e).zzEncode();
        return this._push(Gu, t.length(), t);
    };
    A.prototype.bool = function(e) {
        return this._push(Uu, 1, e ? 1 : 0);
    };
    function Du(r, e, t) {
        e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24;
    }
    A.prototype.fixed32 = function(e) {
        return this._push(Du, 4, e >>> 0);
    };
    A.prototype.sfixed32 = A.prototype.fixed32;
    A.prototype.fixed64 = function(e) {
        var t = Os.from(e);
        return this._push(Du, 4, t.lo)._push(Du, 4, t.hi);
    };
    A.prototype.sfixed64 = A.prototype.fixed64;
    A.prototype.float = function(e) {
        return this._push(ae.float.writeFloatLE, 4, e);
    };
    A.prototype.double = function(e) {
        return this._push(ae.float.writeDoubleLE, 8, e);
    };
    var cA = ae.Array.prototype.set ? function(e, t, n) {
        t.set(e, n);
    } : function(e, t, n) {
        for(var i = 0; i < e.length; ++i)t[n + i] = e[i];
    };
    A.prototype.bytes = function(e) {
        var t = e.length >>> 0;
        if (!t) return this._push(Uu, 1, 0);
        if (ae.isString(e)) {
            var n = A.alloc(t = Dh.length(e));
            Dh.decode(e, n, 0), e = n;
        }
        return this.uint32(t)._push(cA, t, e);
    };
    A.prototype.string = function(e) {
        var t = Bh.length(e);
        return t ? this.uint32(t)._push(Bh.write, t, e) : this._push(Uu, 1, 0);
    };
    A.prototype.fork = function() {
        return this.states = new aA(this), this.head = this.tail = new Br(Bu, 0, 0), this.len = 0, this;
    };
    A.prototype.reset = function() {
        return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new Br(Bu, 0, 0), this.len = 0), this;
    };
    A.prototype.ldelim = function() {
        var e = this.head, t = this.tail, n = this.len;
        return this.reset().uint32(n), n && (this.tail.next = e.next, this.tail = t, this.len += n), this;
    };
    A.prototype.finish = function() {
        for(var e = this.head.next, t = this.constructor.alloc(this.len), n = 0; e;)e.fn(e.val, t, n), n += e.len, e = e.next;
        return t;
    };
    A._configure = function(r) {
        xu = r, A.create = Uh(), xu._configure();
    };
});
var jh = c((MP, Vh)=>{
    "use strict";
    Vh.exports = Te;
    var Gh = Vu();
    (Te.prototype = Object.create(Gh.prototype)).constructor = Te;
    var Ve = Ge();
    function Te() {
        Gh.call(this);
    }
    Te._configure = function() {
        Te.alloc = Ve._Buffer_allocUnsafe, Te.writeBytesBuffer = Ve.Buffer && Ve.Buffer.prototype instanceof Uint8Array && Ve.Buffer.prototype.set.name === "set" ? function(e, t, n) {
            t.set(e, n);
        } : function(e, t, n) {
            if (e.copy) e.copy(t, n, 0, e.length);
            else for(var i = 0; i < e.length;)t[n++] = e[i++];
        };
    };
    Te.prototype.bytes = function(e) {
        Ve.isString(e) && (e = Ve._Buffer_from(e, "base64"));
        var t = e.length >>> 0;
        return this.uint32(t), t && this._push(Te.writeBytesBuffer, t, e), this;
    };
    function lA(r, e, t) {
        r.length < 40 ? Ve.utf8.write(r, e, t) : e.utf8Write ? e.utf8Write(r, t) : e.write(r, t);
    }
    Te.prototype.string = function(e) {
        var t = Ve.Buffer.byteLength(e);
        return this.uint32(t), t && this._push(lA, t, e), this;
    };
    Te._configure();
});
var Hu = c((CP, $h)=>{
    "use strict";
    $h.exports = w;
    var de = Ge(), Fu, kh = de.LongBits, dA = de.utf8;
    function _e(r, e) {
        return RangeError("index out of range: " + r.pos + " + " + (e || 1) + " > " + r.len);
    }
    function w(r) {
        this.buf = r, this.pos = 0, this.len = r.length;
    }
    var Fh = typeof Uint8Array < "u" ? function(e) {
        if (e instanceof Uint8Array || Array.isArray(e)) return new w(e);
        throw Error("illegal buffer");
    } : function(e) {
        if (Array.isArray(e)) return new w(e);
        throw Error("illegal buffer");
    }, Xh = function() {
        return de.Buffer ? function(t) {
            return (w.create = function(i) {
                return de.Buffer.isBuffer(i) ? new Fu(i) : Fh(i);
            })(t);
        } : Fh;
    };
    w.create = Xh();
    w.prototype._slice = de.Array.prototype.subarray || de.Array.prototype.slice;
    w.prototype.uint32 = function() {
        var e = 4294967295;
        return function() {
            if (e = (this.buf[this.pos] & 127) >>> 0, this.buf[this.pos++] < 128 || (e = (e | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) || (e = (e | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) || (e = (e | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) || (e = (e | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128)) return e;
            if ((this.pos += 5) > this.len) throw this.pos = this.len, _e(this, 10);
            return e;
        };
    }();
    w.prototype.int32 = function() {
        return this.uint32() | 0;
    };
    w.prototype.sint32 = function() {
        var e = this.uint32();
        return e >>> 1 ^ -(e & 1) | 0;
    };
    function ju() {
        var r = new kh(0, 0), e = 0;
        if (this.len - this.pos > 4) {
            for(; e < 4; ++e)if (r.lo = (r.lo | (this.buf[this.pos] & 127) << e * 7) >>> 0, this.buf[this.pos++] < 128) return r;
            if (r.lo = (r.lo | (this.buf[this.pos] & 127) << 28) >>> 0, r.hi = (r.hi | (this.buf[this.pos] & 127) >> 4) >>> 0, this.buf[this.pos++] < 128) return r;
            e = 0;
        } else {
            for(; e < 3; ++e){
                if (this.pos >= this.len) throw _e(this);
                if (r.lo = (r.lo | (this.buf[this.pos] & 127) << e * 7) >>> 0, this.buf[this.pos++] < 128) return r;
            }
            return r.lo = (r.lo | (this.buf[this.pos++] & 127) << e * 7) >>> 0, r;
        }
        if (this.len - this.pos > 4) {
            for(; e < 5; ++e)if (r.hi = (r.hi | (this.buf[this.pos] & 127) << e * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return r;
        } else for(; e < 5; ++e){
            if (this.pos >= this.len) throw _e(this);
            if (r.hi = (r.hi | (this.buf[this.pos] & 127) << e * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return r;
        }
        throw Error("invalid varint encoding");
    }
    w.prototype.bool = function() {
        return this.uint32() !== 0;
    };
    function Rs(r, e) {
        return (r[e - 4] | r[e - 3] << 8 | r[e - 2] << 16 | r[e - 1] << 24) >>> 0;
    }
    w.prototype.fixed32 = function() {
        if (this.pos + 4 > this.len) throw _e(this, 4);
        return Rs(this.buf, this.pos += 4);
    };
    w.prototype.sfixed32 = function() {
        if (this.pos + 4 > this.len) throw _e(this, 4);
        return Rs(this.buf, this.pos += 4) | 0;
    };
    function Hh() {
        if (this.pos + 8 > this.len) throw _e(this, 8);
        return new kh(Rs(this.buf, this.pos += 4), Rs(this.buf, this.pos += 4));
    }
    w.prototype.float = function() {
        if (this.pos + 4 > this.len) throw _e(this, 4);
        var e = de.float.readFloatLE(this.buf, this.pos);
        return this.pos += 4, e;
    };
    w.prototype.double = function() {
        if (this.pos + 8 > this.len) throw _e(this, 4);
        var e = de.float.readDoubleLE(this.buf, this.pos);
        return this.pos += 8, e;
    };
    w.prototype.bytes = function() {
        var e = this.uint32(), t = this.pos, n = this.pos + e;
        if (n > this.len) throw _e(this, e);
        if (this.pos += e, Array.isArray(this.buf)) return this.buf.slice(t, n);
        if (t === n) {
            var i = de.Buffer;
            return i ? i.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, t, n);
    };
    w.prototype.string = function() {
        var e = this.bytes();
        return dA.read(e, 0, e.length);
    };
    w.prototype.skip = function(e) {
        if (typeof e == "number") {
            if (this.pos + e > this.len) throw _e(this, e);
            this.pos += e;
        } else do if (this.pos >= this.len) throw _e(this);
        while (this.buf[this.pos++] & 128)
        return this;
    };
    w.prototype.skipType = function(r) {
        switch(r){
            case 0:
                this.skip();
                break;
            case 1:
                this.skip(8);
                break;
            case 2:
                this.skip(this.uint32());
                break;
            case 3:
                for(; (r = this.uint32() & 7) !== 4;)this.skipType(r);
                break;
            case 5:
                this.skip(4);
                break;
            default:
                throw Error("invalid wire type " + r + " at offset " + this.pos);
        }
        return this;
    };
    w._configure = function(r) {
        Fu = r, w.create = Xh(), Fu._configure();
        var e = de.Long ? "toLong" : "toNumber";
        de.merge(w.prototype, {
            int64: function() {
                return ju.call(this)[e](!1);
            },
            uint64: function() {
                return ju.call(this)[e](!0);
            },
            sint64: function() {
                return ju.call(this).zzDecode()[e](!1);
            },
            fixed64: function() {
                return Hh.call(this)[e](!0);
            },
            sfixed64: function() {
                return Hh.call(this)[e](!1);
            }
        });
    };
});
var Yh = c((NP, zh)=>{
    "use strict";
    zh.exports = ct;
    var Kh = Hu();
    (ct.prototype = Object.create(Kh.prototype)).constructor = ct;
    var Wh = Ge();
    function ct(r) {
        Kh.call(this, r);
    }
    ct._configure = function() {
        Wh.Buffer && (ct.prototype._slice = Wh.Buffer.prototype.slice);
    };
    ct.prototype.string = function() {
        var e = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e, this.len));
    };
    ct._configure();
});
var Zh = c((wP, Qh)=>{
    "use strict";
    Qh.exports = Ur;
    var ku = Ge();
    (Ur.prototype = Object.create(ku.EventEmitter.prototype)).constructor = Ur;
    function Ur(r, e, t) {
        if (typeof r != "function") throw TypeError("rpcImpl must be a function");
        ku.EventEmitter.call(this), this.rpcImpl = r, this.requestDelimited = !!e, this.responseDelimited = !!t;
    }
    Ur.prototype.rpcCall = function r(e, t, n, i, s) {
        if (!i) throw TypeError("request must be specified");
        var o = this;
        if (!s) return ku.asPromise(r, o, e, t, n, i);
        if (!o.rpcImpl) {
            setTimeout(function() {
                s(Error("already ended"));
            }, 0);
            return;
        }
        try {
            return o.rpcImpl(e, t[o.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function(u, l) {
                if (u) return o.emit("error", u, e), s(u);
                if (l === null) {
                    o.end(!0);
                    return;
                }
                if (!(l instanceof n)) try {
                    l = n[o.responseDelimited ? "decodeDelimited" : "decode"](l);
                } catch (_) {
                    return o.emit("error", _, e), s(_);
                }
                return o.emit("data", l, e), s(null, l);
            });
        } catch (a) {
            o.emit("error", a, e), setTimeout(function() {
                s(a);
            }, 0);
            return;
        }
    };
    Ur.prototype.end = function(e) {
        return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
    };
});
var ep = c((Jh)=>{
    "use strict";
    var _A = Jh;
    _A.Service = Zh();
});
var rp = c((DP, tp)=>{
    "use strict";
    tp.exports = {};
});
var sp = c((ip)=>{
    "use strict";
    var Z = ip;
    Z.build = "minimal";
    Z.Writer = Vu();
    Z.BufferWriter = jh();
    Z.Reader = Hu();
    Z.BufferReader = Yh();
    Z.util = Ge();
    Z.rpc = ep();
    Z.roots = rp();
    Z.configure = np;
    function np() {
        Z.util._configure(), Z.Writer._configure(Z.BufferWriter), Z.Reader._configure(Z.BufferReader);
    }
    np();
});
var ap = c((UP, op)=>{
    "use strict";
    op.exports = sp();
});
var N = K(zo(), 1);
h();
ea();
var Ep = K(Od(), 1), or = K(tt(), 1), mp = K(qd(), 1), gp = K(k_(), 1), Tp = K(ie(), 1), ar = K(Hr(), 1), Sp = K($_(), 1), he = K(S(), 1);
h();
var CS = Symbol.for("@vercel/request-context");
function Jt() {
    return globalThis[CS]?.get();
}
var Su = K(ie(), 1);
function ps(r) {
    return Object.fromEntries(Object.entries(r).filter(([e, t])=>t !== void 0));
}
function W_(r) {
    return r ? r.split("::").at(-1) : void 0;
}
function K_(r = Jt(), e) {
    if (!r) return;
    let t = e ? wS(e, r.headers) : void 0;
    return ps({
        [Su.SemanticAttributes.HTTP_HOST]: r.headers.host,
        [Su.SemanticAttributes.HTTP_USER_AGENT]: r.headers["user-agent"],
        "http.referer": r.headers.referer,
        "vercel.request_id": W_(r.headers["x-vercel-id"]),
        "vercel.matched_path": r.headers["x-matched-path"],
        "vercel.edge_region": r.headers["x-vercel-edge-region"],
        ...t
    });
}
var NS = {
    keys (r) {
        return [];
    },
    get (r, e) {
        return r[e.toLocaleLowerCase()];
    }
};
function wS(r, e) {
    if (typeof r == "function") return r(e, NS);
    let t = {};
    for (let [n, i] of Object.entries(r)){
        let s = e[i.toLocaleLowerCase()];
        s !== void 0 && (t[n] = s);
    }
    return t;
}
h();
function wr(r) {
    return (r & d.TraceFlags.SAMPLED) !== 0;
}
var fs = class {
    constructor(e, t){
        this.processors = e;
        this.attributesFromHeaders = t;
        this.rootSpanIds = new Map;
        this.waitSpanEnd = new Map;
    }
    forceFlush() {
        return Promise.all(this.processors.map((e)=>e.forceFlush().catch((t)=>{
                d.diag.error("@vercel/otel: forceFlush failed:", t);
            }))).then(()=>{});
    }
    shutdown() {
        return Promise.all(this.processors.map((e)=>e.shutdown().catch(()=>{}))).then(()=>{});
    }
    onStart(e, t) {
        let { traceId: n, spanId: i, traceFlags: s } = e.spanContext(), o = !e.parentSpanId || !this.rootSpanIds.has(n);
        if (o ? this.rootSpanIds.set(n, {
            rootSpanId: i,
            open: []
        }) : this.rootSpanIds.get(n)?.open.push(e), o && wr(s)) {
            let a = Jt(), u = K_(a, this.attributesFromHeaders);
            u && e.setAttributes(u), a && a.waitUntil(async ()=>{
                if (this.rootSpanIds.has(n)) {
                    let l = new Promise((E)=>{
                        this.waitSpanEnd.set(n, E);
                    }), _;
                    await Promise.race([
                        l,
                        new Promise((E)=>{
                            _ = setTimeout(()=>{
                                this.waitSpanEnd.delete(n), E(void 0);
                            }, 50);
                        })
                    ]), _ && clearTimeout(_);
                }
                return this.forceFlush();
            });
        }
        for (let a of this.processors)a.onStart(e, t);
    }
    onEnd(e) {
        let { traceId: t, spanId: n, traceFlags: i } = e.spanContext(), s = wr(i), o = this.rootSpanIds.get(t), a = o?.rootSpanId === n;
        if (s) {
            let u = DS(e);
            u && Object.assign(e.attributes, u);
        }
        if (a) {
            if (this.rootSpanIds.delete(t), o.open.length > 0) {
                for (let u of o.open)if (!u.ended && u.spanContext().spanId !== n) try {
                    u.end();
                } catch (l) {
                    d.diag.error("@vercel/otel: onEnd failed:", l);
                }
            }
        } else if (o) for(let u = 0; u < o.open.length; u++)o.open[u]?.spanContext().spanId === n && o.open.splice(u, 1);
        for (let u of this.processors)u.onEnd(e);
        if (a) {
            let u = this.waitSpanEnd.get(t);
            u && (this.waitSpanEnd.delete(t), u());
        }
    }
}, xS = {
    [d.SpanKind.INTERNAL]: "internal",
    [d.SpanKind.SERVER]: "server",
    [d.SpanKind.CLIENT]: "client",
    [d.SpanKind.PRODUCER]: "producer",
    [d.SpanKind.CONSUMER]: "consumer"
};
function DS(r) {
    let { kind: e, attributes: t } = r, { "operation.name": n, "resouce.name": i, "span.type": s, "next.span_type": o, "http.method": a, "http.route": u } = t;
    if (n) return;
    let l = i ?? (a && typeof a == "string" && u && typeof u == "string" ? `${a} ${u}` : u);
    if (r.kind === d.SpanKind.SERVER && a && u && typeof a == "string" && typeof u == "string") return {
        "operation.name": "web.request",
        "resource.name": l
    };
    let _ = r.instrumentationLibrary.name, E = o ?? s;
    if (E && typeof E == "string") {
        let O = z_(_, E);
        return u ? {
            "operation.name": O,
            "resource.name": l
        } : {
            "operation.name": O
        };
    }
    return {
        "operation.name": z_(_, e === d.SpanKind.INTERNAL ? "" : xS[e])
    };
}
function z_(r, e) {
    if (!r) return e;
    let t = r.replace(/[ @./]/g, "_");
    return t.startsWith("_") && (t = t.slice(1)), e ? `${t}.${e}` : t;
}
var lh = K(vu(), 1);
var ch = K(uh(), 1);
h();
var er = class extends ch.OTLPExporterBase {
    constructor(e = {}){
        super(e), e.headers && (this._headers = e.headers);
    }
    onShutdown() {
        d.diag.debug("@vercel/otel/otlp: onShutdown");
    }
    onInit() {
        d.diag.debug("@vercel/otel/otlp: onInit");
    }
    send(e, t, n) {
        if (this._shutdownOnce.isCalled) {
            d.diag.debug("@vercel/otel/otlp: Shutdown already started. Cannot send objects");
            return;
        }
        let i = this.convert(e), s, o, a;
        try {
            ({ body: s, contentType: o, headers: a } = this.toMessage(i));
        } catch (l) {
            d.diag.warn("@vercel/otel/otlp: no proto", l);
            return;
        }
        let u = fetch(this.url, {
            method: "POST",
            body: s,
            headers: {
                ...this._headers,
                ...a,
                "Content-Type": o,
                "User-Agent": "OTel-OTLP-Exporter-JavaScript/0.46.0"
            },
            next: {
                internal: !0
            }
        }).then((l)=>{
            d.diag.debug("@vercel/otel/otlp: onSuccess", l.status, l.statusText), t(), l.arrayBuffer().catch(()=>{});
        }).catch((l)=>{
            d.diag.error("@vercel/otel/otlp: onError", l), n(l);
        }).finally(()=>{
            let l = this._sendingPromises.indexOf(u);
            this._sendingPromises.splice(l, 1);
        });
        this._sendingPromises.push(u);
    }
    getDefaultUrl(e) {
        throw new Error("Method not implemented.");
    }
};
var rA = "v1/traces", nA = `http://localhost:4318/${rA}`;
function Ts(r) {
    return typeof r.url == "string" ? r.url : nA;
}
var tr = class {
    constructor(e = {}){
        this.impl = new Cu(e);
    }
    export(e, t) {
        this.impl.export(e, t);
    }
    shutdown() {
        return this.impl.shutdown();
    }
    forceFlush() {
        return this.impl.forceFlush();
    }
}, Cu = class extends er {
    convert(e) {
        return (0, lh.createExportTraceServiceRequest)(e, {
            useHex: !0,
            useLongBits: !1
        });
    }
    toMessage(e) {
        return {
            body: JSON.stringify(e),
            contentType: "application/json"
        };
    }
    getDefaultUrl(e) {
        return Ts(e);
    }
};
var dp = K(vu(), 1);
var up = K(ap(), 1);
function cp(r) {
    let e = new up.Writer;
    return hA(r, e), e.finish();
}
function hA(r, e) {
    if (r.resourceSpans != null && r.resourceSpans.length) for(let t = 0; t < r.resourceSpans.length; ++t)pA(r.resourceSpans[t], e.uint32(10).fork()).ldelim();
    return e;
}
function pA(r, e) {
    if (r.resource != null && fA(r.resource, e.uint32(10).fork()).ldelim(), r.scopeSpans != null && r.scopeSpans.length) for(let t = 0; t < r.scopeSpans.length; ++t)EA(r.scopeSpans[t], e.uint32(18).fork()).ldelim();
    return r.schemaUrl != null && e.uint32(26).string(r.schemaUrl), e;
}
function fA(r, e) {
    if (r.attributes != null && r.attributes.length) for(let t = 0; t < r.attributes.length; ++t)nr(r.attributes[t], e.uint32(10).fork()).ldelim();
    return r.droppedAttributesCount != null && e.uint32(16).uint32(r.droppedAttributesCount), e;
}
function EA(r, e) {
    if (r.scope != null && TA(r.scope, e.uint32(10).fork()).ldelim(), r.spans != null && r.spans.length) for(let t = 0; t < r.spans.length; ++t)SA(r.spans[t], e.uint32(18).fork()).ldelim();
    return r.schemaUrl != null && e.uint32(26).string(r.schemaUrl), e;
}
function nr(r, e) {
    return r.key != null && e.uint32(10).string(r.key), r.value != null && lp(r.value, e.uint32(18).fork()).ldelim(), e;
}
function lp(r, e) {
    return r.stringValue != null && e.uint32(10).string(r.stringValue), r.boolValue != null && e.uint32(16).bool(r.boolValue), r.intValue != null && e.uint32(24).int64(r.intValue), r.doubleValue != null && e.uint32(33).double(r.doubleValue), r.arrayValue != null && mA(r.arrayValue, e.uint32(42).fork()).ldelim(), r.kvlistValue != null && gA(r.kvlistValue, e.uint32(50).fork()).ldelim(), r.bytesValue != null && e.uint32(58).bytes(r.bytesValue), e;
}
function mA(r, e) {
    if (r.values != null && r.values.length) for(let t = 0; t < r.values.length; ++t)lp(r.values[t], e.uint32(10).fork()).ldelim();
    return e;
}
function gA(r, e) {
    if (r.values != null && r.values.length) for(let t = 0; t < r.values.length; ++t)nr(r.values[t], e.uint32(10).fork()).ldelim();
    return e;
}
function TA(r, e) {
    if (r.name != null && e.uint32(10).string(r.name), r.version != null && e.uint32(18).string(r.version), r.attributes != null && r.attributes.length) for(let t = 0; t < r.attributes.length; ++t)nr(r.attributes[t], e.uint32(26).fork()).ldelim();
    return r.droppedAttributesCount != null && e.uint32(32).uint32(r.droppedAttributesCount), e;
}
function SA(r, e) {
    if (r.traceId != null && e.uint32(10).bytes(r.traceId), r.spanId != null && e.uint32(18).bytes(r.spanId), r.traceState != null && e.uint32(26).string(r.traceState), r.parentSpanId != null && e.uint32(34).bytes(r.parentSpanId), r.name != null && e.uint32(42).string(r.name), r.kind != null && e.uint32(48).int32(r.kind), r.startTimeUnixNano != null && e.uint32(57).fixed64(r.startTimeUnixNano), r.endTimeUnixNano != null && e.uint32(65).fixed64(r.endTimeUnixNano), r.attributes != null && r.attributes.length) for(let t = 0; t < r.attributes.length; ++t)nr(r.attributes[t], e.uint32(74).fork()).ldelim();
    if (r.droppedAttributesCount != null && e.uint32(80).uint32(r.droppedAttributesCount), r.events != null && r.events.length) for(let t = 0; t < r.events.length; ++t)OA(r.events[t], e.uint32(90).fork()).ldelim();
    if (r.droppedEventsCount != null && e.uint32(96).uint32(r.droppedEventsCount), r.links != null && r.links.length) for(let t = 0; t < r.links.length; ++t)RA(r.links[t], e.uint32(106).fork()).ldelim();
    return r.droppedLinksCount != null && e.uint32(112).uint32(r.droppedLinksCount), r.status != null && AA(r.status, e.uint32(122).fork()).ldelim(), e;
}
function AA(r, e) {
    return r.message != null && e.uint32(18).string(r.message), r.code != null && e.uint32(24).int32(r.code), e;
}
function OA(r, e) {
    if (r.timeUnixNano != null && e.uint32(9).fixed64(r.timeUnixNano), r.name != null && e.uint32(18).string(r.name), r.attributes != null && r.attributes.length) for(let t = 0; t < r.attributes.length; ++t)nr(r.attributes[t], e.uint32(26).fork()).ldelim();
    return r.droppedAttributesCount != null && e.uint32(32).uint32(r.droppedAttributesCount), e;
}
function RA(r, e) {
    if (r.traceId != null && e.uint32(10).bytes(r.traceId), r.spanId != null && e.uint32(18).bytes(r.spanId), r.traceState != null && e.uint32(26).string(r.traceState), r.attributes != null && r.attributes.length) for(let t = 0; t < r.attributes.length; ++t)nr(r.attributes[t], e.uint32(34).fork()).ldelim();
    return r.droppedAttributesCount != null && e.uint32(40).uint32(r.droppedAttributesCount), e;
}
var lt = class {
    constructor(e = {}){
        this.impl = new Xu(e);
    }
    export(e, t) {
        this.impl.export(e, t);
    }
    shutdown() {
        return this.impl.shutdown();
    }
    forceFlush() {
        return this.impl.forceFlush();
    }
}, Xu = class extends er {
    convert(e) {
        return (0, dp.createExportTraceServiceRequest)(e, void 0);
    }
    toMessage(e) {
        return {
            body: cp(e),
            contentType: "application/x-protobuf",
            headers: {
                accept: "application/x-protobuf"
            }
        };
    }
    getDefaultUrl(e) {
        return Ts(e);
    }
};
h();
var be = K(ie(), 1);
function _p(r, e) {
    return r.replace(/\{(?<temp1>[^{}]+)\}/g, (t, n)=>{
        let i = e[n];
        return i !== void 0 ? String(i) : t;
    });
}
var ir = class {
    constructor(e = {}){
        this.instrumentationName = "@vercel/otel/fetch";
        this.instrumentationVersion = "1.0.0";
        this.config = e;
    }
    getConfig() {
        return this.config;
    }
    setConfig() {}
    setTracerProvider(e) {
        this.tracerProvider = e;
    }
    setMeterProvider() {}
    enable() {
        this.disable();
        let { tracerProvider: e } = this;
        if (!e) return;
        let t = e.getTracer(this.instrumentationName, this.instrumentationVersion), n = this.config.ignoreUrls ?? [], i = (I, U)=>{
            if (U?.opentelemetry?.ignore !== void 0) return U.opentelemetry.ignore;
            if (n.length === 0) return !1;
            let L = I.toString();
            return n.some((m)=>typeof m == "string" ? m === "*" ? !0 : L.startsWith(m) : m.test(L));
        }, s = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || null, o = process.env.VERCEL_BRANCH_URL || process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL || null, a = this.config.propagateContextUrls ?? [], u = this.config.dontPropagateContextUrls ?? [], l = this.config.resourceNameTemplate, { attributesFromRequestHeaders: _, attributesFromResponseHeaders: E } = this.config, O = (I, U)=>{
            if (U?.opentelemetry?.propagateContext) return U.opentelemetry.propagateContext;
            let L = I.toString();
            return u.length > 0 && u.some((m)=>typeof m == "string" ? m === "*" ? !0 : L.startsWith(m) : m.test(L)) ? !1 : s && I.protocol === "https:" && (I.host === s || I.host === o || I.host === Jt()?.headers.host) || !s && I.protocol === "http:" && I.hostname === "localhost" ? !0 : a.some((m)=>typeof m == "string" ? m === "*" ? !0 : L.startsWith(m) : m.test(L));
        };
        process.env.NEXT_OTEL_FETCH_DISABLED = "1";
        let D = globalThis.fetch;
        this.originalFetch = D;
        let z = async (I, U)=>{
            let L = U;
            if (L?.next?.internal) return D(I, L);
            let m = new Request(I instanceof Request ? I.clone() : I, L), Pe = new URL(m.url);
            if (i(Pe, L)) return D(I, L);
            let Ps = {
                [be.SemanticAttributes.HTTP_METHOD]: m.method,
                [be.SemanticAttributes.HTTP_URL]: m.url,
                [be.SemanticAttributes.HTTP_HOST]: Pe.host,
                [be.SemanticAttributes.HTTP_SCHEME]: Pe.protocol.replace(":", ""),
                [be.SemanticAttributes.NET_PEER_NAME]: Pe.hostname,
                [be.SemanticAttributes.NET_PEER_PORT]: Pe.port
            }, dt = l ? _p(l, Ps) : PA(m.url), Op = L?.opentelemetry?.spanName ?? `fetch ${m.method} ${m.url}`, Wu = d.context.active(), q = t.startSpan(Op, {
                kind: d.SpanKind.CLIENT,
                attributes: {
                    ...Ps,
                    "operation.name": `fetch.${m.method}`,
                    "resource.name": dt,
                    ...L?.opentelemetry?.attributes
                }
            }, Wu);
            if (!q.isRecording() || !wr(q.spanContext().traceFlags)) return q.end(), D(I, L);
            if (O(Pe, L)) {
                let _t = d.trace.setSpan(Wu, q);
                d.propagation.inject(_t, m.headers, bA);
            }
            _ && hp(q, _, m.headers);
            try {
                let _t = Date.now(), ye = await D(I, {
                    ...L,
                    headers: m.headers
                }), Rp = Date.now() - _t;
                return q.setAttribute(be.SemanticAttributes.HTTP_STATUS_CODE, ye.status), q.setAttribute("http.response_time", Rp), E && hp(q, E, ye.headers), ye.status >= 500 && $u(q, `Status: ${ye.status} (${ye.statusText})`), ye.body ? yA(ye).then((ys)=>{
                    q.isRecording() && (q.setAttribute(be.SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, ys), q.end());
                }, (ys)=>{
                    q.isRecording() && ($u(q, ys), q.end());
                }) : q.end(), ye;
            } catch (_t) {
                throw $u(q, _t), q.end(), _t;
            }
        };
        globalThis.fetch = z;
    }
    disable() {
        this.originalFetch && (globalThis.fetch = this.originalFetch);
    }
}, bA = {
    set (r, e, t) {
        r.set(e, t);
    }
};
function PA(r) {
    let e = r.indexOf("?");
    return e === -1 ? r : r.substring(0, e);
}
function yA(r) {
    let e = 0, n = r.clone().body?.getReader();
    if (!n) return Promise.resolve(0);
    let i = ()=>n.read().then(({ done: s, value: o })=>{
            if (!s) return e += o.byteLength, i();
        });
    return i().then(()=>e);
}
function $u(r, e) {
    if (e instanceof Error) r.recordException(e), r.setStatus({
        code: d.SpanStatusCode.ERROR,
        message: e.message
    });
    else {
        let t = String(e);
        r.setStatus({
            code: d.SpanStatusCode.ERROR,
            message: t
        });
    }
}
function hp(r, e, t) {
    for (let [n, i] of Object.entries(e)){
        let s = t.get(i);
        s !== null && r.setAttribute(n, s);
    }
}
var bs = class {
    constructor(e = {}){
        this.configuration = e;
    }
    start() {
        let e = vA(), t = (0, ar.getEnvWithoutDefaults)(), n = this.configuration, i = ("TURBOPACK compile-time value", "nodejs") || "nodejs", s = !!e.OTEL_SDK_DISABLED;
        if (t.OTEL_LOG_LEVEL && d.diag.setLogger(new d.DiagConsoleLogger, {
            logLevel: t.OTEL_LOG_LEVEL
        }), s) return;
        let o = n.idGenerator ?? new N.RandomIdGenerator, a = n.contextManager ?? new Sp.AsyncLocalStorageContextManager;
        a.enable(), this.contextManager = a;
        let u = e.OTEL_SERVICE_NAME || n.serviceName || "app", l = new or.Resource(ps({
            [Tp.SemanticResourceAttributes.SERVICE_NAME]: u,
            "node.ci": process.env.CI ? !0 : void 0,
            "node.env": ("TURBOPACK compile-time value", "development"),
            env: process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV,
            "vercel.region": process.env.VERCEL_REGION,
            "vercel.runtime": i,
            "vercel.sha": process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
            "vercel.host": process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || void 0,
            "vercel.branch_host": process.env.VERCEL_BRANCH_URL || process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL || void 0,
            ...n.attributes
        })), _ = n.resourceDetectors ?? [
            or.envDetectorSync
        ];
        if (n.autoDetectResources ?? !0) {
            let m = {
                detectors: _
            };
            l = l.merge((0, or.detectResourcesSync)(m));
        }
        let O = LA(n.propagators, e), D = MA(n.traceSampler, e), z = CA(n.spanProcessors, n, e);
        z.length === 0 && d.diag.warn("@vercel/otel: No span processors configured. No spans will be exported.");
        let I = n.spanLimits, U = new N.BasicTracerProvider({
            resource: l,
            idGenerator: o,
            sampler: D,
            spanLimits: I
        });
        if (U.addSpanProcessor(new fs(z, n.attributesFromHeaders)), U.register({
            contextManager: a,
            propagator: new he.CompositePropagator({
                propagators: O
            })
        }), this.tracerProvider = U, n.logRecordProcessor) {
            let m = new mp.LoggerProvider({
                resource: l
            });
            this.loggerProvider = m, m.addLogRecordProcessor(n.logRecordProcessor), it.logs.setGlobalLoggerProvider(m);
        }
        if (n.metricReader || n.views) {
            let m = new gp.MeterProvider({
                resource: l,
                views: n.views ?? []
            });
            n.metricReader && m.addMetricReader(n.metricReader), d.metrics.setGlobalMeterProvider(m), this.meterProvider = m;
        }
        let L = IA(n.instrumentations, n.instrumentationConfig);
        this.disableInstumentations = (0, Ep.registerInstrumentations)({
            instrumentations: L
        }), d.diag.info("@vercel/otel: started", u, i);
    }
    async shutdown() {
        let e = [];
        this.tracerProvider && e.push(this.tracerProvider.shutdown()), this.loggerProvider && e.push(this.loggerProvider.shutdown()), this.meterProvider && e.push(this.meterProvider.shutdown()), d.diag.info("@vercel/otel: shutting down", e.length, ("TURBOPACK compile-time value", "nodejs")), await Promise.all(e), this.contextManager && this.contextManager.disable();
        let { disableInstumentations: t } = this;
        t && t();
    }
};
function vA() {
    let r = (0, ar.parseEnvironment)(process.env);
    return {
        ...ar.DEFAULT_ENVIRONMENT,
        ...r
    };
}
function IA(r, e) {
    return (r ?? [
        "auto"
    ]).map((t)=>t === "auto" ? (d.diag.debug("@vercel/otel: Configure instrumentations: fetch", e?.fetch), [
            new ir(e?.fetch)
        ]) : t === "fetch" ? (d.diag.debug("@vercel/otel: Configure instrumentations: fetch", e?.fetch), new ir(e?.fetch)) : t).flat();
}
function LA(r, e) {
    let t = e.OTEL_PROPAGATORS && e.OTEL_PROPAGATORS.length > 0 ? e.OTEL_PROPAGATORS : void 0;
    return (r ?? t ?? [
        "auto"
    ]).map((n)=>{
        if (n === "none") return [];
        if (n === "auto") return d.diag.debug("@vercel/otel: Configure propagators: tracecontext, baggage"), [
            new he.W3CTraceContextPropagator,
            new he.W3CBaggagePropagator
        ];
        if (n === "tracecontext") return d.diag.debug("@vercel/otel: Configure propagator: tracecontext"), new he.W3CTraceContextPropagator;
        if (n === "baggage") return d.diag.debug("@vercel/otel: Configure propagator: baggage"), new he.W3CBaggagePropagator;
        if (typeof n == "string") throw new Error(`Unknown propagator: "${n}"`);
        return n;
    }).flat();
}
var pp = "always_on", sr = 1;
function MA(r, e) {
    if (r && typeof r != "string") return r;
    let t = r && r !== "auto" ? r : e.OTEL_TRACES_SAMPLER || pp;
    switch(d.diag.debug("@vercel/otel: Configure sampler: ", t), t){
        case "always_on":
            return new N.AlwaysOnSampler;
        case "always_off":
            return new N.AlwaysOffSampler;
        case "parentbased_always_on":
            return new N.ParentBasedSampler({
                root: new N.AlwaysOnSampler
            });
        case "parentbased_always_off":
            return new N.ParentBasedSampler({
                root: new N.AlwaysOffSampler
            });
        case "traceidratio":
            return new N.TraceIdRatioBasedSampler(fp(e));
        case "parentbased_traceidratio":
            return new N.ParentBasedSampler({
                root: new N.TraceIdRatioBasedSampler(fp(e))
            });
        default:
            return d.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER value "${String(e.OTEL_TRACES_SAMPLER)} invalid, defaulting to ${pp}".`), new N.AlwaysOnSampler;
    }
}
function fp(r) {
    if (r.OTEL_TRACES_SAMPLER_ARG === void 0 || r.OTEL_TRACES_SAMPLER_ARG === "") return d.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${sr}.`), sr;
    d.diag.debug("@vercel/otel: Configure sampler probability: ", r.OTEL_TRACES_SAMPLER_ARG);
    let e = Number(r.OTEL_TRACES_SAMPLER_ARG);
    return isNaN(e) ? (d.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER_ARG=${r.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${sr}.`), sr) : e < 0 || e > 1 ? (d.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER_ARG=${r.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${sr}.`), sr) : e;
}
function CA(r, e, t) {
    return [
        ...(r ?? [
            "auto"
        ]).map((n)=>{
            if (n === "auto") {
                if (process.env.VERCEL_OTEL_ENDPOINTS) {
                    let i = process.env.VERCEL_OTEL_ENDPOINTS_PORT || "4318", s = process.env.VERCEL_OTEL_ENDPOINTS_PROTOCOL || "http/protobuf";
                    d.diag.debug("@vercel/otel: Configure vercel otel collector on port: ", i, s);
                    let o = {
                        url: `http://localhost:${i}/v1/traces`,
                        headers: {}
                    }, a = s === "http/protobuf" ? new lt(o) : new tr(o);
                    return new N.BatchSpanProcessor(a);
                }
                return !e.traceExporter || e.traceExporter === "auto" || t.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || t.OTEL_EXPORTER_OTLP_ENDPOINT ? new N.BatchSpanProcessor(NA(t)) : void 0;
            }
            return n;
        }).filter(DA),
        ...e.traceExporter && e.traceExporter !== "auto" ? [
            new N.BatchSpanProcessor(e.traceExporter)
        ] : []
    ];
}
function NA(r) {
    let e = process.env.OTEL_EXPORTER_OTLP_TRACES_PROTOCOL ?? process.env.OTEL_EXPORTER_OTLP_PROTOCOL ?? "http/protobuf", t = xA(r), n = {
        ...he.baggageUtils.parseKeyPairsIntoRecord(r.OTEL_EXPORTER_OTLP_HEADERS),
        ...he.baggageUtils.parseKeyPairsIntoRecord(r.OTEL_EXPORTER_OTLP_TRACES_HEADERS)
    };
    switch(d.diag.debug("@vercel/otel: Configure trace exporter: ", e, t, `headers: ${Object.keys(n).join(",") || "<none>"}`), e){
        case "http/json":
            return new tr({
                url: t,
                headers: n
            });
        case "http/protobuf":
            return new lt({
                url: t,
                headers: n
            });
        default:
            return d.diag.warn(`@vercel/otel: Unsupported OTLP traces protocol: ${e}. Using http/protobuf.`), new lt;
    }
}
var Ap = "v1/traces", wA = `http://localhost:4318/${Ap}`;
function xA(r) {
    let e = r.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
    if (e && typeof e == "string") return e;
    let t = r.OTEL_EXPORTER_OTLP_ENDPOINT;
    return t && typeof t == "string" ? `${t}/${Ap}` : wA;
}
function DA(r) {
    return r != null;
}
function iy(r) {
    let e;
    r ? typeof r == "string" ? e = {
        serviceName: r
    } : e = r : e = {}, new bs(e).start();
}
;

})()),

};

//# sourceMappingURL=08b5e__pnpm_37f87b._.js.map