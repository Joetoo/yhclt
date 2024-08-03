#!/usr/bin/env node

// import { exec } from 'node:child_process'
// import color from 'picocolors'
// import { build } from 'vite'
// // import config from '../vite.config'

// build(config).then(() => {
//   exec('JoeFe-cli build-sass', (err, stdout, stderr) => {
//     if (!err) {
//       console.log('success', color.cyan(stdout.toString()))
//     } else {
//       console.log('err', color.red(stderr.toString()))
//     }
//   })
// })

import { componentsPath, run } from './index'

// 发布组件
export const publish = async () => {
  // 先给transitpkg升个版本
  await run('pnpm version patch', `${componentsPath}`)

  await run('npm publish --access=public', `${componentsPath}`)
}

// import { series } from 'gulp'
// import { publish } from './index'

// export default series(
//   async () => publish(),
// )
