/**
 * 模块 14：跨平台开发与移动端适配
 *
 * 严格遵循 docx/模块十四.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 14 个知识点（对应 14 个可视化演示，含小测验）
 * - 7 个新增跨平台专属组件（位于 components/interactive/cross-platform/）
 * - 跨模块复用模块十三 DualThreadModelVisualizer
 * - 复用通用组件池：KnowledgeGraph / Timeline / CompareTable × 2 / Accordion / QuizCard
 *
 * 新增专属组件：
 * - MobileAdaptationSandbox：rem/vw 方案切换、设计稿宽度/DPR/安全区域/1px 实时预览
 * - RNArchitectureComparator：Bridge 序列化异步 vs JSI 同步通信数据流与延迟对比
 * - ExpoRouterTreeVisualizer：app/ 目录文件约定式路由树 → 路由 pattern 映射
 * - CapacitorPluginBridge：Web 调用 → registerPlugin 分发 → Web fallback/原生实现
 * - ServiceWorkerCacheStrategies：CacheFirst / SWR / NetworkOnly 三种策略可触发请求对比
 * - PwaPushFlowVisualizer：订阅 → 服务端推送 → SW 接收 → 展示通知端到端流程
 * - CrossPlatformSelector：按需求维度加权评分动态排序，高亮推荐方案
 *
 * 所有交互均为教学模拟，不运行真实 RN / Expo / Capacitor / SW 运行时。
 */
import type { ModuleMeta } from '../lib/types'

