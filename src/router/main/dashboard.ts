import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/utils/index'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */

const routes: RouteRecordRaw[] = [
  {
    path: '/main',
    name: 'dashboard',
    redirect: '/main/analysis/dashboard',
    component: Layout,
    meta: {
      title: '系统总览',
      url: '/main/analysis/dashboard',
      icon: renderIcon(DashboardOutlined)
    },
    children: [
      {
        path: '/main/analysis/dashboard',
        name: 'analysis-dashboard',
        meta: {
          title: '主控台',
          url: '/main/analysis/dashboard'
        },
        component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
      },
      {
        path: '/main/analysis/overview',
        name: 'analysis-overview',
        meta: {
          title: '工作台',
          url: '/main/analysis/overview'
        },
        component: () => import('@/views/main/analysis/overview/overview.vue')
      },
    ]
  }
]
export default routes

