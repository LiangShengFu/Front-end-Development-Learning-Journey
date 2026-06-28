/**
 * i18n 中文资源
 *
 * 按命名空间分组的扁平 key 列表（点号分隔，如 "nav.home"）。
 * 与 i18n-messages-en.ts 一一对应。
 */
export const zh: Record<string, string> = {
  // ============ common ============
  'common.backToHome': '返回首页',
  'common.browseModules': '浏览模块',
  'common.browseAllModules': '浏览全部模块',
  'common.startWithHtml': '从 HTML 基础开始 →',

  // ============ nav ============
  'nav.home': '首页',
  'nav.modules': '模块',
  'nav.progress': '进度',
  'nav.about': '关于',
  'nav.search': '搜索',
  'nav.startLearning': '开始学习',
  'nav.brandSubtitle': '/ 前端学习之旅',
  'nav.toggleMenu': '切换菜单',
  'nav.toggleLang': '切换语言',

  // ============ footer ============
  'footer.tagline': '前端开发学习之旅 — 交互式学习平台。',
  'footer.navTitle': '导航',
  'footer.home': '首页',
  'footer.allModules': '全部模块',
  'footer.about': '关于项目',
  'footer.techStack': '技术栈',
  'footer.copyright': '© {year} Front-end Development Learning Journey',
  'footer.builtWith': 'Built with inspired design language',

  // ============ home ============
  'home.heroEyebrow': 'Front-end Development Learning Journey',
  'home.heroTitle1': '前端开发',
  'home.heroTitle2': '学习之旅',
  'home.heroDesc':
    '25 个模块 · 13 种可视化组件 · {totalPoints}+ 知识点的交互式前端学习平台。从 HTML 基础到面试冲刺，系统化覆盖前端工程师的完整知识体系。',
  'home.statModules': '模块数',
  'home.statPoints': '知识点',
  'home.statVisualizations': '可视化组件',
  'home.statStages': '学习阶段',
  'home.pathEyebrow': '学习路径',
  'home.pathTitle': '8 个阶段 · 25 个模块',
  'home.pathDesc': '从基础到面试冲刺，循序渐进的完整学习路径。每个阶段聚焦一个核心能力域。',
  'home.stageModule': '模块 {from}-{to}',
  'home.stageModulesCount': '{count} 个模块',
  'home.kpVizCount': '{kp} 知识点 · {viz} 可视化',

  // ============ modules ============
  'modules.allEyebrow': 'Modules',
  'modules.allTitle': '全部模块',
  'modules.allDesc':
    '25 个模块覆盖前端开发完整知识体系，按 8 个学习阶段组织。点击任意模块开始学习。',
  'modules.kpCount': '{count} 知识点',
  'modules.vizCount': '{count} 可视化',

  // ============ about ============
  'about.eyebrow': 'About This Project',
  'about.title': '关于本项目',
  'about.desc': '一个系统化的前端开发学习平台，以交互式可视化组件为核心，覆盖前端工程师完整知识体系。',
  'about.visionEyebrow': '项目愿景',
  'about.visionTitle': '让前端学习可交互、可感知',
  'about.visionDesc1':
    '传统的前端学习资料以文字为主，抽象概念难以理解。本项目通过 13 种可视化组件，将每一个知识点都配以相应的交互式演示，让学习者在"看"和"操作"中建立直觉。',
  'about.visionDesc2':
    '25 个模块覆盖从 HTML 基础到面试冲刺的完整路径，420+ 知识点循序渐进。每个知识点都标注难度等级，便于按需学习。',
  'about.techEyebrow': '技术栈',
  'about.techTitle': '现代前端技术栈构建',
  'about.techReact': 'UI 框架，函数组件 + Hooks',
  'about.techTs': '类型安全，完整类型系统',
  'about.techVite': '极速构建与热更新',
  'about.techTailwind': '原子化 CSS，设计系统落地',
  'about.techRouter': '客户端路由，懒加载',
  'about.techVitest': '单元测试与组件测试',
  'about.designEyebrow': '设计语言',
  'about.designTitle': '暗色设计系统',
  'about.designDesc':
    '本项目遵循的设计语言：近黑色画布（#0a0a0a）为唯一底色，白色描边胶囊按钮作为统一的交互元素，无阴影、无渐变背景。',
  'about.designNoteTitle': '设计原则',
  'about.designNoteDesc':
    '字重 400 贯穿全局，负字距 + 字号层级承担强调职责；GeistMono 大写跟踪标签作为"代码注释"式标识；胶囊形（pill 9999px）是所有按钮的统一形态；卡片为 8px 圆角矩形配发丝边框，无阴影。',

  // ============ notFound ============
  'notFound.eyebrow': '404 / Not Found',
  'notFound.title': '页面未找到',
  'notFound.desc': '你访问的页面不存在。可能链接已失效或输入有误。',
  'notFound.backHome': '返回首页',
  'notFound.browseModules': '浏览模块',

  // ============ progress ============
  'progress.eyebrow': 'LEARNING PROGRESS',
  'progress.title': '学习进度',
  'progress.desc': '基于间隔重复算法（SM-2）的持久化学习记录，数据保存在本地浏览器。',
  'progress.visited': '已访问',
  'progress.completed': '已完成',
  'progress.due': '待复习',
  'progress.bookmarks': '收藏',
  'progress.dueTitle': '待复习',
  'progress.dueEmpty': '暂无到期复习项。完成知识点后会按 SM-2 算法安排下次复习时间。',
  'progress.knowledgePoint': '知识点 {n}',
  'progress.overdue': '过期 {n} 天',
  'progress.reviewCta': '复习 →',
  'progress.bookmarksTitle': '收藏 ({n})',
  'progress.bookmarkPoint': '知识点 #{n}',
  'progress.moduleProgress': '模块完成度',
  'progress.dangerZone': '危险操作',
  'progress.clearAll': '清空所有进度',
  'progress.confirmClear': '确认清空所有学习进度？此操作不可撤销。',

  // ============ search ============
  'search.ariaLabel': '全局搜索',
  'search.placeholder': '搜索模块或知识点…',
  'search.empty': '未找到匹配内容',
  'search.hint': '输入关键词搜索全部 25 个模块与知识点',
  'search.buildingIndex': '（正在建立索引…）',
  'search.navHint': '↑↓ 导航 · Enter 打开',
  'search.resultsCount': '{n} 条结果',

  // ============ pointActions ============
  'pointActions.markComplete': '标记完成',
  'pointActions.completed': '已完成',
  'pointActions.bookmark': '收藏',
  'pointActions.bookmarked': '已收藏',
  'pointActions.unbookmark': '取消收藏',
  'pointActions.dueReview': '待复习',
  'pointActions.todayReview': '今日复习',
  'pointActions.daysLaterReview': '{n}天后复习',
  'pointActions.reviewTitle': '回忆自评',
  'pointActions.closeReview': '关闭评分',
  'pointActions.q0': '完全不会',
  'pointActions.q2': '答错但眼熟',
  'pointActions.q3': '回忆吃力',
  'pointActions.q4': '基本记得',
  'pointActions.q5': '完美回忆',
  'pointActions.reviewHint': '评分越低，下次复习间隔越短（SM-2 算法）。',
}