export const crossPlatformModule: ModuleMeta = {
  number: '14',
  title: '跨平台开发与移动端适配',
  slug: 'cross-platform-mobile',
  stage: 'cross-platform',
  stageLabel: '跨端移动端 · 第 2 模块',
  icon: '14',
  summary: 'React Native、Flutter、Hybrid、PWA、rem/vw 适配、移动端性能。',
  knowledgePointCount: 14,
  visualizationCount: 14,
  points: [
    // ========================================================================
    // 知识点 1：跨平台开发知识图谱
    // ========================================================================
    {
      order: 1,
      title: '跨平台开发总览',
      difficulty: 1,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'cp-p1-1',
          type: 'paragraph',
          lead: true,
          text: '模块十四是「跨端移动端生态」阶段的收尾模块。从移动端适配基础（viewport/rem/vw/安全区域/1px 问题）出发，覆盖 React Native 新架构、Expo Router、Capacitor Web-to-Native 桥接、PWA（Service Worker/推送/离线）、跨平台方案选型，构成「小程序 → 跨平台」的完整教学链路。',
        },
        {
          id: 'cp-p1-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'cross-platform', label: '跨平台开发', group: 'core', weight: 3 },
              { id: 'adaptation', label: '移动端适配', group: 'related', weight: 2 },
              { id: 'rn', label: 'React Native', group: 'related', weight: 2 },
              { id: 'expo', label: 'Expo', group: 'related', weight: 2 },
              { id: 'capacitor', label: 'Capacitor', group: 'related', weight: 2 },
              { id: 'pwa', label: 'PWA', group: 'related', weight: 2 },
              { id: 'selection', label: '方案选型', group: 'related', weight: 2 },
              { id: 'new-arch', label: '新架构 JSI', group: 'related', weight: 1 },
            ],
            edges: [
              { source: 'cross-platform', target: 'adaptation' },
              { source: 'cross-platform', target: 'rn' },
              { source: 'cross-platform', target: 'expo' },
              { source: 'cross-platform', target: 'capacitor' },
              { source: 'cross-platform', target: 'pwa' },
              { source: 'cross-platform', target: 'selection' },
              { source: 'rn', target: 'new-arch' },
              { source: 'expo', target: 'rn' },
              { source: 'capacitor', target: 'pwa' },
            ],
          },
        },
        {
          id: 'cp-p1-3',
          type: 'list',
          items: [
            '移动端适配：viewport、rem/vw、安全区域（notch/home-indicator）、1px 问题',
            'React Native：新架构（Fabric + TurboModules + JSI）vs 旧架构（Bridge）',
            'Expo：Router 文件约定式路由、EAS Build/Submit/Update 全流程',
            'Capacitor：Web-to-Native 桥接、registerPlugin、Web Fallback 机制',
            'PWA：Service Worker 缓存策略、Web Push 推送、Manifest 离线分发',
            '方案选型：RN / Flutter / Taro / Capacitor / PWA 加权评分对比',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 2：移动端适配沙盒（rem/vw/安全区域/1px）
    // ========================================================================
    {
      order: 2,
      title: '移动端适配沙盒：rem / vw / 安全区域 / 1px 问题',
      difficulty: 3,
      isNew: true,
      visualizationType: 'mobile-adaptation-sandbox',
      blocks: [
        {
          id: 'cp-p2-1',
          type: 'paragraph',
          lead: true,
          text: '移动端适配的核心是让设计稿在不同屏幕宽度、DPR、安全区域下保持视觉一致。rem 方案通过根字号缩放，vw 方案直接按视口百分比，两者各有取舍。1px 问题是高 DPR 设备上 1px CSS 边框显示过粗的经典痛点。',
        },
        {
          id: 'cp-p2-2',
          type: 'demo',
          visualizationType: 'mobile-adaptation-sandbox',
          data: {
            presets: [
              {
                id: 'rem-375',
                label: 'rem 方案（375 设计稿）',
                scheme: 'rem',
                designWidth: 375,
                dpr: 2,
                safeArea: 'notch',
                rootFontSize: 37.5,
                onePixelSolution: 'transform',
              },
              {
                id: 'vw-750',
                label: 'vw 方案（750 设计稿）',
                scheme: 'vw',
                designWidth: 750,
                dpr: 3,
                safeArea: 'home-indicator',
                onePixelSolution: 'viewport',
              },
              {
                id: 'rem-375-ipad',
                label: 'rem 方案（iPad 横屏）',
                scheme: 'rem',
                designWidth: 375,
                dpr: 3,
                safeArea: 'none',
                rootFontSize: 37.5,
                onePixelSolution: 'border-image',
              },
            ],
          },
        },
        {
          id: 'cp-p2-3',
          type: 'list',
          items: [
            'rem 方案：html { font-size: calc(100vw / 设计稿宽度 * 10) }，元素用 rem 单位',
            'vw 方案：1vw = 1% 视口宽度，postcss-px-to-viewport 自动转换',
            '安全区域：env(safe-area-inset-top/bottom) + viewport-fit=cover',
            '1px 问题：transform scaleY(0.5) / viewport 缩放 / border-image 三种方案',
            'DPR：window.devicePixelRatio，高 DPR 屏 1 CSS px = DPR 物理像素',
          ],
        },
        {
          id: 'cp-p2-4',
          type: 'callout',
          variant: 'tip',
          title: '选型建议',
          text: '新项目优先 vw 方案（无 JS 依赖、计算精确）；兼容旧项目用 rem；1px 问题优先 transform scaleY 方案（无副作用）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：Hybrid 通信方案对比（跨模块复用 DualThreadModelVisualizer）
    // ========================================================================
    {
      order: 3,
      title: 'Hybrid 通信方案对比：RN Bridge/JSI vs 小程序双线程',
      difficulty: 3,
      isNew: false,
      visualizationType: 'dual-thread-model-visualizer',
      blocks: [
        {
          id: 'cp-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'React Native 与微信小程序都采用「逻辑层 + 渲染层」分离的 Hybrid 架构，但通信机制截然不同。RN 旧架构用 Bridge 异步序列化，新架构用 JSI 同步调用；小程序用 JsCore + WebView 双线程 + 微信原生中转。跨模块复用模块十三 DualThreadModelVisualizer 直观对比通信差异。',
        },
        {
          id: 'cp-p3-2',
          type: 'demo',
          visualizationType: 'dual-thread-model-visualizer',
          data: {
            scenarios: [
              {
                id: 'rn-bridge',
                label: 'RN 旧架构 Bridge',
                description: 'JS 线程通过 Bridge 异步序列化数据到 Shadow/Native 线程，JSON 序列化开销大，跨线程延迟约 8ms。',
                trigger: 'NativeModules.Camera.takePhoto({ quality: 90 })',
                payload: { key: 'photo', value: 'base64...' },
                delayMs: 80,
                renderResult: '原生相机启动 → 拍照 → 序列化回传 → JS 收到 base64，全程异步。',
              },
              {
                id: 'rn-jsi',
                label: 'RN 新架构 JSI',
                description: 'JSI 实现 JS 与 C++ 直接同步调用，无序列化，TurboModules 按需加载，延迟约 1ms。',
                trigger: 'TurboModule.Camera.takePhoto({ quality: 90 })',
                payload: { key: 'photo', value: 'uri' },
                delayMs: 15,
                renderResult: 'JSI 同步调用 C++ Camera → 直接返回 URI，无序列化开销。',
              },
              {
                id: 'miniprogram',
                label: '小程序双线程',
                description: 'JsCore 逻辑层 → 微信原生中转 → WebView 渲染层，setData 是唯一数据桥梁，跨线程通信。',
                trigger: "this.setData({ count: this.data.count + 1 })",
                payload: { key: 'count', value: '1' },
                delayMs: 60,
                renderResult: '数据从 JsCore 序列化 → 微信原生 → 注入 WebView → 重渲染。',
              },
            ],
          },
        },
        {
          id: 'cp-p3-3',
          type: 'list',
          items: [
            'RN 旧架构：Bridge 异步 + JSON 序列化，三线程（JS/Shadow/Native）',
            'RN 新架构：JSI 同步 + C++ 直接调用，Fabric 渲染器对接',
            '小程序：JsCore + WebView 双线程，微信原生中转，setData 唯一桥梁',
            '共同点：逻辑层与渲染层分离，跨线程通信是性能瓶颈',
            '差异：RN 新架构 JSI 同步无序列化，小程序仍依赖异步中转',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 4：RN 新旧架构对比（Bridge vs JSI）
    // ========================================================================
    {
      order: 4,
      title: 'React Native 新旧架构对比：Bridge vs Fabric + JSI',
      difficulty: 4,
      isNew: true,
      visualizationType: 'rn-architecture-comparator',
      blocks: [
        {
          id: 'cp-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'React Native 0.68+ 默认启用新架构（Fabric 渲染器 + TurboModules + JSI）。旧架构通过 Bridge 异步序列化通信，三线程模型导致列表滚动卡顿、手势延迟；新架构通过 JSI 实现 JS 与原生 C++ 同步直接调用，无序列化开销，支持 React 18 Concurrent Features。',
        },
        {
          id: 'cp-p4-2',
          type: 'demo',
          visualizationType: 'rn-architecture-comparator',
          data: {
            architectures: [
              {
                id: 'legacy',
                label: '旧架构（Bridge）',
                description: 'JS 线程与原生线程通过异步 Bridge 通信，数据需 JSON 序列化/反序列化，跨线程通信有延迟。',
                communication: '异步序列化通信',
                latencyMs: 8,
                isNew: false,
                nodes: [
                  { id: 'js', label: 'JS 线程', sub: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.12)' },
                  { id: 'bridge', label: 'Bridge', sub: '序列化队列', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
                  { id: 'shadow', label: 'Shadow 线程', sub: 'Yoga 布局', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
                  { id: 'native', label: '原生线程', sub: 'UI 渲染', color: '#07c160', bg: 'rgba(7,193,96,0.12)' },
                ],
                edges: [
                  { from: 'js', to: 'bridge', label: '序列化', async: true },
                  { from: 'bridge', to: 'shadow', label: '异步分发', async: true },
                  { from: 'bridge', to: 'native', label: '异步分发', async: true },
                ],
              },
              {
                id: 'new',
                label: '新架构（Fabric + TurboModules）',
                description: 'JSI（JavaScript Interface）实现 JS 与原生直接同步通信，无需序列化。Fabric 新渲染器直接对接 C++ 层。',
                communication: 'JSI 同步通信',
                latencyMs: 1,
                isNew: true,
                nodes: [
                  { id: 'js', label: 'JS 线程', sub: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.12)' },
                  { id: 'jsi', label: 'JSI', sub: 'C++ 直接调用', color: '#1a6cff', bg: 'rgba(26,108,255,0.12)' },
                  { id: 'fabric', label: 'Fabric', sub: '新渲染器', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
                  { id: 'native', label: '原生线程', sub: 'UI 渲染', color: '#07c160', bg: 'rgba(7,193,96,0.12)' },
                ],
                edges: [
                  { from: 'js', to: 'jsi', label: '同步调用' },
                  { from: 'jsi', to: 'fabric', label: '同步' },
                  { from: 'jsi', to: 'native', label: '同步（TurboModules）' },
                ],
              },
            ],
          },
        },
        {
          id: 'cp-p4-3',
          type: 'list',
          items: [
            '旧架构痛点：Bridge 异步通信、JSON 序列化开销、三线程跨线程通信',
            '旧架构表现：大列表滚动卡顿、手势响应延迟、启动慢',
            '新架构核心：JSI（C++ 同步调用）、Fabric 渲染器、TurboModules 按需加载',
            '新架构优势：无序列化、同步布局、支持 React 18 Concurrent Features',
            '迁移：androidGradlePlugin.newArchEnabled=true / iOS Podfile use_react_native!(new_architecture: true)',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 5：RN / Expo 开发流程时间线
    // ========================================================================
    {
      order: 5,
      title: 'React Native / Expo 开发流程时间线',
      difficulty: 2,
      isNew: false,
      visualizationType: 'timeline',
      blocks: [
        {
          id: 'cp-p5-1',
          type: 'paragraph',
          lead: true,
          text: 'Expo 是 React Native 的上层工具链，提供 Expo Go（开发预览）、EAS Build（云构建）、EAS Submit（应用商店提交）、EAS Update（OTA 热更新）全流程。从开发到发布的完整链路如下。',
        },
        {
          id: 'cp-p5-2',
          type: 'demo',
          visualizationType: 'timeline',
          data: {
            orientation: 'vertical',
            items: [
              { time: 'Step 1', title: 'npx create-expo-app', description: '创建 Expo 项目，内置 TypeScript / Expo Router / 开箱即用配置', status: 'done' },
              { time: 'Step 2', title: 'npx expo start', description: '启动开发服务器，扫码用 Expo Go 真机预览，支持 Fast Refresh 热更新', status: 'done' },
              { time: 'Step 3', title: '本地开发', description: '编写 React 组件 + Expo Router 路由，Metro Bundler 实时打包', status: 'active' },
              { time: 'Step 4', title: 'eas build', description: '云构建 iOS/Android 原生包，无需本地 Xcode/Android Studio', status: 'pending' },
              { time: 'Step 5', title: 'eas submit', description: '提交到 App Store / Google Play，自动签名与上传', status: 'pending' },
              { time: 'Step 6', title: 'eas update', description: 'OTA 推送 JS Bundle 热更新，用户无感升级（原生改动除外）', status: 'pending' },
            ],
          },
        },
        {
          id: 'cp-p5-3',
          type: 'list',
          items: [
            'Expo Go：开发期真机预览，无需编译原生包',
            'EAS Build：云端构建，免本地原生环境配置',
            'EAS Submit：自动签名 + 应用商店上传',
            'EAS Update：OTA 热更新 JS Bundle，绕过审核',
            'development build：需要原生模块时改用 dev-client',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 6：Expo Router 路由树
    // ========================================================================
    {
      order: 6,
      title: 'Expo Router：文件约定式路由树',
      difficulty: 3,
      isNew: true,
      visualizationType: 'expo-router-tree-visualizer',
      blocks: [
        {
          id: 'cp-p6-1',
          type: 'paragraph',
          lead: true,
          text: 'Expo Router 采用文件约定式路由：app/ 目录下的文件结构即路由结构。index.tsx 映射为 /，[id].tsx 映射为动态路由 :id，_layout.tsx 定义布局，(group)/ 不出现在 URL 中。无需手动配置路由表。',
        },
        {
          id: 'cp-p6-2',
          type: 'demo',
          visualizationType: 'expo-router-tree-visualizer',
          data: {
            routeTree: {
              path: 'app/',
              label: 'app/',
              type: 'directory',
              children: [
                {
                  path: '_layout.tsx',
                  label: '_layout.tsx',
                  type: 'layout',
                  routePattern: '根布局',
                  codeSnippet: `import { Stack } from 'expo-router'

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />
}`,
                  codeLanguage: 'tsx',
                },
                {
                  path: 'index.tsx',
                  label: 'index.tsx',
                  type: 'route',
                  routePattern: '/',
                  codeSnippet: `import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View>
      <Text>首页</Text>
    </View>
  )
}`,
                  codeLanguage: 'tsx',
                },
                {
                  path: '(tabs)/',
                  label: '(tabs)/',
                  type: 'group',
                  routePattern: '/tabs（不出现在 URL）',
                  children: [
                    {
                      path: '_layout.tsx',
                      label: '_layout.tsx',
                      type: 'layout',
                      routePattern: 'Tab 布局',
                      codeSnippet: `import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}`,
                      codeLanguage: 'tsx',
                    },
                    {
                      path: 'home.tsx',
                      label: 'home.tsx',
                      type: 'route',
                      routePattern: '/tabs/home',
                      codeSnippet: `export default function HomeTab() {
  return <Text>Home Tab</Text>
}`,
                      codeLanguage: 'tsx',
                    },
                    {
                      path: 'search.tsx',
                      label: 'search.tsx',
                      type: 'route',
                      routePattern: '/tabs/search',
                      codeSnippet: `export default function SearchTab() {
  return <Text>Search Tab</Text>
}`,
                      codeLanguage: 'tsx',
                    },
                  ],
                },
                {
                  path: 'profile/[id].tsx',
                  label: 'profile/[id].tsx',
                  type: 'route',
                  routePattern: '/profile/:id',
                  codeSnippet: `import { useLocalSearchParams } from 'expo-router'

export default function Profile() {
  const { id } = useLocalSearchParams()
  return <Text>用户 ID: {id}</Text>
}`,
                  codeLanguage: 'tsx',
                },
              ],
            },
          },
        },
        {
          id: 'cp-p6-3',
          type: 'list',
          items: [
            'index.tsx：目录默认路由，映射为 /',
            '_layout.tsx：布局组件，包裹同层及子路由',
            '(group)/：路由分组，不出现在 URL 路径中',
            '[id].tsx：动态路由参数，映射为 :id',
            '[...slug].tsx：Catch-all 路由，匹配多级路径',
            '+not-found.tsx：404 页面',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 7：Capacitor 插件桥接
    // ========================================================================
    {
      order: 7,
      title: 'Capacitor 插件 Web-to-Native 桥接',
      difficulty: 3,
      isNew: true,
      visualizationType: 'capacitor-plugin-bridge',
      blocks: [
        {
          id: 'cp-p7-1',
          type: 'paragraph',
          lead: true,
          text: 'Capacitor 是 Ionic 团队推出的 Web-to-Native 桥接方案，让 Web 应用以原生壳运行。registerPlugin 自动生成 Proxy，调用时按平台分发到 Web Fallback / iOS Swift / Android Kotlin 实现。Web 端用 input[type=file] 等浏览器 API 兜底，原生端调用系统能力。',
        },
        {
          id: 'cp-p7-2',
          type: 'demo',
          visualizationType: 'capacitor-plugin-bridge',
          data: {
            examples: [
              {
                id: 'camera',
                label: 'Camera 插件',
                description: '调用设备摄像头拍照，Web 端回退到 input file。',
                pluginName: 'Camera',
                webCallCode: `import { Camera, CameraResultType } from '@capacitor/camera'

const photo = await Camera.getPhoto({
  quality: 90,
  resultType: CameraResultType.Uri
})`,
                platforms: [
                  {
                    id: 'web',
                    label: 'Web',
                    hasNativeImpl: false,
                    steps: [
                      { id: '1', label: 'Web 调用', description: 'Camera.getPhoto()', code: "Camera.getPhoto({ quality: 90 })" },
                      { id: '2', label: 'registerPlugin 分发', description: '检测平台：无原生实现', code: "@capacitor/camera Web 实现" },
                      { id: '3', label: 'Web Fallback', description: '使用 input[type=file] 拍照', code: '<input type="file" accept="image/*" capture="environment">' },
                      { id: '4', label: '返回结果', description: '返回 base64/URI', code: 'return { webPath: dataURL }' },
                    ],
                    result: 'Web 端通过 input[type=file] 模拟拍照，返回 base64 图片。',
                  },
                  {
                    id: 'ios',
                    label: 'iOS',
                    hasNativeImpl: true,
                    steps: [
                      { id: '1', label: 'Web 调用', description: 'Camera.getPhoto()', code: "Camera.getPhoto({ quality: 90 })" },
                      { id: '2', label: 'registerPlugin 分发', description: '检测到 iOS 原生实现', code: '@capacitor/camera iOS Plugin' },
                      { id: '3', label: 'Swift 原生执行', description: '调用 UIImagePickerController', code: 'let picker = UIImagePickerController()' },
                      { id: '4', label: '返回结果', description: '原生回调返回 URI', code: 'call.resolve(["webPath": path])' },
                    ],
                    result: 'iOS 端通过 UIImagePickerController 调用系统相机，返回 URI。',
                  },
                  {
                    id: 'android',
                    label: 'Android',
                    hasNativeImpl: true,
                    steps: [
                      { id: '1', label: 'Web 调用', description: 'Camera.getPhoto()', code: "Camera.getPhoto({ quality: 90 })" },
                      { id: '2', label: 'registerPlugin 分发', description: '检测到 Android 原生实现', code: '@capacitor/camera Android Plugin' },
                      { id: '3', label: 'Kotlin 原生执行', description: '调用 Intent ACTION_IMAGE_CAPTURE', code: 'val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)' },
                      { id: '4', label: '返回结果', description: '原生回调返回 URI', code: 'call.resolve(mapOf("webPath" to path))' },
                    ],
                    result: 'Android 端通过 Intent 调用系统相机，返回 URI。',
                  },
                ],
              },
              {
                id: 'haptics',
                label: 'Haptics 插件',
                description: '触发设备震动反馈，Web 端回退到 Navigator.vibrate()。',
                pluginName: 'Haptics',
                webCallCode: `import { Haptics, ImpactStyle } from '@capacitor/haptics'

await Haptics.impact({ style: ImpactStyle.Medium })`,
                platforms: [
                  {
                    id: 'web',
                    label: 'Web',
                    hasNativeImpl: false,
                    steps: [
                      { id: '1', label: 'Web 调用', description: 'Haptics.impact()', code: "Haptics.impact({ style: 'Medium' })" },
                      { id: '2', label: 'registerPlugin 分发', description: '检测平台：无原生实现', code: "@capacitor/haptics Web 实现" },
                      { id: '3', label: 'Web Fallback', description: '使用 Navigator.vibrate()', code: 'navigator.vibrate(30)' },
                      { id: '4', label: '返回结果', description: 'Promise resolve', code: 'return Promise.resolve()' },
                    ],
                    result: 'Web 端通过 Navigator.vibrate() 模拟震动反馈。',
                  },
                  {
                    id: 'ios',
                    label: 'iOS',
                    hasNativeImpl: true,
                    steps: [
                      { id: '1', label: 'Web 调用', description: 'Haptics.impact()', code: "Haptics.impact({ style: 'Medium' })" },
                      { id: '2', label: 'registerPlugin 分发', description: '检测到 iOS 原生实现', code: '@capacitor/haptics iOS Plugin' },
                      { id: '3', label: 'Swift 原生执行', description: '调用 UIImpactFeedbackGenerator', code: 'let generator = UIImpactFeedbackGenerator(style: .medium)' },
                      { id: '4', label: '返回结果', description: '原生回调', code: 'call.resolve()' },
                    ],
                    result: 'iOS 端通过 UIImpactFeedbackGenerator 触发 Taptic Engine 震动。',
                  },
                  {
                    id: 'android',
                    label: 'Android',
                    hasNativeImpl: true,
                    steps: [
                      { id: '1', label: 'Web 调用', description: 'Haptics.impact()', code: "Haptics.impact({ style: 'Medium' })" },
                      { id: '2', label: 'registerPlugin 分发', description: '检测到 Android 原生实现', code: '@capacitor/haptics Android Plugin' },
                      { id: '3', label: 'Kotlin 原生执行', description: '调用 Vibrator API', code: 'val vibrator = getSystemService(Vibrator::class.java)' },
                      { id: '4', label: '返回结果', description: '原生回调', code: 'call.resolve()' },
                    ],
                    result: 'Android 端通过 Vibrator API 触发系统震动。',
                  },
                ],
              },
            ],
          },
        },
        {
          id: 'cp-p7-3',
          type: 'list',
          items: [
            'registerPlugin 自动生成 Proxy，按平台分发到对应实现',
            'Web 端用浏览器 API 兜底（input[type=file] / Navigator.vibrate 等）',
            'iOS 端用 Swift 调用系统能力（UIImagePickerController 等）',
            'Android 端用 Kotlin 调用系统能力（Intent / Vibrator 等）',
            '统一 API：Web 端调用代码与原生端完全一致',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 8：Capacitor vs React Native 对比表
    // ========================================================================
    {
      order: 8,
      title: 'Capacitor vs React Native 方案对比',
      difficulty: 2,
      isNew: false,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'cp-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Capacitor 与 React Native 都是跨平台方案，但定位不同。Capacitor 是 Web-to-Native 桥接（Web 优先 + 原生增强），React Native 是 Learn once write anywhere（原生组件 + JS 逻辑）。六维度对比如下。',
        },
        {
          id: 'cp-p8-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['Capacitor', 'React Native'],
            rows: [
              { feature: '渲染方式', values: ['WebView 渲染', '原生组件渲染'] },
              { feature: '性能', values: ['受限于 WebView，中等', '接近原生（新架构 JSI）'] },
              { feature: '开发技术', values: ['HTML/CSS/JS（Web 技术栈）', 'React + 原生组件'] },
              { feature: '原生能力', values: ['registerPlugin 桥接 + Web Fallback', 'TurboModules 直接调用'] },
              { feature: 'Web 复用', values: ['高（直接复用 Web 代码）', '低（需重写 UI）'] },
              { feature: '适用场景', values: ['Web 应用快速套壳原生', '高性能原生体验应用'] },
            ],
            highlightColumn: 1,
          },
        },
        {
          id: 'cp-p8-3',
          type: 'callout',
          variant: 'tip',
          title: '选型建议',
          text: '已有 Web 应用想快速上架应用商店 → Capacitor；需要原生性能与体验 → React Native；两者都需多端覆盖 → 考虑 Taro/uni-app。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Service Worker 缓存策略
    // ========================================================================
    {
      order: 9,
      title: 'Service Worker 缓存策略：CacheFirst / SWR / NetworkOnly',
      difficulty: 4,
      isNew: true,
      visualizationType: 'service-worker-cache-strategies',
      blocks: [
        {
          id: 'cp-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Service Worker 是 PWA 的离线核心，拦截 fetch 事件并按策略响应。Workbox 提供三种主流策略：CacheFirst（缓存优先，适合静态资源）、StaleWhileRevalidate（缓存+后台更新，兼顾速度与新鲜度）、NetworkOnly（仅网络，适合实时数据）。',
        },
        {
          id: 'cp-p9-2',
          type: 'demo',
          visualizationType: 'service-worker-cache-strategies',
          data: {
            strategies: [
              {
                id: 'cache-first',
                label: 'Cache First',
                description: '优先读缓存，缓存未命中才请求网络。适合不常变化的静态资源。',
                code: `// Workbox CacheFirst
new CacheFirst({
  cacheName: 'static-assets',
  plugins: [
    new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 86400 })
  ]
})`,
                steps: [
                  { id: '1', label: '检查缓存', description: '在 Cache Storage 中查找匹配请求', kind: 'check-cache' as const },
                  { id: '2', label: '缓存命中', description: '找到缓存响应，直接返回', kind: 'cache-hit' as const },
                  { id: '3', label: '返回缓存', description: '立即返回缓存内容，不请求网络', kind: 'respond' as const },
                ],
                cacheHit: true,
                responseSource: 'cache',
                latencyMs: 5,
                useCase: '静态资源（CSS/JS/字体/图标）',
                isRecommended: true,
              },
              {
                id: 'stale-while-revalidate',
                label: 'Stale While Revalidate',
                description: '先返回缓存，同时后台更新缓存。兼顾速度与新鲜度。',
                code: `// Workbox StaleWhileRevalidate
new StaleWhileRevalidate({
  cacheName: 'api-cache',
  plugins: [
    new ExpirationPlugin({ maxAgeSeconds: 3600 })
  ]
})`,
                steps: [
                  { id: '1', label: '检查缓存', description: '在 Cache Storage 中查找匹配请求', kind: 'check-cache' as const },
                  { id: '2', label: '缓存命中', description: '找到缓存响应', kind: 'cache-hit' as const },
                  { id: '3', label: '返回缓存', description: '立即返回缓存内容（stale）', kind: 'respond' as const },
                  { id: '4', label: '后台更新', description: '同时发起网络请求更新缓存（revalidate）', kind: 'background-update' as const },
                ],
                cacheHit: true,
                responseSource: 'both',
                latencyMs: 8,
                useCase: 'API 数据（列表/详情，可容忍短暂过期）',
                isRecommended: true,
              },
              {
                id: 'network-only',
                label: 'Network Only',
                description: '始终请求网络，不读缓存。适合实时性要求高的数据。',
                code: `// Workbox NetworkOnly
new NetworkOnly({
  cacheName: 'realtime-api',
  plugins: [
    new NetworkOnly({ networkTimeoutSeconds: 10 })
  ]
})`,
                steps: [
                  { id: '1', label: '请求网络', description: '直接发起网络请求，不检查缓存', kind: 'fetch-network' as const },
                  { id: '2', label: '网络响应', description: '等待网络返回响应', kind: 'respond' as const },
                ],
                cacheHit: false,
                responseSource: 'network',
                latencyMs: 120,
                useCase: '实时数据（股价/消息/支付）',
                isRecommended: false,
              },
            ],
          },
        },
        {
          id: 'cp-p9-3',
          type: 'list',
          items: [
            'CacheFirst：静态资源（CSS/JS/字体/图标），缓存命中延迟约 5ms',
            'StaleWhileRevalidate：API 数据（列表/详情），缓存+后台更新',
            'NetworkOnly：实时数据（股价/消息/支付），不读缓存',
            'Workbox：Google 出品的 SW 工具库，封装常用策略与过期清理',
            'ExpirationPlugin：限制缓存条目数与过期时间，避免存储膨胀',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 10：PWA 推送通知流程
    // ========================================================================
    {
      order: 10,
      title: 'PWA 推送通知端到端流程',
      difficulty: 4,
      isNew: true,
      visualizationType: 'pwa-push-flow-visualizer',
      blocks: [
        {
          id: 'cp-p10-1',
          type: 'paragraph',
          lead: true,
          text: 'PWA 推送通知基于 Web Push API + Service Worker。完整链路：前端订阅（PushManager.subscribe）→ 服务端用 VAPID 私钥签名推送 → 推送服务（FCM/APNs）中转 → Service Worker push 事件接收 → showNotification 展示系统通知。即使页面关闭也能收到。',
        },
        {
          id: 'cp-p10-2',
          type: 'demo',
          visualizationType: 'pwa-push-flow-visualizer',
          data: {
            stages: [
              {
                id: 'subscribe',
                label: '1. 订阅推送',
                description: '用户授权后，浏览器生成订阅对象（endpoint + keys），发送到服务端保存。',
                code: `// 前端：订阅推送
const reg = await navigator.serviceWorker.ready
const subscription = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: VAPID_PUBLIC_KEY
})

// 发送订阅对象到服务端
await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify(subscription)
})`,
                codeLanguage: 'javascript',
              },
              {
                id: 'server-push',
                label: '2. 服务端推送',
                description: '服务端用 VAPID 私钥签名，通过 Web Push 协议向订阅 endpoint 发送推送消息。',
                code: `// 服务端：发送推送（Node.js + web-push）
const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:admin@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
)

await webpush.sendNotification(subscription, JSON.stringify({
  title: '新消息',
  body: '你有一条新通知',
  icon: '/icon.png'
}))`,
                codeLanguage: 'javascript',
              },
              {
                id: 'sw-receive',
                label: '3. SW 接收',
                description: 'Service Worker 的 push 事件接收推送消息，即使页面不可见也能收到。',
                code: `// Service Worker：接收 push 事件
self.addEventListener('push', (event) => {
  const data = event.data.json()

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: '/badge.png',
      tag: 'new-message'
    })
  )
})`,
                codeLanguage: 'javascript',
              },
              {
                id: 'notify',
                label: '4. 展示通知',
                description: '系统通知栏展示通知，用户点击后通过 notificationclick 事件跳转到对应页面。',
                code: `// Service Worker：通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow('/messages/123')
  )
})

// 用户看到系统通知并可点击交互`,
                codeLanguage: 'javascript',
              },
            ],
          },
        },
        {
          id: 'cp-p10-3',
          type: 'list',
          items: [
            'VAPID：Voluntary Application Server Identification，私钥签名 + 公钥验证',
            '订阅对象：endpoint（推送服务地址）+ keys（加密密钥）',
            '推送服务：FCM（Android/Chrome）、APNs（iOS/Safari）、Mozilla（Firefox）',
            'Service Worker push 事件：即使页面关闭也能接收',
            'notificationclick：用户点击通知后跳转/聚焦页面',
          ],
        },
        {
          id: 'cp-p10-4',
          type: 'callout',
          variant: 'warning',
          title: 'iOS 限制',
          text: 'iOS 16.4+ 才支持 PWA 推送，且必须「添加到主屏幕」后才能订阅推送。Android/Chrome 无此限制。',
        },
      ],
    },

    // ========================================================================
    // 知识点 11：跨平台方案选型器
    // ========================================================================
    {
      order: 11,
      title: '跨平台方案加权评分选型器',
      difficulty: 3,
      isNew: true,
      visualizationType: 'cross-platform-selector',
      blocks: [
        {
          id: 'cp-p11-1',
          type: 'paragraph',
          lead: true,
          text: '跨平台方案选型需综合权衡：性能、开发效率、原生能力、生态、学习成本、包体积。RN / Flutter / Taro / Capacitor / PWA 各有侧重。下方选型器可调整维度权重，实时计算加权评分并排序推荐方案。',
        },
        {
          id: 'cp-p11-2',
          type: 'demo',
          visualizationType: 'cross-platform-selector',
          data: {
            dimensions: [
              { id: 'performance', label: '运行性能', defaultWeight: 5, description: '渲染性能、启动速度、内存占用' },
              { id: 'dev-efficiency', label: '开发效率', defaultWeight: 4, description: '热更新、组件复用、调试体验' },
              { id: 'native-capability', label: '原生能力', defaultWeight: 4, description: '设备 API、原生模块集成' },
              { id: 'ecosystem', label: '生态成熟度', defaultWeight: 3, description: '社区、第三方库、文档完善度' },
              { id: 'learning-cost', label: '学习成本', defaultWeight: 3, description: '概念复杂度、DSL/语言学习成本' },
              { id: 'bundle-size', label: '包体积', defaultWeight: 2, description: '基础包大小、增量体积' },
            ],
            solutions: [
              {
                id: 'rn',
                name: 'React Native',
                language: 'JavaScript / TypeScript',
                scores: { performance: 4, 'dev-efficiency': 5, 'native-capability': 4, ecosystem: 5, 'learning-cost': 4, 'bundle-size': 3 },
                pros: ['复用 React 生态', '热更新支持好', '原生组件渲染'],
                cons: ['Bridge 旧架构性能瓶颈', '升级痛点明显'],
                color: '#61dafb',
              },
              {
                id: 'flutter',
                name: 'Flutter',
                language: 'Dart',
                scores: { performance: 5, 'dev-efficiency': 4, 'native-capability': 4, ecosystem: 4, 'learning-cost': 2, 'bundle-size': 2 },
                pros: ['自绘引擎性能强', 'UI 一致性高', 'Hot Reload 体验好'],
                cons: ['Dart 语言学习成本', '包体积大', '原生模块集成复杂'],
                color: '#02569b',
              },
              {
                id: 'taro',
                name: 'Taro',
                language: 'JavaScript / TypeScript',
                scores: { performance: 3, 'dev-efficiency': 5, 'native-capability': 2, ecosystem: 4, 'learning-cost': 4, 'bundle-size': 4 },
                pros: ['多端覆盖（小程序+H5+RN）', 'React/Vue 双支持', '生态完善'],
                cons: ['性能受限于小程序', '原生能力需依赖平台'],
                color: '#5cebf5',
              },
              {
                id: 'capacitor',
                name: 'Capacitor',
                language: 'JavaScript / TypeScript',
                scores: { performance: 3, 'dev-efficiency': 5, 'native-capability': 3, ecosystem: 3, 'learning-cost': 5, 'bundle-size': 4 },
                pros: ['Web 技术栈直接复用', 'PWA 与原生共存', '学习成本极低'],
                cons: ['性能不及原生', '复杂动画卡顿'],
                color: '#119eff',
              },
              {
                id: 'pwa',
                name: 'PWA',
                language: 'JavaScript / TypeScript',
                scores: { performance: 2, 'dev-efficiency': 5, 'native-capability': 2, ecosystem: 5, 'learning-cost': 5, 'bundle-size': 5 },
                pros: ['零安装分发', 'SEO 友好', 'Web 技术栈'],
                cons: ['iOS 限制多', '原生能力受限', '后台能力弱'],
                color: '#a855f7',
              },
            ],
          },
        },
        {
          id: 'cp-p11-3',
          type: 'list',
          items: [
            'React Native：复用 React 生态，原生组件渲染，新架构 JSI 提升性能',
            'Flutter：自绘引擎性能最强，UI 一致性高，但 Dart 学习成本与包体积',
            'Taro：多端覆盖（小程序+H5+RN），React/Vue 双支持',
            'Capacitor：Web 技术栈直接复用，PWA 与原生共存，学习成本最低',
            'PWA：零安装分发，SEO 友好，但 iOS 限制多、原生能力受限',
          ],
        },
      ],
    },

    // ========================================================================
    // 知识点 12：七大方案对比表
    // ========================================================================
    {
      order: 12,
      title: '七大跨平台方案综合对比',
      difficulty: 2,
      isNew: false,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'cp-p12-1',
          type: 'paragraph',
          lead: true,
          text: '除 RN/Flutter/Taro/Capacitor/PWA 外，跨平台生态还包括 Ionic（Capacitor 上层 UI 库）、原生开发（iOS Swift / Android Kotlin）。七方案在语言、渲染、性能、生态、适用场景上的综合对比如下。',
        },
        {
          id: 'cp-p12-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '对比维度',
            columns: ['React Native', 'Flutter', 'Taro', 'Capacitor', 'PWA', 'Ionic', '原生'],
            rows: [
              { feature: '开发语言', values: ['JS/TS', 'Dart', 'JS/TS', 'JS/TS', 'JS/TS', 'JS/TS', 'Swift/Kotlin'] },
              { feature: '渲染方式', values: ['原生组件', '自绘引擎', '平台原生', 'WebView', '浏览器', 'WebView', '原生组件'] },
              { feature: '性能', values: ['高', '最高', '中', '中低', '低', '中低', '最高'] },
              { feature: '多端覆盖', values: ['iOS/Android', 'iOS/Android/Web/Desktop', '小程序+H5+RN', 'iOS/Android/Web', '全平台浏览器', 'iOS/Android/Web', '单平台'] },
              { feature: '学习成本', values: ['中（React）', '高（Dart）', '低（React/Vue）', '最低（Web）', '最低（Web）', '低（Web+UI）', '高（双平台）'] },
              { feature: '适用场景', values: ['原生体验应用', '高性能统一UI', '小程序多端', 'Web 套壳原生', '离线 Web 应用', '混合应用', '极致性能/体验'] },
            ],
          },
        },
        {
          id: 'cp-p12-3',
          type: 'callout',
          variant: 'note',
          title: '趋势',
          text: 'React Native 新架构（JSI）缩小了与原生的性能差距；Flutter 在 UI 一致性上仍无对手；PWA 在 iOS 16.4+ 推送支持后能力补齐；Taro/uni-app 在国内小程序生态占据主导。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：跨平台开发速查
    // ========================================================================
    {
      order: 13,
      title: '跨平台开发核心要点速查',
      difficulty: 1,
      isNew: false,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'cp-p13-1',
          type: 'paragraph',
          lead: true,
          text: '跨平台开发的高频考点与实战要点速查，覆盖适配、RN 架构、Expo Router、Capacitor 桥接、PWA、方案选型六大主题。',
        },
        {
          id: 'cp-p13-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            multiple: false,
            defaultOpen: [0],
            items: [
              {
                title: '移动端适配核心',
                content: 'viewport meta 设置缩放、rem 方案根字号 calc(100vw/设计稿宽度*10)、vw 方案 postcss-px-to-viewport、安全区域 env(safe-area-inset-*) + viewport-fit=cover、1px 问题 transform scaleY(0.5)。',
                code: '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
                codeLanguage: 'html',
              },
              {
                title: 'RN 新架构核心',
                content: 'JSI（JavaScript Interface）实现 JS 与 C++ 同步直接调用，无 JSON 序列化。Fabric 新渲染器支持同步布局与优先级调度。TurboModules 按需加载原生模块。支持 React 18 Concurrent Features。',
                code: "// 启用新架构\nnewArchEnabled=true",
                codeLanguage: 'js',
              },
              {
                title: 'Expo Router 文件约定',
                content: 'index.tsx → /，[id].tsx → :id，_layout.tsx 布局，(group)/ 分组不出现在 URL，[...slug].tsx Catch-all，+not-found.tsx 404。useLocalSearchParams() 获取动态参数。',
                code: "const { id } = useLocalSearchParams()",
                codeLanguage: 'tsx',
              },
              {
                title: 'Capacitor registerPlugin',
                content: 'registerPlugin 自动生成 Proxy，按平台分发到 Web Fallback / iOS Swift / Android Kotlin 实现。Web 端用浏览器 API 兜底，原生端调用系统能力。统一 API 跨平台一致。',
                code: "const Camera = registerPlugin('Camera', { web, ios, android })",
                codeLanguage: 'js',
              },
              {
                title: 'Service Worker 缓存策略',
                content: 'CacheFirst（静态资源，缓存优先）、StaleWhileRevalidate（API 数据，缓存+后台更新）、NetworkOnly（实时数据，仅网络）。Workbox 封装常用策略 + ExpirationPlugin 过期清理。',
                code: "new StaleWhileRevalidate({ cacheName: 'api' })",
                codeLanguage: 'js',
              },
              {
                title: 'PWA 推送通知链路',
                content: 'PushManager.subscribe 订阅 → 服务端 VAPID 签名推送 → FCM/APNs 中转 → Service Worker push 事件接收 → showNotification 展示。iOS 16.4+ 需「添加到主屏幕」才能订阅。',
                code: "reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })",
                codeLanguage: 'js',
              },
              {
                title: '方案选型决策',
                content: '原生体验优先 → RN/Flutter；多端覆盖（含小程序）→ Taro/uni-app；Web 快速套壳 → Capacitor；离线分发 → PWA。综合性能 Flutter 最强，生态 RN 最成熟，学习成本 Capacitor/PWA 最低。',
                code: '// 加权评分：性能*5 + 效率*4 + 原生*4 + 生态*3 + 成本*3 + 体积*2',
                codeLanguage: 'js',
              },
              {
                title: 'Hybrid 通信本质',
                content: 'RN 旧架构 Bridge 异步序列化（三线程），新架构 JSI 同步（C++ 直接调用）；小程序 JsCore+WebView 双线程 + 微信原生中转，setData 唯一桥梁。共同点：逻辑层与渲染层分离。',
                code: '// RN 新架构同步调用\nTurboModule.Camera.takePhoto()',
                codeLanguage: 'js',
              },
              {
                title: 'EAS 全流程',
                content: 'expo start 开发预览（Expo Go）→ eas build 云构建（免本地原生环境）→ eas submit 提交应用商店 → eas update OTA 热更新 JS Bundle。dev-client 用于需要原生模块的场景。',
                code: 'eas build --platform ios && eas submit',
                codeLanguage: 'bash',
              },
              {
                title: '1px 问题三种方案',
                content: 'transform scaleY(0.5)（无副作用，推荐）/ viewport 缩放（影响全局）/ border-image（渐变模拟）。高 DPR 屏 1 CSS px = DPR 物理像素，导致 1px 边框显示过粗。',
                code: "{ transform: scaleY(0.5); transformOrigin: '0 0' }",
                codeLanguage: 'css',
              },
            ],
          },
        },
      ],
    },

    // ========================================================================
    // 知识点 14：跨平台开发小测验
    // ========================================================================
    {
      order: 14,
      title: '跨平台开发小测验',
      difficulty: 1,
      isNew: true,
      visualizationType: 'quiz',
      blocks: [
        {
          id: 'cp-p14-1',
          type: 'paragraph',
          lead: true,
          text: '通过 10 题测验覆盖移动端适配、RN 新架构、Expo Router、Capacitor 桥接、Service Worker 缓存、PWA 推送、方案选型全部知识点，检验学习成果。',
        },
        {
          id: 'cp-p14-2',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: 'rem 方案中，设计稿宽度 375px 时根字号应设置为？',
                options: ['10px', '37.5px', '75px', '3.75px'],
                correctIndex: 1,
                explanation: 'rem 方案通常将设计稿宽度除以 10 作为根字号：375 / 10 = 37.5px。元素用 rem 单位时，1rem = 37.5px，便于 px → rem 换算（除以 37.5）。',
              },
              {
                question: 'React Native 新架构实现 JS 与原生同步通信的技术是？',
                options: ['Bridge', 'JSI', 'WebSocket', 'postMessage'],
                correctIndex: 1,
                explanation: 'JSI（JavaScript Interface）实现 JS 与 C++ 直接同步调用，无需 JSON 序列化。旧架构 Bridge 是异步序列化通信，有跨线程延迟。',
              },
              {
                question: 'Expo Router 中 `app/profile/[id].tsx` 映射的路由是？',
                options: ['/app/profile/id', '/profile/:id', '/profile/[id]', '/profile/id'],
                correctIndex: 1,
                explanation: 'Expo Router 文件约定：[id].tsx 映射为动态路由 :id，文件路径 profile/[id].tsx 对应路由 /profile/:id。useLocalSearchParams() 获取 id 参数。',
              },
              {
                question: 'Capacitor 在 Web 端无原生实现时的处理方式是？',
                options: ['抛出错误', '静默失败', 'Web Fallback（浏览器 API 兜底）', '强制调用原生'],
                correctIndex: 2,
                explanation: 'registerPlugin 检测到 Web 端无原生实现时，自动使用 Web Fallback（浏览器 API 兜底），如 Camera 用 input[type=file]、Haptics 用 Navigator.vibrate()。',
              },
              {
                question: 'Service Worker 的 StaleWhileRevalidate 策略特点是？',
                options: ['仅读缓存', '仅请求网络', '先返回缓存同时后台更新', '缓存未命中才请求网络'],
                correctIndex: 2,
                explanation: 'StaleWhileRevalidate 先返回缓存（stale，可能过期），同时后台发起网络请求更新缓存（revalidate）。兼顾速度与新鲜度，适合可容忍短暂过期的 API 数据。',
              },
              {
                question: 'PWA 推送通知中，服务端签名推送消息用的是？',
                options: ['JWT', 'VAPID 私钥', 'OAuth Token', 'API Key'],
                correctIndex: 1,
                explanation: 'VAPID（Voluntary Application Server Identification）用私钥签名推送消息，浏览器用公钥验证身份。web-push 库的 setVapidDetails 配置公私钥对。',
              },
              {
                question: '以下哪种跨平台方案性能最强（接近原生）？',
                options: ['Capacitor', 'PWA', 'Flutter', 'Taro'],
                correctIndex: 2,
                explanation: 'Flutter 自绘引擎（Skia）直接渲染，性能最接近原生，UI 一致性最高。RN 新架构（JSI）也接近原生但依赖原生组件。Capacitor/PWA 受限于 WebView。',
              },
              {
                question: '移动端 1px 问题（高 DPR 设备边框过粗）推荐解决方案是？',
                options: ['border: 0.5px', 'transform scaleY(0.5)', 'box-shadow', 'outline'],
                correctIndex: 1,
                explanation: 'transform scaleY(0.5) 将 1px 边框在 Y 轴缩放 0.5，无副作用，是推荐方案。0.5px 在部分 Android 设备不支持；viewport 缩放影响全局；border-image 兼容性问题。',
              },
              {
                question: 'Expo EAS 的 OTA 热更新命令是？',
                options: ['eas build', 'eas submit', 'eas update', 'expo push'],
                correctIndex: 2,
                explanation: 'eas update 推送 JS Bundle 热更新，用户无感升级（原生改动除外，需重新 build+submit）。eas build 是云构建，eas submit 是提交应用商店。',
              },
              {
                question: 'Service Worker 的 push 事件在以下哪种情况能接收推送？',
                options: ['仅页面打开时', '仅页面关闭时', '即使页面关闭也能接收', '仅在 PWA 安装后'],
                correctIndex: 2,
                explanation: 'Service Worker 独立于页面运行，即使页面关闭（甚至浏览器关闭，由系统唤醒 SW）也能接收 push 事件并 showNotification 展示通知，这是 PWA 推送的核心优势。',
              },
            ],
          },
        },
      ],
    },
  ],
}
