// import { computed, defineComponent, ref } from 'vue'
// import type { TableRefs } from 'element-plus'

// import { ElEmpty, ElPagination, ElTable, ElTableColumn } from 'element-plus'
// import { cloneDeep } from 'lodash-unified'
// import EmptyBg from '../../assets/empty.png'
// import TableColumnConfig from './table-config'
// import type { GaPaginationProps, GaTableColumn, GaTableTsxProps, columnsMapItem } from './typing'
// import '../style/index.scss'

// const GaTable = defineComponent<GaTableTsxProps>(
//   (props, { expose, emit }) => {
//     const defaultTableEmpty = {
//       empty: () => {
//         return (
//           <ElEmpty
//             image={EmptyBg}
//             image-size={100}
//             v-slots={{
//               description: () => (
//                 <div
//                   style={{
//                     lineHeight: '40px',
//                   }}
//                 >
//                   暂无数据
//                 </div>
//               ),
//             }}
//           />
//         )
//       },
//     }
//     const defaultTabProp = {
//       stripe: true,
//       /**
//        * @description: element-plus 要求只有当 border 存在时才能拖动列宽（还要排除掉无数据的情况）
//        */
//       border: (props.tableProps?.resizable && !!props.data?.length) || false,
//       highlightCurrentRow: false,
//       columnConfig: false,
//       emptyText: '',
//       showOverflowTooltip: true,
//     }
//     const defaultPaginationProps = {
//       layout: 'sizes, prev, pager, next',
//       pageSizes: [10, 20, 50, 100],
//     }

//     const elTable = ref<TableRefs>() // 表格实例
//     const columnsList = ref<GaTableColumn[]>(cloneDeep(props.columns))

//     /**
//      * 有列排序数据，则按缓存数据排序
//      */
//     const columnsData = computed(() => {
//       columnsList.value = props.columns.filter(item => !item.fixLeft && !item.fixRight)
//       const localColumnList = props.columnsMap || []
//       const tempArr = localColumnList.map((i: GaTableColumn) => !!i.isHidden)
//       const localColumnArr = localColumnList.map((i: GaTableColumn) => i.prop)
//       // 自定义排序函数
//       function columnPropSort(a: GaTableColumn, b: GaTableColumn) {
//         const indexA = localColumnArr.indexOf(a.prop)
//         const indexB = localColumnArr.indexOf(b.prop)
//         if (indexA === -1 || indexB === -1) {
//           return 0 // 如果 id 不在 localColumnArr 数组中，则维持原有顺序
//         }
//         return indexA - indexB
//       }
//       if (localColumnList.length) {
//         // 按照缓存进行列排序
//         const resultColumns: GaTableColumn[] = columnsList.value.slice().sort(columnPropSort)
//         // 按照缓存处理 isHidden 为 true 的情况
//         columnsList.value = resultColumns.slice().map((i, index) => ({
//           ...i,
//           isHidden: tempArr[index],
//         }))
//       }
//       props.columns.forEach((i) => {
//         if (i.fixLeft) {
//           columnsList.value.unshift(i)
//         } else if (i.fixRight) {
//           columnsList.value.push(i)
//         }
//       })
//       return columnsList.value
//     })

//     /**
//      * 清除表格选择状态
//      */
//     const clearSelection = () => {
//       elTable.value?.clearSelection()
//     }

//     /**
//      * 清除筛选项
//      */
//     const clearFilter = () => {
//       elTable.value?.clearFilter()
//     }

//     /**
//      * 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
//      */
//     const toggleRowSelection = (row: any, selected?: boolean) => {
//       elTable.value?.toggleRowSelection(row, selected)
//     }

//     /**
//      * 滚动表格内的指定位置
//      */
//     const scrollTo = (options: ScrollToOptions | number, yCoord?: number) => {
//       elTable.value?.scrollTo(options, yCoord)
//     }
//     const paginationHandle = (val: number, type: string) => {
//       if (props?.pagination) {
//         // 页码变化
//         if (type === 'currentChange') {
//           const pageKey = 'currentPage' in props.pagination ? 'currentPage' : 'current-page'
//           emit('update:pagination', { ...props.pagination, [pageKey]: val })
//         } else {
//           // 页面条数变化
//           const pageSizekey = 'page-size' in props.pagination ? 'page-size' : 'pageSize'
//           const pageKey = 'currentPage' in props.pagination ? 'currentPage' : 'current-page'
//           emit('update:pagination', { ...props.pagination, [pageKey]: 1, [pageSizekey]: val })
//         }
//         emit('paginationChange')
//       }
//     }

//     const drawerVisible = ref<boolean>(false)

//     const showTableConfig = () => {
//       drawerVisible.value = true
//     }
//     const hideTableConfig = () => {
//       drawerVisible.value = false
//     }
//     const updateColumnsData = (columns: GaTableTsxProps['columns']) => {
//       columnsList.value = cloneDeep(columns)
//       // 保存排序结果到本地缓存中
//       const columnsArr: Record<string, boolean | string>[] = []
//       columns.forEach((item: GaTableColumn) => {
//         const { prop, isHidden } = item
//         if (prop) {
//           // item.prop: item.isHidden
//           columnsArr.push({
//             prop,
//             isHidden: !!isHidden,
//           })
//         }
//       })
//       // console.log('columnsArr: ', columnsArr)
//       // localStorage.setItem('columnsArr', JSON.stringify(columnsArr))
//       // 回调请求方法，将数据传给后端
//       emit('columnsUpdate', columnsArr)
//       // drawerVisible.value = false
//     }

