/**
 * @description: 获取组件类型
 * @return {*}
 * @example const basicInfoRef = ref<InstanceType<typeof BasicInfo>>(null)
 */

import { ref } from 'vue'

export const useCompRef = <T extends abstract new (...args: any) => any>(_comp: T) => {
  return ref<InstanceType<T>>()
}
