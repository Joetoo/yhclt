# workspace-monorepo

## 介绍

## 软件架构

workspace-monorepo 是一个采用 pnpm+monorepo 架构设计的前端项目。

## 安装教程

```bash
# 安装公共依赖
pnpm i typescript -w
# // 安装开发依赖
pnpm i typescript -Dw
# // 安装指定依赖
pnpm add <package_name> --filter <package_selector>
pnpm add <package_name> --filter @yhclt/components
# // 运行单个包的scripts脚本
pnpm dev --filter <package_selector>
# // 各个 packages/* 模块包间的相互依赖,递归安装依赖
pnpm install axios -r
pnpm install <package_selector1> -r --filter <package_selector2>

```

### 创建 packages 目录并安装依赖

```bash
mkdir packages
pnpm install lodash -r --filter @test/core
pnpm install element-plus
pnpm install -D @element-plus/nuxt --filter realworld-nuxt3
pnpm install normalize.css --filter realworld-nuxt3
```

## 启动项目

```bash
# 启动 Nuxt.js 3 项目
pnpm dev:nuxt3

# 启动 Vue 3 项目
pnpm dev:vue3

# 其他启动命令...
```

## 一键生成文档

使用 `@microsoft/api-extractor` 和 `@microsoft/api-documenter` 一键生成 API 文档。

```bash
pnpm add @microsoft/api-extractor @microsoft/api-documenter -D --filter @yhclt/utils
```

## 发包问题

changesets 管理 monorepo 多包项目

{
"$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
// changelog 生成方式
"changelog": "@changesets/cli/changelog",
// 不要让 changeset 在 publish 的时候帮我们做 git add
"commit": false,
"fixed": [],
// 配置哪些包要共享版本
"linked": [],
// 公私有安全设定，内网建议 restricted ，开源使用 public
"access": "public",
// 项目主分支
"baseBranch": "master",
// 在每次 version 变动时一定无理由 patch 抬升依赖他的那些包的版本，防止陷入 major 优先的未更新问题
"updateInternalDependencies": "patch",
// 不需要变动 version 的包
"ignore": []
}

## 项目打包

什么是 esm、cjs、iife 格式

esm 格式：ECMAScript Module，现在使用的模块方案，使用 import export 来管理依赖；

cjs 格式：CommonJS，只能在 NodeJS 上运行，使用 require("module") 读取并加载模块；

iife 格式：通过 <script> 标签引入的自执行函数；

import { defineConfig, Format, Options } from 'tsup'
import fg from 'fast-glob'
import { sassPlugin } from 'esbuild-sass-plugin'
import fs from 'fs'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const baseConfigs = [
{
dts: true, // 添加 .d.ts 文件
metafile: false, // 添加 meta 文件
minify: true, // 压缩
splitting: false,
sourcemap: false, // 添加 sourcemap 文件
clean: true, // 是否先清除打包的目录，例如 dist
format: ['cjs'] as Format[]
},
{
dts: true, // 添加 .d.ts 文件
metafile: false, // 添加 meta 文件
minify: true, // 压缩
splitting: false,
sourcemap: false, // 添加 sourcemap 文件
clean: true, // 是否先清除打包的目录，例如 dist
format: ['esm'] as Format[]
}
]
const filePaths: { text: string; path: string }[] = []
const hasHandlePath: string[] = []

const myReadfile = () => {
const entries = fg.sync([`./packages/**/index.ts`, `./packages/**/index.tsx`], {
onlyFiles: false,
deep: Infinity,
ignore: [`**/cli/**`, `**/node_modules/**`, `**/*.test.ts`]
})
const configs: Options[] = []
baseConfigs.forEach((baseConfig) =>
entries.forEach((file) => {
const outDir = file.replace(/(packages/)(.\*?)//, `./packages/$2/cli/${baseConfig.format[0]}/`).replace(//index.(ts|tsx)$/, '')
      configs.push({
        target: ['esnext'],
        entry: [file],
        outDir: outDir,
        loader: {
          '.js': 'jsx',
          '.jsx': 'jsx',
          '.scss': 'css',
          '.sass': 'css',
          '.less': 'css',
          '.css': 'css',
          '.tsx': 'tsx'
        },
        ...baseConfig,
        esbuildPlugins: [
          sassPlugin({
            async transform(source) {
              const { css } = await postcss([autoprefixer]).process(source)
              return css
            }
          }),
          {
            name: 'scss-plugin',
            setup: (build) => {
              build.onEnd((result) => {
                result.outputFiles?.forEach((item) => {
                  if (
                    /index.(mjs|js)$/.test(item.path) &&
result.outputFiles?.find((outputItem) => outputItem.path === item.path.replace(/(.js|.mjs)$/, '.css'))
) {
filePaths.push({ text: item.text, path: item.path })
}
})
})
}
}
],
onSuccess: async () => {
filePaths.forEach((item) => {
if (!hasHandlePath.find((val) => val === item.path)) {
fs.access(item.path, (err) => {
if (!err) {
let data = item.text
data = `import "./index.css"; ${data}`
fs.writeFile(
item.path,
`import "./index.css"; ${item.text}`,
{
encoding: 'utf-8'
},
(fileError) => {
if (!fileError) {
hasHandlePath.push(item.path)
}
}
)
}
})
}
})
}
})
})
)
return defineConfig(configs)
}

export default myReadfile()

## 测试路径搭建

## vite打包

import {
defineConfig,
normalizePath
} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/assets/scss/variables.scss'))

export default defineConfig({
plugins: [
vue(),
vueJsx()
],
// css 相关的配置
css: {
preprocessorOptions: {
scss: {
// additionalData 的内容会在每个 scss 文件的开头自动注入
additionalData: `@import "${variablePath}";`
}
}
},
build: {
lib: {
entry: 'src/packages/index.ts', // 你的入口文件路径
name: 'vite-lib', // 你的库名称
fileName: (format) => `vite-lib.${format}.js` // 打包后的文件名
},
sourcemap: true, // 输出.map文件
rollupOptions: {
// 此处添加外部依赖项（如 Vue），以避免将其打包进你的库中
external: [
'vue',
'element-plus',
'dayjs',
'lodash'
],
output: {
// 设置为 'es' 或 'cjs'，取决于你的库的使用场景
// format: 'es',
// exports: 'named',
// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
globals: {
vue: 'Vue'
}
}
}
}
})

## 遇见问题

2. **分支操作**：

   - 新建 `Feat_xxx` 分支。
   - 提交代码。
   - 新建 Pull Request。

   采用 TSDoc 规范编写代码注释
   api-extractor 分析代码注释生成文档模型
   api-documenter 解析文档模型生成接口文档

## 特技优化

（这里描述你的项目优化技巧或最佳实践）

## 参考链接

- [非大厂的我们，如何去搞Vue/React Hooks和Utils的企业开源工具库？](https://juejin.cn/post/7165671737076482062#heading-2)
- [pnpm + monorepo + changeset实现多包管理和发布](https://www.swvq.com/boutique/detail/tanhbeahkg)
- [使用Vite和TypeScript带你从零打造一个属于自己的Vue3组件库](https://juejin.cn/post/7117886038126624805#heading-17)
- [手把手教你用Rollup构建一个前端个人工具函数库 摇树优化 一键生成文档站点](https://juejin.cn/post/7245584147456426045#heading-7)
- [使用pnpm和changeset管理monorepo项目](https://juejin.cn/post/7117886038126624805#heading-17)
- [pnpm workspace 指南](https://pnpm.io/zh/feature-comparison)
