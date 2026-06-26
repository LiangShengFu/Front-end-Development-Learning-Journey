/**
 * 通用工具函数
 */
import { clsx, type ClassValue } from 'clsx'

/** 合并 className（基于 clsx） */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/** 格式化模块编号为两位数 */
export function padModuleNumber(n: number): string {
  return String(n).padStart(2, '0')
}

/** 根据难度返回星级字符串 */
export function difficultyStars(level: number): string {
  return '⭐'.repeat(Math.min(Math.max(level, 0), 5))
}

/** 根据难度返回标签 */
export function difficultyLabel(level: number): string {
  const labels = ['', '入门', '基础', '进阶', '高级', '专家']
  return labels[Math.min(Math.max(level, 0), 5)] ?? ''
}

/** 滚动到页面顶部 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** 滚动到指定元素 */
export function scrollToId(id: string): void {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
