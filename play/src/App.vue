<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const dialogVisible = ref(false)

const check = ref(false)

const indeterminate = ref(false)

const checkItems = ref([
  { label: 'Apple', value: false },
  { label: 'Pear', value: false },
  { label: 'Orange', value: false },
])

const onChange = (val: boolean) => {
  checkItems.value.forEach((item) => {
    item.value = val
  })
}

onMounted(() => {
  onChange(check.value)
})

watch(
  checkItems,
  () => {
    const len = checkItems.value.filter(item => item.value).length
    if (len > 0 && len < checkItems.value.length) {
      indeterminate.value = true
      return
    }
    if (len === checkItems.value.length) {
      check.value = true
      indeterminate.value = false
      return
    }
    if (len === 0) {
      check.value = false
      indeterminate.value = false
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <YhBadge msg="Vite + Vue" />

  <h4>YhEmpty组件</h4>
  <YhEmpty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
    Button
  </YhEmpty>
  <h4>YhEmpty组件--无图</h4>
  <YhEmpty />

  <h4>YhDialog组件</h4>
  <!-- 对话框 -->
  <ElButton plain @click="dialogVisible = true">
    Click to open the Dialog
  </ElButton>

  <YhDialog v-model="dialogVisible" title="提示" @handle-close="dialogVisible = false">
    <h4>
      我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
    </h4>
    <template #footer>
      <div class="dialog-footer">
        <ElSpace alignment="right">
          <ElButton @click="dialogVisible = false">
            取消
          </ElButton>
          <ElButton type="primary" @click="dialogVisible = false">
            确定
          </ElButton>
        </ElSpace>
      </div>
    </template>
  </YhDialog>

  <section style="margin-top: 50px">
    <h1>文本溢出省略号,同时会添加el-tooltip提示:</h1>
    <YhTextEllipsis
      content="在追求梦想的道路上，我们需要相信自己的能力和价值。每个人都有自己独特的天赋和才能，只要我们努力发掘和发挥，就能创造出美妙的事物。不要被他人的评判和批评所限制，相信自己的内心声音，坚持走自己的道路。"
    />
    <br>
    <YhTextEllipsis
      content="当你站在悬崖边缘，感受着风的呼啸声，心中仿佛有一种无限的力量，驱使你向前迈出一步。这一步，代表着勇气和决心，代表着追求梦想的决心。不论前方是怎样的未知，你敢于面对，敢于挑战，因为你相信，只有勇敢地追逐梦想，才能让生命变得更加精彩。在追求梦想的道路上，我们需要相信自己的能力和价值。每个人都有自己独特的天赋和才能，只要我们努力发掘和发挥，就能创造出美妙的事物。不要被他人的评判和批评所限制，相信自己的内心声音，坚持走自己的道路。"
      :line-clamp="2"
      effect="light"
      :content-style="{ width: '500px' }"
    />
    <br>
  </section>

  <section style="margin-top: 50px">
    <h1>checkbox</h1>

    <yh-checkbox v-model="check" :indeterminate="indeterminate" @change="onChange">
      Check All
    </yh-checkbox>
    <hr>
    <yh-checkbox v-for="item in checkItems" :key="item.label" v-model="item.value">
      {{ item.label }}
    </yh-checkbox>
  </section>
</template>

<style scoped>

</style>
