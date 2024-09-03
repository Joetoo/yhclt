<!--
 * @Description: 文本溢出省略号，同时会添加el-tooltip提示
 * @param { contentStyle } 可选参数，tooltip的内容样式，eg：{ width: '100px' }
 * @param { lineClamp } 可选参数，控制文本超过几行再换行
 * @param 参数同el-tooltip组件的参数一致
-->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ElTooltipProps } from 'element-plus'
import { useElementSize } from '@vueuse/core'

defineOptions({
  name: 'YhTextEllipsis',
})

const props = withDefaults(defineProps<IProps>(), {
  lineClamp: 1,
  showArrow: true,
  placement: 'top',
  effect: 'dark',
  enterable: true,
  trigger: 'hover',
  hideAfter: 200,
  offset: 6,
  content: '',
  appendTo: '',
  contentStyle: () => ({ width: '100%' }),
})

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

interface IProps extends Partial<ElTooltipProps> {
  content: string
  contentStyle?: Expand<CSSProperties>
  lineClamp?: number
}
const textDom = ref<HTMLElement | null>()
const textIsOver = ref(false)
const { width, height } = useElementSize(textDom)
/**
 * 检查给定的 DOM 元素中的文本是否溢出其容器。
 *
 * @param {HTMLElement} dom - 要检查文本溢出的 DOM 元素。
 * @return {boolean} 如果文本溢出则返回 true，否则返回 false。
 */
const textIsOverflow = (dom: HTMLElement | null | undefined) => {
  if (dom instanceof HTMLElement && dom.children.length) {
    const { scrollWidth, scrollHeight, clientWidth, clientHeight } = dom.children[0]
    return scrollWidth > clientWidth || scrollHeight > clientHeight
  } else {
    return false
  }
}

watch(
  () => [props, width, height],
  () => {
    nextTick(() => {
      textIsOver.value = textIsOverflow(textDom.value)
    })
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div ref="textDom" class="text-overflow-ellipsis" :class="lineClamp > 1 ? 'more-line' : 'one-line'">
    <div v-if="!textIsOver" class="tip-box" :class="lineClamp > 1 ? 'more-line' : 'one-line'">
      {{ props.content || '' }}
    </div>
    <el-tooltip v-else v-bind="props" :title="props.content || ''">
      <template #content>
        <div :class="props?.contentStyle?.width ? 'tip-content' : ''" :style="props.contentStyle">
          {{ props.content || '' }}
        </div>
      </template>
      <div class="tip-box" :class="lineClamp > 1 ? 'more-line' : 'one-line'">
        {{ props.content || '' }}
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.text-overflow-ellipsis {
  .tip-box {
    width: 100%;
    height: inherit;
  }
  .tip-content {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
}
.overflow-ellipsis-arrow {
  display: flex;
  .text-area {
    width: 100%;
    height: inherit;
    flex: 1;
  }
  .more-icon {
    width: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.more-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind('props.lineClamp');
  overflow: hidden;
}
.text-container {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-container::after {
  content: '展开';
  display: inline;
  cursor: pointer;
}

.text-container.collapsed {
  line-clamp: initial;
  -webkit-line-clamp: initial;
}
</style>
