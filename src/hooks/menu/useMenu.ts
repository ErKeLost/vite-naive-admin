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
function setUpLoginStore() {
  const loginStore = useLoginStore()
  loginStore.userInfo = JSON.parse(localStorage.getItem('USER_INFO')!)
  loginStore.userMenus = JSON.parse(localStorage.getItem('USER_MENUS')!)

  if (loginStore.userMenus !== null) {
    const result = mapMenusToRoutes([...loginStore.userMenus])
    createAddRouter(router, 'main', result)
    createAddRouter(router, 'main', fiallyRouter)
  }
}

export { setUpLoginStore }
