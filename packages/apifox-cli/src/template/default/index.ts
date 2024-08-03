import Handlebars from 'handlebars'

// 无任何参数
const noQueryAndPathParameters = `
/** {{name}} */
export const {{ apiName }} = () => http<{{apiName}}Res>('{{path}}','{{method}}')
`

const noQueryAndPathParametersWx = `
/** {{name}} */
export const {{ apiName }} = () => http<{{apiName}}Res>({
  url: '{{path}}',
  method: '{{method}}',
})
`

// 并且最后一个入参不需要逗号
const GetPathParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http<{{apiName}}Res>(\`{{path}}\`,'{{method}}')
`

const GetPathParamsTemplateWx = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => {
  return http<{{apiName}}Res>({
    url: \`{{path}}\`,
    method: '{{method}}',
  })
}
`

const GetQueryParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = (params: {{apiName}}Query) => {
  return http<{{apiName}}Res>('{{path}}','{{method}}',params)
}
`

const GetQueryParamsTemplateWx = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Query) => {
  return http<{{apiName}}Res>({
    url: '{{path}}',
    method: '{{method}}',
    data,
  })
}
`

// Get两者都有参数(path,body)
const GetBodyTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}},{{/each}} data: {{apiName}}Req) => {
  return http<{{apiName}}Res>({
    url: \`{{path}}\`,
    method: '{{method}}',
    data,
  })
}
`

const PostTemplate = `
/** {{name}} */
export const {{ apiName }} = () => http<{{apiName}}Res>('{{path}}','{{method}}')
`

const PostTemplateWx = `
/** {{name}} */
export const {{ apiName }} = () => http<{{apiName}}Res>({
  url: '{{path}}',
  method: '{{method}}',
})
`

const PostPathParamsTemplateFn = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http<{{apiName}}Res>(\`{{path}}\`,'{{method}}')
`

const PostPathParamsTemplateFnWx = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => {
  return http<{{apiName}}Res>({
    url: \`{{path}}\`,
    method: '{{method}}',
  })
}
`

const PostQueryDataTemplate = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => http<{{apiName}}Res>('{{path}}','{{method}}',data)
`

const PostQueryDataTemplateWx = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => {
  return http<{{apiName}}Res>({
    url: '{{path}}',
    method: '{{method}}',
    data,
  })
}
`

// Post两者都有参数(path,body)
const PostBodyTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}},{{/each}} data: {{apiName}}Req) => {
  return http<{{apiName}}Res>(\`{{path}}\`,'{{method}}',data)
}
`

// Post两者都有参数(path,body)
const PostBodyTemplateWx = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}},{{/each}} data: {{apiName}}Req) => {
  return http<{{apiName}}Res>({
    url: \`{{path}}\`,
    method: '{{method}}',
    data,
  })
}
`

const PutTemplate = `
/** {{name}} */
export const {{ apiName }} = () => http<{{apiName}}Res>('{{path}}','{{method}}')
`

const DelTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http<{{apiName}}Res>(\`{{path}}\`,'{{method}}')
`

// Get无参数
export const noQueryAndPathParametersFn = Handlebars.compile(noQueryAndPathParameters)
export const noQueryAndPathParametersWxFn = Handlebars.compile(noQueryAndPathParametersWx)
// Get有参数
export const getPathParamsTemplateFn = Handlebars.compile(GetPathParamsTemplate)
export const getPathParamsTemplateWxFn = Handlebars.compile(GetPathParamsTemplateWx)

export const getQueryParamsTemplateFn = Handlebars.compile(GetQueryParamsTemplate)
export const getQueryParamsTemplateWxFn = Handlebars.compile(GetQueryParamsTemplateWx)

// Get两者都有参数(path,body)
export const getBodyTemplateWxFn = Handlebars.compile(GetBodyTemplate)

// Post无参数
export const postTemplateFn = Handlebars.compile(PostTemplate)
export const postTemplateWxFn = Handlebars.compile(PostTemplateWx)
// Post有参数
export const postPathParamsTemplateFn = Handlebars.compile(PostPathParamsTemplateFn)
export const postPathParamsTemplateWxFn = Handlebars.compile(PostPathParamsTemplateFnWx)
export const postQueryDataTemplateFn = Handlebars.compile(PostQueryDataTemplate)
export const postQueryDataTemplateWxFn = Handlebars.compile(PostQueryDataTemplateWx)
export const postBodyTemplateFn = Handlebars.compile(PostBodyTemplate)
export const postBodyTemplateWxFn = Handlebars.compile(PostBodyTemplateWx)
// Put
export const putTemplateFn = Handlebars.compile(PutTemplate)
// Delete
export const delTemplateFn = Handlebars.compile(DelTemplate)

// type,interface
const interfaceTemplate = `
export interface {{apiName}}Query {
  {{#each list}}
  /** {{description}} example: {{example}} */
  {{name}}{{#if required}}{{else}}?{{/if}}:{{convertTypeOnly}},
  {{/each}}
}
`

const interfaceReqBodyParamsTemplate = `
export interface {{apiName}}Req {
  {{#each list}}
  /** {{description}} example: {{example}} */
  {{name}}{{#if required}}{{else}}?{{/if}}:{{convertTypeOnly}},
  {{/each}}
}
`

export const interfaceTemplateFn = Handlebars.compile(interfaceTemplate)
export const interfaceReqBodyParamsTemplateFn = Handlebars.compile(interfaceReqBodyParamsTemplate)

const apifoxTemplate = `
import type {
  {{#each list}}
  {{this}},
  {{/each}}
} from './interface'
`

export const apifoxTemplateFn = Handlebars.compile(apifoxTemplate)

const anyType = `
export type {{apiName}} = any
`

const arrayType = `
export type {{apiName}} = {{apiName}}Item[]
`

const notObjectType = `
export type {{apiName}} = {{convertTypeOnly}}
`

// {{{convertMyType}}} 原文输出
const objectType = `
export interface {{apiName}} {
  {{#each list}}
  /** {{title}} {{description}} */
  {{keyName}}{{#if required}}{{else}}?{{/if}}:{{{convertMyType}}},
  {{/each}}
}
`

const Array_T = 'Array<{{itemType}}>'

export const anyTypeFn = Handlebars.compile(anyType)
export const arrayTypeFn = Handlebars.compile(arrayType)
export const notObjectTypeFn = Handlebars.compile(notObjectType)
export const objectTypeFn = Handlebars.compile(objectType)

export const arrayTypeTemplateFn = Handlebars.compile(Array_T)

// enum
const enumTemplateSource = `
  {{#if typeString}}
    export enum {{enumTypeName}} {
      {{#each enums}}
        {{this}} = "{{this}}",
      {{/each}}
    }
  {{else}}
    export type {{enumTypeName}} = {{#join enums " | "}}{{/join}}
  {{/if}}
`

export const enumTemplateFn = Handlebars.compile(enumTemplateSource)
