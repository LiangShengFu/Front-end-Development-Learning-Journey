/**
 * Module 03: JavaScript Core Syntax (English)
 *
 * English translation of src/modules/javascript-core.ts.
 * Mirrors the structure of the Chinese version exactly.
 *
 * - 21 knowledge points (16 chapters + 2 hands-on + interview Q&A / cheat sheet / quiz)
 * - 27 visual demos (including 2 assertion-based hands-on sandboxes)
 */
import type { ModuleMeta } from '../lib/types'

export const javascriptCoreModule: ModuleMeta = {
  number: '03',
  title: 'JavaScript Core Syntax',
  slug: 'javascript-core',
  stage: 'basics',
  stageLabel: 'Basics · Module 3',
  icon: '03',
  summary: 'Data types, scope, closures, the prototype chain, this, the event loop, Promise, and ES6+.',
  knowledgePointCount: 21,
  visualizationCount: 27,
  points: [
    // ========================================================================
    // KP 1: Variables & Data Types
    // ========================================================================
    {
      order: 1,
      title: 'Variables & Data Types',
      difficulty: 2,
      visualizationType: 'datatype-explorer',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'JavaScript is a dynamically typed language — a variable\'s type is determined at runtime. Understanding the 7 primitive types and the difference from reference types is the foundation for understanding JS behavior.',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'js', label: 'JS Core', group: 'core', weight: 3 },
              { id: 'types', label: 'Data Types', group: 'related', weight: 2 },
              { id: 'scope', label: 'Scope / Closures', group: 'related', weight: 2 },
              { id: 'proto', label: 'Prototype Chain', group: 'related', weight: 2 },
              { id: 'this', label: 'this Binding', group: 'related', weight: 2 },
              { id: 'async', label: 'Async Programming', group: 'related', weight: 2 },
              { id: 'loop', label: 'Event Loop', group: 'related', weight: 2 },
              { id: 'es6', label: 'ES6+', group: 'related', weight: 2 },
            ],
            edges: [
              { source: 'js', target: 'types', label: 'foundation' },
              { source: 'js', target: 'scope', label: 'scope' },
              { source: 'js', target: 'proto', label: 'inheritance' },
              { source: 'js', target: 'this', label: 'context' },
              { source: 'js', target: 'async', label: 'concurrency' },
              { source: 'js', target: 'loop', label: 'scheduling' },
              { source: 'js', target: 'es6', label: 'modern syntax' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'code',
          language: 'javascript',
          filename: 'Data types',
          code: `// Primitive types (7): represent a single value; immutable
let str = "hello";              // string
let num = 42;                   // number
let bool = true;                // boolean
let empty = null;               // null (intentional absence)
let notDefined;                 // undefined (not assigned)
let sym = Symbol("id");         // symbol (unique identifier)
let big = 9007199254740991n;    // bigint (large integer)

// Reference types: mutable; accessed by reference
let obj = { name: "JS" };       // object
let arr = [1, 2, 3];            // array (special object)
let fn = function() {};         // function (special object)

// typeof type detection (note the legacy null bug)
typeof str;      // "string"
typeof num;      // "number"
typeof null;     // "object"  ⚠️ legacy bug
typeof fn;       // "function"
typeof arr;      // "object"  ⚠️ cannot distinguish arrays

// Precise array vs object checks
Array.isArray(arr);             // true
Object.prototype.toString.call(arr); // "[object Array]"`,
        },
        {
          id: 'p1-4',
          type: 'demo',
          visualizationType: 'datatype-explorer',
          data: {
            title: 'Data Type Explorer · typeof / mutability / classification',
            types: [
              { name: 'String', value: "'hello'", typeofResult: 'string', mutable: false, category: 'primitive', desc: 'Primitive type; immutable. Strings cannot be modified once created — all string methods return new strings.' },
              { name: 'Number', value: '42', typeofResult: 'number', mutable: false, category: 'primitive', desc: 'Primitive type; covers integers and floats (IEEE 754 double precision). Note: 0.1 + 0.2 !== 0.3.' },
              { name: 'Boolean', value: 'true', typeofResult: 'boolean', mutable: false, category: 'primitive', desc: 'Primitive type; only two values: true and false.' },
              { name: 'null', value: 'null', typeofResult: 'object', mutable: false, category: 'primitive', desc: 'Primitive type; represents "no value". typeof null returns "object" — a legacy bug.' },
              { name: 'undefined', value: 'undefined', typeofResult: 'undefined', mutable: false, category: 'primitive', desc: 'Primitive type; the variable is declared but not assigned. A function with no return value defaults to undefined.' },
              { name: 'Symbol', value: "Symbol('id')", typeofResult: 'symbol', mutable: false, category: 'primitive', desc: 'Primitive type added in ES6; unique and immutable; commonly used as object property keys to avoid collisions.' },
              { name: 'BigInt', value: '9007199254740991n', typeofResult: 'bigint', mutable: false, category: 'primitive', desc: 'Primitive type added in ES2020; represents arbitrary-precision big integers; uses the n suffix.' },
              { name: 'Object', value: "{ name: 'Alice' }", typeofResult: 'object', mutable: true, category: 'reference', desc: 'Reference type; mutable; accessed by reference; assignment passes the reference, not a copy.' },
              { name: 'Array', value: '[1, 2, 3]', typeofResult: 'object', mutable: true, category: 'reference', desc: 'Reference type; mutable. typeof cannot distinguish arrays — use Array.isArray().' },
              { name: 'Function', value: '() => 1', typeofResult: 'function', mutable: true, category: 'reference', desc: 'Reference type; mutable; Function is a first-class citizen — can be assigned, passed as an argument, and returned.' },
            ],
          },
        },
        {
          id: 'p1-5',
          type: 'callout',
          variant: 'warning',
          title: 'typeof null === "object"',
          text: 'This is a legacy bug from the birth of JavaScript. The low bit flag of null in memory matches that of an object, causing typeof to misjudge. For precise null checks, use value === null.',
        },
        {
          id: 'p1-6',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '1995', title: 'JavaScript is born', description: 'Brendan Eich creates Mocha in 10 days; first integrated into Netscape Navigator 2.0.', status: 'done' },
              { time: '1997', title: 'ECMAScript 1', description: 'Standardized as ECMA-262; unifies Netscape and Microsoft implementations.', status: 'done' },
              { time: '2005', title: 'AJAX rises', description: 'Google Maps / Gmail push XMLHttpRequest; web apps take off.', status: 'done' },
              { time: '2009', title: 'ES5 released', description: 'Strict mode, JSON, Array methods, Object.create.', status: 'done' },
              { time: '2015', title: 'ES6 / ES2015', description: 'class, modules, Promise, arrow functions, let/const, destructuring. A milestone release.', status: 'done' },
              { time: '2020', title: 'ES2020', description: 'Optional chaining, nullish coalescing, BigInt, dynamic import.', status: 'active' },
              { time: '2022', title: 'ES2022', description: 'Private fields #, top-level await, Object.hasOwn.', status: 'active' },
              { time: '2024+', title: 'ES2024+', description: 'Object.groupBy, Promise.withResolvers, Temporal API.', status: 'pending' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 2: Operators & Type Coercion
    // ========================================================================
    {
      order: 2,
      title: 'Operators & Type Coercion',
      difficulty: 3,
      visualizationType: 'equality-comparator',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'JavaScript\'s implicit type coercion is a high-frequency interview topic and a common source of bugs. Understanding the difference between == and === and the truthy/falsy rules is essential.',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'equality-comparator',
          data: {
            title: 'Equality Comparator · == vs === / ?? vs ||',
            defaultLeft: '0',
            defaultRight: '""',
            defaultMode: 'equality',
            examples: [
              { label: '0 == ""', left: '0', right: '""', mode: 'equality' },
              { label: 'null == undefined', left: 'null', right: 'undefined', mode: 'equality' },
              { label: 'NaN === NaN', left: 'NaN', right: 'NaN', mode: 'equality' },
              { label: '[] == 0', left: '[]', right: '0', mode: 'equality' },
              { label: '0 ?? 1', left: '0', right: '1', mode: 'nullish' },
              { label: '"" ?? "default"', left: '""', right: '"default"', mode: 'nullish' },
              { label: '0 || 1', left: '0', right: '1', mode: 'nullish' },
              { label: '"" || "default"', left: '""', right: '"default"', mode: 'nullish' },
            ],
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: 'Equality comparison',
          code: `// == loose equality (triggers implicit coercion; avoid)
0 == "";        // true  (both coerced to 0)
0 == "0";       // true  ("0" coerced to 0)
"" == "0";      // false (both strings; no conversion)
null == undefined; // true (special rule)
null == 0;      // false (null only equals undefined/itself)

// === strict equality (recommended; no type conversion)
0 === "";       // false
0 === "0";      // false
null === undefined; // false

// Object.is() handles special values
Object.is(NaN, NaN);  // true (=== returns false)
Object.is(+0, -0);    // false (=== returns true)

// Falsy values (6): false / 0 / "" / null / undefined / NaN
// Truthy values: everything else (including [], {}, "0", "false")
Boolean([]);    // true  ⚠️ empty array is truthy
Boolean({});    // true  ⚠️ empty object is truthy
Boolean("0");   // true  ⚠️ non-empty string is truthy`,
        },
        {
          id: 'p2-5',
          type: 'callout',
          variant: 'tip',
          title: 'Prefer explicit over implicit conversion',
          text: 'Use Number(), String(), and Boolean() for explicit conversion; avoid relying on the implicit rules of == and +. The code is clearer and has fewer bugs.',
        },
      ],
    },

    // ========================================================================
    // KP 3: Functions & Closures
    // ========================================================================
    {
      order: 3,
      title: 'Functions & Closures',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: 'A closure is the combination of a function and its lexical environment, allowing an inner function to access the outer function\'s variables. Closures are the foundation of the module pattern, currying, debounce/throttle, and other advanced techniques.',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Closure counter factory: each call to createCounter creates an independent counter',
            initialCode: `// Closure counter factory
function createCounter(initial = 0) {
  let count = initial;  // private variable captured by the closure
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => { count = initial; return count; }
  };
}

// Create two independent counters
const counter1 = createCounter(0);
const counter2 = createCounter(10);

console.log('counter1:', counter1.increment()); // 1
console.log('counter1:', counter1.increment()); // 2
console.log('counter2:', counter2.getValue());  // 10 (independent)
console.log('counter1:', counter1.getValue());  // 2 (unaffected)`,
          },
        },
        {
          id: 'p3-3',
          type: 'code',
          language: 'javascript',
          filename: 'Closure applications',
          code: `// 1. Module pattern: encapsulate private variables
const Counter = (function() {
  let privateCount = 0;  // private variable
  function changeBy(val) { privateCount += val; }
  return {
    increment: () => changeBy(1),
    decrement: () => changeBy(-1),
    value: () => privateCount
  };
})();

// 2. Currying: delayed execution
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
curriedSum(1)(2)(3);    // 6
curriedSum(1, 2)(3);    // 6

// 3. Classic trap: for + setTimeout
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 3 3 3 (var has no block scope)
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 0 1 2 (let has block scope)
}`,
        },
        {
          id: 'p3-4',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Scope type',
            columns: ['var (function scope)', 'let (block scope)', 'const (block scope)'],
            rows: [
              { feature: 'Scope', values: ['Function', 'Block {}', 'Block {}'] },
              { feature: 'Hoisting', values: ['Yes (initialized to undefined)', 'No (TDZ)', 'No (TDZ)'] },
              { feature: 'Redeclaration', values: ['Allowed', 'Not allowed', 'Not allowed'] },
              { feature: 'Reassignment', values: ['Yes', 'Yes', 'No'] },
              { feature: 'Recommendation', values: ['❌ Avoid', '✓ Mutable variables', '✓✓ Default choice'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p3-5',
          type: 'callout',
          variant: 'warning',
          title: 'Closures & memory',
          text: 'Closures hold references to outer variables. If a closure lives for a long time (e.g. an event listener), it may cause memory leaks. Remove listeners you no longer need, or use weak references (WeakMap/WeakSet).',
        },
        {
          id: 'p3-6',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'Scope chain structure',
            layers: [
              {
                name: 'Inner scope',
                description: 'Created when the function runs',
                components: [
                  { name: 'inner()', description: 'Can access its own variables + outer + global' },
                ],
              },
              {
                name: 'Outer scope',
                description: 'The function that defines inner',
                components: [
                  { name: 'outer()', description: 'Can access its own variables + global' },
                ],
              },
              {
                name: 'Global scope',
                description: 'The outermost layer',
                components: [
                  { name: 'global', description: 'Can access its own variables; cannot access inner layers' },
                ],
              },
            ],
            flowDirection: 'bottom-up',
          },
        },
        {
          id: 'p3-7',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'JS Memory Model',
            layers: [
              {
                name: 'Stack',
                description: 'Stores primitive values and references; managed automatically by the system',
                components: [
                  { name: 'Primitive values', description: 'string/number/boolean/null/undefined/symbol/bigint' },
                  { name: 'References', description: 'Pointers to objects on the heap' },
                  { name: 'Execution context', description: 'Function call stack frames' },
                ],
              },
              {
                name: 'Heap',
                description: 'Stores reference-type objects; managed by the GC',
                components: [
                  { name: 'Object', description: 'Objects, arrays, functions' },
                  { name: 'Closure variables', description: 'Variables held by closures' },
                ],
              },
              {
                name: 'Task queues',
                description: 'Scheduled by the event loop',
                components: [
                  { name: 'Macrotask queue', description: 'setTimeout, I/O, UI rendering' },
                  { name: 'Microtask queue', description: 'Promise.then, MutationObserver' },
                ],
              },
            ],
            flowDirection: 'bidirectional',
          },
        },
        {
          id: 'p3-8',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'const obj = {',
              '  name: "JS",',
              '  greet: function() {',
              '    console.log(this.name);',
              '  }',
              '};',
              '',
              'obj.greet();           // "JS" (implicit binding)',
              '',
              'const fn = obj.greet;',
              'fn();                  // undefined (default binding)',
              '',
              'const bound = obj.greet.bind(obj);',
              'bound();               // "JS" (explicit binding)',
              '',
              'new obj.greet();       // new object (new binding)',
            ],
            language: 'javascript',
            steps: [
              {
                title: 'Default binding',
                description: 'A standalone function call — this points to the global object (undefined in strict mode).',
                highlightLines: [9, 10],
              },
              {
                title: 'Implicit binding',
                description: 'Called as a method on an object — this points to the calling object. In obj.greet(), this is obj.',
                highlightLines: [7],
              },
              {
                title: 'Explicit binding',
                description: 'call/apply/bind explicitly set this. bind returns a new function with a permanent binding.',
                highlightLines: [12, 13],
              },
              {
                title: 'new binding',
                description: 'Calling a constructor with new — this points to the newly created object. Highest priority.',
                highlightLines: [15],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 4: Arrays & Objects
    // ========================================================================
    {
      order: 4,
      title: 'Arrays & Objects',
      difficulty: 3,
      visualizationType: 'array-method',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: 'Array methods (map/filter/reduce) and object operations are the foundation of functional programming. Mastering immutable update patterns lays the groundwork for React.',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'array-method',
          data: {
            title: 'Array Method Playground · map / filter / reduce executed live',
            defaultMethod: 'map',
            defaultInput: '[1, 2, 3, 4, 5]',
            defaultCallback: 'n => n * 2',
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'javascript',
          filename: 'Object operations',
          code: `// Object destructuring and spread
const { name, age, ...rest } = { name: 'JS', age: 30, city: 'SH', zip: '200000' };
// name='JS', age=30, rest={city:'SH', zip:'200000'}

const merged = { ...rest, country: 'CN' };  // shallow copy + merge

// Immutable update pattern (basis for React state updates)
const state = { count: 0, list: [1, 2, 3] };
const newState = {
  ...state,
  count: state.count + 1,
  list: [...state.list, 4]  // new array reference
};
// state unchanged; newState is a new object

// Object methods
Object.keys(state);     // ['count', 'list']
Object.values(state);   // [1, [1,2,3]]
Object.entries(state);  // [['count',1], ['list',[...]]]
Object.freeze(state);   // freeze (shallow)

// Optional chaining and nullish coalescing
const user = { profile: { name: 'JS' } };
user?.profile?.name;     // 'JS' (returns undefined if missing)
user?.settings?.theme;   // undefined
user?.settings?.theme ?? 'light';  // 'light' (default value)`,
        },
        {
          id: 'p4-4',
          type: 'callout',
          variant: 'tip',
          title: 'Immutable updates',
          text: 'In React, state updates must return a new reference (shallow copy); you cannot mutate state directly. Use the spread operator ... or the immer library to implement immutable updates.',
        },
      ],
    },

    // ========================================================================
    // KP 5: DOM Operations & Events
    // ========================================================================
    {
      order: 5,
      title: 'DOM Operations & Events',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: 'Event propagation has three phases: capture, target, and bubble. Understanding event delegation improves performance and reduces the number of event listeners.',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'document.addEventListener("click", handler, true);  // capture phase',
              'parent.addEventListener("click", handler);          // bubble phase',
              'child.addEventListener("click", handler);           // target phase',
              '',
              'child.click();  // trigger order:',
              '// 1. document (capture)',
              '// 2. parent (capture)',
              '// 3. child (target)',
              '// 4. parent (bubble)',
              '// 5. document (bubble)',
            ],
            language: 'javascript',
            steps: [
              {
                title: 'Capture phase',
                description: 'The event propagates down from document to the target element\'s parent. addEventListener listens on the capture phase when the third argument is true.',
                highlightLines: [1, 6, 7],
              },
              {
                title: 'Target phase',
                description: 'The event reaches the target element. Listeners on the target fire in registration order; capture/bubble is not distinguished.',
                highlightLines: [3, 8],
              },
              {
                title: 'Bubble phase',
                description: 'The event bubbles up from the target to document. Listeners default to the bubble phase (third argument is false).',
                highlightLines: [2, 9, 10],
              },
              {
                title: 'Event delegation',
                description: 'Uses bubbling to listen for child element events on a parent. e.target is the actual triggering element; e.currentTarget is the element the listener is bound to.',
                highlightLines: [1, 2, 3],
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'javascript',
          filename: 'Event delegation',
          code: `// Event delegation: listen for all child clicks on the parent
const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
  // e.target: the actually clicked element
  // e.currentTarget: the element the listener is bound to (list)
  if (e.target.matches('li.item')) {
    console.log('Clicked:', e.target.textContent);
    e.target.classList.toggle('selected');
  }
});

// Dynamically added children automatically get the event handling
list.innerHTML += '<li class="item">New item</li>';

// Stop propagation and default behavior
button.addEventListener('click', (e) => {
  e.stopPropagation();  // stop bubbling
  e.preventDefault();   // stop default behavior (e.g. link navigation)
  e.stopImmediatePropagation(); // stop other listeners on the same element
});`,
        },
        {
          id: 'p5-4',
          type: 'callout',
          variant: 'tip',
          title: 'Benefits of event delegation',
          text: 'One parent listener replaces 100 child listeners, saving memory. Dynamically added elements need no rebinding. Note: non-bubbling events like focus/blur need focusin/focusout instead.',
        },
      ],
    },

    // ========================================================================
    // KP 6: Async Programming
    // ========================================================================
    {
      order: 6,
      title: 'Async Programming',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          text: 'JavaScript is single-threaded and achieves asynchrony via the event loop. Async programming has evolved from callbacks to Promise to async/await.',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'console.log("1");                    // sync',
              '',
              'setTimeout(() => {',
              '  console.log("2");                  // macrotask',
              '}, 0);',
              '',
              'Promise.resolve().then(() => {',
              '  console.log("3");                  // microtask',
              '});',
              '',
              'console.log("4");                    // sync',
              '',
              '// Output order: 1 → 4 → 3 → 2',
            ],
            language: 'javascript',
            steps: [
              {
                title: 'Run sync code',
                description: 'The main thread runs console.log("1") and console.log("4"). The setTimeout callback enters the macrotask queue; the Promise.then callback enters the microtask queue.',
                highlightLines: [1, 11, 13],
                output: '1\n4',
              },
              {
                title: 'Drain the microtask queue',
                description: 'After sync code finishes, all microtasks are drained. The Promise.then callback runs and outputs "3".',
                highlightLines: [8, 9],
                output: '3',
              },
              {
                title: 'Take one macrotask',
                description: 'Once the microtask queue is empty, one macrotask runs. The setTimeout callback runs and outputs "2".',
                highlightLines: [3, 4],
                output: '2',
              },
              {
                title: 'Final output order',
                description: 'Sync code → microtasks (Promise) → macrotasks (setTimeout). That is 1 → 4 → 3 → 2.',
                highlightLines: [15],
                output: '1 → 4 → 3 → 2',
              },
            ],
          },
        },
        {
          id: 'p6-3',
          type: 'code',
          language: 'javascript',
          filename: 'async/await',
          code: `// Promise chaining
function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(user => user)
    .catch(err => console.error(err));
}

// async/await: write async code synchronously
async function fetchUserAsync(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const user = await res.json();
    return user;
  } catch (err) {
    console.error(err);
  }
}

// Concurrent requests
async function fetchUsers(ids) {
  // Promise.all: returns only when all succeed; rejects on any failure
  const users = await Promise.all(ids.map(id => fetchUserAsync(id)));
  return users;
}

// Promise.allSettled: waits for all to settle (success or failure)
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});`,
        },
        {
          id: 'p6-4',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'horizontal',
            items: [
              { time: 'Stage 1', title: 'Callbacks', description: 'Callback hell, inversion of control, hard error handling.', status: 'done' },
              { time: 'Stage 2', title: 'Promise', description: 'Chaining, unified error handling, three states.', status: 'done' },
              { time: 'Stage 3', title: 'Generator + co', description: 'Sync-style async code; needs manual driving.', status: 'done' },
              { time: 'Stage 4', title: 'async/await', description: 'Syntactic sugar; sync-style writing; try/catch error handling.', status: 'active' },
              { time: 'Stage 5', title: 'Top-level await', description: 'ES2022; await directly at the top level of a module.', status: 'active' },
            ],
          },
        },
        {
          id: 'p6-5',
          type: 'demo',
          visualizationType: 'event-loop',
          data: {
            title: 'Event Loop visualization · Call Stack / microtasks / macrotasks',
            steps: [
              { action: 'push', target: 'stack', label: "console.log('1')" },
              { action: 'log', message: '1' },
              { action: 'pop', target: 'stack' },
              { action: 'push', target: 'stack', label: 'setTimeout(cb)' },
              { action: 'push', target: 'macro', label: 'cb (timeout)' },
              { action: 'pop', target: 'stack' },
              { action: 'push', target: 'stack', label: 'Promise.then(cb)' },
              { action: 'push', target: 'micro', label: 'cb (promise)' },
              { action: 'pop', target: 'stack' },
              { action: 'push', target: 'stack', label: "console.log('4')" },
              { action: 'log', message: '4' },
              { action: 'pop', target: 'stack' },
              { action: 'move', from: 'micro', to: 'stack', label: 'cb (promise)' },
              { action: 'log', message: '3' },
              { action: 'pop', target: 'stack' },
              { action: 'move', from: 'macro', to: 'stack', label: 'cb (timeout)' },
              { action: 'log', message: '2' },
              { action: 'pop', target: 'stack' },
            ],
          },
        },
        {
          id: 'p6-6',
          type: 'demo',
          visualizationType: 'promise-flow',
          data: {
            title: 'Promise state flow · Pending → Resolved/Rejected + chaining',
          },
        },
        {
          id: 'p6-7',
          type: 'callout',
          variant: 'warning',
          title: 'Microtasks take priority over macrotasks',
          text: 'After each macrotask runs, the entire microtask queue is drained. Promise.then is a microtask; setTimeout is a macrotask. So Promise always runs before setTimeout.',
        },
      ],
    },

    // ========================================================================
    // KP 7: Error Handling & Debugging
    // ========================================================================
    {
      order: 7,
      title: 'Error Handling & Debugging',
      difficulty: 2,
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: 'Robust error handling is essential for production-grade code. try/catch, error objects, and global error capture form a complete error-handling system.',
        },
        {
          id: 'p7-2',
          type: 'code',
          language: 'javascript',
          filename: 'Error handling',
          code: `// 1. try/catch/finally
try {
  JSON.parse(invalidJson);
} catch (err) {
  console.error(err.message);  // "Unexpected token..."
} finally {
  // runs whether success or failure (e.g. closing resources)
}

// 2. Custom errors (extending Error)
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
throw new ValidationError('Invalid email format', 'email');

// 3. async/await error handling
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Request failed:', err);
    return null;
  }
}

// 4. Global error capture
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise rejection:', e.reason);
});
window.onerror = (msg, url, line, col, err) => {
  console.error('Global error:', msg, err);
};`,
        },
        {
          id: 'p7-3',
          type: 'list',
          items: [
            'try/catch: catches sync errors; cannot catch async errors (Promise needs .catch())',
            'throw: actively throws an error; prefer throwing an Error instance over a string',
            'Custom errors: extend the Error class and add business fields (e.g. field, code)',
            'Global capture: window.onerror catches sync errors; unhandledrejection catches unhandled Promise rejections',
            'Debugging tips: console.log/warn/error, debugger breakpoints, Sources panel',
          ],
        },
        {
          id: 'p7-4',
          type: 'callout',
          variant: 'tip',
          title: 'Production error monitoring',
          text: 'Use services like Sentry or Bugsnag to collect production errors. Combined with source maps, you can map errors in minified code back to the original locations.',
        },
      ],
    },

    // ========================================================================
    // KP 8: Classes & Modules
    // ========================================================================
    {
      order: 8,
      title: 'Classes & Modules',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'ES6 Class is syntactic sugar over the prototype chain; ES Module is the official module system. Understand class inheritance and module import/export rules.',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'Class inheritance diagram',
            layers: [
              {
                name: 'Base class',
                description: 'The root of all classes here',
                components: [
                  { name: 'Animal', description: 'Base class: name and age properties; eat() and sleep() methods' },
                ],
              },
              {
                name: 'Derived classes',
                description: 'Inherit the base class via extends',
                components: [
                  { name: 'Dog', description: 'Extends Animal; adds bark()' },
                  { name: 'Cat', description: 'Extends Animal; adds meow()' },
                ],
              },
              {
                name: 'Mixin',
                description: 'An alternative to multiple inheritance',
                components: [
                  { name: 'Swimmer', description: 'Mixes swim() into any class' },
                ],
              },
            ],
            flowDirection: 'top-down',
          },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'javascript',
          filename: 'Class and Module',
          code: `// ES6 Class
class Animal {
  #name;  // private field (ES2022)
  static count = 0;  // static property

  constructor(name) {
    this.#name = name;
    Animal.count++;
  }

  get name() { return this.#name; }  // getter
  eat() { console.log(\`\${this.#name} is eating\`); }
  static create(name) { return new Animal(name); }  // static method
}

class Dog extends Animal {
  constructor(name) {
    super(name);  // must call super first
  }
  bark() { console.log(\`\${this.name} says woof\`); }
  eat() { super.eat(); console.log('dog style'); }  // override
}

// ES Module
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { PI, add } from './math.js';
import * as math from './math.js';  // namespace import
import { add as plus } from './math.js';  // rename`,
        },
        {
          id: 'p8-4',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: 'ES Module system',
            items: [
              { title: 'Static import (import)', content: 'Dependencies are resolved at compile time; supports tree-shaking. import must be at the top level; cannot be inside conditional blocks.' },
              { title: 'Dynamic import (import())', content: 'Loads a module at runtime and returns a Promise. Used for code splitting and lazy loading: const mod = await import("./heavy.js");' },
              { title: 'Export styles', content: 'Named exports export { a, b } can be exported multiple times; default export export default X is one per module. When mixed, the default export comes first.' },
              { title: 'Strict mode', content: 'ES Modules enable strict mode by default (use strict); no need to declare it manually. At the top level, this is undefined (not window).' },
              { title: 'CommonJS interop', content: 'Node.js supports importing CommonJS modules (the default export = module.exports). But CommonJS cannot import named exports from ESM.' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 9: Storage APIs
    // ========================================================================
    {
      order: 9,
      title: 'Storage APIs',
      difficulty: 2,
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: 'Browsers provide several storage options: localStorage, sessionStorage, IndexedDB, and Cookie. The right choice depends on data volume and persistence needs.',
        },
        {
          id: 'p9-2',
          type: 'code',
          language: 'javascript',
          filename: 'Storage APIs',
          code: `// localStorage: persistent storage (only cleared manually)
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// Storing objects requires serialization
const user = { name: 'JS', age: 30 };
localStorage.setItem('user', JSON.stringify(user));
const parsed = JSON.parse(localStorage.getItem('user'));

// sessionStorage: session storage (cleared when the tab closes)
sessionStorage.setItem('temp', 'data');

// Cookie: sent to the server; small capacity (4KB)
document.cookie = 'name=JS; max-age=3600; path=/; Secure; SameSite=Strict';

// IndexedDB: large-capacity structured storage
const request = indexedDB.open('MyDB', 1);
request.onupgradeneeded = (e) => {
  const db = e.target.result;
  db.createObjectStore('users', { keyPath: 'id' });
};
request.onsuccess = (e) => {
  const db = e.target.result;
  const tx = db.transaction('users', 'readwrite');
  tx.objectStore('users').add({ id: 1, name: 'JS' });
};`,
        },
        {
          id: 'p9-3',
          type: 'list',
          items: [
            'localStorage: 5–10MB, persistent, synchronous API, stores only strings',
            'sessionStorage: 5–10MB, session-scoped, synchronous API, stores only strings',
            'IndexedDB: hundreds of MB+, persistent, async API, stores objects/files',
            'Cookie: 4KB, sent to the server, suitable for auth tokens',
            'Cache API: HTTP response cache, paired with Service Workers for offline use',
          ],
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'localStorage is synchronous and blocking',
          text: 'localStorage\'s API is synchronous; reading/writing large files blocks the main thread. Use IndexedDB (asynchronous) for large data.',
        },
      ],
    },

    // ========================================================================
    // KP 10: Regular Expressions
    // ========================================================================
    {
      order: 10,
      title: 'Regular Expressions',
      difficulty: 3,
      visualizationType: 'regex-tester',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: 'Regular expressions are used to match, replace, and extract strings. Master common metacharacters, quantifiers, groups, and assertions to handle form validation and text processing.',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'regex-tester',
          data: {
            title: 'Regex Tester · live matching and highlighting',
            defaultPattern: '\\d+',
            defaultFlags: 'g',
            defaultTestText: 'Order ID: A12345, Amount: 99.9 yuan, Phone: 13800138000',
          },
        },
        {
          id: 'p10-3',
          type: 'code',
          language: 'javascript',
          filename: 'Regex metacharacters',
          code: `// Metacharacters
.       // any character (except newline)
\\d \\D  // digit / non-digit
\\w \\W  // word char (letters, digits, _) / non-word char
\\s \\S  // whitespace / non-whitespace
^ $     // start / end of line
\\b \\B  // word boundary / non-word-boundary

// Quantifiers
*       // 0 or more
+       // 1 or more
?       // 0 or 1
{n}     // exactly n times
{n,}    // at least n times
{n,m}   // n to m times

// Groups and assertions
(abc)   // capturing group
(?:abc) // non-capturing group
(?=abc) // positive lookahead
(?!abc) // negative lookahead

// Flags
g       // global match
i       // case-insensitive
m       // multiline mode
s       // . matches newline
u       // unicode mode
y       // sticky mode`,
        },
      ],
    },

    // ========================================================================
    // KP 11: Prototype Chain
    // ========================================================================
    {
      order: 11,
      title: 'Prototype Chain',
      difficulty: 4,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: 'The prototype chain is the core mechanism of JavaScript inheritance. Every object has a __proto__ pointing to its constructor\'s prototype. Understanding the prototype chain helps you understand this, inheritance, and class.',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'Prototype chain structure',
            layers: [
              {
                name: 'Instance layer',
                description: 'Instances created by new',
                components: [
                  { name: 'dog instance', description: '__proto__ → Dog.prototype' },
                ],
              },
              {
                name: 'Constructor prototype',
                description: 'Dog.prototype',
                components: [
                  { name: 'Dog.prototype', description: 'bark() method; constructor → Dog; __proto__ → Animal.prototype' },
                ],
              },
              {
                name: 'Parent prototype',
                description: 'Animal.prototype',
                components: [
                  { name: 'Animal.prototype', description: 'eat() method; __proto__ → Object.prototype' },
                ],
              },
              {
                name: 'Root prototype',
                description: 'Object.prototype',
                components: [
                  { name: 'Object.prototype', description: 'toString(), hasOwnProperty(), etc.; __proto__ → null' },
                ],
              },
            ],
            flowDirection: 'bottom-up',
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'javascript',
          filename: 'Prototype chain',
          code: `// Prototype chain lookup
function Animal(name) { this.name = name; }
Animal.prototype.eat = function() { console.log(this.name + ' eats'); };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);  // inherit
Dog.prototype.constructor = Dog;  // fix constructor
Dog.prototype.bark = function() { console.log(this.name + ' barks'); };

const dog = new Dog('Rex');
dog.bark();  // 'Rex barks' (own prototype)
dog.eat();   // 'Rex eats' (found up the chain at Animal.prototype)

// Prototype chain lookup order
dog.__proto__ === Dog.prototype;           // true
Dog.prototype.__proto__ === Animal.prototype; // true
Animal.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;       // true (end of chain)

// instanceof checks along the prototype chain
dog instanceof Dog;     // true
dog instanceof Animal;  // true
dog instanceof Object;  // true

// Class is syntactic sugar over the prototype chain
class Cat extends Animal {
  meow() { console.log(this.name + ' meows'); }
}
// Equivalent to the prototype chain inheritance above, but cleaner`,
        },
        {
          id: 'p11-4',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Comparison',
            columns: ['Prototype chain inheritance', 'Class inheritance'],
            rows: [
              { feature: 'Syntax', values: ['Dog.prototype = Object.create(Animal.prototype)', 'class Dog extends Animal {}'] },
              { feature: 'constructor fix', values: ['Manual', 'Automatic'] },
              { feature: 'super call', values: ['Animal.call(this, name)', 'super(name)'] },
              { feature: 'Static methods', values: ['Dog.staticMethod = fn', 'static method() {}'] },
              { feature: 'Private fields', values: ['Convention _name (not truly private)', '#name (truly private)'] },
              { feature: 'Recommendation', values: ['❌ Legacy code', '✓ Modern code'] },
            ],
            highlightColumn: 1,
          },
        },
      ],
    },

    // ========================================================================
    // KP 12: Map / Set / WeakMap
    // ========================================================================
    {
      order: 12,
      title: 'Map / Set / WeakMap',
      difficulty: 2,
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: 'Map and Set are collection types introduced in ES6 that fill gaps in Object and Array. WeakMap/WeakSet support weak references and help avoid memory leaks.',
        },
        {
          id: 'p12-2',
          type: 'code',
          language: 'javascript',
          filename: 'Map / Set',
          code: `// Map: key-value collection (keys can be any type, including objects)
const map = new Map();
const objKey = {};
map.set(objKey, 'value');
map.set('string', 'value2');
map.set(1, 'number key');

map.size;              // 3
map.get(objKey);       // 'value'
map.has('string');     // true
map.delete(1);         // true
map.forEach((v, k) => console.log(k, v));

// Set: a collection of unique values
const set = new Set([1, 2, 2, 3, 3, 3]);
set.size;              // 3 (auto-dedup)
set.add(4);
set.has(2);            // true
set.delete(1);

// WeakMap: keys must be objects; weak references (do not block GC)
const weakMap = new WeakMap();
let key = {};
weakMap.set(key, 'data');
weakMap.get(key);      // 'data'
key = null;            // key is reclaimed; the WeakMap entry disappears automatically
// WeakMap is not iterable and has no size property

// Use case
const metadata = new WeakMap();
function track(obj) {
  metadata.set(obj, { visited: true, time: Date.now() });
}
// When obj is reclaimed, metadata is cleaned up automatically — no leak`,
        },
        {
          id: 'p12-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'Comparison',
            columns: ['Object', 'Map', 'WeakMap'],
            rows: [
              { feature: 'Key types', values: ['string / symbol', 'any type', 'objects only'] },
              { feature: 'Key order', values: ['integer keys ascending + string keys in insertion order', 'insertion order', '—'] },
              { feature: 'size', values: ['none (need Object.keys)', 'yes', 'no'] },
              { feature: 'Iterable', values: ['yes', 'yes', 'no'] },
              { feature: 'Weak reference', values: ['no', 'no', 'yes (GC-friendly)'] },
              { feature: 'Recommended use', values: ['Config / data', 'Frequently mutated map', 'Object metadata'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 13: Proxy & Reflect
    // ========================================================================
    {
      order: 13,
      title: 'Proxy & Reflect',
      difficulty: 4,
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'Proxy can intercept fundamental operations on an object (such as property get, set, and delete). Reflect provides the default behavior for object operations. Together they enable reactive systems (the basis of Vue 3).',
        },
        {
          id: 'p13-2',
          type: 'code',
          language: 'javascript',
          filename: 'Proxy and Reflect',
          code: `// Proxy: wraps an object and intercepts operations
const handler = {
  get(target, prop, receiver) {
    console.log('get:', prop);
    return Reflect.get(target, prop, receiver);  // default behavior
  },
  set(target, prop, value, receiver) {
    console.log('set:', prop, '=', value);
    return Reflect.set(target, prop, value, receiver);
  },
  has(target, prop) {
    console.log('has:', prop);
    return Reflect.has(target, prop);
  },
  deleteProperty(target, prop) {
    console.log('delete:', prop);
    return Reflect.deleteProperty(target, prop);
  }
};

const proxy = new Proxy({ name: 'JS', age: 30 }, handler);
proxy.name;        // logs "get: name", returns 'JS'
proxy.city = 'SH'; // logs "set: city = SH"
'name' in proxy;   // logs "has: name", returns true
delete proxy.age;  // logs "delete: age"

// Use case: reactive data (Vue 3 principle)
function reactive(target) {
  return new Proxy(target, {
    get(t, p, r) {
      track(t, p);  // collect dependency
      return Reflect.get(t, p, r);
    },
    set(t, p, v, r) {
      const result = Reflect.set(t, p, v, r);
      trigger(t, p);  // trigger update
      return result;
    }
  });
}`,
        },
        {
          id: 'p13-3',
          type: 'callout',
          variant: 'tip',
          title: 'Proxy vs Object.defineProperty',
          text: 'Proxy can observe property addition and deletion, while Object.defineProperty can only observe existing properties. Vue 3 rewrote its reactivity system with Proxy, fixing Vue 2\'s inability to detect newly added properties.',
        },
      ],
    },

    // ========================================================================
    // KP 14: Iterator & Generator
    // ========================================================================
    {
      order: 14,
      title: 'Iterator & Generator',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: 'The Iterator protocol defines the traversal interface; Generator functions can pause execution. The two underpin for...of, the spread operator, destructuring, and other features.',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'function* idGenerator() {',
              '  let id = 1;',
              '  while (true) {',
              '    yield id;       // pause and return a value',
              '    id++;',
              '  }',
              '}',
              '',
              'const gen = idGenerator();',
              'gen.next(); // { value: 1, done: false }',
              'gen.next(); // { value: 2, done: false }',
              'gen.next(); // { value: 3, done: false }',
            ],
            language: 'javascript',
            steps: [
              {
                title: 'Create the Generator',
                description: 'Calling a Generator function returns an iterator object (the body is not executed yet). gen is an Iterator.',
                highlightLines: [1, 9],
              },
              {
                title: 'First next()',
                description: 'Execution runs to the first yield, pauses, and returns { value: 1, done: false }. id is now 1.',
                highlightLines: [4, 10],
                output: '{ value: 1, done: false }',
              },
              {
                title: 'Second next()',
                description: 'Resumes from the last pause, runs id++, then yields again. Returns { value: 2, done: false }.',
                highlightLines: [5, 4, 11],
                output: '{ value: 2, done: false }',
              },
              {
                title: 'Infinite sequence',
                description: 'while(true) makes the Generator produce an infinite sequence, but only one value is computed per call — no stack overflow. This is lazy evaluation.',
                highlightLines: [3, 4, 5],
              },
            ],
          },
        },
        {
          id: 'p14-3',
          type: 'code',
          language: 'javascript',
          filename: 'Iterator protocol',
          code: `// Iterator protocol: implement a next() method
const myIterator = {
  [Symbol.iterator]() {
    let n = 0;
    return {
      next() {
        if (n < 3) return { value: n++, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};

// Iterable objects can be used with for...of, spread, destructuring
for (const x of myIterator) console.log(x);  // 0 1 2
const arr = [...myIterator];  // [0, 1, 2]
const [a, b] = myIterator;    // a=0, b=1

// Generator implements Iterator (cleaner)
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
[...range(0, 5)];        // [0, 1, 2, 3, 4]
[...range(0, 10, 2)];    // [0, 2, 4, 6, 8]

// yield* delegates to another iterator
function* combined() {
  yield* [1, 2, 3];
  yield* range(4, 7);
}
[...combined()];  // [1, 2, 3, 4, 5, 6]`,
        },
      ],
    },

    // ========================================================================
    // KP 15: New ES Features (ES2020–ES2025)
    // ========================================================================
    {
      order: 15,
      title: 'New ES Features (ES2020–ES2025)',
      difficulty: 2,
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: 'JavaScript releases a new version every year. Master the key features of ES2020+ to write cleaner, safer code.',
        },
        {
          id: 'p15-2',
          type: 'code',
          language: 'javascript',
          filename: 'New ES features',
          code: `// ES2020
const x = null ?? 'default';     // nullish coalescing (default only for null/undefined)
const y = obj?.profile?.name;    // optional chaining (avoids "Cannot read property of undefined")
const big = 123456789012345678901234567890n;  // BigInt
Promise.allSettled([p1, p2]);    // wait for all to settle (success or failure)
globalThis;                      // unified global object reference

// ES2021
const s = 'foo'.replaceAll('o', 'x');  // 'fxx' (replace only replaces the first match)
Promise.any([p1, p2]);          // resolves as soon as any one succeeds
const weakRef = new WeakRef(obj);  // weak reference
const _ = 1_000_000;            // numeric separators

// ES2022
class Foo {
  #private = 1;                 // private field
  #privateMethod() {}           // private method
  static #staticPrivate = 2;    // static private
  static { /* initialization block */ }
}
arr.at(-1);                     // supports negative indices (equiv. to arr[arr.length-1])
Object.hasOwn(obj, 'key');      // safer than hasOwnProperty
'foo'.replaceAll('o', 'x');     // already in ES2021

// ES2023
arr.findLast(x => x > 2);       // search from the end
arr.toReversed();               // returns a new array (does not mutate the original)
arr.toSorted();                 // immutable sort
arr.with(0, 'new');             // immutable update at a given index

// ES2024
Object.groupBy(arr, fn);        // group by a predicate
Map.groupBy(arr, fn);           // Map version
Promise.withResolvers();        // destructure resolve/reject
String.prototype.isWellFormed(); // check UTF-16 well-formedness`,
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: 'Baseline standard',
          text: 'The modern web platform uses Baseline to indicate feature compatibility. "Widely Available" means all major browsers support it — safe to use. "Newly Available" means it has just become widespread — evaluate compatibility first.',
        },
      ],
    },

    // ========================================================================
    // KP 16: Hands-on: Todo App
    // ========================================================================
    {
      order: 16,
      title: 'Hands-on: Todo App',
      difficulty: 3,
      visualizationType: 'todo-app',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          text: 'Combine data types, array methods, event handling, and localStorage to build a complete Todo app. Below is an interactive Todo app supporting CRUD, filtering, and persistence.',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'todo-app',
          data: {
            title: 'Todo App · CRUD + filtering + localStorage persistence',
            initialTodos: [
              { text: 'Learn JavaScript basics', completed: true },
              { text: 'Master async programming', completed: false },
              { text: 'Understand the prototype chain', completed: false },
              { text: 'Build the Todo app hands-on', completed: false },
            ],
          },
        },
        {
          id: 'p16-3',
          type: 'callout',
          variant: 'tip',
          title: 'Implementation in React',
          text: 'In React, use useState to manage state and useEffect to persist to localStorage. State updates must return a new array (immutable update); never mutate state directly.',
        },
      ],
    },

    // ========================================================================
    // KP 17: Hands-on: Hand-written debounce & throttle
    // ========================================================================
    {
      order: 17,
      title: 'Hands-on: Hand-written debounce & throttle',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'debounce and throttle are two essential tools for front-end performance optimization. Both use closures to hold a timer / timestamp. This hands-on ties together closures, timers, this, and higher-order functions — a frequent interview and engineering topic.',
        },
        {
          id: 'p17-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'Search-box debouncing, scroll throttling, and anti-double-click all rely on these two functions. Writing them by hand makes "closures holding variable references" and "higher-order functions returning new functions" click as real engineering value, beyond just calling lodash.',
        },
        {
          id: 'p17-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Implement debounce and throttle in the skeleton below. The task list on the right checks your code live and gives teaching hints.',
            initialCode: `// Hands-on: hand-written debounce and throttle
// Tip: both use a closure to hold a "timer" or "last execution time"

// 1. debounce: runs only after the event stops firing for wait ms; retriggers reset the timer
function debounce(fn, wait) {
  // TODO: use let timer to hold the timer (closure)
  // TODO: return a new function: clearTimeout the old timer, then setTimeout again

}

// 2. throttle: runs at most once per wait ms; dilutes the trigger frequency
function throttle(fn, wait) {
  // TODO: use let lastTime = 0 to hold the last execution time (closure)
  // TODO: return a new function: use Date.now() - lastTime to check the interval; run only when reached, then update lastTime

}

// Test (feel free to modify and observe behavior)
const log = (v) => console.log(v);
const debounced = debounce(log, 300);
const throttled = throttle(log, 300);`,
            checks: [
              {
                description: 'Define the debounce function',
                pattern: 'function\\s+debounce\\s*\\(',
                hint: 'Declare the debounce function as function debounce(fn, wait), taking a callback and a wait time.',
              },
              {
                description: 'debounce uses a closure to hold the timer',
                pattern: 'let\\s+timer|var\\s+timer|let\\s+timeout',
                hint: 'Inside debounce, use let timer = null to hold the timer reference — this is the closure "holding a variable" in action.',
              },
              {
                description: 'debounce clears the old timer on every trigger',
                pattern: 'clearTimeout',
                hint: 'Every trigger should clearTimeout(timer) before setTimeout again, otherwise you cannot "reset the timer".',
              },
              {
                description: 'debounce returns a new function (higher-order function)',
                pattern: 'return\\s+function|return\\s*\\([^)]*\\)\\s*=>',
                hint: 'debounce should return a new function; the caller gets the wrapped function — a typical higher-order function pattern.',
              },
              {
                description: 'Define the throttle function',
                pattern: 'function\\s+throttle\\s*\\(',
                hint: 'Declare the throttle function as function throttle(fn, wait).',
              },
              {
                description: 'throttle uses a timestamp to check the interval',
                pattern: 'Date\\.now\\(\\)|performance\\.now',
                hint: 'Throttle records the last execution time and checks Date.now() - lastTime >= wait to decide whether to run; if so, run and update lastTime.',
              },
            ],
          },
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: edges and pitfalls',
          text: 'Note the leading/trailing options: debounce defaults to trailing only (after stop); a leading call requires an extra parameter; throttle must decide whether to fire at the start and end. Also, if the closure-held timer is not cleaned up on component unmount, it leaks; in React, clearTimeout in the useEffect cleanup.',
        },
      ],
    },

    // ========================================================================
    // KP 18: Hands-on: Implement a Pub/Sub EventEmitter
    // ========================================================================
    {
      order: 18,
      title: 'Hands-on: Implement a Pub/Sub EventEmitter',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: 'Pub/Sub is the core pattern for decoupling module communication — Node\'s EventEmitter, browser events, and Vue buses are all based on it. This hands-on ties together class, this binding, Map collections, and array methods; it is the cornerstone for understanding reactivity and component communication.',
        },
        {
          id: 'p18-2',
          type: 'callout',
          variant: 'tip',
          title: 'Why this exercise matters',
          text: 'Hand-writing an EventEmitter connects three main threads: class design, this binding, and data-structure choice. Once you understand it, Vue\'s $emit/$on, Node streams, and Redux subscribe all share the same essence.',
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: 'Implement a complete EventEmitter in the skeleton below. The task list on the right checks the key methods live.',
            initialCode: `// Hands-on: implement a Pub/Sub EventEmitter
// Tip: use a Map to store "event name → callback array"; mind the this binding

class EventEmitter {
  // TODO: constructor initializes event storage, e.g. this.events = new Map()

  // TODO: on(event, listener) subscribe: add listener to the corresponding array (initialize on first use)

  // TODO: emit(event, ...args) trigger: iterate and call all listeners for the event, passing args

  // TODO: off(event, listener) unsubscribe: remove the given listener from the array (filter, don't clear)

  // TODO (optional): once(event, listener) subscribe once: auto-off after firing
}

// Test
const bus = new EventEmitter();
const onLogin = (user) => console.log('Login:', user);
bus.on('login', onLogin);
bus.emit('login', { name: 'JS' });  // should log: Login: { name: 'JS' }
bus.off('login', onLogin);
bus.emit('login', { name: 'TS' });  // no output (unsubscribed)`,
            checks: [
              {
                description: 'Define the EventEmitter class',
                pattern: 'class\\s+EventEmitter',
                hint: 'Define the pub/sub class with class EventEmitter { ... }, not a plain constructor function.',
              },
              {
                description: 'constructor initializes event storage',
                pattern: 'constructor\\s*\\(',
                hint: 'Initialize event storage in the constructor (e.g. this.events = new Map() or {}) so on/emit/off can share state.',
              },
              {
                description: 'Implement on(event, listener) for subscribing',
                pattern: '\\bon\\s*\\(',
                hint: 'Implement on: push the listener into the array for the event; initialize to [] if it does not exist.',
              },
              {
                description: 'Implement emit(event, ...args) for triggering',
                pattern: '\\bemit\\s*\\(',
                hint: 'Implement emit: iterate the callback array for the event and call each, passing args through.',
              },
              {
                description: 'Implement off(event, listener) for unsubscribing',
                pattern: '\\boff\\s*\\(',
                hint: 'Implement off: use filter to remove the given listener from the array; do not clear the whole array (you would drop other subscriptions).',
              },
              {
                description: 'Use Map or object for event storage',
                pattern: 'new\\s+Map|this\\.events',
                hint: 'Prefer new Map() (any key type, has size, better for frequent add/remove) or a plain object {} for event storage.',
              },
            ],
          },
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'warning',
          title: 'Reflection: memory and edges',
          text: 'Forgetting to call off is a common source of leaks — listeners hold outer references, and a long-lived event bus prevents subscribers from being GC\'d. In production, add once, namespaces, and removeAllListeners, and use WeakMap for weak-reference subscriptions when needed.',
        },
      ],
    },

    // ========================================================================
    // KP 19: Interview Questions
    // ========================================================================
    {
      order: 19,
      title: 'Interview Questions',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: 'High-frequency JS interview topics: closures, the prototype chain, this, the event loop, and Promise. Understanding the principles matters more than memorizing answers.',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            title: 'High-frequency interview questions (incl. scenario / comparison questions)',
            items: [
              {
                title: 'Q1: Explain closures and their use cases',
                content: 'A closure is the combination of a function and its lexical environment. An inner function can access the outer function\'s variables even after the outer function has returned.\n\nUse cases:\n1. Module pattern (private variables)\n2. Currying\n3. Debounce / throttle\n4. Event listeners\n\nNote: closures hold variable references; if a closure lives long (e.g. an unremoved listener) it may leak. Unbind in time or use WeakMap.',
              },
              {
                title: 'Q2: Why does typeof null return "object"?',
                content: 'When JS was born, values were stored in memory with type tags. The object type tag had low bits 000, and null on most platforms was represented as a null pointer (all zeros), so typeof misjudged it as "object".\n\nThis is a legacy bug that cannot be fixed (it would break compatibility). For precise null checks use value === null.',
              },
              {
                title: 'Q3: Difference between == and ===',
                content: 'Differences:\n\n== loose equality:\n- Triggers implicit type conversion.\n- e.g. 0 == "" is true.\n- Rules are complex and error-prone.\n\n=== strict equality:\n- No type conversion.\n- Different types → false.\n\nRecommendation: always use ===; for explicit conversion use Number()/String(). Use Object.is() in special cases (handles NaN and ±0).',
              },
              {
                title: 'Q4: Explain the Event Loop',
                content: 'JS is single-threaded and handles async via the event loop.\n\nFlow:\n1. The main thread runs sync code.\n2. Drain the microtask queue (Promise.then, queueMicrotask, MutationObserver).\n3. UI rendering.\n4. Take one macrotask (setTimeout, I/O, UI events).\n5. Loop.\n\nKey rule: microtasks take priority over macrotasks. After each macrotask, all microtasks are drained — so Promise.then always runs before setTimeout.',
              },
              {
                title: 'Q5: var / let / const differences',
                content: 'var:\n- Function scope.\n- Hoisted (initialized to undefined).\n- Can be redeclared.\n\nlet:\n- Block scope.\n- Temporal Dead Zone (TDZ).\n- Cannot be redeclared.\n\nconst:\n- Block scope.\n- Must be initialized.\n- Cannot be reassigned (but object properties can mutate).\n\nRecommendation: const by default, let for mutable, avoid var. TDZ makes let/const throw ReferenceError when accessed before declaration.',
              },
              {
                title: 'Q6: Differences between arrow functions and regular functions',
                content: 'Arrow functions:\n- No own this (inherits from the outer lexical scope).\n- No arguments.\n- Cannot be used as constructors (no new).\n- No prototype.\n\nGood for: callbacks and any place needing lexical this.\n\nBad for:\n- Object methods (this does not point to the object).\n- Cases needing arguments.\n\nA regular function\'s this is determined by how it is called (default / implicit / explicit / new binding).',
              },
              {
                title: 'Q7: Explain the prototype chain and how instanceof works',
                content: 'Every object has a __proto__ pointing to its constructor\'s prototype. Property access walks up the chain:\n\n__proto__ → constructor.prototype → ... → Object.prototype → null\n\ninstanceof: walks the prototype chain checking whether the right-hand constructor\'s prototype appears on the left-hand object\'s chain.\n\nclass extends is syntactic sugar over prototype-chain inheritance; super() calls the parent constructor and sets up the chain automatically.',
              },
              {
                title: 'Q8: What are the this binding rules?',
                content: 'Four rules (priority low → high):\n1. Default binding — standalone call; window in non-strict, undefined in strict mode.\n2. Implicit binding — obj.fn() → this is obj.\n3. Explicit binding — call/apply/bind specify this; bind is permanent.\n4. new binding — this is the newly created object; highest priority.\n\nArrow functions do not follow these rules; this is decided by the outer lexical scope.\n\nBeware implicit loss: assigning an object method to a variable and calling it degrades to default binding.',
              },
              {
                title: 'Q9: The three Promise states and how chaining works',
                content: 'States:\n- pending (in progress)\n- fulfilled (resolved)\n- rejected\n\nOnce changed, the state is irreversible.\n\nChaining:\n- then returns a new Promise.\n- The callback\'s return value is wrapped with Promise.resolve.\n- Returning a thenable makes the new Promise follow it.\n- Throwing puts it into rejected.\n\n.catch is sugar for .then(null, onRejected). Any unhandled rejection in the chain bubbles to the nearest catch.',
              },
              {
                title: 'Q10: How async/await works and error handling',
                content: 'Principle:\n- async functions always return a Promise; the return value is wrapped with Promise.resolve.\n- await pauses the function until the Promise settles.\n- Essentially syntactic sugar over Generator + auto-runner.\n\nError handling: wrap await in try/catch (equivalent to Promise\'s .catch).\n\nFor concurrency: use Promise.all with await to save time.\n\nPitfall: serial independent awaits waste time — use Promise.all to run them concurrently.',
              },
              {
                title: 'Q11: ES Module vs CommonJS',
                content: 'Differences:\n\nESM:\n- Compile-time static analysis; supports tree-shaking.\n- import must be at top level; loaded async.\n- Exports are live bindings (changes by the exporter are visible).\n- Strict mode by default; top-level this is undefined.\n\nCommonJS:\n- Runtime, synchronous loading.\n- require can be inside conditionals.\n- Exports are value copies.\n\nNode lets ESM import CommonJS (default export = module.exports); the reverse is limited.',
              },
              {
                title: 'Q12: Differences between debounce and throttle and key implementation points',
                content: 'debounce:\n- Runs once n seconds after the event stops.\n- Retrigger within the window resets the timer.\n- For search inputs, window resize.\n\nthrottle:\n- Runs at most once per n seconds; dilutes frequency.\n- For scroll, drag.\n\nImplementation:\n- debounce: setTimeout + clearTimeout to reset the timer.\n- throttle: Date.now() to check the interval.\n- leading/trailing decide whether to fire at the start/end.\n\nBoth use a closure to hold the timer / timestamp.',
              },
              {
                title: 'Q13 [Scenario]: A page gets laggier over time — how do you troubleshoot JS memory leaks?',
                content: 'Path:\n1. Chrome DevTools Memory panel: take two heap snapshots and Diff to find unreleased objects.\n2. Performance Monitor: watch JS heap size; if it keeps growing and never falls back, suspect a leak.\n3. Common leak sources: unremoved event listeners, closures holding large objects, detached-DOM references, uncleared timers, accidental globals, using Map where WeakMap was appropriate.\n4. Fix: removeEventListener in time, clearInterval/timeout, use WeakMap for metadata, avoid unused refs in closures.\n5. Verify: reproduce, force GC, and check whether the heap drops back.',
              },
              {
                title: 'Q14 [Scenario]: Existing code uses nested callbacks for 3 serial requests — slow and hard to maintain. How do you refactor?',
                content: 'Steps:\n1. Wrap the callback-style API into a Promise (new Promise + resolve/reject).\n2. For serial: use async/await for sequential code; centralized try/catch for errors.\n3. If the three requests are independent, switch to Promise.all for concurrency; total time goes from sum to max.\n4. For partial-failure tolerance use Promise.allSettled.\n5. Add timeout (Promise.race with a setTimeout reject) and cancellation (AbortController).\n6. Add retry and rate limiting.\n\nReadability, robustness, and performance all improve significantly.',
              },
              {
                title: 'Q15 [Comparison]: Promise.all / allSettled / any / race',
                content: 'All four accept an iterable of Promises and return a Promise:\n\nall:\n- Fulfilled only when all are fulfilled.\n- Rejects immediately on any rejection (fast-fail).\n- Result is an ordered value array.\n\nallSettled:\n- Waits for all to settle.\n- Result is {status, value/reason}[].\n- Never rejects.\n\nany:\n- Fulfills as soon as any one fulfills.\n- Rejects only if all reject (AggregateError).\n- Returns the first successful value.\n\nrace:\n- Adopts the result of the first to settle (success or failure).\n\nChoose: all when all must succeed; allSettled to tolerate partial failure; any when one success is enough; race for timeout control.',
              },
              {
                title: 'Q16 [Comparison]: Deep copy vs shallow copy and how to implement each',
                content: 'Shallow copy: copies one level; nested objects share references.\n- Object.assign\n- Spread ...\n- Array.slice\n\nDeep copy: recursively copies all levels; fully independent.\n\nImplementations:\n1. JSON.parse(JSON.stringify()) — simple, but drops functions/undefined/circular refs/Date.\n2. structuredClone() — modern native API; supports circular refs, Date, Map/Set; not functions.\n3. Hand-written recursion — handle circular refs with a WeakMap cache; special-case Date/RegExp.\n\nReact state updates only need a shallow copy down to the level being changed to ensure a new reference.',
              },
              {
                title: 'Q17: Explain JS\'s weak and dynamic typing',
                content: 'Dynamic typing:\n- A variable\'s type is determined at runtime.\n- The same variable can be reassigned to a different type (let x = 1; x = "a").\n\nWeak typing:\n- Frequent implicit conversions.\n- e.g. 1 + "2" → "12"; [] == false → true.\n- The engine converts types by rules when operands differ.\n\nWeak typing makes it easy to write "runs but wrong" code. TS adds static checks at compile time, but at runtime JS is still weakly typed.',
              },
              {
                title: 'Q18: Why is 0.1 + 0.2 !== 0.3? How to fix it?',
                content: 'JS uses IEEE 754 double-precision floats. 0.1 / 0.2 are infinite repeating binaries, and truncation causes rounding error; the sum is 0.30000000000000004.\n\nSolutions:\n1. Compare with Math.abs(a - b) < Number.EPSILON.\n2. For money: multiply by 100 to work in integers, then divide back.\n3. toFixed(decimals) for display (note: returns a string).\n4. For high precision: decimal.js / big.js / BigInt (integers only).\n\nIntegers within ±2^53 are represented exactly.',
              },
              {
                title: 'Q19: Explain JS garbage collection',
                content: 'V8 uses generational collection:\n\nYoung generation: Scavenge, copies survivors between From/To semispaces.\n\nOld generation: Mark-Sweep + Mark-Compact to handle fragmentation.\n\nTrigger: allocation failure.\n\nReachability analysis: objects unreachable from GC roots (globals, active stack, DOM refs) are collected.\n\nCommon leaks: accidental globals, uncleared timers/listeners, closures holding unused refs, detached DOM still referenced. WeakMap/WeakSet keys are weak refs and do not block GC.',
              },
              {
                title: 'Q20: Explain V8\'s execution flow and JIT',
                content: 'Flow:\n1. Source → Parser → AST.\n2. Ignition interpreter generates and runs bytecode (fast startup).\n3. Hot code is compiled to machine code by TurboFan (fast runtime).\n4. If type speculation fails, deopt back to bytecode.\n\nThis is why the same code is slow on first run and fast after repeated execution.\n\nUnderstanding JIT helps you write "type-stable" code (not changing object shapes on hot paths) to avoid deopt.',
              },
              {
                title: 'Q21: Module pattern and IIFE',
                content: 'IIFE (Immediately Invoked Function Expression) creates an isolated scope to avoid polluting globals:\n;(function(){ ... })()\n\nThe module pattern uses closures to encapsulate private members and expose only the public interface:\nconst Counter = (function(){ let n=0; return { inc:()=>++n, get:()=>n } })()\n\nBefore ES6, IIFE + closure was the mainstream way to get privacy and modules. After ES6, import/export + private fields # replace it, but IIFE is still useful for UMD wrappers and avoiding hoisting conflicts.',
              },
              {
                title: 'Q22: Currying — principle and implementation',
                content: 'Currying transforms a multi-arg function into a chain of single-arg functions: f(a,b,c) → f(a)(b)(c).\n\nPrinciple: use closures to collect args layer by layer; execute when enough are collected.\n\nImplementation:\nfunction curry(fn){ return function curried(...args){ return args.length >= fn.length ? fn(...args) : (...next)=>curried(...args, ...next) } }\n\nUse cases:\n1. Parameter reuse (e.g. log("INFO")("msg"))\n2. Delayed execution\n3. Function composition\n\nLodash\'s _.curry supports placeholders.',
              },
              {
                title: 'Q23 [Comparison]: call / apply / bind differences',
                content: 'All three explicitly bind this:\n\ncall(thisArg, arg1, arg2...)\n- Invokes immediately.\n- Args passed one by one.\n\napply(thisArg, [args])\n- Invokes immediately.\n- Args as an array.\n- Good for spreading arrays, e.g. Math.max.apply(null, arr).\n\nbind(thisArg, ...args)\n- Does not invoke immediately.\n- Returns a new function with this permanently bound.\n- Supports partial application.\n\nNote: a bind-returned function has this locked; calling .call on it cannot change it. Arrow functions have no this; all three are no-ops on them.',
              },
              {
                title: 'Q24: What does the new operator do?',
                content: 'new Fn(args) does four things:\n1. Creates a new empty object obj.\n2. Sets obj.__proto__ = Fn.prototype (sets up the prototype chain).\n3. Calls Fn with this = obj to initialize instance properties.\n4. If Fn returns an object, returns that; otherwise returns obj.\n\nHand-written:\nfunction myNew(Fn, ...args){ const obj = Object.create(Fn.prototype); const res = Fn.apply(obj, args); return res instanceof Object ? res : obj }\n\nclass is sugar over new + the prototype chain.',
              },
              {
                title: 'Q25: Hand-write a minimal Promise',
                content: 'Core: a state machine + then chaining.\n\nKey points:\n1. Three states pending/fulfilled/rejected; irreversible.\n2. resolve/reject wrapped in setTimeout to ensure async.\n3. then returns a new Promise; its state is decided by the callback\'s return value (thenable follow, plain value resolve, throw reject).\n4. Use an array of then callbacks to support multiple .then calls.\n\nA full impl also handles resolvePromise circular refs and value pass-through.\n\nHand-writing Promise is the only way to truly understand async/await (which is Promise + Generator underneath).',
              },
              {
                title: 'Q26: Macrotasks vs microtasks and common types',
                content: 'Microtasks:\n- Promise.then/catch/finally\n- queueMicrotask\n- MutationObserver\n- process.nextTick (Node)\n\nMacrotasks:\n- setTimeout/setInterval\n- setImmediate (Node)\n- I/O\n- UI events\n- MessageChannel\n- requestAnimationFrame (in some impls treated as a separate queue)\n\nDifferences:\n- After each macrotask (and before UI render), all microtasks are drained.\n- Only when the microtask queue is empty does the next macrotask run.\n- So Promise.then always runs before setTimeout.\n\nAn infinite microtask loop blocks the page (the queue never drains).',
              },
              {
                title: 'Q27: What requestAnimationFrame does and how it differs from setTimeout',
                content: 'rAF schedules the callback before the next repaint, aligned with the display refresh rate (typically 60fps / 16.67ms).\n\nAdvantages:\n1. Synced with rendering — no dropped frames.\n2. Paused automatically in background tabs — saves resources.\n3. More accurate than manual setTimeout(fn, 16).\n\nGood for animation loops:\nfunction loop(){ update(); draw(); requestAnimationFrame(loop) }\n\nTo stop, save the id and call cancelAnimationFrame(id). Not suitable for short precise delays (rAF does not guarantee an exact millisecond count).',
              },
              {
                title: 'Q28: Set / Map / WeakMap / WeakSet differences and use cases',
                content: 'Set: a collection of unique values; auto-dedup; has has/add/delete; iterable.\n\nMap: key-value; keys can be any type (including objects); preserves insertion order; has size; better than Object for frequent add/remove.\n\nWeakMap: keys must be objects and are weak refs (do not block GC); not iterable; no size; good for attaching metadata to objects (e.g. DOM nodes) without blocking reclaim.\n\nWeakSet: a weak-ref set of objects; good for tagging objects (e.g. "processed") without affecting their lifetime.\n\nKey: strong refs (Map/Set) block GC; weak refs do not.',
              },
              {
                title: 'Q29 [Comparison]: Proxy vs Object.defineProperty',
                content: 'defineProperty:\n- Can only hijack existing properties; cannot detect add/delete (Vue 2 needs $set/$delete).\n- Cannot observe array index/length changes (Vue 2 overrides 7 array methods).\n- Deep observation requires a one-time recursive walk.\n\nProxy:\n- Wraps the whole object; observes add/delete (deleteProperty), array ops, in — 13 traps in total.\n- Lazy proxying (recurses on access) performs better.\n- Vue 3 builds its reactivity on this.\n\nNote: Proxy cannot directly wrap primitives; Vue 3 uses ref to wrap them. Reflect provides default behavior matching each Proxy trap; recommended to use together.',
              },
              {
                title: 'Q30: Iterator and Generator principles',
                content: 'Iterator:\n- Implement [Symbol.iterator]() returning an object with next().\n- next() returns {value, done}.\n- for...of, spread, destructuring all rely on the iterable protocol.\n\nGenerator:\n- Declared with function*.\n- yield pauses and returns a value; next() resumes; you can pass a value as the result of the previous yield.\n- A generator is both an iterator and an iterable.\n\nUse cases: custom data-structure traversal, lazy evaluation (infinite sequences), state machines.\n\nasync/await borrows Generator\'s pause/resume semantics but is built on Promise.',
              },
              {
                title: 'Q31 [Scenario]: Backend returns deeply nested data — how to access it safely without errors',
                content: 'Scenario: accessing user.company.address.city; any layer being null/undefined throws.\n\nOptions:\n1. Chained && short-circuit: user && user.company && user.company.address && user.company.address.city — verbose.\n2. Optional chaining ?.: user?.company?.address?.city — clean; returns undefined instead of throwing.\n3. With nullish coalescing for a default: user?.company?.address?.city ?? "Unknown".\n4. Utility get(obj, path, default) using reduce to walk layer by layer.\n\nNote: ?. only short-circuits on null/undefined, not 0/""/false. Function calls support fn?.() as well.',
              },
              {
                title: 'Q32 [Scenario]: Array deduplication options — pros and cons',
                content: 'Options:\n1. [...new Set(arr)] — clean, but cannot distinguish objects (different references).\n2. filter + indexOf — keep first occurrence; O(n²).\n3. reduce + includes — same O(n²).\n4. Map/Set recording keys — O(n).\n5. Object dedup needs a custom key (e.g. JSON.stringify or an id field) with Map.\n\nOrder-preserving dedup: Set keeps first occurrence order.\n\nNote on NaN: Set treats NaN === NaN (dedup works), but indexOf cannot find NaN (NaN !== NaN).',
              },
              {
                title: 'Q33 [Comparison]: forEach / map / filter / reduce differences',
                content: 'forEach(fn):\n- Iterates; returns nothing.\n- Cannot break/continue (return only skips the current iteration).\n- Good for side effects.\n\nmap(fn):\n- Returns a new array; each item is fn\'s return value.\n- Good for data transformation.\n\nfilter(fn):\n- Returns a new array of items for which fn returned truthy.\n\nreduce(fn, init):\n- Accumulates; fn receives (acc, cur, idx, arr).\n- Good for aggregation (sum / group / flatten).\n\nNone mutate the original (unless fn does). Chaining: arr.filter(...).map(...).reduce(...) is a typical functional style. To exit early, use for...of or some/every.',
              },
              {
                title: 'Q34 [Comparison]: Object vs Map differences and choosing',
                content: 'Key types:\n- Object: string / symbol only.\n- Map: any type (including objects, DOM nodes).\n\nOrder:\n- Object: integer keys first (complex rules).\n- Map: strict insertion order.\n\nPerformance:\n- Map is better for frequent add/remove; has size O(1).\n\nSerialization:\n- Object: JSON.stringify directly.\n- Map: needs conversion to array.\n\nIteration:\n- Object: Object.keys/entries.\n- Map: for...of or forEach directly.\n\nChoose: Object for config / data transfer (JSON-friendly); Map for dynamic mappings, object keys, or frequent mutations. WeakMap for metadata.',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // KP 20: Cheat Sheet
    // ========================================================================
    {
      order: 20,
      title: 'Cheat Sheet',
      difficulty: 1,
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: 'A condensed reference of JS core syntax and high-frequency APIs — quickly locate key points and common pitfalls when reviewing.',
        },
        {
          id: 'p20-2',
          type: 'table',
          caption: 'JavaScript core knowledge cheat sheet',
          headers: ['Topic', 'Core API / syntax', 'Key tips'],
          rows: [
            ['Data types', 'typeof / instanceof / Array.isArray', '7 primitives + reference; typeof null === "object" is a legacy bug'],
            ['Type conversion', 'Number() / String() / Boolean() / parseInt()', 'Prefer explicit; 6 falsy values; [] and {} are truthy'],
            ['Equality', '=== / == / Object.is()', 'Always use ===; Object.is distinguishes NaN and ±0'],
            ['Variable declaration', 'var / let / const', 'const first; let/const have TDZ; var is hoisted'],
            ['Scope', 'Global / function / block {}', 'let/const are block-scoped; var is function-scoped'],
            ['Closures', 'Function + lexical environment', 'Module pattern, currying, debounce/throttle; mind leaks'],
            ['this binding', 'call / apply / bind / new', 'Priority: new > explicit > implicit > default; arrows use lexical this'],
            ['Prototype chain', '__proto__ / prototype', 'Lookup up to Object.prototype → null; class is sugar'],
            ['Array methods', 'map / filter / reduce / find / some', 'Immutable updates; reduce for sum/group; chainable'],
            ['Async', 'Promise / async / await', 'then returns a new Promise; await pauses; try/catch'],
            ['Event loop', 'Macrotask / microtask', 'Microtasks first; Promise.then before setTimeout'],
            ['Modules', 'import / export / require', 'ESM static + live bindings; CJS dynamic + value copy; tree-shaking'],
            ['ES6+', 'Destructuring / spread / ?. / ?? / #', '?. guards undefined; ?? matches only null/undefined'],
            ['Classes', 'class / extends / super / #', 'Private #; static; getter/setter; super must be called first'],
            ['Collections', 'Map / Set / WeakMap', 'Map any key; Set dedup; WeakMap weak refs GC-friendly'],
            ['Proxy', 'Proxy / Reflect', 'Intercepts object ops; Vue 3 reactivity basis; Reflect defaults'],
          ],
        },
      ],
    },

    // ========================================================================
    // KP 21: Quiz
    // ========================================================================
    {
      order: 21,
      title: 'Quiz',
      difficulty: 2,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          text: 'Use this quiz to check your grasp of JavaScript core knowledge.',
        },
        {
          id: 'p21-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '[Recall] Which of the following returns "object" from typeof?',
                options: ['null', 'undefined', 'function', 'symbol'],
                correctIndex: 0,
                explanation: 'typeof null returns "object" — a legacy JS bug because null\'s low-bit type tag matches object. For precise null checks use value === null.',
              },
              {
                question: '[Recall] When does Promise.all reject?',
                options: ['When all Promises resolve', 'When any Promise rejects', 'When all Promises reject', 'When any Promise is pending'],
                correctIndex: 1,
                explanation: 'Promise.all rejects as soon as any one Promise rejects (fast-fail). For tolerating partial failure use Promise.allSettled.',
              },
              {
                question: '[Understanding] Do arrow functions have their own this and arguments?',
                options: ['Yes', 'No'],
                correctIndex: 1,
                explanation: 'Arrow functions have no own this or arguments; they inherit from the outer lexical scope. So they are unsuitable as object methods (this won\'t point to the object) or as constructors (cannot new).',
              },
              {
                question: '[Application] What does this output?\nconsole.log(1 + "2")',
                options: ['3', '"12"', 'NaN', '"3"'],
                correctIndex: 1,
                explanation: '+ performs string concatenation when either operand is a string. 1 + "2" → "12". For numeric addition, explicitly convert with Number("2").',
              },
              {
                question: '[Understanding] What is the main difference between let and var?',
                options: ['let has block scope, var has function scope', 'let can be redeclared', 'var has a TDZ', 'let is hoisted'],
                correctIndex: 0,
                explanation: 'let/const are block-scoped; var is function-scoped. let/const have a TDZ — accessing before declaration throws ReferenceError; var is hoisted and initialized to undefined.',
              },
              {
                question: '[Application] Output order?\nconsole.log(1);\nsetTimeout(()=>console.log(2));\nPromise.resolve().then(()=>console.log(3));\nconsole.log(4);',
                options: ['1 2 3 4', '1 4 3 2', '1 4 2 3', '1 3 4 2'],
                correctIndex: 1,
                explanation: 'Sync code runs first (1 4), then the microtask queue is drained (Promise.then outputs 3), then a macrotask runs (setTimeout outputs 2). Microtasks beat macrotasks → 1 4 3 2.',
              },
              {
                question: '[Understanding] What does Object.is(NaN, NaN) return?',
                options: ['false', 'true', 'undefined', 'throws'],
                correctIndex: 1,
                explanation: 'Object.is() uses the same-value algorithm; it correctly distinguishes NaN (Object.is(NaN, NaN) === true) and ±0 (Object.is(+0, -0) === false), which === cannot.',
              },
              {
                question: '[Application] Which of these achieves true privacy?',
                options: ['_name prefix convention', 'Object.defineProperty', '#name private field (ES2022)', 'Closure variable'],
                correctIndex: 2,
                explanation: 'ES2022 #name is language-level private; inaccessible outside the class. _name is just convention; Object.defineProperty is still enumerable; closure variables cannot be shared across class methods.',
              },
              {
                question: '[Understanding] Which statement about closures is correct?',
                options: ['A closure is a function plus its lexical environment', 'A closure can only access its own variables', 'A closure does not hold outer references', 'A closure cannot cause memory leaks'],
                correctIndex: 0,
                explanation: 'A closure = function + lexical environment; lets an inner function access outer variables even after the outer has returned. Closures hold references; long-lived ones (e.g. unremoved listeners) can leak.',
              },
              {
                question: '[Comparison] Difference in key types between Map and Object?',
                options: ['Both only accept strings', 'Map keys can be any type; Object keys only string/symbol', 'Object keys can be any type', 'They are exactly the same'],
                correctIndex: 1,
                explanation: 'Object keys are only string or symbol; Map keys can be any type (including objects, functions). Map preserves insertion order, has size, and is better for frequent mutations — good for mapping scenarios.',
              },
              {
                question: '[Comparison] Difference between Promise.all and Promise.allSettled?',
                options: ['Both reject on any rejection', 'all rejects on any rejection; allSettled waits for all and never rejects', 'allSettled fast-fails', 'They behave exactly the same'],
                correctIndex: 1,
                explanation: 'all rejects as soon as any one rejects (fast-fail), result is a value array; allSettled waits for all to settle, result is {status, value/reason}[], never rejects — good for tolerating partial failure.',
              },
              {
                question: '[Scenario] Search box fires a request per character, stressing the API. Best optimization?',
                options: ['Increase request timeout', 'Debounce the trigger function', 'Use sync requests', 'Disable the input'],
                correctIndex: 1,
                explanation: 'debounce runs only after the event stops for n seconds; retriggers reset the timer — it effectively merges high-frequency input into one request. throttle is better for scroll/drag where a fixed rate is needed.',
              },
              {
                question: '[Scenario] Output of:\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
                options: ['0 1 2', '3 3 3', '0 0 0', 'throws'],
                correctIndex: 1,
                explanation: 'var has no block scope; all three callbacks share the same i. The loop ends with i=3; the async callbacks all read 3. Fix: use let (creates a binding per iteration) or an IIFE to capture the current i.',
              },
              {
                question: '[Comprehensive] Output of:\nconst obj = {\n  a: 1,\n  fn() { return this.a; }\n};\nconst f = obj.fn;\nconsole.log(f());',
                options: ['1', 'undefined', 'throws', 'null'],
                correctIndex: 1,
                explanation: 'obj.fn is implicit binding (this is obj), but assigning to f and calling f() degrades to default binding; in non-strict mode this is window, which has no a → undefined. This is "implicit loss".',
              },
              {
                question: '[Comprehensive] In an async function, you await a rejected Promise without try/catch. What happens?',
                options: ['The async function\'s returned Promise rejects', 'The program crashes', 'Silently ignored', 'Becomes fulfilled'],
                correctIndex: 0,
                explanation: 'awaiting a rejected Promise throws; uncaught, the async function\'s returned Promise becomes rejected. The caller must .catch() or try/catch, otherwise unhandledrejection fires.',
              },
              {
                question: '[Recall] Which of these is NOT a JS primitive type?',
                options: ['symbol', 'bigint', 'object', 'undefined'],
                correctIndex: 2,
                explanation: 'JS has 7 primitive types: string/number/boolean/null/undefined/symbol/bigint. object is a reference type, not a primitive. typeof null === "object" is a legacy bug, but null itself is a primitive.',
              },
              {
                question: '[Application] What is 0.1 + 0.2 === 0.3?',
                options: ['true', 'false', 'throws', 'undefined'],
                correctIndex: 1,
                explanation: 'Under IEEE 754 double precision, 0.1 and 0.2 are infinite repeating binaries; truncation causes rounding error; the sum is 0.30000000000000004 ≠ 0.3. Compare with Math.abs(a-b) < Number.EPSILON; for money, work in integers.',
              },
              {
                question: '[Comparison] Key difference between WeakMap and Map?',
                options: ['WeakMap keys must be objects and are weak refs', 'WeakMap is faster', 'WeakMap is iterable', 'They are exactly the same'],
                correctIndex: 0,
                explanation: 'WeakMap keys must be objects and are weak refs (do not block GC); not iterable; no size; good for attaching metadata without blocking reclaim. Map keys can be any type, strong refs, iterable, has size. Strong refs block GC; weak refs do not.',
              },
              {
                question: '[Scenario] Output of:\nconsole.log([1,2,3].map(parseInt))',
                options: ['[1, 2, 3]', '[1, NaN, NaN]', '[1, 2, 3]', 'throws'],
                correctIndex: 1,
                explanation: 'map\'s callback signature is (item, index, array). parseInt takes (str, radix), so it actually calls parseInt(1,0)=1, parseInt(2,1)=NaN (radix 1 invalid), parseInt(3,2)=NaN (3 is not a valid binary digit). Classic trap — use x => parseInt(x, 10).',
              },
              {
                question: '[Comprehensive] Output of:\nconst a = {n: 1};\nconst b = a;\na.x = a = {n: 2};\nconsole.log(a.x, b.x);',
                options: ['{n:2} undefined', 'undefined {n:2}', '{n:2} {n:2}', 'undefined undefined'],
                correctIndex: 1,
                explanation: 'Assignment runs right to left, but the member-access expression a.x was already evaluated before assignment (when a still pointed to the old {n:1}). Equivalent to: oldObj.x = (a = {n:2}). So a points to the new {n:2} (no x → undefined), and b still points to the old object (whose x is now {n:2}). Tests assignment-evaluation order and references.',
              },
            ],
          },
        },
        {
          id: 'p21-3',
          type: 'callout',
          variant: 'tip',
          title: 'Quiz complete',
          text: 'Review the chapters for any questions you missed. Closures, the prototype chain, and the event loop are must-knows for interviews — make sure you understand them deeply.',
        },
      ],
    },
  ],
}
