import { createApp } from 'vue'
import App from './App.vue'
import './styles/tailwindcss.css'
// 按需加载complete: finished
import { pluginRegisterComponents } from '@/global/demandsComponents/utils/registerApp'
const app = createApp(App)

app.use(pluginRegisterComponents)
app.mount('#app')
