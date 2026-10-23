var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type2) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type2) {
    return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
  }
  getEntriesByType(type2) {
    return this._entries.filter((e) => e.entryType === type2);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type2, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type2, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count3, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type2, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-Bnj0Cb/functionsWorker-0.7425366151327022.mjs
import { Writable } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
import crypto from "node:crypto";
var __defProp2 = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res, err) => /* @__PURE__ */ __name(function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
}, "__init"), "__esm");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented2(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented2(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
__name(notImplementedAsync, "notImplementedAsync");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");
var init_utils = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(createNotImplementedError2, "createNotImplementedError");
    __name2(notImplemented2, "notImplemented");
    __name2(notImplementedAsync, "notImplementedAsync");
    __name2(notImplementedClass, "notImplementedClass");
  }
});
var _timeOrigin2;
var _performanceNow2;
var nodeTiming2;
var PerformanceEntry2;
var PerformanceMark3;
var PerformanceMeasure2;
var PerformanceResourceTiming2;
var PerformanceObserverEntryList2;
var Performance2;
var PerformanceObserver2;
var performance2;
var init_performance = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
    nodeTiming2 = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry2 = class {
      static {
        __name(this, "PerformanceEntry");
      }
      static {
        __name2(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow2();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow2() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark3 = class PerformanceMark2 extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceMark2");
      }
      static {
        __name2(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure2 = class extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceMeasure");
      }
      static {
        __name2(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming2 = class extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      static {
        __name2(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList2 = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      static {
        __name2(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type2) {
        return [];
      }
    };
    Performance2 = class {
      static {
        __name(this, "Performance");
      }
      static {
        __name2(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin2;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming2;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming2("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin2) {
          return _performanceNow2();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type2) {
        return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
      }
      getEntriesByType(type2) {
        return this._entries.filter((e) => e.entryType === type2);
      }
      mark(name, options) {
        const entry = new PerformanceMark3(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure2(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type2, listener, options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
      }
      removeEventListener(type2, listener, options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver2 = class {
      static {
        __name(this, "PerformanceObserver");
      }
      static {
        __name2(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
  }
});
var init_perf_hooks = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});
var init_performance2 = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance2)) {
      const proto = Performance2.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance2)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance2, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance2;
    globalThis.Performance = Performance2;
    globalThis.PerformanceEntry = PerformanceEntry2;
    globalThis.PerformanceMark = PerformanceMark3;
    globalThis.PerformanceMeasure = PerformanceMeasure2;
    globalThis.PerformanceObserver = PerformanceObserver2;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
  }
});
var noop_default;
var init_noop = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});
var _console;
var _ignoreErrors;
var _stderr;
var _stdout;
var log;
var info;
var trace;
var debug;
var table;
var error;
var warn;
var createTask;
var clear;
var count;
var countReset;
var dir;
var dirxml;
var group;
var groupEnd;
var groupCollapsed;
var profile;
var profileEnd;
var time;
var timeEnd;
var timeLog;
var timeStamp;
var Console;
var _times;
var _stdoutErrorHandler;
var _stderrErrorHandler;
var init_console = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});
var workerdConsole;
var assert2;
var clear2;
var context;
var count2;
var countReset2;
var createTask2;
var debug2;
var dir2;
var dirxml2;
var error2;
var group2;
var groupCollapsed2;
var groupEnd2;
var info2;
var log2;
var profile2;
var profileEnd2;
var table2;
var time2;
var timeEnd2;
var timeLog2;
var timeStamp2;
var trace2;
var warn2;
var console_default;
var init_console2 = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert: assert2,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});
var hrtime4;
var init_hrtime = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
      return BigInt(Date.now() * 1e6);
    }, "bigint"), "bigint") });
  }
});
var ReadStream2;
var init_read_stream = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream2 = class {
      static {
        __name(this, "ReadStream");
      }
      static {
        __name2(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});
var WriteStream2;
var init_write_stream = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream2 = class {
      static {
        __name(this, "WriteStream");
      }
      static {
        __name2(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env3) {
        return 1;
      }
      hasColors(count3, env3) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});
var init_tty = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});
var NODE_VERSION2;
var init_node_version = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION2 = "22.14.0";
  }
});
var Process2;
var init_process = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process2 = class _Process extends EventEmitter2 {
      static {
        __name(this, "_Process");
      }
      static {
        __name2(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type2, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream2(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream2(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream2(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd22) {
        this.#cwd = cwd22;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION2}`;
      }
      get versions() {
        return { node: NODE_VERSION2 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw /* @__PURE__ */ createNotImplementedError2("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
      }
      exit() {
        throw /* @__PURE__ */ createNotImplementedError2("process.exit");
      }
      reallyExit() {
        throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
      }
      kill() {
        throw /* @__PURE__ */ createNotImplementedError2("process.kill");
      }
      abort() {
        throw /* @__PURE__ */ createNotImplementedError2("process.abort");
      }
      dlopen() {
        throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
      }
      disconnect() {
        throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
      }
      cpuUsage() {
        throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
      }
      openStdin() {
        throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
      }
      assert() {
        throw /* @__PURE__ */ createNotImplementedError2("process.assert");
      }
      binding() {
        throw /* @__PURE__ */ createNotImplementedError2("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});
var globalProcess2;
var getBuiltinModule2;
var workerdProcess2;
var unenvProcess2;
var exit2;
var features2;
var platform2;
var _channel2;
var _debugEnd2;
var _debugProcess2;
var _disconnect2;
var _events2;
var _eventsCount2;
var _exiting2;
var _fatalException2;
var _getActiveHandles2;
var _getActiveRequests2;
var _handleQueue2;
var _kill2;
var _linkedBinding2;
var _maxListeners2;
var _pendingMessage2;
var _preload_modules2;
var _rawDebug2;
var _send2;
var _startProfilerIdleNotifier2;
var _stopProfilerIdleNotifier2;
var _tickCallback2;
var abort2;
var addListener2;
var allowedNodeEnvironmentFlags2;
var arch2;
var argv2;
var argv02;
var assert22;
var availableMemory2;
var binding2;
var channel2;
var chdir2;
var config2;
var connected2;
var constrainedMemory2;
var cpuUsage2;
var cwd2;
var debugPort2;
var disconnect2;
var dlopen2;
var domain2;
var emit2;
var emitWarning2;
var env2;
var eventNames2;
var execArgv2;
var execPath2;
var exitCode2;
var finalization2;
var getActiveResourcesInfo2;
var getegid2;
var geteuid2;
var getgid2;
var getgroups2;
var getMaxListeners2;
var getuid2;
var hasUncaughtExceptionCaptureCallback2;
var hrtime32;
var initgroups2;
var kill2;
var listenerCount2;
var listeners2;
var loadEnvFile2;
var mainModule2;
var memoryUsage2;
var moduleLoadList2;
var nextTick2;
var off2;
var on2;
var once2;
var openStdin2;
var permission2;
var pid2;
var ppid2;
var prependListener2;
var prependOnceListener2;
var rawListeners2;
var reallyExit2;
var ref2;
var release2;
var removeAllListeners2;
var removeListener2;
var report2;
var resourceUsage2;
var send2;
var setegid2;
var seteuid2;
var setgid2;
var setgroups2;
var setMaxListeners2;
var setSourceMapsEnabled2;
var setuid2;
var setUncaughtExceptionCaptureCallback2;
var sourceMapsEnabled2;
var stderr2;
var stdin2;
var stdout2;
var throwDeprecation2;
var title2;
var traceDeprecation2;
var umask2;
var unref2;
var uptime2;
var version2;
var versions2;
var _process2;
var process_default2;
var init_process2 = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess2 = globalThis["process"];
    getBuiltinModule2 = globalProcess2.getBuiltinModule;
    workerdProcess2 = getBuiltinModule2("node:process");
    unenvProcess2 = new Process2({
      env: globalProcess2.env,
      hrtime: hrtime4,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess2.nextTick
    });
    ({ exit: exit2, features: features2, platform: platform2 } = workerdProcess2);
    ({
      _channel: _channel2,
      _debugEnd: _debugEnd2,
      _debugProcess: _debugProcess2,
      _disconnect: _disconnect2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _exiting: _exiting2,
      _fatalException: _fatalException2,
      _getActiveHandles: _getActiveHandles2,
      _getActiveRequests: _getActiveRequests2,
      _handleQueue: _handleQueue2,
      _kill: _kill2,
      _linkedBinding: _linkedBinding2,
      _maxListeners: _maxListeners2,
      _pendingMessage: _pendingMessage2,
      _preload_modules: _preload_modules2,
      _rawDebug: _rawDebug2,
      _send: _send2,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
      _tickCallback: _tickCallback2,
      abort: abort2,
      addListener: addListener2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      arch: arch2,
      argv: argv2,
      argv0: argv02,
      assert: assert22,
      availableMemory: availableMemory2,
      binding: binding2,
      channel: channel2,
      chdir: chdir2,
      config: config2,
      connected: connected2,
      constrainedMemory: constrainedMemory2,
      cpuUsage: cpuUsage2,
      cwd: cwd2,
      debugPort: debugPort2,
      disconnect: disconnect2,
      dlopen: dlopen2,
      domain: domain2,
      emit: emit2,
      emitWarning: emitWarning2,
      env: env2,
      eventNames: eventNames2,
      execArgv: execArgv2,
      execPath: execPath2,
      exitCode: exitCode2,
      finalization: finalization2,
      getActiveResourcesInfo: getActiveResourcesInfo2,
      getegid: getegid2,
      geteuid: geteuid2,
      getgid: getgid2,
      getgroups: getgroups2,
      getMaxListeners: getMaxListeners2,
      getuid: getuid2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      hrtime: hrtime32,
      initgroups: initgroups2,
      kill: kill2,
      listenerCount: listenerCount2,
      listeners: listeners2,
      loadEnvFile: loadEnvFile2,
      mainModule: mainModule2,
      memoryUsage: memoryUsage2,
      moduleLoadList: moduleLoadList2,
      nextTick: nextTick2,
      off: off2,
      on: on2,
      once: once2,
      openStdin: openStdin2,
      permission: permission2,
      pid: pid2,
      ppid: ppid2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      rawListeners: rawListeners2,
      reallyExit: reallyExit2,
      ref: ref2,
      release: release2,
      removeAllListeners: removeAllListeners2,
      removeListener: removeListener2,
      report: report2,
      resourceUsage: resourceUsage2,
      send: send2,
      setegid: setegid2,
      seteuid: seteuid2,
      setgid: setgid2,
      setgroups: setgroups2,
      setMaxListeners: setMaxListeners2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
      setuid: setuid2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      sourceMapsEnabled: sourceMapsEnabled2,
      stderr: stderr2,
      stdin: stdin2,
      stdout: stdout2,
      throwDeprecation: throwDeprecation2,
      title: title2,
      traceDeprecation: traceDeprecation2,
      umask: umask2,
      unref: unref2,
      uptime: uptime2,
      version: version2,
      versions: versions2
    } = unenvProcess2);
    _process2 = {
      abort: abort2,
      addListener: addListener2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      loadEnvFile: loadEnvFile2,
      sourceMapsEnabled: sourceMapsEnabled2,
      arch: arch2,
      argv: argv2,
      argv0: argv02,
      chdir: chdir2,
      config: config2,
      connected: connected2,
      constrainedMemory: constrainedMemory2,
      availableMemory: availableMemory2,
      cpuUsage: cpuUsage2,
      cwd: cwd2,
      debugPort: debugPort2,
      dlopen: dlopen2,
      disconnect: disconnect2,
      emit: emit2,
      emitWarning: emitWarning2,
      env: env2,
      eventNames: eventNames2,
      execArgv: execArgv2,
      execPath: execPath2,
      exit: exit2,
      finalization: finalization2,
      features: features2,
      getBuiltinModule: getBuiltinModule2,
      getActiveResourcesInfo: getActiveResourcesInfo2,
      getMaxListeners: getMaxListeners2,
      hrtime: hrtime32,
      kill: kill2,
      listeners: listeners2,
      listenerCount: listenerCount2,
      memoryUsage: memoryUsage2,
      nextTick: nextTick2,
      on: on2,
      off: off2,
      once: once2,
      pid: pid2,
      platform: platform2,
      ppid: ppid2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      rawListeners: rawListeners2,
      release: release2,
      removeAllListeners: removeAllListeners2,
      removeListener: removeListener2,
      report: report2,
      resourceUsage: resourceUsage2,
      setMaxListeners: setMaxListeners2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
      stderr: stderr2,
      stdin: stdin2,
      stdout: stdout2,
      title: title2,
      throwDeprecation: throwDeprecation2,
      traceDeprecation: traceDeprecation2,
      umask: umask2,
      uptime: uptime2,
      version: version2,
      versions: versions2,
      // @ts-expect-error old API
      domain: domain2,
      initgroups: initgroups2,
      moduleLoadList: moduleLoadList2,
      reallyExit: reallyExit2,
      openStdin: openStdin2,
      assert: assert22,
      binding: binding2,
      send: send2,
      exitCode: exitCode2,
      channel: channel2,
      getegid: getegid2,
      geteuid: geteuid2,
      getgid: getgid2,
      getgroups: getgroups2,
      getuid: getuid2,
      setegid: setegid2,
      seteuid: seteuid2,
      setgid: setgid2,
      setgroups: setgroups2,
      setuid: setuid2,
      permission: permission2,
      mainModule: mainModule2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _exiting: _exiting2,
      _maxListeners: _maxListeners2,
      _debugEnd: _debugEnd2,
      _debugProcess: _debugProcess2,
      _fatalException: _fatalException2,
      _getActiveHandles: _getActiveHandles2,
      _getActiveRequests: _getActiveRequests2,
      _kill: _kill2,
      _preload_modules: _preload_modules2,
      _rawDebug: _rawDebug2,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
      _tickCallback: _tickCallback2,
      _disconnect: _disconnect2,
      _handleQueue: _handleQueue2,
      _pendingMessage: _pendingMessage2,
      _channel: _channel2,
      _send: _send2,
      _linkedBinding: _linkedBinding2
    };
    process_default2 = _process2;
  }
});
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default2;
  }
});
function cf(handler) {
  return async ({ request, env: env3 }) => {
    globalThis.__ENV = env3;
    return handler(request);
  };
}
__name(cf, "cf");
var init_cf = __esm({
  "../lib/cf.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(cf, "cf");
  }
});
var getenv;
var init_env = __esm({
  "../lib/env.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    getenv = /* @__PURE__ */ __name2((k) => globalThis.__ENV?.[k] ?? (typeof process !== "undefined" ? process.env?.[k] : void 0), "getenv");
  }
});
var access;
var copyFile;
var cp;
var open;
var opendir;
var rename;
var truncate;
var rm;
var rmdir;
var mkdir;
var readdir;
var readlink;
var symlink;
var lstat;
var stat;
var link;
var unlink;
var chmod;
var lchmod;
var lchown;
var chown;
var utimes;
var lutimes;
var realpath;
var mkdtemp;
var writeFile;
var appendFile;
var readFile;
var watch;
var statfs;
var glob;
var init_promises = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented2("fs.access");
    copyFile = /* @__PURE__ */ notImplemented2("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented2("fs.cp");
    open = /* @__PURE__ */ notImplemented2("fs.open");
    opendir = /* @__PURE__ */ notImplemented2("fs.opendir");
    rename = /* @__PURE__ */ notImplemented2("fs.rename");
    truncate = /* @__PURE__ */ notImplemented2("fs.truncate");
    rm = /* @__PURE__ */ notImplemented2("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented2("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented2("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented2("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented2("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented2("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented2("fs.lstat");
    stat = /* @__PURE__ */ notImplemented2("fs.stat");
    link = /* @__PURE__ */ notImplemented2("fs.link");
    unlink = /* @__PURE__ */ notImplemented2("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented2("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented2("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented2("fs.lchown");
    chown = /* @__PURE__ */ notImplemented2("fs.chown");
    utimes = /* @__PURE__ */ notImplemented2("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented2("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented2("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented2("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented2("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented2("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented2("fs.readFile");
    watch = /* @__PURE__ */ notImplemented2("fs.watch");
    statfs = /* @__PURE__ */ notImplemented2("fs.statfs");
    glob = /* @__PURE__ */ notImplemented2("fs.glob");
  }
});
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: /* @__PURE__ */ __name(() => COPYFILE_EXCL, "COPYFILE_EXCL"),
  COPYFILE_FICLONE: /* @__PURE__ */ __name(() => COPYFILE_FICLONE, "COPYFILE_FICLONE"),
  COPYFILE_FICLONE_FORCE: /* @__PURE__ */ __name(() => COPYFILE_FICLONE_FORCE, "COPYFILE_FICLONE_FORCE"),
  EXTENSIONLESS_FORMAT_JAVASCRIPT: /* @__PURE__ */ __name(() => EXTENSIONLESS_FORMAT_JAVASCRIPT, "EXTENSIONLESS_FORMAT_JAVASCRIPT"),
  EXTENSIONLESS_FORMAT_WASM: /* @__PURE__ */ __name(() => EXTENSIONLESS_FORMAT_WASM, "EXTENSIONLESS_FORMAT_WASM"),
  F_OK: /* @__PURE__ */ __name(() => F_OK, "F_OK"),
  O_APPEND: /* @__PURE__ */ __name(() => O_APPEND, "O_APPEND"),
  O_CREAT: /* @__PURE__ */ __name(() => O_CREAT, "O_CREAT"),
  O_DIRECT: /* @__PURE__ */ __name(() => O_DIRECT, "O_DIRECT"),
  O_DIRECTORY: /* @__PURE__ */ __name(() => O_DIRECTORY, "O_DIRECTORY"),
  O_DSYNC: /* @__PURE__ */ __name(() => O_DSYNC, "O_DSYNC"),
  O_EXCL: /* @__PURE__ */ __name(() => O_EXCL, "O_EXCL"),
  O_NOATIME: /* @__PURE__ */ __name(() => O_NOATIME, "O_NOATIME"),
  O_NOCTTY: /* @__PURE__ */ __name(() => O_NOCTTY, "O_NOCTTY"),
  O_NOFOLLOW: /* @__PURE__ */ __name(() => O_NOFOLLOW, "O_NOFOLLOW"),
  O_NONBLOCK: /* @__PURE__ */ __name(() => O_NONBLOCK, "O_NONBLOCK"),
  O_RDONLY: /* @__PURE__ */ __name(() => O_RDONLY, "O_RDONLY"),
  O_RDWR: /* @__PURE__ */ __name(() => O_RDWR, "O_RDWR"),
  O_SYNC: /* @__PURE__ */ __name(() => O_SYNC, "O_SYNC"),
  O_TRUNC: /* @__PURE__ */ __name(() => O_TRUNC, "O_TRUNC"),
  O_WRONLY: /* @__PURE__ */ __name(() => O_WRONLY, "O_WRONLY"),
  R_OK: /* @__PURE__ */ __name(() => R_OK, "R_OK"),
  S_IFBLK: /* @__PURE__ */ __name(() => S_IFBLK, "S_IFBLK"),
  S_IFCHR: /* @__PURE__ */ __name(() => S_IFCHR, "S_IFCHR"),
  S_IFDIR: /* @__PURE__ */ __name(() => S_IFDIR, "S_IFDIR"),
  S_IFIFO: /* @__PURE__ */ __name(() => S_IFIFO, "S_IFIFO"),
  S_IFLNK: /* @__PURE__ */ __name(() => S_IFLNK, "S_IFLNK"),
  S_IFMT: /* @__PURE__ */ __name(() => S_IFMT, "S_IFMT"),
  S_IFREG: /* @__PURE__ */ __name(() => S_IFREG, "S_IFREG"),
  S_IFSOCK: /* @__PURE__ */ __name(() => S_IFSOCK, "S_IFSOCK"),
  S_IRGRP: /* @__PURE__ */ __name(() => S_IRGRP, "S_IRGRP"),
  S_IROTH: /* @__PURE__ */ __name(() => S_IROTH, "S_IROTH"),
  S_IRUSR: /* @__PURE__ */ __name(() => S_IRUSR, "S_IRUSR"),
  S_IRWXG: /* @__PURE__ */ __name(() => S_IRWXG, "S_IRWXG"),
  S_IRWXO: /* @__PURE__ */ __name(() => S_IRWXO, "S_IRWXO"),
  S_IRWXU: /* @__PURE__ */ __name(() => S_IRWXU, "S_IRWXU"),
  S_IWGRP: /* @__PURE__ */ __name(() => S_IWGRP, "S_IWGRP"),
  S_IWOTH: /* @__PURE__ */ __name(() => S_IWOTH, "S_IWOTH"),
  S_IWUSR: /* @__PURE__ */ __name(() => S_IWUSR, "S_IWUSR"),
  S_IXGRP: /* @__PURE__ */ __name(() => S_IXGRP, "S_IXGRP"),
  S_IXOTH: /* @__PURE__ */ __name(() => S_IXOTH, "S_IXOTH"),
  S_IXUSR: /* @__PURE__ */ __name(() => S_IXUSR, "S_IXUSR"),
  UV_DIRENT_BLOCK: /* @__PURE__ */ __name(() => UV_DIRENT_BLOCK, "UV_DIRENT_BLOCK"),
  UV_DIRENT_CHAR: /* @__PURE__ */ __name(() => UV_DIRENT_CHAR, "UV_DIRENT_CHAR"),
  UV_DIRENT_DIR: /* @__PURE__ */ __name(() => UV_DIRENT_DIR, "UV_DIRENT_DIR"),
  UV_DIRENT_FIFO: /* @__PURE__ */ __name(() => UV_DIRENT_FIFO, "UV_DIRENT_FIFO"),
  UV_DIRENT_FILE: /* @__PURE__ */ __name(() => UV_DIRENT_FILE, "UV_DIRENT_FILE"),
  UV_DIRENT_LINK: /* @__PURE__ */ __name(() => UV_DIRENT_LINK, "UV_DIRENT_LINK"),
  UV_DIRENT_SOCKET: /* @__PURE__ */ __name(() => UV_DIRENT_SOCKET, "UV_DIRENT_SOCKET"),
  UV_DIRENT_UNKNOWN: /* @__PURE__ */ __name(() => UV_DIRENT_UNKNOWN, "UV_DIRENT_UNKNOWN"),
  UV_FS_COPYFILE_EXCL: /* @__PURE__ */ __name(() => UV_FS_COPYFILE_EXCL, "UV_FS_COPYFILE_EXCL"),
  UV_FS_COPYFILE_FICLONE: /* @__PURE__ */ __name(() => UV_FS_COPYFILE_FICLONE, "UV_FS_COPYFILE_FICLONE"),
  UV_FS_COPYFILE_FICLONE_FORCE: /* @__PURE__ */ __name(() => UV_FS_COPYFILE_FICLONE_FORCE, "UV_FS_COPYFILE_FICLONE_FORCE"),
  UV_FS_O_FILEMAP: /* @__PURE__ */ __name(() => UV_FS_O_FILEMAP, "UV_FS_O_FILEMAP"),
  UV_FS_SYMLINK_DIR: /* @__PURE__ */ __name(() => UV_FS_SYMLINK_DIR, "UV_FS_SYMLINK_DIR"),
  UV_FS_SYMLINK_JUNCTION: /* @__PURE__ */ __name(() => UV_FS_SYMLINK_JUNCTION, "UV_FS_SYMLINK_JUNCTION"),
  W_OK: /* @__PURE__ */ __name(() => W_OK, "W_OK"),
  X_OK: /* @__PURE__ */ __name(() => X_OK, "X_OK")
});
var UV_FS_SYMLINK_DIR;
var UV_FS_SYMLINK_JUNCTION;
var O_RDONLY;
var O_WRONLY;
var O_RDWR;
var UV_DIRENT_UNKNOWN;
var UV_DIRENT_FILE;
var UV_DIRENT_DIR;
var UV_DIRENT_LINK;
var UV_DIRENT_FIFO;
var UV_DIRENT_SOCKET;
var UV_DIRENT_CHAR;
var UV_DIRENT_BLOCK;
var EXTENSIONLESS_FORMAT_JAVASCRIPT;
var EXTENSIONLESS_FORMAT_WASM;
var S_IFMT;
var S_IFREG;
var S_IFDIR;
var S_IFCHR;
var S_IFBLK;
var S_IFIFO;
var S_IFLNK;
var S_IFSOCK;
var O_CREAT;
var O_EXCL;
var UV_FS_O_FILEMAP;
var O_NOCTTY;
var O_TRUNC;
var O_APPEND;
var O_DIRECTORY;
var O_NOATIME;
var O_NOFOLLOW;
var O_SYNC;
var O_DSYNC;
var O_DIRECT;
var O_NONBLOCK;
var S_IRWXU;
var S_IRUSR;
var S_IWUSR;
var S_IXUSR;
var S_IRWXG;
var S_IRGRP;
var S_IWGRP;
var S_IXGRP;
var S_IRWXO;
var S_IROTH;
var S_IWOTH;
var S_IXOTH;
var F_OK;
var R_OK;
var W_OK;
var X_OK;
var UV_FS_COPYFILE_EXCL;
var COPYFILE_EXCL;
var UV_FS_COPYFILE_FICLONE;
var COPYFILE_FICLONE;
var UV_FS_COPYFILE_FICLONE_FORCE;
var COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});
var promises_default;
var init_promises2 = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});
var Dir;
var Dirent;
var Stats;
var ReadStream22;
var WriteStream22;
var FileReadStream;
var FileWriteStream;
var init_classes = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream22 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream22 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream22;
    FileWriteStream = WriteStream22;
  }
});
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name2(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
__name(callbackify, "callbackify");
var access2;
var appendFile2;
var chown2;
var chmod2;
var copyFile2;
var cp2;
var lchown2;
var lchmod2;
var link2;
var lstat2;
var lutimes2;
var mkdir2;
var mkdtemp2;
var realpath2;
var open2;
var opendir2;
var readdir2;
var readFile2;
var readlink2;
var rename2;
var rm2;
var rmdir2;
var stat2;
var symlink2;
var truncate2;
var unlink2;
var utimes2;
var writeFile2;
var statfs2;
var close;
var createReadStream;
var createWriteStream;
var exists;
var fchown;
var fchmod;
var fdatasync;
var fstat;
var fsync;
var ftruncate;
var futimes;
var lstatSync;
var read;
var readv;
var realpathSync;
var statSync;
var unwatchFile;
var watch2;
var watchFile;
var write;
var writev;
var _toUnixTimestamp;
var openAsBlob;
var glob2;
var appendFileSync;
var accessSync;
var chownSync;
var chmodSync;
var closeSync;
var copyFileSync;
var cpSync;
var existsSync;
var fchownSync;
var fchmodSync;
var fdatasyncSync;
var fstatSync;
var fsyncSync;
var ftruncateSync;
var futimesSync;
var lchownSync;
var lchmodSync;
var linkSync;
var lutimesSync;
var mkdirSync;
var mkdtempSync;
var openSync;
var opendirSync;
var readdirSync;
var readSync;
var readvSync;
var readFileSync;
var readlinkSync;
var renameSync;
var rmSync;
var rmdirSync;
var symlinkSync;
var truncateSync;
var unlinkSync;
var utimesSync;
var writeFileSync;
var writeSync;
var writevSync;
var statfsSync;
var globSync;
var init_fs = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name2(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented2("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented2("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented2("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented2("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented2("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented2("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented2("fs.cpSync");
    existsSync = /* @__PURE__ */ __name2(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented2("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented2("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented2("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented2("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented2("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented2("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented2("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented2("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented2("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented2("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented2("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented2("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented2("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented2("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented2("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented2("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented2("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented2("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented2("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented2("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented2("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented2("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented2("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented2("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented2("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented2("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented2("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented2("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented2("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented2("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented2("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented2("fs.globSync");
  }
});
var fs_exports = {};
__export(fs_exports, {
  Dir: /* @__PURE__ */ __name(() => Dir, "Dir"),
  Dirent: /* @__PURE__ */ __name(() => Dirent, "Dirent"),
  F_OK: /* @__PURE__ */ __name(() => F_OK, "F_OK"),
  FileReadStream: /* @__PURE__ */ __name(() => FileReadStream, "FileReadStream"),
  FileWriteStream: /* @__PURE__ */ __name(() => FileWriteStream, "FileWriteStream"),
  R_OK: /* @__PURE__ */ __name(() => R_OK, "R_OK"),
  ReadStream: /* @__PURE__ */ __name(() => ReadStream22, "ReadStream"),
  Stats: /* @__PURE__ */ __name(() => Stats, "Stats"),
  W_OK: /* @__PURE__ */ __name(() => W_OK, "W_OK"),
  WriteStream: /* @__PURE__ */ __name(() => WriteStream22, "WriteStream"),
  X_OK: /* @__PURE__ */ __name(() => X_OK, "X_OK"),
  _toUnixTimestamp: /* @__PURE__ */ __name(() => _toUnixTimestamp, "_toUnixTimestamp"),
  access: /* @__PURE__ */ __name(() => access2, "access"),
  accessSync: /* @__PURE__ */ __name(() => accessSync, "accessSync"),
  appendFile: /* @__PURE__ */ __name(() => appendFile2, "appendFile"),
  appendFileSync: /* @__PURE__ */ __name(() => appendFileSync, "appendFileSync"),
  chmod: /* @__PURE__ */ __name(() => chmod2, "chmod"),
  chmodSync: /* @__PURE__ */ __name(() => chmodSync, "chmodSync"),
  chown: /* @__PURE__ */ __name(() => chown2, "chown"),
  chownSync: /* @__PURE__ */ __name(() => chownSync, "chownSync"),
  close: /* @__PURE__ */ __name(() => close, "close"),
  closeSync: /* @__PURE__ */ __name(() => closeSync, "closeSync"),
  constants: /* @__PURE__ */ __name(() => constants_exports, "constants"),
  copyFile: /* @__PURE__ */ __name(() => copyFile2, "copyFile"),
  copyFileSync: /* @__PURE__ */ __name(() => copyFileSync, "copyFileSync"),
  cp: /* @__PURE__ */ __name(() => cp2, "cp"),
  cpSync: /* @__PURE__ */ __name(() => cpSync, "cpSync"),
  createReadStream: /* @__PURE__ */ __name(() => createReadStream, "createReadStream"),
  createWriteStream: /* @__PURE__ */ __name(() => createWriteStream, "createWriteStream"),
  default: /* @__PURE__ */ __name(() => fs_default, "default"),
  exists: /* @__PURE__ */ __name(() => exists, "exists"),
  existsSync: /* @__PURE__ */ __name(() => existsSync, "existsSync"),
  fchmod: /* @__PURE__ */ __name(() => fchmod, "fchmod"),
  fchmodSync: /* @__PURE__ */ __name(() => fchmodSync, "fchmodSync"),
  fchown: /* @__PURE__ */ __name(() => fchown, "fchown"),
  fchownSync: /* @__PURE__ */ __name(() => fchownSync, "fchownSync"),
  fdatasync: /* @__PURE__ */ __name(() => fdatasync, "fdatasync"),
  fdatasyncSync: /* @__PURE__ */ __name(() => fdatasyncSync, "fdatasyncSync"),
  fstat: /* @__PURE__ */ __name(() => fstat, "fstat"),
  fstatSync: /* @__PURE__ */ __name(() => fstatSync, "fstatSync"),
  fsync: /* @__PURE__ */ __name(() => fsync, "fsync"),
  fsyncSync: /* @__PURE__ */ __name(() => fsyncSync, "fsyncSync"),
  ftruncate: /* @__PURE__ */ __name(() => ftruncate, "ftruncate"),
  ftruncateSync: /* @__PURE__ */ __name(() => ftruncateSync, "ftruncateSync"),
  futimes: /* @__PURE__ */ __name(() => futimes, "futimes"),
  futimesSync: /* @__PURE__ */ __name(() => futimesSync, "futimesSync"),
  glob: /* @__PURE__ */ __name(() => glob2, "glob"),
  globSync: /* @__PURE__ */ __name(() => globSync, "globSync"),
  lchmod: /* @__PURE__ */ __name(() => lchmod2, "lchmod"),
  lchmodSync: /* @__PURE__ */ __name(() => lchmodSync, "lchmodSync"),
  lchown: /* @__PURE__ */ __name(() => lchown2, "lchown"),
  lchownSync: /* @__PURE__ */ __name(() => lchownSync, "lchownSync"),
  link: /* @__PURE__ */ __name(() => link2, "link"),
  linkSync: /* @__PURE__ */ __name(() => linkSync, "linkSync"),
  lstat: /* @__PURE__ */ __name(() => lstat2, "lstat"),
  lstatSync: /* @__PURE__ */ __name(() => lstatSync, "lstatSync"),
  lutimes: /* @__PURE__ */ __name(() => lutimes2, "lutimes"),
  lutimesSync: /* @__PURE__ */ __name(() => lutimesSync, "lutimesSync"),
  mkdir: /* @__PURE__ */ __name(() => mkdir2, "mkdir"),
  mkdirSync: /* @__PURE__ */ __name(() => mkdirSync, "mkdirSync"),
  mkdtemp: /* @__PURE__ */ __name(() => mkdtemp2, "mkdtemp"),
  mkdtempSync: /* @__PURE__ */ __name(() => mkdtempSync, "mkdtempSync"),
  open: /* @__PURE__ */ __name(() => open2, "open"),
  openAsBlob: /* @__PURE__ */ __name(() => openAsBlob, "openAsBlob"),
  openSync: /* @__PURE__ */ __name(() => openSync, "openSync"),
  opendir: /* @__PURE__ */ __name(() => opendir2, "opendir"),
  opendirSync: /* @__PURE__ */ __name(() => opendirSync, "opendirSync"),
  promises: /* @__PURE__ */ __name(() => promises_default, "promises"),
  read: /* @__PURE__ */ __name(() => read, "read"),
  readFile: /* @__PURE__ */ __name(() => readFile2, "readFile"),
  readFileSync: /* @__PURE__ */ __name(() => readFileSync, "readFileSync"),
  readSync: /* @__PURE__ */ __name(() => readSync, "readSync"),
  readdir: /* @__PURE__ */ __name(() => readdir2, "readdir"),
  readdirSync: /* @__PURE__ */ __name(() => readdirSync, "readdirSync"),
  readlink: /* @__PURE__ */ __name(() => readlink2, "readlink"),
  readlinkSync: /* @__PURE__ */ __name(() => readlinkSync, "readlinkSync"),
  readv: /* @__PURE__ */ __name(() => readv, "readv"),
  readvSync: /* @__PURE__ */ __name(() => readvSync, "readvSync"),
  realpath: /* @__PURE__ */ __name(() => realpath2, "realpath"),
  realpathSync: /* @__PURE__ */ __name(() => realpathSync, "realpathSync"),
  rename: /* @__PURE__ */ __name(() => rename2, "rename"),
  renameSync: /* @__PURE__ */ __name(() => renameSync, "renameSync"),
  rm: /* @__PURE__ */ __name(() => rm2, "rm"),
  rmSync: /* @__PURE__ */ __name(() => rmSync, "rmSync"),
  rmdir: /* @__PURE__ */ __name(() => rmdir2, "rmdir"),
  rmdirSync: /* @__PURE__ */ __name(() => rmdirSync, "rmdirSync"),
  stat: /* @__PURE__ */ __name(() => stat2, "stat"),
  statSync: /* @__PURE__ */ __name(() => statSync, "statSync"),
  statfs: /* @__PURE__ */ __name(() => statfs2, "statfs"),
  statfsSync: /* @__PURE__ */ __name(() => statfsSync, "statfsSync"),
  symlink: /* @__PURE__ */ __name(() => symlink2, "symlink"),
  symlinkSync: /* @__PURE__ */ __name(() => symlinkSync, "symlinkSync"),
  truncate: /* @__PURE__ */ __name(() => truncate2, "truncate"),
  truncateSync: /* @__PURE__ */ __name(() => truncateSync, "truncateSync"),
  unlink: /* @__PURE__ */ __name(() => unlink2, "unlink"),
  unlinkSync: /* @__PURE__ */ __name(() => unlinkSync, "unlinkSync"),
  unwatchFile: /* @__PURE__ */ __name(() => unwatchFile, "unwatchFile"),
  utimes: /* @__PURE__ */ __name(() => utimes2, "utimes"),
  utimesSync: /* @__PURE__ */ __name(() => utimesSync, "utimesSync"),
  watch: /* @__PURE__ */ __name(() => watch2, "watch"),
  watchFile: /* @__PURE__ */ __name(() => watchFile, "watchFile"),
  write: /* @__PURE__ */ __name(() => write, "write"),
  writeFile: /* @__PURE__ */ __name(() => writeFile2, "writeFile"),
  writeFileSync: /* @__PURE__ */ __name(() => writeFileSync, "writeFileSync"),
  writeSync: /* @__PURE__ */ __name(() => writeSync, "writeSync"),
  writev: /* @__PURE__ */ __name(() => writev, "writev"),
  writevSync: /* @__PURE__ */ __name(() => writevSync, "writevSync")
});
var fs_default;
var init_fs2 = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream22,
      Stats,
      WriteStream: WriteStream22,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});
var UV_UDP_REUSEADDR;
var dlopen22;
var errno;
var signals;
var priority;
var init_constants2 = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/internal/os/constants.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_UDP_REUSEADDR = 4;
    dlopen22 = {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    };
    errno = {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    };
    signals = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31
    };
    priority = {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    };
  }
});
var os_exports = {};
__export(os_exports, {
  EOL: /* @__PURE__ */ __name(() => EOL, "EOL"),
  arch: /* @__PURE__ */ __name(() => arch22, "arch"),
  availableParallelism: /* @__PURE__ */ __name(() => availableParallelism, "availableParallelism"),
  constants: /* @__PURE__ */ __name(() => constants, "constants"),
  cpus: /* @__PURE__ */ __name(() => cpus, "cpus"),
  default: /* @__PURE__ */ __name(() => os_default, "default"),
  devNull: /* @__PURE__ */ __name(() => devNull, "devNull"),
  endianness: /* @__PURE__ */ __name(() => endianness, "endianness"),
  freemem: /* @__PURE__ */ __name(() => freemem, "freemem"),
  getPriority: /* @__PURE__ */ __name(() => getPriority, "getPriority"),
  homedir: /* @__PURE__ */ __name(() => homedir, "homedir"),
  hostname: /* @__PURE__ */ __name(() => hostname, "hostname"),
  loadavg: /* @__PURE__ */ __name(() => loadavg, "loadavg"),
  machine: /* @__PURE__ */ __name(() => machine, "machine"),
  networkInterfaces: /* @__PURE__ */ __name(() => networkInterfaces, "networkInterfaces"),
  platform: /* @__PURE__ */ __name(() => platform22, "platform"),
  release: /* @__PURE__ */ __name(() => release22, "release"),
  setPriority: /* @__PURE__ */ __name(() => setPriority, "setPriority"),
  tmpdir: /* @__PURE__ */ __name(() => tmpdir, "tmpdir"),
  totalmem: /* @__PURE__ */ __name(() => totalmem, "totalmem"),
  type: /* @__PURE__ */ __name(() => type, "type"),
  uptime: /* @__PURE__ */ __name(() => uptime22, "uptime"),
  userInfo: /* @__PURE__ */ __name(() => userInfo, "userInfo"),
  version: /* @__PURE__ */ __name(() => version22, "version")
});
var constants;
var NUM_CPUS;
var availableParallelism;
var arch22;
var machine;
var endianness;
var cpus;
var getPriority;
var setPriority;
var homedir;
var tmpdir;
var devNull;
var freemem;
var totalmem;
var loadavg;
var uptime22;
var hostname;
var networkInterfaces;
var platform22;
var type;
var release22;
var version22;
var userInfo;
var EOL;
var os_default;
var init_os = __esm({
  "../../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/unenv/dist/runtime/node/os.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_constants2();
    constants = {
      UV_UDP_REUSEADDR,
      dlopen: dlopen22,
      errno,
      signals,
      priority
    };
    NUM_CPUS = 8;
    availableParallelism = /* @__PURE__ */ __name2(() => NUM_CPUS, "availableParallelism");
    arch22 = /* @__PURE__ */ __name2(() => "", "arch");
    machine = /* @__PURE__ */ __name2(() => "", "machine");
    endianness = /* @__PURE__ */ __name2(() => "LE", "endianness");
    cpus = /* @__PURE__ */ __name2(() => {
      const info3 = {
        model: "",
        speed: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      };
      return Array.from({ length: NUM_CPUS }, () => info3);
    }, "cpus");
    getPriority = /* @__PURE__ */ __name2(() => 0, "getPriority");
    setPriority = /* @__PURE__ */ notImplemented2("os.setPriority");
    homedir = /* @__PURE__ */ __name2(() => "/", "homedir");
    tmpdir = /* @__PURE__ */ __name2(() => "/tmp", "tmpdir");
    devNull = "/dev/null";
    freemem = /* @__PURE__ */ __name2(() => 0, "freemem");
    totalmem = /* @__PURE__ */ __name2(() => 0, "totalmem");
    loadavg = /* @__PURE__ */ __name2(() => [
      0,
      0,
      0
    ], "loadavg");
    uptime22 = /* @__PURE__ */ __name2(() => 0, "uptime");
    hostname = /* @__PURE__ */ __name2(() => "", "hostname");
    networkInterfaces = /* @__PURE__ */ __name2(() => {
      return { lo0: [
        {
          address: "127.0.0.1",
          netmask: "255.0.0.0",
          family: "IPv4",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "127.0.0.1/8"
        },
        {
          address: "::1",
          netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "::1/128",
          scopeid: 0
        },
        {
          address: "fe80::1",
          netmask: "ffff:ffff:ffff:ffff::",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "fe80::1/64",
          scopeid: 1
        }
      ] };
    }, "networkInterfaces");
    platform22 = /* @__PURE__ */ __name2(() => "linux", "platform");
    type = /* @__PURE__ */ __name2(() => "Linux", "type");
    release22 = /* @__PURE__ */ __name2(() => "", "release");
    version22 = /* @__PURE__ */ __name2(() => "", "version");
    userInfo = /* @__PURE__ */ __name2((opts) => {
      const encode = /* @__PURE__ */ __name2((str) => {
        if (opts?.encoding) {
          const buff = Buffer.from(str);
          return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
        }
        return str;
      }, "encode");
      return {
        gid: 1e3,
        uid: 1e3,
        homedir: encode("/"),
        shell: encode("/bin/sh"),
        username: encode("root")
      };
    }, "userInfo");
    EOL = "\n";
    os_default = {
      arch: arch22,
      availableParallelism,
      constants,
      cpus,
      EOL,
      endianness,
      devNull,
      freemem,
      getPriority,
      homedir,
      hostname,
      loadavg,
      machine,
      networkInterfaces,
      platform: platform22,
      release: release22,
      setPriority,
      tmpdir,
      totalmem,
      type,
      uptime: uptime22,
      userInfo,
      version: version22
    };
  }
});
async function redis(cmd) {
  const { url, token } = redisCfg();
  const r = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error("Redis: " + j.error);
  return j.result;
}
__name(redis, "redis");
async function blobStore() {
  if (!globalThis.__SF_BLOBS) throw new Error("Saqlash joyi sozlanmagan (KV, Redis yoki Blobs kerak)");
  return blobs ||= await globalThis.__SF_BLOBS();
}
__name(blobStore, "blobStore");
async function localFile() {
  const [{ default: fs }, { default: os }, { default: path }] = await Promise.all([Promise.resolve().then(() => (init_fs2(), fs_exports)), Promise.resolve().then(() => (init_os(), os_exports)), import("node:path")]);
  const file = path.join(os.tmpdir(), "suvfilter-local.json");
  return { read: /* @__PURE__ */ __name2(() => {
    try {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      return {};
    }
  }, "read"), write: /* @__PURE__ */ __name2((d) => fs.writeFileSync(file, JSON.stringify(d)), "write") };
}
__name(localFile, "localFile");
async function nextId() {
  if (!local() && !kv() && redisCfg()) return Number(await redis(["INCR", PREFIX + "counter:n"]));
  const c = await store.get("counter") || { n: 0 };
  c.n += 1;
  await store.set("counter", c);
  return c.n;
}
__name(nextId, "nextId");
async function listRequests() {
  const keys = (await store.keys("req/")).sort().reverse().slice(0, 300);
  return (await Promise.all(keys.map((k) => store.get(k)))).filter(Boolean);
}
__name(listRequests, "listRequests");
var PREFIX;
var kv;
var redisCfg;
var local;
var blobs;
var store;
var reqKey;
var getChats;
var init_store = __esm({
  "../lib/store.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_env();
    PREFIX = "sf:";
    kv = /* @__PURE__ */ __name2(() => globalThis.__ENV?.KV, "kv");
    redisCfg = /* @__PURE__ */ __name2(() => {
      const url = getenv("KV_REST_API_URL") || getenv("UPSTASH_REDIS_REST_URL");
      const token = getenv("KV_REST_API_TOKEN") || getenv("UPSTASH_REDIS_REST_TOKEN");
      return url && token ? { url, token } : null;
    }, "redisCfg");
    local = /* @__PURE__ */ __name2(() => getenv("SUVFILTER_LOCAL") === "1", "local");
    __name2(redis, "redis");
    __name2(blobStore, "blobStore");
    __name2(localFile, "localFile");
    store = {
      async get(key) {
        if (local()) return (await localFile()).read()[key] ?? null;
        if (kv()) return await kv().get(PREFIX + key, "json") ?? null;
        if (redisCfg()) {
          const v = await redis(["GET", PREFIX + key]);
          return v == null ? null : JSON.parse(v);
        }
        return await (await blobStore()).get(key, { type: "json" }) ?? null;
      },
      async set(key, value) {
        if (local()) {
          const f = await localFile();
          const d = f.read();
          d[key] = value;
          f.write(d);
          return;
        }
        if (kv()) {
          await kv().put(PREFIX + key, JSON.stringify(value));
          return;
        }
        if (redisCfg()) {
          await redis(["SET", PREFIX + key, JSON.stringify(value)]);
          return;
        }
        await (await blobStore()).setJSON(key, value);
      },
      async del(key) {
        if (local()) {
          const f = await localFile();
          const d = f.read();
          delete d[key];
          f.write(d);
          return;
        }
        if (kv()) {
          await kv().delete(PREFIX + key);
          return;
        }
        if (redisCfg()) {
          await redis(["DEL", PREFIX + key]);
          return;
        }
        await (await blobStore()).delete(key);
      },
      async keys(prefix) {
        if (local()) return Object.keys((await localFile()).read()).filter((k) => k.startsWith(prefix));
        if (kv()) {
          const out = [];
          let cursor;
          do {
            const r = await kv().list({ prefix: PREFIX + prefix, cursor });
            out.push(...r.keys.map((k) => k.name.slice(PREFIX.length)));
            cursor = r.list_complete ? void 0 : r.cursor;
          } while (cursor);
          return out;
        }
        if (redisCfg()) return (await redis(["KEYS", PREFIX + prefix + "*"])).map((k) => k.slice(PREFIX.length));
        return (await (await blobStore()).list({ prefix })).blobs.map((x) => x.key);
      }
    };
    __name2(nextId, "nextId");
    reqKey = /* @__PURE__ */ __name2((id) => "req/" + String(id).padStart(8, "0"), "reqKey");
    __name2(listRequests, "listRequests");
    getChats = /* @__PURE__ */ __name2(async () => await store.get("chats") || [], "getChats");
  }
});
async function tg(method, body) {
  const r = await fetch(`https://api.telegram.org/bot${cfg().token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.description);
  return j.result;
}
__name(tg, "tg");
async function notify(r, origin = getenv("URL") || "") {
  const text = `\u{1F195} <b>Yangi zayavka #${r.id}</b>

` + (r.model ? `\u{1F4E6} <b>Model:</b> ${esc(MODELS[r.model] || r.model)}
` : "") + `\u{1F464} <b>Ism:</b> ${esc(r.name)}
\u{1F4DE} <b>Telefon:</b> ${esc(r.phone)}
` + (r.region ? `\u{1F5FA} <b>Hudud:</b> ${esc(r.region)}
` : "") + (r.address ? `\u{1F3E0} <b>Manzil:</b> ${esc(r.address)}
` : "") + (r.tgUser ? `\u2708\uFE0F <b>Telegram:</b> ${esc(r.tgUser)}
` : "") + `\u{1F4CD} <b>Manba:</b> ${r.source === "bot" ? "Telegram bot" : "Sayt"}
` + (r.message ? `\u{1F4AC} <b>Xabar:</b> ${esc(r.message)}
` : "") + `
\u{1F552} ${new Date(r.createdAt).toLocaleString("uz-UZ", { timeZone: "Asia/Samarkand" })}`;
  const photo = r.model && MODELS[r.model] && origin ? `${origin}/models/${r.model}.jpg` : null;
  const chats = await getChats();
  const res = await Promise.allSettled(chats.map(async (chat_id) => {
    if (photo) {
      try {
        return await tg("sendPhoto", { chat_id, photo, caption: text, parse_mode: "HTML" });
      } catch (e) {
        console.error("Photo:", e.message);
      }
    }
    return tg("sendMessage", { chat_id, text, parse_mode: "HTML" });
  }));
  res.filter((x) => x.status === "rejected").forEach((x) => console.error("Telegram:", x.reason.message));
  return res.some((x) => x.status === "fulfilled");
}
__name(notify, "notify");
function isAdmin(req) {
  const t = (req.headers.get("cookie") || "").split(/;\s*/).map((c) => c.split("=")).find(([k]) => k === "sid")?.[1];
  if (!t || !cfg().secret) return false;
  const [exp, sig] = t.split(".");
  return !!sig && safeEq(sig, sign(exp)) && Number(exp) > Date.now();
}
__name(isAdmin, "isAdmin");
async function ensureWebhook(origin) {
  const url = origin + "/api/telegram";
  const info3 = await tg("getWebhookInfo", {});
  if (info3.url === url) {
    const s = await tg("getMyShortDescription", {}).catch(() => ({}));
    const d = await tg("getMyDescription", {}).catch(() => ({}));
    if (s.short_description !== BOT_SHORT || d.description !== BOT_ABOUT) {
      await tg("setMyShortDescription", { short_description: BOT_SHORT }).catch(() => {
      });
      await tg("setMyDescription", { description: BOT_ABOUT }).catch(() => {
      });
    }
    return true;
  }
  await tg("setWebhook", { url, secret_token: webhookSecret(), allowed_updates: ["message", "callback_query"] });
  await tg("setMyCommands", { commands: [
    { command: "start", description: "\u{1F4A7} Bosh menyu" },
    { command: "menu", description: "\u{1F3E0} Menyuni ochish" },
    { command: "cancel", description: "\u2716\uFE0F Zayavkani bekor qilish" }
  ] }).catch(() => {
  });
  await tg("setMyShortDescription", { short_description: BOT_SHORT }).catch(() => {
  });
  await tg("setMyDescription", { description: BOT_ABOUT }).catch(() => {
  });
  return true;
}
__name(ensureWebhook, "ensureWebhook");
var env22;
var cfg;
var json;
var MODELS;
var REGIONS;
var regionName;
var esc;
var sign;
var safeEq;
var makeToken;
var webhookSecret;
var BOT_SHORT;
var BOT_ABOUT;
var init_core = __esm({
  "../lib/core.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_store();
    init_env();
    env22 = /* @__PURE__ */ __name2((k) => getenv(k) || "", "env");
    cfg = /* @__PURE__ */ __name2(() => ({
      token: env22("TELEGRAM_BOT_TOKEN"),
      bind: env22("BIND_CODE"),
      user: env22("ADMIN_USER") || "admin",
      pass: env22("ADMIN_PASSWORD"),
      secret: env22("SESSION_SECRET")
    }), "cfg");
    json = /* @__PURE__ */ __name2((data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...headers } }), "json");
    __name2(tg, "tg");
    MODELS = { eco: "Aura Cebilon Eco", nature: "Aura Cebilon Nature", black: "Aura Cebilon Black", pro: "Aura Cebilon Pro", cebilup: "Aura Cebilup" };
    REGIONS = [
      { s: "Samarqand", f: "Samarqand viloyati" },
      { s: "Toshkent sh.", f: "Toshkent shahri" },
      { s: "Toshkent v.", f: "Toshkent viloyati" },
      { s: "Andijon", f: "Andijon viloyati" },
      { s: "Buxoro", f: "Buxoro viloyati" },
      { s: "Farg'ona", f: "Farg'ona viloyati" },
      { s: "Jizzax", f: "Jizzax viloyati" },
      { s: "Xorazm", f: "Xorazm viloyati" },
      { s: "Namangan", f: "Namangan viloyati" },
      { s: "Navoiy", f: "Navoiy viloyati" },
      { s: "Qashqadaryo", f: "Qashqadaryo viloyati" },
      { s: "Sirdaryo", f: "Sirdaryo viloyati" },
      { s: "Surxondaryo", f: "Surxondaryo viloyati" },
      { s: "Qoraqalpog'iston", f: "Qoraqalpog'iston Respublikasi" }
    ];
    regionName = /* @__PURE__ */ __name2((v) => REGIONS.find((r) => r.f === v)?.f || "", "regionName");
    esc = /* @__PURE__ */ __name2((s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]), "esc");
    __name2(notify, "notify");
    sign = /* @__PURE__ */ __name2((v) => crypto.createHmac("sha256", cfg().secret).update(v).digest("hex"), "sign");
    safeEq = /* @__PURE__ */ __name2((a, b) => {
      const x = Buffer.from(String(a)), y = Buffer.from(String(b));
      return x.length === y.length && crypto.timingSafeEqual(x, y);
    }, "safeEq");
    makeToken = /* @__PURE__ */ __name2(() => {
      const exp = String(Date.now() + 7 * 864e5);
      return `${exp}.${sign(exp)}`;
    }, "makeToken");
    __name2(isAdmin, "isAdmin");
    webhookSecret = /* @__PURE__ */ __name2(() => crypto.createHash("sha256").update("wh:" + cfg().secret).digest("hex").slice(0, 40), "webhookSecret");
    BOT_SHORT = "\u{1F4A7} Aura Cebilon: 4 990 000 so'mdan. 0% to'lov. Yetkazish, o'rnatish, servis BEPUL!";
    BOT_ABOUT = "Suv Filter Samarqand \u{1F4A7}\n\nAura Cebilon \u2014 suvni tozalashning yangi standarti. Original Germaniya texnologiyasi.\n\n\u{1F4B0} Narxlar: 4 990 000 \u2014 15 990 000 so'm\n\u{1F4B3} Foizsiz muddatli to'lov\n\u{1F381} Yetkazib berish, o'rnatish va servis \u2014 BEPUL\n\u{1F3AC} Demo xizmati\n\nBoshlash uchun START ni bosing \u{1F447}";
    __name2(ensureWebhook, "ensureWebhook");
  }
});
var STATUSES;
var cookie;
var admin_default;
var init_admin = __esm({
  "../lib/handlers/admin.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_store();
    init_core();
    STATUSES = ["new", "progress", "done"];
    cookie = /* @__PURE__ */ __name2((v, age) => `sid=${v}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${age}`, "cookie");
    admin_default = /* @__PURE__ */ __name2(async (req) => {
      const url = new URL(req.url), p = url.pathname, c = cfg();
      if (p === "/api/login" && req.method === "POST") {
        const { user, password } = await req.json().catch(() => ({}));
        if (c.pass && c.secret && safeEq(user || "", c.user) && safeEq(password || "", c.pass))
          return json({ ok: true }, 200, { "Set-Cookie": cookie(makeToken(), 7 * 86400) });
        await new Promise((r) => setTimeout(r, 600));
        return json({ error: "Login yoki parol noto'g'ri" }, 401);
      }
      if (p === "/api/logout") return json({ ok: true }, 200, { "Set-Cookie": cookie("", 0) });
      if (!isAdmin(req)) return json({ error: "Kirish kerak" }, 401);
      if (p === "/api/admin/requests" && req.method === "GET") {
        let webhook = false;
        try {
          webhook = await ensureWebhook(url.origin);
        } catch (e) {
          console.error("Webhook:", e.message);
        }
        return json({ requests: await listRequests(), chats: (await getChats()).length, bindCode: c.bind, webhook });
      }
      const m = p.match(/^\/api\/admin\/requests\/(\d+)$/);
      if (m) {
        const key = reqKey(m[1]), r = await store.get(key);
        if (!r) return json({ error: "Topilmadi" }, 404);
        if (req.method === "DELETE") {
          await store.del(key);
          return json({ ok: true });
        }
        if (req.method === "PATCH") {
          const { status } = await req.json().catch(() => ({}));
          if (!STATUSES.includes(status)) return json({ error: "Xato" }, 400);
          r.status = status;
          await store.set(key, r);
          return json({ ok: true });
        }
      }
      if (p === "/api/admin/test" && req.method === "POST") {
        const chats = await getChats();
        if (!chats.length) return json({ error: "Hech qaysi chat ulanmagan" }, 400);
        try {
          await Promise.all(chats.map((chat_id) => tg("sendMessage", { chat_id, text: "\u2705 Test xabar: admin paneldan." })));
          return json({ ok: true });
        } catch (e) {
          return json({ error: e.message }, 500);
        }
      }
      return json({ error: "Topilmadi" }, 404);
    }, "default");
  }
});
var onRequest;
var init_path = __esm({
  "api/admin/[[path]].js"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_cf();
    init_admin();
    onRequest = cf(admin_default);
  }
});
var onRequest2;
var init_login = __esm({
  "api/login.js"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_cf();
    init_admin();
    onRequest2 = cf(admin_default);
  }
});
var onRequest3;
var init_logout = __esm({
  "api/logout.js"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_cf();
    init_admin();
    onRequest3 = cf(admin_default);
  }
});
var requests_default;
var init_requests = __esm({
  "../lib/handlers/requests.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_store();
    init_core();
    requests_default = /* @__PURE__ */ __name2(async (req) => {
      if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
      const body = await req.json().catch(() => ({}));
      if (body.website) return json({ ok: true });
      const name = String(body.name || "").trim().slice(0, 100);
      const phone = String(body.phone || "").trim().slice(0, 30);
      const message = String(body.message || "").trim().slice(0, 1e3);
      const model = MODELS[body.model] ? body.model : "";
      const region = regionName(body.region);
      const address = String(body.address || "").trim().slice(0, 300);
      if (name.length < 2 || phone.replace(/\D/g, "").length < 9)
        return json({ error: "Ism va telefon raqamini to'g'ri kiriting" }, 400);
      const id = await nextId();
      const r = { id, name, phone, message, status: "new", createdAt: (/* @__PURE__ */ new Date()).toISOString(), sent: false, source: "site", model, region, address };
      await store.set(reqKey(id), r);
      r.sent = await notify(r, new URL(req.url).origin).catch(() => false);
      await store.set(reqKey(id), r);
      return json({ ok: true });
    }, "default");
  }
});
var onRequest4;
var init_requests2 = __esm({
  "api/requests.js"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_cf();
    init_requests();
    onRequest4 = cf(requests_default);
  }
});
async function sendWelcome(chat_id) {
  await typing(chat_id);
  const photo = SITE + "/welcome.jpg";
  try {
    await tg("sendPhoto", { chat_id, photo, caption: WELCOME, parse_mode: "HTML", reply_markup: MAIN });
  } catch {
    await send22(chat_id, WELCOME, { reply_markup: MAIN });
  }
  await send22(chat_id, "Pastdagi menyu har doim yoningizda \u{1F447}", { reply_markup: KB });
}
__name(sendWelcome, "sendWelcome");
async function startApply(chat_id, prefill = "", model = "") {
  await setSess(chat_id, { step: "name", message: prefill, model });
  await send22(chat_id, stepCard(1, "\u{1F464} Ismingiz?", "Ismingizni yozing."), { reply_markup: { remove_keyboard: true } });
}
__name(startApply, "startApply");
async function finish(chat_id, from) {
  const s = await getSess(chat_id);
  if (!s || s.step !== "confirm") return;
  await delSess(chat_id);
  const wait = await send22(chat_id, "\u23F3 Zayavka yuborilmoqda...\n\u25B1\u25B1\u25B1\u25B1\u25B1");
  const id = await nextId();
  const r = { id, name: s.name, phone: s.phone, message: s.message || "", status: "new", createdAt: (/* @__PURE__ */ new Date()).toISOString(), sent: false, source: "bot", model: s.model || "", region: s.region || "", address: s.address || "", tgUser: from.username ? "@" + from.username : "" };
  await store.set(reqKey(id), r);
  await tg("editMessageText", { chat_id, message_id: wait.message_id, text: `\u23F3 Zayavka yuborilmoqda...
${bar(3, 5)}` }).catch(() => {
  });
  r.sent = await notify(r, SITE).catch(() => false);
  await store.set(reqKey(id), r);
  await tg("editMessageText", {
    chat_id,
    message_id: wait.message_id,
    parse_mode: "HTML",
    text: `\u{1F389} <b>Zayavka #${r.id} qabul qilindi!</b>
\u25B0\u25B0\u25B0\u25B0\u25B0

Rahmat, <b>${esc(s.name)}</b>! Tez orada <b>${esc(s.phone)}</b> raqamiga qo'ng'iroq qilamiz.

\u{1F381} Eslatma: yetkazib berish, o'rnatish va servis \u2014 bepul.
\u{1F4A7} Toza suv \u2014 sog'lom oila!`
  }).catch(() => {
  });
  await send22(chat_id, "Yana nimadir kerakmi? \u{1F447}", { reply_markup: KB });
}
__name(finish, "finish");
async function sendModels(chat_id) {
  await tg("sendChatAction", { chat_id, action: "upload_photo" }).catch(() => {
  });
  try {
    await tg("sendMediaGroup", { chat_id, media: MODELS2.map(([k, cap]) => ({ type: "photo", media: `${SITE}/models/${k}.jpg`, caption: cap, parse_mode: "HTML" })) });
  } catch (e) {
    console.error("Media group:", e.message);
  }
  await send22(chat_id, MODELS_TEXT, { reply_markup: { inline_keyboard: [
    ...MODELS2.map(([k]) => [{ text: `\u{1F4DD} ${MODELS[k]} \u2014 narxini bilish`, callback_data: `mdl:${k}` }]),
    [{ text: "\u{1F3E0} Menyu", callback_data: "menu" }]
  ] } });
}
__name(sendModels, "sendModels");
async function route(chat_id, action, q) {
  const reply = q ? (t, kb) => show(q, t, kb) : (t, kb) => send22(chat_id, t, { reply_markup: kb });
  switch (action) {
    case "apply":
      return startApply(chat_id);
    case "models":
      return sendModels(chat_id);
    case "free":
      return reply(FREE, { inline_keyboard: [[{ text: "\u{1F4E6} Modellar va narxlar", callback_data: "models" }], APPLY_BTN, [{ text: "\u{1F3E0} Menyu", callback_data: "menu" }]] });
    case "info":
      return reply(PAGES[0], pageKb(0));
    case "pay":
      return reply(PAY, { inline_keyboard: [APPLY_BTN, [{ text: "\u{1F3E0} Menyu", callback_data: "menu" }]] });
    case "contact":
      return reply(CONTACT, { inline_keyboard: [[{ text: "\u2708\uFE0F Telegram kanal", url: "https://t.me/auracebilonsamarqandpro" }], APPLY_BTN] });
    case "faq":
      return reply("\u2753 <b>KO'P SO'RALADIGAN SAVOLLAR</b>\n" + BOT_LINE + "\nSavolni tanlang \u{1F447}", faqKb);
    case "quiz":
      await setQuiz(chat_id, /* @__PURE__ */ new Set());
      return reply(QUIZ_HEAD, quizKb(/* @__PURE__ */ new Set()));
    case "menu":
      return q ? show(q, "\u{1F3E0} <b>ASOSIY MENYU</b>\nNima qilamiz? \u{1F447}", MAIN) : sendWelcome(chat_id);
  }
}
__name(route, "route");
async function onMessage(m) {
  const chat_id = m.chat.id, text = (m.text || "").trim();
  const [cmd, arg] = text.split(/\s+/);
  const { bind } = cfg();
  if (cmd === "/start" && arg && bind && arg === bind) {
    const chats = await getChats();
    if (!chats.includes(chat_id)) {
      chats.push(chat_id);
      await store.set("chats", chats);
    }
    return send22(chat_id, "\u2705 <b>Ulandi!</b>\nEndi sayt va botdan kelgan zayavkalar shu yerga keladi.\n\n/stop \u2014 o'chirish");
  }
  if (cmd === "/stop") {
    const chats = await getChats();
    if (chats.includes(chat_id)) {
      await store.set("chats", chats.filter((c) => c !== chat_id));
      return send22(chat_id, "O'chirildi.");
    }
  }
  if (cmd === "/start") {
    await delSess(chat_id);
    return sendWelcome(chat_id);
  }
  if (cmd === "/menu") {
    await delSess(chat_id);
    return route(chat_id, "menu");
  }
  if (cmd === "/cancel") {
    await delSess(chat_id);
    return send22(chat_id, "\u2716\uFE0F Bekor qilindi.", { reply_markup: KB });
  }
  if (MENU_TEXT[text]) {
    await delSess(chat_id);
    await typing(chat_id);
    return route(chat_id, MENU_TEXT[text]);
  }
  const s = await getSess(chat_id);
  if (!s) return send22(chat_id, "Menyudan tanlang \u{1F447}", { reply_markup: MAIN });
  if (s.step === "name") {
    if (text.length < 2) return send22(chat_id, "Iltimos, ismingizni yozing \u{1F642}");
    s.name = text.slice(0, 100);
    s.step = "phone";
    await setSess(chat_id, s);
    return send22(chat_id, stepCard(2, `\u{1F4DE} Telefon raqamingiz, ${esc(s.name)}?`, "Tugmani bosing yoki yozing: <code>+998 90 123 45 67</code>"), {
      reply_markup: { keyboard: [[{ text: "\u{1F4F1} Raqamimni yuborish", request_contact: true }]], resize_keyboard: true, one_time_keyboard: true }
    });
  }
  if (s.step === "phone") {
    const phone = (m.contact?.phone_number || text).trim();
    if (phone.replace(/\D/g, "").length < 9) return send22(chat_id, "\u{1F914} Raqam to'g'ri emas. Qaytadan yozing: <code>+998 90 123 45 67</code>");
    s.phone = (phone.startsWith("+") || !/^998/.test(phone) ? phone : "+" + phone).slice(0, 30);
    s.step = "region";
    await setSess(chat_id, s);
    return send22(chat_id, stepCard(3, "\u{1F5FA} Qaysi hududdansiz?", "Viloyatni tanlang \u{1F447}"), { reply_markup: regionKb });
  }
  if (s.step === "region") return send22(chat_id, "Iltimos, viloyatni tugmalardan tanlang \u{1F447}", { reply_markup: regionKb });
  if (s.step === "address") {
    if (text.length < 4) return send22(chat_id, "Manzilni to'liqroq yozing: tuman, ko'cha, uy raqami.");
    s.address = text.slice(0, 300);
    s.step = "message";
    await setSess(chat_id, s);
    return send22(chat_id, messageStep(s), { reply_markup: skipKb("skip") });
  }
  if (s.step === "message") {
    s.message = [s.message, text].filter(Boolean).join(" | ").slice(0, 1e3);
    s.step = "confirm";
    await setSess(chat_id, s);
    return send22(chat_id, summary(s), { reply_markup: confirmKb });
  }
  if (s.step === "confirm") return send22(chat_id, "Pastdagi tugmalardan birini bosing \u{1F447}", { reply_markup: confirmKb });
}
__name(onMessage, "onMessage");
async function onCallback(q) {
  const chat_id = q.message.chat.id, d = q.data;
  await tg("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {
  });
  if (d === "noop") return;
  if (d.startsWith("mdl:")) {
    const k = d.split(":")[1];
    return MODELS[k] ? startApply(chat_id, "", k) : void 0;
  }
  if (d.startsWith("info:")) {
    const i = +d.split(":")[1];
    return show(q, PAGES[i], pageKb(i));
  }
  if (d.startsWith("faq:")) {
    const [qq, aa] = FAQ[+d.split(":")[1]];
    return show(q, `<b>${qq}</b>
${BOT_LINE}
${aa}`, { inline_keyboard: [[{ text: "\u25C0\uFE0F Savollar", callback_data: "faq" }], APPLY_BTN] });
  }
  if (d.startsWith("qz:")) {
    const set = await getQuiz(chat_id), i = +d.split(":")[1];
    set.has(i) ? set.delete(i) : set.add(i);
    await setQuiz(chat_id, set);
    return show(q, QUIZ_HEAD, quizKb(set));
  }
  if (d === "qzdone") {
    const set = await getQuiz(chat_id);
    if (!set.size) return tg("answerCallbackQuery", { callback_query_id: q.id, text: "Avval kamida bitta muammoni belgilang", show_alert: true }).catch(() => {
    });
    const list = [...set].map((i) => PROBLEMS[i]);
    const note = set.size === 1 ? "Aura Cebilon ko'p bosqichli tozalash bilan bunga yechim bo'la oladi." : "Bir nechta muammo bor \u2014 ko'p bosqichli tizim aynan shunday suv uchun.";
    return show(
      q,
      `\u{1F50D} <b>NATIJA</b>
${BOT_LINE}
Muammolar: <code>${bar(set.size, 6)}</code> ${set.size}/6

${list.join("\n")}

\u{1F4A1} ${note}
\u{1F3AC} Demo ko'rsatamiz, maslahat bepul!`,
      { inline_keyboard: [[{ text: "\u2705 Bepul maslahat olish", callback_data: "qzapply" }], [{ text: "\u{1F3E0} Menyu", callback_data: "menu" }]] }
    );
  }
  if (d === "qzapply") {
    const set = await getQuiz(chat_id);
    return startApply(chat_id, set.size ? "Suv muammolari: " + [...set].map((i) => PROBLEMS[i].replace(/^\S+\s/, "")).join(", ") : "");
  }
  if (d.startsWith("rg:")) {
    const s = await getSess(chat_id), reg = REGIONS[+d.split(":")[1]];
    if (!s || s.step !== "region" || !reg) return;
    s.region = reg.f;
    s.step = "address";
    await setSess(chat_id, s);
    return show(q, stepCard(4, `\u{1F3E0} Manzilingiz (${esc(reg.f)})`, "Tuman, ko'cha va uy raqamini yozing."), skipKb("skipaddr"));
  }
  if (d === "skipaddr") {
    const s = await getSess(chat_id);
    if (s && s.step === "address") {
      s.step = "message";
      await setSess(chat_id, s);
      return show(q, messageStep(s), skipKb("skip"));
    }
    return;
  }
  if (d === "skip") {
    const s = await getSess(chat_id);
    if (s && s.step === "message") {
      s.step = "confirm";
      await setSess(chat_id, s);
      return show(q, summary(s), confirmKb);
    }
    return;
  }
  if (d === "confirm") return finish(chat_id, q.from);
  if (d === "cancel") {
    await delSess(chat_id);
    return show(q, "\u2716\uFE0F Bekor qilindi.", { inline_keyboard: [APPLY_BTN] });
  }
  return route(chat_id, d, q);
}
__name(onCallback, "onCallback");
async function handleUpdate(u, origin) {
  SITE = getenv("URL") || origin;
  if (u.callback_query) return onCallback(u.callback_query);
  if (u.message && (u.message.text || u.message.contact)) return onMessage(u.message);
}
__name(handleUpdate, "handleUpdate");
var SITE;
var PHONE;
var BOT_LINE;
var bar;
var KB;
var MAIN;
var APPLY_BTN;
var WELCOME;
var PAGES;
var pageKb;
var PAY;
var FREE;
var CONTACT;
var FAQ;
var faqKb;
var PROBLEMS;
var quizKb;
var QUIZ_HEAD;
var send22;
var typing;
var getSess;
var setSess;
var delSess;
var getQuiz;
var setQuiz;
var show;
var modelLine;
var stepCard;
var summary;
var regionKb;
var messageStep;
var skipKb;
var confirmKb;
var MODELS2;
var MODELS_TEXT;
var MENU_TEXT;
var init_bot = __esm({
  "../lib/bot.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_store();
    init_env();
    init_core();
    SITE = "";
    PHONE = "+998 93 330 35 75";
    BOT_LINE = "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501";
    bar = /* @__PURE__ */ __name2((n, total) => "\u25B0".repeat(n) + "\u25B1".repeat(total - n), "bar");
    KB = { keyboard: [
      [{ text: "\u{1F4DD} Zayavka" }, { text: "\u{1F4E6} Modellar" }],
      [{ text: "\u{1F381} Bepul xizmatlar" }, { text: "\u{1F6B0} Mahsulot" }],
      [{ text: "\u{1F4A7} Suv testi" }, { text: "\u{1F4B3} To'lov" }],
      [{ text: "\u{1F4DE} Aloqa" }, { text: "\u2753 Savollar" }]
    ], resize_keyboard: true, is_persistent: true, input_field_placeholder: "Menyudan tanlang \u{1F447}" };
    MAIN = { inline_keyboard: [
      [{ text: "\u{1F4DD} Zayavka qoldirish", callback_data: "apply" }],
      [{ text: "\u{1F4E6} Modellar va narxlar", callback_data: "models" }, { text: "\u{1F381} Bepul xizmatlar", callback_data: "free" }],
      [{ text: "\u{1F6B0} Mahsulot", callback_data: "info:0" }, { text: "\u{1F4A7} Suv testi", callback_data: "quiz" }],
      [{ text: "\u{1F4B3} 0% to'lov", callback_data: "pay" }, { text: "\u{1F4DE} Aloqa", callback_data: "contact" }]
    ] };
    APPLY_BTN = [{ text: "\u{1F4DD} Zayavka qoldirish", callback_data: "apply" }];
    WELCOME = "\u{1F4A7} <b>SUV FILTER SAMARQAND</b>\n" + BOT_LINE + "\n\u2728 <b>Aura Cebilon Pro</b>\n<i>Suvni tozalashning yangi standarti</i>\n\n\u{1F1E9}\u{1F1EA} Original Germaniya texnologiyasi\n\u{1F4B0} Narxlar: <b>4 990 000 \u2014 15 990 000</b> so'm\n\u{1F4B3} <b>0% \u2014 foizsiz muddatli to'lov</b>\n\u{1F381} <b>Yetkazish, o'rnatish, servis \u2014 BEPUL</b>\n\u{1F3AC} Demo xizmati\n\u{1F69A} O'zbekiston bo'ylab\n" + BOT_LINE + "\nToza suv \u2014 butun oila salomatligi \u{1F499}\nQuyidan tanlang \u{1F447}";
    PAGES = [
      "\u{1F6B0} <b>Aura Cebilon Pro</b>  <code>1/4</code>\n" + BOT_LINE + "\nZamonaviy suv tozalash apparati.\n\u{1F4B0} Narxlar: <b>4 990 000 \u2014 15 990 000</b> so'm (modelga qarab)\n\n\u{1F300} Ko'p bosqichli tozalash tizimi\n\u{1F3E0} Ixcham dizayn \u2014 oshxonaga mos\n\u2699\uFE0F Oson o'rnatish va qulay foydalanish\n\u{1F381} Yetkazish, o'rnatish, servis \u2014 <b>bepul</b>",
      "\u{1F9EA} <b>Tozalash sifati</b>  <code>2/4</code>\n" + BOT_LINE + "\n\u2705 Begona hid\n\u2705 Tuz aralashmalari\n\u2705 Zang va sariq tus\n\n\u{1F60B} Natija: ichimlikdan shirin, mazali suv.\n\u{1F476} Bolalar uchun xavfsiz.",
      "\u{1F1E9}\u{1F1EA} <b>Texnologiya</b>  <code>3/4</code>\n" + BOT_LINE + "\nOriginal Germaniya texnologiyasi.\n\n\u{1F527} Original ehtiyot qismlar\n\u{1F6E0} Servis xizmati \u2014 <b>bepul</b>\n\u{1F3AC} Demo: apparat ishlashini o'zingiz ko'rasiz",
      "\u{1F4B3} <b>Shartlar</b>  <code>4/4</code>\n" + BOT_LINE + `
\u{1F4B0} Narxlar: <b>4 990 000 \u2014 15 990 000</b> so'm
\u{1F4B3} <b>0%</b> \u2014 foizsiz muddatli to'lov
\u{1F381} <b>Bepul:</b> yetkazib berish, o'rnatish, servis
\u{1F4CD} O'zbekiston bo'ylab

Aniq narx va shartlar uchun: <b>${PHONE}</b>`
    ];
    pageKb = /* @__PURE__ */ __name2((i) => ({ inline_keyboard: [
      [{ text: "\u25C0\uFE0F", callback_data: `info:${(i + 3) % 4}` }, { text: `${i + 1} / 4`, callback_data: "noop" }, { text: "\u25B6\uFE0F", callback_data: `info:${(i + 1) % 4}` }],
      APPLY_BTN,
      [{ text: "\u{1F3E0} Menyu", callback_data: "menu" }]
    ] }), "pageKb");
    PAY = "\u{1F4B3} <b>FOIZSIZ MUDDATLI TO'LOV</b>\n" + BOT_LINE + `
\u{1F4B0} Ustama foiz: <b>0%</b>
\u{1F381} Yetkazish, o'rnatish, servis: <b>BEPUL</b>
\u{1F4CD} O'zbekiston bo'ylab
\u{1F3AC} Avval demo \u2014 keyin qaror

Aniq shartlar va narxni operator aytadi:
\u{1F4DE} <b>${PHONE}</b>`;
    FREE = "\u{1F381} <b>BEPUL XIZMATLAR</b>\n" + BOT_LINE + "\nMahsulotni olganingizdan keyin:\n\n\u{1F69A} <b>Yetkazib berish</b> \u2014 bepul\n\u{1F527} <b>O'rnatish</b> \u2014 bepul\n\u{1F6E0} <b>Servis xizmati</b> \u2014 bepul\n\n\u{1F4CD} O'zbekiston bo'ylab\n\u{1F4B3} Va 0% foizsiz muddatli to'lov\n" + BOT_LINE + "\nQo'shimcha to'lovlarsiz \u2014 apparatni xarid qilasiz, qolganini biz qilamiz \u{1F499}";
    CONTACT = "\u{1F4DE} <b>ALOQA</b>\n" + BOT_LINE + `
\u260E\uFE0F <b>${PHONE}</b>
\u{1F4CD} O'zbekiston bo'ylab

\u{1F4F8} instagram.com/suv_filtir_samarqand
\u2708\uFE0F t.me/auracebilonsamarqandpro`;
    FAQ = [
      ["\u{1F4B3} To'lov qanday?", "Foizsiz muddatli to'lov mavjud. Aniq shartlarni operator tushuntiradi."],
      ["\u{1F69A} Qayerga yetkazasiz?", "O'zbekiston bo'ylab. Mahsulotni olgandan keyin yetkazib berish bepul."],
      ["\u{1F3AC} Sinab ko'rsa bo'ladimi?", "Ha, demo xizmatimiz bor \u2014 apparat ishlashini o'zingiz ko'rasiz."],
      ["\u2699\uFE0F O'rnatish va servis pullikmi?", "Yo'q, mahsulotni olgandan keyin yetkazib berish, o'rnatish va servis xizmati bepul."],
      ["\u{1F4B0} Narxi qancha?", `Narxlar modelga qarab 4 990 000 so'mdan 15 990 000 so'mgacha. Aniq narx uchun ${PHONE} raqamiga qo'ng'iroq qiling yoki zayavka qoldiring.`]
    ];
    faqKb = { inline_keyboard: [...FAQ.map(([q], i) => [{ text: q, callback_data: `faq:${i}` }]), [{ text: "\u{1F3E0} Menyu", callback_data: "menu" }]] };
    PROBLEMS = ["\u{1F922} Noxush hid", "\u{1F9C2} Tuzli suv", "\u{1F7E0} Zang / sariq tus", "\u{1F32B} Loyqa", "\u{1FAD6} Idishda oq qatlam", "\u{1F615} Mazasi yoqmaydi"];
    quizKb = /* @__PURE__ */ __name2((set) => ({ inline_keyboard: [
      ...PROBLEMS.map((p, i) => [{ text: (set.has(i) ? "\u2705 " : "\u2B1C ") + p, callback_data: `qz:${i}` }]),
      [{ text: "\u{1F50D} Natijani ko'rish", callback_data: "qzdone" }]
    ] }), "quizKb");
    QUIZ_HEAD = "\u{1F4A7} <b>SUV TESTI</b>\n" + BOT_LINE + "\nSuvingizda qanday muammo bor? Hammasini belgilang \u{1F447}";
    send22 = /* @__PURE__ */ __name2((chat_id, text, extra = {}) => tg("sendMessage", { chat_id, text, parse_mode: "HTML", ...extra }), "send");
    typing = /* @__PURE__ */ __name2((chat_id) => tg("sendChatAction", { chat_id, action: "typing" }).catch(() => {
    }), "typing");
    getSess = /* @__PURE__ */ __name2((id) => store.get("sess/" + id), "getSess");
    setSess = /* @__PURE__ */ __name2((id, s) => store.set("sess/" + id, s), "setSess");
    delSess = /* @__PURE__ */ __name2((id) => store.del("sess/" + id), "delSess");
    getQuiz = /* @__PURE__ */ __name2(async (id) => new Set(await store.get("quiz/" + id) || []), "getQuiz");
    setQuiz = /* @__PURE__ */ __name2((id, set) => store.set("quiz/" + id, [...set]), "setQuiz");
    show = /* @__PURE__ */ __name2(async (q, text, reply_markup) => {
      const m = q.message;
      if (m.photo) return send22(m.chat.id, text, { reply_markup });
      try {
        await tg("editMessageText", { chat_id: m.chat.id, message_id: m.message_id, text, parse_mode: "HTML", reply_markup });
      } catch (e) {
        if (!/not modified/i.test(e.message)) await send22(m.chat.id, text, { reply_markup });
      }
    }, "show");
    __name2(sendWelcome, "sendWelcome");
    modelLine = /* @__PURE__ */ __name2((s) => s.model ? `\u{1F4E6} <b>${esc(MODELS[s.model])}</b>
` : "", "modelLine");
    stepCard = /* @__PURE__ */ __name2((n, title22, body) => `\u{1F4DD} <b>ZAYAVKA</b>  ${bar(n, 5)} <code>${n}/5</code>
${BOT_LINE}
<b>${title22}</b>
${body}

<i>Bekor qilish: /cancel</i>`, "stepCard");
    __name2(startApply, "startApply");
    summary = /* @__PURE__ */ __name2((s) => `\u{1F9FE} <b>ZAYAVKANI TEKSHIRING</b>
${BOT_LINE}
${modelLine(s)}\u{1F464} <b>${esc(s.name)}</b>
\u{1F4DE} <b>${esc(s.phone)}</b>
` + (s.region ? `\u{1F5FA} ${esc(s.region)}
` : "") + (s.address ? `\u{1F3E0} ${esc(s.address)}
` : "") + (s.message ? `\u{1F4AC} ${esc(s.message)}
` : "") + `${BOT_LINE}
Hammasi to'g'rimi?`, "summary");
    regionKb = { inline_keyboard: [
      ...Array.from({ length: Math.ceil(REGIONS.length / 2) }, (_, i) => REGIONS.slice(i * 2, i * 2 + 2).map((r, j) => ({ text: r.s, callback_data: `rg:${i * 2 + j}` })))
    ] };
    messageStep = /* @__PURE__ */ __name2((s) => stepCard(5, "\u{1F4AC} Qo'shimcha xabar", "Masalan: qulay vaqt yoki savolingiz. Yozing yoki o'tkazib yuboring."), "messageStep");
    skipKb = /* @__PURE__ */ __name2((data) => ({ inline_keyboard: [[{ text: "\u23ED O'tkazib yuborish", callback_data: data }]] }), "skipKb");
    confirmKb = { inline_keyboard: [[{ text: "\u2705 Yuborish", callback_data: "confirm" }, { text: "\u270F\uFE0F Qaytadan", callback_data: "apply" }], [{ text: "\u2716\uFE0F Bekor qilish", callback_data: "cancel" }]] };
    __name2(finish, "finish");
    MODELS2 = [
      ["eco", "<b>Cebilon Eco</b> \u2014 ixcham oq korpus"],
      ["nature", "<b>Cebilon Nature</b> \u2014 qora-oq zamonaviy dizayn"],
      ["black", "<b>Cebilon Black</b> \u2014 qora-oq dizayn, boshqaruv paneli bilan"],
      ["pro", "<b>Cebilon Pro</b> \u2014 oq klassik korpus, tepasida displey"],
      ["cebilup", "<b>Cebilup</b> \u2014 polda turadigan model"]
    ];
    MODELS_TEXT = "\u{1F4E6} <b>MODELLAR VA NARXLAR</b>\n" + BOT_LINE + "\n\u{1F4B0} <b>4 990 000 \u2014 15 990 000</b> so'm\n<i>Aniq narx modelga qarab belgilanadi.</i>\n\n\u{1F4B3} 0% foizsiz muddatli to'lov\n\u{1F381} Yetkazish, o'rnatish, servis \u2014 BEPUL\n\nModel tanlab, zayavka qoldiring \u{1F447}";
    __name2(sendModels, "sendModels");
    MENU_TEXT = { "\u{1F4DD} Zayavka": "apply", "\u{1F4E6} Modellar": "models", "\u{1F381} Bepul xizmatlar": "free", "\u{1F6B0} Mahsulot": "info", "\u{1F4A7} Suv testi": "quiz", "\u{1F4B3} To'lov": "pay", "\u{1F4DE} Aloqa": "contact", "\u2753 Savollar": "faq" };
    __name2(route, "route");
    __name2(onMessage, "onMessage");
    __name2(onCallback, "onCallback");
    __name2(handleUpdate, "handleUpdate");
  }
});
var telegram_default;
var init_telegram = __esm({
  "../lib/handlers/telegram.mjs"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    init_bot();
    telegram_default = /* @__PURE__ */ __name2(async (req) => {
      if (req.method !== "POST" || !cfg().secret) return json({ ok: false }, 404);
      if (!safeEq(req.headers.get("x-telegram-bot-api-secret-token") || "", webhookSecret())) return json({ ok: false }, 403);
      const update = await req.json().catch(() => null);
      if (update) {
        try {
          await handleUpdate(update, new URL(req.url).origin);
        } catch (e) {
          console.error("Update:", e.message);
        }
      }
      return json({ ok: true });
    }, "default");
  }
});
var onRequest5;
var init_telegram2 = __esm({
  "api/telegram.js"() {
    init_functionsRoutes_0_32943292024642146();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_cf();
    init_telegram();
    onRequest5 = cf(telegram_default);
  }
});
var routes;
var init_functionsRoutes_0_32943292024642146 = __esm({
  "../.wrangler/tmp/pages-Bnj0Cb/functionsRoutes-0.32943292024642146.mjs"() {
    init_path();
    init_login();
    init_logout();
    init_requests2();
    init_telegram2();
    routes = [
      {
        routePath: "/api/admin/:path*",
        mountPath: "/api/admin",
        method: "",
        middlewares: [],
        modules: [onRequest]
      },
      {
        routePath: "/api/login",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest2]
      },
      {
        routePath: "/api/logout",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest3]
      },
      {
        routePath: "/api/requests",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest4]
      },
      {
        routePath: "/api/telegram",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest5]
      }
    ];
  }
});
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type2) {
    if (i < tokens.length && tokens[i].type === type2)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type2) {
    var value2 = tryConsume(type2);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type2));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open3 = tryConsume("OPEN");
    if (open3) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route2 = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route2 += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route2 += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route2 += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route2 += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route2 += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route2 += "".concat(delimiterRe, "?");
    route2 += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route2 += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route2 += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route2, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route2 of [...routes].reverse()) {
    if (route2.method && route2.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route2.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route2.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route2.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route2 of routes) {
    if (route2.method && route2.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route2.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route2.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route2.modules.length) {
      for (const handler of route2.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env3, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env3,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env3["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env3["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name2(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error3 = reduceError(e);
    const body = JSON.stringify(error3);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_32943292024642146();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env3, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type2, init) {
        if (type2 === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type2, init) => {
      if (type2 === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error3 = reduceError2(e);
    const body = JSON.stringify(error3);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-4pkGRb/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../../tmp/claude-0/-home-user/76818bc0-428b-55b1-9d27-a1dd58c6842c/scratchpad/wr/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-4pkGRb/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type2, init) {
        if (type2 === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type2, init) => {
      if (type2 === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.7425366151327022.js.map
