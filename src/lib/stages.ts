/**
 * 学习阶段定义
 * 对应 PROJECT_CONTENT.md 的 8 个阶段
 */
import type { StageInfo } from './types'

export const stages: StageInfo[] = [
  {
    id: 'basics',
    label: '基础阶段',
    icon: '',
    description: 'HTML、CSS、JavaScript、DOM、调试工具 — 前端开发的五大基石。',
    moduleRange: [1, 5],
  },
  {
    id: 'prerequisites',
    label: '通用前置能力',
    icon: '',
    description: 'CSS 工程化与 TypeScript — 进入框架世界前的通用能力储备。',
    moduleRange: [6, 7],
  },
  {
    id: 'react',
    label: 'React 技术栈',
    icon: '',
    description: 'React 基础、进阶生态、Next.js 全栈 — 主流 React 技术栈完整路径。',
    moduleRange: [8, 10],
  },
  {
    id: 'vue',
    label: 'Vue 技术栈',
    icon: '',
    description: 'Vue.js 核心与 Nuxt 全栈 — Vue 生态的完整学习路线。',
    moduleRange: [11, 12],
  },
  {
    id: 'cross-platform',
    label: '跨端与移动端',
    icon: '',
    description: '小程序开发与跨平台移动端适配 — 多端覆盖的工程能力。',
    moduleRange: [13, 14],
  },
  {
    id: 'engineering',
    label: '工程化与全栈',
    icon: '',
    description: '前端工程化、浏览器原理、Node.js、测试体系 — 工程化全栈能力。',
    moduleRange: [15, 18],
  },
  {
    id: 'advanced',
    label: '高级专项与架构',
    icon: '',
    description: '性能安全、可视化、Web API、微前端、监控认证 — 高级架构专项。',
    moduleRange: [19, 23],
  },
  {
    id: 'interview',
    label: '面试冲刺',
    icon: '',
    description: '数据结构算法与面试八股 — 系统化面试冲刺准备。',
    moduleRange: [24, 25],
  },
]

/** 根据 slug 获取阶段信息 */
export function getStageBySlug(slug: string): StageInfo | undefined {
  return stages.find((s) => s.id === slug)
}

/** 根据模块编号获取所属阶段 */
export function getStageByModuleNumber(num: number): StageInfo {
  return stages.find((s) => num >= s.moduleRange[0] && num <= s.moduleRange[1])!
}
