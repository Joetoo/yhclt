// array

interface QueryParamsItem {
  Field: string
  Value: any
  Caption?: string
  OperatorSql?: string
  Operator?: string
  LeftBrackets?: string
  Logical?: string
  RightBrackets?: string
  ReplaceType?: string
  ReplaceValue?: string
  type?: string
  Type?: string
  Column?: any
  Columns?: any
  Column2?: any
  ColumnDataType?: string
  ReplaceValue2?: string
  selectItemValue?: any
}

const handleArrayColumns = (item: QueryParamsItem) => {
  return item.Columns.map((i: any, index: number) => {
    const obj: QueryParamsItem = {
      Field: i,
      OperatorSql: item.OperatorSql,
      Operator: item.Operator,
      Value: item.Value,
      ReplaceType: item.ReplaceType,
      ReplaceValue: item.ReplaceValue,
    }
    if (index === 0) {
      obj.LeftBrackets = '('
    } else {
      obj.Logical = 'or'
    }
    if (index === item.Columns.length - 1) {
      obj.RightBrackets = ')'
    }
    return obj
  })
}

const handleArrayValues = (item: QueryParamsItem) => {
  switch (item?.type) {
    case 'daterange':
      return [
        {
          Field: item.Column,
          OperatorSql: '>=',
          Operator: 'GreaterEqual',
          Value: item.Value[0],
          Type: 'DateTime',
          ReplaceType: item.ReplaceType,
          ReplaceValue: item.ReplaceValue,
        },
        {
          Field: item.Column2 ? item.Column2 : item.Column,
          OperatorSql: '<=',
          Operator: 'LessEqual',
          Value: `${item.Value[1]} 23:59:59`,
          Type: 'DateTime',
          ReplaceType: item.ReplaceType,
          ReplaceValue: item.ReplaceValue2
            ? item.ReplaceValue2
            : item.ReplaceValue,
        },
      ]

    case 'daterangecover':
      return [
        {
          LeftBrackets: '(',
          Field: item.Column,
          OperatorSql: 'Between',
          Operator: 'Between',
          Value: `${item.Value[0]},${item.Value[1]}`,
          Type: 'DateTime',
        },
        {
          Field: item.Column2 ? item.Column2 : item.Column,
          OperatorSql: 'Between',
          Operator: 'Between',
          Value: `${item.Value[0]},${item.Value[1]}`,
          Type: 'DateTime',
          Logical: 1,
        },
        {
          LeftBrackets: '(',
          Field: item.Column,
          OperatorSql: '>=',
          Operator: 'GreaterEqual',
          Value: item.Value[0],
          Type: 'DateTime',
          Logical: 1,
        },
        {
          RightBrackets: '))',
          Field: item.Column2 ? item.Column2 : item.Column,
          OperatorSql: '<=',
          Operator: 'LessEqual',
          Value: item.Value[1],
          Type: 'DateTime',
        },
      ]
    default:
      return item.Value.map((i: any) => ({
        Field: item.Column,
        OperatorSql: item.OperatorSql,
        Operator: item.Operator,
        Value: i,
        ReplaceType: item.ReplaceType,
        ReplaceValue: item.ReplaceValue,
      }))
  }
}

/**
 * 过滤查询参数
 * 该函数用于处理一组查询参数，确保每个参数满足特定条件
 * 主要功能包括：处理数组类型的列名或值，根据列数据类型和操作符进行转换，以及处理区域类型的参数
 * @param array 查询参数数组，每个元素包含查询条件的详细信息
 * @returns 返回一个处理后的查询参数数组
 */
export const filterQueryParams = (array: QueryParamsItem[]) => {
  let arr: QueryParamsItem[] = []

  array?.forEach((item) => {
    if (item.Value !== '' && item.Value !== undefined && item.Value !== null) {
      if (Array.isArray(item.Columns)) {
        arr = arr.concat(handleArrayColumns(item))
      } else if (Array.isArray(item.Value)) {
        arr = arr.concat(handleArrayValues(item))
      } else {
        const defaultObj = {
          Field: item.Field,
          OperatorSql: item.OperatorSql,
          Operator: item.Operator,
          Value: item.Value,
          ReplaceType: item.ReplaceType,
          ReplaceValue: item.ReplaceValue,
        }

        if (item.ColumnDataType) {
          arr.push({ ...defaultObj, ColumnDataType: item.ColumnDataType })
        } else {
          const typeMap: Record<string, string> = {
            number: 'Int',
            mdWeek: 'Int',
            date: 'DateTime',
          }

          const type = item.type && typeMap[item.type] ? typeMap[item.type] : undefined
          const operator = item.type ? (item.type === 'number' || item.type === 'mdWeek' || item.type === 'date' ? 'Equal' : item.Operator) : item.Operator
          const operatorSql = operator === 'Equal' ? '=' : item.OperatorSql

          if (type) {
            arr.push({
              ...defaultObj,
              Type: type,
              Operator: operator,
              OperatorSql: operatorSql,
            })
          } else {
            arr.push({
              ...defaultObj,
              Operator: operator,
              OperatorSql: operatorSql,
            })
          }
        }
      }
    } else if (item.type === 'Area') {
      const gids = item.selectItemValue.map((s: { Gid: any }) => s.Gid)
      arr.push({
        Field: item.Column,
        OperatorSql: 'in',
        Operator: 'InWithEqual',
        Value: gids.join(),
        ReplaceType: item.ReplaceType,
        ReplaceValue: item.ReplaceValue,
      })
    }
  })
  return arr
}

