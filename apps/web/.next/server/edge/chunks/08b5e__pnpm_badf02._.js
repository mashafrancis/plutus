(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/08b5e__pnpm_badf02._.js", {

"[project]/node_modules/.pnpm/next@14.3.0-canary.64_@babel+core@7.24.5_@opentelemetry+api@1.8.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

(()=>{
    "use strict";
    var e = {
        491: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(223);
            const a = r(172);
            const o = r(930);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(56);
            const a = r(912);
            const o = r(957);
            const i = r(172);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        653: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(660);
            const a = r(172);
            const o = r(930);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        181: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(172);
            const a = r(874);
            const o = r(194);
            const i = r(277);
            const c = r(369);
            const s = r(930);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        997: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(172);
            const a = r(846);
            const o = r(139);
            const i = r(607);
            const c = r(930);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        277: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(491);
            const a = r(780);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        993: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        830: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        369: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(930);
            const a = r(993);
            const o = r(830);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        67: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(491);
            t.context = n.ContextAPI.getInstance();
        },
        223: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(780);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        780: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        506: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(930);
            t.diag = n.DiagAPI.instance();
        },
        56: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(172);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        972: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        912: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(957);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        957: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        172: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(200);
            const a = r(521);
            const o = r(130);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        130: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(521);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        886: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(653);
            t.metrics = n.MetricsAPI.getInstance();
        },
        901: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        102: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        660: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(102);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        200: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(46), t);
        },
        651: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : global;
        },
        46: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(651), t);
        },
        939: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(181);
            t.propagation = n.PropagationAPI.getInstance();
        },
        874: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        194: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        845: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(997);
            t.trace = n.TraceAPI.getInstance();
        },
        403: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(476);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        614: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(491);
            const a = r(607);
            const o = r(403);
            const i = r(139);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        124: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(614);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        125: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(614);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        846: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(125);
            const a = r(124);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        996: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        607: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(780);
            const a = r(403);
            const o = r(491);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        325: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(564);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        564: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        98: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(325);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        476: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(475);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        357: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        139: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(476);
            const a = r(403);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        847: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        475: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        521: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.6.0";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(369);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(780);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(972);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(957);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(102);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(901);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(194);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(125);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(846);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(996);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(357);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(847);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(475);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(98);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(139);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(476);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(67);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(506);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(886);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(939);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(845);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();

}.call(this) }),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/platform/browser/globalThis.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
 */ // Updates to this file should also be replicated to @opentelemetry/api and
// @opentelemetry/core too.
/**
 * - globalThis (New standard)
 * - self (Will return the current window instance for supported browsers)
 * - window (fallback for older browser implementations)
 * - global (NodeJS implementation)
 * - <object> (When all else fails)
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins, no-undef
__turbopack_esm__({
    "_globalThis": ()=>_globalThis
});
var _globalThis = typeof globalThis === 'object' ? globalThis : typeof self === 'object' ? self : typeof window === 'object' ? window : typeof global === 'object' ? global : {}; //# sourceMappingURL=globalThis.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$platform$2f$browser$2f$globalThis$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/platform/browser/globalThis.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var GLOBAL_LOGS_API_KEY = Symbol.for('io.opentelemetry.js.api.logs');
var _global = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$platform$2f$browser$2f$globalThis$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["_globalThis"];
function makeGetter(requiredVersion, instance, fallback) {
    return function(version) {
        return version === requiredVersion ? instance : fallback;
    };
}
var API_BACKWARDS_COMPATIBILITY_VERSION = 1; //# sourceMappingURL=global-utils.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var NoopLoggerProvider = function() {
    function NoopLoggerProvider() {}
    NoopLoggerProvider.prototype.getLogger = function(_name, _version, _options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NoopLogger"]();
    };
    return NoopLoggerProvider;
}();
;
var NOOP_LOGGER_PROVIDER = new NoopLoggerProvider(); //# sourceMappingURL=NoopLoggerProvider.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [middleware] (ecmascript)");
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
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) {
            return this.getLoggerProvider();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["makeGetter"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"], provider, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"]);
        return provider;
    };
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */ LogsAPI.prototype.getLoggerProvider = function() {
        var _a, _b;
        return (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) === null || _a === void 0 ? void 0 : _a.call(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["_global"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"])) !== null && _b !== void 0 ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"];
    };
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */ LogsAPI.prototype.getLogger = function(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
    };
    /** Remove the global logger provider */ LogsAPI.prototype.disable = function() {
        delete __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]];
    };
    return LogsAPI;
}();
;
 //# sourceMappingURL=logs.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
