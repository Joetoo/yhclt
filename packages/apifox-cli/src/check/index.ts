import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { defaultConfig, supportedModules } from '../constants/constants.js'
import type { ApiFoxConfig } from '../types/index.js'
import { error } from '../utils/message.js'

const require = createRequire(import.meta.url)

// 默认值校验
const applyDefaultConfig = (config: ApiFoxConfig) => {
  Object.keys(defaultConfig).forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!config.hasOwnProperty(key) || !config[key]) {
      config[key] = defaultConfig[key]
    }

    if (key === 'module' && !supportedModules.includes(config.module)) {
      console.error(`配置项"module"的值"${config.module}"无效，应为${supportedModules.join(' 或 ')}`)
      process.exit(1)
    }
  })
}

export const getConfig = async () => {
  const cwd = process.cwd()
  const configPath = path.resolve(cwd, 'apifox.config.cjs')

  const config = {}
  const exists = existsSync(configPath)

  if (!exists) {
    error('apifox.config.cjs 文件不存在, 请先执行 apifox-cli init')
    process.exit(1)
  }

  const apifoxConfigContent = require(configPath)
  Object.assign(config, apifoxConfigContent)

  applyDefaultConfig(config as ApiFoxConfig)

  const missingConfigs = ['Authorization', 'projectId'].filter(key => !config[key]).join(', ')

  if (missingConfigs.length > 0) {
    const errorMessage = `配置文件[apifox.config.cjs]中缺少以下配置: ${missingConfigs},请检查并配置`
    error(errorMessage)
    process.exit(1)
  }

  return { config, exists }
}
