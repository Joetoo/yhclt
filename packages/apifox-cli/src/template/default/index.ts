import Handlebars from 'handlebars'

// 无任何参数
const noQueryAndPathParameters = `
/** {{name}} */
export const {{ apiName }} = () => http.{{method}}<{{apiName}}Res>('{{path}}')
`

// 并且最后一个入参不需要逗号
const GetPathParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http.{{method}}<{{apiName}}Res>(\`{{path}}\`)
`

const GetQueryParamsTemplate = `
/** {{name}} */
export const {{ apiName }} = (params: {{apiName}}Query) => {
  return http.{{method}}<{{apiName}}Res>('{{path}}',params)
}
`

// Get两者都有参数(path,body)
const GetBodyTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}},{{/each}} data: {{apiName}}Req) => {
  return http.{{method}}<{{apiName}}Res>({
    url: \`{{path}}\`,
    data,
  })
}
`

const PostTemplate = `
/** {{name}} */
export const {{ apiName }} = () => http.{{method}}<{{apiName}}Res>('{{path}}')
`

const PostPathParamsTemplateFn = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http.{{method}}<{{apiName}}Res>(\`{{path}}\`)
`

const PostQueryDataTemplate = `
/** {{name}} */
export const {{ apiName }} = (data: {{apiName}}Req) => http.{{method}}<{{apiName}}Res>('{{path}}',data)
`

// Post两者都有参数(path,body)
const PostBodyTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}},{{/each}} data: {{apiName}}Req) => {
  return http.{{method}}<{{apiName}}Res>(\`{{path}}\`,data)
}
`

const PutTemplate = `
/** {{name}} */
export const {{ apiName }} = () => http.{{method}}<{{apiName}}Res>('{{path}}')
`

const DelTemplate = `
/** {{name}} */
export const {{ apiName }} = ({{#each list}}{{name}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}) => http.{{method}}<{{apiName}}Res>(\`{{path}}\`)
`

// Get无参数
export const noQueryAndPathParametersFn = Handlebars.compile(noQueryAndPathParameters)
// Get有参数
export const getPathParamsTemplateFn = Handlebars.compile(GetPathParamsTemplate)

export const getQueryParamsTemplateFn = Handlebars.compile(GetQueryParamsTemplate)

// Get两者都有参数(path,body)
export const getBodyTemplateWxFn = Handlebars.compile(GetBodyTemplate)

// Post无参数
export const postTemplateFn = Handlebars.compile(PostTemplate)
// Post有参数
export const postPathParamsTemplateFn = Handlebars.compile(PostPathParamsTemplateFn)
export const postQueryDataTemplateFn = Handlebars.compile(PostQueryDataTemplate)
export const postBodyTemplateFn = Handlebars.compile(PostBodyTemplate)
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
