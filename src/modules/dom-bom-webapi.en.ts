/**
 * Module 04: DOM / BOM / Web API (English)
 *
 * English translation of src/modules/dom-bom-webapi.ts.
 * - 25 knowledge points (20 chapters + 2 hands-on + 1 interview Q + 1 cheat sheet + 1 quiz)
 * - 23 visualizations (20 chapter demos + 2 sandbox hands-on + 1 accordion)
 */
import type { ModuleMeta } from '../lib/types'

export const domBomWebApiModule: ModuleMeta = {
  number: '04',
  title: 'DOM / BOM / Web API',
  slug: 'dom-bom-webapi',
  stage: 'basics',
  stageLabel: 'Basics · Module 4',
  icon: '04',
  summary: 'DOM node operations, the event system, BOM objects, storage APIs, geometry, file handling, and scheduling.',
  knowledgePointCount: 25,
  visualizationCount: 23,
  points: [
    // ========================================================================
    // KP 1: Module Overview
    // ========================================================================
    {
      order: 1,
      title: 'Module Overview: DOM / BOM / Web API',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'The browser provides JavaScript with three core API sets: DOM to manipulate page structure, BOM to control the browser window, and Web APIs for storage, files, and scheduling. Mastering these three is the foundation of any web application.',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'web', label: 'Web API', group: 'core', weight: 3 },
              { id: 'dom', label: 'DOM', group: 'branch', weight: 2 },
              { id: 'bom', label: 'BOM', group: 'branch', weight: 2 },
              { id: 'storage', label: 'Storage', group: 'branch', weight: 2 },
              { id: 'file', label: 'File', group: 'branch', weight: 2 },
              { id: 'schedule', label: 'Scheduling', group: 'branch', weight: 2 },
              { id: 'event', label: 'Event', group: 'sub', weight: 1 },
              { id: 'geometry', label: 'Geometry', group: 'sub', weight: 1 },
            ],
            edges: [
              { source: 'web', target: 'dom', label: 'document' },
              { source: 'web', target: 'bom', label: 'browser' },
              { source: 'web', target: 'storage', label: 'persistence' },
              { source: 'web', target: 'file', label: 'I/O' },
              { source: 'web', target: 'schedule', label: 'timing' },
              { source: 'dom', target: 'event', label: 'interaction' },
              { source: 'dom', target: 'geometry', label: 'size' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'callout',
          variant: 'tip',
          title: 'Learning path',
          text: 'Start with DOM queries and operations (high frequency) → then the event system (interaction core) → then BOM objects (window control) → finally storage, files, and scheduling (advanced).',
        },
      ],
    },

    // ========================================================================
    // KP 2: DOM Tree Structure
    // ========================================================================
    {
      order: 2,
      title: 'DOM Tree Structure',
      difficulty: 2,
      visualizationType: 'dom-tree-visualizer',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'The DOM (Document Object Model) parses an HTML document into a tree of node objects. Every HTML element, attribute, and text is a node that JS can add, remove, and update.',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'dom-tree-visualizer',
          data: {
            title: 'DOM tree visualizer (click a node to select it; add/remove children)',
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: 'Node types',
          code: `// 12 node types (4 commonly used)
document.querySelector('div').nodeType  // 1  Element node
document.querySelector('div').firstChild.nodeType  // 3  Text node
document.querySelector('input').attributes[0].nodeType  // 2  Attribute node
document.nodeType  // 9  Document node

// Node relationships
const el = document.querySelector('div')
el.parentNode        // parent node
el.childNodes        // all child nodes (incl. text)
el.children          // element-only children
el.firstChild        // first child node
el.lastChild         // last child node
el.previousSibling   // previous sibling
el.nextSibling       // next sibling`,
        },
      ],
    },

    // ========================================================================
    // KP 3: Node Query and Traversal
    // ========================================================================
    {
      order: 3,
      title: 'Node Query and Traversal',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'document provides query APIs like querySelector / getElementById. The returned NodeList/HTMLCollection can be iterated with forEach or for...of.',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Change the selector and observe the results',
            initialCode: `// Classic query APIs compared
const html = \`
  <ul id="list" class="nav">
    <li class="item">A</li>
    <li class="item active">B</li>
    <li class="item">C</li>
  </ul>
\`
document.body.innerHTML = html

// 1. getElementById (fastest; only on document)
const ul = document.getElementById('list')
console.log('ul:', ul.tagName)

// 2. querySelector (CSS selector; returns first match)
const firstItem = document.querySelector('.item')
console.log('first:', firstItem.textContent)

// 3. querySelectorAll (returns a NodeList; forEach available)
const items = document.querySelectorAll('.item')
console.log('count:', items.length)
items.forEach((li, i) => console.log(i, li.textContent))

// 4. getElementsByClassName (returns a live HTMLCollection)
const live = document.getElementsByClassName('item')
console.log('live:', live.length)  // 3
ul.innerHTML += '<li class="item">D</li>'
console.log('live after add:', live.length)  // 4 (auto-updates!)`,
          },
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Feature',
            columns: ['getElementById', 'querySelector', 'querySelectorAll', 'getElementsByClassName'],
            rows: [
              { feature: 'Return type', values: ['Element', 'Element | null', 'NodeList', 'HTMLCollection'] },
              { feature: 'Live?', values: ['-', 'No (static)', 'No (static)', 'Yes (live)'] },
              { feature: 'forEach', values: ['-', 'No', 'Yes', 'No (convert first)'] },
              { feature: 'Selector syntax', values: ['id only', 'CSS selector', 'CSS selector', 'class only'] },
              { feature: 'Performance', values: ['Fastest', 'Fast', 'Fast', 'Fast'] },
            ],
            highlightColumn: 2,
          },
        },
      ],
    },

    // ========================================================================
    // KP 4: Node Add / Remove / Modify
    // ========================================================================
    {
      order: 4,
      title: 'Node Add / Remove / Modify',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'createElement creates nodes; appendChild/insertBefore insert; removeChild/remove delete; replaceChild replaces. Modern APIs also include append/prepend/before/after.',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Try creating, inserting, deleting, and replacing nodes',
            initialCode: `// Create a node
const div = document.createElement('div')
div.textContent = 'Hello DOM'
div.className = 'card'

// Insert
document.body.appendChild(div)  // append to end

// Create and insert multiple
const fragment = document.createDocumentFragment()
for (let i = 0; i < 3; i++) {
  const li = document.createElement('li')
  li.textContent = 'Item ' + (i + 1)
  fragment.appendChild(li)
}
const ul = document.createElement('ul')
ul.appendChild(fragment)
document.body.appendChild(ul)

// Insert at a specific position
const firstLi = ul.firstElementChild
const newLi = document.createElement('li')
newLi.textContent = 'Inserted at front'
ul.insertBefore(newLi, firstLi)

// Modern API (clearer)
const p = document.createElement('p')
p.textContent = 'append accepts multiple args'
document.body.append(p, 'also accepts raw text')

// Remove a node
// old: parent.removeChild(child)
// new: child.remove()
setTimeout(() => {
  const target = ul.children[1]
  if (target) target.remove()
  console.log('Removed the 2nd item')
}, 500)

// Replace a node
setTimeout(() => {
  const old = ul.firstElementChild
  const fresh = document.createElement('li')
  fresh.textContent = 'Replaced item'
  if (old) ul.replaceChild(fresh, old)
}, 1000)`,
          },
        },
        {
          id: 'p4-3',
          type: 'table',
          caption: 'Node operation cheat sheet',
          headers: ['Operation', 'Legacy API', 'Modern API', 'Note'],
          rows: [
            ['Append', 'parent.appendChild(child)', 'parent.append(...nodes)', 'Modern supports multiple args and text'],
            ['Prepend', 'parent.insertBefore(child, first)', 'parent.prepend(...nodes)', 'Modern is cleaner'],
            ['Before/After', 'parent.insertBefore(child, ref)', 'node.before(...) / after(...)', 'Relative to sibling'],
            ['Remove', 'parent.removeChild(child)', 'child.remove()', 'Modern needs no parent reference'],
            ['Replace', 'parent.replaceChild(new, old)', '-', 'No modern equivalent yet'],
            ['Clone', 'node.cloneNode(deep)', '-', 'deep=true for deep clone'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 5: Attributes vs Properties
    // ========================================================================
    {
      order: 5,
      title: 'Attributes vs Properties',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'HTML attributes live on the tag; DOM properties are fields on the JS object. Most of the time they stay in sync, but form properties like value and checked only sync one way.',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Aspect',
            columns: ['attribute', 'property'],
            rows: [
              { feature: 'Location', values: ['In the HTML tag', 'On the DOM object'] },
              { feature: 'Type', values: ['Always string', 'Any type'] },
              { feature: 'Access API', values: ['getAttribute/setAttribute', 'el.prop directly'] },
              { feature: 'Case', values: ['HTML-insensitive', 'JS case-sensitive'] },
              { feature: 'value sync', values: ['Keeps initial value', 'Reflects current value'] },
              { feature: 'href sync', values: ['Keeps relative path', 'Returns absolute path'] },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'javascript',
          filename: 'attribute vs property',
          code: `const input = document.querySelector('input')

// attribute: lives on the HTML tag
input.getAttribute('value')      // "initial"
input.setAttribute('value', 'new')
input.hasAttribute('disabled')   // true
input.removeAttribute('disabled')

// property: field on the DOM object
input.value             // current value in the box
input.defaultValue      // mirrors the value attribute
input.checked           // true/false
input.disabled          // true/false

// Classic trap: value is one-way synced
input.setAttribute('value', 'A')  // change the attribute
input.value                       // "A" (synced to property)
input.value = 'B'                 // change the property
input.value                       // "B"
input.getAttribute('value')       // "A" (NOT synced back!)`,
        },
      ],
    },

    // ========================================================================
    // KP 6: Style Operations
    // ========================================================================
    {
      order: 6,
      title: 'Style Operations',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Three ways to style: modify the style property directly (inline), toggle className, or set CSS variables. getComputedStyle reads the final computed style.',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Compare the three styling approaches',
            initialCode: `const box = document.createElement('div')
box.textContent = 'Style demo'
document.body.appendChild(box)

// 1. Inline style (el.style.xxx)
box.style.width = '200px'
box.style.height = '80px'
box.style.backgroundColor = '#1ed760'  // camelCase!
box.style.borderRadius = '8px'
box.style.display = 'flex'
box.style.alignItems = 'center'
box.style.justifyContent = 'center'

// Set a CSS variable
box.style.setProperty('--accent', '#ff6b35')
box.style.color = 'var(--accent)'

// 2. className / classList
box.className = 'card highlight'
// classList is more flexible
box.classList.add('active')
box.classList.remove('card')
box.classList.toggle('visible')  // add if missing, remove if present
box.classList.contains('active')  // true

// 3. Read computed style
const computed = getComputedStyle(box)
console.log('width:', computed.width)
console.log('bg:', computed.backgroundColor)
console.log('display:', computed.display)`,
          },
        },
        {
          id: 'p6-3',
          type: 'callout',
          variant: 'warning',
          title: 'Performance tip',
          text: 'Frequent style writes trigger reflow and repaint. For batch updates prefer toggling classes via classList, or batch writes inside requestAnimationFrame.',
        },
      ],
    },

    // ========================================================================
    // KP 7: Event Flow — Three Phases
    // ========================================================================
    {
      order: 7,
      title: 'Event Flow — Three Phases',
      difficulty: 3,
      visualizationType: 'event-flow-visualizer',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'The event flow describes how an event travels from trigger to handler: the capturing phase (document down to the target\'s ancestors), the target phase (on the target itself), and the bubbling phase (target up to document).',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'event-flow-visualizer',
          data: {
            title: 'Event flow demo (click an element to see the propagation path)',
          },
        },
        {
          id: 'p7-3',
          type: 'code',
          language: 'javascript',
          filename: 'Event flow',
          code: `// The 3rd arg of addEventListener controls the phase
// useCapture=false (default): fires in bubbling
// useCapture=true: fires in capturing

document.addEventListener('click', (e) => {
  console.log('document capture')
}, true)

outer.addEventListener('click', (e) => {
  console.log('outer capture')
}, true)

inner.addEventListener('click', (e) => {
  console.log('inner target')
})

outer.addEventListener('click', (e) => {
  console.log('outer bubble')
})

document.addEventListener('click', (e) => {
  console.log('document bubble')
})

// Clicking inner logs:
// document capture → outer capture → inner target → outer bubble → document bubble

// Stop bubbling
inner.addEventListener('click', (e) => {
  e.stopPropagation()  // stops both bubbling and capturing
})

// Prevent the default behavior
link.addEventListener('click', (e) => {
  e.preventDefault()
})`,
        },
      ],
    },

    // ========================================================================
    // KP 8: Event Delegation
    // ========================================================================
    {
      order: 8,
      title: 'Event Delegation',
      difficulty: 3,
      visualizationType: 'event-delegation',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Event delegation leverages bubbling: a parent element handles events for all its children. New children need no extra binding — ideal for dynamic lists.',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'event-delegation',
          data: {
            title: 'Event delegation vs per-item binding (compare listener counts)',
            initialCount: 10,
          },
        },
        {
          id: 'p8-3',
          type: 'callout',
          variant: 'tip',
          title: 'When to use event delegation',
          text: 'Good for: many similar children (table rows, list items), dynamically added/removed children. Not for: elements that need to stop bubbling, or fine-grained complex interactions.',
        },
      ],
    },

    // ========================================================================
    // KP 9: Event Object
    // ========================================================================
    {
      order: 9,
      title: 'Event Object',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: 'A handler receives an Event object carrying event info. Different event types have subclasses: MouseEvent, KeyboardEvent, InputEvent, CustomEvent, etc.',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Common property/method',
            columns: ['Description', 'Example'],
            rows: [
              { feature: 'e.target', values: ['Element that triggered the event', 'The clicked button'] },
              { feature: 'e.currentTarget', values: ['Element the listener is bound to', 'The delegating parent'] },
              { feature: 'e.type', values: ['Event type string', "'click' / 'input'"] },
              { feature: 'e.preventDefault()', values: ['Prevent the default behavior', 'Stop a link from navigating'] },
              { feature: 'e.stopPropagation()', values: ['Stop bubbling/capturing', 'Stop parent from responding'] },
              { feature: 'e.clientX/Y', values: ['Mouse coords relative to viewport', 'MouseEvent'] },
              { feature: 'e.key', values: ['Name of the pressed key', "KeyboardEvent: 'Enter'"] },
              { feature: 'e.code', values: ['Physical key code', "KeyboardEvent: 'KeyA'"] },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'javascript',
          filename: 'target vs currentTarget',
          code: `// Classic interview question: target vs currentTarget
ul.addEventListener('click', (e) => {
  console.log('target:', e.target.tagName)        // what the user actually clicked
  console.log('currentTarget:', e.currentTarget.tagName)  // the element bound to the listener
})

// Clicking a <span> inside an <li>:
// target: SPAN (actual click)
// currentTarget: UL (bound listener)

// Custom event
const custom = new CustomEvent('user-login', {
  detail: { userId: 123, name: 'Alice' },
  bubbles: true,
})
element.dispatchEvent(custom)

element.addEventListener('user-login', (e) => {
  console.log('User logged in:', e.detail.name)
})`,
        },
      ],
    },

    // ========================================================================
    // KP 10: The window Object
    // ========================================================================
    {
      order: 10,
      title: 'The window Object',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'window is the core of BOM and represents the browser window. All global variables and built-ins (document, location, navigator, history) are its properties.',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'window object structure',
            layers: [
              {
                name: 'window',
                description: 'Browser window global object',
                components: [
                  { name: 'document', description: 'DOM root' },
                  { name: 'location', description: 'Current URL info' },
                  { name: 'navigator', description: 'Browser info' },
                  { name: 'history', description: 'Session history' },
                  { name: 'screen', description: 'Screen info' },
                ],
              },
              {
                name: 'Window control',
                description: 'Window size and position',
                components: [
                  { name: 'innerWidth/Height', description: 'Viewport size (excl. toolbars)' },
                  { name: 'outerWidth/Height', description: 'Whole browser window size' },
                  { name: 'scrollX/Y', description: 'Scroll position' },
                  { name: 'open/close', description: 'Open / close windows' },
                ],
              },
              {
                name: 'Global APIs',
                description: 'Methods on window',
                components: [
                  { name: 'alert/confirm/prompt', description: 'Dialogs' },
                  { name: 'setTimeout/setInterval', description: 'Timers' },
                  { name: 'requestAnimationFrame', description: 'Animation frame' },
                  { name: 'fetch', description: 'Network requests' },
                ],
              },
            ],
            flowDirection: 'top-down',
          },
        },
        {
          id: 'p10-3',
          type: 'code',
          language: 'javascript',
          filename: 'Common window APIs',
          code: `// Window size
window.innerWidth    // viewport width (excl. toolbars)
window.innerHeight   // viewport height
window.outerWidth    // whole window width
window.outerHeight   // whole window height

// Scrolling
window.scrollX       // horizontal scroll position
window.scrollY       // vertical scroll position
window.scrollTo(0, 500)              // jump to a position
window.scrollTo({ top: 500, behavior: 'smooth' })  // smooth scroll

// Dialogs (blocking — use with care)
window.alert('Notice')
const ok = window.confirm('Confirm?')
const name = window.prompt('Enter your name', 'default')

// Open a new window
const win = window.open('https://example.com', '_blank', 'width=800')
win.close()  // close it

// Global vars are window properties
var foo = 1
window.foo  // 1 (var leaks to window)
let bar = 2
window.bar  // undefined (let/const do not)`,
        },
      ],
    },

    // ========================================================================
    // KP 11: The location Object
    // ========================================================================
    {
      order: 11,
      title: 'The location Object',
      difficulty: 3,
      visualizationType: 'location-parser',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'location provides info about the current document\'s URL and supports navigation and reload. Each property maps to a part of the URL.',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'location-parser',
          data: {
            title: 'URL parser (enter a URL to see each part live)',
            initialUrl: 'https://example.com:8080/path/page?key=value#anchor',
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'javascript',
          filename: 'location API',
          code: `// Reading
location.href        // full URL
location.protocol    // 'https:'
location.host        // 'example.com:8080'
location.hostname    // 'example.com'
location.port        // '8080'
location.pathname    // '/path/page'
location.search      // '?key=value'
location.hash        // '#anchor'
location.origin      // 'https://example.com:8080'

// Navigation
location.href = 'https://example.com'  // adds a history entry
location.replace('https://example.com') // no history entry
location.assign('https://example.com')  // same as href assignment

// Reload
location.reload()         // reload
location.reload(true)     // force reload from server

// Modifying parts triggers navigation
location.hash = '#section'   // hash only, no reload
location.search = '?a=1'     // query change, reloads

// URLSearchParams for query strings
const params = new URLSearchParams(location.search)
params.get('key')           // 'value'
params.set('foo', 'bar')
params.toString()           // 'key=value&foo=bar'`,
        },
      ],
    },

    // ========================================================================
    // KP 12: The history Object
    // ========================================================================
    {
      order: 12,
      title: 'The history Object',
      difficulty: 4,
      visualizationType: 'history-router',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: 'history manages the browser session history — supports back/forward/go. HTML5 added pushState/replaceState so you can change the URL without reloading, the foundation of SPA routing.',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'history-router',
          data: {
            title: 'History router demo (pushState/replaceState/back/forward)',
            routes: ['/', '/about', '/users', '/contact'],
          },
        },
        {
          id: 'p12-3',
          type: 'callout',
          variant: 'info',
          title: 'How SPA routing works',
          text: 'The history mode of React Router / Vue Router builds on pushState + the popstate event: pushState changes the URL without reloading; popstate listens for back/forward.',
        },
      ],
    },

    // ========================================================================
    // KP 13: The navigator Object
    // ========================================================================
    {
      order: 13,
      title: 'The navigator Object',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'navigator exposes browser and device info: userAgent, language, platform, online status, clipboard, geolocation, media devices, and more.',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Common property',
            columns: ['Type', 'Description'],
            rows: [
              { feature: 'userAgent', values: ['string', 'Browser identifier string'] },
              { feature: 'language', values: ['string', 'Preferred language, e.g. "en-US"'] },
              { feature: 'platform', values: ['string', 'Platform, e.g. "Win32"'] },
              { feature: 'onLine', values: ['boolean', 'Whether online'] },
              { feature: 'cookieEnabled', values: ['boolean', 'Whether cookies are enabled'] },
              { feature: 'geolocation', values: ['object', 'Geolocation API'] },
              { feature: 'clipboard', values: ['object', 'Clipboard API'] },
              { feature: 'mediaDevices', values: ['object', 'Camera / microphone'] },
            ],
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'javascript',
          filename: 'Common navigator APIs',
          code: `// Basic info
navigator.userAgent   // browser identifier
navigator.language    // 'en-US'
navigator.platform    // 'Win32'
navigator.onLine      // true/false

// Clipboard
await navigator.clipboard.writeText('copy me')
const text = await navigator.clipboard.readText()

// Geolocation
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.error(err)
)

// Media devices (camera / mic)
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
})

// Battery API (some browsers)
const battery = await navigator.getBattery()
console.log(battery.level)  // 0-1

// Online/offline events
window.addEventListener('online', () => console.log('online'))
window.addEventListener('offline', () => console.log('offline'))`,
        },
      ],
    },

    // ========================================================================
    // KP 14: localStorage / sessionStorage
    // ========================================================================
    {
      order: 14,
      title: 'localStorage / sessionStorage',
      difficulty: 3,
      visualizationType: 'storage-playground',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: 'Web Storage provides key-value storage: localStorage is persistent (only cleared manually), sessionStorage is session-scoped (cleared when the tab closes). Capacity is ~5-10MB; only strings can be stored.',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'storage-playground',
          data: {
            title: 'Storage playground (CRUD + capacity estimation)',
            storageType: 'local',
          },
        },
        {
          id: 'p14-3',
          type: 'code',
          language: 'javascript',
          filename: 'Web Storage API',
          code: `// localStorage (persistent) / sessionStorage (session) — same API
localStorage.setItem('key', 'value')
localStorage.getItem('key')        // 'value'
localStorage.removeItem('key')
localStorage.clear()
localStorage.length                // item count
localStorage.key(0)                // get key by index

// Storing objects requires serialization
const user = { name: 'Alice', age: 28 }
localStorage.setItem('user', JSON.stringify(user))
const loaded = JSON.parse(localStorage.getItem('user'))

// Listen to changes across tabs
window.addEventListener('storage', (e) => {
  console.log('key:', e.key)
  console.log('oldValue:', e.oldValue)
  console.log('newValue:', e.newValue)
  console.log('url:', e.url)
})

// Estimate storage size
function getStorageSize() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += key.length + localStorage[key].length
    }
  }
  return total * 2  // UTF-16 uses 2 bytes per char
}`,
        },
      ],
    },

    // ========================================================================
    // KP 15: Cookies
    // ========================================================================
    {
      order: 15,
      title: 'Cookies',
      difficulty: 4,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Cookies are small pieces of data stored by the browser (~4KB each) and automatically sent with same-origin requests. Used for auth and user preferences. Modern frontends prefer localStorage for non-auth scenarios.',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Aspect',
            columns: ['Cookie', 'localStorage', 'sessionStorage'],
            rows: [
              { feature: 'Capacity', values: ['~4KB each', '~5-10MB', '~5-10MB'] },
              { feature: 'Lifetime', values: ['Expiry settable', 'Permanent', 'Session'] },
              { feature: 'Sent with request', values: ['Yes (auto)', 'No', 'No'] },
              { feature: 'Access API', values: ['document.cookie', 'localStorage.x', 'sessionStorage.x'] },
              { feature: 'Use case', values: ['Auth', 'UI preferences', 'Temporary form'] },
              { feature: 'Cross-tab', values: ['Yes', 'Yes', 'No'] },
            ],
            highlightColumn: 0,
          },
        },
        {
          id: 'p15-3',
          type: 'code',
          language: 'javascript',
          filename: 'Cookie operations',
          code: `// Writing a cookie (string concatenation, verbose)
document.cookie = 'name=Alice; max-age=3600; path=/; Secure; SameSite=Lax'

// Reading cookies (returns all at once, must parse)
const cookies = document.cookie.split('; ').reduce((acc, pair) => {
  const [key, value] = pair.split('=')
  acc[key] = decodeURIComponent(value)
  return acc
}, {})
console.log(cookies.name)  // 'Alice'

// Deleting a cookie (set expiry to the past)
document.cookie = 'name=; max-age=0; path=/'

// Cookie attributes
// - max-age: seconds (IE uses expires)
// - expires: GMT date
// - path: accessible path
// - domain: accessible domain
// - Secure: HTTPS only
// - SameSite: Strict | Lax | None (cross-site policy)
// - HttpOnly: not accessible from JS (anti-XSS; server-set only)`,
        },
      ],
    },

    // ========================================================================
    // KP 16: Geometry APIs
    // ========================================================================
    {
      order: 16,
      title: 'Geometry APIs',
      difficulty: 4,
      visualizationType: 'geometry-calculator',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'DOM provides several size APIs: offsetWidth (incl. border), clientWidth (excl. border), scrollWidth (incl. overflow), getBoundingClientRect (relative to viewport, with decimals).',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'geometry-calculator',
          data: {
            title: 'Geometry calculator (drag the slider to resize the element)',
            initialWidth: 200,
            initialHeight: 100,
          },
        },
        {
          id: 'p16-3',
          type: 'table',
          caption: 'Size API comparison',
          headers: ['API', 'Incl. padding', 'Incl. border', 'Incl. overflow', 'Has decimals', 'Reference'],
          rows: [
            ['offsetWidth', 'Yes', 'Yes', 'No', 'No', '-'],
            ['clientWidth', 'Yes', 'No', 'No', 'No', '-'],
            ['scrollWidth', 'Yes', 'No', 'Yes', 'No', '-'],
            ['getBoundingClientRect().width', 'Yes', 'Yes', 'No', 'Yes', 'Viewport'],
            ['offsetLeft', '-', '-', '-', 'No', 'offsetParent'],
            ['getBoundingClientRect().left', '-', '-', '-', 'Yes', 'Viewport'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 17: Scrolling APIs
    // ========================================================================
    {
      order: 17,
      title: 'Scrolling APIs',
      difficulty: 3,
      visualizationType: 'scroll-animation',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'scrollTo / scrollIntoView control scroll position; the scroll event with requestAnimationFrame gives high-performance scroll listening. The passive option improves scroll smoothness.',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'scroll-animation',
          data: {
            title: 'Scroll animation demo (scrollTo / scrollIntoView / rAF throttle)',
          },
        },
        {
          id: 'p17-3',
          type: 'code',
          language: 'javascript',
          filename: 'Scroll APIs',
          code: `// Scroll to a position
window.scrollTo(0, 500)
window.scrollTo({ top: 500, left: 0, behavior: 'smooth' })

// Scroll an element into view
element.scrollIntoView()
element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

// Scroll inside a container
container.scrollTo(0, 100)
container.scrollBy(0, 50)  // relative to current position

// Listen to scroll (rAF throttled)
let ticking = false
window.addEventListener('scroll', () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    console.log('scrollTop:', window.scrollY)
    ticking = false
  })
}, { passive: true })  // passive boosts performance

// IntersectionObserver (fires when an element enters the viewport)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('In view:', entry.target)
    }
  })
}, { threshold: 0.5 })
observer.observe(element)`,
        },
      ],
    },

    // ========================================================================
    // KP 18: File Handling
    // ========================================================================
    {
      order: 18,
      title: 'File Handling',
      difficulty: 4,
      visualizationType: 'file-upload',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '<input type="file"> yields a File object (extends Blob) after selection. FileReader reads file content asynchronously, supporting readAsDataURL / readAsText / readAsArrayBuffer.',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'file-upload',
          data: {
            title: 'File upload & preview (select or drop a file)',
          },
        },
        {
          id: 'p18-3',
          type: 'code',
          language: 'javascript',
          filename: 'Reading files',
          code: `// <input type="file"> selection
input.addEventListener('change', (e) => {
  const file = e.target.files[0]  // File object
  console.log(file.name)         // file name
  console.log(file.size)         // bytes
  console.log(file.type)         // MIME type
  console.log(file.lastModified) // modification timestamp
})

// Drag-drop upload
dropzone.addEventListener('drop', (e) => {
  e.preventDefault()
  const file = e.dataTransfer.files[0]
  readFile(file)
})

// FileReader
const reader = new FileReader()
reader.onload = (e) => console.log(e.target.result)
reader.onprogress = (e) => console.log(e.loaded / e.total)
reader.onerror = () => console.log(reader.error)

reader.readAsDataURL(file)     // base64 for image preview
reader.readAsText(file)        // text
reader.readAsArrayBuffer(file) // binary

// Modern API: URL.createObjectURL
const url = URL.createObjectURL(file)
img.src = url  // use directly for preview
URL.revokeObjectURL(url)  // release memory`,
        },
      ],
    },

    // ========================================================================
    // KP 19: Blobs and Downloads
    // ========================================================================
    {
      order: 19,
      title: 'Blobs and Downloads',
      difficulty: 4,
      visualizationType: 'blob-download',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: 'A Blob (Binary Large Object) represents binary data. Combined with URL.createObjectURL it generates a temporary URL, and with <a download> you can implement client-side file downloads.',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'blob-download',
          data: {
            title: 'Blob download demo (enter content, generate and download a file)',
            defaultContent: 'name,age,city\nAlice,28,Beijing\nBob,32,Shanghai',
            defaultMime: 'text/csv',
            defaultFilename: 'data',
          },
        },
        {
          id: 'p19-3',
          type: 'code',
          language: 'javascript',
          filename: 'Blob and download',
          code: `// Create a Blob
const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
console.log(blob.size)  // bytes
console.log(blob.type)  // 'text/plain'

// Generate a temporary URL
const url = URL.createObjectURL(blob)
// Release when done
URL.revokeObjectURL(url)

// Trigger a download
function download(content, filename, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

download('Hello', 'hello.txt')
download(JSON.stringify({ a: 1 }), 'data.json', 'application/json')

// Blob → File
const file = new File([blob], 'name.txt', { type: 'text/plain' })

// Blob slicing (for large-file uploads)
const chunk = blob.slice(0, 1024)  // start byte, end byte`,
        },
      ],
    },

    // ========================================================================
    // KP 20: Timers and requestAnimationFrame
    // ========================================================================
    {
      order: 20,
      title: 'Timers and requestAnimationFrame',
      difficulty: 4,
      visualizationType: 'raf-animation',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: 'setTimeout/setInterval are based on the event queue and may lag when the main thread is busy. requestAnimationFrame syncs with the browser refresh rate (typically 60fps) and is the first choice for visual animation.',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'raf-animation',
          data: {
            title: 'rAF vs setInterval smoothness (compare actual frame rate)',
          },
        },
        {
          id: 'p20-3',
          type: 'code',
          language: 'javascript',
          filename: 'Timers and rAF',
          code: `// setTimeout: run once after a delay
const id1 = setTimeout(() => console.log('hi'), 1000)
clearTimeout(id1)  // cancel

// setInterval: repeat
const id2 = setInterval(() => console.log('tick'), 1000)
clearInterval(id2)

// requestAnimationFrame: synced with refresh
let rafId
function animate(timestamp) {
  console.log(timestamp)
  rafId = requestAnimationFrame(animate)
}
rafId = requestAnimationFrame(animate)
cancelAnimationFrame(rafId)  // cancel

// Recursive setTimeout (more precise than setInterval)
function tick() {
  console.log('tick')
  setTimeout(tick, 1000)  // schedule next only after the previous finishes
}
tick()

// FPS calculation
let lastTime = performance.now()
function loop(now) {
  const fps = 1000 / (now - lastTime)
  console.log(fps.toFixed(0) + ' FPS')
  lastTime = now
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)`,
        },
      ],
    },

    // ========================================================================
    // KP 21: Hands-on — Event-Delegation Todo List
    // ========================================================================
    {
      order: 21,
      title: 'Hands-on: Event-Delegation Todo List',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          lead: true,
          text: 'Event delegation is the core engineering practice of the DOM event system. This hands-on ties together the event flow, delegation, event.target, and closest lookup, building a dynamic todo list where a single listener handles clicks on all items.',
        },
        {
          id: 'p21-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'If you bind a listener per item in a dynamic list, you must manually add/removeEventListener on insert/delete — easy to forget and leak. Delegation binds one listener on the parent and uses event.target.closest to locate the actual item; new items work automatically and removed items need no unbinding. This is the standard pattern for large apps (tables, trees, chat lists).',
        },
        {
          id: 'p21-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Implement event delegation in the skeleton below: use one listener on ul to handle done/delete clicks for every li; the task list on the right validates live.',
            initialCode: `// Hands-on: event-delegation todo list
// Goal: manage all "done / delete" actions with a single listener

const list = document.querySelector('#todo-list')
const input = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')

// 1. Bind a click listener on list (event delegation)
// TODO: list.addEventListener('click', (e) => { ... })
//   - Use e.target.closest('button.action') to find the clicked button
//   - Use e.target.closest('li') to find the parent li
//   - Branch on button.dataset.action === 'done'/'delete'

// 2. On addBtn click, read input.value, build a new li (text + done/delete buttons) and append to list
// TODO: addBtn.addEventListener('click', () => { ... })

// 3. (Optional) Press Enter to submit
// TODO: input.addEventListener('keydown', (e) => { if (e.key === 'Enter') ... })`,
            checks: [
              {
                description: 'Bind a click listener on list (event delegation)',
                pattern: 'list\\.addEventListener\\s*\\(\\s*["\']click["\']',
                hint: 'Bind the click listener on list (the ul), not on each li. This is the core of event delegation.',
              },
              {
                description: 'Use closest to locate the clicked button',
                pattern: 'closest\\s*\\(\\s*["\']button',
                hint: 'Inside the listener use e.target.closest("button") to find the actual button (it may have child nodes).',
              },
              {
                description: 'Branch on dataset.action',
                pattern: 'dataset\\.action|data-action',
                hint: 'Mark each button with data-action="done"/"delete" and branch on button.dataset.action in the listener.',
              },
              {
                description: 'addBtn click appends a new li',
                pattern: 'addBtn\\.addEventListener\\s*\\(\\s*["\']click["\']',
                hint: 'On addBtn click, read input.value, build an li (text + two action buttons) and appendChild to list.',
              },
              {
                description: 'Delete removes the li',
                pattern: 'remove\\(\\)|removeChild',
                hint: 'The delete action should call li.remove() or list.removeChild(li) to remove the item.',
              },
              {
                description: 'Done toggles a class',
                pattern: 'classList\\.toggle|className',
                hint: 'The done action should use classList.toggle("completed") instead of writing inline styles.',
              },
            ],
          },
        },
        {
          id: 'p21-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: limits and pitfalls of delegation',
          text: 'Delegation is not a silver bullet: 1) Non-bubbling events (focus/blur, mouseenter/mouseleave) need capture or their bubbling counterparts (focusin/mouseover); 2) If a child stops bubbling (stopPropagation), the parent delegate fails; 3) closest may match an unexpected ancestor — use markers like data-action to be precise; 4) A heavy callback on a parent with many children can hurt performance — consider throttle. In production, also removeEventListener on unmount.',
        },
      ],
    },

    // ========================================================================
    // KP 22: Hands-on — Mini History SPA Router
    // ========================================================================
    {
      order: 22,
      title: 'Hands-on: Mini History SPA Router',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p22-1',
          type: 'paragraph',
          lead: true,
          text: 'SPA routing is a classic application of the history API + popstate. This hands-on ties together pushState, popstate, route-table matching, and view rendering to build a minimal working frontend router.',
        },
        {
          id: 'p22-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'Understanding SPA routing lets you correctly handle engineering issues like back/forward, refresh 404, param parsing, and route guards. The history mode of Vue Router / React Router is built on exactly this. Writing one yourself clarifies the two core mechanisms: "URL change without reload" and "browser back/forward triggers popstate".',
        },
        {
          id: 'p22-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Implement a mini router in the skeleton: pushState to change URL, popstate for back/forward, route-table matching to render the view.',
            initialCode: `// Hands-on: mini History SPA router
// Goal: implement navigate(path) + popstate listener + route-table rendering

const routes = {
  '/': 'Home',
  '/about': 'About',
  '/users': 'Users',
  '/users/:id': 'User detail',  // dynamic param
}

const app = document.querySelector('#app')

// 1. Render: match location.pathname against the route table and render
function render() {
  // TODO: take location.pathname, match routes
  //   - Exact match returns the value directly
  //   - Dynamic segment /users/:id uses regex or split to parse the id
  //   - No match → 404
  // TODO: app.innerHTML = ...
}

// 2. Programmatic navigation: pushState changes URL without reload, then call render
function navigate(path) {
  // TODO: history.pushState(null, '', path)
  // TODO: render()
}

// 3. Listen for back/forward
// TODO: window.addEventListener('popstate', render)

// 4. Intercept <a> clicks: prevent default and call navigate
// TODO: document.addEventListener('click', (e) => { ... e.preventDefault(); navigate(...) })

render()  // initial render for the current path`,
            checks: [
              {
                description: 'Define a render function',
                pattern: 'function\\s+render\\s*\\(',
                hint: 'Define render() that matches location.pathname against routes and writes app.innerHTML.',
              },
              {
                description: 'Use history.pushState to change URL',
                pattern: 'history\\.pushState',
                hint: 'In navigate, call history.pushState(null, "", path) to change the URL without triggering a page load.',
              },
              {
                description: 'Listen for popstate for back/forward',
                pattern: 'addEventListener\\s*\\(\\s*["\']popstate["\']',
                hint: 'Back/forward fires popstate; addEventListener("popstate", render) to re-render.',
              },
              {
                description: 'Handle dynamic :id params',
                pattern: ':id|params|split\\s*\\(\\s*["\']/',
                hint: 'For /users/:id, use a regex or split("/") to compare segments and parse the id (e.g. routes["/users/:id"] + params.id).',
              },
              {
                description: 'Render a 404 fallback',
                pattern: '404|not found|notFound',
                hint: 'When no route matches, render a 404 message — never leave the page blank.',
              },
              {
                description: 'Intercept <a> clicks for programmatic navigation',
                pattern: 'preventDefault|closest\\s*\\(\\s*["\']a',
                hint: 'Delegate a click listener on document; when e.target.closest("a") matches and has href, e.preventDefault() and navigate(href).',
              },
            ],
          },
        },
        {
          id: 'p22-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: refresh 404 and production deployment',
          text: 'pushState changes the URL but the server is unaware; refreshing makes the server look up the new URL and 404 if no backend route exists. Production must configure history fallback (Nginx try_files, Vercel rewrites, etc.) to fall back to index.html for all frontend routes. If you cannot configure the server, use hash routing (#/path) but the URL is uglier. Mature routers also handle route guards, nested routes, and scroll restoration — that is the job of a router library.',
        },
      ],
    },

    // ========================================================================
    // KP 23: Interview Questions
    // ========================================================================
    {
      order: 23,
      title: 'Interview Questions',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p23-1',
          type: 'paragraph',
          text: 'High-frequency DOM/BOM/Web API interview topics: the event system, node operations, storage, the history stack, geometry, and timers. Understanding the principles matters more than memorizing answers.',
        },
        {
          id: 'p23-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            title: 'High-frequency interview questions (incl. scenario / comparison)',
            items: [
              {
                title: 'Q1: The three event-flow phases and the use of capture/bubble',
                content: 'Three phases:\n1. Capturing — document → target\'s ancestors.\n2. Target phase.\n3. Bubbling — target → document.\n\nThe 3rd arg of addEventListener (useCapture):\n- Default false → fires in bubbling.\n- true → fires in capturing.\n\nUses:\n- Event delegation uses bubbling to handle children on a parent.\n- Capture can intercept before the target fires.\n\nstopPropagation stops further propagation; stopImmediatePropagation also blocks subsequent listeners on the same element.',
              },
              {
                title: 'Q2: Event delegation — principle, pros, limits',
                content: 'Principle: bind one listener on a common ancestor; use event.target.closest to find the actual trigger.\n\nPros:\n1. Fewer listeners → less memory.\n2. Children added/removed later work automatically.\n\nLimits:\n1. Non-bubbling events (focus/blur/mouseenter) need their bubbling counterparts (focusin/mouseover) or capture.\n2. A child that calls stopPropagation breaks the delegate.\n3. Heavy callbacks may need debounce/throttle.\n\nReact\'s synthetic event system is essentially top-level delegation.',
              },
              {
                title: 'Q3: attribute vs property',
                content: 'property: a JS field on the DOM object (e.g. input.value).\nattribute: an attribute on the HTML tag (e.g. <input value="x">).\n\nSync:\n- Standard attributes sync both ways initially (attribute initializes property).\n- Mutating the property usually does NOT sync back to the attribute (e.g. value).\n\nCustom attributes:\n- HTML data-* maps to dataset.\n- setAttribute/getAttribute operate on attributes.\n- Direct assignment operates on properties.\n\nConvention: use dataset for data-*; use setAttribute for other custom attributes.',
              },
              {
                title: 'Q4: Differences between DOM query APIs',
                content: 'Each API\'s traits:\n\ngetElementById: returns a single Element.\n\ngetElementsByClassName/TagName:\n- Return a live HTMLCollection (reflects DOM changes).\n- No forEach.\n\nquerySelector(All):\n- Return a static NodeList.\n- forEach available.\n- Snapshot — does not track DOM changes.\n\nChoosing:\n- Prefer querySelectorAll (readable).\n- Use getElementsBy* when you need liveness.\n\nLive collections are great for "watching DOM changes" but risky when mutating during iteration; static collections are safe but cost memory.',
              },
              {
                title: 'Q5: Performance optimization for batch DOM insertion',
                content: 'Problem: looping appendChild triggers reflow each time → N inserts = N reflows.\n\nOptimizations:\n1. DocumentFragment: append to the fragment (no reflow), then appendChild(fragment) once → only one reflow.\n2. innerHTML with concatenated string set in one go (escape to avoid XSS).\n3. cloneNode + replaceChild.\n\nModern browsers batch consecutive appendChild, but DocumentFragment is still the clearest approach.\n\nNote: reading layout props (offsetHeight etc.) forces synchronous reflow — avoid inside loops.',
              },
              {
                title: 'Q6: reflow vs repaint',
                content: 'reflow:\n- Triggered by geometry changes (size, position, display).\n- Requires recomputing layout — expensive.\n\nrepaint:\n- Triggered by appearance changes (color, background, visibility).\n- No layout recompute — cheaper.\n\nKey rule: reflow always causes repaint; repaint does not cause reflow.\n\nOptimizations:\n1. Use transform/opacity instead of top/left/width (compositor layer, no reflow).\n2. Batch style changes via class toggle.\n3. Take elements out of flow with display:none before heavy ops.\n4. Avoid reading layout props in a loop (forces sync layout).',
              },
              {
                title: 'Q7: localStorage / sessionStorage / Cookie / IndexedDB compared',
                content: 'Each has its use case:\n\nlocalStorage: same-origin, persistent, ~5-10MB, synchronous, string key-value.\n\nsessionStorage: same-origin + same tab, session-scoped, otherwise same as localStorage.\n\nCookie: same-origin, sent automatically with requests, ~4KB, settable expiry/domain/path/HttpOnly/Secure/SameSite — good for auth.\n\nIndexedDB: async, large capacity, object store, transactions, indexes — good for offline apps with big data.\n\nChoosing: Cookie for auth; localStorage for UI prefs; sessionStorage for temporary session data; IndexedDB for offline big data.',
              },
              {
                title: 'Q8: Cookie security attributes',
                content: 'Common security attributes:\n1. Secure — HTTPS only.\n2. HttpOnly — not readable from JS (document.cookie returns nothing); prevents XSS theft.\n3. SameSite=Strict/Lax/None — CSRF defense; Lax is the modern default (allows top-level GET navigation); None requires Secure.\n4. Domain/Path — scope.\n5. Max-Age/Expires — expiry.\n\nWhen setting cookies, set HttpOnly+Secure+SameSite together; session cookies should also be short-lived with a refresh mechanism.',
              },
              {
                title: 'Q9: history API vs hash routing',
                content: 'history mode:\n- pushState/replaceState changes URL without reload.\n- No # in the URL — clean.\n- But refresh needs server-side fallback to index.html or you get 404.\n\nhash mode:\n- Changing location.hash (#path) fires hashchange.\n- URL has # — uglier.\n- But refresh never hits the server for the hash part — no server config needed.\n\nChoosing: modern apps prefer history (clean URL, better SEO) and configure the server; if you cannot touch the server or need legacy support, use hash.',
              },
              {
                title: 'Q10: getBoundingClientRect vs the offset family',
                content: 'getBoundingClientRect():\n- Returns {top,left,right,bottom,width,height,x,y} relative to the viewport.\n- Updates live as you scroll.\n- Used for drag, hover positioning, collision detection.\n\noffsetTop/offsetLeft:\n- Offset relative to offsetParent.\n- Does not include scroll.\n- Good for layout relative to a parent.\n\noffsetWidth/Height: element\'s own size including border.\nclientWidth/Height: including padding, excluding border.\nscrollTop/scrollHeight: scroll-related.\n\nChoose: getBoundingClientRect for viewport-relative; offset for parent-relative; offsetWidth/clientWidth for self-size.',
              },
              {
                title: 'Q11: requestAnimationFrame vs setTimeout/setInterval for animation',
                content: 'rAF:\n- Callback runs before the next repaint.\n- Frequency aligned to display refresh (typically 60Hz/16.67ms).\n- Auto-pauses in background tabs.\n- Stable frame rate, no dropped frames.\n\nsetTimeout(fn,16):\n- Fixed delay.\n- Not synced with rendering → may drop frames or spin idle.\n- Still runs in background → wastes resources.\n\nsetInterval: same; may also stack up.\n\nrAF also adapts to high-refresh displays (120Hz).\n\nCancel with cancelAnimationFrame(id). Use setTimeout for non-visual timing; rAF for visual animation.',
              },
              {
                title: 'Q12: MutationObserver — purpose and usage',
                content: 'MutationObserver asynchronously observes DOM changes (children, attributes, text, subtree); the callback runs as a microtask.\n\nUses:\n1. Custom components reacting to child content changes.\n2. Detecting third-party library injection.\n3. The underlying mechanism for data↔view binding.\n\nUsage: const obs = new MutationObserver(cb); obs.observe(target, {childList, attributes, subtree, ...}); stop with obs.disconnect().\n\nCompared to the deprecated MutationEvent (synchronous, slow), it is batched and async — much more efficient.',
              },
              {
                title: 'Q13 [Scenario]: List items are added/removed frequently and the page lags — how to investigate and optimize',
                content: 'Investigate:\n1. Record in the Performance panel; check Scripting/Rendering share — is JS slow or reflow/repaint heavy?\n2. Check whether per-item addEventListener was not unbound (listener & memory pile-up).\n3. Check whether the loop appendChild triggers many reflows.\n4. Check whether reading layout props forces sync layout.\n\nOptimize:\n1. Use event delegation to cut listeners.\n2. Batch insert with DocumentFragment.\n3. Use a virtual list (react-window) to render only visible items.\n4. Use transform instead of top/left.\n5. Paginate / lazy-load large data.\n6. Use will-change to promote heavy items to compositor layers.',
              },
              {
                title: 'Q14 [Scenario]: SPA memory keeps growing after route changes — how to investigate',
                content: 'Path:\n1. Take heap snapshots in the Memory panel and Diff before/after a route change to find unreleased objects.\n2. Check whether route-level components removeEventListener / clearInterval / close WebSocket / disconnect MutationObserver on unmount.\n3. Check whether global store / cache grows unbounded.\n4. Check whether closures hold references to unmounted component DOM.\n5. Check whether third-party instances were not destroy-ed.\n\nFix: clean up uniformly in the unmount hook (React useEffect return / Vue onBeforeUnmount).\n\nVerify: switch routes repeatedly, force GC, see whether the heap drops back.',
              },
              {
                title: 'Q15 [Comparison]: innerHTML / textContent / insertAdjacentHTML',
                content: 'innerHTML:\n- Reads/writes the descendant HTML string.\n- Writing parses HTML and replaces children.\n- XSS risk — must escape.\n\ntextContent:\n- Reads/writes plain text.\n- Does not parse HTML (writing < shows literally — safe).\n- Faster than innerHTML.\n\ninsertAdjacentHTML(position, html):\n- Inserts parsed HTML at a position (beforebegin/afterbegin/beforeend/afterend).\n- Does not replace existing children — good for appending.\n\nChoose: textContent for plain text (safe, fast); insertAdjacentHTML for HTML snippets; innerHTML for full replacement (mind escaping).',
              },
              {
                title: 'Q16 [Comparison]: appendChild / insertBefore / replaceChild / remove',
                content: 'Four node APIs:\n\nappendChild(node):\n- Appends to the end of children.\n- If node already exists in the document, it is first removed then appended (move, not copy).\n\ninsertBefore(newNode, refNode):\n- Inserts before refNode.\n- refNode null == appendChild.\n\nreplaceChild(newNode, oldNode): replaces oldNode with newNode.\n\nremove(): self-removal (legacy removeChild needs the parent).\n\nNote: all return the operated node; moving does not copy; use DocumentFragment for batch ops. prepend/append/after/before are modern conveniences.',
              },
              {
                title: 'Q17: debounce and throttle — principle and implementation',
                content: 'debounce:\n- Retriggering within N seconds resets the timer.\n- Only runs once, N seconds after the last trigger.\n- Use cases: "care about the last event" — search input, resize end, form validation.\n\nthrottle:\n- Runs at most once per N seconds.\n- Use cases: "care about frequency during continuous events" — scroll loading, mousemove drawing, button spam protection.\n\nImplementation:\n- debounce: setTimeout + clearTimeout to reset.\n- throttle: timestamp check (leading fires the first time) or setTimeout for trailing.\n\nIn production prefer lodash\'s debounce/throttle (supports leading/trailing/maxWait); for hand-rolled, mind this binding and arg passing (arrow fns or apply).',
              },
              {
                title: 'Q18: IntersectionObserver — purpose and usage',
                content: 'IntersectionObserver asynchronously observes element-vs-viewport (or root) intersection changes; the callback receives entries with isIntersecting, intersectionRatio, target.\n\nUses:\n1. Image lazy-load (load src when in view).\n2. Infinite scroll.\n3. Exposure analytics.\n4. Sticky headers / footers.\n\nAdvantages: async, non-blocking, far better than scroll + getBoundingClientRect (which forces sync layout on every scroll).\n\nUsage: const obs = new IntersectionObserver(cb, {root, rootMargin, threshold}); obs.observe(el); stop with obs.unobserve(el) or obs.disconnect().\n\nNote: threshold can be an array for multiple triggers; rootMargin enables pre-loading (e.g. "100px").',
              },
              {
                title: 'Q19: ResizeObserver — purpose and usage',
                content: 'ResizeObserver asynchronously observes element size changes (contentRect has width/height/x/y), filling the gap that window.resize only watches the viewport, not element-level sizes.\n\nUses:\n1. Responsive components (JS-side container queries).\n2. ECharts/Canvas chart auto-resize.\n3. Re-layout when an element\'s size changes.\n\nUsage: const obs = new ResizeObserver(entries => { for (const e of entries) { e.contentRect.width } }); obs.observe(el); stop with obs.disconnect().\n\nNote: the callback fires async after resize to avoid loops (resize → callback → resize); debounce in performance-sensitive scenes. CSS @container can replace it for simple layouts; complex logic still needs ResizeObserver.',
              },
              {
                title: 'Q20: postMessage cross-origin communication',
                content: 'window.postMessage(data, targetOrigin) is the standard API for cross-window/cross-document messaging — used for iframe parent-child, window.open targets, and Web Workers.\n\nSending:\notherWin.postMessage(data, "https://receiver.com")\n- targetOrigin must be exact (avoid "*" — prevents leaking data to malicious pages).\n\nReceiving:\nwindow.addEventListener("message", e => { ... })\n- Always verify e.origin to reject forged messages.\n- Read e.data.\n\nStructured Clone supports objects/arrays/Map/Set but not functions/DOM nodes. It is the foundation of micro-frontends, cross-origin iframes, and SharedWorker communication.',
              },
              {
                title: 'Q21: Web Worker — use cases and limits',
                content: 'Web Worker runs JS on a separate thread without blocking the main thread — used for CPU-heavy work (sorting big data, image processing, encryption, complex algorithms).\n\nTypes:\n1. Dedicated Worker — exclusive to one page.\n2. Shared Worker — shared across pages.\n3. Service Worker — offline cache and network proxy.\n\nLimits:\n- No DOM access (no window/document/parent).\n- Cannot touch the UI.\n- Communication only via postMessage (structured clone).\n- Startup cost (~tens of ms) — not for trivial tasks.\n\nUsage: const w = new Worker("worker.js"); w.postMessage(data); w.onmessage = e => {}; terminate with w.terminate().\n\nNote: data must be serializable; for large data use Transferable objects (ArrayBuffer transfer-of-ownership, zero-copy).',
              },
              {
                title: 'Q22: requestIdleCallback — purpose and usage',
                content: 'requestIdleCallback(cb) runs low-priority tasks during browser idle periods; the callback receives a deadline with didTimeout and timeRemaining() (remaining idle ms) — yield before time runs out.\n\nUses:\n1. Data pre-computation.\n2. Analytics reporting.\n3. Non-critical DOM ops.\n4. Pre-rendering.\n\nvs rAF:\n- rAF runs before each repaint (high priority, visual).\n- rIC runs in idle time between frames (low priority).\n\nNote: the {timeout} option guarantees eventual execution to avoid starvation; Safari support is weaker (fall back to rAF + manual time-slicing); React 18 time-slicing shares the same idea. Cancel with cancelIdleCallback(id).',
              },
              {
                title: 'Q23: Drag and Drop API and dataTransfer',
                content: 'HTML5 native drag flow:\n1. Set draggable="true" on the element.\n2. Listen for dragstart (set e.dataTransfer.setData("text", id)).\n3. Listen for dragover (must e.preventDefault() or drop is not allowed).\n4. Listen for drop (e.dataTransfer.getData to read and act).\n\ndataTransfer carries the drag data and supports multiple MIME types ("text/plain", "application/json", custom).\n\nvs mouse-event simulated drag:\n- Native supports cross-window / file drops, has a ghost image, but no touch support (use Pointer Events).\n\nTypical scenes: file upload (drop files onto the page), Kanban sorting, list reordering.\n\nNote: dragleave misfires (use relatedTarget or a counter); on mobile, implement with touch events.',
              },
              {
                title: 'Q24: Clipboard API',
                content: 'Modern Clipboard API:\n- navigator.clipboard.writeText(text) writes text.\n- readText() reads text.\n- Promise-based; requires HTTPS + permission (query clipboard-write via navigator.permissions).\n\nAdvantages: async, safe, non-blocking, supports non-text (write accepts ClipboardItem with image/html).\n\nLegacy: document.execCommand("copy") is deprecated but well-supported (requires select() first).\n\nPermissions: requires a user gesture (button click) to allow; silent script copies are blocked. Pasting via readText is gated by "clipboard-read" and denied by default in some browsers.\n\nNote: copy rich text with ClipboardItem({ "text/html": blob }); for large or sensitive content, let the user Ctrl+V manually.',
              },
              {
                title: 'Q25: Page Visibility API and background resource management',
                content: 'document.visibilityState ("visible"/"hidden") reflects page visibility; visibilitychange fires when switching tabs or minimizing.\n\nUses:\n1. Pause rAF/video/polling to save resources (no rendering in background).\n2. Sync data when returning ("just back, please refresh").\n3. Track real engagement time (exclude background time).\n4. Pause or downscale WebSocket heartbeats.\n\nvs blur/focus:\n- visibilitychange reflects tab visibility (also fires when switching to another tab).\n- blur/focus reflects window focus (fires only when switching to another app in the same window).\n\nPairing with Page Visibility can drastically cut background resource use — a low-cost, high-return optimization.',
              },
              {
                title: 'Q26 [Scenario]: Implementing image lazy-load — compare options',
                content: 'Option 1 (legacy):\n- Listen to scroll + getBoundingClientRect to check if the element is in view; if so, assign data-src to src.\n- Drawback: each scroll forces synchronous layout (layout thrashing); manual throttle needed; poor performance.\n\nOption 2 (recommended):\n- IntersectionObserver observes the img; when isIntersecting, set src and unobserve.\n- Advantages: native async, no manual math, better performance.\n\nOption 3 (zero JS):\n- Native loading="lazy" attribute — the browser lazy-loads automatically.\n- But limited compatibility and control.\n\nProduction: loading="lazy" as fallback + IntersectionObserver for precise control + placeholder (SVG/LQIP) to prevent layout shift + error fallback. Note rootMargin:"200px" pre-loads to avoid the flash when scrolling into view.',
              },
              {
                title: 'Q27 [Scenario]: 10k-row list lags — what are the optimization options',
                content: 'Core problem: too many DOM nodes → high memory, slow first paint, lots of scroll reflow/repaint.\n\nOption 1 (virtual list):\n- Render only the visible area + buffer above/below.\n- On scroll, swap content and offset with transform.\n- Libraries: react-window / react-virtualized.\n- Hard parts: dynamic heights (measure or estimate), scrollbar sync, horizontal/grouping.\n\nOption 2 (pagination / infinite scroll): IntersectionObserver at the bottom loads the next page — simple but still memory-heavy at large totals.\n\nOption 3 (content placeholders): skeleton/placeholder divs outside the visible area to cut reflow.\n\nOption 4 (time slicing): requestIdleCallback or rAF to render N items per frame, avoiding long main-thread blocks.\n\nChoose: virtual list for 10k+ with random scroll; infinite scroll for progressive browsing; skeleton + slicing for first paint. Note: key stability affects virtual-list reuse performance.',
              },
              {
                title: 'Q28 [Comparison]: scroll listener vs IntersectionObserver',
                content: 'scroll event:\n- Fires on every scroll (high frequency); needs manual throttle.\n- Visibility check uses getBoundingClientRect (forces sync layout) — slow.\n- Great compatibility.\n\nIntersectionObserver:\n- Browser async callback; only fires on intersection state changes.\n- No manual position math.\n- Non-blocking; better performance.\n- Old browsers need a polyfill.\n\nSemantics: scroll is a streaming "I am scrolling" event; IntersectionObserver is a state event "I entered/left the viewport".\n\nChoose: IntersectionObserver for pure visibility (lazy-load, infinite scroll, exposure analytics); scroll + rAF when you need continuous info (position, velocity, inertia — parallax, snapping); the two can be combined.',
              },
              {
                title: 'Q29 [Comparison]: debounce vs throttle',
                content: 'debounce:\n- Continuous triggers keep resetting the timer.\n- Only fires once, N seconds after the last trigger.\n- "Wait until the user stops, then handle."\n- Search suggestions (request after typing stops), resize end, form validation.\n\nthrottle:\n- Fires at most once per N seconds during continuous triggers.\n- "Sample at a fixed frequency."\n- scroll loading, mousemove drawing, button spam protection.\n\nAnalogy: debounce is like an elevator door (reopens when someone approaches, waits for everyone); throttle is like a train (one departure per interval regardless of passengers).\n\nEdges: debounce may not fire for a long time on the first event (add leading to fire immediately); throttle may drop the last event (add trailing).\n\nChoose based on "care about the last" vs "care about frequency during the process".',
              },
              {
                title: 'Q30 [Comparison]: localStorage cross-tab vs BroadcastChannel',
                content: 'localStorage approach:\n- Tab A localStorage.setItem fires a storage event.\n- Other same-origin tabs listen on window for storage to receive.\n- Pros: good compatibility (IE10+).\n- Cons: strings only (objects need serialization), data persists and must be cleaned, the event has no sender reference (no direct reply).\n\nBroadcastChannel approach:\n- const ch = new BroadcastChannel("topic"); ch.postMessage(data);\n- Other same-origin tabs receive via onmessage.\n- Pros: native structured clone of objects, clean API, channel isolation, ch.close() to tear down.\n- Cons: newer compatibility (no IE/old Safari).\n\nChoose: BroadcastChannel for modern apps; localStorage + storage event for legacy browsers or when sharing persistent data (e.g. login state); same-origin multi-tab logout sync is the classic storage-event scenario.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 24: Cheat Sheet
    // ========================================================================
    {
      order: 24,
      title: 'Cheat Sheet',
      difficulty: 1,
      blocks: [
        {
          id: 'p24-1',
          type: 'paragraph',
          lead: true,
          text: 'A condensed reference of DOM/BOM/Web API core methods and common pitfalls — quickly locate key points when reviewing.',
        },
        {
          id: 'p24-2',
          type: 'table',
          caption: 'DOM / BOM / Web API core cheat sheet',
          headers: ['Topic', 'Core API / syntax', 'Key tips'],
          rows: [
            ['Node query', 'getElementById / getElementsBy* / querySelector(All)', 'getElementBy* returns live HTMLCollection; querySelectorAll returns static NodeList with forEach'],
            ['Node creation', 'createElement / createTextNode / cloneNode', 'Created nodes are detached — must appendChild to render; cloneNode(true) for deep clone'],
            ['Node insertion', 'appendChild / insertBefore / prepend / append', 'Existing nodes are moved, not copied; use DocumentFragment for batch inserts to cut reflow'],
            ['Node removal', 'remove() / removeChild(node)', 'remove is self-removal; removeChild needs the parent and returns the removed node'],
            ['Attribute ops', 'getAttribute / setAttribute / dataset / hasAttribute', 'attribute and property sync one way; data-* maps to camelCase dataset'],
            ['Style ops', 'element.style.prop / getComputedStyle / classList', 'style writes inline; getComputedStyle reads computed value; classList add/remove/toggle'],
            ['Event binding', 'addEventListener(type, fn, useCapture) / removeEventListener', '3rd arg can be an object {capture, once, passive}; removal needs same reference & options'],
            ['Event flow', 'Capture → Target → Bubble', 'useCapture=true fires in capture; stopPropagation stops propagation; delegation uses bubbling'],
            ['Event object', 'e.target / e.currentTarget / e.preventDefault / e.stopPropagation', 'target is the actual trigger; currentTarget is the bound element'],
            ['Event delegation', 'Parent listens + e.target.closest to locate', 'Fewer listeners, auto-works for dynamic children; non-bubbling events need focusin/mouseover'],
            ['window', 'innerWidth / scrollY / open / alert / requestAnimationFrame', 'Global scope; rAF beats setTimeout for animation; auto-pauses in background tabs'],
            ['location', 'href / pathname / search / hash / reload / assign / replace', 'assign pushes history, replace does not; hash change fires hashchange'],
            ['history', 'pushState / replaceState / back / forward / go / popstate', 'pushState changes URL without reload; back/forward fires popstate; refresh needs server fallback'],
            ['navigator', 'userAgent / platform / language / cookieEnabled / geolocation', 'userAgent is unreliable and easy to spoof; prefer feature detection over UA parsing'],
            ['Storage', 'localStorage / sessionStorage / Cookie / IndexedDB', 'localStorage persistent; sessionStorage session; Cookie sent with requests; IndexedDB async & large'],
            ['Cookie security', 'Secure / HttpOnly / SameSite / Domain / Path', 'HttpOnly prevents XSS theft; SameSite=Lax prevents CSRF (modern default)'],
            ['Geometry', 'offsetWidth / clientWidth / scrollWidth / getBoundingClientRect', 'offset includes border; client excludes it; getBoundingClientRect is viewport-relative and live'],
            ['Scrolling', 'scrollTo / scrollIntoView / scrollTop / IntersectionObserver', 'rAF-throttle scroll listeners; IntersectionObserver beats scroll events for visibility'],
            ['File handling', 'FileReader / URL.createObjectURL / FormData / Blob.slice', 'Read via FileReader or URL.createObjectURL; chunked upload via Blob.slice'],
            ['Blob & download', 'new Blob / URL.createObjectURL / a.download / revokeObjectURL', 'Generate downloads with Blob + createObjectURL + a.download; revokeObjectURL after use'],
            ['Timers', 'setTimeout / setInterval / requestAnimationFrame / cancelAnimationFrame', 'rAF for visual animation; setTimeout for logic delays; avoid setInterval stacking'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 25: Quiz
    // ========================================================================
    {
      order: 25,
      title: 'DOM / BOM / Web API Quiz',
      difficulty: 3,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p25-1',
          type: 'paragraph',
          lead: true,
          text: '20 questions to check your grasp of DOM/BOM/Web API. Each has an explanation — review the relevant chapter for any you miss.',
        },
        {
          id: 'p25-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '[Recall] Which API returns a static NodeList?',
                options: ['getElementById', 'getElementsByClassName', 'querySelectorAll', 'getElementsByName'],
                correctIndex: 2,
                explanation: 'querySelectorAll returns a static NodeList with forEach; getElementsBy* returns a live HTMLCollection.',
              },
              {
                question: '[Recall] What is the correct order of the event flow?',
                options: ['Bubble → Target → Capture', 'Capture → Target → Bubble', 'Target → Capture → Bubble', 'Capture → Bubble → Target'],
                correctIndex: 1,
                explanation: 'Three phases: capturing (document down to target ancestors) → target → bubbling (target up to document).',
              },
              {
                question: '[Understanding] addEventListener\'s 3rd arg being true means?',
                options: ['Stop bubbling', 'Fire in capture phase', 'Fire only once', 'Prevent default'],
                correctIndex: 1,
                explanation: 'useCapture=true fires in the capture phase; the default false fires in the bubbling phase.',
              },
              {
                question: '[Understanding] After modifying input.value, what does input.getAttribute("value") return?',
                options: ['The new value', 'The initial value', 'null', 'undefined'],
                correctIndex: 1,
                explanation: 'value syncs one way: attribute → property; modifying the property does NOT sync back, so getAttribute still returns the initial value.',
              },
              {
                question: '[Recall] What does history.pushState do?',
                options: ['Reloads the page', 'Adds a history entry without reloading', 'Replaces the current entry', 'Goes back one step'],
                correctIndex: 1,
                explanation: 'pushState adds a new history entry and changes the URL but does not trigger a page load — the foundation of SPA routing.',
              },
              {
                question: '[Understanding] Which storage is automatically sent to the server with requests?',
                options: ['localStorage', 'sessionStorage', 'Cookie', 'IndexedDB'],
                correctIndex: 2,
                explanation: 'Cookies are automatically sent with same-origin requests — good for auth; Web Storage and IndexedDB are not.',
              },
              {
                question: '[Comparison] Difference between offsetWidth and clientWidth?',
                options: ['offsetWidth excludes border', 'clientWidth includes border', 'offsetWidth includes border, clientWidth does not', 'They are the same'],
                correctIndex: 2,
                explanation: 'offsetWidth = content + padding + border; clientWidth = content + padding (excludes border).',
              },
              {
                question: '[Application] For visual animation you should prefer?',
                options: ['setInterval(fn, 16)', 'Recursive setTimeout', 'requestAnimationFrame', 'Promise.then'],
                correctIndex: 2,
                explanation: 'rAF syncs with the browser refresh rate, auto-pauses in background tabs, and gives a stable frame rate — the first choice for visual animation.',
              },
              {
                question: '[Recall] After document.createElement, is the node in the DOM tree?',
                options: ['Yes, auto-mounted', 'No, needs appendChild etc.', 'Depends on the node type', 'Only in IE'],
                correctIndex: 1,
                explanation: 'createElement creates a detached node; you must appendChild/insertBefore/replaceChild to mount it. This is the basis of DocumentFragment batching.',
              },
              {
                question: '[Understanding] The core principle of event delegation is?',
                options: ['Bind a listener per child', 'Use bubbling to handle on a parent', 'Stop capture', 'Use capture instead of bubble'],
                correctIndex: 1,
                explanation: 'Delegation uses bubbling: one listener on a common parent, branch on event.target. Fewer listeners; auto-works for dynamic children.',
              },
              {
                question: '[Application] Most efficient way to insert 100 li into a ul?',
                options: ['Loop appendChild one by one', 'Concat strings with innerHTML', 'Use DocumentFragment and insert once', 'Use createDocumentNode batch'],
                correctIndex: 2,
                explanation: 'DocumentFragment is a lightweight document slice; appending to it triggers no reflow; a final appendChild(fragment) triggers only one reflow. Beats looping appendChild (100 reflows) and innerHTML (parses HTML, XSS risk).',
              },
              {
                question: '[Understanding] Core difference between localStorage and sessionStorage?',
                options: ['Different capacity', 'Different scope and lifetime', 'Different API', 'Sync vs async'],
                correctIndex: 1,
                explanation: 'Same API, both synchronous, ~5-10MB. Difference: localStorage is permanent (until manually cleared) and same-origin; sessionStorage is scoped to the current tab session and cleared on tab close; tabs are isolated.',
              },
              {
                question: '[Comparison] stopPropagation vs stopImmediatePropagation?',
                options: ['前者阻止冒泡，后者阻止捕获', '前者只阻止同类事件后续监听器', '后者还阻止同一元素上同事件的其他监听器', '两者完全相同'],
                correctIndex: 2,
                explanation: 'stopPropagation stops further bubbling/capturing but other listeners on the same element still run; stopImmediatePropagation also blocks subsequent same-event listeners on the same element.',
              },
              {
                question: '[Scenario] List items are added/removed dynamically — how to manage clicks efficiently?',
                options: ['addEventListener per item', 'Rebind all items on every change', 'Use event delegation on the parent', 'Use onclick assignment'],
                correctIndex: 2,
                explanation: 'Delegation: one listener on the parent; new items auto-work; removed items need no unbinding. Use event.target.closest("li") to find the actual item. Avoids memory waste and rebinding cost.',
              },
              {
                question: '[Understanding] Cookie SameSite=Lax means?',
                options: ['Forbid cross-site sending', 'Allow GET top-level navigation cross-site', 'Allow all cross-site', 'Same-origin only'],
                correctIndex: 1,
                explanation: 'SameSite=Lax (modern default): allows cookies on top-level GET navigations, blocks cross-site POST and iframe subrequests — defends against CSRF. Strict forbids all cross-site; None requires Secure.',
              },
              {
                question: '[Application] To get an element\'s position relative to the viewport, use?',
                options: ['offsetTop', 'clientTop', 'getBoundingClientRect()', 'scrollTop'],
                correctIndex: 2,
                explanation: 'getBoundingClientRect() returns {top,left,width,height,...} relative to the viewport and updates live with scroll. offsetTop is relative to offsetParent and excludes scroll. Fixed positioning commonly uses getBoundingClientRect.',
              },
              {
                question: '[Understanding] Why does refreshing after history.pushState 404?',
                options: ['Bad pushState syntax', 'URL changed but server has no matching route', 'Browser does not support it', 'Need to call replaceState'],
                correctIndex: 1,
                explanation: 'pushState changes the URL without notifying the server; refreshing makes the server look up the new URL — 404 if no backend route. Fix: configure history fallback to index.html, or use hash routing.',
              },
              {
                question: '[Scenario] User uploads a large file and wants progress — use?',
                options: ['Plain form submit', 'fetch + ReadableStream read', 'XMLHttpRequest upload.onprogress', 'Synchronous FormData'],
                correctIndex: 2,
                explanation: 'XMLHttpRequest\'s upload.onprogress gives upload progress (loaded/total). fetch has limited upload-progress support. For large files combine Blob.slice for chunked upload + resumable transfer.',
              },
              {
                question: '[Comprehensive] Output?\nconst div = document.createElement("div");\ndiv.dataset.userId = "123";\nconsole.log(div.getAttribute("data-user-id"));',
                options: ['123', 'userId', 'null', 'data-user-id'],
                correctIndex: 0,
                explanation: 'dataset maps userId → data-user-id; assignment syncs to the attribute, so getAttribute("data-user-id") returns "123". dataset keys are camelCase; attribute names are kebab-case.',
              },
              {
                question: '[Comprehensive] When does requestAnimationFrame pause?',
                options: ['When the tab is hidden', 'When CPU is high', 'When the network is down', 'Never'],
                correctIndex: 0,
                explanation: 'rAF syncs with rendering; when the tab is hidden (background or minimized) the browser lowers or pauses rAF to save resources. This is one of its advantages over setTimeout for animation, and the reason background animations "freeze".',
              },
            ],
          },
        },
      ],
    },
  ],
}
