// lint-staged 配置：暂存区文件触发对应检查
// 避免全量 lint/build，加快提交反馈
module.exports = {
  // TS/TSX：eslint --fix 自动修复
  '*.{ts,tsx}': (stagedFiles) => [`eslint --fix ${stagedFiles.join(' ')}`],
  // 其他可自动修复的文件
  '*.{js,jsx,cjs,mjs}': ['eslint --fix'],
  '*.{json,md,css,yml,yaml}': ['prettier --write'],
}
