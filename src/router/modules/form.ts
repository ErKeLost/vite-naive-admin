import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { ProfileOutlined } from '@vicons/antd'
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
    path: '/main/form',
    name: 'Form',
    redirect: '/main/form/basic-form',
    meta: {
      title: '表单页',
      icon: renderIcon(ProfileOutlined),
      sort: 1
    },
    children: [
      {
        path: '/main/form/basic-form',
        name: 'form-basic-form',
        meta: {
          title: '基础表单',
          url: '/main/form/basic-form'
        },
        component: () => import('@/views/modules/form/basicForm/index.vue')
      },
      {
        path: '/main/form/step-form',
        name: 'form-step-form',
        meta: {
          title: '分步表单',
          url: '/main/form/step-form'
        },
        component: () => import('@/views/modules/form/stepForm/index.vue')
      },
      {
        path: '/main/form/senior-form',
        name: 'form-senior',
        meta: {
          title: '高级表单',
          url: '/main/form/senior-form'
        },
        component: () => import('@/views/modules/form/seriorForm/index.vue')
      }
    ]
  }
]

export default routes
