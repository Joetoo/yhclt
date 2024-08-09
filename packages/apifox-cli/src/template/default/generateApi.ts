/*
 * @Description: default
 */
import type { HttpMethodStrategy } from '../../types/index.js'
import { addDollarBeforeBrace } from '../../utils/index.js'
import {
  getBodyTemplateWxFn,
  getPathParamsTemplateFn,
  getPathParamsTemplateWxFn,
  getQueryParamsTemplateFn,
  getQueryParamsTemplateWxFn,
  noQueryAndPathParametersFn,
  noQueryAndPathParametersWxFn,
  postBodyTemplateFn,
  postBodyTemplateWxFn,
  postPathParamsTemplateFn,
  postPathParamsTemplateWxFn,
  postQueryDataTemplateFn,
  postQueryDataTemplateWxFn,
  postTemplateFn,
  postTemplateWxFn,
} from './index.js'

export const defaultWebApiFn = (apiName: string, path: string, folderInfo, item) => {
  const { parameters, name, method, requestBody } = item
  let apiFun = null

  // 1.优先判断是否有query参数,并且路径中也不携带参数
  const { query: queryParameters, path: pathParameters } = parameters

  // 处理path参数的类型
  pathParameters?.forEach((item) => {
    if (item.type === 'integer') {
      item.type = 'number'
    }
  })

  // 实现GET方法的逻辑
  const handleGetMethod = () => {
    // 无路径参数
    if (queryParameters.length === 0 && pathParameters.length === 0) {
      apiFun = noQueryAndPathParametersFn({ name, apiName, method, path })
    } else if (queryParameters?.length === 0 && pathParameters?.length > 0) {
      // 只有 pathParameters
      apiFun = getPathParamsTemplateFn({
        name,
        apiName,
        method,
        path: addDollarBeforeBrace(path),
        list: pathParameters,
      })
    } else if (queryParameters.length > 0 && pathParameters.length === 0) {
      // 只有 queryParameters
      apiFun = getQueryParamsTemplateFn({ name, apiName, method, path })
      folderInfo.apiFunImportItems.push(`${apiName}Query`)
    } else {
      console.log('GET-path-query两者都有', '待支持', '联系yhc开发者:1570466620@qq.com')
    }
    return apiFun
  }

  // 实现POST,PUT,DELETE等包含请求体的方法逻辑
  const handlePostMethod = () => {
    const hasRequestBody = requestBody.type !== 'none' // 存在body请求体

    if (hasRequestBody) {
      if (pathParameters?.length > 0) {
        apiFun = postBodyTemplateFn({ name, apiName, method, path: addDollarBeforeBrace(path), list: pathParameters })
      } else {
        apiFun = postQueryDataTemplateFn({ name, apiName, method, path })
      }

      folderInfo.apiFunImportItems.push(`${apiName}Req`)
    } else {
      // 没有 requestBody, 但可能存在path入参
      if (pathParameters?.length > 0) {
        apiFun = postPathParamsTemplateFn({
          name,
          apiName,
          method,
          path: addDollarBeforeBrace(path),
          list: pathParameters,
        })
      } else {
        apiFun = postTemplateFn({ name, apiName, method, path })
      }
    }
    return apiFun
  }

  const strategies: Record<string, HttpMethodStrategy> = {
    get: handleGetMethod,
    post: handlePostMethod,
    put: handlePostMethod,
    delete: handlePostMethod,
    // 添加其他HTTP方法...
  }

  const strategyFn = strategies[method.toLowerCase()] || handlePostMethod
  return strategyFn()
}

export const defaultWxApiFn = (apiName: string, path: string, folderInfo, item) => {
  const { parameters, name, method: methodInUpperCase, requestBody } = item
  const method = methodInUpperCase.toUpperCase()

  let apiFun = null

  // 1.优先判断是否有query参数,并且路径中也不携带参数
  const { query: queryParameters, path: pathParameters } = parameters

  // 处理path参数的类型
  pathParameters?.forEach((item) => {
    if (item.type === 'integer') {
      item.type = 'number'
    }
  })

  // 实现GET方法的逻辑
  const handleGetMethod = () => {
    // 无路径参数
    if (queryParameters.length === 0 && pathParameters.length === 0) {
      apiFun = noQueryAndPathParametersWxFn({ name, apiName, method, path })
    } else if (queryParameters?.length === 0 && pathParameters?.length > 0) {
      // 只有 pathParameters
      apiFun = getPathParamsTemplateWxFn({
        name,
        apiName,
        method,
        path: addDollarBeforeBrace(path),
        list: pathParameters,
      })
    } else if (queryParameters.length > 0 && pathParameters.length === 0) {
      // 只有 queryParameters
      apiFun = getQueryParamsTemplateWxFn({ name, apiName, method, path })
      folderInfo.apiFunImportItems.push(`${apiName}Query`)
    } else {
      apiFun = getBodyTemplateWxFn({
        name,
        apiName,
        method,
        path: addDollarBeforeBrace(path),
        list: pathParameters,
      })
      folderInfo.apiFunImportItems.push(`${apiName}Query`)
    }
    return apiFun
  }

  // 实现POST,PUT,DELETE等包含请求体的方法逻辑
  const handlePostMethod = () => {
    const hasRequestBody = requestBody.type !== 'none' // 存在body请求体

    if (hasRequestBody) {
      if (pathParameters?.length > 0) {
        apiFun = postBodyTemplateWxFn({ name, apiName, method, path: addDollarBeforeBrace(path), list: pathParameters })
      } else {
        apiFun = postQueryDataTemplateWxFn({ name, apiName, method, path })
      }

      folderInfo.apiFunImportItems.push(`${apiName}Req`)
    } else {
      // 没有 requestBody, 但可能存在path入参
      if (pathParameters?.length > 0) {
        apiFun = postPathParamsTemplateWxFn({
          name,
          apiName,
          method,
          path: addDollarBeforeBrace(path),
          list: pathParameters,
        })
      } else {
        apiFun = postTemplateWxFn({ name, apiName, method, path })
      }
    }
    return apiFun
  }

  const strategies: Record<string, HttpMethodStrategy> = {
    get: handleGetMethod,
    post: handlePostMethod,
    put: handlePostMethod,
    delete: handlePostMethod,
    // 添加其他HTTP方法...
  }

  const strategyFn = strategies[method.toLowerCase()] || handlePostMethod
  return strategyFn()
}
