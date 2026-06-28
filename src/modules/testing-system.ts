/**
 * 模块 18：前端测试体系
 *
 * 严格遵循 docx/模块十八.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 12 个知识点（对应 12 个可视化演示，含小测验）
 * - 5 个新增前端测试专属组件（位于 components/interactive/testing/）
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard
 * - 跨模块复用模块十六：HttpRequestResponseFlow（E2E 测试视角）
 * - 跨模块复用模块十七：ExpressMiddlewareFlow（中间件测试视角）
 *
 * 章节映射：
 * - 章节1 测试分类与策略：#1 知识图谱 / #2 测试金字塔
 * - 章节2 单元测试（Jest/Vitest）：#3 匹配器参考 / #4 Mock 三种范式
 * - 章节3 组件测试（Testing Library）：#5 查询优先级 / #6 render-act-assert
 * - 章节4 E2E 测试（Playwright）：#7 Playwright vs Cypress / #8 E2E 执行流 / #9 HTTP 测试流（测试视角） / #10 中间件测试流
 * - 章节5 速查与测验：#11 知识点速查 / #12 测试小测验
 *
 * 所有交互均为教学模拟，不实际执行测试代码。
 */
import type { ModuleMeta } from '../lib/types'

export const testingSystemModule: ModuleMeta = {
  number: '18',
  title: '前端测试体系',
  slug: 'testing-system',
  stage: 'engineering',
  stageLabel: '工程化全栈 · 第 4 模块',
  icon: '18',
  summary:
    '测试金字塔（单元/集成/E2E）、Vitest 匹配器、Mock 三种范式、Testing Library 查询优先级、Playwright E2E 执行流，跨模块复用 HTTP/中间件测试视角。',
  knowledgePointCount: 12,
  visualizationCount: 12,
  points: [
    // ========================================================================
    // 章节 1 · 测试分类与策略
    // ========================================================================

    // 知识点 1：前端测试总览知识图谱
    {
      order: 1,
      title: '前端测试总览',
      difficulty: 1,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ts-p1-1',
          type: 'paragraph',
          lead: true,
          text: '前端测试是质量保障的最后防线。它从"功能实现"跃迁到"质量保障"——在模块一至十七建立的开发与服务端能力之上，向测试金字塔、Mock 模拟、组件测试、E2E 测试纵深推进，形成「实现 → 测试验证」的完整闭环。',
        },
        {
          id: 'ts-p1-2',
          type: 'paragraph',
          text: '本模块复用模块十六的 HTTP 请求响应流与模块十七的 Express 中间件流，切换为测试视角，让「客户端发起 → 服务端响应 → 测试断言」三个角色同框。下面是模块十八的知识图谱，6 大主题串联起前端测试的核心能力。',
        },
        {
          id: 'ts-p1-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'testing', label: '前端测试', group: 'core', weight: 3 },
              { id: 'pyramid', label: '测试金字塔', group: 'strategy', weight: 2 },
              { id: 'unit', label: '单元测试（Vitest）', group: 'unit' },
              { id: 'mock', label: 'Mock 模拟', group: 'unit' },
              { id: 'component', label: '组件测试（TL）', group: 'component', weight: 2 },
              { id: 'e2e', label: 'E2E 测试（Playwright）', group: 'e2e', weight: 2 },
              { id: 'coverage', label: '测试覆盖率', group: 'coverage' },
            ],
            edges: [
              { source: 'testing', target: 'pyramid', label: '总纲' },
              { source: 'pyramid', target: 'unit', label: '大量' },
              { source: 'pyramid', target: 'component', label: '适量' },
              { source: 'pyramid', target: 'e2e', label: '少量' },
              { source: 'unit', target: 'mock', label: '隔离依赖' },
              { source: 'unit', target: 'coverage', label: '量化' },
              { source: 'component', target: 'coverage', label: '量化' },
            ],
          },
        },
        {
          id: 'ts-p1-4',
          type: 'callout',
          variant: 'tip',
          title: '学习路径',
          text: '建议按"测试金字塔 → 单元测试（匹配器/Mock）→ 组件测试（查询优先级）→ E2E 测试"顺序学习。金字塔是总纲，Mock 是单元测试核心，查询优先级是组件测试核心，Playwright 是 E2E 主流工具。',
        },
      ],
    },

    // 知识点 2：测试金字塔
    {
      order: 2,
      title: '测试金字塔模型',
      difficulty: 2,
      visualizationType: 'test-pyramid-visualizer',
      blocks: [
        {
          id: 'ts-p2-1',
          type: 'paragraph',
          lead: true,
          text: '测试金字塔是测试体系的总纲：单元测试多、E2E 测试少。E2E 慢且不稳定，单元测试快且可靠——按金字塔比例分配测试投入，能用单元测试覆盖的就别用 E2E。',
        },
        {
          id: 'ts-p2-2',
          type: 'paragraph',
          text: '金字塔三层从下到上分别是：单元测试（大量，验证函数/组件）、集成测试（适量，验证模块协作）、E2E 测试（少量，验证用户路径）。点击下方金字塔的每一层，查看占比、速度、稳定性和推荐工具。',
        },
        {
          id: 'ts-p2-3',
          type: 'demo',
          visualizationType: 'test-pyramid-visualizer',
          data: {},
        },
        {
          id: 'ts-p2-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 重点',
          text: '测试金字塔原则——单元测试多、E2E 测试少。E2E 测试慢且不稳定，单元测试快且可靠。实际比例因项目而异，但"金字塔形状"的原则不变。',
        },
      ],
    },

    // ========================================================================
    // 章节 2 · 单元测试（Jest/Vitest）
    // ========================================================================

    // 知识点 3：Vitest 匹配器参考
    {
      order: 3,
      title: 'Vitest 匹配器参考',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p3-1',
          type: 'paragraph',
          lead: true,
          text: '匹配器（Matcher）是断言的核心：expect(value).matcher(expected)。Vitest/Jest 提供丰富的匹配器，覆盖值相等、真假、调用、异常等场景。掌握常用匹配器是写好单元测试的基础。',
        },
        {
          id: 'ts-p3-2',
          type: 'paragraph',
          text: '下表列出最常用的匹配器：toBe 用于原始类型严格相等，toEqual 用于对象/数组深度相等，toBeTruthy/toBeFalsy 验证真假，toHaveBeenCalled 验证函数调用，toThrow 验证异常抛出。',
        },
        {
          id: 'ts-p3-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '匹配器',
            columns: ['语义', '示例', '备注'],
            rows: [
              {
                feature: 'toBe',
                values: ['严格相等（===）', 'expect(1+1).toBe(2)', '原始类型'],
              },
              {
                feature: 'toEqual',
                values: ['深度相等', 'expect({a:1}).toEqual({a:1})', '对象/数组'],
              },
              {
                feature: 'toBeCloseTo',
                values: ['浮点近似', 'expect(0.1+0.2).toBeCloseTo(0.3)', '避免浮点误差'],
              },
              {
                feature: 'toBeTruthy',
                values: ['真值', 'expect("x").toBeTruthy()', '非 null/0/""/undefined'],
              },
              {
                feature: 'toBeFalsy',
                values: ['假值', 'expect(0).toBeFalsy()', 'null/0/""/undefined'],
              },
              {
                feature: 'toContain',
                values: ['包含', 'expect([1,2]).toContain(1)', '数组/字符串'],
              },
              {
                feature: 'toMatch',
                values: ['正则匹配', 'expect("hi").toMatch(/^h/)', '正则表达式'],
              },
              {
                feature: 'toThrow',
                values: ['抛异常', 'expect(fn).toThrow("err")', '可选匹配异常消息'],
              },
              {
                feature: 'toHaveBeenCalled',
                values: ['被调用', 'expect(mock).toHaveBeenCalled()', '配合 vi.fn()'],
              },
              {
                feature: 'toHaveBeenCalledTimes',
                values: ['调用次数', 'expect(mock).toHaveBeenCalledTimes(2)', '精确次数'],
              },
              {
                feature: 'toHaveBeenCalledWith',
                values: ['调用参数', 'expect(mock).toHaveBeenCalledWith("x")', '匹配调用记录'],
              },
              {
                feature: 'resolves',
                values: ['Promise 成功', 'await expect(p).resolves.toBe(1)', '需 await'],
              },
            ],
            highlightColumn: 2,
          },
        },
        {
          id: 'ts-p3-4',
          type: 'callout',
          variant: 'tip',
          title: 'Vitest vs Jest',
          text: 'Vitest 是 Vite 生态的测试框架，API 与 Jest 兼容，但启动更快、HMR 支持更好。新项目（Vite 技术栈）优先 Vitest；老项目（Webpack）可用 Jest。两者匹配器 API 几乎一致，迁移成本低。',
        },
      ],
    },

    // 知识点 4：Mock 三种范式
    {
      order: 4,
      title: 'Mock 三种范式',
      difficulty: 3,
      visualizationType: 'mock-flow-visualizer',
      blocks: [
        {
          id: 'ts-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Mock 是单元测试的核心：用可控的"假实现"替换"真依赖"，让被测代码在隔离环境下运行。Mock 的本质是「替换 + 验证」——替换外部依赖（API/数据库/定时器），验证调用情况（次数/参数/返回值）。',
        },
        {
          id: 'ts-p4-2',
          type: 'paragraph',
          text: 'Vitest 提供三种 Mock 范式：vi.fn() 替换单个函数、vi.mock() 替换整个模块、vi.useFakeTimers() 控制定时器时间流转。点击下方 Tab 切换范式，查看替换目标、调用验证链与代码示例。',
        },
        {
          id: 'ts-p4-3',
          type: 'demo',
          visualizationType: 'mock-flow-visualizer',
          data: {},
        },
        {
          id: 'ts-p4-4',
          type: 'callout',
          variant: 'warning',
          title: 'Mock 反模式',
          text: '不要 Mock 被测代码本身（要测它就该用真实实现）；不要过度 Mock（让测试失去意义）；不要 Mock 实现细节（应 Mock 公共接口）。Mock 的目标是「隔离外部依赖」，不是「让测试通过」。',
        },
      ],
    },

    // ========================================================================
    // 章节 3 · 组件测试（Testing Library）
    // ========================================================================

    // 知识点 5：Testing Library 查询优先级
    {
      order: 5,
      title: 'Testing Library 查询优先级',
      difficulty: 3,
      visualizationType: 'testing-library-query-priority',
      blocks: [
        {
          id: 'ts-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Testing Library 的核心原则：「以用户感知的方式查询元素」。用户用屏幕阅读器看角色（Role）、看文本（Text），看不到 TestId。所以查询优先级是 Role > LabelText > Text > ... > TestId。',
        },
        {
          id: 'ts-p5-2',
          type: 'paragraph',
          text: '点击下方阶梯中的每个查询方法，查看优先级、示例与适用场景。推荐方法（绿色）应优先使用，备选方法（黄色）次之，最后手段（粉色 TestId）仅在无其他方式时使用。',
        },
        {
          id: 'ts-p5-3',
          type: 'demo',
          visualizationType: 'testing-library-query-priority',
          data: {},
        },
        {
          id: 'ts-p5-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 重点',
          text: '查询优先级是 Testing Library 的核心原则：getByRole > getByLabelText > getByText > getByDisplayValue > getByAltText > getByTitle > getByTestId。优先用「用户视角」查询，最后才用 TestId。',
        },
      ],
    },

    // 知识点 6：render-act-assert 三阶段
    {
      order: 6,
      title: '组件测试 render-act-assert',
      difficulty: 3,
      visualizationType: 'component-test-playground',
      blocks: [
        {
          id: 'ts-p6-1',
          type: 'paragraph',
          lead: true,
          text: '组件测试遵循三段式：render（渲染组件）→ act（触发交互）→ assert（断言结果）。每个测试用例都遵循这个流程，act() 确保 React 完成所有状态更新后再断言，避免「断言时还未渲染」的 flaky 测试。',
        },
        {
          id: 'ts-p6-2',
          type: 'paragraph',
          text: '点击下方"运行测试"按钮，观察 Counter 组件测试的三阶段动画推进：1️⃣ render 挂载组件 → 2️⃣ act 触发点击 → 3️⃣ assert 断言递增结果。每个阶段都展示对应代码片段与运行结果。',
        },
        {
          id: 'ts-p6-3',
          type: 'demo',
          visualizationType: 'component-test-playground',
          data: {},
        },
        {
          id: 'ts-p6-4',
          type: 'callout',
          variant: 'tip',
          title: 'act() 的作用',
          text: 'act() 是 React 测试工具提供的「批处理」函数，确保所有状态更新、副作用、重渲染完成后再继续。fireEvent/userEvent 内部已自动包裹 act()，手动更新状态时需用 await act(async () => {...})。',
        },
      ],
    },

    // ========================================================================
    // 章节 4 · E2E 测试（Playwright）
    // ========================================================================

    // 知识点 7：Playwright vs Cypress
    {
      order: 7,
      title: 'Playwright vs Cypress',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ts-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Playwright 与 Cypress 是两大主流 E2E 框架。Playwright 由微软开发，支持多浏览器并行；Cypress 由社区驱动，调试体验好但仅支持 Chromium。下表从 6 个维度对比两者。',
        },
        {
          id: 'ts-p7-2',
          type: 'paragraph',
          text: '选型建议：新项目优先 Playwright（多浏览器、并行、生态好）；旧项目已用 Cypress 可继续用。两者都支持 auto-wait、时间旅行调试、录制回放。',
        },
        {
          id: 'ts-p7-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['Playwright', 'Cypress', '胜出'],
            rows: [
              {
                feature: '浏览器支持',
                values: ['Chromium/Firefox/WebKit', '仅 Chromium', 'Playwright'],
              },
              {
                feature: '并行执行',
                values: ['原生支持（多 worker）', '需付费 Dashboard', 'Playwright'],
              },
              {
                feature: '调试体验',
                values: ['Trace Viewer / UI Mode', '时间旅行 / 截图', 'Cypress'],
              },
              {
                feature: '多 Tab / 多 Origin',
                values: ['原生支持', '不支持', 'Playwright'],
              },
              {
                feature: '生态与社区',
                values: ['微软维护，活跃', '社区活跃，付费增值', '平局'],
              },
              {
                feature: '学习曲线',
                values: ['API 直观', 'GUI 友好', 'Cypress'],
              },
              {
                feature: '语言支持',
                values: ['JS/TS/Python/Java/.NET', 'JS/TS', 'Playwright'],
              },
              {
                feature: '录制回放',
                values: ['codegen 命令', 'Cypress Studio（付费）', 'Playwright'],
              },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'ts-p7-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 重点',
          text: 'Playwright vs Cypress 是面试高频考点。核心差异：Playwright 多浏览器+原生并行+多 Tab；Cypress 调试体验好+GUI 友好。新项目优先 Playwright，旧项目可继续用 Cypress。',
        },
      ],
    },

    // 知识点 8：E2E 执行流
    {
      order: 8,
      title: 'Playwright E2E 执行流',
      difficulty: 3,
      visualizationType: 'e2e-test-flow-visualizer',
      blocks: [
        {
          id: 'ts-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Playwright E2E 测试的核心是「步骤序列 + 断言点」。以登录流程为例：goto 访问页面 → fill 填写表单 → click 点击按钮 → wait 等待跳转 → assert 断言结果。每个动作都有 auto-wait 自动等待。',
        },
        {
          id: 'ts-p8-2',
          type: 'paragraph',
          text: '点击下方"执行 E2E"按钮，观察登录流程的 7 步穿透动画：1 访问 → 2-3 填写 → 4 点击 → 5 等待 → 6-7 断言。断言点（绿色）会在执行时高亮，表示验证关键节点的时机。',
        },
        {
          id: 'ts-p8-3',
          type: 'demo',
          visualizationType: 'e2e-test-flow-visualizer',
          data: {},
        },
        {
          id: 'ts-p8-4',
          type: 'callout',
          variant: 'tip',
          title: 'auto-wait 自动等待',
          text: 'Playwright 默认开启 auto-wait：每个动作前自动等待元素可交互（可见、可点击、稳定），无需手动 waitFor。断言会自动重试直到超时（默认 5s），大幅减少 flaky 测试。',
        },
      ],
    },

    // 知识点 9：E2E HTTP 测试流（跨模块复用）
    {
      order: 9,
      title: 'E2E HTTP 测试流（测试视角）',
      difficulty: 3,
      visualizationType: 'http-request-response-flow',
      blocks: [
        {
          id: 'ts-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'E2E 测试本质上是「模拟客户端发起 HTTP 请求 → 服务端响应 → 测试断言」的流程。这里跨模块复用模块十六的 HTTP 请求响应流组件，切换为「测试视角」——请求由 Playwright 发起，响应被测试断言验证。',
        },
        {
          id: 'ts-p9-2',
          type: 'paragraph',
          text: 'E2E 测试覆盖完整的 HTTP 请求生命周期：测试代码触发页面操作 → 浏览器发起请求 → 服务端处理 → 响应返回 → 浏览器渲染 → 测试断言 DOM。这是「端到端」三字的含义——从客户端到服务端的完整链路。',
        },
        {
          id: 'ts-p9-3',
          type: 'demo',
          visualizationType: 'http-request-response-flow',
          data: {
            stages: [
              {
                id: 'test-trigger',
                title: '① 测试触发',
                description: 'Playwright 触发用户操作（如 click）',
                detail: 'await page.click("button#submit") → 浏览器接收事件',
                color: '#f59e0b',
              },
              {
                id: 'http-request',
                title: '② HTTP 请求',
                description: '浏览器发起 HTTP 请求',
                detail: 'POST /api/login { user, pwd } → 含 Cookie/Headers',
                color: '#1a6cff',
              },
              {
                id: 'server-process',
                title: '③ 服务端处理',
                description: 'Express 中间件链处理请求',
                detail: 'json 解析 → 鉴权 → 路由 → 控制器 → 响应',
                color: '#a78bfa',
              },
              {
                id: 'http-response',
                title: '④ HTTP 响应',
                description: '服务端返回响应',
                detail: '200 OK { token, user } → Set-Cookie',
                color: '#07c160',
              },
              {
                id: 'browser-render',
                title: '⑤ 浏览器渲染',
                description: '浏览器接收响应并渲染',
                detail: 'JS 处理响应 → 更新 DOM → 路由跳转',
                color: '#ec4899',
              },
              {
                id: 'test-assert',
                title: '⑥ 测试断言',
                description: 'Playwright 断言 DOM 状态',
                detail: 'await expect(page).toHaveURL("/dashboard")',
                color: '#f59e0b',
              },
            ],
            note: 'E2E 测试覆盖完整 HTTP 链路：从 Playwright 触发操作到断言 DOM，是「端到端」的字面含义。每个环节失败都会导致测试失败，是质量保障的最后一道防线。',
          },
        },
        {
          id: 'ts-p9-4',
          type: 'callout',
          variant: 'tip',
          title: '跨模块复用',
          text: '本组件复用模块十六的 HttpRequestResponseFlow，切换为「测试视角」。模块十六讲解 HTTP 客户端视角，模块十八从测试视角验证整个链路，形成「实现 → 测试」闭环。',
        },
      ],
    },

    // 知识点 10：中间件测试流（跨模块复用）
    {
      order: 10,
      title: '中间件测试流（测试视角）',
      difficulty: 3,
      visualizationType: 'express-middleware-flow',
      blocks: [
        {
          id: 'ts-p10-1',
          type: 'paragraph',
          lead: true,
          text: '服务端测试常需验证中间件链的调用顺序与行为。这里跨模块复用模块十七的 Express 中间件流组件，切换为「测试视角」——测试请求穿透中间件链，断言每个中间件的调用情况。',
        },
        {
          id: 'ts-p10-2',
          type: 'paragraph',
          text: '中间件测试的核心：验证请求依次穿过 express.json → logger → auth → routeHandler，错误时跳转到 errorHandler。可用 supertest 发起测试请求，断言 res.status / res.body / 中间件 mock 调用次数。',
        },
        {
          id: 'ts-p10-3',
          type: 'demo',
          visualizationType: 'express-middleware-flow',
          data: {
            middlewares: [
              {
                id: 'json-parser',
                name: 'express.json()',
                description: '解析 JSON 请求体，测试视角：验证 POST 请求体被正确解析到 req.body。',
                code: 'app.use(express.json()) // 测试断言：req.body 有正确字段',
                color: '#1a6cff',
              },
              {
                id: 'logger',
                name: 'logger',
                description: '记录请求日志，测试视角：可 Mock logger 验证调用次数与参数。',
                code: 'app.use((req, res, next) => { log(req); next() })',
                color: '#a78bfa',
              },
              {
                id: 'auth',
                name: 'authMiddleware',
                description: '鉴权中间件，测试视角：测试未登录返回 401，已登录放行。',
                code: 'if (!req.headers.authorization) return res.status(401).end()',
                color: '#f59e0b',
              },
              {
                id: 'route',
                name: 'routeHandler',
                description: '路由处理器，测试视角：断言 res.status 与 res.body 的正确性。',
                code: 'res.json({ code: 0, data: { ... } })',
                color: '#07c160',
              },
              {
                id: 'error',
                name: 'errorHandler',
                description: '错误中间件（4 参数），测试视角：触发 next(err) 验证错误响应。',
                code: 'app.use((err, req, res, next) => res.status(500).json({ err }) )',
                isErrorHandler: true,
                color: '#ec4899',
              },
            ],
            onionModelNote: '测试视角下的中间件链：用 supertest 发起请求，断言中间件调用顺序与响应结果。错误中间件通过 next(err) 触发，需单独测试。',
          },
        },
        {
          id: 'ts-p10-4',
          type: 'callout',
          variant: 'tip',
          title: '跨模块复用',
          text: '本组件复用模块十七的 ExpressMiddlewareFlow，切换为「测试视角」。模块十七讲解中间件实现，模块十八从测试视角验证调用链，形成「实现 → 测试」闭环。',
        },
      ],
    },

    // ========================================================================
    // 章节 5 · 速查与测验
    // ========================================================================

    // 知识点 11：知识点速查（Accordion）
    {
      order: 11,
      title: '测试知识点速查',
      difficulty: 2,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ts-p11-1',
          type: 'paragraph',
          lead: true,
          text: '将模块十八的核心知识点按主题分类速查：单元测试、组件测试、E2E 测试、Mock 模拟、测试覆盖率五大类。点击每个条目展开查看关键要点与代码片段。',
        },
        {
          id: 'ts-p11-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                id: 'unit-test',
                title: '单元测试（Vitest/Jest）',
                content:
                  '单元测试是最底层测试，验证函数/方法的输入输出。Vitest API 与 Jest 兼容，启动快、HMR 好。核心 API：test/it 定义用例，expect 断言，beforeEach/afterEach 钩子。匹配器：toBe/toEqual/toBeTruthy/toThrow/toHaveBeenCalled。',
                code: `import { test, expect, vi } from 'vitest'

test('add 应该正确相加', () => {
  expect(add(1, 2)).toBe(3)
  expect(add(-1, 1)).toEqual(0)
})

test('divide 抛出除零错误', () => {
  expect(() => divide(1, 0)).toThrow('除零')
})`,
                codeLanguage: 'ts',
              },
              {
                id: 'component-test',
                title: '组件测试（Testing Library）',
                content:
                  '组件测试以「用户视角」验证 UI 行为。render 渲染组件，screen 查询 DOM，fireEvent/userEvent 触发交互，expect 断言。查询优先级：getByRole > getByLabelText > getByText > ... > getByTestId（最后手段）。',
                code: `import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Counter 递增', async () => {
  const user = userEvent.setup()
  render(<Counter />)
  await user.click(screen.getByRole('button', { name: /递增/i }))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})`,
                codeLanguage: 'tsx',
              },
              {
                id: 'e2e-test',
                title: 'E2E 测试（Playwright）',
                content:
                  'E2E 测试模拟真实用户操作流程，覆盖关键路径。Playwright 原生支持多浏览器、并行执行、auto-wait、Trace Viewer。核心 API：page.goto/fill/click，expect 断言。测试场景：登录、CRUD、支付等关键业务流程。',
                code: `import { test, expect } from '@playwright/test'

test('用户登录流程', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[name="user"]', 'alice')
  await page.fill('input[name="pwd"]', 'pass')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toHaveText(/欢迎/)
})`,
                codeLanguage: 'ts',
              },
              {
                id: 'mock',
                title: 'Mock 模拟（vi.fn/vi.mock/vi.useFakeTimers）',
                content:
                  'Mock 用可控的"假实现"替换"真依赖"。vi.fn() 替换单个函数并记录调用；vi.mock() 替换整个模块的导出；vi.useFakeTimers() 控制定时器时间流转。断言：toHaveBeenCalled/toHaveBeenCalledWith。',
                code: `// 函数 Mock
const mockFn = vi.fn()
mockFn('a')
expect(mockFn).toHaveBeenCalledWith('a')

// 模块 Mock
vi.mock('@/api/user', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1 })
}))

// 定时器 Mock
vi.useFakeTimers()
scheduleLater(1000)
vi.advanceTimersByTime(1000)
expect(cb).toHaveBeenCalled()`,
                codeLanguage: 'ts',
              },
              {
                id: 'coverage',
                title: '测试覆盖率（c8/istanbul）',
                content:
                  '覆盖率量化测试覆盖程度，是 CI 卡点的关键指标。四种覆盖率：行覆盖、分支覆盖、函数覆盖、语句覆盖。V8 项目用 c8（基于 V8 原生），其他用 istanbul。目标：核心逻辑 ≥ 80%，关键路径 100%。注意：高覆盖率不等于高质量，需配合有效断言。',
                code: `# vitest.config.ts 配置覆盖率
export default {
  test: {
    coverage: {
      provider: 'v8', // 或 'istanbul'
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        branches: 75,
        functions: 80,
        statements: 80,
      },
    },
  },
}`,
                codeLanguage: 'ts',
              },
            ],
          },
        },
      ],
    },

    // 知识点 12：测试小测验（QuizCard）
    {
      order: 12,
      title: '前端测试小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'ts-p12-1',
          type: 'paragraph',
          lead: true,
          text: '通过 6 道面试高频题检验模块十八的学习成果。涵盖测试金字塔、Mock 范式、查询优先级、Playwright 特性、E2E 视角、覆盖率指标等核心知识点。',
        },
        {
          id: 'ts-p12-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            title: '前端测试小测验',
            questions: [
              {
                question: '测试金字塔原则的核心是什么？',
                options: [
                  'E2E 测试应该最多',
                  '单元测试应该最多，E2E 最少',
                  '集成测试应该最多',
                  '三种测试数量相等',
                ],
                correctIndex: 1,
                explanation: '测试金字塔原则：单元测试多（快、稳定）、E2E 测试少（慢、不稳定）、集成测试适量。原因是 E2E 慢且 flaky，单元测试快且可靠，按金字塔比例分配投入。',
              },
              {
                question: 'Vitest 中 vi.mock() 与 vi.fn() 的核心区别是？',
                options: [
                  'vi.fn 替换模块，vi.mock 替换函数',
                  'vi.fn 替换单个函数，vi.mock 替换整个模块导出',
                  '两者功能完全相同',
                  'vi.mock 仅用于定时器',
                ],
                correctIndex: 1,
                explanation: 'vi.fn() 创建 Mock 函数（替换单个函数并记录调用）；vi.mock() 替换整个模块的导出（隔离外部依赖如 API/数据库）。vi.useFakeTimers() 则控制定时器时间。',
              },
              {
                question: 'Testing Library 推荐的查询优先级最高的是？',
                options: ['getByTestId', 'getByText', 'getByRole', 'getByTitle'],
                correctIndex: 2,
                explanation: '查询优先级：getByRole > getByLabelText > getByText > getByDisplayValue > getByAltText > getByTitle > getByTestId。getByRole 最优先因为反映用户/辅助技术感知，TestId 是最后手段。',
              },
              {
                question: 'Playwright 相比 Cypress 的核心优势是？',
                options: [
                  '仅支持 Chromium，更稳定',
                  '原生支持多浏览器（Chromium/Firefox/WebKit）与并行执行',
                  '调试体验更好',
                  '学习曲线更平缓',
                ],
                correctIndex: 1,
                explanation: 'Playwright 核心优势：原生支持多浏览器（Chromium/Firefox/WebKit）+ 原生并行执行（多 worker）+ 多 Tab/多 Origin。Cypress 仅支持 Chromium，并行需付费 Dashboard。',
              },
              {
                question: '组件测试中的 act() 的作用是？',
                options: [
                  '记录测试执行时间',
                  '确保 React 完成所有状态更新与重渲染后再继续',
                  '模拟用户交互',
                  '断言 DOM 元素存在'
                ],
                correctIndex: 1,
                explanation: 'act() 是 React 测试工具的「批处理」函数，确保状态更新、副作用、重渲染完成后再断言。fireEvent/userEvent 内部已自动包裹 act()，避免「断言时还未渲染」的 flaky 测试。',
              },
              {
                question: '测试覆盖率 100% 意味着？',
                options: [
                  '代码完全没有 bug',
                  '所有代码行/分支/函数/语句都被执行到',
                  '测试质量很高',
                  '无需再做 E2E 测试'
                ],
                correctIndex: 1,
                explanation: '覆盖率 100% 仅表示所有代码行/分支/函数/语句被测试执行到，不等于「无 bug」或「测试质量高」。可能存在断言无效、边界未覆盖等问题。覆盖率是必要条件，非充分条件。',
              },
            ],
          },
        },
      ],
    },
  ],
}
