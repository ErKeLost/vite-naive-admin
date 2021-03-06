import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import router, { finallyRouter } from '@/router'
import { createAddRouter, mapMenusToRoutes } from '@/hooks/router'
import {
  accountLoginRequest,
  accountUserInfoRequest,
  accountUserMenusRequest
} from '@/service/login/login'

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
      // 给第一次菜单 添加 图标
      this.userMenus = loginUserMenus.data

      const result = mapMenusToRoutes(this.userMenus)
      // 登录添加所有路由 路径 以供访问 动态路径
      createAddRouter(router, 'main', result)
      createAddRouter(router, 'main', finallyRouter)
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
