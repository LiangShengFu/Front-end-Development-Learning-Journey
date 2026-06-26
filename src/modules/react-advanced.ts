/**
 * 模块 09：React 进阶与生态体系
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块九.md 设计文档：
 * - 18 个知识点（17 章节 + 1 小测验）
 * - 15 个可视化演示（6 个新增进阶组件 + 4 个复用模块八组件 + 5 个复用核心组件）
 *
 * 适配到项目现有 React+TS+Vite 架构，使用 ModuleMeta 数据驱动：
 * - KP1 React 18 并发模式总览（KnowledgeGraph 知识图谱）
 * - KP2 Fiber 架构原理（FiberWorkLoopSimulator 工作循环模拟器）
 * - KP3 自动批处理（Timeline 自动批处理演进）
 * - KP4 useTransition / useDeferredValue（TransitionVsSyncDemo 对比演示）
 * - KP5 Suspense 与数据获取（SuspenseBoundaryDemo 嵌套边界）
 * - KP9 Zustand / Jotai / Recoil（CompareTable 状态管理库对比）
 * - KP10 React.memo 性能优化（MemoEffectComparator 效果对比器）
 * - KP11 代码分割与懒加载（VirtualListSimulator 虚拟列表模拟器）
 * - KP14 StrictMode 与副作用检测（CodeStepper 双调用检测）
 * - KP17 React 生态对比（ArchitectureDiagram 生态全景）
 * - KP18 React 进阶测验（QuizCard 10 题）
 *
 * 覆盖 Fiber 架构、Diff 算法、性能优化、高级 Hooks、状态管理选型、
 * 并发特性、Server Components、设计模式等 React 进阶核心知识体系。
 */
import type { ModuleMeta } from '../lib/types'

