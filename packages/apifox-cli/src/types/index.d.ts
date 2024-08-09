import type { Template } from './enum'

export interface ApiFoxConfig {
  projectId: string | number
  Authorization: string
  output?: string
  importHttp?: string
  template?: Template
}

interface Folder {
  id: number
  name: string
  docId: number
  parentId: number
  projectBranchId: number
  shareSettings: null
  type: string
}

export interface FolderListItem {
  path: string
  pathArr: Array< string >
  id: number
  name: string
  docId: number
  parentId: number
  projectBranchId: number
  shareSettings: null
  type: string
}

export interface ApiInfoListItem {
  id: number
  name: string
  type: string
  method: string
  path: string
  folderId: number
  tags: Array< unknown >
  status: string
  responsibleId: number
  customApiFields: CustomApiFields$1Type
}

export interface ApiDetailFolder {
  key: string
  type: string
  name: string
  children: Array< Array< null > | null | null | null | null | null | null | null | null | null >
  folder: Folder
}

export type defaultApifoxConfig = Partial<ApiFoxConfig>

export interface ProcessedFolderItem extends Omit<FolderListItem, 'path'> {
  interfacesContentPath: string
  apiFunPath: string
  interfacesContent: string
  apiFunContent: string
  apiFunImportContent: string
  apiFunImportItems: string[]
  apiNames: any[]
}

export type CreaterOptionsType = 'api' | 'module' | 'all'

export interface createrOptions {
  type?: CreaterOptionsType
  prefixPath?: string
}

export interface SelectChoicesFolderIds { choicesFolderIds: number[], choicesApis?: number[] }
// import { type Method } from 'axios'
export type HttpMethodStrategy = (apiName?: string, path?: string, folderInfo?, item?) => string
