import { useLoginStore } from '@/store/modules/login'
import { NIcon } from 'naive-ui'
import { h } from 'vue'
import {
  SpeedometerOutline,
  ChatboxEllipsesOutline,
  SettingsOutline,
  OptionsOutline
} from '@vicons/ionicons5'

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const routerIcon = [
  renderIcon(SpeedometerOutline),
  renderIcon(SettingsOutline),
  renderIcon(ChatboxEllipsesOutline),
  renderIcon(OptionsOutline)
]

// 解析路由 不好！！！！！
function resolveRouter(routerList: any) {
  routerList.forEach((item: any, index: number) => {
    // item.
    item.label = item.name
    item.path = item.url
    item.icon = routerIcon[index]
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
}

export { setUpLoginStore, resolveRouter }
