<!--
 * @Description: 空状态组件。用于初始化场景，当前没有数据时展示，显式提示用户
-->

<script setup lang="ts">
import { ElEmpty } from 'element-plus'
import { createNamespace } from '@yhclt/utils'
import EmptyBg from './empty.png'
import { emptyProps } from './types'

defineOptions({
  name: 'YhEmpty',
})

const props = defineProps(emptyProps)

const [className] = createNamespace('empty')
</script>

<template>
  <ElEmpty :class="className" :image="props?.image || EmptyBg" :image-size="100">
    <template #description>
      <span>{{ props?.text || '暂无数据' }}</span>
    </template>
  </ElEmpty>
</template>

<style lang="scss" scoped>
//
</style>
