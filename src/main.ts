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
const app = createApp(App)
registerAdnyUi(app)
app.use(router)
setupStore(app)
app.use(pluginRegisterComponents)
app.mount('#app')
