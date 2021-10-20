import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { getAllRouter, _recurseClidrenRouter, createRouterGuards } from '@/hooks/router/index'

// 定义module模块  和  路由
const modules = import.meta.globEager('./modules/**/*.ts')
const constRouter: any[] = []
// 获取路由列表
const constantRouterList: RouteRecordRaw[] = []
// 拿到 路由 进行递归
const constantRouter = getAllRouter(modules, constantRouterList)
// 获取需要添加到路由中的 所有路由
const fiallyRouter = _recurseClidrenRouter(constantRouter, constRouter)


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
        path: 'loginview',
        component: () => import('../views/login/index.vue')
      }
    ]
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export { constantRouterList, fiallyRouter }
export function setupRouter(app: App) {
  app.use(router)
  createRouterGuards(router)
}
export default router
