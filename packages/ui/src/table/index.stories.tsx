// import type { Meta, StoryObj } from '@storybook/vue3'
// import { ref } from 'vue'
// import { jsonFormat } from '../../../../.storybook/jsonFormat'
// import GaTable from './src/table'
// import type { GaTableColumn } from './src/typing'

// // import { Canvas ,Story, Primary, Controls,Title,Subtitle,Description,Stories,Source} from '@storybook/blocks';
// interface ListItem {
//   order_sn: string
//   order_id: number
//   type_cn: string
// }

// const list = ref<ListItem[]>([
//   {
//     order_sn: '1',
//     order_id: 1,
//     type_cn: '类型1',
//   },
//   {
//     order_sn: '2',
//     order_id: 2,
//     type_cn: '类型2',
//   },
//   {
//     order_sn: '3',
//     order_id: 1,
//     type_cn: '类型1',
//   },
//   {
//     order_sn: '4',
//     order_id: 2,
//     type_cn: '类型2',
//   },
//   {
//     order_sn: '5',
//     order_id: 1,
//     type_cn: '类型1',
//   },
//   {
//     order_sn: '6',
//     order_id: 2,
//     type_cn: '类型2',
//   },
// ])
// const columns: GaTableColumn<ListItem>[] = [
//   {
//     label: '合同编号',
//     prop: 'order_sn',
//   },
//   {
//     label: '订单号',
//     prop: 'order_id',
//   },
//   {
//     label: '签约类型',
//     prop: 'type_cn',
//   },
//   {
//     label: '操作',
//     slot: {
//       default: () => {
//         return (
//           <div>
//             <el-button size="small" type="primary">
//               编辑
//             </el-button>
//             <el-button size="small" type="danger">
//               删除
//             </el-button>
//           </div>
//         )
//       },
//     },
//   },
// ]

// const meta: Meta<typeof GaTable> = {
//   parameters: {
//     docs: {
//       source: {
//         language: 'typescript',
//       },
//     },
//   },
//   title: 'GUI/Table',
//   component: GaTable,
//   tags: ['autodocs'],
//   argTypes: {
//     columns: {
//       control: { type: 'object' },
//       description: '表格列数据模型',
//     },
//     data: { control: { type: 'object' }, description: '要展示的数据' },
//     tableProps: {
//       control: { type: 'object' },
//       description:
//         'ElementPlus 的 TableProps (详情参考:[element-plus文档](https://element-plus.gitee.io/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7))',
//     },
//     pagination: { control: { type: 'object' }, description: '要展示的数据' },
//     // paginationChange: { action: 'paginationChange' },
//   },
//   render: args => ({
//     components: { GaTable },
//     setup() {
//       return { args }
//     },
//     template: `
//       <GaTable v-bind="args">
//       </GaTable>
//     `,
//   }),
//   args: {
//     columns,
//     data: list.value,
//   }, // default value
// }

// export default meta
// type Story = StoryObj<typeof GaTable>

// const generateCode = (column: GaTableColumn<ListItem>[], data: ListItem[]) => {
//   return `
// <script lang="tsx" setup>
// import type { GaTableTsxProps } from '@galaxy-fe/galaxy-ui'
// import { GaTable } from '@galaxy-fe/galaxy-ui'
// interface ListItem {
//   order_sn: string // 合同编号
//   order_id: number // 订单号
//   type_cn: string // 类型
// }
// const columns: GaTableTsxProps<ListItem>[] = ${jsonFormat(column)}
// const data = ref<ListItem[]>(${jsonFormat(data)})
// </script>
// <template>
//   <GaTable :columns="columns" :data="data" />
// </template>
//     `
// }

// export const Base: Story = {
//   name: '基本使用',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns, list.value),
//       },
//     },
//   },
//   args: {
//     data: list.value,
//   },
// }

// export const ColumnsConfig: Story = {
//   name: '设置列字段可配置',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns, list.value),
//       },
//     },
//   },
//   args: {
//     data: list.value,
//     tableProps: { columnConfig: true },
//   },
// }

// export const Resizable: Story = {
//   name: '列宽可拖动改变',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns, list.value),
//       },
//     },
//   },
//   args: {
//     data: list.value,
//     tableProps: { resizable: true },
//   },
// }

// export const BorderUnresizable: Story = {
//   name: '有边框列宽不可拖动',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns, list.value),
//       },
//     },
//   },
//   args: {
//     data: list.value,
//     tableProps: { border: true, resizable: false },
//   },
// }

// // 分页参数
// const pagination = ref({
//   isShow: true,
//   total: 6,
//   currentPage: 1,
//   pageSize: 1,
// })

// /**
//  * @description: 模拟分页接口数据处理
//  */
// const getTableData = (): ListItem[] => {
//   const paginationOps = pagination?.value
//   const startIndex = (paginationOps?.currentPage - 1) * paginationOps?.pageSize
//   const endIndex = startIndex + paginationOps?.pageSize
//   return list.value.slice(startIndex, endIndex)
// }

// export const ShowPagination: Story = {
//   name: '分页展示',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns, getTableData()),
//       },
//     },
//   },
//   args: {
//     pagination: pagination.value,
//     data: getTableData(),
//     tableProps: { border: true, resizable: false },
//   },
// }

// const columns2: GaTableColumn<ListItem>[] = [
//   {
//     label: '合同编号',
//     prop: 'order_sn',
//   },
//   {
//     label: '订单号',
//     prop: 'order_id',
//     slot: {
//       header: () => {
//         return <span>自定义表头</span>
//       },
//     },
//   },
//   {
//     label: '签约类型',
//     prop: 'type_cn',
//     slot: {
//       header: () => {
//         // 自定义表头
//         return <el-input></el-input>
//       },
//     },
//   },
// ]

// export const SlotsHeader: Story = {
//   name: '自定义表头slots_header',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns2, list.value),
//       },
//     },
//   },
//   args: {
//     ...Base.args,
//     columns: columns2,
//   },
// }

// const columns3: GaTableColumn<ListItem>[] = [
//   {
//     label: '合同编号',
//     prop: 'order_sn',
//   },
//   {
//     label: '订单号',
//     prop: 'order_id',
//     slot: {
//       default: ({ row }) => {
//         // 自定义table-cell展示内容
//         return <el-tag>{row.order_id + 1}</el-tag>
//       },
//     },
//   },
//   {
//     label: '签约类型',
//     prop: 'type_cn',
//     slot: {
//       default: ({ row }) => {
//         // 自定义table-cell展示内容
//         return (
//           <el-tag type="success">
//             {' '}
//             {row.type_cn}
//           </el-tag>
//         )
//       },
//     },
//   },
// ]

// export const SlotsDefault: Story = {
//   name: '自定义内容slots_default',
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns3, list.value),
//       },
//     },
//   },
//   args: {
//     ...Base.args,
//     columns: columns3,
//   },
// }

// const EmptyData = ref<ListItem[]>([])

// export const Empty: Story = {
//   name: '空数据',
//   args: {
//     ...Base.args,
//     data: EmptyData.value,
//   },
//   parameters: {
//     docs: {
//       source: {
//         code: generateCode(columns, EmptyData.value),
//       },
//     },
//   },
// }
