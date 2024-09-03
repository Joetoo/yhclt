export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<typeof val>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type HTMLElementCustomized<T> = HTMLElement & T

/**
 * @deprecated stop to use null
 * @see {@link https://github.com/sindresorhus/meta/discussions/7}
 */
export type Nullable<T> = T | null

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T

// 筛选对象的属性

// export const pick = <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) => {
//   return keys.reduce(
//     (acc, key) => {
//       acc[key] = obj[key]
//       return acc
//     },
//     {} as Pick<T, K>,
//   )
// }

export function omit<T extends Record<string, unknown>, U extends keyof T>(obj: T, keys: ReadonlyArray<U>) {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}
// export function pick<T extends Record<string, unknown>, U extends keyof T>(obj: T, keys: ReadonlyArray<U>) {
//   return keys.reduce(
//     (prev, key) => {
//       prev[key] = obj[key]
//       return prev
//     },
//     {} as Pick<T, U>,
//   )
// }

export const pick = <T extends object, K extends keyof T>(obj: T, ...props: K[]) => {
  Object.fromEntries(Object.entries(obj).filter(([key]) => props.includes(key as K))) as Pick<T, K>
}

// test
// pick({ a: 1, b: 2, c: 3 }, 'a', 'c') // { a: 1, c: 3 }
