/**
 * 模块 23：监控埋点与认证授权
 *
 * 严格遵循 docx/模块二十三.md 与 docx/PROJECT_CONTENT.md 设计文档：
 * - 13 个知识点，覆盖 i18n / SEO / 监控可观测性 / 认证授权四大领域
 * - 7 个新增监控认证专属组件（位于 components/interactive/monitoring-auth/）：
 *   I18nFormatPlayground / AuthFlowGraph / JWTPayloadDecoder /
 *   ErrorMonitoringDashboard / PerformanceObserverDemo /
 *   UserTrackingFunnel / RBACPermissionMatrix
 * - 复用通用组件池：KnowledgeGraph / CompareTable / Accordion / QuizCard
 *
 * 章节映射：
 * - #1 i18n 基础与 Intl API：I18nFormatPlayground 格式化演示
 * - #2 ICU MessageFormat 与 i18next：知识图谱 + ICU 语法
 * - #3 react-i18next / Vue I18n：框架集成对比表
 * - #4 SEO 基础：知识图谱（meta/OG/JSON-LD/sitemap）
 * - #5 SSR/SSG 与多语言 SEO：URL 策略对比表
 * - #6 监控可观测性概述：知识图谱（四维度）
 * - #7 错误监控与 Source Map：ErrorMonitoringDashboard
 * - #8 性能监控与 Web Vitals：PerformanceObserverDemo
 * - #9 Sentry 集成与采样：Accordion 速查
 * - #10 用户行为埋点与漏斗：UserTrackingFunnel
 * - #11 JWT 与 Session 对比：JWTPayloadDecoder
 * - #12 OAuth 2.0 / PKCE / NextAuth：AuthFlowGraph
 * - #13 RBAC 前端鉴权与速查测验：RBACPermissionMatrix + Quiz
 *
 * 技术栈适配：文档原使用静态 HTML + 内联 style，本项目采用结构化 ContentBlock
 * 数据模型，由 VisualizationRenderer 统一渲染。所有交互均为教学模拟。
 */
import type { ModuleMeta } from '../lib/types'

