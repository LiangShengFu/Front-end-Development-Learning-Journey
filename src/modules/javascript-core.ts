/**
 * 模块 03：JavaScript 核心语法
 *
 * 严格遵循 docx/模块三.md 设计文档：
 * - 19 个知识点（18 章节 + 1 小测验）
 * - 25 个可视化演示（#1-#25）
 * - 新增 3 个知识点：JS 发展历程 / 异步编程演进 / 小测验
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - #1 知识图谱（KnowledgeGraph）
 * - #2 闭包沙盒（Sandbox）
 * - #3 事件循环流程（ArchitectureDiagram）
 * - #4 数据类型探索（CompareTable）
 * - #5 相等性比较（CompareTable）
 * - #6 类型转换（CompareTable）
 * - #7 作用域链（ArchitectureDiagram）
 * - #8 数组方法（Sandbox）
 * - #9 事件传播（CodeStepper）
 * - #10 Event Loop（CodeStepper）
 * - #11 Promise 流程（CodeStepper）
 * - #12 类继承（ArchitectureDiagram）
 * - #13 正则测试（Sandbox）
 * - #14 原型链（ArchitectureDiagram）
 * - #15 Generator（CodeStepper）
 * - #16 待办事项（Sandbox）
 * - #17 JS 发展历程（Timeline）
 * - #18 操作符优先级（CompareTable）
 * - #19 异步编程演进（Timeline）
 * - #20 作用域类型对比（CompareTable）
 * - #21 JS 内存模型（ArchitectureDiagram）
 * - #22 this 绑定规则（CodeStepper）
 * - #23 ES 模块体系（Accordion）
 * - #24 原型链 vs Class（CompareTable）
 * - #25 JavaScript 小测验（QuizCard）
 */
import type { ModuleMeta } from '../lib/types'

