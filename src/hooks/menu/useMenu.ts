import { useLoginStore } from '@/store/modules/login'
import { fiallyRouter } from '@/router'
import { mapMenusToRoutes } from '@/utils/router/mapMenus'
import { createAddRouter } from '@/hooks/router'
import router from '@/router'

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
