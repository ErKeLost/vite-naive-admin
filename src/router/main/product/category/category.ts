const category = (): any =>
  import('@/views/main/category/category/category.vue')
export default {
  path: '/main/product/category',
  name: 'category',
  component: category,
  children: []
}
