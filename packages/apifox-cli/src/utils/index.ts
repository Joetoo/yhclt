/* eslint-disable style/max-statements-per-line */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import chalk from 'chalk'
import ora from 'ora'
import { pinyin } from 'pinyin-pro'
import { DEFAULT_IMPORT_HTTP } from '../constants/constants.js'
import { createHttp } from '../http/index.js'
import { apifoxTemplateFn } from '../template/default/index.js'
import type { ApiFoxConfig, FolderItem, ProcessedFolderItem } from '../types/index.js'
import { error } from './message.js'
import { capitalize, convertAsyncToApi } from './validate.js'

const spinner = ora()

const require = createRequire(import.meta.url)

// 中文转拼音
export const cnToPinyin = (cn: string) => {
  const pyArr = pinyin(cn, { toneType: 'none', type: 'array' })

  return pyArr.reduce((result, curr, index) => {
    if (curr === '/') {
      return result
    } else {
      return result + (index > 0 ? curr.toUpperCase() : curr)
    }
  }, '')
}

// 获取项目apis文件目录
export const fetchFolderList = async (apiFoxConfig: ApiFoxConfig) => {
  const http = createHttp(apiFoxConfig)
  const apiTreeList = '/api-tree-list?locale=en-US'

  const res = await http.get(apiTreeList)
  const folderArr = res.data?.data || []

  // eslint-disable-next-line ts/no-use-before-define
  const { folderList, apiList } = flattenFolders(folderArr, [])
  // console.log('fetchFolderList',folderList, apiList)
  return { folderList, apiList }
}

// 展平文件夹
export const flattenFolders = (arr, pathArr: string[]) => {
  const folderList = []
  const apiList = []

  for (const item of arr) {
    if (item.type !== 'apiDetailFolder') {
      apiList.push({ ...item.api })
      continue
    }

    const nameEn = cnToPinyin(item.name)
    const pathArrEn = pathArr.concat(nameEn)
    const path = pathArrEn.join('/')

    const resItem = {
      path,
      pathArrEn,
      pathArr: [...pathArr, item.name],
      nameEn,
      ...item.folder,
    }
    folderList.push(resItem)

    if (item.children) {
      const { folderList: childFolderList, apiList: childApiList } = flattenFolders(item.children, pathArrEn)
      folderList.push(...childFolderList)
      apiList.push(...childApiList)
    }
  }
  return { folderList, apiList }
}

// fetchApiDetails
export const fetchApiDetails = async (apiFoxConfig: ApiFoxConfig) => {
  const http = createHttp(apiFoxConfig)
  const apiDetailsUrl = '/api-details?locale=en-US'

  const res = await http.get(apiDetailsUrl)
  return res.data?.data || []
}

// 根据模式添加不同的导入模块
export const getApiFileImportContent = (deep: number, createModule, importHttp: string) => {
  const relativePath = deep === 0 ? './' : '../'.repeat(deep)

  const specificImports = importHttp || DEFAULT_IMPORT_HTTP

  // import qs from 'qs'
  // import type { IConfig } from '@galaxy/swrv'
  // import type { AxiosRequestConfig } from 'axios'
  // import { useMutation, useSWRGet } from '${relativePath}swrv'

  const ImportContentStart = specificImports

  return ImportContentStart.trim()
}

// generateFolders
export const generateFolders = (
  folderList: FolderItem[],
  parentDir: string,
  createModule: string,
  importHttp: string,
): ProcessedFolderItem[] => {
  if (!existsSync(parentDir)) {
    mkdirSync(`${parentDir}`, { recursive: true })
  }

  return folderList.map((item) => {
    const itemDirPath = `${parentDir}/${item.path}`
    mkdirSync(itemDirPath, { recursive: true })
    const interfacesContentPath = `${itemDirPath}/interface.ts`
    const apiFunPath = `${itemDirPath}/apifox.ts`
    const apiFunImportContent = getApiFileImportContent(item.pathArr.length + 1, createModule, importHttp)
    // 追加自定义字段
    const processedItem: ProcessedFolderItem = {
      ...item,
      interfacesContentPath,
      apiFunPath,
      interfacesContent: '',
      apiFunContent: '',
      apiFunImportContent,
      apiFunImportItems: [],
      apiNames: [],
    }

    return processedItem
  })
}

