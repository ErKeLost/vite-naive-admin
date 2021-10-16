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
      const loginResult = await accountLoginRequest(info)
      const { id, token } = loginResult.data
      this.token = token
      localStorage.setItem('TOKEN', token)
      const loginUserInfo = await accountUserInfoRequest(id)
      this.userInfo = loginUserInfo.data
      localStorage.setItem('USER_INFO', JSON.stringify(this.userInfo))
      const loginUserMenus = await accountUserMenusRequest(id)
      const clone = resolveRouter(loginUserMenus.data)
      // 给第一次菜单 添加 图标
      this.userMenus = [...clone]
      // this.userMenus = loginUserMenus.data
      const result = mapMenusToRoutes(this.userMenus)
      result.forEach((route: RouteRecordRaw[]) => {
        router.addRoute('main', route)
      })
      // 屏蔽函数 对象 只能解析字符串  防止 用户刷新 图标消失
      localStorage.setItem('USER_MENUS', JSON.stringify(this.userMenus))
      router.push({ path: '/main' })
    },
    logOut() {
      const result = mapMenusToRoutes(this.userMenus)
      result.forEach((route: RouteRecordRaw[]) => {
        router.removeRoute(route.name)
      })
    }
  }
})
