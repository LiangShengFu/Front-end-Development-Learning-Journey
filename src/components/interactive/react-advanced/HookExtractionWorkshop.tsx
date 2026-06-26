/**
 * HookExtractionWorkshop — 自定义 Hook 提取工作台
 *
 * 将组件内逻辑逐步提取为自定义 Hook（useDebounce / useLocalStorage / useFetch），
 * 展示提取前后的代码对比和实时操作结果。
 *
 * ⚠️ 教学验证：实时操作区代码不执行用户输入，仅展示预设 Hook 的行为模拟。
 *
 * 对应docx中演示 #7
 */
import { useEffect, useState } from 'react'
import type { HookExtractionWorkshopData, HookWorkshopTab } from '../../../lib/react-advanced-visualization-types'
import { CodeBlock } from '../../ui/CodeBlock'
import { cn } from '../../../lib/utils'

interface HookExtractionWorkshopProps {
  data?: HookExtractionWorkshopData
}

const DEFAULT_TABS: HookWorkshopTab[] = [
  {
    id: 'debounce',
    label: 'useDebounce',
    hookName: 'useDebounce',
    beforeCode: `// 提取前：防抖逻辑耦合在组件内
function SearchInput() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return <input value={value} onChange={e => setValue(e.target.value)} />;
}`,
    afterCode: `// 提取后：封装为 useDebounce Hook
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// 使用：逻辑复用，组件更简洁
function SearchInput() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}`,
    demoDescription: '在下方输入框输入文字，观察防抖后的值延迟 500ms 更新',
  },
  {
    id: 'localstorage',
    label: 'useLocalStorage',
    hookName: 'useLocalStorage',
    beforeCode: `// 提取前：localStorage 读写散落在组件中
function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
    {theme}
  </button>;
}`,
    afterCode: `// 提取后：封装为 useLocalStorage Hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 使用：任何需要持久化的状态都能复用
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
    {theme}
  </button>;
}`,
    demoDescription: '在下方输入框输入内容，刷新页面后数据依然保留（模拟 localStorage 持久化）',
  },
  {
    id: 'fetch',
    label: 'useFetch',
    hookName: 'useFetch',
    beforeCode: `// 提取前：数据获取三态管理散落在组件中
function UserProfile({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;
  return <div>{data.name}</div>;
}`,
    afterCode: `// 提取后：封装为 useFetch Hook
function useFetch(url) {
  const [state, setState] = useState({
    data: null, loading: true, error: null,
  });

  useEffect(() => {
    setState(s => ({ ...s, loading: true, error: null }));
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }));
  }, [url]);

  return state;
}

// 使用：三态管理集中复用
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(\`/api/users/\${userId}\`);
  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;
  return <div>{data.name}</div>;
}`,
    demoDescription: '点击下方按钮模拟数据获取，观察 loading → success 三态切换',
  },
]

export function HookExtractionWorkshop({ data }: HookExtractionWorkshopProps) {
  const tabs = data?.tabs ?? DEFAULT_TABS
  const [activeTab, setActiveTab] = useState(0)
  const [view, setView] = useState<'before' | 'after'>('after')
  const tab = tabs[activeTab]

  return (
    <div className="rounded-sm border border-hairline bg-canvas-card p-xl">
      {/* 标签页切换 */}
      <div className="mb-xl flex flex-wrap gap-sm">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => { setActiveTab(i); setView('after') }}
            className={cn(
              'rounded-pill border px-md py-xs font-mono text-caption-mono-sm transition-colors',
              activeTab === i
                ? 'border-accent-sunset bg-accent-sunset text-on-primary'
                : 'border-hairline bg-canvas-soft text-body-mid hover:border-white/30',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 视图切换：提取前 / 提取后 */}
      <div className="mb-lg flex gap-xs rounded-sm border border-hairline p-xs">
        <button
          type="button"
          onClick={() => setView('before')}
          className={cn(
            'flex-1 rounded-sm px-md py-xs font-mono text-caption-mono-sm transition-colors',
            view === 'before' ? 'bg-red-500/20 text-red-500' : 'text-body-mid hover:text-ink',
          )}
        >
          提取前（逻辑耦合）
        </button>
        <button
          type="button"
          onClick={() => setView('after')}
          className={cn(
            'flex-1 rounded-sm px-md py-xs font-mono text-caption-mono-sm transition-colors',
            view === 'after' ? 'bg-accent-dusk/20 text-accent-dusk' : 'text-body-mid hover:text-ink',
          )}
        >
          提取后（Hook 封装）
        </button>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_320px]">
        {/* 代码视图 */}
        <div>
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-body-mid">
            {view === 'before' ? '提取前代码' : `提取后代码（${tab.hookName}）`}
          </div>
          <CodeBlock
            code={view === 'before' ? tab.beforeCode : tab.afterCode}
            language="javascript"
          />
        </div>

        {/* 实时操作区 */}
        <div className="rounded-sm border border-hairline bg-canvas-soft p-lg">
          <div className="mb-sm font-mono text-caption-mono-sm uppercase tracking-[1.2px] text-accent-sunset">
            实时操作演示
          </div>
          <p className="mb-md text-caption-mono-sm text-body-mid">{tab.demoDescription}</p>

          {tab.id === 'debounce' && <DebounceDemo />}
          {tab.id === 'localstorage' && <LocalStorageDemo />}
          {tab.id === 'fetch' && <FetchDemo />}
        </div>
      </div>

      {/* 教学提示 */}
      <div className="mt-xl rounded-sm border border-yellow-500/20 bg-yellow-500/5 p-md">
        <p className="text-caption-mono-sm text-body-mid">
          ⚠️ 教学验证：实时操作区为预设 Hook 的行为模拟，不执行用户输入的代码。
        </p>
      </div>
    </div>
  )
}

