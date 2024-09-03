// import type { Meta, StoryObj } from '@storybook/vue3'
// import { ref } from 'vue'
// import GaInputDropdown from './src/InputDropdown.vue'
// import type { InputDropdownProps } from './src/typing'
// // import { formatCode } from '../../../../.storybook/formatCode'

// type Story = StoryObj<InputDropdownProps>

// type CodeProps = {
//   [k in keyof Omit<InputDropdownProps, 'modelValue'>]: string
// }

// const options = [
//   {
//     label: 'a1',
//     value: 'a1',
//   },
//   {
//     label: 'a2',
//     value: 'a2',
//   },
//   {
//     label: 'b1',
//     value: 'b1',
//   },
// ]

// const generatePropsString = (props: CodeProps) => {
//   let str = ''
//   Object.entries(props).forEach((item) => {
//     const [k, value] = item
//     str = `${str}${k}: ${value},`
//   })
//   return `{
//     ${str}
//   }`
// }

// const generateCode = (props: CodeProps) => {
//   const code = `
//   <script setup lang="ts">
//   import { GaInputDropdown } from '@galaxy-fe/galaxy-ui'

//   const options = ${JSON.stringify(options)}

//   const modelValue = ref('')

//   const args = ${generatePropsString(props)}
//   </script>
//   <template>
//         <GaInputDropdown
//           v-model="modelValue"
//           v-bind="args"
//       />
//   </template>
//   `
//   const formatted = formatCode(code)
//   return formatted
// }

// const meta: Meta<InputDropdownProps> = {
//   parameters: {
//     docs: {
//       description: {
//         component: 'el-input输入框根据输入进行数据匹配，通过下拉菜单展示，选择菜单项可以自动填入',
//       },
//       controls: {
//         exclude: ['update:modelValue'],
//       },
//     },
//   },
//   title: 'GUI/InputDropdown',
//   component: GaInputDropdown,
//   decorators: [() => ({ template: '<div style="margin: 0 12px 60px 12px;"><story /></div>' })],
//   tags: ['autodocs'],
//   argTypes: {
//     width: {
//       description: '组件宽度，内部el-input和el-dropdown会同步宽度',
//     },
//     elInputProps: {
//       description: 'el-input的Props<br>`Type: Partial<InputInstance["props"]>`',
//     },
//     modelValue: {
//       control: false,
//     },
//     remoteMethod: {
//       description:
//         '根据输入进行搜索并返回匹配列表<br>`Type: (value: string) => Promise<{label: string; value: string}[]>`',
//       type: 'function',
//     },
//   },
// }

// const basePropsRaw = {
//   remoteMethod: `async (value: string) => {
//     return options.filter((item) => {
//       return item.value.includes(value)
//     })
//   }`,
// }

// export const Primary: Story = {
//   name: '基本使用',
//   render: args => ({
//     components: { GaInputDropdown },
//     setup() {
//       const model = ref('')
//       const updateModel = (e: string) => (model.value = e)
//       return { args, model, updateModel }
//     },
//     template: '<GaInputDropdown v-bind="args" :modelValue="model" @update:modelValue="updateModel" />',
//   }),
//   args: {
//     remoteMethod: async (value) => {
//       return options.filter((item) => {
//         return item.value.includes(value)
//       })
//     },
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: '基本使用',
//       },
//       source: {
//         code: generateCode(basePropsRaw),
//       },
//     },
//   },
// }

// export const Width: Story = {
//   name: '设置宽度',
//   render: args => ({
//     components: { GaInputDropdown },
//     setup() {
//       const model = ref('')
//       const updateModel = (e: string) => (model.value = e)
//       return { args, model, updateModel }
//     },
//     template: '<GaInputDropdown v-bind="args" :modelValue="model" @update:modelValue="updateModel" />',
//   }),
//   args: {
//     ...Primary.args,
//     width: '240px',
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: '`width`设置组件宽度，`Input`和`Dropdown`菜单自动同步宽度',
//       },
//       source: {
//         code: generateCode({
//           ...basePropsRaw,
//           width: '\'240px\'',
//         }),
//       },
//     },
//   },
// }

// export const RemoteMethod: Story = {
//   name: '异步搜索匹配',
//   render: args => ({
//     components: { GaInputDropdown },
//     setup() {
//       const model = ref('')
//       const updateModel = (e: string) => (model.value = e)
//       return { args, model, updateModel }
//     },
//     template: '<GaInputDropdown v-bind="args" :modelValue="model" @update:modelValue="updateModel" />',
//   }),
//   args: {
//     ...Primary.args,
//     width: '200px',
//     remoteMethod: async (value: string) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const list = options.filter((item) => {
//             return item.value.includes(value)
//           })
//           resolve(list)
//         }, 1000)
//       })
//     },
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: '`remoteMethod`方法内部异步搜索后返回匹配数组',
//       },
//       source: {
//         code: generateCode({
//           remoteMethod: `async (value: string) => {
//             return new Promise((resolve) => {
//               setTimeout(() => {
//                 const list = options.filter((item) => {
//                   return item.value.includes(value)
//                 })
//                 resolve(list)
//               }, 1000)
//             })
//           }`,
//         }),
//       },
//     },
//   },
// }

// export const onEnter: Story = {
//   name: '键盘回车事件',
//   render: args => ({
//     components: { GaInputDropdown },
//     setup() {
//       const model = ref('')
//       const updateModel = (e: string) => (model.value = e)
//       return { args, model, updateModel }
//     },
//     template: '<GaInputDropdown v-bind="args" :modelValue="model" @update:modelValue="updateModel" />',
//   }),
//   args: {
//     ...Primary.args,
//     elInputProps: {
//       onKeydown: (e) => {
//         if ('key' in e) {
//           if (e.key === 'Enter') {
//             alert('回车触发')
//           }
//         }
//       },
//     },
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: '`elInputProps`可传入`el-input`所有支持的属性，此处演示传入`onKeydown`回调',
//       },
//       source: {
//         code: generateCode({
//           ...basePropsRaw,
//           elInputProps: `{
//             onKeydown: (e) => {
//               if ('key' in e) {
//                 if (e.key === 'Enter') alert('回车触发')
//               }
//             },
//           }`,
//         }),
//       },
//     },
//   },
// }

// export default meta
