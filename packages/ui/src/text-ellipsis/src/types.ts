import type { ElTooltipProps } from 'element-plus'
import type { CSSProperties } from 'vue'

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export interface TextEllipsisProps extends Partial<ElTooltipProps> {
  content: string
  contentStyle?: Expand<CSSProperties>
  lineClamp?: number
}
