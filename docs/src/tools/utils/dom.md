## textIsOverflow

检查给定的 DOM 元素中的文本是否溢出其容器。

```typescript
textIsOverflow: (dom: HTMLElement) => boolean
```

## removeTag

去掉字符串中的标签

```typescript
removeTag: (fragment: string) => string
```

## Example

```typescript
removeTag('<p>hello</p>') // 'hello'
```

## hideElement

```typescript
// hideElement: (element: HTMLElement, removeFromFlow?: boolean) => void
```

## copyToClipboard

TypeScript 中的 `copyToClipboard` 函数使用 `navigator.clipboard.writeText` 方法将提供的文本复制到剪贴板。

```typescript
copyToClipboard: (text: string) => Promise<void>
```
