import Handlebars from 'handlebars'

// 无任何参数
const noQueryAndPathParameters = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http<{{apiName}}Res>({
    url: '',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
    },
  })
}
`

const noQueryAndPathParametersWeb = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http<{{apiName}}Res>({
    Router: '{{path}}',
  },method: '{{method}}')
}
`

// 并且最后一个入参不需要逗号
// const GetPathParamsTemplate = `
// /** {{name}} */
// export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http<{{apiName}}Res>(\`{{path}}\`,'{{method}}')
// `

const GetQueryParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = (params: {{apiName}}Query) => {
  return http<{{apiName}}Res>({
    url: '',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
      ObjectData: params,
    },
  })
}
`

const GetQueryParamsTemplateWeb = `
/** {{name}} */
export const {{ apiName }} = (params: {{apiName}}Query) => {
  return http<{{apiName}}Res>({
    Router: '{{path}}',
    ObjectData: params,
  },method: '{{method}}')
}
`

// Post两者都有参数(path,body)
// const PostBodyTemplate = `
// /** {{name}} */
// export const {{ apiName }} = ({{#each list}}{{name}}: {{type}},{{/each}} data: {{apiName}}Req) => {
//   return http<{{apiName}}Res>({
//     \`{{path}}\`,'{{method}}',data
//   })
// }
// `

const PostTemplate = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http<{{apiName}}Res>({
    url: '',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
    },
  })
}
`

const PostTemplateWeb = `
/** {{name}} */
export const {{ apiName }} = () => {
  return http<{{apiName}}Res>({
    Router: '{{path}}',
  })
}
`

// http<{{apiName}}Res>('{{path}}','{{method}}',data)
const PostQueryDataTemplate = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => {
  return http<{{apiName}}Res>({
    url: '',
    method: '{{method}}',
    data: {
      Router: '{{path}}',
      ObjectData: data,
    },
  })
}
`

const PostQueryDataTemplateWeb = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => {
  return http<{{apiName}}Res>({
    Router: '{{path}}',
    ObjectData: data,
  })
}
`

// Get无参数
export const noQueryAndPathParametersFn = Handlebars.compile(noQueryAndPathParameters)
export const noQueryAndPathParametersWebFn = Handlebars.compile(noQueryAndPathParametersWeb)
// Get有参数
// export const getPathParamsTemplateFn = Handlebars.compile(GetPathParamsTemplate)
export const getQueryParamsTemplateFn = Handlebars.compile(GetQueryParamsTemplate)
export const getQueryParamsTemplateWebFn = Handlebars.compile(GetQueryParamsTemplateWeb)

// Post无参数
export const postTemplateFn = Handlebars.compile(PostTemplate)
export const postTemplateWebFn = Handlebars.compile(PostTemplateWeb)
// Post有参数
export const postQueryDataTemplateFn = Handlebars.compile(PostQueryDataTemplate)
export const postQueryDataTemplateWebFn = Handlebars.compile(PostQueryDataTemplateWeb)
// export const postBodyTemplateFn = Handlebars.compile(PostBodyTemplate)
