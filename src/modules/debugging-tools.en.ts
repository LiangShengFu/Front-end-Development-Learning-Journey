/**
 * Module 05: Frontend Debugging & Troubleshooting Basics (English)
 *
 * English translation of src/modules/debugging-tools.ts.
 * - 20 knowledge points (15 chapters + interview questions + 2 hands-on + cheat sheet + quiz)
 * - 13 visualizations
 *
 * Covers Chrome DevTools panels, breakpoint debugging, network capture,
 * performance analysis, memory profiling, mobile debugging, SourceMap, and Lighthouse.
 */
import type { ModuleMeta } from '../lib/types'

export const debuggingToolsModule: ModuleMeta = {
  number: '05',
  title: 'Frontend Debugging & Troubleshooting Basics',
  slug: 'debugging-tools',
  stage: 'basics',
  stageLabel: 'Basics · Module 5',
  icon: '05',
  summary: 'Chrome DevTools panels, breakpoint debugging, performance and memory analysis, debugging methodology.',
  knowledgePointCount: 20,
  visualizationCount: 13,
  points: [
    // ========================================================================
    // KP 1: Chrome DevTools Overview
    // ========================================================================
    {
      order: 1,
      title: 'Chrome DevTools Overview',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'Chrome DevTools is the core toolset for frontend debugging, with panels like Elements, Console, Sources, Network, Performance, Memory, and Application. Knowing each panel\'s use case is the foundation of efficient debugging.',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'devtools', label: 'DevTools', group: 'core', weight: 3 },
              { id: 'elements', label: 'Elements', group: 'related', weight: 2 },
              { id: 'console', label: 'Console', group: 'related', weight: 2 },
              { id: 'sources', label: 'Sources', group: 'related', weight: 2 },
              { id: 'network', label: 'Network', group: 'related', weight: 2 },
              { id: 'performance', label: 'Performance', group: 'related', weight: 2 },
              { id: 'memory', label: 'Memory', group: 'related', weight: 2 },
              { id: 'application', label: 'Application', group: 'related', weight: 2 },
              { id: 'lighthouse', label: 'Lighthouse', group: 'related', weight: 1 },
              { id: 'recorder', label: 'Recorder', group: 'related', weight: 1 },
            ],
            edges: [
              { source: 'devtools', target: 'elements' },
              { source: 'devtools', target: 'console' },
              { source: 'devtools', target: 'sources' },
              { source: 'devtools', target: 'network' },
              { source: 'devtools', target: 'performance' },
              { source: 'devtools', target: 'memory' },
              { source: 'devtools', target: 'application' },
              { source: 'devtools', target: 'lighthouse' },
              { source: 'devtools', target: 'recorder' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'table',
          caption: 'Common panels and their use cases',
          headers: ['Panel', 'Use case', 'Shortcut'],
          rows: [
            ['Elements', 'Inspect / edit DOM and CSS in real time', 'Ctrl+Shift+C'],
            ['Console', 'Run JS, view logs, inspect objects', 'Ctrl+Shift+J'],
            ['Sources', 'View source, set breakpoints, debug JS', 'Ctrl+Shift+I'],
            ['Network', 'Capture requests, analyze headers / timing', 'Ctrl+Shift+I → Network'],
            ['Performance', 'Record runtime, analyze flame chart, find long tasks', 'Ctrl+Shift+I → Performance'],
            ['Memory', 'Heap snapshots, allocation profiling', 'Ctrl+Shift+I → Memory'],
            ['Application', 'Storage, Cookies, Service Workers, PWA', 'Ctrl+Shift+I → Application'],
            ['Lighthouse', 'SEO / accessibility / performance scoring', 'Ctrl+Shift+I → Lighthouse'],
          ],
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'tip',
          title: 'Quick shortcuts',
          text: 'F12 or Ctrl+Shift+I toggles DevTools; Ctrl+Shift+C enters element-pick mode; Esc opens a drawer at the bottom (Console, Sensors, Changes, etc.); Ctrl+P quick-opens files in Sources.',
        },
      ],
    },

    // ========================================================================
    // KP 2: Elements Panel (DOM/CSS Debugging)
    // ========================================================================
    {
      order: 2,
      title: 'Elements Panel (DOM/CSS Debugging)',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Elements lets you inspect and edit the DOM and CSS in real time. Combined with the device toolbar and pseudo-state toggling it covers most layout debugging needs.',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['Use case', 'Tip'],
            rows: [
              { feature: 'DOM tree', values: ['Inspect / edit / delete nodes', 'Right-click → "Scroll into view"'] },
              { feature: 'Styles pane', values: ['Edit CSS rules live', 'Click property to enable/disable'] },
              { feature: 'Computed', values: ['View final computed values', 'Click to jump to source rule'] },
              { feature: 'Layout', values: ['Grid / Flex visualizer', 'Color overlays for gaps/areas'] },
              { feature: 'Event Listeners', values: ['View bound listeners', 'Uncheck framework listeners'] },
              { feature: 'DOM Breakpoints', values: ['Break on subtree change', 'Right-click → "Break on"'] },
              { feature: 'Device toolbar', values: ['Mobile viewport / DPR / network', 'Ctrl+Shift+M'] },
              { feature: 'Pseudo-states', values: [':hover / :active / :focus', 'Toggle via :hov button'] },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: 'Common DevTools snippets',
          code: `// $0 — currently selected element in Elements
$0.style.border = '2px solid red'
$0.dataset.debug = 'true'

// $(selector) — alias for document.querySelector
$('.btn').click()

// $$ (selector) — alias for document.querySelectorAll
$$('li').forEach(li => console.log(li.textContent))

// inspect(element) — jump to Elements panel
inspect(document.body)

// copy(object) — copy to clipboard
copy($0.outerHTML)

// monitorEvents / unmonitorEvents
monitorEvents(window, 'resize')
unmonitorEvents(window)

// getEventListeners(element) — Chrome only, shows bound listeners
getEventListeners(document.querySelector('#btn'))`,
        },
        {
          id: 'p2-4',
          type: 'callout',
          variant: 'warning',
          title: 'Changes do not persist',
          text: 'Edits in Elements are in-memory only — they vanish on refresh. Use "Local Overrides" (Sources → Overrides) to persist CSS/JS edits across reloads, or copy the change back to your source files.',
        },
      ],
    },

    // ========================================================================
    // KP 3: Console Panel (Log Debugging)
    // ========================================================================
    {
      order: 3,
      title: 'Console Panel (Log Debugging)',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Console is the most-used debugging surface. Beyond console.log it provides leveled logging, grouping, tables, timers, and trace output. Knowing the full API makes debugging far more efficient.',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'API',
            columns: ['Use case', 'Example'],
            rows: [
              { feature: 'log / info / warn / error', values: ['Leveled logs', 'console.error("fail")'] },
              { feature: 'table', values: ['Render arrays/objects as tables', 'console.table(users)'] },
              { feature: 'group / groupEnd', values: ['Nested grouping', 'console.group("req") ... console.groupEnd()'] },
              { feature: 'dir', values: ['Object tree view', 'console.dir(element)'] },
              { feature: 'time / timeEnd', values: ['Measure duration', 'console.time("x"); ... console.timeEnd("x")'] },
              { feature: 'count / countReset', values: ['Count executions', 'console.count("hit")'] },
              { feature: 'trace', values: ['Print call stack', 'console.trace()'] },
              { feature: 'assert', values: ['Log only when condition is false', 'console.assert(x > 0, "x<=0")'] },
              { feature: '%c format', values: ['Apply CSS styles', 'console.log("%cHi", "color:red;font-size:24px")'] },
            ],
          },
        },
        {
          id: 'p3-3',
          type: 'code',
          language: 'javascript',
          filename: 'Console techniques',
          code: `// Leveled logging
console.log('info')
console.warn('warning')
console.error('error')   // includes stack trace
console.info('info')

// Grouping
console.group('User actions')
console.log('click')
console.log('input')
console.groupEnd()

// Table
const users = [{ name: 'Alice', age: 28 }, { name: 'Bob', age: 32 }]
console.table(users)
console.table(users, ['name'])  // show only the name column

// Timing
console.time('loop')
for (let i = 0; i < 1e6; i++) {}
console.timeEnd('loop')  // loop: 3.2ms

// Counting
function process(item) {
  console.count('process called')
}
process(); process()  // process called: 1 / 2

// Stack trace
function a() { b() }
function b() { console.trace() }
a()

// Assertion — only logs when false
console.assert(state, 'state should be truthy')

// Styled output
console.log('%cSUCCESS%c done', 'color:green;font-weight:bold', 'color:inherit')

// Filtering: in DevTools Console filter by level/text/regex
// "Hide network" / "Preserve log" / "Selected context only"`,
        },
        {
          id: 'p3-4',
          type: 'callout',
          variant: 'tip',
          title: 'Clean up before production',
          text: 'Use a build-time plugin (e.g. babel-plugin-transform-remove-console, vite-plugin-remove-console) to strip console.* in production. Keep error reporting (Sentry) — strip only log/debug/info, keep warn/error.',
        },
      ],
    },

    // ========================================================================
    // KP 4: Sources Panel (Breakpoint Debugging)
    // ========================================================================
    {
      order: 4,
      title: 'Sources Panel (Breakpoint Debugging)',
      difficulty: 3,
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Sources is the core of JS debugging. Set breakpoints, step through code, inspect scope and the call stack. Combined with Watch and the Debug toolbar you can pause anywhere and inspect program state.',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            title: 'Breakpoint debugging walkthrough',
            initialCode: `async function fetchUser(id) {
  const res = await fetch(\`/api/user/\${id}\`)
  const data = await res.json()
  renderUser(data)
}

fetchUser(1)`,
            steps: [
              { title: 'Set a breakpoint', description: 'Click the line number in Sources → the line gets a blue marker. Code pauses when execution reaches it.', highlightLines: [1] },
              { title: 'Trigger the code', description: 'Refresh the page or click the button; execution pauses at the breakpoint.', highlightLines: [1], output: 'Paused at fetchUser' },
              { title: 'Inspect Scope', description: 'The Scope panel shows local / closure / global variables; here id=1 is visible.', highlightLines: [1] },
              { title: 'Inspect Call Stack', description: 'The Call Stack panel shows the call chain from the entry point to the current frame; click a frame to switch context.', highlightLines: [1] },
              { title: 'Step over', description: 'F10 — execute the next line without entering functions. Good for skipping library internals.', highlightLines: [2] },
              { title: 'Step into', description: 'F11 — enter the called function. Useful for digging into custom functions.', highlightLines: [2] },
              { title: 'Step out', description: 'Shift+F11 — run until the current function returns.', highlightLines: [2] },
              { title: 'Resume', description: 'F8 — continue until the next breakpoint.', highlightLines: [2] },
              { title: 'Watch expression', description: 'Add expressions in the Watch panel to track values live (e.g. data?.name).', highlightLines: [3] },
              { title: 'Continue to here', description: 'Right-click a line → "Continue to here" to run until that line.', highlightLines: [3] },
            ],
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'javascript',
          filename: 'debugger statement',
          code: `// The "debugger" statement is an in-code breakpoint
function calc(a, b) {
  debugger  // auto-pauses when DevTools is open
  return a + b
}

// Useful for conditional pause in code
function process(items) {
  items.forEach((item, i) => {
    if (item.invalid) debugger  // pause only on invalid items
    handle(item)
  })
}

// In async code
async function load() {
  const res = await fetch('/api')
  debugger  // inspect res before parsing
  return res.json()
}

// Note: never ship "debugger" to production — strip it with the build.`,
        },
      ],
    },

    // ========================================================================
    // KP 5: Conditional / Logpoints
    // ========================================================================
    {
      order: 5,
      title: 'Conditional Breakpoints / Logpoints',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Plain breakpoints pause every time — inefficient for hot code. Conditional breakpoints pause only when an expression is true; logpoints log without pausing. These two are essential for debugging loops, frequent events, and production code.',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: 'Breakpoint types',
            items: [
              {
                title: 'Conditional Breakpoint',
                content: 'Right-click a line number → "Add conditional breakpoint". Enter a JS expression — execution pauses only when it evaluates truthy. Uses: pause only when item.id === 5; pause only on the 100th loop iteration; pause only on error data.',
              },
              {
                title: 'Logpoint',
                content: 'Right-click → "Add logpoint". Enter a JS expression — its value is logged to Console when the line is hit, without pausing. Use cases: log inside a library or production code without modifying source; log the loop index or current state; replace console.log with logpoints to avoid redeploying.',
              },
              {
                title: 'Conditional + log combination',
                content: 'A logpoint supports conditionals: `i % 100 === 0 ? "hit" : undefined`. Output only when the condition is truthy. Combined with grouping you can trace hot paths without polluting logs.',
              },
              {
                title: 'Edit / disable breakpoints',
                content: 'Right-click an existing breakpoint to edit or disable it. Disabled breakpoints remain in place but do not pause — useful for toggling during a long debug session. The Breakpoints panel lists all breakpoints for bulk enable/disable.',
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'callout',
          variant: 'tip',
          title: 'Why logpoints matter',
          text: 'console.log requires editing source + rebuild + redeploy; logpoints let you inject logging at runtime without touching code — invaluable for debugging production environments.',
        },
      ],
    },

    // ========================================================================
    // KP 6: DOM Breakpoints / XHR Breakpoints
    // ========================================================================
    {
      order: 6,
      title: 'DOM Breakpoints / XHR Breakpoints',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Beyond code breakpoints DevTools provides DOM breakpoints (pause on subtree / attribute changes) and XHR breakpoints (pause when a request URL matches a substring). Essential for tracing "who mutated this DOM" and "who fired this request".',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            title: 'XHR breakpoint walkthrough (find the caller of an API)',
            initialCode: `// Somewhere triggers fetch('/api/user/1')
const res = await fetch('/api/user/1')
const data = await res.json()
renderUser(data)`,
            steps: [
              { title: 'Add an XHR breakpoint', description: 'Sources → XHR Breakpoints → add "/api/user". When a request URL contains this substring, execution pauses.', highlightLines: [1] },
              { title: 'Request triggers the pause', description: 'When fetch reaches send(), the breakpoint fires and the Call Stack shows the caller chain.', highlightLines: [1], output: 'Paused at send() in fetch' },
              { title: 'Inspect request params', description: 'View arguments in the Scope panel to confirm id=1 is passed correctly. Step over to skip Promise internals.', highlightLines: [1, 2] },
              { title: 'Response arrives', description: 'After the request returns, the .then callback queues as a microtask — set a breakpoint on the then line to inspect res.', highlightLines: [2, 3] },
              { title: 'Process data', description: 'Once data is parsed, check the actual structure against your expectation.', highlightLines: [4, 5], output: 'User data: {id:1, name:"..."}' },
              { title: 'Render call', description: 'renderUser(data) runs — if the page doesn\'t render correctly, set a breakpoint here to investigate.', highlightLines: [5] },
            ],
          },
        },
        {
          id: 'p6-3',
          type: 'code',
          language: 'javascript',
          filename: 'DOM breakpoint types',
          code: `// DOM breakpoints — set in Elements via right-click → "Break on"
// 1. subtree modifications — pause when childList changes (appendChild, removeChild, innerHTML=)
// 2. attribute modifications — pause when setAttribute/classList changes attributes
// 3. node removal — pause when this node is removed from the DOM

// XHR breakpoints — set in Sources → XHR/fetch Breakpoints
// 1. Add a URL substring like "/api/user"
// 2. Any fetch/XHR whose URL contains the substring will pause at send()

// Event-listener breakpoints — Sources → Event Listener Breakpoints
// Pause when any listener for a chosen event fires:
//   - click / mousemove / input / change
//   - DOMContentLoaded / load / hashchange
//   - XHR / fetch / WebSocket
//   - animation / timer (setTimeout / setInterval)

// Exception breakpoints
//   - Pause on caught exceptions
//   - Pause on uncaught exceptions
// Useful for finding "where did this error actually come from"`,
        },
      ],
    },

    // ========================================================================
    // KP 7: Network Panel (Capture)
    // ========================================================================
    {
      order: 7,
      title: 'Network Panel (Capture)',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Network captures all requests: URL, method, status, headers, body, timing, size, waterfall. Indispensable for debugging interfaces, slow loading, and caching.',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['Use case', 'Tip'],
            rows: [
              { feature: 'Filter', values: ['Filter by type / status / URL', 'Type "method:POST status-code:>=400"'] },
              { feature: 'Preserve log', values: ['Keep across navigation', 'Always check during multi-page debugging'] },
              { feature: 'Disable cache', values: ['Force re-download', 'Always on during development'] },
              { feature: 'Throttling', values: ['Simulate slow network', 'Slow 3G for performance tests'] },
              { feature: 'Headers', values: ['Inspect request/response headers', 'Verify auth, content-type, cookies'] },
              { feature: 'Payload', values: ['Inspect request body', 'Verify form-data / JSON'] },
              { feature: 'Preview / Response', values: ['Inspect response body', 'Preview renders JSON/images nicely'] },
              { feature: 'Timing', values: ['Waterfall of each phase', 'Queue / DNS / TCP / TLS / TTFB / download'] },
              { feature: 'Right-click → Copy', values: ['Copy as fetch / cURL / PowerShell', 'Reproduce outside the browser'] },
              { feature: 'Replay request', values: ['Edit and re-send', 'XHR Replay extension / Edge built-in'] },
            ],
          },
        },
        {
          id: 'p7-3',
          type: 'callout',
          variant: 'info',
          title: 'What each Timing phase means',
          text: 'Queue — waiting in the browser\'s request queue (high value usually means too many concurrent requests). DNS lookup — domain resolution. Initial connection — TCP handshake. SSL — TLS negotiation. Waiting (TTFB) — Time To First Byte, the time from request sent to first byte received; high values point to slow server. Content download — transfer time. A long waterfall phase pinpoints the bottleneck.',
        },
      ],
    },

    // ========================================================================
    // KP 8: API Mocking & Interception
    // ========================================================================
    {
      order: 8,
      title: 'API Mocking & Interception',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'When the backend isn\'t ready or you need to test edge cases (timeouts, errors), you can intercept and mock requests. Common approaches: DevTools Local Overrides, MSW, fetch/XHR wrapping, Charles/Whistle proxies.',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Approach',
            columns: ['Layer', 'Pros', 'Cons'],
            rows: [
              { feature: 'DevTools Overrides', values: ['Browser', 'Zero code; built-in', 'Manual setup per URL; limited logic'] },
              { feature: 'MSW (Mock Service Worker)', values: ['Service Worker', 'Same API for tests/dev; intercepts fetch', 'Extra setup; needs worker file'] },
              { feature: 'fetch/XHR wrap', values: ['JS', 'Full control; custom logic', 'Invasive; affects all requests'] },
              { feature: 'Charles / Whistle / Fiddler', values: ['Proxy', 'Cross-browser; powerful', 'Requires install / setup'] },
              { feature: 'Node middleware (Express/Next.js dev)', values: ['Server', 'Real backend logic', 'Server-side only'] },
              { feature: 'Vite proxy + mock plugin', values: ['Build', 'Hot-reload; framework-aware', 'Tied to one stack'] },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'javascript',
          filename: 'MSW example',
          code: `// install: pnpm add -D msw
// npx msw init public/ --save  # generates mockServiceWorker.js

import { setupWorker, http, HttpResponse, delay } from 'msw'

const handlers = [
  http.get('/api/user/:id', async ({ params }) => {
    await delay(200)  // simulate network latency
    return HttpResponse.json({ id: params.id, name: 'Alice' })
  }),
  http.post('/api/login', async ({ request }) => {
    const body = await request.json()
    if (body.password === 'wrong') {
      return HttpResponse.json({ error: 'invalid' }, { status: 401 })
    }
    return HttpResponse.json({ token: 'xxx' })
  }),
]

const worker = setupWorker(...handlers)
await worker.start({
  onUnhandledRequest: 'bypass',  // or 'warn'/'error'
})

// Activate only in dev
if (import.meta.env.DEV) {
  worker.start()
}`,
        },
        {
          id: 'p8-4',
          type: 'callout',
          variant: 'tip',
          title: 'Why MSW is recommended',
          text: 'MSW intercepts at the Service Worker layer — your app code calls real fetch unchanged, so the same handlers can be reused in tests (Jest/Vitest/Playwright). One source of truth, both dev and test. Compare with monkey-patching fetch which leaks into production code and is hard to share.',
        },
      ],
    },

    // ========================================================================
    // KP 9: Performance Panel
    // ========================================================================
    {
      order: 9,
      title: 'Performance Panel',
      difficulty: 4,
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: 'The Performance panel records runtime behavior — JS execution, layout, paint, composite — visualized as a flame chart and timeline. It is the primary tool for analyzing "why is the page slow / janky".',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Task',
            columns: ['Duration (ms)', 'Category', 'Color in flame chart'],
            rows: [
              { feature: 'Task (long) ⚠', values: ['120', 'script', 'Yellow — JS execution'] },
              { feature: 'parseHTML', values: ['15', 'parse', 'Yellow — HTML parsing'] },
              { feature: 'evaluateScript', values: ['85', 'script', 'Yellow — JS execution'] },
              { feature: 'layout', values: ['35', 'layout', 'Purple — reflow'] },
              { feature: 'recalculateStyle', values: ['8', 'style', 'Purple — style recalc'] },
              { feature: 'paint', values: ['12', 'paint', 'Green — paint'] },
              { feature: 'compositeLayers', values: ['5', 'paint', 'Green — composite'] },
            ],
            highlightColumn: 0,
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'javascript',
          filename: 'Performance API in code',
          code: `// Measure a function
performance.mark('start')
expensiveCall()
performance.mark('end')
performance.measure('expensive', 'start', 'end')
console.log(performance.getEntriesByName('expensive'))

// LongTask API
new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Long task:', entry.duration, 'ms')
  })
}).observe({ entryTypes: ['longtask'] })

// User timing
performance.mark('render-start')
render()
performance.mark('render-end')
performance.measure('render', 'render-start', 'render-end')

// Built-in metrics
// - navigation: TTFB, DOMContentLoaded, load
// - paint: first-paint, first-contentful-paint
// - LCP / CLS / INP via PerformanceObserver
new PerformanceObserver((l) => {
  const entries = l.getEntries()
  const lcp = entries[entries.length - 1]
  console.log('LCP:', lcp.startTime)
}).observe({ type: 'largest-contentful-paint', buffered: true })`,
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'The harm of long tasks',
          text: 'A 60Hz frame budget is 16.67ms. A "long task" exceeding 50ms blocks the main thread and causes input lag / dropped frames. The Performance panel highlights them with a red triangle. Common causes: large JSON.parse, synchronous layout reads in a loop, heavy synchronous rendering, large regex backtracking. Fix: chunk the work, use Web Workers, defer with rAF/requestIdleCallback.',
        },
      ],
    },

    // ========================================================================
    // KP 10: Memory Panel
    // ========================================================================
    {
      order: 10,
      title: 'Memory Panel',
      difficulty: 4,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'The Memory panel diagnoses memory leaks and high memory usage via Heap Snapshots, Allocation Timeline, and Allocation Sampling. Compare two snapshots to find what was retained.',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Profile type',
            columns: ['Use case', 'Tip'],
            rows: [
              { feature: 'Heap snapshot', values: ['Capture current heap state', 'Take 2 snapshots and Diff'] },
              { feature: 'Allocation timeline', values: ['Track allocations over time', 'Spot bursts of allocation'] },
              { feature: 'Allocation sampling', values: ['Sampling of allocation calls', 'Lighter-weight; for long runs'] },
              { feature: 'Retainers panel', values: ['See the reference chain', 'Find why an object is not GC\'d'] },
            ],
          },
        },
        {
          id: 'p10-3',
          type: 'code',
          language: 'javascript',
          filename: 'Common leak patterns',
          code: `// 1. Forgotten listeners — added but never removed
function setup() {
  window.addEventListener('resize', onResize)  // never removed
}
function onResize() { /* ... */ }

// 2. Forgotten timers
setInterval(() => {
  this.data.push(Date.now())  // grows forever
}, 1000)

// 3. Closures holding large objects
function createHandler() {
  const big = new Array(1e6).fill(0)
  return () => console.log(big.length)  // big is retained
}

// 4. Detached DOM nodes
let detached
function detach() {
  detached = document.createElement('div')
  detached.textContent = 'hidden'
  // not appended — but the reference keeps it alive
}

// 5. Global caches without bounds
const cache = {}
function get(key) {
  if (!cache[key]) cache[key] = fetch(key).then(r => r.json())
  return cache[key]
}

// Fix patterns
// - removeEventListener / clearInterval on unmount
// - Use WeakMap/WeakSet for DOM-keyed caches
// - Use WeakRef for caches that can be GC'd under pressure
// - Limit cache size with an LRU policy

// Use WeakMap to avoid DOM-node leaks
const data = new WeakMap()  // key must be an object
const el = document.querySelector('#btn')
data.set(el, { count: 0 })  // when el is removed from DOM, this entry is GC'd`,
        },
        {
          id: 'p10-4',
          type: 'callout',
          variant: 'tip',
          title: 'WeakMap/WeakSet prevents leaks',
          text: 'When you need to attach metadata to DOM nodes or third-party objects, use WeakMap/WeakSet — when the key (the DOM node / object) is GC\'d, the entry is automatically removed, avoiding memory leaks.',
        },
      ],
    },

    // ========================================================================
    // KP 11: Application Panel
    // ========================================================================
    {
      order: 11,
      title: 'Application Panel (Storage / Cache)',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'The Application panel centralizes all client-side storage and PWA resources: localStorage, sessionStorage, IndexedDB, Cookies, Cache Storage, Service Workers, and the manifest. Use it to inspect and clear storage during development.',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Tab',
            columns: ['What you can do', 'Common use'],
            rows: [
              { feature: 'Manifest', values: ['View the PWA manifest', 'Check icons / start_url / display'] },
              { feature: 'Service Workers', values: ['Register / unregister / update', 'Toggle offline; inspect SW'] },
              { feature: 'Storage', values: ['localStorage / sessionStorage / IndexedDB', 'Clear all + estimate quota'] },
              { feature: 'Cache Storage', values: ['Inspect Cache API entries', 'Verify precached assets'] },
              { feature: 'Cookies', values: ['Inspect / edit / delete cookies', 'Verify auth / SameSite / HttpOnly'] },
              { feature: 'Background Services', values: ['Background Sync / Push / Notifications', 'Debug event logs'] },
              { feature: 'Frames / Storage', values: ['Inspect iframes & their isolated storage', 'Cross-origin debugging'] },
            ],
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'javascript',
          filename: 'Storage inspection snippets',
          code: `// Inspect localStorage
Object.keys(localStorage).forEach(k => console.log(k, '=', localStorage[k]))

// Inspect IndexedDB
const req = indexedDB.open('mydb')
req.onsuccess = (e) => {
  const db = e.target.result
  Array.from(db.objectStoreNames).forEach(name => {
    const tx = db.transaction(name, 'readonly')
    tx.objectStore(name).getAll().onsuccess = (e) => {
      console.log(name, e.target.result)
    }
  })
}

// Inspect cookies
console.log(document.cookie)
// Note: HttpOnly cookies are invisible to JS — check Application → Cookies

// Inspect Service Workers
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(r => r.unregister())
})

// Clear all storage
caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
indexedDB.databases?.().then(dbs => dbs.forEach(db => indexedDB.deleteDatabase(db.name)))
localStorage.clear()
sessionStorage.clear()

// Storage estimate
navigator.storage.estimate().then(({ usage, quota }) => {
  console.log(\`\${(usage/1024/1024).toFixed(1)} MB / \${(quota/1024/1024).toFixed(0)} MB\`)
})`,
        },
      ],
    },

    // ========================================================================
    // KP 12: Lighthouse & Web Vitals
    // ========================================================================
    {
      order: 12,
      title: 'Lighthouse & Web Vitals',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: 'Lighthouse audits performance, accessibility, best practices, and SEO. Web Vitals distill user experience into 3 metrics (LCP, INP, CLS) — the modern standards for "good vs bad" page experience.',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Metric',
            columns: ['Meaning', 'Good threshold', 'How to optimize'],
            rows: [
              { feature: 'LCP', values: ['Largest Contentful Paint', '< 2.5s', 'Optimize hero image / font; reduce server TTFB'] },
              { feature: 'INP', values: ['Interaction to Next Paint', '< 200ms', 'Break long tasks; avoid main-thread blocking'] },
              { feature: 'CLS', values: ['Cumulative Layout Shift', '< 0.1', 'Reserve image dimensions; avoid dynamic inserts'] },
              { feature: 'FCP', values: ['First Contentful Paint', '< 1.8s', 'Inline critical CSS; reduce render-blocking JS'] },
              { feature: 'TTFB', values: ['Time To First Byte', '< 800ms', 'Use CDN; cache at edge; reduce server work'] },
              { feature: 'TBT', values: ['Total Blocking Time', '< 200ms', 'Same as INP — break long tasks'] },
              { feature: 'Speed Index', values: ['Visual completion speed', '< 3.4s', 'Prioritize above-the-fold content'] },
            ],
            highlightColumn: 0,
          },
        },
        {
          id: 'p12-3',
          type: 'code',
          language: 'javascript',
          filename: 'Web Vitals measurement',
          code: `// Use the web-vitals library (Google official)
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'

onLCP(console.log)
onINP(console.log)
onCLS(console.log)
onFCP(console.log)
onTTFB(console.log)

// Or capture and report
import { onLCP, onINP, onCLS } from 'web-vitals'

const vitals = {}
onLCP(m => vitals.lcp = m.value)
onINP(m => vitals.inp = m.value)
onCLS(m => vitals.cls = m.value)

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // Report to backend — the standard reporting window
    navigator.sendBeacon('/api/vitals', JSON.stringify(vitals))
  }
})

// INP replaced FID in March 2024
// FID measured only the first input; INP measures the worst interaction across the session
// - Better reflects real UX
// - More sensitive to long tasks anywhere in the session`,
        },
        {
          id: 'p12-4',
          type: 'callout',
          variant: 'info',
          title: 'INP replaces FID',
          text: 'In March 2024 INP (Interaction to Next Paint) officially replaced FID (First Input Delay) as a Core Web Vital. FID only measured the delay of the first input; INP measures the worst interaction across the whole session, reflecting real UX. Optimize by breaking long tasks, using rAF/rIC, and Web Workers.',
        },
      ],
    },

    // ========================================================================
    // KP 13: SourceMap — Principle & Locating
    // ========================================================================
    {
      order: 13,
      title: 'SourceMap — Principle & Locating',
      difficulty: 3,
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'After bundling and minification, the JS in production is unreadable. SourceMap maps the minified code back to the original source so DevTools and error trackers can point at the real file and line. Understanding its principle is key to debugging production issues.',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            title: 'SourceMap workflow (from minified error to original line)',
            initialCode: `// app.min.js (production)
function a(){throw new Error("boom")}a();
//# sourceMappingURL=app.min.js.map`,
            steps: [
              { title: 'Minified code error', description: 'Production throws an error at app.min.js:1:30. Without a map the location is useless.', highlightLines: [1], output: 'Error at app.min.js:1:30' },
              { title: 'Locate sourceMappingURL', description: 'The last line of the minified file references the .map file. DevTools auto-fetches it.', highlightLines: [2] },
              { title: 'Parse the map file', description: 'version / sources / sourcesContent / names / mappings (VLQ encoded).', highlightLines: [2] },
              { title: 'Reverse lookup', description: 'Use the mappings to find the original source file + line + column for the error location.', highlightLines: [1], output: 'Original: src/utils.js:42:15' },
              { title: 'Display in DevTools', description: 'DevTools shows the original source; the Sources tree shows "webpack://" entries.', highlightLines: [1] },
              { title: 'Error tracker reports', description: 'Sentry / Bugsnag apply the map server-side so the issue points to the real file/line.', highlightLines: [1], output: 'Report: src/utils.js:42' },
            ],
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'javascript',
          filename: 'SourceMap config',
          code: `// Vite / Rollup — enable sourcemap
export default {
  build: {
    sourcemap: true,           // generate .map files
    // 'inline' — embed the map in the JS (no separate .map)
    // 'hidden' — generate but don't reference from JS (for Sentry)
  },
}

// Webpack
module.exports = {
  devtool: 'source-map',        // separate .map files
  // 'eval-cheap-module-source-map' — fast for dev
  // 'hidden-source-map' — for Sentry, no //# sourceMappingURL
  // false — disable
}

// Typical setups:
// - Dev: 'eval-cheap-module-source-map' (fast rebuild)
// - Staging: 'source-map' (full quality)
// - Production: 'hidden-source-map' (upload to Sentry, don't expose)

// Sentry: upload source maps at build time
import { SentryWebpackPlugin } from '@sentry/webpack-plugin'
plugins: [
  new SentryWebpackPlugin({
    include: 'dist',
    release: process.env.GIT_SHA,
  })
]`,
        },
        {
          id: 'p13-4',
          type: 'callout',
          variant: 'warning',
          title: 'Production safety',
          text: 'Never expose .map files publicly — they leak your source code. Use hidden-source-map and upload to Sentry/Bugsnag; or restrict .map access via server auth. If you must expose them, route them through auth so only your team can fetch. Also strip the //# sourceMappingURL comment when using hidden mode.',
        },
      ],
    },

    // ========================================================================
    // KP 14: Mobile Debugging
    // ========================================================================
    {
      order: 14,
      title: 'Mobile Debugging',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: 'Mobile H5 issues (white screen, layout shift, slow) require debugging on real devices. The main approaches: Chrome remote debug (Android), Safari remote debug (iOS), vConsole / eruda in-page debugging, Charles/Whistle proxies.',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Approach',
            columns: ['How', 'Pros', 'Cons'],
            rows: [
              { feature: 'Chrome remote debug', values: ['USB → chrome://inspect', 'Full DevTools on real device', 'Android + Chrome only'] },
              { feature: 'Safari remote debug', values: ['USB → Mac Safari → Develop menu', 'iOS native debugging', 'macOS only'] },
              { feature: 'vConsole / eruda', values: ['Inject a script tag in-page', 'No USB; works in any browser', 'Limited; can affect layout'] },
              { feature: 'Charles / Whistle', values: ['HTTPS proxy + cert install', 'Capture / mock / replace', 'Requires proxy setup'] },
              { feature: 'BrowserStack / Sauce Labs', values: ['Cloud device farm', 'Cross-device coverage', 'Paid; slower'] },
              { feature: 'iOS Simulator / Android Emulator', values: ['Xcode / Android Studio', 'Easy setup; multiple OS versions', 'Not real hardware'] },
            ],
            highlightColumn: 0,
          },
        },
        {
          id: 'p14-3',
          type: 'code',
          language: 'javascript',
          filename: 'vConsole integration',
          code: `// vConsole — injected only in non-prod / debug mode
import VConsole from 'vconsole'

if (location.search.includes('debug') || import.meta.env.DEV) {
  new VConsole({ theme: 'dark' })
}

// Or load via CDN
// <script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>

// eruda — more powerful than vConsole
import eruda from 'eruda'
if (location.search.includes('debug')) {
  eruda.init()
}

// Conditional injection avoids leaking debugging tools in production:
if (new URLSearchParams(location.search).get('debug') === 'true') {
  import('vconsole').then(({ default: VConsole }) => new VConsole())
}

// Common mobile debugging scenarios:
// 1. White screen — check Console for JS errors; check Network for failed resources
// 2. Layout shift — toggle device toolbar, inspect Elements
// 3. Click not working — check z-index, pointer-events, touch-action
// 4. Slow loading — Network panel: filter by document, check TTFB; check Lighthouse
// 5. 1px border on Retina — check DPR; use transform: scale(0.5)
// 6. Inertia scroll jank — check -webkit-overflow-scrolling: touch`,
        },
      ],
    },

    // ========================================================================
    // KP 15: Debugging Methodology
    // ========================================================================
    {
      order: 15,
      title: 'Debugging Methodology & Troubleshooting Flow',
      difficulty: 3,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: 'A systematic debugging methodology turns "lucky finds" into a reproducible process. The five steps: reproduce → isolate → root cause → fix & verify → retro. Match the tool to the symptom.',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: 'Step 1', title: 'Stable reproduction', description: 'Clarify the trigger: exact steps, data state, environment (browser / network / device). Unreproducible bugs are the hardest. Record reproduction steps, error messages, stack traces.', status: 'done' },
              { time: 'Step 2', title: 'Isolate variables', description: 'Use bisection to narrow the scope: comment out code, switch environments, compare versions. Confirm whether it\'s front/back/network, code/config/environment.', status: 'done' },
              { time: 'Step 3', title: 'Locate root cause', description: 'Console logs, breakpoints, Network capture, Performance analysis. Match tool to symptom: white screen → Console; jank → Performance; bad data → Network.', status: 'active' },
              { time: 'Step 4', title: 'Fix & verify', description: 'Fix the root cause (not the symptom) with the smallest change. Verify: original case passes + no regression in related cases + edge cases covered. Add a test to prevent recurrence.', status: 'active' },
              { time: 'Step 5', title: 'Retro & summary', description: 'Document the cause, fix, and prevention. Common prevention patterns: type checking (TS), unit tests, code review, monitoring alerts.', status: 'pending' },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: 'Rubber duck debugging',
          text: 'Explain the code line by line to a rubber duck (or a colleague). The act of verbalizing often reveals the gap between what you assume and what the code actually does. Many bugs surface during this process before any tool is needed.',
        },
      ],
    },

    // ========================================================================
    // KP 16: Interview Questions
    // ========================================================================
    {
      order: 16,
      title: 'Interview Questions',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          text: 'High-frequency frontend debugging interview topics: DevTools, breakpoint types, performance analysis, memory leaks, mobile debugging. Each is a chance to show structured thinking.',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            title: 'Frontend debugging interview questions',
            items: [
              {
                title: 'Q1: What are $0 and $(selector) in Chrome DevTools?',
                content: '$0 — the most recently selected element in the Elements panel (kept across the last 5 as $0..$4). $(selector) — alias for document.querySelector. $$(selector) — alias for document.querySelectorAll, returns an array. These only exist in the Console, not in your source code.',
              },
              {
                title: 'Q2: Use cases for conditional / log / DOM breakpoints?',
                content: 'Conditional: pause only when an expression is true (e.g. item.id === 5) — use for hot code where you cannot pause every time.\nLogpoint: log a value without pausing — use to inject logging into library/prod code without modifying source.\nDOM breakpoint: pause on subtree/attribute/node-removal changes — use to find "who mutated this DOM".\n\nChoose by symptom: "find specific data" → conditional; "trace hot path" → logpoint; "who changed this DOM" → DOM breakpoint.',
              },
              {
                title: 'Q3: How to find jank cause in the Performance panel?',
                content: '1. Click Record → reproduce the jank → Stop.\n2. Look for red triangles on the Main thread — these are long tasks (>50ms).\n3. Zoom into the long task — the flame chart shows which function took the most time.\n4. Bottom-up panel ranks functions by self time — find the hottest.\n5. Check the Summary pie: Scripting / Rendering / Painting ratio.\n\nCommon causes: large JSON.parse, sync layout in a loop, heavy regex, forced reflow. Fix: chunk with rAF, offload to Web Worker, avoid reading layout in loops.',
              },
              {
                title: 'Q4: How to investigate a memory leak?',
                content: 'Steps:\n1. Open Memory → Heap snapshot.\n2. Take snapshot #1 (e.g. before an action).\n3. Reproduce the leak (e.g. switch routes 10 times).\n4. Take snapshot #2 → click "Comparison" view → sort by delta.\n5. The biggest positive delta reveals the leaked objects.\n6. Open the Retainers panel to find the reference chain that prevents GC.\n\nCommon patterns: unremoved listeners, forgotten timers, detached DOM nodes, closures holding big data, unbounded caches. Fix uniformly in the unmount hook (React useEffect return / Vue onBeforeUnmount).',
              },
              {
                title: 'Q5: How to safely use SourceMap in production?',
                content: '1. Build with hidden-source-map (generates .map but does not reference from JS — //# sourceMappingURL not added).\n2. Upload .map files to an error tracker (Sentry/Bugsnag) via the build plugin.\n3. Do not deploy .map files to public CDN — they leak your source.\n4. If you must serve them, gate access via auth so only your team can fetch.\n5. Sentry applies the map server-side so the issue links to your real file/line.\n\nFallback: ship without maps and accept unreadable stacks — accept it as the cost of source confidentiality.',
              },
              {
                title: 'Q6: What can the Network panel help debug?',
                content: 'Symptoms:\n1. 4xx/5xx — verify URL/method/headers/body.\n2. Slow response — check Timing (TTFB / content download).\n3. CORS — inspect the response headers (Access-Control-Allow-*).\n4. Auth — check Cookie/Authorization header presence.\n5. Caching — check Cache-Control / ETag / If-None-Match.\n6. Compression — check Content-Encoding (gzip/br).\n7. Repeat requests — usually wrong dependency or missing dedup.\n8. Pending forever — usually a hung connection or proxy.\n\nTip: "Copy as cURL" to reproduce outside the browser; "Replay" (XHR Replay) to edit and re-send.',
              },
              {
                title: 'Q7: How to debug mobile H5?',
                content: '1. Android + Chrome: USB → chrome://inspect → Inspect.\n2. iOS + Safari: USB → Settings → Safari → Advanced → Web Inspector → Mac Safari → Develop menu.\n3. No USB / cross-browser: inject vConsole or eruda in-page.\n4. Capture / mock: Charles or Whistle HTTPS proxy + cert install.\n5. Cloud devices: BrowserStack / Sauce Labs for cross-device coverage.\n\nCommon issues: white screen (check Console), layout shift (toggle device toolbar), tap not firing (check z-index / pointer-events / 300ms delay), 1px border (DPR / scale), inertial scroll jank (-webkit-overflow-scrolling).',
              },
              {
                title: 'Q8: Useful but overlooked console methods',
                content: 'console.table(arr) — renders arrays/objects as tables.\nconsole.group/groupEnd — nested grouping.\nconsole.dir(obj) — object tree view (better than log for DOM).\nconsole.time/timeEnd — measure duration.\nconsole.count/countReset — count executions.\nconsole.trace() — print call stack.\nconsole.assert(cond, msg) — log only when cond is false.\nconsole.clear() — clear the console.\n%c format — apply CSS to text.\n\nAlso: copy(obj) — copy to clipboard; inspect(el) — jump to Elements; monitorEvents/unmonitorEvents — listen to events on an element.',
              },
              {
                title: 'Q9: Core Lighthouse metrics?',
                content: 'Core Web Vitals (the big three):\n1. LCP (Largest Contentful Paint) — perceived load speed; < 2.5s.\n2. INP (Interaction to Next Paint) — interaction responsiveness; < 200ms.\n3. CLS (Cumulative Layout Shift) — visual stability; < 0.1.\n\nOther metrics: FCP (< 1.8s), TTFB (< 800ms), TBT (< 200ms), Speed Index (< 3.4s).\n\nLighthouse also scores: Performance / Accessibility / Best Practices / SEO. Each is 0-100; aim for >90 in all four. INP replaced FID in March 2024 as a Core Web Vital.',
              },
              {
                title: 'Q10: How to debug Service Worker / PWA?',
                content: '1. Application → Service Workers — see all registrations, status, scope; toggle "Update on reload" / "Bypass for network".\n2. Click "inspect" on the SW → opens a separate DevTools with its own console / sources.\n3. Application → Cache Storage — inspect precached assets.\n4. Test offline via "Offline" checkbox in Network or Application.\n5. Application → Manifest — verify icons / start_url / display.\n6. Lighthouse → PWA audit.\n\nCommon issues: SW not updating (use skipWaiting + clients.claim), cache bloat (use expiration), precache list wrong, scope mismatch. Use the "Update" / "Unregister" buttons to reset during development.',
              },
              {
                title: 'Q11: How to persist Elements panel style changes?',
                content: 'Edits in Elements are in-memory only and lost on refresh. To persist:\n1. Local Overrides — Sources → Overrides → select a folder; DevTools will save changes to that folder and re-apply on reload.\n2. Manually copy the change back to your source CSS file.\n3. For experimentation: use the Changes panel (drawer) to see a diff of all your edits and copy them out.\n\nNote: Overrides do not work with JS inlined by bundlers — for source code, edit your real files and rely on HMR.',
              },
              {
                title: 'Q12: How to breakpoint async/await code?',
                content: '1. Set a breakpoint on the await line — pauses before the await suspends.\n2. Once the promise resolves, execution resumes on the next line — set a breakpoint there to inspect the result.\n3. Use the "Async" checkbox in Call Stack to see the async call chain (otherwise the stack is truncated at the await).\n4. For "the await never resolves", use Sources → Event Listener Breakpoints → XHR/fetch; or set a conditional breakpoint inside the promise.\n5. The Call Stack panel shows a → icon for async frames — click to follow the chain.\n\nTip: logpoints inside async code log without pausing, perfect for tracing the order of awaits.',
              },
              {
                title: 'Q13 [Comparison]: Conditional breakpoint vs console.log',
                content: 'Conditional breakpoint:\n+ No code change, hot-loaded.\n+ Full inspection via Scope / Call Stack.\n- Limited to DevTools, no production use.\n\nconsole.log:\n+ Persisted across reloads, works in any environment.\n+ Logs to console for later inspection.\n- Requires code change + rebuild + redeploy.\n- Logs the value only, no scope/stack.\n\nChoose: dev-time deep dive → conditional breakpoint; tracing production → logpoints or structured logging.',
              },
              {
                title: 'Q14 [Comparison]: Heap Snapshot vs Allocation Timeline',
                content: 'Heap Snapshot:\n- Captures the current heap at a point in time.\n- Use cases: find leaked objects via Diff of two snapshots; inspect retainers.\n- Best for: confirmed leak, need to identify the leaked object.\n\nAllocation Timeline:\n- Records allocations over time as a bar chart.\n- Use cases: spot bursts of allocation; correlate with user actions.\n- Best for: "memory keeps growing" — see when allocations happen.\n\nWorkflow: Timeline first to find the burst, then Snapshot to identify the object and its retainer.',
              },
              {
                title: 'Q15 [Scenario]: User reports intermittent jank you cannot reproduce locally — how to investigate?',
                content: '1. Gather user info: device, OS, browser version, network, screen size, repro steps, frequency.\n2. Deploy instrumentation: Long Task API + Web Vitals reporting (LCP/INP/CLS) to backend, gated by user ID.\n3. Cross-reference reports with backend logs: any slow API? any error spikes?\n4. Try BrowserStack / Sauce Labs on the same device/OS to reproduce.\n5. Reproduce on a throttled network (Slow 3G) and a low-end device (CPU 4x slowdown in DevTools).\n6. Inspect user-session replays (LogRocket / FullStory) if available.\n7. Roll out a fix behind a flag and watch the metrics improve.\n\nKey: instrumentation matters more than local reproduction — field data reveals real conditions.',
              },
              {
                title: 'Q16 [Scenario]: Production JS error but works locally — how to locate?',
                content: '1. Confirm the error: get the exact message, stack trace, user environment, URL hash.\n2. Check release notes / git diff for the latest deployment — what changed?\n3. Verify SourceMap: are maps uploaded to the error tracker (Sentry)? If yes, the trace already points to your source.\n4. Common causes: environment variables differ (.env), browser polyfills missing, build target mismatch (es2020 vs es2015), tree-shaking removed a side-effectful import, A/B test config differs.\n5. Reproduce locally with the same env: same .env, same browser version.\n6. If still not reproducible: deploy a canary build with extra logging to the affected path.\n\nKey: control variables one by one — environment / dependencies / build target / browser.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 17: Hands-on — Breakpoint Debugging a Closure Leak
    // ========================================================================
    {
      order: 17,
      title: 'Hands-on: Breakpoint Debugging a Closure Leak',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'This hands-on ties together Sources breakpoints, the Scope panel, and the Memory panel to locate a closure-retained leak. You will use conditional breakpoints to pause only on specific data and inspect the closure chain.',
        },
        {
          id: 'p17-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'A closure leak is the most subtle memory issue — the variable looks unused but the closure holds it, so GC never collects it. Mastering this exercise means you can debug any "memory keeps growing" symptom: Heap Snapshot to identify the leaked object → Retainers to find the retainer → Breakpoint to confirm at runtime → fix in the unmount hook.',
        },
        {
          id: 'p17-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Implement leak detection in the skeleton: take two heap snapshots and diff, find what is retained by a closure, and confirm with a conditional breakpoint.',
            initialCode: `// Hands-on: detect a closure leak with breakpoints + heap snapshots
// Scenario: a list keeps growing in memory after unmount

const cache = {}  // module-level cache

function mountList() {
  const big = new Array(1e5).fill(0)  // large per-mount array
  const handler = (e) => console.log(big.length)

  document.querySelector('#btn').addEventListener('click', handler)
  cache.handler = handler  // ⚠ accidental retention
  // BUG: on unmount we forget to remove the listener and clear the cache
}

function unmountList() {
  // TODO: properly tear down — remove the listener and delete cache.handler
  // TODO: document.querySelector('#btn').removeEventListener('click', cache.handler)
  // TODO: delete cache.handler
}

// Debugging flow (run in DevTools, not in code):
// 1. Application → Storage → clear cache (start clean)
// 2. Mount the list once → take Heap Snapshot #1
// 3. Unmount the list → take Heap Snapshot #2
// 4. Compare #2 with #1 → "(closure)" entries grew
// 5. Open the retainers → see handler → see big retained by handler
// 6. Set a conditional breakpoint in unmountList on the missing removeEventListener line
// 7. Confirm the listener was never removed`,
            checks: [
              {
                description: 'remove the listener on unmount',
                pattern: 'removeEventListener',
                hint: 'In unmountList, call document.querySelector("#btn").removeEventListener("click", handler) — pass the SAME function reference, not a new arrow function.',
              },
              {
                description: 'clear the cache reference',
                pattern: 'delete\\s+cache|cache\\.handler\\s*=\\s*null',
                hint: 'Delete the cache.handler reference (delete cache.handler or cache.handler = null) so the closure is no longer externally retained.',
              },
              {
                description: 'use the same function reference for add and remove',
                pattern: 'handler|cache\\.handler',
                hint: 'You must remove the SAME function you added — save the reference (e.g. into cache.handler) and pass it to removeEventListener.',
              },
              {
                description: 'guard against missing handler',
                pattern: 'if\\s*\\(\\s*cache\\.handler|\\?\\.',
                hint: 'Guard against double-unmount: check cache.handler exists before removing (if (cache.handler) { ... }).',
              },
            ],
          },
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: common closure leak patterns',
          text: 'Watch for: 1) a module-level cache or singleton holding component functions; 2) event listeners added inside an effect but not removed; 3) closures capturing large temporary data (a parsed JSON kept alive by a tiny callback); 4) setTimeout/setInterval callbacks holding component refs; 5) WeakRef misuse — deref then reuse holds strong. In production, lint for "removeEventListener on every addEventListener" and use React\'s useEffect cleanup / Vue\'s onBeforeUnmount consistently.',
        },
      ],
    },

    // ========================================================================
    // KP 18: Hands-on — Performance Profiling a Long Task
    // ========================================================================
    {
      order: 18,
      title: 'Hands-on: Performance Profiling a Long Task',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'This hands-on ties the Performance panel, the Bottom-up view, and code-level optimizations to find and fix a long task causing input jank. You will record, identify the hot function, and refactor to break it into frames.',
        },
        {
          id: 'p18-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'A long task (>50ms) blocks the main thread — inputs feel laggy, animations drop frames. Mastering the workflow (record → long task → Bottom-up → fix → re-measure) means you can fix any "laggy" report: not by guessing, but by reading the flame chart. The optimization pattern (chunking with rAF / requestIdleCallback / Web Worker) is the universal cure for main-thread blocking.',
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Refactor the hot function in the skeleton: chunk the work with rAF or requestIdleCallback so each frame stays under 16ms, and verify INP drops.',
            initialCode: `// Hands-on: optimize a long task causing input lag
// Scenario: rendering 50,000 rows synchronously blocks input for 200ms+

function renderRows(data) {
  const container = document.querySelector('#rows')
  // 🔥 Bad: render all rows in one go — blocks the main thread
  container.innerHTML = data
    .map(row => \`<div>\${row.name}</div>\`)
    .join('')
}

// Goal: break the work into chunks so each frame stays under 16ms
function renderRowsChunked(data) {
  const container = document.querySelector('#rows')
  const CHUNK = 500  // rows per frame
  let i = 0

  // TODO: function renderChunk() { ... }
  //   - slice data[i..i+CHUNK], append as DocumentFragment
  //   - i += CHUNK; if i < data.length, requestAnimationFrame(renderChunk)
  // TODO: requestAnimationFrame(renderChunk)

  // Optional: use requestIdleCallback for non-urgent bulk work
  //   - read deadline.timeRemaining() and stop when out of budget
}

// Profiling flow (in DevTools):
// 1. Performance → Record → trigger the slow render → Stop
// 2. Find the red triangle (long task) on the Main thread
// 3. Zoom in → flame chart shows "renderRows" taking ~200ms
// 4. Bottom-up → ranked by self time → confirms map+join is the hot path
// 5. Apply the chunked version → re-record → long task is gone
// 6. Performance → Web Vitals → INP drops from 250ms to <50ms`,
            checks: [
              {
                description: 'Define a renderChunk function',
                pattern: 'function\\s+renderChunk|const\\s+renderChunk',
                hint: 'Define renderChunk() that slices data[i..i+CHUNK] and appends to the container.',
              },
              {
                description: 'Use DocumentFragment for batch append',
                pattern: 'DocumentFragment|createDocumentFragment',
                hint: 'Build a DocumentFragment and appendChild once per chunk — avoid innerHTML with concatenation per row (triggers parse each time).',
              },
              {
                description: 'Schedule the next chunk with rAF',
                pattern: 'requestAnimationFrame',
                hint: 'After appending a chunk, call requestAnimationFrame(renderChunk) to schedule the next batch on the next frame.',
              },
              {
                description: 'Stop when all data is rendered',
                pattern: 'i\\s*<\\s*data\\.length|i\\s*>=\\s*data\\.length',
                hint: 'Increment i by CHUNK and stop scheduling when i >= data.length to terminate the chunked loop.',
              },
              {
                description: 'Optional: use requestIdleCallback',
                pattern: 'requestIdleCallback|timeRemaining',
                hint: 'For non-urgent bulk work use requestIdleCallback and read deadline.timeRemaining() to stop when the idle budget is exhausted.',
              },
            ],
          },
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: when not to chunk',
          text: 'Chunking adds complexity — use it only when the task actually blocks input. For sub-16ms work, plain synchronous code is fine. For CPU-heavy work that can run off the main thread, prefer Web Workers (sorting, parsing, image processing). For list rendering, prefer a virtual list (react-window) over chunking — it solves both first paint and memory. Measure before optimizing; the flame chart is the source of truth, not intuition.',
        },
      ],
    },

    // ========================================================================
    // KP 19: Cheat Sheet
    // ========================================================================
    {
      order: 19,
      title: 'Cheat Sheet',
      difficulty: 1,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: 'A condensed reference of Chrome DevTools panels, breakpoints, performance metrics, and common pitfalls — quickly locate key points when reviewing.',
        },
        {
          id: 'p19-2',
          type: 'table',
          caption: 'Frontend debugging cheat sheet',
          headers: ['Topic', 'Core API / shortcut', 'Key tips'],
          rows: [
            ['DevTools open', 'F12 / Ctrl+Shift+I', 'Ctrl+Shift+C enters element-pick; Esc opens the drawer'],
            ['Elements', 'Right-click → Inspect; $0', 'Edits do not persist — use Local Overrides for persistence'],
            ['Console', 'console.log / table / group / time', 'Use %c for styled output; strip console.* in production'],
            ['Console aliases', '$() / $$() / $0..$4 / copy() / inspect()', 'Only available in the Console, not in your source code'],
            ['Sources', 'Ctrl+P quick open', 'Set breakpoints; F10 over / F11 into / F8 resume'],
            ['debugger', 'debugger;', 'Strips with the build in production; the same as a manual breakpoint'],
            ['Conditional breakpoint', 'Right-click line → "Add conditional breakpoint"', 'Pause only when an expression is truthy'],
            ['Logpoint', 'Right-click line → "Add logpoint"', 'Log without pausing — no code change needed'],
            ['DOM breakpoint', 'Right-click element → "Break on"', 'Pause on subtree / attribute / removal changes'],
            ['XHR breakpoint', 'Sources → XHR/fetch Breakpoints', 'Pause when a URL contains a substring'],
            ['Network', 'Ctrl+Shift+I → Network', 'Always enable "Preserve log" + "Disable cache" during dev'],
            ['Timing', 'Network → Timing tab', 'TTFB high → slow server; Queue high → too many concurrent requests'],
            ['Reproduce outside browser', 'Right-click → Copy as cURL / fetch', 'Edit with curl --data and replay'],
            ['Mocking', 'MSW / Local Overrides / fetch wrap', 'MSW is recommended — share handlers between dev and tests'],
            ['Performance', 'Record → find red triangles → Bottom-up', 'Long task > 50ms; flame chart shows hot functions'],
            ['Performance API', 'performance.mark/measure / PerformanceObserver', 'User timing for custom measurements'],
            ['Memory', 'Heap snapshot → Diff → Retainers', 'Take 2 snapshots around a suspected leak; sort by delta'],
            ['Leak patterns', 'Listener / timer / detached DOM / closure / cache', 'removeEventListener / clearInterval in the unmount hook'],
            ['Application', 'localStorage / Cookies / SW / Cache', 'Clear all + storage estimate for a fresh start'],
            ['Lighthouse', 'Performance / Accessibility / Best Practices / SEO', 'Aim for >90 in all four; INP replaced FID in March 2024'],
            ['Web Vitals', 'LCP < 2.5s / INP < 200ms / CLS < 0.1', 'Report on visibilitychange via sendBeacon'],
            ['SourceMap', 'sourcemap: true / hidden / inline', 'Never expose .map publicly — upload to Sentry'],
            ['Mobile', 'chrome://inspect (Android) / Safari Develop (iOS)', 'vConsole / eruda for no-USB debugging'],
            ['Mobile issues', 'White screen / layout shift / 1px / tap', 'Check Console, device toolbar, DPR, pointer-events'],
            ['Methodology', 'Reproduce → Isolate → Root cause → Fix → Retro', 'Match tool to symptom; rubber duck for self-discovery'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 20: Quiz
    // ========================================================================
    {
      order: 20,
      title: 'Debugging Quiz',
      difficulty: 3,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: '15 questions to check your grasp of Chrome DevTools, breakpoints, performance, and memory. Each has an explanation — review the relevant chapter for any you miss.',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '[Recall] In Chrome DevTools, what is $0?',
                options: ['A global variable for the body', 'The most recently selected element in Elements', 'A jQuery instance', 'An alias for document.querySelectorAll'],
                correctIndex: 1,
                explanation: '$0 is the element most recently selected in the Elements panel; DevTools keeps the last 5 as $0..$4. Only available in the Console.',
              },
              {
                question: '[Recall] Which console method renders an array as a table?',
                options: ['console.log', 'console.dir', 'console.table', 'console.trace'],
                correctIndex: 2,
                explanation: 'console.table(arr) renders arrays/objects as a table; supports a second arg for column selection: console.table(users, ["name"]).',
              },
              {
                question: '[Understanding] A conditional breakpoint pauses when?',
                options: ['Every time the line is hit', 'Only when the expression evaluates truthy', 'Only the first time', 'Never on the first hit'],
                correctIndex: 1,
                explanation: 'Conditional breakpoints pause only when the JS expression you enter evaluates to truthy — perfect for hot code where you cannot pause every iteration.',
              },
              {
                question: '[Understanding] A logpoint differs from a breakpoint because it?',
                options: ['Pauses and logs', 'Logs without pausing', 'Is only available in tests', 'Requires a browser extension'],
                correctIndex: 1,
                explanation: 'Logpoints log the value of a JS expression to Console without pausing — let you inject logging into library/prod code without editing source.',
              },
              {
                question: '[Recall] The shortcut for Sources "Step into" is?',
                options: ['F8', 'F10', 'F11', 'Shift+F11'],
                correctIndex: 2,
                explanation: 'F8 = Resume; F10 = Step over; F11 = Step into; Shift+F11 = Step out. Ctrl+F8 toggles all breakpoints enabled/disabled.',
              },
              {
                question: '[Understanding] Edits in the Elements panel are lost on refresh because?',
                options: ['A bug', 'They are in-memory only', 'The browser caches them', 'DevTools overwrites them'],
                correctIndex: 1,
                explanation: 'Elements edits are in-memory only — they vanish on refresh. Use Local Overrides (Sources → Overrides) to persist CSS/JS across reloads.',
              },
              {
                question: '[Understanding] The fastest way to measure a function in code?',
                options: ['console.log(Date.now())', 'performance.mark + measure', 'setTimeout(fn,0)', 'Date.now() diff'],
                correctIndex: 1,
                explanation: 'performance.mark/measure produces User Timing entries visible in the Performance panel — much more reliable than Date.now() diff and works in production.',
              },
              {
                question: '[Recall] What is a long task?',
                options: ['A task over 50ms', 'A task over 16ms', 'A task over 100ms', 'A task that uses a worker'],
                correctIndex: 0,
                explanation: 'A long task is one that exceeds 50ms on the main thread — the threshold the Performance panel flags with a red triangle and that causes input lag.',
              },
              {
                question: '[Understanding] The 60Hz frame budget is?',
                options: ['8.3ms', '16.67ms', '33.33ms', '50ms'],
                correctIndex: 1,
                explanation: '1000 / 60 = 16.67ms per frame at 60Hz. Staying under this budget keeps animations smooth and interactions responsive.',
              },
              {
                question: '[Application] To find a memory leak you should?',
                options: ['Take one heap snapshot', 'Take two snapshots and diff', 'Use console.log', 'Use the Network panel'],
                correctIndex: 1,
                explanation: 'Two snapshots around the suspected action let you Diff — sort by delta to find what was retained, then open Retainers to see the reference chain.',
              },
              {
                question: '[Comparison] Difference between Heap Snapshot and Allocation Timeline?',
                options: ['Snapshot is realtime', 'Snapshot is point-in-time, Timeline is over time', 'Timeline is for CPU', 'No difference'],
                correctIndex: 1,
                explanation: 'Heap Snapshot captures the heap at a point in time; Allocation Timeline records allocations over time as a bar chart — use Timeline first to find bursts, then Snapshot to identify the object.',
              },
              {
                question: '[Recall] Which Web Vital replaced FID in March 2024?',
                options: ['CLS', 'TBT', 'INP', 'FCP'],
                correctIndex: 2,
                explanation: 'INP (Interaction to Next Paint) replaced FID (First Input Delay) — INP measures the worst interaction across the whole session, reflecting real UX. Good threshold: < 200ms.',
              },
              {
                question: '[Understanding] Good LCP is below?',
                options: ['1.8s', '2.5s', '4s', '800ms'],
                correctIndex: 1,
                explanation: 'LCP (Largest Contentful Paint) good threshold is < 2.5s. Optimize the hero image/font and reduce server TTFB.',
              },
              {
                question: '[Application] For iOS real-device debugging you need?',
                options: ['Android Studio', 'Xcode + macOS Safari', 'Chrome only', 'vConsole'],
                correctIndex: 1,
                explanation: 'iOS requires macOS: USB → iPhone Settings → Safari → Advanced → Web Inspector → Mac Safari → Develop menu → select device. vConsole/eruda are no-USB alternatives.',
              },
              {
                question: '[Scenario] Production JS error but works locally — first step?',
                options: ['Add console.log everywhere', 'Check release notes / git diff', 'Disable sourcemaps', 'Restart the server'],
                correctIndex: 1,
                explanation: 'Compare the latest deployment diff — most prod-only bugs come from env vars, build target, or tree-shaking removing a side-effectful import. Then verify SourceMap is uploaded to the error tracker.',
              },
              {
                question: '[Comprehensive] The debugger statement is equivalent to?',
                options: ['console.log()', 'A manual breakpoint', 'throw new Error()', 'process.exit()'],
                correctIndex: 1,
                explanation: 'The "debugger;" statement pauses execution when DevTools is open — equivalent to clicking a line breakpoint. Strip it in production builds.',
              },
              {
                question: '[Comprehensive] MSW intercepts at which layer?',
                options: ['HTTP server', 'Service Worker', 'fetch monkey-patch', 'Network proxy'],
                correctIndex: 1,
                explanation: 'MSW runs as a Service Worker — your app code calls real fetch unchanged, and the same handlers can be reused in tests. This makes it shareable between dev and test.',
              },
              {
                question: '[Comprehensive] Output?\nconsole.table([{a:1},{a:2}])',
                options: ['A plain log', 'A table with columns (index, a)', 'An error', 'A group'],
                correctIndex: 1,
                explanation: 'console.table renders arrays/objects as a table with columns (index, a) — much more readable than console.log for tabular data.',
              },
              {
                question: '[Understanding] Why must SourceMap .map files NOT be exposed publicly?',
                options: ['They slow the page', 'They leak your source code', 'They break caching', 'No reason'],
                correctIndex: 1,
                explanation: 'SourceMap files contain your original source — exposing them publicly leaks your code. Use hidden-source-map and upload to Sentry; gate access via auth if you must serve them.',
              },
              {
                question: '[Application] A high TTFB points to?',
                options: ['Slow client JS', 'Slow server', 'Large images', 'Bad CSS'],
                correctIndex: 1,
                explanation: 'TTFB (Time To First Byte) measures server response — high values point to slow server / slow CDN / cold cache. Fix with CDN, edge caching, faster server logic.',
              },
            ],
          },
        },
      ],
    },
  ],
}
