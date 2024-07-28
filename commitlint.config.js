// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    // 'body-leading-blank': [2, 'always'], // 主体前有空行，默认就是 always
    // 'footer-leading-blank': [2, 'always'], // 末行前有空行，默认就是 always
    // 'header-max-length': [2, 'always', 108], // 首行最大长度，默认就是 always,72
    // 'subject-empty': [2, 'never'], // 标题不可为空，默认就是 never
    // 'type-empty': [2, 'never'], // 类型不可为空，默认就是 never
    'type-enum': [
      2,
      'always',
      [
        'build', // 构造工具、外部依赖（webpack、npm）
        'chore', // 不涉及 src、test 的其他修改（构建过程或辅助工具的变更）
        'ci', // 修改项目继续集成流程（Travis，Jenkins，GitLab CI，Circle等）
        'docs', // 文档
        'feat', // 新增功能
        'fix', // bug 修复
        'perf', // 性能优化
        'refactor', // 重构
        'revert', // 回退
        'style', // 代码风格（不影响代码含义）
        'test', // 测试
        // 下面几个是自定义新增的
        'init', // 初始化
        'wip', // 开发中
        'refine', // 小优化，没有到 refactor 的程度
        'workflow', // 工作流改进
        'mod', // 不确定分类的修改
        'types', // 类型修改
        'release', // 版本发布
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前(可选):',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:       🚀  新增功能', emoji: '🚀' },
      { value: 'fix', name: 'fix:        🧩  修复缺陷', emoji: '🧩' },
      { value: 'docs', name: 'docs:       📚  文档变更', emoji: '📚' },
      { value: 'style', name: 'style:      🎨  代码风格（不影响代码含义）', emoji: '🎨' },
      { value: 'refactor', name: 'refactor:   ♻️  重构(既不是增加feature,也不是修复bug)', emoji: '♻️' },
      { value: 'perf', name: 'perf:      ⚡️  性能优化', emoji: '⚡️' },
      { value: 'test', name: 'test:       ✅  测试', emoji: '✅' },
      {
        value: 'build',
        name: 'build:      📦️  打包',
        emoji: '📦️',
      },
      { value: 'mod', name: 'mod:    不确定分类的修改' },
      { value: 'wip', name: 'wip:      开发中' },
      { value: 'workflow', name: 'workflow: 工作流改进' },
      { value: 'types', name: 'types:    类型修改' },
      { value: 'release', name: 'release:  版本发布' },
      { value: 'refine', name: 'refine:    小优化，没有到 refactor 的程度' },
      { value: 'ci', name: 'ci:         🎡  修改项目继续集成流程(Travis,Jenkins,GitLab CI,Circle等)', emoji: '🎡' },
      { value: 'revert', name: 'revert:     ⏪️  回滚 commit', emoji: '⏪️' },
      { value: 'chore', name: 'chore:      🔨  不涉及 src、test 的其他修改（构建过程或辅助工具的变更）', emoji: '🔨' },
    ],
    useEmoji: true,
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
}
