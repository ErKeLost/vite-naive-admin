import { store } from '@/store'
import router, { constantRouterList } from '@/router'
import { mapMenusToRoutes } from '@/utils/router/mapMenus'
import {
  accountLoginRequest,
  accountUserInfoRequest,
  accountUserMenusRequest
} from '@/service/login/login'
import { generateRouter } from '@/hooks/menu/useMenu'
import { defineStore } from 'pinia'
import { resolveRouter } from '@/hooks/menu/useMenu'
import { RouteRecordRaw } from 'vue-router'
export interface ILoginState {
  isLoginComponent: boolean
  token: string
  userInfo: any
  userMenus: any
}
export const useLoginStore = defineStore({
  id: 'app-login',
  state: (): ILoginState => ({
    isLoginComponent: false,
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    // 切换动态路由  登录 注册
    setLoginComponentType(isShow: boolean) {
      this.isLoginComponent = isShow
    },
    // 登录
    async accountLoginAction(info: any) {
      // 登录逻辑
      // console.log(constantRouterList)
      const loginResult = await accountLoginRequest(info)
      const { id, token } = loginResult.data
      this.token = token
      localStorage.setItem('TOKEN', token)
      const loginUserInfo = await accountUserInfoRequest(id)
      this.userInfo = loginUserInfo.data
      localStorage.setItem('USER_INFO', JSON.stringify(this.userInfo))
      const loginUserMenus = await accountUserMenusRequest(id)
      const clone = resolveRouter(loginUserMenus.data)
      this.userMenus = [...clone]
      // const result = mapMenusToRoutes(this.userMenus)
      // console.log(result)
      // result.forEach((route: RouteRecordRaw[]) => {
      //   console.log(route)
      //   router.addRoute('main', route)
      // })
      // console.log(router)
      localStorage.setItem('USER_MENUS', JSON.stringify(this.userMenus))
      router.push({ path: '/dashboard' })
    }
  }
})
