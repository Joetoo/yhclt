/*
 * @Description: yhc
 */

import type { HttpMethodStrategy } from '../../types/index.js'
import {
  getQueryParamsTemplateFn,
  getQueryParamsTemplateWebFn,
  noQueryAndPathParametersFn,
  noQueryAndPathParametersWebFn,
  postQueryDataTemplateFn,
  postQueryDataTemplateWebFn,
  postTemplateFn,
  postTemplateWebFn,
} from './yhc.js'

export const yhcWebApiFn = (apiName: string, path: string, folderInfo, item) => {
  const { parameters, name, method, requestBody } = item
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
      apiFun = noQueryAndPathParametersWebFn({ name, apiName, method, path })
    } else if (queryParameters?.length === 0 && pathParameters?.length > 0) {
      // 只有 pathParameters,yhc模板不需要
      // apiFun = getPathParamsTemplateFn({
      //   name,
      //   apiName,
      //   method,
      //   path: addDollarBeforeBrace(path),
      //   list: pathParameters,
      // })
    } else if (queryParameters.length > 0 && pathParameters.length === 0) {
      // 只有 queryParameters
      apiFun = getQueryParamsTemplateWebFn({ name, apiName, method, path })
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
        // apiFun = postBodyTemplateFn({ name, apiName, method, path: addDollarBeforeBrace(path), list: pathParameters })
      } else {
        apiFun = postQueryDataTemplateWebFn({ name, apiName, method, path })
      }

      folderInfo.apiFunImportItems.push(`${apiName}Req`)
    } else {
      // 没有 requestBody, 但可能存在path入参
      if (pathParameters?.length > 0) {
        // apiFun = postPathParamsTemplateFn({
        //   name,
        //   apiName,
        //   method,
        //   path: addDollarBeforeBrace(path),
        //   list: pathParameters,
        // })
      } else {
        apiFun = postTemplateWebFn({ name, apiName, method, path })
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

export const yhcWxApiFn = (apiName: string, path: string, folderInfo, item) => {
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
      // 只有 pathParameters,yhc模板不需要
      // apiFun = getPathParamsTemplateFn({
      //   name,
      //   apiName,
      //   method,
      //   path: addDollarBeforeBrace(path),
      //   list: pathParameters,
      // })
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
        // apiFun = postBodyTemplateFn({ name, apiName, method, path: addDollarBeforeBrace(path), list: pathParameters })
      } else {
        apiFun = postQueryDataTemplateFn({ name, apiName, method, path })
      }

      folderInfo.apiFunImportItems.push(`${apiName}Req`)
    } else {
      // 没有 requestBody, 但可能存在path入参
      if (pathParameters?.length > 0) {
        // apiFun = postPathParamsTemplateFn({
        //   name,
        //   apiName,
        //   method,
        //   path: addDollarBeforeBrace(path),
        //   list: pathParameters,
        // })
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
