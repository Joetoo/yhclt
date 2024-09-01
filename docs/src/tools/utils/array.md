## filterQueryParams

判断某值的类型

<div class="pure-border">

用于处理请求查询参数,返回一个处理后的查询参数数组

| **参数属性** | **说明**     | **类型**            |
| ------------ | ------------ | ------------------- |
| `arr`        | 需要判断的值 | `QueryParamsItem[]` |

</div>

```typescript
const array: QueryParamsItem[] = [
  {
    Caption: '分组',
    Field: 'GroupId',
    Operator: 'equal',
    OperatorSql: '=',
    Value: '分组Value',
    placeHolder: '请选择分组',
    type: 'groups',
    width: '100',
  },
  {
    Caption: '部门',
    Field: 'DeptId',
    Operator: 'equal',
    OperatorSql: '=',
    Value: '部门Value',
    placeHolder: '请选择分组',
    type: 'depts',
    width: '100',
  },
  {
    Caption: '主题',
    Field: 'Subject',
    Operator: 'contains',
    OperatorSql: 'like',
    Value: '主题Value',
    placeHolder: '请输入部门主题',
    type: 'input',
    width: '100',
  },
]

const result = filterQueryParams(array)
```
