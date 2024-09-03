import { withInstall } from '@yhclt/utils'
import _InputDropdown from './src/InputDropdown.vue'

export * from './src/typing'
export const InputDropdown = withInstall(_InputDropdown)

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    YhInputDropdown: typeof InputDropdown
  }
}
