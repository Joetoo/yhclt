import path from 'node:path'
import { existsSync, writeFileSync } from 'node:fs'
import { initTemplateFn } from '../constants/constants.js'
import { error, success, warning } from '../utils/message.js'

const init = () => {
  // 当前运行node命令的目录
  const cwd = process.cwd()
  const configPath = path.resolve(cwd, 'apifox.config.cjs')

  // eslint-disable-next-line style/max-statements-per-line
  if (existsSync(`${configPath}`)) { return warning('apifox.config.cjs 文件已存在, 您可能想使用 apifox-cli create 创建最新apifox ts定义文件?') }

  const fileContent = initTemplateFn({})

  try {
    writeFileSync(configPath, fileContent)
    success(`成功生成配置文件,请查看:${configPath}文件`)
  } catch (err) {
    error(err.message)
  }
}

export default init
