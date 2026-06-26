/**
 * 模块 04：DOM / BOM / Web API
 *
 * 严格遵循 docx/模块四.md 设计文档：
 * - 19 个知识点（18 章节 + 1 小测验）
 * - 19 个可视化演示（每个知识点配 1 个）
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - #1 知识图谱（KnowledgeGraph）
 * - #2 DOM 树可视化（DomTreeVisualizer）
 * - #3 节点查询与遍历（Sandbox）
 * - #4 节点增删改（Sandbox）
 * - #5 属性与特性（CompareTable）
 * - #6 样式操作（Sandbox）
 * - #7 事件流三阶段（EventFlowVisualizer）
 * - #8 事件委托（EventDelegationDemo）
 * - #9 事件对象（CompareTable）
 * - #10 window 对象（ArchitectureDiagram）
 * - #11 location 对象（LocationParser）
 * - #12 history 对象（HistoryRouterDemo）
 * - #13 navigator 对象（CompareTable）
 * - #14 localStorage / sessionStorage（StoragePlayground）
 * - #15 Cookie（CompareTable）
 * - #16 几何尺寸 API（GeometryCalculator）
 * - #17 滚动 API（ScrollAnimationDemo）
 * - #18 文件处理（FileUploadDemo）
 * - #19 Blob 与下载（BlobDownloadDemo）
 * - #20 定时器与 rAF（RafAnimationDemo）
 * - #21 DOM/BOM 小测验（QuizCard）
 */
import type { ModuleMeta } from '../lib/types'

