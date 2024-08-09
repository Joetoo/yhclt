# apifox-cli

基于 APIFOX 平台，帮助开发者快速生成前端项目中的 API 请求代码和 TypeScript 类型定义。

## 安装与配置

1.  全局安装

```bash

# 使用 npm 进行全局安装：
npm install @yhclt/apifox-cli -g

# 全局移除
npm uninstall -g @yhclt/apifox-cli

```

2.  初始化配置

```javascript
// 在项目根目录运行 apifox-cli init 命令来生成配置文件 apifox.config.cjs
module.exports = {
  projectId: number, // 访问https://app.apifox.com/main 查看你的项目id
  output: 'src/api', // 输出目录
  importHttp: `import { http } from '@/utils/http'`,
  // 访问https://app.apifox.com/main从某个接口的请求头里面copy
  Authorization: 'Bearer XXXXXX',
}
```

## 生成代码

```bash
# 更新所有接口
apifox-cli create --type=all

# 按文件夹模块更新接口
apifox-cli create --type=module

# 按文件夹模块更新接口 --prefixPath参数可以给接口path增加统一的前缀
apifox-cli create --type=module --prefixPath=testPrefix

# 按api接口精确更新
apifox-cli create --type=api
```

## 查看帮助

```javascript
// 执行：apifox-cli help 查看帮助文档
```

<a name="MJeSI"></a>

## 注意事项

- 确保在 apifox.config.cjs 中填写正确的 projectId，这通常可以在 APIFOX 平台上找到。
- 如果接口文档中有授权信息，需要在配置文件中正确设置 Authorization 字段。
- 使用 --prefixPath 参数可以为生成的接口路径添加统一的前缀，这在某些项目结构中可能很有用。
