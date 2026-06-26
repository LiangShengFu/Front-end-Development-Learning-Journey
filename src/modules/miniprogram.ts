/**
 * 模块 13：小程序开发与工程化
 *
 * 严格遵循 docx/模块十三.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 12 个知识点（对应 12 个可视化演示）
 * - 12 个可视化演示（6 个新增小程序专属组件 + 6 个复用通用组件）
 *
 * 新增专属组件（位于 components/interactive/miniprogram/）：
 * - DualThreadModelVisualizer：双线程（JsCore ↔ WebView）setData 通信模拟
 * - SetDataPerformanceComparator：全量/局部/合并三种 setData 模式性能对比
 * - MiniComponentWorkbench：Component() properties/data/methods/lifetimes 工作台
 * - TaroCompileFlowVisualizer：Taro 3+ 多端编译管线可视化
 * - UniAppConditionalCompiler：uni-app 条件编译（#ifdef/#ifndef）平台切换
 * - SubpackageLoadingVisualizer：主包/分包/独立分包拖拽配置与体积校验
 *
 * 复用通用组件池：KnowledgeGraph / Timeline / CompareTable × 2 / Accordion / QuizCard
 *
 * 所有交互均为教学模拟，不运行真实小程序运行时。
 */
import type { ModuleMeta } from '../lib/types'