var logs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["LogsAPI"].getInstance(); //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/Logger.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerProvider.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerOptions.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=LoggerOptions.js.map

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/AnyValue.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NOOP_LOGGER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NOOP_LOGGER"],
    "NOOP_LOGGER_PROVIDER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"],
    "NoopLogger": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NoopLogger"],
    "NoopLoggerProvider": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NoopLoggerProvider"],
    "SeverityNumber": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LogRecord$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["SeverityNumber"],
    "logs": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["logs"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$Logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/Logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerProvider.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LogRecord$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$LoggerOptions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/LoggerOptions.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$types$2f$AnyValue$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/types/AnyValue.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NOOP_LOGGER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NOOP_LOGGER"],
    "NOOP_LOGGER_PROVIDER": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NOOP_LOGGER_PROVIDER"],
    "NoopLogger": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NoopLogger"],
    "NoopLoggerProvider": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NoopLoggerProvider"],
    "SeverityNumber": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["SeverityNumber"],
    "logs": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["logs"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/.pnpm/@vercel+otel@1.8.2_@opentelemetry+api-logs@0.51.1_@opentelemetry+api@1.8.0_@opentelemetry+ins_sgtuoxne3frxzfqjeweieiznha/node_modules/@vercel/otel/dist/edge/index.js [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "FetchInstrumentation": ()=>tt,
    "OTLPHttpJsonTraceExporter": ()=>Ze,
    "OTLPHttpProtoTraceExporter": ()=>Be,
    "registerOTel": ()=>um
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$opentelemetry$2f$api$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.3.0-canary.64_@babel+core@7.24.5_@opentelemetry+api@1.8.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware] (ecmascript)");
var __TURBOPACK__commonjs__external__node$3a$async_hooks__ = __turbopack_external_require__("node:async_hooks", true);
var __TURBOPACK__commonjs__external__node$3a$events__ = __turbopack_external_require__("node:events", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@opentelemetry+api-logs@0.51.1/node_modules/@opentelemetry/api-logs/build/esm/index.js [middleware] (ecmascript) <facade>");
"__TURBOPACK__ecmascript__hoisting__location__";
if (globalThis.performance === undefined) {
    globalThis.performance = {
        timeOrigin: 0,
        now: ()=>Date.now()
    };
}
var au = Object.create;
var Ir = Object.defineProperty;
var su = Object.getOwnPropertyDescriptor;
var uu = Object.getOwnPropertyNames;
var cu = Object.getPrototypeOf, lu = Object.prototype.hasOwnProperty;
var Cr = (t, e)=>()=>(t && (e = t(t = 0)), e);
var _ = (t, e)=>()=>(e || t((e = {
            exports: {}
        }).exports, e), e.exports);
var gt = (t, e, r, n)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let o of uu(e))!lu.call(t, o) && o !== r && Ir(t, o, {
        get: ()=>e[o],
        enumerable: !(n = su(e, o)) || n.enumerable
    });
    return t;
}, Y = (t, e, r)=>(gt(t, e, "default"), r && gt(r, e, "default")), y = (t, e, r)=>(r = t != null ? au(cu(t)) : {}, gt(e || !t || !t.__esModule ? Ir(r, "default", {
        value: t,
        enumerable: !0
    }) : r, t)), w = (t)=>gt(Ir({}, "__esModule", {
        value: !0
    }), t);
var f = {};
;
var E = Cr(()=>{
    Y(f, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$3$2e$0$2d$canary$2e$64_$40$babel$2b$core$40$7$2e$24$2e$5_$40$opentelemetry$2b$api$40$1$2e$8$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$opentelemetry$2f$api$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__);
});
var it = _((_e)=>{
    "use strict";
    Object.defineProperty(_e, "__esModule", {
        value: !0
    });
    _e.isTracingSuppressed = _e.unsuppressTracing = _e.suppressTracing = void 0;
    var fu = (E(), w(f)), Nr = (0, fu.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function pu(t) {
        return t.setValue(Nr, !0);
    }
    _e.suppressTracing = pu;
    function _u(t) {
        return t.deleteValue(Nr);
    }
    _e.unsuppressTracing = _u;
    function du(t) {
        return t.getValue(Nr) === !0;
    }
    _e.isTracingSuppressed = du;
});
var wr = _((G)=>{
    "use strict";
    Object.defineProperty(G, "__esModule", {
        value: !0
    });
    G.BAGGAGE_MAX_TOTAL_LENGTH = G.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = G.BAGGAGE_MAX_NAME_VALUE_PAIRS = G.BAGGAGE_HEADER = G.BAGGAGE_ITEMS_SEPARATOR = G.BAGGAGE_PROPERTIES_SEPARATOR = G.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    G.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    G.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    G.BAGGAGE_ITEMS_SEPARATOR = ",";
    G.BAGGAGE_HEADER = "baggage";
    G.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    G.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    G.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
});
var Mr = _((re)=>{
    "use strict";
    Object.defineProperty(re, "__esModule", {
        value: !0
    });
    re.parseKeyPairsIntoRecord = re.parsePairKeyValue = re.getKeyPairs = re.serializeKeyPairs = void 0;
    var hu = (E(), w(f)), Pe = wr();
    function Eu(t) {
        return t.reduce((e, r)=>{
            let n = `${e}${e !== "" ? Pe.BAGGAGE_ITEMS_SEPARATOR : ""}${r}`;
            return n.length > Pe.BAGGAGE_MAX_TOTAL_LENGTH ? e : n;
        }, "");
    }
    re.serializeKeyPairs = Eu;
    function mu(t) {
        return t.getAllEntries().map(([e, r])=>{
            let n = `${encodeURIComponent(e)}=${encodeURIComponent(r.value)}`;
            return r.metadata !== void 0 && (n += Pe.BAGGAGE_PROPERTIES_SEPARATOR + r.metadata.toString()), n;
        });
    }
    re.getKeyPairs = mu;
    function ti(t) {
        let e = t.split(Pe.BAGGAGE_PROPERTIES_SEPARATOR);
        if (e.length <= 0) return;
        let r = e.shift();
        if (!r) return;
        let n = r.indexOf(Pe.BAGGAGE_KEY_PAIR_SEPARATOR);
        if (n <= 0) return;
        let o = decodeURIComponent(r.substring(0, n).trim()), i = decodeURIComponent(r.substring(n + 1).trim()), s;
        return e.length > 0 && (s = (0, hu.baggageEntryMetadataFromString)(e.join(Pe.BAGGAGE_PROPERTIES_SEPARATOR))), {
            key: o,
            value: i,
            metadata: s
        };
    }
    re.parsePairKeyValue = ti;
    function Tu(t) {
        return typeof t != "string" || t.length === 0 ? {} : t.split(Pe.BAGGAGE_ITEMS_SEPARATOR).map((e)=>ti(e)).filter((e)=>e !== void 0 && e.value.length > 0).reduce((e, r)=>(e[r.key] = r.value, e), {});
    }
    re.parseKeyPairsIntoRecord = Tu;
});
var ri = _((yt)=>{
    "use strict";
    Object.defineProperty(yt, "__esModule", {
        value: !0
    });
    yt.W3CBaggagePropagator = void 0;
    var xr = (E(), w(f)), Su = it(), Ie = wr(), Dr = Mr(), Ur = class {
        inject(e, r, n) {
            let o = xr.propagation.getBaggage(e);
            if (!o || (0, Su.isTracingSuppressed)(e)) return;
            let i = (0, Dr.getKeyPairs)(o).filter((u)=>u.length <= Ie.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS).slice(0, Ie.BAGGAGE_MAX_NAME_VALUE_PAIRS), s = (0, Dr.serializeKeyPairs)(i);
            s.length > 0 && n.set(r, Ie.BAGGAGE_HEADER, s);
        }
        extract(e, r, n) {
            let o = n.get(r, Ie.BAGGAGE_HEADER), i = Array.isArray(o) ? o.join(Ie.BAGGAGE_ITEMS_SEPARATOR) : o;
            if (!i) return e;
            let s = {};
            return i.length === 0 || (i.split(Ie.BAGGAGE_ITEMS_SEPARATOR).forEach((c)=>{
                let a = (0, Dr.parsePairKeyValue)(c);
                if (a) {
                    let l = {
                        value: a.value
                    };
                    a.metadata && (l.metadata = a.metadata), s[a.key] = l;
                }
            }), Object.entries(s).length === 0) ? e : xr.propagation.setBaggage(e, xr.propagation.createBaggage(s));
        }
        fields() {
            return [
                Ie.BAGGAGE_HEADER
            ];
        }
    };
    yt.W3CBaggagePropagator = Ur;
});
var ni = _((vt)=>{
    "use strict";
    Object.defineProperty(vt, "__esModule", {
        value: !0
    });
    vt.AnchoredClock = void 0;
    var Br = class {
        constructor(e, r){
            this._monotonicClock = r, this._epochMillis = e.now(), this._performanceMillis = r.now();
        }
        now() {
            let e = this._monotonicClock.now() - this._performanceMillis;
            return this._epochMillis + e;
        }
    };
    vt.AnchoredClock = Br;
});
var ui = _((de)=>{
    "use strict";
    Object.defineProperty(de, "__esModule", {
        value: !0
    });
    de.isAttributeValue = de.isAttributeKey = de.sanitizeAttributes = void 0;
    var ii = (E(), w(f));
    function gu(t) {
        let e = {};
        if (typeof t != "object" || t == null) return e;
        for (let [r, n] of Object.entries(t)){
            if (!oi(r)) {
                ii.diag.warn(`Invalid attribute key: ${r}`);
                continue;
            }
            if (!ai(n)) {
                ii.diag.warn(`Invalid attribute value set for key: ${r}`);
                continue;
            }
            Array.isArray(n) ? e[r] = n.slice() : e[r] = n;
        }
        return e;
    }
    de.sanitizeAttributes = gu;
    function oi(t) {
        return typeof t == "string" && t.length > 0;
    }
    de.isAttributeKey = oi;
    function ai(t) {
        return t == null ? !0 : Array.isArray(t) ? yu(t) : si(t);
    }
    de.isAttributeValue = ai;
    function yu(t) {
        let e;
        for (let r of t)if (r != null) {
            if (!e) {
                if (si(r)) {
                    e = typeof r;
                    continue;
                }
                return !1;
            }
            if (typeof r !== e) return !1;
        }
        return !0;
    }
    function si(t) {
        switch(typeof t){
            case "number":
            case "boolean":
            case "string":
                return !0;
        }
        return !1;
    }
});
var Gr = _((At)=>{
    "use strict";
    Object.defineProperty(At, "__esModule", {
        value: !0
    });
    At.loggingErrorHandler = void 0;
    var vu = (E(), w(f));
    function Au() {
        return (t)=>{
            vu.diag.error(Ou(t));
        };
    }
    At.loggingErrorHandler = Au;
    function Ou(t) {
        return typeof t == "string" ? t : JSON.stringify(Ru(t));
    }
    function Ru(t) {
        let e = {}, r = t;
        for(; r !== null;)Object.getOwnPropertyNames(r).forEach((n)=>{
            if (e[n]) return;
            let o = r[n];
            o && (e[n] = String(o));
        }), r = Object.getPrototypeOf(r);
        return e;
    }
});
var Vr = _((Ve)=>{
    "use strict";
    Object.defineProperty(Ve, "__esModule", {
        value: !0
    });
    Ve.globalErrorHandler = Ve.setGlobalErrorHandler = void 0;
    var bu = Gr(), ci = (0, bu.loggingErrorHandler)();
    function Lu(t) {
        ci = t;
    }
    Ve.setGlobalErrorHandler = Lu;
    function Pu(t) {
        try {
            ci(t);
        } catch  {}
    }
    Ve.globalErrorHandler = Pu;
});
var Hr = _((ot)=>{
    "use strict";
    Object.defineProperty(ot, "__esModule", {
        value: !0
    });
    ot.TracesSamplerValues = void 0;
    var Iu;
    (function(t) {
        t.AlwaysOff = "always_off", t.AlwaysOn = "always_on", t.ParentBasedAlwaysOff = "parentbased_always_off", t.ParentBasedAlwaysOn = "parentbased_always_on", t.ParentBasedTraceIdRatio = "parentbased_traceidratio", t.TraceIdRatio = "traceidratio";
    })(Iu = ot.TracesSamplerValues || (ot.TracesSamplerValues = {}));
});
var Rt = _((Ot)=>{
    "use strict";
    Object.defineProperty(Ot, "__esModule", {
        value: !0
    });
    Ot._globalThis = void 0;
    Ot._globalThis = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {};
});
var bt = _((L)=>{
    "use strict";
    Object.defineProperty(L, "__esModule", {
        value: !0
    });
    L.getEnvWithoutDefaults = L.parseEnvironment = L.DEFAULT_ENVIRONMENT = L.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = L.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = L.DEFAULT_ATTRIBUTE_COUNT_LIMIT = L.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = void 0;
    var he = (E(), w(f)), Cu = Hr(), Nu = Rt(), wu = ",", Mu = [
        "OTEL_SDK_DISABLED"
    ];
    function xu(t) {
        return Mu.indexOf(t) > -1;
    }
    var Du = [
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
    function Uu(t) {
        return Du.indexOf(t) > -1;
    }
    var Bu = [
        "OTEL_NO_PATCH_MODULES",
        "OTEL_PROPAGATORS"
    ];
    function Gu(t) {
        return Bu.indexOf(t) > -1;
    }
    L.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1 / 0;
    L.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    L.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 128;
    L.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 128;
    L.DEFAULT_ENVIRONMENT = {
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
        OTEL_LOG_LEVEL: he.DiagLogLevel.INFO,
        OTEL_NO_PATCH_MODULES: [],
        OTEL_PROPAGATORS: [
            "tracecontext",
            "baggage"
        ],
        OTEL_RESOURCE_ATTRIBUTES: "",
        OTEL_SERVICE_NAME: "",
        OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: L.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_ATTRIBUTE_COUNT_LIMIT: L.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: L.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: L.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: L.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: L.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
        OTEL_SPAN_LINK_COUNT_LIMIT: 128,
        OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: L.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: L.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
        OTEL_TRACES_EXPORTER: "",
        OTEL_TRACES_SAMPLER: Cu.TracesSamplerValues.ParentBasedAlwaysOn,
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
    function Vu(t, e, r) {
        if (typeof r[t] > "u") return;
        let n = String(r[t]);
        e[t] = n.toLowerCase() === "true";
    }
    function Hu(t, e, r, n = -1 / 0, o = 1 / 0) {
        if (typeof r[t] < "u") {
            let i = Number(r[t]);
            isNaN(i) || (i < n ? e[t] = n : i > o ? e[t] = o : e[t] = i);
        }
    }
    function Fu(t, e, r, n = wu) {
        let o = r[t];
        typeof o == "string" && (e[t] = o.split(n).map((i)=>i.trim()));
    }
    var ju = {
        ALL: he.DiagLogLevel.ALL,
        VERBOSE: he.DiagLogLevel.VERBOSE,
        DEBUG: he.DiagLogLevel.DEBUG,
        INFO: he.DiagLogLevel.INFO,
        WARN: he.DiagLogLevel.WARN,
        ERROR: he.DiagLogLevel.ERROR,
        NONE: he.DiagLogLevel.NONE
    };
    function ku(t, e, r) {
        let n = r[t];
        if (typeof n == "string") {
            let o = ju[n.toUpperCase()];
            o != null && (e[t] = o);
        }
    }
    function Fr(t) {
        let e = {};
        for(let r in L.DEFAULT_ENVIRONMENT){
            let n = r;
            switch(n){
                case "OTEL_LOG_LEVEL":
                    ku(n, e, t);
                    break;
                default:
                    if (xu(n)) Vu(n, e, t);
                    else if (Uu(n)) Hu(n, e, t);
                    else if (Gu(n)) Fu(n, e, t);
                    else {
                        let o = t[n];
                        typeof o < "u" && o !== null && (e[n] = String(o));
                    }
            }
        }
        return e;
    }
    L.parseEnvironment = Fr;
    function qu() {
        return typeof process < "u" && process && process.env ? Fr(process.env) : Fr(Nu._globalThis);
    }
    L.getEnvWithoutDefaults = qu;
});
var fi = _((Lt)=>{
    "use strict";
    Object.defineProperty(Lt, "__esModule", {
        value: !0
    });
    Lt.getEnv = void 0;
    var li = bt(), Xu = Rt();
    function Ku() {
        let t = (0, li.parseEnvironment)(Xu._globalThis);
        return Object.assign({}, li.DEFAULT_ENVIRONMENT, t);
    }
    Lt.getEnv = Ku;
});
var pi = _((Pt)=>{
    "use strict";
    Object.defineProperty(Pt, "__esModule", {
        value: !0
    });
    Pt.hexToBase64 = void 0;
    function Wu(t) {
        let e = t.length, r = "";
        for(let n = 0; n < e; n += 2){
            let o = t.substring(n, n + 2), i = parseInt(o, 16);
            r += String.fromCharCode(i);
        }
        return btoa(r);
    }
    Pt.hexToBase64 = Wu;
});
var di = _((Ct)=>{
    "use strict";
    Object.defineProperty(Ct, "__esModule", {
        value: !0
    });
    Ct.RandomIdGenerator = void 0;
    var Yu = 8, zu = 16, jr = class {
        constructor(){
            this.generateTraceId = _i(zu), this.generateSpanId = _i(Yu);
        }
    };
    Ct.RandomIdGenerator = jr;
    var It = Array(32);
    function _i(t) {
        return function() {
            for(let r = 0; r < t * 2; r++)It[r] = Math.floor(Math.random() * 16) + 48, It[r] >= 58 && (It[r] += 39);
            return String.fromCharCode.apply(null, It.slice(0, t * 2));
        };
    }
});
var hi = _((Nt)=>{
    "use strict";
    Object.defineProperty(Nt, "__esModule", {
        value: !0
    });
    Nt.otperformance = void 0;
    Nt.otperformance = performance;
});
var kr = _((wt)=>{
    "use strict";
    Object.defineProperty(wt, "__esModule", {
        value: !0
    });
    wt.VERSION = void 0;
    wt.VERSION = "1.19.0";
});
var Ei = _((v)=>{
    "use strict";
    Object.defineProperty(v, "__esModule", {
        value: !0
    });
    v.MessageTypeValues = v.RpcGrpcStatusCodeValues = v.MessagingOperationValues = v.MessagingDestinationKindValues = v.HttpFlavorValues = v.NetHostConnectionSubtypeValues = v.NetHostConnectionTypeValues = v.NetTransportValues = v.FaasInvokedProviderValues = v.FaasDocumentOperationValues = v.FaasTriggerValues = v.DbCassandraConsistencyLevelValues = v.DbSystemValues = v.SemanticAttributes = void 0;
    v.SemanticAttributes = {
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
    v.DbSystemValues = {
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
    v.DbCassandraConsistencyLevelValues = {
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
    v.FaasTriggerValues = {
        DATASOURCE: "datasource",
        HTTP: "http",
        PUBSUB: "pubsub",
        TIMER: "timer",
        OTHER: "other"
    };
    v.FaasDocumentOperationValues = {
        INSERT: "insert",
        EDIT: "edit",
        DELETE: "delete"
    };
    v.FaasInvokedProviderValues = {
        ALIBABA_CLOUD: "alibaba_cloud",
        AWS: "aws",
        AZURE: "azure",
        GCP: "gcp"
    };
    v.NetTransportValues = {
        IP_TCP: "ip_tcp",
        IP_UDP: "ip_udp",
        IP: "ip",
        UNIX: "unix",
        PIPE: "pipe",
        INPROC: "inproc",
        OTHER: "other"
    };
    v.NetHostConnectionTypeValues = {
        WIFI: "wifi",
        WIRED: "wired",
        CELL: "cell",
        UNAVAILABLE: "unavailable",
        UNKNOWN: "unknown"
    };
    v.NetHostConnectionSubtypeValues = {
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
    v.HttpFlavorValues = {
        HTTP_1_0: "1.0",
        HTTP_1_1: "1.1",
        HTTP_2_0: "2.0",
        SPDY: "SPDY",
        QUIC: "QUIC"
    };
    v.MessagingDestinationKindValues = {
        QUEUE: "queue",
        TOPIC: "topic"
    };
    v.MessagingOperationValues = {
        RECEIVE: "receive",
        PROCESS: "process"
    };
    v.RpcGrpcStatusCodeValues = {
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
    v.MessageTypeValues = {
        SENT: "SENT",
        RECEIVED: "RECEIVED"
    };
});
var mi = _((Ce)=>{
    "use strict";
    var $u = Ce && Ce.__createBinding || (Object.create ? function(t, e, r, n) {
        n === void 0 && (n = r), Object.defineProperty(t, n, {
            enumerable: !0,
            get: function() {
                return e[r];
            }
        });
    } : function(t, e, r, n) {
        n === void 0 && (n = r), t[n] = e[r];
    }), Qu = Ce && Ce.__exportStar || function(t, e) {
        for(var r in t)r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && $u(e, t, r);
    };
    Object.defineProperty(Ce, "__esModule", {
        value: !0
    });
    Qu(Ei(), Ce);
});
var Ti = _((V)=>{
    "use strict";
    Object.defineProperty(V, "__esModule", {
        value: !0
    });
    V.TelemetrySdkLanguageValues = V.OsTypeValues = V.HostArchValues = V.AwsEcsLaunchtypeValues = V.CloudPlatformValues = V.CloudProviderValues = V.SemanticResourceAttributes = void 0;
    V.SemanticResourceAttributes = {
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
    V.CloudProviderValues = {
        ALIBABA_CLOUD: "alibaba_cloud",
        AWS: "aws",
        AZURE: "azure",
        GCP: "gcp"
    };
    V.CloudPlatformValues = {
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
    V.AwsEcsLaunchtypeValues = {
        EC2: "ec2",
        FARGATE: "fargate"
    };
    V.HostArchValues = {
        AMD64: "amd64",
        ARM32: "arm32",
        ARM64: "arm64",
        IA64: "ia64",
        PPC32: "ppc32",
        PPC64: "ppc64",
        X86: "x86"
    };
    V.OsTypeValues = {
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
    V.TelemetrySdkLanguageValues = {
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
var Si = _((Ne)=>{
    "use strict";
    var Zu = Ne && Ne.__createBinding || (Object.create ? function(t, e, r, n) {
        n === void 0 && (n = r), Object.defineProperty(t, n, {
            enumerable: !0,
            get: function() {
                return e[r];
            }
        });
    } : function(t, e, r, n) {
        n === void 0 && (n = r), t[n] = e[r];
    }), Ju = Ne && Ne.__exportStar || function(t, e) {
        for(var r in t)r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Zu(e, t, r);
    };
    Object.defineProperty(Ne, "__esModule", {
        value: !0
    });
    Ju(Ti(), Ne);
});
var me = _((Ee)=>{
    "use strict";
    var ec = Ee && Ee.__createBinding || (Object.create ? function(t, e, r, n) {
        n === void 0 && (n = r), Object.defineProperty(t, n, {
            enumerable: !0,
            get: function() {
                return e[r];
            }
        });
    } : function(t, e, r, n) {
        n === void 0 && (n = r), t[n] = e[r];
    }), gi = Ee && Ee.__exportStar || function(t, e) {
        for(var r in t)r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && ec(e, t, r);
    };
    Object.defineProperty(Ee, "__esModule", {
        value: !0
    });
    gi(mi(), Ee);
    gi(Si(), Ee);
});
var yi = _((Mt)=>{
    "use strict";
    Object.defineProperty(Mt, "__esModule", {
        value: !0
    });
    Mt.SDK_INFO = void 0;
    var tc = kr(), at = me();
    Mt.SDK_INFO = {
        [at.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: "opentelemetry",
        [at.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "browser",
        [at.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: at.TelemetrySdkLanguageValues.WEBJS,
        [at.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: tc.VERSION
    };
});
var vi = _((xt)=>{
    "use strict";
    Object.defineProperty(xt, "__esModule", {
        value: !0
    });
    xt.unrefTimer = void 0;
    function rc(t) {}
    xt.unrefTimer = rc;
});
var qr = _((k)=>{
    "use strict";
    var nc = k && k.__createBinding || (Object.create ? function(t, e, r, n) {
        n === void 0 && (n = r), Object.defineProperty(t, n, {
            enumerable: !0,
            get: function() {
                return e[r];
            }
        });
    } : function(t, e, r, n) {
        n === void 0 && (n = r), t[n] = e[r];
    }), we = k && k.__exportStar || function(t, e) {
        for(var r in t)r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && nc(e, t, r);
    };
    Object.defineProperty(k, "__esModule", {
        value: !0
    });
    we(fi(), k);
    we(Rt(), k);
    we(pi(), k);
    we(di(), k);
    we(hi(), k);
    we(yi(), k);
    we(vi(), k);
});
var bi = _((R)=>{
    "use strict";
    Object.defineProperty(R, "__esModule", {
        value: !0
    });
    R.addHrTimes = R.isTimeInput = R.isTimeInputHrTime = R.hrTimeToMicroseconds = R.hrTimeToMilliseconds = R.hrTimeToNanoseconds = R.hrTimeToTimeStamp = R.hrTimeDuration = R.timeInputToHrTime = R.hrTime = R.getTimeOrigin = R.millisToHrTime = void 0;
    var Xr = qr(), Ai = 9, ic = 6, oc = Math.pow(10, ic), Dt = Math.pow(10, Ai);
    function st(t) {
        let e = t / 1e3, r = Math.trunc(e), n = Math.round(t % 1e3 * oc);
        return [
            r,
            n
        ];
    }
    R.millisToHrTime = st;
    function Kr() {
        let t = Xr.otperformance.timeOrigin;
        if (typeof t != "number") {
            let e = Xr.otperformance;
            t = e.timing && e.timing.fetchStart;
        }
        return t;
    }
    R.getTimeOrigin = Kr;
    function Oi(t) {
        let e = st(Kr()), r = st(typeof t == "number" ? t : Xr.otperformance.now());
        return Ri(e, r);
    }
    R.hrTime = Oi;
    function ac(t) {
        if (Wr(t)) return t;
        if (typeof t == "number") return t < Kr() ? Oi(t) : st(t);
        if (t instanceof Date) return st(t.getTime());
        throw TypeError("Invalid input type");
    }
    R.timeInputToHrTime = ac;
    function sc(t, e) {
        let r = e[0] - t[0], n = e[1] - t[1];
        return n < 0 && (r -= 1, n += Dt), [
            r,
            n
        ];
    }
    R.hrTimeDuration = sc;
    function uc(t) {
        let e = Ai, r = `${"0".repeat(e)}${t[1]}Z`, n = r.substr(r.length - e - 1);
        return new Date(t[0] * 1e3).toISOString().replace("000Z", n);
    }
    R.hrTimeToTimeStamp = uc;
    function cc(t) {
        return t[0] * Dt + t[1];
    }
    R.hrTimeToNanoseconds = cc;
    function lc(t) {
        return t[0] * 1e3 + t[1] / 1e6;
    }
    R.hrTimeToMilliseconds = lc;
    function fc(t) {
        return t[0] * 1e6 + t[1] / 1e3;
    }
    R.hrTimeToMicroseconds = fc;
    function Wr(t) {
        return Array.isArray(t) && t.length === 2 && typeof t[0] == "number" && typeof t[1] == "number";
    }
    R.isTimeInputHrTime = Wr;
    function pc(t) {
        return Wr(t) || typeof t == "number" || t instanceof Date;
    }
    R.isTimeInput = pc;
    function Ri(t, e) {
        let r = [
            t[0] + e[0],
            t[1] + e[1]
        ];
        return r[1] >= Dt && (r[1] -= Dt, r[0] += 1), r;
    }
    R.addHrTimes = Ri;
});
var Pi = _((Li)=>{
    "use strict";
    Object.defineProperty(Li, "__esModule", {
        value: !0
    });
});
var Ii = _((ut)=>{
    "use strict";
    Object.defineProperty(ut, "__esModule", {
        value: !0
    });
    ut.ExportResultCode = void 0;
    var _c;
    (function(t) {
        t[t.SUCCESS = 0] = "SUCCESS", t[t.FAILED = 1] = "FAILED";
    })(_c = ut.ExportResultCode || (ut.ExportResultCode = {}));
});
var Ni = _((Ut)=>{
    "use strict";
    Object.defineProperty(Ut, "__esModule", {
        value: !0
    });
    Ut.CompositePropagator = void 0;
    var Ci = (E(), w(f)), Yr = class {
        constructor(e = {}){
            var r;
            this._propagators = (r = e.propagators) !== null && r !== void 0 ? r : [], this._fields = Array.from(new Set(this._propagators.map((n)=>typeof n.fields == "function" ? n.fields() : []).reduce((n, o)=>n.concat(o), [])));
        }
        inject(e, r, n) {
            for (let o of this._propagators)try {
                o.inject(e, r, n);
            } catch (i) {
                Ci.diag.warn(`Failed to inject with ${o.constructor.name}. Err: ${i.message}`);
            }
        }
        extract(e, r, n) {
            return this._propagators.reduce((o, i)=>{
                try {
                    return i.extract(o, r, n);
                } catch (s) {
                    Ci.diag.warn(`Failed to inject with ${i.constructor.name}. Err: ${s.message}`);
                }
                return o;
            }, e);
        }
        fields() {
            return this._fields.slice();
        }
    };
    Ut.CompositePropagator = Yr;
});
var wi = _((He)=>{
    "use strict";
    Object.defineProperty(He, "__esModule", {
        value: !0
    });
    He.validateValue = He.validateKey = void 0;
    var zr = "[_0-9a-z-*/]", dc = `[a-z]${zr}{0,255}`, hc = `[a-z0-9]${zr}{0,240}@[a-z]${zr}{0,13}`, Ec = new RegExp(`^(?:${dc}|${hc})$`), mc = /^[ -~]{0,255}[!-~]$/, Tc = /,|=/;
    function Sc(t) {
        return Ec.test(t);
    }
    He.validateKey = Sc;
    function gc(t) {
        return mc.test(t) && !Tc.test(t);
    }
    He.validateValue = gc;
});
var Qr = _((Bt)=>{
    "use strict";
    Object.defineProperty(Bt, "__esModule", {
        value: !0
    });
    Bt.TraceState = void 0;
    var Mi = wi(), xi = 32, yc = 512, Di = ",", Ui = "=", $r = class t {
        constructor(e){
            this._internalState = new Map, e && this._parse(e);
        }
        set(e, r) {
            let n = this._clone();
            return n._internalState.has(e) && n._internalState.delete(e), n._internalState.set(e, r), n;
        }
        unset(e) {
            let r = this._clone();
            return r._internalState.delete(e), r;
        }
        get(e) {
            return this._internalState.get(e);
        }
        serialize() {
            return this._keys().reduce((e, r)=>(e.push(r + Ui + this.get(r)), e), []).join(Di);
        }
        _parse(e) {
            e.length > yc || (this._internalState = e.split(Di).reverse().reduce((r, n)=>{
                let o = n.trim(), i = o.indexOf(Ui);
                if (i !== -1) {
                    let s = o.slice(0, i), u = o.slice(i + 1, n.length);
                    (0, Mi.validateKey)(s) && (0, Mi.validateValue)(u) && r.set(s, u);
                }
                return r;
            }, new Map), this._internalState.size > xi && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, xi))));
        }
        _keys() {
            return Array.from(this._internalState.keys()).reverse();
        }
        _clone() {
            let e = new t;
            return e._internalState = new Map(this._internalState), e;
        }
    };
    Bt.TraceState = $r;
});
var Gi = _((H)=>{
    "use strict";
    Object.defineProperty(H, "__esModule", {
        value: !0
    });
    H.W3CTraceContextPropagator = H.parseTraceParent = H.TRACE_STATE_HEADER = H.TRACE_PARENT_HEADER = void 0;
    var Gt = (E(), w(f)), vc = it(), Ac = Qr();
    H.TRACE_PARENT_HEADER = "traceparent";
    H.TRACE_STATE_HEADER = "tracestate";
    var Oc = "00", Rc = "(?!ff)[\\da-f]{2}", bc = "(?![0]{32})[\\da-f]{32}", Lc = "(?![0]{16})[\\da-f]{16}", Pc = "[\\da-f]{2}", Ic = new RegExp(`^\\s?(${Rc})-(${bc})-(${Lc})-(${Pc})(-.*)?\\s?$`);
    function Bi(t) {
        let e = Ic.exec(t);
        return !e || e[1] === "00" && e[5] ? null : {
            traceId: e[2],
            spanId: e[3],
            traceFlags: parseInt(e[4], 16)
        };
    }
    H.parseTraceParent = Bi;
    var Zr = class {
        inject(e, r, n) {
            let o = Gt.trace.getSpanContext(e);
            if (!o || (0, vc.isTracingSuppressed)(e) || !(0, Gt.isSpanContextValid)(o)) return;
            let i = `${Oc}-${o.traceId}-${o.spanId}-0${Number(o.traceFlags || Gt.TraceFlags.NONE).toString(16)}`;
            n.set(r, H.TRACE_PARENT_HEADER, i), o.traceState && n.set(r, H.TRACE_STATE_HEADER, o.traceState.serialize());
        }
        extract(e, r, n) {
            let o = n.get(r, H.TRACE_PARENT_HEADER);
            if (!o) return e;
            let i = Array.isArray(o) ? o[0] : o;
            if (typeof i != "string") return e;
            let s = Bi(i);
            if (!s) return e;
            s.isRemote = !0;
            let u = n.get(r, H.TRACE_STATE_HEADER);
            if (u) {
                let c = Array.isArray(u) ? u.join(",") : u;
                s.traceState = new Ac.TraceState(typeof c == "string" ? c : void 0);
            }
            return Gt.trace.setSpanContext(e, s);
        }
        fields() {
            return [
                H.TRACE_PARENT_HEADER,
                H.TRACE_STATE_HEADER
            ];
        }
    };
    H.W3CTraceContextPropagator = Zr;
});
var Hi = _((Vi)=>{
    "use strict";
    Object.defineProperty(Vi, "__esModule", {
        value: !0
    });
});
var Fi = _((z)=>{
    "use strict";
    Object.defineProperty(z, "__esModule", {
        value: !0
    });
    z.getRPCMetadata = z.deleteRPCMetadata = z.setRPCMetadata = z.RPCType = void 0;
    var Cc = (E(), w(f)), Jr = (0, Cc.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA"), Nc;
    (function(t) {
        t.HTTP = "http";
    })(Nc = z.RPCType || (z.RPCType = {}));
    function wc(t, e) {
        return t.setValue(Jr, e);
    }
    z.setRPCMetadata = wc;
    function Mc(t) {
        return t.deleteValue(Jr);
    }
    z.deleteRPCMetadata = Mc;
    function xc(t) {
        return t.getValue(Jr);
    }
    z.getRPCMetadata = xc;
});
var tn = _((Vt)=>{
    "use strict";
    Object.defineProperty(Vt, "__esModule", {
        value: !0
    });
    Vt.AlwaysOffSampler = void 0;
    var Dc = (E(), w(f)), en = class {
        shouldSample() {
            return {
                decision: Dc.SamplingDecision.NOT_RECORD
            };
        }
        toString() {
            return "AlwaysOffSampler";
        }
    };
    Vt.AlwaysOffSampler = en;
});
var nn = _((Ht)=>{
    "use strict";
    Object.defineProperty(Ht, "__esModule", {
        value: !0
    });
    Ht.AlwaysOnSampler = void 0;
    var Uc = (E(), w(f)), rn = class {
        shouldSample() {
            return {
                decision: Uc.SamplingDecision.RECORD_AND_SAMPLED
            };
        }
        toString() {
            return "AlwaysOnSampler";
        }
    };
    Ht.AlwaysOnSampler = rn;
});
var ki = _((jt)=>{
    "use strict";
    Object.defineProperty(jt, "__esModule", {
        value: !0
    });
    jt.ParentBasedSampler = void 0;
    var Ft = (E(), w(f)), Bc = Vr(), ji = tn(), on = nn(), an = class {
        constructor(e){
            var r, n, o, i;
            this._root = e.root, this._root || ((0, Bc.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured")), this._root = new on.AlwaysOnSampler), this._remoteParentSampled = (r = e.remoteParentSampled) !== null && r !== void 0 ? r : new on.AlwaysOnSampler, this._remoteParentNotSampled = (n = e.remoteParentNotSampled) !== null && n !== void 0 ? n : new ji.AlwaysOffSampler, this._localParentSampled = (o = e.localParentSampled) !== null && o !== void 0 ? o : new on.AlwaysOnSampler, this._localParentNotSampled = (i = e.localParentNotSampled) !== null && i !== void 0 ? i : new ji.AlwaysOffSampler;
        }
        shouldSample(e, r, n, o, i, s) {
            let u = Ft.trace.getSpanContext(e);
            return !u || !(0, Ft.isSpanContextValid)(u) ? this._root.shouldSample(e, r, n, o, i, s) : u.isRemote ? u.traceFlags & Ft.TraceFlags.SAMPLED ? this._remoteParentSampled.shouldSample(e, r, n, o, i, s) : this._remoteParentNotSampled.shouldSample(e, r, n, o, i, s) : u.traceFlags & Ft.TraceFlags.SAMPLED ? this._localParentSampled.shouldSample(e, r, n, o, i, s) : this._localParentNotSampled.shouldSample(e, r, n, o, i, s);
        }
        toString() {
            return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
        }
    };
    jt.ParentBasedSampler = an;
});
var qi = _((kt)=>{
    "use strict";
    Object.defineProperty(kt, "__esModule", {
        value: !0
    });
    kt.TraceIdRatioBasedSampler = void 0;
    var sn = (E(), w(f)), un = class {
        constructor(e = 0){
            this._ratio = e, this._ratio = this._normalize(e), this._upperBound = Math.floor(this._ratio * 4294967295);
        }
        shouldSample(e, r) {
            return {
                decision: (0, sn.isValidTraceId)(r) && this._accumulate(r) < this._upperBound ? sn.SamplingDecision.RECORD_AND_SAMPLED : sn.SamplingDecision.NOT_RECORD
            };
        }
        toString() {
            return `TraceIdRatioBased{${this._ratio}}`;
        }
        _normalize(e) {
            return typeof e != "number" || isNaN(e) ? 0 : e >= 1 ? 1 : e <= 0 ? 0 : e;
        }
        _accumulate(e) {
            let r = 0;
            for(let n = 0; n < e.length / 8; n++){
                let o = n * 8, i = parseInt(e.slice(o, o + 8), 16);
                r = (r ^ i) >>> 0;
            }
            return r;
        }
    };
    kt.TraceIdRatioBasedSampler = un;
});
var zi = _((qt)=>{
    "use strict";
    Object.defineProperty(qt, "__esModule", {
        value: !0
    });
    qt.isPlainObject = void 0;
    var Gc = "[object Object]", Vc = "[object Null]", Hc = "[object Undefined]", Fc = Function.prototype, Xi = Fc.toString, jc = Xi.call(Object), kc = qc(Object.getPrototypeOf, Object), Ki = Object.prototype, Wi = Ki.hasOwnProperty, Me = Symbol ? Symbol.toStringTag : void 0, Yi = Ki.toString;
    function qc(t, e) {
        return function(r) {
            return t(e(r));
        };
    }
    function Xc(t) {
        if (!Kc(t) || Wc(t) !== Gc) return !1;
        let e = kc(t);
        if (e === null) return !0;
        let r = Wi.call(e, "constructor") && e.constructor;
        return typeof r == "function" && r instanceof r && Xi.call(r) === jc;
    }
    qt.isPlainObject = Xc;
    function Kc(t) {
        return t != null && typeof t == "object";
    }
    function Wc(t) {
        return t == null ? t === void 0 ? Hc : Vc : Me && Me in Object(t) ? Yc(t) : zc(t);
    }
    function Yc(t) {
        let e = Wi.call(t, Me), r = t[Me], n = !1;
        try {
            t[Me] = void 0, n = !0;
        } catch  {}
        let o = Yi.call(t);
        return n && (e ? t[Me] = r : delete t[Me]), o;
    }
    function zc(t) {
        return Yi.call(t);
    }
});
var eo = _((Wt)=>{
    "use strict";
    Object.defineProperty(Wt, "__esModule", {
        value: !0
    });
    Wt.merge = void 0;
    var $i = zi(), $c = 20;
    function Qc(...t) {
        let e = t.shift(), r = new WeakMap;
        for(; t.length > 0;)e = Zi(e, t.shift(), 0, r);
        return e;
    }
    Wt.merge = Qc;
    function cn(t) {
        return Kt(t) ? t.slice() : t;
    }
    function Zi(t, e, r = 0, n) {
        let o;
        if (!(r > $c)) {
            if (r++, Xt(t) || Xt(e) || Ji(e)) o = cn(e);
            else if (Kt(t)) {
                if (o = t.slice(), Kt(e)) for(let i = 0, s = e.length; i < s; i++)o.push(cn(e[i]));
                else if (ct(e)) {
                    let i = Object.keys(e);
                    for(let s = 0, u = i.length; s < u; s++){
                        let c = i[s];
                        o[c] = cn(e[c]);
                    }
                }
            } else if (ct(t)) if (ct(e)) {
                if (!Zc(t, e)) return e;
                o = Object.assign({}, t);
                let i = Object.keys(e);
                for(let s = 0, u = i.length; s < u; s++){
                    let c = i[s], a = e[c];
                    if (Xt(a)) typeof a > "u" ? delete o[c] : o[c] = a;
                    else {
                        let l = o[c], p = a;
                        if (Qi(t, c, n) || Qi(e, c, n)) delete o[c];
                        else {
                            if (ct(l) && ct(p)) {
                                let d = n.get(l) || [], g = n.get(p) || [];
                                d.push({
                                    obj: t,
                                    key: c
                                }), g.push({
                                    obj: e,
                                    key: c
                                }), n.set(l, d), n.set(p, g);
                            }
                            o[c] = Zi(o[c], a, r, n);
                        }
                    }
                }
            } else o = e;
            return o;
        }
    }
    function Qi(t, e, r) {
        let n = r.get(t[e]) || [];
        for(let o = 0, i = n.length; o < i; o++){
            let s = n[o];
            if (s.key === e && s.obj === t) return !0;
        }
        return !1;
    }
    function Kt(t) {
        return Array.isArray(t);
    }
    function Ji(t) {
        return typeof t == "function";
    }
    function ct(t) {
        return !Xt(t) && !Kt(t) && !Ji(t) && typeof t == "object";
    }
    function Xt(t) {
        return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t > "u" || t instanceof Date || t instanceof RegExp || t === null;
    }
    function Zc(t, e) {
        return !(!(0, $i.isPlainObject)(t) || !(0, $i.isPlainObject)(e));
    }
});
var to = _((Fe)=>{
    "use strict";
    Object.defineProperty(Fe, "__esModule", {
        value: !0
    });
    Fe.callWithTimeout = Fe.TimeoutError = void 0;
    var Yt = class t extends Error {
        constructor(e){
            super(e), Object.setPrototypeOf(this, t.prototype);
        }
    };
    Fe.TimeoutError = Yt;
    function Jc(t, e) {
        let r, n = new Promise(function(i, s) {
            r = setTimeout(function() {
                s(new Yt("Operation timed out."));
            }, e);
        });
        return Promise.race([
            t,
            n
        ]).then((o)=>(clearTimeout(r), o), (o)=>{
            throw clearTimeout(r), o;
        });
    }
    Fe.callWithTimeout = Jc;
});
var no = _((je)=>{
    "use strict";
    Object.defineProperty(je, "__esModule", {
        value: !0
    });
    je.isUrlIgnored = je.urlMatches = void 0;
    function ro(t, e) {
        return typeof e == "string" ? t === e : !!t.match(e);
    }
    je.urlMatches = ro;
    function el(t, e) {
        if (!e) return !1;
        for (let r of e)if (ro(t, r)) return !0;
        return !1;
    }
    je.isUrlIgnored = el;
});
var io = _((zt)=>{
    "use strict";
    Object.defineProperty(zt, "__esModule", {
        value: !0
    });
    zt.isWrapped = void 0;
    function tl(t) {
        return typeof t == "function" && typeof t.__original == "function" && typeof t.__unwrap == "function" && t.__wrapped === !0;
    }
    zt.isWrapped = tl;
});
var oo = _(($t)=>{
    "use strict";
    Object.defineProperty($t, "__esModule", {
        value: !0
    });
    $t.Deferred = void 0;
    var ln = class {
        constructor(){
            this._promise = new Promise((e, r)=>{
                this._resolve = e, this._reject = r;
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
    $t.Deferred = ln;
});
var ao = _((Qt)=>{
    "use strict";
    Object.defineProperty(Qt, "__esModule", {
        value: !0
    });
    Qt.BindOnceFuture = void 0;
    var rl = oo(), fn = class {
        constructor(e, r){
            this._callback = e, this._that = r, this._isCalled = !1, this._deferred = new rl.Deferred;
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
                    Promise.resolve(this._callback.call(this._that, ...e)).then((r)=>this._deferred.resolve(r), (r)=>this._deferred.reject(r));
                } catch (r) {
                    this._deferred.reject(r);
                }
            }
            return this._deferred.promise;
        }
    };
    Qt.BindOnceFuture = fn;
});
var uo = _((Zt)=>{
    "use strict";
    Object.defineProperty(Zt, "__esModule", {
        value: !0
    });
    Zt._export = void 0;
    var so = (E(), w(f)), nl = it();
    function il(t, e) {
        return new Promise((r)=>{
            so.context.with((0, nl.suppressTracing)(so.context.active()), ()=>{
                t.export(e, (n)=>{
                    r(n);
                });
            });
        });
    }
    Zt._export = il;
});
var C = _((T)=>{
    "use strict";
    var ol = T && T.__createBinding || (Object.create ? function(t, e, r, n) {
        n === void 0 && (n = r), Object.defineProperty(t, n, {
            enumerable: !0,
            get: function() {
                return e[r];
            }
        });
    } : function(t, e, r, n) {
        n === void 0 && (n = r), t[n] = e[r];
    }), O = T && T.__exportStar || function(t, e) {
        for(var r in t)r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && ol(e, t, r);
    };
    Object.defineProperty(T, "__esModule", {
        value: !0
    });
    T.internal = T.baggageUtils = void 0;
    O(ri(), T);
    O(ni(), T);
    O(ui(), T);
    O(Vr(), T);
    O(Gr(), T);
    O(bi(), T);
    O(Pi(), T);
    O(Ii(), T);
    T.baggageUtils = Mr();
    O(qr(), T);
    O(Ni(), T);
    O(Gi(), T);
    O(Hi(), T);
    O(Fi(), T);
    O(tn(), T);
    O(nn(), T);
    O(ki(), T);
    O(qi(), T);
    O(it(), T);
    O(Qr(), T);
    O(bt(), T);
    O(eo(), T);
    O(Hr(), T);
    O(to(), T);
    O(no(), T);
    O(io(), T);
    O(ao(), T);
    O(kr(), T);
    var al = uo();
    T.internal = {
        _export: al._export
    };
});
var Co = _((ve)=>{
    "use strict";
    Object.defineProperty(ve, "__esModule", {
        value: !0
    });
    ve.disableInstrumentations = ve.enableInstrumentations = ve.parseInstrumentationOptions = void 0;
    function Io(t = []) {
        let e = [];
        for(let r = 0, n = t.length; r < n; r++){
            let o = t[r];
            if (Array.isArray(o)) {
                let i = Io(o);
                e = e.concat(i.instrumentations);
            } else typeof o == "function" ? e.push(new o) : o.instrumentationName && e.push(o);
        }
        return {
            instrumentations: e
        };
    }
    ve.parseInstrumentationOptions = Io;
    function Al(t, e, r) {
        for(let n = 0, o = t.length; n < o; n++){
            let i = t[n];
            e && i.setTracerProvider(e), r && i.setMeterProvider(r), i.getConfig().enabled || i.enable();
        }
    }
    ve.enableInstrumentations = Al;
    function Ol(t) {
        t.forEach((e)=>e.disable());
    }
    ve.disableInstrumentations = Ol;
});
var wo = _((ir)=>{
    "use strict";
    Object.defineProperty(ir, "__esModule", {
        value: !0
    });
    ir.registerInstrumentations = void 0;
    var No = (E(), w(f)), _n = Co();
    function Rl(t) {
        let { instrumentations: e } = (0, _n.parseInstrumentationOptions)(t.instrumentations), r = t.tracerProvider || No.trace.getTracerProvider(), n = t.meterProvider || No.metrics.getMeterProvider();
        return (0, _n.enableInstrumentations)(e, r, n), ()=>{
            (0, _n.disableInstrumentations)(e);
        };
    }
    ir.registerInstrumentations = Rl;
});
var ft = {};
;
var La = Cr(()=>{
    Y(ft, __TURBOPACK__commonjs__external__node$3a$async_hooks__);
});
var pt = {};
;
var Pa = Cr(()=>{
    Y(pt, __TURBOPACK__commonjs__external__node$3a$events__);
});
var Ia = _((dr)=>{
    "use strict";
    Object.defineProperty(dr, "__esModule", {
        value: !0
    });
    dr.AbstractAsyncHooksContextManager = void 0;
    var ef = (Pa(), w(pt)), tf = [
        "addListener",
        "on",
        "once",
        "prependListener",
        "prependOnceListener"
    ], Rn = class {
        constructor(){
            this._kOtListeners = Symbol("OtListeners"), this._wrapped = !1;
        }
        bind(e, r) {
            return r instanceof ef.EventEmitter ? this._bindEventEmitter(e, r) : typeof r == "function" ? this._bindFunction(e, r) : r;
        }
        _bindFunction(e, r) {
            let n = this, o = function(...i) {
                return n.with(e, ()=>r.apply(this, i));
            };
            return Object.defineProperty(o, "length", {
                enumerable: !1,
                configurable: !0,
                writable: !1,
                value: r.length
            }), o;
        }
        _bindEventEmitter(e, r) {
            return this._getPatchMap(r) !== void 0 || (this._createPatchMap(r), tf.forEach((o)=>{
                r[o] !== void 0 && (r[o] = this._patchAddListener(r, r[o], e));
            }), typeof r.removeListener == "function" && (r.removeListener = this._patchRemoveListener(r, r.removeListener)), typeof r.off == "function" && (r.off = this._patchRemoveListener(r, r.off)), typeof r.removeAllListeners == "function" && (r.removeAllListeners = this._patchRemoveAllListeners(r, r.removeAllListeners))), r;
        }
        _patchRemoveListener(e, r) {
            let n = this;
            return function(o, i) {
                var s;
                let u = (s = n._getPatchMap(e)) === null || s === void 0 ? void 0 : s[o];
                if (u === void 0) return r.call(this, o, i);
                let c = u.get(i);
                return r.call(this, o, c || i);
            };
        }
        _patchRemoveAllListeners(e, r) {
            let n = this;
            return function(o) {
                let i = n._getPatchMap(e);
                return i !== void 0 && (arguments.length === 0 ? n._createPatchMap(e) : i[o] !== void 0 && delete i[o]), r.apply(this, arguments);
            };
        }
        _patchAddListener(e, r, n) {
            let o = this;
            return function(i, s) {
                if (o._wrapped) return r.call(this, i, s);
                let u = o._getPatchMap(e);
                u === void 0 && (u = o._createPatchMap(e));
                let c = u[i];
                c === void 0 && (c = new WeakMap, u[i] = c);
                let a = o.bind(n, s);
                c.set(s, a), o._wrapped = !0;
                try {
                    return r.call(this, i, a);
                } finally{
                    o._wrapped = !1;
                }
            };
        }
        _createPatchMap(e) {
            let r = Object.create(null);
            return e[this._kOtListeners] = r, r;
        }
        _getPatchMap(e) {
            return e[this._kOtListeners];
        }
    };
    dr.AbstractAsyncHooksContextManager = Rn;
});
var Ca = _((hr)=>{
    "use strict";
    Object.defineProperty(hr, "__esModule", {
        value: !0
    });
    hr.AsyncLocalStorageContextManager = void 0;
    var rf = (E(), w(f)), nf = (La(), w(ft)), of = Ia(), bn = class extends of.AbstractAsyncHooksContextManager {
        constructor(){
            super(), this._asyncLocalStorage = new nf.AsyncLocalStorage;
        }
        active() {
            var e;
            return (e = this._asyncLocalStorage.getStore()) !== null && e !== void 0 ? e : rf.ROOT_CONTEXT;
        }
        with(e, r, n, ...o) {
            let i = n == null ? r : r.bind(n);
            return this._asyncLocalStorage.run(e, i, ...o);
        }
        enable() {
            return this;
        }
        disable() {
            return this._asyncLocalStorage.disable(), this;
        }
    };
    hr.AsyncLocalStorageContextManager = bn;
});
var Cn = _((Ae)=>{
    "use strict";
    Object.defineProperty(Ae, "__esModule", {
        value: !0
    });
    Ae.toAnyValue = Ae.toKeyValue = Ae.toAttributes = void 0;
    function ff(t) {
        return Object.keys(t).map((e)=>Pn(e, t[e]));
    }
    Ae.toAttributes = ff;
    function Pn(t, e) {
        return {
            key: t,
            value: In(e)
        };
    }
    Ae.toKeyValue = Pn;
    function In(t) {
        let e = typeof t;
        return e === "string" ? {
            stringValue: t
        } : e === "number" ? Number.isInteger(t) ? {
            intValue: t
        } : {
            doubleValue: t
        } : e === "boolean" ? {
            boolValue: t
        } : t instanceof Uint8Array ? {
            bytesValue: t
        } : Array.isArray(t) ? {
            arrayValue: {
                values: t.map(In)
            }
        } : e === "object" && t != null ? {
            kvlistValue: {
                values: Object.entries(t).map(([r, n])=>Pn(r, n))
            }
        } : {};
    }
    Ae.toAnyValue = In;
});
var Ua = _((Oe)=>{
    "use strict";
    Object.defineProperty(Oe, "__esModule", {
        value: !0
    });
    Oe.toOtlpSpanEvent = Oe.toOtlpLink = Oe.sdkSpanToOtlpSpan = void 0;
    var Nn = Cn();
    function pf(t, e) {
        var r;
        let n = t.spanContext(), o = t.status;
        return {
            traceId: e.encodeSpanContext(n.traceId),
            spanId: e.encodeSpanContext(n.spanId),
            parentSpanId: e.encodeOptionalSpanContext(t.parentSpanId),
            traceState: (r = n.traceState) === null || r === void 0 ? void 0 : r.serialize(),
            name: t.name,
            kind: t.kind == null ? 0 : t.kind + 1,
            startTimeUnixNano: e.encodeHrTime(t.startTime),
            endTimeUnixNano: e.encodeHrTime(t.endTime),
            attributes: (0, Nn.toAttributes)(t.attributes),
            droppedAttributesCount: t.droppedAttributesCount,
            events: t.events.map((i)=>Da(i, e)),
            droppedEventsCount: t.droppedEventsCount,
            status: {
                code: o.code,
                message: o.message
            },
            links: t.links.map((i)=>xa(i, e)),
            droppedLinksCount: t.droppedLinksCount
        };
    }
    Oe.sdkSpanToOtlpSpan = pf;
    function xa(t, e) {
        var r;
        return {
            attributes: t.attributes ? (0, Nn.toAttributes)(t.attributes) : [],
            spanId: e.encodeSpanContext(t.context.spanId),
            traceId: e.encodeSpanContext(t.context.traceId),
            traceState: (r = t.context.traceState) === null || r === void 0 ? void 0 : r.serialize(),
            droppedAttributesCount: t.droppedAttributesCount || 0
        };
    }
    Oe.toOtlpLink = xa;
    function Da(t, e) {
        return {
            attributes: t.attributes ? (0, Nn.toAttributes)(t.attributes) : [],
            name: t.name,
            timeUnixNano: e.encodeHrTime(t.time),
            droppedAttributesCount: t.droppedAttributesCount || 0
        };
    }
    Oe.toOtlpSpanEvent = Da;
});
var Fa = _((K)=>{
    "use strict";
    Object.defineProperty(K, "__esModule", {
        value: !0
    });
    K.getOtlpEncoder = K.encodeAsString = K.encodeAsLongBits = K.toLongBits = K.hrTimeToNanos = void 0;
    var Tr = C(), _f = BigInt(1e9);
    function wn(t) {
        return BigInt(t[0]) * _f + BigInt(t[1]);
    }
    K.hrTimeToNanos = wn;
    function Ga(t) {
        let e = Number(BigInt.asUintN(32, t)), r = Number(BigInt.asUintN(32, t >> BigInt(32)));
        return {
            low: e,
            high: r
        };
    }
    K.toLongBits = Ga;
    function Mn(t) {
        let e = wn(t);
        return Ga(e);
    }
    K.encodeAsLongBits = Mn;
    function Va(t) {
        return wn(t).toString();
    }
    K.encodeAsString = Va;
    var df = typeof BigInt < "u" ? Va : Tr.hrTimeToNanoseconds;
    function Ba(t) {
        return t;
    }
    function Ha(t) {
        if (t !== void 0) return (0, Tr.hexToBase64)(t);
    }
    var hf = {
        encodeHrTime: Mn,
        encodeSpanContext: Tr.hexToBase64,
        encodeOptionalSpanContext: Ha
    };
    function Ef(t) {
        var e, r;
        if (t === void 0) return hf;
        let n = (e = t.useLongBits) !== null && e !== void 0 ? e : !0, o = (r = t.useHex) !== null && r !== void 0 ? r : !1;
        return {
            encodeHrTime: n ? Mn : df,
            encodeSpanContext: o ? Ba : Tr.hexToBase64,
            encodeOptionalSpanContext: o ? Ba : Ha
        };
    }
    K.getOtlpEncoder = Ef;
});
var xn = _((Sr)=>{
    "use strict";
    Object.defineProperty(Sr, "__esModule", {
        value: !0
    });
    Sr.createExportTraceServiceRequest = void 0;
    var mf = Cn(), Tf = Ua(), Sf = Fa();
    function gf(t, e) {
        let r = (0, Sf.getOtlpEncoder)(e);
        return {
            resourceSpans: vf(t, r)
        };
    }
    Sr.createExportTraceServiceRequest = gf;
    function yf(t) {
        let e = new Map;
        for (let r of t){
            let n = e.get(r.resource);
            n || (n = new Map, e.set(r.resource, n));
            let o = `${r.instrumentationLibrary.name}@${r.instrumentationLibrary.version || ""}:${r.instrumentationLibrary.schemaUrl || ""}`, i = n.get(o);
            i || (i = [], n.set(o, i)), i.push(r);
        }
        return e;
    }
    function vf(t, e) {
        let r = yf(t), n = [], o = r.entries(), i = o.next();
        for(; !i.done;){
            let [s, u] = i.value, c = [], a = u.values(), l = a.next();
            for(; !l.done;){
                let d = l.value;
                if (d.length > 0) {
                    let { name: g, version: U, schemaUrl: P } = d[0].instrumentationLibrary, B = d.map((A)=>(0, Tf.sdkSpanToOtlpSpan)(A, e));
                    c.push({
                        scope: {
                            name: g,
                            version: U
                        },
                        spans: B,
                        schemaUrl: P
                    });
                }
                l = a.next();
            }
            let p = {
                resource: {
                    attributes: (0, mf.toAttributes)(s.attributes),
                    droppedAttributesCount: 0
                },
                scopeSpans: c,
                schemaUrl: void 0
            };
            n.push(p), i = o.next();
        }
        return n;
    }
});
var qa = _((I)=>{
    "use strict";
    Object.defineProperty(I, "__esModule", {
        value: !0
    });
    I.parseRetryAfterToMills = I.isExportRetryable = I.invalidTimeout = I.configureExporterTimeout = I.appendRootPathToUrlIfNeeded = I.appendResourcePathToUrl = I.parseHeaders = I.DEFAULT_EXPORT_BACKOFF_MULTIPLIER = I.DEFAULT_EXPORT_MAX_BACKOFF = I.DEFAULT_EXPORT_INITIAL_BACKOFF = I.DEFAULT_EXPORT_MAX_ATTEMPTS = void 0;
    var Dn = (E(), w(f)), ja = C(), ka = 1e4;
    I.DEFAULT_EXPORT_MAX_ATTEMPTS = 5;
    I.DEFAULT_EXPORT_INITIAL_BACKOFF = 1e3;
    I.DEFAULT_EXPORT_MAX_BACKOFF = 5e3;
    I.DEFAULT_EXPORT_BACKOFF_MULTIPLIER = 1.5;
    function Af(t = {}) {
        let e = {};
        return Object.entries(t).forEach(([r, n])=>{
            typeof n < "u" ? e[r] = String(n) : Dn.diag.warn(`Header "${r}" has wrong value and will be ignored`);
        }), e;
    }
    I.parseHeaders = Af;
    function Of(t, e) {
        return t.endsWith("/") || (t = t + "/"), t + e;
    }
    I.appendResourcePathToUrl = Of;
    function Rf(t) {
        try {
            let e = new URL(t);
            return e.pathname === "" && (e.pathname = e.pathname + "/"), e.toString();
        } catch  {
            return Dn.diag.warn(`Could not parse export URL: '${t}'`), t;
        }
    }
    I.appendRootPathToUrlIfNeeded = Rf;
    function bf(t) {
        return typeof t == "number" ? t <= 0 ? Un(t, ka) : t : Lf();
    }
    I.configureExporterTimeout = bf;
    function Lf() {
        var t;
        let e = Number((t = (0, ja.getEnv)().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && t !== void 0 ? t : (0, ja.getEnv)().OTEL_EXPORTER_OTLP_TIMEOUT);
        return e <= 0 ? Un(e, ka) : e;
    }
    function Un(t, e) {
        return Dn.diag.warn("Timeout must be greater than 0", t), e;
    }
    I.invalidTimeout = Un;
    function Pf(t) {
        return [
            429,
            502,
            503,
            504
        ].includes(t);
    }
    I.isExportRetryable = Pf;
    function If(t) {
        if (t == null) return -1;
        let e = Number.parseInt(t, 10);
        if (Number.isInteger(e)) return e > 0 ? e * 1e3 : -1;
        let r = new Date(t).getTime() - Date.now();
        return r >= 0 ? r : 0;
    }
    I.parseRetryAfterToMills = If;
});
var Ka = _((gr)=>{
    "use strict";
    Object.defineProperty(gr, "__esModule", {
        value: !0
    });
    gr.OTLPExporterBase = void 0;
    var Xa = (E(), w(f)), dt = C(), Cf = qa(), Bn = class {
        constructor(e = {}){
            this._sendingPromises = [], this.url = this.getDefaultUrl(e), typeof e.hostname == "string" && (this.hostname = e.hostname), this.shutdown = this.shutdown.bind(this), this._shutdownOnce = new dt.BindOnceFuture(this._shutdown, this), this._concurrencyLimit = typeof e.concurrencyLimit == "number" ? e.concurrencyLimit : 30, this.timeoutMillis = (0, Cf.configureExporterTimeout)(e.timeoutMillis), this.onInit(e);
        }
        export(e, r) {
            if (this._shutdownOnce.isCalled) {
                r({
                    code: dt.ExportResultCode.FAILED,
                    error: new Error("Exporter has been shutdown")
                });
                return;
            }
            if (this._sendingPromises.length >= this._concurrencyLimit) {
                r({
                    code: dt.ExportResultCode.FAILED,
                    error: new Error("Concurrent export limit reached")
                });
                return;
            }
            this._export(e).then(()=>{
                r({
                    code: dt.ExportResultCode.SUCCESS
                });
            }).catch((n)=>{
                r({
                    code: dt.ExportResultCode.FAILED,
                    error: n
                });
            });
        }
        _export(e) {
            return new Promise((r, n)=>{
                try {
                    Xa.diag.debug("items to be sent", e), this.send(e, r, n);
                } catch (o) {
                    n(o);
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
            return Xa.diag.debug("shutdown started"), this.onShutdown(), this.forceFlush();
        }
    };
    gr.OTLPExporterBase = Bn;
});
var $a = _((gE, za)=>{
    "use strict";
    za.exports = Mf;
    function Mf(t, e) {
        for(var r = new Array(arguments.length - 1), n = 0, o = 2, i = !0; o < arguments.length;)r[n++] = arguments[o++];
        return new Promise(function(u, c) {
            r[n] = function(l) {
                if (i) if (i = !1, l) c(l);
                else {
                    for(var p = new Array(arguments.length - 1), d = 0; d < p.length;)p[d++] = arguments[d];
                    u.apply(null, p);
                }
            };
            try {
                t.apply(e || null, r);
            } catch (a) {
                i && (i = !1, c(a));
            }
        });
    }
});
var es = _((Ja)=>{
    "use strict";
    var vr = Ja;
    vr.length = function(e) {
        var r = e.length;
        if (!r) return 0;
        for(var n = 0; --r % 4 > 1 && e.charAt(r) === "=";)++n;
        return Math.ceil(e.length * 3) / 4 - n;
    };
    var Je = new Array(64), Za = new Array(123);
    for(Z = 0; Z < 64;)Za[Je[Z] = Z < 26 ? Z + 65 : Z < 52 ? Z + 71 : Z < 62 ? Z - 4 : Z - 59 | 43] = Z++;
    var Z;
    vr.encode = function(e, r, n) {
        for(var o = null, i = [], s = 0, u = 0, c; r < n;){
            var a = e[r++];
            switch(u){
                case 0:
                    i[s++] = Je[a >> 2], c = (a & 3) << 4, u = 1;
                    break;
                case 1:
                    i[s++] = Je[c | a >> 4], c = (a & 15) << 2, u = 2;
                    break;
                case 2:
                    i[s++] = Je[c | a >> 6], i[s++] = Je[a & 63], u = 0;
                    break;
            }
            s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), s = 0);
        }
        return u && (i[s++] = Je[c], i[s++] = 61, u === 1 && (i[s++] = 61)), o ? (s && o.push(String.fromCharCode.apply(String, i.slice(0, s))), o.join("")) : String.fromCharCode.apply(String, i.slice(0, s));
    };
    var Qa = "invalid encoding";
    vr.decode = function(e, r, n) {
        for(var o = n, i = 0, s, u = 0; u < e.length;){
            var c = e.charCodeAt(u++);
            if (c === 61 && i > 1) break;
            if ((c = Za[c]) === void 0) throw Error(Qa);
            switch(i){
                case 0:
                    s = c, i = 1;
                    break;
                case 1:
                    r[n++] = s << 2 | (c & 48) >> 4, s = c, i = 2;
                    break;
                case 2:
                    r[n++] = (s & 15) << 4 | (c & 60) >> 2, s = c, i = 3;
                    break;
                case 3:
                    r[n++] = (s & 3) << 6 | c, i = 0;
                    break;
            }
        }
        if (i === 1) throw Error(Qa);
        return n - o;
    };
    vr.test = function(e) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);
    };
});
var rs = _((vE, ts)=>{
    "use strict";
    ts.exports = Ar;
    function Ar() {
        this._listeners = {};
    }
    Ar.prototype.on = function(e, r, n) {
        return (this._listeners[e] || (this._listeners[e] = [])).push({
            fn: r,
            ctx: n || this
        }), this;
    };
    Ar.prototype.off = function(e, r) {
        if (e === void 0) this._listeners = {};
        else if (r === void 0) this._listeners[e] = [];
        else for(var n = this._listeners[e], o = 0; o < n.length;)n[o].fn === r ? n.splice(o, 1) : ++o;
        return this;
    };
    Ar.prototype.emit = function(e) {
        var r = this._listeners[e];
        if (r) {
            for(var n = [], o = 1; o < arguments.length;)n.push(arguments[o++]);
            for(o = 0; o < r.length;)r[o].fn.apply(r[o++].ctx, n);
        }
        return this;
    };
});
var cs = _((AE, us)=>{
    "use strict";
    us.exports = ns(ns);
    function ns(t) {
        return typeof Float32Array < "u" ? function() {
            var e = new Float32Array([
                -0
            ]), r = new Uint8Array(e.buffer), n = r[3] === 128;
            function o(c, a, l) {
                e[0] = c, a[l] = r[0], a[l + 1] = r[1], a[l + 2] = r[2], a[l + 3] = r[3];
            }
            function i(c, a, l) {
                e[0] = c, a[l] = r[3], a[l + 1] = r[2], a[l + 2] = r[1], a[l + 3] = r[0];
            }
            t.writeFloatLE = n ? o : i, t.writeFloatBE = n ? i : o;
            function s(c, a) {
                return r[0] = c[a], r[1] = c[a + 1], r[2] = c[a + 2], r[3] = c[a + 3], e[0];
            }
            function u(c, a) {
                return r[3] = c[a], r[2] = c[a + 1], r[1] = c[a + 2], r[0] = c[a + 3], e[0];
            }
            t.readFloatLE = n ? s : u, t.readFloatBE = n ? u : s;
        }() : function() {
            function e(n, o, i, s) {
                var u = o < 0 ? 1 : 0;
                if (u && (o = -o), o === 0) n(1 / o > 0 ? 0 : 2147483648, i, s);
                else if (isNaN(o)) n(2143289344, i, s);
                else if (o > 34028234663852886e22) n((u << 31 | 2139095040) >>> 0, i, s);
                else if (o < 11754943508222875e-54) n((u << 31 | Math.round(o / 1401298464324817e-60)) >>> 0, i, s);
                else {
                    var c = Math.floor(Math.log(o) / Math.LN2), a = Math.round(o * Math.pow(2, -c) * 8388608) & 8388607;
                    n((u << 31 | c + 127 << 23 | a) >>> 0, i, s);
                }
            }
            t.writeFloatLE = e.bind(null, is), t.writeFloatBE = e.bind(null, os);
            function r(n, o, i) {
                var s = n(o, i), u = (s >> 31) * 2 + 1, c = s >>> 23 & 255, a = s & 8388607;
                return c === 255 ? a ? NaN : u * (1 / 0) : c === 0 ? u * 1401298464324817e-60 * a : u * Math.pow(2, c - 150) * (a + 8388608);
            }
            t.readFloatLE = r.bind(null, as), t.readFloatBE = r.bind(null, ss);
        }(), typeof Float64Array < "u" ? function() {
            var e = new Float64Array([
                -0
            ]), r = new Uint8Array(e.buffer), n = r[7] === 128;
            function o(c, a, l) {
                e[0] = c, a[l] = r[0], a[l + 1] = r[1], a[l + 2] = r[2], a[l + 3] = r[3], a[l + 4] = r[4], a[l + 5] = r[5], a[l + 6] = r[6], a[l + 7] = r[7];
            }
            function i(c, a, l) {
                e[0] = c, a[l] = r[7], a[l + 1] = r[6], a[l + 2] = r[5], a[l + 3] = r[4], a[l + 4] = r[3], a[l + 5] = r[2], a[l + 6] = r[1], a[l + 7] = r[0];
            }
            t.writeDoubleLE = n ? o : i, t.writeDoubleBE = n ? i : o;
            function s(c, a) {
                return r[0] = c[a], r[1] = c[a + 1], r[2] = c[a + 2], r[3] = c[a + 3], r[4] = c[a + 4], r[5] = c[a + 5], r[6] = c[a + 6], r[7] = c[a + 7], e[0];
            }
            function u(c, a) {
                return r[7] = c[a], r[6] = c[a + 1], r[5] = c[a + 2], r[4] = c[a + 3], r[3] = c[a + 4], r[2] = c[a + 5], r[1] = c[a + 6], r[0] = c[a + 7], e[0];
            }
            t.readDoubleLE = n ? s : u, t.readDoubleBE = n ? u : s;
        }() : function() {
            function e(n, o, i, s, u, c) {
                var a = s < 0 ? 1 : 0;
                if (a && (s = -s), s === 0) n(0, u, c + o), n(1 / s > 0 ? 0 : 2147483648, u, c + i);
                else if (isNaN(s)) n(0, u, c + o), n(2146959360, u, c + i);
                else if (s > 17976931348623157e292) n(0, u, c + o), n((a << 31 | 2146435072) >>> 0, u, c + i);
                else {
                    var l;
                    if (s < 22250738585072014e-324) l = s / 5e-324, n(l >>> 0, u, c + o), n((a << 31 | l / 4294967296) >>> 0, u, c + i);
                    else {
                        var p = Math.floor(Math.log(s) / Math.LN2);
                        p === 1024 && (p = 1023), l = s * Math.pow(2, -p), n(l * 4503599627370496 >>> 0, u, c + o), n((a << 31 | p + 1023 << 20 | l * 1048576 & 1048575) >>> 0, u, c + i);
                    }
                }
            }
            t.writeDoubleLE = e.bind(null, is, 0, 4), t.writeDoubleBE = e.bind(null, os, 4, 0);
            function r(n, o, i, s, u) {
                var c = n(s, u + o), a = n(s, u + i), l = (a >> 31) * 2 + 1, p = a >>> 20 & 2047, d = 4294967296 * (a & 1048575) + c;
                return p === 2047 ? d ? NaN : l * (1 / 0) : p === 0 ? l * 5e-324 * d : l * Math.pow(2, p - 1075) * (d + 4503599627370496);
            }
            t.readDoubleLE = r.bind(null, as, 0, 4), t.readDoubleBE = r.bind(null, ss, 4, 0);
        }(), t;
    }
    function is(t, e, r) {
        e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24;
    }
    function os(t, e, r) {
        e[r] = t >>> 24, e[r + 1] = t >>> 16 & 255, e[r + 2] = t >>> 8 & 255, e[r + 3] = t & 255;
    }
    function as(t, e) {
        return (t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24) >>> 0;
    }
    function ss(t, e) {
        return (t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3]) >>> 0;
    }
});
var fs = _((OE, ls)=>{
    "use strict";
    ls.exports = xf;
    function xf(t) {
        return null;
    }
});
var _s = _((ps)=>{
    "use strict";
    var Vn = ps;
    Vn.length = function(e) {
        for(var r = 0, n = 0, o = 0; o < e.length; ++o)n = e.charCodeAt(o), n < 128 ? r += 1 : n < 2048 ? r += 2 : (n & 64512) === 55296 && (e.charCodeAt(o + 1) & 64512) === 56320 ? (++o, r += 4) : r += 3;
        return r;
    };
    Vn.read = function(e, r, n) {
        var o = n - r;
        if (o < 1) return "";
        for(var i = null, s = [], u = 0, c; r < n;)c = e[r++], c < 128 ? s[u++] = c : c > 191 && c < 224 ? s[u++] = (c & 31) << 6 | e[r++] & 63 : c > 239 && c < 365 ? (c = ((c & 7) << 18 | (e[r++] & 63) << 12 | (e[r++] & 63) << 6 | e[r++] & 63) - 65536, s[u++] = 55296 + (c >> 10), s[u++] = 56320 + (c & 1023)) : s[u++] = (c & 15) << 12 | (e[r++] & 63) << 6 | e[r++] & 63, u > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, s)), u = 0);
        return i ? (u && i.push(String.fromCharCode.apply(String, s.slice(0, u))), i.join("")) : String.fromCharCode.apply(String, s.slice(0, u));
    };
    Vn.write = function(e, r, n) {
        for(var o = n, i, s, u = 0; u < e.length; ++u)i = e.charCodeAt(u), i < 128 ? r[n++] = i : i < 2048 ? (r[n++] = i >> 6 | 192, r[n++] = i & 63 | 128) : (i & 64512) === 55296 && ((s = e.charCodeAt(u + 1)) & 64512) === 56320 ? (i = 65536 + ((i & 1023) << 10) + (s & 1023), ++u, r[n++] = i >> 18 | 240, r[n++] = i >> 12 & 63 | 128, r[n++] = i >> 6 & 63 | 128, r[n++] = i & 63 | 128) : (r[n++] = i >> 12 | 224, r[n++] = i >> 6 & 63 | 128, r[n++] = i & 63 | 128);
        return n - o;
    };
});
var hs = _((bE, ds)=>{
    "use strict";
    ds.exports = Df;
    function Df(t, e, r) {
        var n = r || 8192, o = n >>> 1, i = null, s = n;
        return function(c) {
            if (c < 1 || c > o) return t(c);
            s + c > n && (i = t(n), s = 0);
            var a = e.call(i, s, s += c);
            return s & 7 && (s = (s | 7) + 1), a;
        };
    }
});
var ms = _((LE, Es)=>{
    "use strict";
    Es.exports = D;
    var ht = be();
    function D(t, e) {
        this.lo = t >>> 0, this.hi = e >>> 0;
    }
    var De = D.zero = new D(0, 0);
    De.toNumber = function() {
        return 0;
    };
    De.zzEncode = De.zzDecode = function() {
        return this;
    };
    De.length = function() {
        return 1;
    };
    var Uf = D.zeroHash = "\0\0\0\0\0\0\0\0";
    D.fromNumber = function(e) {
        if (e === 0) return De;
        var r = e < 0;
        r && (e = -e);
        var n = e >>> 0, o = (e - n) / 4294967296 >>> 0;
        return r && (o = ~o >>> 0, n = ~n >>> 0, ++n > 4294967295 && (n = 0, ++o > 4294967295 && (o = 0))), new D(n, o);
    };
    D.from = function(e) {
        if (typeof e == "number") return D.fromNumber(e);
        if (ht.isString(e)) if (ht.Long) e = ht.Long.fromString(e);
        else return D.fromNumber(parseInt(e, 10));
        return e.low || e.high ? new D(e.low >>> 0, e.high >>> 0) : De;
    };
    D.prototype.toNumber = function(e) {
        if (!e && this.hi >>> 31) {
            var r = ~this.lo + 1 >>> 0, n = ~this.hi >>> 0;
            return r || (n = n + 1 >>> 0), -(r + n * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
    };
    D.prototype.toLong = function(e) {
        return ht.Long ? new ht.Long(this.lo | 0, this.hi | 0, !!e) : {
            low: this.lo | 0,
            high: this.hi | 0,
            unsigned: !!e
        };
    };
    var Re = String.prototype.charCodeAt;
    D.fromHash = function(e) {
        return e === Uf ? De : new D((Re.call(e, 0) | Re.call(e, 1) << 8 | Re.call(e, 2) << 16 | Re.call(e, 3) << 24) >>> 0, (Re.call(e, 4) | Re.call(e, 5) << 8 | Re.call(e, 6) << 16 | Re.call(e, 7) << 24) >>> 0);
    };
    D.prototype.toHash = function() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    D.prototype.zzEncode = function() {
        var e = this.hi >> 31;
        return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this;
    };
    D.prototype.zzDecode = function() {
        var e = -(this.lo & 1);
        return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this;
    };
    D.prototype.length = function() {
        var e = this.lo, r = (this.lo >>> 28 | this.hi << 4) >>> 0, n = this.hi >>> 24;
        return n === 0 ? r === 0 ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : r < 16384 ? r < 128 ? 5 : 6 : r < 2097152 ? 7 : 8 : n < 128 ? 9 : 10;
    };
});
var be = _((Hn)=>{
    "use strict";
    var h = Hn;
    h.asPromise = $a();
    h.base64 = es();
    h.EventEmitter = rs();
    h.float = cs();
    h.inquire = fs();
    h.utf8 = _s();
    h.pool = hs();
    h.LongBits = ms();
    h.isNode = !!(typeof global < "u" && global && global.process && global.process.versions && global.process.versions.node);
    h.global = h.isNode && global || typeof window < "u" && window || typeof self < "u" && self || Hn;
    h.emptyArray = Object.freeze ? Object.freeze([]) : [];
    h.emptyObject = Object.freeze ? Object.freeze({}) : {};
    h.isInteger = Number.isInteger || function(e) {
        return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
    };
    h.isString = function(e) {
        return typeof e == "string" || e instanceof String;
    };
    h.isObject = function(e) {
        return e && typeof e == "object";
    };
    h.isset = h.isSet = function(e, r) {
        var n = e[r];
        return n != null && e.hasOwnProperty(r) ? typeof n != "object" || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0 : !1;
    };
    h.Buffer = function() {
        try {
            var t = h.inquire("buffer").Buffer;
            return t.prototype.utf8Write ? t : null;
        } catch  {
            return null;
        }
    }();
    h._Buffer_from = null;
    h._Buffer_allocUnsafe = null;
    h.newBuffer = function(e) {
        return typeof e == "number" ? h.Buffer ? h._Buffer_allocUnsafe(e) : new h.Array(e) : h.Buffer ? h._Buffer_from(e) : typeof Uint8Array > "u" ? e : new Uint8Array(e);
    };
    h.Array = typeof Uint8Array < "u" ? Uint8Array : Array;
    h.Long = h.global.dcodeIO && h.global.dcodeIO.Long || h.global.Long || h.inquire("long");
    h.key2Re = /^true|false|0|1$/;
    h.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    h.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    h.longToHash = function(e) {
        return e ? h.LongBits.from(e).toHash() : h.LongBits.zeroHash;
    };
    h.longFromHash = function(e, r) {
        var n = h.LongBits.fromHash(e);
        return h.Long ? h.Long.fromBits(n.lo, n.hi, r) : n.toNumber(!!r);
    };
    function Ts(t, e, r) {
        for(var n = Object.keys(e), o = 0; o < n.length; ++o)(t[n[o]] === void 0 || !r) && (t[n[o]] = e[n[o]]);
        return t;
    }
    h.merge = Ts;
    h.lcFirst = function(e) {
        return e.charAt(0).toLowerCase() + e.substring(1);
    };
    function Ss(t) {
        function e(r, n) {
            if (!(this instanceof e)) return new e(r, n);
            Object.defineProperty(this, "message", {
                get: function() {
                    return r;
                }
            }), Error.captureStackTrace ? Error.captureStackTrace(this, e) : Object.defineProperty(this, "stack", {
                value: new Error().stack || ""
            }), n && Ts(this, n);
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
                    return t;
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
    h.newError = Ss;
    h.ProtocolError = Ss("ProtocolError");
    h.oneOfGetter = function(e) {
        for(var r = {}, n = 0; n < e.length; ++n)r[e[n]] = 1;
        return function() {
            for(var o = Object.keys(this), i = o.length - 1; i > -1; --i)if (r[o[i]] === 1 && this[o[i]] !== void 0 && this[o[i]] !== null) return o[i];
        };
    };
    h.oneOfSetter = function(e) {
        return function(r) {
            for(var n = 0; n < e.length; ++n)e[n] !== r && delete this[e[n]];
        };
    };
    h.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0
    };
    h._configure = function() {
        var t = h.Buffer;
        if (!t) {
            h._Buffer_from = h._Buffer_allocUnsafe = null;
            return;
        }
        h._Buffer_from = t.from !== Uint8Array.from && t.from || function(r, n) {
            return new t(r, n);
        }, h._Buffer_allocUnsafe = t.allocUnsafe || function(r) {
            return new t(r);
        };
    };
});
var Wn = _((IE, As)=>{
    "use strict";
    As.exports = S;
    var W = be(), Fn, Or = W.LongBits, gs = W.base64, ys = W.utf8;
    function Et(t, e, r) {
        this.fn = t, this.len = e, this.next = void 0, this.val = r;
    }
    function kn() {}
    function Bf(t) {
        this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states;
    }
    function S() {
        this.len = 0, this.head = new Et(kn, 0, 0), this.tail = this.head, this.states = null;
    }
    var vs = function() {
        return W.Buffer ? function() {
            return (S.create = function() {
                return new Fn;
            })();
        } : function() {
            return new S;
        };
    };
    S.create = vs();
    S.alloc = function(e) {
        return new W.Array(e);
    };
    W.Array !== Array && (S.alloc = W.pool(S.alloc, W.Array.prototype.subarray));
    S.prototype._push = function(e, r, n) {
        return this.tail = this.tail.next = new Et(e, r, n), this.len += r, this;
    };
    function qn(t, e, r) {
        e[r] = t & 255;
    }
    function Gf(t, e, r) {
        for(; t > 127;)e[r++] = t & 127 | 128, t >>>= 7;
        e[r] = t;
    }
    function Xn(t, e) {
        this.len = t, this.next = void 0, this.val = e;
    }
    Xn.prototype = Object.create(Et.prototype);
    Xn.prototype.fn = Gf;
    S.prototype.uint32 = function(e) {
        return this.len += (this.tail = this.tail.next = new Xn((e = e >>> 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this;
    };
    S.prototype.int32 = function(e) {
        return e < 0 ? this._push(Kn, 10, Or.fromNumber(e)) : this.uint32(e);
    };
    S.prototype.sint32 = function(e) {
        return this.uint32((e << 1 ^ e >> 31) >>> 0);
    };
    function Kn(t, e, r) {
        for(; t.hi;)e[r++] = t.lo & 127 | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, t.hi >>>= 7;
        for(; t.lo > 127;)e[r++] = t.lo & 127 | 128, t.lo = t.lo >>> 7;
        e[r++] = t.lo;
    }
    S.prototype.uint64 = function(e) {
        var r = Or.from(e);
        return this._push(Kn, r.length(), r);
    };
    S.prototype.int64 = S.prototype.uint64;
    S.prototype.sint64 = function(e) {
        var r = Or.from(e).zzEncode();
        return this._push(Kn, r.length(), r);
    };
    S.prototype.bool = function(e) {
        return this._push(qn, 1, e ? 1 : 0);
    };
    function jn(t, e, r) {
        e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24;
    }
    S.prototype.fixed32 = function(e) {
        return this._push(jn, 4, e >>> 0);
    };
    S.prototype.sfixed32 = S.prototype.fixed32;
    S.prototype.fixed64 = function(e) {
        var r = Or.from(e);
        return this._push(jn, 4, r.lo)._push(jn, 4, r.hi);
    };
    S.prototype.sfixed64 = S.prototype.fixed64;
    S.prototype.float = function(e) {
        return this._push(W.float.writeFloatLE, 4, e);
    };
    S.prototype.double = function(e) {
        return this._push(W.float.writeDoubleLE, 8, e);
    };
    var Vf = W.Array.prototype.set ? function(e, r, n) {
        r.set(e, n);
    } : function(e, r, n) {
        for(var o = 0; o < e.length; ++o)r[n + o] = e[o];
    };
    S.prototype.bytes = function(e) {
        var r = e.length >>> 0;
        if (!r) return this._push(qn, 1, 0);
        if (W.isString(e)) {
            var n = S.alloc(r = gs.length(e));
            gs.decode(e, n, 0), e = n;
        }
        return this.uint32(r)._push(Vf, r, e);
    };
    S.prototype.string = function(e) {
        var r = ys.length(e);
        return r ? this.uint32(r)._push(ys.write, r, e) : this._push(qn, 1, 0);
    };
    S.prototype.fork = function() {
        return this.states = new Bf(this), this.head = this.tail = new Et(kn, 0, 0), this.len = 0, this;
    };
    S.prototype.reset = function() {
        return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new Et(kn, 0, 0), this.len = 0), this;
    };
    S.prototype.ldelim = function() {
        var e = this.head, r = this.tail, n = this.len;
        return this.reset().uint32(n), n && (this.tail.next = e.next, this.tail = r, this.len += n), this;
    };
    S.prototype.finish = function() {
        for(var e = this.head.next, r = this.constructor.alloc(this.len), n = 0; e;)e.fn(e.val, r, n), n += e.len, e = e.next;
        return r;
    };
    S._configure = function(t) {
        Fn = t, S.create = vs(), Fn._configure();
    };
});
var bs = _((CE, Rs)=>{
    "use strict";
    Rs.exports = ne;
    var Os = Wn();
    (ne.prototype = Object.create(Os.prototype)).constructor = ne;
    var Le = be();
    function ne() {
        Os.call(this);
    }
    ne._configure = function() {
        ne.alloc = Le._Buffer_allocUnsafe, ne.writeBytesBuffer = Le.Buffer && Le.Buffer.prototype instanceof Uint8Array && Le.Buffer.prototype.set.name === "set" ? function(e, r, n) {
            r.set(e, n);
        } : function(e, r, n) {
            if (e.copy) e.copy(r, n, 0, e.length);
            else for(var o = 0; o < e.length;)r[n++] = e[o++];
        };
    };
    ne.prototype.bytes = function(e) {
        Le.isString(e) && (e = Le._Buffer_from(e, "base64"));
        var r = e.length >>> 0;
        return this.uint32(r), r && this._push(ne.writeBytesBuffer, r, e), this;
    };
    function Hf(t, e, r) {
        t.length < 40 ? Le.utf8.write(t, e, r) : e.utf8Write ? e.utf8Write(t, r) : e.write(t, r);
    }
    ne.prototype.string = function(e) {
        var r = Le.Buffer.byteLength(e);
        return this.uint32(r), r && this._push(Hf, r, e), this;
    };
    ne._configure();
});
var $n = _((NE, Ns)=>{
    "use strict";
    Ns.exports = N;
    var J = be(), zn, Is = J.LongBits, Ff = J.utf8;
    function ee(t, e) {
        return RangeError("index out of range: " + t.pos + " + " + (e || 1) + " > " + t.len);
    }
    function N(t) {
        this.buf = t, this.pos = 0, this.len = t.length;
    }
    var Ls = typeof Uint8Array < "u" ? function(e) {
        if (e instanceof Uint8Array || Array.isArray(e)) return new N(e);
        throw Error("illegal buffer");
    } : function(e) {
        if (Array.isArray(e)) return new N(e);
        throw Error("illegal buffer");
    }, Cs = function() {
        return J.Buffer ? function(r) {
            return (N.create = function(o) {
                return J.Buffer.isBuffer(o) ? new zn(o) : Ls(o);
            })(r);
        } : Ls;
    };
    N.create = Cs();
    N.prototype._slice = J.Array.prototype.subarray || J.Array.prototype.slice;
    N.prototype.uint32 = function() {
        var e = 4294967295;
        return function() {
            if (e = (this.buf[this.pos] & 127) >>> 0, this.buf[this.pos++] < 128 || (e = (e | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) || (e = (e | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) || (e = (e | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) || (e = (e | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128)) return e;
            if ((this.pos += 5) > this.len) throw this.pos = this.len, ee(this, 10);
            return e;
        };
    }();
    N.prototype.int32 = function() {
        return this.uint32() | 0;
    };
    N.prototype.sint32 = function() {
        var e = this.uint32();
        return e >>> 1 ^ -(e & 1) | 0;
    };
    function Yn() {
        var t = new Is(0, 0), e = 0;
        if (this.len - this.pos > 4) {
            for(; e < 4; ++e)if (t.lo = (t.lo | (this.buf[this.pos] & 127) << e * 7) >>> 0, this.buf[this.pos++] < 128) return t;
            if (t.lo = (t.lo | (this.buf[this.pos] & 127) << 28) >>> 0, t.hi = (t.hi | (this.buf[this.pos] & 127) >> 4) >>> 0, this.buf[this.pos++] < 128) return t;
            e = 0;
        } else {
            for(; e < 3; ++e){
                if (this.pos >= this.len) throw ee(this);
                if (t.lo = (t.lo | (this.buf[this.pos] & 127) << e * 7) >>> 0, this.buf[this.pos++] < 128) return t;
            }
            return t.lo = (t.lo | (this.buf[this.pos++] & 127) << e * 7) >>> 0, t;
        }
        if (this.len - this.pos > 4) {
            for(; e < 5; ++e)if (t.hi = (t.hi | (this.buf[this.pos] & 127) << e * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return t;
        } else for(; e < 5; ++e){
            if (this.pos >= this.len) throw ee(this);
            if (t.hi = (t.hi | (this.buf[this.pos] & 127) << e * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return t;
        }
        throw Error("invalid varint encoding");
    }
    N.prototype.bool = function() {
        return this.uint32() !== 0;
    };
    function Rr(t, e) {
        return (t[e - 4] | t[e - 3] << 8 | t[e - 2] << 16 | t[e - 1] << 24) >>> 0;
    }
    N.prototype.fixed32 = function() {
        if (this.pos + 4 > this.len) throw ee(this, 4);
        return Rr(this.buf, this.pos += 4);
    };
    N.prototype.sfixed32 = function() {
        if (this.pos + 4 > this.len) throw ee(this, 4);
        return Rr(this.buf, this.pos += 4) | 0;
    };
    function Ps() {
        if (this.pos + 8 > this.len) throw ee(this, 8);
        return new Is(Rr(this.buf, this.pos += 4), Rr(this.buf, this.pos += 4));
    }
    N.prototype.float = function() {
        if (this.pos + 4 > this.len) throw ee(this, 4);
        var e = J.float.readFloatLE(this.buf, this.pos);
        return this.pos += 4, e;
    };
    N.prototype.double = function() {
        if (this.pos + 8 > this.len) throw ee(this, 4);
        var e = J.float.readDoubleLE(this.buf, this.pos);
        return this.pos += 8, e;
    };
    N.prototype.bytes = function() {
        var e = this.uint32(), r = this.pos, n = this.pos + e;
        if (n > this.len) throw ee(this, e);
        if (this.pos += e, Array.isArray(this.buf)) return this.buf.slice(r, n);
        if (r === n) {
            var o = J.Buffer;
            return o ? o.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, r, n);
    };
    N.prototype.string = function() {
        var e = this.bytes();
        return Ff.read(e, 0, e.length);
    };
    N.prototype.skip = function(e) {
        if (typeof e == "number") {
            if (this.pos + e > this.len) throw ee(this, e);
            this.pos += e;
        } else do if (this.pos >= this.len) throw ee(this);
        while (this.buf[this.pos++] & 128)
        return this;
    };
    N.prototype.skipType = function(t) {
        switch(t){
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
                for(; (t = this.uint32() & 7) !== 4;)this.skipType(t);
                break;
            case 5:
                this.skip(4);
                break;
            default:
                throw Error("invalid wire type " + t + " at offset " + this.pos);
        }
        return this;
    };
    N._configure = function(t) {
        zn = t, N.create = Cs(), zn._configure();
        var e = J.Long ? "toLong" : "toNumber";
        J.merge(N.prototype, {
            int64: function() {
                return Yn.call(this)[e](!1);
            },
            uint64: function() {
                return Yn.call(this)[e](!0);
            },
            sint64: function() {
                return Yn.call(this).zzDecode()[e](!1);
            },
            fixed64: function() {
                return Ps.call(this)[e](!0);
            },
            sfixed64: function() {
                return Ps.call(this)[e](!1);
            }
        });
    };
});
var Ds = _((wE, xs)=>{
    "use strict";
    xs.exports = Ue;
    var Ms = $n();
    (Ue.prototype = Object.create(Ms.prototype)).constructor = Ue;
    var ws = be();
    function Ue(t) {
        Ms.call(this, t);
    }
    Ue._configure = function() {
        ws.Buffer && (Ue.prototype._slice = ws.Buffer.prototype.slice);
    };
    Ue.prototype.string = function() {
        var e = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e, this.len));
    };
    Ue._configure();
});
var Bs = _((ME, Us)=>{
    "use strict";
    Us.exports = mt;
    var Qn = be();
    (mt.prototype = Object.create(Qn.EventEmitter.prototype)).constructor = mt;
    function mt(t, e, r) {
        if (typeof t != "function") throw TypeError("rpcImpl must be a function");
        Qn.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = !!e, this.responseDelimited = !!r;
    }
    mt.prototype.rpcCall = function t(e, r, n, o, i) {
        if (!o) throw TypeError("request must be specified");
        var s = this;
        if (!i) return Qn.asPromise(t, s, e, r, n, o);
        if (!s.rpcImpl) {
            setTimeout(function() {
                i(Error("already ended"));
            }, 0);
            return;
        }
        try {
            return s.rpcImpl(e, r[s.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), function(c, a) {
                if (c) return s.emit("error", c, e), i(c);
                if (a === null) {
                    s.end(!0);
                    return;
                }
                if (!(a instanceof n)) try {
                    a = n[s.responseDelimited ? "decodeDelimited" : "decode"](a);
                } catch (l) {
                    return s.emit("error", l, e), i(l);
                }
                return s.emit("data", a, e), i(null, a);
            });
        } catch (u) {
            s.emit("error", u, e), setTimeout(function() {
                i(u);
            }, 0);
            return;
        }
    };
    mt.prototype.end = function(e) {
        return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
    };
});
var Vs = _((Gs)=>{
    "use strict";
    var jf = Gs;
    jf.Service = Bs();
});
var Fs = _((DE, Hs)=>{
    "use strict";
    Hs.exports = {};
});
var qs = _((ks)=>{
    "use strict";
    var j = ks;
    j.build = "minimal";
    j.Writer = Wn();
    j.BufferWriter = bs();
    j.Reader = $n();
    j.BufferReader = Ds();
    j.util = be();
    j.rpc = Vs();
    j.roots = Fs();
    j.configure = js;
    function js() {
        j.util._configure(), j.Writer._configure(j.BufferWriter), j.Reader._configure(j.BufferReader);
    }
    js();
});
var Ks = _((BE, Xs)=>{
    "use strict";
    Xs.exports = qs();
});
E();
var We = y(C());
E();
var b = y(C()), Te = y(me());
var co = "exception";
var sl = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, ul = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, lo = function() {
    function t(e, r, n, o, i, s, u, c, a, l) {
        u === void 0 && (u = []), this.attributes = {}, this.links = [], this.events = [], this._droppedAttributesCount = 0, this._droppedEventsCount = 0, this._droppedLinksCount = 0, this.status = {
            code: f.SpanStatusCode.UNSET
        }, this.endTime = [
            0,
            0
        ], this._ended = !1, this._duration = [
            -1,
            -1
        ], this.name = n, this._spanContext = o, this.parentSpanId = s, this.kind = i, this.links = u;
        var p = Date.now();
        this._performanceStartTime = b.otperformance.now(), this._performanceOffset = p - (this._performanceStartTime + (0, b.getTimeOrigin)()), this._startTimeProvided = c != null, this.startTime = this._getTime(c ?? p), this.resource = e.resource, this.instrumentationLibrary = e.instrumentationLibrary, this._spanLimits = e.getSpanLimits(), l != null && this.setAttributes(l), this._spanProcessor = e.getActiveSpanProcessor(), this._spanProcessor.onStart(this, r), this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
    }
    return t.prototype.spanContext = function() {
        return this._spanContext;
    }, t.prototype.setAttribute = function(e, r) {
        return r == null || this._isSpanEnded() ? this : e.length === 0 ? (f.diag.warn("Invalid attribute key: " + e), this) : (0, b.isAttributeValue)(r) ? Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, e) ? (this._droppedAttributesCount++, this) : (this.attributes[e] = this._truncateToSize(r), this) : (f.diag.warn("Invalid attribute value set for key: " + e), this);
    }, t.prototype.setAttributes = function(e) {
        var r, n;
        try {
            for(var o = sl(Object.entries(e)), i = o.next(); !i.done; i = o.next()){
                var s = ul(i.value, 2), u = s[0], c = s[1];
                this.setAttribute(u, c);
            }
        } catch (a) {
            r = {
                error: a
            };
        } finally{
            try {
                i && !i.done && (n = o.return) && n.call(o);
            } finally{
                if (r) throw r.error;
            }
        }
        return this;
    }, t.prototype.addEvent = function(e, r, n) {
        if (this._isSpanEnded()) return this;
        if (this._spanLimits.eventCountLimit === 0) return f.diag.warn("No events allowed."), this._droppedEventsCount++, this;
        this.events.length >= this._spanLimits.eventCountLimit && (f.diag.warn("Dropping extra events."), this.events.shift(), this._droppedEventsCount++), (0, b.isTimeInput)(r) && ((0, b.isTimeInput)(n) || (n = r), r = void 0);
        var o = (0, b.sanitizeAttributes)(r);
        return this.events.push({
            name: e,
            attributes: o,
            time: this._getTime(n),
            droppedAttributesCount: 0
        }), this;
    }, t.prototype.setStatus = function(e) {
        return this._isSpanEnded() ? this : (this.status = e, this);
    }, t.prototype.updateName = function(e) {
        return this._isSpanEnded() ? this : (this.name = e, this);
    }, t.prototype.end = function(e) {
        if (this._isSpanEnded()) {
            f.diag.error(this.name + " " + this._spanContext.traceId + "-" + this._spanContext.spanId + " - You can only call end() on a span once.");
            return;
        }
        this._ended = !0, this.endTime = this._getTime(e), this._duration = (0, b.hrTimeDuration)(this.startTime, this.endTime), this._duration[0] < 0 && (f.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime), this.endTime = this.startTime.slice(), this._duration = [
            0,
            0
        ]), this._spanProcessor.onEnd(this);
    }, t.prototype._getTime = function(e) {
        if (typeof e == "number" && e < b.otperformance.now()) return (0, b.hrTime)(e + this._performanceOffset);
        if (typeof e == "number") return (0, b.millisToHrTime)(e);
        if (e instanceof Date) return (0, b.millisToHrTime)(e.getTime());
        if ((0, b.isTimeInputHrTime)(e)) return e;
        if (this._startTimeProvided) return (0, b.millisToHrTime)(Date.now());
        var r = b.otperformance.now() - this._performanceStartTime;
        return (0, b.addHrTimes)(this.startTime, (0, b.millisToHrTime)(r));
    }, t.prototype.isRecording = function() {
        return this._ended === !1;
    }, t.prototype.recordException = function(e, r) {
        var n = {};
        typeof e == "string" ? n[Te.SemanticAttributes.EXCEPTION_MESSAGE] = e : e && (e.code ? n[Te.SemanticAttributes.EXCEPTION_TYPE] = e.code.toString() : e.name && (n[Te.SemanticAttributes.EXCEPTION_TYPE] = e.name), e.message && (n[Te.SemanticAttributes.EXCEPTION_MESSAGE] = e.message), e.stack && (n[Te.SemanticAttributes.EXCEPTION_STACKTRACE] = e.stack)), n[Te.SemanticAttributes.EXCEPTION_TYPE] || n[Te.SemanticAttributes.EXCEPTION_MESSAGE] ? this.addEvent(co, n, r) : f.diag.warn("Failed to record an exception " + e);
    }, Object.defineProperty(t.prototype, "duration", {
        get: function() {
            return this._duration;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ended", {
        get: function() {
            return this._ended;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "droppedAttributesCount", {
        get: function() {
            return this._droppedAttributesCount;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "droppedEventsCount", {
        get: function() {
            return this._droppedEventsCount;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "droppedLinksCount", {
        get: function() {
            return this._droppedLinksCount;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype._isSpanEnded = function() {
        return this._ended && f.diag.warn("Can not execute the operation on ended Span {traceId: " + this._spanContext.traceId + ", spanId: " + this._spanContext.spanId + "}"), this._ended;
    }, t.prototype._truncateToLimitUtil = function(e, r) {
        return e.length <= r ? e : e.substr(0, r);
    }, t.prototype._truncateToSize = function(e) {
        var r = this, n = this._attributeValueLengthLimit;
        return n <= 0 ? (f.diag.warn("Attribute value limit must be positive, got " + n), e) : typeof e == "string" ? this._truncateToLimitUtil(e, n) : Array.isArray(e) ? e.map(function(o) {
            return typeof o == "string" ? r._truncateToLimitUtil(o, n) : o;
        }) : e;
    }, t;
}();
E();
var M = y(C());
var oe;
(function(t) {
    t[t.NOT_RECORD = 0] = "NOT_RECORD", t[t.RECORD = 1] = "RECORD", t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
})(oe || (oe = {}));
var ae = function() {
    function t() {}
    return t.prototype.shouldSample = function() {
        return {
            decision: oe.NOT_RECORD
        };
    }, t.prototype.toString = function() {
        return "AlwaysOffSampler";
    }, t;
}();
var X = function() {
    function t() {}
    return t.prototype.shouldSample = function() {
        return {
            decision: oe.RECORD_AND_SAMPLED
        };
    }, t.prototype.toString = function() {
        return "AlwaysOnSampler";
    }, t;
}();
E();
var fo = y(C());
var Se = function() {
    function t(e) {
        var r, n, o, i;
        this._root = e.root, this._root || ((0, fo.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured")), this._root = new X), this._remoteParentSampled = (r = e.remoteParentSampled) !== null && r !== void 0 ? r : new X, this._remoteParentNotSampled = (n = e.remoteParentNotSampled) !== null && n !== void 0 ? n : new ae, this._localParentSampled = (o = e.localParentSampled) !== null && o !== void 0 ? o : new X, this._localParentNotSampled = (i = e.localParentNotSampled) !== null && i !== void 0 ? i : new ae;
    }
    return t.prototype.shouldSample = function(e, r, n, o, i, s) {
        var u = f.trace.getSpanContext(e);
        return !u || !(0, f.isSpanContextValid)(u) ? this._root.shouldSample(e, r, n, o, i, s) : u.isRemote ? u.traceFlags & f.TraceFlags.SAMPLED ? this._remoteParentSampled.shouldSample(e, r, n, o, i, s) : this._remoteParentNotSampled.shouldSample(e, r, n, o, i, s) : u.traceFlags & f.TraceFlags.SAMPLED ? this._localParentSampled.shouldSample(e, r, n, o, i, s) : this._localParentNotSampled.shouldSample(e, r, n, o, i, s);
    }, t.prototype.toString = function() {
        return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}";
    }, t;
}();
E();
var ke = function() {
    function t(e) {
        e === void 0 && (e = 0), this._ratio = e, this._ratio = this._normalize(e), this._upperBound = Math.floor(this._ratio * 4294967295);
    }
    return t.prototype.shouldSample = function(e, r) {
        return {
            decision: (0, f.isValidTraceId)(r) && this._accumulate(r) < this._upperBound ? oe.RECORD_AND_SAMPLED : oe.NOT_RECORD
        };
    }, t.prototype.toString = function() {
        return "TraceIdRatioBased{" + this._ratio + "}";
    }, t.prototype._normalize = function(e) {
        return typeof e != "number" || isNaN(e) ? 0 : e >= 1 ? 1 : e <= 0 ? 0 : e;
    }, t.prototype._accumulate = function(e) {
        for(var r = 0, n = 0; n < e.length / 8; n++){
            var o = n * 8, i = parseInt(e.slice(o, o + 8), 16);
            r = (r ^ i) >>> 0;
        }
        return r;
    }, t;
}();
var cl = (0, M.getEnv)(), ll = M.TracesSamplerValues.AlwaysOn, qe = 1;
function Jt() {
    return {
        sampler: pn(cl),
        forceFlushTimeoutMillis: 3e4,
        generalLimits: {
            attributeValueLengthLimit: (0, M.getEnv)().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, M.getEnv)().OTEL_ATTRIBUTE_COUNT_LIMIT
        },
        spanLimits: {
            attributeValueLengthLimit: (0, M.getEnv)().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, M.getEnv)().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
            linkCountLimit: (0, M.getEnv)().OTEL_SPAN_LINK_COUNT_LIMIT,
            eventCountLimit: (0, M.getEnv)().OTEL_SPAN_EVENT_COUNT_LIMIT,
            attributePerEventCountLimit: (0, M.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
            attributePerLinkCountLimit: (0, M.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
        }
    };
}
function pn(t) {
    switch(t === void 0 && (t = (0, M.getEnv)()), t.OTEL_TRACES_SAMPLER){
        case M.TracesSamplerValues.AlwaysOn:
            return new X;
        case M.TracesSamplerValues.AlwaysOff:
            return new ae;
        case M.TracesSamplerValues.ParentBasedAlwaysOn:
            return new Se({
                root: new X
            });
        case M.TracesSamplerValues.ParentBasedAlwaysOff:
            return new Se({
                root: new ae
            });
        case M.TracesSamplerValues.TraceIdRatio:
            return new ke(po(t));
        case M.TracesSamplerValues.ParentBasedTraceIdRatio:
            return new Se({
                root: new ke(po(t))
            });
        default:
            return f.diag.error('OTEL_TRACES_SAMPLER value "' + t.OTEL_TRACES_SAMPLER + " invalid, defaulting to " + ll + '".'), new X;
    }
}
function po(t) {
    if (t.OTEL_TRACES_SAMPLER_ARG === void 0 || t.OTEL_TRACES_SAMPLER_ARG === "") return f.diag.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to " + qe + "."), qe;
    var e = Number(t.OTEL_TRACES_SAMPLER_ARG);
    return isNaN(e) ? (f.diag.error("OTEL_TRACES_SAMPLER_ARG=" + t.OTEL_TRACES_SAMPLER_ARG + " was given, but it is invalid, defaulting to " + qe + "."), qe) : e < 0 || e > 1 ? (f.diag.error("OTEL_TRACES_SAMPLER_ARG=" + t.OTEL_TRACES_SAMPLER_ARG + " was given, but it is out of range ([0..1]), defaulting to " + qe + "."), qe) : e;
}
var Xe = y(C());
function _o(t) {
    var e = {
        sampler: pn()
    }, r = Jt(), n = Object.assign({}, r, e, t);
    return n.generalLimits = Object.assign({}, r.generalLimits, t.generalLimits || {}), n.spanLimits = Object.assign({}, r.spanLimits, t.spanLimits || {}), n;
}
function ho(t) {
    var e, r, n, o, i, s, u, c, a, l, p, d, g = Object.assign({}, t.spanLimits), U = (0, Xe.getEnvWithoutDefaults)();
    return g.attributeCountLimit = (s = (i = (o = (r = (e = t.spanLimits) === null || e === void 0 ? void 0 : e.attributeCountLimit) !== null && r !== void 0 ? r : (n = t.generalLimits) === null || n === void 0 ? void 0 : n.attributeCountLimit) !== null && o !== void 0 ? o : U.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && i !== void 0 ? i : U.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && s !== void 0 ? s : Xe.DEFAULT_ATTRIBUTE_COUNT_LIMIT, g.attributeValueLengthLimit = (d = (p = (l = (c = (u = t.spanLimits) === null || u === void 0 ? void 0 : u.attributeValueLengthLimit) !== null && c !== void 0 ? c : (a = t.generalLimits) === null || a === void 0 ? void 0 : a.attributeValueLengthLimit) !== null && l !== void 0 ? l : U.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && p !== void 0 ? p : U.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && d !== void 0 ? d : Xe.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT, Object.assign({}, t, {
        spanLimits: g
    });
}
E();
var q = y(C()), Eo = function() {
    function t(e, r) {
        this._exporter = e, this._isExporting = !1, this._finishedSpans = [], this._droppedSpansCount = 0;
        var n = (0, q.getEnv)();
        this._maxExportBatchSize = typeof r?.maxExportBatchSize == "number" ? r.maxExportBatchSize : n.OTEL_BSP_MAX_EXPORT_BATCH_SIZE, this._maxQueueSize = typeof r?.maxQueueSize == "number" ? r.maxQueueSize : n.OTEL_BSP_MAX_QUEUE_SIZE, this._scheduledDelayMillis = typeof r?.scheduledDelayMillis == "number" ? r.scheduledDelayMillis : n.OTEL_BSP_SCHEDULE_DELAY, this._exportTimeoutMillis = typeof r?.exportTimeoutMillis == "number" ? r.exportTimeoutMillis : n.OTEL_BSP_EXPORT_TIMEOUT, this._shutdownOnce = new q.BindOnceFuture(this._shutdown, this), this._maxExportBatchSize > this._maxQueueSize && (f.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"), this._maxExportBatchSize = this._maxQueueSize);
    }
    return t.prototype.forceFlush = function() {
        return this._shutdownOnce.isCalled ? this._shutdownOnce.promise : this._flushAll();
    }, t.prototype.onStart = function(e, r) {}, t.prototype.onEnd = function(e) {
        this._shutdownOnce.isCalled || e.spanContext().traceFlags & f.TraceFlags.SAMPLED && this._addToBuffer(e);
    }, t.prototype.shutdown = function() {
        return this._shutdownOnce.call();
    }, t.prototype._shutdown = function() {
        var e = this;
        return Promise.resolve().then(function() {
            return e.onShutdown();
        }).then(function() {
            return e._flushAll();
        }).then(function() {
            return e._exporter.shutdown();
        });
    }, t.prototype._addToBuffer = function(e) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
            this._droppedSpansCount === 0 && f.diag.debug("maxQueueSize reached, dropping spans"), this._droppedSpansCount++;
            return;
        }
        this._droppedSpansCount > 0 && (f.diag.warn("Dropped " + this._droppedSpansCount + " spans because maxQueueSize reached"), this._droppedSpansCount = 0), this._finishedSpans.push(e), this._maybeStartTimer();
    }, t.prototype._flushAll = function() {
        var e = this;
        return new Promise(function(r, n) {
            for(var o = [], i = Math.ceil(e._finishedSpans.length / e._maxExportBatchSize), s = 0, u = i; s < u; s++)o.push(e._flushOneBatch());
            Promise.all(o).then(function() {
                r();
            }).catch(n);
        });
    }, t.prototype._flushOneBatch = function() {
        var e = this;
        return this._clearTimer(), this._finishedSpans.length === 0 ? Promise.resolve() : new Promise(function(r, n) {
            var o = setTimeout(function() {
                n(new Error("Timeout"));
            }, e._exportTimeoutMillis);
            f.context.with((0, q.suppressTracing)(f.context.active()), function() {
                var i = e._finishedSpans.splice(0, e._maxExportBatchSize), s = function() {
                    return e._exporter.export(i, function(c) {
                        var a;
                        clearTimeout(o), c.code === q.ExportResultCode.SUCCESS ? r() : n((a = c.error) !== null && a !== void 0 ? a : new Error("BatchSpanProcessor: span export failed"));
                    });
                }, u = i.map(function(c) {
                    return c.resource;
                }).filter(function(c) {
                    return c.asyncAttributesPending;
                });
                u.length === 0 ? s() : Promise.all(u.map(function(c) {
                    var a;
                    return (a = c.waitForAsyncAttributes) === null || a === void 0 ? void 0 : a.call(c);
                })).then(s, function(c) {
                    (0, q.globalErrorHandler)(c), n(c);
                });
            });
        });
    }, t.prototype._maybeStartTimer = function() {
        var e = this;
        if (!this._isExporting) {
            var r = function() {
                e._isExporting = !0, e._flushOneBatch().then(function() {
                    e._isExporting = !1, e._finishedSpans.length > 0 && (e._clearTimer(), e._maybeStartTimer());
                }).catch(function(n) {
                    e._isExporting = !1, (0, q.globalErrorHandler)(n);
                });
            };
            if (this._finishedSpans.length >= this._maxExportBatchSize) return r();
            this._timer === void 0 && (this._timer = setTimeout(function() {
                return r();
            }, this._scheduledDelayMillis), (0, q.unrefTimer)(this._timer));
        }
    }, t.prototype._clearTimer = function() {
        this._timer !== void 0 && (clearTimeout(this._timer), this._timer = void 0);
    }, t;
}();
var fl = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), Ke = function(t) {
    fl(e, t);
    function e(r, n) {
        var o = t.call(this, r, n) || this;
        return o.onInit(n), o;
    }
    return e.prototype.onInit = function(r) {
        var n = this;
        r?.disableAutoFlushOnDocumentHide !== !0 && typeof document < "u" && (this._visibilityChangeListener = function() {
            document.visibilityState === "hidden" && n.forceFlush();
        }, this._pageHideListener = function() {
            n.forceFlush();
        }, document.addEventListener("visibilitychange", this._visibilityChangeListener), document.addEventListener("pagehide", this._pageHideListener));
    }, e.prototype.onShutdown = function() {
        typeof document < "u" && (this._visibilityChangeListener && document.removeEventListener("visibilitychange", this._visibilityChangeListener), this._pageHideListener && document.removeEventListener("pagehide", this._pageHideListener));
    }, e;
}(Eo);
var pl = 8, _l = 16, tr = function() {
    function t() {
        this.generateTraceId = mo(_l), this.generateSpanId = mo(pl);
    }
    return t;
}();
var er = Array(32);
function mo(t) {
    return function() {
        for(var r = 0; r < t * 2; r++)er[r] = Math.floor(Math.random() * 16) + 48, er[r] >= 58 && (er[r] += 39);
        return String.fromCharCode.apply(null, er.slice(0, t * 2));
    };
}
var To = function() {
    function t(e, r, n) {
        this._tracerProvider = n;
        var o = _o(r);
        this._sampler = o.sampler, this._generalLimits = o.generalLimits, this._spanLimits = o.spanLimits, this._idGenerator = r.idGenerator || new tr, this.resource = n.resource, this.instrumentationLibrary = e;
    }
    return t.prototype.startSpan = function(e, r, n) {
        var o, i, s;
        r === void 0 && (r = {}), n === void 0 && (n = f.context.active()), r.root && (n = f.trace.deleteSpan(n));
        var u = f.trace.getSpan(n);
        if ((0, We.isTracingSuppressed)(n)) {
            f.diag.debug("Instrumentation suppressed, returning Noop Span");
            var c = f.trace.wrapSpanContext(f.INVALID_SPAN_CONTEXT);
            return c;
        }
        var a = u?.spanContext(), l = this._idGenerator.generateSpanId(), p, d, g;
        !a || !f.trace.isSpanContextValid(a) ? p = this._idGenerator.generateTraceId() : (p = a.traceId, d = a.traceState, g = a.spanId);
        var U = (o = r.kind) !== null && o !== void 0 ? o : f.SpanKind.INTERNAL, P = ((i = r.links) !== null && i !== void 0 ? i : []).map(function(St) {
            return {
                context: St.context,
                attributes: (0, We.sanitizeAttributes)(St.attributes)
            };
        }), B = (0, We.sanitizeAttributes)(r.attributes), A = this._sampler.shouldSample(n, p, e, U, B, P);
        d = (s = A.traceState) !== null && s !== void 0 ? s : d;
        var m = A.decision === f.SamplingDecision.RECORD_AND_SAMPLED ? f.TraceFlags.SAMPLED : f.TraceFlags.NONE, ie = {
            traceId: p,
            spanId: l,
            traceFlags: m,
            traceState: d
        };
        if (A.decision === f.SamplingDecision.NOT_RECORD) {
            f.diag.debug("Recording is off, propagating context in a non-recording span");
            var c = f.trace.wrapSpanContext(ie);
            return c;
        }
        var Tt = (0, We.sanitizeAttributes)(Object.assign(B, A.attributes)), Lr = new lo(this, n, e, ie, U, g, P, r.startTime, void 0, Tt);
        return Lr;
    }, t.prototype.startActiveSpan = function(e, r, n, o) {
        var i, s, u;
        if (!(arguments.length < 2)) {
            arguments.length === 2 ? u = r : arguments.length === 3 ? (i = r, u = n) : (i = r, s = n, u = o);
            var c = s ?? f.context.active(), a = this.startSpan(e, i, c), l = f.trace.setSpan(c, a);
            return f.context.with(l, u, void 0, a);
        }
    }, t.prototype.getGeneralLimits = function() {
        return this._generalLimits;
    }, t.prototype.getSpanLimits = function() {
        return this._spanLimits;
    }, t.prototype.getActiveSpanProcessor = function() {
        return this._tracerProvider.getActiveSpanProcessor();
    }, t;
}();
E();
var $ = y(C());
E();
var ge = y(me()), rr = y(C());
function So() {
    return "unknown_service";
}
var ye = function() {
    return ye = Object.assign || function(t) {
        for(var e, r = 1, n = arguments.length; r < n; r++){
            e = arguments[r];
            for(var o in e)Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
        return t;
    }, ye.apply(this, arguments);
}, dl = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, hl = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, El = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, F = function() {
    function t(e, r) {
        var n = this, o;
        this._attributes = e, this.asyncAttributesPending = r != null, this._syncAttributes = (o = this._attributes) !== null && o !== void 0 ? o : {}, this._asyncAttributesPromise = r?.then(function(i) {
            return n._attributes = Object.assign({}, n._attributes, i), n.asyncAttributesPending = !1, i;
        }, function(i) {
            return f.diag.debug("a resource's async attributes promise rejected: %s", i), n.asyncAttributesPending = !1, {};
        });
    }
    return t.empty = function() {
        return t.EMPTY;
    }, t.default = function() {
        var e;
        return new t((e = {}, e[ge.SemanticResourceAttributes.SERVICE_NAME] = So(), e[ge.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE] = rr.SDK_INFO[ge.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE], e[ge.SemanticResourceAttributes.TELEMETRY_SDK_NAME] = rr.SDK_INFO[ge.SemanticResourceAttributes.TELEMETRY_SDK_NAME], e[ge.SemanticResourceAttributes.TELEMETRY_SDK_VERSION] = rr.SDK_INFO[ge.SemanticResourceAttributes.TELEMETRY_SDK_VERSION], e));
    }, Object.defineProperty(t.prototype, "attributes", {
        get: function() {
            var e;
            return this.asyncAttributesPending && f.diag.error("Accessing resource attributes before async attributes settled"), (e = this._attributes) !== null && e !== void 0 ? e : {};
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.waitForAsyncAttributes = function() {
        return dl(this, void 0, void 0, function() {
            return hl(this, function(e) {
                switch(e.label){
                    case 0:
                        return this.asyncAttributesPending ? [
                            4,
                            this._asyncAttributesPromise
                        ] : [
                            3,
                            2
                        ];
                    case 1:
                        e.sent(), e.label = 2;
                    case 2:
                        return [
                            2
                        ];
                }
            });
        });
    }, t.prototype.merge = function(e) {
        var r = this, n;
        if (!e) return this;
        var o = ye(ye({}, this._syncAttributes), (n = e._syncAttributes) !== null && n !== void 0 ? n : e.attributes);
        if (!this._asyncAttributesPromise && !e._asyncAttributesPromise) return new t(o);
        var i = Promise.all([
            this._asyncAttributesPromise,
            e._asyncAttributesPromise
        ]).then(function(s) {
            var u, c = El(s, 2), a = c[0], l = c[1];
            return ye(ye(ye(ye({}, r._syncAttributes), a), (u = e._syncAttributes) !== null && u !== void 0 ? u : e.attributes), l);
        });
        return new t(o, i);
    }, t.EMPTY = new t({}), t;
}();
E();
var go = y(C()), yo = y(me());
var ml = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Tl = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, Sl = function() {
    function t() {
        this._MAX_LENGTH = 255, this._COMMA_SEPARATOR = ",", this._LABEL_KEY_VALUE_SPLITTER = "=", this._ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.", this._ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
    }
    return t.prototype.detect = function(e) {
        var r = {}, n = (0, go.getEnv)(), o = n.OTEL_RESOURCE_ATTRIBUTES, i = n.OTEL_SERVICE_NAME;
        if (o) try {
            var s = this._parseResourceAttributes(o);
            Object.assign(r, s);
        } catch (u) {
            f.diag.debug("EnvDetector failed: " + u.message);
        }
        return i && (r[yo.SemanticResourceAttributes.SERVICE_NAME] = i), new F(r);
    }, t.prototype._parseResourceAttributes = function(e) {
        var r, n;
        if (!e) return {};
        var o = {}, i = e.split(this._COMMA_SEPARATOR, -1);
        try {
            for(var s = ml(i), u = s.next(); !u.done; u = s.next()){
                var c = u.value, a = c.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
                if (a.length === 2) {
                    var l = Tl(a, 2), p = l[0], d = l[1];
                    if (p = p.trim(), d = d.trim().split(/^"|"$/).join(""), !this._isValidAndNotEmpty(p)) throw new Error("Attribute key " + this._ERROR_MESSAGE_INVALID_CHARS);
                    if (!this._isValid(d)) throw new Error("Attribute value " + this._ERROR_MESSAGE_INVALID_VALUE);
                    o[p] = decodeURIComponent(d);
                }
            }
        } catch (g) {
            r = {
                error: g
            };
        } finally{
            try {
                u && !u.done && (n = s.return) && n.call(s);
            } finally{
                if (r) throw r.error;
            }
        }
        return o;
    }, t.prototype._isValid = function(e) {
        return e.length <= this._MAX_LENGTH && this._isBaggageOctetString(e);
    }, t.prototype._isBaggageOctetString = function(e) {
        for(var r = 0; r < e.length; r++){
            var n = e.charCodeAt(r);
            if (n < 33 || n === 44 || n === 59 || n === 92 || n > 126) return !1;
        }
        return !0;
    }, t.prototype._isValidAndNotEmpty = function(e) {
        return e.length > 0 && this._isValid(e);
    }, t;
}(), vo = new Sl;
E();
var Ao = function(t) {
    return t !== null && typeof t == "object" && typeof t.then == "function";
};
var gl = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, yl = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
};
var Oo = function(t) {
    var e;
    t === void 0 && (t = {});
    var r = ((e = t.detectors) !== null && e !== void 0 ? e : []).map(function(o) {
        try {
            var i = o.detect(t), s;
            if (Ao(i)) {
                var u = function() {
                    return gl(void 0, void 0, void 0, function() {
                        var c;
                        return yl(this, function(a) {
                            switch(a.label){
                                case 0:
                                    return [
                                        4,
                                        i
                                    ];
                                case 1:
                                    return c = a.sent(), [
                                        2,
                                        c.attributes
                                    ];
                            }
                        });
                    });
                };
                s = new F({}, u());
            } else s = i;
            return s.waitForAsyncAttributes ? s.waitForAsyncAttributes().then(function() {
                return f.diag.debug(o.constructor.name + " found resource.", s);
            }) : f.diag.debug(o.constructor.name + " found resource.", s), s;
        } catch (c) {
            return f.diag.error(o.constructor.name + " failed: " + c.message), F.empty();
        }
    }), n = r.reduce(function(o, i) {
        return o.merge(i);
    }, F.empty());
    return n.waitForAsyncAttributes && n.waitForAsyncAttributes().then(function() {
        vl(r);
    }), n;
}, vl = function(t) {
    t.forEach(function(e) {
        if (Object.keys(e.attributes).length > 0) {
            var r = JSON.stringify(e.attributes, null, 4);
            f.diag.verbose(r);
        }
    });
};
var Ro = y(C()), nr = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, bo = function() {
    function t(e) {
        this._spanProcessors = e;
    }
    return t.prototype.forceFlush = function() {
        var e, r, n = [];
        try {
            for(var o = nr(this._spanProcessors), i = o.next(); !i.done; i = o.next()){
                var s = i.value;
                n.push(s.forceFlush());
            }
        } catch (u) {
            e = {
                error: u
            };
        } finally{
            try {
                i && !i.done && (r = o.return) && r.call(o);
            } finally{
                if (e) throw e.error;
            }
        }
        return new Promise(function(u) {
            Promise.all(n).then(function() {
                u();
            }).catch(function(c) {
                (0, Ro.globalErrorHandler)(c || new Error("MultiSpanProcessor: forceFlush failed")), u();
            });
        });
    }, t.prototype.onStart = function(e, r) {
        var n, o;
        try {
            for(var i = nr(this._spanProcessors), s = i.next(); !s.done; s = i.next()){
                var u = s.value;
                u.onStart(e, r);
            }
        } catch (c) {
            n = {
                error: c
            };
        } finally{
            try {
                s && !s.done && (o = i.return) && o.call(i);
            } finally{
                if (n) throw n.error;
            }
        }
    }, t.prototype.onEnd = function(e) {
        var r, n;
        try {
            for(var o = nr(this._spanProcessors), i = o.next(); !i.done; i = o.next()){
                var s = i.value;
                s.onEnd(e);
            }
        } catch (u) {
            r = {
                error: u
            };
        } finally{
            try {
                i && !i.done && (n = o.return) && n.call(o);
            } finally{
                if (r) throw r.error;
            }
        }
    }, t.prototype.shutdown = function() {
        var e, r, n = [];
        try {
            for(var o = nr(this._spanProcessors), i = o.next(); !i.done; i = o.next()){
                var s = i.value;
                n.push(s.shutdown());
            }
        } catch (u) {
            e = {
                error: u
            };
        } finally{
            try {
                i && !i.done && (r = o.return) && r.call(o);
            } finally{
                if (e) throw e.error;
            }
        }
        return new Promise(function(u, c) {
            Promise.all(n).then(function() {
                u();
            }, c);
        });
    }, t;
}();
var Lo = function() {
    function t() {}
    return t.prototype.onStart = function(e, r) {}, t.prototype.onEnd = function(e) {}, t.prototype.shutdown = function() {
        return Promise.resolve();
    }, t.prototype.forceFlush = function() {
        return Promise.resolve();
    }, t;
}();
var xe;
(function(t) {
    t[t.resolved = 0] = "resolved", t[t.timeout = 1] = "timeout", t[t.error = 2] = "error", t[t.unresolved = 3] = "unresolved";
})(xe || (xe = {}));
var Po = function() {
    function t(e) {
        e === void 0 && (e = {});
        var r;
        this._registeredSpanProcessors = [], this._tracers = new Map;
        var n = (0, $.merge)({}, Jt(), ho(e));
        this.resource = (r = n.resource) !== null && r !== void 0 ? r : F.empty(), this.resource = F.default().merge(this.resource), this._config = Object.assign({}, n, {
            resource: this.resource
        });
        var o = this._buildExporterFromEnv();
        if (o !== void 0) {
            var i = new Ke(o);
            this.activeSpanProcessor = i;
        } else this.activeSpanProcessor = new Lo;
    }
    return t.prototype.getTracer = function(e, r, n) {
        var o = e + "@" + (r || "") + ":" + (n?.schemaUrl || "");
        return this._tracers.has(o) || this._tracers.set(o, new To({
            name: e,
            version: r,
            schemaUrl: n?.schemaUrl
        }, this._config, this)), this._tracers.get(o);
    }, t.prototype.addSpanProcessor = function(e) {
        this._registeredSpanProcessors.length === 0 && this.activeSpanProcessor.shutdown().catch(function(r) {
            return f.diag.error("Error while trying to shutdown current span processor", r);
        }), this._registeredSpanProcessors.push(e), this.activeSpanProcessor = new bo(this._registeredSpanProcessors);
    }, t.prototype.getActiveSpanProcessor = function() {
        return this.activeSpanProcessor;
    }, t.prototype.register = function(e) {
        e === void 0 && (e = {}), f.trace.setGlobalTracerProvider(this), e.propagator === void 0 && (e.propagator = this._buildPropagatorFromEnv()), e.contextManager && f.context.setGlobalContextManager(e.contextManager), e.propagator && f.propagation.setGlobalPropagator(e.propagator);
    }, t.prototype.forceFlush = function() {
        var e = this._config.forceFlushTimeoutMillis, r = this._registeredSpanProcessors.map(function(n) {
            return new Promise(function(o) {
                var i, s = setTimeout(function() {
                    o(new Error("Span processor did not completed within timeout period of " + e + " ms")), i = xe.timeout;
                }, e);
                n.forceFlush().then(function() {
                    clearTimeout(s), i !== xe.timeout && (i = xe.resolved, o(i));
                }).catch(function(u) {
                    clearTimeout(s), i = xe.error, o(u);
                });
            });
        });
        return new Promise(function(n, o) {
            Promise.all(r).then(function(i) {
                var s = i.filter(function(u) {
                    return u !== xe.resolved;
                });
                s.length > 0 ? o(s) : n();
            }).catch(function(i) {
                return o([
                    i
                ]);
            });
        });
    }, t.prototype.shutdown = function() {
        return this.activeSpanProcessor.shutdown();
    }, t.prototype._getPropagator = function(e) {
        var r;
        return (r = this.constructor._registeredPropagators.get(e)) === null || r === void 0 ? void 0 : r();
    }, t.prototype._getSpanExporter = function(e) {
        var r;
        return (r = this.constructor._registeredExporters.get(e)) === null || r === void 0 ? void 0 : r();
    }, t.prototype._buildPropagatorFromEnv = function() {
        var e = this, r = Array.from(new Set((0, $.getEnv)().OTEL_PROPAGATORS)), n = r.map(function(i) {
            var s = e._getPropagator(i);
            return s || f.diag.warn('Propagator "' + i + '" requested through environment variable is unavailable.'), s;
        }), o = n.reduce(function(i, s) {
            return s && i.push(s), i;
        }, []);
        if (o.length !== 0) return r.length === 1 ? o[0] : new $.CompositePropagator({
            propagators: o
        });
    }, t.prototype._buildExporterFromEnv = function() {
        var e = (0, $.getEnv)().OTEL_TRACES_EXPORTER;
        if (!(e === "none" || e === "")) {
            var r = this._getSpanExporter(e);
            return r || f.diag.error('Exporter "' + e + '" requested through environment variable is unavailable.'), r;
        }
    }, t._registeredPropagators = new Map([
        [
            "tracecontext",
            function() {
                return new $.W3CTraceContextPropagator;
            }
        ],
        [
            "baggage",
            function() {
                return new $.W3CBaggagePropagator;
            }
        ]
    ]), t._registeredExporters = new Map, t;
}();
E();
var se = {};
Y(se, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$opentelemetry$2b$api$2d$logs$40$0$2e$51$2e$1$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$facade$3e$__);
;
var tu = y(wo(), 1);
E();
var or = y(C());
E();
E();
E();
var Ye = y(C()), bl = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Ll = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, Mo = function() {
    function t(e, r, n) {
        this.attributes = {}, this.totalAttributesCount = 0, this._isReadonly = !1;
        var o = n.timestamp, i = n.observedTimestamp, s = n.severityNumber, u = n.severityText, c = n.body, a = n.attributes, l = a === void 0 ? {} : a, p = n.context, d = Date.now();
        if (this.hrTime = (0, Ye.timeInputToHrTime)(o ?? d), this.hrTimeObserved = (0, Ye.timeInputToHrTime)(i ?? d), p) {
            var g = f.trace.getSpanContext(p);
            g && f.isSpanContextValid(g) && (this.spanContext = g);
        }
        this.severityNumber = s, this.severityText = u, this.body = c, this.resource = e.resource, this.instrumentationScope = r, this._logRecordLimits = e.logRecordLimits, this.setAttributes(l);
    }
    return Object.defineProperty(t.prototype, "severityText", {
        get: function() {
            return this._severityText;
        },
        set: function(e) {
            this._isLogRecordReadonly() || (this._severityText = e);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "severityNumber", {
        get: function() {
            return this._severityNumber;
        },
        set: function(e) {
            this._isLogRecordReadonly() || (this._severityNumber = e);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "body", {
        get: function() {
            return this._body;
        },
        set: function(e) {
            this._isLogRecordReadonly() || (this._body = e);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "droppedAttributesCount", {
        get: function() {
            return this.totalAttributesCount - Object.keys(this.attributes).length;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.setAttribute = function(e, r) {
        return this._isLogRecordReadonly() ? this : r === null ? this : e.length === 0 ? (f.diag.warn("Invalid attribute key: " + e), this) : !(0, Ye.isAttributeValue)(r) && !(typeof r == "object" && !Array.isArray(r) && Object.keys(r).length > 0) ? (f.diag.warn("Invalid attribute value set for key: " + e), this) : (this.totalAttributesCount += 1, Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, e) ? this : ((0, Ye.isAttributeValue)(r) ? this.attributes[e] = this._truncateToSize(r) : this.attributes[e] = r, this));
    }, t.prototype.setAttributes = function(e) {
        var r, n;
        try {
            for(var o = bl(Object.entries(e)), i = o.next(); !i.done; i = o.next()){
                var s = Ll(i.value, 2), u = s[0], c = s[1];
                this.setAttribute(u, c);
            }
        } catch (a) {
            r = {
                error: a
            };
        } finally{
            try {
                i && !i.done && (n = o.return) && n.call(o);
            } finally{
                if (r) throw r.error;
            }
        }
        return this;
    }, t.prototype.setBody = function(e) {
        return this.body = e, this;
    }, t.prototype.setSeverityNumber = function(e) {
        return this.severityNumber = e, this;
    }, t.prototype.setSeverityText = function(e) {
        return this.severityText = e, this;
    }, t.prototype._makeReadonly = function() {
        this._isReadonly = !0;
    }, t.prototype._truncateToSize = function(e) {
        var r = this, n = this._logRecordLimits.attributeValueLengthLimit;
        return n <= 0 ? (f.diag.warn("Attribute value limit must be positive, got " + n), e) : typeof e == "string" ? this._truncateToLimitUtil(e, n) : Array.isArray(e) ? e.map(function(o) {
            return typeof o == "string" ? r._truncateToLimitUtil(o, n) : o;
        }) : e;
    }, t.prototype._truncateToLimitUtil = function(e, r) {
        return e.length <= r ? e : e.substring(0, r);
    }, t.prototype._isLogRecordReadonly = function() {
        return this._isReadonly && f.diag.warn("Can not execute the operation on emitted log record"), this._isReadonly;
    }, t;
}();
var dn = function() {
    return dn = Object.assign || function(t) {
        for(var e, r = 1, n = arguments.length; r < n; r++){
            e = arguments[r];
            for(var o in e)Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
        return t;
    }, dn.apply(this, arguments);
}, xo = function() {
    function t(e, r) {
        this.instrumentationScope = e, this._sharedState = r;
    }
    return t.prototype.emit = function(e) {
        var r = e.context || f.context.active(), n = new Mo(this._sharedState, this.instrumentationScope, dn({
            context: r
        }, e));
        this._sharedState.activeProcessor.onEmit(n, r), n._makeReadonly();
    }, t;
}();
var ue = y(C());
function Do() {
    return {
        forceFlushTimeoutMillis: 3e4,
        logRecordLimits: {
            attributeValueLengthLimit: (0, ue.getEnv)().OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, ue.getEnv)().OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT
        },
        includeTraceContext: !0
    };
}
function Uo(t) {
    var e, r, n, o, i, s, u = (0, ue.getEnvWithoutDefaults)();
    return {
        attributeCountLimit: (n = (r = (e = t.attributeCountLimit) !== null && e !== void 0 ? e : u.OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT) !== null && r !== void 0 ? r : u.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && n !== void 0 ? n : ue.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        attributeValueLengthLimit: (s = (i = (o = t.attributeValueLengthLimit) !== null && o !== void 0 ? o : u.OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && i !== void 0 ? i : u.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && s !== void 0 ? s : ue.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT
    };
}
var Vo = y(C()), Bo = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, Go = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, Ho = function() {
    function t(e, r) {
        this.processors = e, this.forceFlushTimeoutMillis = r;
    }
    return t.prototype.forceFlush = function() {
        return Bo(this, void 0, void 0, function() {
            var e;
            return Go(this, function(r) {
                switch(r.label){
                    case 0:
                        return e = this.forceFlushTimeoutMillis, [
                            4,
                            Promise.all(this.processors.map(function(n) {
                                return (0, Vo.callWithTimeout)(n.forceFlush(), e);
                            }))
                        ];
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, t.prototype.onEmit = function(e, r) {
        this.processors.forEach(function(n) {
            return n.onEmit(e, r);
        });
    }, t.prototype.shutdown = function() {
        return Bo(this, void 0, void 0, function() {
            return Go(this, function(e) {
                switch(e.label){
                    case 0:
                        return [
                            4,
                            Promise.all(this.processors.map(function(r) {
                                return r.shutdown();
                            }))
                        ];
                    case 1:
                        return e.sent(), [
                            2
                        ];
                }
            });
        });
    }, t;
}();
var Fo = function() {
    function t() {}
    return t.prototype.forceFlush = function() {
        return Promise.resolve();
    }, t.prototype.onEmit = function(e, r) {}, t.prototype.shutdown = function() {
        return Promise.resolve();
    }, t;
}();
var jo = function() {
    function t(e, r, n) {
        this.resource = e, this.forceFlushTimeoutMillis = r, this.logRecordLimits = n, this.loggers = new Map, this.registeredLogRecordProcessors = [], this.activeProcessor = new Fo;
    }
    return t;
}();
var Pl = "unknown", hn = function() {
    function t(e) {
        e === void 0 && (e = {});
        var r = (0, or.merge)({}, Do(), e), n = r.resource, o = n === void 0 ? F.default() : n, i = r.logRecordLimits, s = r.forceFlushTimeoutMillis;
        this._sharedState = new jo(o, s, Uo(i)), this._shutdownOnce = new or.BindOnceFuture(this._shutdown, this);
    }
    return t.prototype.getLogger = function(e, r, n) {
        if (this._shutdownOnce.isCalled) return f.diag.warn("A shutdown LoggerProvider cannot provide a Logger"), se.NOOP_LOGGER;
        e || f.diag.warn("Logger requested without instrumentation scope name.");
        var o = e || Pl, i = o + "@" + (r || "") + ":" + (n?.schemaUrl || "");
        return this._sharedState.loggers.has(i) || this._sharedState.loggers.set(i, new xo({
            name: o,
            version: r,
            schemaUrl: n?.schemaUrl
        }, this._sharedState)), this._sharedState.loggers.get(i);
    }, t.prototype.addLogRecordProcessor = function(e) {
        this._sharedState.registeredLogRecordProcessors.length === 0 && this._sharedState.activeProcessor.shutdown().catch(function(r) {
            return f.diag.error("Error while trying to shutdown current log record processor", r);
        }), this._sharedState.registeredLogRecordProcessors.push(e), this._sharedState.activeProcessor = new Ho(this._sharedState.registeredLogRecordProcessors, this._sharedState.forceFlushTimeoutMillis);
    }, t.prototype.forceFlush = function() {
        return this._shutdownOnce.isCalled ? (f.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"), this._shutdownOnce.promise) : this._sharedState.activeProcessor.forceFlush();
    }, t.prototype.shutdown = function() {
        return this._shutdownOnce.isCalled ? (f.diag.warn("shutdown may only be called once per LoggerProvider"), this._shutdownOnce.promise) : this._shutdownOnce.call();
    }, t.prototype._shutdown = function() {
        return this._sharedState.activeProcessor.shutdown();
    }, t;
}();
var ar;
(function(t) {
    t[t.DELTA = 0] = "DELTA", t[t.CUMULATIVE = 1] = "CUMULATIVE";
})(ar || (ar = {}));
var Il = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), ko = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, qo = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
};
var Cl = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function Xo(t) {
    return t != null;
}
function Ko(t) {
    var e = Object.keys(t);
    return e.length === 0 ? "" : (e = e.sort(), JSON.stringify(e.map(function(r) {
        return [
            r,
            t[r]
        ];
    })));
}
function Wo(t) {
    var e, r;
    return t.name + ":" + ((e = t.version) !== null && e !== void 0 ? e : "") + ":" + ((r = t.schemaUrl) !== null && r !== void 0 ? r : "");
}
var Nl = function(t) {
    Il(e, t);
    function e(r) {
        var n = t.call(this, r) || this;
        return Object.setPrototypeOf(n, e.prototype), n;
    }
    return e;
}(Error);
function En(t, e) {
    var r, n = new Promise(function(i, s) {
        r = setTimeout(function() {
            s(new Nl("Operation timed out."));
        }, e);
    });
    return Promise.race([
        t,
        n
    ]).then(function(o) {
        return clearTimeout(r), o;
    }, function(o) {
        throw clearTimeout(r), o;
    });
}
function Yo(t) {
    return ko(this, void 0, void 0, function() {
        var e = this;
        return qo(this, function(r) {
            return [
                2,
                Promise.all(t.map(function(n) {
                    return ko(e, void 0, void 0, function() {
                        var o, i;
                        return qo(this, function(s) {
                            switch(s.label){
                                case 0:
                                    return s.trys.push([
                                        0,
                                        2,
                                        ,
                                        3
                                    ]), [
                                        4,
                                        n
                                    ];
                                case 1:
                                    return o = s.sent(), [
                                        2,
                                        {
                                            status: "fulfilled",
                                            value: o
                                        }
                                    ];
                                case 2:
                                    return i = s.sent(), [
                                        2,
                                        {
                                            status: "rejected",
                                            reason: i
                                        }
                                    ];
                                case 3:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                }))
            ];
        });
    });
}
function zo(t) {
    return t.status === "rejected";
}
function $o(t, e) {
    var r, n;
    if (t.size !== e.size) return !1;
    try {
        for(var o = Cl(t), i = o.next(); !i.done; i = o.next()){
            var s = i.value;
            if (!e.has(s)) return !1;
        }
    } catch (u) {
        r = {
            error: u
        };
    } finally{
        try {
            i && !i.done && (n = o.return) && n.call(o);
        } finally{
            if (r) throw r.error;
        }
    }
    return !0;
}
function Qo(t, e) {
    return t.toLowerCase() === e.toLowerCase();
}
E();
var ce;
(function(t) {
    t.COUNTER = "COUNTER", t.HISTOGRAM = "HISTOGRAM", t.UP_DOWN_COUNTER = "UP_DOWN_COUNTER", t.OBSERVABLE_COUNTER = "OBSERVABLE_COUNTER", t.OBSERVABLE_GAUGE = "OBSERVABLE_GAUGE", t.OBSERVABLE_UP_DOWN_COUNTER = "OBSERVABLE_UP_DOWN_COUNTER";
})(ce || (ce = {}));
function le(t, e, r) {
    var n, o, i, s;
    return Ml(t) || f.diag.warn('Invalid metric name: "' + t + '". The metric name should be a ASCII string with a length no greater than 255 characters.'), {
        name: t,
        type: e,
        description: (n = r?.description) !== null && n !== void 0 ? n : "",
        unit: (o = r?.unit) !== null && o !== void 0 ? o : "",
        valueType: (i = r?.valueType) !== null && i !== void 0 ? i : f.ValueType.DOUBLE,
        advice: (s = r?.advice) !== null && s !== void 0 ? s : {}
    };
}
function Zo(t, e) {
    var r, n;
    return {
        name: (r = t.name) !== null && r !== void 0 ? r : e.name,
        description: (n = t.description) !== null && n !== void 0 ? n : e.description,
        type: e.type,
        unit: e.unit,
        valueType: e.valueType,
        advice: e.advice
    };
}
function Jo(t, e) {
    return Qo(t.name, e.name) && t.unit === e.unit && t.type === e.type && t.valueType === e.valueType;
}
var wl = /^[a-z][a-z0-9_.\-/]{0,254}$/i;
function Ml(t) {
    return t.match(wl) != null;
}
E();
var ea = function() {
    function t() {
        this._registeredViews = [];
    }
    return t.prototype.addView = function(e) {
        this._registeredViews.push(e);
    }, t.prototype.findViews = function(e, r) {
        var n = this, o = this._registeredViews.filter(function(i) {
            return n._matchInstrument(i.instrumentSelector, e) && n._matchMeter(i.meterSelector, r);
        });
        return o;
    }, t.prototype._matchInstrument = function(e, r) {
        return (e.getType() === void 0 || r.type === e.getType()) && e.getNameFilter().match(r.name) && e.getUnitFilter().match(r.unit);
    }, t.prototype._matchMeter = function(e, r) {
        return e.getNameFilter().match(r.name) && (r.version === void 0 || e.getVersionFilter().match(r.version)) && (r.schemaUrl === void 0 || e.getSchemaUrlFilter().match(r.schemaUrl));
    }, t;
}();
E();
var ta = y(C()), ze = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), mn = function() {
    function t(e, r) {
        this._writableMetricStorage = e, this._descriptor = r;
    }
    return t.prototype._record = function(e, r, n) {
        if (r === void 0 && (r = {}), n === void 0 && (n = f.context.active()), typeof e != "number") {
            f.diag.warn("non-number value provided to metric " + this._descriptor.name + ": " + e);
            return;
        }
        this._descriptor.valueType === f.ValueType.INT && !Number.isInteger(e) && (f.diag.warn("INT value type cannot accept a floating-point value for " + this._descriptor.name + ", ignoring the fractional digits."), e = Math.trunc(e), !Number.isInteger(e)) || this._writableMetricStorage.record(e, r, n, (0, ta.millisToHrTime)(Date.now()));
    }, t;
}();
var ra = function(t) {
    ze(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.add = function(r, n, o) {
        this._record(r, n, o);
    }, e;
}(mn);
var na = function(t) {
    ze(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.add = function(r, n, o) {
        if (r < 0) {
            f.diag.warn("negative value provided to counter " + this._descriptor.name + ": " + r);
            return;
        }
        this._record(r, n, o);
    }, e;
}(mn);
var ia = function(t) {
    ze(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.record = function(r, n, o) {
        if (r < 0) {
            f.diag.warn("negative value provided to histogram " + this._descriptor.name + ": " + r);
            return;
        }
        this._record(r, n, o);
    }, e;
}(mn);
var sr = function() {
    function t(e, r, n) {
        this._observableRegistry = n, this._descriptor = e, this._metricStorages = r;
    }
    return t.prototype.addCallback = function(e) {
        this._observableRegistry.addCallback(e, this);
    }, t.prototype.removeCallback = function(e) {
        this._observableRegistry.removeCallback(e, this);
    }, t;
}();
var oa = function(t) {
    ze(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e;
}(sr);
var aa = function(t) {
    ze(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e;
}(sr);
var sa = function(t) {
    ze(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e;
}(sr);
function lt(t) {
    return t instanceof sr;
}
var ua = function() {
    function t(e) {
        this._meterSharedState = e;
    }
    return t.prototype.createHistogram = function(e, r) {
        var n = le(e, ce.HISTOGRAM, r), o = this._meterSharedState.registerMetricStorage(n);
        return new ia(o, n);
    }, t.prototype.createCounter = function(e, r) {
        var n = le(e, ce.COUNTER, r), o = this._meterSharedState.registerMetricStorage(n);
        return new na(o, n);
    }, t.prototype.createUpDownCounter = function(e, r) {
        var n = le(e, ce.UP_DOWN_COUNTER, r), o = this._meterSharedState.registerMetricStorage(n);
        return new ra(o, n);
    }, t.prototype.createObservableGauge = function(e, r) {
        var n = le(e, ce.OBSERVABLE_GAUGE, r), o = this._meterSharedState.registerAsyncMetricStorage(n);
        return new aa(n, o, this._meterSharedState.observableRegistry);
    }, t.prototype.createObservableCounter = function(e, r) {
        var n = le(e, ce.OBSERVABLE_COUNTER, r), o = this._meterSharedState.registerAsyncMetricStorage(n);
        return new oa(n, o, this._meterSharedState.observableRegistry);
    }, t.prototype.createObservableUpDownCounter = function(e, r) {
        var n = le(e, ce.OBSERVABLE_UP_DOWN_COUNTER, r), o = this._meterSharedState.registerAsyncMetricStorage(n);
        return new sa(n, o, this._meterSharedState.observableRegistry);
    }, t.prototype.addBatchObservableCallback = function(e, r) {
        this._meterSharedState.observableRegistry.addBatchCallback(e, r);
    }, t.prototype.removeBatchObservableCallback = function(e, r) {
        this._meterSharedState.observableRegistry.removeBatchCallback(e, r);
    }, t;
}();
var ur = function() {
    function t(e) {
        this._instrumentDescriptor = e;
    }
    return t.prototype.getInstrumentDescriptor = function() {
        return this._instrumentDescriptor;
    }, t.prototype.updateDescription = function(e) {
        this._instrumentDescriptor = le(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
            description: e,
            valueType: this._instrumentDescriptor.valueType,
            unit: this._instrumentDescriptor.unit,
            advice: this._instrumentDescriptor.advice
        });
    }, t;
}();
var xl = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), ca = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, Dl = function() {
    function t(e) {
        this._hash = e, this._valueMap = new Map, this._keyMap = new Map;
    }
    return t.prototype.get = function(e, r) {
        return r ?? (r = this._hash(e)), this._valueMap.get(r);
    }, t.prototype.getOrDefault = function(e, r) {
        var n = this._hash(e);
        if (this._valueMap.has(n)) return this._valueMap.get(n);
        var o = r();
        return this._keyMap.has(n) || this._keyMap.set(n, e), this._valueMap.set(n, o), o;
    }, t.prototype.set = function(e, r, n) {
        n ?? (n = this._hash(e)), this._keyMap.has(n) || this._keyMap.set(n, e), this._valueMap.set(n, r);
    }, t.prototype.has = function(e, r) {
        return r ?? (r = this._hash(e)), this._valueMap.has(r);
    }, t.prototype.keys = function() {
        var e, r;
        return ca(this, function(n) {
            switch(n.label){
                case 0:
                    e = this._keyMap.entries(), r = e.next(), n.label = 1;
                case 1:
                    return r.done === !0 ? [
                        3,
                        3
                    ] : [
                        4,
                        [
                            r.value[1],
                            r.value[0]
                        ]
                    ];
                case 2:
                    return n.sent(), r = e.next(), [
                        3,
                        1
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    }, t.prototype.entries = function() {
        var e, r;
        return ca(this, function(n) {
            switch(n.label){
                case 0:
                    e = this._valueMap.entries(), r = e.next(), n.label = 1;
                case 1:
                    return r.done === !0 ? [
                        3,
                        3
                    ] : [
                        4,
                        [
                            this._keyMap.get(r.value[0]),
                            r.value[1],
                            r.value[0]
                        ]
                    ];
                case 2:
                    return n.sent(), r = e.next(), [
                        3,
                        1
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this._valueMap.size;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}();
var Q = function(t) {
    xl(e, t);
    function e() {
        return t.call(this, Ko) || this;
    }
    return e;
}(Dl);
var Ul = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, cr = function() {
    function t(e) {
        this._aggregator = e, this._activeCollectionStorage = new Q, this._cumulativeMemoStorage = new Q;
    }
    return t.prototype.record = function(e, r, n, o) {
        var i = this, s = this._activeCollectionStorage.getOrDefault(r, function() {
            return i._aggregator.createAccumulation(o);
        });
        s?.record(e);
    }, t.prototype.batchCumulate = function(e, r) {
        var n = this;
        Array.from(e.entries()).forEach(function(o) {
            var i = Ul(o, 3), s = i[0], u = i[1], c = i[2], a = n._aggregator.createAccumulation(r);
            a?.record(u);
            var l = a;
            if (n._cumulativeMemoStorage.has(s, c)) {
                var p = n._cumulativeMemoStorage.get(s, c);
                l = n._aggregator.diff(p, a);
            }
            if (n._activeCollectionStorage.has(s, c)) {
                var d = n._activeCollectionStorage.get(s, c);
                l = n._aggregator.merge(d, l);
            }
            n._cumulativeMemoStorage.set(s, a, c), n._activeCollectionStorage.set(s, l, c);
        });
    }, t.prototype.collect = function() {
        var e = this._activeCollectionStorage;
        return this._activeCollectionStorage = new Q, e;
    }, t;
}();
var Tn = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, la = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, lr = function() {
    function t(e, r) {
        var n = this;
        this._aggregator = e, this._unreportedAccumulations = new Map, this._reportHistory = new Map, r.forEach(function(o) {
            n._unreportedAccumulations.set(o, []);
        });
    }
    return t.prototype.buildMetrics = function(e, r, n, o) {
        this._stashAccumulations(n);
        var i = this._getMergedUnreportedAccumulations(e), s = i, u;
        if (this._reportHistory.has(e)) {
            var c = this._reportHistory.get(e), a = c.collectionTime;
            u = c.aggregationTemporality, u === ar.CUMULATIVE ? s = t.merge(c.accumulations, i, this._aggregator) : s = t.calibrateStartTime(c.accumulations, i, a);
        } else u = e.selectAggregationTemporality(r.type);
        this._reportHistory.set(e, {
            accumulations: s,
            collectionTime: o,
            aggregationTemporality: u
        });
        var l = Bl(s);
        if (l.length !== 0) return this._aggregator.toMetricData(r, u, l, o);
    }, t.prototype._stashAccumulations = function(e) {
        var r, n, o = this._unreportedAccumulations.keys();
        try {
            for(var i = Tn(o), s = i.next(); !s.done; s = i.next()){
                var u = s.value, c = this._unreportedAccumulations.get(u);
                c === void 0 && (c = [], this._unreportedAccumulations.set(u, c)), c.push(e);
            }
        } catch (a) {
            r = {
                error: a
            };
        } finally{
            try {
                s && !s.done && (n = i.return) && n.call(i);
            } finally{
                if (r) throw r.error;
            }
        }
    }, t.prototype._getMergedUnreportedAccumulations = function(e) {
        var r, n, o = new Q, i = this._unreportedAccumulations.get(e);
        if (this._unreportedAccumulations.set(e, []), i === void 0) return o;
        try {
            for(var s = Tn(i), u = s.next(); !u.done; u = s.next()){
                var c = u.value;
                o = t.merge(o, c, this._aggregator);
            }
        } catch (a) {
            r = {
                error: a
            };
        } finally{
            try {
                u && !u.done && (n = s.return) && n.call(s);
            } finally{
                if (r) throw r.error;
            }
        }
        return o;
    }, t.merge = function(e, r, n) {
        for(var o = e, i = r.entries(), s = i.next(); s.done !== !0;){
            var u = la(s.value, 3), c = u[0], a = u[1], l = u[2];
            if (e.has(c, l)) {
                var p = e.get(c, l), d = n.merge(p, a);
                o.set(c, d, l);
            } else o.set(c, a, l);
            s = i.next();
        }
        return o;
    }, t.calibrateStartTime = function(e, r, n) {
        var o, i;
        try {
            for(var s = Tn(e.keys()), u = s.next(); !u.done; u = s.next()){
                var c = la(u.value, 2), a = c[0], l = c[1], p = r.get(a, l);
                p?.setStartTime(n);
            }
        } catch (d) {
            o = {
                error: d
            };
        } finally{
            try {
                u && !u.done && (i = s.return) && i.call(s);
            } finally{
                if (o) throw o.error;
            }
        }
        return r;
    }, t;
}();
function Bl(t) {
    return Array.from(t.entries());
}
var Gl = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), Vl = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, fa = function(t) {
    Gl(e, t);
    function e(r, n, o, i) {
        var s = t.call(this, r) || this;
        return s._attributesProcessor = o, s._deltaMetricStorage = new cr(n), s._temporalMetricStorage = new lr(n, i), s;
    }
    return e.prototype.record = function(r, n) {
        var o = this, i = new Q;
        Array.from(r.entries()).forEach(function(s) {
            var u = Vl(s, 2), c = u[0], a = u[1];
            i.set(o._attributesProcessor.process(c), a);
        }), this._deltaMetricStorage.batchCumulate(i, n);
    }, e.prototype.collect = function(r, n) {
        var o = this._deltaMetricStorage.collect();
        return this._temporalMetricStorage.buildMetrics(r, this._instrumentDescriptor, o, n);
    }, e;
}(ur);
E();
function Sn(t, e) {
    var r = "";
    return t.unit !== e.unit && (r += "	- Unit '" + t.unit + "' does not match '" + e.unit + `'
`), t.type !== e.type && (r += "	- Type '" + t.type + "' does not match '" + e.type + `'
`), t.valueType !== e.valueType && (r += "	- Value Type '" + t.valueType + "' does not match '" + e.valueType + `'
`), t.description !== e.description && (r += "	- Description '" + t.description + "' does not match '" + e.description + `'
`), r;
}
function Hl(t, e) {
    return "	- use valueType '" + t.valueType + "' on instrument creation or use an instrument name other than '" + e.name + "'";
}
function Fl(t, e) {
    return "	- use unit '" + t.unit + "' on instrument creation or use an instrument name other than '" + e.name + "'";
}
function jl(t, e) {
    var r = {
        name: e.name,
        type: e.type,
        unit: e.unit
    }, n = JSON.stringify(r);
    return "	- create a new view with a name other than '" + t.name + "' and InstrumentSelector '" + n + "'";
}
function kl(t, e) {
    var r = {
        name: e.name,
        type: e.type,
        unit: e.unit
    }, n = JSON.stringify(r);
    return "	- create a new view with a name other than '" + t.name + "' and InstrumentSelector '" + n + `'
    	- OR - create a new view with the name ` + t.name + " and description '" + t.description + "' and InstrumentSelector " + n + `
    	- OR - create a new view with the name ` + e.name + " and description '" + t.description + "' and InstrumentSelector " + n;
}
function gn(t, e) {
    return t.valueType !== e.valueType ? Hl(t, e) : t.unit !== e.unit ? Fl(t, e) : t.type !== e.type ? jl(t, e) : t.description !== e.description ? kl(t, e) : "";
}
var yn = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, pa = function() {
    function t() {
        this._sharedRegistry = new Map, this._perCollectorRegistry = new Map;
    }
    return t.create = function() {
        return new t;
    }, t.prototype.getStorages = function(e) {
        var r, n, o, i, s = [];
        try {
            for(var u = yn(this._sharedRegistry.values()), c = u.next(); !c.done; c = u.next()){
                var a = c.value;
                s = s.concat(a);
            }
        } catch (g) {
            r = {
                error: g
            };
        } finally{
            try {
                c && !c.done && (n = u.return) && n.call(u);
            } finally{
                if (r) throw r.error;
            }
        }
        var l = this._perCollectorRegistry.get(e);
        if (l != null) try {
            for(var p = yn(l.values()), d = p.next(); !d.done; d = p.next()){
                var a = d.value;
                s = s.concat(a);
            }
        } catch (g) {
            o = {
                error: g
            };
        } finally{
            try {
                d && !d.done && (i = p.return) && i.call(p);
            } finally{
                if (o) throw o.error;
            }
        }
        return s;
    }, t.prototype.register = function(e) {
        this._registerStorage(e, this._sharedRegistry);
    }, t.prototype.registerForCollector = function(e, r) {
        var n = this._perCollectorRegistry.get(e);
        n == null && (n = new Map, this._perCollectorRegistry.set(e, n)), this._registerStorage(r, n);
    }, t.prototype.findOrUpdateCompatibleStorage = function(e) {
        var r = this._sharedRegistry.get(e.name);
        return r === void 0 ? null : this._findOrUpdateCompatibleStorage(e, r);
    }, t.prototype.findOrUpdateCompatibleCollectorStorage = function(e, r) {
        var n = this._perCollectorRegistry.get(e);
        if (n === void 0) return null;
        var o = n.get(r.name);
        return o === void 0 ? null : this._findOrUpdateCompatibleStorage(r, o);
    }, t.prototype._registerStorage = function(e, r) {
        var n = e.getInstrumentDescriptor(), o = r.get(n.name);
        if (o === void 0) {
            r.set(n.name, [
                e
            ]);
            return;
        }
        o.push(e);
    }, t.prototype._findOrUpdateCompatibleStorage = function(e, r) {
        var n, o, i = null;
        try {
            for(var s = yn(r), u = s.next(); !u.done; u = s.next()){
                var c = u.value, a = c.getInstrumentDescriptor();
                Jo(a, e) ? (a.description !== e.description && (e.description.length > a.description.length && c.updateDescription(e.description), f.diag.warn("A view or instrument with the name ", e.name, ` has already been registered, but has a different description and is incompatible with another registered view.
`, `Details:
`, Sn(a, e), `The longer description will be used.
To resolve the conflict:`, gn(a, e))), i = c) : f.diag.warn("A view or instrument with the name ", e.name, ` has already been registered and is incompatible with another registered view.
`, `Details:
`, Sn(a, e), `To resolve the conflict:
`, gn(a, e));
            }
        } catch (l) {
            n = {
                error: l
            };
        } finally{
            try {
                u && !u.done && (o = s.return) && o.call(s);
            } finally{
                if (n) throw n.error;
            }
        }
        return i;
    }, t;
}();
var _a = function() {
    function t(e) {
        this._backingStorages = e;
    }
    return t.prototype.record = function(e, r, n, o) {
        this._backingStorages.forEach(function(i) {
            i.record(e, r, n, o);
        });
    }, t;
}();
E();
E();
var da = function() {
    function t(e, r) {
        this._instrumentName = e, this._valueType = r, this._buffer = new Q;
    }
    return t.prototype.observe = function(e, r) {
        if (r === void 0 && (r = {}), typeof e != "number") {
            f.diag.warn("non-number value provided to metric " + this._instrumentName + ": " + e);
            return;
        }
        this._valueType === f.ValueType.INT && !Number.isInteger(e) && (f.diag.warn("INT value type cannot accept a floating-point value for " + this._instrumentName + ", ignoring the fractional digits."), e = Math.trunc(e), !Number.isInteger(e)) || this._buffer.set(r, e);
    }, t;
}();
var ha = function() {
    function t() {
        this._buffer = new Map;
    }
    return t.prototype.observe = function(e, r, n) {
        if (n === void 0 && (n = {}), !!lt(e)) {
            var o = this._buffer.get(e);
            if (o == null && (o = new Q, this._buffer.set(e, o)), typeof r != "number") {
                f.diag.warn("non-number value provided to metric " + e._descriptor.name + ": " + r);
                return;
            }
            e._descriptor.valueType === f.ValueType.INT && !Number.isInteger(r) && (f.diag.warn("INT value type cannot accept a floating-point value for " + e._descriptor.name + ", ignoring the fractional digits."), r = Math.trunc(r), !Number.isInteger(r)) || o.set(n, r);
        }
    }, t;
}();
var vn = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, An = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, Ea = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, ma = function(t, e, r) {
    if (r || arguments.length === 2) for(var n = 0, o = e.length, i; n < o; n++)(i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
    return t.concat(i || Array.prototype.slice.call(e));
}, Ta = function() {
    function t() {
        this._callbacks = [], this._batchCallbacks = [];
    }
    return t.prototype.addCallback = function(e, r) {
        var n = this._findCallback(e, r);
        n >= 0 || this._callbacks.push({
            callback: e,
            instrument: r
        });
    }, t.prototype.removeCallback = function(e, r) {
        var n = this._findCallback(e, r);
        n < 0 || this._callbacks.splice(n, 1);
    }, t.prototype.addBatchCallback = function(e, r) {
        var n = new Set(r.filter(lt));
        if (n.size === 0) {
            f.diag.error("BatchObservableCallback is not associated with valid instruments", r);
            return;
        }
        var o = this._findBatchCallback(e, n);
        o >= 0 || this._batchCallbacks.push({
            callback: e,
            instruments: n
        });
    }, t.prototype.removeBatchCallback = function(e, r) {
        var n = new Set(r.filter(lt)), o = this._findBatchCallback(e, n);
        o < 0 || this._batchCallbacks.splice(o, 1);
    }, t.prototype.observe = function(e, r) {
        return vn(this, void 0, void 0, function() {
            var n, o, i, s;
            return An(this, function(u) {
                switch(u.label){
                    case 0:
                        return n = this._observeCallbacks(e, r), o = this._observeBatchCallbacks(e, r), [
                            4,
                            Yo(ma(ma([], Ea(n), !1), Ea(o), !1))
                        ];
                    case 1:
                        return i = u.sent(), s = i.filter(zo).map(function(c) {
                            return c.reason;
                        }), [
                            2,
                            s
                        ];
                }
            });
        });
    }, t.prototype._observeCallbacks = function(e, r) {
        var n = this;
        return this._callbacks.map(function(o) {
            var i = o.callback, s = o.instrument;
            return vn(n, void 0, void 0, function() {
                var u, c;
                return An(this, function(a) {
                    switch(a.label){
                        case 0:
                            return u = new da(s._descriptor.name, s._descriptor.valueType), c = Promise.resolve(i(u)), r != null && (c = En(c, r)), [
                                4,
                                c
                            ];
                        case 1:
                            return a.sent(), s._metricStorages.forEach(function(l) {
                                l.record(u._buffer, e);
                            }), [
                                2
                            ];
                    }
                });
            });
        });
    }, t.prototype._observeBatchCallbacks = function(e, r) {
        var n = this;
        return this._batchCallbacks.map(function(o) {
            var i = o.callback, s = o.instruments;
            return vn(n, void 0, void 0, function() {
                var u, c;
                return An(this, function(a) {
                    switch(a.label){
                        case 0:
                            return u = new ha, c = Promise.resolve(i(u)), r != null && (c = En(c, r)), [
                                4,
                                c
                            ];
                        case 1:
                            return a.sent(), s.forEach(function(l) {
                                var p = u._buffer.get(l);
                                p != null && l._metricStorages.forEach(function(d) {
                                    d.record(p, e);
                                });
                            }), [
                                2
                            ];
                    }
                });
            });
        });
    }, t.prototype._findCallback = function(e, r) {
        return this._callbacks.findIndex(function(n) {
            return n.callback === e && n.instrument === r;
        });
    }, t.prototype._findBatchCallback = function(e, r) {
        return this._batchCallbacks.findIndex(function(n) {
            return n.callback === e && $o(n.instruments, r);
        });
    }, t;
}();
var ql = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), Sa = function(t) {
    ql(e, t);
    function e(r, n, o, i) {
        var s = t.call(this, r) || this;
        return s._attributesProcessor = o, s._deltaMetricStorage = new cr(n), s._temporalMetricStorage = new lr(n, i), s;
    }
    return e.prototype.record = function(r, n, o, i) {
        n = this._attributesProcessor.process(n, o), this._deltaMetricStorage.record(r, n, o, i);
    }, e.prototype.collect = function(r, n) {
        var o = this._deltaMetricStorage.collect();
        return this._temporalMetricStorage.buildMetrics(r, this._instrumentDescriptor, o, n);
    }, e;
}(ur);
var ga = function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, o) {
            n.__proto__ = o;
        } || function(n, o) {
            for(var i in o)Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }, t(e, r);
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e;
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), fr = function() {
    function t() {}
    return t.Noop = function() {
        return Kl;
    }, t;
}();
var Xl = function(t) {
    ga(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this;
    }
    return e.prototype.process = function(r, n) {
        return r;
    }, e;
}(fr);
var gh = function(t) {
    ga(e, t);
    function e(r) {
        var n = t.call(this) || this;
        return n._allowedAttributeNames = r, n;
    }
    return e.prototype.process = function(r, n) {
        var o = this, i = {};
        return Object.keys(r).filter(function(s) {
            return o._allowedAttributeNames.includes(s);
        }).forEach(function(s) {
            return i[s] = r[s];
        }), i;
    }, e;
}(fr);
var Kl = new Xl;
var Wl = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, Yl = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, zl = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, ya = function() {
    function t(e, r) {
        this._meterProviderSharedState = e, this._instrumentationScope = r, this.metricStorageRegistry = new pa, this.observableRegistry = new Ta, this.meter = new ua(this);
    }
    return t.prototype.registerMetricStorage = function(e) {
        var r = this._registerMetricStorage(e, Sa);
        return r.length === 1 ? r[0] : new _a(r);
    }, t.prototype.registerAsyncMetricStorage = function(e) {
        var r = this._registerMetricStorage(e, fa);
        return r;
    }, t.prototype.collect = function(e, r, n) {
        return Wl(this, void 0, void 0, function() {
            var o, i, s;
            return Yl(this, function(u) {
                switch(u.label){
                    case 0:
                        return [
                            4,
                            this.observableRegistry.observe(r, n?.timeoutMillis)
                        ];
                    case 1:
                        return o = u.sent(), i = this.metricStorageRegistry.getStorages(e), i.length === 0 ? [
                            2,
                            null
                        ] : (s = i.map(function(c) {
                            return c.collect(e, r);
                        }).filter(Xo), s.length === 0 ? [
                            2,
                            {
                                errors: o
                            }
                        ] : [
                            2,
                            {
                                scopeMetrics: {
                                    scope: this._instrumentationScope,
                                    metrics: s
                                },
                                errors: o
                            }
                        ]);
                }
            });
        });
    }, t.prototype._registerMetricStorage = function(e, r) {
        var n = this, o = this._meterProviderSharedState.viewRegistry.findViews(e, this._instrumentationScope), i = o.map(function(c) {
            var a = Zo(c, e), l = n.metricStorageRegistry.findOrUpdateCompatibleStorage(a);
            if (l != null) return l;
            var p = c.aggregation.createAggregator(a), d = new r(a, p, c.attributesProcessor, n._meterProviderSharedState.metricCollectors);
            return n.metricStorageRegistry.register(d), d;
        });
        if (i.length === 0) {
            var s = this._meterProviderSharedState.selectAggregations(e.type), u = s.map(function(c) {
                var a = zl(c, 2), l = a[0], p = a[1], d = n.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(l, e);
                if (d != null) return d;
                var g = p.createAggregator(e), U = new r(e, g, fr.Noop(), [
                    l
                ]);
                return n.metricStorageRegistry.registerForCollector(l, U), U;
            });
            i = i.concat(u);
        }
        return i;
    }, t;
}();
var $l = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, va = function() {
    function t(e) {
        this.resource = e, this.viewRegistry = new ea, this.metricCollectors = [], this.meterSharedStates = new Map;
    }
    return t.prototype.getMeterSharedState = function(e) {
        var r = Wo(e), n = this.meterSharedStates.get(r);
        return n == null && (n = new ya(this, e), this.meterSharedStates.set(r, n)), n;
    }, t.prototype.selectAggregations = function(e) {
        var r, n, o = [];
        try {
            for(var i = $l(this.metricCollectors), s = i.next(); !s.done; s = i.next()){
                var u = s.value;
                o.push([
                    u,
                    u.selectAggregation(e)
                ]);
            }
        } catch (c) {
            r = {
                error: c
            };
        } finally{
            try {
                s && !s.done && (n = i.return) && n.call(i);
            } finally{
                if (r) throw r.error;
            }
        }
        return o;
    }, t;
}();
var Aa = y(C()), pr = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, _r = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, Ql = function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r) return t;
    var n = r.call(t), o, i = [], s;
    try {
        for(; (e === void 0 || e-- > 0) && !(o = n.next()).done;)i.push(o.value);
    } catch (u) {
        s = {
            error: u
        };
    } finally{
        try {
            o && !o.done && (r = n.return) && r.call(n);
        } finally{
            if (s) throw s.error;
        }
    }
    return i;
}, Zl = function(t, e, r) {
    if (r || arguments.length === 2) for(var n = 0, o = e.length, i; n < o; n++)(i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
    return t.concat(i || Array.prototype.slice.call(e));
}, Oa = function() {
    function t(e, r) {
        this._sharedState = e, this._metricReader = r;
    }
    return t.prototype.collect = function(e) {
        return pr(this, void 0, void 0, function() {
            var r, n, o, i, s = this;
            return _r(this, function(u) {
                switch(u.label){
                    case 0:
                        return r = (0, Aa.millisToHrTime)(Date.now()), n = [], o = [], i = Array.from(this._sharedState.meterSharedStates.values()).map(function(c) {
                            return pr(s, void 0, void 0, function() {
                                var a;
                                return _r(this, function(l) {
                                    switch(l.label){
                                        case 0:
                                            return [
                                                4,
                                                c.collect(this, r, e)
                                            ];
                                        case 1:
                                            return a = l.sent(), a?.scopeMetrics != null && n.push(a.scopeMetrics), a?.errors != null && o.push.apply(o, Zl([], Ql(a.errors), !1)), [
                                                2
                                            ];
                                    }
                                });
                            });
                        }), [
                            4,
                            Promise.all(i)
                        ];
                    case 1:
                        return u.sent(), [
                            2,
                            {
                                resourceMetrics: {
                                    resource: this._sharedState.resource,
                                    scopeMetrics: n
                                },
                                errors: o
                            }
                        ];
                }
            });
        });
    }, t.prototype.forceFlush = function(e) {
        return pr(this, void 0, void 0, function() {
            return _r(this, function(r) {
                switch(r.label){
                    case 0:
                        return [
                            4,
                            this._metricReader.forceFlush(e)
                        ];
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, t.prototype.shutdown = function(e) {
        return pr(this, void 0, void 0, function() {
            return _r(this, function(r) {
                switch(r.label){
                    case 0:
                        return [
                            4,
                            this._metricReader.shutdown(e)
                        ];
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, t.prototype.selectAggregationTemporality = function(e) {
        return this._metricReader.selectAggregationTemporality(e);
    }, t.prototype.selectAggregation = function(e) {
        return this._metricReader.selectAggregation(e);
    }, t;
}();
var Ra = function(t, e, r, n) {
    function o(i) {
        return i instanceof r ? i : new r(function(s) {
            s(i);
        });
    }
    return new (r || (r = Promise))(function(i, s) {
        function u(l) {
            try {
                a(n.next(l));
            } catch (p) {
                s(p);
            }
        }
        function c(l) {
            try {
                a(n.throw(l));
            } catch (p) {
                s(p);
            }
        }
        function a(l) {
            l.done ? i(l.value) : o(l.value).then(u, c);
        }
        a((n = n.apply(t, e || [])).next());
    });
}, ba = function(t, e) {
    var r = {
        label: 0,
        sent: function() {
            if (i[0] & 1) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    }, n, o, i, s;
    return s = {
        next: u(0),
        throw: u(1),
        return: u(2)
    }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
        return this;
    }), s;
    function u(a) {
        return function(l) {
            return c([
                a,
                l
            ]);
        };
    }
    function c(a) {
        if (n) throw new TypeError("Generator is already executing.");
        for(; r;)try {
            if (n = 1, o && (i = a[0] & 2 ? o.return : a[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, a[1])).done) return i;
            switch(o = 0, i && (a = [
                a[0] & 2,
                i.value
            ]), a[0]){
                case 0:
                case 1:
                    i = a;
                    break;
                case 4:
                    return r.label++, {
                        value: a[1],
                        done: !1
                    };
                case 5:
                    r.label++, o = a[1], a = [
                        0
                    ];
                    continue;
                case 7:
                    a = r.ops.pop(), r.trys.pop();
                    continue;
                default:
                    if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                        r = 0;
                        continue;
                    }
                    if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                        r.label = a[1];
                        break;
                    }
                    if (a[0] === 6 && r.label < i[1]) {
                        r.label = i[1], i = a;
                        break;
                    }
                    if (i && r.label < i[2]) {
                        r.label = i[2], r.ops.push(a);
                        break;
                    }
                    i[2] && r.ops.pop(), r.trys.pop();
                    continue;
            }
            a = e.call(t, r);
        } catch (l) {
            a = [
                6,
                l
            ], o = 0;
        } finally{
            n = i = 0;
        }
        if (a[0] & 5) throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: !0
        };
    }
}, Jl = function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number") return {
        next: function() {
            return t && n >= t.length && (t = void 0), {
                value: t && t[n++],
                done: !t
            };
        }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, On = function() {
    function t(e) {
        var r, n, o;
        this._shutdown = !1;
        var i = F.default().merge((o = e?.resource) !== null && o !== void 0 ? o : F.empty());
        if (this._sharedState = new va(i), e?.views != null && e.views.length > 0) try {
            for(var s = Jl(e.views), u = s.next(); !u.done; u = s.next()){
                var c = u.value;
                this._sharedState.viewRegistry.addView(c);
            }
        } catch (a) {
            r = {
                error: a
            };
        } finally{
            try {
                u && !u.done && (n = s.return) && n.call(s);
            } finally{
                if (r) throw r.error;
            }
        }
    }
    return t.prototype.getMeter = function(e, r, n) {
        return r === void 0 && (r = ""), n === void 0 && (n = {}), this._shutdown ? (f.diag.warn("A shutdown MeterProvider cannot provide a Meter"), (0, f.createNoopMeter)()) : this._sharedState.getMeterSharedState({
            name: e,
            version: r,
            schemaUrl: n.schemaUrl
        }).meter;
    }, t.prototype.addMetricReader = function(e) {
        var r = new Oa(this._sharedState, e);
        e.setMetricProducer(r), this._sharedState.metricCollectors.push(r);
    }, t.prototype.shutdown = function(e) {
        return Ra(this, void 0, void 0, function() {
            return ba(this, function(r) {
                switch(r.label){
                    case 0:
                        return this._shutdown ? (f.diag.warn("shutdown may only be called once per MeterProvider"), [
                            2
                        ]) : (this._shutdown = !0, [
                            4,
                            Promise.all(this._sharedState.metricCollectors.map(function(n) {
                                return n.shutdown(e);
                            }))
                        ]);
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, t.prototype.forceFlush = function(e) {
        return Ra(this, void 0, void 0, function() {
            return ba(this, function(r) {
                switch(r.label){
                    case 0:
                        return this._shutdown ? (f.diag.warn("invalid attempt to force flush after MeterProvider shutdown"), [
                            2
                        ]) : [
                            4,
                            Promise.all(this._sharedState.metricCollectors.map(function(n) {
                                return n.forceFlush(e);
                            }))
                        ];
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, t;
}();
var ru = y(me(), 1), nt = y(bt(), 1), nu = y(Ca(), 1), te = y(C(), 1);
E();
var af = Symbol.for("@vercel/request-context");
function $e() {
    return globalThis[af]?.get();
}
var Ln = y(me(), 1);
function Er(t) {
    return Object.fromEntries(Object.entries(t).filter(([e, r])=>r !== void 0));
}
function Na(t) {
    return t ? t.split("::").at(-1) : void 0;
}
function wa(t = $e(), e) {
    if (!t) return;
    let r = e ? uf(e, t.headers) : void 0;
    return Er({
        [Ln.SemanticAttributes.HTTP_HOST]: t.headers.host,
        [Ln.SemanticAttributes.HTTP_USER_AGENT]: t.headers["user-agent"],
        "http.referer": t.headers.referer,
        "vercel.request_id": Na(t.headers["x-vercel-id"]),
        "vercel.matched_path": t.headers["x-matched-path"],
        "vercel.edge_region": t.headers["x-vercel-edge-region"],
        ...r
    });
}
var sf = {
    keys (t) {
        return [];
    },
    get (t, e) {
        return t[e.toLocaleLowerCase()];
    }
};
function uf(t, e) {
    if (typeof t == "function") return t(e, sf);
    let r = {};
    for (let [n, o] of Object.entries(t)){
        let i = e[o.toLocaleLowerCase()];
        i !== void 0 && (r[n] = i);
    }
    return r;
}
E();
function _t(t) {
    return (t & f.TraceFlags.SAMPLED) !== 0;
}
var mr = class {
    constructor(e, r){
        this.processors = e;
        this.attributesFromHeaders = r;
        this.rootSpanIds = new Map;
        this.waitSpanEnd = new Map;
    }
    forceFlush() {
        return Promise.all(this.processors.map((e)=>e.forceFlush().catch((r)=>{
                f.diag.error("@vercel/otel: forceFlush failed:", r);
            }))).then(()=>{});
    }
    shutdown() {
        return Promise.all(this.processors.map((e)=>e.shutdown().catch(()=>{}))).then(()=>{});
    }
    onStart(e, r) {
        let { traceId: n, spanId: o, traceFlags: i } = e.spanContext(), s = !e.parentSpanId || !this.rootSpanIds.has(n);
        if (s ? this.rootSpanIds.set(n, {
            rootSpanId: o,
            open: []
        }) : this.rootSpanIds.get(n)?.open.push(e), s && _t(i)) {
            let u = $e(), c = wa(u, this.attributesFromHeaders);
            c && e.setAttributes(c), u && u.waitUntil(async ()=>{
                if (this.rootSpanIds.has(n)) {
                    let a = new Promise((p)=>{
                        this.waitSpanEnd.set(n, p);
                    }), l;
                    await Promise.race([
                        a,
                        new Promise((p)=>{
                            l = setTimeout(()=>{
                                this.waitSpanEnd.delete(n), p(void 0);
                            }, 50);
                        })
                    ]), l && clearTimeout(l);
                }
                return this.forceFlush();
            });
        }
        for (let u of this.processors)u.onStart(e, r);
    }
    onEnd(e) {
        let { traceId: r, spanId: n, traceFlags: o } = e.spanContext(), i = _t(o), s = this.rootSpanIds.get(r), u = s?.rootSpanId === n;
        if (i) {
            let c = lf(e);
            c && Object.assign(e.attributes, c);
        }
        if (u) {
            if (this.rootSpanIds.delete(r), s.open.length > 0) {
                for (let c of s.open)if (!c.ended && c.spanContext().spanId !== n) try {
                    c.end();
                } catch (a) {
                    f.diag.error("@vercel/otel: onEnd failed:", a);
                }
            }
        } else if (s) for(let c = 0; c < s.open.length; c++)s.open[c]?.spanContext().spanId === n && s.open.splice(c, 1);
        for (let c of this.processors)c.onEnd(e);
        if (u) {
            let c = this.waitSpanEnd.get(r);
            c && (this.waitSpanEnd.delete(r), c());
        }
    }
}, cf = {
    [f.SpanKind.INTERNAL]: "internal",
    [f.SpanKind.SERVER]: "server",
    [f.SpanKind.CLIENT]: "client",
    [f.SpanKind.PRODUCER]: "producer",
    [f.SpanKind.CONSUMER]: "consumer"
};
function lf(t) {
    let { kind: e, attributes: r } = t, { "operation.name": n, "resouce.name": o, "span.type": i, "next.span_type": s, "http.method": u, "http.route": c } = r;
    if (n) return;
    let a = o ?? (u && typeof u == "string" && c && typeof c == "string" ? `${u} ${c}` : c);
    if (t.kind === f.SpanKind.SERVER && u && c && typeof u == "string" && typeof c == "string") return {
        "operation.name": "web.request",
        "resource.name": a
    };
    let l = t.instrumentationLibrary.name, p = s ?? i;
    if (p && typeof p == "string") {
        let d = Ma(l, p);
        return c ? {
            "operation.name": d,
            "resource.name": a
        } : {
            "operation.name": d
        };
    }
    return {
        "operation.name": Ma(l, e === f.SpanKind.INTERNAL ? "" : cf[e])
    };
}
function Ma(t, e) {
    if (!t) return e;
    let r = t.replace(/[ @./]/g, "_");
    return r.startsWith("_") && (r = r.slice(1)), e ? `${r}.${e}` : r;
}
var Ya = y(xn(), 1);
var Wa = y(Ka(), 1);
E();
var Qe = class extends Wa.OTLPExporterBase {
    constructor(e = {}){
        super(e), e.headers && (this._headers = e.headers);
    }
    onShutdown() {
        f.diag.debug("@vercel/otel/otlp: onShutdown");
    }
    onInit() {
        f.diag.debug("@vercel/otel/otlp: onInit");
    }
    send(e, r, n) {
        if (this._shutdownOnce.isCalled) {
            f.diag.debug("@vercel/otel/otlp: Shutdown already started. Cannot send objects");
            return;
        }
        let o = this.convert(e), i, s, u;
        try {
            ({ body: i, contentType: s, headers: u } = this.toMessage(o));
        } catch (a) {
            f.diag.warn("@vercel/otel/otlp: no proto", a);
            return;
        }
        let c = fetch(this.url, {
            method: "POST",
            body: i,
            headers: {
                ...this._headers,
                ...u,
                "Content-Type": s,
                "User-Agent": "OTel-OTLP-Exporter-JavaScript/0.46.0"
            },
            next: {
                internal: !0
            }
        }).then((a)=>{
            f.diag.debug("@vercel/otel/otlp: onSuccess", a.status, a.statusText), r(), a.arrayBuffer().catch(()=>{});
        }).catch((a)=>{
            f.diag.error("@vercel/otel/otlp: onError", a), n(a);
        }).finally(()=>{
            let a = this._sendingPromises.indexOf(c);
            this._sendingPromises.splice(a, 1);
        });
        this._sendingPromises.push(c);
    }
    getDefaultUrl(e) {
        throw new Error("Method not implemented.");
    }
};
var Nf = "v1/traces", wf = `http://localhost:4318/${Nf}`;
function yr(t) {
    return typeof t.url == "string" ? t.url : wf;
}
var Ze = class {
    constructor(e = {}){
        this.impl = new Gn(e);
    }
    export(e, r) {
        this.impl.export(e, r);
    }
    shutdown() {
        return this.impl.shutdown();
    }
    forceFlush() {
        return this.impl.forceFlush();
    }
}, Gn = class extends Qe {
    convert(e) {
        return (0, Ya.createExportTraceServiceRequest)(e, {
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
        return yr(e);
    }
};
var $s = y(xn(), 1);
var Ws = y(Ks(), 1);
function Ys(t) {
    let e = new Ws.Writer;
    return kf(t, e), e.finish();
}
function kf(t, e) {
    if (t.resourceSpans != null && t.resourceSpans.length) for(let r = 0; r < t.resourceSpans.length; ++r)qf(t.resourceSpans[r], e.uint32(10).fork()).ldelim();
    return e;
}
function qf(t, e) {
    if (t.resource != null && Xf(t.resource, e.uint32(10).fork()).ldelim(), t.scopeSpans != null && t.scopeSpans.length) for(let r = 0; r < t.scopeSpans.length; ++r)Kf(t.scopeSpans[r], e.uint32(18).fork()).ldelim();
    return t.schemaUrl != null && e.uint32(26).string(t.schemaUrl), e;
}
function Xf(t, e) {
    if (t.attributes != null && t.attributes.length) for(let r = 0; r < t.attributes.length; ++r)et(t.attributes[r], e.uint32(10).fork()).ldelim();
    return t.droppedAttributesCount != null && e.uint32(16).uint32(t.droppedAttributesCount), e;
}
function Kf(t, e) {
    if (t.scope != null && zf(t.scope, e.uint32(10).fork()).ldelim(), t.spans != null && t.spans.length) for(let r = 0; r < t.spans.length; ++r)$f(t.spans[r], e.uint32(18).fork()).ldelim();
    return t.schemaUrl != null && e.uint32(26).string(t.schemaUrl), e;
}
function et(t, e) {
    return t.key != null && e.uint32(10).string(t.key), t.value != null && zs(t.value, e.uint32(18).fork()).ldelim(), e;
}
function zs(t, e) {
    return t.stringValue != null && e.uint32(10).string(t.stringValue), t.boolValue != null && e.uint32(16).bool(t.boolValue), t.intValue != null && e.uint32(24).int64(t.intValue), t.doubleValue != null && e.uint32(33).double(t.doubleValue), t.arrayValue != null && Wf(t.arrayValue, e.uint32(42).fork()).ldelim(), t.kvlistValue != null && Yf(t.kvlistValue, e.uint32(50).fork()).ldelim(), t.bytesValue != null && e.uint32(58).bytes(t.bytesValue), e;
}
function Wf(t, e) {
    if (t.values != null && t.values.length) for(let r = 0; r < t.values.length; ++r)zs(t.values[r], e.uint32(10).fork()).ldelim();
    return e;
}
function Yf(t, e) {
    if (t.values != null && t.values.length) for(let r = 0; r < t.values.length; ++r)et(t.values[r], e.uint32(10).fork()).ldelim();
    return e;
}
function zf(t, e) {
    if (t.name != null && e.uint32(10).string(t.name), t.version != null && e.uint32(18).string(t.version), t.attributes != null && t.attributes.length) for(let r = 0; r < t.attributes.length; ++r)et(t.attributes[r], e.uint32(26).fork()).ldelim();
    return t.droppedAttributesCount != null && e.uint32(32).uint32(t.droppedAttributesCount), e;
}
function $f(t, e) {
    if (t.traceId != null && e.uint32(10).bytes(t.traceId), t.spanId != null && e.uint32(18).bytes(t.spanId), t.traceState != null && e.uint32(26).string(t.traceState), t.parentSpanId != null && e.uint32(34).bytes(t.parentSpanId), t.name != null && e.uint32(42).string(t.name), t.kind != null && e.uint32(48).int32(t.kind), t.startTimeUnixNano != null && e.uint32(57).fixed64(t.startTimeUnixNano), t.endTimeUnixNano != null && e.uint32(65).fixed64(t.endTimeUnixNano), t.attributes != null && t.attributes.length) for(let r = 0; r < t.attributes.length; ++r)et(t.attributes[r], e.uint32(74).fork()).ldelim();
    if (t.droppedAttributesCount != null && e.uint32(80).uint32(t.droppedAttributesCount), t.events != null && t.events.length) for(let r = 0; r < t.events.length; ++r)Zf(t.events[r], e.uint32(90).fork()).ldelim();
    if (t.droppedEventsCount != null && e.uint32(96).uint32(t.droppedEventsCount), t.links != null && t.links.length) for(let r = 0; r < t.links.length; ++r)Jf(t.links[r], e.uint32(106).fork()).ldelim();
    return t.droppedLinksCount != null && e.uint32(112).uint32(t.droppedLinksCount), t.status != null && Qf(t.status, e.uint32(122).fork()).ldelim(), e;
}
function Qf(t, e) {
    return t.message != null && e.uint32(18).string(t.message), t.code != null && e.uint32(24).int32(t.code), e;
}
function Zf(t, e) {
    if (t.timeUnixNano != null && e.uint32(9).fixed64(t.timeUnixNano), t.name != null && e.uint32(18).string(t.name), t.attributes != null && t.attributes.length) for(let r = 0; r < t.attributes.length; ++r)et(t.attributes[r], e.uint32(26).fork()).ldelim();
    return t.droppedAttributesCount != null && e.uint32(32).uint32(t.droppedAttributesCount), e;
}
function Jf(t, e) {
    if (t.traceId != null && e.uint32(10).bytes(t.traceId), t.spanId != null && e.uint32(18).bytes(t.spanId), t.traceState != null && e.uint32(26).string(t.traceState), t.attributes != null && t.attributes.length) for(let r = 0; r < t.attributes.length; ++r)et(t.attributes[r], e.uint32(34).fork()).ldelim();
    return t.droppedAttributesCount != null && e.uint32(40).uint32(t.droppedAttributesCount), e;
}
var Be = class {
    constructor(e = {}){
        this.impl = new Zn(e);
    }
    export(e, r) {
        this.impl.export(e, r);
    }
    shutdown() {
        return this.impl.shutdown();
    }
    forceFlush() {
        return this.impl.forceFlush();
    }
}, Zn = class extends Qe {
    convert(e) {
        return (0, $s.createExportTraceServiceRequest)(e, void 0);
    }
    toMessage(e) {
        return {
            body: Ys(e),
            contentType: "application/x-protobuf",
            headers: {
                accept: "application/x-protobuf"
            }
        };
    }
    getDefaultUrl(e) {
        return yr(e);
    }
};
E();
var fe = y(me(), 1);
function Qs(t, e) {
    return t.replace(/\{(?<temp1>[^{}]+)\}/g, (r, n)=>{
        let o = e[n];
        return o !== void 0 ? String(o) : r;
    });
}
var tt = class {
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
        let r = e.getTracer(this.instrumentationName, this.instrumentationVersion), n = this.config.ignoreUrls ?? [], o = (P, B)=>{
            if (B?.opentelemetry?.ignore !== void 0) return B.opentelemetry.ignore;
            if (n.length === 0) return !1;
            let A = P.toString();
            return n.some((m)=>typeof m == "string" ? m === "*" ? !0 : A.startsWith(m) : m.test(A));
        }, i = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || null, s = process.env.VERCEL_BRANCH_URL || process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL || null, u = this.config.propagateContextUrls ?? [], c = this.config.dontPropagateContextUrls ?? [], a = this.config.resourceNameTemplate, { attributesFromRequestHeaders: l, attributesFromResponseHeaders: p } = this.config, d = (P, B)=>{
            if (B?.opentelemetry?.propagateContext) return B.opentelemetry.propagateContext;
            let A = P.toString();
            return c.length > 0 && c.some((m)=>typeof m == "string" ? m === "*" ? !0 : A.startsWith(m) : m.test(A)) ? !1 : i && P.protocol === "https:" && (P.host === i || P.host === s || P.host === $e()?.headers.host) || !i && P.protocol === "http:" && P.hostname === "localhost" ? !0 : u.some((m)=>typeof m == "string" ? m === "*" ? !0 : A.startsWith(m) : m.test(A));
        };
        process.env.NEXT_OTEL_FETCH_DISABLED = "1";
        let g = globalThis.fetch;
        this.originalFetch = g;
        let U = async (P, B)=>{
            let A = B;
            if (A?.next?.internal) return g(P, A);
            let m = new Request(P instanceof Request ? P.clone() : P, A), ie = new URL(m.url);
            if (o(ie, A)) return g(P, A);
            let Tt = {
                [fe.SemanticAttributes.HTTP_METHOD]: m.method,
                [fe.SemanticAttributes.HTTP_URL]: m.url,
                [fe.SemanticAttributes.HTTP_HOST]: ie.host,
                [fe.SemanticAttributes.HTTP_SCHEME]: ie.protocol.replace(":", ""),
                [fe.SemanticAttributes.NET_PEER_NAME]: ie.hostname,
                [fe.SemanticAttributes.NET_PEER_PORT]: ie.port
            }, Lr = a ? Qs(a, Tt) : tp(m.url), St = A?.opentelemetry?.spanName ?? `fetch ${m.method} ${m.url}`, ei = f.context.active(), x = r.startSpan(St, {
                kind: f.SpanKind.CLIENT,
                attributes: {
                    ...Tt,
                    "operation.name": `fetch.${m.method}`,
                    "resource.name": Lr,
                    ...A?.opentelemetry?.attributes
                }
            }, ei);
            if (!x.isRecording() || !_t(x.spanContext().traceFlags)) return x.end(), g(P, A);
            if (d(ie, A)) {
                let Ge = f.trace.setSpan(ei, x);
                f.propagation.inject(Ge, m.headers, ep);
            }
            l && Zs(x, l, m.headers);
            try {
                let Ge = Date.now(), pe = await g(P, {
                    ...A,
                    headers: m.headers
                }), ou = Date.now() - Ge;
                return x.setAttribute(fe.SemanticAttributes.HTTP_STATUS_CODE, pe.status), x.setAttribute("http.response_time", ou), p && Zs(x, p, pe.headers), pe.status >= 500 && Jn(x, `Status: ${pe.status} (${pe.statusText})`), pe.body ? rp(pe).then((Pr)=>{
                    x.isRecording() && (x.setAttribute(fe.SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, Pr), x.end());
                }, (Pr)=>{
                    x.isRecording() && (Jn(x, Pr), x.end());
                }) : x.end(), pe;
            } catch (Ge) {
                throw Jn(x, Ge), x.end(), Ge;
            }
        };
        globalThis.fetch = U;
    }
    disable() {
        this.originalFetch && (globalThis.fetch = this.originalFetch);
    }
}, ep = {
    set (t, e, r) {
        t.set(e, r);
    }
};
function tp(t) {
    let e = t.indexOf("?");
    return e === -1 ? t : t.substring(0, e);
}
function rp(t) {
    let e = 0, n = t.clone().body?.getReader();
    if (!n) return Promise.resolve(0);
    let o = ()=>n.read().then(({ done: i, value: s })=>{
            if (!i) return e += s.byteLength, o();
        });
    return o().then(()=>e);
}
function Jn(t, e) {
    if (e instanceof Error) t.recordException(e), t.setStatus({
        code: f.SpanStatusCode.ERROR,
        message: e.message
    });
    else {
        let r = String(e);
        t.setStatus({
            code: f.SpanStatusCode.ERROR,
            message: r
        });
    }
}
function Zs(t, e, r) {
    for (let [n, o] of Object.entries(e)){
        let i = r.get(o);
        i !== null && t.setAttribute(n, i);
    }
}
var br = class {
    constructor(e = {}){
        this.configuration = e;
    }
    start() {
        let e = np(), r = (0, nt.getEnvWithoutDefaults)(), n = this.configuration, o = ("TURBOPACK compile-time value", "edge") || "nodejs", i = !!e.OTEL_SDK_DISABLED;
        if (r.OTEL_LOG_LEVEL && f.diag.setLogger(new f.DiagConsoleLogger, {
            logLevel: r.OTEL_LOG_LEVEL
        }), i) return;
        let s = n.idGenerator ?? new tr, u = n.contextManager ?? new nu.AsyncLocalStorageContextManager;
        u.enable(), this.contextManager = u;
        let c = e.OTEL_SERVICE_NAME || n.serviceName || "app", a = new F(Er({
            [ru.SemanticResourceAttributes.SERVICE_NAME]: c,
            "node.ci": process.env.CI ? !0 : void 0,
            "node.env": "production",
            env: process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV,
            "vercel.region": process.env.VERCEL_REGION,
            "vercel.runtime": o,
            "vercel.sha": process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
            "vercel.host": process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || void 0,
            "vercel.branch_host": process.env.VERCEL_BRANCH_URL || process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL || void 0,
            ...n.attributes
        })), l = n.resourceDetectors ?? [
            vo
        ];
        if (n.autoDetectResources ?? !0) {
            let m = {
                detectors: l
            };
            a = a.merge(Oo(m));
        }
        let d = op(n.propagators, e), g = ap(n.traceSampler, e), U = sp(n.spanProcessors, n, e);
        U.length === 0 && f.diag.warn("@vercel/otel: No span processors configured. No spans will be exported.");
        let P = n.spanLimits, B = new Po({
            resource: a,
            idGenerator: s,
            sampler: g,
            spanLimits: P
        });
        if (B.addSpanProcessor(new mr(U, n.attributesFromHeaders)), B.register({
            contextManager: u,
            propagator: new te.CompositePropagator({
                propagators: d
            })
        }), this.tracerProvider = B, n.logRecordProcessor) {
            let m = new hn({
                resource: a
            });
            this.loggerProvider = m, m.addLogRecordProcessor(n.logRecordProcessor), se.logs.setGlobalLoggerProvider(m);
        }
        if (n.metricReader || n.views) {
            let m = new On({
                resource: a,
                views: n.views ?? []
            });
            n.metricReader && m.addMetricReader(n.metricReader), f.metrics.setGlobalMeterProvider(m), this.meterProvider = m;
        }
        let A = ip(n.instrumentations, n.instrumentationConfig);
        this.disableInstumentations = (0, tu.registerInstrumentations)({
            instrumentations: A
        }), f.diag.info("@vercel/otel: started", c, o);
    }
    async shutdown() {
        let e = [];
        this.tracerProvider && e.push(this.tracerProvider.shutdown()), this.loggerProvider && e.push(this.loggerProvider.shutdown()), this.meterProvider && e.push(this.meterProvider.shutdown()), f.diag.info("@vercel/otel: shutting down", e.length, ("TURBOPACK compile-time value", "edge")), await Promise.all(e), this.contextManager && this.contextManager.disable();
        let { disableInstumentations: r } = this;
        r && r();
    }
};
function np() {
    let t = (0, nt.parseEnvironment)(process.env);
    return {
        ...nt.DEFAULT_ENVIRONMENT,
        ...t
    };
}
function ip(t, e) {
    return (t ?? [
        "auto"
    ]).map((r)=>r === "auto" ? (f.diag.debug("@vercel/otel: Configure instrumentations: fetch", e?.fetch), [
            new tt(e?.fetch)
        ]) : r === "fetch" ? (f.diag.debug("@vercel/otel: Configure instrumentations: fetch", e?.fetch), new tt(e?.fetch)) : r).flat();
}
function op(t, e) {
    let r = e.OTEL_PROPAGATORS && e.OTEL_PROPAGATORS.length > 0 ? e.OTEL_PROPAGATORS : void 0;
    return (t ?? r ?? [
        "auto"
    ]).map((n)=>{
        if (n === "none") return [];
        if (n === "auto") return f.diag.debug("@vercel/otel: Configure propagators: tracecontext, baggage"), [
            new te.W3CTraceContextPropagator,
            new te.W3CBaggagePropagator
        ];
        if (n === "tracecontext") return f.diag.debug("@vercel/otel: Configure propagator: tracecontext"), new te.W3CTraceContextPropagator;
        if (n === "baggage") return f.diag.debug("@vercel/otel: Configure propagator: baggage"), new te.W3CBaggagePropagator;
        if (typeof n == "string") throw new Error(`Unknown propagator: "${n}"`);
        return n;
    }).flat();
}
var Js = "always_on", rt = 1;
function ap(t, e) {
    if (t && typeof t != "string") return t;
    let r = t && t !== "auto" ? t : e.OTEL_TRACES_SAMPLER || Js;
    switch(f.diag.debug("@vercel/otel: Configure sampler: ", r), r){
        case "always_on":
            return new X;
        case "always_off":
            return new ae;
        case "parentbased_always_on":
            return new Se({
                root: new X
            });
        case "parentbased_always_off":
            return new Se({
                root: new ae
            });
        case "traceidratio":
            return new ke(eu(e));
        case "parentbased_traceidratio":
            return new Se({
                root: new ke(eu(e))
            });
        default:
            return f.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER value "${String(e.OTEL_TRACES_SAMPLER)} invalid, defaulting to ${Js}".`), new X;
    }
}
function eu(t) {
    if (t.OTEL_TRACES_SAMPLER_ARG === void 0 || t.OTEL_TRACES_SAMPLER_ARG === "") return f.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${rt}.`), rt;
    f.diag.debug("@vercel/otel: Configure sampler probability: ", t.OTEL_TRACES_SAMPLER_ARG);
    let e = Number(t.OTEL_TRACES_SAMPLER_ARG);
    return isNaN(e) ? (f.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER_ARG=${t.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${rt}.`), rt) : e < 0 || e > 1 ? (f.diag.error(`@vercel/otel: OTEL_TRACES_SAMPLER_ARG=${t.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${rt}.`), rt) : e;
}
function sp(t, e, r) {
    return [
        ...(t ?? [
            "auto"
        ]).map((n)=>{
            if (n === "auto") {
                if (process.env.VERCEL_OTEL_ENDPOINTS) {
                    let o = process.env.VERCEL_OTEL_ENDPOINTS_PORT || "4318", i = process.env.VERCEL_OTEL_ENDPOINTS_PROTOCOL || "http/protobuf";
                    f.diag.debug("@vercel/otel: Configure vercel otel collector on port: ", o, i);
                    let s = {
                        url: `http://localhost:${o}/v1/traces`,
                        headers: {}
                    }, u = i === "http/protobuf" ? new Be(s) : new Ze(s);
                    return new Ke(u);
                }
                return !e.traceExporter || e.traceExporter === "auto" || r.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || r.OTEL_EXPORTER_OTLP_ENDPOINT ? new Ke(up(r)) : void 0;
            }
            return n;
        }).filter(fp),
        ...e.traceExporter && e.traceExporter !== "auto" ? [
            new Ke(e.traceExporter)
        ] : []
    ];
}
function up(t) {
    let e = process.env.OTEL_EXPORTER_OTLP_TRACES_PROTOCOL ?? process.env.OTEL_EXPORTER_OTLP_PROTOCOL ?? "http/protobuf", r = lp(t), n = {
        ...te.baggageUtils.parseKeyPairsIntoRecord(t.OTEL_EXPORTER_OTLP_HEADERS),
        ...te.baggageUtils.parseKeyPairsIntoRecord(t.OTEL_EXPORTER_OTLP_TRACES_HEADERS)
    };
    switch(f.diag.debug("@vercel/otel: Configure trace exporter: ", e, r, `headers: ${Object.keys(n).join(",") || "<none>"}`), e){
        case "http/json":
            return new Ze({
                url: r,
                headers: n
            });
        case "http/protobuf":
            return new Be({
                url: r,
                headers: n
            });
        default:
            return f.diag.warn(`@vercel/otel: Unsupported OTLP traces protocol: ${e}. Using http/protobuf.`), new Be;
    }
}
var iu = "v1/traces", cp = `http://localhost:4318/${iu}`;
function lp(t) {
    let e = t.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
    if (e && typeof e == "string") return e;
    let r = t.OTEL_EXPORTER_OTLP_ENDPOINT;
    return r && typeof r == "string" ? `${r}/${iu}` : cp;
}
function fp(t) {
    return t != null;
}
function um(t) {
    let e;
    t ? typeof t == "string" ? e = {
        serviceName: t
    } : e = t : e = {}, new br(e).start();
}
;

})()),
}]);

//# sourceMappingURL=08b5e__pnpm_badf02._.js.map