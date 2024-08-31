/**
 * 检查给定的 DOM 元素中的文本是否溢出其容器。
 * @param {HTMLElement} dom 要检查文本溢出的 DOM 元素。
 * @returns 如果文本溢出则返回 true，否则返回 false。
 */
export const textIsOverflow = (dom: HTMLElement) => {
  if (dom instanceof HTMLElement) {
    return dom.scrollWidth > dom.clientWidth || dom.scrollHeight > dom.clientHeight
  } else {
    return false
  }
}

export const hideElement = (element: HTMLElement, removeFromFlow = false) => {
  // eslint-disable-next-line ts/no-unused-expressions
  removeFromFlow ? (element.style.display = 'none') : (element.style.visibility = 'hidden')
}

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
