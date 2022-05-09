import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Router from './router/router'

const app=createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
//{ size: 'small', zIndex: 3000 }有什么作用？
app.use(Router)
app.mount('#app')