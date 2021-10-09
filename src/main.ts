import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwindcss.css'
// mdi图标库
import '@mdi/font/css/materialdesignicons.css'
// 按需加载complete: finished
import { pluginRegisterComponents } from '@/global/demandsComponents/utils/registerApp'
const app = createApp(App)
app.use(router)
app.use(pluginRegisterComponents)
app.mount('#app')
