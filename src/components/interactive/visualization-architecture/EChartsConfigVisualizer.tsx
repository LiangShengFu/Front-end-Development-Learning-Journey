/**
 * EChartsConfigVisualizer — ECharts 配置切换可视化
 *
 * 展示 ECharts「配置驱动」开发模式：通过 option 对象描述图表，
 * 切换 series.type 即可渲染不同图表类型。
 *
 * 支持四种核心图表：柱状图 / 折线图 / 饼图 / 散点图
 * 交互：点击图表类型切换，左侧用 SVG 实时渲染图表，右侧展示对应 option 配置。
 *
 * ⚠️ 教学模拟：使用 SVG 模拟 ECharts 渲染，不依赖 echarts 库。
 */
import { useState } from 'react'
import type {
  EChartsConfigVisualizerData,
  EChartsTypeConfig,
  EChartsTypeId,
} from '../../../lib/visualization-architecture-visualization-types'
import { cn } from '../../../lib/utils'

interface EChartsConfigVisualizerProps {
  data?: EChartsConfigVisualizerData
}

/** 默认图表类型配置 */
const DEFAULT_TYPES: EChartsTypeConfig[] = [
  {
    id: 'bar',
    name: '柱状图',
    seriesType: 'bar',
    configSnippet: `const option = {
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五']
  },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',           // 🌟 柱状图
    data: [120, 200, 150, 80, 70],
    itemStyle: { color: '#1a6cff' },
    barWidth: '60%'
  }]
}`,
    useCase: '分类数据对比（销量/投票/排名），强调数值差异。',
    color: '#1a6cff',
  },
  {
    id: 'line',
    name: '折线图',
    seriesType: 'line',
    configSnippet: `const option = {
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五']
  },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',          // 🌟 折线图
    data: [120, 200, 150, 80, 70],
    smooth: true,          // 平滑曲线
    areaStyle: { opacity: 0.3 }, // 面积填充
    symbol: 'circle',
    symbolSize: 8
  }]
}`,
    useCase: '时间序列趋势（股价/气温/访问量），强调变化趋势。',
    color: '#07c160',
  },
  {
    id: 'pie',
    name: '饼图',
    seriesType: 'pie',
    configSnippet: `const option = {
  series: [{
    type: 'pie',           // 🌟 饼图
    radius: ['40%', '70%'], // 环形图
    data: [
      { value: 1048, name: '前端' },
      { value: 735, name: '后端' },
      { value: 580, name: '移动端' },
      { value: 484, name: '数据' },
      { value: 300, name: '运维' }
    ],
    label: { formatter: '{b}: {d}%' }
  }]
}`,
    useCase: '占比分布（市场份额/技术栈占比），强调比例关系。',
    color: '#f59e0b',
  },
  {
    id: 'scatter',
    name: '散点图',
    seriesType: 'scatter',
    configSnippet: `const option = {
  xAxis: { type: 'value', name: '体重(kg)' },
  yAxis: { type: 'value', name: '身高(cm)' },
  series: [{
    type: 'scatter',       // 🌟 散点图
    symbolSize: d => d[2], // 数据第三维控制大小
    data: [
      [55, 165, 12],
      [62, 170, 15],
      [70, 175, 18],
      [78, 180, 20],
      [85, 178, 16]
    ],
    itemStyle: { color: '#a78bfa' }
  }]
}`,
    useCase: '二维相关性分析（身高体重/学习时间与成绩），强调分布。',
    color: '#a78bfa',
  },
]

/** 模拟数据 */
const BAR_DATA = [
  { label: '周一', value: 120 },
  { label: '周二', value: 200 },
  { label: '周三', value: 150 },
  { label: '周四', value: 80 },
  { label: '周五', value: 70 },
]

const PIE_DATA = [
  { value: 1048, name: '前端' },
  { value: 735, name: '后端' },
  { value: 580, name: '移动端' },
  { value: 484, name: '数据' },
  { value: 300, name: '运维' },
]

const SCATTER_DATA = [
  [55, 165, 12],
  [62, 170, 15],
  [70, 175, 18],
  [78, 180, 20],
  [85, 178, 16],
]