export const monitoringAuthModule: ModuleMeta = {
  number: '23',
  title: '监控埋点与认证授权',
  slug: 'monitoring-auth',
  stage: 'advanced',
  stageLabel: '高级专项 · 第 5 模块',
  icon: '23',
  summary:
    '埋点体系、Sentry、Web Vitals 采集、JWT、OAuth 2.0、RBAC/ABAC、SSO。',
  knowledgePointCount: 13,
  visualizationCount: 7,
  points: [
    // ========================================================================
    // 知识点 1：i18n 基础与 Intl API
    // ========================================================================
    {
      order: 1,
      title: 'i18n 基础与 Intl API',
      difficulty: 3,
      isNew: true,
      visualizationType: 'i18n-format-playground',
      blocks: [
        {
          id: 'ma-p1-1',
          type: 'paragraph',
          lead: true,
          text: '国际化（i18n，Internationalization + 18 个字母 + n）的核心三要素：文本翻译、本地化格式（日期/数字/货币）、语法变体（复数/性别）。出海业务的第一道门槛，不是把字符串翻译成多语言，而是让页面在不同语言文化下都能正确呈现。',
        },
        {
          id: 'ma-p1-2',
          type: 'paragraph',
          text: '下方交互演示展示浏览器原生 Intl API 的格式化能力。点击不同场景按钮切换 locale 与类型，可自定义 locale 输入框验证任意语言环境。重点关注：日期格式因文化差异巨大（中文年月日、德语星期在前）、货币符号位置与千位分隔符不同、紧凑计数法（1M/1万）。',
        },
        {
          id: 'ma-p1-3',
          type: 'demo',
          visualizationType: 'i18n-format-playground',
          data: {},
        },
        {
          id: 'ma-p1-4',
          type: 'code',
          code: `// 🌟 Intl API 浏览器原生支持，无需第三方库
// 日期格式化
new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' })
  .format(new Date('2026-06-26')) // 2026年6月26日星期五

new Intl.DateTimeFormat('de-DE', { dateStyle: 'full' })
  .format(new Date('2026-06-26')) // Freitag, 26. Juni 2026

// 货币格式化（注意千位分隔符与小数点差异）
new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
  .format(1234.56) // 1.234,56 €
new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })
  .format(1234.56) // ￥1,235（日元无小数）

// 紧凑计数法
new Intl.NumberFormat('en-US', { notation: 'compact' })
  .format(1000000) // 1M`,
          language: 'js',
          filename: 'intl-api.js',
        },
        {
          id: 'ma-p1-5',
          type: 'callout',
          variant: 'tip',
          title: '💡 Intl API 优势',
          text: 'Intl API 是浏览器原生能力，零依赖、性能优、规则与 CLDR（Unicode 通用语言环境数据仓库）同步。对比 moment.js（已弃用）等第三方库，Intl 体积更小、维护更及时。Node.js 18+ 完整支持。',
        },
        {
          id: 'ma-p1-6',
          type: 'callout',
          variant: 'warning',
          title: '⚠️ 注意 Node.js 旧版本',
          text: 'Node.js 13 及更早版本仅含英文 ICU 数据，需安装 full-icu 包或使用官方带 full ICU 的构建版本。Node 18+ 默认完整支持。Docker 镜像需确认基础镜像是否包含完整 ICU。',
        },
      ],
    },

    // ========================================================================
    // 知识点 2：ICU MessageFormat 与 i18next
    // ========================================================================
    {
      order: 2,
      title: 'ICU MessageFormat 与 i18next',
      difficulty: 4,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ma-p2-1',
          type: 'paragraph',
          lead: true,
          text: 'ICU MessageFormat 是国际化消息的标准语法，支持插值、复数（plural）、选择（select）、嵌套。i18next 是前端最流行的 i18n 框架，兼容 ICU 语法，支持命名空间懒加载、插值、复数、嵌套、延迟渲染等高级特性。',
        },
        {
          id: 'ma-p2-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'icu', label: 'ICU MessageFormat', group: 'standard', weight: 3 },
              { id: 'plural', label: '复数 plural', group: 'syntax' },
              { id: 'select', label: '选择 select', group: 'syntax' },
              { id: 'nested', label: '嵌套', group: 'syntax' },
              { id: 'i18next', label: 'i18next', group: 'framework', weight: 2 },
              { id: 'ns', label: '命名空间懒加载', group: 'feature' },
              { id: 'interpolation', label: '插值', group: 'feature' },
              { id: 'react-i18next', label: 'react-i18next', group: 'binding' },
              { id: 'vue-i18n', label: 'Vue I18n', group: 'binding' },
            ],
            edges: [
              { source: 'icu', target: 'plural', label: '语法' },
              { source: 'icu', target: 'select', label: '语法' },
              { source: 'icu', target: 'nested', label: '语法' },
              { source: 'i18next', target: 'icu', label: '兼容' },
              { source: 'i18next', target: 'ns', label: '特性' },
              { source: 'i18next', target: 'interpolation', label: '特性' },
              { source: 'react-i18next', target: 'i18next', label: '绑定' },
              { source: 'vue-i18n', target: 'icu', label: '兼容' },
            ],
          },
        },
        {
          id: 'ma-p2-3',
          type: 'code',
          code: `// ICU MessageFormat 语法
// 复数：{count, plural, =0 {无商品} one {# 件商品} other {# 件商品}}
// 性别：{gender, select, male {他} female {她} other {TA}}
// 嵌套：{count, plural, =0 {无评论} other {# 条来自{gender, select, male {他} female {她} other {TA}}的评论}}

// i18next 用法
import i18next from 'i18next'

i18next.init({
  resources: {
    'zh-CN': { translation: { welcome: '你好 {{name}}' } },
    'en-US': { translation: { welcome: 'Hello {{name}}' } },
  },
  lng: 'zh-CN',
})

i18next.t('welcome', { name: 'Tom' }) // 你好 Tom

// 复数（i18next 内置 _one/_other 后缀）
i18next.t('items', { count: 1 })   // 1 item
i18next.t('items', { count: 5 })   // 5 items`,
          language: 'js',
          filename: 'icu-i18next.js',
        },
        {
          id: 'ma-p2-4',
          type: 'code',
          code: `// 命名空间懒加载（减少首屏翻译包体积）
i18next.use(Backend).init({
  ns: ['common', 'dashboard'],
  defaultNS: 'common',
  backend: {
    // 按需加载：/locales/zh-CN/dashboard.json
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  partialBundledLanguages: true,
})

// 切换语言时按需加载
await i18next.loadNamespaces('dashboard')
await i18next.changeLanguage('en-US')`,
          language: 'js',
          filename: 'i18next-lazy.js',
        },
        {
          id: 'ma-p2-5',
          type: 'callout',
          variant: 'info',
          title: '📌 ICU 复数规则因语言而异',
          text: '英语有 one/other 两种复数形式；中文只有 other（5 件商品、1 件商品）；阿拉伯语有 6 种复数形式（zero/one/two/few/many/other）；俄语有 3 种。ICU plural 语法能正确处理所有语言的复数规则，手动判断会出错。',
        },
      ],
    },

    // ========================================================================
    // 知识点 3：react-i18next / Vue I18n 框架集成
    // ========================================================================
    {
      order: 3,
      title: 'react-i18next / Vue I18n 框架集成',
      difficulty: 3,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ma-p3-1',
          type: 'paragraph',
          lead: true,
          text: 'react-i18next 与 Vue I18n 分别是 React 与 Vue 生态的主流 i18n 方案。两者都基于 ICU 思想，但 API 风格不同：React 偏向 Hook（useTranslation），Vue 偏向 Composition API（useI18n）。',
        },
        {
          id: 'ma-p3-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '特性',
            columns: ['react-i18next', 'Vue I18n'],
            rows: [
              { feature: '底层框架', values: ['i18next', 'Vue I18n 独立实现'] },
              { feature: 'API 风格', values: ['useTranslation Hook', 'useI18n Composition API'] },
              { feature: '懒加载方式', values: ['React.lazy + Suspense', 'defineAsyncComponent'] },
              { feature: '插值语法', values: ['{{name}} 或 <Trans>', '{{name}} 或 $t'] },
              { feature: '复数处理', values: ['_one/_other 后缀', '_one/_other 或 ICU'] },
              { feature: 'SSR 支持', values: ['next-i18next 配合 Next.js', '@nuxtjs/i18n 配合 Nuxt'] },
              { feature: 'TypeScript', values: ['i18next-typescript 类型生成', 'vue-i18n@9 类型推断'] },
              { feature: '体积', values: ['~40KB（含 i18next 核心）', '~30KB'] },
            ],
          },
        },
        {
          id: 'ma-p3-3',
          type: 'code',
          code: `// react-i18next 用法
import { useTranslation } from 'react-i18next'

function Welcome({ name }) {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t('welcome', { name })}</h1>
      {/* 嵌套渲染：含 HTML 时用 Trans 组件 */}
      <Trans
        i18nKey="terms"
        components={{ link: <a href="/terms" /> }}
      />
      <button onClick={() => i18n.changeLanguage('en-US')}>EN</button>
    </div>
  )
}`,
          language: 'jsx',
          filename: 'react-i18next.jsx',
        },
        {
          id: 'ma-p3-4',
          type: 'code',
          code: `<!-- Vue I18n Composition API -->
<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function switchToEN() {
  locale.value = 'en-US'
}
</script>

<template>
  <div>
    <h1>{{ t('welcome', { name: 'Tom' }) }}</h1>
    <button @click="switchToEN">EN</button>
  </div>
</template>`,
          language: 'vue',
          filename: 'VueI18n.vue',
        },
        {
          id: 'ma-p3-5',
          type: 'callout',
          variant: 'tip',
          title: '💡 选型建议',
          text: 'React 项目无脑选 react-i18next（生态最成熟，Next.js 官方推荐）。Vue 3 项目用 vue-i18n@9（Composition API）。两者都支持懒加载、SSR、TypeScript。注意：含 HTML 的翻译用 <Trans>（React）/ v-html（Vue，注意 XSS）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 4：SEO 基础（meta / OG / JSON-LD / sitemap）
    // ========================================================================
    {
      order: 4,
      title: 'SEO 基础：meta / OG / JSON-LD / sitemap',
      difficulty: 3,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ma-p4-1',
          type: 'paragraph',
          lead: true,
          text: 'SEO（搜索引擎优化）的核心是让爬虫理解页面内容。技术 SEO 五要素：meta 标签（title/description/canonical）、Open Graph 社交分享、JSON-LD 结构化数据、sitemap.xml 站点地图、robots.txt 爬虫规则。',
        },
        {
          id: 'ma-p4-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'seo', label: '技术 SEO', group: 'core', weight: 3 },
              { id: 'meta', label: 'meta 标签', group: 'basic', weight: 2 },
              { id: 'og', label: 'Open Graph', group: 'social', weight: 2 },
              { id: 'jsonld', label: 'JSON-LD', group: 'structured', weight: 2 },
              { id: 'sitemap', label: 'sitemap.xml', group: 'crawl' },
              { id: 'robots', label: 'robots.txt', group: 'crawl' },
              { id: 'canonical', label: 'canonical', group: 'basic' },
              { id: 'hreflang', label: 'hreflang', group: 'i18n' },
            ],
            edges: [
              { source: 'seo', target: 'meta', label: '基础' },
              { source: 'seo', target: 'og', label: '社交' },
              { source: 'seo', target: 'jsonld', label: '结构化' },
              { source: 'seo', target: 'sitemap', label: '爬虫' },
              { source: 'seo', target: 'robots', label: '爬虫' },
              { source: 'meta', target: 'canonical', label: '去重' },
              { source: 'meta', target: 'hreflang', label: '多语言' },
            ],
          },
        },
        {
          id: 'ma-p4-3',
          type: 'code',
          code: `<!-- 1. 基础 meta 标签 -->
<head>
  <title>页面标题（≤60 字符） - 站点名</title>
  <meta name="description" content="页面摘要（≤160 字符，影响点击率）" />
  <link rel="canonical" href="https://example.com/article/123" />
</head>

<!-- 2. Open Graph（Facebook/微信/Twitter 等社交分享） -->
<meta property="og:title" content="分享标题" />
<meta property="og:description" content="分享描述" />
<meta property="og:image" content="https://example.com/og.jpg" />
<meta property="og:url" content="https://example.com/article/123" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />`,
          language: 'html',
          filename: 'meta-og.html',
        },
        {
          id: 'ma-p4-4',
          type: 'code',
          code: `<!-- 3. JSON-LD 结构化数据（搜索引擎理解的"实体"） -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "文章标题",
  "author": { "@type": "Person", "name": "Tom" },
  "datePublished": "2026-06-26",
  "image": "https://example.com/cover.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Example",
    "logo": { "@type": "ImageObject", "url": "..." }
  }
}
</script>

<!-- Next.js 中用 next/jsonld 或 metadata API -->
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: '文章标题',
  openGraph: { images: ['/og.jpg'] },
}`,
          language: 'html',
          filename: 'jsonld.html',
        },
        {
          id: 'ma-p4-5',
          type: 'code',
          code: `<!-- 4. sitemap.xml（提交给搜索引擎，告知可索引页面） -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/article/123</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>

<!-- robots.txt（控制爬虫访问） -->
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml`,
          language: 'xml',
          filename: 'sitemap-robots.xml',
        },
        {
          id: 'ma-p4-6',
          type: 'callout',
          variant: 'tip',
          title: '💡 canonical 的作用',
          text: '同一内容若可通过多个 URL 访问（如带参数、分页），用 <link rel="canonical"> 指向规范 URL，避免搜索引擎判定重复内容降权。例如 example.com/article?id=123 与 example.com/article/123 应统一指向后者。',
        },
      ],
    },

    // ========================================================================
    // 知识点 5：SSR/SSG 与多语言 SEO
    // ========================================================================
    {
      order: 5,
      title: 'SSR/SSG 与多语言 SEO',
      difficulty: 4,
      isNew: true,
      visualizationType: 'comparetable',
      blocks: [
        {
          id: 'ma-p5-1',
          type: 'paragraph',
          lead: true,
          text: '渲染方式直接影响 SEO：CSR（客户端渲染）爬虫可能看不到内容；SSR（服务端渲染）每次请求渲染，内容完整；SSG（静态生成）构建时生成 HTML，性能与 SEO 双优。多语言 SEO 还需选择 URL 策略与 hreflang 标注。',
        },
        {
          id: 'ma-p5-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '策略',
            columns: ['子目录', '子域名', '参数', '顶级域名'],
            rows: [
              { feature: '示例', values: ['/zh/、/en/', 'zh.example.com', '?lang=zh', 'example.cn'] },
              { feature: 'SEO 友好度', values: ['★★★★★ 最优', '★★★★ 较好', '★ 不推荐', '★★★★ 较好'] },
              { feature: '域名权重', values: ['共享主域名', '分散', '共享', '独立'] },
              { feature: '维护成本', values: ['低（统一路由）', '中（部署独立）', '低', '高（需注册多域名）'] },
              { feature: '适用', values: ['大多数场景', '地区强独立', '快速实现', '强地域定位'] },
            ],
            highlightColumn: 0,
          },
        },
        {
          id: 'ma-p5-3',
          type: 'code',
          code: `<!-- hreflang：告知搜索引擎同一内容的不同语言版本 -->
<!-- 必须双向标注：每个语言页都需列出所有语言版本（含自身） -->
<link rel="alternate" hreflang="zh-CN" href="https://example.com/zh/article" />
<link rel="alternate" hreflang="en-US" href="https://example.com/en/article" />
<link rel="alternate" hreflang="ja-JP" href="https://example.com/ja/article" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/article" />

<!-- x-default：当用户语言无匹配时的默认版本 -->
<!-- 注意：hreflang 与 canonical 配合使用，不能冲突 -->`,
          language: 'html',
          filename: 'hreflang.html',
        },
        {
          id: 'ma-p5-4',
          type: 'code',
          code: `// Next.js App Router 多语言 SEO 实战
// app/[locale]/layout.tsx
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = await import(\`@/locales/\${params.locale}.json\`)
  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: \`/\${params.locale}\`,
      languages: {
        'zh-CN': '/zh-CN',
        'en-US': '/en-US',
        'ja-JP': '/ja-JP',
        'x-default': '/en-US',
      },
    },
    openGraph: { locale: params.locale },
  }
}`,
          language: 'tsx',
          filename: 'next-metadata.tsx',
        },
        {
          id: 'ma-p5-5',
          type: 'callout',
          variant: 'warning',
          title: '⚠️ CSR 不利于 SEO',
          text: '纯 CSR（如 create-react-app）首屏返回空 HTML，爬虫需执行 JS 才能看到内容。Google 爬虫虽能执行 JS，但延迟大、不保证完整渲染。内容站点（电商、博客、资讯）应优先 SSR/SSG。后台管理类应用（不需 SEO）可用 CSR。',
        },
      ],
    },

    // ========================================================================
    // 知识点 6：前端监控与可观测性概述
    // ========================================================================
    {
      order: 6,
      title: '前端监控与可观测性概述',
      difficulty: 3,
      isNew: true,
      visualizationType: 'knowledgegraph',
      blocks: [
        {
          id: 'ma-p6-1',
          type: 'paragraph',
          lead: true,
          text: '可观测性（Observability）三支柱：日志（Logs）、指标（Metrics）、链路（Traces）。前端监控聚焦四维度：错误（稳定性）、性能（体验）、行为（业务）、用户反馈（满意度）。目标是「线上问题先于用户投诉发现」。',
        },
        {
          id: 'ma-p6-2',
          type: 'demo',
          visualizationType: 'knowledgegraph',
          data: {
            nodes: [
              { id: 'obs', label: '可观测性', group: 'core', weight: 3 },
              { id: 'logs', label: '日志 Logs', group: 'pillar' },
              { id: 'metrics', label: '指标 Metrics', group: 'pillar' },
              { id: 'traces', label: '链路 Traces', group: 'pillar' },
              { id: 'error', label: '错误监控', group: 'dimension', weight: 2 },
              { id: 'perf', label: '性能监控', group: 'dimension', weight: 2 },
              { id: 'behavior', label: '用户行为', group: 'dimension', weight: 2 },
              { id: 'feedback', label: '用户反馈', group: 'dimension' },
            ],
            edges: [
              { source: 'obs', target: 'logs', label: '支柱' },
              { source: 'obs', target: 'metrics', label: '支柱' },
              { source: 'obs', target: 'traces', label: '支柱' },
              { source: 'obs', target: 'error', label: '维度' },
              { source: 'obs', target: 'perf', label: '维度' },
              { source: 'obs', target: 'behavior', label: '维度' },
              { source: 'obs', target: 'feedback', label: '维度' },
            ],
          },
        },
        {
          id: 'ma-p6-3',
          type: 'table',
          headers: ['维度', '核心指标', '采集方式', '工具'],
          rows: [
            ['错误', 'JS 异常率、资源加载失败率', 'onerror + unhandledrejection + error capture', 'Sentry / Bugsnag / 自研'],
            ['性能', 'LCP / INP / CLS / TTFB', 'PerformanceObserver + Web Vitals', 'Web Vitals / Sentry Performance'],
            ['行为', 'PV / UV / 点击 / 曝光 / 漏斗', '手动埋点 + 无埋点', 'GA / 神策 / Mixpanel'],
            ['用户反馈', 'NPS / 满意度评分', '问卷 / 反馈组件', 'Hotjar / UserVoice'],
          ],
          caption: '监控四维度',
        },
        {
          id: 'ma-p6-4',
          type: 'callout',
          variant: 'info',
          title: '📌 可观测性 vs 监控',
          text: '监控（Monitoring）告诉你"什么出了问题"（已知未知）；可观测性（Observability）让你能回答"为什么出问题"（未知未知）。可观测性强调从外部行为推断内部状态，需要丰富的上下文（链路、日志、上下文快照）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 7：错误监控与 Source Map 还原
    // ========================================================================
    {
      order: 7,
      title: '错误监控与 Source Map 还原',
      difficulty: 4,
      isNew: true,
      visualizationType: 'error-monitoring-dashboard',
      blocks: [
        {
          id: 'ma-p7-1',
          type: 'paragraph',
          lead: true,
          text: '前端错误分三大类：JS 运行时错误（同步）、Promise 异常（异步）、资源加载错误（img/script/link 404）。三类需要不同的捕获方式，单靠 window.onerror 无法覆盖。捕获后还需上传 Source Map 还原压缩代码到源码位置。',
        },
        {
          id: 'ma-p7-2',
          type: 'paragraph',
          text: '下方错误监控面板模拟真实监控系统的界面。点击错误事件查看详情（堆栈、Source Map 还原、用户代理），切换捕获策略查看三种监听方式的代码示例与注意事项。注意资源错误必须用捕获阶段监听。',
        },
        {
          id: 'ma-p7-3',
          type: 'demo',
          visualizationType: 'error-monitoring-dashboard',
          data: {},
        },
        {
          id: 'ma-p7-4',
          type: 'code',
          code: `// 1. 同步 JS 错误（window.onerror）
window.onerror = (msg, src, line, col, err) => {
  tracker.report({
    type: 'js-error',
    message: msg,
    source: src, line, col,
    stack: err?.stack,
  })
  // 🌟 return true 可阻止默认错误打印（生产环境）
}

// 2. Promise 异常（unhandledrejection）
window.addEventListener('unhandledrejection', (e) => {
  tracker.report({
    type: 'unhandled-rejection',
    message: e.reason?.message || String(e.reason),
    stack: e.reason?.stack,
  })
})

// 3. 资源加载错误（必须在捕获阶段监听！）
window.addEventListener('error', (e) => {
  const target = e.target
  if (target instanceof HTMLElement) {
    tracker.report({
      type: 'resource-error',
      message: \`Failed to load \${target.tagName}: \${target.src || target.href}\`,
      source: target.src || target.href,
    })
  }
}, true) // 🌟 true = 捕获阶段，资源错误不冒泡`,
          language: 'js',
          filename: 'error-capture.js',
        },
        {
          id: 'ma-p7-5',
          type: 'code',
          code: `// Source Map 上传与还原
// 1. 构建时生成 .map 文件（webpack/vite 默认生成）
// build/vite.config.js
export default {
  build: {
    sourcemap: true, // 生成 .map
  },
}

// 2. 用 sentry-cli 上传到 Sentry（不部署到生产环境）
// $ sentry-cli sourcemaps upload --release v1.2.3 ./dist

// 3. 监控平台收到错误后，用 source-map 库还原
import { SourceMapConsumer } from 'source-map'

const smc = await SourceMapConsumer.new(rawSourceMap)
const original = smc.originalPositionFor({
  line: 42,    // 压缩后行号
  column: 18,  // 压缩后列号
})
// original: { source: 'UserList.tsx', line: 28, column: 12, name: 'map' }`,
          language: 'js',
          filename: 'source-map.js',
        },
        {
          id: 'ma-p7-6',
          type: 'callout',
          variant: 'warning',
          title: '⚠️ Source Map 安全',
          text: '.map 文件包含源码信息，绝不要部署到生产环境暴露给用户（泄露代码逻辑）。正确做法：构建时生成 .map → 上传到监控平台 → 删除生产环境的 .map 文件。Sentry/bugsnag 都支持 release 关联 + 自动还原。',
        },
      ],
    },

    // ========================================================================
    // 知识点 8：性能监控与 Web Vitals
    // ========================================================================
    {
      order: 8,
      title: '性能监控与 Web Vitals',
      difficulty: 4,
      isNew: true,
      visualizationType: 'performance-observer-demo',
      blocks: [
        {
          id: 'ma-p8-1',
          type: 'paragraph',
          lead: true,
          text: 'Web Vitals 是 Google 推出的核心性能指标，2024 年 3 月 INP 正式取代 FID 成为核心指标。三大核心：LCP（加载，≤2.5s）、INP（交互，≤200ms）、CLS（稳定，≤0.1）。采集用 PerformanceObserver API，上报用 sendBeacon 确保页面卸载时不丢失。',
        },
        {
          id: 'ma-p8-2',
          type: 'paragraph',
          text: '下方 PerformanceObserver 演示展示六大性能指标的采集代码与评分标准。点击指标卡片查看对应 entryType 的采集代码与"良好/需改进/较差"的阈值。点击"模拟采集"查看上报数据格式。',
        },
        {
          id: 'ma-p8-3',
          type: 'demo',
          visualizationType: 'performance-observer-demo',
          data: {},
        },
        {
          id: 'ma-p8-4',
          type: 'code',
          code: `// LCP 采集（largest-contentful-paint）
new PerformanceObserver((list) => {
  const entries = list.getEntries()
  const lastEntry = entries[entries.length - 1]
  reportLCP(lastEntry.startTime)
}).observe({ type: 'largest-contentful-paint', buffered: true })

// INP 采集（event，2024 年取代 FID）
let worstInp = 0
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    worstInp = Math.max(worstInp, entry.duration)
  }
  reportINP(worstInp)
}).observe({ type: 'event', buffered: true })

// CLS 采集（layout-shift，累计非输入触发的偏移）
let clsValue = 0
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) clsValue += entry.value
  }
  reportCLS(clsValue)
}).observe({ type: 'layout-shift', buffered: true })`,
          language: 'js',
          filename: 'web-vitals.js',
        },
        {
          id: 'ma-p8-5',
          type: 'code',
          code: `// 上报：用 sendBeacon 而非 fetch
// sendBeacon 在页面卸载时也能可靠发送（不阻塞卸载）
function report(metric, value) {
  const payload = JSON.stringify({
    metric,
    value,
    url: location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  })

  // 优先 sendBeacon（POST，64KB 限制）
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/metrics', payload)
  } else {
    // 兜底 fetch + keepalive
    fetch('/api/metrics', {
      method: 'POST',
      body: payload,
      keepalive: true, // 🌟 允许在页面卸载后完成请求
    })
  }
}`,
          language: 'js',
          filename: 'beacon-report.js',
        },
        {
          id: 'ma-p8-6',
          type: 'callout',
          variant: 'info',
          title: '📌 INP vs FID',
          text: 'FID（First Input Delay）只衡量首次交互延迟，对现代 SPA 不够准确。INP（Interaction to Next Paint）衡量所有交互的最差响应，更能反映真实体验。2024 年 3 月 INP 正式成为核心 Web Vital，FID 退役。',
        },
      ],
    },

    // ========================================================================
    // 知识点 9：Sentry 集成与采样策略
    // ========================================================================
    {
      order: 9,
      title: 'Sentry 集成与采样策略',
      difficulty: 4,
      isNew: true,
      visualizationType: 'accordion',
      blocks: [
        {
          id: 'ma-p9-1',
          type: 'paragraph',
          lead: true,
          text: 'Sentry 是最流行的错误监控平台，支持 release 关联（错误对应代码版本）、Source Map 自动还原、Session Replay（会话回放）、Performance（性能监控）、采样策略（控制成本）。下方手风琴速查 Sentry 核心配置与最佳实践。',
        },
        {
          id: 'ma-p9-2',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0, 2],
            items: [
              {
                title: 'Sentry SDK 初始化',
                content:
                  'Sentry.init 配置 DSN（数据上报地址）、release（版本号，关联 Source Map）、environment（环境）、tracesSampleRate（性能采样率）、replaysSessionSampleRate（回放采样率）。release 必须与 sentry-cli 上传时的 release 一致，否则无法还原 Source Map。',
                code: `import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://xxx@sentry.io/123',
  release: 'my-app@1.2.3', // 🌟 关联 Source Map
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% 性能采样
  replaysSessionSampleRate: 0.01, // 1% 普通会话回放
  replaysOnErrorSampleRate: 1.0, // 100% 错误会话回放
})`,
                codeLanguage: 'js',
              },
              {
                title: 'Release 关联与 Source Map',
                content:
                  '构建时生成 .map → sentry-cli 上传到对应 release → 删除生产环境 .map 文件。Sentry 收到错误时按 release 找到对应 Source Map 自动还原。命令：sentry-cli sourcemaps upload --release my-app@1.2.3 ./dist。CI/CD 中自动执行。',
                code: `# package.json scripts
"build": "vite build && sentry-cli sourcemaps upload --release $npm_package_version ./dist"

# .sentryclirc
[auth]
token=your-token
[defaults]
org=your-org
project=your-project`,
                codeLanguage: 'bash',
              },
              {
                title: 'Session Replay 会话回放',
                content:
                  'Session Replay 录制用户操作的 DOM 快照（类似视频），帮助复现难以重现的 bug。配置 replaysOnErrorSampleRate: 1.0（错误必录）、replaysSessionSampleRate: 0.01（普通会话抽样，控制成本）。注意：默认遮蔽密码、信用卡等敏感输入。',
                code: `Sentry.init({
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false, // 不遮蔽文本
      blockAllMedia: false,
      maskAllInputs: true, // 🌟 遮蔽所有输入
    }),
  ],
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0, // 错误 100% 录制
})`,
                codeLanguage: 'js',
              },
              {
                title: '采样策略',
                content:
                  '全量上报成本高、可能拖慢应用。采样原则：错误 100% 上报（不能漏），性能按比例采样（10% 足够统计趋势），Session Replay 错误 100% + 普通 1%。基于用户 ID 哈希采样保证同一用户行为完整。',
                code: `tracesSampler: (samplingContext) => {
  // 关键路径 100% 采样
  if (samplingContext.transactionContext.name === '/checkout') {
    return 1.0
  }
  // 错误事务 100%
  if (samplingContext.parentSampled === false) return 0
  // 其余 5%
  return 0.05
}`,
                codeLanguage: 'js',
              },
              {
                title: '告警冷却与通知',
                content:
                  'Sentry 告警规则：错误率突增、新错误首次出现、关键路径错误。冷却（Cooldown）避免告警风暴：同一规则触发后 30 分钟内不重复发送。通知渠道：邮件、Slack、钉钉、PagerDuty（电话告警）。生产事故分级：P0 电话、P1 IM、P2 邮件。',
                code: `# Sentry Alert 规则
- 名称: Checkout 错误突增
- 条件: /checkout 路径错误率 > 5% 持续 5 分钟
- 冷却: 30 分钟
- 通知: Slack #alerts + PagerDuty（P0）`,
                codeLanguage: 'bash',
              },
            ],
          },
        },
        {
          id: 'ma-p9-3',
          type: 'callout',
          variant: 'tip',
          title: '💡 采样必须基于用户 ID 哈希',
          text: '不能用 Math.random() 采样，否则同一用户的多次请求有的上报有的不上报，链路断裂。正确做法：hash(userId) % 100 < sampleRate，保证同一用户行为完整可追溯。',
        },
      ],
    },

    // ========================================================================
    // 知识点 10：用户行为埋点与漏斗分析
    // ========================================================================
    {
      order: 10,
      title: '用户行为埋点与漏斗分析',
      difficulty: 3,
      isNew: true,
      visualizationType: 'user-tracking-funnel',
      blocks: [
        {
          id: 'ma-p10-1',
          type: 'paragraph',
          lead: true,
          text: '用户行为埋点分两类：手动埋点（精确控制，开发成本高）与无埋点（全量采集，数据量大）。核心指标：PV（页面访问）、UV（独立访客）、点击/曝光/停留、漏斗转化率。漏斗分析用于定位用户流失环节，指导产品优化。',
        },
        {
          id: 'ma-p10-2',
          type: 'paragraph',
          text: '下方漏斗图展示电商从首页到支付成功的转化路径。点击各步骤查看流失原因与转化率，切换采样策略对比数据量与成本。注意 PV/UV 的区别：PV 是页面访问次数（同一用户多次访问计多次），UV 是去重用户数。',
        },
        {
          id: 'ma-p10-3',
          type: 'demo',
          visualizationType: 'user-tracking-funnel',
          data: {},
        },
        {
          id: 'ma-p10-4',
          type: 'code',
          code: `// 手动埋点：精确控制事件与参数
tracker.track('button_click', {
  buttonId: 'submit',
  page: '/checkout',
  userId: user.id,
  // 业务上下文
  cartValue: 99.5,
  itemCount: 3,
})

// 无埋点：监听全局点击，自动采集
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  const xpath = getXPath(target) // 自动生成 xpath
  tracker.track('auto_click', { xpath, page: location.pathname })
}, true)

// PV/UV 采集
// PV：每次页面访问 +1
tracker.pageView({ url: location.href, referrer: document.referrer })
// UV：基于用户 ID 或 cookie 去重，服务端统计`,
          language: 'js',
          filename: 'tracking.js',
        },
        {
          id: 'ma-p10-5',
          type: 'code',
          code: `// 单页应用（SPA）PV 采集
// SPA 切换路由不刷新页面，需监听路由变化
import { useRouter } from 'next/router'

function usePageView() {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      tracker.pageView({
        url,
        referrer: prevUrl,
        duration: Date.now() - pageEnterTime,
      })
      prevUrl = url
      pageEnterTime = Date.now()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router])
}`,
          language: 'js',
          filename: 'spa-pv.js',
        },
        {
          id: 'ma-p10-6',
          type: 'callout',
          variant: 'info',
          title: '📌 埋点合规：用户隐私',
          text: 'GDPR（欧盟）、CCPA（加州）、个人信息保护法（中国）要求：采集前告知用户、获取同意、提供退出选项、不采集敏感信息（身份证、医疗）。cookie 需用户同意后才能写入。推荐使用 OneTrust 等 CMP（同意管理平台）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 11：JWT 与 Session 对比
    // ========================================================================
    {
      order: 11,
      title: 'JWT 与 Session 对比',
      difficulty: 4,
      isNew: true,
      visualizationType: 'jwt-payload-decoder',
      blocks: [
        {
          id: 'ma-p11-1',
          type: 'paragraph',
          lead: true,
          text: '认证（Authentication）回答"你是谁"，授权（Authorization）回答"你能做什么"。两者是不同概念：登录是认证，权限控制是授权。前端常用方案：Session（有状态，服务端存储）与 JWT（无状态，签名自包含）。',
        },
        {
          id: 'ma-p11-2',
          type: 'demo',
          visualizationType: 'comparetable',
          data: {
            featureColumn: '维度',
            columns: ['Session', 'Token（JWT）'],
            rows: [
              { feature: '状态', values: ['有状态（服务端存储）', '无状态（签名自包含）'] },
              { feature: '存储位置', values: ['Cookie', 'localStorage / Cookie'] },
              { feature: '扩展性', values: ['需共享 Session 存储（Redis）', '天然支持分布式'] },
              { feature: '撤销', values: ['简单（删除服务端记录）', '困难（需黑名单或缩短 exp）'] },
              { feature: '安全', values: ['HttpOnly Cookie 防 XSS', '注意 XSS 窃取 localStorage'] },
              { feature: '体积', values: ['小（仅 sessionId）', '大（含 Payload）'] },
              { feature: '适用', values: ['传统 Web 应用、需主动登出', 'API 网关、微服务、移动端'] },
            ],
          },
        },
        {
          id: 'ma-p11-3',
          type: 'paragraph',
          text: '下方 JWT 解码器展示三段式结构。点击 Header/Payload/Signature 各段查看解码内容与字段说明，红色标记的为敏感字段。重点理解：Payload 仅 Base64URL 编码（不是加密），任何人都能解码查看。',
        },
        {
          id: 'ma-p11-4',
          type: 'demo',
          visualizationType: 'jwt-payload-decoder',
          data: {},
        },
        {
          id: 'ma-p11-5',
          type: 'code',
          code: `// JWT 签发（服务端）
import jwt from 'jsonwebtoken'

const token = jwt.sign(
  { sub: '123', name: 'Tom', admin: true }, // Payload
  process.env.JWT_SECRET,                    // 密钥
  { expiresIn: '15m' },                       // 15 分钟过期
)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi...

// JWT 验证（服务端中间件）
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).send('Unauthorized')

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (e) {
    res.status(401).send('Invalid token')
  }
}`,
          language: 'js',
          filename: 'jwt-server.js',
        },
        {
          id: 'ma-p11-6',
          type: 'callout',
          variant: 'warning',
          title: '💡 JWT 存储权衡',
          text: 'localStorage 易被 XSS 窃取（一旦 XSS 漏洞即全盘沦陷）；HttpOnly Cookie 防 XSS 但有 CSRF 风险。推荐组合：access_token 内存存储（刷新页面丢失，配合 refresh）、refresh_token HttpOnly Cookie（防 XSS，配合 SameSite 防 CSRF）。',
        },
        {
          id: 'ma-p11-7',
          type: 'callout',
          variant: 'warning',
          title: '⛔ JWT Payload 不是加密的',
          text: 'Payload 仅 Base64URL 编码，任何人都能用 atob 解码查看。绝不要在 Payload 放敏感信息（密码、密钥、支付信息）。Signature 仅保证完整性（防篡改），不保证机密性。需要加密用 JWE（JSON Web Encryption）。',
        },
      ],
    },

    // ========================================================================
    // 知识点 12：OAuth 2.0 / PKCE / NextAuth
    // ========================================================================
    {
      order: 12,
      title: 'OAuth 2.0 / PKCE / NextAuth',
      difficulty: 5,
      isNew: true,
      visualizationType: 'auth-flow-graph',
      blocks: [
        {
          id: 'ma-p12-1',
          type: 'paragraph',
          lead: true,
          text: 'OAuth 2.0 是授权协议（不是认证），允许用户授权第三方应用访问其在另一服务的数据（如"用 GitHub 登录"）。四种模式中授权码模式最常用，OAuth 2.1 强制要求公开客户端（SPA/移动端）使用 PKCE 增强。NextAuth.js（Auth.js）是 Next.js 生态主流认证库。',
        },
        {
          id: 'ma-p12-2',
          type: 'paragraph',
          text: '下方认证流程图展示四种主流模式。点击切换模式，高亮步骤为 PKCE 增强部分。重点关注授权码 + PKCE 模式：用 code_verifier/challenge 替代 client_secret，即使授权码被截获也无法换取 token。',
        },
        {
          id: 'ma-p12-3',
          type: 'demo',
          visualizationType: 'auth-flow-graph',
          data: {},
        },
        {
          id: 'ma-p12-4',
          type: 'table',
          headers: ['模式', '适用', '安全性', '说明'],
          rows: [
            ['授权码', '有后端 Web 应用', '★★★★★', 'code 换 token，secret 服务端保管'],
            ['授权码 + PKCE', 'SPA / 移动端', '★★★★★', 'OAuth 2.1 强制，无 secret'],
            ['隐式', '已弃用', '★★', 'token 直接返回前端，不安全'],
            ['密码', '高度信任应用', '★★★', '客户端直接拿账号密码，不推荐'],
            ['客户端模式', '服务间通信', '★★★★', '无用户参与，client_id + secret'],
          ],
          caption: 'OAuth 2.0 四模式',
        },
        {
          id: 'ma-p12-5',
          type: 'code',
          code: `// PKCE 实现（SPA 授权码流程）
// 1. 生成 code_verifier（随机字符串）和 code_challenge（SHA256 哈希）
function generatePKCE() {
  const codeVerifier = base64UrlEncode(crypto.getRandomValues(new Uint8Array(32)))
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const codeChallenge = base64UrlEncode(new Uint8Array(hash))
  return { codeVerifier, codeChallenge, method: 'S256' }
}

// 2. 重定向到授权页（带 code_challenge）
const { codeVerifier, codeChallenge } = generatePKCE()
sessionStorage.setItem('code_verifier', codeVerifier) // 🌟 暂存
window.location.href = \`https://github.com/login/oauth/authorize?\` +
  \`client_id=\${CLIENT_ID}&\` +
  \`redirect_uri=\${REDIRECT_URI}&\` +
  \`code_challenge=\${codeChallenge}&\` +
  \`code_challenge_method=S256&\` +
  \`state=\${randomState}\`

// 3. 回调后用 code + code_verifier 换 token
const codeVerifier = sessionStorage.getItem('code_verifier')
const res = await fetch('/api/token', {
  method: 'POST',
  body: JSON.stringify({ code, codeVerifier }),
})`,
          language: 'js',
          filename: 'pkce.js',
        },
        {
          id: 'ma-p12-6',
          type: 'code',
          code: `// NextAuth.js (Auth.js v5) 实战
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // JWT session（默认）或 database session
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})

// 服务端组件获取 session
import { auth } from '@/auth'
export default async function Page() {
  const session = await auth()
  if (!session) redirect('/login')
  return <h1>Hi {session.user.name}</h1>
}`,
          language: 'tsx',
          filename: 'nextauth.tsx',
        },
        {
          id: 'ma-p12-7',
          type: 'callout',
          variant: 'tip',
          title: '💡 PKCE 必要性',
          text: 'OAuth 2.1 将 PKCE 列为所有公开客户端的强制要求。SPA 无法安全保存 client_secret（前端代码可被反编译），用 code_verifier/challenge 替代。即使授权码被截获，没有 code_verifier 也无法换取 token。',
        },
      ],
    },

    // ========================================================================
    // 知识点 13：RBAC 前端鉴权与综合速查测验
    // ========================================================================
    {
      order: 13,
      title: 'RBAC 前端鉴权与综合速查测验',
      difficulty: 4,
      isNew: true,
      visualizationType: 'rbac-permission-matrix',
      blocks: [
        {
          id: 'ma-p13-1',
          type: 'paragraph',
          lead: true,
          text: '前端鉴权分三层：路由级（哪些页面可访问）、按钮级（哪些操作可执行）、数据级（哪些字段可见）。RBAC（基于角色的访问控制）将权限赋予角色，用户关联角色。前端权限控制仅为体验优化，真正的安全校验必须在后端完成。',
        },
        {
          id: 'ma-p13-2',
          type: 'paragraph',
          text: '下方 RBAC 矩阵演示角色 × 资源 × 操作的权限分配。切换当前角色查看权限矩阵、按钮级控制（按钮禁用/隐藏）、路由级控制（路由守卫）三种视图。重点理解：前端权限只是体验优化，后端 API 必须二次校验。',
        },
        {
          id: 'ma-p13-3',
          type: 'demo',
          visualizationType: 'rbac-permission-matrix',
          data: {},
        },
        {
          id: 'ma-p13-4',
          type: 'code',
          code: `// 路由级鉴权：React Router 守卫
function RequireRole({ roles, children }) {
  const { user } = useAuth()
  if (!roles.includes(user.role)) {
    return <Navigate to="/403" replace />
  }
  return children
}

<Route
  path="/users"
  element={
    <RequireRole roles={['admin']}>
      <UserManagement />
    </RequireRole>
  }
/>

// Next.js middleware 路由守卫
export function middleware(req: NextRequest) {
  const user = getUserFromCookie(req)
  const path = req.nextUrl.pathname

  if (path.startsWith('/users') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', req.url))
  }
}`,
          language: 'jsx',
          filename: 'route-guard.jsx',
        },
        {
          id: 'ma-p13-5',
          type: 'code',
          code: `// 按钮级鉴权：自定义 Hook + 组件
function useRBAC() {
  const { user } = useAuth()
  return {
    hasPermission: (resource, action) => {
      const role = user.role
      const perm = permissionTable[role]?.[resource]
      return perm?.includes(action) ?? false
    },
  }
}

// 用法 1：禁用按钮
const { hasPermission } = useRBAC()
<Button disabled={!hasPermission('article', 'delete')}>删除</Button>

// 用法 2：条件渲染（更安全，DOM 不存在）
{hasPermission('article', 'delete') && <DeleteButton />}

// Vue 自定义指令
app.directive('permission', {
  mounted(el, binding) {
    if (!hasPermission(binding.value.resource, binding.value.action)) {
      el.parentNode.removeChild(el)
    }
  },
})
// <button v-permission="{ resource: 'article', action: 'delete' }">删除</button>`,
          language: 'js',
          filename: 'button-permission.js',
        },
        {
          id: 'ma-p13-6',
          type: 'callout',
          variant: 'warning',
          title: '⛔ 前端权限只是体验优化',
          text: '前端权限控制（路由守卫、按钮隐藏）只是体验优化，真正的安全校验必须在后端 API 层完成。前端代码可被篡改（修改 React 组件、改 fetch 请求），任何"前端校验通过"都不可信。后端必须二次校验权限，前端防止误操作，后端防止恶意访问。',
        },
        {
          id: 'ma-p13-7',
          type: 'callout',
          variant: 'info',
          title: '📌 WebAuthn / Passkey 无密码趋势',
          text: 'WebAuthn 是 W3C 标准，基于公私钥实现无密码认证。注册时设备生成密钥对，私钥留存设备（受生物识别保护），公钥上传服务端。认证时用私钥签名 challenge，服务端用公钥验签。优势：抗钓鱼（私钥不离开设备）、无需密码、用户体验好。iOS/Android/Windows 都已支持 Passkey。',
        },
        {
          id: 'ma-p13-8',
          type: 'paragraph',
          text: '综合速查表 + 小测验：检验你对监控埋点与认证授权的掌握程度。',
        },
        {
          id: 'ma-p13-9',
          type: 'demo',
          visualizationType: 'accordion',
          data: {
            defaultOpen: [0],
            items: [
              {
                title: 'i18n / SEO 速查',
                content:
                  'Intl API：浏览器原生日期/数字/货币格式化。ICU MessageFormat：plural（复数）/ select（性别）/ 嵌套，复数规则因语言而异（阿拉伯语 6 种）。i18next：命名空间懒加载，react-i18next useTranslation，vue-i18n useI18n。SEO：meta（title ≤60 / description ≤160）、canonical（去重）、Open Graph（社交分享）、JSON-LD（结构化数据）、sitemap.xml、robots.txt。多语言：子目录最优、hreflang 双向标注 + x-default。SSR/SSG 利好 SEO，CSR 不推荐内容站。',
              },
              {
                title: '监控速查',
                content:
                  '错误监控：window.onerror（同步 JS）+ unhandledrejection（Promise）+ addEventListener(error, fn, true)（资源，必须捕获阶段）。Source Map：构建生成 .map → sentry-cli 上传 → 删除生产环境 .map。性能：PerformanceObserver + Web Vitals（LCP≤2.5s / INP≤200ms / CLS≤0.1）。INP 2024 年取代 FID。上报用 sendBeacon（页面卸载不丢）。Sentry：release 关联、Session Replay、采样（基于 userId 哈希，错误 100%、性能 10%、回放错误 100%）。告警冷却避免风暴。',
              },
              {
                title: '认证授权速查',
                content:
                  '认证 vs 授权：你是谁 vs 你能做什么。Session：有状态、Cookie、易撤销、需 Redis 共享。JWT：无状态、自包含、Payload 非加密、撤销难、分布式友好。JWT 三段：Header.Payload.Signature，exp 必填。存储：access 内存 + refresh HttpOnly Cookie。OAuth 2.0：授权码（最常用）、PKCE（SPA 必备，OAuth 2.1 强制）、隐式（弃用）、密码（不推荐）、客户端（服务间）。NextAuth.js（Auth.js v5）：Next.js 主流。WebAuthn/Passkey：公私钥无密码、抗钓鱼。前端鉴权：路由级（守卫）+ 按钮级（指令/组件）+ 数据级，仅体验优化，后端必须二次校验。',
              },
            ],
          },
        },
        {
          id: 'ma-p13-10',
          type: 'demo',
          visualizationType: 'quiz',
          data: {
            questions: [
              {
                question: '前端权限控制（路由守卫、按钮隐藏）的真正作用是？',
                options: ['真正的安全校验', '用户体验优化', '替代后端鉴权', '防止恶意访问'],
                correctIndex: 1,
                explanation:
                  '前端权限控制只是体验优化，真正的安全校验必须在后端 API 层完成。前端防止误操作，后端防止恶意访问。',
              },
              {
                question: '关于 JWT 的 Payload，以下说法正确的是？',
                options: [
                  'Payload 是加密的，可放敏感信息',
                  'Payload 仅 Base64 编码，不是加密',
                  'Payload 不可解码',
                  'Payload 由服务端加密后下发',
                ],
                correctIndex: 1,
                explanation:
                  'Payload 仅 Base64URL 编码，任何人可解码。绝不要在 Payload 放敏感信息。Signature 仅保证完整性，不保证机密性。',
              },
              {
                question: 'SPA 授权应使用以下哪种 OAuth 模式？',
                options: ['隐式模式', '授权码 + PKCE', '密码模式', '客户端模式'],
                correctIndex: 1,
                explanation:
                  'OAuth 2.1 将 PKCE 列为所有公开客户端的强制要求。SPA 无法安全保存 client_secret，用 code_verifier/challenge 替代。',
              },
              {
                question: '捕获 <img>/<script> 加载失败，必须使用以下哪种方式？',
                options: [
                  'window.onerror',
                  "addEventListener('error', fn, true)",
                  'try/catch',
                  'unhandledrejection',
                ],
                correctIndex: 1,
                explanation:
                  '资源错误不冒泡，window.onerror 无法捕获。必须在捕获阶段（capture:true）监听 error 事件。',
              },
              {
                question: '2024 年取代 FID 的核心性能指标是？',
                options: ['LCP', 'INP', 'CLS', 'TTFB'],
                correctIndex: 1,
                explanation:
                  'INP（Interaction to Next Paint）衡量交互响应，2024 年 3 月取代 FID 成为核心指标，目标 < 200ms。',
              },
              {
                question: 'ICU MessageFormat 的 plural 语法主要解决什么问题？',
                options: ['日期格式化', '复数形式差异', '货币转换', '字符编码'],
                correctIndex: 1,
                explanation:
                  '复数规则因语言而异（如阿拉伯语有 6 种复数形式），ICU plural 语法能正确处理各语言复数。',
              },
              {
                question: '多语言 SEO 的 URL 策略中，最不推荐的是？',
                options: ['子目录 /zh/', '子域名 zh.example.com', '参数 ?lang=zh', '顶级域名 example.cn'],
                correctIndex: 2,
                explanation:
                  '参数策略 SEO 不友好，搜索引擎可能忽略参数变化。子目录最优，共享域名权重且易维护。',
              },
              {
                question: 'Source Map 文件正确的处理方式是？',
                options: [
                  '部署到生产环境供用户访问',
                  '上传到监控平台后删除生产环境的 .map',
                  '只在本机保留，不部署',
                  '提交到 Git 仓库长期保存',
                ],
                correctIndex: 1,
                explanation:
                  '.map 包含源码信息，绝不能暴露给用户。正确做法：构建生成 → 上传到 Sentry 等监控平台 → 删除生产环境 .map 文件。',
              },
            ],
          },
        },
      ],
    },
  ],
}
