/**
 * TypeScript 中的 `copyToClipboard` 函数使用 `navigator.clipboard.writeText` 方法将提供的文本复制到剪贴板。
 * @param {string} text - '你好世界'
 */
export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

copyToClipboard('Hello World')
