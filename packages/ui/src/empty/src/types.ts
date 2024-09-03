import type { ExtractPropTypes } from 'vue'

// 定义所需的基本props属性
export const emptyProps = {
  image: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
} as const

export type YhEmptyProps = ExtractPropTypes<typeof emptyProps>