// const filterItems = [
//   {
//     Caption: '分组',
//     Field: 'GroupId',
//     Operator: 'equal',
//     OperatorSql: '=',
//     Value: '分组Value',
//     placeHolder: '请选择分组',
//     type: 'groups',
//     width: '100',
//   },
//   {
//     Caption: '部门',
//     Field: 'DeptId',
//     Operator: 'equal',
//     OperatorSql: '=',
//     Value: '部门Value',
//     placeHolder: '请选择分组',
//     type: 'depts',
//     width: '100',
//   },
//   {
//     Caption: '主题',
//     Field: 'Subject',
//     Operator: 'contains',
//     OperatorSql: 'like',
//     Value: '主题Value',
//     placeHolder: '请输入部门主题',
//     type: 'input',
//     width: '100',
//   },
//   {
//     Caption: '周次',
//     Field: 'WeekNumber',
//     OperatorSql: '=',
//     Operator: 'equal',
//     Value: '周次Value',
//     placeHolder: '请选择周次',
//     type: 'mdWeek',
//     width: '100',
//   },
//   {
//     Field: 'PlanStartDay',
//     Caption: '计划周期',
//     Column: 'PlanStartDay',
//     Column2: 'PlanEndDay',
//     type: 'daterangecover',
//     Value: ['2024-08-01', '2024-08-31'],
//     placeHolder: '请选择计划周期',
//     OperatorSql: '',
//     width: '100',
//   },
//   {
//     Caption: '年份',
//     Field: 'Year',
//     Operator: 'equal',
//     Value: '2024',
//     placeHolder: '请选择年份',
//     type: 'number',
//     width: '100',
//   },
//   {
//     Caption: '年份',
//     Field: 'fafka',
//     Operator: 'equal',
//     Value: '',
//     placeHolder: '请选择年份',
//     type: 'Area',
//     width: '100',
//     selectItemValue: [
//       {
//         Gid: '1',
//       },
//       {
//         Gid: '2',
//       },
//     ],
//   },
// ]
// const includeCompanyFilterParams = [
//   {
//     Caption: '岗位编号',
//     Field: 'JobNo',
//     OperatorSql: 'like',
//     Value: '',
//     placeHolder: '请输入岗位编号',
//     type: 'input',
//     width: '100',
//   },
//   {
//     Caption: '岗位名称',
//     Field: 'JobName',
//     OperatorSql: 'like',
//     Value: '',
//     placeHolder: '请输入岗位名称',
//     type: 'input',
//     width: '120',
//   },
//   {
//     Caption: '状态',
//     Field: 'Status',
//     OperatorSql: '=',
//     Operator: 'Equal',
//     Value: '1',
//     placeHolder: '请选择状态',
//     type: 'ConfigView',
//     config: 'Status',
//     width: '80',
//   },
// ]
// const unIncludeCompanyFilterParams = [
//   {
//     Caption: '岗位编号',
//     Field: 'JobNo',
//     OperatorSql: 'like',
//     Value: '',
//     placeHolder: '请输入岗位编号',
//     type: 'input',
//     width: '100',
//   },
//   {
//     Caption: '岗位名称',
//     Field: 'JobName',
//     OperatorSql: 'like',
//     Value: '',
//     placeHolder: '请输入岗位名称',
//     type: 'input',
//     width: '120',
//   },
//   {
//     Caption: '状态',
//     Field: 'Status',
//     OperatorSql: '=',
//     Operator: 'Equal',
//     Value: '1',
//     placeHolder: '请选择状态',
//     type: 'ConfigView',
//     config: 'Status',
//     width: '80',
//   },
// ]
