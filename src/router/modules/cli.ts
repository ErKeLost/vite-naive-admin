import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { ProjectOutlined } from '@vicons/antd'
import { renderIcon, renderCli } from '@/utils/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main/cli',
    name: 'cli',
    component: Layout,
    meta: {
      title: '脚手架',
      sort: 10,
      isRoot: true,
      activeMenu: 'cli_index',
      icon: renderIcon(ProjectOutlined),
      url: '/main/cli'
    },
    children: [
      {
        path: '/main/cli',
        name: `cli_index`,
        meta: {
          title: '脚手架',
          extra: renderCli(),
          activeMenu: 'about_index',
          url: '/main/cli'
        },
        component: () => import('@/views/modules/adny/cli/index.vue')
      }
    ]
  }
]

export default routes
