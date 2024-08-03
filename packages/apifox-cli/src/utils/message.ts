import chalk from 'chalk'

// success
export const success = (msg: string) => {
  console.log(chalk.green(`✨ ${msg}`))
}

// info
export const info = (msg: string) => {
  console.log(chalk.yellow(`🛠️ ${msg}`))
}

// warning
export const warning = (msg: string) => {
  console.log(chalk.yellow(`⚠️ ${msg}`))
}

// error
export const error = (msg: string) => {
  console.log(chalk.red(`❌ ${msg}`))
}