export const reactAdvancedModule: ModuleMeta = {
  number: '09',
  title: 'React 进阶与生态体系',
  slug: 'react-advanced',
  stage: 'react',
  stageLabel: 'React 技术栈 · 第 2 模块',
  icon: '⚛️',
  summary: '并发模式、Fiber、Suspense、状态管理库、性能优化、生态全景。',
  knowledgePointCount: 18,
  visualizationCount: 15,
  points: [
    // ========================================================================
    // 知识点 1：React 18 并发模式总览
    // ========================================================================
    {
      order: 1,
      title: 'React 18 并发模式总览',
      difficulty: 3,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ra-p1-1',
          type: 'paragraph',
          lead: true,
          text: 'React 18 引入并发渲染（Concurrent Rendering），核心是「可中断的渲染」。React 可以暂停、恢复甚至放弃一次渲染，让高优先级任务（如用户输入）优先响应。并发模式不是新 API，而是底层渲染机制的升级。',
        },
        {
          id: 'ra-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'concurrent', label: '并发模式', group: 'core', weight: 3 },
              { id: 'fiber', label: 'Fiber 架构', group: 'related', weight: 2 },
              { id: 'lane', label: 'Lane 优先级', group: 'related', weight: 2 },
              { id: 'transition', label: 'useTransition', group: 'related', weight: 2 },
              { id: 'deferred', label: 'useDeferredValue', group: 'related', weight: 2 },
              { id: 'suspense', label: 'Suspense', group: 'related', weight: 2 },
              { id: 'batching', label: '自动批处理', group: 'detail' },
              { id: 'streaming', label: '流式 SSR', group: 'detail' },
            ],
            edges: [
              { source: 'concurrent', target: 'fiber' },
              { source: 'concurrent', target: 'lane' },
              { source: 'concurrent', target: 'transition' },
              { source: 'concurrent', target: 'deferred' },
              { source: 'concurrent', target: 'suspense' },
              { source: 'concurrent', target: 'batching' },
              { source: 'concurrent', target: 'streaming' },
            ],
          },
        },
        {
          id: 'ra-p1-3',
          type: 'callout',
          variant: 'tip',
          title: '并发模式三大特征',
          text: '1. 可中断渲染：高优先级任务可打断低优先级工作。2. 优先级调度：SyncLane > DefaultLane > TransitionLane。3. 双缓冲机制：workInProgress 树与 current 树切换。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：Fiber 架构原理
    // ========================================================================
    {
      order: 2,
      title: 'Fiber 架构原理',
      difficulty: 4,
      visualizationType: 'fiber-work-loop-simulator',
      blocks: [
        {
          id: 'ra-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Fiber 是 React 16 引入的新调和算法架构。它将渲染工作拆分为多个可中断、可恢复的小任务（Fiber 节点），实现时间切片（Time Slicing）。每个 Fiber 节点是一个工作单元，包含组件类型、props、state、副作用标记等信息。',
        },
        {
          id: 'ra-p2-2',
          type: 'demo',
          visualizationType: 'fiber-work-loop-simulator',
          data: {
            scenarios: [
              {
                id: 'sync-blocking',
                label: '同步阻塞（React 15）',
                description: 'Stack Reconciler 递归同步渲染，一旦开始无法中断。长任务阻塞主线程导致卡顿。',
                tree: [
                  { id: 'app', label: 'App', type: 'root' },
                  { id: 'header', label: 'Header', type: 'comp' },
                  { id: 'list', label: 'List (1000 项)', type: 'comp' },
                  { id: 'footer', label: 'Footer', type: 'leaf' },
                ],
                lanes: [
                  { id: 't1', lane: 'Default', label: '初始渲染', steps: 4 },
                ],
              },
              {
                id: 'time-slice',
                label: '时间切片（Fiber）',
                description: 'Fiber 将渲染拆分为小任务，可被高优先级任务中断并恢复。',
                tree: [
                  { id: 'app', label: 'App', type: 'root' },
                  { id: 'header', label: 'Header', type: 'comp' },
                  { id: 'list', label: 'List (1000 项)', type: 'comp' },
                  { id: 'footer', label: 'Footer', type: 'leaf' },
                ],
                lanes: [
                  { id: 't1', lane: 'Transition', label: '列表过滤（低优先级）', steps: 4 },
                  { id: 't2', lane: 'Sync', label: '用户输入（高优先级）', steps: 1 },
                ],
                interruptions: [{ atNode: 'list', newTask: { id: 't2', lane: 'Sync', label: '用户输入中断', steps: 1 } }],
              },
            ],
          },
        },
        {
          id: 'ra-p2-3',
          type: 'code',
          language: 'javascript',
          filename: 'Fiber 节点结构与工作循环',
          code: `// Fiber 节点结构（简化）
{
  type: 'div',           // 元素类型
  key: null,             // key
  stateNode: DOM,        // 真实 DOM 引用
  child: Fiber | null,   // 第一个子节点
  sibling: Fiber | null, // 兄弟节点
  return: Fiber | null,  // 父节点
  pendingProps: {},      // 新 props
  memoizedProps: {},     // 旧 props
  memoizedState: {},     // 旧 state
  flags: Placement | Update | Deletion, // 副作用标记
}

// 工作循环（简化）
function workLoop() {
  while (nextUnitOfWork !== null && !shouldYield()) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // shouldYield() 检查当前帧是否还有时间（5ms 预算）
}`,
        },
        {
          id: 'ra-p2-4',
          type: 'callout',
          variant: 'info',
          title: 'Render 与 Commit 两阶段',
          text: 'Phase 1 Render（可中断）：构建 workInProgress Fiber 树、计算变更（Diff），可被高优先级任务打断。Phase 2 Commit（不可中断）：应用所有变更到 DOM、执行生命周期/hooks 副作用。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：自动批处理
    // ========================================================================
    {
      order: 3,
      title: '自动批处理（Automatic Batching）',
      difficulty: 3,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'ra-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'React 18 的自动批处理将多次状态更新合并为一次重渲染，无论更新发生在事件处理函数、Promise、setTimeout 还是原生事件中。React 17 仅在事件处理函数中批处理。',
        },
        {
          id: 'ra-p3-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: 'React 17', title: '仅事件处理函数批处理', description: 'onClick 内的多次 setState 合并为 1 次渲染；Promise/setTimeout 内的每次 setState 各触发 1 次渲染', status: 'done' },
              { time: 'React 18', title: '自动批处理（所有上下文）', description: 'Promise、setTimeout、原生事件中的多次 setState 也自动合并为 1 次渲染', status: 'done' },
              { time: 'escape hatch', title: 'flushSync 强制同步', description: 'import { flushSync } from "react-dom"; flushSync(() => setCount(c => c+1)) 强制立即更新', status: 'active' },
            ],
          },
        },
        {
          id: 'ra-p3-3',
          type: 'code',
          language: 'javascript',
          filename: '自动批处理示例',
          code: `// React 18：所有上下文自动批处理
function handleClick() {
  setCount(c => c + 1);     // 不触发渲染
  setFlag(f => !f);          // 不触发渲染
  // 合并为 1 次渲染 ✓
}

// Promise 中也批处理
fetch('/api').then(() => {
  setCount(c => c + 1);     // 不触发渲染
  setFlag(f => !f);          // 不触发渲染
  // 合并为 1 次渲染 ✓（React 17 会触发 2 次）
});

// 需要立即更新时使用 flushSync
import { flushSync } from 'react-dom';
flushSync(() => {
  setCount(c => c + 1); // 立即触发渲染
});`,
        },
      ],
    },

    // ========================================================================
    // 知识点 4：useTransition / useDeferredValue
    // ========================================================================
    {
      order: 4,
      title: 'useTransition / useDeferredValue',
      difficulty: 4,
      visualizationType: 'transition-vs-sync-demo',
      blocks: [
        {
          id: 'ra-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'useTransition 将状态更新标记为「非紧急」，让 React 优先处理用户输入等紧急更新。useDeferredValue 返回一个延迟更新的值，用于延迟昂贵的计算。两者都利用并发渲染实现「不阻塞用户输入」。',
        },
        {
          id: 'ra-p4-2',
          type: 'demo',
          visualizationType: 'transition-vs-sync-demo',
          data: { listSize: 10000 },
        },
        {
          id: 'ra-p4-3',
          type: 'code',
          language: 'javascript',
          filename: 'useTransition 与 useDeferredValue',
          code: `// useTransition：将更新标记为非紧急
import { useTransition, useState } from 'react';

function Search() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value); // 紧急：立即更新输入框
    startTransition(() => {
      // 非紧急：大列表过滤可被中断
      setResults(filterHugeList(e.target.value));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <List items={results} />
    </>
  );
}

// useDeferredValue：延迟某个值
import { useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => filterHugeList(deferredQuery), [deferredQuery]);
  // query 立即更新，deferredQuery 延迟更新 → results 延迟重算
  return <List items={results} />;
}`,
        },
        {
          id: 'ra-p4-4',
          type: 'callout',
          variant: 'tip',
          title: 'useTransition vs useDeferredValue',
          text: 'useTransition：在「触发更新」处控制优先级（startTransition 包裹 setState）。useDeferredValue：在「接收值」处控制优先级（延迟 prop 值）。两者效果类似，使用场景不同：前者适合同组件内，后者适合跨组件。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：Suspense 与数据获取
    // ========================================================================
    {
      order: 5,
      title: 'Suspense 与数据获取',
      difficulty: 4,
      visualizationType: 'suspense-boundary-demo',
      blocks: [
        {
          id: 'ra-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Suspense 让组件在等待异步数据时显示 fallback。React 18 支持服务端 Suspense（流式 SSR）和嵌套 Suspense 边界。与 React.lazy 配合实现代码分割的加载态，与数据获取库（React Query / Relay）配合实现声明式数据加载。',
        },
        {
          id: 'ra-p5-2',
          type: 'demo',
          visualizationType: 'suspense-boundary-demo',
          data: {
            scenarios: [
              { id: 'single', label: '单层 Suspense', delay: 1500, success: true, description: '基础用法：子组件 pending 时显示 fallback' },
              { id: 'nested', label: '嵌套 Suspense', delay: 2000, success: true, description: '嵌套边界：外层先加载完，内层独立加载' },
              { id: 'error', label: '错误边界', delay: 1000, success: false, description: '与 ErrorBoundary 配合处理加载失败' },
            ],
          },
        },
        {
          id: 'ra-p5-3',
          type: 'code',
          language: 'javascript',
          filename: 'Suspense 嵌套边界',
          code: `// 嵌套 Suspense：各部分独立加载
function Dashboard() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ChartSkeleton />}>
        <Chart /> {/* 慢加载 */}
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <Table /> {/* 慢加载 */}
      </Suspense>
    </Suspense>
  );
}

// 与 React.lazy 配合：代码分割
const LazyChart = React.lazy(() => import('./Chart'));
<Suspense fallback={<Spinner />}>
  <LazyChart />
</Suspense>`,
        },
      ],
    },

    // ========================================================================
    // 知识点 6：React Query / TanStack Query
    // ========================================================================
    {
      order: 6,
      title: 'React Query / TanStack Query',
      difficulty: 3,
      blocks: [
        {
          id: 'ra-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'React Query 是服务端状态管理库，自动处理缓存、去重、后台刷新、乐观更新。比手写 useEffect + useState 的数据获取更健壮，内置 loading/error/stale 状态管理。',
        },
        {
          id: 'ra-p6-2',
          type: 'code',
          language: 'javascript',
          filename: 'React Query 基础用法',
          code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 查询：自动缓存 + 后台刷新
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
  staleTime: 1000 * 60, // 1 分钟内不重新请求
  cacheTime: 1000 * 60 * 5, // 5 分钟后清理缓存
});

// 变更：乐观更新
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (newUser) => fetch('/api/users', { method: 'POST', body: JSON.stringify(newUser) }),
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ['users'] });
    const prev = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], (old) => [...old, newUser]);
    return { prev };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['users'], context.prev); // 回滚
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] }); // 重新请求
  },
});`,
        },
        {
          id: 'ra-p6-3',
          type: 'callout',
          variant: 'tip',
          title: 'React Query vs useEffect',
          text: 'useEffect 数据获取的痛点：无缓存（重复请求）、无去重（多组件同时请求同一数据）、无后台刷新、竞态条件需手写。React Query 全部自动处理，且与 Suspense 兼容。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：React Hook Form
    // ========================================================================
    {
      order: 7,
      title: 'React Hook Form',
      difficulty: 2,
      blocks: [
        {
          id: 'ra-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'React Hook Form 是高性能表单库，基于非受控组件（ref）实现，避免每次输入都触发重渲染。支持 schema 验证（Zod / Yup）、动态字段、表单数组。',
        },
        {
          id: 'ra-p7-2',
          type: 'code',
          language: 'javascript',
          filename: 'React Hook Form + Zod 验证',
          code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(8, '密码至少 8 位'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await api.login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      <button disabled={isSubmitting}>登录</button>
    </form>
  );
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 8：Redux Toolkit
    // ========================================================================
    {
      order: 8,
      title: 'Redux Toolkit',
      difficulty: 3,
      blocks: [
        {
          id: 'ra-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Redux Toolkit（RTK）是 Redux 官方推荐的方式，内置 createSlice（自动生成 actions/reducers）、createAsyncThunk（异步 action）、RTK Query（数据获取）。大幅减少 Redux 样板代码。',
        },
        {
          id: 'ra-p8-2',
          type: 'code',
          language: 'javascript',
          filename: 'Redux Toolkit createSlice',
          code: `import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

