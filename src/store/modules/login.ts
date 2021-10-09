import { store } from '@/store'
import { defineStore } from 'pinia'

export interface ILoginState {
  isLoginComponent: boolean
}

export const useLoginStore = defineStore({
  id: 'app-loginComponent',
  state: (): ILoginState => ({
    isLoginComponent: false
  }),
  actions: {
    setLoginComponentType(isShow: boolean) {
      this.isLoginComponent = isShow
    }
  }
})
