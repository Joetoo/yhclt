// 随机

/**
 * 生成指定长度的随机字符串
 *
 * @param length 字符串长度
 * @returns 返回随机字符串
 */
export const randomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// test
// console.log('🚀 ~ randomString(10) :', randomString(10)) // iZCKb4ZBcf

/**
 * 生成随机颜色值
 *
 * @returns 返回一个以 `#` 开头的六位十六进制颜色值字符串
 */
export function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

// test
// console.log('🚀 ~ randomColor():', randomColor()) // '#a0b0c0'
