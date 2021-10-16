import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { ProjectOutlined } from '@vicons/antd'
import { renderIcon, renderNew } from '@/utils/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main/library',
    name: 'about',
    component: Layout,
    meta: {
      title: '库',
      sort: 10,
      isRoot: true,
      activeMenu: 'about_index',
      icon: renderIcon(ProjectOutlined),
      url: '/main/library'
    },
    children: [
      {
        path: '/main/library',
        name: `about_index`,
        meta: {
          title: '库',
          extra: renderNew(),
          activeMenu: 'about_index',
          url: '/main/library'
        },
        component: () => import('@/views/modules/adny/library/index.vue')
      }
    ]
  }
]

export default routes
