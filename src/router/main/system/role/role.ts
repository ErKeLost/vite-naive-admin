const roler = (): any => import('@/views/main/system/role/role.vue')
export default {
  path: '/main/system/role',
  name: 'roler',
  component: roler,
  meta: {
    title: '角色管理'
  },
  children: []
}
