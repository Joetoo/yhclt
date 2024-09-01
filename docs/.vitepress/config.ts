import { defineConfig } from 'vitepress'
import { nav, sidebar } from './utils/index'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/yhclt/',
  title: '萤火虫MIT-FE',
  description: '前端物料库',
  srcDir: 'src',
  themeConfig: {
    // logo: '/logo.png',
    // 开启搜索
    search: { provider: 'local' },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Joetoo/yhclt' },
    ],
  },
})
