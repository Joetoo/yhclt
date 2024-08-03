/* eslint-disable ts/no-use-before-define */
/* eslint-disable style/max-statements-per-line */
import { createRequire } from 'node:module'
import path from 'node:path'

import { getConfig } from '../check/index.js'
import { HasReqBodyMethods } from '../constants/constants.js'
import { askApis, askFoldersModules } from '../prompts/index.js'
import {
  anyTypeFn,
  arrayTypeFn,
  arrayTypeTemplateFn,
  enumTemplateFn,
  interfaceReqBodyParamsTemplateFn,
  interfaceTemplateFn,
  notObjectTypeFn,
  objectTypeFn,
} from '../template/default/index.js'
import { Module, Template } from '../types/enum.js'
import type { ApiFoxConfig, createrOptions } from '../types/index.js'
import {
  convertTypeOnly,
  fetchApiDetails,
  fetchFolderList,
  findFolderById,
  generateApiName,
  generateFileContent,
  generateFolders,
  handleKeyName,
  handleParametersTypeList,
} from '../utils/index.js'
import { loading } from '../utils/loading.js'
import { error, warning } from '../utils/message.js'
import { capitalize, formatPrefixPath, validateType } from '../utils/validate.js'

import { defaultWebApiFn, defaultWxApiFn } from '../template/default/generateApi.js'
import { yhcWebApiFn, yhcWxApiFn } from '../template/yhc/generateApi.js'

const require = createRequire(import.meta.url)

const templateModuleImportMap = {
  [Template.Default]: {
    [Module.Web]: defaultWebApiFn,
    [Module.Wx]: defaultWxApiFn,
  },
  [Template.YHC]: {
    [Module.Web]: yhcWebApiFn,
    [Module.Wx]: yhcWxApiFn,
  },
}

export async function selectChoicesFolderIds(
  type: 'api' | 'module' | 'all',
  folderList,
  apiInfoList,
): Promise<{ choicesFolderIds: number[], choicesApis?: number[] }> {
  switch (type) {
    case 'all':
      return { choicesFolderIds: folderList.map(({ id }) => id) || [] }
    case 'module':
      return { choicesFolderIds: await askFoldersModules(folderList) }
    case 'api':
      // eslint-disable-next-line no-case-declarations
      const { choicesApis, choicesFolderId } = await askApis(folderList, apiInfoList)
      return { choicesFolderIds: [choicesFolderId], choicesApis }
  }
}

export function filterFoldersByChoiceIds(folderList, choicesFolderIds: number[]) {
  return folderList.filter(item => choicesFolderIds.includes(item.id))
}

