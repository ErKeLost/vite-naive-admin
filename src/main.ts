import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'
import 'animate.css'
// mdi图标库
import '@mdi/font/css/materialdesignicons.css'
// 按需加载complete: finished
import { pluginRegisterComponents } from '@/global/registerNaiveUi/utils/registerApp'
import { setupStore } from '@/store'
import registerAdnyUi from './global/registerAdnyUi'
import { setUpLoginStore } from '@/hooks/menu/useMenu'
const app = createApp(App)
registerAdnyUi(app)
setupStore(app)
setUpLoginStore()
app.use(router)
app.use(pluginRegisterComponents)
app.mount('#app')
