/**
 * 模块 17：Node.js 与全栈基础
 *
 * 严格遵循 docx/模块十七.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 12 个知识点（对应 12 个可视化演示，含小测验）
 * - 5 个新增 Node.js/全栈专属组件（位于 components/interactive/nodejs/）
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard
 * - 跨模块复用模块十六：HttpRequestResponseFlow / TcpHandshakeVisualizer（切换为服务端视角）
 *
 * 章节映射：
 * - 章节1 Node.js 运行时：#1 知识图谱 / #2 事件循环六阶段 / #3 CommonJS vs ESM / #4 异步文件 IO
 * - 章节2 Express 基础：#5 中间件洋葱模型 / #6 Express vs Koa
 * - 章节3 RESTful API：#7 设计矩阵 / #8 HTTP 状态码
 * - 章节4 跨模块网络复用：#9 HTTP 请求响应流（服务端） / #10 TCP 握手（服务端）
 * - 章节5 速查与测验：#11 知识点速查 / #12 全栈小测验
 *
 * 所有交互均为教学模拟，不启动真实 Node.js 服务。
 */
import type { ModuleMeta } from '../lib/types'

export const nodejsFullstackModule: ModuleMeta = {
  number: '17',
  title: 'Node.js 与全栈基础',
  slug: 'nodejs-fullstack',
  stage: 'engineering',
  stageLabel: '工程化全栈 · 第 3 模块',
  icon: '17',
  summary:
    'Node.js 运行时（V8/事件循环/模块系统/文件系统）、Express 中间件洋葱模型、RESTful API 设计矩阵，跨模块复用 HTTP/TCP 服务端视角。',
  knowledgePointCount: 12,
  visualizationCount: 12,
  points: [
    // ========================================================================
    // 章节 1 · Node.js 运行时
    // ========================================================================

    // 知识点 1：Node.js 与全栈知识图谱
    {
      order: 1,
      title: 'Node.js 与全栈总览',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'nf-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'Node.js 是基于 V8 引擎的 JavaScript 运行时，让 JS 走出浏览器、登上服务端。它以"单线程 + 事件驱动 + 非阻塞 I/O"为核心模型，配合 libuv 实现事件循环六阶段，是全栈开发的能力起点。',
        },
        {
          id: 'nf-p1-2',
          type: 'paragraph',
          text: '本模块从浏览器端（模块十六）跃迁到服务端：复用同一套 HTTP/TCP 网络组件，切换为服务端视角，形成"客户端发起 → 服务端接收 → 处理 → 响应"的完整闭环。下面是模块十七的知识图谱，6 大主题串联起 Node.js 与全栈基础的核心能力。',
        },
        {
          id: 'nf-p1-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'nodejs', label: 'Node.js 与全栈', group: 'core', weight: 3 },
              { id: 'runtime', label: '运行时（V8+libuv）', group: 'runtime', weight: 2 },
              { id: 'modules', label: '模块系统', group: 'runtime' },
              { id: 'filesystem', label: '文件系统', group: 'runtime' },
              { id: 'express', label: 'Express 框架', group: 'framework', weight: 2 },
              { id: 'restful', label: 'RESTful API', group: 'api', weight: 2 },
              { id: 'network', label: 'HTTP/TCP（服务端）', group: 'network' },
            ],
            edges: [
              { source: 'nodejs', target: 'runtime', label: '基于' },
              { source: 'runtime', target: 'modules', label: '组织代码' },
              { source: 'runtime', target: 'filesystem', label: 'I/O 操作' },
              { source: 'nodejs', target: 'express', label: 'Web 框架' },
              { source: 'express', target: 'restful', label: '构建 API' },
              { source: 'express', target: 'network', label: '监听端口' },
              { source: 'restful', target: 'network', label: '基于 HTTP' },
            ],
          },
        },
        {
          id: 'nf-p1-4',
          type: 'callout',
          variant: 'tip',
          title: '学习路径',
          text: '建议按"运行时 → 模块系统 → 文件系统 → 事件循环 → Express → RESTful"顺序学习，事件循环是核心中的核心，是 Node.js 面试的超高频考点。',
        },
      ],
    },

    // 知识点 2：事件循环六阶段
    {
      order: 2,
      title: 'Node.js 事件循环六阶段',
      difficulty: 3,
      visualizationType: 'event-loop-visualizer',
      blocks: [
        {
          id: 'nf-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Node.js 事件循环由 libuv 实现，包含六个阶段：timers → pending callbacks → idle/prepare → poll → check → close callbacks，循环往复。每个阶段处理特定类型的回调，阶段切换之间会清空微任务队列。',
        },
        {
          id: 'nf-p2-2',
          type: 'paragraph',
          text: '关键认知：①setTimeout/setInterval 在 timers 阶段；②setImmediate 在 check 阶段；③I/O 回调在 poll 阶段；④process.nextTick 优先级最高（高于 Promise 微任务），会在每个阶段切换前清空。',
        },
        {
          id: 'nf-p2-3',
          type: 'demo',
          visualizationType: 'event-loop-visualizer',
          data: {},
        },
        {
          id: 'nf-p2-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 重点：nextTick vs Promise',
          text: 'process.nextTick 的优先级高于 Promise.then 微任务。在每个阶段切换之前，会先清空 nextTick 队列，再清空 Promise 微任务队列，然后才进入下一阶段。递归调用 process.nextTick 会阻塞事件循环。',
        },
      ],
    },

    // 知识点 3：CommonJS vs ESM
    {
      order: 3,
      title: 'CommonJS vs ESM 模块系统',
      difficulty: 2,
      visualizationType: 'module-system-comparator',
      blocks: [
        {
          id: 'nf-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'Node.js 同时支持两套模块系统：CommonJS（require/module.exports，运行时动态加载）与 ESM（import/export，编译时静态分析）。两者在语法、加载时机、循环依赖处理、tree-shaking 支持上有本质差异。',
        },
        {
          id: 'nf-p3-2',
          type: 'paragraph',
          text: '现代项目优先选择 ESM：静态结构便于打包工具 tree-shaking，支持顶层 await，且与浏览器模块系统一致。可通过 package.json 的 "type": "module" 启用 ESM，或用 .mjs/.cjs 扩展名显式指定。',
        },
        {
          id: 'nf-p3-3',
          type: 'demo',
          visualizationType: 'module-system-comparator',
          data: {},
        },
      ],
    },

    // 知识点 4：异步文件 IO 三种范式
    {
      order: 4,
      title: '异步文件 IO 三种范式',
      difficulty: 2,
      visualizationType: 'filesystem-async-comparator',
      blocks: [
        {
          id: 'nf-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Node.js fs 模块提供三种 API 风格：同步（fs.readFileSync，阻塞主线程）、回调（fs.readFile，传统异步）、Promise（fs.promises.readFile，配合 async/await）。三者功能等价，但阻塞特性与代码风格迥异。',
        },
        {
          id: 'nf-p4-2',
          type: 'paragraph',
          text: '经验法则：①Web 服务中绝对避免同步 API（会阻塞所有请求）；②新项目优先 fs.promises + async/await；③需要并发可用 Promise.all；④旧代码迁移可用 util.promisify 包装回调 API。',
        },
        {
          id: 'nf-p4-3',
          type: 'demo',
          visualizationType: 'filesystem-async-comparator',
          data: {},
        },
      ],
    },

    // ========================================================================
    // 章节 2 · Express 基础
    // ========================================================================

    // 知识点 5：Express 中间件洋葱模型
    {
      order: 5,
      title: 'Express 中间件洋葱模型',
      difficulty: 3,
      visualizationType: 'express-middleware-flow',
      blocks: [
        {
          id: 'nf-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Express 的核心设计是中间件（Middleware）：一个函数接收 (req, res, next)，通过 next() 把控制权交给下一个中间件。多个中间件形成"洋葱模型"——请求依次穿过外层→内层到达路由，响应则从内层→外层逆序返回。',
        },
        {
          id: 'nf-p5-2',
          type: 'paragraph',
          text: '中间件按注册顺序执行，app.use 注册全局中间件，app.get/app.post 注册路由处理器。错误处理中间件有 4 个参数 (err, req, res, next)，必须放在所有中间件之后，通过 next(err) 触发。',
        },
        {
          id: 'nf-p5-3',
          type: 'demo',
          visualizationType: 'express-middleware-flow',
          data: {},
        },
        {
          id: 'nf-p5-4',
          type: 'callout',
          variant: 'tip',
          title: '与 Koa 的区别',
          text: 'Koa 用 async/await + ctx 实现真正的"洋葱模型"：await next() 之后的代码即响应阶段，可以用 try/catch 捕获下游错误。Express 的中间件本质是回调链，错误需通过 next(err) 显式传递。',
        },
      ],
    },

    // 知识点 6：Express vs Koa 对比
    {
      order: 6,
      title: 'Express vs Koa 框架对比',
      difficulty: 2,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'nf-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Express 与 Koa 都是 Node.js 主流 Web 框架，同由 TJ Holowaychuk 团队发起。Koa 是 Express 的"精神续作"，用 async/await 取代回调，更轻量、更现代。两者在中间件模型、错误处理、生态上有显著差异。',
        },
        {
          id: 'nf-p6-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Express', 'Koa'],
            highlightColumn: 1,
            rows: [
              { feature: '诞生时间', values: ['2010 年', '2013 年'] },
              { feature: '异步基础', values: ['回调（callback）', 'async/await'] },
              { feature: '中间件模型', values: ['线性回调链', '洋葱模型（await next）'] },
              { feature: '上下文对象', values: ['req / res 分离', 'ctx（封装 req/res）'] },
              { feature: '错误处理', values: ['next(err) 显式传递', 'try/catch + 中间件捕获'] },
              { feature: '内置功能', values: ['路由、静态文件、模板等齐全', '极简，仅 HTTP 包装'] },
              { feature: '生态丰富度', values: ['极丰富（npm 生态）', '需自行组合中间件'] },
              { feature: '学习曲线', values: ['平缓，开箱即用', '稍陡，需理解 async/await'] },
              { feature: 'TypeScript 支持', values: ['需 @types/express', '原生更好（Koa 2+）'] },
              { feature: '适用场景', values: ['快速构建传统 Web 服务', '现代 API、需要精细控制'] },
            ],
          },
        },
        {
          id: 'nf-p6-3',
          type: 'callout',
          variant: 'info',
          title: '选型建议',
          text: '新项目优先考虑 Koa 2 或更上层的 NestJS/Fastify；遗留系统、教学示例、需要大量成熟中间件时选 Express。两者性能差异不大，核心是中间件模型的代码风格。',
        },
      ],
    },

    // ========================================================================
    // 章节 3 · RESTful API 设计
    // ========================================================================

    // 知识点 7：RESTful API 设计矩阵
    {
      order: 7,
      title: 'RESTful API 设计矩阵',
      difficulty: 3,
      visualizationType: 'restful-api-designer',
      blocks: [
        {
          id: 'nf-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'REST（Representational State Transfer）是一种基于 HTTP 的 API 设计风格：资源用名词复数（/users），操作用 HTTP 方法表达（GET 查 / POST 增 / PUT 改 / DELETE 删）。资源 × 方法构成设计矩阵，每个单元格对应一个 API 端点。',
        },
        {
          id: 'nf-p7-2',
          type: 'paragraph',
          text: '幂等性是关键概念：GET/PUT/DELETE 幂等（重复执行结果相同），POST 不幂等。安全性指不改变服务端状态：GET/HEAD/OPTIONS 安全，其他不安全。这些特性直接影响缓存、重试、容错设计。',
        },
        {
          id: 'nf-p7-3',
          type: 'demo',
          visualizationType: 'restful-api-designer',
          data: {},
        },
        {
          id: 'nf-p7-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 重点：RESTful 设计原则',
          text: 'URL 表达"是什么"，HTTP 方法表达"做什么"；版本化（/v1/users）；分页过滤排序用 query string（?page=1&size=20&sort=created_at:desc）；嵌套资源表达从属（/users/:id/posts）；状态码语义化（2xx 成功 / 4xx 客户端错误 / 5xx 服务端错误）。',
        },
      ],
    },

    // 知识点 8：HTTP 状态码（服务端视角）
    {
      order: 8,
      title: 'HTTP 状态码（服务端视角）',
      difficulty: 1,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'nf-p8-1',
          type: 'paragraph',
          lead: true,
          text: '服务端返回的状态码是 RESTful API 与客户端沟通的"语言"。从 Node.js 服务端视角，正确选择状态码比返回数据本身更重要——它决定了客户端如何解析响应、是否重试、是否缓存。',
        },
        {
          id: 'nf-p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '状态码',
            columns: ['名称', '服务端典型用法'],
            rows: [
              { feature: '200', values: ['OK', 'GET/POST 成功返回数据'] },
              { feature: '201', values: ['Created', 'POST 创建资源成功，Location 头指向新资源'] },
              { feature: '204', values: ['No Content', 'PUT/PATCH/DELETE 成功，无响应体'] },
              { feature: '304', values: ['Not Modified', '协商缓存命中，客户端用本地副本'] },
              { feature: '400', values: ['Bad Request', '请求体格式错误、参数校验失败'] },
              { feature: '401', values: ['Unauthorized', '未登录，缺少/失效的 Authorization token'] },
              { feature: '403', values: ['Forbidden', '已登录但无权限访问该资源'] },
              { feature: '404', values: ['Not Found', '资源不存在或路由未匹配'] },
              { feature: '409', values: ['Conflict', '资源已存在（如重复创建用户）'] },
              { feature: '422', values: ['Unprocessable Entity', '语义错误（如字段类型不对）'] },
              { feature: '429', values: ['Too Many Requests', '触发限流，Retry-After 头指示重试时间'] },
              { feature: '500', values: ['Internal Server Error', '服务端代码异常，需日志排查'] },
              { feature: '502', values: ['Bad Gateway', '反向代理无法连接上游服务'] },
              { feature: '503', values: ['Service Unavailable', '服务维护中或过载'] },
              { feature: '504', values: ['Gateway Timeout', '上游服务响应超时'] },
            ],
          },
        },
        {
          id: 'nf-p8-3',
          type: 'callout',
          variant: 'tip',
          title: '服务端实践',
          text: '建议封装统一的错误处理中间件：业务错误用 4xx，系统异常用 5xx；返回统一格式 { code, message, data }；429 一定要带 Retry-After；5xx 切勿泄露堆栈到响应体。',
        },
      ],
    },

    // ========================================================================
    // 章节 4 · 跨模块网络复用（服务端视角）
    // ========================================================================

    // 知识点 9：HTTP 请求响应流（服务端视角）
    {
      order: 9,
      title: 'HTTP 请求响应流（服务端视角）',
      difficulty: 2,
      visualizationType: 'http-request-response-flow',
      blocks: [
        {
          id: 'nf-p9-1',
          type: 'paragraph',
          lead: true,
          text: '从 Node.js 服务端视角，处理一个 HTTP 请求的流程是：accept TCP 连接 → 解析 HTTP 报文 → 路由匹配 → 执行中间件链 → 业务处理 → 序列化响应 → 发送响应 → 关闭/复用连接。这与模块十六的客户端视角形成闭环。',
        },
        {
          id: 'nf-p9-2',
          type: 'demo',
          visualizationType: 'http-request-response-flow',
          data: {
            urlExample: 'http://localhost:3000/api/users/42',
            stages: [
              {
                id: 'tcp',
                name: 'accept TCP 连接',
                description: 'Node.js HTTP 服务通过 net 模块监听端口，操作系统完成 TCP 三次握手后，将连接交由事件循环的 poll 阶段处理。一个 Node.js 进程可同时维护数万并发连接（非阻塞 I/O）。',
                direction: 'bidirectional',
                durationMs: 10,
                color: '#1a6cff',
                payload: `客户端 → SYN → Node.js (listen)
客户端 ← SYN+ACK ← Node.js
客户端 → ACK → Node.js
连接已建立，移交 HTTP 解析器`,
              },
              {
                id: 'request',
                name: '解析 HTTP 请求报文',
                description: 'Node.js HTTP 解析器（llhttp）将字节流解析为请求行、头部、请求体，触发 request 事件，构造 IncomingMessage (req) 与 ServerResponse (res) 对象交给 Express 应用。',
                direction: 'request',
                durationMs: 5,
                color: '#f59e0b',
                payload: `GET /api/users/42 HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhb...
Accept: application/json

(无请求体，GET 方法)`,
              },
              {
                id: 'tls',
                name: '路由匹配 + 中间件链',
                description: 'Express 按注册顺序匹配路由（app.get("/api/users/:id", ...)），依次执行中间件链：日志 → CORS → body-parser → 认证 → 路由处理器。每个中间件通过 next() 传递控制权。',
                direction: 'bidirectional',
                durationMs: 20,
                color: '#a78bfa',
                payload: `morgan → cors → express.json → auth → routeHandler
   ↓        ↓          ↓             ↓        ↓
   └────────┴──────────┴─────────────┴────────┘
              （洋葱模型：请求穿透 + 响应逆序）`,
              },
              {
                id: 'dns',
                name: '业务处理（含 DB 查询）',
                description: '路由处理器执行业务逻辑：参数校验 → 数据库查询（async/await）→ 数据转换。期间的 I/O 操作（DB/Redis/外部 API）均为非阻塞，事件循环可同时处理其他请求。',
                direction: 'bidirectional',
                durationMs: 50,
                color: '#07c160',
                payload: `async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: '未找到' })
  res.json(user)
}`,
              },
              {
                id: 'response',
                name: '序列化响应 + 发送',
                description: 'res.json() 将对象序列化为 JSON 字符串，设置 Content-Type/Length，通过底层 socket 写入字节流。HTTP/1.1 默认 keep-alive 复用连接，避免下次握手。',
                direction: 'response',
                durationMs: 8,
                color: '#ec4899',
                payload: `HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 48
X-Response-Time: 93ms

{"id":42,"name":"Alice","email":"a@x.com"}`,
              },
            ],
          },
        },
        {
          id: 'nf-p9-3',
          type: 'callout',
          variant: 'info',
          title: '与模块十六的对照',
          text: '模块十六展示客户端发起的请求流（DNS → TCP → TLS → 请求 → 响应），本知识点切换为服务端接收视角（accept → 解析 → 路由 → 业务 → 响应）。两者拼接即为完整的 HTTP 通信闭环。',
        },
      ],
    },

    // 知识点 10：TCP 三次握手（服务端视角）
    {
      order: 10,
      title: 'TCP 三次握手（服务端视角）',
      difficulty: 2,
      visualizationType: 'tcp-handshake-visualizer',
      blocks: [
        {
          id: 'nf-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'Node.js 服务端通过 net.createServer / http.createServer 监听端口，操作系统内核维护 SYN 队列与 accept 队列。客户端发起 SYN，服务端进入 SYN_RCVD 状态，三次握手完成后连接进入 accept 队列，等待 Node.js 的事件循环取出处理。',
        },
        {
          id: 'nf-p10-2',
          type: 'demo',
          visualizationType: 'tcp-handshake-visualizer',
          data: {
            handshakePhases: [
              {
                id: 'closed',
                name: '初始状态',
                description: '服务端 listen() 后处于 LISTEN 状态，等待客户端连接。内核维护两个队列：SYN 队列（半连接）与 accept 队列（全连接）。',
                clientState: 'CLOSED',
                serverState: 'LISTEN',
                color: '#6b7280',
              },
              {
                id: 'syn-sent',
                name: '第一次握手：客户端 SYN',
                description: '客户端发送 SYN seq=x，服务端收到后分配内存，加入 SYN 队列（半连接队列），回复 SYN+ACK。此阶段服务端进入 SYN_RCVD 状态。',
                clientState: 'SYN_SENT',
                serverState: 'SYN_RCVD',
                direction: 'c2s',
                seq: 1000,
                ack: 0,
                flags: ['SYN'],
                color: '#1a6cff',
              },
              {
                id: 'syn-received',
                name: '第二次握手：服务端 SYN+ACK',
                description: '服务端发送 SYN seq=y, ACK ack=x+1，确认客户端 SYN 并发起自己的 SYN。客户端收到后进入 ESTABLISHED 状态。此阶段服务端仍在 SYN_RCVD，等待客户端 ACK。',
                clientState: 'ESTABLISHED',
                serverState: 'SYN_RCVD',
                direction: 's2c',
                seq: 5000,
                ack: 1001,
                flags: ['SYN', 'ACK'],
                color: '#07c160',
              },
              {
                id: 'established',
                name: '第三次握手：客户端 ACK',
                description: '客户端发送 ACK ack=y+1，服务端收到后从 SYN 队列移除，加入 accept 队列，进入 ESTABLISHED 状态。Node.js 事件循环在 poll 阶段从 accept 队列取出连接，触发 connection 事件。',
                clientState: 'ESTABLISHED',
                serverState: 'ESTABLISHED',
                direction: 'c2s',
                seq: 1001,
                ack: 5001,
                flags: ['ACK'],
                color: '#f59e0b',
              },
            ],
            teardownPhases: [
              {
                id: 'fin-wait-1',
                name: '第一次挥手：客户端 FIN',
                description: '客户端发送 FIN，表示无数据要发。服务端回复 ACK，进入 CLOSE_WAIT 状态（仍可发送未发完的数据）。',
                clientState: 'FIN_WAIT_1',
                serverState: 'CLOSE_WAIT',
                direction: 'c2s',
                flags: ['FIN', 'ACK'],
                color: '#a78bfa',
              },
              {
                id: 'established',
                name: '第二次挥手：服务端 ACK',
                description: '服务端确认客户端 FIN，进入 CLOSE_WAIT。客户端进入 FIN_WAIT_2，等待服务端 FIN。',
                clientState: 'FIN_WAIT_2',
                serverState: 'CLOSE_WAIT',
                direction: 's2c',
                flags: ['ACK'],
                color: '#ec4899',
              },
              {
                id: 'closed',
                name: '第三次挥手：服务端 FIN',
                description: '服务端发送 FIN（数据已发完），客户端回复 ACK，进入 TIME_WAIT 状态（等待 2MSL 后彻底关闭，防止旧报文影响新连接）。',
                clientState: 'TIME_WAIT',
                serverState: 'LAST_ACK',
                direction: 's2c',
                flags: ['FIN', 'ACK'],
                color: '#f43f5e',
              },
              {
                id: 'closed',
                name: '第四次挥手：客户端 ACK',
                description: '客户端发送 ACK，服务端进入 CLOSED，连接彻底释放。客户端等待 2MSL（最大报文段寿命，通常 60s）后也进入 CLOSED。',
                clientState: 'CLOSED (2MSL 后)',
                serverState: 'CLOSED',
                direction: 'c2s',
                flags: ['ACK'],
                color: '#6b7280',
              },
            ],
          },
        },
        {
          id: 'nf-p10-3',
          type: 'callout',
          variant: 'warning',
          title: '服务端调优',
          text: '高并发场景下需关注：① somaxconn（accept 队列上限）避免队列满丢连接；② tcp_syncookies 防御 SYN Flood 攻击；③ Node.js 的 backlog 参数（server.listen(3000, backlog)）需与内核参数匹配。',
        },
      ],
    },

    // ========================================================================
    // 章节 5 · 速查与测验
    // ========================================================================

    // 知识点 11：知识点速查
    {
      order: 11,
      title: 'Node.js 全栈知识点速查',
      difficulty: 1,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'nf-p11-1',
          type: 'paragraph',
          lead: true,
          text: '本节将模块十七的核心知识点按主题分类整理为速查表，点击展开查看详细说明与代码示例。适合面试前快速复习、开发中即时查阅。',
        },
        {
          id: 'nf-p11-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: false,
            defaultOpen: [0],
            items: [
              {
                title: '事件循环六阶段',
                content: 'Node.js 事件循环由 libuv 实现，包含六个阶段循环执行：timers（setTimeout/setInterval）→ pending callbacks（系统级延迟回调）→ idle/prepare（内部使用）→ poll（I/O 回调，核心阶段）→ check（setImmediate）→ close callbacks（close 事件）。阶段切换之间清空微任务队列（process.nextTick 优先级高于 Promise.then）。',
                code: `// 经典面试题：setImmediate vs setTimeout(0) 的执行顺序
setTimeout(() => console.log('timeout'), 0)
setImmediate(() => console.log('immediate'))

// 在主模块中执行：顺序不确定（取决于 1ms 计时器是否到期）
// 在 I/O 回调中执行：setImmediate 一定先于 setTimeout`,
                codeLanguage: 'js',
              },
              {
                title: 'CommonJS vs ESM 关键差异',
                content: 'CommonJS 运行时加载（require 动态）、module.exports 整体导出、循环依赖返回快照；ESM 编译时静态（import 必须顶层）、export 具名导出、循环依赖活绑定、支持 tree-shaking 与顶层 await。现代项目优先 ESM，通过 package.json "type": "module" 启用。',
                code: `// ESM 顶层 await（CommonJS 不支持）
const config = await fetch('/config').then(r => r.json())
export default config`,
                codeLanguage: 'js',
              },
              {
                title: '异步文件 IO 三种范式',
                content: 'fs.readFileSync（同步，阻塞主线程，仅启动期用）；fs.readFile（回调，传统异步，易回调地狱）；fs.promises.readFile（Promise，配合 async/await，推荐）。util.promisify 可将回调 API 包装为 Promise。',
                code: `const fsp = require('fs').promises
const { promisify } = require('util')
const readFileCb = require('fs').readFile

// Promise 范式（推荐）
async function read() {
  return await fsp.readFile('/path', 'utf-8')
}

// promisify 包装回调 API
const readFileP = promisify(readFileCb)
await readFileP('/path', 'utf-8')`,
                codeLanguage: 'js',
              },
              {
                title: 'Express 中间件洋葱模型',
                content: '中间件是 (req, res, next) => {...} 函数，通过 next() 传递控制权。请求依次穿过中间件链，响应逆序返回。错误处理中间件 4 个参数 (err, req, res, next)，放最后，通过 next(err) 触发。app.use 注册全局，app.METHOD 注册路由。',
                code: `// 错误处理中间件（必须 4 个参数）
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: '服务器内部错误' })
})

// 触发错误处理
app.get('/error', (req, res, next) => {
  try {
    throw new Error('boom')
  } catch (e) {
    next(e) // ← 传给错误中间件
  }
})`,
                codeLanguage: 'js',
              },
              {
                title: 'RESTful API 设计要点',
                content: '资源用名词复数（/users），方法用 HTTP 动词；URL 表达"是什么"，方法表达"做什么"；幂等性：GET/PUT/DELETE 幂等，POST/PATCH 不幂等；安全性：GET/HEAD/OPTIONS 安全；版本化（/v1/users）；分页过滤排序用 query string；嵌套资源表达从属（/users/:id/posts）。',
                code: `# RESTful API 示例
GET    /api/v1/users          # 列表
POST   /api/v1/users          # 创建
GET    /api/v1/users/:id      # 详情
PUT    /api/v1/users/:id      # 整体更新
PATCH  /api/v1/users/:id      # 部分更新
DELETE /api/v1/users/:id      # 删除
GET    /api/v1/users/:id/posts # 嵌套资源`,
                codeLanguage: 'bash',
              },
              {
                title: 'HTTP 状态码分类',
                content: '1xx 信息（很少用）；2xx 成功（200 OK / 201 Created / 204 No Content）；3xx 重定向（301 永久 / 302 临时 / 304 协商缓存命中）；4xx 客户端错误（400 参数错 / 401 未登录 / 403 无权限 / 404 不存在 / 429 限流）；5xx 服务端错误（500 内部错误 / 502 网关错误 / 503 不可用 / 504 超时）。',
                code: `// 服务端统一错误处理
function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message })
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: '未登录' })
  }
  res.status(500).json({ error: '服务器内部错误' })
}`,
                codeLanguage: 'js',
              },
            ],
          },
        },
      ],
    },

    // 知识点 12：Node.js 全栈小测验
    {
      order: 12,
      title: 'Node.js 全栈小测验',
      difficulty: 2,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'nf-p12-1',
          type: 'paragraph',
          lead: true,
          text: '通过 6 道精选题目检验模块十七的核心知识点掌握情况，涵盖事件循环、模块系统、异步 IO、中间件、RESTful 设计、HTTP 状态码。每题附详细解析，错题建议回顾对应知识点。',
        },
        {
          id: 'nf-p12-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '在 Node.js 事件循环中，process.nextTick 与 Promise.then 的优先级关系是？',
                options: [
                  'Promise.then 优先于 process.nextTick',
                  'process.nextTick 优先于 Promise.then',
                  '两者优先级相同，按注册顺序执行',
                  '取决于事件循环当前阶段',
                ],
                correctIndex: 1,
                explanation: 'process.nextTick 优先级高于 Promise.then。每个阶段切换前会先清空 nextTick 队列，再清空 Promise 微任务队列。递归调用 process.nextTick 会阻塞事件循环。',
              },
              {
                question: '关于 CommonJS 与 ESM 的循环依赖处理，下列说法正确的是？',
                options: [
                  'CommonJS 返回完整模块对象',
                  'ESM 返回执行快照，可能为 {}',
                  'CommonJS 返回已执行部分的快照，ESM 通过活绑定引用最终值',
                  '两者处理方式完全相同',
                ],
                correctIndex: 2,
                explanation: 'CommonJS 在循环依赖时返回已执行部分的快照（可能为空对象 {}），易出现"部分导出"问题；ESM 通过"活绑定"（live binding）引用，能拿到最终值，但执行顺序仍需谨慎。',
              },
              {
                question: '在 Express Web 服务中，以下哪种 fs API 用法是合适的？',
                options: [
                  'fs.readFileSync 读取配置文件（每次请求）',
                  'fs.readFile 配合回调处理用户上传',
                  'fs.promises.readFile 配合 async/await',
                  'fs.readFileSync 在路由处理器中读取文件',
                ],
                correctIndex: 2,
                explanation: 'Web 服务中绝对避免同步 API（会阻塞所有请求）。新项目优先 fs.promises + async/await，需要并发可用 Promise.all。readFileSync 仅适合启动期一次性加载配置。',
              },
              {
                question: 'Express 错误处理中间件与其他中间件的关键区别是？',
                options: [
                  '必须用 app.use 注册',
                  '必须放在所有中间件之前',
                  '函数签名有 4 个参数 (err, req, res, next)',
                  '不需要调用 next()',
                ],
                correctIndex: 2,
                explanation: 'Express 通过参数数量识别错误处理中间件：必须 4 个参数 (err, req, res, next)。它必须放在所有中间件之后，通过 next(err) 触发。Express 不会自动捕获异步错误，需 asyncHandler 包装。',
              },
              {
                question: '以下哪个 HTTP 方法是"幂等但不安全"的？',
                options: ['GET', 'POST', 'PUT', 'PATCH'],
                correctIndex: 2,
                explanation: 'PUT 是幂等的（重复执行结果相同）但不安全（会改变服务端状态）。GET 既幂等又安全；POST 既不幂等也不安全；PATCH 不幂等（部分更新，每次可能产生不同结果）也不安全。',
              },
              {
                question: 'RESTful API 中，创建用户成功后应返回哪个状态码？',
                options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
                correctIndex: 1,
                explanation: '201 Created 表示资源创建成功，应在 Location 响应头中返回新资源的 URL（如 Location: /api/users/42）。200 OK 用于通用成功；204 用于无响应体的成功（如 DELETE）；202 表示异步任务已接受。',
              },
            ],
          },
        },
      ],
    },
  ],
}