const PIE_COLORS = ['#1a6cff', '#07c160', '#f59e0b', '#a78bfa', '#ec4899']

export function EChartsConfigVisualizer({ data }: EChartsConfigVisualizerProps) {
  const types = data?.types ?? DEFAULT_TYPES
  const configDrivenNote =
    data?.configDrivenNote ??
    'ECharts 核心理念：配置驱动。option 对象描述「画什么」，ECharts 内部决定「怎么画」。切换 series.type 即可改变图表类型，无需重写渲染逻辑。'

  const [selectedId, setSelectedId] = useState<EChartsTypeId>('bar')
  const selected = types.find((t) => t.id === selectedId)

  /** 渲染柱状图 */
  const renderBar = () => {
    const maxVal = Math.max(...BAR_DATA.map((d) => d.value))
    return (
      <svg width="100%" height={240} viewBox="0 0 320 240">
        {/* 坐标轴 */}
        <line x1={40} y1={20} x2={40} y2={200} stroke="#363a3f" strokeWidth={1} />
        <line x1={40} y1={200} x2={310} y2={200} stroke="#363a3f" strokeWidth={1} />
        {BAR_DATA.map((d, i) => {
          const h = (d.value / maxVal) * 160
          const x = 55 + i * 52
          return (
            <g key={i}>
              <rect x={x} y={200 - h} width={32} height={h} fill="#1a6cff" rx={2}>
                <animate attributeName="height" from="0" to={h} dur="0.5s" fill="freeze" />
                <animate attributeName="y" from="200" to={200 - h} dur="0.5s" fill="freeze" />
              </rect>
              <text x={x + 16} y={200 - h - 5} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#1a6cff">
                {d.value}
              </text>
              <text x={x + 16} y={215} textAnchor="middle" fontSize="10" fill="#7d8187">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  /** 渲染折线图 */
  const renderLine = () => {
    const maxVal = Math.max(...BAR_DATA.map((d) => d.value))
    const points = BAR_DATA.map((d, i) => {
      const x = 55 + i * 52 + 16
      const y = 200 - (d.value / maxVal) * 160
      return { x, y, value: d.value, label: d.label }
    })
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
    return (
      <svg width="100%" height={240} viewBox="0 0 320 240">
        <line x1={40} y1={20} x2={40} y2={200} stroke="#363a3f" strokeWidth={1} />
        <line x1={40} y1={200} x2={310} y2={200} stroke="#363a3f" strokeWidth={1} />
        <path d={path} fill="none" stroke="#07c160" strokeWidth={2}>
          <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="0.8s" fill="freeze" />
        </path>
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill="#07c160" />
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#07c160">
              {p.value}
            </text>
            <text x={p.x} y={215} textAnchor="middle" fontSize="10" fill="#7d8187">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  /** 渲染饼图 */
  const renderPie = () => {
    const total = PIE_DATA.reduce((s, d) => s + d.value, 0)
    let cumAngle = -Math.PI / 2
    const cx = 160
    const cy = 120
    const rOuter = 80
    const rInner = 45
    return (
      <svg width="100%" height={240} viewBox="0 0 320 240">
        {PIE_DATA.map((d, i) => {
          const angle = (d.value / total) * Math.PI * 2
          const startAngle = cumAngle
          const endAngle = cumAngle + angle
          cumAngle = endAngle
          const x1 = cx + rOuter * Math.cos(startAngle)
          const y1 = cy + rOuter * Math.sin(startAngle)
          const x2 = cx + rOuter * Math.cos(endAngle)
          const y2 = cy + rOuter * Math.sin(endAngle)
          const x3 = cx + rInner * Math.cos(endAngle)
          const y3 = cy + rInner * Math.sin(endAngle)
          const x4 = cx + rInner * Math.cos(startAngle)
          const y4 = cy + rInner * Math.sin(startAngle)
          const largeArc = angle > Math.PI ? 1 : 0
          const path = `M${x1},${y1} A${rOuter},${rOuter} 0 ${largeArc} 1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 ${largeArc} 0 ${x4},${y4} Z`
          const midAngle = (startAngle + endAngle) / 2
          const labelX = cx + (rOuter + 15) * Math.cos(midAngle)
          const labelY = cy + (rOuter + 15) * Math.sin(midAngle)
          return (
            <g key={i}>
              <path d={path} fill={PIE_COLORS[i]} opacity={0.9} stroke="white" strokeWidth={1} />
              <text x={labelX} y={labelY} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#dadbdf">
                {d.name}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  /** 渲染散点图 */
  const renderScatter = () => {
    const maxX = Math.max(...SCATTER_DATA.map((d) => d[0]))
    const maxY = Math.max(...SCATTER_DATA.map((d) => d[1]))
    return (
      <svg width="100%" height={240} viewBox="0 0 320 240">
        <line x1={40} y1={20} x2={40} y2={200} stroke="#363a3f" strokeWidth={1} />
        <line x1={40} y1={200} x2={310} y2={200} stroke="#363a3f" strokeWidth={1} />
        <text x={20} y={15} fontSize="9" fontFamily="monospace" fill="#7d8187">身高</text>
        <text x={300} y={215} fontSize="9" fontFamily="monospace" fill="#7d8187">体重</text>
        {SCATTER_DATA.map((d, i) => {
          const x = 40 + (d[0] / maxX) * 260
          const y = 200 - (d[1] / maxY) * 160
          const size = d[2]
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={size} fill="#a78bfa" opacity={0.6} stroke="#a78bfa" strokeWidth={1}>
                <animate attributeName="r" from="0" to={size} dur="0.4s" fill="freeze" />
              </circle>
              <text x={x + size + 2} y={y + 3} fontSize="9" fontFamily="monospace" fill="#a78bfa">
                {d[1]}cm
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="space-y-lg">
      {/* 配置驱动说明 */}
      <p className="rounded-sm bg-canvas-soft px-md py-sm text-caption text-body italic">
        {configDrivenNote}
      </p>

      {/* 图表类型切换 */}
      <div className="flex flex-wrap gap-xs">
        {types.map((type) => {
          const isActive = selectedId === type.id
          return (
            <button
              key={type.id}
              onClick={() => setSelectedId(type.id)}
              className={cn(
                'rounded-sm border px-md py-xs font-mono text-caption-mono-sm transition-all',
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-hairline bg-canvas-card text-ink hover:border-ink/30',
              )}
              style={isActive ? { backgroundColor: type.color } : undefined}
            >
              {type.name}
            </button>
          )
        })}
      </div>

      {/* 双栏：左 图表渲染 + 右 配置代码 */}
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {/* 图表渲染区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center justify-between">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              实时渲染
            </span>
            {selected && (
              <span
                className="rounded-pill px-sm py-xxs font-mono text-caption-mono-xs text-white"
                style={{ backgroundColor: selected.color }}
              >
                series.type: {selected.seriesType}
              </span>
            )}
          </div>
          <div className="rounded-sm border border-hairline bg-canvas p-sm">
            {selectedId === 'bar' && renderBar()}
            {selectedId === 'line' && renderLine()}
            {selectedId === 'pie' && renderPie()}
            {selectedId === 'scatter' && renderScatter()}
          </div>
          {selected && (
            <p className="mt-sm text-caption text-body">
              <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
                适用场景：
              </span>
              {selected.useCase}
            </p>
          )}
        </div>

        {/* 配置代码区 */}
        <div className="rounded-md border border-hairline bg-canvas-card p-md">
          <div className="mb-sm flex items-center gap-sm">
            <span className="font-mono text-caption-mono-xs uppercase tracking-[1.2px] text-body-mid">
              option 配置
            </span>
            <span className="rounded-pill bg-canvas-soft px-sm py-xxs font-mono text-caption-mono-xs text-ink">
              setOption(option)
            </span>
          </div>
          {selected && (
            <pre className="overflow-x-auto rounded-sm bg-ink px-md py-sm font-mono text-caption-mono-xs text-canvas">
              <code>{selected.configSnippet}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