export const findFolderById = (
  folderList: ProcessedFolderItem[],
  folderId: number,
): ProcessedFolderItem | undefined => {
  return folderList.find(folder => folder.id === folderId)
}

// 生成API名称
export const generateApiName = (apiUrl: string, method: string) => {
  // 解析url  /Udx/Master/IMasterUserService/QueryShopListAsync post
  if (!apiUrl) { return error('apiUrl is not defined or is null') }
  // 获取url的最后一项 ['/QueryShopListAsync']
  const apiUrlLastItemList = apiUrl.match(/[/-][a-z0-9]+/gi)?.slice(-1) || []
  // substring(1)返回从索引 1 开始到字符串末尾的所有字符 [ 'QueryShopListAsync' ]
  const urlBlocks = apiUrlLastItemList.map(block => capitalize(block.substring(1)))

  // 提取最后一个路线参数并将其大写（如果有）
  const lastRouteParamMatch = apiUrl.match(/\{[a-z0-9]+\}$/i)?.[0]
  const routeParam = lastRouteParamMatch ? capitalize(lastRouteParamMatch.replace(/[{|}]/g, '')) : ''
  // 构建API名称
  const apiName = convertAsyncToApi([method, ...urlBlocks].join(''))
  // 添加路由参数（如果有）
  return apiName + (routeParam ? `_${routeParam}` : '')
}

// 处理参数ts类型
export const handleParametersTypeList = (paramsList) => {
  // type==='array' name 会带[] 例如 name: "similar_question[]"
  const extractArrayFieldName = (name: string) => (name.endsWith('[]') ? name.slice(0, -2) : name)

  const list = paramsList.map(item => ({
    ...item,
    name: extractArrayFieldName(item.name),
    // eslint-disable-next-line ts/no-use-before-define
    convertTypeOnly: convertTypeOnly(item.type, item.example),
  }))

  return list
}

/**
 * @description: 处理一些字段名命名不规范的问题 eg: effective_time[] 这种带中括号，或者以数字开头
 * @param {*} name
 * @return {*}
 */
export const handleKeyName = (name) => {
  const reg = /^[a-z_$][\w$]*$/i

  // 只需执行一次正则测试
  const isInvalidName = !reg.test(name)

  if (isInvalidName) {
    // 根据是否包含单引号决定使用单引号还是双引号包裹
    return name.includes('\'') ? `"${name}"` : `'${name}'`
  }

  return name
}

const getExampleItemType = (examples: any[]): string => {
  const uniqueTypes = new Set<string>()

  examples.forEach((ex) => {
    uniqueTypes.add(typeof ex)
  })

  return [...uniqueTypes].join(' | ')
}

type ExampleType = any | any[]
const getArrayType = (example: ExampleType) => {
  const itemTypes = Array.isArray(example) ? getExampleItemType(example) : 'any'
  return itemTypes.includes('|') ? `(${itemTypes})[]` : `${itemTypes}[]`
}

/**
 * @description: 只有一层类型需要处理，无嵌套类型
 * @param {string} type
 * @param {any} example
 * @return {*}
 */
export const convertTypeOnly = (type: string, example?: any | any[]) => {
  // type:["string","null"]
  if (Array.isArray(type)) { return type.map(convertTypeOnly).join(' | ') }

  let resType = type

  switch (type) {
    case 'integer':
      resType = 'number'
      break
    case 'file':
      resType = 'File'
      break
    case 'array':
      resType = getArrayType(example)
      break
  }
  return resType ?? 'any'
}

