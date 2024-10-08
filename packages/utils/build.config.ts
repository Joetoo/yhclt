import { defineBuildConfig } from 'unbuild'

const enableOut = process.argv.includes('--out')

export default defineBuildConfig({
  // 指定要打包的入口文件
  entries: ['src/index'],
  // 每次构建之前，输出目录（outDir）将被清空
  clean: true,
  declaration: true,
  sourcemap: enableOut,
  outDir: enableOut ? 'out' : 'dist',
  rollup: {
    emitCJS: true,
    esbuild: { target: 'node20', minify: true },
  },
  // 排除的依赖
  externals: ['vue', '@vue/shared', '@microsoft/api-documenter', '@microsoft/api-extractor'],
})
