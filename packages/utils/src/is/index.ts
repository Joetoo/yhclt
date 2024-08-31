/**
 * 判断变量类型是否和给定类型相同
 *
 * @param val 要判断类型的变量
 * @param type 给定的类型字符串
 * @returns 如果变量类型与给定类型相同则返回true，否则返回false
 */
export const is = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type.charAt(0).toUpperCase() + type.slice(1)}]`
}

/**
 * 检查一个值是否为数字，可以是数字，也可以是代表有效数字值的字符串。
 *
 * @param {number | string} val - `isNumeric` 函数中的 `val` 参数可以是数字，也可以是字符串。
 * @returns 该函数检查输入值是数字还是表示数值的字符串。该函数的返回类型是布尔值，表示输入值是否是表示数值的字符串。
 */
export const isNumeric = (val: number | string): val is string => {
  return typeof val === 'number' || /^\d+(?:\.\d+)?$/.test(val)
}
