import Handlebars from 'handlebars'

/** GET 无入参 */
const noQueryAndPathParameters = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http<{{apiName}}Res>({
    url: '/one/service',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
    },
  })
}
`
/** GET 有入参 */
const GetQueryParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = (params: {{apiName}}Query) => {
  return http<{{apiName}}Res>({
    url: '/one/service',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
      ObjectData: params,
    },
  })
}
`

/** POST 无入参 */
const PostTemplate = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http<{{apiName}}Res>({
    url: '/one/service',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
    },
  })
}
`

/** POST 无入参 */
const PostQueryDataTemplate = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => {
  return http<{{apiName}}Res>({
    url: '/one/service',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
      ObjectData: data,
    },
  })
}
`

// Get无参数
export const noQueryAndPathParametersFn = Handlebars.compile(noQueryAndPathParameters)
// Get有参数
export const getQueryParamsTemplateFn = Handlebars.compile(GetQueryParamsTemplate)

// Post无参数
export const postTemplateFn = Handlebars.compile(PostTemplate)
// Post有参数
export const postQueryDataTemplateFn = Handlebars.compile(PostQueryDataTemplate)
