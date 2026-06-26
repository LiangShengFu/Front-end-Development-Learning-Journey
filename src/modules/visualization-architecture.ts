/**
 * 模块 20：数据可视化与前端架构设计模式
 *
 * 严格遵循 docx/模块二十.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 14 个知识点（2 大主题各 7 章，含速查与小测验）
 * - 5 个新增可视化与架构专属组件（位于 components/interactive/visualization-architecture/）
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard / CodeBlock
 * - 跨模块复用模块十九 DebounceThrottleVisualizer（Canvas 动画演示视角）
 * - 跨模块复用模块十八 ComponentTestPlayground（设计模式测试视角）
 *
 * 章节映射：
 * - 主题一·数据可视化（#1-#8）：总览图谱 / Canvas / SVG / D3 / ECharts / Three.js / 方案选型 / 速查
 * - 主题二·前端架构（#9-#14）：架构图谱 / 组件模式 / 状态与 CSS 架构 / 分层与 SOLID / 跨模块复用 / 速查与小测验
 *
 * 所有交互均为教学模拟，Canvas/ECharts 渲染均为本地实现，不依赖外部库。
 */
import type { ModuleMeta } from '../lib/types'

export const visualizationArchitectureModule: ModuleMeta = {
  number: '20',
  title: '数据可视化与前端架构设计模式',
  slug: 'visualization-architecture',
  stage: 'advanced',
  stageLabel: '高级专项 · 第 2 模块',
  icon: '20',
  summary:
    'Canvas/SVG/D3/ECharts/Three.js 数据可视化方案选型，Container/HOC/Render Props/Hooks/Compound 组件设计模式，Redux/Zustand/Signals 状态管理，BEM/SMACSS/CSS Modules/Tailwind CSS 架构，Feature-Sliced Design/Monorepo 分层，SOLID 设计原则。',
  knowledgePointCount: 14,
  visualizationCount: 13,
  points: [
    // ========================================================================
    // 主题一 · 数据可视化
    // ========================================================================

    // 知识点 1：数据可视化总览知识图谱
    {
      order: 1,
      title: '数据可视化总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'va-p1-1',
          type: 'paragraph',
          lead: true,
          text: '数据可视化是前端进阶的核心能力域。从像素级 Canvas 绘图到矢量 SVG，从声明式 D3 数据绑定到配置驱动的 ECharts，再到 3D 的 Three.js/WebGL，每套方案都有其适用场景。模块二十主题一串联六大可视化方案，建立完整的技术选型视角。',
        },
        {
          id: 'va-p1-2',
          type: 'paragraph',
          text: '下方知识图谱展示数据可视化技术栈的核心节点与关联。低数据量交互图表首选 SVG，大数据量热力图首选 Canvas，业务报表首选 ECharts，定制化可视化首选 D3，3D 场景首选 Three.js/WebGL。',
        },
        {
          id: 'va-p1-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'viz', label: '数据可视化', group: 'core', weight: 3 },
              { id: 'canvas', label: 'Canvas', group: 'raster', weight: 2 },
              { id: 'svg', label: 'SVG', group: 'raster', weight: 2 },
              { id: 'd3', label: 'D3.js', group: 'lib', weight: 2 },
              { id: 'echarts', label: 'ECharts', group: 'lib', weight: 2 },
              { id: 'three', label: 'Three.js', group: '3d', weight: 2 },
              { id: 'webgpu', label: 'WebGPU', group: '3d' },
              { id: 'selection', label: '方案选型', group: 'core' },
            ],
            edges: [
              { source: 'viz', target: 'canvas', label: '像素位图' },
              { source: 'viz', target: 'svg', label: '矢量 DOM' },
              { source: 'viz', target: 'd3', label: '数据绑定' },
              { source: 'viz', target: 'echarts', label: '配置驱动' },
              { source: 'viz', target: 'three', label: '3D 场景' },
              { source: 'three', target: 'webgpu', label: '下一代' },
              { source: 'viz', target: 'selection', label: '选型决策' },
              { source: 'canvas', target: 'selection', label: '>1000 节点' },
              { source: 'svg', target: 'selection', label: '<1000 交互' },
              { source: 'echarts', target: 'selection', label: '业务报表' },
              { source: 'd3', target: 'selection', label: '定制化' },
            ],
          },
        },
        {
          id: 'va-p1-4',
          type: 'callout',
          variant: 'tip',
          title: '学习路径',
          text: '建议按「Canvas 像素绘图 → SVG 矢量交互 → D3 数据绑定 → ECharts 配置驱动 → Three.js 3D → 方案选型」顺序学习。Canvas/SVG 是底层基础，D3/ECharts 是工程化封装，Three.js 是 3D 进阶，选型对比是收尾决策。',
        },
      ],
    },

    // 知识点 2：Canvas API
    {
      order: 2,
      title: 'Canvas API 2D 绘图',
      difficulty: 2,
      isNew: true,
      visualizationType: 'canvas-playground',
      blocks: [
        {
          id: 'va-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'Canvas 是 HTML5 提供的像素级位图绘图 API，通过 getContext(\'2d\') 获取 2D 上下文，使用 fillRect/arc/beginPath/fillText 等方法绘制图形。Canvas 是「立即模式」渲染：JS 绘制后变为像素，无 DOM 结构。',
        },
        {
          id: 'va-p2-2',
          type: 'paragraph',
          text: '点击下方图形类型切换（矩形/圆形/路径/文本/动画），左侧实时绘制对应图形，右侧展示代码示例。注意 Retina 屏需高 DPI 处理（devicePixelRatio 缩放），动画需 requestAnimationFrame 循环。',
        },
        {
          id: 'va-p3-3',
          type: 'demo',
          visualizationType: 'canvas-playground',
          data: {},
        },
        {
          id: 'va-p2-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 高 DPI 与动画性能',
          text: '高 DPI 处理：canvas.width = cssWidth * devicePixelRatio，再 ctx.scale(dpr, dpr)，否则 Retina 屏模糊。动画性能：requestAnimationFrame 在每次重绘前调用回调（约 60fps），配合 clearRect 清屏 + save/restore 状态变换，避免状态污染。',
        },
        {
          id: 'va-p2-5',
          type: 'code',
          code: `// Canvas 高 DPI 处理 + 基础绘图
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 1. 高 DPI 处理（避免 Retina 屏模糊）
const dpr = window.devicePixelRatio || 1
const rect = canvas.getBoundingClientRect()
canvas.width = rect.width * dpr
canvas.height = rect.height * dpr
ctx.scale(dpr, dpr) // 缩放上下文

// 2. 绘制矩形
ctx.fillStyle = '#1a6cff'
ctx.fillRect(10, 10, 100, 50)

// 3. 绘制圆形
ctx.beginPath()
ctx.arc(80, 100, 30, 0, Math.PI * 2)
ctx.fill()

// 4. 绘制路径（三角形）
ctx.beginPath()
ctx.moveTo(150, 20)
ctx.lineTo(200, 100)
ctx.lineTo(100, 100)
ctx.closePath()
ctx.stroke()

// 5. requestAnimationFrame 动画
let x = 0
function tick() {
  ctx.clearRect(0, 0, rect.width, rect.height)
  ctx.fillStyle = '#f59e0b'
  ctx.beginPath()
  ctx.arc(x, rect.height / 2, 20, 0, Math.PI * 2)
  ctx.fill()
  x = (x + 2) % rect.width
  requestAnimationFrame(tick)
}
tick()`,
          language: 'js',
          filename: 'canvas-2d-drawing.js',
        },
      ],
    },

    // 知识点 3：SVG 矢量图形
    {
      order: 3,
      title: 'SVG 矢量图形与 Canvas 对比',
      difficulty: 2,
      isNew: true,
      visualizationType: 'svg-vs-canvas-compare',
      blocks: [
        {
          id: 'va-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'SVG（Scalable Vector Graphics）是基于 XML 的矢量图形格式，每个图形是独立 DOM 节点，可绑定事件、可被搜索引擎索引、矢量无损缩放。与 Canvas 的「立即模式」不同，SVG 是「保留模式」。',
        },
        {
          id: 'va-p3-2',
          type: 'paragraph',
          text: '下方双栏对比 SVG 与 Canvas 的渲染差异。拖动图形数量滑块，观察 SVG 节点增多时的性能下降（>1000 节点卡顿），而 Canvas 仍保持流畅。点击特性按钮查看渲染/DOM/事件/性能/缩放/场景六大维度对比。',
        },
        {
          id: 'va-p3-3',
          type: 'demo',
          visualizationType: 'svg-vs-canvas-compare',
          data: {},
        },
        {
          id: 'va-p3-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 选型决策',
          text: 'SVG 适合：图标、图表、地图、可交互图形（<1000 节点）。Canvas 适合：游戏、热力图、粒子、图像处理（>1000 节点）。核心差异：SVG 保留 DOM 可交互，Canvas 立即模式高性能但需命中检测。',
        },
        {
          id: 'va-p3-5',
          type: 'code',
          code: `<!-- SVG：每个图形是 DOM 节点，可绑定事件 -->
<svg width="200" height="100">
  <circle cx="50" cy="50" r="30" fill="#1a6cff"
          onclick="alert('点击了圆')" />
  <rect x="100" y="20" width="60" height="60"
        fill="#07c160" class="shape" />
</svg>

// Canvas：单一 canvas 元素，需命中检测
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 绘制圆
ctx.beginPath()
ctx.arc(50, 50, 30, 0, Math.PI * 2)
ctx.fill()

// 命中检测（点击是否在圆内）
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const dist = Math.hypot(x - 50, y - 50)
  if (dist <= 30) alert('点击了圆')
})`,
          language: 'html',
          filename: 'svg-vs-canvas.html',
        },
      ],
    },

    // 知识点 4：D3.js 数据绑定
    {
      order: 4,
      title: 'D3.js 数据绑定与三态模式',
      difficulty: 3,
      isNew: true,
      visualizationType: 'd3-data-binding-flow',
      blocks: [
        {
          id: 'va-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'D3.js（Data-Driven Documents）是数据驱动文档的可视化库，核心思想是「数据绑定」：将数据数组绑定到 DOM 选择集，通过 enter/update/exit 三态模式实现数据与 DOM 的同步。',
        },
        {
          id: 'va-p4-2',
          type: 'paragraph',
          text: '点击下方「增加/减少/更新」按钮，观察数据集与 DOM 集的差异。绿色为 enter（新增）、蓝色为 update（更新）、红色为 exit（移除）。三态覆盖数据与 DOM 同步的所有情况，是 D3 的精髓。',
        },
        {
          id: 'va-p4-3',
          type: 'demo',
          visualizationType: 'd3-data-binding-flow',
          data: {},
        },
        {
          id: 'va-p4-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 三态核心',
          text: '.data(data) 返回 update 选择集（数据已绑定到 DOM）；.enter() 返回 enter 选择集（数据多于 DOM，需新增）；.exit() 返回 exit 选择集（DOM 多于数据，需移除）。.merge(update) 可合并 enter 与 update 统一处理。',
        },
        {
          id: 'va-p4-5',
          type: 'code',
          code: `// D3 数据绑定三态模式
const svg = d3.select('svg')
const data = [10, 25, 18, 32, 15] // 数据集

// 1. 数据绑定：返回 update 选择集
const update = svg.selectAll('rect')
  .data(data)

// 2. enter 选择集：数据多于 DOM，追加新元素
const enter = update.enter()
  .append('rect')
  .attr('y', (d, i) => i * 25)
  .attr('width', 0) // 初始宽度 0

// 3. 合并 enter 与 update，统一过渡
update.merge(enter)
  .transition()
  .duration(500)
  .attr('width', d => d * 10) // 过渡到目标宽度
  .attr('fill', '#1a6cff')

// 4. exit 选择集：DOM 多于数据，移除
update.exit()
  .transition()
  .attr('width', 0) // 先收缩
  .remove() // 再移除`,
          language: 'js',
          filename: 'd3-data-binding.js',
        },
      ],
    },

    // 知识点 5：ECharts 配置驱动
    {
      order: 5,
      title: 'ECharts 配置驱动开发',
      difficulty: 2,
      isNew: true,
      visualizationType: 'echarts-config-visualizer',
      blocks: [
        {
          id: 'va-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'ECharts 是百度开源的数据可视化库，核心思想是「配置驱动」：通过 option 对象描述「画什么」，ECharts 内部决定「怎么画」。切换 series.type 即可改变图表类型，无需重写渲染逻辑。',
        },
        {
          id: 'va-p5-2',
          type: 'paragraph',
          text: '点击下方图表类型切换（柱状图/折线图/饼图/散点图），左侧实时渲染对应图表，右侧展示 option 配置。注意 ECharts 适合业务报表快速开发，大数据量时需开启 large 模式或使用 dataZoom。',
        },
        {
          id: 'va-p5-3',
          type: 'demo',
          visualizationType: 'echarts-config-visualizer',
          data: {},
        },
        {
          id: 'va-p5-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 大数据量优化',
          text: '大数据量优化：1) series.large = true 开启大规模渲染模式；2) 使用 dataZoom 缩放；3) 使用 dataset 复用数据；4) sampling 降采样（\'lttb\'/\'average\'）；5) lazyUpdate 延迟更新。ECharts 5+ 性能显著提升。',
        },
        {
          id: 'va-p5-5',
          type: 'code',
          code: `// ECharts 配置驱动开发
import * as echarts from 'echarts'

const chart = echarts.init(document.getElementById('chart'))

// option 对象描述「画什么」
const option = {
  title: { text: '销售数据' },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五']
  },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar', // 🌟 切换 type 即改变图表类型
    data: [120, 200, 150, 80, 70],
    itemStyle: { color: '#1a6cff' },
    // 大数据量优化
    large: true,
    largeThreshold: 2000
  }]
}

chart.setOption(option)

// 响应式：监听窗口 resize
window.addEventListener('resize', () => chart.resize())`,
          language: 'js',
          filename: 'echarts-config.js',
        },
      ],
    },

    // 知识点 6：Three.js 与 WebGL
    {
      order: 6,
      title: 'Three.js 与 WebGL 3D 可视化',
      difficulty: 3,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'va-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Three.js 是基于 WebGL 的 3D 图形库，封装了场景（Scene）、相机（Camera）、渲染器（Renderer）、几何体（Geometry）、材质（Material）、灯光（Light）等核心概念，让 3D 开发像搭积木一样简单。',
        },
        {
          id: 'va-p6-2',
          type: 'paragraph',
          text: 'WebGL 是基于 OpenGL ES 的浏览器 3D API，直接操作 GPU。WebGPU 是下一代图形 API，提供更现代的接口与计算着色器支持，未来将逐步取代 WebGL。下方知识图谱展示 Three.js 的核心概念关联。',
        },
        {
          id: 'va-p6-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'three', label: 'Three.js', group: 'core', weight: 3 },
              { id: 'scene', label: 'Scene', group: 'core', weight: 2 },
              { id: 'camera', label: 'Camera', group: 'core', weight: 2 },
              { id: 'renderer', label: 'Renderer', group: 'core', weight: 2 },
              { id: 'geometry', label: 'Geometry', group: 'obj' },
              { id: 'material', label: 'Material', group: 'obj' },
              { id: 'light', label: 'Light', group: 'obj' },
              { id: 'mesh', label: 'Mesh', group: 'obj' },
              { id: 'webgl', label: 'WebGL', group: 'api', weight: 2 },
              { id: 'webgpu', label: 'WebGPU', group: 'api', weight: 2 },
            ],
            edges: [
              { source: 'three', target: 'scene', label: '场景容器' },
              { source: 'three', target: 'camera', label: '视角' },
              { source: 'three', target: 'renderer', label: '渲染' },
              { source: 'scene', target: 'mesh', label: '包含' },
              { source: 'mesh', target: 'geometry', label: '形状' },
              { source: 'mesh', target: 'material', label: '材质' },
              { source: 'scene', target: 'light', label: '光照' },
              { source: 'renderer', target: 'webgl', label: '底层' },
              { source: 'webgl', target: 'webgpu', label: '演进' },
            ],
          },
        },
        {
          id: 'va-p6-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 WebGPU 展望',
          text: 'WebGPU 是下一代 Web 图形 API：1) 更现代的接口（基于 Vulkan/Metal/D3D12）；2) 计算着色器支持通用 GPU 计算；3) 更细粒度的资源管理；4) 性能优于 WebGL。Chrome 113+ 已支持，Three.js r158+ 提供 WebGPURenderer。',
        },
        {
          id: 'va-p6-5',
          type: 'code',
          code: `// Three.js 3D 场景基础
import * as THREE from 'three'

// 1. 场景（容器）
const scene = new THREE.Scene()

// 2. 相机（视角）
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
)
camera.position.z = 5

// 3. 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 4. 几何体 + 材质 = 网格
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x1a6cff })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 5. 灯光（MeshStandardMaterial 需要）
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(1, 1, 1)
scene.add(light)

// 6. 动画循环
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()`,
          language: 'js',
          filename: 'threejs-scene.js',
        },
      ],
    },

    // 知识点 7：可视化方案选型对比
    {
      order: 7,
      title: '可视化方案选型对比',
      difficulty: 2,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'va-p7-1',
          type: 'paragraph',
          lead: true,
          text: '面对数据可视化需求，如何选型？核心考量：数据量级、交互需求、定制化程度、3D 需求、团队熟悉度。下方对比表汇总 7 种主流方案的渲染方式、性能、学习曲线与适用场景，是技术选型的核心参考。',
        },
        {
          id: 'va-p7-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '方案',
            columns: ['渲染方式', '性能', '学习曲线', '适用场景'],
            rows: [
              {
                feature: 'Canvas API',
                values: ['位图（立即模式）', '★★★★★ 大数据量优', '★★★★ 陡峭', '游戏、热力图、粒子、图像处理'],
              },
              {
                feature: 'SVG',
                values: ['矢量（保留模式 DOM）', '★★★ 小数据量优', '★★★ 中等', '图标、图表、地图、可交互图形'],
              },
              {
                feature: 'D3.js',
                values: ['SVG/Canvas 混合', '★★★ 取决于渲染后端', '★ 最陡峭', '定制化可视化、数据驱动文档'],
              },
              {
                feature: 'ECharts',
                values: ['Canvas/SVG（可切换）', '★★★★ 优化好', '★★ 平缓', '业务报表、仪表盘、商业图表'],
              },
              {
                feature: 'Chart.js',
                values: ['Canvas', '★★★ 中等', '★ 最平缓', '简单图表、快速原型、轻量场景'],
              },
              {
                feature: 'Three.js',
                values: ['WebGL/WebGPU', '★★★★★ GPU 加速', '★★★ 中等', '3D 场景、数据立方体、AR/VR'],
              },
              {
                feature: 'AntV G2',
                values: ['Canvas/SVG', '★★★★ 优化好', '★★ 平缓', '阿里系业务、统计图表、可视化分析'],
              },
            ],
          },
        },
        {
          id: 'va-p7-3',
          type: 'callout',
          variant: 'tip',
          title: '🌟 选型决策树',
          text: '决策路径：1) 3D 场景？→ Three.js；2) 业务报表？→ ECharts/AntV G2；3) 大数据量（>10000）？→ Canvas/ECharts large；4) 高度定制化？→ D3.js；5) 简单图表？→ Chart.js；6) 可交互矢量图？→ SVG。',
        },
      ],
    },

    // 知识点 8：数据可视化速查表
    {
      order: 8,
      title: '数据可视化知识点速查',
      difficulty: 1,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'va-p8-1',
          type: 'paragraph',
          lead: true,
          text: '数据可视化核心知识点速查表，覆盖 Canvas/SVG/D3/ECharts/Three.js 五大方案的关键 API、性能要点与选型建议。点击展开查看详情。',
        },
        {
          id: 'va-p8-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: 'Canvas 核心 API 速查',
                content:
                  'fillRect/strokeRect（矩形）、arc（圆形）、beginPath/moveTo/lineTo/closePath（路径）、fillText/strokeText（文本）、drawImage（图像）、save/restore（状态栈）、clearRect（清屏）、scale/translate/rotate（变换）。高 DPI：canvas.width = cssWidth * dpr + ctx.scale(dpr, dpr)。',
              },
              {
                title: 'SVG 优势与适用场景',
                content:
                  '矢量无损缩放、每个图形是 DOM 节点可绑定事件、可被搜索引擎索引、可 CSS 样式化。适合 <1000 节点的交互图表。缺点：节点多时性能下降，不适合频繁动画。',
              },
              {
                title: 'D3 数据绑定三态',
                content:
                  '.data(data) 返回 update 选择集（数据已绑定 DOM）；.enter() 返回 enter 选择集（数据多于 DOM，需 append）；.exit() 返回 exit 选择集（DOM 多于数据，需 remove）。.merge(update) 合并统一处理。比例尺：scaleLinear/scaleBand/scaleOrdinal。坐标轴：axisBottom/axisLeft。',
              },
              {
                title: 'ECharts 配置驱动核心',
                content:
                  'option 对象描述图表：title/tooltip/legend/xAxis/yAxis/series。series.type 决定图表类型（bar/line/pie/scatter/radar/heatmap）。setOption(option) 渲染。大数据量优化：large/largeThreshold/dataZoom/sampling/lazyUpdate。主题：echarts.registerTheme。',
              },
              {
                title: 'Three.js 核心概念',
                content:
                  'Scene（场景容器）、Camera（相机：PerspectiveCamera/OrthographicCamera）、Renderer（渲染器：WebGLRenderer/WebGPURenderer）、Geometry（几何体）、Material（材质：Basic/Standard/Physical）、Mesh（网格=几何体+材质）、Light（灯光：Directional/Point/Ambient）。动画循环：requestAnimationFrame + render。',
              },
              {
                title: 'WebGL vs WebGPU',
                content:
                  'WebGL：基于 OpenGL ES 2.0/3.0，着色器语言 GLSL，状态机模型。WebGPU：基于 Vulkan/Metal/D3D12，着色器语言 WGSL，显式资源管理，支持计算着色器。WebGPU 性能更优、接口更现代，Chrome 113+ 支持，是未来方向。',
              },
              {
                title: '方案选型决策要点',
                content:
                  '数据量级（<1000 SVG，>10000 Canvas）、交互需求（SVG 原生事件，Canvas 命中检测）、定制化程度（ECharts 配置，D3 灵活）、3D 需求（Three.js）、团队熟悉度（ECharts 上手快，D3 学习曲线陡）。业务报表首选 ECharts，定制化首选 D3。',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 主题二 · 前端架构与设计模式
    // ========================================================================

    // 知识点 9：前端架构总览知识图谱
    {
      order: 9,
      title: '前端架构总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'va-p9-1',
          type: 'paragraph',
          lead: true,
          text: '前端架构是大型项目的工程化基石。模块二十主题二从组件设计模式、状态管理、CSS 架构、分层架构、设计原则五个维度，建立完整的前端架构视角，是前端进阶与中高级面试的核心内容。',
        },
        {
          id: 'va-p9-2',
          type: 'paragraph',
          text: '下方知识图谱展示前端架构的核心主题与关联。组件模式解决「复用」，状态管理解决「数据流」，CSS 架构解决「样式组织」，分层架构解决「项目结构」，设计原则解决「代码质量」。',
        },
        {
          id: 'va-p9-3',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'arch', label: '前端架构', group: 'core', weight: 3 },
              { id: 'pattern', label: '组件模式', group: 'pattern', weight: 2 },
              { id: 'state', label: '状态管理', group: 'state', weight: 2 },
              { id: 'css', label: 'CSS 架构', group: 'css', weight: 2 },
              { id: 'layer', label: '分层架构', group: 'layer', weight: 2 },
              { id: 'principle', label: '设计原则', group: 'principle', weight: 2 },
              { id: 'hoc', label: 'HOC', group: 'pattern' },
              { id: 'hooks', label: 'Hooks', group: 'pattern' },
              { id: 'redux', label: 'Redux', group: 'state' },
              { id: 'signals', label: 'Signals', group: 'state' },
              { id: 'bem', label: 'BEM', group: 'css' },
              { id: 'tailwind', label: 'Tailwind', group: 'css' },
              { id: 'fsd', label: 'FSD', group: 'layer' },
              { id: 'monorepo', label: 'Monorepo', group: 'layer' },
              { id: 'solid', label: 'SOLID', group: 'principle' },
            ],
            edges: [
              { source: 'arch', target: 'pattern', label: '组件复用' },
              { source: 'arch', target: 'state', label: '数据流' },
              { source: 'arch', target: 'css', label: '样式组织' },
              { source: 'arch', target: 'layer', label: '项目结构' },
              { source: 'arch', target: 'principle', label: '代码质量' },
              { source: 'pattern', target: 'hoc', label: '历史方案' },
              { source: 'pattern', target: 'hooks', label: '现代推荐' },
              { source: 'state', target: 'redux', label: '全局 Store' },
              { source: 'state', target: 'signals', label: '细粒度' },
              { source: 'css', target: 'bem', label: '方法论' },
              { source: 'css', target: 'tailwind', label: '原子化' },
              { source: 'layer', target: 'fsd', label: '分层' },
              { source: 'layer', target: 'monorepo', label: '多包' },
              { source: 'principle', target: 'solid', label: '五大原则' },
            ],
          },
        },
        {
          id: 'va-p9-4',
          type: 'callout',
          variant: 'tip',
          title: '学习路径',
          text: '建议按「组件设计模式 → 状态管理 → CSS 架构 → 分层架构 → 设计原则」顺序学习。组件模式是基础（解决复用），状态管理是核心（解决数据流），CSS/分层是工程化（解决组织），设计原则是收尾（解决质量）。',
        },
      ],
    },

    // 知识点 10：组件设计模式
    {
      order: 10,
      title: '组件设计模式',
      difficulty: 3,
      isNew: true,
      visualizationType: 'design-pattern-showcase',
      blocks: [
        {
          id: 'va-p10-1',
          type: 'paragraph',
          lead: true,
          text: '组件设计模式解决「逻辑复用」问题。从早期的 HOC、Render Props，到现代的 Custom Hooks、Compound Components，模式演进的本质是「更优雅的复用」。Hooks 是 React 官方推荐方案，Compound Components 用于复杂 UI 库。',
        },
        {
          id: 'va-p10-2',
          type: 'paragraph',
          text: '点击下方模式切换（容器/展示、HOC、Render Props、Custom Hooks、Compound），左侧展示模式说明与优缺点，右侧展示代码示例。底部对比速查表汇总推荐度与适用场景。',
        },
        {
          id: 'va-p10-3',
          type: 'demo',
          visualizationType: 'design-pattern-showcase',
          data: {},
        },
        {
          id: 'va-p10-4',
          type: 'callout',
          variant: 'warning',
          title: '🌟 模式演进本质',
          text: 'HOC → Render Props → Custom Hooks，三者都是「逻辑复用」方案。HOC 有嵌套地狱，Render Props 有回调地狱，Custom Hooks 无嵌套且类型友好，是现代首选。Compound Components 用于 UI 库声明式 API（如 Tabs/Select/Accordion）。',
        },
        {
          id: 'va-p10-5',
          type: 'code',
          code: `// 现代推荐：Custom Hooks + Compound Components

// 1. Custom Hooks：逻辑复用（无嵌套地狱）
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false))
  }, [url])
  return { data, loading }
}

// 2. Compound Components：声明式 UI（Context 共享状态）
const TabsContext = createContext<{ active: number; setActive: (i: number) => void }>(null!)

function Tabs({ children, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex)
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>
}
function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsContext)
  return <button onClick={() => setActive(index)}>{children}</button>
}
function TabPanel({ index, children }) {
  const { active } = useContext(TabsContext)
  return active === index ? <div>{children}</div> : null
}

// 使用：声明式组合，表达力强
<Tabs>
  <Tab index={0}>详情</Tab>
  <Tab index={1}>评论</Tab>
  <TabPanel index={0}>详情内容</TabPanel>
  <TabPanel index={1}>评论内容</TabPanel>
</Tabs>`,
          language: 'tsx',
          filename: 'modern-patterns.tsx',
        },
      ],
    },

    // 知识点 11：状态管理与 CSS 架构
    {
      order: 11,
      title: '状态管理与 CSS 架构方法论',
      difficulty: 2,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'va-p11-1',
          type: 'paragraph',
          lead: true,
          text: '状态管理解决「跨组件数据流」问题，CSS 架构解决「样式组织」问题。两者都是大型项目的工程化核心。下方对比表汇总四大状态管理模式与五大 CSS 方法论，是技术选型的核心参考。',
        },
        {
          id: 'va-p11-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '模式',
            columns: ['核心思想', '优点', '缺点', '适用场景'],
            rows: [
              {
                feature: '全局 Store（Redux/Zustand）',
                values: ['单一数据源 + 显式更新', '可预测、可时间旅行、中间件生态', '样板代码多、学习曲线陡', '大型应用、复杂状态交互'],
              },
              {
                feature: '原子化（Recoil/Jotai）',
                values: ['状态拆分为原子，按需订阅', '细粒度订阅、性能优、无样板', '原子爆炸、调试复杂', '中等应用、状态分散'],
              },
              {
                feature: 'Signals（Solid/Vue）',
                values: ['细粒度响应式，值变化自动更新', '零依赖、性能极优、无虚拟 DOM 开销', '生态新、React 集成需适配', '高性能场景、Solid/Vue 项目'],
              },
              {
                feature: 'Context（React 内置）',
                values: ['依赖注入，跨层传递', '无依赖、React 原生、简单', '值变化全量重渲染、性能差', '主题/用户/路由等低频变化'],
              },
            ],
          },
        },
        {
          id: 'va-p11-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '方法论',
            columns: ['核心思想', '优点', '缺点', '适用场景'],
            rows: [
              {
                feature: 'BEM',
                values: ['Block__Element--Modifier 命名约定', '命名清晰、避免冲突、可维护', '类名冗长、手写繁琐', '传统项目、团队协作'],
              },
              {
                feature: 'SMACSS',
                values: ['Base/Layout/Module/State/Theme 分类', '结构清晰、分类明确', '分类主观、学习成本', '中大型项目'],
              },
              {
                feature: 'OOCSS',
                values: ['结构与皮肤分离、容器与内容分离', '复用性强、灵活', '抽象过度、类名多', '组件库、设计系统'],
              },
              {
                feature: 'CSS Modules',
                values: ['编译时作用域隔离', '零冲突、自动作用域、TS 友好', '需构建支持、动态类名复杂', 'React/Vue 组件化项目'],
              },
              {
                feature: 'Tailwind',
                values: ['原子化工具类，按需生成', '无需命名、一致性高、体积小', '类名长、学习曲线、HTML 臃肿', '快速开发、设计系统'],
              },
            ],
          },
        },
        {
          id: 'va-p11-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 选型建议',
          text: '状态管理：小型用 Context，中型用 Zustand/Jotai，大型用 Redux Toolkit。CSS 架构：组件化项目用 CSS Modules，快速开发用 Tailwind，传统项目用 BEM。现代趋势：Zustand + Tailwind 组合。',
        },
      ],
    },

    // 知识点 12：分层架构与 SOLID 设计原则
    {
      order: 12,
      title: '分层架构与 SOLID 设计原则',
      difficulty: 3,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'va-p12-1',
          type: 'paragraph',
          lead: true,
          text: '分层架构解决「项目结构组织」问题，设计原则解决「代码质量」问题。Feature-Sliced Design 是现代前端分层架构的代表，Monorepo 解决多包管理。SOLID 是面向对象设计的五大原则，在前端同样适用。',
        },
        {
          id: 'va-p12-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '架构',
            columns: ['核心思想', '分层', '优点', '适用场景'],
            rows: [
              {
                feature: 'Feature-Sliced Design',
                values: ['按业务领域分层，依赖单向', 'app/pages/widgets/features/entities/shared', '关注点分离、依赖明确、可渐进迁移', '中大型 SPA 项目'],
              },
              {
                feature: 'Monorepo',
                values: ['多包单仓库，统一管理', 'packages/apps/tools', '代码复用、统一版本、原子提交', '多产品线、组件库、工具链'],
              },
              {
                feature: '传统分层（按技术）',
                values: ['按技术类型分层', 'components/utils/services/styles', '简单直观、上手快', '小型项目、原型'],
              },
            ],
          },
        },
        {
          id: 'va-p12-3',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '原则',
            columns: ['全称', '含义', '前端应用'],
            rows: [
              {
                feature: 'S',
                values: ['Single Responsibility', '单一职责：一个类/模块只做一件事', '组件只负责一个 UI 单元，Hook 只封装一个逻辑'],
              },
              {
                feature: 'O',
                values: ['Open-Closed', '开闭原则：对扩展开放，对修改关闭', '通过组合扩展功能，而非修改原组件；高阶组件/Hooks 扩展'],
              },
              {
                feature: 'L',
                values: ['Liskov Substitution', '里氏替换：子类可替换父类', 'Props 接口兼容，子组件可替换父组件位置'],
              },
              {
                feature: 'I',
                values: ['Interface Segregation', '接口隔离：多个专用接口优于单一胖接口', 'Props 拆分为多个小接口，组件按需实现'],
              },
              {
                feature: 'D',
                values: ['Dependency Inversion', '依赖倒置：依赖抽象而非具体', '依赖接口/类型而非实现，依赖注入（Context/Provider）'],
              },
            ],
          },
        },
        {
          id: 'va-p12-4',
          type: 'callout',
          variant: 'tip',
          title: '🌟 组合优于继承',
          text: 'React 官方推荐「组合优于继承」：通过 props.children、render props、HOC、Hooks 等组合方式复用代码，而非类继承。这与 SOLID 的开闭原则一致——通过组合扩展，而非修改原组件。',
        },
        {
          id: 'va-p12-5',
          type: 'code',
          code: `// Feature-Sliced Design 分层结构
src/
  app/          # 应用初始化（路由/Store/Provider）
  processes/    # 进程（如鉴权流程）
  pages/        # 页面（路由级）
  widgets/      # 组件块（如 Header/Footer）
  features/     # 业务特性（如 auth/userList）
  entities/     # 业务实体（如 User/Post）
  shared/       # 共享（UIKit/lib/api/config）

// 依赖规则：上层可依赖下层，同层不可依赖
// app → processes → pages → widgets → features → entities → shared

// SOLID 在前端的体现：单一职责的 Hook
// ❌ 反例：一个 Hook 做太多事
function useEverything() {
  // 数据获取 + UI 状态 + 路由 + 主题... 混杂
}

// ✅ 正例：单一职责，按 SRP 拆分
function useFetchUser(id: string) { /* 只负责获取用户 */ }
function useUserForm(user: User) { /* 只负责表单状态 */ }
function useTheme() { /* 只负责主题切换 */ }`,
          language: 'tsx',
          filename: 'architecture.tsx',
        },
      ],
    },

    // 知识点 13：跨模块复用 —— Canvas 动画与组件测试
    {
      order: 13,
      title: '跨模块复用：Canvas 动画与组件测试',
      difficulty: 2,
      isNew: true,
      visualizationType: 'debounce-throttle-visualizer',
      blocks: [
        {
          id: 'va-p13-1',
          type: 'paragraph',
          lead: true,
          text: '模块二十复用模块十九的 DebounceThrottleVisualizer（Canvas 动画演示视角）与模块十八的 ComponentTestPlayground（设计模式测试视角），最大化跨模块组件复用。复用时仅切换数据源，无需重复造轮子。',
        },
        {
          id: 'va-p13-2',
          type: 'paragraph',
          text: '下方演示 Canvas 动画的 requestAnimationFrame 循环与防抖节流的区别。rAF 在每次重绘前调用（约 60fps），防抖延迟执行，节流固定频率执行。三者都是性能优化手段，适用场景不同。',
        },
        {
          id: 'va-p13-3',
          type: 'demo',
          visualizationType: 'debounce-throttle-visualizer',
          data: {},
        },
        {
          id: 'va-p13-4',
          type: 'demo',
          visualizationType: 'component-test-playground',
          data: {},
        },
        {
          id: 'va-p13-5',
          type: 'callout',
          variant: 'tip',
          title: '🌟 跨模块复用原则',
          text: '跨模块复用组件时复用其原状态切片（如 CanvasAnimationDemo 复用模块十九的 performanceSecuritySlice），而非新建重复状态。这是「复用组件时复用其状态切片」的最佳实践，避免状态碎片化。',
        },
      ],
    },

    // 知识点 14：前端架构速查与小测验
    {
      order: 14,
      title: '前端架构速查与小测验',
      difficulty: 1,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'va-p14-1',
          type: 'paragraph',
          lead: true,
          text: '前端架构核心知识点速查表，覆盖组件模式、状态管理、CSS 架构、分层架构、设计原则五大主题。点击展开查看详情，完成下方小测验检验掌握程度。',
        },
        {
          id: 'va-p14-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            items: [
              {
                title: '组件设计模式演进',
                content:
                  'HOC（高阶组件，函数接收组件返回新组件，嵌套地狱）→ Render Props（渲染属性，回调地狱）→ Custom Hooks（现代推荐，无嵌套，类型友好）→ Compound Components（复合组件，Context 共享状态，UI 库声明式 API）。Hooks 时代后 HOC/Render Props 不推荐。',
              },
              {
                title: '状态管理模式速查',
                content:
                  'Redux/Zustand（全局 Store，可预测，样板多）、Recoil/Jotai（原子化，细粒度订阅）、Signals（Solid/Vue，零依赖响应式）、Context（React 内置，低频变化）。选型：小型 Context，中型 Zustand/Jotai，大型 Redux Toolkit。',
              },
              {
                title: 'CSS 架构方法论速查',
                content:
                  'BEM（Block__Element--Modifier，命名约定）、SMACSS（Base/Layout/Module/State/Theme 分类）、OOCSS（结构与皮肤分离）、CSS Modules（编译时作用域）、Tailwind（原子化工具类）。现代趋势：Tailwind + CSS Modules 组合。',
              },
              {
                title: 'Feature-Sliced Design 分层',
                content:
                  '分层：app → processes → pages → widgets → features → entities → shared。依赖规则：上层依赖下层，同层不依赖。关注点分离，可渐进迁移。适合中大型 SPA。Monorepo 解决多包管理（pnpm workspaces + Turborepo）。',
              },
              {
                title: 'SOLID 在前端应用',
                content:
                  'S（单一职责）：组件/Hook 只做一件事；O（开闭）：组合扩展而非修改；L（里氏替换）：Props 兼容可替换；I（接口隔离）：Props 拆分小接口；D（依赖倒置）：依赖抽象/Context 注入。React 官方推荐「组合优于继承」。',
              },
              {
                title: '架构选型决策要点',
                content:
                  '组件复用：Custom Hooks + Compound Components；状态管理：按规模选 Redux/Zustand/Context；CSS：按团队选 Tailwind/CSS Modules/BEM；分层：中大型用 FSD，多包用 Monorepo；原则：遵循 SOLID + 组合优于继承。',
              },
            ],
          },
        },
        {
          id: 'va-p14-3',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'Canvas 与 SVG 的核心差异是什么？',
                options: [
                  'Canvas 是矢量图形，SVG 是位图',
                  'Canvas 是立即模式（像素），SVG 是保留模式（DOM）',
                  'Canvas 性能永远优于 SVG',
                  'SVG 不支持事件绑定',
                ],
                correctIndex: 1,
                explanation:
                  'Canvas 是立即模式，JS 绘制后变为像素，无 DOM；SVG 是保留模式，每个图形是 DOM 节点。>1000 节点 Canvas 优，<1000 交互 SVG 优。',
              },
              {
                question: 'D3 数据绑定中，.enter() 返回的选择集表示什么？',
                options: [
                  '数据已绑定到 DOM 的部分',
                  '数据多于 DOM，需新增节点的部分',
                  'DOM 多于数据，需移除节点的部分',
                  '所有数据与 DOM 的并集',
                ],
                correctIndex: 1,
                explanation:
                  '.data(data) 返回 update（已绑定），.enter() 返回数据多于 DOM 的部分（需 append 新增），.exit() 返回 DOM 多于数据的部分（需 remove）。',
              },
              {
                question: '现代 React 推荐的逻辑复用方案是？',
                options: ['HOC（高阶组件）', 'Render Props', 'Custom Hooks', '类继承'],
                correctIndex: 2,
                explanation:
                  'Custom Hooks 是 React 官方推荐方案，无嵌套地狱，类型友好。HOC 有 Wrapper Hell，Render Props 有回调地狱，Hooks 时代后两者不推荐。',
              },
              {
                question: 'Feature-Sliced Design 的分层依赖规则是？',
                options: [
                  '同层可互相依赖',
                  '下层可依赖上层',
                  '上层可依赖下层，同层不可依赖',
                  '任意层可互相依赖',
                ],
                correctIndex: 2,
                explanation:
                  'FSD 依赖规则：上层（app）可依赖下层（shared），同层不可依赖。分层：app → processes → pages → widgets → features → entities → shared，单向依赖保证可维护性。',
              },
              {
                question: 'ECharts 的核心开发模式是？',
                options: ['命令式 API 调用', '配置驱动（option 对象）', 'JSX 声明式', 'CSS 样式化'],
                correctIndex: 1,
                explanation:
                  'ECharts 核心是配置驱动：通过 option 对象描述图表，setOption(option) 渲染。切换 series.type 即改变图表类型，无需重写渲染逻辑。',
              },
              {
                question: 'SOLID 中的「开闭原则」在前端如何体现？',
                options: [
                  '组件只负责一个 UI 单元',
                  '通过组合扩展功能，而非修改原组件',
                  'Props 接口必须兼容',
                  '依赖具体实现',
                ],
                correctIndex: 1,
                explanation:
                  '开闭原则：对扩展开放，对修改关闭。前端体现为通过组合（HOC/Hooks/Render Props）扩展功能，而非修改原组件。与「组合优于继承」一致。',
              },
            ],
          },
        },
      ],
    },
  ],
}
