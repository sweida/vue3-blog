import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//全局引用路由
import router from './router'

// 自定义指令
import registerDirectives from './directive/index'

import { Button, message, Row, Col, Input } from 'ant-design-vue';
// createApp(App).use(router).mount('#app')

// 全局组件
import SpinLoading from './components/SpinLoading.vue'
import TextLoading from './components/TextLoading.vue'

const app = createApp(App)
registerDirectives(app)
app.component('SpinLoading', SpinLoading)
app.component('TextLoading', TextLoading)
app.use(router)
app.use(Button).use(Row).use(Col).use(Input)
// app.provide('$axios', axios)
app.mount('#app')

app.config.globalProperties.$message = message