export default async function create({ type, prefixPath }: createrOptions) {
  // 验证 type 参数的有效性
  if (!validateType(type)) { return error(`type 参数不合法: ${type || '未指定类型'},可选值包括：'api' , 'module' , 'all'`) }

  // 获取配置信息并确保其存在
  const { config } = ((await getConfig()) as { config: ApiFoxConfig, exists: boolean }) ?? {}
  // 格式化 prefixPath 参数
  prefixPath = formatPrefixPath(prefixPath)
  // 确定创建模块的类型 web src/api
  const { module: createModule, output, importHttp, template } = config
  // 计算目标路径
  const cwd = process.cwd()
  // D:\yhc\fantastic-admin-pro.example.v4.8.0\src\api
  const distPath = path.resolve(cwd, output)

  // 定义加载提示文本
  const loadingText = '获取apifox文档数据'
  // 加载文档数据（全部）
  const { folderList, apiList: apiInfoList } = await loading(loadingText, () => fetchFolderList(config))

  // 根据 type 参数选择要处理的文件夹 ID 列表
  const { choicesFolderIds, choicesApis } = await selectChoicesFolderIds(type, folderList, apiInfoList)
  // 过滤并保留与 choicesFolderIds 匹配的文件夹列表
  const filteredFolderList = filterFoldersByChoiceIds(folderList, choicesFolderIds)
  // 生成文件夹结构并返回处理后的 folderList
  const processedFolderList = generateFolders(filteredFolderList, distPath, createModule, importHttp)

  // 创建 API 重复检测映射
  const apiRepeatMap = new Map()

  // 加载 API 详情
  const apiArr = await loading(`${loadingText}-API详情`, () => fetchApiDetails(config))

  // 检查API是否符合，过滤条件
  const shouldFilterByFolders = type !== 'api' && choicesFolderIds.length > 0
  const shouldFilterByApis = type === 'api' && choicesApis.length > 0

  const ApiArr = apiArr.filter((item) => {
    const isMatched = shouldFilterByFolders ? choicesFolderIds.includes(item.folderId) : true
    const isMatchedById = shouldFilterByApis ? choicesApis.includes(item.id) : true
    return isMatched && isMatchedById
  })

  ApiArr.forEach((item) => {
    // 校验并修正API路径,加上path前缀 (api url,method)
    let path = item.path || '/'
    if (path === '/') { return warning(`非法 path: ${item.method}-${path}`) }

    // 加上path前缀
    path = `${prefixPath}${path}`

    const folderInfo = findFolderById(processedFolderList, item.folderId)

    if (!folderInfo) { return error(`未找到文件夹-非法 path: ${item.method}-${path}`) }

    /** 处理重复API--找重复 start  */
    const mapKey = `${item.method}${path}`
    const isDuplicate = apiRepeatMap.has(mapKey)
    if (isDuplicate) {
      apiRepeatMap.set(mapKey, apiRepeatMap.get(mapKey) + 1)
    } else {
      apiRepeatMap.set(mapKey, 1)
    }
    /** 找重复 end */

    // 生成API名称
    if (apiRepeatMap.get(mapKey) !== 1) { return }

    const apiName = generateApiName(path, item.method)
    if (!apiName) { return }

    folderInfo.apiNames.push({ apiName, nam: item.name })
    // console.log('文件夹信息', folderInfo)
    // get parameters-query 处理get带参数的queryParams
    // 路径参数的ts类型已在请求方法中处理,只需处理查询参数query的ts类型,
    // 有请求参数才会生成接口类型
    const query = item.parameters?.query || []

    if (query.length !== 0) {
      const list = handleParametersTypeList(query)
      folderInfo.interfacesContent += interfaceTemplateFn({ list, apiName })
    }

    // 处理非GET请求体,不同的参数类型,从不同的地方获取入参,获取入参ts类型
    if (HasReqBodyMethods.includes(item.method)) {
      const requestBody = item.requestBody

      const { type: requestBodyType, parameters } = requestBody

      // console.log('请求体类型', requestBody)
      const interfaceArr = []
      // "type": "application/x-www-form-urlencoded" | 'multipart/form-data' | "application/json"
      switch (requestBodyType) {
        case 'application/x-www-form-urlencoded':
        case 'multipart/form-data':
          folderInfo.interfacesContent += interfaceReqBodyParamsTemplateFn({
            list: handleParametersTypeList(parameters),
            apiName,
          })
          break
        case 'application/json':
          handleJsonType(requestBody.jsonSchema, `${apiName}Req`, interfaceArr)

          interfaceArr.forEach((item) => {
            folderInfo.interfacesContent += item
          })
          break
        case 'none':
          break
        default:
          // 其他类型 比如raw 类型，// 没有例子 暂不支持
          console.error('暂不支持该类型的请求体', requestBodyType)
          handleJsonType({}, `${apiName}Req`, interfaceArr)
          interfaceArr.forEach((item) => {
            folderInfo.interfacesContent += item
          })
          break
      }
    }

    /** ------ 处理response ------ */
    const response = item?.responses?.find(r => r.code === 200) // 只处理 200 状态码
    const jsonSchema = response?.jsonSchema ?? {}
    const { 'x-apifox-refs': refs = {}, 'x-apifox-orders': orders = [] } = response?.jsonSchema ?? {}

    const processResponseSchema = (schema: Record<string, any>) => {
      const resInterfaceArr = []
      handleJsonType(schema, `${apiName}Res`, resInterfaceArr)
      resInterfaceArr.forEach((item) => {
        folderInfo.interfacesContent += item
      })
    }

    /** 有两种形式的数据结构 */
    if (Object.keys(refs).length === 0) {
      const resDataJsonSchema = getResDataJsonSchema(jsonSchema, template)
      processResponseSchema(resDataJsonSchema)
    } else {
      const propertyKeys = Object.keys(jsonSchema.properties ?? {})
      // eg: 01GVM1TR3Y1XF8M6HVFVFZC6VV 现在只发现有一个 也就是 refsInnerKeys 只有一项
      const refsInnerKeys = orders.filter(item => !propertyKeys.includes(item))
      if (refsInnerKeys.length > 0) {
        const innerRefObj = refs[refsInnerKeys[0]]

        if (innerRefObj?.['x-apifox-overrides']?.data) {
          const dataSchema = innerRefObj['x-apifox-overrides'].data
          processResponseSchema(dataSchema)
        }
      }
    }

    /** ------ 生成api function start ------ */
    const generateApiFun = templateModuleImportMap[template]?.[createModule]

    const apiFun = generateApiFun(apiName, path, folderInfo, item)

    folderInfo.apiFunImportItems.push(`${apiName}Res`)
    folderInfo.apiFunContent += apiFun

    /** ------ 生成api function end ------ */
  })
  // success('🛠️ 正在解析apifox文档数据,生成ts文件...')
  generateFileContent(processedFolderList, type)
}

