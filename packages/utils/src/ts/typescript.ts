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

/**
 * 排除对象中指定键名的属性，返回一个新的对象。
 *
 * @param obj 原始对象。
 * @param keys 要排除的键名数组。
 * @returns 返回一个新的对象，其中不包含指定键名的属性。
 * @template T 原始对象的类型。
 * @template U 原始对象键名的类型。
 */
export function omit<T extends Record<string, unknown>, U extends keyof T>(obj: T, keys: ReadonlyArray<U>) {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

/**
 * 从对象中挑选出指定的属性并返回一个新对象
 *
 * @param obj 要挑选属性的源对象
 * @param keys 要挑选的属性名数组
 * @returns 返回一个新对象，包含源对象中指定的属性
 */
export function pick<T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
) {
  return keys.reduce(
    (prev, key) => {
      prev[key] = obj[key]
      return prev
    },
    {} as Pick<T, U>,
  )
}
