import { RouteRecordRaw, Router } from 'vue-router'
import { sortRoute } from '@/utils/sort/sort'

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
