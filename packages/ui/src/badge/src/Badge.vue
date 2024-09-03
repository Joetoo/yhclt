<!--
 * @Description: 状态多彩徽章组件。不同状态展示不同颜色的徽章，视觉上更直观。
-->

<script setup lang="ts">
import { createNamespace } from '@yhclt/utils'
import { type BadgeType, badgeProps } from './types'

defineOptions({
  name: 'YhBadge',
})

const props = defineProps(badgeProps)

const [className, bem] = createNamespace('badge')

const colors: Record<BadgeType, string> = {
  primary: '#1453FF',
  success: '#0dc986',
  warning: '#ff9900',
  info: '#a1a0a8',
  error: '#FF0003',
}
</script>

<template>
  <div :class="className">
    <span :class="bem('type')" :style="`background-color: ${colors[props?.type]}`" />
    <div :class="bem('text')">
      {{ props?.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.yh-badge {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  line-height: 20px;

  &--type {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  &--text {
    line-height: inherit;
  }
}
</style>
