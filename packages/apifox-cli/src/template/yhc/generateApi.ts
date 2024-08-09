/*
 * @Description: yhc
 */

import type { HttpMethodStrategy } from '../../types/index.js'
import {
  getQueryParamsTemplateFn,
  noQueryAndPathParametersFn,
  postQueryDataTemplateFn,
  postTemplateFn,
} from './yhc.js'

export const yhcApiFn = (apiName: string, path: string, folderInfo, item) => {
  const { parameters, name, method: methodInUpperCase, requestBody } = item
  const method = methodInUpperCase.toUpperCase()
  let apiFun = null

  const { query: queryParameters, path: pathParameters } = parameters

  pathParameters?.forEach((item) => {
    if (item.type === 'integer') {
      item.type = 'number'
    }
  })

  // 实现GET方法的逻辑
  const handleGetMethod = () => {
    // 无路径参数
    if (queryParameters.length === 0 && pathParameters?.length === 0) {
      apiFun = noQueryAndPathParametersFn({ name, apiName, method, path })
    } else if (queryParameters?.length === 0 && pathParameters?.length > 0) {
      console.log('GET-path-无query', '待支持')
    } else if (queryParameters.length > 0 && pathParameters.length === 0) {
      // 只有 queryParameters
      apiFun = getQueryParamsTemplateFn({ name, apiName, method, path })
      folderInfo.apiFunImportItems.push(`${apiName}Query`)
    } else {
      console.log('GET-path-query两者都有', '待支持')
    }

    return apiFun
  }

  // 实现POST等包含请求体的方法逻辑
  const handlePostMethod = () => {
    const hasRequestBody = requestBody.type !== 'none'

    if (hasRequestBody) {
      if (pathParameters?.length > 0) {
        console.log('POST,hasRequestBody-pathParameters?.length > 0', '待支持')
      } else {
        apiFun = postQueryDataTemplateFn({ name, apiName, method, path })
      }

      folderInfo.apiFunImportItems.push(`${apiName}Req`)
    } else {
      // 没有 requestBody, 但可能存在path入参
      if (pathParameters?.length > 0) {
        console.log('POST,pathParameters?.length > 0', '待支持')
      } else {
        apiFun = postTemplateFn({ name, apiName, method, path })
      }
    }
    return apiFun
  }

  const strategies: Record<string, HttpMethodStrategy> = {
    get: handleGetMethod,
    post: handlePostMethod,
    // 添加其他HTTP方法...
  }

  const strategyFn = strategies[method.toLowerCase()] || handlePostMethod
  return strategyFn()
}
