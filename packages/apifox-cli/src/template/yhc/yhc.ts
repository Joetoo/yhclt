import Handlebars from 'handlebars'

/** GET 无入参 */
const noQueryAndPathParameters = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http.Get<{{apiName}}Res>('{{path}}')
}
`
/** GET 有入参 */
const GetQueryParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = (params: {{apiName}}Query) => {
  return http.Get<{{apiName}}Res>('{{path}}', {
    ObjectData: params,
  })
}
`

/** POST 无入参 */
const PostTemplate = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http.Post<{{apiName}}Res>('{{path}}')
}
`

/** POST 有入参 */
const PostQueryDataTemplate = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => {
  return http.Post<{{apiName}}Res>('{{path}}', {
    ObjectData: data,
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