export const javascriptCoreModule: ModuleMeta = {
  number: '03',
  title: 'JavaScript 核心语法',
  slug: 'javascript-core',
  stage: 'basics',
  stageLabel: '基础阶段 · 第 3 模块',
  icon: '03',
  summary: '数据类型、作用域、闭包、原型链、this、事件循环、Promise、ES6+。',
  knowledgePointCount: 19,
  visualizationCount: 25,
  points: [
    // ========================================================================
    // 知识点 1：变量与数据类型
    // ========================================================================
    {
      order: 1,
      title: '变量与数据类型',
      difficulty: 2,
      visualizationType: 'datatype-explorer',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'JavaScript 是动态类型语言，变量在运行时确定类型。掌握 7 种原始类型与引用类型的区别，是理解 JS 行为的基础。',
        },
        {
          id: 'p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'js', label: 'JS 核心', group: 'core', weight: 3 },
              { id: 'types', label: '数据类型', group: 'related', weight: 2 },
              { id: 'scope', label: '作用域/闭包', group: 'related', weight: 2 },
              { id: 'proto', label: '原型链', group: 'related', weight: 2 },
              { id: 'this', label: 'this 指向', group: 'related', weight: 2 },
              { id: 'async', label: '异步编程', group: 'related', weight: 2 },
              { id: 'loop', label: '事件循环', group: 'related', weight: 2 },
              { id: 'es6', label: 'ES6+', group: 'related', weight: 2 },
            ],
            edges: [
              { source: 'js', target: 'types', label: '基础' },
              { source: 'js', target: 'scope', label: '作用域' },
              { source: 'js', target: 'proto', label: '继承' },
              { source: 'js', target: 'this', label: '上下文' },
              { source: 'js', target: 'async', label: '并发' },
              { source: 'js', target: 'loop', label: '调度' },
              { source: 'js', target: 'es6', label: '现代语法' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'code',
          language: 'javascript',
          filename: '数据类型',
          code: `// 原始类型（7 种）：表示单一值，不可变
let str = "hello";              // string
let num = 42;                   // number
let bool = true;                // boolean
let empty = null;               // null（有意缺失）
let notDefined;                 // undefined（未赋值）
let sym = Symbol("id");         // symbol（唯一标识）
let big = 9007199254740991n;    // bigint（大整数）

// 引用类型：可变，按引用访问
let obj = { name: "JS" };       // object
let arr = [1, 2, 3];            // array（特殊对象）
let fn = function() {};         // function（特殊对象）

// typeof 检测类型（注意 null 的历史遗留 bug）
typeof str;      // "string"
typeof num;      // "number"
typeof null;     // "object"  ⚠️ 历史遗留 bug
typeof fn;       // "function"
typeof arr;      // "object"  ⚠️ 无法区分数组

// 精确判断数组与对象
Array.isArray(arr);             // true
Object.prototype.toString.call(arr); // "[object Array]"`,
        },
        {
          id: 'p1-4',
          type: 'demo',
          visualizationType: 'datatype-explorer',
          data: {
            title: '数据类型探索器 · typeof / 可变性 / 分类',
            types: [
              { name: 'String', value: "'hello'", typeofResult: 'string', mutable: false, category: 'primitive', desc: '原始类型，不可变。字符串一旦创建无法修改，所有字符串方法返回新字符串。' },
              { name: 'Number', value: '42', typeofResult: 'number', mutable: false, category: 'primitive', desc: '原始类型，包括整数和浮点数（IEEE 754 双精度）。注意 0.1 + 0.2 !== 0.3。' },
              { name: 'Boolean', value: 'true', typeofResult: 'boolean', mutable: false, category: 'primitive', desc: '原始类型，只有 true 和 false 两个值。' },
              { name: 'null', value: 'null', typeofResult: 'object', mutable: false, category: 'primitive', desc: '原始类型，表示"无值"。typeof null 返回 "object" 是历史遗留 bug。' },
              { name: 'undefined', value: 'undefined', typeofResult: 'undefined', mutable: false, category: 'primitive', desc: '原始类型，变量已声明但未赋值。函数无返回值时默认 undefined。' },
              { name: 'Symbol', value: "Symbol('id')", typeofResult: 'symbol', mutable: false, category: 'primitive', desc: 'ES6 新增原始类型，唯一且不可变，常用于对象属性键避免冲突。' },
              { name: 'BigInt', value: '9007199254740991n', typeofResult: 'bigint', mutable: false, category: 'primitive', desc: 'ES2020 新增原始类型，表示任意精度大整数，后缀 n。' },
              { name: 'Object', value: "{ name: 'Alice' }", typeofResult: 'object', mutable: true, category: 'reference', desc: '引用类型，可变。按引用访问，赋值传递的是引用而非副本。' },
              { name: 'Array', value: '[1, 2, 3]', typeofResult: 'object', mutable: true, category: 'reference', desc: '引用类型，可变。typeof 无法区分数组，需用 Array.isArray()。' },
              { name: 'Function', value: '() => 1', typeofResult: 'function', mutable: true, category: 'reference', desc: '引用类型，可变。Function 是一等公民，可赋值、传参、返回。' },
            ],
          },
        },
        {
          id: 'p1-5',
          type: 'callout',
          variant: 'warning',
          title: 'typeof null === "object"',
          text: '这是 JavaScript 诞生时的历史遗留 bug。null 在内存中的低位标志位与对象相同，导致 typeof 误判。精确判断 null 应使用 value === null。',
        },
        {
          id: 'p1-6',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '1995', title: 'JavaScript 诞生', description: 'Brendan Eich 用 10 天创建 Mocha，网景 Navigator 2.0 首次集成。', status: 'done' },
              { time: '1997', title: 'ECMAScript 1', description: 'ECMA-262 标准化，统一网景与微软的实现差异。', status: 'done' },
              { time: '2005', title: 'AJAX 兴起', description: 'Google Maps/Gmail 推动 XMLHttpRequest，Web 应用崛起。', status: 'done' },
              { time: '2009', title: 'ES5 发布', description: '严格模式、JSON、Array 方法、Object.create。', status: 'done' },
              { time: '2015', title: 'ES6/ES2015', description: 'class、模块、Promise、箭头函数、let/const、解构。里程碑版本。', status: 'done' },
              { time: '2020', title: 'ES2020', description: '可选链、空值合并、BigInt、动态 import。', status: 'active' },
              { time: '2022', title: 'ES2022', description: '私有字段 #、顶层 await、Object.hasOwn。', status: 'active' },
              { time: '2024+', title: 'ES2024+', description: 'Object.groupBy、Promise.withResolvers、Temporal API。', status: 'pending' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 2：操作符与类型转换
    // ========================================================================
    {
      order: 2,
      title: '操作符与类型转换',
      difficulty: 3,
      visualizationType: 'equality-comparator',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'JavaScript 的隐式类型转换是面试高频考点，也是 bug 的常见来源。理解 == 与 === 的差异、Truthy/Falsy 规则至关重要。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'equality-comparator',
          data: {
            title: '相等性比较器 · == vs === / ?? vs ||',
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
          filename: '相等性比较',
          code: `// == 宽松相等（会触发隐式转换，避免使用）
0 == "";        // true  （都转为 0）
0 == "0";       // true  （"0" 转为 0）
"" == "0";      // false （都为字符串，不转换）
null == undefined; // true（特殊规则）
null == 0;      // false（null 只与 undefined/自身相等）

// === 严格相等（推荐，不转换类型）
0 === "";       // false
0 === "0";      // false
null === undefined; // false

// Object.is() 处理特殊值
Object.is(NaN, NaN);  // true（=== 返回 false）
Object.is(+0, -0);    // false（=== 返回 true）

// Falsy 值（6 个）：false / 0 / "" / null / undefined / NaN
// Truthy 值：除 Falsy 外的所有值（包括 []、{}、"0"、"false"）
Boolean([]);    // true  ⚠️ 空数组是 truthy
Boolean({});    // true  ⚠️ 空对象是 truthy
Boolean("0");   // true  ⚠️ 非空字符串是 truthy`,
        },
        {
          id: 'p2-5',
          type: 'callout',
          variant: 'tip',
          title: '显式转换优于隐式转换',
          text: '使用 Number()、String()、Boolean() 显式转换，避免依赖 == 和 + 的隐式规则。代码更清晰，bug 更少。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：函数与闭包
    // ========================================================================
    {
      order: 3,
      title: '函数与闭包',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: '闭包是函数与其词法环境的组合，使内部函数可以访问外部函数的变量。闭包是模块模式、柯里化、防抖节流等高级技巧的基础。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '闭包计数器工厂：每次调用 createCounter 创建独立的计数器',
            initialCode: `// 闭包计数器工厂
function createCounter(initial = 0) {
  let count = initial;  // 被闭包捕获的私有变量
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => { count = initial; return count; }
  };
}

// 创建两个独立的计数器
const counter1 = createCounter(0);
const counter2 = createCounter(10);

console.log('counter1:', counter1.increment()); // 1
console.log('counter1:', counter1.increment()); // 2
console.log('counter2:', counter2.getValue());  // 10（独立）
console.log('counter1:', counter1.getValue());  // 2（不受影响）`,
          },
        },
        {
          id: 'p3-3',
          type: 'code',
          language: 'javascript',
          filename: '闭包应用',
          code: `// 1. 模块模式：封装私有变量
const Counter = (function() {
  let privateCount = 0;  // 私有变量
  function changeBy(val) { privateCount += val; }
  return {
    increment: () => changeBy(1),
    decrement: () => changeBy(-1),
    value: () => privateCount
  };
})();

// 2. 柯里化：延迟执行
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

// 3. 经典陷阱：for + setTimeout
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 3 3 3（var 无块作用域）
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 0 1 2（let 有块作用域）
}`,
        },
        {
          id: 'p3-4',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '作用域类型',
            columns: ['var（函数作用域）', 'let（块作用域）', 'const（块作用域）'],
            rows: [
              { feature: '作用域', values: ['函数', '块 {}', '块 {}'] },
              { feature: '变量提升', values: ['是（初始化为 undefined）', '否（TDZ）', '否（TDZ）'] },
              { feature: '重复声明', values: ['允许', '不允许', '不允许'] },
              { feature: '可重新赋值', values: ['是', '是', '否'] },
              { feature: '推荐度', values: ['❌ 避免', '✓ 可变变量', '✓✓ 默认使用'] },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'p3-5',
          type: 'callout',
          variant: 'warning',
          title: '闭包与内存',
          text: '闭包会持有对外部变量的引用，若闭包长期存活（如事件监听器），可能导致内存泄漏。及时移除不再需要的监听器，或使用弱引用（WeakMap/WeakSet）。',
        },
        {
          id: 'p3-6',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '作用域链结构',
            layers: [
              {
                name: '内层作用域',
                description: '函数执行时创建',
                components: [
                  { name: 'inner()', description: '可访问自身变量 + 外层 + 全局' },
                ],
              },
              {
                name: '外层作用域',
                description: '定义 inner 的函数',
                components: [
                  { name: 'outer()', description: '可访问自身变量 + 全局' },
                ],
              },
              {
                name: '全局作用域',
                description: '最外层',
                components: [
                  { name: 'global', description: '可访问自身变量，无法访问内层' },
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
            title: 'JS 内存模型',
            layers: [
              {
                name: '栈（Stack）',
                description: '存储原始值、引用地址，由系统自动管理',
                components: [
                  { name: '原始值', description: 'string/number/boolean/null/undefined/symbol/bigint' },
                  { name: '引用地址', description: '指向堆中对象的指针' },
                  { name: '执行上下文', description: '函数调用栈帧' },
                ],
              },
              {
                name: '堆（Heap）',
                description: '存储引用类型对象，由 GC 管理',
                components: [
                  { name: 'Object', description: '对象、数组、函数' },
                  { name: '闭包变量', description: '被闭包持有的变量' },
                ],
              },
              {
                name: '调用队列',
                description: '事件循环调度',
                components: [
                  { name: '宏任务队列', description: 'setTimeout、IO、UI 渲染' },
                  { name: '微任务队列', description: 'Promise.then、MutationObserver' },
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
              'obj.greet();           // "JS"（隐式绑定）',
              '',
              'const fn = obj.greet;',
              'fn();                  // undefined（默认绑定）',
              '',
              'const bound = obj.greet.bind(obj);',
              'bound();               // "JS"（显式绑定）',
              '',
              'new obj.greet();       // 新对象（new 绑定）',
            ],
            language: 'javascript',
            steps: [
              {
                title: '默认绑定',
                description: '独立函数调用，this 指向全局对象（严格模式为 undefined）。',
                highlightLines: [9, 10],
              },
              {
                title: '隐式绑定',
                description: '作为对象方法调用，this 指向调用对象。obj.greet() 中 this 是 obj。',
                highlightLines: [7],
              },
              {
                title: '显式绑定',
                description: 'call/apply/bind 显式指定 this。bind 返回新函数，永久绑定。',
                highlightLines: [12, 13],
              },
              {
                title: 'new 绑定',
                description: 'new 调用构造函数，this 指向新创建的对象。优先级最高。',
                highlightLines: [15],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 4：数组与对象
    // ========================================================================
    {
      order: 4,
      title: '数组与对象',
      difficulty: 3,
      visualizationType: 'array-method',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: '数组方法（map/filter/reduce）和对象操作是函数式编程的基础。掌握不可变更新模式，为后续 React 学习打下基础。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'array-method',
          data: {
            title: '数组方法 Playground · map / filter / reduce 实时执行',
            defaultMethod: 'map',
            defaultInput: '[1, 2, 3, 4, 5]',
            defaultCallback: 'n => n * 2',
          },
        },
        {
          id: 'p4-3',
          type: 'code',
          language: 'javascript',
          filename: '对象操作',
          code: `// 对象解构与展开
const { name, age, ...rest } = { name: 'JS', age: 30, city: 'SH', zip: '200000' };
// name='JS', age=30, rest={city:'SH', zip:'200000'}

const merged = { ...rest, country: 'CN' };  // 浅拷贝 + 合并

// 不可变更新模式（React 状态更新基础）
const state = { count: 0, list: [1, 2, 3] };
const newState = {
  ...state,
  count: state.count + 1,
  list: [...state.list, 4]  // 新数组引用
};
// state 未变，newState 是新对象

// Object 方法
Object.keys(state);     // ['count', 'list']
Object.values(state);   // [1, [1,2,3]]
Object.entries(state);  // [['count',1], ['list',[...]]]
Object.freeze(state);   // 冻结（浅冻结）

// 可选链与空值合并
const user = { profile: { name: 'JS' } };
user?.profile?.name;     // 'JS'（不存在返回 undefined）
user?.settings?.theme;   // undefined
user?.settings?.theme ?? 'light';  // 'light'（默认值）`,
        },
        {
          id: 'p4-4',
          type: 'callout',
          variant: 'tip',
          title: '不可变更新',
          text: 'React 中状态更新必须返回新引用（浅拷贝），不能直接修改 state。使用展开运算符 ... 或 immer 库实现不可变更新。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：DOM 操作与事件
    // ========================================================================
    {
      order: 5,
      title: 'DOM 操作与事件',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: '事件传播分为三个阶段：捕获、目标、冒泡。理解事件委托机制可以提升性能，减少事件监听器数量。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'document.addEventListener("click", handler, true);  // 捕获阶段',
              'parent.addEventListener("click", handler);          // 冒泡阶段',
              'child.addEventListener("click", handler);           // 目标阶段',
              '',
              'child.click();  // 触发顺序：',
              '// 1. document（捕获）',
              '// 2. parent（捕获）',
              '// 3. child（目标）',
              '// 4. parent（冒泡）',
              '// 5. document（冒泡）',
            ],
            language: 'javascript',
            steps: [
              {
                title: '捕获阶段（Capture）',
                description: '事件从 document 向下传播到目标元素的父级。addEventListener 第三个参数为 true 时监听捕获阶段。',
                highlightLines: [1, 6, 7],
              },
              {
                title: '目标阶段（Target）',
                description: '事件到达目标元素。目标元素上的监听器按注册顺序触发，不区分捕获/冒泡。',
                highlightLines: [3, 8],
              },
              {
                title: '冒泡阶段（Bubble）',
                description: '事件从目标元素向上冒泡到 document。默认监听冒泡阶段（第三个参数为 false）。',
                highlightLines: [2, 9, 10],
              },
              {
                title: '事件委托',
                description: '利用冒泡机制，在父元素监听子元素的事件。e.target 是实际触发元素，e.currentTarget 是绑定监听器的元素。',
                highlightLines: [1, 2, 3],
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'javascript',
          filename: '事件委托',
          code: `// 事件委托：在父元素监听所有子元素点击
const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
  // e.target：实际点击的元素
  // e.currentTarget：绑定监听器的元素（list）
  if (e.target.matches('li.item')) {
    console.log('点击了:', e.target.textContent);
    e.target.classList.toggle('selected');
  }
});

// 动态添加的子元素自动享有事件处理
list.innerHTML += '<li class="item">新项目</li>';

// 阻止冒泡与默认行为
button.addEventListener('click', (e) => {
  e.stopPropagation();  // 阻止冒泡
  e.preventDefault();   // 阻止默认行为（如链接跳转）
  e.stopImmediatePropagation(); // 阻止同元素其他监听器
});`,
        },
        {
          id: 'p5-4',
          type: 'callout',
          variant: 'tip',
          title: '事件委托优势',
          text: '1 个父监听器替代 100 个子监听器，节省内存。动态添加的元素无需重新绑定。但要注意：focus/blur 等不冒泡的事件需用 focusin/focusout 替代。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：异步编程
    // ========================================================================
    {
      order: 6,
      title: '异步编程',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          text: 'JavaScript 是单线程语言，通过事件循环实现异步。从回调函数到 Promise 再到 async/await，异步编程不断演进。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              'console.log("1");                    // 同步',
              '',
              'setTimeout(() => {',
              '  console.log("2");                  // 宏任务',
              '}, 0);',
              '',
              'Promise.resolve().then(() => {',
              '  console.log("3");                  // 微任务',
              '});',
              '',
              'console.log("4");                    // 同步',
              '',
              '// 输出顺序：1 → 4 → 3 → 2',
            ],
            language: 'javascript',
            steps: [
              {
                title: '执行同步代码',
                description: '主线程执行 console.log("1") 和 console.log("4")。setTimeout 回调进入宏任务队列，Promise.then 回调进入微任务队列。',
                highlightLines: [1, 11, 13],
                output: '1\n4',
              },
              {
                title: '清空微任务队列',
                description: '同步代码执行完毕后，清空所有微任务。Promise.then 的回调执行，输出 "3"。',
                highlightLines: [8, 9],
                output: '3',
              },
              {
                title: '取一个宏任务',
                description: '微任务清空后，取一个宏任务执行。setTimeout 的回调执行，输出 "2"。',
                highlightLines: [3, 4],
                output: '2',
              },
              {
                title: '最终输出顺序',
                description: '同步代码 → 微任务（Promise）→ 宏任务（setTimeout）。即 1 → 4 → 3 → 2。',
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
          code: `// Promise 链式调用
function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(user => user)
    .catch(err => console.error(err));
}

// async/await：同步式编写异步代码
async function fetchUserAsync(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const user = await res.json();
    return user;
  } catch (err) {
    console.error(err);
  }
}

// 并发请求
async function fetchUsers(ids) {
  // Promise.all：全部完成才返回，任一失败则 reject
  const users = await Promise.all(ids.map(id => fetchUserAsync(id)));
  return users;
}

// Promise.allSettled：等待全部完成（无论成功失败）
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
              { time: '阶段1', title: '回调函数', description: '回调地狱、控制反转、错误处理困难。', status: 'done' },
              { time: '阶段2', title: 'Promise', description: '链式调用、统一错误处理、三种状态。', status: 'done' },
              { time: '阶段3', title: 'Generator + co', description: '同步风格异步代码、需手动驱动。', status: 'done' },
              { time: '阶段4', title: 'async/await', description: '语法糖、同步式编写、try/catch 错误处理。', status: 'active' },
              { time: '阶段5', title: 'Top-level await', description: 'ES2022、模块顶层直接 await。', status: 'active' },
            ],
          },
        },
        {
          id: 'p6-5',
          type: 'demo',
          visualizationType: 'event-loop',
          data: {
            title: 'Event Loop 可视化 · Call Stack / 微任务 / 宏任务',
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
            title: 'Promise 状态流转 · Pending → Resolved/Rejected + 链式调用',
          },
        },
        {
          id: 'p6-7',
          type: 'callout',
          variant: 'warning',
          title: '微任务优先于宏任务',
          text: '每次宏任务执行后，会清空所有微任务队列。Promise.then 是微任务，setTimeout 是宏任务。因此 Promise 总是先于 setTimeout 执行。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：错误处理与调试
    // ========================================================================
    {
      order: 7,
      title: '错误处理与调试',
      difficulty: 2,
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: '健壮的错误处理是生产级代码的必备能力。try/catch、错误对象、全局错误捕获构成完整的错误处理体系。',
        },
        {
          id: 'p7-2',
          type: 'code',
          language: 'javascript',
          filename: '错误处理',
          code: `// 1. try/catch/finally
try {
  JSON.parse(invalidJson);
} catch (err) {
  console.error(err.message);  // "Unexpected token..."
} finally {
  // 无论成功失败都执行（如关闭资源）
}

// 2. 自定义错误（继承 Error）
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
throw new ValidationError('邮箱格式错误', 'email');

// 3. async/await 错误处理
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('请求失败:', err);
    return null;
  }
}

// 4. 全局错误捕获
window.addEventListener('unhandledrejection', (e) => {
  console.error('未处理的 Promise 拒绝:', e.reason);
});
window.onerror = (msg, url, line, col, err) => {
  console.error('全局错误:', msg, err);
};`,
        },
        {
          id: 'p7-3',
          type: 'list',
          items: [
            'try/catch：同步代码错误捕获，无法捕获异步错误（Promise 需 .catch()）',
            'throw：主动抛出错误，建议抛出 Error 实例而非字符串',
            '自定义错误：继承 Error 类，添加业务字段（如 field、code）',
            '全局捕获：window.onerror 捕获同步错误，unhandledrejection 捕获未处理的 Promise',
            '调试技巧：console.log/warn/error、debugger 断点、Sources 面板',
          ],
        },
        {
          id: 'p7-4',
          type: 'callout',
          variant: 'tip',
          title: '生产环境错误监控',
          text: '使用 Sentry、Bugsnag 等服务收集生产环境错误。配合 source map，可以还原压缩代码的错误位置。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：类与模块
    // ========================================================================
    {
      order: 8,
      title: '类与模块',
      difficulty: 3,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: 'ES6 Class 是原型链的语法糖，ES Module 是官方模块系统。理解类的继承机制和模块的导入导出规则。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '类继承关系图',
            layers: [
              {
                name: '基类',
                description: '所有类的根基',
                components: [
                  { name: 'Animal', description: '基类：name、age 属性，eat()、sleep() 方法' },
                ],
              },
              {
                name: '派生类',
                description: '通过 extends 继承基类',
                components: [
                  { name: 'Dog', description: '继承 Animal，新增 bark() 方法' },
                  { name: 'Cat', description: '继承 Animal，新增 meow() 方法' },
                ],
              },
              {
                name: 'Mixin 混入',
                description: '多继承替代方案',
                components: [
                  { name: 'Swimmer', description: '混入 swim() 方法到任意类' },
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
          filename: 'Class 与 Module',
          code: `// ES6 Class
class Animal {
  #name;  // 私有字段（ES2022）
  static count = 0;  // 静态属性

  constructor(name) {
    this.#name = name;
    Animal.count++;
  }

  get name() { return this.#name; }  // getter
  eat() { console.log(\`\${this.#name} is eating\`); }
  static create(name) { return new Animal(name); }  // 静态方法
}

class Dog extends Animal {
  constructor(name) {
    super(name);  // 必须先调用 super
  }
  bark() { console.log(\`\${this.name} says woof\`); }
  eat() { super.eat(); console.log('dog style'); }  // 重写
}

// ES Module
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { PI, add } from './math.js';
import * as math from './math.js';  // 命名空间导入
import { add as plus } from './math.js';  // 重命名`,
        },
        {
          id: 'p8-4',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: 'ES Module 体系',
            items: [
              { title: '静态导入（import）', content: '编译时确定依赖关系，支持 tree-shaking。import 必须在顶层，不能在条件块中。' },
              { title: '动态导入（import()）', content: '运行时加载模块，返回 Promise。用于代码分割和懒加载：const mod = await import("./heavy.js");' },
              { title: '导出方式', content: '命名导出 export { a, b } 可多次导出；默认导出 export default X 每模块仅一个。混合使用时默认导出在前。' },
              { title: '严格模式', content: 'ES Module 默认启用严格模式（use strict），无需手动声明。this 在顶层为 undefined（非 window）。' },
              { title: 'CommonJS 兼容', content: 'Node.js 支持 import CommonJS 模块（默认导出 = module.exports）。但 CommonJS 不能 import ESM 的命名导出。' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 9：存储 API
    // ========================================================================
    {
      order: 9,
      title: '存储 API',
      difficulty: 2,
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: '浏览器提供多种存储方案：localStorage、sessionStorage、IndexedDB、Cookie。选择合适的存储方案取决于数据量和持久化需求。',
        },
        {
          id: 'p9-2',
          type: 'code',
          language: 'javascript',
          filename: '存储 API',
          code: `// localStorage：持久化存储（手动清除才消失）
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// 存储对象需序列化
const user = { name: 'JS', age: 30 };
localStorage.setItem('user', JSON.stringify(user));
const parsed = JSON.parse(localStorage.getItem('user'));

// sessionStorage：会话存储（关闭标签页清除）
sessionStorage.setItem('temp', 'data');

// Cookie：可发送到服务端，容量小（4KB）
document.cookie = 'name=JS; max-age=3600; path=/; Secure; SameSite=Strict';

// IndexedDB：大容量结构化存储
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
            'localStorage：5-10MB，持久化，同步 API，仅存字符串',
            'sessionStorage：5-10MB，会话级，同步 API，仅存字符串',
            'IndexedDB：数百 MB+，持久化，异步 API，存对象/文件',
            'Cookie：4KB，可发送服务端，适合认证 token',
            'Cache API：HTTP 响应缓存，配合 Service Worker 离线',
          ],
        },
        {
          id: 'p9-4',
          type: 'callout',
          variant: 'warning',
          title: 'localStorage 同步阻塞',
          text: 'localStorage 的 API 是同步的，读写大文件会阻塞主线程。存储大量数据应使用 IndexedDB（异步）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：正则表达式
    // ========================================================================
    {
      order: 10,
      title: '正则表达式',
      difficulty: 3,
      visualizationType: 'regex-tester',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: '正则表达式用于字符串匹配、替换、提取。掌握常用元字符、量词、分组和断言，处理表单验证和文本处理。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'regex-tester',
          data: {
            title: '正则表达式测试器 · 实时匹配与高亮',
            defaultPattern: '\\d+',
            defaultFlags: 'g',
            defaultTestText: '订单号：A12345，金额：99.9 元，电话：13800138000',
          },
        },
        {
          id: 'p10-3',
          type: 'code',
          language: 'javascript',
          filename: '正则元字符',
          code: `// 元字符
.       // 任意字符（除换行）
\\d \\D  // 数字 / 非数字
\\w \\W  // 字母数字下划线 / 非字母数字下划线
\\s \\S  // 空白 / 非空白
^ $     // 行首 / 行尾
\\b \\B  // 单词边界 / 非单词边界

// 量词
*       // 0 次或多次
+       // 1 次或多次
?       // 0 次或 1 次
{n}     // 恰好 n 次
{n,}    // 至少 n 次
{n,m}   // n 到 m 次

// 分组与断言
(abc)   // 捕获组
(?:abc) // 非捕获组
(?=abc) // 正向先行断言
(?!abc) // 负向先行断言

// 修饰符
g       // 全局匹配
i       // 忽略大小写
m       // 多行模式
s       // . 匹配换行
u       // Unicode 模式
y       // 粘连模式`,
        },
      ],
    },

    // ========================================================================
    // 知识点 11：原型链
    // ========================================================================
    {
      order: 11,
      title: '原型链',
      difficulty: 4,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: '原型链是 JavaScript 继承的核心机制。每个对象有 __proto__ 指向其构造函数的 prototype。理解原型链有助于理解 this、继承和 class。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: '原型链结构',
            layers: [
              {
                name: '实例层',
                description: 'new 创建的实例',
                components: [
                  { name: 'dog 实例', description: '__proto__ → Dog.prototype' },
                ],
              },
              {
                name: '构造函数 prototype',
                description: 'Dog.prototype',
                components: [
                  { name: 'Dog.prototype', description: 'bark() 方法，constructor → Dog，__proto__ → Animal.prototype' },
                ],
              },
              {
                name: '父类 prototype',
                description: 'Animal.prototype',
                components: [
                  { name: 'Animal.prototype', description: 'eat() 方法，__proto__ → Object.prototype' },
                ],
              },
              {
                name: '根原型',
                description: 'Object.prototype',
                components: [
                  { name: 'Object.prototype', description: 'toString()、hasOwnProperty() 等，__proto__ → null' },
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
          filename: '原型链',
          code: `// 原型链查找
function Animal(name) { this.name = name; }
Animal.prototype.eat = function() { console.log(this.name + ' eats'); };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);  // 继承
Dog.prototype.constructor = Dog;  // 修复 constructor
Dog.prototype.bark = function() { console.log(this.name + ' barks'); };

const dog = new Dog('Rex');
dog.bark();  // 'Rex barks'（自身原型）
dog.eat();   // 'Rex eats'（沿原型链找到 Animal.prototype）

// 原型链查找顺序
dog.__proto__ === Dog.prototype;           // true
Dog.prototype.__proto__ === Animal.prototype; // true
Animal.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;       // true（链终点）

// instanceof 沿原型链检查
dog instanceof Dog;     // true
dog instanceof Animal;  // true
dog instanceof Object;  // true

// Class 是原型链语法糖
class Cat extends Animal {
  meow() { console.log(this.name + ' meows'); }
}
// 等价于上面的原型链继承，但语法更简洁`,
        },
        {
          id: 'p11-4',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比',
            columns: ['原型链继承', 'Class 继承'],
            rows: [
              { feature: '语法', values: ['Dog.prototype = Object.create(Animal.prototype)', 'class Dog extends Animal {}'] },
              { feature: 'constructor 修复', values: ['需手动修复', '自动处理'] },
              { feature: 'super 调用', values: ['Animal.call(this, name)', 'super(name)'] },
              { feature: '静态方法', values: ['Dog.staticMethod = fn', 'static method() {}'] },
              { feature: '私有字段', values: ['约定 _name（非真正私有）', '#name（真正私有）'] },
              { feature: '推荐度', values: ['❌ 旧代码', '✓ 现代代码'] },
            ],
            highlightColumn: 1,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 12：Map / Set / WeakMap
    // ========================================================================
    {
      order: 12,
      title: 'Map / Set / WeakMap',
      difficulty: 2,
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: 'Map 和 Set 是 ES6 引入的集合类型，弥补了 Object 和 Array 的不足。WeakMap/WeakSet 支持弱引用，避免内存泄漏。',
        },
        {
          id: 'p12-2',
          type: 'code',
          language: 'javascript',
          filename: 'Map / Set',
          code: `// Map：键值对集合（键可以是任意类型，包括对象）
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

// Set：唯一值集合
const set = new Set([1, 2, 2, 3, 3, 3]);
set.size;              // 3（自动去重）
set.add(4);
set.has(2);            // true
set.delete(1);

// WeakMap：键必须是对象，弱引用（不影响垃圾回收）
const weakMap = new WeakMap();
let key = {};
weakMap.set(key, 'data');
weakMap.get(key);      // 'data'
key = null;            // 键被回收，WeakMap 中的条目自动消失
// WeakMap 不可遍历，无 size 属性

// 应用场景
const metadata = new WeakMap();
function track(obj) {
  metadata.set(obj, { visited: true, time: Date.now() });
}
// 当 obj 被回收，metadata 自动清理，无内存泄漏`,
        },
        {
          id: 'p12-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比',
            columns: ['Object', 'Map', 'WeakMap'],
            rows: [
              { feature: '键类型', values: ['string / symbol', '任意类型', '仅对象'] },
              { feature: '键顺序', values: ['整数键升序 + 字符串键插入序', '插入序', '—'] },
              { feature: 'size', values: ['无（需 Object.keys）', '有', '无'] },
              { feature: '可遍历', values: ['是', '是', '否'] },
              { feature: '弱引用', values: ['否', '否', '是（GC 友好）'] },
              { feature: '推荐场景', values: ['配置/数据', '频繁增删的映射', '对象元数据'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 13：Proxy 与 Reflect
    // ========================================================================
    {
      order: 13,
      title: 'Proxy 与 Reflect',
      difficulty: 4,
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: 'Proxy 可以拦截对象的基本操作（如属性读取、赋值、删除）。Reflect 提供操作对象的默认行为。两者配合实现响应式系统（Vue 3 的基础）。',
        },
        {
          id: 'p13-2',
          type: 'code',
          language: 'javascript',
          filename: 'Proxy 与 Reflect',
          code: `// Proxy：代理对象，拦截操作
const handler = {
  get(target, prop, receiver) {
    console.log('读取:', prop);
    return Reflect.get(target, prop, receiver);  // 默认行为
  },
  set(target, prop, value, receiver) {
    console.log('设置:', prop, '=', value);
    return Reflect.set(target, prop, value, receiver);
  },
  has(target, prop) {
    console.log('检查:', prop);
    return Reflect.has(target, prop);
  },
  deleteProperty(target, prop) {
    console.log('删除:', prop);
    return Reflect.deleteProperty(target, prop);
  }
};

const proxy = new Proxy({ name: 'JS', age: 30 }, handler);
proxy.name;        // 打印 "读取: name"，返回 'JS'
proxy.city = 'SH'; // 打印 "设置: city = SH"
'name' in proxy;   // 打印 "检查: name"，返回 true
delete proxy.age;  // 打印 "删除: age"

// 应用：响应式数据（Vue 3 原理）
function reactive(target) {
  return new Proxy(target, {
    get(t, p, r) {
      track(t, p);  // 收集依赖
      return Reflect.get(t, p, r);
    },
    set(t, p, v, r) {
      const result = Reflect.set(t, p, v, r);
      trigger(t, p);  // 触发更新
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
          text: 'Proxy 可以监听属性的新增和删除，而 Object.defineProperty 只能监听已存在的属性。Vue 3 用 Proxy 重写了响应式系统，解决了 Vue 2 无法检测属性新增的问题。',
        },
      ],
    },

    // ========================================================================
    // 知识点 14：Iterator 与 Generator
    // ========================================================================
    {
      order: 14,
      title: 'Iterator 与 Generator',
      difficulty: 4,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: 'Iterator 协议定义了遍历接口，Generator 函数可以暂停执行。两者是 for...of、展开运算符、解构等特性的基础。',
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
              '    yield id;       // 暂停并返回值',
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
                title: '创建 Generator',
                description: '调用 Generator 函数返回遍历器对象（不执行函数体）。gen 是 Iterator。',
                highlightLines: [1, 9],
              },
              {
                title: '第一次 next()',
                description: '执行到第一个 yield，暂停并返回 { value: 1, done: false }。id 此时为 1。',
                highlightLines: [4, 10],
                output: '{ value: 1, done: false }',
              },
              {
                title: '第二次 next()',
                description: '从上次暂停处继续，执行 id++ 后再次 yield。返回 { value: 2, done: false }。',
                highlightLines: [5, 4, 11],
                output: '{ value: 2, done: false }',
              },
              {
                title: '无限序列',
                description: 'while(true) 使 Generator 产生无限序列，但每次只计算一个值，不会栈溢出。这是惰性求值。',
                highlightLines: [3, 4, 5],
              },
            ],
          },
        },
        {
          id: 'p14-3',
          type: 'code',
          language: 'javascript',
          filename: 'Iterator 协议',
          code: `// Iterator 协议：实现 next() 方法
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

// 可迭代对象可用于 for...of、展开、解构
for (const x of myIterator) console.log(x);  // 0 1 2
const arr = [...myIterator];  // [0, 1, 2]
const [a, b] = myIterator;    // a=0, b=1

// Generator 实现 Iterator（更简洁）
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
[...range(0, 5)];        // [0, 1, 2, 3, 4]
[...range(0, 10, 2)];    // [0, 2, 4, 6, 8]

// yield* 委托其他迭代器
function* combined() {
  yield* [1, 2, 3];
  yield* range(4, 7);
}
[...combined()];  // [1, 2, 3, 4, 5, 6]`,
        },
      ],
    },

    // ========================================================================
    // 知识点 15：ES 新特性（ES2020-ES2025）
    // ========================================================================
    {
      order: 15,
      title: 'ES 新特性（ES2020-ES2025）',
      difficulty: 2,
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: 'JavaScript 每年发布新版本。掌握 ES2020+ 的关键特性，编写更简洁、安全的代码。',
        },
        {
          id: 'p15-2',
          type: 'code',
          language: 'javascript',
          filename: 'ES 新特性',
          code: `// ES2020
const x = null ?? 'default';     // 空值合并（仅 null/undefined 取默认值）
const y = obj?.profile?.name;    // 可选链（避免 "Cannot read property of undefined"）
const big = 123456789012345678901234567890n;  // BigInt
Promise.allSettled([p1, p2]);    // 等待全部完成（无论成败）
globalThis;                      // 统一全局对象引用

// ES2021
const s = 'foo'.replaceAll('o', 'x');  // 'fxx'（replace 只替换第一个）
Promise.any([p1, p2]);          // 任一成功即返回
const weakRef = new WeakRef(obj);  // 弱引用
const _ = 1_000_000;            // 数字分隔符

// ES2022
class Foo {
  #private = 1;                 // 私有字段
  #privateMethod() {}           // 私有方法
  static #staticPrivate = 2;    // 静态私有
  static { /* 初始化块 */ }
}
arr.at(-1);                     // 支持负索引（等价 arr[arr.length-1]）
Object.hasOwn(obj, 'key');      // 比 hasOwnProperty 更安全
'foo'.replaceAll('o', 'x');     // 已在 ES2021

// ES2023
arr.findLast(x => x > 2);       // 从后向前查找
arr.toReversed();               // 返回新数组（不修改原数组）
arr.toSorted();                 // 不可变排序
arr.with(0, 'new');             // 不可变更新指定索引

// ES2024
Object.groupBy(arr, fn);        // 按条件分组
Map.groupBy(arr, fn);           // Map 版本
Promise.withResolvers();        // 解构 resolve/reject
String.prototype.isWellFormed(); // 检查 UTF-16 完整性`,
        },
        {
          id: 'p15-3',
          type: 'callout',
          variant: 'tip',
          title: 'Baseline 标准',
          text: '现代 Web 平台通过 Baseline 标识特性兼容性。Widely Available 表示主流浏览器均支持，可放心使用。Newly Available 表示刚普及，需评估兼容性。',
        },
      ],
    },

    // ========================================================================
    // 知识点 16：实战案例：待办事项应用
    // ========================================================================
    {
      order: 16,
      title: '实战案例：待办事项应用',
      difficulty: 3,
      visualizationType: 'todo-app',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          text: '综合运用数据类型、数组方法、事件处理、localStorage，实现一个完整的待办事项应用。下方为可交互的完整 Todo 应用，支持增删改查、筛选、持久化。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'todo-app',
          data: {
            title: '待办事项应用 · CRUD + 筛选 + localStorage 持久化',
            initialTodos: [
              { text: '学习 JavaScript 基础', completed: true },
              { text: '掌握异步编程', completed: false },
              { text: '理解原型链', completed: false },
              { text: '完成 Todo 应用实战', completed: false },
            ],
          },
        },
        {
          id: 'p16-3',
          type: 'callout',
          variant: 'tip',
          title: 'React 中的实现',
          text: 'React 中用 useState 管理状态，useEffect 持久化到 localStorage。状态更新必须返回新数组（不可变更新），而非直接修改。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：面试题
    // ========================================================================
    {
      order: 17,
      title: '面试题',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          text: 'JavaScript 面试高频考点：闭包、原型链、this、事件循环、Promise。理解原理比背答案更重要。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: '高频面试题',
            items: [
              {
                title: 'Q: 解释闭包及其应用场景',
                content: '闭包是函数与其词法环境的组合。内部函数可以访问外部函数的变量，即使外部函数已返回。应用：模块模式（私有变量）、柯里化、防抖节流、事件监听器。注意：闭包持有变量引用，可能导致内存泄漏。',
              },
              {
                title: 'Q: typeof null 为什么是 "object"',
                content: 'JavaScript 诞生时，值在内存中以类型标签存储。对象的类型标签低位是 000，而 null 在多数平台被表示为空指针（全 0），因此 typeof 误判为 "object"。这是历史遗留 bug，已无法修复（破坏兼容性）。',
              },
              {
                title: 'Q: == 和 === 的区别',
                content: '== 宽松相等会触发隐式类型转换（如 0 == "" 为 true），规则复杂易错。=== 严格相等不转换类型，类型不同直接返回 false。始终使用 ===，需要转换时显式 Number()/String()。特殊场景用 Object.is()（处理 NaN 和 ±0）。',
              },
              {
                title: 'Q: 解释事件循环（Event Loop）',
                content: 'JS 单线程，通过事件循环处理异步。主线程执行同步代码 → 清空微任务队列（Promise.then、MutationObserver）→ UI 渲染 → 取一个宏任务（setTimeout、IO）→ 循环。微任务优先于宏任务，每次宏任务后清空所有微任务。',
              },
              {
                title: 'Q: var / let / const 区别',
                content: 'var：函数作用域，变量提升（初始化为 undefined），可重复声明。let：块作用域，暂存性死区（TDZ），不可重复声明。const：块作用域，必须初始化，不可重新赋值（但对象属性可变）。默认用 const，可变用 let，避免 var。',
              },
              {
                title: 'Q: 箭头函数与普通函数的区别',
                content: '箭头函数：没有自己的 this（继承外层）、没有 arguments、不能作为构造函数（不能 new）、没有 prototype。适合回调函数和需要词法 this 的场景。不适合对象方法（this 不指向对象）和需要 arguments 的场景。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 18：知识点速查表
    // ========================================================================
    {
      order: 18,
      title: '知识点速查表',
      difficulty: 1,
      visualizationType: 'skillbar',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          text: 'JavaScript 核心知识点掌握建议，按重要性排序。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'skillbar',
          data: {
            skills: [
              { name: '数据类型与类型转换', level: 95, description: '基础中的基础，面试必考' },
              { name: '作用域与闭包', level: 90, description: '理解模块模式、柯里化的前提' },
              { name: '原型链与继承', level: 85, description: '理解 class 和 this 的关键' },
              { name: '异步编程（Promise/async）', level: 90, description: '现代 JS 开发核心' },
              { name: '事件循环', level: 80, description: '理解执行顺序' },
              { name: 'ES6+ 新特性', level: 85, description: '日常开发必备' },
              { name: 'this 指向', level: 75, description: '面试高频，需理解绑定规则' },
              { name: '数组方法', level: 90, description: '函数式编程基础' },
            ],
          },
        },
        {
          id: 'p18-3',
          type: 'list',
          items: [
            '数据类型：7 原始类型 + 引用类型，typeof / instanceof 判断',
            '作用域：全局 / 函数 / 块，var / let / const 区别',
            '闭包：函数 + 词法环境，应用模块模式、柯里化',
            '原型链：__proto__ → prototype → Object.prototype → null',
            'this：默认 / 隐式 / 显式 / new 绑定，箭头函数继承外层',
            '异步：回调 → Promise → async/await，微任务优先宏任务',
            'ES6+：解构、展开、可选链、空值合并、私有字段',
            '模块：ES Module（import/export）vs CommonJS（require）',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 19：JavaScript 小测验（新增）
    // ========================================================================
    {
      order: 19,
      title: 'JavaScript 小测验',
      difficulty: 1,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: '通过测验检验 JavaScript 核心知识点的掌握程度。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '以下 typeof 返回 "object" 的是？',
                options: ['null', 'undefined', 'function', 'symbol'],
                correctIndex: 0,
                explanation: 'typeof null 返回 "object"，这是 JavaScript 的历史遗留 bug，因 null 在内存中的低位标志位与对象相同。',
              },
              {
                question: 'Promise.all 在以下哪种情况会进入 reject？',
                options: ['所有 Promise 都 resolve', '任一 Promise reject', '所有 Promise 都 reject', '任一 Promise pending'],
                correctIndex: 1,
                explanation: 'Promise.all 只要有一个 Promise reject，整个 Promise.all 就立即 reject（快速失败）。用 Promise.allSettled 等待全部完成。',
              },
              {
                question: '箭头函数有自己的 this 和 arguments 吗？',
                options: ['正确', '错误'],
                correctIndex: 1,
                explanation: '箭头函数没有自己的 this 和 arguments，继承自外层作用域（词法 this）。因此不适合作为对象方法或构造函数。',
              },
              {
                question: '以下代码输出什么？\nconsole.log(1 + "2")',
                options: ['3', '"12"', 'NaN', '"3"'],
                correctIndex: 1,
                explanation: '+ 运算符在任一操作数为字符串时执行字符串拼接。1 + "2" → "12"。要执行数值加法需 Number("2")。',
              },
              {
                question: 'let 和 var 的主要区别是？',
                options: ['let 有块作用域，var 有函数作用域', 'let 可重复声明', 'var 有暂存性死区', 'let 会变量提升'],
                correctIndex: 0,
                explanation: 'let/const 有块级作用域，var 有函数作用域。let/const 有暂存性死区（TDZ）不可在声明前访问，var 会提升并初始化为 undefined。',
              },
              {
                question: '以下代码输出顺序？\nconsole.log(1);\nsetTimeout(()=>console.log(2));\nPromise.resolve().then(()=>console.log(3));\nconsole.log(4);',
                options: ['1 2 3 4', '1 4 3 2', '1 4 2 3', '1 3 4 2'],
                correctIndex: 1,
                explanation: '同步代码先执行（1 4），然后清空微任务队列（Promise.then 输出 3），最后取宏任务（setTimeout 输出 2）。即 1 4 3 2。',
              },
              {
                question: 'Object.is(NaN, NaN) 返回什么？',
                options: ['false', 'true', 'undefined', '抛出错误'],
                correctIndex: 1,
                explanation: 'Object.is() 使用同值相等算法，能正确区分 NaN（Object.is(NaN, NaN) === true）和 ±0（Object.is(+0, -0) === false），而 === 做不到。',
              },
              {
                question: '以下哪种方式可以实现真正的私有属性？',
                options: ['_name 前缀约定', 'Object.defineProperty', '#name 私有字段（ES2022）', '闭包变量'],
                correctIndex: 2,
                explanation: 'ES2022 的 #name 私有字段是语言级私有，类外部无法访问。_name 只是约定，Object.defineProperty 仍可枚举，闭包变量无法被类方法共享。',
              },
            ],
          },
        },
        {
          id: 'p19-3',
          type: 'callout',
          variant: 'tip',
          title: '测验完成',
          text: '答错的知识点建议回顾对应章节。闭包、原型链、事件循环是面试必考，务必深入理解。',
        },
      ],
    },
  ],
}
