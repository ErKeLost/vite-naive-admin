import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue';
import { sortRoute } from '@/utils/sort/sort'
import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')

// 获取路由列表
const contantRouterList: RouteRecordRaw[] = []
Object.values(modules).forEach((item) => {
  // 数组转 || 对象  需要结构  如果为空 则转为 空对象
  const routerObject = item.default || {}
  const routerItem = Array.isArray(routerObject) ? [...routerObject] : [routerObject]
  contantRouterList.push(...routerItem)
})
contantRouterList.sort(sortRoute)
console.log(contantRouterList)


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  routes: [...contantRouterList, ...routes],
  history: createWebHashHistory()
})

export default router
