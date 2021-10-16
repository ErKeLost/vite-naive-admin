import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { DesktopOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/index'

const IFrame = () => import('@/views/modules/iframe/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/docs',
    component: Layout,
    meta: {
      title: '外部页面',
      sort: 8,
      icon: renderIcon(DesktopOutline)
    },
    children: [
      {
        path: '/main/docs',
        name: 'frame-docs',
        meta: {
          title: 'adny-cli文档(内嵌)',
          frameSrc: 'https://naive-ui-admin-docs.vercel.app',
          url: '/main/docs'
        },
        component: IFrame
      },
      {
        path: '/main/naive',
        name: 'frame-naive',
        meta: {
          title: 'ADNY-github(内嵌)',
          frameSrc: 'https://www.naiveui.com',
          url: '/main/naive'
        },
        component: IFrame
      }
    ]
  }
]

export default routes
