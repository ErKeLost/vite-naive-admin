import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import { sortRoute } from '@/utils/sort/sort'
import { RouteRecordRaw } from 'vue-router'
const modules = import.meta.globEager('./modules/**/*.ts')

// 获取路由列表
const constantRouterList: RouteRecordRaw[] = []
Object.values(modules).forEach((item) => {
  // 数组转 || 对象  需要结构  如果为空 则转为 空对象
  const routerObject = item.default || {}
  const routerItem = Array.isArray(routerObject) ? [...routerObject] : [routerObject]
  constantRouterList.push(...routerItem)
})
const constRouter = []
constantRouterList.sort(sortRoute)
for (var item of constantRouterList) {
  if (item.children) {
    constRouter.push(item.children)
    for (var li of item.children) {
      // constRouter.push(li.children)
      if (li.children) {
        constRouter.push(li.children)
      }
    }
  }
}
console.log(constRouter)
const arr = constRouter.flat()
console.log(constRouter.flat())

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/login/index.vue')
      }
    ]
  },
]

const router = createRouter({
  routes,
  // routes,
  history: createWebHashHistory()
})
arr.forEach((route) => {
  router.addRoute('main', route)
})
// router.addRoute('main', constantRouterList)
console.log(router.options.routes)

router.beforeEach((to, form) => {
  // if (form.path === '/login') {
  // }
  if (to.path !== '/login') {
    if (!localStorage.getItem('TOKEN')) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    // return '/main/analysis/overview'
  }
})

export { constantRouterList }
export default router
