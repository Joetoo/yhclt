import type { InputInstance } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export interface SearchResult {
  label: string
  value: string
  [key: string]: any
}

export interface InputDropdownProps {
  remoteMethod: (value: string) => Promise<SearchResult[]>
  modelValue: string
  width?: string
  elInputProps?: Partial<InputInstance['props']>
}
export type YhInputDropdownProps = ExtractPropTypes<InputDropdownProps>
