/*
 * @Description: 状态多彩徽章组件。不同状态展示不同颜色的徽章，视觉上更直观。
 */
import type { Meta, StoryObj } from '@storybook/vue3'
import YhBadge from './src/badge.vue'

const meta: Meta<typeof YhBadge> = {
  title: 'YUI/Badge',
  component: YhBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '状态多彩徽章组件，不同状态展示不同颜色的徽章，视觉上更直观。',
      },
      source: {
        language: 'typescript',
      },
    },
  },
  // 组件属性描述
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'info', 'error'],
      description: '可选值：`primary` | `success` | `warning` | `info` | `error` ',
    },
    text: { control: 'text', description: '类型：`String`' },
  },
  render: args => ({
    components: { YhBadge },
    setup() {
      return { args }
    },
    template: '<YhBadge v-bind="args"></YhBadge>',
  }),
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description: 生成代码示例
 * @param {string} text
 * @param {string} status
 * @return {*}
 */
const generateCode = (type: string, text?: string | null) => {
  return `
<script lang="ts" setup>
import type { YhBadge } from '@yhclt/yhclt-ui'
import { YhBadge } from '@yhclt/yhclt-ui'

</script>
<template>
  <YhBadge ${`type="${type}"`} ${text ? `text="${text}"` : ''} />
</template>
`
}

export const Base: Story = {
  name: '成功状态',
  args: {
    type: 'success',
    text: 'successText',
  },
  parameters: {
    docs: {
      source: {
        code: generateCode('success', 'successText'),
      },
    },
  },
}

export const Primary: Story = {
  name: '进行中状态',
  args: {
    type: 'primary',
    text: 'primaryText',
  },
  parameters: {
    docs: {
      source: {
        code: generateCode('primary', 'primaryText'),
      },
    },
  },
}

export const Warning: Story = {
  name: '警示状态',
  args: {
    type: 'warning',
    text: 'warningText',
  },
  parameters: {
    docs: {
      source: {
        code: generateCode('warning', 'warningText'),
      },
    },
  },
}

export const Info: Story = {
  name: '提示状态',
  args: {
    type: 'info',
    text: 'infoText',
  },
  parameters: {
    docs: {
      source: {
        code: generateCode('info', 'infoText'),
      },
    },
  },
}

export const Error: Story = {
  name: '错误状态',
  args: {
    type: 'error',
    text: 'errorText',
  },
  parameters: {
    docs: {
      source: {
        code: generateCode('error', 'errorText'),
      },
    },
  },
}
