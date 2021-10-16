import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { TableOutlined } from '@vicons/antd'
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
    path: '/main/list',
    name: 'List',
    redirect: 'main/list/basic-list',
    meta: {
      title: '列表页',
      icon: renderIcon(TableOutlined),
      sort: 2
    },
    children: [
      {
        path: '/main/list/basic-list',
        name: 'basic-list',
        meta: {
          title: '查询表格',
          url: '/main/list/basic-list'
        },
        component: () => import('@/views/modules/list/basicList/index.vue')
      },
      {
        path: '/main/list/static-list',
        name: 'static-list',
        meta: {
          title: '标准列表',
          hidden: false,
          activeMenu: 'static-list',
          url: '/main/list/static-list'

        },
        component: () => import('@/views/modules/list/staticList/index.vue')
      },
      {
        path: '/main/list/card-list',
        name: 'card-list',
        meta: {
          title: '卡片列表',
          hidden: false,
          activeMenu: 'card-list',
          url: '/main/list/card-list'
        },
        component: () => import('@/views/modules/list/cardList/index.vue')
      }
    ]
  }
]

export default routes
