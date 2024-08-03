import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { decode, encode } from 'ini'
import { configPath, defaultConfig } from '../constants/constants.js'

export const getAllConfig = () => {
  const config = {} // 所有的配置信息
  const exists = existsSync(configPath)

  if (exists) {
    const userConfig = decode(readFileSync(configPath, 'utf-8'))
    Object.assign(config, defaultConfig, userConfig)
  }

  return {
    exists,
    config,
  }
}

export default async function config(value, options) {
  console.log('config', value, options)

  const { exists, config } = getAllConfig()
  const action = Object.keys(options)[0]
  const key = options[action]

  if (action === 'get') {
    console.log('config get', key, config[key])
  } else if (action === 'set') {
    config[key] = value
    writeFileSync(configPath, encode(config))
  } else if (action === 'delete') {
    console.log('config delete', config)
    delete config[key]
    if (exists) {
      writeFileSync(configPath, encode(config))
    }
  }
}