//     expose({
//       clearSelection,
//       scrollTo,
//       clearFilter,
//       toggleRowSelection,
//     })

//     return () => (
//       <div class={!props.tableProps?.border ? 'ga-table-container table-has-no-border' : 'ga-table-container'}>
//         {/* {props.tableProps?.columnConfig && (
//           <div>
//             <el-tooltip
//               effect="dark"
//               content="表头设置"
//               placement="top-start"
//             >
//               <span class="table-setting" onClick={() => showTableConfig()}>
//                 <el-icon size="16px" color="#1453ff">
//                   <icon-font-setting />
//                 </el-icon>
//               </span>
//             </el-tooltip>
//           </div>
//         )} */}
//         <ElTable
//           ref={elTable}
//           className="ga-table"
//           data={props.data}
//           {...Object.assign({}, defaultTabProp, props.tableProps)}
//           v-slots={{ ...(props.tableProps?.slot || defaultTableEmpty) }}
//         >
//           {columnsData.value?.map((column, index) => {
//             return !column.isHidden ? (
//               props.tableProps?.columnConfig && index === columnsData.value.length - 1 ? (
//                 <ElTableColumn
//                   key={column.prop}
//                   {...Object.assign(column, { resizable: props.tableProps?.resizable })}
//                   v-slots={{
//                     default: column.slot?.default,
//                     header: () => {
//                       // 表格列配置按钮
//                       return (
//                         <div class="columns-setting-area">
//                           <span>{column.label}</span>
//                           <el-tooltip effect="dark" content="表头设置" placement="top">
//                             <el-icon size="17px" color="#A1A0A7" onClick={() => showTableConfig()}>
//                               <icon-font-setting />
//                             </el-icon>
//                           </el-tooltip>
//                         </div>
//                       )
//                     },
//                   }}
//                   isHidden-overflow-tooltip={
//                     column.showOverflowTooltip === undefined ? true : column.showOverflowTooltip
//                   }
//                 >
//                 </ElTableColumn>
//               ) : (
//                 <ElTableColumn
//                   key={column.prop}
//                   {...Object.assign(column, { resizable: props.tableProps?.resizable })}
//                   v-slots={{ ...(column.slot || {}) }}
//                   isHidden-overflow-tooltip={
//                     column.showOverflowTooltip === undefined ? true : column.showOverflowTooltip
//                   }
//                 >
//                 </ElTableColumn>
//               )
//             ) : null
//           })}
//         </ElTable>
//         {/* 分页展示 */}
//         {props.pagination?.isShow && (
//           <div class="pagination-container">
//             <div class="total-length">
//               共
//               <span>{props.pagination?.total}</span>
//               条信息
//             </div>
//             <ElPagination
//               {...Object.assign({}, defaultPaginationProps, props.pagination)}
//               onSizeChange={(value: number) => {
//                 paginationHandle(value, 'sizeChange')
//               }}
//               onCurrentChange={(value: number) => {
//                 paginationHandle(value, 'currentChange')
//               }}
//             />
//           </div>
//         )}
//         {/* 表格列字段隐藏&排序配置（抽屉） */}
//         {drawerVisible.value
//           ? (
//               <TableColumnConfig
//                 visible={drawerVisible.value}
//                 columns={columnsData.value}
//                 originColumns={props.columns}
//                 onHandleClose={() => hideTableConfig()}
//                 onHandleConfirm={(data: any) => updateColumnsData(data)}
//               />
//             )
//           : null}
//       </div>
//     )
//   },
//   {
//     name: 'GaTable',
//     props: {
//       columns: {
//         type: Array as () => GaTableTsxProps['columns'],
//         required: true,
//       },
//       columnsMap: {
//         type: Array as () => columnsMapItem[],
//       },
//       data: {
//         type: Array as () => GaTableTsxProps['data'],
//         default: () => [],
//         required: true,
//       },
//       tableProps: {
//         type: Object as () => GaTableTsxProps['tableProps'],
//         default: (): GaTableTsxProps['tableProps'] => {
//           return {}
//         },
//       },
//       pagination: {
//         type: Object,
//         default: (): GaPaginationProps => {
//           return {
//             isShow: false,
//             total: 0,
//             currentPage: 1,
//             pageSize: 1,
//           }
//         },
//       },
//       paginationChange: {
//         type: Object,
//         default: (): GaTableTsxProps['tableProps'] => {
//           return {}
//         },
//       },
//       columnsUpdate: {
//         type: Object,
//         default: (): GaTableTsxProps['tableProps'] => {
//           return {}
//         },
//       },
//     },
//     emits: ['update:pagination', 'paginationChange', 'columnsUpdate'],
//   },
// )

// export default GaTable
