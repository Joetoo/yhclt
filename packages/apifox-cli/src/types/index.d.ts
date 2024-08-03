import type { Module, Template } from './enum'

export interface ApiFoxConfig {
  module?: Module
  projectId: string | number
  Authorization: string
  output?: string
  importHttp?: string
  template?: Template
}

export type defaultApifoxConfig = Partial<ApiFoxConfig>

export interface FolderItem {
  path: string
  pathArrEn: string[]
  pathArr: string[]
  nameEn: string
  id: number
  name: string
  docId: number
  parentId: number
  projectBranchId: number
  type: 'http'
}

export interface ProcessedFolderItem extends Omit<FolderItem, 'path'> {
  interfacesContentPath: string
  apiFunPath: string
  interfacesContent: string
  apiFunContent: string
  apiFunImportContent: string
  apiFunImportItems: string[]
  apiNames: any[]
}

export interface createrOptions {
  type?: 'api' | 'module' | 'all'
  prefixPath?: string
}
// import { type Method } from 'axios'
export type HttpMethodStrategy = (apiName?: string, path?: string, folderInfo?, item?) => string
