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
 * TypeScript 中的 `copyToClipboard` 函数使用 `navigator.clipboard.writeText` 方法将提供的文本复制到剪贴板。
 * @param {string} text - '你好世界'
 */
export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

copyToClipboard('Hello World')
