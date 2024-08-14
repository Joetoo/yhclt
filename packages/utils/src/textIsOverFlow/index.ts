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
