/** @type {import('@commitlint/types').UserConfig} */
// Conventional Commits 规范：
// <type>(<scope>): <subject>
// type ∈ feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // bug 修复
        'docs', // 文档
        'style', // 格式（不影响代码运行）
        'refactor', // 重构（既不是 feat 也不是 fix）
        'perf', // 性能优化
        'test', // 测试
        'build', // 构建系统/依赖
        'ci', // CI 配置
        'chore', // 杂务
        'revert', // 回滚
      ],
    ],
    'subject-max-length': [2, 'always', 72],
  },
}
