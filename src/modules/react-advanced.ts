/**
 * 模块 09：React 进阶与生态体系
 *
 * 严格遵循 docx/PROJECT_CONTENT.md 与 docx/模块九.md 设计文档与模块标准自查文档：
 * - 21 个知识点（17 章节 + 综合实战 + 面试题精选 + 小测验 + 速查表）
 * - 可视化演示：6 个新增进阶组件 + 4 个复用模块八组件 + 5 个复用核心组件 + 1 综合实战沙盒 + 1 面试题 Accordion
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
 * - KP18 React 进阶测验（QuizCard 20 题，梯度标注）
 * - KP19 综合实战：列表性能优化（断言沙盒 6 checks）
 * - KP20 React 进阶面试题精选（Accordion flashcard 32 题）
 * - KP21 React 进阶速查表（24 行）
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
  icon: '09',
  summary: '并发模式、Fiber、Suspense、状态管理库、性能优化、生态全景。',
  knowledgePointCount: 21,
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
          id: 'p1-1',
          type: 'paragraph',
          lead: true,
          text: 'React 18 引入并发渲染（Concurrent Rendering），核心是「可中断的渲染」。React 可以暂停、恢复甚至放弃一次渲染，让高优先级任务（如用户输入）优先响应。并发模式不是新 API，而是底层渲染机制的升级。',
        },
        {
          id: 'p1-2',
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
          id: 'p1-3',
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
          id: 'p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Fiber 是 React 16 引入的新调和算法架构。它将渲染工作拆分为多个可中断、可恢复的小任务（Fiber 节点），实现时间切片（Time Slicing）。每个 Fiber 节点是一个工作单元，包含组件类型、props、state、副作用标记等信息。',
        },
        {
          id: 'p2-2',
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
          id: 'p2-3',
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
          id: 'p2-4',
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
          id: 'p3-1',
          type: 'paragraph',
          lead: true,
          text: 'React 18 的自动批处理将多次状态更新合并为一次重渲染，无论更新发生在事件处理函数、Promise、setTimeout 还是原生事件中。React 17 仅在事件处理函数中批处理。',
        },
        {
          id: 'p3-2',
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
          id: 'p3-3',
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
          id: 'p4-1',
          type: 'paragraph',
          lead: true,
          text: 'useTransition 将状态更新标记为「非紧急」，让 React 优先处理用户输入等紧急更新。useDeferredValue 返回一个延迟更新的值，用于延迟昂贵的计算。两者都利用并发渲染实现「不阻塞用户输入」。',
        },
        {
          id: 'p4-2',
          type: 'demo',
          visualizationType: 'transition-vs-sync-demo',
          data: { listSize: 10000 },
        },
        {
          id: 'p4-3',
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
          id: 'p4-4',
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
          id: 'p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Suspense 让组件在等待异步数据时显示 fallback。React 18 支持服务端 Suspense（流式 SSR）和嵌套 Suspense 边界。与 React.lazy 配合实现代码分割的加载态，与数据获取库（React Query / Relay）配合实现声明式数据加载。',
        },
        {
          id: 'p5-2',
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
          id: 'p5-3',
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
          id: 'p6-1',
          type: 'paragraph',
          lead: true,
          text: 'React Query 是服务端状态管理库，自动处理缓存、去重、后台刷新、乐观更新。比手写 useEffect + useState 的数据获取更健壮，内置 loading/error/stale 状态管理。',
        },
        {
          id: 'p6-2',
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
          id: 'p6-3',
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
          id: 'p7-1',
          type: 'paragraph',
          lead: true,
          text: 'React Hook Form 是高性能表单库，基于非受控组件（ref）实现，避免每次输入都触发重渲染。支持 schema 验证（Zod / Yup）、动态字段、表单数组。',
        },
        {
          id: 'p7-2',
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
          id: 'p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Redux Toolkit（RTK）是 Redux 官方推荐的方式，内置 createSlice（自动生成 actions/reducers）、createAsyncThunk（异步 action）、RTK Query（数据获取）。大幅减少 Redux 样板代码。',
        },
        {
          id: 'p8-2',
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
          id: 'p8-3',
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
          id: 'p9-1',
          type: 'paragraph',
          lead: true,
          text: '现代 React 状态管理库各有特色：Zustand 极简（hooks 风格）、Jotai 原子化（细粒度）、Recoil（Facebook 出品，原子 + selector）。选型取决于状态粒度需求和团队偏好。',
        },
        {
          id: 'p9-2',
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
          id: 'p9-3',
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
          id: 'p10-1',
          type: 'paragraph',
          lead: true,
          text: 'React.memo 包装函数组件，对 props 浅比较，未变化则跳过重渲染。配合 useMemo（缓存对象/数组 props）和 useCallback（缓存函数 props）实现完整优化。三者缺一可能导致 memo 失效。',
        },
        {
          id: 'p10-2',
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
          id: 'p10-3',
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
          id: 'p10-4',
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
          id: 'p11-1',
          type: 'paragraph',
          lead: true,
          text: '代码分割（Code Splitting）将打包产物拆分为多个 chunk，按需加载。React.lazy + Suspense 实现路由级/组件级懒加载。虚拟列表（Virtual List）是大数据量渲染的关键优化，仅渲染可视区域节点。',
        },
        {
          id: 'p11-2',
          type: 'demo',
          visualizationType: 'virtual-list-simulator',
          data: { totalItems: 5000, itemHeight: 35, containerHeight: 350, overscan: 4 },
        },
        {
          id: 'p11-3',
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
          id: 'p12-1',
          type: 'paragraph',
          lead: true,
          text: 'useLayoutEffect 与 useEffect 语法相同，但执行时机不同。useLayoutEffect 在 DOM 变更后同步执行（阻塞绘制），适合读取 DOM 布局并立即修改以避免闪烁。useEffect 异步执行（不阻塞绘制）。',
        },
        {
          id: 'p12-2',
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
          id: 'p12-3',
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
          id: 'p13-1',
          type: 'paragraph',
          lead: true,
          text: 'useImperativeHandle 配合 forwardRef 自定义暴露给父组件的 ref 实例值（而非默认的 DOM 节点）。useRef 不仅用于 DOM 引用，还可存储任何可变值（不触发重渲染）。',
        },
        {
          id: 'p13-2',
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
          id: 'p14-1',
          type: 'paragraph',
          lead: true,
          text: 'StrictMode 是开发模式下的辅助工具，故意双调用函数组件、useState/useReducer 初始化、useEffect 等，帮助发现副作用问题。生产环境不生效。',
        },
        {
          id: 'p14-2',
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
          id: 'p14-3',
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
          id: 'p15-1',
          type: 'paragraph',
          lead: true,
          text: 'React Diff 基于三大假设优化：1. 不同类型元素产生不同树（div→span 直接销毁重建）。2. 同类型元素保留 DOM 节点，只更新属性。3. 列表通过 key 标识，key 不变则复用。Key 的正确使用直接影响 diff 效率。',
        },
        {
          id: 'p15-2',
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
          id: 'p15-3',
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
          id: 'p16-1',
          type: 'paragraph',
          lead: true,
          text: 'React 性能优化手段各有适用场景：React.memo 跳过 props 未变的重渲染、useMemo/useCallback 缓存引用、虚拟列表减少 DOM 节点、代码分割减少首屏体积。应根据 Profiler 数据针对性优化。',
        },
        {
          id: 'p16-2',
          type: 'demo',
          visualizationType: 'rerender-tracker',
          data: {
            defaultScenario: 'useMemo + useCallback',
          },
        },
        {
          id: 'p16-3',
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
          id: 'p16-4',
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
          id: 'p17-1',
          type: 'paragraph',
          lead: true,
          text: 'React 生态由路由、状态管理、数据获取、表单、样式、构建工具等组成。理解各层选型有助于构建合理的项目架构。',
        },
        {
          id: 'p17-2',
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
          id: 'p18-1',
          type: 'paragraph',
          lead: true,
          text: '通过 20 道精选测验题检验对 React 进阶知识的掌握程度，覆盖 Fiber 架构、Diff 算法、memo 机制、并发特性、状态管理选型、性能优化、设计模式等核心考点。题目按【记忆】【理解】【应用】【对比】【场景】【综合】梯度分布，每题附详细解析。',
        },
        {
          id: 'p18-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '【记忆】React 16 引入的 Fiber 架构的核心改进是什么？',
                options: ['更快的 Diff 算法', '可中断/可恢复的渲染', '更小的包体积', '支持 TypeScript'],
                correctIndex: 1,
                explanation: 'Fiber 将渲染工作拆分为可中断的小任务（Fiber 节点），实现时间切片。高优先级任务可打断低优先级工作，避免长任务阻塞主线程。',
              },
              {
                question: '【记忆】React Diff 算法的三大假设不包括以下哪个？',
                options: ['不同类型元素产生不同树', '同类型元素保留 DOM 节点', '列表通过 key 标识复用', '兄弟节点必须同类型'],
                correctIndex: 3,
                explanation: 'React Diff 三大假设：1. 不同类型元素产生不同树 2. 同类型元素保留 DOM 节点只更新属性 3. 列表通过 key 标识复用。兄弟节点不需要同类型。',
              },
              {
                question: '【理解】React.memo 失效的最常见原因是？',
                options: ['组件太大', '传入内联对象/函数（每次新引用）', '使用了 useState', '组件名太长'],
                correctIndex: 1,
                explanation: 'React.memo 对 props 浅比较，内联对象/函数每次渲染都创建新引用，导致 memo 判定 props 变化。解决：用 useMemo/useCallback 缓存引用。',
              },
              {
                question: '【理解】useTransition 的作用是什么？',
                options: ['过渡动画', '将状态更新标记为非紧急（可中断）', '组件切换效果', '延迟加载组件'],
                correctIndex: 1,
                explanation: 'useTransition 返回 [isPending, startTransition]，startTransition 内的状态更新被标记为非紧急，React 可中断它以优先处理用户输入等紧急更新。',
              },
              {
                question: '【对比】useLayoutEffect 与 useEffect 的关键区别是？',
                options: ['参数不同', '执行时机：useLayoutEffect 同步阻塞绘制，useEffect 异步', 'useLayoutEffect 只能用一次', 'useEffect 不能访问 DOM'],
                correctIndex: 1,
                explanation: 'useLayoutEffect 在 DOM 变更后同步执行（阻塞绘制），适合读取 DOM 布局并立即修改避免闪烁。useEffect 在绘制后异步执行。95% 场景用 useEffect。',
              },
              {
                question: '【理解】React 18 自动批处理相比 React 17 的改进是？',
                options: ['更快的事件处理', 'Promise/setTimeout 中的多次 setState 也自动合并', '支持更多 hooks', '减少包体积'],
                correctIndex: 1,
                explanation: 'React 17 仅在事件处理函数中批处理。React 18 扩展到所有上下文（Promise、setTimeout、原生事件），多次 setState 自动合并为一次渲染。',
              },
              {
                question: '【理解】关于列表中使用 index 作 key，以下说法正确的是？',
                options: ['总是正确的', '列表顺序变化时会导致性能下降和状态错乱', '比用 id 更好', '只在列表项有 id 时使用'],
                correctIndex: 1,
                explanation: 'index 作 key 时，列表顺序变化（如删除首项）导致所有项 key 错位，React 认为每项都变化了，触发大量不必要 DOM 操作，且受控组件状态会错位。',
              },
              {
                question: '【理解】Suspense 的 fallback 在什么时候显示？',
                options: ['组件出错时', '子组件正在加载（pending）时', '每次渲染时', '组件卸载时'],
                correctIndex: 1,
                explanation: 'Suspense 的 fallback 在子组件抛出 Promise（pending）时显示。子组件加载完成后 fallback 被替换为实际内容。React.lazy、React Query 都支持 Suspense。',
              },
              {
                question: '【对比】Zustand 相比 Redux Toolkit 的主要优势是？',
                options: ['功能更多', '极简 API，无样板代码，无需 Provider', '性能更好', '支持更多中间件'],
                correctIndex: 1,
                explanation: 'Zustand 采用 hooks 风格 API，创建 store 仅需一个 create 函数，使用时自动按需订阅，无需 Provider 包裹，样板代码极少。适合中小型应用。',
              },
              {
                question: '【记忆】自定义 Hook 的命名规则和限制是？',
                options: ['必须以 use 开头，可在条件语句中调用', '必须以 use 开头，不能在条件语句中调用', '任意命名，无限制', '必须以 hook 结尾'],
                correctIndex: 1,
                explanation: '自定义 Hook 必须以 use 开头（eslint-plugin-react-hooks 依赖此命名检测）。Hook 调用遵守 Hooks 规则：只能在顶层调用，不能在条件/循环/嵌套函数中调用。',
              },
              {
                question: '【理解】Fiber 节点的"双缓存"机制是什么？',
                options: ['两份状态备份防丢失', 'current 树与 workInProgress 树交替复用，避免每次重建', '缓存两次渲染结果', '双倍内存加速'],
                correctIndex: 1,
                explanation: 'Fiber 维护 current 树（当前屏幕）与 workInProgress 树（正在构建）。提交后两树指针交换复用旧节点，避免每次渲染重建整棵树，是可中断恢复的基础。',
              },
              {
                question: '【对比】useDeferredValue 与 useTransition 的区别？',
                options: ['完全相同', 'useTransition 包裹更新代码，useDeferredValue 延迟某个值的读取', 'useDeferredValue 只用于动画', 'useTransition 只用于事件'],
                correctIndex: 1,
                explanation: 'useTransition 在"触发更新处"用 startTransition 包裹；useDeferredValue 在"消费值处"延迟读取。前者控制更新发起，后者控制值传递，常用于输入框即时响应、列表延迟渲染。',
              },
              {
                question: '【应用】React.lazy + Suspense 实现代码分割，Suspense 的 fallback 应放哪？',
                options: ['lazy 组件内部', 'lazy 组件的父级或祖先', '根 HTML 里', '不需要 fallback'],
                correctIndex: 1,
                explanation: 'Suspense 是边界组件，需包裹 lazy 组件（在其父级或祖先）。fallback 在 lazy 组件加载期间展示。可嵌套多层 Suspense 实现不同粒度的加载态。',
              },
              {
                question: '【场景】React.memo 包裹的子组件仍然每次都重渲染，最可能的原因是？',
                options: ['memo 写错了', '父组件传了内联函数/对象 props，每次新引用', '子组件用了 useState', 'React 版本太低'],
                correctIndex: 1,
                explanation: 'memo 浅比较 props，内联箭头函数/对象字面量每次渲染都产生新引用，浅比较判不等，memo 失效。修复：用 useCallback/useMemo 稳定引用，或把回调下放到子组件内部。',
              },
              {
                question: '【场景】长列表滚动卡顿，下列哪个优化优先级最高？',
                options: ['给所有子组件加 memo', '虚拟滚动只渲染可见区', '换用 class 组件', '减少 CSS 动画'],
                correctIndex: 1,
                explanation: '虚拟滚动（react-window/react-virtual）只渲染可视区少量 DOM，是万级列表卡顿的根因解法。memo 是辅助，无法解决 DOM 数量过多这一根本问题。先用 Profiler 定位再优化。',
              },
              {
                question: '【理解】ErrorBoundary 能捕获以下哪种错误？',
                options: ['事件处理函数中的错误', 'setTimeout 里的错误', '渲染阶段的错误', 'fetch 网络错误'],
                correctIndex: 2,
                explanation: 'ErrorBoundary 只捕获子树渲染/生命周期阶段的错误。事件处理、setTimeout、异步回调中的错误不会冒泡到 ErrorBoundary，需 try/catch 或全局 window.onerror 处理。',
              },
              {
                question: '【对比】React Query 与 Redux 的定位差异？',
                options: ['React Query 替代 Redux', 'React Query 管服务端状态，Redux 管客户端状态', '两者完全相同', 'Redux 管 API 数据更好'],
                correctIndex: 1,
                explanation: 'React Query 专攻服务端状态（缓存/失效/重试/竞态），Redux 管客户端 UI 状态。现代实践：API 数据用 React Query，UI/业务状态用 Zustand/Redux，不要把 API 数据塞进 Redux。',
              },
              {
                question: '【应用】useImperativeHandle 的典型使用场景是？',
                options: ['替代 useState', '暴露子组件特定方法给父组件（通过 ref）', '触发重渲染', '订阅 context'],
                correctIndex: 1,
                explanation: 'useImperativeHandle 配合 forwardRef，让父组件通过 ref 只能调用子组件暴露的指定方法（如 focus/scrollTo），而非整个实例，控制暴露面、封装内部实现。',
              },
              {
                question: '【综合】下列关于 React 18 并发模式的说法，正确的是？',
                options: ['并发模式让渲染更快', '并发模式让渲染可中断，优先响应用户交互', '并发模式自动启用无需 opt-in', '并发模式只服务端可用'],
                correctIndex: 1,
                explanation: '并发模式本质是"可中断的渲染"——React 可暂停低优先级渲染去处理高优先级交互，再恢复。通过 createRoot 启用，配合 useTransition/Suspense 使用，目标是保持交互响应而非单纯提速。',
              },
              {
                question: '【综合】为一个中大型 React 应用选型，下列组合最合理的是？',
                options: ['全部状态放 Redux', 'API 数据用 React Query + UI 状态用 Zustand + 路由用 React Router', '只用 Context 管所有状态', '不用任何状态库'],
                correctIndex: 1,
                explanation: '现代实践：服务端状态（API 数据）用 React Query（缓存/失效/竞态开箱即用），客户端 UI 状态用 Zustand（轻量按需订阅），路由用 React Router。职责分离，避免 Redux 一把梭。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 19：综合实战 — 性能优化（useMemo/useCallback/memo 任务导向，断言沙盒）
    // ========================================================================
    {
      order: 19,
      title: '综合实战：列表性能优化',
      difficulty: 3,
      blocks: [
        {
          id: 'p19-1',
          type: 'paragraph',
          lead: true,
          text: '把 React.memo、useMemo、useCallback 与稳定 key 焊在一起的综合实战。你要实现一个带搜索框的用户列表：输入框即时响应（高优先级），列表过滤用 useTransition 标记为非紧急；列表项用 memo 包裹且 props 引用稳定，避免"连坐"重渲染。右侧沙盒的任务检查清单会实时校验你的代码并给教学反馈。',
        },
        {
          id: 'p19-2',
          type: 'paragraph',
          text: '任务要求：用 useTransition 把过滤更新标记为非紧急；列表项组件用 React.memo 包裹；传给列表项的回调用 useCallback 稳定引用；过滤后的派生列表用 useMemo 缓存；列表项带稳定 key（item.id）。',
        },
        {
          id: 'p19-3',
          type: 'demo',
          visualizationType: 'sandbox',
          data: {
            language: 'html',
            hint: '在下方编辑器中编写 React 性能优化版用户列表（已内置 React 18 + Babel，可直接写 JSX）。任务检查清单会实时校验——逐条通过即完成。重点关注 useTransition/memo/useCallback/useMemo 与稳定 key。',
            initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 16px; }
    input { padding: 6px; width: 240px; }
    ul { list-style: none; padding: 0; }
    li { padding: 4px 0; border-bottom: 1px solid #eee; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useMemo, useCallback, useTransition, memo } = React

    const users = Array.from({ length: 200 }, (_, i) => ({ id: i, name: 'User ' + i }))

    // TODO: 用 memo 包裹列表项，避免父组件重渲染时连坐
    function UserItem({ user, onSelect }) {
      return <li onClick={() => onSelect(user.id)}>{user.name}</li>
    }

    function App() {
      const [query, setQuery] = useState('')
      const [isPending, startTransition] = useTransition()

      // TODO: 用 useMemo 缓存过滤结果
      const filtered = users

      // TODO: 用 useCallback 稳定 onSelect 引用
      const handleSelect = (id) => console.log('select', id)

      const handleChange = (e) => {
        const v = e.target.value
        setQuery(v) // 输入框高优先级即时响应
        // TODO: 用 startTransition 标记列表过滤为非紧急
      }

      return (
        <div>
          <input value={query} onChange={handleChange} placeholder="搜索用户..." />
          {isPending && <span> 过滤中...</span>}
          <ul>
            {filtered.map((u) => (
              <UserItem key={u.id} user={u} onSelect={handleSelect} />
            ))}
          </ul>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  </script>
</body>
</html>`,
            checks: [
              {
                description: '列表项组件用 React.memo 包裹',
                pattern: 'memo\\(',
                hint: '用 const UserItem = memo(function UserItem({...}) {...}) 包裹。memo 让父组件重渲染时浅比较 props，props 未变则跳过子组件渲染，避免"连坐"。',
              },
              {
                description: '过滤结果用 useMemo 缓存（依赖 query）',
                pattern: 'useMemo\\(',
                hint: 'const filtered = useMemo(() => users.filter(u => u.name.includes(query)), [query])。避免每次渲染都重新过滤 200 条，且返回稳定引用（依赖不变时）。',
              },
              {
                description: '回调用 useCallback 稳定引用',
                pattern: 'useCallback\\(',
                hint: 'const handleSelect = useCallback((id) => {...}, [])。若每次渲染都创建新函数，传给 memo 子组件的 onSelect 引用变化，memo 失效。空依赖表示回调不依赖任何状态。',
              },
              {
                description: '用 useTransition + startTransition 标记列表过滤为非紧急',
                pattern: 'startTransition\\(',
                hint: 'const [isPending, startTransition] = useTransition()，在 handleChange 中 startTransition(() => setQuery(v))。让输入框即时响应，列表过滤可中断，避免大列表过滤阻塞输入。',
              },
              {
                description: '列表项用稳定 key={u.id}（不用 index）',
                pattern: 'key=\\{\\w+\\.id\\}',
                hint: '<UserItem key={u.id} ...>。用稳定的 item.id 作 key，过滤后顺序变化时 React 能正确复用 DOM；用 index 会导致过滤后 key 错位、memo 失效。',
              },
              {
                description: '展示 isPending 状态（过滤中提示）',
                pattern: 'isPending',
                hint: '{isPending && <span>过滤中...</span>}。让用户感知非紧急更新正在进行，是 useTransition 的标准体验模式，避免界面"卡住无反馈"的错觉。',
              },
            ],
          },
        },
        {
          id: 'p19-4',
          type: 'callout',
          variant: 'tip',
          title: '为什么这个练习重要',
          text: '它把 memo/useMemo/useCallback/useTransition/key 五个性能手段串成一个真实场景。完成后你会理解：性能优化不是无脑加 memo，而是"稳定引用 + 标记优先级 + 减少 DOM"的组合拳。先用 Profiler 定位瓶颈，再针对性用这些工具，才能避免无效优化。',
        },
      ],
    },

    // ========================================================================
    // 知识点 20：React 进阶面试题精选（Accordion · flashcard 模式）
    // ========================================================================
    {
      order: 20,
      title: 'React 进阶面试题精选',
      difficulty: 3,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'p20-1',
          type: 'paragraph',
          text: '精选 React 进阶高频面试题，涵盖 Fiber 架构、Diff 算法、并发模式、性能优化、状态管理选型、Suspense/ErrorBoundary、Hooks 进阶、场景排查与方案对比。题量较多，已切换为闪卡模式（一题一屏，翻转看答案 + 上下题导航），也可切回列表模式。点击展开查看参考答案。',
        },
        {
          id: 'p20-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultMode: 'flashcard',
            items: [
              {
                title: 'Q1: Fiber 架构解决了什么问题？核心机制是什么？',
                content: '解决的问题：\n- React 15 递归渲染（栈式）一旦开始无法中断，大组件树阻塞主线程导致掉帧、交互卡顿。\n\n核心机制：\n1. 把渲染工作拆成可中断、可恢复的小单元（Fiber 节点链表）。\n2. 双缓存：current 树（屏幕）与 workInProgress 树（构建中）交替复用。\n3. Lane 优先级模型：高优先级任务可打断低优先级工作。\n4. 时间切片：每帧约 5ms 渲染预算，让出主线程给交互。\n\n结论：Fiber 是 React 并发模式的基础。',
              },
              {
                title: 'Q2: React Diff 算法的三大假设是什么？为什么这样设计？',
                content: '三大假设：\n1. 不同类型元素产生不同树（如 <a> → <img> 直接销毁重建）。\n2. 同类型元素保留 DOM 节点，只更新属性。\n3. 列表通过 key 标识复用。\n\n为什么这样设计：\n- 完整 diff 两棵树是 O(n³)，工程不可用。\n- 三大假设把复杂度降到 O(n)，用"程序员约定"换性能。\n\n结论：key 是开发者给 React 的"复用提示"，必须稳定唯一。',
              },
              {
                title: 'Q3: useTransition 和 useDeferredValue 的区别？',
                content: '两者都实现"非紧急更新可中断"，区别在使用位置：\n\n- useTransition：在"触发更新处"用 startTransition 包裹 setState。返回 [isPending, startTransition]。\n- useDeferredValue：在"消费值处"延迟读取某个值。返回延迟版本的值。\n\n典型场景：\n1. useTransition：点击按钮触发昂贵更新，包裹在 startTransition 内。\n2. useDeferredValue：输入框值即时更新，列表读取 deferredValue 延迟渲染。\n\n结论：前者控制更新发起，后者控制值传递。',
              },
              {
                title: 'Q4: React.memo、useMemo、useCallback 何时该用？',
                content: '该用：\n1. React.memo：包裹纯展示子组件，props 未变则跳过渲染。\n2. useMemo：缓存昂贵派生计算（大数组过滤/排序），依赖不变返回缓存。\n3. useCallback：传给 memo 子组件的回调，稳定引用避免 memo 失效。\n\n不该用：\n1. 简单计算——memo 本身有开销，得不偿失。\n2. 没传给 memo 组件的普通函数——重新创建几乎无成本。\n\n原则：先测后优，用 Profiler 定位瓶颈再 memo，不要无脑包。React 19 Compiler 未来可自动优化。',
              },
              {
                title: 'Q5: React.memo 失效的常见原因？',
                content: '失效原因（props 浅比较判不等）：\n1. 传入内联函数：onClick={() => ...} 每次新引用。\n2. 传入内联对象：style={{color:"red"}} 每次新引用。\n3. 传入数组/对象未用 useMemo 缓存。\n4. children 是 JSX（每次新元素）。\n\n修复：\n- 函数用 useCallback、对象用 useMemo 稳定引用。\n- 或把回调下放到子组件内部，不通过 props 传。\n- 或用 children-as-function 模式。\n\n结论：memo 配合稳定引用才有效，单独用 memo 往往无效。',
              },
              {
                title: 'Q6: useLayoutEffect 和 useEffect 的区别？什么时候用前者？',
                content: '区别在执行时机：\n\n- useEffect：在 DOM 变更 + 浏览器绘制之后异步执行，不阻塞绘制。\n- useLayoutEffect：在 DOM 变更后、绘制前同步执行，阻塞绘制。\n\n用 useLayoutEffect 的场景：\n1. 读取 DOM 布局并立即修改，避免闪烁（如测量元素位置后调整 tooltip）。\n2. 需要在用户看到前完成 DOM 操作。\n\n注意：95% 场景用 useEffect。useLayoutEffect 会阻塞绘制，滥用导致卡顿；SSR 下 useLayoutEffect 会报警告，需用 useIsomorphicLayoutEffect。',
              },
              {
                title: 'Q7: Suspense 和 ErrorBoundary 如何配合？',
                content: '两者各司其职：\n\n- Suspense：处理"加载中"——子组件抛出 Promise（pending）时展示 fallback。\n- ErrorBoundary：处理"加载失败"——捕获子树渲染错误展示降级 UI。\n\n配合模式：\n- Suspense 内嵌 ErrorBoundary，前者管 pending、后者管 error。\n- 嵌套多层 Suspense 可实现不同粒度加载态。\n\n注意：ErrorBoundary 只捕获渲染/生命周期错误，不捕获事件处理与异步错误（后者需 try/catch）。',
              },
              {
                title: 'Q8: React 18 自动批处理相比 17 的改进？',
                content: 'React 17：\n- 仅在事件处理函数中批处理多个 setState。\n- setTimeout/Promise/原生事件中的 setState 不批处理，每次都触发渲染。\n\nReact 18：\n- 自动批处理扩展到所有上下文（事件、setTimeout、Promise、原生事件）。\n- 多次 setState 自动合并为一次渲染。\n\n结论：减少不必要的渲染次数。如需立即刷新某次更新可用 flushSync。',
              },
              {
                title: 'Q9: 对比题——Zustand、Redux Toolkit、Jotai 怎么选？',
                content: '三者定位不同：\n\n- Zustand：\n  - 极简 API，create 一个 store，hooks 风格使用。\n  - 无需 Provider，按需订阅。\n  - 适合中小型应用、快速原型。\n\n- Redux Toolkit（RTK）：\n  - 单一 store + 纯函数 reducer + 中间件。\n  - 约定成熟、生态全、DevTools 强大。\n  - 适合大型团队、需时间旅行/持久化。\n\n- Jotai：\n  - 原子化状态，细粒度订阅。\n  - 适合状态间依赖复杂、需精确更新。\n\n结论：中小用 Zustand，大型用 RTK，原子化用 Jotai。',
              },
              {
                title: 'Q10: 对比题——React Query 和 Redux 的定位差异？',
                content: '定位完全不同：\n\n- React Query：\n  - 专攻服务端状态（API 数据）。\n  - 内置缓存/失效/重试/竞态处理。\n  - 按查询键订阅，数据自动刷新。\n\n- Redux：\n  - 管客户端 UI/业务状态。\n  - 手动管理异步（需 RTK Query 或中间件）。\n\n结论：现代实践——API 数据用 React Query，UI 状态用 Zustand/Redux。不要把 API 数据塞进 Redux 手动管理 loading/error，那是重复造轮子。',
              },
              {
                title: 'Q11: React.lazy 和 Suspense 如何实现代码分割？',
                content: '实现方式：\n1. 用 React.lazy 动态 import 组件：const Modal = lazy(() => import("./Modal"))。\n2. 用 Suspense 包裹 lazy 组件，提供 fallback：\n   <Suspense fallback={<Spinner/>}><Modal/></Suspense>。\n\n进阶：\n- 嵌套多层 Suspense 实现不同粒度加载态。\n- 配合 startTransition 实现平滑过渡（旧 UI 保留直到新组件就绪）。\n- 路由级分割：每个路由组件 lazy。\n\n注意：lazy 只支持默认导出；SSR 下 lazy 不工作，需用 next/dynamic 等方案。',
              },
              {
                title: 'Q12: ErrorBoundary 能捕获哪些错误？不能捕获哪些？',
                content: '能捕获（渲染/生命周期阶段）：\n1. 子组件渲染抛出的错误。\n2. 生命周期函数中的错误。\n3. 子组件构造函数错误。\n\n不能捕获：\n1. 事件处理函数中的错误（需 try/catch）。\n2. setTimeout/Promise 等异步错误（需 try/catch 或 window.onerror）。\n3. ErrorBoundary 自身错误（需再套一层 ErrorBoundary）。\n4. 服务端渲染错误。\n\n结论：ErrorBoundary 是"渲染错误兜底"，异步错误要单独处理。',
              },
              {
                title: 'Q13: 场景题——长列表滚动卡顿，如何排查与优化？',
                content: '排查：\n- 用 React DevTools Profiler 录制，看渲染耗时与重渲染范围。\n- 检查 DOM 数量（Performance 面板看 layout/paint 耗时）。\n\n优化（按优先级）：\n1. 虚拟滚动（react-window/react-virtual）只渲染可见区——根治 DOM 过多。\n2. 列表项用 React.memo + 稳定 key，避免整体重渲染。\n3. 回调用 useCallback 稳定引用，否则 memo 失效。\n4. 避免在 .map 中内联创建大对象。\n5. 复杂项分页或懒加载。\n\n结论：虚拟滚动是根因解法，memo 是辅助。',
              },
              {
                title: 'Q14: 场景题——React.memo 包裹的子组件仍每次重渲染，如何排查？',
                content: '排查 props 引用稳定性：\n1. 检查父组件传的内联函数：onClick={() => ...} 每次新引用 → memo 失效。改用 useCallback。\n2. 检查内联对象：style={{...}} 每次新引用 → 改用 useMemo 或提取常量。\n3. 检查 children：直接传 JSX 每次新元素 → 改传原始数据或用 children-as-function。\n4. 用 React DevTools "Highlight updates when components render" 高亮重渲染组件。\n5. why-did-you-render 插件打印重渲染原因。\n\n结论：memo 失效 90% 是 props 引用不稳定，稳定引用即可。',
              },
              {
                title: 'Q15: 场景题——useEffect 死循环（无限渲染），如何排查？',
                content: '典型成因：effect 修改了依赖项。\n\n排查路径：\n1. 看依赖数组是否包含被 setState 的状态——effect 依赖 X，effect 内 setX → X 变 → effect 再执行 → 死循环。\n2. 依赖数组里放了对象/数组/函数引用，每次渲染都是新引用导致 effect 反复触发。\n\n修复：\n- 用函数式更新 setX(prev => ...) 配合空依赖。\n- 或把对象/函数用 useMemo/useCallback 稳定引用。\n- 或重新审视该 effect 是否真的需要这个依赖。\n\n结论：用 eslint-plugin-react-hooks 的 exhaustive-deps 规则提前发现。',
              },
              {
                title: 'Q16: useImperativeHandle 的作用？与 forwardRef 如何配合？',
                content: '作用：控制子组件通过 ref 暴露给父组件的接口，而非整个实例。\n\n配合 forwardRef：\n1. 子组件用 forwardRef 接收父组件传入的 ref。\n2. 用 useImperativeHandle 自定义 ref.current 的内容（只暴露指定方法）。\n\n典型场景：\n- 自定义 input 暴露 focus() 但不暴露内部 state。\n- 滚动组件暴露 scrollTo() 但隐藏实现。\n\n结论：useImperativeHandle 是"封装 + 受控暴露"，避免父组件直接操作子组件实例，保持组件边界。',
              },
              {
                title: 'Q17: Strict Mode 为什么会双调用？有什么用？',
                content: '现象：Strict Mode 下 effect 等会调用两次（挂载→卸载→再挂载）。\n\n目的：\n1. 检测副作用是否幂等——effect 应能多次执行不出错（如订阅/取消订阅配对）。\n2. 检测不安全的生命周期与废弃 API。\n3. 模拟并发模式下"渲染可中断恢复"的场景。\n\n应对：\n- effect 必须配 cleanup，保证副作用可逆。\n- 不要在 effect 中做不可逆操作（如发请求不取消）。\n\n注意：仅开发环境生效，生产构建不双调用。',
              },
              {
                title: 'Q18: 对比题——useReducer 和 useState 的取舍？',
                content: 'useState：\n- 适合简单独立状态（数字/字符串/布尔）。\n- API 简单，setX 直接赋值。\n\nuseReducer：\n- 适合多个相互关联状态、复杂更新逻辑。\n- 把更新逻辑收口到纯函数 reducer，可测试、可预测。\n- 便于抽取成自定义 Hook 复用。\n\n判断标准：\n1. 一个状态变化牵动其它状态 → useReducer。\n2. setState 散落多处难维护 → useReducer。\n3. 需集中测试更新逻辑 → useReducer。\n\n结论：简单用 useState，复杂联动用 useReducer。',
              },
              {
                title: 'Q19: 场景题——组件卸载后异步请求返回触发 setState 警告，如何处理？',
                content: '根因：异步请求未在卸载时取消，返回后仍 setState。\n\n修复方案：\n1. 标记变量——useEffect 内 let cancelled = false，resolve 后 if (!cancelled) setState，cleanup 返回 () => { cancelled = true }。\n2. AbortController——fetch(url, { signal })，cleanup 中 controller.abort()（更彻底，连请求都取消，还省带宽）。\n\n推荐方案 2。用 React Query 则自动处理卸载取消，无需手写。',
              },
              {
                title: 'Q20: React 19 的 ref as prop 是什么？为什么移除 forwardRef？',
                content: '变化：\n- React 19 中 ref 可作为普通 prop 直接传递（像 className），子组件直接从 props 解构 ref。\n- 不再需要 forwardRef 包装。\n\n为什么移除：\n- forwardRef 增加样板代码、类型推导复杂。\n- ref 作为普通 prop 更直观、更符合"props 即接口"理念。\n\n迁移：\n- 旧：const Comp = forwardRef((props, ref) => {...})。\n- 新：function Comp({ ref, ...props }) {...}。\n\n结论：减少样板，DX 提升。forwardRef 仍可用但不再是必需。',
              },
              {
                title: 'Q21: React Query 的核心概念有哪些？',
                content: '核心概念：\n1. Query Key：缓存标识（如 ["users", page]），同 key 复用缓存。\n2. useQuery：读取数据，自动缓存/后台刷新。\n3. useMutation：写操作，可失效/更新缓存。\n4. 失效策略：staleTime（多久变陈旧）、cacheTime（多久清理）。\n5. 后台刷新：窗口聚焦时自动刷新陈旧数据。\n6. 乐观更新：useMutation onMutate 先改缓存，失败回滚。\n\n结论：把"请求+缓存+ loading/error + 重试"封装成声明式 API，替代手写 useEffect+useState 取数据。',
              },
              {
                title: 'Q22: 对比题——Context、Zustand、Redux 的订阅粒度差异？',
                content: '订阅粒度：\n\n- Context：\n  - 值变化时所有消费者重渲染。\n  - 无精细订阅，高频状态会拖性能。\n\n- Zustand：\n  - 用 selector 按需订阅某个字段。\n  - 只有订阅的字段变化才重渲染。\n\n- Redux：\n  - useSelector 按需订阅。\n  - 配合 reselect 做 memoized selector。\n\n结论：低频全局数据用 Context，高频/需精细订阅用 Zustand 或 Redux。Context 不适合高频更新状态。',
              },
              {
                title: 'Q23: 场景题——首屏加载慢，从 React 角度如何优化？',
                content: '优化方向：\n1. 代码分割：路由级 React.lazy + Suspense，减小首屏 bundle。\n2. 预加载：关键路由 prefetch，非关键懒加载。\n3. SSR/SSG：服务端渲染或静态生成提升首屏（Next.js）。\n4. 减少 hydration：用 React Server Components 减少客户端 JS。\n5. 图片优化：响应式图片、懒加载、webp。\n6. 第三方库按需引入，避免全量打包。\n\n排查：用 Lighthouse 看首屏指标（LCP/FCP），用 bundle analyzer 看 JS 体积分布。',
              },
              {
                title: 'Q24: Diff 算法中 key 的作用？为什么不能用 index？',
                content: 'key 的作用：\n- 帮助 React 识别列表项身份，决定复用还是重建 DOM。\n\n用 index 的问题：\n1. 列表重排序/插入/删除时，index 与内容错位，React 按 key 错误复用 DOM。\n2. 输入框等带内部状态的 DOM 被错误复用，内容"串行"。\n3. 后续所有元素 index 变化，导致整列表重渲染。\n\n最佳实践：\n- 用稳定的唯一 id（数据库主键/uuid）。\n- 数据无 id 时在源头补 id（nanoid），不要用 Math.random()（每次变导致全重建）。\n\n结论：key 必须稳定且兄弟间唯一。',
              },
              {
                title: 'Q25: 场景题——如何为新项目选型状态管理方案？',
                content: '决策路径：\n1. 状态是否跨组件共享？否 → useState 组件内部。\n2. 是 → 跨多少层？少量层且低频 → Context + useReducer。\n3. 高频更新/需精细订阅 → Zustand（轻量、按需订阅）。\n4. 大型团队/需中间件/时间旅行/持久化 → Redux Toolkit。\n5. 原子化细粒度 → Jotai/Recoil。\n6. 服务端状态（API 数据）单列 → React Query/SWR，不要塞进全局状态。\n\n原则：避免"一把梭"全放 Redux，职责分离。',
              },
              {
                title: 'Q26: 虚拟 DOM 一定比直接操作 DOM 快吗？',
                content: '不一定。\n\n虚拟 DOM 的代价：\n1. 创建虚拟 DOM 树（JS 对象）。\n2. diff 比较新旧树。\n3. patch 真实 DOM。\n\n直接操作 DOM：\n- 跳过 1、2 步，直接 patch。\n- 在"精确知道改哪里"时更快。\n\n虚拟 DOM 的价值不在绝对速度，而在：\n1. 可维护性——声明式编程，不用手动操作 DOM。\n2. 跨平台——虚拟 DOM 可映射到原生/iOS/Android。\n3. 工程权衡——在"开发效率"与"运行性能"间取得平衡。\n\n结论：极致性能用直接 DOM（如游戏），通用 UI 用虚拟 DOM。',
              },
              {
                title: 'Q27: 对比题——CSR、SSR、SSG、ISR 的区别？',
                content: '四种渲染模式：\n\n- CSR（客户端渲染）：浏览器拉 JS 后渲染，首屏慢、SEO 差，交互好。\n- SSR（服务端渲染）：每次请求服务器生成 HTML，首屏快、SEO 好，服务器压力大。\n- SSG（静态生成）：构建时生成 HTML，最快、可 CDN，适合内容不变的博客/文档。\n- ISR（增量静态再生）：SSG + 按需后台再生成，兼顾静态速度与内容更新。\n\nNext.js 同时支持四种，按页面选型：\n1. 首页/营销用 SSG。\n2. 仪表盘用 CSR。\n3. 个性化用 SSR。\n4. 频繁更新用 ISR。',
              },
              {
                title: 'Q28: Server Components 和 Client Components 的区别？',
                content: 'Server Components（默认）：\n- 在服务器渲染，不能用 useState/useEffect/事件处理。\n- 可直接访问数据库和文件系统。\n- 零 bundle 体积。\n\nClient Components（"use client"）：\n- 在浏览器渲染，可使用所有 React 功能。\n- 具备交互能力。\n\n两者可在组件树中混合——服务器组件嵌套客户端组件作为"岛屿"。\n\n选型原则：尽量用 Server Component，只在需要交互/状态处加 "use client"。',
              },
              {
                title: 'Q29: 场景题——Profiler 显示某子组件频繁重渲染但 props 没变，如何排查？',
                content: '排查步骤：\n1. 确认子组件是否用了 React.memo——未包裹则父组件每次渲染都连坐。\n2. 检查 props 引用稳定性：\n   - 内联函数/对象每次新引用 → memo 失效。改用 useCallback/useMemo。\n   - children 是 JSX 每次新元素 → 改传原始数据。\n3. 检查 context 消费：子组件消费了 Context，Provider value 变化会触发重渲染。\n4. 用 why-did-you-render 插件打印精确原因。\n5. 检查 state 是否下放不足——顶层 state 变化牵动全树，应下放到使用处。\n\n结论：memo + 稳定引用 + 状态下放是避免连坐重渲染的三件套。',
              },
              {
                title: 'Q30: 手写一个 useMemo 的简化版？',
                content: '实现：\nlet memoized\nlet prevDeps\nfunction useMemo(factory, deps) {\n  const same = prevDeps && deps.every((d, i) => Object.is(d, prevDeps[i]))\n  if (!same) {\n    memoized = factory()\n    prevDeps = deps\n  }\n  return memoized\n}\n\n原理：\n- 用模块级变量缓存上次结果与依赖。\n- 依赖浅比较（Object.is），全部相等则返回缓存，否则重新计算。\n- 真实 React 用 Fiber 节点存每个 Hook 的缓存，支持多组件多 Hook 并存。\n\n说明：Hook 本质是"函数 + 闭包 + 调用顺序 + 依赖比较"。',
              },
              {
                title: 'Q31: React 19 的 Actions / useActionState 解决什么问题？',
                content: 'Actions 把表单提交统一为"异步函数处理"。\n\n核心 API：\n- useActionState：管理 action 的返回状态（成功/失败/数据）。\n- useFormStatus：在表单内部子组件读取 pending 状态（如提交按钮显示 loading）。\n\n解决的问题：\n1. 消除手写 pending/isLoading 状态、手动 try/catch、手动 disabled 按钮的样板代码。\n2. 配合 Server Actions 还能直接提交到服务端，无需写 API 端点。\n\n结论：这是 React 19 最大的 DX 提升之一。',
              },
              {
                title: 'Q32: 场景题——迁移到 React 18 需要注意什么？',
                content: '迁移注意点：\n1. 改用 createRoot：ReactDOM.createRoot(container).render(<App/>)，替代 ReactDOM.render。\n2. Strict Mode 双调用：检查 effect 的 cleanup 是否配对，副作用是否幂等。\n3. 自动批处理：旧代码若依赖"setState 立即同步刷新"，需用 flushSync 包裹。\n4. 并发特性按需启用：useTransition/Suspense 需主动使用，不 opt-in 不影响。\n5. 废弃 API：ReactDOM.render、unstable_renderSubtreeIntoContainer 等移除。\n6. 类型与第三方库升级到兼容 18 的版本。\n\n结论：渐进迁移，先 createRoot，再逐步用并发特性。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 21：React 进阶速查表
    // ========================================================================
    {
      order: 21,
      title: 'React 进阶速查表',
      difficulty: 1,
      blocks: [
        {
          id: 'p21-1',
          type: 'paragraph',
          text: 'React 进阶核心知识点速查表，快速回顾 Fiber、并发、性能、状态管理、Suspense 等关键概念。',
        },
        {
          id: 'p21-2',
          type: 'table',
          caption: 'React 进阶速查表',
          headers: ['知识点', '关键要点', '常用 API / 写法'],
          rows: [
            ['Fiber 架构', '可中断/可恢复渲染，双缓存 + Lane 优先级', 'createRoot / 时间切片'],
            ['Diff 三大假设', '不同类型重建/同类型复用/列表靠 key', 'key={item.id}'],
            ['自动批处理', '18 全上下文批处理 setState', 'flushSync（立即刷新）'],
            ['useTransition', '标记更新为非紧急，可中断', '[isPending, startTransition]'],
            ['useDeferredValue', '延迟读取某值，非紧急消费', 'const deferred = useDeferredValue(value)'],
            ['Suspense', '异步 fallback，配 ErrorBoundary', '<Suspense fallback={...}>'],
            ['React.lazy', '动态 import 代码分割', 'lazy(() => import("./X"))'],
            ['ErrorBoundary', '捕获渲染错误降级', 'getDerivedStateFromError / componentDidCatch'],
            ['React.memo', '浅比较 props 跳过渲染', 'memo(Comp) / areEqual'],
            ['useMemo', '缓存昂贵派生计算', 'useMemo(() => compute(a), [a])'],
            ['useCallback', '缓存函数引用，配 memo', 'useCallback(fn, [deps])'],
            ['useLayoutEffect', 'DOM 变更后同步执行，测布局', 'useLayoutEffect(fn, deps)'],
            ['useImperativeHandle', '受控暴露子组件方法给 ref', 'useImperativeHandle(ref, { focus })'],
            ['Strict Mode', '双调用检测副作用幂等', '<StrictMode>（仅开发）'],
            ['Zustand', '极简 store，按需订阅', 'create((set)=>({count:0}))'],
            ['Redux Toolkit', '单一 store + reducer + 中间件', 'configureStore / createSlice'],
            ['Jotai', '原子化细粒度状态', 'atom / useAtom'],
            ['React Query', '服务端状态缓存/失效/重试', 'useQuery(key, fn) / useMutation'],
            ['虚拟滚动', '只渲染可见区，治长列表', 'react-window / react-virtual'],
            ['Server Components', '服务端渲染零 bundle', '"use client" 标记客户端'],
            ['React 19 Actions', '表单异步处理统一', 'useActionState / useFormStatus'],
            ['ref as prop', 'ref 作普通 prop，免 forwardRef', 'function Comp({ ref }) {}'],
            ['选型原则', 'API 用 React Query/UI 用 Zustand/大型用 RTK', '职责分离'],
            ['性能排查', 'Profiler 定位 + 稳定引用 + 状态下放', 'React DevTools Profiler'],
          ],
        },
      ],
    },
  ],
}
