import { resolve } from 'node:path'

import { spawn } from 'node:child_process'

// 组件库根目录
export const componentsPath = resolve(__dirname, '../../')

export const run = async (command: string, path: string) => {
  const [cmd, ...args] = command.split(' ')
  return new Promise((resolve, reject) => {
    const app = spawn(cmd, args, {
      cwd: path, // 在哪执行
      stdio: 'inherit', // 输出共享给父进程
      shell: true, // mac不需要开启，windows下git base需要开启支持
    })
    app.on('close', resolve)
  })
}
