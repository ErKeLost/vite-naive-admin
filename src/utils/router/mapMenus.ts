import { RouteRecordRow } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { Layout } from '@/router/constant'

export function mapMenusToRoutes(userMenus: any): RouteRecordRow[] {
  const routes: RouteRecordRow[] = []

  // 先加载默认所有的router
  const allRoutes: RouteRecordRow[] = []
  const mainRouterFile = import.meta.globEager('../../router/main/**/*.ts')
  Object.values(mainRouterFile).forEach((key) => {
    allRoutes.push(...key.default)
  })
  // 根据菜单获取的router添加
  // 递归获取路由
  function _recurseGetRouter(menus: any[], allRoutes: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.meta.url === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRouter(menu.children, allRoutes)
      }
    }
  }
  _recurseGetRouter(userMenus, allRoutes)
  return routes
}
export function filterRouter(routerMap: Array<any>) {
  return routerMap.filter((item) => {
    return (
      (item.meta?.hidden || false) != true &&
      !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    )
  })
}
