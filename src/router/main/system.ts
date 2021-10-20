import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { SettingOutlined } from '@vicons/antd'
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
    path: '/main/system',
    name: 'system',
    redirect: '/main/system/user',
    component: Layout,
    meta: {
      title: '系统管理',
      url: '/main/system/user',
      icon: renderIcon(SettingOutlined)
    },
    children: [
      {
        path: '/main/system/user',
        name: 'system-user',
        meta: {
          title: '用户管理',
          url: '/main/system/user'
        },
        component: () => import('@/views/main/system/user/user.vue')
      },
      {
        path: '/main/system/department',
        name: 'system-department',
        meta: {
          title: '部门管理',
          url: '/main/system/department'
        },
        component: () => import('@/views/main/system/department/department.vue')
      },
      {
        path: '/main/system/menu',
        name: 'system-menu',
        meta: {
          title: '菜单管理',
          url: '/main/system/menu'
        },
        component: () => import('@/views/main/system/menu/menu.vue')
      },
      {
        path: '/main/system/role',
        name: 'system-role',
        meta: {
          title: '角色管理',
          url: '/main/system/role'
        },
        component: () => import('@/views/main/system/role/role.vue')
      }
    ]
  }
]
export default routes
