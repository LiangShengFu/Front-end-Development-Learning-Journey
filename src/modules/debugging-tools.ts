/**
 * 模块 05：前端调试与排错基础
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块五.md 设计文档：
 * - 20 个知识点（15 章节 + 面试题 + 2 综合实战 + 速查表 + 小测验）
 * - 13 个可视化演示
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - KP1 DevTools 概览（KnowledgeGraph 知识图谱）
 * - KP3 Console 面板（CompareTable 日志级别对比）
 * - KP5 条件/日志断点（Accordion 断点类型）
 * - KP8 接口 Mock 与拦截（CompareTable Mock 方案对比）
 * - KP10 Memory 面板（CompareTable 内存泄漏场景）
 * - KP15 调试方法论与排错思路（Timeline 排错流程）
 * - KP16 前端调试面试题精选（Accordion 闪卡模式）
 * - KP17 综合实战：断点调试定位闭包泄漏（Sandbox checks）
 * - KP18 综合实战：Performance 定位长任务卡顿（Sandbox checks）
 * - KP19 前端调试速查表（CompareTable）
 * - KP20 调试测验（QuizCard）
 *
 * 覆盖 Chrome DevTools 各面板、断点调试、网络抓包、性能分析、
 * 内存排查、移动端调试、SourceMap、Lighthouse 等核心调试技能。
 */
import type { ModuleMeta } from '../lib/types'