/** useDebounce 实时演示 */
function DebounceDemo() {
  const [value, setValue] = useState('')
  const [debounced, setDebounced] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), 500)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="space-y-md">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入文字..."
        className="w-full rounded-sm border border-hairline bg-canvas px-md py-xs text-body-sm text-ink outline-none focus:border-accent-sunset/40"
      />
      <div className="space-y-xs">
        <div className="font-mono text-caption-mono-sm text-body-mid">实时值</div>
        <div className="rounded-sm border border-hairline bg-canvas px-md py-sm font-mono text-caption-mono text-ink">
          {value || '(空)'}
        </div>
        <div className="font-mono text-caption-mono-sm text-body-mid">防抖值（500ms 延迟）</div>
        <div className="rounded-sm border border-accent-sunset/40 bg-accent-sunset/5 px-md py-sm font-mono text-caption-mono text-accent-sunset">
          {debounced || '(空)'}
        </div>
      </div>
    </div>
  )
}

/** useLocalStorage 实时演示 */
function LocalStorageDemo() {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem('demo-hook-value') || ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('demo-hook-value', value)
    } catch {
      // 忽略存储错误
    }
  }, [value])

  return (
    <div className="space-y-md">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入会自动保存..."
        className="w-full rounded-sm border border-hairline bg-canvas px-md py-xs text-body-sm text-ink outline-none focus:border-accent-sunset/40"
      />
      <div className="rounded-sm border border-accent-dusk/40 bg-accent-dusk/5 p-md">
        <div className="font-mono text-caption-mono-sm text-accent-dusk">localStorage 已持久化</div>
        <div className="mt-xs font-mono text-caption-mono-sm text-body-mid">
          刷新页面后此值仍保留（key: demo-hook-value）
        </div>
      </div>
    </div>
  )
}

/** useFetch 实时演示 */
function FetchDemo() {
  const [state, setState] = useState<{ data: string | null; loading: boolean; error: string | null }>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchMock = () => {
    setState({ data: null, loading: true, error: null })
    setTimeout(() => {
      if (Math.random() > 0.2) {
        setState({ data: '{ "id": 1, "name": "张三", "role": "admin" }', loading: false, error: null })
      } else {
        setState({ data: null, loading: false, error: 'Network Error: 请求超时' })
      }
    }, 1200)
  }

  return (
    <div className="space-y-md">
      <button type="button" onClick={fetchMock} disabled={state.loading} className="btn-pill w-full">
        {state.loading ? '加载中...' : '模拟 fetch 请求'}
      </button>
      <div className="space-y-xs">
        <div className="flex items-center gap-sm font-mono text-caption-mono-sm">
          <span className={cn('h-2 w-2 rounded-full', state.loading ? 'bg-accent-sunset animate-pulse' : state.error ? 'bg-red-500' : state.data ? 'bg-accent-dusk' : 'bg-canvas-mid')} />
          <span className="text-body-mid">
            {state.loading ? 'loading' : state.error ? 'error' : state.data ? 'success' : 'idle'}
          </span>
        </div>
        {state.data && (
          <pre className="overflow-x-auto rounded-sm bg-canvas p-md font-mono text-caption-mono-sm text-accent-dusk">{state.data}</pre>
        )}
        {state.error && (
          <div className="rounded-sm border border-red-500/30 bg-red-500/5 p-md font-mono text-caption-mono-sm text-red-500">
            {state.error}
          </div>
        )}
      </div>
    </div>
  )
}
