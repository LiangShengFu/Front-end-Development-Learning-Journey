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
  summary: 'JS/CSS/框架/网络/浏览器/安全八股、STAR 法则、系统设计、简历面试技巧。',
  knowledgePointCount: 15,
  visualizationCount: 14,
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
              javascript: 15,
              css: 10,
              react: 13,
              network: 13,
              security: 6,
              engineering: 6,
              react19: 8,
              testing: 4,
              handwriting: 10,
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
  ],
}
