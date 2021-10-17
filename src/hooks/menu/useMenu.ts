import { useLoginStore } from '@/store/modules/login'
import { fiallyRouter } from '@/router'
import { NIcon } from 'naive-ui'
import { h } from 'vue'
import {
  SpeedometerOutline,
  ChatboxEllipsesOutline,
  SettingsOutline
} from '@vicons/ionicons5'
import { AccountBookOutlined } from '@vicons/antd'
import { mapMenusToRoutes } from '@/utils/router/mapMenus'
import { createAddRouter } from '@/hooks/router'
import router from '@/router'
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const routerIcon = [
  renderIcon(SpeedometerOutline),
  renderIcon(SettingsOutline),
  renderIcon(AccountBookOutlined),
  renderIcon(ChatboxEllipsesOutline)
]

// 解析路由 不好！！！！！
function resolveRouter(routerList: any) {
  routerList.forEach((item: any, index: number) => {
    // item.
    if (item.type === 1) {
      item.icon = routerIcon[index]
    }
    if (item.children && item.children.length > 0 && item.type === 1) {
      resolveRouter(item.children)
    }
    if (item.type === 2) {
      item.permissions = item.children
      delete item.children
    }
  })
  return routerList
}
function setUpLoginStore() {
  const loginStore = useLoginStore()
  loginStore.userInfo = JSON.parse(localStorage.getItem('USER_INFO')!)
  loginStore.userMenus = JSON.parse(localStorage.getItem('USER_MENUS')!)
  if (loginStore.userMenus !== null) {
    loginStore.userMenus.forEach((item: any, index: number) => {
      item.icon = routerIcon[index]
    })
  }
  if (loginStore.userMenus !== null) {
    const result = mapMenusToRoutes([...loginStore.userMenus])
    createAddRouter(router, 'main', result)
    createAddRouter(router, 'main', fiallyRouter)
    // result.forEach((route) => {
    //   router.addRoute('main', route)
    // })
    // fiallyRouter.forEach((route) => {
    //   router.addRoute('main', route)
    // })
  }
}

export { setUpLoginStore, resolveRouter }
