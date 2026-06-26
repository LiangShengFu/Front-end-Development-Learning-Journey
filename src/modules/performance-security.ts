/**
 * 模块 19：性能优化与安全防护
 *
 * 严格遵循 docx/模块十九.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 12 个知识点（对应 12 个可视化演示，含小测验）
 * - 5 个新增性能/安全专属组件（位于 components/interactive/performance-security/）
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard
 * - 跨模块复用模块十六：HttpRequestResponseFlow（CSRF 攻击链视角）
 * - 跨模块复用模块十八：MockFlowVisualizer（CSRF 攻击向量替换视角）
 *
 * 章节映射：
 * - 章节1 性能指标：#1 知识图谱 / #2 Core Web Vitals 指标矩阵
 * - 章节2 性能优化策略：#3 Resource Hints / #4 防抖节流 / #5 虚拟列表 / #6 Service Worker/PWA
 * - 章节3 前端安全：#7 XSS 攻击流程 / #8 CSRF 攻击链 / #9 CSRF 攻击向量替换 / #10 安全响应头
 * - 章节4 安全增强：含在 #10 安全响应头与速查表中
 * - 章节5 速查与测验：#11 知识点速查 / #12 性能与安全小测验
 *
 * 所有交互均为教学模拟，不执行真实攻击代码。
 */
import type { ModuleMeta } from '../lib/types'

