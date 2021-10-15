import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { ProjectOutlined } from '@vicons/antd'
import { renderIcon, renderCli } from '@/utils/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/cli',
    name: 'cli',
    component: Layout,
    meta: {
      title: '脚手架',
      sort: 10,
      isRoot: true,
      activeMenu: 'cli_index',
      icon: renderIcon(ProjectOutlined)
    },
    children: [
      {
        path: 'cli',
        name: `cli_index`,
        meta: {
          title: '脚手架',
          extra: renderCli(),
          activeMenu: 'about_index'
        },
        component: () => import('@/views/cli/index.vue')
      }
    ]
  }
]

export default routes
