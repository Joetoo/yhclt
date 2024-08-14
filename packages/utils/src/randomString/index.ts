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
