const goods = (): any => import('@/views/main/category/goods/goods.vue')
export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goods,
  children: []
}
