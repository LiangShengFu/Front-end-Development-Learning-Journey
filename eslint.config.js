import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // React 19 v5 实验性规则，effect 内同步 setState 在初始化/异步场景为合法模式
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // 共享工具文件同时导出组件与非组件，禁用 react-refresh 限制
    files: [
      'src/components/interactive/js/shared.tsx',
      'src/components/ui/MagicBento.tsx',
      'src/lib/i18n.tsx',
      'src/router.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