// 异步 thunk
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return await api.getUsers();
});

// Slice：自动生成 action types 和 reducers
const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    clearUsers: (state) => { state.data = []; }, // Immer 不可变更新
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// 配置 store
const store = configureStore({
  reducer: { users: usersSlice.reducer },
});`,
        },
        {
          id: 'ra-p8-3',
          type: 'callout',
          variant: 'info',
          title: 'RTK vs 原生 Redux',
          text: '原生 Redux 需手写 action types、action creators、reducers，样板代码多。RTK 的 createSlice 自动生成，Immer 内置不可变更新（可直接写 state.x = y），createAsyncThunk 简化异步。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Zustand / Jotai / Recoil
    // ========================================================================
    {
      order: 9,
      title: 'Zustand / Jotai / Recoil 状态管理库对比',
      difficulty: 3,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ra-p9-1',
          type: 'paragraph',
          lead: true,
          text: '现代 React 状态管理库各有特色：Zustand 极简（hooks 风格）、Jotai 原子化（细粒度）、Recoil（Facebook 出品，原子 + selector）。选型取决于状态粒度需求和团队偏好。',
        },
        {
          id: 'ra-p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['Zustand', 'Jotai', 'Recoil', 'Redux Toolkit'],
            highlightColumn: 0,
            rows: [
              { feature: '学习成本', values: ['极低', '低', '中', '中高'] },
              { feature: 'API 风格', values: ['hooks', '原子', '原子+selector', 'action+reducer'] },
              { feature: '状态粒度', values: ['store 级', '原子级', '原子级', 'store 级'] },
              { feature: '样板代码', values: ['极少', '少', '少', '中等'] },
              { feature: 'TypeScript 支持', values: ['优秀', '优秀', '良好', '优秀'] },
              { feature: '适合场景', values: ['中小型应用', '细粒度状态', 'Facebook 生态', '大型应用'] },
              { feature: '包体积', values: ['~1KB', '~2KB', '~22KB', '~12KB'] },
            ],
          },
        },
        {
          id: 'ra-p9-3',
          type: 'code',
          language: 'javascript',
          filename: 'Zustand 基础用法',
          code: `import { create } from 'zustand';

