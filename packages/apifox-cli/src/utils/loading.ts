import ora from 'ora'

export const loading = async (msg: string, fn: () => Promise<any>) => {
  const spinner = ora(`🛠️ 正在${msg},请稍后...`)
  spinner.start()
  try {
    const result = await fn()
    spinner.succeed(`${msg}成功`)
    return result
  } catch (error) {
    spinner.fail(`${msg}失败`)
    console.log('fetchFolderList-error', error)
    throw error
  }
}
