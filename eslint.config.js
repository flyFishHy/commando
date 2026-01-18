// eslint.config.mjs
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default tsEslint.config(
  // 继承 ESLint 推荐配置
  js.configs.recommended,
  // 继承 TypeScript 推荐配置
  ...tsEslint.configs.recommended,
  {
    // 全局忽略
    ignores: ['dist/', 'node_modules/'],
  },
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 启用 prettier 规则
      'prettier/prettier': 'error',
      // 自定义规则
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
    },
  },
  // 禁用与 prettier 冲突的规则 (必须放在最后)
  prettierConfig,
)