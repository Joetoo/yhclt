// @see: https://vitepress-sidebar.jooy2.com/
import { generateSidebar } from 'vitepress-sidebar'

// 顶部导航栏
export const nav = [
  { text: '工具', link: '/tools/Get Start/installation' },
  { text: '需求方案', link: '/demand-plan' },
  { text: 'YhUI', link: '' },
  { text: '开发规范', link: '/standard/index' },
  {
    text: '相关链接',
    items: [
      {
        text: 'OpenAI',
        items: [
          // AI组的子链接
          { text: 'chatGpt', link: 'https://chat.openai.com/' },
          { text: 'kimi', link: 'https://kimi.moonshot.cn/' },
          // 更多AI组链接...
        ],
      },
      {
        text: 'Vue',
        items: [
          // 其他组的子链接
          { text: '其他组链接1', link: 'https://example.com/other-group-1' },
          { text: '其他组链接2', link: 'https://example.com/other-group-2' },
          // 更多其他组链接...
        ],
      },
      {
        text: 'React',
        items: [
          // 其他组的子链接
          { text: '其他组链接1', link: 'https://example.com/other-group-1' },
          { text: '其他组链接2', link: 'https://example.com/other-group-2' },
          // 更多其他组链接...
        ],
      },
      // 可以继续添加更多的分类和链接
    ],
  },
  { text: 'examples', link: '/examples/api-examples' },
]

// 侧边栏
export const sidebar = generateSidebar([
  {
    documentRootPath: 'docs/src',
    scanStartPath: 'tools',
    resolvePath: '/tools/',
    useTitleFromFrontmatter: true,
    manualSortFileNameByPriority: ['Get Start', 'hooks', 'utils', 'cli', 'plugins'],
    collapsed: false,
  },
  {
    documentRootPath: 'docs/src',
    scanStartPath: 'demand-plan',
    resolvePath: '/demand-plan/',
    useTitleFromFrontmatter: true,
  },
  {
    documentRootPath: 'docs/src',
    scanStartPath: 'examples',
    resolvePath: '/examples/',
    useTitleFromFrontmatter: true,
  },
])
