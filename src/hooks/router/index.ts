import { RouteRecordRaw, Router } from 'vue-router'
import { sortRoute } from '@/utils/sort/sort'
import { PageEnum } from '@/enums/pageEnum'


// 获取全部路由对象
export function getAllRouter(fileList: [], routerList: RouteRecordRaw[]) {
  Object.values(fileList).forEach((item) => {
    // 数组转 || 对象  需要结构  如果为空 则转为 空对象
    const routerObject = item.default || {}
    const routerItem = Array.isArray(routerObject) ? [...routerObject] : [routerObject]
    routerList.push(...routerItem)
  })
  return routerList.sort(sortRoute)
}

// 获取全部路由路径
export function _recurseClidrenRouter(routerList: RouteRecordRaw[], saveRouter: []) {
  for (var item of routerList) {
    if (item.children) {
      saveRouter.push(item.children)
      _recurseClidrenRouter(item.children, saveRouter)
    }
  }
  return saveRouter.flat()
}

// 添加路由
export function createAddRouter(router: Router, rootRouter: string, allRoute: RouteRecordRaw[]) {
  allRoute.forEach((route) => {
    router.addRoute(rootRouter, route)
  })
}

export function createRouterGuards(router: Router) {
  router.beforeEach((to, form) => {
    if (to.path !== '/login') {
      if (!localStorage.getItem('TOKEN')) {
        return '/login'
      }
    }
    if (to.path === '/main') {
      return '/main/analysis/overview'
    }
  })
}


export function mapMenusToRoutes(userMenus: any): RouteRecordRow[] {
  const routes: RouteRecordRow[] = []

  // 先加载默认所有的router
  const allRoutes: RouteRecordRow[] = []
  const mainRouterFile = import.meta.globEager('../../router/main/**/*.ts')
  Object.values(mainRouterFile).forEach((key) => {
    allRoutes.push(key.default)
  })
  // 根据菜单获取的router添加
  // 递归获取路由
  function _recurseGetRouter(menus: any[], allRoutes: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRouter(menu.children, allRoutes)
      }
    }
  }
  _recurseGetRouter(userMenus, allRoutes)
  // 返回 当前 账户 能 拿到的 路由
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
