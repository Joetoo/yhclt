/**
 * 去掉字符串中的标签
 * @param fragment HTML 字符串片段
 * @returns 返回处理后的字符串
 * @example
 * ```typescript
 * removeTag('<p>hello</p>') // 'hello'
 * ```
 */
export const removeTag = (fragment: string) => {
  return new DOMParser().parseFromString(fragment, 'text/html').body.textContent || ''
}
