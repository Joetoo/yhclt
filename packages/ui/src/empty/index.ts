import { withInstall } from '@yhclt/utils'
import _Empty from './src/Empty.vue'

export type { YhEmptyProps } from './src/types'
export const Empty = withInstall(_Empty)

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    YhEmpty: typeof Empty
  }
}
