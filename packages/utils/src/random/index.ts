// 随机字符串

export const randomString = (length: number) => {
  // let result = ''
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  // const charactersLength = characters.length
  // for (let i = 0; i < length; i++) {
  //   result += characters.charAt(Math.floor(Math.random() * charactersLength))
  // }
  // return result

  return Math.random().toString(36).slice(2)
}

// test
// randomString(10)

// 随机HEX颜色
export function randomColor() {
  // const r = Math.floor(Math.random() * 256)
  // const g = Math.floor(Math.random() * 256)
  // const b = Math.floor(Math.random() * 256)
  // return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
  // eslint-disable-next-line ts/no-unused-expressions
  ;`#${Math.floor(Math.random() * 0xFFFFFF)
    .toString(16)
    .padEnd(6, '0')}`
}

// test
// randomColor()  // '#a0b0c0'
