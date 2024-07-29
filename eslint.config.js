import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
  lessOpinionated: true,

  rules: {
    'no-console': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'node/prefer-global/process': 'off',

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

  ignores: [
    '**/node_modules',
    'pnpm-lock.yaml',
    // ...globs
  ],
})
