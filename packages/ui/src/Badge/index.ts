/*
 * @FilePath: \yhclt\packages\components\src\Badge\index.ts
 * @Description: 组件唯一出入口
 */

import { withInstall } from '../utils'
import _Badge from './src/badge.vue'
// 类型导出
export type { YhBadgeProps } from './src/types'

export const Badge = withInstall(_Badge)

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    YhBadge: typeof Badge
  }
}
