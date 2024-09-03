import { withInstall } from '@yhclt/utils'
import _TextEllipsis from './src/TextEllipsis.vue'

export const TextEllipsis = withInstall(_TextEllipsis)

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    YhTextEllipsis: typeof TextEllipsis
  }
}
