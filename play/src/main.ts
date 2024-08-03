import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import YhUI from '@yhclt/ui/src/index'

import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

// const plugins = [Badge, Empty]

const app = createApp(App)

// plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件 ，可以直接使用了
app.use(ElementPlus)
app.use(YhUI)
app.mount('#app')
