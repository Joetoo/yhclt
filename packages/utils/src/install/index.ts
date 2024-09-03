import { NOOP } from '@vue/shared'
import type { App, AppContext, Component, Directive, Plugin } from 'vue'
import { createApp } from 'vue'

export type SFCWithInstall<T> = T & Plugin
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    ;(fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
  ;(directive as SFCWithInstall<T>).install = (app: App): void => {
    app.directive(name, directive)
  }

  return directive as SFCWithInstall<T>
}

export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}

/**
 * 创建命名空间 bem规范
 *
 * @param name 命名空间名称
 * @returns 返回由命名空间前缀和 bem 函数组成的元组
 */
export function createNamespace(name: string): [string, (...mods: string[]) => string] {
  // 如果 name 是 button，则前缀将是 yh-button
  const prefixedName = `yh-${name}`

  const bem = (...mods: string[]) => {
    const classNames: string[] = []
    if (mods) {
      mods.forEach((mod) => {
        if (mod) {
          if (mod.startsWith('__')) {
            return classNames.push(`${prefixedName}${mod}`)
          } else {
            return classNames.push(`${prefixedName}--${mod}`)
          }
        }
      })
    }
    return classNames.join(' ')
  }

  // 使用 bem 函数生成类名
  // const blockClass = bem() // 'yh-button'
  // const elementClass = bem('text') // 'yh-button--text'
  // const modifierClass = bem('__active') // 'yh-button__active'

  // 可以这样使用生成的类名
  // const elementWithModifier = bem('text', '__active') // 'yh-button--yh-text yh-button__active'

  return [prefixedName, bem]
}

export function mountComponent<T>(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root) as T,
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
  }
}
