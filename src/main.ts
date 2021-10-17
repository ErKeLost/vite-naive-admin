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
import { setupRouter } from '@/router'
const app = createApp(App)
registerAdnyUi(app)
setupStore(app)
// 没有理解 这个 路由 不注册 如何 添加 addroute
// 防止刷新路由 流失
setUpLoginStore()
// 使用路由
setupRouter(app)
app.use(pluginRegisterComponents)
app.mount('#app')
