/**
 * CountUp — 数字滚动动效组件
 *
 * 基于 React Bits CountUp (JS + CSS + motion) 适配本项目。
 * 依赖 motion 的 useInView / useMotionValue / useSpring，
 * 本项目使用 framer-motion（motion 的同源包），直接复用其 hook。
 *
 * 当元素进入视口时，从 from 平滑滚动到 to，支持千分位分隔与小数。
 */
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

export interface CountUpProps {
  /** 目标数值 */
  to: number
  /** 起始数值 */
  from?: number
  /** 计数方向：up（递增）或 down（递减） */
  direction?: 'up' | 'down'
  /** 延迟开始秒数 */
  delay?: number
  /** 动画时长（秒），通过 damping/stiffness 间接控制 */
  duration?: number
  /** 附加 className */
  className?: string
  /** 是否在进入视口时开始 */
  startWhen?: boolean
  /** 千分位分隔符，空字符串表示不分隔 */
  separator?: string
  /** 动画开始回调 */
  onStart?: () => void
  /** 动画结束回调 */
  onEnd?: () => void
}

export function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? to : from)

  // 根据 duration 反推 spring 的 damping / stiffness
  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  /** 计算数值的小数位数 */
  const getDecimalPlaces = (num: number) => {
    const str = num.toString()
    if (str.includes('.')) {
      const decimals = str.split('.')[1]
      if (parseInt(decimals, 10) !== 0) {
        return decimals.length
      }
    }
    return 0
  }

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to))

  /** 格式化数值：应用千分位分隔符与小数位数 */
  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      }
      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest)
      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber
    },
    [maxDecimals, separator],
  )

  // 初始化显示值
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from)
    }
  }, [from, to, direction, formatValue])

  // 进入视口后触发动画
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') onStart()

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to)
      }, delay * 1000)

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') onEnd()
        },
        delay * 1000 + duration * 1000,
      )

      return () => {
        clearTimeout(timeoutId)
        clearTimeout(durationTimeoutId)
      }
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration])

  // 订阅 spring 变化，更新文本
  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest)
      }
    })
    return () => unsubscribe()
  }, [springValue, formatValue])

  return <span className={className} ref={ref} />
}
