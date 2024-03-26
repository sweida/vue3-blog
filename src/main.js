import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//全局引用路由
import router from './router'

// 自定义指令
import registerDirectives from './directive/index'


// createApp(App).use(router).mount('#app')



const app = createApp(App)
registerDirectives(app)
app.use(router)
// app.provide('$axios', axios)
app.mount('#app')
