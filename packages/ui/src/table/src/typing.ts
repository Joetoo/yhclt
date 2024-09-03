// import type { PaginationProps, TableColumnCtx, TableProps } from 'element-plus'

// export interface TableColumnDefaultSlotProps<T> {
//   row: T
//   $index: number
//   cellIndex: number
//   column: GaTableColumn<T>
//   expanded: boolean
//   store: any
// }

// export interface GaPaginationProps extends Partial<PaginationProps> {
//   isShow?: boolean | false
//   total?: number
//   currentPage?: number
//   pageSize?: number
// }

// export interface GaTableProps<T = any> extends TableProps<T> {
//   slot?: {
//     default?: ({ row }: { row: T }) => JSX.Element
//     append?: ({ row }: { row: T }) => JSX.Element
//     empty?: ({ row }: { row: T }) => JSX.Element
//   }
//   [key: string]: any
// }

// export type GaTableColumn<T = any> = Partial<TableColumnCtx<T>> & {
//   label: string
//   prop?: T extends object ? keyof T : string
//   fixLeft?: boolean
//   fixRight?: boolean
//   sort?: number | null
//   isHidden?: boolean
//   slot?: {
//     default?: ({ row, $index, cellIndex, column, expanded, store }: TableColumnDefaultSlotProps<T>) => JSX.Element
//     header?: ({ $index, column, store }: { $index: number, column: GaTableColumn<T>, store: any }) => JSX.Element
//   }
// }

// export interface columnsMapItem {
//   prop: string
//   isHidden: boolean
// }

// export interface GaTableTsxProps<T = any> {
//   columns: GaTableColumn<T>[]
//   columnsMap: columnsMapItem[]
//   data: unknown[]
//   tableProps?: Partial<GaTableProps<T>>
//   pagination?: GaPaginationProps
//   paginationChange?: () => void
//   columnsUpdate?: () => columnsMapItem[]
// }

// export interface TableConfigProps {
//   visible: boolean
//   columns: GaTableColumn[]
//   originColumns: GaTableColumn[]
// }
