/**
 * 模块 16：浏览器原理与网络协议
 *
 * 严格遵循 docx/模块十六.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 15 个知识点（对应 15 个可视化演示，含小测验）
 * - 7 个新增浏览器/网络专属组件（位于 components/interactive/browser-network/）
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Timeline / Accordion / QuizCard
 *
 * 章节映射：
 * - 章节1 浏览器架构：#1 知识图谱 / #2 多进程架构
 * - 章节2 渲染原理：#3 渲染流水线 / #4 重排 vs 重绘 / #5 事件循环
 * - 章节3 HTTP 协议：#6 HTTP 请求响应流 / #7 状态码 / #8 HTTP 版本对比
 * - 章节4 缓存策略：#9 缓存决策树
 * - 章节5 传输层：#10 TCP 握手 / #11 HTTPS 握手
 * - 章节6 现代 HTTP：#12 HTTP/3 QUIC / #13 WebSocket & SSE
 * - 章节7 安全 & 存储：#14 浏览器存储对比
 * - 测验：#15 浏览器与网络小测验
 *
 * 所有交互均为教学模拟，不执行真实网络请求/握手。
 */
import type { ModuleMeta } from '../lib/types'

export const browserNetworkModule: ModuleMeta = {
  number: '16',
  title: '浏览器原理与网络协议',
  slug: 'browser-network',
  stage: 'engineering',
  stageLabel: '工程化全栈 · 第 2 模块',
  icon: '16',
  summary:
    '浏览器多进程架构、渲染流水线、HTTP/1.1-2-3、缓存策略、TCP/TLS 握手、WebSocket/SSE、浏览器存储与安全。',
  knowledgePointCount: 15,
  visualizationCount: 15,
  points: [
    // ========================================================================
    // 章节 1 · 浏览器架构
    // ========================================================================

    // 知识点 1：浏览器原理知识图谱
    {
      order: 1,
      title: '浏览器原理与网络总览',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'bn-p1-1',
          type: 'paragraph',
          lead: true,
          text: '模块十六是「工程化全栈」阶段的第二模块，聚焦浏览器内部工作原理与网络协议。从浏览器多进程架构出发，深入渲染流水线（DOM/CSSOM/Layout/Paint/Composite）、HTTP 协议演进（1.1/2/3）、缓存策略（强缓存/协商缓存）、传输层（TCP/TLS）、实时通信（WebSocket/SSE）与浏览器存储/安全，形成从前端代码到屏幕像素、从输入 URL 到页面渲染的完整知识链路。',
        },
        {
          id: 'bn-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'browser', label: '浏览器原理', group: 'core', weight: 3 },
              { id: 'arch', label: '多进程架构', group: 'related', weight: 2 },
              { id: 'render', label: '渲染流水线', group: 'related', weight: 2 },
              { id: 'event-loop', label: '事件循环', group: 'related', weight: 2 },
              { id: 'http', label: 'HTTP 协议', group: 'related', weight: 2 },
              { id: 'cache', label: '缓存策略', group: 'related', weight: 2 },
              { id: 'tcp', label: 'TCP/TLS', group: 'related', weight: 2 },
              { id: 'realtime', label: 'WebSocket/SSE', group: 'related', weight: 1 },
              { id: 'storage', label: '浏览器存储', group: 'related', weight: 1 },
              { id: 'security', label: '安全策略', group: 'related', weight: 1 },
            ],
            edges: [
              { source: 'browser', target: 'arch' },
              { source: 'browser', target: 'render' },
              { source: 'browser', target: 'event-loop' },
              { source: 'browser', target: 'http' },
              { source: 'http', target: 'cache' },
              { source: 'http', target: 'tcp' },
              { source: 'http', target: 'realtime' },
              { source: 'browser', target: 'storage' },
              { source: 'browser', target: 'security' },
            ],
          },
        },
        {
          id: 'bn-p1-3',
          type: 'paragraph',
          text: '理解浏览器原理是高级前端的必备能力：它能解释「为什么 transform 比 left 高效」「为什么 HTTP/2 仍有队头阻塞」「为什么 Cookie 不适合存大数据」等关键问题。本章将通过 7 个新组件 + 8 个复用组件，建立完整的浏览器与网络心智模型。',
        },
      ],
    },

    // 知识点 2：浏览器多进程架构
    {
      order: 2,
      title: '浏览器多进程架构',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'bn-p2-1',
          type: 'paragraph',
          lead: true,
          text: '现代浏览器（如 Chrome）采用多进程架构，每个进程负责不同职责。进程间通过 IPC 通信，互相隔离，单个进程崩溃不会导致整个浏览器崩溃。主要进程包括：Browser 主进程、Renderer 渲染进程、GPU 进程、Network 网络进程、Plugin 插件进程。',
        },
        {
          id: 'bn-p2-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '进程',
            columns: ['职责', '数量', '权限', '崩溃影响'],
            rows: [
              {
                feature: 'Browser 主进程',
                values: ['浏览器界面、Tab 管理、子进程调度、文件存储', '1', '最高', '整个浏览器退出'],
              },
              {
                feature: 'Renderer 渲染进程',
                values: ['HTML/CSS/JS 解析、页面渲染、JS 执行（沙箱）', '每个 Tab 1 个（site isolation）', '沙箱（受限）', '仅当前 Tab 崩溃'],
              },
              {
                feature: 'GPU 进程',
                values: ['GPU 任务调度、WebGL、CSS 合成、视频解码', '1', '中等', '整个浏览器退出'],
              },
              {
                feature: 'Network 网络进程',
                values: ['HTTP/HTTPS 请求、DNS、缓存管理、Cookie', '1', '中等', '网络请求失败'],
              },
              {
                feature: 'Plugin 插件进程',
                values: ['Pepper 插件（Flash、PDF 阅读器）', '按需', '沙箱', '仅插件失效'],
              },
            ],
          },
        },
        {
          id: 'bn-p2-3',
          type: 'callout',
          variant: 'info',
          title: 'Site Isolation 站点隔离',
          text: 'Chrome 67+ 默认启用 Site Isolation：不同站点（如 a.com 与 b.com）的页面在不同渲染进程中运行，缓解 Spectre/Meltdown 类侧信道攻击，并限制渲染进程对其他站点 DOM 的访问。',
        },
      ],
    },

    // ========================================================================
    // 章节 2 · 渲染原理
    // ========================================================================

    // 知识点 3：浏览器渲染流水线
    {
      order: 3,
      title: '浏览器渲染流水线',
      difficulty: 3,
      visualizationType: 'rendering-pipeline-visualizer',
      blocks: [
        {
          id: 'bn-p3-1',
          type: 'paragraph',
          lead: true,
          text: '从 HTML 字节流到屏幕像素，浏览器渲染流水线分为 8 个阶段：HTML 解析 → DOM 构建 → CSS 解析 → CSSOM 构建 → Render Tree 合并 → Layout 布局 → Paint 绘制 → Composite 合成。每个阶段产物作为下个阶段输入，理解流水线是优化渲染性能的基础。',
        },
        {
          id: 'bn-p3-2',
          type: 'demo',
          visualizationType: 'rendering-pipeline-visualizer',
          data: {},
        },
        {
          id: 'bn-p3-3',
          type: 'callout',
          variant: 'tip',
          title: '关键路径优化',
          text: 'CSSOM 未完成前页面不会渲染——CSS 是阻塞渲染的资源。JS 默认阻塞 DOM 解析（除非 async/defer）。优化首屏：内联关键 CSS、defer 非首屏 JS、预连接关键域名。',
        },
      ],
    },

    // 知识点 4：重排 vs 重绘
    {
      order: 4,
      title: '重排 vs 重绘 vs 合成',
      difficulty: 3,
      visualizationType: 'reflow-repaint-comparator',
      blocks: [
        {
          id: 'bn-p4-1',
          type: 'paragraph',
          lead: true,
          text: '修改不同 CSS 属性触发不同的渲染阶段：改变几何属性（width/height/left）触发 Reflow（重排，代价最高）；改变视觉属性（color/background）触发 Repaint（重绘，代价中等）；改变 transform/opacity 仅触发 Composite（合成，代价最低）。动画应优先使用合成属性。',
        },
        {
          id: 'bn-p4-2',
          type: 'demo',
          visualizationType: 'reflow-repaint-comparator',
          data: {},
        },
        {
          id: 'bn-p4-3',
          type: 'callout',
          variant: 'warning',
          title: '强制同步布局（Layout Thrashing）',
          text: '连续读取 offsetHeight 等几何属性再写入样式，会强制浏览器同步执行布局（"布局抖动"）。优化：批量读取 → 批量写入，或使用 requestAnimationFrame。',
        },
      ],
    },

    // 知识点 5：事件循环
    {
      order: 5,
      title: '浏览器事件循环',
      difficulty: 4,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'bn-p5-1',
          type: 'paragraph',
          lead: true,
          text: '事件循环是 JS 异步模型的核心：调用栈执行同步代码 → 执行微任务（Promise.then、queueMicrotask）→ 检查是否需要渲染（约 16.6ms 一次）→ 执行 requestAnimationFrame → 渲染 → 执行一个宏任务（setTimeout、I/O）。微任务在每次宏任务后全部清空。',
        },
        {
          id: 'bn-p5-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            items: [
              {
                time: '0ms · 同步',
                title: '执行同步代码',
                description: '调用栈中的同步任务依次执行。若调用栈为空，事件循环进入下一阶段。',
                status: 'done',
              },
              {
                time: '5ms · 微任务',
                title: '清空微任务队列',
                description: '执行所有已就绪的微任务（Promise.then、queueMicrotask、MutationObserver）。微任务期间产生的新微任务也会在本轮清空。',
                status: 'done',
              },
              {
                time: '8ms · 判断',
                title: '检查渲染时机',
                description: '浏览器判断是否到渲染帧（约 60fps = 16.6ms/帧）。若到帧且页面有变化，进入渲染阶段；否则跳过。',
                status: 'active',
              },
              {
                time: '9ms · rAF',
                title: 'requestAnimationFrame',
                description: '在渲染前执行 rAF 回调。rAF 是触发样式/布局变更的最佳时机，保证变更与本帧渲染同步。',
                status: 'active',
              },
              {
                time: '10ms · 渲染',
                title: '渲染（Layout/Paint/Composite）',
                description: '执行渲染流水线：Style → Layout → Paint → Composite。仅在主线程空闲且页面有变化时执行。',
                status: 'pending',
              },
              {
                time: '16.6ms · 宏任务',
                title: '执行一个宏任务',
                description: '从宏任务队列取出一个任务执行（setTimeout、setInterval、I/O、UI 事件、postMessage）。',
                status: 'pending',
              },
            ],
          },
        },
        {
          id: 'bn-p5-3',
          type: 'callout',
          variant: 'warning',
          title: '微任务 vs 宏任务',
          text: '微任务优先级高于宏任务：每轮事件循环先清空所有微任务，再执行一个宏任务。Promise.then 一定在 setTimeout 之前执行（除非 setTimeout 已就绪且本轮未触发）。',
        },
      ],
    },

    // ========================================================================
    // 章节 3 · HTTP 协议
    // ========================================================================

    // 知识点 6：HTTP 请求响应流
    {
      order: 6,
      title: 'HTTP 请求响应完整流程',
      difficulty: 2,
      visualizationType: 'http-request-response-flow',
      blocks: [
        {
          id: 'bn-p6-1',
          type: 'paragraph',
          lead: true,
          text: '从浏览器输入 URL 到收到响应，完整流程包含 5 个阶段：DNS 解析（域名→IP）→ TCP 三次握手 → TLS 握手（HTTPS）→ 发送 HTTP 请求 → 接收 HTTP 响应。理解各阶段耗时有助于性能优化。',
        },
        {
          id: 'bn-p6-2',
          type: 'demo',
          visualizationType: 'http-request-response-flow',
          data: {},
        },
        {
          id: 'bn-p6-3',
          type: 'callout',
          variant: 'tip',
          title: '性能优化要点',
          text: 'DNS 预解析（dns-prefetch）、TCP/TLS 复用（keep-alive、HTTP/2 多路复用）、CDN 就近接入、HTTP/3 0-RTT 等都是降低建连成本的优化手段。',
        },
      ],
    },

    // 知识点 7：HTTP 状态码
    {
      order: 7,
      title: 'HTTP 状态码分类',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'bn-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'HTTP 状态码用三位数字表示响应结果，按首位分为 5 类：1xx 信息、2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务端错误。掌握常用状态码是排查问题的基本功。',
        },
        {
          id: 'bn-p7-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '状态码',
            columns: ['名称', '含义', '典型场景'],
            rows: [
              { feature: '200', values: ['OK', '请求成功', 'GET/POST 正常返回'] },
              { feature: '204', values: ['No Content', '成功但无响应体', 'DELETE/PUT 成功'] },
              { feature: '206', values: ['Partial Content', '部分内容', '断点续传、视频流'] },
              { feature: '301', values: ['Moved Permanently', '永久重定向', '域名迁移 http→https'] },
              { feature: '302', values: ['Found', '临时重定向', '登录跳转'] },
              { feature: '304', values: ['Not Modified', '协商缓存命中', '资源未变，用本地副本'] },
              { feature: '400', values: ['Bad Request', '请求语法错误', '参数格式错误'] },
              { feature: '401', values: ['Unauthorized', '未认证', '未登录访问受保护资源'] },
              { feature: '403', values: ['Forbidden', '无权限', '已登录但无权访问'] },
              { feature: '404', values: ['Not Found', '资源不存在', 'URL 错误'] },
              { feature: '429', values: ['Too Many Requests', '请求过多', '限流'] },
              { feature: '500', values: ['Internal Server Error', '服务端错误', '服务端代码异常'] },
              { feature: '502', values: ['Bad Gateway', '网关错误', '上游服务挂了'] },
              { feature: '503', values: ['Service Unavailable', '服务不可用', '维护中、过载'] },
              { feature: '504', values: ['Gateway Timeout', '网关超时', '上游响应超时'] },
            ],
          },
        },
      ],
    },

    // 知识点 8：HTTP 版本对比
    {
      order: 8,
      title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'bn-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'HTTP 协议经历三次大版本演进：HTTP/1.1（1997）基于文本、keep-alive、管线化（实际未普及）；HTTP/2（2015）二进制分帧、多路复用、头部压缩 HPACK、服务端推送；HTTP/3（2022）基于 QUIC（UDP）、无 TCP 队头阻塞、0-RTT、连接迁移。',
        },
        {
          id: 'bn-p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['HTTP/1.1', 'HTTP/2', 'HTTP/3'],
            highlightColumn: 2,
            rows: [
              { feature: '传输层', values: ['TCP', 'TCP', 'QUIC (UDP)'] },
              { feature: '数据格式', values: ['文本', '二进制分帧', '二进制分帧'] },
              { feature: '多路复用', values: ['否（需多连接）', '是（单连接）', '是（流级独立）'] },
              { feature: '队头阻塞', values: ['应用层 + TCP 层', '仅 TCP 层', '无'] },
              { feature: '头部压缩', values: ['无', 'HPACK', 'QPACK'] },
              { feature: '建连 RTT', values: ['TCP 1 RTT + TLS 1-2 RTT', 'TCP 1 RTT + TLS 1-2 RTT', '1 RTT（首次）/ 0 RTT（复用）'] },
              { feature: '服务端推送', values: ['无', '支持（已废弃）', '不支持'] },
              { feature: '连接迁移', values: ['无', '无', '支持（IP 变化不断连）'] },
            ],
          },
        },
        {
          id: 'bn-p8-3',
          type: 'callout',
          variant: 'info',
          title: '部署现状',
          text: 'HTTP/2 已广泛部署（要求 HTTPS）。HTTP/3 部署需要 QUIC（UDP 443），部分企业防火墙可能拦截 UDP，因此 HTTP/3 通常作为 HTTP/2 的备选（alt-svc 协商升级）。',
        },
      ],
    },

    // ========================================================================
    // 章节 4 · 缓存策略
    // ========================================================================

    // 知识点 9：HTTP 缓存决策树
    {
      order: 9,
      title: 'HTTP 缓存决策树',
      difficulty: 3,
      visualizationType: 'cache-decision-tree',
      blocks: [
        {
          id: 'bn-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'HTTP 缓存分两类：强缓存（未过期直接用，不发请求，状态 200 from cache）和协商缓存（过期后询问服务端，未变返回 304）。Cache-Control 优先级高于 Expires；ETag 优先级高于 Last-Modified。no-store 禁用缓存，no-cache 强制走协商缓存。',
        },
        {
          id: 'bn-p9-2',
          type: 'demo',
          visualizationType: 'cache-decision-tree',
          data: {},
        },
        {
          id: 'bn-p9-3',
          type: 'callout',
          variant: 'tip',
          title: '生产实践',
          text: 'HTML 用 no-cache（保证最新）；带 hash 的 JS/CSS 用 max-age=31536000 immutable（一年强缓存）；API 响应用 no-store 或短 max-age + 协商缓存。文件名加 hash 是长缓存的前提。',
        },
      ],
    },

    // ========================================================================
    // 章节 5 · 传输层
    // ========================================================================

    // 知识点 10：TCP 三次握手
    {
      order: 10,
      title: 'TCP 三次握手与四次挥手',
      difficulty: 3,
      visualizationType: 'tcp-handshake-visualizer',
      blocks: [
        {
          id: 'bn-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'TCP 是面向连接的可靠传输协议，建立连接需三次握手（SYN/SYN+ACK/ACK），断开连接需四次挥手（FIN/ACK/FIN/ACK）。每个报文携带 seq 序号和 ack 确认号，保证数据有序、不丢、不重。',
        },
        {
          id: 'bn-p10-2',
          type: 'demo',
          visualizationType: 'tcp-handshake-visualizer',
          data: {},
        },
        {
          id: 'bn-p10-3',
          type: 'callout',
          variant: 'info',
          title: '为什么是三次而非两次？',
          text: '两次握手无法防止"已失效的连接请求"到达服务端导致资源浪费。第三次 ACK 确认了双方的接收能力，并同步了客户端的 seq。四次挥手则因为 TCP 是全双工——服务端收到 FIN 后可能还有数据要发，需单独发 FIN。',
        },
      ],
    },

    // 知识点 11：HTTPS TLS 握手
    {
      order: 11,
      title: 'HTTPS 与 TLS 握手',
      difficulty: 4,
      visualizationType: 'https-handshake-flow',
      blocks: [
        {
          id: 'bn-p11-1',
          type: 'paragraph',
          lead: true,
          text: 'HTTPS = HTTP + TLS。TLS 握手协商加密套件、验证证书、交换密钥，最终生成对称会话密钥加密后续通信。证书体系（CA、证书链）解决"中间人攻击"问题——浏览器只信任系统内置的根 CA 签发的证书。',
        },
        {
          id: 'bn-p11-2',
          type: 'demo',
          visualizationType: 'https-handshake-flow',
          data: {},
        },
        {
          id: 'bn-p11-3',
          type: 'callout',
          variant: 'warning',
          title: '非对称 vs 对称',
          text: '非对称加密（RSA/ECDHE）用于握手阶段协商密钥（慢但安全）；对称加密（AES）用于后续数据传输（快且高效）。这是性能与安全的折中。',
        },
      ],
    },

    // ========================================================================
    // 章节 6 · 现代 HTTP
    // ========================================================================

    // 知识点 12：HTTP/3 QUIC
    {
      order: 12,
      title: 'HTTP/3 与 QUIC 多路复用',
      difficulty: 4,
      visualizationType: 'quic-multiplexing-visualizer',
      blocks: [
        {
          id: 'bn-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'HTTP/3 基于 QUIC（Google 设计，IETF 标准化），运行在 UDP 之上。核心特性：流级多路复用（单流丢包不影响其他流，消除 TCP 队头阻塞）、0-RTT 建连、连接迁移（IP 变化不断连）、集成 TLS 1.3。',
        },
        {
          id: 'bn-p12-2',
          type: 'demo',
          visualizationType: 'quic-multiplexing-visualizer',
          data: {},
        },
        {
          id: 'bn-p12-3',
          type: 'callout',
          variant: 'info',
          title: '为什么用 UDP？',
          text: 'TCP 实现在操作系统内核，演进困难；QUIC 运行在用户空间 UDP 之上，可快速迭代。UDP 本身不可靠，QUIC 在其上重新实现了可靠传输、拥塞控制、流复用。',
        },
      ],
    },

    // 知识点 13：WebSocket & SSE
    {
      order: 13,
      title: '实时通信：WebSocket 与 SSE',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'bn-p13-1',
          type: 'paragraph',
          lead: true,
          text: '前端实时通信主要有三种方案：短轮询（setInterval 请求）、SSE（Server-Sent Events，单向服务端推送）、WebSocket（全双工）。SSE 基于 HTTP，简单适合服务端推送；WebSocket 独立协议，适合双向通信（聊天、协同编辑）。',
        },
        {
          id: 'bn-p13-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['短轮询', 'SSE', 'WebSocket'],
            rows: [
              { feature: '协议', values: ['HTTP', 'HTTP', 'WebSocket（独立协议）'] },
              { feature: '通信方向', values: ['客户端主动拉', '服务端 → 客户端', '全双工（双向）'] },
              { feature: '数据格式', values: ['任意（text/json）', '文本（text/event-stream）', '文本或二进制'] },
              { feature: '连接数限制', values: ['无（HTTP 限制）', '浏览器同域 6 个', '无'] },
              { feature: '断线重连', values: ['手动', '内置自动重连', '手动实现'] },
              { feature: '兼容性', values: ['全平台', '主流（IE 不支持）', '主流（IE10+）'] },
              { feature: '典型场景', values: ['低频更新', '通知、股票行情、日志流', '聊天、协同编辑、游戏'] },
              { feature: '实现复杂度', values: ['低', '低（EventSource API）', '中（需处理重连、心跳）'] },
            ],
          },
        },
        {
          id: 'bn-p13-3',
          type: 'callout',
          variant: 'tip',
          title: '选型建议',
          text: '仅需服务端推送选 SSE（简单、自动重连、兼容 HTTP 基础设施）；需双向通信选 WebSocket。避免用短轮询模拟实时（浪费带宽、延迟高）。',
        },
      ],
    },

    // ========================================================================
    // 章节 7 · 安全 & 存储
    // ========================================================================

    // 知识点 14：浏览器存储对比
    {
      order: 14,
      title: '浏览器存储 API 对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'bn-p14-1',
          type: 'paragraph',
          lead: true,
          text: '浏览器提供多种存储 API：Cookie（4KB，随请求自动携带）、localStorage（5-10MB，永久）、sessionStorage（5-10MB，标签关闭清除）、IndexedDB（数百 MB+，结构化数据库）、Cache API（Service Worker 资源缓存）。选型需考虑容量、生命周期、是否随请求携带、是否同步 API。',
        },
        {
          id: 'bn-p14-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Cookie', 'localStorage', 'IndexedDB', 'Cache API'],
            rows: [
              { feature: '容量', values: ['4KB', '5-10MB', '数百 MB+（可申请更多）', '数百 MB+（按 origin）'] },
              { feature: '生命周期', values: ['可设 expires/max-age', '永久（手动清除）', '永久（手动清除）', '永久（手动清除）'] },
              { feature: '随请求携带', values: ['是（同域自动）', '否', '否', '否'] },
              { feature: 'API 类型', values: ['同步', '同步', '异步（Promise）', '异步（Promise）'] },
              { feature: '数据类型', values: ['字符串', '字符串（JSON 序列化）', '结构化对象、Blob、File', 'Request/Response'] },
              { feature: '典型用途', values: ['会话、认证 token', '用户偏好、缓存数据', '离线数据、大量结构化数据', 'PWA 离线资源缓存'] },
              { feature: '安全', values: ['HttpOnly、Secure、SameSite', '同源策略', '同源策略', '同源策略'] },
            ],
          },
        },
        {
          id: 'bn-p14-3',
          type: 'callout',
          variant: 'warning',
          title: 'Cookie 安全属性',
          text: '认证 Cookie 必须设置：HttpOnly（防 XSS 读取）、Secure（仅 HTTPS）、SameSite=Lax/Strict（防 CSRF）。避免在 Cookie 中存大量数据（4KB 限制 + 每请求携带浪费带宽）。',
        },
      ],
    },

    // ========================================================================
    // 测验
    // ========================================================================

    // 知识点 15：浏览器与网络小测验
    {
      order: 15,
      title: '浏览器与网络小测验',
      difficulty: 2,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'bn-p15-1',
          type: 'paragraph',
          lead: true,
          text: '通过 5 道选择题快速检验对浏览器原理与网络协议的掌握。涵盖渲染流水线、缓存策略、TCP 握手、HTTP 版本差异等核心知识。',
        },
        {
          id: 'bn-p15-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '修改以下哪个 CSS 属性只触发合成（Composite），不触发 Layout 和 Paint？',
                options: ['width', 'color', 'transform', 'left'],
                correctIndex: 2,
                explanation: 'transform 和 opacity 是合成属性，由 GPU 直接处理，不触发 Layout 和 Paint，性能最佳。',
              },
              {
                question: '关于强缓存和协商缓存，以下说法正确的是？',
                options: [
                  '强缓存命中时浏览器仍会发请求，只是用本地副本',
                  '协商缓存命中时返回 304，不返回响应体',
                  'Cache-Control: no-store 表示浏览器存储但每次需验证',
                  'ETag 优先级低于 Last-Modified',
                ],
                correctIndex: 1,
                explanation: '协商缓存命中返回 304 Not Modified，浏览器用本地副本。no-store 表示完全不存储；ETag 优先级高于 Last-Modified；强缓存命中不发请求。',
              },
              {
                question: 'HTTP/2 相比 HTTP/1.1 的主要改进是？',
                options: [
                  '基于 UDP，消除队头阻塞',
                  '二进制分帧、多路复用、头部压缩',
                  '支持服务端推送且强制启用',
                  '0-RTT 建连',
                ],
                correctIndex: 1,
                explanation: 'HTTP/2 基于二进制分帧，单连接多路复用，使用 HPACK 压缩头部。仍基于 TCP，存在 TCP 层队头阻塞。0-RTT 和基于 UDP 是 HTTP/3 的特性。',
              },
              {
                question: 'TCP 三次握手中，第二次握手报文的标志位是？',
                options: ['SYN', 'ACK', 'SYN + ACK', 'FIN + ACK'],
                correctIndex: 2,
                explanation: '第二次握手服务端发送 SYN+ACK：同时确认客户端的 SYN（ACK=1, ack=x+1）并发起自己的 SYN（SYN=1, seq=y）。',
              },
              {
                question: '以下哪种存储 API 适合存储大量结构化离线数据？',
                options: ['Cookie', 'localStorage', 'sessionStorage', 'IndexedDB'],
                correctIndex: 3,
                explanation: 'IndexedDB 是浏览器内置的 NoSQL 数据库，支持数百 MB+ 容量、异步 API、结构化对象、索引查询，适合离线应用的大量数据存储。',
              },
            ],
          },
        },
      ],
    },
  ],
}
