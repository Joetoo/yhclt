# workspace-monorepo

## 介绍

## 项目架构

采用 pnpm+monorepo 架构设计的 workspace

## 安装教程

```bash
# 安装公共依赖
pnpm i xxx -w
# 安装开发依赖
pnpm i xxx -Dw
# 安装xxx依赖到 packages/* 项目下
pnpm add <package_name> --filter <package_selector>
pnpm add <package_name> --filter @yhclt/utils
# 运行单个包的scripts脚本
pnpm dev --filter <package_selector>
# 各个 packages/* 模块包间的相互依赖,递归安装依赖
pnpm install xxx -r
pnpm install <package_selector1> -r --filter <package_selector2>

```

## 启动项目

```bash
# 启动 play
pnpm dev

# 其他启动命令...
```

## 一键生成文档

- 采用 TSDoc 规范编写代码注释
- [api-extractor] 分析代码注释生成文档模型
- [api-documenter] 解析文档模型生成接口md文档

使用 `@microsoft/api-extractor` 和 `@microsoft/api-documenter` 一键生成 API 文档。

1. 初始化生成配置文件 api-extractor.json
2. pnpm api 提取文档
3. pnpm md 生成md文档

## 发包问题

采用 changesets 管理 monorepo 多包项目

```json
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
  "baseBranch": "main",
  // 在每次 version 变动时一定无理由 patch 抬升依赖他的那些包的版本，防止陷入 major 优先的未更新问题
  "updateInternalDependencies": "patch",
  // 不需要变动 version 的包
  "ignore": []
}
```

## 项目打包

1. unbuild
2. vite build 打包

```js
// 什么是 esm、cjs、iife 格式

// esm 格式：ECMAScript Module，现在使用的模块方案，使用 import export 来管理依赖

// cjs 格式：CommonJS，只能在 NodeJS 上运行，使用 require("module") 读取并加载模块；

// iife 格式：通过 <script> 标签引入的自执行函数；
```

## 测试 vitest

## 部署 vitepress

1. config.ts 创建 base:'/yhclt/'

## 遇见问题

## 特技优化

（这里描述你的项目优化技巧或最佳实践）

## 参考链接

- [非大厂的我们，如何去搞 Vue/React Hooks 和 Utils 的企业开源工具库？](https://juejin.cn/post/7165671737076482062#heading-2)
- [使用 Vite 和 TypeScript 带你从零打造一个属于自己的 Vue3 组件库](https://juejin.cn/post/7117886038126624805#heading-17)
- [pnpm workspace 指南](https://pnpm.io/zh/feature-comparison)
- [基于TSDoc规范生成漂亮的开源项目文档](https://juejin.cn/post/7275943600780787753?searchId=202408312125260968A15D4199BF36B1A5#heading-4)
- [个人工具函数库 摇树优化 一键生成文档站点](https://juejin.cn/post/7245584147456426045#heading-7)

<!-- {

// "*.{css,scss,vue}": "stylelint --cache --fix"
  "devDependencies": {
    "typedoc": "^0.25.13",
    "typedoc-plugin-markdown": "^4.0.3",
    "vue": "^3.4.27"
  }
} -->
