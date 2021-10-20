const menut = (): any => import('@/views/main/system/menu/menu.vue')
export default {
  path: '/main/system/menu',
  name: 'menut',
  component: menut,
  meta: {
    title: '菜单管理'
  },
  children: []
}
