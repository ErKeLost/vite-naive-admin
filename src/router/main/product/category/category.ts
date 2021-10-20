const category = (): any =>
  import('@/views/main/category/category/category.vue')
export default {
  path: '/main/product/category',
  name: 'category',
  meta: {
    title: '商品类别'
  },
  component: category,
  children: []
}
