import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { WechatOutlined } from '@vicons/antd'
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
    path: '/main/story',
    name: 'chat',
    redirect: '/main/story/chat',
    component: Layout,
    meta: {
      title: '随便聊聊',
      url: '/main/story/chat',
      icon: renderIcon(WechatOutlined)
    },
    children: [
      {
        path: '/main/story/chat',
        name: 'story-chat',
        meta: {
          title: '你的故事',
          url: '/main/story/chat'
        },
        component: () => import('@/views/main/story/chat/chat.vue')
      },
      {
        path: '/main/story/list',
        name: 'story-list',
        meta: {
          title: '故事列表',
          url: '/main/story/list'
        },
        component: () => import('@/views/main/story/list/list.vue')
      },
    ]
  }
]
export default routes
