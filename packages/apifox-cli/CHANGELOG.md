# apifox-cli 更新日志

## 1.0.6

### Patch Changes

- yhc模板生成方式更新，取消web和wx区分

## 1.0.5

### Patch Changes

- fix: 修复返回结构体生成的ts类型

## 1.0.4

### Patch Changes

- 使用文档说明

## 1.0.3

### Patch Changes

- 增加模板配置

## [1.0.2] - 2024-05-02

### 新增

- 增加importHttp配置项,(支持自定义引用http路径) importHttp: `import { http } from '@/utils/http'`,
- 默认路径为: import { http } from '@/utils/http'

### 修复

- 简化apiName ,统一使用API后缀
