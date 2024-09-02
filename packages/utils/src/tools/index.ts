/**
 * 手机号脱敏
 *
 * @param mobile 手机号码
 * @returns 返回隐藏中间四位后的手机号码
 * @example
 * ```ts
 * hideMobile(12345678901) // 123****8901
 * ```
 */
export const hideMobile = (mobile: string) => {
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 将文本复制到剪贴板
 *
 * @param text 要复制的文本
 */
export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }
  // 浏览器兼容的适配
  const textArea = document.createElement('textarea')
  textArea.value = text

  document.body.appendChild(textArea)

  textArea.focus()
  textArea.select()

  document.execCommand('copy')
  document.body.removeChild(textArea)
}
