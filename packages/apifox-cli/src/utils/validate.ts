/*
 * @FilePath: \yhclt-cli\src\utils\validate.ts
 * @Description: 格式化函数
 */

export function validateType(type: string): boolean {
  return ['api', 'module', 'all'].includes(type as string)
}

export function formatPrefixPath(prefixPath?: string): string {
  return prefixPath && !prefixPath.startsWith('/') ? `/${prefixPath}` : prefixPath || ''
}

/**
 * @description: 检查字符串是否以 'Async' 结尾
 * @param {string} str
 * @return {*} 如果是，则移除 'Async' 并添加 'API',否则返回原始字符串
 */
export const convertAsyncToApi = (str: string) => {
  return str.endsWith('Async') ? `${str.slice(0, -'Async'.length)}API` : str
}

// 首字母大写
export const capitalize = (str: string = '') => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