export const miniprogramModule: ModuleMeta = {
  number: '13',
  title: '小程序开发与工程化',
  slug: 'mini-program',
  stage: 'cross-platform',
  stageLabel: '跨端移动端 · 第 1 模块',
  icon: '13',
  summary: '双线程模型、Page/Component、Taro/uni-app 跨端、分包加载、setData 性能优化。',
  knowledgePointCount: 12,
  visualizationCount: 12,
  points: [
    // ========================================================================
    // 知识点 1：小程序开发总览
    // ========================================================================
    {
      order: 1,
      title: '小程序开发总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'mp-p1-1',
          type: 'paragraph',
          lead: true,
          text: '模块十三是「跨端移动端生态」阶段的开篇模块。从 Web 前端能力体系出发，深入微信小程序双线程架构、原生开发规范、Taro/uni-app 跨端框架选型、分包加载策略与性能优化方法论，构成「小程序 → 跨平台」的完整教学链路。',
        },
        {
          id: 'mp-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'miniprogram', label: '小程序开发', group: 'core', weight: 3 },
              { id: 'dualthread', label: '双线程模型', group: 'related', weight: 2 },
              { id: 'native', label: '原生开发', group: 'related', weight: 2 },
              { id: 'taro', label: 'Taro', group: 'related', weight: 2 },
              { id: 'uniapp', label: 'uni-app', group: 'related', weight: 2 },
              { id: 'subpackage', label: '分包加载', group: 'related', weight: 2 },
              { id: 'setdata', label: 'setData 优化', group: 'related', weight: 2 },
              { id: 'lifecycle', label: '生命周期', group: 'related', weight: 1 },
            ],
            edges: [
              { source: 'miniprogram', target: 'dualthread' },
              { source: 'miniprogram', target: 'native' },
              { source: 'miniprogram', target: 'taro' },
              { source: 'miniprogram', target: 'uniapp' },
              { source: 'miniprogram', target: 'subpackage' },
              { source: 'miniprogram', target: 'setdata' },
              { source: 'dualthread', target: 'setdata' },
              { source: 'native', target: 'lifecycle' },
              { source: 'taro', target: 'native' },
              { source: 'uniapp', target: 'native' },
            ],
          },
        },
        {
          id: 'mp-p1-3',
          type: 'list',
          items: [
            '双线程模型：WebView（渲染层）+ JsCore（逻辑层）+ 微信原生中转',
            '原生开发：Page() / Component() 构造器、app.json 配置、生命周期',
            '跨端框架：Taro（React 语法）与 uni-app（Vue 语法）的编译到多端',
            '分包加载：主包/分包/独立分包/预加载，2M 主包与 20M 总包限制',
            '性能优化：setData 局部更新/合并调用、图片懒加载、列表 key',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：双线程模型（JsCore ↔ WebView 通信）
    // ========================================================================
    {
      order: 2,
      title: '双线程模型与 setData 通信',
      difficulty: 3,
      isNew: true,
      visualizationType: 'dual-thread-model-visualizer',
      blocks: [
        {
          id: 'mp-p2-1',
          type: 'paragraph',
          lead: true,
          text: '微信小程序采用双线程架构：逻辑层运行在 JsCore（iOS）/V8（Android）/Chrome 内核（开发者工具），渲染层运行在多个 WebView 实例。两者通过微信原生中转通信，setData 是唯一的数据桥梁，跨线程通信代价是性能优化的核心命题。',
        },
        {
          id: 'mp-p2-2',
          type: 'demo',
          visualizationType: 'dual-thread-model-visualizer',
          data: {
            scenarios: [
              {
                id: 'basic-setData',
                label: '基础 setData',
                description: '点击按钮触发一次 setData，数据从逻辑层同步到渲染层。',
                trigger: "this.setData({ count: this.data.count + 1 })",
                payload: { key: 'count', value: '1' },
                delayMs: 80,
                renderResult: '渲染层 count 文本更新为 1，触发一次重渲染。',
              },
              {
                id: 'event-trigger',
                label: '事件触发 setData',
                description: '用户在 WebView 点击按钮，事件先回传 JsCore，再 setData 回流，经历 4 次跨线程通信。',
                trigger: "handleTap() { this.setData({ liked: !this.data.liked }) }",
                payload: { key: 'liked', value: 'true' },
                delayMs: 120,
                renderResult: '渲染层「点赞」按钮高亮，整个过程经历 4 次跨线程通信。',
              },
              {
                id: 'frequent-setData',
                label: '频繁 setData',
                description: '滚动场景高频 setData，跨线程通信成为性能瓶颈，引发卡顿。',
                trigger: "onScroll(e) { this.setData({ scrollTop: e.detail.scrollTop }) }",
                payload: { key: 'scrollTop', value: '128' },
                delayMs: 60,
                renderResult: '渲染层每帧重渲染，通信队列堆积，出现卡顿（jank）。',
              },
            ],
          },
        },
        {
          id: 'mp-p2-3',
          type: 'list',
          items: [
            '设计动机：安全（隔离 DOM 访问）、性能（多 WebView 复用）、管控（审核可控）',
            '通信路径：JsCore → 序列化 → 微信原生 → 注入 → WebView → 重渲染',
            '事件回传：WebView → 微信原生 → JsCore（同样跨线程）',
            '性能瓶颈：数据序列化/反序列化 + 跨线程通信延迟 + 渲染层 diff',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 3：setData 性能优化（全量 vs 局部 vs 合并）
    // ========================================================================
    {
      order: 3,
      title: 'setData 性能优化策略',
      difficulty: 3,
      isNew: true,
      visualizationType: 'setdata-performance-comparator',
      blocks: [
        {
          id: 'mp-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'setData 是小程序性能优化的核心。全量传输会反复序列化大对象，路径局部更新用 `list[0].name` 表达式只传输变更字段，合并调用把多次 setData 合成一次减少跨线程通信次数。',
        },
        {
          id: 'mp-p3-2',
          type: 'demo',
          visualizationType: 'setdata-performance-comparator',
          data: {
            cases: [
              {
                id: 'full-transfer',
                label: '全量传输',
                description: '把整个大数组重新 setData，跨线程传输完整数据。',
                code: `// ❌ 全量传输：12.3KB 数据反复传输
this.setData({
  list: this.data.list.map((item) =>
    item.id === id ? { ...item, name: newName } : item
  )
})`,
                metrics: { transferBytes: 12300, callCount: 3, renderMs: 28, score: 1 },
                isOptimal: false,
              },
              {
                id: 'path-update',
                label: '路径局部更新',
                description: '用路径表达式只更新数组的某一个元素字段。',
                code: `// ✅ 局部更新：仅 0.1KB 数据
this.setData({
  [\`list[\${index}].name\`]: newName
})`,
                metrics: { transferBytes: 100, callCount: 1, renderMs: 4, score: 5 },
                isOptimal: true,
              },
              {
                id: 'merged-call',
                label: '合并调用',
                description: '把多次 setData 合并成一次，减少跨线程通信次数。',
                code: `// ✅ 合并调用：1 次通信完成多处更新
this.setData({
  a: 1,
  b: 2,
  [\`list[\${index}].name\`]: newName
})`,
                metrics: { transferBytes: 300, callCount: 1, renderMs: 8, score: 4 },
                isOptimal: false,
              },
            ],
          },
        },
        {
          id: 'mp-p3-3',
          type: 'list',
          items: [
            '不传输未使用的数据：data 中的数据未必都需要渲染',
            '合并 setData：连续的多个 setData 合成一次',
            '路径更新：用 `list[0].name` 表达式只传变更字段',
            '避免大对象：把不需要渲染的数据放到 this._private 而非 data',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 4：Page() 与页面生命周期
    // ========================================================================
    {
      order: 4,
      title: 'Page() 构造器与页面生命周期',
      difficulty: 2,
      isNew: false,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'mp-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'Page() 构造器用于注册小程序页面，接受一个配置对象，包含 data、生命周期、事件处理函数等。页面生命周期按 onLoad → onShow → onReady → onHide → onUnload 顺序触发，理解每个钩子的触发条件是写出正确交互逻辑的前提。',
        },
        {
          id: 'mp-p4-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'horizontal',
            items: [
              { time: 'onLoad', title: '页面加载', description: '页面初次加载时触发，仅一次。可获取 query 参数、发起首次数据请求。', status: 'done' },
              { time: 'onShow', title: '页面显示', description: '页面显示时触发，包括从后台切回前台、从其他页面返回。常用于刷新数据。', status: 'done' },
              { time: 'onReady', title: '初次渲染完成', description: '页面初次渲染完成时触发，仅一次。可在此获取节点、执行动画。', status: 'active' },
              { time: 'onHide', title: '页面隐藏', description: '页面隐藏时触发，如 navigateTo 到其他页面或切到后台。可暂停定时器/视频。', status: 'pending' },
              { time: 'onUnload', title: '页面卸载', description: '页面卸载时触发，仅一次。清理定时器、事件监听、保存状态。', status: 'pending' },
            ],
          },
        },
        {
          id: 'mp-p4-3',
          type: 'list',
          items: [
            'onLoad：仅触发一次，适合做一次性初始化（取参数、首次请求）',
            'onShow：每次显示都触发，适合做数据刷新（如登录态变化后刷新）',
            'onReady：初次渲染完成，可安全操作节点（wx.createSelectorQuery）',
            'onHide / onUnload：必须清理定时器与全局事件监听，避免内存泄漏',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 5：Component() 自定义组件
    // ========================================================================
    {
      order: 5,
      title: 'Component() 自定义组件',
      difficulty: 3,
      isNew: true,
      visualizationType: 'mini-component-workbench',
      blocks: [
        {
          id: 'mp-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Component() 构造器用于注册自定义组件，包含 properties（对外属性）、data（内部数据）、methods（方法）、lifetimes（组件生命周期）四大核心。组件间通信通过 properties 接收、triggerEvent 抛出。',
        },
        {
          id: 'mp-p5-2',
          type: 'demo',
          visualizationType: 'mini-component-workbench',
          data: {
            specs: [
              {
                id: 'properties',
                label: 'properties',
                description: '组件对外属性，父组件通过 WXML 传入。',
                code: `Component({
  properties: {
    text: { type: String, value: '按钮' },
    type: { type: String, value: 'primary' }
  }
})`,
                fields: [
                  { name: 'text', type: 'String', defaultValue: "'按钮'", description: '按钮显示文本' },
                  { name: 'type', type: 'String', defaultValue: "'primary'", description: '按钮类型：primary / default / warn' },
                ],
              },
              {
                id: 'data',
                label: 'data',
                description: '组件内部数据，仅组件自身可读写。',
                code: `Component({
  data: { count: 0 }
})`,
                fields: [{ name: 'count', type: 'Number', defaultValue: '0', description: '点击计数器' }],
              },
              {
                id: 'methods',
                label: 'methods',
                description: '组件方法，可通过 triggerEvent 向父组件抛出事件。',
                code: `Component({
  methods: {
    handleTap() {
      this.setData({ count: this.data.count + 1 })
      this.triggerEvent('tap', { count: this.data.count })
    }
  }
})`,
                fields: [{ name: 'handleTap', type: 'Function', defaultValue: '—', description: '点击处理，递增 count 并抛出 tap 事件' }],
              },
              {
                id: 'lifetimes',
                label: 'lifetimes',
                description: '组件生命周期钩子，在组件实例进入/离开不同阶段时触发。',
                code: `Component({
  lifetimes: {
    attached() { console.log('组件挂载到页面') },
    detached() { console.log('组件从页面卸载') }
  }
})`,
                fields: [
                  { name: 'attached', type: 'Function', defaultValue: '—', description: '组件进入页面节点树时触发' },
                  { name: 'ready', type: 'Function', defaultValue: '—', description: '组件布局完成时触发' },
                  { name: 'detached', type: 'Function', defaultValue: '—', description: '组件离开页面节点树时触发' },
                ],
              },
            ],
          },
        },
        {
          id: 'mp-p5-3',
          type: 'list',
          items: [
            'properties：父传子，支持 type/value/observer/optionalTypes',
            'data：内部状态，必须用 setData 修改才能触发渲染',
            'methods：方法定义，this.triggerEvent 向父组件抛事件',
            'lifetimes：attached / moved / detached / ready / error',
            'behaviors：类似 mixins，实现多组件逻辑复用',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 6：Taro 跨端框架
    // ========================================================================
    {
      order: 6,
      title: 'Taro 跨端框架与多端编译',
      difficulty: 3,
      isNew: true,
      visualizationType: 'taro-compile-flow-visualizer',
      blocks: [
        {
          id: 'mp-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Taro 3+ 是 React 技术栈开发者的跨端首选方案。它用编译时 + 运行时双管齐下：编译时把 React JSX 转换为各端目标代码，运行时用各端原生组件实现 React 组件接口。一份代码可编译到微信/支付宝/H5/RN 等多端。',
        },
        {
          id: 'mp-p6-2',
          type: 'demo',
          visualizationType: 'taro-compile-flow-visualizer',
          data: {
            targets: [
              {
                id: 'hello',
                label: 'Hello 组件',
                description: '最简单的 Taro React 组件，编译到各端查看产物差异。',
                sourceCode: `import { View, Text } from '@tarojs/components'

export default function Hello() {
  return (
    <View className="wrap">
      <Text>Hello Taro</Text>
    </View>
  )
}`,
                outputs: [
                  {
                    platform: 'wechat',
                    label: '微信小程序',
                    files: [
                      { name: 'index.wxml', content: '<view class="wrap"><text>Hello Taro</text></view>', language: 'xml' },
                      { name: 'index.wxss', content: '.wrap { display: block; }', language: 'css' },
                      { name: 'index.js', content: "Component({ render() { return null } })", language: 'javascript' },
                    ],
                  },
                  {
                    platform: 'alipay',
                    label: '支付宝小程序',
                    files: [
                      { name: 'index.axml', content: '<view class="wrap"><text>Hello Taro</text></view>', language: 'xml' },
                      { name: 'index.acss', content: '.wrap { display: block; }', language: 'css' },
                      { name: 'index.js', content: "Component({ render() { return null } })", language: 'javascript' },
                    ],
                  },
                  {
                    platform: 'h5',
                    label: 'H5',
                    files: [
                      { name: 'index.html', content: '<div class="wrap"><span>Hello Taro</span></div>', language: 'html' },
                      { name: 'index.css', content: '.wrap { display: block; }', language: 'css' },
                      { name: 'index.js', content: "export default function Hello() { return <div><span>Hello Taro</span></div> }", language: 'javascript' },
                    ],
                  },
                  {
                    platform: 'rn',
                    label: 'React Native',
                    files: [
                      { name: 'index.js', content: "import { View, Text } from 'react-native'\nexport default function Hello() {\n  return (<View><Text>Hello Taro</Text></View>)\n}", language: 'javascript' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          id: 'mp-p6-3',
          type: 'list',
          items: [
            '编译时：Babel 转换 JSX，按目标端替换 @tarojs/components 实现',
            '运行时：用各端原生组件实现 reconciler，对接 React/Vue 渲染协议',
            '跨端组件库：@tarojs/components 抽象 View/Text/Image 等基础组件',
            'API：Taro.request / Taro.navigateTo 统一各端差异',
            'config/index.js：designWidth / deviceRatio / framework / mini/h5 配置',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 7：uni-app 条件编译
    // ========================================================================
    {
      order: 7,
      title: 'uni-app 条件编译',
      difficulty: 3,
      isNew: true,
      visualizationType: 'uniapp-conditional-compiler',
      blocks: [
        {
          id: 'mp-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'uni-app 是 Vue 技术栈开发者的跨端首选。条件编译（#ifdef / #ifndef / #endif）是 uni-app 处理平台差异的核心机制：在不同平台编译时保留或剔除特定代码块，实现一份源码多端运行。',
        },
        {
          id: 'mp-p7-2',
          type: 'demo',
          visualizationType: 'uniapp-conditional-compiler',
          data: {
            examples: [
              {
                id: 'request-api',
                label: 'API 适配',
                description: '不同平台调用不同的网络请求 API。',
                sourceCode: `<template>
  <view>请求结果：{{ result }}</view>
</template>

<script>
export default {
  methods: {
    fetch() {
      // #ifdef MP-WEIXIN
      wx.request({ url: '/api' })
      // #endif
      // #ifdef H5
      fetch('/api')
      // #endif
      // #ifdef APP-PLUS
      plus.net.XMLHttpRequest('/api')
      // #endif
    }
  }
}
</script>`,
                platforms: [
                  {
                    id: 'MP-WEIXIN',
                    label: '微信小程序',
                    compiledCode: `// 编译后（MP-WEIXIN）
wx.request({ url: '/api' })`,
                    activeBlocks: ['wx.request({ url: \'/api\' })'],
                  },
                  {
                    id: 'H5',
                    label: 'H5',
                    compiledCode: `// 编译后（H5）
fetch('/api')`,
                    activeBlocks: ['fetch(\'/api\')'],
                  },
                  {
                    id: 'APP-PLUS',
                    label: 'App',
                    compiledCode: `// 编译后（APP-PLUS）
plus.net.XMLHttpRequest('/api')`,
                    activeBlocks: ['plus.net.XMLHttpRequest(\'/api\')'],
                  },
                ],
              },
              {
                id: 'ui-platform',
                label: 'UI 平台差异',
                description: '同一界面在不同平台使用不同的标题栏样式。',
                sourceCode: `<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="wx-nav">微信自定义导航栏</view>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <view class="default-nav">默认导航栏</view>
    <!-- #endif -->
  </view>
</template>`,
                platforms: [
                  {
                    id: 'MP-WEIXIN',
                    label: '微信小程序',
                    compiledCode: `// 编译后（MP-WEIXIN）
<view class="wx-nav">微信自定义导航栏</view>`,
                    activeBlocks: ['<view class="wx-nav">微信自定义导航栏</view>'],
                  },
                  {
                    id: 'H5',
                    label: 'H5',
                    compiledCode: `// 编译后（H5）
<view class="default-nav">默认导航栏</view>`,
                    activeBlocks: ['<view class="default-nav">默认导航栏</view>'],
                  },
                  {
                    id: 'APP-PLUS',
                    label: 'App',
                    compiledCode: `// 编译后（APP-PLUS）
<view class="default-nav">默认导航栏</view>`,
                    activeBlocks: ['<view class="default-nav">默认导航栏</view>'],
                  },
                ],
              },
            ],
          },
        },
        {
          id: 'mp-p7-3',
          type: 'list',
          items: [
            '#ifdef PLATFORM：仅当为该平台时编译',
            '#ifndef PLATFORM：仅当不为该平台时编译',
            '#endif：结束条件编译块',
            '平台标识：MP-WEIXIN / MP-ALIPAY / H5 / APP-PLUS / APP-ANDROID / APP-IOS',
            '支持 template / script / style / pages.json 全场景条件编译',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 8：分包加载与预加载
    // ========================================================================
    {
      order: 8,
      title: '分包加载与预加载策略',
      difficulty: 3,
      isNew: true,
      visualizationType: 'subpackage-loading-visualizer',
      blocks: [
        {
          id: 'mp-p8-1',
          type: 'paragraph',
          lead: true,
          text: '分包加载是小程序工程化的核心能力。主包包含启动页与 tabBar 页面，分包按业务模块划分，独立分包可不依赖主包单独运行，preloadRule 配置进入某页面时预下载分包，直接影响首屏性能。',
        },
        {
          id: 'mp-p8-2',
          type: 'demo',
          visualizationType: 'subpackage-loading-visualizer',
          data: {
            pages: [
              { id: 'index', label: '首页', sizeKb: 120 },
              { id: 'logs', label: '日志页', sizeKb: 40 },
              { id: 'user', label: '用户页', sizeKb: 180 },
              { id: 'detail', label: '详情页', sizeKb: 220 },
              { id: 'cart', label: '购物车', sizeKb: 160 },
              { id: 'order', label: '订单页', sizeKb: 140 },
              { id: 'search', label: '搜索页', sizeKb: 90 },
              { id: 'settings', label: '设置页', sizeKb: 60 },
            ],
            initialConfig: {
              mainPackage: ['index', 'logs'],
              subpackages: [
                { root: 'packageA', name: '分包A', pages: ['user', 'detail'] },
                { root: 'packageB', name: '分包B', pages: ['cart', 'order'], independent: true },
              ],
              preloadRule: [{ page: 'index', packages: ['packageA'] }],
            },
          },
        },
        {
          id: 'mp-p8-3',
          type: 'list',
          items: [
            '主包 ≤ 2M：包含启动页与 tabBar，体积直接影响首屏',
            '总包 ≤ 20M：所有主包 + 分包总和上限',
            '独立分包（independent: true）：不依赖主包，可独立运行（如活动页）',
            'preloadRule：进入某页面时预下载分包，提升跳转速度',
            '分包内不可引用主包资源，主包可引用分包',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 9：性能优化手段对比矩阵
    // ========================================================================
    {
      order: 9,
      title: '性能优化手段对比矩阵',
      difficulty: 2,
      isNew: false,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'mp-p9-1',
          type: 'paragraph',
          lead: true,
          text: '小程序性能优化手段众多，需根据场景选型。setData 优化是核心命题，图片优化与列表 key 是常见增益点，骨架屏与预加载提升感知性能。',
        },
        {
          id: 'mp-p9-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '优化手段',
            columns: ['原理', '适用场景', '收益', '注意事项'],
            rows: [
              { feature: 'setData 合并', values: ['多次 setData 合成一次', '连续状态更新', '减少通信次数', '注意时序'] },
              { feature: 'setData 局部更新', values: ['路径表达式更新局部', '大列表单项更新', '减少传输字节', '路径计算有成本'] },
              { feature: '图片 CDN+WebP', values: ['CDN 压缩 + WebP 格式', '所有图片场景', '减少 60%+ 体积', '旧版不支持'] },
              { feature: 'lazy-load 懒加载', values: ['进入视口才加载', '长列表图片', '降低首屏请求', '需 IntersectionObserver'] },
              { feature: 'wx:if vs hidden', values: ['wx:if 销毁/重建，hidden 隐藏', '频繁切换用 hidden', '减少重建开销', 'hidden 仍占内存'] },
              { feature: '列表 key', values: ['稳定 key 标识', '动态列表', '减少 diff', '避免用 index'] },
              { feature: '分包预加载', values: ['preloadRule 预下载', '主流程跳分包', '跳转秒开', '占用带宽'] },
              { feature: '骨架屏', values: ['占位避免白屏', '首屏/异步加载', '提升感知速度', '需维护布局'] },
              { feature: '避免大对象 JSON.parse', values: ['不存入 data', '大数据存 this._', '避免序列化', '不参与渲染'] },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 10：三大框架对比
    // ========================================================================
    {
      order: 10,
      title: '微信原生 / Taro / uni-app 对比',
      difficulty: 2,
      isNew: false,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'mp-p10-1',
          type: 'paragraph',
          lead: true,
          text: '三大框架选型是技术决策的高频场景。微信原生性能最优但语法陈旧、跨端能力为零；Taro 适合 React 技术栈，跨端能力强；uni-app 适合 Vue 技术栈，学习成本最低，生态最广。',
        },
        {
          id: 'mp-p10-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['微信原生', 'Taro', 'uni-app'],
            rows: [
              { feature: '语法', values: ['WXML/WXSS/JS', 'React JSX', 'Vue SFC'] },
              { feature: '跨端能力', values: ['仅微信', '微信/支付宝/H5/RN', '10+ 端'] },
              { feature: '运行性能', values: ['最优（无中间层）', '中（运行时 reconciler）', '中（编译时为主）'] },
              { feature: '生态', values: ['微信组件市场', 'Taro UI / NutUI', 'uni-ui / uView'] },
              { feature: '学习成本', values: ['中（专属语法）', '低（React 开发者）', '低（Vue 开发者）'] },
              { feature: '包体积', values: ['最小', '中（含运行时）', '中（按需编译）'] },
              { feature: '调试体验', values: ['微信开发者工具', 'Taro DevTools', 'HBuilderX'] },
              { feature: 'TypeScript 支持', values: ['较弱', '一等公民', '一等公民'] },
              { feature: '社区活跃度', values: ['官方维护', '京东团队维护', 'DCloud 维护'] },
            ],
            highlightColumn: 1,
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 11：小程序速查
    // ========================================================================
    {
      order: 11,
      title: '小程序开发速查',
      difficulty: 1,
      isNew: false,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'mp-p11-1',
          type: 'paragraph',
          lead: true,
          text: '将小程序核心知识按主题折叠，便于快速回顾。点击展开查看每个主题的关键要点与代码示例。',
        },
        {
          id: 'mp-p11-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: false,
            defaultOpen: [0],
            items: [
              {
                title: '双线程模型',
                content: '微信小程序采用 JsCore（逻辑层）+ WebView（渲染层）双线程架构，setData 是唯一数据桥梁。跨线程通信代价是性能优化的核心。',
                code: `// 逻辑层 JsCore
this.setData({ count: 1 })
// → 序列化 → 微信原生 → 注入 → WebView 渲染`,
                codeLanguage: 'javascript',
              },
              {
                title: '原生开发',
                content: 'Page() 注册页面，Component() 注册自定义组件。页面生命周期 onLoad/onShow/onReady/onHide/onUnload，组件生命周期 attached/ready/detached。',
                code: `Page({
  data: { count: 0 },
  onLoad() { /* 取参数 */ },
  onShow() { /* 刷新数据 */ }
})`,
                codeLanguage: 'javascript',
              },
              {
                title: 'Taro 跨端',
                content: 'React 语法编译到多端。@tarojs/components 提供跨端组件库，Taro.request 等 API 统一各端差异。',
                code: `import { View, Text } from '@tarojs/components'
export default function App() {
  return <View><Text>Hello</Text></View>
}`,
                codeLanguage: 'jsx',
              },
              {
                title: 'uni-app 跨端',
                content: 'Vue 语法 + 条件编译。#ifdef/#ifndef 处理平台差异，一份代码编译到 10+ 端。',
                code: `<!-- #ifdef MP-WEIXIN -->
<view>微信专属</view>
<!-- #endif -->`,
                codeLanguage: 'html',
              },
              {
                title: '分包加载',
                content: 'app.json 配置 subpackages + preloadRule。主包 ≤ 2M，总包 ≤ 20M。独立分包不依赖主包。',
                code: `{
  "subPackages": [{
    "root": "packageA",
    "pages": ["user", "detail"]
  }],
  "preloadRule": { "index": { "packages": ["packageA"] } }
}`,
                codeLanguage: 'json',
              },
              {
                title: '性能优化',
                content: 'setData 局部更新 + 合并调用，图片 CDN+WebP+lazy-load，列表用稳定 key，避免大对象存 data。',
                code: `// ✅ 路径局部更新
this.setData({ [\`list[\${i}].name\`]: v })`,
                codeLanguage: 'javascript',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 12：小程序开发小测验
    // ========================================================================
    {
      order: 12,
      title: '小程序开发小测验',
      difficulty: 1,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'mp-p12-1',
          type: 'paragraph',
          lead: true,
          text: '通过 10 题测验覆盖双线程模型、setData 优化、Page/Component 生命周期、Taro 编译、uni-app 条件编译、分包限制与性能优化手段，检验学习成果。',
        },
        {
          id: 'mp-p12-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '微信小程序的逻辑层运行在哪里？',
                options: ['WebView', 'JsCore', 'Service Worker', '主进程'],
                correctIndex: 1,
                explanation: '微信小程序逻辑层运行在 JsCore（iOS）/ V8（Android）/ Chrome 内核（开发者工具），渲染层运行在 WebView，两者通过微信原生中转通信。',
              },
              {
                question: '以下哪种 setData 写法性能最优？',
                options: [
                  'this.setData({ list: newList })',
                  'this.setData({ [`list[${i}].name`]: v })',
                  '多次 this.setData({ a: 1 }) 然后 this.setData({ b: 2 })',
                  'this.setData({ ...this.data, count: 1 })',
                ],
                correctIndex: 1,
                explanation: '路径局部更新 `list[${i}].name` 只传输变更字段，传输字节最小（约 0.1KB vs 全量 12KB），是最优写法。',
              },
              {
                question: 'Page() 页面生命周期中，仅在页面加载时触发一次的是？',
                options: ['onShow', 'onReady', 'onLoad', 'onHide'],
                correctIndex: 2,
                explanation: 'onLoad 仅在页面初次加载时触发一次，适合做一次性初始化（取参数、首次请求）；onShow 每次显示都触发；onReady 仅触发一次但晚于 onLoad。',
              },
              {
                question: 'Taro 3+ 跨端框架的编译产物，微信小程序对应文件是？',
                options: ['.html + .css + .js', '.wxml + .wxss + .js', '.axml + .acss + .js', '.vue + .js'],
                correctIndex: 1,
                explanation: 'Taro 编译到微信小程序产出 .wxml（模板）+ .wxss（样式）+ .js（逻辑），对应微信原生三件套。支付宝是 .axml/.acss，H5 是标准 HTML/CSS/JS。',
              },
              {
                question: 'uni-app 中 `#ifdef MP-WEIXIN ... #endif` 的作用是？',
                options: [
                  '所有平台都编译',
                  '仅微信小程序平台编译该代码块',
                  '除微信外其他平台编译',
                  '运行时判断平台',
                ],
                correctIndex: 1,
                explanation: '#ifdef MP-WEIXIN 表示「仅当目标平台为微信小程序时编译该代码块」，其他平台编译时该块会被剔除。条件编译是编译时而非运行时机制。',
              },
              {
                question: '微信小程序主包体积上限是？',
                options: ['1M', '2M', '5M', '20M'],
                correctIndex: 1,
                explanation: '微信小程序主包 ≤ 2M（包含启动页与 tabBar 页面），所有主包 + 分包总和 ≤ 20M。主包体积直接影响首屏性能。',
              },
              {
                question: '以下关于独立分包的说法，正确的是？',
                options: [
                  '必须依赖主包才能运行',
                  '不能包含页面',
                  '不依赖主包，可独立运行',
                  '体积不计入总包限制',
                ],
                correctIndex: 2,
                explanation: '独立分包（independent: true）不依赖主包资源，可独立运行，常用于活动页、营销页等可独立访问的场景。',
              },
              {
                question: 'Component() 中向父组件抛出事件的方法是？',
                options: ['this.$emit', 'this.triggerEvent', 'this.dispatchEvent', 'wx.postMessage'],
                correctIndex: 1,
                explanation: '小程序自定义组件用 this.triggerEvent("tap", { count: 1 }) 抛出事件，父组件用 bind:tap 监听。注意与 Vue 的 $emit 和 React 的 props callback 不同。',
              },
              {
                question: '小程序中 wx:if 与 hidden 的选择，频繁切换应使用？',
                options: ['wx:if', 'hidden', '两者都行', '都不行'],
                correctIndex: 1,
                explanation: 'wx:if 会销毁/重建节点（开销大），hidden 只是 display:none（节点保留）。频繁切换场景用 hidden 可避免重建开销；不常显示用 wx:if 节省内存。',
              },
              {
                question: '以下哪种做法不能提升小程序首屏性能？',
                options: [
                  '主包只保留启动页与 tabBar',
                  '使用 preloadRule 预加载分包',
                  '把所有数据存入 data 以便访问',
                  '图片用 CDN + WebP + lazy-load',
                ],
                correctIndex: 2,
                explanation: '把所有数据存入 data 会增加 setData 序列化与传输开销，且不参与渲染的数据会浪费内存。应只把渲染所需数据放入 data，其余存 this._private。',
              },
            ],
          },
        },
      ],
    },
  ],
}