export const domBomWebApiModule: ModuleMeta = {
  number: '04',
  title: 'DOM / BOM / Web API',
  slug: 'dom-bom-webapi',
  stage: 'basics',
  stageLabel: '基础阶段 · 第 4 模块',
  icon: '04',
  summary: 'DOM 节点操作、事件系统、BOM 对象、存储 API、几何尺寸、文件处理、定时调度。',
  knowledgePointCount: 19,
  visualizationCount: 19,
  points: [
    // ========================================================================
    // 知识点 1：模块导览
    // ========================================================================
    {
      order: 1,
      title: '模块导览：DOM / BOM / Web API',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: '浏览器为 JavaScript 提供了三套核心 API：DOM 操作页面结构，BOM 操作浏览器窗口，Web API 提供存储、文件、调度等能力。掌握这三套 API 是构建任何 Web 应用的基础。',
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
              { id: 'storage', label: '存储', group: 'branch', weight: 2 },
              { id: 'file', label: '文件', group: 'branch', weight: 2 },
              { id: 'schedule', label: '调度', group: 'branch', weight: 2 },
              { id: 'event', label: '事件', group: 'sub', weight: 1 },
              { id: 'geometry', label: '几何', group: 'sub', weight: 1 },
            ],
            edges: [
              { source: 'web', target: 'dom', label: '文档' },
              { source: 'web', target: 'bom', label: '浏览器' },
              { source: 'web', target: 'storage', label: '持久化' },
              { source: 'web', target: 'file', label: 'I/O' },
              { source: 'web', target: 'schedule', label: '时序' },
              { source: 'dom', target: 'event', label: '交互' },
              { source: 'dom', target: 'geometry', label: '尺寸' },
            ],
          },
        },
        {
          id: 'p1-3',
          type: 'callout',
          variant: 'tip',
          title: '学习路径',
          text: '先掌握 DOM 节点查询与操作（高频使用）→ 再学事件系统（交互核心）→ 然后 BOM 对象（窗口控制）→ 最后存储、文件、调度（进阶能力）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：DOM 树结构
    // ========================================================================
    {
      order: 2,
      title: 'DOM 树结构',
      difficulty: 2,
      visualizationType: 'dom-tree-visualizer',
      blocks: [
        {
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'DOM（Document Object Model）将 HTML 文档解析为树形节点对象。每个 HTML 元素、属性、文本都是节点，可通过 JS 增删改查。',
        },
        {
          id: 'p2-2',
          type: 'demo',
          visualizationType: 'dom-tree-visualizer',
          data: {
            title: 'DOM 树可视化（点击节点选中，添加/删除子节点）',
          },
        },
        {
          id: 'p2-3',
          type: 'code',
          language: 'javascript',
          filename: '节点类型',
          code: `// 12 种节点类型（常用 4 种）
document.querySelector('div').nodeType  // 1  元素节点
document.querySelector('div').firstChild.nodeType  // 3  文本节点
document.querySelector('input').attributes[0].nodeType  // 2  属性节点
document.nodeType  // 9  文档节点

// 节点关系
const el = document.querySelector('div')
el.parentNode        // 父节点
el.childNodes        // 所有子节点（含文本）
el.children          // 仅元素子节点
el.firstChild        // 第一个子节点
el.lastChild         // 最后一个子节点
el.previousSibling   // 上一个兄弟
el.nextSibling       // 下一个兄弟`,
        },
      ],
    },

    // ========================================================================
    // 知识点 3：节点查询与遍历
    // ========================================================================
    {
      order: 3,
      title: '节点查询与遍历',
      difficulty: 2,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'document 提供 querySelector / getElementById 等查询 API，返回的 NodeList/HTMLCollection 可用 forEach 或 for...of 遍历。',
        },
        {
          id: 'p3-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '修改选择器，观察查询结果',
            initialCode: `// 经典查询 API 对比
const html = \`
  <ul id="list" class="nav">
    <li class="item">A</li>
    <li class="item active">B</li>
    <li class="item">C</li>
  </ul>
\`
document.body.innerHTML = html

// 1. getElementById（最快，仅 document）
const ul = document.getElementById('list')
console.log('ul:', ul.tagName)

// 2. querySelector（CSS 选择器，返回第一个）
const firstItem = document.querySelector('.item')
console.log('first:', firstItem.textContent)

// 3. querySelectorAll（返回 NodeList，可 forEach）
const items = document.querySelectorAll('.item')
console.log('count:', items.length)
items.forEach((li, i) => console.log(i, li.textContent))

// 4. getElementsByClassName（返回 HTMLCollection，动态）
const live = document.getElementsByClassName('item')
console.log('live:', live.length)  // 3
ul.innerHTML += '<li class="item">D</li>'
console.log('live after add:', live.length)  // 4（自动更新！）`,
          },
        },
        {
          id: 'p3-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['getElementById', 'querySelector', 'querySelectorAll', 'getElementsByClassName'],
            rows: [
              { feature: '返回类型', values: ['Element', 'Element | null', 'NodeList', 'HTMLCollection'] },
              { feature: '是否动态', values: ['-', '否（静态）', '否（静态）', '是（动态）'] },
              { feature: '支持 forEach', values: ['-', '否', '是', '否（需转数组）'] },
              { feature: '选择器语法', values: ['仅 id', 'CSS 选择器', 'CSS 选择器', '仅类名'] },
              { feature: '性能', values: ['最快', '快', '快', '快'] },
            ],
            highlightColumn: 2,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 4：节点增删改
    // ========================================================================
    {
      order: 4,
      title: '节点增删改',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'createElement 创建节点，appendChild/insertBefore 插入，removeChild/remove 删除，replaceChild 替换。现代 API 还包括 append/prepend/before/after。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '尝试创建、插入、删除、替换节点',
            initialCode: `// 创建节点
const div = document.createElement('div')
div.textContent = 'Hello DOM'
div.className = 'card'

// 插入节点
document.body.appendChild(div)  // 末尾添加

// 创建并插入多个
const fragment = document.createDocumentFragment()
for (let i = 0; i < 3; i++) {
  const li = document.createElement('li')
  li.textContent = '项 ' + (i + 1)
  fragment.appendChild(li)
}
const ul = document.createElement('ul')
ul.appendChild(fragment)
document.body.appendChild(ul)

// 在指定位置插入
const firstLi = ul.firstElementChild
const newLi = document.createElement('li')
newLi.textContent = '插在最前'
ul.insertBefore(newLi, firstLi)

// 现代 API（更直观）
const p = document.createElement('p')
p.textContent = '使用 append 一次添加多个'
document.body.append(p, '也可以直接加文本')

// 删除节点
// old: parent.removeChild(child)
// new: child.remove()
setTimeout(() => {
  const target = ul.children[1]
  if (target) target.remove()
  console.log('已删除第二项')
}, 500)

// 替换节点
setTimeout(() => {
  const old = ul.firstElementChild
  const fresh = document.createElement('li')
  fresh.textContent = '替换后的项'
  if (old) ul.replaceChild(fresh, old)
}, 1000)`,
          },
        },
        {
          id: 'p4-3',
          type: 'table',
          caption: '节点操作 API 速查',
          headers: ['操作', '传统 API', '现代 API', '说明'],
          rows: [
            ['末尾插入', 'parent.appendChild(child)', 'parent.append(...nodes)', '现代支持多参数与文本'],
            ['头部插入', 'parent.insertBefore(child, first)', 'parent.prepend(...nodes)', '现代更简洁'],
            ['前/后插入', 'parent.insertBefore(child, ref)', 'node.before(...) / after(...)', '相对兄弟节点'],
            ['删除', 'parent.removeChild(child)', 'child.remove()', '现代无需父节点引用'],
            ['替换', 'parent.replaceChild(new, old)', '-', '暂无现代替代'],
            ['克隆', 'node.cloneNode(deep)', '-', 'deep=true 深克隆'],
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 5：属性与特性
    // ========================================================================
    {
      order: 5,
      title: '属性与特性',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'HTML 特性（attribute）写在标签上，DOM 属性（property）是 JS 对象的字段。大多数情况下两者同步，但 value、checked 等表单属性有单向同步行为。',
        },
        {
          id: 'p5-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['attribute（特性）', 'property（属性）'],
            rows: [
              { feature: '位置', values: ['HTML 标签内', 'DOM 对象上'] },
              { feature: '类型', values: ['总是字符串', '可为任意类型'] },
              { feature: '访问 API', values: ['getAttribute/setAttribute', 'el.prop 直接访问'] },
              { feature: '大小写', values: ['HTML 不敏感', 'JS 大小写敏感'] },
              { feature: 'value 同步', values: ['保留初始值', '反映当前值'] },
              { feature: 'href 同步', values: ['保留相对路径', '返回绝对路径'] },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'p5-3',
          type: 'code',
          language: 'javascript',
          filename: '属性 vs 特性',
          code: `const input = document.querySelector('input')

// 特性（attribute）：HTML 标签上的属性
input.getAttribute('value')      // "初始值"
input.setAttribute('value', 'new')
input.hasAttribute('disabled')   // true
input.removeAttribute('disabled')

// 属性（property）：DOM 对象的字段
input.value             // 当前输入框的值
input.defaultValue      // 对应 attribute 的 value
input.checked           // true/false
input.disabled          // true/false

// 经典陷阱：value 单向同步
input.setAttribute('value', 'A')  // 修改特性
input.value                       // "A"（同步到属性）
input.value = 'B'                 // 修改属性
input.value                       // "B"
input.getAttribute('value')       // "A"（不同步回特性！）`,
        },
      ],
    },

    // ========================================================================
    // 知识点 6：样式操作
    // ========================================================================
    {
      order: 6,
      title: '样式操作',
      difficulty: 3,
      visualizationType: 'sandbox',
      blocks: [
        {
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: '操作样式有三种方式：直接改 style 属性（内联）、切换 className、操作 CSS 变量。getComputedStyle 读取计算后的最终样式。',
        },
        {
          id: 'p6-2',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'js',
            hint: '三种样式操作方式对比',
            initialCode: `const box = document.createElement('div')
box.textContent = '样式演示'
document.body.appendChild(box)

// 1. 内联样式（el.style.xxx）
box.style.width = '200px'
box.style.height = '80px'
box.style.backgroundColor = '#1ed760'  // 注意驼峰
box.style.borderRadius = '8px'
box.style.display = 'flex'
box.style.alignItems = 'center'
box.style.justifyContent = 'center'

// 设置 CSS 变量
box.style.setProperty('--accent', '#ff6b35')
box.style.color = 'var(--accent)'

// 2. className / classList
box.className = 'card highlight'
// classList 更灵活
box.classList.add('active')
box.classList.remove('card')
box.classList.toggle('visible')  // 没有则加，有则删
box.classList.contains('active')  // true

// 3. 读取计算样式
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
          title: '性能提示',
          text: '频繁修改 style 会触发重排（layout）与重绘（repaint）。批量修改时建议使用 classList 切换 class，或使用 requestAnimationFrame 合并样式更新。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：事件流三阶段
    // ========================================================================
    {
      order: 7,
      title: '事件流三阶段',
      difficulty: 4,
      visualizationType: 'event-flow-visualizer',
      blocks: [
        {
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: '事件流描述事件从触发到响应的传播路径，分为捕获阶段（从 document 向下到目标父级）、目标阶段（在目标元素上）、冒泡阶段（从目标向上到 document）。',
        },
        {
          id: 'p7-2',
          type: 'demo',
          visualizationType: 'event-flow-visualizer',
          data: {
            title: '事件流三阶段演示（点击元素查看传播路径）',
          },
        },
        {
          id: 'p7-3',
          type: 'code',
          language: 'javascript',
          filename: '事件流',
          code: `// addEventListener 第三参数控制阶段
// useCapture=false（默认）：冒泡阶段触发
// useCapture=true：捕获阶段触发

document.addEventListener('click', (e) => {
  console.log('document 捕获')
}, true)

outer.addEventListener('click', (e) => {
  console.log('outer 捕获')
}, true)

inner.addEventListener('click', (e) => {
  console.log('inner 目标')
})

outer.addEventListener('click', (e) => {
  console.log('outer 冒泡')
})

document.addEventListener('click', (e) => {
  console.log('document 冒泡')
})

// 点击 inner 输出：
// document 捕获 → outer 捕获 → inner 目标 → outer 冒泡 → document 冒泡

// 阻止冒泡
inner.addEventListener('click', (e) => {
  e.stopPropagation()  // 阻止冒泡与捕获
})

// 阻止默认行为
link.addEventListener('click', (e) => {
  e.preventDefault()
})`,
        },
      ],
    },

    // ========================================================================
    // 知识点 8：事件委托
    // ========================================================================
    {
      order: 8,
      title: '事件委托',
      difficulty: 4,
      visualizationType: 'event-delegation',
      blocks: [
        {
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: '事件委托利用事件冒泡机制，将子元素的事件统一交给父元素处理。新增子元素无需重新绑定，特别适合动态列表。',
        },
        {
          id: 'p8-2',
          type: 'demo',
          visualizationType: 'event-delegation',
          data: {
            title: '事件委托 vs 逐项绑定（对比监听器数量）',
            initialCount: 10,
          },
        },
        {
          id: 'p8-3',
          type: 'callout',
          variant: 'tip',
          title: '何时使用事件委托',
          text: '适合：大量相似子元素（如表格行、列表项）、动态增删的元素。不适合：需要阻止冒泡的元素、需要精确控制的复杂交互。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：事件对象
    // ========================================================================
    {
      order: 9,
      title: '事件对象',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: '事件处理函数接收 Event 对象，包含事件信息。不同事件类型有对应子类：MouseEvent、KeyboardEvent、InputEvent、CustomEvent 等。',
        },
        {
          id: 'p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '常用属性/方法',
            columns: ['说明', '示例'],
            rows: [
              { feature: 'e.target', values: ['触发事件的元素', '点击的按钮'] },
              { feature: 'e.currentTarget', values: ['绑定监听器的元素', '委托的父元素'] },
              { feature: 'e.type', values: ['事件类型字符串', "'click' / 'input'"] },
              { feature: 'e.preventDefault()', values: ['阻止默认行为', '阻止链接跳转'] },
              { feature: 'e.stopPropagation()', values: ['阻止事件冒泡/捕获', '阻止父元素响应'] },
              { feature: 'e.clientX/Y', values: ['鼠标相对视口坐标', 'MouseEvent'] },
              { feature: 'e.key', values: ['按下的键名', "KeyboardEvent: 'Enter'"] },
              { feature: 'e.code', values: ['物理键码', "KeyboardEvent: 'KeyA'"] },
            ],
          },
        },
        {
          id: 'p9-3',
          type: 'code',
          language: 'javascript',
          filename: 'target vs currentTarget',
          code: `// 经典面试题：target 与 currentTarget 的区别
ul.addEventListener('click', (e) => {
  console.log('target:', e.target.tagName)        // 用户实际点击的元素
  console.log('currentTarget:', e.currentTarget.tagName)  // 绑定监听器的元素
})

// 点击 <li> 内的 <span>：
// target: SPAN（实际点击的）
// currentTarget: UL（绑定监听器的）

// 自定义事件
const custom = new CustomEvent('user-login', {
  detail: { userId: 123, name: 'Alice' },
  bubbles: true,
})
element.dispatchEvent(custom)

element.addEventListener('user-login', (e) => {
  console.log('用户登录:', e.detail.name)
})`,
        },
      ],
    },

    // ========================================================================
    // 知识点 10：window 对象
    // ========================================================================
    {
      order: 10,
      title: 'window 对象',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'window 是 BOM 的核心，代表浏览器窗口。所有全局变量、内置对象（document、location、navigator、history）都是它的属性。',
        },
        {
          id: 'p10-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'window 对象结构',
            layers: [
              {
                name: 'window',
                description: '浏览器窗口全局对象',
                components: [
                  { name: 'document', description: 'DOM 根节点' },
                  { name: 'location', description: '当前 URL 信息' },
                  { name: 'navigator', description: '浏览器信息' },
                  { name: 'history', description: '会话历史' },
                  { name: 'screen', description: '屏幕信息' },
                ],
              },
              {
                name: '窗口控制',
                description: '窗口尺寸与位置',
                components: [
                  { name: 'innerWidth/Height', description: '视口尺寸（不含工具栏）' },
                  { name: 'outerWidth/Height', description: '整个浏览器窗口尺寸' },
                  { name: 'scrollX/Y', description: '滚动位置' },
                  { name: 'open/close', description: '打开/关闭窗口' },
                ],
              },
              {
                name: '全局 API',
                description: '挂在 window 上的方法',
                components: [
                  { name: 'alert/confirm/prompt', description: '对话框' },
                  { name: 'setTimeout/setInterval', description: '定时器' },
                  { name: 'requestAnimationFrame', description: '动画帧' },
                  { name: 'fetch', description: '网络请求' },
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
          filename: 'window 常用 API',
          code: `// 窗口尺寸
window.innerWidth    // 视口宽度（不含工具栏）
window.innerHeight   // 视口高度
window.outerWidth    // 整个窗口宽度
window.outerHeight   // 整个窗口高度

// 滚动
window.scrollX       // 水平滚动位置
window.scrollY       // 垂直滚动位置
window.scrollTo(0, 500)              // 跳转到指定位置
window.scrollTo({ top: 500, behavior: 'smooth' })  // 平滑滚动

// 对话框（阻塞式，慎用）
window.alert('提示')
const ok = window.confirm('确认？')
const name = window.prompt('输入姓名', '默认值')

// 打开新窗口
const win = window.open('https://example.com', '_blank', 'width=800')
win.close()  // 关闭

// 全局变量即 window 属性
var foo = 1
window.foo  // 1（var 声明会挂到 window）
let bar = 2
window.bar  // undefined（let/const 不会）`,
        },
      ],
    },

    // ========================================================================
    // 知识点 11：location 对象
    // ========================================================================
    {
      order: 11,
      title: 'location 对象',
      difficulty: 3,
      visualizationType: 'location-parser',
      blocks: [
        {
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: 'location 提供当前文档 URL 的信息，并可进行跳转、重载。各属性对应 URL 的不同部分。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'location-parser',
          data: {
            title: 'URL 解析器（输入 URL 实时查看各部分）',
            initialUrl: 'https://example.com:8080/path/page?key=value#anchor',
          },
        },
        {
          id: 'p11-3',
          type: 'code',
          language: 'javascript',
          filename: 'location API',
          code: `// 读取
location.href        // 完整 URL
location.protocol    // 'https:'
location.host        // 'example.com:8080'
location.hostname    // 'example.com'
location.port        // '8080'
location.pathname    // '/path/page'
location.search      // '?key=value'
location.hash        // '#anchor'
location.origin      // 'https://example.com:8080'

// 跳转
location.href = 'https://example.com'  // 留下历史记录
location.replace('https://example.com') // 不留历史记录
location.assign('https://example.com')  // 等同于 href 赋值

// 重载
location.reload()         // 重新加载
location.reload(true)     // 强制从服务器加载

// 修改部分会触发跳转
location.hash = '#section'   // 仅修改 hash，不刷新
location.search = '?a=1'     // 修改查询，会刷新

// URLSearchParams 操作查询参数
const params = new URLSearchParams(location.search)
params.get('key')           // 'value'
params.set('foo', 'bar')
params.toString()           // 'key=value&foo=bar'`,
        },
      ],
    },

    // ========================================================================
    // 知识点 12：history 对象
    // ========================================================================
    {
      order: 12,
      title: 'history 对象',
      difficulty: 4,
      visualizationType: 'history-router',
      blocks: [
        {
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: 'history 管理浏览器会话历史，支持前进/后退/go。HTML5 新增 pushState/replaceState，可在不刷新页面的情况下修改 URL，是 SPA 路由的基础。',
        },
        {
          id: 'p12-2',
          type: 'demo',
          visualizationType: 'history-router',
          data: {
            title: 'History 路由演示（pushState/replaceState/back/forward）',
            routes: ['/', '/about', '/users', '/contact'],
          },
        },
        {
          id: 'p12-3',
          type: 'callout',
          variant: 'info',
          title: 'SPA 路由原理',
          text: 'React Router / Vue Router 的 history 模式基于 pushState + popstate 事件：pushState 修改 URL 但不刷新，popstate 监听浏览器前进/后退。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：navigator 对象
    // ========================================================================
    {
      order: 13,
      title: 'navigator 对象',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'navigator 提供浏览器与设备信息：userAgent、language、platform、online 状态、剪贴板、地理位置、媒体设备等。',
        },
        {
          id: 'p13-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '常用属性',
            columns: ['类型', '说明'],
            rows: [
              { feature: 'userAgent', values: ['string', '浏览器标识字符串'] },
              { feature: 'language', values: ['string', '首选语言，如 "zh-CN"'] },
              { feature: 'platform', values: ['string', '平台，如 "Win32"'] },
              { feature: 'onLine', values: ['boolean', '是否联网'] },
              { feature: 'cookieEnabled', values: ['boolean', '是否启用 Cookie'] },
              { feature: 'geolocation', values: ['object', '地理位置 API'] },
              { feature: 'clipboard', values: ['object', '剪贴板 API'] },
              { feature: 'mediaDevices', values: ['object', '摄像头/麦克风'] },
            ],
          },
        },
        {
          id: 'p13-3',
          type: 'code',
          language: 'javascript',
          filename: 'navigator 常用 API',
          code: `// 基本信息
navigator.userAgent   // 浏览器标识
navigator.language    // 'zh-CN'
navigator.platform    // 'Win32'
navigator.onLine      // true/false

// 剪贴板
await navigator.clipboard.writeText('复制内容')
const text = await navigator.clipboard.readText()

// 地理位置
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.error(err)
)

// 媒体设备（摄像头/麦克风）
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
})

// 电池 API（部分浏览器支持）
const battery = await navigator.getBattery()
console.log(battery.level)  // 0-1

// 网络状态监听
window.addEventListener('online', () => console.log('联网'))
window.addEventListener('offline', () => console.log('断网'))`,
        },
      ],
    },

    // ========================================================================
    // 知识点 14：localStorage / sessionStorage
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
          text: 'Web Storage 提供键值对存储：localStorage 持久化（手动清除才消失），sessionStorage 会话级（关闭标签即清除）。容量约 5-10MB，仅能存字符串。',
        },
        {
          id: 'p14-2',
          type: 'demo',
          visualizationType: 'storage-playground',
          data: {
            title: '存储 Playground（增删改查 + 容量估算）',
            storageType: 'local',
          },
        },
        {
          id: 'p14-3',
          type: 'code',
          language: 'javascript',
          filename: 'Web Storage API',
          code: `// localStorage（持久）/ sessionStorage（会话）API 相同
localStorage.setItem('key', 'value')
localStorage.getItem('key')        // 'value'
localStorage.removeItem('key')
localStorage.clear()
localStorage.length                // 项数
localStorage.key(0)                // 索引获取 key

// 存储对象需序列化
const user = { name: 'Alice', age: 28 }
localStorage.setItem('user', JSON.stringify(user))
const loaded = JSON.parse(localStorage.getItem('user'))

// 监听跨标签页变化
window.addEventListener('storage', (e) => {
  console.log('key:', e.key)
  console.log('oldValue:', e.oldValue)
  console.log('newValue:', e.newValue)
  console.log('url:', e.url)
})

// 容量检测
function getStorageSize() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += key.length + localStorage[key].length
    }
  }
  return total * 2  // UTF-16 每字符 2 字节
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 15：Cookie
    // ========================================================================
    {
      order: 15,
      title: 'Cookie',
      difficulty: 4,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: 'Cookie 是浏览器存储的小段数据（单条约 4KB），随请求自动发送到服务器。常用于身份认证、用户偏好。现代前端推荐用 localStorage 替代非认证场景。',
        },
        {
          id: 'p15-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['Cookie', 'localStorage', 'sessionStorage'],
            rows: [
              { feature: '容量', values: ['~4KB/条', '~5-10MB', '~5-10MB'] },
              { feature: '生命周期', values: ['可设过期', '永久', '会话级'] },
              { feature: '随请求发送', values: ['是（自动）', '否', '否'] },
              { feature: '访问 API', values: ['document.cookie', 'localStorage.x', 'sessionStorage.x'] },
              { feature: '适用场景', values: ['身份认证', '用户偏好', '临时表单'] },
              { feature: '跨标签', values: ['是', '是', '否'] },
            ],
            highlightColumn: 0,
          },
        },
        {
          id: 'p15-3',
          type: 'code',
          language: 'javascript',
          filename: 'Cookie 操作',
          code: `// 写入 Cookie（字符串拼接，繁琐）
document.cookie = 'name=Alice; max-age=3600; path=/; Secure; SameSite=Lax'

// 读取 Cookie（一次性返回所有，需解析）
const cookies = document.cookie.split('; ').reduce((acc, pair) => {
  const [key, value] = pair.split('=')
  acc[key] = decodeURIComponent(value)
  return acc
}, {})
console.log(cookies.name)  // 'Alice'

// 删除 Cookie（设置过期时间为过去）
document.cookie = 'name=; max-age=0; path=/'

// Cookie 属性
// - max-age: 秒数（IE 不支持，用 expires）
// - expires: GMT 日期
// - path: 可访问的路径
// - domain: 可访问的域名
// - Secure: 仅 HTTPS
// - SameSite: Strict | Lax | None（跨站策略）
// - HttpOnly: JS 不可访问（防 XSS，仅服务端设置）`,
        },
      ],
    },

    // ========================================================================
    // 知识点 16：几何尺寸 API
    // ========================================================================
    {
      order: 16,
      title: '几何尺寸 API',
      difficulty: 4,
      visualizationType: 'geometry-calculator',
      blocks: [
        {
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'DOM 提供多套尺寸 API：offsetWidth（含 border）、clientWidth（不含 border）、scrollWidth（含溢出）、getBoundingClientRect（相对视口，含小数）。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'geometry-calculator',
          data: {
            title: '几何尺寸计算器（拖动滑块改变元素尺寸）',
            initialWidth: 200,
            initialHeight: 100,
          },
        },
        {
          id: 'p16-3',
          type: 'table',
          caption: '尺寸 API 对比',
          headers: ['API', '含 padding', '含 border', '含溢出', '含小数', '相对参照'],
          rows: [
            ['offsetWidth', '是', '是', '否', '否', '-'],
            ['clientWidth', '是', '否', '否', '否', '-'],
            ['scrollWidth', '是', '否', '是', '否', '-'],
            ['getBoundingClientRect().width', '是', '是', '否', '是', '视口'],
            ['offsetLeft', '-', '-', '-', '否', 'offsetParent'],
            ['getBoundingClientRect().left', '-', '-', '-', '是', '视口'],
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 17：滚动 API
    // ========================================================================
    {
      order: 17,
      title: '滚动 API',
      difficulty: 3,
      visualizationType: 'scroll-animation',
      blocks: [
        {
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'scrollTo/scrollIntoView 控制滚动位置，scroll 事件配合 requestAnimationFrame 实现高性能滚动监听。passive 选项提升滚动流畅度。',
        },
        {
          id: 'p17-2',
          type: 'demo',
          visualizationType: 'scroll-animation',
          data: {
            title: '滚动动画演示（scrollTo / scrollIntoView / rAF 节流）',
          },
        },
        {
          id: 'p17-3',
          type: 'code',
          language: 'javascript',
          filename: '滚动 API',
          code: `// 滚动到指定位置
window.scrollTo(0, 500)
window.scrollTo({ top: 500, left: 0, behavior: 'smooth' })

// 元素滚动到视口
element.scrollIntoView()
element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

// 在容器内滚动
container.scrollTo(0, 100)
container.scrollBy(0, 50)  // 相对当前位置

// 监听滚动（rAF 节流）
let ticking = false
window.addEventListener('scroll', () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    console.log('scrollTop:', window.scrollY)
    ticking = false
  })
}, { passive: true })  // passive 提升性能

// IntersectionObserver（元素进入视口回调）
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('元素进入视口:', entry.target)
    }
  })
}, { threshold: 0.5 })
observer.observe(element)`,
        },
      ],
    },

    // ========================================================================
    // 知识点 18：文件处理
    // ========================================================================
    {
      order: 18,
      title: '文件处理',
      difficulty: 4,
      visualizationType: 'file-upload',
      blocks: [
        {
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '<input type="file"> 选择文件后得到 File 对象（继承自 Blob）。FileReader 异步读取文件内容，支持 readAsDataURL/readAsText/readAsArrayBuffer。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'file-upload',
          data: {
            title: '文件上传与预览（选择或拖拽文件）',
          },
        },
        {
          id: 'p18-3',
          type: 'code',
          language: 'javascript',
          filename: '文件读取',
          code: `// <input type="file"> 选择文件
input.addEventListener('change', (e) => {
  const file = e.target.files[0]  // File 对象
  console.log(file.name)         // 文件名
  console.log(file.size)         // 大小（字节）
  console.log(file.type)         // MIME 类型
  console.log(file.lastModified) // 修改时间戳
})

// 拖拽上传
dropzone.addEventListener('drop', (e) => {
  e.preventDefault()
  const file = e.dataTransfer.files[0]
  readFile(file)
})

// FileReader 读取
const reader = new FileReader()
reader.onload = (e) => console.log(e.target.result)
reader.onprogress = (e) => console.log(e.loaded / e.total)
reader.onerror = () => console.log(reader.error)

reader.readAsDataURL(file)     // 图片预览 base64
reader.readAsText(file)        // 文本
reader.readAsArrayBuffer(file) // 二进制

// 现代 API：URL.createObjectURL
const url = URL.createObjectURL(file)
img.src = url  // 直接用于预览
URL.revokeObjectURL(url)  // 释放内存`,
        },
      ],
    },

    // ========================================================================
    // 知识点 19：Blob 与下载
    // ========================================================================
    {
      order: 19,
      title: 'Blob 与下载',
      difficulty: 4,
      visualizationType: 'blob-download',
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: 'Blob（Binary Large Object）表示二进制数据。结合 URL.createObjectURL 生成临时 URL，配合 <a download> 实现前端文件下载。',
        },
        {
          id: 'p19-2',
          type: 'demo',
          visualizationType: 'blob-download',
          data: {
            title: 'Blob 下载演示（输入内容，生成并下载文件）',
            defaultContent: 'name,age,city\nAlice,28,Beijing\nBob,32,Shanghai',
            defaultMime: 'text/csv',
            defaultFilename: 'data',
          },
        },
        {
          id: 'p19-3',
          type: 'code',
          language: 'javascript',
          filename: 'Blob 与下载',
          code: `// 创建 Blob
const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
console.log(blob.size)  // 字节数
console.log(blob.type)  // 'text/plain'

// 生成临时 URL
const url = URL.createObjectURL(blob)
// 使用后释放
URL.revokeObjectURL(url)

// 触发下载
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

// Blob 转 File
const file = new File([blob], 'name.txt', { type: 'text/plain' })

// Blob 切片（大文件上传）
const chunk = blob.slice(0, 1024)  // 起始字节，结束字节`,
        },
      ],
    },

    // ========================================================================
    // 知识点 20：定时器与 requestAnimationFrame（按文档计入第 8 章）
    // ========================================================================
    {
      order: 20,
      title: '定时器与 requestAnimationFrame',
      difficulty: 4,
      visualizationType: 'raf-animation',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          lead: true,
          text: 'setTimeout/setInterval 基于事件队列，可能因主线程阻塞而延迟。requestAnimationFrame 与浏览器刷新率同步（通常 60fps），是视觉动画的首选。',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'raf-animation',
          data: {
            title: 'rAF vs setInterval 流畅度对比（观察实际帧率）',
          },
        },
        {
          id: 'p20-3',
          type: 'code',
          language: 'javascript',
          filename: '定时器与 rAF',
          code: `// setTimeout：延迟执行一次
const id1 = setTimeout(() => console.log('hi'), 1000)
clearTimeout(id1)  // 取消

// setInterval：重复执行
const id2 = setInterval(() => console.log('tick'), 1000)
clearInterval(id2)

// requestAnimationFrame：与刷新同步
let rafId
function animate(timestamp) {
  console.log(timestamp)
  rafId = requestAnimationFrame(animate)
}
rafId = requestAnimationFrame(animate)
cancelAnimationFrame(rafId)  // 取消

// 递归 setTimeout（比 setInterval 更精确）
function tick() {
  console.log('tick')
  setTimeout(tick, 1000)  // 上一次执行完才安排下一次
}
tick()

// FPS 计算
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
    // 知识点 21：小测验（按文档作为收尾章节）
    // ========================================================================
    {
      order: 21,
      title: 'DOM / BOM / Web API 小测验',
      difficulty: 3,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          lead: true,
          text: '通过 8 道题检验你对 DOM/BOM/Web API 的掌握程度。每题包含解析，错题建议回顾对应知识点。',
        },
        {
          id: 'p21-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '以下哪个 API 返回的是静态 NodeList？',
                options: ['getElementById', 'getElementsByClassName', 'querySelectorAll', 'getElementsByName'],
                correctIndex: 2,
                explanation: 'querySelectorAll 返回静态 NodeList，forEach 可用；getElementsBy* 返回动态 HTMLCollection。',
              },
              {
                question: '事件流的正确顺序是？',
                options: ['冒泡→目标→捕获', '捕获→目标→冒泡', '目标→捕获→冒泡', '捕获→冒泡→目标'],
                correctIndex: 1,
                explanation: '事件流三阶段：捕获阶段（document 向下到目标父级）→ 目标阶段 → 冒泡阶段（目标向上到 document）。',
              },
              {
                question: 'addEventListener 的第三参数为 true 表示？',
                options: ['阻止冒泡', '在捕获阶段触发', '只触发一次', '阻止默认行为'],
                correctIndex: 1,
                explanation: 'useCapture=true 时监听器在捕获阶段触发，默认 false 在冒泡阶段触发。',
              },
              {
                question: '修改 input.value 后，input.getAttribute("value") 返回？',
                options: ['新值', '初始值', 'null', 'undefined'],
                correctIndex: 1,
                explanation: 'value 是单向同步：attribute 同步到 property，但 property 修改不会同步回 attribute，getAttribute 仍返回初始值。',
              },
              {
                question: 'history.pushState 的作用是？',
                options: ['刷新页面', '添加历史记录但不刷新', '替换当前记录', '后退一步'],
                correctIndex: 1,
                explanation: 'pushState 添加新的历史记录并修改 URL，但不触发页面加载，是 SPA 路由的基础。',
              },
              {
                question: '以下哪个存储方式会随请求自动发送到服务器？',
                options: ['localStorage', 'sessionStorage', 'Cookie', 'IndexedDB'],
                correctIndex: 2,
                explanation: 'Cookie 会随同源请求自动发送，适合身份认证；Web Storage 和 IndexedDB 不会自动发送。',
              },
              {
                question: 'offsetWidth 与 clientWidth 的区别是？',
                options: ['offsetWidth 不含 border', 'clientWidth 含 border', 'offsetWidth 含 border，clientWidth 不含', '两者相同'],
                correctIndex: 2,
                explanation: 'offsetWidth = content + padding + border；clientWidth = content + padding（不含 border）。',
              },
              {
                question: '做视觉动画时应优先使用？',
                options: ['setInterval(fn, 16)', 'setTimeout 递归', 'requestAnimationFrame', 'Promise.then'],
                correctIndex: 2,
                explanation: 'requestAnimationFrame 与浏览器刷新率同步，后台标签自动暂停，帧率稳定，是视觉动画首选。',
              },
            ],
          },
        },
      ],
    },
  ],
}
