/**
 * 解析URL查询参数
 *
 * @param url 待解析的URL
 * @returns 返回解析后的查询参数对象，以键值对形式表示
 * @example
 * ```ts
 * parseQuery('https://www.baidu.com/?a=1&b=2') // { a: '1', b: '2' }
 *
 * parseQuery('a=1&b=2&c=3') // { a: '1', b: '2', c: '3' }
 * ```
 */
export const parseQuery = (url: string) => {
  const q: Record<string, string> = {}
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = decodeURIComponent(v)))
  return q
}
