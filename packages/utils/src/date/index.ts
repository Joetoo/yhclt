/**
 * 以日期字符串作为输入，并返回该日期的月份和周数。
 * @param {string} dateStr - `getMonthAndWeek` 函数接受一个 `dateStr`
 * 参数，该参数是一个表示日期的字符串。此日期字符串将用于计算该日期在该月中的月份和周数。
 * @returns 返回一个具有两个属性的对象：`month` 和 `week`，分别表示给定日期字符串的月份和周数。
 */
export const getMonthAndWeek = (dateStr: string) => {
  const date = new Date(dateStr)
  // 月份
  const month = date.getMonth() + 1
  // 周数
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7 // 周一为 0，周日为 6
  const dayOfMonth = date.getDate()
  const week = Math.ceil((dayOfMonth + firstDayOfWeek) / 7)

  return { month, week }
}
