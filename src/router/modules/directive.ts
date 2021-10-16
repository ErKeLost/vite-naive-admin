import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { OptionsSharp } from '@vicons/ionicons5'
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
    path: '/main/directive',
    name: 'directive',
    redirect: '/main/directive/ripple',
    meta: {
      title: '指令',
      icon: renderIcon(OptionsSharp),
      sort: 9
    },
    children: [
      {
        path: '/main/directive/ripple',
        name: 'directive_ripple',
        meta: {
          title: '水波纹',
          url: '/main/directive/ripple'
        },
        component: () => import('@/views/main/directive/ripple/ripple.vue')
      },
      {
        path: '/main/directive/permission',
        name: 'directive_permission',
        meta: {
          title: '权限',
          url: '/main/directive/permission'
        },
        component: () => import('@/views/main/directive/permission/permission.vue')
      }
    ]
  }
]

export default routes
