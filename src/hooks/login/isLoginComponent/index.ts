import { useLoginStore } from '@/store/modules/login'
import { computed } from 'vue'
const loginStore = useLoginStore()
const isLogin = computed(() => loginStore.isLoginComponent)
const setLoginType = (type: boolean) => {
  loginStore.setLoginComponentType(type)
}
export { isLogin, setLoginType }