export const generateFileContent = (folderList, type) => {
  // 生成文件内容
  folderList.forEach((item) => {
    if (item.apiFunImportItems.length === 0) { return }

    const { interfacesContentPath, interfacesContent, apiFunImportItems, apiFunPath, apiFunContent } = item
    let { apiFunImportContent } = item

    // 如果类型为“all”或“module”，或者interfacesContentPath指定的文件不存在，则将执行If语句中的代码块。这允许代码在文件不存在的情况下生成该文件。
    if (['all', 'module'].includes(type) || !existsSync(interfacesContentPath)) {
      try {
        /** 写 interface.ts */
        writeFileSync(interfacesContentPath, interfacesContent)
        /** 拼接内容 写apifox.ts */
        // apiFunImportContent: "import { http } from '@/utils/http'",
        apiFunImportContent += apifoxTemplateFn({ list: apiFunImportItems })
        writeFileSync(apiFunPath, apiFunImportContent + apiFunContent)
        spinner.succeed(chalk.green(`✨ 成功生成ts文件,请查看${apiFunPath}和 ${interfacesContentPath}`))
      } catch (err) {
        spinner.fail(chalk.red(`❌ 生成ts文件失败,请重试!`))
      }
    }

    if (type === 'api' && existsSync(interfacesContentPath)) {
      // eslint-disable-next-line ts/no-use-before-define
      updateFileContent(item)
    }
  })
}

export const updateFileContent = (folderItem) => {
  const item = folderItem
  const interfacesContentPath = item.interfacesContentPath
  const interfacesContent = item.interfacesContent
  const apiFunImportContent = item.apiFunImportContent
  const apiFunImportItems = item.apiFunImportItems
  const apiFunPath = item.apiFunPath
  const apiFunContent = item.apiFunContent
  const apiNames = item.apiNames
  try {
    /** 读 interface.ts */
    let data = readFileSync(interfacesContentPath)
    let dataArr = data.toString().split('\n')
    let shouldDelete = false
    for (const { apiName } of apiNames) {
      dataArr = dataArr.filter((line) => {
        if (
          line.startsWith(`export interface ${apiName}Query`)
          || line.startsWith(`export interface ${apiName}Req`)
          || line.startsWith(`export interface ${apiName}Res`)
        ) {
          shouldDelete = true
        }
        if (shouldDelete && line === '}') {
          shouldDelete = false
          return false
        }
        return !shouldDelete
      })
    }
    /** 写 interface.ts */
    writeFileSync(interfacesContentPath, dataArr.join('\n') + interfacesContent)

    /** 读 apifox.ts */
    data = readFileSync(apiFunPath)
    dataArr = data.toString().split('\n')
    shouldDelete = false
    for (const { apiName, name } of apiNames) {
      dataArr = dataArr.filter((line) => {
        /** 过滤掉需要更新的函数方法 */
        if (
          line.startsWith(`/** use ${name} */`)
          || line.startsWith(`/** ${name} */`)
          || line.startsWith(`export function ${apiName}`)
          || line.startsWith(`export const use${apiName}`)
        ) {
          shouldDelete = true
        }
        if (shouldDelete && line === '') {
          shouldDelete = false
          return false
        }
        return !shouldDelete
      })
    }

    /** 有可能有新接口，就会有新的interface需要import */
    const oldApiFunImportItems = []
    let isInterface = false
    let interfaceItemEndIndex
    for (const [index, line] of dataArr.entries()) {
      if (line === '} from \'./interface\'') {
        isInterface = false
        interfaceItemEndIndex = index
        break
      }
      if (isInterface) {
        oldApiFunImportItems.push(line.trim().slice(0, -1))
      }
      if (line === 'import type {') {
        isInterface = true
      }
    }

    const newApiFunImportItems = apiFunImportItems.filter((item) => {
      return !oldApiFunImportItems.includes(item)
    })

    /** 写 apifox.ts */
    if (newApiFunImportItems.length === 0) {
      writeFileSync(apiFunPath, dataArr.join('\n') + apiFunContent)
    } else {
      const newItems = newApiFunImportItems.map(item => `    ${item},`)
      const newDataArr = dataArr
        .slice(0, interfaceItemEndIndex)
        .concat(newItems)
        .concat(dataArr.slice(interfaceItemEndIndex))
      writeFileSync(apiFunPath, newDataArr.join('\n') + apiFunContent)
    }

    spinner.succeed(`💡 成功更新ts文件,请查看 ${apiFunPath} 和 ${interfacesContentPath}`)
  } catch (err) {
    error(err?.message)
    spinner.fail('💡 更新ts文件失败,请重试!')
  }
}

// path入参处理
export const addDollarBeforeBrace = (str: string) => {
  return str.replace(/\{/g, '${')
}
