const overview = (): any =>
  import('@/views/main/analysis/overview/overview.vue')
export default {
  path: '/main/analysis/overview',
  name: 'overview',
  meta: {
    title: '核心技术'
  },
  component: overview,
  children: []
}
