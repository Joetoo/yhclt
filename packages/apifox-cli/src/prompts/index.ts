// import { checkbox, select } from '@inquirer/prompts'
import inquirer from 'inquirer'
import searchCheckbox from 'inquirer-search-checkbox'
import inquirerPrompt from 'inquirer-autocomplete-prompt'

inquirer.registerPrompt('searchCheckbox', searchCheckbox)
inquirer.registerPrompt('inquirerPrompt', inquirerPrompt)

/** 按文件夹模块多选，只有一层 */
export const askFoldersModules = async (folderList) => {
  const folderModules = folderList.map(item => ({
    name: `${item.path}【${item.pathArr?.join('/')}】`,
    value: item.id,
  }))

  // 可搜索多选模式
  const multiplePrompt = [
    {
      type: 'searchCheckbox',
      name: 'checkModule',
      message: '请输入关键字搜索,【多选】请选择文件夹模块,【不会更新子文件夹】',
      choices: folderModules,
    },
  ]

  const answer = await inquirer.prompt(multiplePrompt)
  return answer.checkModule
}

/** 按api级别多选，每次单选一个父级文件夹直到最内层 */
export const askApis = async (folderList, apiInfoList) => {
  const folderModules = folderList.map(item => ({
    name: `${item.path}【${item.pathArr?.join('/')}】`,
    value: item.id,
  }))

  const { folderId } = await inquirer.prompt([
    {
      type: 'inquirerPrompt',
      name: 'folderId',
      message: '【单选】请选择一个文件夹模块',
      source: (_answersSoFar, input) => {
        return input ? folderModules.filter(item => item.name.includes(input)) : folderModules
      },
    },
  ])

  const apiCheckboxList = apiInfoList
    .filter(item => item.folderId === folderId)
    .map(item => ({
      name: `${item.name}（${item.method}: ${item.path}）`,
      value: item.id,
    }))

  const multipleApiPrompt = [
    {
      type: 'checkbox',
      name: 'checkApi',
      message: '【多选】请选择需要更新的api',
      choices: apiCheckboxList,
    },
  ]

  const { checkApi: choicesApis } = await inquirer.prompt(multipleApiPrompt)

  return {
    choicesFolderId: folderId,
    choicesApis,
  }
}
