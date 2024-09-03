<!-- eslint-disable style/max-statements-per-line -->
<!--
 * @Description: el-input输入框根据输入进行数据匹配，通过下拉菜单展示，选择菜单项可以自动填入
 * 注意：有多个TS类型的时候，使用type进行声明
 * 如果使用interface 最终构建后InputDropdown/index.d.ts将不会生成
-->
<script setup lang="ts">
import { createNamespace } from '@yhclt/utils'
import type { DropdownInstance } from 'element-plus/es/components/dropdown/src/instance'
import { debounce } from 'lodash-es'
import type { InputDropdownProps, SearchResult } from './typing'

defineOptions({
  name: 'YhInputDropdown',
})

const props = withDefaults(defineProps<InputDropdownProps>(), {
  width: '180px',
})

const emits = defineEmits(['update:modelValue'])

const [className, bem] = createNamespace('input-dropdown')

const inputValue = computed<string>({
  async set(val) {
    emits('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})

const searchResult = ref<SearchResult[]>([])

const loading = ref(false)

const dropDownRef = ref<DropdownInstance>()

const showDropdown = () => {
  if (!dropDownRef.value) { return }
  dropDownRef.value.handleOpen()
}

const closeDropdown = () => {
  if (!dropDownRef.value) { return }
  dropDownRef.value.handleClose()
}

const onInput = debounce((value: string) => {
  if (value) {
    showDropdown()
    loading.value = true
    props.remoteMethod(value).then((list) => {
      searchResult.value = list
      loading.value = false
    })
  } else {
    closeDropdown()
  }
}, 200)

const handleCommand = (command: string) => {
  inputValue.value = command
}
</script>

<template>
  <div :class="className" :style="{ width: props.width }">
    <el-input v-model="inputValue" placeholder="请输入" v-bind="props.elInputProps" @input="onInput" />
    <el-dropdown
      ref="dropDownRef"
      :teleported="false"
      trigger="contextmenu"
      max-height="200px"
      popper-class="dropdown-popper"
      @command="handleCommand"
    >
      <div class="dropdown-trigger" :style="{ width: props.width }" />
      <template #dropdown>
        <el-dropdown-menu>
          <div v-if="loading === false && searchResult.length === 0" style="text-align: center">
            暂无数据
          </div>
          <div v-if="loading === true" style="text-align: center">
            搜索中...
          </div>
          <div v-if="loading === false">
            <el-dropdown-item v-for="item in searchResult" :key="item.value" :command="item.value">
              {{ item.label }}
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.yh-input-dropdown {
  position: relative;

  :deep(.el-dropdown) {
    position: absolute;
    top: 100%;
    left: 0;
  }

  :deep(.dropdown-popper) {
    width: 100%;

    .el-popper__arrow {
      display: none;
    }
  }
}
</style>