// 创建 store：极简，无需 provider
const useCounter = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 使用：自动按需订阅
function Counter() {
  const count = useCounter((s) => s.count); // 仅订阅 count
  const increment = useCounter((s) => s.increment);
  return <button onClick={increment}>{count}</button>;
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 10：React.memo 性能优化
    // ========================================================================
    {
      order: 10,
      title: 'React.memo 性能优化',
      difficulty: 2,
      visualizationType: 'memo-effect-comparator',
      blocks: [
        {
          id: 'ra-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'React.memo 包装函数组件，对 props 浅比较，未变化则跳过重渲染。配合 useMemo（缓存对象/数组 props）和 useCallback（缓存函数 props）实现完整优化。三者缺一可能导致 memo 失效。',
        },
        {
          id: 'ra-p10-2',
          type: 'demo',
          visualizationType: 'memo-effect-comparator',
          data: {
            strategies: [
              { id: 'none', label: '无优化', useReactMemo: false, useMemo: false, useCallback: false },
              { id: 'memo', label: 'React.memo', useReactMemo: true, useMemo: false, useCallback: false },
              { id: 'memo-usememo', label: '+ useMemo', useReactMemo: true, useMemo: true, useCallback: false },
              { id: 'full', label: '+ useCallback', useReactMemo: true, useMemo: true, useCallback: true },
            ],
          },
        },
        {
          id: 'ra-p10-3',
          type: 'code',
          language: 'javascript',
          filename: 'memo + useMemo + useCallback 三件套',
          code: `import { memo, useMemo, useCallback } from 'react';

// React.memo：包装子组件
const ExpensiveChild = memo(function ExpensiveChild({ config, onClick }) {
  console.log('子组件渲染');
  return <div onClick={onClick}>{config.label}</div>;
});

function Parent({ data }) {
  const [count, setCount] = useState(0);

  // useMemo：缓存对象/数组，避免每次新建
  const config = useMemo(() => ({ label: data.label }), [data.label]);

  // useCallback：缓存函数，避免每次新建
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // count 变化时，config 和 handleClick 引用不变 → memo 跳过子组件渲染
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>count: {count}</button>
      <ExpensiveChild config={config} onClick={handleClick} />
    </>
  );
}`,
        },
        {
          id: 'ra-p10-4',
          type: 'callout',
          variant: 'warning',
          title: 'memo 失效的常见原因',
          text: '1. 传入内联对象/数组（每次新引用）。2. 传入内联函数（每次新引用）。3. children 是 JSX（每次新元素）。解决：用 useMemo/useCallback 缓存，或将 children 提取为变量。',
        },
      ],
    },

    // ========================================================================
    // 知识点 11：代码分割与懒加载
    // ========================================================================
    {
      order: 11,
      title: '代码分割与懒加载',
      difficulty: 2,
      visualizationType: 'virtual-list-simulator',
      blocks: [
        {
          id: 'ra-p11-1',
          type: 'paragraph',
          lead: true,
          text: '代码分割（Code Splitting）将打包产物拆分为多个 chunk，按需加载。React.lazy + Suspense 实现路由级/组件级懒加载。虚拟列表（Virtual List）是大数据量渲染的关键优化，仅渲染可视区域节点。',
        },
        {
          id: 'ra-p11-2',
          type: 'demo',
          visualizationType: 'virtual-list-simulator',
          data: { totalItems: 5000, itemHeight: 35, containerHeight: 350, overscan: 4 },
        },
        {
          id: 'ra-p11-3',
          type: 'code',
          language: 'javascript',
          filename: 'React.lazy + Suspense 路由懒加载',
          code: `import { lazy, Suspense } from 'react';

// 路由级懒加载：按需加载页面 chunk
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// 虚拟列表：仅渲染可视区域（react-window / @tanstack/react-virtual）
import { useVirtualizer } from '@tanstack/react-virtual';

function BigList({ items }) {
  const parentRef = useRef();
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 4,
  });
  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={item.key} style={{ transform: \`translateY(\${item.start}px)\` }}>
            {items[item.index]}
          </div>
        ))}
      </div>
    </div>
  );
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 12：useLayoutEffect
    // ========================================================================
    {
      order: 12,
      title: 'useLayoutEffect',
      difficulty: 3,
      blocks: [
        {
          id: 'ra-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'useLayoutEffect 与 useEffect 语法相同，但执行时机不同。useLayoutEffect 在 DOM 变更后同步执行（阻塞绘制），适合读取 DOM 布局并立即修改以避免闪烁。useEffect 异步执行（不阻塞绘制）。',
        },
        {
          id: 'ra-p12-2',
          type: 'code',
          language: 'javascript',
          filename: 'useLayoutEffect vs useEffect',
          code: `// useEffect：异步，不阻塞绘制（推荐默认使用）
useEffect(() => {
  console.log('paint 后执行');
}, []);

// useLayoutEffect：同步，阻塞绘制（避免视觉闪烁）
useLayoutEffect(() => {
  // 读取 DOM 布局
  const rect = ref.current.getBoundingClientRect();
  // 立即修改 DOM（用户看不到中间态）
  ref.current.style.top = \`\${rect.height}px\`;
}, []);

// 典型场景：Tooltip 定位
function Tooltip({ targetRef }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useLayoutEffect(() => {
    // 必须同步读取目标位置并定位，否则 Tooltip 会闪现在错误位置
    const rect = targetRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom, left: rect.left });
  }, [targetRef]);
  return <div style={{ position: 'fixed', top: pos.top, left: pos.left }}>Tooltip</div>;
}`,
        },
        {
          id: 'ra-p12-3',
          type: 'callout',
          variant: 'warning',
          title: '执行顺序',
          text: 'React 更新 DOM → useLayoutEffect 同步执行（可读取/修改 DOM）→ 浏览器绘制 → useEffect 异步执行。95% 场景用 useEffect，仅在需要「读取 DOM 布局并同步修改避免闪烁」时用 useLayoutEffect。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：useImperativeHandle / useRef 进阶
    // ========================================================================
    {
      order: 13,
      title: 'useImperativeHandle / useRef 进阶',
      difficulty: 3,
      blocks: [
        {
          id: 'ra-p13-1',
          type: 'paragraph',
          lead: true,
          text: 'useImperativeHandle 配合 forwardRef 自定义暴露给父组件的 ref 实例值（而非默认的 DOM 节点）。useRef 不仅用于 DOM 引用，还可存储任何可变值（不触发重渲染）。',
        },
        {
          id: 'ra-p13-2',
          type: 'code',
          language: 'javascript',
          filename: 'useImperativeHandle 自定义 ref 暴露',
          code: `import { forwardRef, useImperativeHandle, useRef } from 'react';

// 子组件：暴露自定义方法给父组件
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    getValue: () => inputRef.current.value,
  }));

  return <input ref={inputRef} />;
});

// 父组件：通过 ref 调用子组件方法
function Parent() {
  const inputRef = useRef();
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
      <button onClick={() => inputRef.current.clear()}>清空</button>
    </>
  );
}

// useRef 存储可变值（不触发重渲染）
function Timer() {
  const intervalRef = useRef();
  useEffect(() => {
    intervalRef.current = setInterval(() => {}, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
}`,
        },
      ],
    },

    // ========================================================================
    // 知识点 14：StrictMode 与副作用检测
    // ========================================================================
    {
      order: 14,
      title: 'StrictMode 与副作用检测',
      difficulty: 2,
      visualizationType: 'codestepper',
      blocks: [
        {
          id: 'ra-p14-1',
          type: 'paragraph',
          lead: true,
          text: 'StrictMode 是开发模式下的辅助工具，故意双调用函数组件、useState/useReducer 初始化、useEffect 等，帮助发现副作用问题。生产环境不生效。',
        },
        {
          id: 'ra-p14-2',
          type: 'demo',
          visualizationType: 'codestepper',
          data: {
            lines: [
              '<React.StrictMode>',
              '  <App />',
              '</React.StrictMode>',
              '',
              '// StrictMode 在开发模式下会：',
              '// 1. 双调用函数组件体（检测副作用）',
              '// 2. 双调用 useState/useReducer 初始化函数',
              '// 3. 双调用 useEffect（mount + unmount + mount）',
              '// 4. 双调用 useMemo/useCallback 的函数',
              '',
              '// 目的：检测不纯的渲染逻辑',
              '// 如果双调用产生不同结果 → 有副作用 bug',
            ],
            steps: [
              { title: '启用 StrictMode', description: '在根节点包裹 <React.StrictMode>', highlightLines: [1, 2, 3] },
              { title: '双调用检测', description: '开发模式下故意双调用组件和 Hooks，检测副作用', highlightLines: [6, 7, 8, 9, 10] },
              { title: '副作用识别', description: '如果双调用产生不同结果，说明渲染函数有副作用（应纯函数）', highlightLines: [12, 13] },
              { title: '修复建议', description: '将副作用移入 useEffect；渲染函数保持纯函数', highlightLines: [13] },
            ],
            language: 'javascript',
          },
        },
        {
          id: 'ra-p14-3',
          type: 'callout',
          variant: 'tip',
          title: 'StrictMode 双调用规则',
          text: '仅开发模式双调用，生产构建完全不调用额外次数。这不是 bug 而是 feature——帮你发现不纯的渲染逻辑。正确编写的组件应能承受双调用（纯函数无副作用）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 15：Fiber Diff 策略
    // ========================================================================
    {
      order: 15,
      title: 'Fiber Diff 策略（Reconciliation）',
      difficulty: 4,
      visualizationType: 'vdom-diff-simulator',
      blocks: [
        {
          id: 'ra-p15-1',
          type: 'paragraph',
          lead: true,
          text: 'React Diff 基于三大假设优化：1. 不同类型元素产生不同树（div→span 直接销毁重建）。2. 同类型元素保留 DOM 节点，只更新属性。3. 列表通过 key 标识，key 不变则复用。Key 的正确使用直接影响 diff 效率。',
        },
        {
          id: 'ra-p15-2',
          type: 'demo',
          visualizationType: 'vdom-diff-simulator',
          data: {
            scenes: [
              {
                id: 'key-index',
                label: 'index 作 key（错误）',
                oldTree: [
                  { id: 'a', label: '<li key={0}>Alice</li>' },
                  { id: 'b', label: '<li key={1}>Bob</li>' },
                  { id: 'c', label: '<li key={2}>Charlie</li>' },
                ],
                newTree: [
                  { id: 'z', label: '<li key={0}>Zoe</li>' },
                  { id: 'a', label: '<li key={1}>Alice</li>' },
                  { id: 'b', label: '<li key={2}>Bob</li>' },
                ],
                diffDescription: 'index 作 key 时，删除首项导致所有项 key 错位，React 认为每项都变化了 → 3 次更新 + Charlie 被移除',
                domOps: 4,
                addedIds: ['z'],
                removedIds: ['c'],
                movedIds: [],
              },
              {
                id: 'key-id',
                label: 'id 作 key（正确）',
                oldTree: [
                  { id: 'a', label: '<li key="a">Alice</li>' },
                  { id: 'b', label: '<li key="b">Bob</li>' },
                  { id: 'c', label: '<li key="c">Charlie</li>' },
                ],
                newTree: [
                  { id: 'a', label: '<li key="a">Alice</li>' },
                  { id: 'b', label: '<li key="b">Bob</li>' },
                ],
                diffDescription: 'id 作 key 时，删除首项 Zoe 只需移除 Zoe 的 DOM 节点，Alice 和 Bob 因 key 匹配而复用 → 仅 1 次操作',
                domOps: 1,
                addedIds: [],
                removedIds: ['c'],
                movedIds: [],
              },
            ],
          },
        },
        {
          id: 'ra-p15-3',
          type: 'callout',
          variant: 'warning',
          title: 'index 作 key 的危害',
          text: '1. 性能下降：列表顺序变化导致大量不必要的 DOM 更新。2. 状态错乱：受控组件（input/select）的状态会跟随 index 而非数据项，导致输入框内容错位。3. 动画异常：因节点复用错误导致过渡动画错乱。',
        },
      ],
    },

    // ========================================================================
    // 知识点 16：性能优化手段对比
    // ========================================================================
    {
      order: 16,
      title: '性能优化手段对比',
      difficulty: 2,
      visualizationType: 'rerender-tracker',
      blocks: [
        {
          id: 'ra-p16-1',
          type: 'paragraph',
          lead: true,
          text: 'React 性能优化手段各有适用场景：React.memo 跳过 props 未变的重渲染、useMemo/useCallback 缓存引用、虚拟列表减少 DOM 节点、代码分割减少首屏体积。应根据 Profiler 数据针对性优化。',
        },
        {
          id: 'ra-p16-2',
          type: 'demo',
          visualizationType: 'rerender-tracker',
          data: {
            defaultScenario: 'useMemo + useCallback',
          },
        },
        {
          id: 'ra-p16-3',
          type: 'list',
          items: [
            'React.memo：包装子组件，props 浅比较未变则跳过渲染',
            'useMemo：缓存昂贵计算结果，依赖未变则返回缓存值',
            'useCallback：缓存函数引用，配合 memo 防止子组件因函数新引用而重渲染',
            '虚拟列表（react-window / @tanstack/react-virtual）：仅渲染可视区域，DOM 节点从万级降至十级',
            '代码分割（React.lazy）：按路由/组件拆分 chunk，减少首屏 JS 体积',
            'useTransition：将非紧急更新标记为低优先级，避免阻塞用户输入',
            'React Profiler：使用 Profiler 组件 / DevTools Profiler 定位渲染瓶颈',
          ],
        },
        {
          id: 'ra-p16-4',
          type: 'callout',
          variant: 'tip',
          title: '优化原则',
          text: '不要过早优化！先用 React DevTools Profiler 定位实际瓶颈，再针对性优化。90% 的性能问题来自：1. 大列表全量渲染 2. 不必要的重渲染 3. 首屏加载过多 JS。',
        },
      ],
    },

    // ========================================================================
    // 知识点 17：React 生态对比
    // ========================================================================
    {
      order: 17,
      title: 'React 生态对比',
      difficulty: 2,
      visualizationType: 'architecture',
      blocks: [
        {
          id: 'ra-p17-1',
          type: 'paragraph',
          lead: true,
          text: 'React 生态由路由、状态管理、数据获取、表单、样式、构建工具等组成。理解各层选型有助于构建合理的项目架构。',
        },
        {
          id: 'ra-p17-2',
          type: 'demo',
          visualizationType: 'architecture',
          data: {
            title: 'React 生态技术栈全景',
            flowDirection: 'top-down',
            layers: [
              {
                name: '路由层',
                description: '管理页面导航与 URL 状态',
                components: [
                  { name: 'React Router', description: '事实标准，支持嵌套路由/数据加载' },
                  { name: 'TanStack Router', description: '类型安全，基于文件路由' },
                  { name: 'Next.js App Router', description: '全栈路由，RSC 原生支持' },
                ],
              },
              {
                name: '状态管理层',
                description: '管理客户端状态',
                components: [
                  { name: 'Zustand', description: '极简 hooks 风格，~1KB' },
                  { name: 'Redux Toolkit', description: '大型应用，生态成熟' },
                  { name: 'Jotai', description: '原子化，细粒度订阅' },
                ],
              },
              {
                name: '数据获取层',
                description: '管理服务端状态（缓存/去重/刷新）',
                components: [
                  { name: 'TanStack Query', description: '事实标准，缓存+去重+后台刷新' },
                  { name: 'SWR', description: 'Vercel 出品，stale-while-revalidate' },
                  { name: 'RTK Query', description: 'Redux Toolkit 内置' },
                ],
              },
              {
                name: '表单层',
                description: '表单状态与验证',
                components: [
                  { name: 'React Hook Form', description: '高性能，非受控 ref' },
                  { name: 'Formik', description: '受控模式，老牌库' },
                  { name: 'TanStack Form', description: '类型安全，框架无关' },
                ],
              },
              {
                name: '样式层',
                description: '组件样式方案',
                components: [
                  { name: 'Tailwind CSS', description: '原子化，JIT 编译' },
                  { name: 'CSS Modules', description: '局部作用域' },
                  { name: 'styled-components', description: 'CSS-in-JS，运行时' },
                ],
              },
              {
                name: '构建工具层',
                description: '开发与打包',
                components: [
                  { name: 'Vite', description: 'ESM 开发服务器，极速 HMR' },
                  { name: 'Next.js', description: '全栈框架，SSR/SSG/ISR' },
                  { name: 'Rspack', description: 'Rust 写的 Webpack' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 18：React 进阶测验
    // ========================================================================
    {
      order: 18,
      title: 'React 进阶小测验',
      difficulty: 1,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'ra-p18-1',
          type: 'paragraph',
          lead: true,
          text: '通过 10 道精选测验题检验对 React 进阶知识的掌握程度，覆盖 Fiber 架构、Diff 算法、memo 机制、并发特性、设计模式等核心考点。',
        },
        {
          id: 'ra-p18-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'React 16 引入的 Fiber 架构的核心改进是什么？',
                options: ['更快的 Diff 算法', '可中断/可恢复的渲染', '更小的包体积', '支持 TypeScript'],
                correctIndex: 1,
                explanation: 'Fiber 将渲染工作拆分为可中断的小任务（Fiber 节点），实现时间切片。高优先级任务可打断低优先级工作，避免长任务阻塞主线程。',
              },
              {
                question: 'React Diff 算法的三大假设不包括以下哪个？',
                options: ['不同类型元素产生不同树', '同类型元素保留 DOM 节点', '列表通过 key 标识复用', '兄弟节点必须同类型'],
                correctIndex: 3,
                explanation: 'React Diff 三大假设：1. 不同类型元素产生不同树 2. 同类型元素保留 DOM 节点只更新属性 3. 列表通过 key 标识复用。兄弟节点不需要同类型。',
              },
              {
                question: 'React.memo 失效的最常见原因是？',
                options: ['组件太大', '传入内联对象/函数（每次新引用）', '使用了 useState', '组件名太长'],
                correctIndex: 1,
                explanation: 'React.memo 对 props 浅比较，内联对象/函数每次渲染都创建新引用，导致 memo 判定 props 变化。解决：用 useMemo/useCallback 缓存引用。',
              },
              {
                question: 'useTransition 的作用是什么？',
                options: ['过渡动画', '将状态更新标记为非紧急（可中断）', '组件切换效果', '延迟加载组件'],
                correctIndex: 1,
                explanation: 'useTransition 返回 [isPending, startTransition]，startTransition 内的状态更新被标记为非紧急，React 可中断它以优先处理用户输入等紧急更新。',
              },
              {
                question: 'useLayoutEffect 与 useEffect 的关键区别是？',
                options: ['参数不同', '执行时机：useLayoutEffect 同步阻塞绘制，useEffect 异步', 'useLayoutEffect 只能用一次', 'useEffect 不能访问 DOM'],
                correctIndex: 1,
                explanation: 'useLayoutEffect 在 DOM 变更后同步执行（阻塞绘制），适合读取 DOM 布局并立即修改避免闪烁。useEffect 在绘制后异步执行。95% 场景用 useEffect。',
              },
              {
                question: 'React 18 自动批处理相比 React 17 的改进是？',
                options: ['更快的事件处理', 'Promise/setTimeout 中的多次 setState 也自动合并', '支持更多 hooks', '减少包体积'],
                correctIndex: 1,
                explanation: 'React 17 仅在事件处理函数中批处理。React 18 扩展到所有上下文（Promise、setTimeout、原生事件），多次 setState 自动合并为一次渲染。',
              },
              {
                question: '关于列表中使用 index 作 key，以下说法正确的是？',
                options: ['总是正确的', '列表顺序变化时会导致性能下降和状态错乱', '比用 id 更好', '只在列表项有 id 时使用'],
                correctIndex: 1,
                explanation: 'index 作 key 时，列表顺序变化（如删除首项）导致所有项 key 错位，React 认为每项都变化了，触发大量不必要 DOM 操作，且受控组件状态会错位。',
              },
              {
                question: 'Suspense 的 fallback 在什么时候显示？',
                options: ['组件出错时', '子组件正在加载（pending）时', '每次渲染时', '组件卸载时'],
                correctIndex: 1,
                explanation: 'Suspense 的 fallback 在子组件抛出 Promise（pending）时显示。子组件加载完成后 fallback 被替换为实际内容。React.lazy、React Query 都支持 Suspense。',
              },
              {
                question: 'Zustand 相比 Redux Toolkit 的主要优势是？',
                options: ['功能更多', '极简 API，无样板代码，无需 Provider', '性能更好', '支持更多中间件'],
                correctIndex: 1,
                explanation: 'Zustand 采用 hooks 风格 API，创建 store 仅需一个 create 函数，使用时自动按需订阅，无需 Provider 包裹，样板代码极少。适合中小型应用。',
              },
              {
                question: '自定义 Hook 的命名规则和限制是？',
                options: ['必须以 use 开头，可在条件语句中调用', '必须以 use 开头，不能在条件语句中调用', '任意命名，无限制', '必须以 hook 结尾'],
                correctIndex: 1,
                explanation: '自定义 Hook 必须以 use 开头（eslint-plugin-react-hooks 依赖此命名检测）。Hook 调用遵守 Hooks 规则：只能在顶层调用，不能在条件/循环/嵌套函数中调用。',
              },
            ],
          },
        },
      ],
    },
  ],
}
