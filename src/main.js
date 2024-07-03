import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import 'virtual:svg-icons-register';

// element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/styles/style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
