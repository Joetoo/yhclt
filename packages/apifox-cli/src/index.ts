#!/usr/bin/env node
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { program } from 'commander'
import chalk from 'chalk'

const _filename = fileURLToPath(import.meta.url)
const __dirname = dirname(_filename)
const require = createRequire(import.meta.url)

const pkg = require(join(__dirname, '../package.json'))

// 修改帮助信息的首行展示
program.usage('<command> [options]')
// 版本号
program.version(pkg.version)

// use
program
  .command('use')
  .description('如何使用apifox-cli')
  .action(async () => {
    (await import('./commands/use.js')).default()
  })

// init
program
  .command('init')
  .description('初始化apifox.config.cjs配置文件')
  .action(async () => {
    (await import('./commands/init.js')).default()
  })

// create
program
  .command('create')
  .description('生成interface.ts和apifox.ts 文件')
  .option('-T, --type <type>', '1、all:创建所有接口;2、module:按文件夹模块创建;3、api:按api创建')
  .option('-P --prefixPath <prefixPath>', '给接口path加前缀')
  .action(async (options) => {
    ; (await import('./commands/create.js')).default(options)
  })

// help 提示
program.addHelpText('after', `\nRun ${chalk.cyan('apifox-cli <command> --help')} for detailed usage of given command.`)

// 直接解析用户的命令行参数
program.parse(process.argv)
