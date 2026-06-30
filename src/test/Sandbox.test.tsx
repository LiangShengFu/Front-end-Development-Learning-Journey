/**
 * Sandbox 组件测试
 *
 * 验证代码沙盒的核心行为：
 * 1. 基本渲染（编辑器、输出区、运行按钮）
 * 2. JS 模式下 iframe srcDoc 构建（console hook 注入、</script> 转义）
 * 3. HTML/CSS 预览模式
 * 4. checks 断言检查
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Sandbox } from '../components/interactive/Sandbox'
import type { SandboxData } from '../lib/types'

describe('Sandbox 组件', () => {
  describe('基本渲染', () => {
    it('JS 模式：渲染编辑器、输出区和运行按钮', () => {
      const data: SandboxData = {
        initialCode: "console.log('hello')",
        language: 'js',
      }
      render(<Sandbox data={data} />)

      expect(screen.getByText('js · 编辑器')).toBeInTheDocument()
      expect(screen.getByText('输出')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /运行/ })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /重置/ })).toBeInTheDocument()
    })

    it('显示提示文本（hint）', () => {
      const data: SandboxData = {
        initialCode: '// test',
        language: 'js',
        hint: '这是一个测试提示',
      }
      render(<Sandbox data={data} />)
      expect(screen.getByText('这是一个测试提示')).toBeInTheDocument()
    })

    it('HTML 预览模式：显示预览区和自动运行开关', () => {
      const data: SandboxData = {
        initialCode: '<h1>Hello</h1>',
        language: 'html',
      }
      render(<Sandbox data={data} />)
      expect(screen.getByText('预览')).toBeInTheDocument()
      expect(screen.getByText('自动运行')).toBeInTheDocument()
    })

    it('CSS 预览模式：显示预览区', () => {
      const data: SandboxData = {
        initialCode: '.btn { color: red; }',
        language: 'css',
      }
      render(<Sandbox data={data} />)
      expect(screen.getByText('预览')).toBeInTheDocument()
    })
  })

  describe('JS 模式 iframe srcDoc 构建', () => {
    beforeEach(() => {
      // 模拟 window.location.origin
      Object.defineProperty(window, 'location', {
        value: { origin: 'http://localhost:5173' },
        writable: true,
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('点击运行后渲染隐藏 iframe，srcDoc 包含 console hook', () => {
      const data: SandboxData = {
        initialCode: "console.log('test')",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      // 点击运行按钮
      const runButton = screen.getByRole('button', { name: /运行/ })
      fireEvent.click(runButton)

      // 查找 iframe
      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      expect(iframe).not.toBeNull()
      expect(iframe!.getAttribute('srcDoc')).toContain('__sandbox')
      expect(iframe!.getAttribute('srcDoc')).toContain('console.log')
    })

    it('srcDoc 中转义用户代码的 </script> 字符串，防止脚本提前关闭', () => {
      const data: SandboxData = {
        // 用户代码包含 </script> 字符串
        initialCode: "const s = '</script>'; console.log(s);",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''

      // 用户代码中的 </script> 应被转义为 <\/script
      expect(srcDoc).toContain('<\\/script')
      // 不应包含未转义的 </script>（除了 console hook 脚本本身的闭合标签）
      // 用户代码部分不应有裸 </script>
      const userCodeSection = srcDoc.split('try {')[1] || ''
      expect(userCodeSection).not.toContain('</script')
    })

    it('srcDoc 中注入了安全的对象序列化函数 safeStringify', () => {
      const data: SandboxData = {
        initialCode: "console.log({a: 1})",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''

      expect(srcDoc).toContain('safeStringify')
      // 应处理循环引用
      expect(srcDoc).toContain('[深度限制]')
      // 应处理函数
      expect(srcDoc).toContain('[Function]')
    })

    it('srcDoc 中 targetOrigin 正确设置（非 file:// 协议）', () => {
      const data: SandboxData = {
        initialCode: "console.log('test')",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''

      // targetOrigin 应为 JSON.stringify 后的 origin
      expect(srcDoc).toContain('"http://localhost:5173"')
    })

    it('srcDoc 中包含 error 事件监听器和 unhandledrejection 监听器', () => {
      const data: SandboxData = {
        initialCode: 'throw new Error("test")',
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''

      expect(srcDoc).toContain("addEventListener('error'")
      expect(srcDoc).toContain("addEventListener('unhandledrejection'")
    })

    it('用户代码语法错误时，catch 块通过 postMessage 发送错误', () => {
      const data: SandboxData = {
        initialCode: 'throw new Error("custom error")',
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''

      // catch 块应存在并发送错误
      expect(srcDoc).toContain('catch (e)')
      expect(srcDoc).toContain('__sandbox')
    })
  })

  describe('message 监听与日志接收', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { origin: 'http://localhost:5173' },
        writable: true,
      })
    })

    it('收到合法的 postMessage 后添加日志', () => {
      const data: SandboxData = {
        initialCode: "console.log('test')",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      // 点击运行
      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const iframeWindow = iframe!.contentWindow

      // 模拟 iframe 内发出的 postMessage
      act(() => {
        const event = new MessageEvent('message', {
          data: { __sandbox: true, log: { type: 'log', args: ['hello'] } },
          source: iframeWindow,
          origin: 'http://localhost:5173',
        })
        window.dispatchEvent(event)
      })

      // 应显示日志
      expect(screen.getByText('hello')).toBeInTheDocument()
    })

    it('拒绝非 sandbox iframe 来源的消息（安全校验）', () => {
      const data: SandboxData = {
        initialCode: "console.log('test')",
        language: 'js',
      }
      render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      // 模拟来自其他 window 的伪造消息
      act(() => {
        const fakeWindow = {} as Window
        const event = new MessageEvent('message', {
          data: { __sandbox: true, log: { type: 'log', args: ['forged'] } },
          source: fakeWindow,
          origin: 'http://evil.com',
        })
        window.dispatchEvent(event)
      })

      // 伪造消息不应显示
      expect(screen.queryByText('forged')).not.toBeInTheDocument()
    })

    it('运行前显示提示文案', () => {
      const data: SandboxData = {
        initialCode: "console.log('test')",
        language: 'js',
      }
      render(<Sandbox data={data} />)
      expect(screen.getByText(/点击.*运行.*查看输出结果/)).toBeInTheDocument()
    })

    it('运行后无输出显示"（无输出）"', () => {
      const data: SandboxData = {
        initialCode: 'const x = 1',
        language: 'js',
      }
      render(<Sandbox data={data} />)
      fireEvent.click(screen.getByRole('button', { name: /运行/ }))
      expect(screen.getByText('（无输出）')).toBeInTheDocument()
    })
  })

  describe('checks 断言检查', () => {
    it('显示检查清单并实时更新通过状态', () => {
      const data: SandboxData = {
        initialCode: '// TODO: 实现 debounce\nfunction debounce() {}',
        language: 'js',
        checks: [
          {
            description: '使用闭包保存定时器',
            pattern: 'let\\s+timer|var\\s+timer',
            hint: '在 debounce 函数内用 let/var 声明 timer 变量',
          },
          {
            description: '返回新函数',
            pattern: 'return\\s+function|return\\s*\\(',
            hint: 'debounce 应返回一个新函数',
          },
        ],
      }
      render(<Sandbox data={data} />)

      expect(screen.getByText('使用闭包保存定时器')).toBeInTheDocument()
      expect(screen.getByText('返回新函数')).toBeInTheDocument()
      expect(screen.getByText('0 / 2 通过')).toBeInTheDocument()

      // 修改代码使其部分通过
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      fireEvent.change(textarea, {
        target: { value: 'function debounce() { let timer; return function() {} }' },
      })

      expect(screen.getByText('2 / 2 通过')).toBeInTheDocument()
      expect(screen.getByText(/全部通过/)).toBeInTheDocument()
    })

    it('未通过时显示教学提示', () => {
      const data: SandboxData = {
        initialCode: 'function debounce() {}',
        language: 'js',
        checks: [
          {
            description: '使用闭包保存定时器',
            pattern: 'let\\s+timer',
            hint: '用 let timer 声明定时器变量',
          },
        ],
      }
      render(<Sandbox data={data} />)
      expect(screen.getByText('用 let timer 声明定时器变量')).toBeInTheDocument()
    })
  })

  describe('重置功能', () => {
    it('点击重置恢复初始代码并清空日志', () => {
      const data: SandboxData = {
        initialCode: "console.log('initial')",
        language: 'js',
      }
      render(<Sandbox data={data} />)

      // 修改代码
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      fireEvent.change(textarea, { target: { value: 'modified code' } })

      // 点击运行
      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      // 点击重置
      fireEvent.click(screen.getByRole('button', { name: /重置/ }))

      // 应恢复初始代码
      expect(textarea.value).toBe("console.log('initial')")
      // 应显示运行前提示（hasRun 为 false）
      expect(screen.getByText(/点击.*运行.*查看输出结果/)).toBeInTheDocument()
    })
  })

  describe('HTML/CSS 预览模式', () => {
    it('HTML 模式：完整 HTML 文档直接使用', () => {
      const data: SandboxData = {
        initialCode: '<!DOCTYPE html><html><body><h1>Test</h1></body></html>',
        language: 'html',
      }
      const { container } = render(<Sandbox data={data} />)

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-preview"]')
      expect(iframe).not.toBeNull()
      const srcDoc = iframe!.getAttribute('srcDoc') || ''
      expect(srcDoc).toContain('<!DOCTYPE html>')
      expect(srcDoc).toContain('<h1>Test</h1>')
    })

    it('HTML 模式：片段自动包裹完整文档', () => {
      const data: SandboxData = {
        initialCode: '<p>Hello</p>',
        language: 'html',
      }
      const { container } = render(<Sandbox data={data} />)

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-preview"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''
      expect(srcDoc).toContain('<!DOCTYPE html>')
      expect(srcDoc).toContain('<p>Hello</p>')
    })

    it('CSS 模式：将用户 CSS 应用到示例 HTML', () => {
      const data: SandboxData = {
        initialCode: '.btn { background: red; }',
        language: 'css',
      }
      const { container } = render(<Sandbox data={data} />)

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-preview"]')
      const srcDoc = iframe!.getAttribute('srcDoc') || ''
      expect(srcDoc).toContain('.btn { background: red; }')
      expect(srcDoc).toContain('demo-box')
    })
  })

  describe('多类型输出验证', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { origin: 'http://localhost:5173' },
        writable: true,
      })
    })

    it('不同类型日志（log/error/warn/info）均能接收并着色', () => {
      const data: SandboxData = {
        initialCode: "console.log('log')",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const iframeWindow = iframe!.contentWindow

      // 模拟不同类型日志
      act(() => {
        const types = ['log', 'error', 'warn', 'info']
        types.forEach((type) => {
          const event = new MessageEvent('message', {
            data: { __sandbox: true, log: { type, args: [`msg-${type}`] } },
            source: iframeWindow,
            origin: 'http://localhost:5173',
          })
          window.dispatchEvent(event)
        })
      })

      expect(screen.getByText('msg-log')).toBeInTheDocument()
      expect(screen.getByText('msg-error')).toBeInTheDocument()
      expect(screen.getByText('msg-warn')).toBeInTheDocument()
      expect(screen.getByText('msg-info')).toBeInTheDocument()
    })

    it('异步代码的日志能被捕获（模拟 setTimeout 输出）', () => {
      const data: SandboxData = {
        initialCode: "setTimeout(() => console.log('async'), 0)",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const iframeWindow = iframe!.contentWindow

      // 模拟异步输出（console hook 永久替换，异步回调也能捕获）
      act(() => {
        const event = new MessageEvent('message', {
          data: { __sandbox: true, log: { type: 'log', args: ['async'] } },
          source: iframeWindow,
          origin: 'http://localhost:5173',
        })
        window.dispatchEvent(event)
      })

      expect(screen.getByText('async')).toBeInTheDocument()
    })

    it('多个参数的 console.log 合并显示', () => {
      const data: SandboxData = {
        initialCode: "console.log('a', 'b', 'c')",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      fireEvent.click(screen.getByRole('button', { name: /运行/ }))

      const iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      const iframeWindow = iframe!.contentWindow

      act(() => {
        const event = new MessageEvent('message', {
          data: { __sandbox: true, log: { type: 'log', args: ['a', 'b', 'c'] } },
          source: iframeWindow,
          origin: 'http://localhost:5173',
        })
        window.dispatchEvent(event)
      })

      expect(screen.getByText('a b c')).toBeInTheDocument()
    })

    it('多次运行清空旧日志', () => {
      const data: SandboxData = {
        initialCode: "console.log('first')",
        language: 'js',
      }
      const { container } = render(<Sandbox data={data} />)

      // 第一次运行
      fireEvent.click(screen.getByRole('button', { name: /运行/ }))
      let iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      let iframeWindow = iframe!.contentWindow

      act(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: { __sandbox: true, log: { type: 'log', args: ['first-log'] } },
            source: iframeWindow,
            origin: 'http://localhost:5173',
          }),
        )
      })

      expect(screen.getByText('first-log')).toBeInTheDocument()

      // 第二次运行
      fireEvent.click(screen.getByRole('button', { name: /运行/ }))
      iframe = container.querySelector<HTMLIFrameElement>('iframe[title="sandbox-exec"]')
      iframeWindow = iframe!.contentWindow

      act(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: { __sandbox: true, log: { type: 'log', args: ['second-log'] } },
            source: iframeWindow,
            origin: 'http://localhost:5173',
          }),
        )
      })

      // 旧日志应被清空
      expect(screen.queryByText('first-log')).not.toBeInTheDocument()
      expect(screen.getByText('second-log')).toBeInTheDocument()
    })
  })
})
