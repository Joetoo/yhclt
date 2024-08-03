// 顶部导航栏
export const nav = [
  { text: 'Guide', link: '/guide/index' },
  { text: 'Examples', link: 'Examples/markdown-examples' },
  // { text: '指南', link: '/guide/installation' },
  { text: '需求方案', link: '/02-需求方案' },
  // { text: '组件', link: 'https://localfile.galaxy-immi.com/fe-ui-doc/' },
  { text: '插件,库', link: '/plugins/index' },
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
]

// 侧边栏
export const sidebar = {
  '/standard/': [
    // ...getSource('standard', '规范'),
    {
      text: '规范导读',
      link: '/standard/vue3-pre',
    },
    {
      text: 'Vue3规范',
      link: '/standard/vue3',
    },
    {
      text: '微信小程序规范',
      link: '/standard/miniapp',
    },
    {
      text: 'javascript规范',
      link: '/standard/javascript',
    },
    {
      text: 'git工作流规范',
      link: '/standard/git-workflow',
    },
    {
      text: '命名规范',
      link: '/standard/name',
    },
  ],
}
// {
//   text: '需求方案',
//   items: [{ text: '需求方案', link: '需求方案/demand-schemes' }]
// },
// // ... 其他路径的侧边栏配置
// {
//   text: '函数工具',
//   items: [
//     { text: 'utils', link: '函数工具/utils' },
//     { text: 'Hooks', link: '函数工具/hooks' }
//   ]
// }
// '/需求方案/demand-schemes/':[
//   {
//     title: '需求方案',
//     collapsable: false,
//     children: [
//       // '',
//       // '需求方案/utils/utility1',
//       // '需求方案/hooks/hook1',
//       // ... 其他需求方案页面
//     ],
//   },
// ]
// 社交链接
export const socialLinks = [
  // gitee
  {
    icon: {
      svg: '<svg t="1704626282666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4228"></path></svg>',
    },
    link: 'https://gitee.com/template_pro/yhclt',
  },
]
