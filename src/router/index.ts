import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import { sortRoute } from '@/utils/sort/sort'
import { RouteRecordRaw } from 'vue-router'
import { setUpLoginStore } from '@/hooks/menu/useMenu'
const modules = import.meta.globEager('./modules/**/*.ts')

// 获取路由列表
const constantRouterList: RouteRecordRaw[] = []
Object.values(modules).forEach((item) => {
  // 数组转 || 对象  需要结构  如果为空 则转为 空对象
  const routerObject = item.default || {}
  const routerItem = Array.isArray(routerObject) ? [...routerObject] : [routerObject]
  constantRouterList.push(...routerItem)
})
constantRouterList.sort(sortRoute)
// console.log(constantRouterList)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  routes: [...routes, ...constantRouterList],
  // routes,
  history: createWebHashHistory()
})
router.beforeEach((to, form) => {
  // if (form.path === '/login') {
  setUpLoginStore()
  // }
  if (to.path !== '/login') {
    if (!localStorage.getItem('TOKEN')) {
      return '/login'
    }
  }
})
console.log(router)

export { constantRouterList }
export default router
