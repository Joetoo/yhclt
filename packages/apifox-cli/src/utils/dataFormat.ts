import { pinyin } from 'pinyin-pro'
import { loading } from '../utils/loading.js'
import type { ApiFoxConfig, CreaterOptionsType, FolderListItem, ProcessedFolderItem } from '../types/index'
import { fetchApiDetails } from './index.js'

// 中文转拼音, 小驼峰命名
export const cnToPinyin = (cn: string) => {
  const pyArr = pinyin(cn, { toneType: 'none', type: 'array' })

  // 转换为小驼峰命名法的字符串
  const camelCaseName = pyArr
    .map((pinyinWord, index) => {
      if (index === 0) {
        // 第一个词首字母小写
        return pinyinWord.toLowerCase()
      }
      // 其余词首字母大写，其余小写
      return pinyinWord.charAt(0).toUpperCase() + pinyinWord.slice(1).toLowerCase()
    })
    .join('') // 没有空格，直接连接

  return camelCaseName
}

// 展平文件夹
export const flattenFolders = (arr, pathArr: string[] = []) => {
  return arr.reduce((acc, item) => {
    // 文件夹级别
    if (item.type === 'apiDetailFolder') {
      const currentPathArr = [...pathArr, item.name]
      const path = currentPathArr.map(name => cnToPinyin(name)).join('/')

      const folder = {
        path,
        pathArr: currentPathArr,
        // nameEn,
        ...item.folder,
      }
      acc.folderList.push(folder)

      // 文件夹下有子文件夹
      if (item.children) {
        const childResult = flattenFolders(item.children, currentPathArr)
        acc.folderList.push(...childResult.folderList)
        acc.apiList.push(...childResult.apiList)
      }
    } else {
      acc.apiList.push(item.api)
    }

    return acc
  }, { folderList: [], apiList: [] })
}

export const filterFoldersByChoiceIds = (folderList: FolderListItem[], choicesFolderIds: number[]) => {
  return folderList.filter(item => choicesFolderIds.includes(item.id))
}

export const selectedAPIs = async (type: CreaterOptionsType, config: ApiFoxConfig, choicesFolderIds: number[], choicesApis: number[]) => {
  // 加载 API 详情
  const apiArr = await loading(`获取API详情`, () => fetchApiDetails(config))

  // 检查API是否符合，过滤条件
  const shouldFilterByFolders = type !== 'api' && choicesFolderIds.length > 0 // all,module
  const shouldFilterByApis = type === 'api' && choicesApis.length > 0 // api

  const ApiArr = apiArr.filter((item) => {
    const isMatched = shouldFilterByFolders ? choicesFolderIds.includes(item.folderId) : true
    const isMatchedById = shouldFilterByApis ? choicesApis.includes(item.id) : true
    return isMatched && isMatchedById
  })

  console.log('🚀 ~ create ~ apiArr:', ApiArr)
  return ApiArr
}

export const findFolderById = (folderList: ProcessedFolderItem[], folderId: number): ProcessedFolderItem => {
  return folderList.find(folder => folder.id === folderId)
}
