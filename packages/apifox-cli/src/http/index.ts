import { createRequire } from 'node:module'
import axios from 'axios'

const require = createRequire(import.meta.url)

const baseURL = 'https://api.apifox.cn/api/v1'

export const createHttp = (config) => {
  return axios.create({
    baseURL,
    timeout: 30 * 1000, // 超时限制 30秒,
    headers: {
      'Authorization': config.Authorization,
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US',
      'Access-Control-Allow-Origin': '*',
      'Connection': 'keep-alive',
      'Host': 'api.apifox.cn',
      'Origin': 'https://app.apifox.com',
      'Pragma': 'no-cache',
      'Referer': 'https://app.apifox.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      'X-Client-Mode': 'web',
      'X-Client-Version': '2.2.43-alpha.1',
      'X-Device-Id': 'b46f74b2-61eb-4b54-b611-26fa694bebd1',
      'X-Project-Id': `${config.projectId}`,
      'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
    },
  })
}
