import { h, unref, computed } from 'vue'
import type { App, Plugin } from 'vue'
import { NIcon, NTag } from 'naive-ui'
import { PageEnum } from '@/enums/pageEnum'
import { isObject } from './is/index'
import { cloneDeep } from 'lodash-es'
import { RouteRecordRow } from 'vue-router'
import { getAllRouter, _recurseClidrenRouter, createRouterGuards } from '@/hooks/router/index'
import {
  DashboardOutlined,
  BellOutlined,
  AccountBookOutlined,
  WechatOutlined
} from '@vicons/antd'
import { renderIcon } from '@/utils'

/**
 * render 图标
 * */
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * render new Tag
 * */
const newTagColors = { color: '#f90', textColor: '#fff' }
export function renderNew(type = 'warning', text = 'vue-adny', color: object = newTagColors, bordered = false) {
  return () =>
    h(
      NTag as any,
      {
        type,
        round: true,
        size: 'small',
        color,
        bordered
      },
      { default: () => text }
    )
}
export function renderCli(type = 'info', text = 'adny-cli', color: object = newTagColors, bordered = false) {
  return () =>
    h(
      NTag as any,
      {
        type,
        round: true,
        size: 'small',
        color,
        bordered
      },
      { default: () => text }
    )
}

/**
 * 递归组装菜单格式
 */
export function generatorMenuDynamic(routerList: any[]) {
  const routes: RouteRecordRow[] = []
  // // 生成菜单
  const result = generateDynamic(routerList)
  return result
}
const iconList = [
  renderIcon(DashboardOutlined),
  renderIcon(BellOutlined),
  renderIcon(AccountBookOutlined),
  renderIcon(WechatOutlined)
]
export function generateDynamic(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item, index) => {
    const currentMenu: any = {
      // ...item,
      name: item.name,
      label: item.name,
      icon: item.type === 1 ? iconList[index] : null,
      fullPath: item.url,
      url: item.url,
      title: item.name,
      meta: {
        title: item.name
      }
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0 && item.type !== 2) {
      // Recursion
      currentMenu.children = generateDynamic(item.children)
    }
    return currentMenu
  })
}


export function generatorMenu(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item)
    const info = isRoot ? item.children[0] : item
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
      icon: isRoot ? item.meta?.icon : info.meta?.icon,
      url: item.meta?.url,
      fullPath: item.meta?.url,
      name: item.label
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = generatorMenu(info.children)
    }
    return currentMenu
  })
}

/**
 * 混合菜单
 * */
export function generatorMenuMix(routerMap: Array<any>, routerName: string, location: string) {
  const cloneRouterMap = cloneDeep(routerMap)
  const newRouter = filterRouter(cloneRouterMap)
  if (location === 'header') {
    const firstRouter: any[] = []
    newRouter.forEach((item) => {
      const isRoot = isRootRouter(item)
      const info = isRoot ? item.children[0] : item
      info.children = undefined
      const currentMenu = {
        ...info,
        ...info.meta,
        label: info.meta?.title,
        key: info.name
      }
      firstRouter.push(currentMenu)
    })
    return firstRouter
  } else {
    return getChildrenRouter(newRouter.filter((item) => item.name === routerName))
  }
}

/**
 * 递归组装子菜单
 * */
export function getChildrenRouter(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item)
    const info = isRoot ? item.children[0] : item
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = getChildrenRouter(info.children)
    }
    return currentMenu
  })
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(item) {
  return item.meta?.alwaysShow != true && item.children?.length === 1
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>) {
  return routerMap.filter((item) => {
    return (
      (item.meta?.hidden || false) != true &&
      !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    )
  })
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 *  找到对应的节点
 * */
let result = null
export function getTreeItem(data: any[], key?: string | number): any {
  data.map((item) => {
    if (item.key === key) {
      result = item
    } else {
      if (item.children && item.children.length) {
        getTreeItem(item.children, key)
      }
    }
  })
  return result
}

/**
 *  找到所有节点
 * */
const treeAll: any[] = []
export function getTreeAll(data: any[]): any[] {
  data.map((item) => {
    treeAll.push(item.key)
    if (item.children && item.children.length) {
      getTreeAll(item.children)
    }
  })
  return treeAll
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}


// 获取 全局主题

