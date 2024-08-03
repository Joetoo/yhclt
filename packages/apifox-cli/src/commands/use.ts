import { info } from '../utils/message.js'

const instructions = [
  `第一步:在项目根目录运行 apifox-cli init`,
  `第二步:运行 apifox-cli create --type=<type> 创建 ts 文件,type 可选: all、module、api`,
  `第三步:如果生成的文件有问题可以跟后端确认 apifox 文档是否规范`,
]
export default async function use() {
  for (const instruction of instructions) {
    info(instruction)
  }
}