export const debuggingToolsModule: ModuleMeta = {
  number: '05',
  title: '前端调试与排错基础',
  slug: 'debugging-tools',
  stage: 'basics',
  stageLabel: '基础阶段 · 第 5 模块',
  icon: '05',
  summary: 'Chrome DevTools 各面板、断点调试、性能与内存分析、调试方法论。',
  knowledgePointCount: 20,
  visualizationCount: 13,
  points: [
    // ========================================================================
    // 知识点 1：Chrome DevTools 概览
    // ========================================================================
    {
      order: 1,
      title: 'Chrome DevTools 概览',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'Chrome DevTools 是前端调试的核心工具集，包含 Elements、Console、Sources、Network、Performance、Memory、Application 等面板。掌握各面板的使用场景是高效调试的基础。',
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
              { id: 'application', label: 'Application', group: 'detail' },
            ],
            edges: [
              { source: 'devtools', target: 'elements', label: 'DOM/CSS' },
              { source: 'devtools', target: 'console', label: '日志' },
              { source: 'devtools', target: 'sources', label: '断点' },
              { source: 'devtools', target: 'network', label: '请求' },
              { source: 'devtools', target: 'performance', label: '性能' },
              { source: 'devtools', target: 'memory', label: '内存' },
              { source: 'devtools', target: 'application', label: '存储' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'list',
          items: [
            'Elements：DOM 树检查与 CSS 实时编辑，Box Model 可视化',
            'Console：日志输出、API 调试、表达式求值、错误捕获',
            'Sources：断点调试、代码步进、Watch 变量、调用栈',
            'Network：请求抓包、Timing 分析、重发请求、Block 拦截',
            'Performance：火焰图、CPU 分析、FPS 监控、Main 线程',
            'Memory：堆快照、分配时间线、泄漏定位',
            'Application：localStorage/Cookie/IndexedDB/Cache 管理',
          ],
        },
        {
          id: 'p1-4',
          type: 'callout',
          variant: 'tip',
          title: '快捷键速记',
          text: 'F12 / Cmd+Opt+I 打开 DevTools；Cmd+Shift+C 检查元素；Cmd+Shift+J 打开 Console；Cmd+P 在 Sources 中按文件名搜索；Cmd+Shift+P 执行命令菜单。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：Elements 面板
    // ========================================================================
    {
      order: 2,
      title: 'Elements 面板（DOM/CSS 调试）',
      difficulty: 2,
      visualizationType: 'flipcard',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          text: 'Elements 面板用于检查和实时编辑 DOM 树与 CSS 样式。修改即时生效，便于快速验证样式效果，但需手动同步到源码。',
        },
        {
          id: 'p2-2',
          type: 'code',
          language: 'javascript',
          filename: 'Elements 调试技巧',
          code: `// 1. 检查元素：F12 后点击左上角箭头，或右键"检查"
// 2. DOM 树导航：方向键展开/折叠，Enter 编辑属性

// 3. Styles 面板：实时编辑 CSS
//    - 点击空白处新增属性
//    - 勾选/取消勾选禁用样式
//    - 颜色值点击切换 HEX/RGB/HSL
//    - Shift+点击颜色方块切换颜色格式

// 4. Computed 面板：查看最终计算样式
//    - 展开属性查看样式来源（含继承链）
//    - 点击三角跳转到 Styles 面板对应规则

// 5. Box Model 可视化：直观显示 margin/border/padding/content
//    - 点击数值可直接编辑
//    - 鼠标悬停页面元素显示对应区域高亮

// 6. 在 Console 中引用元素
//   $0  // 上次在 Elements 选中的元素
//   $1  // 上上次选中的元素（最多到 $4）
//   $('selector')  // 等价 querySelector
//   $$('selector') // 等价 querySelectorAll

// 7. 强制元素状态：:hover / :active / :focus / :visited
//    Styles 面板右上角 :hov 按钮`,
        },
        {
          id: 'p2-3',
          type: 'callout',
          variant: 'warning',
          title: '修改不会持久化',
          text: 'Elements 面板的修改只在当前会话生效，刷新页面后丢失。修改后需手动复制到源码文件。可用 Local Overrides 持久化网络资源的修改。',
        },
        {
          id: 'p2-4',
          type: 'demo',
          visualizationType: 'flipcard',
          data: {
            cards: [
              { front: '$0', frontSub: 'Console 命令行 API', back: '引用上次在 Elements 面板选中的 DOM 元素。$1 是上上次，最多到 $4。仅 Console 可用，代码中不存在。' },
              { front: '$(selector)', frontSub: 'Console 命令行 API', back: 'document.querySelector 的简写，返回首个匹配元素。$$(selector) 是 querySelectorAll 的简写，返回所有匹配元素。' },
              { front: 'inspect(el)', frontSub: 'Console 命令行 API', back: '在 Elements 面板中定位并高亮指定元素，等价于手动点击选中。常配合 $0 使用快速跳转。' },
              { front: 'copy(value)', frontSub: 'Console 命令行 API', back: '将值复制到剪贴板。适合复制大对象/接口返回值，避免手动选中复制。' },
              { front: 'monitorEvents(el)', frontSub: 'Console 命令行 API', back: '监听元素事件并输出日志。unmonitorEvents(el) 取消。排查"元素触发了什么事件"很实用。' },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 3：Console 面板
    // ========================================================================
    {
      order: 3,
      title: 'Console 面板（日志调试）',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          text: 'Console 是最常用的调试工具。掌握不同日志级别的语义和 Console API 的高级用法，可以大幅提升调试效率。',
        },
        {
          id: 'p3-2',
          type: 'code',
          language: 'javascript',
          filename: 'Console API',
          code: `// 基础日志（按级别区分颜色与过滤）
console.log('普通日志');      // 灰色
console.info('信息');         // 蓝色
console.warn('警告');         // 橙色（带堆栈）
console.error('错误');        // 红色（带堆栈）
console.debug('调试');        // 灰色（默认隐藏）

// 分组与折叠
console.group('用户信息');
console.log('姓名: Alice');
console.log('年龄: 25');
console.groupEnd();

console.groupCollapsed('详情');  // 默认折叠
console.log('大量数据...');
console.groupEnd();

// 表格展示（适合数组/对象）
console.table([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
]);

// 计时
console.time('操作耗时');
// ... 执行操作
console.timeEnd('操作耗时');  // 输出 "操作耗时: 123.45ms"

// 计数（统计执行次数）
console.count('点击次数');   // "点击次数: 1"
console.count('点击次数');   // "点击次数: 2"

// 断言（条件为假才输出）
console.assert(age >= 18, '未成年');  // age < 18 时输出错误

// 堆栈跟踪
console.trace('调用路径');

// 清空控制台
console.clear();`,
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '方法',
            columns: ['log', 'info', 'warn', 'error', 'debug'],
            rows: [
              { feature: '级别', values: ['log', 'info', 'warning', 'error', 'debug'] },
              { feature: '颜色', values: ['灰色', '蓝色', '橙色', '红色', '灰色'] },
              { feature: '默认显示', values: ['是', '是', '是', '是', '否（需开启）'] },
              { feature: '带堆栈', values: ['否', '否', '是', '是', '否'] },
              { feature: '适用场景', values: ['常规输出', '提示信息', '潜在问题', '严重错误', '详细调试'] },
            ],
          },
        },
        {
          id: 'p3-4',
          type: 'callout',
          variant: 'tip',
          title: '生产环境清理',
          text: '生产构建应移除 console 语句（webpack-bundle-analyzer 配合 terser-webpack-plugin 的 drop_console 选项），避免泄露调试信息并减小体积。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Sources 面板
    // ========================================================================
    {
      order: 4,
      title: 'Sources 面板（断点调试）',
      difficulty: 3,
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          text: 'Sources 面板是断点调试的核心。通过设置断点暂停代码执行，逐步检查变量状态、调用栈和作用域，精确定位逻辑问题。',
        },
        {
          id: 'p4-2',
          type: 'code',
          language: 'javascript',
          filename: '断点调试操作',
          code: `// 1. 设置断点：点击行号，蓝色标记表示断点
// 2. debugger 语句：代码中硬编码断点
function riskyCalc(a, b) {
  debugger;  // 执行到这里暂停（仅在 DevTools 打开时）
  return a / b;
}

// 3. 断点控制
//   F8  / Cmd+\\      继续（Resume）- 执行到下一个断点
//   F10 / Cmd+'      单步跳过（Step Over）- 不进入函数
//   F11 / Cmd+;      单步进入（Step Into）- 进入函数
//   Shift+F11        单步跳出（Step Out）- 跳出当前函数
//   Cmd+F8           切换断点启用/禁用

// 4. Watch 面板：监视变量表达式
//    点击 + 添加表达式，可输入任意 JS 表达式

// 5. Scope 面板：查看当前作用域变量
//    - Local：当前函数局部变量
//    - Closure：闭包变量
//    - Global：全局变量

// 6. Call Stack 面板：调用栈
//    点击栈帧跳转到对应代码位置
//    可在任意栈帧处检查变量（异步函数显示异步调用链）

// 7. 断点面板管理
//    勾选启用/禁用单个断点
//    右键 "Remove all" 清空所有断点
//    "Deactivate breakpoints" 临时禁用全部`,
        },
        {
          id: 'p4-3',
          type: 'list',
          items: [
            '行断点：最常用，代码执行到该行暂停',
            '条件断点：右键行号设置，表达式为真才暂停（如 i === 100）',
            '日志断点：右键行号设置，不暂停只输出日志（替代 console.log）',
            'DOM 断点：Elements 面板右键元素，子树修改/属性修改/节点删除时暂停',
            'XHR 断点：URL 包含指定字符串时暂停（如 /api/user）',
            'Event Listener 断点：特定事件触发时暂停（click/keydown 等）',
            'Exception 断点：抛出异常时暂停（区分捕获/未捕获）',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 5：条件断点与日志断点
    // ========================================================================
    {
      order: 5,
      title: '条件断点 / 日志断点',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          text: '条件断点和日志断点是高级断点类型，在循环和频繁触发的代码中尤为有用，避免反复单步执行。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            title: '断点类型详解',
            items: [
              {
                title: '条件断点（Conditional Breakpoint）',
                content: '右键行号 → "Add conditional breakpoint"。输入表达式，仅当表达式为真时暂停。适合循环中排查特定条件，如 for 循环中 i === 100 时检查变量状态。',
                code: '// 右键行号设置条件\nfor (let i = 0; i < 10000; i++) {\n  // 条件断点：i === 9999\n  process(arr[i]);\n}',
                codeLanguage: 'javascript',
              },
              {
                title: '日志断点（Logpoint）',
                content: '右键行号 → "Add logpoint"。不暂停代码，只在控制台输出日志。替代临时 console.log，无需修改源码、无需重新构建。支持模板字符串。',
                code: '// 日志断点：无需暂停，仅输出\n// 表达式：`i=${i}, value=${arr[i]}`\nfor (let i = 0; i < 1000; i++) {\n  process(arr[i]);\n}',
                codeLanguage: 'javascript',
              },
              {
                title: '条件 + 日志组合',
                content: '日志断点也支持条件表达式。在 Logpoint 设置中可添加条件，仅在满足条件时输出日志。例如循环中只输出偶数索引的值。',
                code: '// 日志断点带条件\n// 条件：i % 2 === 0\n// 表达式：`偶数索引 ${i}: ${arr[i]}`\nfor (let i = 0; i < 1000; i++) {\n  process(arr[i]);\n}',
                codeLanguage: 'javascript',
              },
              {
                title: '断点编辑与禁用',
                content: '右键已有断点 → "Edit breakpoint" 修改条件；点击断点图标可禁用（变灰）但不删除；Breakpoints 面板可批量勾选/取消勾选。Deactivate all 临时禁用全部断点。',
                code: '// 断点面板操作\n// ✓ 行断点（启用）\n// ○ 行断点（禁用）\n// 右键 → Remove all 清空',
                codeLanguage: 'javascript',
              },
            ],
          },
        },
        {
          id: 'p5-3',
          type: 'callout',
          variant: 'tip',
          title: '日志断点的优势',
          text: '日志断点无需修改源码、无需重新构建部署，特别适合线上问题排查。配合条件表达式，可以在海量日志中精确定位问题场景。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：DOM 断点与 XHR 断点
    // ========================================================================
    {
      order: 6,
      title: 'DOM 断点 / XHR 断点',
      difficulty: 3,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          text: 'DOM 断点和 XHR 断点是特殊场景的调试利器。前者定位 DOM 修改来源，后者在特定网络请求时暂停。',
        },
        {
          id: 'p6-2',
          type: 'code',
          language: 'javascript',
          filename: 'DOM/XHR 断点',
          code: `// === DOM 断点 ===
// 在 Elements 面板右键元素 → "Break on"
// 1. subtree modifications：子树修改时暂停
//    适合：元素被动态插入/移除，但不知是哪段代码做的
//    示例：排查列表项被意外清空的原因

// 2. attribute modifications：属性修改时暂停
//    适合：class/style 被意外修改，定位修改代码
//    示例：排查元素 display 被改为 none 的源头

// 3. node removal：节点被删除时暂停
//    适合：元素被意外移除，定位移除逻辑
//    示例：排查弹窗被提前关闭的原因

// === XHR/Fetch 断点 ===
// Sources → XHR Breakpoints 面板 → + 添加 URL 子串
// 当请求 URL 包含指定字符串时暂停（在 send() 处）

// 示例：请求 /api/user 时暂停
// 添加断点："/api/user"
fetch('/api/user?id=1')  // 执行到这里暂停
  .then(res => res.json())

// 应用场景：
// - 排查请求参数错误（暂停后查看 arguments）
// - 定位发起请求的代码位置（调用栈）
// - 验证请求是否真的发出（避免缓存误导）
// - 拦截第三方库的请求（如分析上报）`,
        },
        {
          id: 'p6-3',
          type: 'list',
          items: [
            'DOM 断点：Elements 面板右键元素设置，DOM 变化时暂停',
            'XHR 断点：URL 包含指定字符串时暂停，定位请求发起代码',
            'Event Listener 断点：特定事件触发时暂停（如 click/submit）',
            'Function 断点：debug(fn) 在函数调用时暂停',
            'Exception 断点：异常抛出时暂停，区分 Caught/Uncaught',
          ],
        },
        {
          id: 'p6-4',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            language: 'javascript',
            lines: [
              "fetch('/api/user?id=1')",
              '  .then(res => res.json())',
              '  .then(data => {',
              "    console.log('用户数据:', data)",
              '    renderUser(data)',
              '  })',
            ],
            steps: [
              { title: '设置 XHR 断点', description: 'Sources → XHR Breakpoints → 添加 "/api/user"，当请求 URL 含该子串时暂停。', highlightLines: [1] },
              { title: '请求触发暂停', description: 'fetch 执行到 send() 时命中断点暂停，Call Stack 显示发起请求的调用链。', highlightLines: [1], output: 'Paused at send() in fetch' },
              { title: '查看请求参数', description: '在 Scope 面板查看 arguments，确认 id=1 参数正确传入。Step over 跳过 Promise 内部。', highlightLines: [1, 2] },
              { title: '响应到达', description: '请求返回后 .then 回调入队微任务，可在 then 行打断点查看 res。', highlightLines: [2, 3] },
              { title: '数据处理', description: 'data 解析完成，查看实际数据结构是否与预期一致。', highlightLines: [4, 5], output: '用户数据: {id:1, name:"..."}' },
              { title: '渲染调用', description: 'renderUser(data) 执行，若页面未正确渲染可在此断点排查。', highlightLines: [5] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 7：Network 面板
    // ========================================================================
    {
      order: 7,
      title: 'Network 面板（网络抓包）',
      difficulty: 2,
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          text: 'Network 面板记录所有网络请求，是排查接口问题、性能优化、CORS 错误的核心工具。',
        },
        {
          id: 'p7-2',
          type: 'code',
          language: 'javascript',
          filename: 'Network 调试技巧',
          code: `// 1. 过滤请求
//    按类型：All/XHR/JS/CSS/Img/Doc/WS/Other
//    按域名：输入 domain.com
//    按属性：status-code:200、method:POST、larger-than:1MB

// 2. 请求详情（点击请求查看）
//    Headers：请求头 + 响应头 + Query 参数
//    Payload：请求体（POST 数据）
//    Preview：响应预览（JSON/HTML/图片）
//    Response：原始响应内容
//    Timing：请求时序（Queueing/DNS/TCP/TLS/Waiting/Download）
//    Initiator：发起源（代码位置）

// 3. 请求操作
//    右键 → "Replay XHR"：重发请求（不重新加载页面）
//    右键 → "Copy"：复制为 fetch/cURL/PowerShell
//    右键 → "Block request URL"：拦截请求（Block 面板管理）

// 4. 节流模拟（Throttling）
//    Online / Fast 3G / Slow 3G / Custom
//    模拟弱网环境测试加载性能与错误处理

// 5. 缓存控制
//    勾选 "Disable cache"：DevTools 打开时禁用缓存
//    "Update on reload"：强制更新 Service Worker

// 6. 导出 HAR 文件
//    右键 → "Save all as HAR"：导出全部请求（便于分享分析）`,
        },
        {
          id: 'p7-3',
          type: 'callout',
          variant: 'tip',
          title: 'Timing 各阶段含义',
          text: 'Queueing：排队等待；Stalled：连接停滞；DNS：DNS 解析；Initial connection：TCP 握手；SSL：TLS 协商；Request sent：发送请求；Waiting (TTFB)：等待首字节；Content Download：下载内容。优化需针对最慢的阶段。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：接口 Mock 与拦截
    // ========================================================================
    {
      order: 8,
      title: '接口 Mock 与拦截',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          text: '前端开发常需 Mock 接口数据。DevTools 内置的 Network Override 和 Local Overrides 可拦截并修改响应，无需修改业务代码。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '方案',
            columns: ['Local Overrides', 'Network Block', ' Charles/Proxy', 'MSW (Service Worker)'],
            rows: [
              { feature: '实现层级', values: ['DevTools 本地', 'DevTools 本地', '系统代理', '浏览器 SW'] },
              { feature: '修改响应', values: ['✓ 用本地文件替换', '✗ 直接阻断', '✓ 重写响应', '✓ 拦截重写'] },
              { feature: '修改请求', values: ['✗', '✗', '✓', '✓'] },
              { feature: 'HTTPS 支持', values: ['原生', '原生', '需装证书', '原生'] },
              { feature: '团队共享', values: ['✗ 本地', '✗ 本地', '✓ 配置文件', '✓ 代码仓库'] },
              { feature: '持久化', values: ['✓ 跨会话', '✓ 跨会话', '✓', '✓ 代码定义'] },
              { feature: '适用场景', values: ['调试静态资源', '测试错误处理', '抓包改包', '单元测试/E2E'] },
            ],
            highlightColumn: 3,
          },
        },
        {
          id: 'p8-3',
          type: 'code',
          language: 'javascript',
          filename: 'Local Overrides 与 MSW',
          code: `// === DevTools Local Overrides ===
// Sources → Overrides → Select folder
// 在 Network 面板右键请求 → "Override content"
// 编辑响应内容后保存，后续请求返回本地文件

// === MSW (Mock Service Worker) ===
// 安装：npm i msw -D
import { setupWorker } from 'msw';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);
worker.start();

// handlers.js
export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ name: 'Mock User', age: 25 });
  }),
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ token: 'mock-token-' + body.username });
  }),
];

// 生成 SW 文件：npx msw init public/ --save
// 适合：单元测试、E2E 测试、本地开发 Mock`,
        },
        {
          id: 'p8-4',
          type: 'callout',
          variant: 'tip',
          title: 'MSW 的优势',
          text: 'MSW 通过 Service Worker 拦截请求，无需修改业务代码，同一套 Mock 可用于开发、测试、演示。支持请求/响应拦截，可模拟网络错误和延迟。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Performance 面板
    // ========================================================================
    {
      order: 9,
      title: 'Performance 面板（性能分析）',
      difficulty: 3,
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          text: 'Performance 面板记录页面运行时的性能数据，火焰图直观展示主线程任务，是定位卡顿、长任务的利器。',
        },
        {
          id: 'p9-2',
          type: 'code',
          language: 'javascript',
          filename: 'Performance 分析流程',
          code: `// 1. 录制：点击 Record → 操作页面 → Stop
//    可选：重新加载录制（Ctrl+R 同时录）、自动停止

// 2. 关键指标
//    FPS：帧率，绿色越高越好，红色表示掉帧
//    CPU：CPU 使用率，黄色为脚本，紫色为样式计算
//    NET：网络请求时序
//    Main：主线程火焰图（核心）

// 3. 火焰图解读
//    X 轴：时间（从左到右）
//    Y 轴：调用栈深度（上层调用下层）
//    宽度：函数执行时长（>50ms 标红为长任务）
//    点击函数 → Summary 面板查看耗时分布
//    底部 Bottom-Up：按耗时排序的函数列表

// 4. 性能 API 编程式测量
// 测量代码块耗时
console.time('render');
heavyRender();
console.timeEnd('render');  // "render: 234.5ms"

// 高精度时间戳
const start = performance.now();
// ... 操作
const duration = performance.now() - start;

// Performance Mark & Measure
performance.mark('renderStart');
heavyRender();
performance.mark('renderEnd');
performance.measure('render', 'renderStart', 'renderEnd');
const measures = performance.getEntriesByName('render');
console.log('耗时:', measures[0].duration);

// 5. Long Task API（监听长任务）
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn('长任务:', entry.duration, 'ms');
  });
});
observer.observe({ entryTypes: ['longtask'] });`,
        },
        {
          id: 'p9-3',
          type: 'callout',
          variant: 'warning',
          title: '长任务危害',
          text: '超过 50ms 的任务会阻塞主线程，导致输入响应延迟和动画卡顿。优化方向：拆分任务（setTimeout/await）、Web Worker、requestIdleCallback。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：Memory 面板
    // ========================================================================
    {
      order: 10,
      title: 'Memory 面板（内存排查）',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          text: 'Memory 面板通过堆快照对比定位内存泄漏。常见泄漏源：未清除的定时器、闭包、事件监听器、全局变量、脱离 DOM 引用。',
        },
        {
          id: 'p10-2',
          type: 'code',
          language: 'javascript',
          filename: '内存泄漏排查',
          code: `// 1. 堆快照对比法
//    Step 1：操作前拍快照 Snapshot 1
//    Step 2：执行可疑操作（如打开/关闭弹窗）
//    Step 3：拍快照 Snapshot 2
//    Step 4：Snapshot 2 → Comparison → Snapshot 1
//    查看 "Delta" 列（新增对象），定位泄漏

// 2. 分配时间线
//    Record → Allocation timeline
//    蓝色柱：分配内存；灰色柱：已回收
//    持续蓝色表示未回收（可能泄漏）

// 3. 常见泄漏模式
let leakedData = [];

// 泄漏1：全局变量（未声明直接赋值）
function leak1() {
  leaked = '全局变量';  // 等价 window.leaked
}

// 泄漏2：被遗忘的定时器
function leak2() {
  setInterval(() => {
    console.log(leakedData);  // leakedData 永不释放
  }, 1000);
}

// 泄漏3：闭包持有大对象
function leak3() {
  const huge = new Array(1e6);
  return () => console.log(huge.length);  // huge 被闭包持有
}

// 泄漏4：脱离 DOM 引用
function leak4() {
  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    console.log(button.textContent);  // button 被监听器持有
  });
  document.body.removeChild(button);  // DOM 移除但 JS 仍引用
}

// 修复：及时清理引用
function fixed() {
  const button = document.querySelector('button');
  const handler = () => console.log('clicked');
  button.addEventListener('click', handler);
  button.addEventListener('click', handler);
  // 清理时移除监听器
  button.removeEventListener('click', handler);
}`,
        },
        {
          id: 'p10-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '泄漏场景',
            columns: ['全局变量', '定时器未清', '闭包持有', 'DOM 引用', '事件监听'],
            rows: [
              { feature: '成因', values: ['未声明变量', 'setInterval 未 clear', '闭包捕获大对象', 'JS 引用已移除 DOM', '未 removeEventListener'] },
              { feature: '检测难度', values: ['简单', '中等', '困难', '中等', '中等'] },
              { feature: '常见度', values: ['中', '高', '高', '中', '高'] },
              { feature: '修复方法', values: ['严格模式 use strict', 'clearInterval', '置 null 释放', '移除前解除引用', 'removeEventListener'] },
            ],
          },
        },
        {
          id: 'p10-4',
          type: 'callout',
          variant: 'tip',
          title: 'WeakMap/WeakSet 防泄漏',
          text: '需要为对象关联额外数据时，使用 WeakMap 而非普通对象。当对象被回收，WeakMap 中的条目自动消失，避免内存泄漏。',
        },
      ],
    },

    // ========================================================================
    // 知识点 11：Application 面板
    // ========================================================================
    {
      order: 11,
      title: 'Application 面板（存储/缓存）',
      difficulty: 2,
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          text: 'Application 面板管理浏览器存储：localStorage、sessionStorage、IndexedDB、Cookie、Cache Storage、Service Worker。',
        },
        {
          id: 'p11-2',
          type: 'code',
          language: 'javascript',
          filename: '存储调试',
          code: `// Application 面板功能
// 1. Storage 概览：显示各存储的占用空间
//    "Clear site data"：一键清空所有存储（调试登录态时常用）

// 2. Local Storage / Session Storage
//    双击键值编辑，右键删除
//    查看域名下的所有键值对

// 3. IndexedDB
//    展开数据库 → Object Store → 记录列表
//    双击编辑记录，右键删除

// 4. Cookies
//    查看每个 Cookie 的 Name/Value/Domain/Path/Expires/HttpOnly/Secure/SameSite
//    调试登录态：删除 token Cookie 强制重新登录
//    调试跨域：检查 SameSite 属性是否阻止 Cookie 发送

// 5. Cache Storage（Service Worker 缓存）
//    查看 PWA 离线缓存的资源
//    右键删除过期缓存

// 6. Service Workers
//    查看 SW 注册状态、运行状态
//    "Update"：强制更新 SW
//    "Unregister"：注销 SW（调试 PWA 时常用）
//    "Offline"：模拟离线环境测试缓存策略

// 7. Frame 检查
//    查看页面中的 iframe（跨域 iframe 受限）`,
        },
        {
          id: 'p11-3',
          type: 'list',
          items: [
            'Storage：一键清除所有存储（登录态/缓存/SW）',
            'Local/Session Storage：编辑键值，调试持久化数据',
            'IndexedDB：管理结构化数据，调试离线应用',
            'Cookies：检查 HttpOnly/Secure/SameSite 属性',
            'Service Workers：注册/注销/更新 SW，模拟离线',
            'Cache Storage：管理 PWA 离线缓存资源',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 12：Lighthouse 与 Web Vitals
    // ========================================================================
    {
      order: 12,
      title: 'Lighthouse 与 Web Vitals',
      difficulty: 2,
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          text: 'Lighthouse 是 Google 的自动化审计工具，从性能、可访问性、最佳实践、SEO 四个维度评估页面。Web Vitals 是核心性能指标。',
        },
        {
          id: 'p12-2',
          type: 'code',
          language: 'javascript',
          filename: 'Web Vitals 指标',
          code: `// Lighthouse 四大维度
// 1. Performance：性能（FCP/LCP/TBT/CLS/Speed Index）
// 2. Accessibility：可访问性（ARIA/对比度/标签）
// 3. Best Practices：最佳实践（HTTPS/错误处理/控制台错误）
// 4. SEO：搜索引擎优化（meta/标题/可爬取性）

// === Core Web Vitals（核心性能指标）===
// LCP (Largest Contentful Paint)：最大内容绘制
//   目标：< 2.5s
//   测量：主要内容加载完成时间
//   优化：预加载关键资源、CDN、图片优化

// FID (First Input Delay) → INP (Interaction to Next Paint)
//   目标：< 100ms (FID) / < 200ms (INP)
//   测量：首次输入响应延迟
//   优化：减少长任务、Web Worker、代码分割

// CLS (Cumulative Layout Shift)：累计布局偏移
//   目标：< 0.1
//   测量：视觉稳定性（元素意外移动）
//   优化：图片设宽高、字体 size-adjust、避免动态插入

// 编程式测量 Web Vitals
import { onLCP, onFID, onCLS, onINP, onFCP, onTTFB } from 'web-vitals';

onLCP(console.log);    // 最大内容绘制
onFID(console.log);    // 首次输入延迟
onCLS(console.log);    // 累计布局偏移
onINP(console.log);    // 交互延迟（替代 FID）
onFCP(console.log);    // 首次内容绘制
onTTFB(console.log);   // 首字节时间

// 上报到分析服务
function sendToAnalytics(metric) {
  fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}
onLCP(sendToAnalytics);
onCLS(sendToAnalytics);
onINP(sendToAnalytics);`,
        },
        {
          id: 'p12-3',
          type: 'callout',
          variant: 'tip',
          title: 'INP 取代 FID',
          text: '2024 年 3 月起，INP（Interaction to Next Paint）正式取代 FID 成为 Core Web Vitals 指标。INP 测量整个会话中所有交互的响应延迟，比 FID（仅首次输入）更全面。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：SourceMap 原理与定位
    // ========================================================================
    {
      order: 13,
      title: 'SourceMap 原理与定位',
      difficulty: 3,
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          text: '生产环境代码经过压缩混淆，错误堆栈难以定位。SourceMap 映射压缩代码到源码，是线上错误排查的关键。',
        },
        {
          id: 'p13-2',
          type: 'code',
          language: 'javascript',
          filename: 'SourceMap 配置',
          code: `// === 构建 SourceMap ===
// Vite 生产构建默认生成 .map 文件
// vite.config.ts
export default {
  build: {
    sourcemap: true,  // 生成 .map 文件
    // sourcemap: 'hidden',  // 生成但不引用（安全）
    // sourcemap: 'inline',  // 内联到 JS（体积大）
  }
}

// Webpack 配置
module.exports = {
  devtool: 'source-map',  // 完整 SourceMap
  // devtool: 'eval-cheap-module-source-map',  // 开发推荐
  // devtool: 'hidden-source-map',  // 生产错误监控
  // devtool: false,  // 不生成
}

// === SourceMap 文件结构 ===
{
  "version": 3,
  "sources": ["src/index.ts"],  // 源文件路径
  "sourcesContent": [...],       // 源文件内容（可选）
  "mappings": "AAAA,SAAS",      // Base64 VLQ 编码的映射
  "names": ["add", "a", "b"]     // 变量名映射
}

// === 安全策略 ===
// 生产环境不暴露 .map 文件（避免源码泄露）
// 1. hidden-source-map：生成但不引用
// 2. .map 文件部署到内网，错误监控服务拉取

// === 错误监控集成 ===
// Sentry/Bugsnag 自动解析 SourceMap
// 配置 webpack/rollup 插件上传 .map 文件
// new SentryWebpackPlugin({
//   include: '.',
//   ignore: ['node_modules'],
// })

// === 手动解析 ===
// npm i source-map
import { SourceMapConsumer } from 'source-map';
const consumer = await new SourceMapConsumer(sourceMap);
const original = consumer.originalPositionFor({
  line: 1,
  column: 100,
});
// { source: 'src/index.ts', line: 42, column: 10, name: 'add' }`,
        },
        {
          id: 'p13-3',
          type: 'callout',
          variant: 'warning',
          title: '生产环境安全',
          text: '.map 文件包含完整源码，直接暴露会泄露业务逻辑。生产环境应使用 hidden-source-map，.map 文件仅部署到错误监控服务（如 Sentry），不通过 CDN 公开访问。',
        },
      ],
    },

    // ========================================================================
    // 知识点 14：移动端调试
    // ========================================================================
    {
      order: 14,
      title: '移动端调试',
      difficulty: 2,
      blocks: [
        {
          id: 'p14-1',
          type: 'paragraph',
          text: '移动端调试面临真机环境、网络限制、触摸交互等挑战。掌握远程调试、模拟器、vConsole 等方案应对不同场景。',
        },
        {
          id: 'p14-2',
          type: 'code',
          language: 'javascript',
          filename: '移动端调试方案',
          code: `// === 1. Chrome 远程调试（Android）===
// 手机：设置 → 开发者选项 → USB 调试
// USB 连接电脑
// 电脑 Chrome：chrome://inspect
// 找到设备 → Inspect 打开 DevTools
// 支持所有桌面 DevTools 功能（Elements/Sources/Network）

// === 2. Safari 远程调试（iOS）===
// iPhone：设置 → Safari → 高级 → Web 检查器
// USB 连接 Mac
// Mac Safari：开发 → iPhone → 页面
// 需要 Mac + iPhone（无 Mac 可用 browserstack）

// === 3. Chrome 模拟器（基础调试）===
// DevTools → 设备工具栏（Cmd+Shift+M）
// 选择设备型号 / 自定义分辨率
// 模拟触摸、网络节流、GPS 位置、传感器
// 限制：无法模拟原生 App WebView 环境

// === 4. vConsole / eruda（注入调试）===
// 适合：无法连接 USB 的环境（如内网/H5 嵌入 App）
// npm i vconsole
import VConsole from 'vconsole';
if (process.env.NODE_ENV !== 'production') {
  new VConsole();  // 页面右下角出现绿色按钮
}
// 功能：Console/Network/Element/Storage/Session
// 注意：生产环境务必移除（影响性能、暴露信息）

// === 5. 代理调试（Charles/Fiddler）===
// 电脑开启代理 → 手机连接代理
// 功能：抓包、修改请求/响应、Mock 数据、Map Local
// HTTPS 需在手机安装证书

// === 6. BrowserStack / 真机云 ===
// 跨平台真机测试（无实体设备时）
// 支持 iOS/Android 多种机型浏览器`,
        },
        {
          id: 'p14-3',
          type: 'list',
          items: [
            'Chrome 远程调试：Android + USB + chrome://inspect',
            'Safari 远程调试：iOS + Mac + Safari 开发菜单',
            '模拟器：基础触摸/网络/GPS 模拟，无法测 WebView',
            'vConsole：注入式调试，适合无 USB 环境',
            'Charles 代理：抓包改包，HTTPS 需装证书',
            'BrowserStack：云端真机，跨平台测试',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 15：调试方法论与排错思路
    // ========================================================================
    {
      order: 15,
      title: '调试方法论与排错思路',
      difficulty: 2,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          text: '系统化的排错思路比盲目试错更高效。掌握"复现 → 隔离 → 定位 → 验证"四步法，配合二分法缩小问题范围。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: '步骤1', title: '稳定复现', description: '明确触发条件：操作步骤、数据状态、环境（浏览器/网络/设备）。无法复现的问题最难修复。记录复现步骤、错误信息、堆栈。', status: 'done' },
              { time: '步骤2', title: '隔离变量', description: '二分法缩小范围：注释代码、切换环境、对比版本。确认是前端/后端/网络问题，是代码/配置/环境问题。', status: 'done' },
              { time: '步骤3', title: '定位根因', description: 'Console 日志、断点调试、Network 抓包、Performance 分析。根据症状选择工具：白屏看 Console，卡顿看 Performance，接口错看 Network。', status: 'active' },
              { time: '步骤4', title: '修复验证', description: '最小修改修复根因（非症状）。验证：原场景复现通过 + 相关场景无回归 + 边界场景测试。添加测试用例防止复发。', status: 'active' },
              { time: '步骤5', title: '复盘总结', description: '记录问题原因、修复方案、预防措施。常见模式：类型检查（TS）、单元测试、Code Review、监控告警。', status: 'pending' },
            ],
          },
        },
        {
          id: 'p15-3',
          type: 'code',
          language: 'javascript',
          filename: '常见问题排查',
          code: `// === 白屏排查 ===
// 1. Console 面板：查看 JS 错误（语法错误/运行时错误）
// 2. Network 面板：关键资源是否加载成功（404/CORS）
// 3. Elements 面板：#root 是否有内容（React 挂载失败）
// 4. Sources 面板：断点定位首屏渲染逻辑
// 5. Application 面板：Service Worker 是否拦截导致空白

// === 接口问题排查 ===
// 1. Network 面板：请求是否发出？状态码？
// 2. Headers：请求参数、Content-Type、Authorization
// 3. Response：响应数据是否符合预期
// 4. Console：是否有 CORS 错误？
// 5. 后端日志：确认请求是否到达后端

// === 性能问题排查 ===
// 1. Performance 录制：定位长任务
// 2. Network：资源加载时序（TTFB/Download）
// 3. Lighthouse：自动化性能审计
// 4. Memory：内存泄漏导致越来越慢

// === 二分法调试 ===
// 问题：页面某功能失效，不知哪段代码导致
// 1. 注释一半代码，看问题是否消失
// 2. 消失 → 问题在被注释的代码中
// 3. 仍存在 → 问题在剩余代码中
// 4. 重复直到定位具体代码行

// === Git Bisect 自动二分 ===
// git bisect start
// git bisect bad           # 当前版本有问题
// git bisect good v1.0.0   # v1.0.0 没问题
// Git 自动切换版本，测试后标记 good/bad
// git bisect reset          # 结束`,
        },
        {
          id: 'p15-4',
          type: 'callout',
          variant: 'tip',
          title: '小黄鸭调试法',
          text: '向同事（或小黄鸭）逐行解释代码逻辑，过程中常能自己发现问题。原理：解释时被迫梳理思路，暴露认知盲点。',
        },
      ],
    },

    // ========================================================================
    // 知识点 16：前端调试面试题精选（Accordion）
    // ========================================================================
    {
      order: 16,
      title: '前端调试面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p16-1-intro',
          type: 'paragraph',
          text: '精选前端调试高频面试题，涵盖 DevTools 各面板、断点调试、性能分析、内存排查、移动端调试与排错方法论。点击展开查看答案。',
        },
        {
          id: 'p16-2-qa',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: Chrome DevTools 中 $0 和 $(selector) 分别是什么？',
                content: '$0：引用上次在 Elements 面板选中的 DOM 元素（$1 是上上次，最多 $4）。\n\n$(selector)：document.querySelector 的简写。\n$$(selector)：querySelectorAll 的简写。\n\n注意：这些是 DevTools 注入的命令行 API，仅在 Console 中可用，代码中不存在。常用场景：Console 里快速操作 Elements 选中的元素。',
              },
              {
                title: 'Q2: 条件断点、日志断点、DOM 断点分别用于什么场景？',
                content: '三种断点各有适用：\n\n条件断点（Conditional Breakpoint）：\n- 表达式为真时暂停。\n- 适合循环中排查特定条件（如 i === 100）。\n\n日志断点（Logpoint）：\n- 输出日志但不暂停。\n- 是 console.log 的非侵入替代，不改源码即可加日志。\n\nDOM 断点：\n- 节点子树变更/属性变更/节点删除时暂停。\n- 适合排查"不知谁改了 DOM"的问题，免去全局 MutationObserver。',
              },
              {
                title: 'Q3: Performance 面板中如何定位卡顿原因？',
                content: '步骤：\n1. 录制操作过程。\n2. 看 FPS 图表找掉帧区域。\n3. 看主线程火焰图找长任务（>50ms 红色竖条）。\n4. 展开长任务看具体函数耗时。\n5. 关注紫色 Layout 和黄色 Recalculate Style（强制同步布局）。\n\n优化方向：\n- 拆分长任务（requestIdleCallback/scheduler.yield）\n- 减少重排重绘\n- Web Worker 卸载计算\n- 防抖节流',
              },
              {
                title: 'Q4: 如何排查内存泄漏？',
                content: '步骤：\n1. Memory 面板 → Heap Snapshot。\n2. 操作页面（如进入/退出页面、增删列表）。\n3. 再拍一次快照。\n4. 选 "Objects allocated between Snapshot 1 and 2"。\n5. 按 Retained Size 排序找大对象。\n6. 看 Retainers 追溯引用链找泄漏源。\n\n常见泄漏：\n- 未清除的定时器\n- 闭包持有大对象\n- detached DOM\n- 全局变量\n- 事件监听未解绑\n- WeakMap 未用导致强引用',
              },
              {
                title: 'Q5: SourceMap 在生产环境如何安全使用？',
                content: '问题：直接公开 .map 文件会泄露源码。\n\n方案：\n- 用 hidden-source-map 生成 .map 但不在 JS 中引用（浏览器不自动加载）。\n- 将 .map 部署到错误监控服务（Sentry/Bugsnag）。\n- 线上报错时监控服务用 .map 还原源码位置和堆栈。\n\n开发环境用 source-map 或 eval-cheap-module-source-map 追求快。\n\n注意：inline-source-map 内联到 JS 会增大体积且泄露源码，仅用于开发。',
              },
              {
                title: 'Q6: Network 面板能排查哪些问题？',
                content: '排查维度：\n1. 请求失败（红色，看 Status/Response）。\n2. 慢请求（按 Time 排序，看 Waterfall 各阶段：Queueing/Stalled/TTFB/Content Download）。\n3. 重复请求。\n4. 缓存失效（看 from disk cache / from memory cache）。\n5. CORS 错误。\n6. 请求头/响应头/Cookie/payload。\n\n技巧：\n- 右键 Copy as fetch/cURL。\n- Disable cache 模拟首次访问。\n- Throttling 模拟慢网。\n- Block request URLs 测试容错。',
              },
              {
                title: 'Q7: 移动端 H5 如何调试？',
                content: '常见方案：\n1. Android USB 调试：chrome://inspect 连接手机 Chrome，PC 远程调试（基于 CDP 协议，ADB 转发端口）。\n2. iOS：Safari 开发菜单连接 iPhone。\n3. 无 USB 场景：vConsole/eruda 注入式调试（生产必须移除）。\n4. 代理调试：Charles/Whistle 抓包改包。\n5. 远程真机：BrowserStack。\n\n注意：HTTPS 证书问题需安装代理证书。',
              },
              {
                title: 'Q8: console 的哪些方法容易被忽略但很实用？',
                content: '实用方法：\n- console.table(data) 表格展示数组/对象\n- console.group/groupEnd 分组折叠\n- console.time/timeEnd 计时\n- console.trace() 打印调用栈\n- console.dir(element) 显示 DOM 对象属性（非 HTML）\n- console.assert(cond, msg) 条件为假才输出\n- %c 格式化样式如 console.log("%c红字", "color:red")\n\n生产环境应按级别用 warn/error/info，便于日志聚合分级。',
              },
              {
                title: 'Q9: Lighthouse 的核心指标有哪些？',
                content: '四大维度：\n1. Performance（FCP/LCP/TBT/CLS/Speed Index）\n2. Accessibility（可访问性）\n3. Best Practices（HTTPS、错误处理、图片优化）\n4. SEO\n\nCore Web Vitals 三大核心：\n- LCP < 2.5s（加载）\n- INP < 200ms（交互，2024 取代 FID）\n- CLS < 0.1（视觉稳定）\n\nLighthouse 基于真实浏览器运行，可在 CI 中集成自动监控。',
              },
              {
                title: 'Q10: 如何调试 Service Worker / PWA？',
                content: 'Application 面板 → Service Workers：\n- 查看注册状态、手动 Update/Unregister、Offline 模拟离线。\n\nSources 面板：\n- 对 SW 文件可直接断点调试（SW 运行在独立线程）。\n\nCache Storage：查看缓存条目。\n\n常见问题：\n- SW 不更新（skipWaiting + clients.claim 强制激活）\n- 缓存策略错误（Cache-first vs Network-first）\n- 作用域范围不对',
              },
              {
                title: 'Q11: Elements 面板修改的样式如何持久化？',
                content: '问题：Elements 面板的修改只在内存生效，刷新即丢失。\n\n持久化方案：\n1. 手动复制到源码 CSS。\n2. DevTools 的 "Local Overrides"（Sources → Overrides）：可把网络响应保存到本地，刷新仍生效，适合改 HTML/CSS/JS 做本地实验。\n3. Workspaces：把 DevTools 映射到本地文件系统，直接保存。\n\n注意：Overrides 不改源码只改浏览器拉取的副本。',
              },
              {
                title: 'Q12: async/await 代码如何断点调试？',
                content: '调试方式：\n1. 直接在 await 行打断点，暂停后用 Step into 进入 Promise 链。\n2. 异步断点会跳到微任务队列，Call Stack 可能不完整，开启 "Async stack traces"（Settings）可看异步调用链。\n3. console.trace() 打印调用栈辅助。\n4. 无法断点时用日志断点输出变量。\n\n常见坑：try-catch 吞掉错误导致调试困难，确保 catch 中 console.error 重新抛出。',
              },
              {
                title: 'Q13 【对比题】: 条件断点和 console.log 各自的优缺点？',
                content: '条件断点：\n- 优点：不改源码、可随时增删、表达式为真才暂停、适合精确条件。\n- 缺点：每次执行都求值表达式有性能开销（循环中可能拖慢）。\n\nconsole.log：\n- 优点：简单直观、可输出多个变量、保留历史记录。\n- 缺点：需改源码重新部署、输出过多难筛选、无法暂停执行。\n\n最佳实践：本地用 console.log，线上/复杂条件用条件断点或日志断点（不暂停的 console.log 替代）。',
              },
              {
                title: 'Q14 【对比题】: Heap Snapshot 和 Allocation Timeline 的区别与适用场景？',
                content: 'Heap Snapshot：\n- 记录某时刻所有对象快照。\n- 适合对比两次快照找"增量泄漏"（操作前后新增未释放的对象）。\n\nAllocation Timeline：\n- 实时记录每次内存分配。\n- 适合定位"持续分配不释放"的泄漏点，按时间轴看分配峰值。\n\n适用：\n- Snapshot 适合已知操作引发的泄漏（进入/退出页面）。\n- Timeline 适合不确定何时泄漏、需观察分配模式。\n\n两者常配合使用：Timeline 定位时间点，Snapshot 定位对象。',
              },
              {
                title: 'Q15 【场景题】: 用户反馈页面偶发卡顿，但本地无法复现，如何排查？',
                content: '步骤：\n1. 收集用户环境（浏览器版本/设备/网络/操作路径）。\n2. 查前端监控（RUM 如 Lighthouse CI / 自建性能埋点）确认卡顿时段的 Long Task / FPS 掉帧数据。\n3. 用 Performance 远程录制（Puppeteer 模拟用户环境跑 Performance trace）找长任务。\n4. 检查是否特定数据量导致（大数据列表渲染），本地用 mock 大数据复现。\n5. 检查是否内存泄漏导致（长时间使用后 GC 频繁），模拟长时间操作拍 Heap Snapshot。\n6. 修复后加性能测试防回归。',
              },
              {
                title: 'Q16 【场景题】: 线上 JS 报错但本地正常，如何定位？',
                content: '步骤：\n1. 查错误监控（Sentry）拿错误堆栈 + 用户环境。\n2. 用 hidden-source-map 还原堆栈到源码位置。\n3. 分析可能原因：\n   - 浏览器兼容性（新 API 旧浏览器不支持）\n   - 数据格式差异（后端返回结构与本地不同）\n   - 时序问题（竞态条件本地难触发）\n   - 缓存问题（旧 JS 缓存）\n4. 用 Network 抓包确认接口数据。\n5. 本地 mock 相同数据/浏览器环境复现。\n6. 修复后加测试覆盖该场景，防回归。\n\n原则：先缩小变量（环境/数据/版本），再针对性复现。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 17：综合实战 —— 用断点调试定位闭包变量泄漏
    // ========================================================================
    {
      order: 17,
      title: '综合实战：用断点调试定位闭包变量泄漏',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: '断点调试不只是"暂停看变量"，更是系统化定位根因的工具。本实战串联条件断点、调用栈查看、Watch 表达式、Scope 作用域面板，排查一个经典的闭包变量泄漏问题——循环中定时器捕获了错误的索引。',
        },
        {
          id: 'p17-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '闭包陷阱是 JS 高频 bug：for 循环 + setTimeout 中 i 指向循环结束值而非每次迭代值。本练习训练用条件断点精确定位、用 Scope 面板看闭包捕获的变量、用 Watch 实时观察表达式，掌握"断点 + 作用域 + 调用栈"三位一体的调试法。',
        },
        {
          id: 'p17-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '在下方骨架中：用 let 修复闭包陷阱、用条件断点表达式模拟、用 console.trace 输出调用栈。右侧检查清单逐项校验。',
            initialCode: `// 综合实战：用断点调试定位闭包变量泄漏
// 背景：以下代码期望输出 0,1,2,3,4，但实际输出 5,5,5,5,5（闭包陷阱）

// === 1. 复现问题的错误代码（注释状态，供参考）===
// for (var i = 0; i < 5; i++) {
//   setTimeout(() => console.log(i), 100)
// }
// 问题：var i 是函数作用域，所有闭包共享同一个 i，循环结束后 i=5

// === 2. 修复：用 let 创建块级作用域
// TODO: for (let i = 0; i < 5; i++) { setTimeout(() => console.log(i), 100) }
//   - let 每次迭代创建新的 i，闭包捕获各自的 i

// === 3. 模拟条件断点：只在 i === 3 时输出（调试技巧）
// TODO: function debugLoop() {
//   for (let i = 0; i < 5; i++) {
//     if (i === 3) console.log('命中条件断点: i =', i)  // 模拟条件断点
//   }
// }

// === 4. 用 console.trace 输出调用栈（定位调用来源）
// TODO: function outer() {
//   const name = 'leak'
//   function inner() { console.trace('闭包调用栈') }  // 打印调用链
//   inner()
// }`,
            checks: [
              {
                description: '使用 let 替代 var 修复闭包陷阱',
                pattern: 'for\\s*\\(\\s*let\\s+i\\s*=',
                hint: '把 var i 改为 let i。let 是块级作用域，每次循环迭代创建新的 i 变量，闭包捕获各自的值。var 是函数作用域，所有闭包共享同一个 i。',
              },
              {
                description: '在循环体内有 setTimeout 捕获迭代变量',
                pattern: 'setTimeout[\\s\\S]*?console\\.log\\s*\\(\\s*i\\s*\\)',
                hint: '修复后的代码应保留 for (let i...) { setTimeout(() => console.log(i), 100) }。验证：用 let 后输出 0,1,2,3,4 而非 5,5,5,5,5。',
              },
              {
                description: '用条件判断模拟条件断点（i === 3）',
                pattern: "if\\s*\\(\\s*i\\s*===\\s*3\\s*\\)\\s*console\\.log",
                hint: '条件断点在 Sources 面板设置，这里用 if (i === 3) console.log(...) 模拟。实际调试时在循环行右键 Add conditional breakpoint，输入 i === 3，只在第三次迭代暂停。',
              },
              {
                description: '用 console.trace 输出调用栈',
                pattern: "console\\.trace\\s*\\(",
                hint: 'console.trace() 打印当前调用栈，用于定位函数调用来源。在 inner 函数中调用 console.trace("闭包调用栈") 可看到 outer → inner 的调用链，帮助理解闭包执行流程。',
              },
              {
                description: 'inner 函数作为闭包定义在 outer 内部',
                pattern: 'function\\s+outer[\\s\\S]*?function\\s+inner',
                hint: '闭包结构：function outer() { ... function inner() { ... } inner() }。inner 访问 outer 的变量 name 即闭包。在 DevTools 断点暂停时，Scope 面板会显示 Closure(outer) 含 name 变量。',
              },
            ],
          },
        },
        {
          id: 'p17-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思',
          text: '断点调试核心三件套：1) 条件断点——精确触发避免逐次暂停；2) Scope 面板——看 Local/Closure/Global 作用域链中变量的实际值；3) Call Stack——追溯调用链定位问题源头。闭包陷阱用 let 修复只是表面，更深的理解是：闭包捕获的是变量引用而非值，let 每次迭代创建新绑定从而隔离。面试常考此点。',
        },
      ],
    },

    // ========================================================================
    // 知识点 18：综合实战 —— 用 Performance 面板定位长任务卡顿
    // ========================================================================
    {
      order: 18,
      title: '综合实战：用 Performance 面板定位长任务卡顿',
      difficulty: 4,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '性能卡顿的定位离不开 Performance 火焰图。本实战串联 Performance 录制、长任务识别、火焰图分析、优化方案落地，排查一个大数据列表渲染导致的卡顿问题，掌握性能分析的完整工作流。',
        },
        {
          id: 'p18-2',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '卡顿是前端高频线上问题，而 Performance 面板信息密集难读。本练习训练：识别长任务（>50ms 红条）、读火焰图找耗时函数、区分脚本/布局/绘制开销、选择正确优化策略（拆分任务 vs 减少重排 vs Web Worker）。这是中高级前端必备技能。',
        },
        {
          id: 'p18-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '在下方骨架中：实现同步渲染长列表（问题代码）、用 requestAnimationFrame 分帧渲染（优化1）、用 DocumentFragment 批量插入（优化2）。右侧检查清单校验。',
            initialCode: `// 综合实战：用 Performance 面板定位长任务卡顿
// 背景：渲染 10000 条列表项导致主线程阻塞 >200ms，页面卡顿

// === 1. 问题代码：同步渲染全部项（长任务）
// TODO: function renderSlow(items) {
//   const list = document.querySelector('#list')
//   items.forEach(item => {
//     const li = document.createElement('li')
//     li.textContent = item
//     list.appendChild(li)  // 每次appendChild触发一次重排，极慢
//   })
// }

// === 2. 优化1：DocumentFragment 批量插入（减少重排）
// TODO: function renderFragment(items) {
//   const list = document.querySelector('#list')
//   const frag = document.createDocumentFragment()
//   items.forEach(item => {
//     const li = document.createElement('li')
//     li.textContent = item
//     frag.appendChild(li)  // 先插入fragment，不触发重排
//   })
//   list.appendChild(frag)  // 只触发一次重排
// }

// === 3. 优化2：requestAnimationFrame 分帧渲染（拆分长任务）
// TODO: function renderRaf(items, batchSize = 100) {
//   const list = document.querySelector('#list')
//   let index = 0
//   function renderBatch() {
//     const frag = document.createDocumentFragment()
//     const end = Math.min(index + batchSize, items.length)
//     for (let i = index; i < end; i++) {
//       const li = document.createElement('li')
//       li.textContent = items[i]
//       frag.appendChild(li)
//     }
//     list.appendChild(frag)
//     index = end
//     if (index < items.length) requestAnimationFrame(renderBatch)  // 下一帧继续
//   }
//   requestAnimationFrame(renderBatch)
// }

// === 4. 性能测量：用 performance.now() 计时对比
// TODO: function measure(fn, name) {
//   const start = performance.now()
//   fn()
//   const end = performance.now()
//   console.log(name + '耗时:', end - start, 'ms')
// }`,
            checks: [
              {
                description: '问题代码用 forEach + appendChild 逐个插入（每次重排）',
                pattern: 'renderSlow[\\s\\S]*?forEach[\\s\\S]*?appendChild',
                hint: 'renderSlow 中 items.forEach(item => { ... list.appendChild(li) }) 每次插入触发一次重排，10000 次重排导致长任务。这是性能反模式。',
              },
              {
                description: '优化1用 DocumentFragment 批量插入减少重排',
                pattern: 'renderFragment[\\s\\S]*?createDocumentFragment[\\s\\S]*?appendChild\\s*\\(\\s*frag\\s*\\)',
                hint: 'const frag = document.createDocumentFragment() 创建离屏容器，所有 li 先 append 到 frag（不触发重排），最后 list.appendChild(frag) 一次性插入，只触发一次重排。',
              },
              {
                description: '优化2用 requestAnimationFrame 分帧渲染拆分长任务',
                pattern: 'renderRaf[\\s\\S]*?requestAnimationFrame[\\s\\S]*?requestAnimationFrame',
                hint: 'renderRaf 用 requestAnimationFrame 按批次（batchSize）渲染，每帧只渲染一小批，把 >200ms 长任务拆成多个 <50ms 小任务，主线程保持响应。递归调用 requestAnimationFrame(renderBatch) 直到渲染完。',
              },
              {
                description: '分帧渲染使用 batchSize 参数控制每批数量',
                pattern: 'batchSize\\s*=\\s*100|batchSize',
                hint: 'function renderRaf(items, batchSize = 100) 每批渲染 100 条。batchSize 需平衡：太小帧数多总耗时长，太大单帧仍卡顿。50-200 是常见值，需 Performance 实测调整。',
              },
              {
                description: '用 performance.now() 精确计时测量函数耗时',
                pattern: 'performance\\.now\\s*\\(\\s*\\)[\\s\\S]*?performance\\.now\\s*\\(\\s*\\)',
                hint: 'measure 函数用 const start = performance.now() 记录开始、const end = performance.now() 记录结束，差值即耗时。performance.now() 精度到微秒，比 Date.now() 更适合性能测量。也可用 Performance 面板的 User Timing API（performance.mark/measure）。',
              },
              {
                description: '分帧渲染内也用 DocumentFragment 批量插入',
                pattern: 'renderRaf[\\s\\S]*?createDocumentFragment',
                hint: 'renderRaf 每批也应使用 DocumentFragment 批量插入（frag.appendChild + list.appendChild(frag)），而非逐个 appendChild。两种优化组合使用：fragment 减少重排 + rAF 拆分长任务。',
              },
            ],
          },
        },
        {
          id: 'p18-4',
          type: 'callout',
          variant: 'warning',
          title: '实战反思',
          text: 'Performance 分析核心流程：录制 → 看 FPS 掉帧 → 找红色长任务 → 展开火焰图看耗时函数 → 区分 Scripting(黄)/Rendering(紫)/Painting(绿) 开销 → 针对性优化。本例三种优化策略：减少重排（fragment）、拆分长任务（rAF/scheduler.yield）、卸载计算（Web Worker）。虚拟列表（react-window/virtual-scroller）是大数据列表的终极方案，只渲染可视区域。',
        },
      ],
    },

    // ========================================================================
    // 知识点 19：前端调试知识点速查表
    // ========================================================================
    {
      order: 19,
      title: '前端调试知识点速查表',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          text: '前端调试核心面板、快捷键与排查思路速查。涵盖 DevTools 各面板用途、断点类型、性能/内存指标、移动端调试方案。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '分类',
            columns: ['工具/概念', '要点提示'],
            rows: [
              { feature: 'Elements', values: ['DOM/CSS 实时编辑', '修改不持久化，用 Local Overrides 保存；F12 选中元素后 Console 用 $0 引用'] },
              { feature: 'Console', values: ['日志调试 + 命令行 API', 'console.table/group/time/trace/dir/assert；$( )=querySelector，$$( )=querySelectorAll'] },
              { feature: 'Sources', values: ['断点调试 + 源码查看', 'F10 Step over / F11 Step into / Shift+F11 Step out；Watch/Scope/Call Stack 面板'] },
              { feature: '条件断点', values: ['表达式为真时暂停', '右键行号 Add conditional breakpoint；适合循环中排查特定条件'] },
              { feature: '日志断点', values: ['输出日志不暂停', 'console.log 的非侵入替代；不改源码即可加日志'] },
              { feature: 'DOM 断点', values: ['DOM 变更时暂停', 'subtree/attribute/node removal 三种；排查"谁改了DOM"'] },
              { feature: 'Network', values: ['请求抓包分析', '看 Status/Waterfall/Timing；Disable cache 模拟首次；Throttling 模拟慢网'] },
              { feature: 'TTFB', values: ['等待首字节时间', 'DNS+TCP+TLS+请求发送+服务器处理；反映服务端响应速度'] },
              { feature: 'Performance', values: ['性能录制与火焰图', '找红色长任务(>50ms)；看 FPS 掉帧；区分 Scripting/Rendering/Painting'] },
              { feature: '长任务', values: ['主线程任务 >50ms', '阻塞交互导致卡顿；优化：拆分任务/rAF/Web Worker/防抖节流'] },
              { feature: 'Memory', values: ['内存排查', 'Heap Snapshot 对比快照找泄漏；Allocation Timeline 看分配模式'] },
              { feature: '内存泄漏', values: ['常见泄漏模式', '未清除定时器/闭包持大对象/detached DOM/全局变量/事件未解绑'] },
              { feature: 'Application', values: ['存储/缓存管理', 'localStorage(永久)/sessionStorage(会话)/IndexedDB/Cache Storage/Cookie'] },
              { feature: 'Lighthouse', values: ['性能/可访问性/SEO 审计', 'Performance/Accessibility/Best Practices/SEO 四维度'] },
              { feature: 'Core Web Vitals', values: ['核心体验指标', 'LCP<2.5s(加载) / INP<200ms(交互) / CLS<0.1(视觉稳定)'] },
              { feature: 'SourceMap', values: ['源码映射', '开发 source-map；生产 hidden-source-map 不引用，部署到 Sentry'] },
              { feature: '移动端调试', values: ['远程/注入调试', 'Android: chrome://inspect+USB(CDP)；iOS: Safari开发菜单；无USB: vConsole'] },
              { feature: 'CDP', values: ['Chrome DevTools Protocol', 'DevTools与浏览器通信协议；Puppeteer/Playwright 基于此'] },
              { feature: '调试方法论', values: ['排错五步法', '复现→隔离(二分法)→定位根因→最小修复→验证+复盘'] },
              { feature: 'Git bisect', values: ['版本维度二分法', '自动定位引入问题的 commit；git bisect start/good/bad'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 20：调试测验
    // ========================================================================
    {
      order: 20,
      title: '调试测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          text: '通过测验检验调试知识点的掌握程度。',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】在 Console 中引用上次在 Elements 面板选中的元素，应使用？',
                options: ['$0', '$1', 'this', 'event.target'],
                correctIndex: 0,
                explanation: '$0 引用上次选中的元素，$1 引用上上次，最多到 $4。$(selector) 是 querySelector 的简写，$$(selector) 是 querySelectorAll 的简写。',
              },
              {
                question: '【理解】条件断点的行为是？',
                options: ['每次执行都暂停', '表达式为真时暂停', '不暂停只输出日志', '抛出异常时暂停'],
                correctIndex: 1,
                explanation: '条件断点（Conditional Breakpoint）仅在表达式为真时暂停，适合循环中排查特定条件。日志断点（Logpoint）才是不暂停只输出日志。',
              },
              {
                question: '【记忆】Network 面板中 TTFB 指的是？',
                options: ['Total Time From Begin', 'Time To First Byte', 'Time To Fully Buffered', 'Transfer Time For Body'],
                correctIndex: 1,
                explanation: 'TTFB（Time To First Byte）是等待首字节时间，从发送请求到收到第一个字节响应的耗时。包含 DNS/TCP/TLS/请求发送/服务器处理。',
              },
              {
                question: '【理解】以下哪种是常见的内存泄漏模式？',
                options: ['使用 const 声明', '未清除的 setInterval', '使用箭头函数', '启用严格模式'],
                correctIndex: 1,
                explanation: '未清除的 setInterval/setTimeout 会持续持有回调函数及其闭包变量，导致内存泄漏。应在组件卸载或不再需要时 clearInterval/clearTimeout。',
              },
              {
                question: '【记忆】LCP 的性能目标是？',
                options: ['< 1s', '< 2.5s', '< 4s', '< 6s'],
                correctIndex: 1,
                explanation: 'LCP（Largest Contentful Paint）目标 < 2.5s。2.5-4s 需改善，> 4s 较差。优化方向：预加载关键资源、CDN、图片优化、减少阻塞脚本。',
              },
              {
                question: '【应用】生产环境 SourceMap 的安全做法是？',
                options: ['inline-source-map 内联', '公开 .map 文件', 'hidden-source-map 不引用', '不生成 SourceMap'],
                correctIndex: 2,
                explanation: 'hidden-source-map 生成 .map 文件但不在 JS 中引用，避免源码泄露。.map 文件部署到错误监控服务（如 Sentry）用于线上错误定位。',
              },
              {
                question: '【场景】vConsole 适合哪种场景？',
                options: ['开发环境桌面调试', '无 USB 的移动端 H5', 'Node.js 后端调试', '单元测试'],
                correctIndex: 1,
                explanation: 'vConsole 是注入式调试工具，适合无法连接 USB 的移动端 H5（如内网、嵌入 App）。注意生产环境必须移除，影响性能并暴露信息。',
              },
              {
                question: '【应用】二分法调试的核心思路是？',
                options: ['逐行检查代码', '注释一半代码缩小范围', '重写整个模块', '增加日志输出'],
                correctIndex: 1,
                explanation: '二分法通过注释/禁用一半代码，观察问题是否消失，快速缩小问题范围。Git bisect 是版本维度的二分法，自动定位引入问题的 commit。',
              },
              {
                question: '【记忆】Console 中 console.warn / console.error / console.info 的默认展示区别是？',
                options: ['完全相同，仅图标颜色不同', 'warn 黄色三角，错误红色，info 蓝色 i', '只有 error 会暂停执行', 'info 不显示在 Console'],
                correctIndex: 1,
                explanation: 'Console 日志级别：log 灰色、info 蓝色 i、warn 黄色三角⚠、error 红色圆×。可按级别过滤。生产环境应按严重性选用合适级别，便于日志聚合工具分级告警。',
              },
              {
                question: '【理解】Sources 面板中"逐步执行"（Step over）和"步入"（Step into）的区别是？',
                options: ['两者相同', 'Step over 不进入函数内部，Step into 进入函数内部', 'Step over 跳出函数，Step into 跳过函数', 'Step into 只用于异步代码'],
                correctIndex: 1,
                explanation: 'Step over（F10）执行下一行但不进入函数内部（把函数当一行）。Step into（F11）进入函数内部逐行执行。Step out（Shift+F11）跳出当前函数。三者配合快速定位调用链。',
              },
              {
                question: '【应用】Network 面板中"禁用缓存"（Disable cache）的作用是？',
                options: ['删除所有缓存数据', '在 DevTools 打开时强制跳过 HTTP 缓存，模拟首次访问', '清空 Service Worker', '禁用 Cookie'],
                correctIndex: 1,
                explanation: '勾选 Disable cache 后，DevTools 打开期间所有请求强制跳过缓存（加 Cache-Control: no-cache），模拟首次访问。关闭 DevTools 后恢复正常缓存。注意只影响 DevTools 打开时的请求。',
              },
              {
                question: '【对比】条件断点和日志断点的关键区别是？',
                options: ['两者完全相同', '条件断点满足条件会暂停执行，日志断点输出日志但不暂停', '条件断点更快', '日志断点需要额外插件'],
                correctIndex: 1,
                explanation: '条件断点（Conditional Breakpoint）表达式为真时暂停，打断执行流。日志断点（Logpoint）输出日志但不暂停，适合循环中观察变量变化而不中断。日志断点是 console.log 的非侵入替代。',
              },
              {
                question: '【理解】Performance 面板中"长任务"（Long Task）的阈值是？',
                options: ['> 50ms', '> 100ms', '> 200ms', '> 500ms'],
                correctIndex: 0,
                explanation: '主线程任务超过 50ms 即为长任务（Long Task），会阻塞交互导致卡顿。Performance 面板用红色竖条标记。优化方向：拆分任务、requestIdleCallback、Web Worker、节流防抖。',
              },
              {
                question: '【场景】线上页面偶发白屏，但本地无法复现，第一步排查应？',
                options: ['重写整个页面', '查看 Sentry 等监控的错误堆栈 + SourceMap 定位', '逐行注释代码', '更换浏览器'],
                correctIndex: 1,
                explanation: '线上偶发问题本地难复现，应优先查错误监控（Sentry/Bugsnag）的报错堆栈，用 hidden-source-map 还原源码位置。结合用户环境（浏览器版本/网络/设备）缩小范围。盲目重写或逐行排查效率极低。',
              },
              {
                question: '【应用】Memory 面板中 Heap Snapshot 主要用于排查？',
                options: ['CPU 热点函数', '内存泄漏与对象引用链', '网络请求耗时', 'CSS 计算样式'],
                correctIndex: 1,
                explanation: 'Heap Snapshot（堆快照）记录某时刻所有 JS 对象，对比两次快照可定位泄漏对象。按 Retained Size 排序找最大泄漏源，用 Dominators/GC Roots 追溯引用链。GC 路径上的对象无法回收。',
              },
              {
                question: '【记忆】Chrome DevTools 远程调试移动端的协议是？',
                options: ['HTTP', 'WebSocket', 'Chrome DevTools Protocol (CDP)', 'FTP'],
                correctIndex: 2,
                explanation: 'Chrome DevTools Protocol (CDP) 是 DevTools 与浏览器通信的协议，远程调试基于它。USB 调试时 PC 通过 ADB 转发端口，用 CDP 与手机 Chrome 通信。Puppeteer/Playwright 也基于 CDP。',
              },
              {
                question: '【对比】Application 面板中 localStorage 和 sessionStorage 的区别是？',
                options: ['两者完全相同', 'localStorage 永久存储，sessionStorage 仅当前标签页会话', 'localStorage 容量更大且跨域共享', 'sessionStorage 可存对象'],
                correctIndex: 1,
                explanation: 'localStorage 永久存储（手动清除才消失），同源共享。sessionStorage 仅当前标签页会话有效（关闭标签即清除），不跨标签页共享。两者均约 5-10MB，仅存字符串。Application 面板可查看/编辑/清除。',
              },
              {
                question: '【理解】DOM 断点（DOM Breakpoint）的触发时机是？',
                options: ['JS 执行错误时', '指定 DOM 节点被修改/属性变化/子树变更时', '页面加载完成时', 'CSS 计算样式变化时'],
                correctIndex: 1,
                explanation: 'DOM 断点在指定节点发生 subtree modifications（子树变更）、attribute modifications（属性变更）、node removal（节点删除）时触发。适合排查"不知谁改了 DOM"的问题，避免全局 MutationObserver。',
              },
              {
                question: '【综合】关于调试方法论，以下说法错误的是？',
                options: [
                  '先稳定复现再排查，无法复现的问题最难修',
                  '二分法缩小范围比逐行检查更高效',
                  '修复症状即可，根因不重要',
                  '修复后需验证原场景 + 相关场景无回归',
                ],
                correctIndex: 2,
                explanation: '修复必须针对根因而非症状。只修症状（如加 try-catch 吞错）会把问题隐藏并推迟爆发，导致更难排查。正确流程：复现→隔离→定位根因→最小修改修复→验证→复盘加测试防复发。',
              },
            ],
          },
        },
        {
          id: 'p20-3',
          type: 'callout',
          variant: 'tip',
          title: '测验完成',
          text: '断点调试、Network 抓包、性能分析是日常调试三大核心技能，务必熟练掌握。排错方法论比工具使用更重要：先复现，再隔离，后定位。',
        },
      ],
    },
  ],
}