/** interfaceArr 不传值的时候就不会push, 用在handleJsonRefsType */
const handleJsonType = (jsonSchema, apiName, interfaceArr) => {
  /** 有些接口 没有定义response data type jsonSchema:{} */
  if (!jsonSchema.type) {
    const result = anyTypeFn({ apiName })
    interfaceArr?.push(result)
    return result
  }

  if (jsonSchema.type === 'array') {
    const result = arrayTypeFn({ apiName })
    interfaceArr?.push(result)
    handleJsonType(jsonSchema.items, `${apiName}Item`, interfaceArr)
    return result
  }

  if (jsonSchema.type !== 'object') {
    const result = notObjectTypeFn({ apiName, convertTypeOnly: convertTypeOnly(jsonSchema.type) })

    interfaceArr?.push(result)
    return result
  }

  /** jsonSchema.type === 'object' */
  const properties = jsonSchema.properties || {}
  const required = jsonSchema.required
  const result = []

  Object.keys(properties).forEach((key) => {
    const { description = '', title = '', nullable, type } = properties[key]
    if (typeof type === 'undefined') { return }

    const optionalIndicator = !((required && !required.includes(key)) || nullable === true)

    result.push({
      title,
      description,
      keyName: handleKeyName(key),
      convertMyType: convertMyType(properties[key], key, apiName, interfaceArr),
      required: optionalIndicator,
    })
  })

  const resultInterface = objectTypeFn({ list: result, apiName })

  interfaceArr?.push(resultInterface)
  return result
}

/** 转换类型 */
const convertMyType = (property, key, preApiName, interfaceArr) => {
  // property.type: ["string","null"]
  if (Array.isArray(property.type)) {
    return property.type.map(convertTypeOnly).join(' | ')
  }
  let type = 'unknown'

  switch (property.type) {
    case 'file':
      type = 'File'
      break
    case 'string':
      if (property.enum && Array.isArray(property.enum)) {
        const enumType = preApiName + capitalize(key)
        handleEnumType(property, enumType, interfaceArr)
        type = enumType
      } else {
        type = 'string'
      }
      break
    case 'boolean':
      type = 'boolean'
      break
    case 'integer':
      if (property.enum) {
        const enumType = preApiName + capitalize(key)
        handleEnumType(property, enumType, interfaceArr)
        type = enumType
      } else {
        type = 'number'
      }
      break
    case 'number':
      type = 'number'
      break
    case 'array':
      if (property?.items?.type) {
        let itemType = property.items.type
        if (itemType === 'integer') {
          type = `Array<number>`
        } else if (itemType === 'object') {
          const jsonSchema = property.items
          itemType = `${preApiName}${capitalize(key)}Item`
          type = `Array<${itemType}>`
          handleJsonType(jsonSchema, itemType, interfaceArr)
        } else if (itemType === 'array') {
          // 只处理到这一层了，再往深嵌套就直接any了
          const innerItemType = property?.items?.items?.type || 'any'
          type = `Array<${convertTypeOnly(innerItemType)}[]>`
        } else {
          type = arrayTypeTemplateFn({ itemType })
        }
      }
      break
    case 'object':
      type = `${preApiName}${capitalize(key)}`
      handleJsonType(property, type, interfaceArr)
      break
    default:
      type = property.type
  }
  return type
}

/** 处理枚举类型 type: integer | string */
const handleEnumType = (property, enumTypeName, interfaceArr) => {
  const { enum: enums, type, title = '' } = property

  // 创建一个对象来传递给模板
  const templateContext = {
    title,
    typeString: type === 'string',
    enums,
    enumTypeName,
  }

  const res = enumTemplateFn(templateContext)
  interfaceArr.push(res)
}

const SUCCESS_CODE_TYPE_MAP: Record<Template, string[]> = {
  [Template.Default]: ['code', 'message', 'data', 'msg'],
  [Template.YHC]: ['Code', 'Message', 'Msg', 'ObjectData', 'Successful'],
}

// 判断Json结构体
const getResDataJsonSchema = (
  schema: Record<string, any>,
  template: Template = Template.Default,
): Record<string, any> => {
  const { properties } = schema

  if (!properties) { return schema }

  const requiredKeys = SUCCESS_CODE_TYPE_MAP[template]
  // eslint-disable-next-line no-prototype-builtins
  const hasAnyKey = requiredKeys.some(key => properties.hasOwnProperty(key))

  if (!hasAnyKey) { return schema }

  const dataKey = template === Template.Default ? 'data' : 'ObjectData'

  return properties[dataKey] ?? {}
}
