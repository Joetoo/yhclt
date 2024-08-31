import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: false,
    jsx: true,
  },
  typescript: true,
  vue: true,
  lessOpinionated: true,

  rules: {
    'no-console': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'node/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',

    // if-else
    // 组件name允许不是多个单词
    // 'vue/multi-word-component-names': 'off',
    // // 允许使用any
    // '@typescript-eslint/no-explicit-any': 'off',
    // // 允许未使用的变量
    // 'no-unused-vars': 'off',
    // 'import/no-unresolved': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // 'vue/comment-directive': 'off',
    // 'vue/prefer-import-from-vue': 'off',
  },
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: 'prettier',
  },
  ignores: [
    '**/node_modules',
    'pnpm-lock.yaml',
    // ...globs
  ],
})
