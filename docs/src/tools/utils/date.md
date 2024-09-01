## getMonthAndWeek函数

以日期字符串作为输入，并返回该日期的月份和周数。

### 参数

- `dateStr`: `string` - `getMonthAndWeek` 函数接受一个 `dateStr` 参数，该参数是一个表示日期的字符串。此日期字符串将用于计算该日期在该月中的月份和周数。

### 返回值

- **对象**: 返回一个具有两个属性的对象：
  - `month`: `number` - 给定日期字符串的月份。
  - `week`: `number` - 给定日期字符串的周数。

### 示例

```javascript
const dateInfo = getMonthAndWeek('2023-04-20')
console.log(dateInfo) // 输出示例: { month: 4, week: 4 }
```
