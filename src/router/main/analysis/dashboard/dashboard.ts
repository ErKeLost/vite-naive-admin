import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/utils/index'

const dashboard = (): any =>
  import('@/views/main/analysis/dashboard/dashboard.vue')
export default {
  path: '/main/analysis/dashboard',
  name: 'dashboard',
  component: dashboard,
  meta: {
    icon: renderIcon(DashboardOutlined)
  },
  children: []
}
