import { RouteRecordRaw } from 'vue-router'
import { Layout, ParentLayout } from '@/router/constant'
import { WalletOutlined } from '@vicons/antd'
import { renderIcon, renderNew } from '@/utils'

const routeName = 'comp'

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
    path: '/comp',
    name: routeName,
    component: Layout,
    redirect: '/comp/table',
    meta: {
      title: '组件示例',
      icon: renderIcon(WalletOutlined),
      sort: 8
    },
    children: [
      {
        path: '/main/useForm',
        name: `${routeName}_form`,
        redirect: '/comp/form/basic',
        component: ParentLayout,
        meta: {
          title: '表单',
          url: '/main/useForm'
        },
        children: [
          {
            path: '/main/basicUseForm',
            name: `${routeName}_form_basic`,
            meta: {
              title: '基础使用',
              url: '/main/basicUseForm'
            },
            component: () => import('@/views/modules/comp/form/basic/index.vue')
          },
          {
            path: '/main/useFormComponent',
            name: `useForm`,
            meta: {
              title: 'useForm',
              url: '/main/useFormComponent'
            },
            component: () => import('@/views/modules/comp/form/useForm/index.vue')
          }
        ]
      },
      {
        path: '/main/upload',
        name: `${routeName}_upload`,
        meta: {
          title: '上传图片',
          url: '/main/upload'
        },
        component: () => import('@/views/modules/comp/upload/index.vue')
      },
      {
        path: '/main/modal',
        name: `${routeName}_modal`,
        meta: {
          title: '弹窗扩展',
          url: '/main/modal'
        },
        component: () => import('@/views/modules/comp/modal/index.vue')
      },
      {
        path: '/main/richtext',
        name: `richtext`,
        meta: {
          title: '富文本',
          extra: renderNew(),
          url: '/main/richtext'
        },
        component: () => import('@/views/modules/comp/richtext/index.vue')
      },
      {
        path: '/main/drag',
        name: `Drag`,
        meta: {
          title: '拖拽',
          extra: renderNew(),
          url: '/main/drag'
        },
        component: () => import('@/views/modules/comp/drag/index.vue')
      }
    ]
  }
]

export default routes
