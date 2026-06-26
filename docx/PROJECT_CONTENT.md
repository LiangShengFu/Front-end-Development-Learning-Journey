# 前端开发知识体系 - 项目信息文档

## 一、项目概述

**项目名称**: Front-end Development Learning Journey

---

## 二、可视化组件体系（13种）

### 2.1 原有组件（5种）

| 组件           | 类型标识       | 用途                  | 文件                                                                               |
| -------------- | -------------- | --------------------- | ---------------------------------------------------------------------------------- |
| KnowledgeGraph | knowledgegraph | 知识节点关系图        | [KnowledgeGraph.tsx](file:///workspace/src/components/interactive/KnowledgeGraph.tsx) |
| FlipCard       | flipcard       | 翻转卡片（正反两面）  | [FlipCard.tsx](file:///workspace/src/components/interactive/FlipCard.tsx)             |
| SkillBar       | skillbar       | 技能条进度动画        | [SkillBar.tsx](file:///workspace/src/components/interactive/SkillBar.tsx)             |
| Sandbox        | sandbox        | 代码沙盒（可运行 JS） | [Sandbox.tsx](file:///workspace/src/components/interactive/Sandbox.tsx)               |
| DragDemo       | drag           | 拖拽交互演示          | [DragDemo.tsx](file:///workspace/src/components/interactive/DragDemo.tsx)             |

### 2.2 新增组件（6种）

| 组件                          | 类型标识     | 用途                         | 文件                                                                                         |
| ----------------------------- | ------------ | ---------------------------- | -------------------------------------------------------------------------------------------- |
| **Timeline**            | timeline     | 时间线/步骤流程（垂直/水平） | [Timeline.tsx](file:///workspace/src/components/interactive/Timeline.tsx)                       |
| **CompareTable**        | comparetable | 多列对比表格                 | [CompareTable.tsx](file:///workspace/src/components/interactive/CompareTable.tsx)               |
| **CodeStepper**         | codestepper  | 代码分步执行演示             | [CodeStepper.tsx](file:///workspace/src/components/interactive/CodeStepper.tsx)                 |
| **ArchitectureDiagram** | architecture | 分层架构图                   | [ArchitectureDiagram.tsx](file:///workspace/src/components/interactive/ArchitectureDiagram.tsx) |
| **QuizCard**            | quiz         | 交互式测验卡片               | [QuizCard.tsx](file:///workspace/src/components/interactive/QuizCard.tsx)                       |
| **Accordion**           | accordion    | 手风琴折叠面板               | [Accordion.tsx](file:///workspace/src/components/interactive/Accordion.tsx)                     |

### 2.3 类型定义

核心类型定义在 [types.ts](file:///workspace/src/lib/types.ts) 中：

- `ContentBlock`: 内容块基础类型
- `DemoType`: 11 种 demo 类型的联合类型
- `demoMeta`: 各组件的额外配置元数据

---

## 三、25 个模块完整知识点与可视化

---

### 📚 第一阶段：基础（模块 01-05）

---

#### 模块 01：HTML 基础

**slug**: html-fundamentals
**阶段**: 基础阶段 · 第 1 模块
**图标**: 📄

**完整知识点清单**：

| 序号 | 知识点                                | 难度   | 新增/原有      | 对应可视化          |
| ---- | ------------------------------------- | ------ | -------------- | ------------------- |
| 1    | HTML 定义与作用                       | ⭐     | 原有           | -                   |
| 2    | HTML 元素结构（起始/内容/结束）       | ⭐     | 原有           | CodeStepper         |
| 3    | HTML 文档结构（head/body）            | ⭐⭐   | 原有           | ArchitectureDiagram |
| 4    | 常见 HTML 元素分类                    | ⭐     | 原有           | CompareTable        |
| 5    | 块级 vs 行内 vs 行内块                | ⭐⭐   | 原有           | 布局可视化          |
| 6    | HTML 属性体系（id/class/data-/aria-） | ⭐⭐   | 原有           | Accordion           |
| 7    | HTML 发展历程                         | ⭐     | **新增** | Timeline            |
| 8    | 语义化标签（8种核心标签）             | ⭐⭐   | 原有           | CompareTable + 表格 |
| 9    | 语义化 vs 非语义化对比                | ⭐⭐   | **新增** | CompareTable        |
| 10   | 表单元素与验证                        | ⭐⭐⭐ | 原有           | Sandbox             |
| 11   | HTML5 input 类型大全                  | ⭐⭐   | 原有           | Accordion           |
| 12   | 表格结构（thead/tbody/tr/th/td）      | ⭐⭐   | 原有           | 表格动画            |
| 13   | 描述列表 dl/dt/dd                     | ⭐     | 原有           | -                   |
| 14   | 无障碍 WCAG POUR 四原则               | ⭐⭐⭐ | 原有           | Timeline            |
| 15   | ARIA 属性使用                         | ⭐⭐⭐ | 原有           | -                   |
| 16   | 多媒体 video/audio                    | ⭐⭐   | 原有           | -                   |
| 17   | Canvas 与 SVG 概述                    | ⭐     | 原有           | -                   |
| 18   | HTML5 API 能力图谱                    | ⭐⭐   | 原有           | 知识图谱            |
| 19   | URL 结构解析                          | ⭐     | 原有           | URL解析器           |
| 20   | 小测验：HTML 基础                     | ⭐     | **新增** | QuizCard            |

**可视化数量**：11 种
**新增可视化**：Timeline（HTML发展历程）、CompareTable（元素对比/语义化对比）、CodeStepper（元素结构拆解）、ArchitectureDiagram（文档结构）、Accordion（属性详解/input类型）、QuizCard（测验）

---

#### 模块 02：CSS 基础与核心原理

**slug**: css-fundamentals
**阶段**: 基础阶段 · 第 2 模块
**图标**: 🎨

**完整知识点清单**：

| 序号 | 知识点                                       | 难度     | 新增/原有      | 对应可视化    |
| ---- | -------------------------------------------- | -------- | -------------- | ------------- |
| 1    | CSS 引入方式（内联/内部/外部）               | ⭐       | 原有           | -             |
| 2    | 选择器体系（10+种选择器）                    | ⭐⭐     | 原有           | 知识图谱      |
| 3    | 选择器优先级计算                             | ⭐⭐⭐   | 原有           | 优先级可视化  |
| 4    | 伪类与伪元素                                 | ⭐⭐⭐   | 原有           | 伪类演示器    |
| 5    | 盒模型（标准/怪异 box-sizing）               | ⭐⭐     | 原有           | 盒模型交互图  |
| 6    | BFC / IFC 格式化上下文                       | ⭐⭐⭐⭐ | 原有           | -             |
| 7    | Flexbox 布局                                 | ⭐⭐⭐   | 原有           | Flex 交互演示 |
| 8    | Grid 布局                                    | ⭐⭐⭐   | 原有           | Grid 交互演示 |
| 9    | 定位体系（5种定位）                          | ⭐⭐⭐   | 原有           | -             |
| 10   | 层叠上下文（z-index）                        | ⭐⭐⭐⭐ | **新增** | CodeStepper   |
| 11   | 响应式基础与媒体查询                         | ⭐⭐     | 原有           | 断点可视化    |
| 12   | CSS 单位体系（px/em/rem/vw/vh）              | ⭐⭐     | 原有           | -             |
| 13   | 动画与变换（transform/transition/animation） | ⭐⭐⭐   | 原有           | -             |
| 14   | CSS 变量与自定义属性                         | ⭐⭐     | **新增** | Sandbox       |
| 15   | 继承与可继承属性                             | ⭐⭐     | **新增** | Accordion     |
| 16   | 浮动与清除浮动                               | ⭐⭐     | **新增** | CompareTable  |
| 17   | 背景与渐变                                   | ⭐⭐     | **新增** | -             |
| 18   | CSS 各知识点掌握建议                         | -        | 原有           | SkillBar      |
| 19   | CSS 小测验                                   | -        | **新增** | QuizCard      |

**可视化数量**：10 种
**新增可视化**：CodeStepper（层叠上下文）、Sandbox（CSS变量）、Accordion（继承属性）、CompareTable（浮动方案对比）、QuizCard（测验）

---

#### 模块 03：JavaScript 核心语法

**slug**: javascript-core
**阶段**: 基础阶段 · 第 3 模块
**图标**: 💛

**完整知识点清单**：

| 序号 | 知识点                      | 难度     | 新增/原有      | 对应可视化            |
| ---- | --------------------------- | -------- | -------------- | --------------------- |
| 1    | JS 数据类型（7种原始+引用） | ⭐⭐     | 原有           | 类型探索器            |
| 2    | 类型转换（显式/隐式）       | ⭐⭐⭐   | 原有           | -                     |
| 3    | 作用域（全局/函数/块级）    | ⭐⭐⭐   | 原有           | -                     |
| 4    | 作用域链与变量查找          | ⭐⭐⭐   | **新增** | ArchitectureDiagram   |
| 5    | 闭包原理与应用              | ⭐⭐⭐⭐ | 原有           | Sandbox + CodeStepper |
| 6    | 原型与原型链                | ⭐⭐⭐⭐ | 原有           | 知识图谱              |
| 7    | this 指向规则（5种绑定）    | ⭐⭐⭐⭐ | 原有           | CompareTable          |
| 8    | 执行上下文与调用栈          | ⭐⭐⭐⭐ | **新增** | Timeline              |
| 9    | 事件循环（宏任务/微任务）   | ⭐⭐⭐⭐ | 原有           | 流程图                |
| 10   | Promise 原理与链式调用      | ⭐⭐⭐   | 原有           | -                     |
| 11   | async/await 语法糖          | ⭐⭐⭐   | **新增** | CodeStepper           |
| 12   | ES6+ 新特性                 | ⭐⭐     | 原有           | -                     |
| 13   | let/const 与块级作用域      | ⭐⭐     | **新增** | CompareTable          |
| 14   | 解构赋值（对象/数组）       | ⭐⭐     | **新增** | Sandbox               |
| 15   | 模板字符串与标签模板        | ⭐       | **新增** | -                     |
| 16   | 类与继承（ES6 Class）       | ⭐⭐⭐   | **新增** | CodeStepper           |
| 17   | 模块化（ESM/CommonJS）      | ⭐⭐⭐   | **新增** | CompareTable          |
| 18   | 迭代器与生成器              | ⭐⭐⭐⭐ | 原有           | -                     |
| 19   | Proxy / Reflect             | ⭐⭐⭐⭐ | 原有           | -                     |
| 20   | 内存管理与垃圾回收          | ⭐⭐⭐   | 原有           | -                     |
| 21   | JS 核心测验                 | -        | **新增** | QuizCard              |

**可视化数量**：10 种
**新增可视化**：ArchitectureDiagram（作用域链）、Timeline（执行上下文）、CodeStepper（闭包/async/class）、CompareTable（this绑定/let const/模块）、Sandbox（解构）、QuizCard（测验）

---

#### 模块 04：DOM / BOM 与 Web API

**slug**: dom-bom-webapi
**阶段**: 基础阶段 · 第 4 模块
**图标**: 🌐

**完整知识点清单**：

| 序号 | 知识点                                                   | 难度   | 新增/原有      | 对应可视化   |
| ---- | -------------------------------------------------------- | ------ | -------------- | ------------ |
| 1    | DOM 树结构与节点类型                                     | ⭐⭐   | 原有           | 交互树       |
| 2    | DOM 查找（querySelector/getElement*）                    | ⭐⭐   | 原有           | -            |
| 3    | DOM 操作（增删改查）                                     | ⭐⭐   | 原有           | Sandbox      |
| 4    | 属性操作（getAttribute/setAttribute/dataset）            | ⭐⭐   | **新增** | Accordion    |
| 5    | 样式操作（style/classList）                              | ⭐⭐   | **新增** | Sandbox      |
| 6    | 事件体系（冒泡/捕获/委托）                               | ⭐⭐⭐ | 原有           | 事件流动画   |
| 7    | 事件对象与常见事件类型                                   | ⭐⭐   | **新增** | CompareTable |
| 8    | BOM 对象（window/location/navigator/history/screen）     | ⭐⭐   | 原有           | 知识图谱     |
| 9    | 存储 API（localStorage/sessionStorage/Cookie/IndexedDB） | ⭐⭐   | 原有           | 对比图表     |
| 10   | 几何与滚动（offset/client/scroll/getBoundingClientRect） | ⭐⭐⭐ | 原有           | -            |
| 11   | 浏览器调度（rAF/rIC）                                    | ⭐⭐⭐ | **新增** | Timeline     |
| 12   | 文件与二进制（File/Blob/FileReader/ArrayBuffer）         | ⭐⭐⭐ | 原有           | -            |
| 13   | History API 与前端路由原理                               | ⭐⭐⭐ | **新增** | CodeStepper  |
| 14   | 拖拽 API                                                 | ⭐⭐   | 原有           | DragDemo     |
| 15   | 剪贴板 API                                               | ⭐⭐   | **新增** | Sandbox      |
| 16   | 全屏 API / 页面可见性 API                                | ⭐     | **新增** | Accordion    |
| 17   | 触摸事件与手势                                           | ⭐⭐   | 原有           | -            |
| 18   | IntersectionObserver                                     | ⭐⭐⭐ | **新增** | -            |
| 19   | Web API 测验                                             | -      | **新增** | QuizCard     |

**可视化数量**：10 种
**新增可视化**：Accordion（属性操作/页面API）、CompareTable（事件类型）、Timeline（浏览器调度）、CodeStepper（路由原理）、Sandbox（样式/剪贴板）、QuizCard（测验）

---

#### 模块 05：前端调试与排错基础

**slug**: debugging-tools
**阶段**: 基础阶段 · 第 5 模块
**图标**: 🔍

**完整知识点清单**：

| 序号 | 知识点                               | 难度   | 新增/原有      | 对应可视化   |
| ---- | ------------------------------------ | ------ | -------------- | ------------ |
| 1    | Chrome DevTools 概览                 | ⭐     | 原有           | 知识图谱     |
| 2    | Elements 面板（DOM/CSS 调试）        | ⭐⭐   | 原有           | -            |
| 3    | Console 面板（日志级别/Console API） | ⭐⭐   | 原有           | 日志表格     |
| 4    | Sources 面板（断点调试）             | ⭐⭐⭐ | 原有           | -            |
| 5    | 条件断点 / 日志断点                  | ⭐⭐   | **新增** | Accordion    |
| 6    | DOM 断点 / XHR 断点                  | ⭐⭐⭐ | 原有           | -            |
| 7    | Network 面板（请求分析/筛选）        | ⭐⭐   | 原有           | -            |
| 8    | 接口 Mock 与拦截                     | ⭐⭐⭐ | **新增** | CompareTable |
| 9    | Performance 面板（性能分析）         | ⭐⭐⭐ | 原有           | -            |
| 10   | Memory 面板（内存分析）              | ⭐⭐⭐ | 原有           | -            |
| 11   | Application 面板（存储/缓存）        | ⭐⭐   | **新增** | -            |
| 12   | Lighthouse 与 Web Vitals             | ⭐⭐   | 原有           | -            |
| 13   | SourceMap 原理与定位                 | ⭐⭐⭐ | 原有           | -            |
| 14   | 移动端调试（真机/vConsole/eruda）    | ⭐⭐   | 原有           | -            |
| 15   | 调试方法论与排错思路                 | ⭐⭐   | **新增** | Timeline     |
| 16   | 调试测验                             | -      | **新增** | QuizCard     |

**可视化数量**：7 种
**新增可视化**：Accordion（断点类型）、CompareTable（Mock方案）、Timeline（排错思路）、QuizCard（测验）

---

### 🔧 第二阶段：通用前置能力（模块 06-07）

---

#### 模块 06：CSS 工程化与样式方案

**slug**: css-engineering
**阶段**: 通用前置 · 第 1 模块
**图标**: 🛠️

**完整知识点清单**：

| 序号 | 知识点                                 | 难度   | 新增/原有      | 对应可视化          |
| ---- | -------------------------------------- | ------ | -------------- | ------------------- |
| 1    | 样式方案发展历程                       | ⭐     | **新增** | Timeline            |
| 2    | Sass/Less 预处理器                     | ⭐⭐   | 原有           | 编译演示            |
| 3    | Sass 变量与嵌套                        | ⭐⭐   | 原有           | 实时编译            |
| 4    | Sass Mixin / Function / 继承           | ⭐⭐⭐ | 原有           | -                   |
| 5    | Tailwind CSS 核心用法                  | ⭐⭐   | 原有           | 实时预览            |
| 6    | Tailwind 自定义主题配置                | ⭐⭐⭐ | **新增** | CodeStepper         |
| 7    | 响应式断点体系                         | ⭐⭐   | 原有           | 断点可视化          |
| 8    | CSS Modules                            | ⭐⭐   | 原有           | -                   |
| 9    | CSS-in-JS（styled-components/emotion） | ⭐⭐⭐ | **新增** | CompareTable        |
| 10   | PostCSS 生态（autoprefixer/cssnano）   | ⭐⭐   | 原有           | -                   |
| 11   | UI 组件库选型                          | ⭐     | 原有           | -                   |
| 12   | CSS 架构（BEM/ITCSS/SMACSS）           | ⭐⭐⭐ | **新增** | ArchitectureDiagram |
| 13   | CSS 变量与主题系统                     | ⭐⭐   | **新增** | Sandbox             |
| 14   | 容器查询 @container                    | ⭐⭐⭐ | **新增** | -                   |
| 15   | @layer 层叠层                          | ⭐⭐⭐ | **新增** | CodeStepper         |
| 16   | CSS 工程化知识图谱                     | -      | 原有           | 知识图谱            |
| 17   | CSS 工程化测验                         | -      | **新增** | QuizCard            |

**可视化数量**：10 种
**新增可视化**：Timeline（方案发展）、CodeStepper（Tailwind配置/@layer）、CompareTable（CSS-in-JS对比）、ArchitectureDiagram（CSS架构）、Sandbox（CSS变量）、QuizCard（测验）

---

#### 模块 07：TypeScript 核心与进阶

**slug**: typescript-core
**阶段**: 通用前置 · 第 2 模块
**图标**: 🔷

**完整知识点清单**：

| 序号 | 知识点                                                   | 难度     | 新增/原有      | 对应可视化          |
| ---- | -------------------------------------------------------- | -------- | -------------- | ------------------- |
| 1    | TypeScript 简介与优势                                    | ⭐       | 原有           | -                   |
| 2    | 基础类型体系（原始/联合/交叉/接口）                      | ⭐⭐     | 原有           | 类型演练场          |
| 3    | 类型别名 vs 接口                                         | ⭐⭐     | **新增** | CompareTable        |
| 4    | 泛型编程（泛型函数/约束/默认值）                         | ⭐⭐⭐   | 原有           | -                   |
| 5    | 内置工具类型（Partial/Pick/Omit/Record/Exclude/Extract） | ⭐⭐⭐   | 原有           | 工具类型可视化      |
| 6    | 条件类型与 infer                                         | ⭐⭐⭐⭐ | **新增** | CodeStepper         |
| 7    | 映射类型                                                 | ⭐⭐⭐⭐ | **新增** | -                   |
| 8    | 模板字面量类型                                           | ⭐⭐⭐⭐ | **新增** | -                   |
| 9    | 类型守卫与类型收窄                                       | ⭐⭐⭐   | **新增** | Accordion           |
| 10   | 类型断言 / as const                                      | ⭐⭐     | **新增** | -                   |
| 11   | tsconfig.json 配置详解                                   | ⭐⭐     | 原有           | -                   |
| 12   | 装饰器                                                   | ⭐⭐⭐   | 原有           | -                   |
| 13   | 声明合并                                                 | ⭐⭐⭐   | 原有           | -                   |
| 14   | 声明文件 .d.ts                                           | ⭐⭐⭐   | **新增** | -                   |
| 15   | TS 配置分层（base/extend）                               | ⭐⭐     | **新增** | ArchitectureDiagram |
| 16   | TypeScript 发展历程                                      | ⭐       | **新增** | Timeline            |
| 17   | TypeScript 测验                                          | -        | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：Timeline（TS发展）、CompareTable（type vs interface）、CodeStepper（条件类型）、Accordion（类型守卫）、ArchitectureDiagram（配置分层）、QuizCard（测验）

---

### ⚛️ 第三阶段：React 技术栈（模块 08-10）

---

#### 模块 08：React 基础与核心能力

**slug**: react-fundamentals
**阶段**: React 技术栈 · 第 1 模块
**图标**: ⚛️

**完整知识点清单**：

| 序号 | 知识点                                      | 难度     | 新增/原有      | 对应可视化      |
| ---- | ------------------------------------------- | -------- | -------------- | --------------- |
| 1    | React 介绍与核心理念                        | ⭐       | 原有           | 知识图谱        |
| 2    | JSX 语法与编译原理                          | ⭐⭐     | 原有           | 实时预览        |
| 3    | 组件体系（函数/类组件）                     | ⭐⭐     | 原有           | -               |
| 4    | Props 与单向数据流                          | ⭐⭐     | 原有           | 数据流图        |
| 5    | State 与状态提升                            | ⭐⭐     | 原有           | useState 计数器 |
| 6    | Hooks 核心（useState/useEffect/useContext） | ⭐⭐⭐   | 原有           | FlipCard        |
| 7    | useMemo / useCallback 性能优化              | ⭐⭐⭐   | **新增** | CompareTable    |
| 8    | useEffect 依赖数组详解                      | ⭐⭐⭐   | 原有           | 执行时机        |
| 9    | 副作用与清理函数                            | ⭐⭐⭐   | **新增** | CodeStepper     |
| 10   | 组件模式（HOC/Render Props/自定义 Hooks）   | ⭐⭐⭐   | 原有           | -               |
| 11   | 虚拟 DOM 与 Diff 算法                       | ⭐⭐⭐⭐ | 原有           | Diff 可视化     |
| 12   | 合成事件与事件委托                          | ⭐⭐⭐   | 原有           | -               |
| 13   | 表单处理（受控/非受控组件）                 | ⭐⭐     | 原有           | 受控表单演示    |
| 14   | 数据获取模式（loading/error/success）       | ⭐⭐     | 原有           | 三态可视化      |
| 15   | 生命周期与 Hooks 映射                       | ⭐⭐     | 原有           | 生命周期图      |
| 16   | React Router 路由                           | ⭐⭐     | 原有           | 路由可视化      |
| 17   | Context API 状态管理                        | ⭐⭐⭐   | 原有           | -               |
| 18   | Redux 核心原理                              | ⭐⭐⭐   | 原有           | Redux 流程图    |
| 19   | 状态管理方案选型                            | ⭐⭐     | 原有           | 决策树          |
| 20   | Hooks 使用规则                              | ⭐       | 原有           | 规则展示        |
| 21   | React 发展历程                              | ⭐       | **新增** | Timeline        |
| 22   | React 基础测验                              | -        | **新增** | QuizCard        |

**可视化数量**：15 种
**新增可视化**：Timeline（React发展）、CompareTable（useMemo/useCallback）、CodeStepper（副作用清理）、QuizCard（测验）

---

#### 模块 09：React 进阶与生态体系

**slug**: react-advanced
**阶段**: React 技术栈 · 第 2 模块
**图标**: ⚛️

**完整知识点清单**：

| 序号 | 知识点                            | 难度     | 新增/原有      | 对应可视化          |
| ---- | --------------------------------- | -------- | -------------- | ------------------- |
| 1    | React 18 并发模式总览             | ⭐⭐⭐   | 原有           | 知识图谱            |
| 2    | Fiber 架构原理                    | ⭐⭐⭐⭐ | 原有           | -                   |
| 3    | 自动批处理（Automatic Batching）  | ⭐⭐⭐   | **新增** | Timeline            |
| 4    | useTransition / useDeferredValue  | ⭐⭐⭐⭐ | 原有           | -                   |
| 5    | Suspense 与数据获取               | ⭐⭐⭐⭐ | **新增** | CodeStepper         |
| 6    | React Query / TanStack Query      | ⭐⭐⭐   | 原有           | -                   |
| 7    | React Hook Form                   | ⭐⭐     | 原有           | -                   |
| 8    | Redux Toolkit                     | ⭐⭐⭐   | 原有           | -                   |
| 9    | Zustand / Jotai / Recoil          | ⭐⭐⭐   | **新增** | CompareTable        |
| 10   | React.memo 性能优化               | ⭐⭐     | 原有           | 重渲染追踪          |
| 11   | 代码分割与懒加载                  | ⭐⭐     | 原有           | -                   |
| 12   | useLayoutEffect                   | ⭐⭐⭐   | 原有           | -                   |
| 13   | useImperativeHandle / useRef 进阶 | ⭐⭐⭐   | 原有           | -                   |
| 14   | StrictMode 与副作用检测           | ⭐⭐     | **新增** | -                   |
| 15   | Fiber Diff 策略                   | ⭐⭐⭐⭐ | 原有           | -                   |
| 16   | 性能优化手段对比                  | -        | 原有           | 优化对比            |
| 17   | React 生态对比                    | -        | **新增** | ArchitectureDiagram |
| 18   | React 进阶测验                    | -        | **新增** | QuizCard            |

**可视化数量**：9 种
**新增可视化**：Timeline（自动批处理）、CodeStepper（Suspense）、CompareTable（状态管理库对比）、ArchitectureDiagram（生态全景）、QuizCard（测验）

---

#### 模块 10：Next.js 与 SSR/SSG 全栈

**slug**: nextjs-ssr
**阶段**: React 技术栈 · 第 3 模块
**图标**: 🔺

**完整知识点清单**：

| 序号 | 知识点                                 | 难度   | 新增/原有      | 对应可视化          |
| ---- | -------------------------------------- | ------ | -------------- | ------------------- |
| 1    | SSR vs SSG vs ISR 原理对比             | ⭐⭐⭐ | 原有           | 知识图谱            |
| 2    | Next.js App Router vs Pages Router     | ⭐⭐   | 原有           | -                   |
| 3    | Server Components vs Client Components | ⭐⭐⭐ | 原有           | 组件对比            |
| 4    | Server Actions                         | ⭐⭐⭐ | **新增** | CodeStepper         |
| 5    | Route Handlers                         | ⭐⭐⭐ | **新增** | -                   |
| 6    | 数据获取与缓存策略                     | ⭐⭐⭐ | 原有           | -                   |
| 7    | 静态站点生成（SSG）                    | ⭐⭐   | 原有           | -                   |
| 8    | 增量静态再生（ISR）                    | ⭐⭐⭐ | 原有           | -                   |
| 9    | SEO 优化与元数据配置                   | ⭐⭐   | 原有           | -                   |
| 10   | 图像优化（Image 组件）                 | ⭐⭐   | 原有           | -                   |
| 11   | 字体优化                               | ⭐     | **新增** | -                   |
| 12   | 路由系统（动态路由/嵌套路由/并行路由） | ⭐⭐⭐ | **新增** | ArchitectureDiagram |
| 13   | 中间件 Middleware                      | ⭐⭐⭐ | **新增** | Timeline            |
| 14   | 全栈开发模式                           | ⭐⭐   | **新增** | -                   |
| 15   | Next.js 发展历程                       | ⭐     | **新增** | Timeline            |
| 16   | Next.js 测验                           | -      | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：CodeStepper（Server Actions）、ArchitectureDiagram（路由系统）、Timeline（中间件/发展历程）、QuizCard（测验）

---

### 💚 第四阶段：Vue 技术栈（模块 11-12）

---

#### 模块 11：Vue.js 核心基础

**slug**: vue-fundamentals
**阶段**: Vue 技术栈 · 第 1 模块
**图标**: 💚

**完整知识点清单**：

| 序号 | 知识点                                | 难度     | 新增/原有      | 对应可视化          |
| ---- | ------------------------------------- | -------- | -------------- | ------------------- |
| 1    | Vue 介绍与核心理念                    | ⭐       | 原有           | 知识图谱            |
| 2    | 模板语法（插值/指令）                 | ⭐⭐     | 原有           | -                   |
| 3    | 计算属性 vs 侦听器                    | ⭐⭐⭐   | **新增** | CompareTable        |
| 4    | 响应式系统原理（Proxy/依赖收集）      | ⭐⭐⭐⭐ | 原有           | -                   |
| 5    | Composition API（setup/生命周期）     | ⭐⭐⭐   | 原有           | -                   |
| 6    | 组合式函数 Composables                | ⭐⭐⭐   | **新增** | CodeStepper         |
| 7    | 组件通信（props/emit/provide/inject） | ⭐⭐     | 原有           | -                   |
| 8    | 事件总线 / mitt                       | ⭐⭐     | **新增** | ArchitectureDiagram |
| 9    | Vue Router                            | ⭐⭐     | 原有           | -                   |
| 10   | Pinia 状态管理                        | ⭐⭐⭐   | 原有           | -                   |
| 11   | 虚拟 DOM 与 Diff 算法                 | ⭐⭐⭐⭐ | 原有           | -                   |
| 12   | 插槽（默认/具名/作用域）              | ⭐⭐⭐   | **新增** | Accordion           |
| 13   | 自定义指令                            | ⭐⭐     | 原有           | -                   |
| 14   | 生命周期钩子                          | ⭐⭐     | 原有           | -                   |
| 15   | Options API vs Composition API        | ⭐⭐     | **新增** | CompareTable        |
| 16   | Vue 发展历程                          | ⭐       | **新增** | Timeline            |
| 17   | Vue 基础测验                          | -        | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：Timeline（Vue发展）、CompareTable（计算vs侦听/Options vs Composition）、CodeStepper（Composables）、ArchitectureDiagram（组件通信）、Accordion（插槽）、QuizCard（测验）

---

#### 模块 12：Vue 进阶与 Nuxt 全栈

**slug**: vue-advanced-nuxt
**阶段**: Vue 技术栈 · 第 2 模块
**图标**: 💚

**完整知识点清单**：

| 序号 | 知识点                | 难度   | 新增/原有      | 对应可视化          |
| ---- | --------------------- | ------ | -------------- | ------------------- |
| 1    | 自定义指令进阶        | ⭐⭐⭐ | 原有           | -                   |
| 2    | 插件开发              | ⭐⭐⭐ | 原有           | -                   |
| 3    | Teleport 传送门       | ⭐⭐   | 原有           | -                   |
| 4    | KeepAlive 缓存组件    | ⭐⭐⭐ | 原有           | -                   |
| 5    | Nuxt 3 核心能力       | ⭐⭐   | 原有           | -                   |
| 6    | Nuxt SSR/SSG/ISR 配置 | ⭐⭐⭐ | 原有           | -                   |
| 7    | Nuxt 自动导入约定     | ⭐⭐   | **新增** | -                   |
| 8    | Nuxt 中间件与插件     | ⭐⭐⭐ | **新增** | Timeline            |
| 9    | Nitro 服务引擎        | ⭐⭐⭐ | **新增** | ArchitectureDiagram |
| 10   | 编译优化与靶向更新    | ⭐⭐⭐ | 原有           | -                   |
| 11   | 组合式 API 设计原则   | ⭐⭐⭐ | 原有           | -                   |
| 12   | VueUse 工具库         | ⭐⭐   | **新增** | -                   |
| 13   | Nuxt 与 Next.js 对比  | ⭐⭐   | **新增** | CompareTable        |
| 14   | Vue 进阶测验          | -      | **新增** | QuizCard            |

**可视化数量**：6 种
**新增可视化**：Timeline（中间件）、ArchitectureDiagram（Nitro）、CompareTable（Nuxt vs Next）、QuizCard（测验）

---

### 📱 第五阶段：跨端与移动端（模块 13-14）

---

#### 模块 13：小程序开发与工程化

**slug**: mini-program
**阶段**: 跨端移动端 · 第 1 模块
**图标**: 📱

**完整知识点清单**：

| 序号 | 知识点                           | 难度   | 新增/原有      | 对应可视化          |
| ---- | -------------------------------- | ------ | -------------- | ------------------- |
| 1    | 小程序双线程模型                 | ⭐⭐⭐ | 原有           | ArchitectureDiagram |
| 2    | 组件体系与生命周期               | ⭐⭐   | 原有           | -                   |
| 3    | WXML/WXSS 语法                   | ⭐⭐   | 原有           | -                   |
| 4    | 数据绑定与事件处理               | ⭐⭐   | 原有           | -                   |
| 5    | 分包加载与性能优化               | ⭐⭐⭐ | 原有           | -                   |
| 6    | Taro 跨端开发                    | ⭐⭐⭐ | 原有           | -                   |
| 7    | uni-app 跨端开发                 | ⭐⭐   | 原有           | -                   |
| 8    | 云开发（云函数/云数据库/云存储） | ⭐⭐   | 原有           | -                   |
| 9    | 小程序插件机制                   | ⭐⭐   | **新增** | Accordion           |
| 10   | 小程序框架对比                   | ⭐⭐   | **新增** | CompareTable        |
| 11   | 小程序与 H5 差异                 | ⭐⭐   | **新增** | CompareTable        |
| 12   | 小程序测验                       | -      | **新增** | QuizCard            |

**可视化数量**：5 种
**新增可视化**：ArchitectureDiagram（双线程）、Accordion（插件）、CompareTable（框架对比/H5差异）、QuizCard（测验）

---

#### 模块 14：跨平台开发与移动端适配

**slug**: cross-platform-mobile
**阶段**: 跨端移动端 · 第 2 模块
**图标**: 📲

**完整知识点清单**：

| 序号 | 知识点                                 | 难度   | 新增/原有      | 对应可视化          |
| ---- | -------------------------------------- | ------ | -------------- | ------------------- |
| 1    | React Native 核心概念                  | ⭐⭐⭐ | 原有           | -                   |
| 2    | Flutter 基础（Dart/Widget/状态管理）   | ⭐⭐⭐ | 原有           | -                   |
| 3    | Hybrid 与 JSBridge                     | ⭐⭐⭐ | 原有           | ArchitectureDiagram |
| 4    | PWA（Service Worker/Web App Manifest） | ⭐⭐⭐ | 原有           | -                   |
| 5    | rem/vw 适配方案                        | ⭐⭐   | 原有           | -                   |
| 6    | 触摸事件与手势处理                     | ⭐⭐⭐ | 原有           | -                   |
| 7    | 1px 问题与解决方案                     | ⭐⭐   | **新增** | CompareTable        |
| 8    | 刘海屏/安全区适配                      | ⭐⭐   | **新增** | -                   |
| 9    | 移动端性能优化                         | ⭐⭐⭐ | **新增** | SkillBar            |
| 10   | 跨平台方案全景对比                     | ⭐⭐   | **新增** | CompareTable        |
| 11   | Capacitor / Cordova                    | ⭐⭐   | **新增** | -                   |
| 12   | 跨端发展历程                           | ⭐     | **新增** | Timeline            |
| 13   | 移动端测验                             | -      | **新增** | QuizCard            |

**可视化数量**：7 种
**新增可视化**：Timeline（跨端发展）、CompareTable（1px方案/跨平台对比）、ArchitectureDiagram（JSBridge）、SkillBar（性能优化）、QuizCard（测验）

---

### ⚙️ 第六阶段：工程化与全栈（模块 15-18）

---

#### 模块 15：前端工程化体系

**slug**: frontend-engineering
**阶段**: 工程化全栈 · 第 1 模块
**图标**: 🏗️

**完整知识点清单**：

| 序号 | 知识点                                         | 难度     | 新增/原有      | 对应可视化          |
| ---- | ---------------------------------------------- | -------- | -------------- | ------------------- |
| 1    | 工程化概览                                     | ⭐       | 原有           | 知识图谱            |
| 2    | Webpack 原理（Loader/Plugin/HMR/Tree Shaking） | ⭐⭐⭐⭐ | 原有           | -                   |
| 3    | Webpack 构建流程                               | ⭐⭐⭐   | **新增** | Timeline            |
| 4    | Vite 原理（ESM/预构建）                        | ⭐⭐⭐   | 原有           | -                   |
| 5    | Webpack vs Vite 对比                           | ⭐⭐     | **新增** | CompareTable        |
| 6    | Rollup / esbuild / swc                         | ⭐⭐⭐   | **新增** | CompareTable        |
| 7    | ESLint / Prettier / Stylelint                  | ⭐⭐     | 原有           | -                   |
| 8    | Git 工作流（Git Flow/GitHub Flow/Trunk Based） | ⭐⭐     | **新增** | CompareTable        |
| 9    | CI/CD 概念与实践                               | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 10   | Monorepo（pnpm workspace/Turborepo）           | ⭐⭐⭐   | 原有           | -                   |
| 11   | 构建优化与代码分割                             | ⭐⭐⭐   | 原有           | -                   |
| 12   | 环境变量管理                                   | ⭐⭐     | 原有           | -                   |
| 13   | 工程化体系架构                                 | ⭐⭐     | **新增** | ArchitectureDiagram |
| 14   | 工程化发展历程                                 | ⭐       | **新增** | Timeline            |
| 15   | 工程化测验                                     | -        | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：Timeline（构建流程/发展历程）、CompareTable（Webpack vs Vite/构建工具/Git工作流）、ArchitectureDiagram（CI/CD/体系架构）、QuizCard（测验）

---

#### 模块 16：浏览器原理与网络协议

**slug**: browser-network
**阶段**: 工程化全栈 · 第 2 模块
**图标**: 🌍

**完整知识点清单**：

| 序号 | 知识点                                              | 难度     | 新增/原有      | 对应可视化          |
| ---- | --------------------------------------------------- | -------- | -------------- | ------------------- |
| 1    | 浏览器多进程架构                                    | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 2    | 浏览器渲染流程（DOM树/CSSOM/渲染树/布局/绘制/合成） | ⭐⭐⭐⭐ | 原有           | 流程图              |
| 3    | 重排重绘与合成层                                    | ⭐⭐⭐⭐ | **新增** | CodeStepper         |
| 4    | HTTP/HTTPS 原理                                     | ⭐⭐⭐   | 原有           | -                   |
| 5    | HTTP/2 vs HTTP/3                                    | ⭐⭐⭐⭐ | **新增** | CompareTable        |
| 6    | 缓存策略（强缓存/协商缓存/Cache-Control）           | ⭐⭐⭐   | 原有           | -                   |
| 7    | TCP/IP 协议栈                                       | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 8    | DNS 解析过程                                        | ⭐⭐     | **新增** | Timeline            |
| 9    | CDN 原理                                            | ⭐⭐⭐   | 原有           | -                   |
| 10   | WebSocket 原理                                      | ⭐⭐⭐   | 原有           | -                   |
| 11   | CORS 跨域机制                                       | ⭐⭐⭐   | 原有           | -                   |
| 12   | Cookie 机制                                         | ⭐⭐     | 原有           | -                   |
| 13   | 从输入URL到页面加载完成                             | ⭐⭐⭐⭐ | **新增** | Timeline            |
| 14   | 浏览器原理测验                                      | -        | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：ArchitectureDiagram（进程架构/TCP/IP）、CodeStepper（重排重绘）、CompareTable（HTTP版本）、Timeline（DNS过程/URL输入过程）、QuizCard（测验）

---

#### 模块 17：Node.js 全栈基础

**slug**: nodejs-fullstack
**阶段**: 工程化全栈 · 第 3 模块
**图标**: 🟢

**完整知识点清单**：

| 序号 | 知识点                          | 难度     | 新增/原有      | 对应可视化          |
| ---- | ------------------------------- | -------- | -------------- | ------------------- |
| 1    | Node.js 简介与运行原理          | ⭐       | 原有           | 知识图谱            |
| 2    | 模块系统与 CommonJS             | ⭐⭐     | 原有           | -                   |
| 3    | ESM vs CommonJS                 | ⭐⭐     | **新增** | CompareTable        |
| 4    | Buffer / Stream / EventEmitter  | ⭐⭐⭐   | 原有           | -                   |
| 5    | Node.js 事件循环                | ⭐⭐⭐⭐ | **新增** | Timeline            |
| 6    | Express 中间件机制              | ⭐⭐⭐   | 原有           | -                   |
| 7    | Koa 洋葱模型                    | ⭐⭐⭐   | **新增** | CodeStepper         |
| 8    | MySQL 基础                      | ⭐⭐     | 原有           | -                   |
| 9    | MongoDB 基础                    | ⭐⭐     | 原有           | -                   |
| 10   | ORM（Prisma/Sequelize/TypeORM） | ⭐⭐⭐   | **新增** | CompareTable        |
| 11   | RESTful API 设计                | ⭐⭐⭐   | 原有           | -                   |
| 12   | PM2 部署与集群模式              | ⭐⭐⭐   | 原有           | -                   |
| 13   | Node.js 进程管理                | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 14   | Nest.js 企业级框架              | ⭐⭐⭐   | **新增** | -                   |
| 15   | Node.js 发展历程                | ⭐       | **新增** | Timeline            |
| 16   | Node.js 测验                    | -        | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：Timeline（事件循环/发展历程）、CompareTable（ESM vs CJS/ORM对比）、CodeStepper（Koa洋葱模型）、ArchitectureDiagram（进程管理）、QuizCard（测验）

---

#### 模块 18：前端测试体系

**slug**: testing-system
**阶段**: 工程化全栈 · 第 4 模块
**图标**: 🧪

**完整知识点清单**：

| 序号 | 知识点                             | 难度   | 新增/原有      | 对应可视化          |
| ---- | ---------------------------------- | ------ | -------------- | ------------------- |
| 1    | 测试金字塔（单元/集成/E2E）        | ⭐⭐   | **新增** | ArchitectureDiagram |
| 2    | Jest / Vitest 单元测试             | ⭐⭐⭐ | 原有           | -                   |
| 3    | Mock 体系（函数/模块/接口/定时器） | ⭐⭐⭐ | 原有           | -                   |
| 4    | React Testing Library              | ⭐⭐⭐ | 原有           | -                   |
| 5    | Vue Test Utils                     | ⭐⭐   | **新增** | -                   |
| 6    | Cypress E2E 测试                   | ⭐⭐⭐ | 原有           | -                   |
| 7    | Playwright E2E 测试                | ⭐⭐⭐ | **新增** | CompareTable        |
| 8    | TDD / BDD 思想                     | ⭐⭐⭐ | 原有           | -                   |
| 9    | 测试覆盖率                         | ⭐⭐   | **新增** | SkillBar            |
| 10   | 快照测试                           | ⭐⭐   | **新增** | -                   |
| 11   | 测试工具链对比                     | ⭐⭐   | **新增** | CompareTable        |
| 12   | 测试发展历程                       | ⭐     | **新增** | Timeline            |
| 13   | 测试测验                           | -      | **新增** | QuizCard            |

**可视化数量**：6 种
**新增可视化**：ArchitectureDiagram（测试金字塔）、CompareTable（E2E工具/工具链对比）、Timeline（发展历程）、SkillBar（覆盖率）、QuizCard（测验）

---

### 🌐 第七阶段：高级专项与架构（模块 19-23）

---

#### 模块 19：性能优化与安全防护

**slug**: performance-security
**阶段**: 高级专项 · 第 1 模块
**图标**: ⚡

**完整知识点清单**：

| 序号 | 知识点                                  | 难度   | 新增/原有      | 对应可视化          |
| ---- | --------------------------------------- | ------ | -------------- | ------------------- |
| 1    | Core Web Vitals（LCP/FID/INP/CLS）      | ⭐⭐⭐ | 原有           | SkillBar            |
| 2    | 渲染性能优化（重绘重排/合成层/GPU加速） | ⭐⭐⭐ | 原有           | -                   |
| 3    | 加载优化（代码分割/懒加载/预加载）      | ⭐⭐⭐ | 原有           | -                   |
| 4    | 图片优化体系                            | ⭐⭐⭐ | 原有           | -                   |
| 5    | 资源优化（压缩/缓存/CDN）               | ⭐⭐   | **新增** | Timeline            |
| 6    | XSS 攻击与防护                          | ⭐⭐⭐ | 原有           | -                   |
| 7    | CSRF 攻击与防护                         | ⭐⭐⭐ | 原有           | -                   |
| 8    | CSP 内容安全策略                        | ⭐⭐⭐ | **新增** | CodeStepper         |
| 9    | SQL 注入 / 命令注入                     | ⭐⭐⭐ | **新增** | CompareTable        |
| 10   | 点击劫持 / SSL 剥离                     | ⭐⭐   | **新增** | -                   |
| 11   | 安全响应头                              | ⭐⭐   | **新增** | Accordion           |
| 12   | 性能优化手段全景                        | ⭐⭐   | **新增** | ArchitectureDiagram |
| 13   | 安全威胁全景                            | ⭐⭐⭐ | **新增** | 知识图谱            |
| 14   | 性能与安全测验                          | -      | **新增** | QuizCard            |

**可视化数量**：8 种
**新增可视化**：Timeline（资源优化）、CodeStepper（CSP）、CompareTable（注入攻击）、Accordion（安全头）、ArchitectureDiagram（性能全景）、QuizCard（测验）

---

#### 模块 20：数据可视化与设计模式

**slug**: visualization-design-patterns
**阶段**: 高级专项 · 第 2 模块
**图标**: 📊

**完整知识点清单**：

| 序号 | 知识点                                   | 难度     | 新增/原有      | 对应可视化          |
| ---- | ---------------------------------------- | -------- | -------------- | ------------------- |
| 1    | Canvas 2D 绘图                           | ⭐⭐⭐   | 原有           | -                   |
| 2    | SVG 矢量图形                             | ⭐⭐⭐   | 原有           | -                   |
| 3    | Canvas vs SVG 对比                       | ⭐⭐     | **新增** | CompareTable        |
| 4    | ECharts 基础与配置                       | ⭐⭐⭐   | 原有           | -                   |
| 5    | D3.js 数据驱动                           | ⭐⭐⭐⭐ | 原有           | -                   |
| 6    | Three.js 与 3D 可视化                    | ⭐⭐⭐⭐ | 原有           | -                   |
| 7    | 设计模式（单例/工厂/观察者/策略/装饰器） | ⭐⭐⭐⭐ | 原有           | -                   |
| 8    | 设计模式分类与全景                       | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 9    | Flux / Redux / MobX 状态管理模式         | ⭐⭐⭐   | 原有           | -                   |
| 10   | 组件设计原则                             | ⭐⭐⭐   | 原有           | -                   |
| 11   | 发布订阅模式 vs 观察者模式               | ⭐⭐⭐   | **新增** | CompareTable        |
| 12   | 前端常用设计模式汇总                     | ⭐⭐⭐   | **新增** | FlipCard            |
| 13   | 可视化与设计模式测验                     | -        | **新增** | QuizCard            |

**可视化数量**：6 种
**新增可视化**：CompareTable（Canvas vs SVG/发布订阅vs观察者）、ArchitectureDiagram（设计模式分类）、FlipCard（模式汇总）、QuizCard（测验）

---

#### 模块 21：Web 高级 API 与前沿技术

**slug**: web-advanced-api
**阶段**: 高级专项 · 第 3 模块
**图标**: 🚀

**完整知识点清单**：

| 序号 | 知识点                                                   | 难度     | 新增/原有      | 对应可视化          |
| ---- | -------------------------------------------------------- | -------- | -------------- | ------------------- |
| 1    | IntersectionObserver / ResizeObserver / MutationObserver | ⭐⭐⭐   | 原有           | -                   |
| 2    | 三种 Observer 对比                                       | ⭐⭐     | **新增** | CompareTable        |
| 3    | Web Workers / SharedArrayBuffer                          | ⭐⭐⭐⭐ | 原有           | -                   |
| 4    | 多线程方案全景                                           | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 5    | WebAssembly（Wasm）原理                                  | ⭐⭐⭐⭐ | 原有           | -                   |
| 6    | Web Components（自定义元素/Shadow DOM）                  | ⭐⭐⭐   | 原有           | -                   |
| 7    | GraphQL / Apollo Client                                  | ⭐⭐⭐   | 原有           | -                   |
| 8    | WebGPU                                                   | ⭐⭐⭐⭐ | **新增** | -                   |
| 9    | 文件系统访问 API                                         | ⭐⭐⭐   | 原有           | -                   |
| 10   | WebRTC 实时通信                                          | ⭐⭐⭐⭐ | **新增** | Timeline            |
| 11   | Web Speech / Web Bluetooth / Web USB                     | ⭐⭐     | **新增** | Accordion           |
| 12   | PWA 进阶（推送通知/后台同步）                            | ⭐⭐⭐   | **新增** | -                   |
| 13   | 前沿技术发展趋势                                         | ⭐       | **新增** | Timeline            |
| 14   | Web API 测验                                             | -        | **新增** | QuizCard            |

**可视化数量**：6 种
**新增可视化**：CompareTable（Observer对比）、ArchitectureDiagram（多线程方案）、Timeline（WebRTC流程/发展趋势）、Accordion（Web API汇总）、QuizCard（测验）

---

#### 模块 22：微前端与前端架构设计

**slug**: micro-frontend-architecture
**阶段**: 高级专项 · 第 4 模块
**图标**: 🏛️

**完整知识点清单**：

| 序号 | 知识点                                      | 难度     | 新增/原有      | 对应可视化          |
| ---- | ------------------------------------------- | -------- | -------------- | ------------------- |
| 1    | 微前端概念与价值                            | ⭐⭐     | 原有           | 知识图谱            |
| 2    | Module Federation                           | ⭐⭐⭐⭐ | 原有           | -                   |
| 3    | qiankun / single-spa                        | ⭐⭐⭐   | 原有           | -                   |
| 4    | JS 沙箱原理（Proxy/快照/iframe）            | ⭐⭐⭐⭐ | **新增** | CompareTable        |
| 5    | 样式隔离方案                                | ⭐⭐⭐   | **新增** | CompareTable        |
| 6    | 前端架构演进（MVC/MVVM/Clean Architecture） | ⭐⭐⭐   | 原有           | Timeline            |
| 7    | DDD 前端落地                                | ⭐⭐⭐⭐ | 原有           | -                   |
| 8    | 技术选型体系                                | ⭐⭐     | 原有           | -                   |
| 9    | 微前端架构图                                | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 10   | 微前端方案对比                              | ⭐⭐     | **新增** | CompareTable        |
| 11   | 组件库架构设计                              | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 12   | 低代码平台原理                              | ⭐⭐⭐   | **新增** | -                   |
| 13   | 前端架构发展历程                            | ⭐       | **新增** | Timeline            |
| 14   | 微前端与架构测验                            | -        | **新增** | QuizCard            |

**可视化数量**：7 种
**新增可视化**：Timeline（架构演进/发展历程）、CompareTable（沙箱方案/样式隔离/微前端方案）、ArchitectureDiagram（微前端架构/组件库架构）、QuizCard（测验）

---

#### 模块 23：监控埋点与认证授权

**slug**: monitoring-auth
**阶段**: 高级专项 · 第 5 模块
**图标**: 📡

**完整知识点清单**：

| 序号 | 知识点                          | 难度     | 新增/原有      | 对应可视化          |
| ---- | ------------------------------- | -------- | -------------- | ------------------- |
| 1    | 埋点体系（无痕/声明式/SDK设计） | ⭐⭐⭐   | 原有           | -                   |
| 2    | Sentry 错误监控                 | ⭐⭐⭐   | 原有           | -                   |
| 3    | Web Vitals 采集                 | ⭐⭐     | 原有           | -                   |
| 4    | 性能监控指标体系                | ⭐⭐⭐   | **新增** | SkillBar            |
| 5    | 监控平台架构                    | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 6    | i18next 国际化                  | ⭐⭐     | 原有           | -                   |
| 7    | JWT 原理与实现                  | ⭐⭐⭐   | 原有           | -                   |
| 8    | OAuth 2.0 授权流程              | ⭐⭐⭐⭐ | 原有           | Timeline            |
| 9    | RBAC / ABAC 权限控制            | ⭐⭐⭐   | 原有           | -                   |
| 10   | 权限模型对比                    | ⭐⭐     | **新增** | CompareTable        |
| 11   | 单点登录 SSO                    | ⭐⭐⭐   | **新增** | Timeline            |
| 12   | 认证体系架构                    | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 13   | 监控与认证测验                  | -        | **新增** | QuizCard            |

**可视化数量**：7 种
**新增可视化**：SkillBar（性能指标）、ArchitectureDiagram（监控平台/认证体系）、Timeline（OAuth流程/SSO）、CompareTable（权限模型）、QuizCard（测验）

---

### 🏆 第八阶段：面试冲刺（模块 24-25）

---

#### 模块 24：数据结构与前端算法

**slug**: data-structure-algorithm
**阶段**: 面试冲刺 · 第 1 模块
**图标**: 📚

**完整知识点清单**：

| 序号 | 知识点                                                   | 难度       | 新增/原有      | 对应可视化          |
| ---- | -------------------------------------------------------- | ---------- | -------------- | ------------------- |
| 1    | 栈与队列                                                 | ⭐⭐       | 原有           | -                   |
| 2    | 链表（单链表/双向链表/循环链表）                         | ⭐⭐⭐     | 原有           | -                   |
| 3    | 树与二叉树（遍历/BST/堆）                                | ⭐⭐⭐⭐   | 原有           | -                   |
| 4    | 图的基础概念                                             | ⭐⭐⭐⭐   | 原有           | -                   |
| 5    | 哈希表                                                   | ⭐⭐⭐     | 原有           | -                   |
| 6    | 数据结构对比                                             | ⭐⭐       | **新增** | CompareTable        |
| 7    | 排序算法（冒泡/选择/插入/快排/归并/堆排）                | ⭐⭐⭐     | 原有           | -                   |
| 8    | 搜索算法（二分/DFS/BFS）                                 | ⭐⭐⭐     | 原有           | -                   |
| 9    | 双指针 / 滑动窗口                                        | ⭐⭐⭐     | 原有           | -                   |
| 10   | 回溯算法                                                 | ⭐⭐⭐⭐   | 原有           | -                   |
| 11   | 动态规划                                                 | ⭐⭐⭐⭐⭐ | 原有           | -                   |
| 12   | 贪心 / 分治 / 位运算                                     | ⭐⭐⭐⭐   | 原有           | -                   |
| 13   | 算法思想对比                                             | ⭐⭐⭐     | **新增** | ArchitectureDiagram |
| 14   | 高频手写题（防抖/节流/深拷贝/Promise/发布订阅/虚拟列表） | ⭐⭐⭐     | 原有           | -                   |
| 15   | 手写题分类汇总                                           | ⭐⭐⭐     | **新增** | Accordion           |
| 16   | 正则表达式                                               | ⭐⭐⭐     | 原有           | -                   |
| 17   | 算法学习路径                                             | ⭐         | **新增** | Timeline            |
| 18   | 算法测验                                                 | -          | **新增** | QuizCard            |

**可视化数量**：6 种
**新增可视化**：CompareTable（数据结构对比）、ArchitectureDiagram（算法思想）、Accordion（手写题汇总）、Timeline（学习路径）、QuizCard（测验）

---

#### 模块 25：面试八股与综合能力

**slug**: interview-prep
**阶段**: 面试冲刺 · 第 2 模块
**图标**: 🎯

**完整知识点清单**：

| 序号 | 知识点                           | 难度     | 新增/原有      | 对应可视化          |
| ---- | -------------------------------- | -------- | -------------- | ------------------- |
| 1    | JS 八股汇总                      | ⭐⭐⭐   | 原有           | -                   |
| 2    | CSS 八股汇总                     | ⭐⭐     | 原有           | -                   |
| 3    | 框架八股（React/Vue）            | ⭐⭐⭐   | 原有           | -                   |
| 4    | 网络八股                         | ⭐⭐⭐   | 原有           | -                   |
| 5    | 浏览器八股                       | ⭐⭐⭐   | 原有           | -                   |
| 6    | 安全八股                         | ⭐⭐⭐   | 原有           | -                   |
| 7    | React vs Vue 全面对比            | ⭐⭐     | **新增** | CompareTable        |
| 8    | STAR 法则项目复盘                | ⭐⭐     | 原有           | -                   |
| 9    | 项目难点梳理方法                 | ⭐⭐⭐   | **新增** | Timeline            |
| 10   | 系统设计（组件库/低代码/微前端） | ⭐⭐⭐⭐ | 原有           | -                   |
| 11   | 系统设计方法论                   | ⭐⭐⭐   | **新增** | ArchitectureDiagram |
| 12   | 简历撰写技巧                     | ⭐       | **新增** | Accordion           |
| 13   | 面试流程与技巧                   | ⭐       | **新增** | Timeline            |
| 14   | 职业发展路径                     | ⭐       | **新增** | Timeline            |
| 15   | 面试模拟题                       | -        | **新增** | QuizCard            |

**可视化数量**：6 种
**新增可视化**：CompareTable（React vs Vue）、ArchitectureDiagram（系统设计）、Accordion（简历技巧）、Timeline（项目难点/面试流程/职业路径）、QuizCard（模拟题）

---

## 四、增强总结

### 4.1 新增统计

| 维度             | 原有    | 增强后  | 增量    |
| ---------------- | ------- | ------- | ------- |
| 可视化组件种类   | 5 种    | 11 种   | +6 种   |
| 模块平均可视化数 | ~5 种   | ~8 种   | +3 种   |
| 总知识点数       | ~350 个 | ~470 个 | +120 个 |
| 模块平均知识点   | ~14 个  | ~19 个  | +5 个   |
| 测验模块         | 0 个    | 25 个   | +25 个  |
| 时间线可视化     | ~2 个   | ~20 个  | +18 个  |
| 对比表格         | ~3 个   | ~30 个  | +27 个  |
| 架构图           | ~1 个   | ~18 个  | +17 个  |
| 代码分步演示     | ~1 个   | ~15 个  | +14 个  |
| 手风琴面板       | ~2 个   | ~12 个  | +10 个  |

### 4.2 新增组件文件

| 文件                                                                                                       | 说明                                 |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [Timeline.tsx](file:///workspace/src/components/interactive/Timeline.tsx)                                     | 时间线/步骤流程（支持垂直/水平方向） |
| [Timeline.module.css](file:///workspace/src/components/interactive/Timeline.module.css)                       | 时间线样式                           |
| [CompareTable.tsx](file:///workspace/src/components/interactive/CompareTable.tsx)                             | 多列对比表格                         |
| [CompareTable.module.css](file:///workspace/src/components/interactive/CompareTable.module.css)               | 对比表格样式                         |
| [CodeStepper.tsx](file:///workspace/src/components/interactive/CodeStepper.tsx)                               | 代码分步执行演示                     |
| [CodeStepper.module.css](file:///workspace/src/components/interactive/CodeStepper.module.css)                 | 代码分步样式                         |
| [ArchitectureDiagram.tsx](file:///workspace/src/components/interactive/ArchitectureDiagram.tsx)               | 分层架构图                           |
| [ArchitectureDiagram.module.css](file:///workspace/src/components/interactive/ArchitectureDiagram.module.css) | 架构图样式                           |
| [QuizCard.tsx](file:///workspace/src/components/interactive/QuizCard.tsx)                                     | 交互式测验卡片                       |
| [QuizCard.module.css](file:///workspace/src/components/interactive/QuizCard.module.css)                       | 测验卡片样式                         |
| [Accordion.tsx](file:///workspace/src/components/interactive/Accordion.tsx)                                   | 手风琴折叠面板                       |
| [Accordion.module.css](file:///workspace/src/components/interactive/Accordion.module.css)                     | 手风琴样式                           |

### 4.3 增强内容示例

模块 01 的完整增强内容示例见 [module-01-enhanced.ts](file:///workspace/src/lib/content/module-01-enhanced.ts)，展示了如何使用全部 11 种可视化组件。

### 4.4 类型系统扩展

- [types.ts](file:///workspace/src/lib/types.ts): 新增 7 种数据类型接口、DemoType 联合类型、demoMeta 元数据配置
- [ContentRenderer.tsx](file:///workspace/src/lib/ContentRenderer.tsx): 新增 6 个动态导入组件、6 个 demo 渲染分支

---

## 五、重构建议

1. **内容标准化**: 将所有模块内容从 HTML 字符串迁移到 ContentBlock 数组格式，统一管理
2. **组件库化**: 提取 interactive 组件为独立的 UI 组件库包
3. **文档生成**: 基于 ContentBlock 自动生成学习路径图、知识点地图
4. **进度系统**: 结合 QuizCard 实现学习进度追踪和能力评估
5. **搜索功能**: 基于知识点标签实现全站搜索
