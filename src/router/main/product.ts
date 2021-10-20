import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { MoneyCollectOutlined } from '@vicons/antd'
import { renderIcon } from '@/utils/index'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */

const routes: RouteRecordRaw[] = [
  {
    path: '/main/product',
    name: 'product',
    redirect: '/main/product/category',
    component: Layout,
    meta: {
      title: '商品中心',
      url: '/main/product/category',
      icon: renderIcon(MoneyCollectOutlined)
    },
    children: [
      {
        path: '/main/product/category',
        name: 'product-category',
        meta: {
          title: '商品分类',
          url: '/main/product/category'
        },
        component: () => import('@/views/main/category/category/category.vue')
      },
      {
        path: '/main/product/goods',
        name: 'product-goods',
        meta: {
          title: '商品信息',
          url: '/main/product/goods'
        },
        component: () => import('@/views/main/category/goods/goods.vue')
      },
    ]
  }
]
export default routes
