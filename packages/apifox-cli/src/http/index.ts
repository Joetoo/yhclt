import axios from 'axios'
import type { ApiFoxConfig } from '../types/index.js'

const baseURL = 'https://api.apifox.cn/api/v1'

export const createHttp = (config: ApiFoxConfig) => {
  return axios.create({
    baseURL,
    timeout: 30 * 1000, // 超时限制 30秒,
    headers: {
      'Authorization': config.Authorization,
      'X-Client-Version': '2.2.43-alpha.1',
      'X-Project-Id': Number(config.projectId),
    },
  })
}
