// @ts-nocheck
import * as query_sparql_solid_1 from "@comunica/query-sparql-solid";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
/**
 * Asynchronous iterator wrapper for the Comunica SPARQL query engine.
 */
class ComunicaEngine {
    /**
     * Create a ComunicaEngine to query the given default source.
     *
     * The default source can be a single URL, an RDF/JS Datasource,
     * or an array with any of these.
     */
    constructor(defaultSource, settings = {}) {
        var _a, _b;
        this.engine = (_a = settings.engine) !== null && _a !== void 0 ? _a : new query_sparql_solid_1.QueryEngine();
        // Preload sources but silence errors; they will be thrown during execution
        this.sources = this.parseSourcesSilent(defaultSource);
        this.destination = settings.destination ? this.parseSourcesSilent(settings.destination) : undefined;
        this.options = (_b = settings.options) !== null && _b !== void 0 ? _b : {};
    }
    parseSourcesSilent(sources) {
        const parsedSources = this.parseSources(sources);
        parsedSources.catch(() => null);
        return parsedSources;
    }
    /**
     * Creates an asynchronous iterable of results for the given SPARQL query.
     */
    execute(sparql, source) {
        return __asyncGenerator(this, arguments, function* execute_1() {
            var e_1, _a;
            // Load the sources if passed, the default sources otherwise
            const sources = yield __await(this.parseSources(source, this.sources));
            if ((/^\s*(?:INSERT|DELETE)/i).test(sparql)) {
                yield __await(yield* __asyncDelegator(__asyncValues(this.executeUpdate(sparql, source))));
            }
            else if (sources.length !== 0) {
                try {
                    // Execute the query and yield the results
                    for (var _b = __asyncValues(this.streamToAsyncIterable(yield __await(this.engine.queryBindings(sparql, Object.assign({ sources }, this.options))))), _c; _c = yield __await(_b.next()), !_c.done;) {
                        const binding = _c.value;
                        yield yield __await(new Proxy(binding, {
                            get(target, name) {
                                if (name === 'values')
                                    return () => toIterator(binding.values());
                                // @ts-ignore
                                return target[name];
                            },
                        }));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    }
    /**
     * Creates an asynchronous iterable with the results of the SPARQL UPDATE query.
     */
    executeUpdate(sparql, source) {
        return __asyncGenerator(this, arguments, function* executeUpdate_1() {
            let sources;
            // Need to await the destination
            const destination = yield __await(this.destination);
            // Set the appropriate destination
            if (!source && destination) {
                if (destination.length !== 1)
                    throw new Error(`Destination must be a single source, not ${destination.length}`);
                sources = destination;
            }
            else {
                // Load the sources if passed, the default sources otherwise
                const _sources = yield __await(this.parseSources(source, this.sources));
                if (_sources.length === 0)
                    throw new Error('At least one source must be specified: Updates are inserted into the first given data source if no destination is specified, or if using explicit sources for query');
                sources = [_sources[0]];
            }
            // Resolves when the update is complete
            return yield __await(this.engine.queryVoid(sparql, Object.assign({ sources }, this.options)));
        });
    }
    /**
     * Parses the source(s) into an array of Comunica sources.
     */
    parseSources(source, defaultSources = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const sources = yield source;
            if (!sources)
                return defaultSources;
            // Flatten recursive calls to this function
            if (Array.isArray(sources))
                return flattenAsync(sources.map(s => this.parseSources(s)));
            // Strip the fragment off a URI
            if (typeof sources === 'string')
                return [{ value: sources.replace(/#.*/, '') }];
            // Transform URLs or terms into strings
            if (sources instanceof URL)
                return [{ value: sources.href.replace(/#.*/, '') }];
            if ('termType' in sources && sources.termType === 'NamedNode')
                return [{ value: sources.value.replace(/#.*/, '') }];
            // Needs to be after the string check since those also have a match functions
            if ('match' in sources && typeof sources.match === 'function')
                return [{ value: sources, type: 'rdfjsSource' }];
            // Wrap a single source in an array
            if ('value' in sources && typeof sources.value === 'string')
                return [sources];
            // Error on unsupported sources
            throw new Error(`Unsupported source: ${sources}`);
        });
    }
    /**
     * Transforms the readable into an asynchronously iterable object
     */
    streamToAsyncIterable(readable) {
        let done = false;
        let pendingError;
        let pendingPromise;
        readable.on('readable', settlePromise);
        readable.on('error', finish);
        readable.on('end', finish);
        return {
            next: () => new Promise(trackPromise),
            [Symbol.asyncIterator]() { return this; },
        };
        function trackPromise(resolve, reject) {
            pendingPromise = { resolve, reject };
            settlePromise();
        }
        function settlePromise() {
            // Finish if the stream errored or ended
            if (done || pendingError) {
                finish();
            }
            // Try to resolve the promise with a value
            else if (pendingPromise) {
                const value = readable.read();
                if (value !== null) {
                    pendingPromise.resolve({ value });
                    pendingPromise = null;
                }
            }
        }
        function finish(error) {
            // Finish with or without an error
            if (!pendingError) {
                done = true;
                pendingError = error;
            }
            // Try to emit the result
            if (pendingPromise) {
                if (!pendingError)
                    // @ts-ignore
                    pendingPromise.resolve({ done });
                else
                    pendingPromise.reject(pendingError);
                pendingPromise = null;
            }
            // Detach listeners
            readable.on('readable', settlePromise);
            readable.on('error', finish);
            readable.on('end', finish);
        }
    }
    /**
     * Removes the given document (or all, if not specified) from the cache,
     * such that fresh results are obtained next time.
     */
    clearCache(document) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.engine.invalidateHttpCache(document);
        });
    }
}
export default ComunicaEngine;
function* toIterator(iterable) {
    for (const i of iterable)
        yield i;
}
// Flattens the given array one level deep
function flattenAsync(array) {
    return __awaiter(this, void 0, void 0, function* () {
        return [].concat(...(yield Promise.all(array)));
    });
}
