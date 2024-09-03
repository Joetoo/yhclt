import { withInstall } from '@yhclt/utils'
import _Checkbox from './src/Checkbox'

export type { CheckboxProps } from './src/Checkbox'
export const Checkbox = withInstall(_Checkbox)

declare module 'vue' {
  export interface GlobalComponents {
    YhCheckbox: typeof Checkbox
  }
}