export const performanceSecurityModule: ModuleMeta = {
  number: '19',
  title: '性能优化与安全防护',
  slug: 'performance-security',
  stage: 'advanced',
  stageLabel: '高级专项 · 第 1 模块',
  icon: '19',
  summary:
    'Core Web Vitals（LCP/INP/CLS）、Resource Hints、防抖节流、虚拟列表、Service Worker/PWA、XSS/CSRF 攻击与防御、CSP、安全响应头、Cookie 安全。',
  knowledgePointCount: 12,
  visualizationCount: 12,
  points: [
    // ========================================================================
    // 章节 1 · 性能指标
    // ========================================================================

    // 知识点 1：性能与安全总览知识图谱
    {
      order: 1,
      title: '性能与安全总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ps-p1-1',
          type: 'paragraph',
          lead: true,
          text: '性能优化与安全防护是前端工程化的「最后一公里」。在模块一至十八建立的开发、服务端、测试能力之上，模块十九从「性能指标」与「安全威胁」两个维度收尾，形成「实现 → 测试 → 性能与安全」完整工程化闭环。',
        },
        {
          id: 'ps-p1-2',
          type: 'paragraph',
          text: '性能侧以 Core Web Vitals 为总纲（LCP/INP/CLS 三件套），向 Resource Hints、防抖节流、虚拟列表、Service Worker 纵深推进；安全侧以 XSS/CSRF 为核心威胁，向 CSP、安全响应头、Cookie 安全纵深防御。下面是模块十九的知识图谱，串联起性能与安全两大主题。',
        },
        {
          id: 'ps-p1-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'perf-sec', label: '性能与安全', group: 'core', weight: 3 },
              { id: 'cwv', label: 'Core Web Vitals', group: 'perf', weight: 2 },
              { id: 'lcp', label: 'LCP/INP/CLS', group: 'perf' },
              { id: 'hints', label: 'Resource Hints', group: 'perf' },
              { id: 'debounce', label: '防抖节流', group: 'perf' },
              { id: 'vlist', label: '虚拟列表', group: 'perf' },
              { id: 'sw', label: 'Service Worker/PWA', group: 'perf' },
              { id: 'xss', label: 'XSS 攻击', group: 'sec', weight: 2 },
              { id: 'csrf', label: 'CSRF 攻击', group: 'sec', weight: 2 },
              { id: 'csp', label: 'CSP 策略', group: 'sec' },
              { id: 'headers', label: '安全响应头', group: 'sec' },
              { id: 'cookie', label: 'Cookie 安全', group: 'sec' },
            ],
            edges: [
              { source: 'perf-sec', target: 'cwv', label: '性能总纲' },
              { source: 'cwv', target: 'lcp', label: '三件套' },
              { source: 'cwv', target: 'hints', label: '加载优化' },
              { source: 'cwv', target: 'debounce', label: '交互优化' },
              { source: 'cwv', target: 'vlist', label: '渲染优化' },
              { source: 'cwv', target: 'sw', label: 'PWA 缓存' },
              { source: 'perf-sec', target: 'xss', label: '注入防御' },
              { source: 'perf-sec', target: 'csrf', label: '跨站防御' },
              { source: 'xss', target: 'csp', label: '纵深防御' },
              { source: 'csrf', target: 'cookie', label: 'Cookie 防护' },
              { source: 'csp', target: 'headers', label: '响应头' },
            ],
          },
        },
        {
          id: 'ps-p1-4',
          type: 'callout',
          variant: 'tip',
          title: '学习路径',
          text: '建议按「Core Web Vitals 指标 → 加载优化（Resource Hints）→ 交互优化（防抖节流/虚拟列表）→ 安全威胁（XSS/CSRF）→ 纵深防御（CSP/响应头/Cookie）」顺序学习。性能是体验底线，安全是上线红线。',
        },
      ],
    },

    // 知识点 2：Core Web Vitals 指标矩阵
    {
      order: 2,
      title: 'Core Web Vitals 指标矩阵',
      difficulty: 2,
      isNew: true,
      visualizationType: 'core-web-vitals-visualizer',
      blocks: [
        {
          id: 'ps-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Core Web Vitals 是 Google 评估页面体验的核心指标体系，直接影响搜索排名。三件套 LCP（加载）、INP（交互）、CLS（视觉稳定）覆盖用户感知的三大维度，2024 年 INP 正式取代 FID 成为交互指标。',
        },
        {
          id: 'ps-p2-2',
          type: 'paragraph',
          text: '除了三件套，还有 FCP（首次内容绘制）、TTI（可交互时间）、TBT（总阻塞时间）等辅助诊断指标。点击下方指标卡片，查看优秀/需改进/较差阈值、测量方式与优化方向。',
        },
        {
          id: 'ps-p2-3',
          type: 'demo',
          visualizationType: 'core-web-vitals-visualizer',
          data: {},
        },
        {
          id: 'ps-p2-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 INP 取代 FID',
          text: '2024 年 3 月，INP（Interaction to Next Paint）正式取代 FID 成为 Core Web Vitals 的交互指标。FID 只测量首次交互的输入延迟，INP 测量所有交互的完整响应（输入延迟 + 处理时间 + 渲染时间），更贴近真实体验。',
        },
        {
          id: 'ps-p2-5',
          type: 'code',
          code: `// 使用 web-vitals 库采集真实用户指标
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    id: metric.id,
    delta: metric.delta,
  })
  // 使用 sendBeacon 确保页面关闭时也能上报
  navigator.sendBeacon('/api/metrics', body)
}

onLCP(sendToAnalytics)
onINP(sendToAnalytics)
onCLS(sendToAnalytics)
onFCP(sendToAnalytics)
onTTFB(sendToAnalytics)`,
          language: 'js',
          filename: 'web-vitals 采集',
        },
      ],
    },

    // ========================================================================
    // 章节 2 · 性能优化策略
    // ========================================================================

    // 知识点 3：Resource Hints 策略
    {
      order: 3,
      title: 'Resource Hints 策略',
      difficulty: 2,
      isNew: true,
      visualizationType: 'resource-hints-visualizer',
      blocks: [
        {
          id: 'ps-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Resource Hints 是一组 HTML 标签，让浏览器提前「知道」即将需要的资源，从而优化加载时序。核心是「时机 + 作用域」：preconnect/dns-prefetch 提前建立连接，preload/prefetch/modulepreload 控制资源加载优先级。',
        },
        {
          id: 'ps-p3-2',
          type: 'paragraph',
          text: '点击下方策略切换，查看触发时机、加载时序图、代码示例与适用场景。注意 preconnect 与 dns-prefetch 的区别：前者建立完整连接（DNS+TCP+TLS），后者仅 DNS 解析。',
        },
        {
          id: 'ps-p3-3',
          type: 'demo',
          visualizationType: 'resource-hints-visualizer',
          data: {},
        },
        {
          id: 'ps-p3-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 使用原则',
          text: 'preconnect 限制 3-4 个关键域名（过度会占用连接池）；preload 只用于当前页面必需资源（避免浪费带宽）；prefetch 用于下一页面可能资源（利用空闲带宽）；modulepreload 专用于 ESM 模块。',
        },
        {
          id: 'ps-p3-5',
          type: 'code',
          code: `<!-- 1. preconnect：提前连接关键 CDN / API / 字体源 -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
<link rel="preconnect" href="https://api.example.com">

<!-- 2. dns-prefetch：轻量 DNS 解析（兼容性好，可多用） -->
<link rel="dns-prefetch" href="//stats.example.com">
<link rel="dns-prefetch" href="//cdn.thirdparty.com">

<!-- 3. preload：高优先级预加载当前页面关键资源 -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/js/hero.js" as="script">

<!-- 4. prefetch：低优先级预获取下一页面资源 -->
<link rel="prefetch" href="/next-page.html">
<link rel="prefetch" href="/js/checkout.js" as="script">

<!-- 5. modulepreload：预加载 ES 模块（含依赖图） -->
<link rel="modulepreload" href="/js/app.mjs">`,
          language: 'html',
          filename: 'Resource Hints 完整示例',
        },
      ],
    },

    // 知识点 4：防抖节流可视化（内联脚本迁移）
    {
      order: 4,
      title: '防抖节流可视化',
      difficulty: 3,
      isNew: true,
      visualizationType: 'debounce-throttle-visualizer',
      blocks: [
        {
          id: 'ps-p4-1',
          type: 'paragraph',
          lead: true,
          text: '防抖（debounce）与节流（throttle）是高频事件优化的两大利器。防抖：事件停止触发 n 秒后执行一次（合并连续触发，适合搜索联想）；节流：每 n 秒最多执行一次（稀释触发频率，适合 scroll/resize）。',
        },
        {
          id: 'ps-p4-2',
          type: 'paragraph',
          text: '下方组件从原模块十九内联 demo-dt 脚本完整迁移为 React 组件。点击「触发事件」按钮，对比无优化/防抖/节流三列的执行次数差异。拖动滑块调节 wait 间隔，观察点状指示器的变化。',
        },
        {
          id: 'ps-p4-3',
          type: 'demo',
          visualizationType: 'debounce-throttle-visualizer',
          data: {
            defaultDebounceWait: 500,
            defaultThrottleWait: 500,
          },
        },
        {
          id: 'ps-p4-4',
          type: 'callout',
          variant: 'tip',
          title: '应用场景',
          text: '防抖：搜索框 input 联想（用户停止输入才请求）、表单字段校验、窗口 resize 结束后重新计算布局。节流：滚动加载更多（scroll）、鼠标拖拽（mousemove）、按钮防连点（提交按钮）。',
        },
        {
          id: 'ps-p4-5',
          type: 'callout',
          variant: 'warning',
          title: '🌟 textContent vs innerHTML',
          text: '防抖节流常用于避免高频 DOM 操作。更重要的是：渲染用户输入时务必用 textContent 而非 innerHTML，否则会引入 XSS 漏洞（与知识点 7 XSS 攻击呼应）。',
        },
      ],
    },

    // 知识点 5：虚拟列表原理
    {
      order: 5,
      title: '虚拟列表原理',
      difficulty: 3,
      isNew: true,
      visualizationType: 'virtual-list-visualizer',
      blocks: [
        {
          id: 'ps-p5-1',
          type: 'paragraph',
          lead: true,
          text: '当列表数据量巨大（1 万+）时，传统列表会渲染全部 DOM 节点，导致页面卡顿。虚拟列表的核心思想：只渲染可视区域内的 DOM 节点（+ 上下缓冲条数），用「撑开总高度 + 偏移定位」模拟完整列表。',
        },
        {
          id: 'ps-p5-2',
          type: 'paragraph',
          text: '下方演示 1000 条数据的虚拟列表。滚动列表观察右侧「DOM 节点数对比」：虚拟列表恒定渲染约 10-15 个节点，传统列表需渲染 1000 个。点击「自动滚动演示」查看效果。',
        },
        {
          id: 'ps-p5-3',
          type: 'demo',
          visualizationType: 'virtual-list-visualizer',
          data: {
            totalCount: 1000,
            viewportHeight: 280,
            itemHeight: 32,
            overscan: 3,
          },
        },
        {
          id: 'ps-p5-4',
          type: 'callout',
          variant: 'tip',
          title: '主流实现',
          text: 'React：react-window（轻量）/ react-virtualized（功能全）/ @tanstack/react-virtual（现代）。Vue：vue-virtual-scroller。原理相通：计算 startIndex/endIndex → 只渲染可见项 → translateY 偏移定位。',
        },
        {
          id: 'ps-p5-5',
          type: 'callout',
          variant: 'note',
          title: '动态高度处理',
          text: '本演示为固定高度（简化）。实际场景中列表项高度可能动态变化（如评论含图片），需用「预估高度 + 测量修正 + 位置缓存」策略，参考 react-window 的 VariableSizeList。',
        },
      ],
    },

    // 知识点 6：Service Worker/PWA 策略
    {
      order: 6,
      title: 'Service Worker 与 PWA 缓存策略',
      difficulty: 3,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ps-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Service Worker 是浏览器后台运行的独立线程，可拦截网络请求并缓存资源，是实现 PWA（渐进式 Web 应用）的核心。不同缓存策略适用于不同场景：离线优先、网络优先、缓存优先等。',
        },
        {
          id: 'ps-p6-2',
          type: 'paragraph',
          text: '下方对比 5 种主流缓存策略的触发时机、适用场景与代表工具。Workbox 是 Google 提供的 SW 工具库，封装了这些策略的现成实现。',
        },
        {
          id: 'ps-p6-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '缓存策略',
            columns: ['触发时机', '适用场景', 'Workbox API', '代表用例'],
            rows: [
              {
                feature: 'Cache First（缓存优先）',
                values: ['优先读缓存，缓存 miss 才请求网络', '静态资源（CSS/JS/字体/图片）', 'CacheFirst', 'Web 字体、图标、Logo'],
              },
              {
                feature: 'Network First（网络优先）',
                values: ['优先请求网络，失败回退缓存', '动态内容（API/文章）需及时更新', 'NetworkFirst', '新闻列表、用户数据'],
              },
              {
                feature: 'Stale While Revalidate',
                values: ['立即返回缓存，后台更新缓存', '需快速响应且可容忍短暂过期', 'StaleWhileRevalidate', '图片、非关键 CSS'],
              },
              {
                feature: 'Network Only',
                values: ['仅网络，不读缓存', '需强一致性的实时数据', 'NetworkOnly', '支付、库存查询'],
              },
              {
                feature: 'Cache Only',
                values: ['仅缓存，不请求网络', '完全离线资源', 'CacheOnly', '离线错误页、App Shell'],
              },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'ps-p6-4',
          type: 'code',
          code: `// 使用 Workbox 配置缓存策略
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

// 1. 图片：Stale While Revalidate
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 })],
  })
)

// 2. 字体：Cache First
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxAgeSeconds: 60 * 24 * 60 * 60, maxEntries: 30 }),
    ],
  })
)

// 3. API：Network First（离线回退缓存）
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({ cacheName: 'api-cache', networkTimeoutSeconds: 3 })
)`,
          language: 'js',
          filename: 'Workbox 缓存策略配置',
        },
        {
          id: 'ps-p6-5',
          type: 'callout',
          variant: 'tip',
          title: 'PWA 三要素',
          text: 'PWA = Service Worker + Web App Manifest + HTTPS。SW 提供离线能力，Manifest 提供「安装到桌面」能力，HTTPS 是 SW 的硬性要求（localhost 除外）。',
        },
      ],
    },

    // ========================================================================
    // 章节 3 · 前端安全
    // ========================================================================

    // 知识点 7：XSS 攻击向量流程
    {
      order: 7,
      title: 'XSS 攻击向量流程',
      difficulty: 3,
      isNew: true,
      visualizationType: 'security-attack-flow-visualizer',
      blocks: [
        {
          id: 'ps-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'XSS（跨站脚本攻击）是前端最经典的安全威胁。攻击者将恶意脚本注入页面，在受害者浏览器执行，可窃取 Cookie、劫持会话、钓鱼欺诈。XSS 分三型：反射型、存储型、DOM 型。',
        },
        {
          id: 'ps-p7-2',
          type: 'paragraph',
          text: '点击下方攻击类型切换，查看「注入 → 传递 → 执行 → 窃取」四阶段攻击链与每阶段的防御点。存储型 XSS 危害最大（持久化 + 批量触发），DOM 型 XSS 最隐蔽（绕过服务端防护）。',
        },
        {
          id: 'ps-p7-3',
          type: 'demo',
          visualizationType: 'security-attack-flow-visualizer',
          data: {},
        },
        {
          id: 'ps-p7-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 防御要点',
          text: '① 输入净化：服务端用 DOMPurify / sanitize-html 过滤 HTML；② 输出编码：根据上下文做 HTML/JS/URL/CSS 编码；③ CSP：限制脚本来源，拒绝内联脚本；④ HttpOnly Cookie：阻止 JS 读取 Cookie；⑤ Trusted Types：强制 DOM 写入经过类型检查。',
        },
        {
          id: 'ps-p7-5',
          type: 'code',
          code: `// 1. React 自动转义（默认安全，{} 不会执行 HTML）
function Comment({ text }) {
  return <div>{text}</div> // ✅ 安全：text 被当作字符串
  // return <div dangerouslySetInnerHTML={{ __html: text }} /> // ⚠️ 危险！
}

// 2. 需要渲染富文本时用 DOMPurify 净化
import DOMPurify from 'dompurify'
function RichText({ html }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt'],
  })
  return <div dangerouslySetInnerHTML={{ __html: clean }} /> // ✅ 净化后安全
}

// 3. 安全 DOM API：用 textContent 代替 innerHTML
el.textContent = userInput // ✅ 安全
// el.innerHTML = userInput // ⚠️ 危险！`,
          language: 'jsx',
          filename: 'XSS 防御示例',
        },
      ],
    },

    // 知识点 8：CSRF 攻击链（跨模块复用模块十六）
    {
      order: 8,
      title: 'CSRF 攻击链（攻击视角）',
      difficulty: 3,
      isNew: true,
      visualizationType: 'http-request-response-flow',
      blocks: [
        {
          id: 'ps-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'CSRF（跨站请求伪造）利用用户已登录的身份，诱导浏览器自动携带 Cookie 发起恶意请求。攻击链：用户登录银行 → 访问恶意网站 → 恶意网站构造转账请求 → 浏览器自动带 Cookie → 银行误以为是用户操作。',
        },
        {
          id: 'ps-p8-2',
          type: 'paragraph',
          text: '本组件跨模块复用模块十六的 HttpRequestResponseFlow，切换为「CSRF 攻击视角」。下方展示 CSRF 攻击的完整 HTTP 请求响应链：从恶意页面构造请求到银行服务端执行转账。',
        },
        {
          id: 'ps-p8-3',
          type: 'demo',
          visualizationType: 'http-request-response-flow',
          data: {
            urlExample: 'https://bank.com/api/transfer (CSRF 攻击目标)',
            stages: [
              {
                id: 'dns',
                name: '① 用户已登录银行',
                description: '受害者已登录 bank.com，浏览器持有会话 Cookie（SessionID=abc123）。此 Cookie 会在所有对 bank.com 的请求中自动携带（同源策略不阻止 Cookie 携带）。',
                direction: 'bidirectional',
                durationMs: 10,
                color: '#07c160',
                payload: `用户登录 bank.com 成功
Set-Cookie: SessionID=abc123; Path=/; Domain=bank.com
// ⚠️ 未设置 SameSite，任何跨站请求都会携带此 Cookie`,
              },
              {
                id: 'tcp',
                name: '② 访问恶意网站',
                description: '用户被诱导访问 evil.com（钓鱼链接/广告/论坛帖）。恶意页面包含隐藏的表单或 fetch，目标指向 bank.com 的转账接口。',
                direction: 'request',
                durationMs: 20,
                color: '#f59e0b',
                payload: `<!-- evil.com 恶意页面 -->
<form action="https://bank.com/api/transfer" method="POST" id="f">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.getElementById('f').submit()</script>`,
              },
              {
                id: 'tls',
                name: '③ 浏览器自动带 Cookie',
                description: '浏览器发起对 bank.com 的 POST 请求，自动携带 SessionID Cookie（即使来源是 evil.com）。这是 CSRF 的核心：Cookie 不区分来源页面。',
                direction: 'request',
                durationMs: 30,
                color: '#ec4899',
                payload: `POST /api/transfer HTTP/1.1
Host: bank.com
Origin: https://evil.com
Referer: https://evil.com/
Cookie: SessionID=abc123  // ⚠️ 自动携带！

to=attacker&amount=10000`,
              },
              {
                id: 'request',
                name: '④ 服务端误执行',
                description: 'bank.com 服务端收到请求，验证 Cookie 有效（用户已登录），执行转账操作。攻击者无需获取 Cookie，借用浏览器自动携带机制完成攻击。',
                direction: 'request',
                durationMs: 50,
                color: '#ef4444',
                payload: `// 服务端逻辑（有漏洞）
app.post('/api/transfer', (req, res) => {
  if (!req.cookies.SessionID) return res.status(401)
  // ⚠️ 仅验证 Cookie，未验证 Origin/CSRF Token
  transfer(req.body.to, req.body.amount)
  res.json({ code: 0, msg: '转账成功' })
})`,
              },
              {
                id: 'response',
                name: '⑤ 转账成功',
                description: '服务端返回转账成功，受害者资金被转走。整个过程中攻击者从未获取 Cookie，仅利用浏览器的自动携带机制。',
                direction: 'response',
                durationMs: 40,
                color: '#1a6cff',
                payload: `HTTP/1.1 200 OK
Content-Type: application/json

{ "code": 0, "msg": "转账成功", "data": { "to": "attacker", "amount": 10000 } }
// 受害者资金被转走，全程无感知`,
              },
            ],
          },
        },
        {
          id: 'ps-p8-4',
          type: 'callout',
          variant: 'tip',
          title: '跨模块复用',
          text: '本组件复用模块十六的 HttpRequestResponseFlow，切换为「CSRF 攻击视角」。模块十六讲解 HTTP 客户端视角，模块十九从攻击视角展示 Cookie 自动携带的危害，形成「实现 → 攻击」闭环。',
        },
      ],
    },

    // 知识点 9：CSRF 攻击向量替换（跨模块复用模块十八）
    {
      order: 9,
      title: 'CSRF 攻击向量替换（攻击视角）',
      difficulty: 3,
      isNew: true,
      visualizationType: 'mock-flow-visualizer',
      blocks: [
        {
          id: 'ps-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'CSRF 攻击向量多样：表单自动提交、img 标签 GET 请求、fetch/ajax 跨域请求。本组件跨模块复用模块十八的 MockFlowVisualizer，切换为「CSRF 攻击向量视角」，展示三种攻击载体的替换流程。',
        },
        {
          id: 'ps-p9-2',
          type: 'paragraph',
          text: '点击下方攻击载体切换，查看「构造 → 触发 → 携带 Cookie → 服务端执行」替换流程与防御验证。防御核心：SameSite Cookie + CSRF Token + Origin/Referer 校验。',
        },
        {
          id: 'ps-p9-3',
          type: 'demo',
          visualizationType: 'mock-flow-visualizer',
          data: {
            paradigms: [
              {
                id: 'function',
                name: '表单自动提交',
                api: '<form>.submit()',
                target: 'POST 型 CSRF（修改数据的接口）',
                codeSnippet: `<!-- evil.com 恶意页面 -->
<form action="https://bank.com/api/transfer" method="POST" id="f">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>
  // 自动提交表单，浏览器携带 Cookie
  document.getElementById('f').submit()
</script>`,
                assertion: '防御验证：CSRF Token / SameSite Cookie',
                callVerification: 'req.headers.origin === "https://evil.com" → 拒绝',
                useCase: '攻击修改型接口（转账、改密、删除）。表单提交不受 CORS 限制，浏览器自动带 Cookie。',
                pros: ['无需 JS 也可触发（noscript）', '兼容所有浏览器', '可攻击 POST 接口'],
                cons: ['需用户访问恶意页面', '易被 CSRF Token 拦截', 'SameSite=Lax 可阻止跨站 POST'],
                color: '#1a6cff',
              },
              {
                id: 'module',
                name: 'img 标签 GET',
                api: '<img src=...>',
                target: 'GET 型 CSRF（查询/触发型接口）',
                codeSnippet: `<!-- evil.com 恶意页面 -->
<img src="https://bank.com/api/transfer?to=attacker&amount=10000" style="display:none">
<!-- 浏览器请求图片时自动携带 Cookie -->
<!-- 适用于 GET 接口（设计缺陷：用 GET 修改数据） -->`,
                assertion: '防御验证：接口仅允许 POST/PUT/DELETE',
                callVerification: 'req.method === "GET" && 修改操作 → 拒绝',
                useCase: '攻击设计有缺陷的 GET 接口（用 GET 修改数据）。隐蔽性强，用户无感知。',
                pros: ['极简（一行 HTML）', '无需 JS', '用户完全无感知'],
                cons: ['仅限 GET 接口', '规范接口应拒绝 GET 修改', 'CSP img-src 可限制'],
                color: '#a78bfa',
              },
              {
                id: 'timer',
                name: 'fetch 跨域请求',
                api: 'fetch() / XMLHttpRequest',
                target: '跨域 CSRF（需绕过 CORS 预检）',
                codeSnippet: `// evil.com 恶意页面
// 简单请求：自动携带 Cookie
fetch('https://bank.com/api/transfer', {
  method: 'POST',
  credentials: 'include', // 携带 Cookie
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'to=attacker&amount=10000'
})
// ⚠️ 复杂请求需预检，CORS 可拦截
// 但简单请求（form-urlencoded/text）不触发预检`,
                assertion: '防御验证：Origin / Referer 校验',
                callVerification: 'req.headers.origin !== "https://bank.com" → 拒绝',
                useCase: '攻击允许跨域的接口。简单请求不触发 CORS 预检，可绕过部分防护。',
                pros: ['可控制请求头/方法', '可处理响应', '适合复杂攻击'],
                cons: ['受 CORS 限制（复杂请求预检）', '需 credentials: include', 'Origin 头可被服务端校验'],
                color: '#f59e0b',
              },
            ],
          },
        },
        {
          id: 'ps-p9-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 跨模块复用',
          text: '本组件复用模块十八的 MockFlowVisualizer，切换为「CSRF 攻击向量视角」。模块十八讲解 Mock 测试视角，模块十九从攻击视角展示三种 CSRF 载体，形成「测试 → 攻击」闭环。',
        },
        {
          id: 'ps-p9-5',
          type: 'code',
          code: `// CSRF 防御三件套
// 1. SameSite Cookie（现代浏览器首选）
app.use(session({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' // 🌟 严格模式：跨站不携带 Cookie
    // 'lax'：导航时携带，其他跨站不携带（默认值）
  }
}))

// 2. CSRF Token（双提交 Cookie 模式）
const csrf = require('csurf')
app.use(csrf({ cookie: true }))
// 前端读取 XSRF-TOKEN Cookie，放入 X-CSRF-Token 请求头
// 服务端校验 Cookie 值与请求头一致

// 3. Origin / Referer 校验（兜底）
app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer
  if (origin && !origin.startsWith('https://bank.com')) {
    return res.status(403).json({ error: 'CSRF 检测：来源非法' })
  }
  next()
})`,
          language: 'js',
          filename: 'CSRF 防御示例',
        },
      ],
    },

    // 知识点 10：安全响应头矩阵
    {
      order: 10,
      title: '安全响应头矩阵',
      difficulty: 2,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ps-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'HTTP 安全响应头是纵深防御的第一道关卡，通过响应头指令告诉浏览器启用安全特性。CSP 防注入、HSTS 强制 HTTPS、X-Frame-Options 防点击劫持、X-Content-Type-Options 防 MIME 嗅探。',
        },
        {
          id: 'ps-p10-2',
          type: 'paragraph',
          text: '下方对比 8 个核心安全响应头的作用、示例与防御目标。生产环境应在服务端统一配置（Nginx / Express helmet / Next.js headers）。',
        },
        {
          id: 'ps-p10-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '安全响应头',
            columns: ['作用', '示例', '防御目标'],
            rows: [
              {
                feature: 'Content-Security-Policy',
                values: ['限制资源加载来源', "default-src 'self'; script-src 'self' 'nonce-abc'", 'XSS / 数据注入'],
              },
              {
                feature: 'Strict-Transport-Security',
                values: ['强制 HTTPS，防降级', 'max-age=31536000; includeSubDomains; preload', '协议降级 / 中间人'],
              },
              {
                feature: 'X-Frame-Options',
                values: ['禁止页面被 iframe 嵌入', 'DENY / SAMEORIGIN', '点击劫持'],
              },
              {
                feature: 'X-Content-Type-Options',
                values: ['禁止 MIME 类型嗅探', 'nosniff', 'MIME 嗅探 XSS'],
              },
              {
                feature: 'Referrer-Policy',
                values: ['控制 Referer 泄露', 'strict-origin-when-cross-origin', '信息泄露'],
              },
              {
                feature: 'Permissions-Policy',
                values: ['控制浏览器 API 权限', 'camera=(), microphone=(), geolocation=()', '权限滥用'],
              },
              {
                feature: 'Cross-Origin-Opener-Policy',
                values: ['隔离跨源窗口', 'same-origin', '跨源攻击 / Spectre'],
              },
              {
                feature: 'Cross-Origin-Resource-Policy',
                values: ['限制资源跨源加载', 'same-origin / same-site', '跨源资源窃取'],
              },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'ps-p10-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 CSP 是最重要的安全头',
          text: 'CSP（Content-Security-Policy）是防 XSS 的纵深防御核心：限制脚本来源、拒绝内联脚本、需 nonce/hash。配置得当可让即使存在 XSS 漏洞也无法执行恶意脚本。推荐使用 nonce 模式而非 unsafe-inline。',
        },
        {
          id: 'ps-p10-5',
          type: 'code',
          code: `// Express：使用 helmet 一键配置安全头
const helmet = require('helmet')
app.use(helmet())

// 或自定义配置
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-abc123'"], // 🌟 nonce 模式
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.example.com'],
      frameAncestors: ["'none'"], // 等价 X-Frame-Options: DENY
      upgradeInsecureRequests: [],
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}))

// Nginx 配置示例
// add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'nonce-\\$nonce';";
// add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
// add_header X-Frame-Options "DENY" always;
// add_header X-Content-Type-Options "nosniff" always;`,
          language: 'js',
          filename: '安全响应头配置',
        },
      ],
    },

    // ========================================================================
    // 章节 5 · 速查与测验
    // ========================================================================

    // 知识点 11：知识点速查表
    {
      order: 11,
      title: '性能与安全知识点速查',
      difficulty: 2,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ps-p11-1',
          type: 'paragraph',
          lead: true,
          text: '性能优化与安全防护知识点密集，下方按主题分组速查。点击展开查看每个知识点的核心要点与代码示例。',
        },
        {
          id: 'ps-p11-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: false,
            defaultOpen: [0],
            items: [
              {
                title: 'Core Web Vitals 三件套',
                content: 'LCP（加载，≤2.5s）、INP（交互，≤200ms）、CLS（视觉稳定，≤0.1）。2024 年 INP 取代 FID。使用 web-vitals 库采集真实用户指标，Lighthouse 采集实验室指标。',
                code: "import { onLCP, onINP, onCLS } from 'web-vitals'\nonLCP(m => send(m)) // rating: 'good'|'needs-improvement'|'poor'",
                codeLanguage: 'js',
              },
              {
                title: 'Resource Hints 五策略',
                content: 'preconnect（提前连接）、dns-prefetch（DNS 解析）、preload（高优预加载）、prefetch（低优预获取）、modulepreload（ESM 模块）。核心：时机 + 作用域。',
                code: '<link rel="preconnect" href="https://cdn.x.com" crossorigin>\n<link rel="preload" href="/font.woff2" as="font" crossorigin>',
                codeLanguage: 'html',
              },
              {
                title: '防抖 vs 节流',
                content: '防抖：停止触发 n 秒后执行一次（搜索联想）。节流：每 n 秒最多执行一次（scroll/resize）。Lodash 提供 debounce/throttle，React 用 useDebouncedCallback/useThrottledCallback。',
                code: "const debounce = (fn, wait) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait) } }",
                codeLanguage: 'js',
              },
              {
                title: '虚拟列表原理',
                content: '只渲染可视区域 DOM（+ overscan 缓冲）。计算 startIndex/endIndex → 只渲染可见项 → translateY 偏移。1 万条数据恒定渲染 ~15 个节点。库：react-window / @tanstack/react-virtual。',
                code: 'const start = Math.floor(scrollTop / itemHeight)\nconst visible = Math.ceil(viewportH / itemHeight) + overscan * 2',
                codeLanguage: 'js',
              },
              {
                title: 'XSS 三型与防御',
                content: '反射型（URL 参数）、存储型（数据库，最危险）、DOM 型（前端 innerHTML）。防御：输入净化（DOMPurify）+ 输出编码（textContent）+ CSP + HttpOnly Cookie + Trusted Types。',
                code: "import DOMPurify from 'dompurify'\nconst clean = DOMPurify.sanitize(dirtyHtml)\nreturn <div dangerouslySetInnerHTML={{ __html: clean }} />",
                codeLanguage: 'jsx',
              },
              {
                title: 'CSRF 防御三件套',
                content: 'SameSite Cookie（strict/lax）+ CSRF Token（双提交 Cookie）+ Origin/Referer 校验。现代浏览器 SameSite=Lax 默认可阻止大部分跨站 POST，但导航 GET 仍会携带。',
                code: "app.use(session({ cookie: { sameSite: 'strict', httpOnly: true, secure: true } }))\napp.use(csrf({ cookie: true }))",
                codeLanguage: 'js',
              },
              {
                title: 'CSP Level 3',
                content: 'Content-Security-Policy 限制资源来源防 XSS。推荐 nonce 模式（每次请求生成随机值）或 hash 模式，避免 unsafe-inline。default-src 兜底，script-src 严格限制。',
                code: "Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'; style-src 'self' 'unsafe-inline'",
                codeLanguage: 'http',
              },
              {
                title: 'Cookie 安全属性',
                content: 'HttpOnly（JS 不可读，防 XSS 窃取）、Secure（仅 HTTPS）、SameSite（Strict/Lax/None，防 CSRF）、Path/Domain（限制范围）、前缀 __Host-/__Secure-（防子域覆盖）。',
                code: 'Set-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict; Path=/; __Host-prefix',
                codeLanguage: 'http',
              },
              {
                title: 'Trusted Types',
                content: 'CSP 的 require-trusted-types-for 指令要求所有 DOM 写入（innerHTML/eval）经过 TrustedType 策略，从源头杜绝字符串注入 DOM。是防 DOM 型 XSS 的终极武器。',
                code: "const policy = trustedTypes.createPolicy('escape', { createHTML: s => DOMPurify.sanitize(s) })\nel.innerHTML = policy.createHTML(userInput)",
                codeLanguage: 'js',
              },
              {
                title: 'SRI 子资源完整性',
                content: 'Subresource Integrity：为 CDN 资源添加 integrity 属性（SHA-256 哈希），浏览器加载时校验哈希，防止 CDN 被篡改注入恶意代码（供应链安全）。',
                code: '<script src="https://cdn.x.com/lib.js" integrity="sha384-abc123..." crossorigin="anonymous"></script>',
                codeLanguage: 'html',
              },
            ],
          },
        },
      ],
    },

    // 知识点 12：性能与安全小测验
    {
      order: 12,
      title: '性能与安全小测验',
      difficulty: 1,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'ps-p12-1',
          type: 'paragraph',
          lead: true,
          text: '通过 6 道题检验你对性能优化与安全防护的掌握程度。涵盖 Core Web Vitals、防抖节流、虚拟列表、XSS、CSRF、CSP 等高频面试考点。',
        },
        {
          id: 'ps-p12-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '2024 年 3 月起，哪个指标正式取代 FID 成为 Core Web Vitals 的交互指标？',
                options: ['TBT（总阻塞时间）', 'INP（交互到下一次绘制）', 'TTI（可交互时间）', 'FCP（首次内容绘制）'],
                correctIndex: 1,
                explanation: 'INP（Interaction to Next Paint）于 2024 年 3 月取代 FID。FID 只测首次交互输入延迟，INP 测量所有交互的完整响应（输入延迟+处理+渲染），更贴近真实体验，优秀阈值 ≤ 200ms。',
              },
              {
                question: '关于 preconnect 与 dns-prefetch 的区别，下列说法正确的是？',
                options: [
                  'preconnect 仅做 DNS 解析，dns-prefetch 建立完整连接',
                  '两者完全相同，只是别名',
                  'preconnect 建立完整连接（DNS+TCP+TLS），dns-prefetch 仅 DNS 解析',
                  'dns-prefetch 比 preconnect 开销更大',
                ],
                correctIndex: 2,
                explanation: 'preconnect 提前建立完整连接（DNS+TCP+TLS），适合关键跨域域名（限制 3-4 个）；dns-prefetch 仅 DNS 解析，开销最小，可大量使用（兼容 IE9+）。',
              },
              {
                question: '以下哪个场景最适合使用防抖（debbounce）而非节流（throttle）？',
                options: [
                  '滚动加载更多（scroll）',
                  '搜索框输入联想（input）',
                  '鼠标拖拽（mousemove）',
                  '窗口大小变化（resize）'
                ],
                correctIndex: 1,
                explanation: '搜索框输入联想用防抖：用户停止输入 n 秒后才请求，合并连续触发，避免每按一个键就请求。滚动/拖拽/resize 用节流：每 n 秒最多执行一次，保持流畅响应。',
              },
              {
                question: '虚拟列表能保持性能恒定的核心原理是？',
                options: [
                  '使用 Web Worker 渲染',
                  '使用 CSS will-change 加速',
                  '只渲染可视区域的 DOM 节点（+ 缓冲），非可视区域不渲染',
                  '使用 requestAnimationFrame 调度'
                ],
                correctIndex: 2,
                explanation: '虚拟列表只渲染可视区域内的 DOM（+ overscan 缓冲条数），用「撑开总高度 + translateY 偏移」模拟完整列表。无论数据量多大，DOM 节点数恒定（约 10-20 个），性能恒定。',
              },
              {
                question: '关于 XSS 防御，以下做法错误的是？',
                options: [
                  '用 React 的 {} 渲染用户输入（自动转义）',
                  '需要富文本时用 DOMPurify 净化后再 dangerouslySetInnerHTML',
                  '直接用 innerHTML 渲染用户输入以支持 HTML 格式',
                  '设置 Cookie 的 HttpOnly 属性防止 JS 读取'
                ],
                correctIndex: 2,
                explanation: '直接用 innerHTML 渲染用户输入是 XSS 漏洞！应：① 优先用 textContent 或 React {}（自动转义）；② 需富文本时用 DOMPurify.sanitize() 净化后再渲染；③ 配合 CSP + HttpOnly Cookie 纵深防御。',
              },
              {
                question: '防御 CSRF 攻击最有效的现代方案是？',
                options: [
                  '仅依赖 Origin/Referer 校验',
                  '仅依赖 HTTPS',
                  'SameSite Cookie（Strict/Lax）+ CSRF Token + Origin 校验',
                  '仅依赖 CORS 配置'
                ],
                correctIndex: 2,
                explanation: 'CSRF 防御三件套：① SameSite Cookie（现代浏览器首选，Strict/Lax 阻止跨站携带）；② CSRF Token（双提交 Cookie，服务端校验）；③ Origin/Referer 校验（兜底）。单一方案都有漏洞，需组合使用。',
              },
            ],
          },
        },
        {
          id: 'ps-p12-3',
          type: 'callout',
          variant: 'tip',
          title: '学习建议',
          text: '性能与安全是前端面试的高频考点，也是生产环境的硬性要求。建议结合模块十六（网络）、模块十八（测试）形成「实现 → 测试 → 性能与安全」完整工程化思维。',
        },
      ],
    },
  ],
}
