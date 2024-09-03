// /*
//  * @FilePath: /Document-System/src/components/tsxTable/TsxTable.tsx
//  * @Description:
//  */
// import { defineComponent, nextTick, onMounted, ref } from 'vue'
// import { ElButton, ElDrawer, ElMessage, ElSpace, ElSwitch, ElTable, ElTableColumn } from 'element-plus'
// import { cloneDeep } from 'lodash-es'
// import Sortable from 'sortablejs'
// import type { GaTableColumn, TableConfigProps } from './typing'

// // import 'element-plus/es/components/table/style/css'
// import '../style/index.scss'

// const TableColumnConfig = defineComponent<TableConfigProps>(
//   (props, { emit }) => {
//     const defaultColumns = props.columns
//       .filter(item => !item.fixLeft && !item.fixRight)
//       .map((col, index) => ({
//         ...col,
//         // sort: index + 1,
//         isHidden: !!col.isHidden,
//       }))
//     const columnsList = ref<GaTableColumn[]>(cloneDeep(defaultColumns))

//     const handleHidden = (prop: string) => {
//       columnsList.value = columnsList.value.map((item: GaTableColumn) => {
//         if (item.prop === prop) {
//           item.isHidden = !item.isHidden
//         }
//         return item
//       })
//     }
//     const handleConfirm = () => {
//       const lastColumnsData = cloneDeep(columnsList.value)
//       props.columns.forEach((i) => {
//         if (i.fixLeft) {
//           lastColumnsData.unshift(i)
//         } else if (i.fixRight) {
//           lastColumnsData.push(i)
//         }
//       })
//       // lastColumnsData.forEach((item, idx) => {
//       //   item.sort = idx
//       // })
//       // console.log(lastColumnsData)
//       // props.onHandleConfirm(lastColumnsData)
//       emit('handleConfirm', lastColumnsData)
//       emit('handleClose')
//     }
//     const handleReset = () => {
//       /**
//        * 隐藏列重置、列顺序重置
//        */
//       columnsList.value = props.originColumns
//         .filter(item => !item.fixLeft && !item.fixRight)
//         .map((col, index) => ({
//           ...col,
//           sort: null,
//           isHidden: false,
//         }))
//       const lastColumnsData = cloneDeep(columnsList.value)
//       // TODO:队列进出需优化，多个可能存在顺序差的问题
//       props.columns.forEach((i) => {
//         if (i.fixLeft) {
//           lastColumnsData.unshift(i)
//         } else if (i.fixRight) {
//           lastColumnsData.push(i)
//         }
//       })
//       // props.onHandleConfirm(lastColumnsData)
//       emit('handleConfirm', lastColumnsData)
//     }
//     const handleClose = () => {
//       // props.onHandleClose()
//       emit('handleClose')
//       columnsList.value = cloneDeep(
//         props.columns
//           .filter(item => !item.fixLeft && !item.fixRight)
//           .map((col, index) => ({
//             ...col,
//             sort: index + 1,
//             isHidden: col.isHidden || false,
//           })),
//       )
//     }
//     const saveSort = async (oldIndex: number, newIndex: number) => {
//       try {
//         // 拖拽并不会改变绑定数据的顺序，只会改变dom，需要先把表格清空 等待dom更新之后再更新排序后的数据, 保持界面和数据的一致性
//         // const scrollTop = fileListTableRef.value.$el.querySelector('.el-scrollbar__wrap').scrollTop
//         const sortList = cloneDeep(columnsList.value)
//         const fileItem = sortList.splice(oldIndex, 1)[0]
//         sortList.splice(newIndex, 0, fileItem)
//         columnsList.value = []
//         nextTick(() => {
//           columnsList.value = [...sortList]
//           // 列表重新渲染后滚动到操作的位置
//           // nextTick(() => fileListTableRef.value.scrollTo({ top: scrollTop }))
//         })
//       } catch (err: any) {
//         ElMessage.error(err.message)
//       }
//     }
//     // 拖拽
//     const dragSort = () => {
//       // 首先获取需要拖拽的dom节点
//       const tbody: any = document
//         .querySelector('.sortable-table .el-table__body-wrapper')
//         ?.querySelector<HTMLElement>('table > tbody')
//       Sortable.create(tbody, {
//         dataIdAttr: 'data-my-id',
//         disabled: false, // 是否禁用拖拽
//         animation: 150, // 拖拽延时，效果更好看
//         handle: '.sort-btn', // 拖动手柄
//         ghostClass: 'blue-background-class', // drop placeholder的css类名
//         dragClass: 'sortable-drag', // 正在被拖拽中的css类名
//         chosenClass: 'sortable-chosen', // 被选中项的css 类名
//         onEnd: ({ oldIndex, newIndex }) => {
//           if (newIndex === oldIndex) {
//             return
//           }
//           saveSort(oldIndex, newIndex)
//         },
//       })
//     }

//     onMounted(async () => {
//       // TODO:如果本地有缓存取缓存数据，没有重置表格列配置数据
//       // handleReset()
//       nextTick(() => {
//         // 初始化拖拽
//         dragSort()
//       })
//     })

//     return () => (
//       <ElDrawer
//         modelValue={props?.visible}
//         class="columns-config"
//         title="表头设置"
//         direction="rtl"
//         before-close={() => handleClose()}
//         v-slots={{
//           default: () => (
//             <ElTable data={columnsList.value} class="sortable-table" row-key="id">
//               <ElTableColumn
//                 prop="label"
//                 label="表头字段"
//                 v-slots={{
//                   default: (scope: { row: GaTableColumn }) => (
//                     <ElSpace class="sort-btn">
//                       <el-icon size="16px" color="#A1A0A7">
//                         <icon-font-icon_reorder />
//                       </el-icon>
//                       <div>{scope.row.label}</div>
//                     </ElSpace>
//                   ),
//                 }}
//               >
//               </ElTableColumn>
//               <ElTableColumn
//                 width="64"
//                 prop="isHidden"
//                 label=""
//                 align="center"
//                 v-slots={{
//                   default: (scope: { row: GaTableColumn }) => (
//                     <ElSwitch modelValue={!scope.row.isHidden} onChange={() => handleHidden(scope.row.prop || '')} />
//                   ),
//                 }}
//               >
//               </ElTableColumn>
//             </ElTable>
//           ),
//           footer: () => (
//             <div style="display: flex; justify-content: space-between">
//               <ElButton type="primary" link onClick={handleReset}>
//                 恢复默认
//               </ElButton>
//               <ElSpace>
//                 <ElButton onClick={handleClose}>取消</ElButton>
//                 <ElButton type="primary" onClick={handleConfirm}>
//                   保存
//                 </ElButton>
//               </ElSpace>
//             </div>
//           ),
//         }}
//       >
//       </ElDrawer>
//     )
//   },
//   {
//     name: 'GaTableConfig',
//     props: {
//       visible: {
//         type: Boolean,
//         default: false,
//       },
//       columns: {
//         type: Array,
//         default: () => [],
//       },
//       originColumns: {
//         type: Array,
//         default: () => [],
//       },
//     },
//   },
// )

// export default TableColumnConfig
