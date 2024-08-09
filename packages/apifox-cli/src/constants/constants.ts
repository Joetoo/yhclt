import Handlebars from 'handlebars'
import { Module, Template } from '../types/enum.js'

// 默认的生成目录
export const DEFAULT_OUTPUT_PATH = 'src/api'
export const DEFAULT_IMPORT_HTTP = `import { http } from '@/utils/http'`

export const defaultConfig = {
  // 用户可以通过命令行来配置
  module: Module.Web,
  output: DEFAULT_OUTPUT_PATH,
  importHttp: DEFAULT_IMPORT_HTTP,
  template: Template.Default,
}

export const configPath = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.hcrc`

// 默认的模式
export const supportedModules = ['web', 'wx']
export const ParamsTypes = ['application/x-www-form-urlencoded', 'multipart/form-data']
export const JsonTypes = ['application/json']
export const HasReqBodyMethods = ['post', 'put', 'patch', 'delete']

const initTemplate = `
module.exports = {
  module: 'web', // web | wx
  projectId: 1234567, // (项目id 只支持一个projectId)
  output: 'src/api',
  importHttp: '',
  template: 'default',
  // 如果Authorization过期,访问https://app.apifox.com/main从某个接口的请求头里面copy
  Authorization: '',
}
`

export const initTemplateFn = Handlebars.compile(initTemplate)
