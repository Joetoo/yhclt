/*
 * @FilePath: vitest.config.ts
 * @Description: 单元测试配置 pnpm i vitest -Dw
 */
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      // utils的单元测试
      '@yhclt/utils': resolve(__dirname, 'packages/utils/src/index.ts'),
      // ui的单元测试
      '@yhclt/ui': resolve(__dirname, 'packages/ui/src/index.ts'),
    },
  },
})

// "test": "vitest test", // 执行测试
// "coverage": "vitest run --coverage" // 执行测试覆盖率，需要安装 @vitest/coverage-c8
