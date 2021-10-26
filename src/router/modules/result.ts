import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { CheckCircleOutlined } from '@vicons/antd'
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
const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: '结果页',
      icon: renderIcon(CheckCircleOutlined),
      sort: 4
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: '成功页',
          url: '/main/success'
        },
        component: () => import('@/views/modules/result/success/index.vue')
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: {
          title: '失败页',
          url: '/main/fail'
        },
        component: () => import('@/views/modules/result/fail/index.vue')
      },
      {
        path: 'info',
        name: 'result-info',
        meta: {
          title: '信息页',
          url: '/main/info'
        },
        component: () => import('@/views/modules/result/info/index.vue')
      }
    ]
  }
]

export default routes
