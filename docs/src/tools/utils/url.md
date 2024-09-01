## parseQuery variable

解析URL查询参数

**Signature:**

```typescript
parseQuery: (url: string) => Record<string, string>
```

## Example

```ts
parseQuery('https://www.baidu.com/?a=1&b=2') // { a: '1', b: '2' }

parseQuery('a=1&b=2&c=3') // { a: '1', b: '2', c: '3' }
```
