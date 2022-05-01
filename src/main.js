import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import SideBar from './components/SideBar.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.component('my-header',MyHeader)
app.component('my-footer',MyFooter)
app.component('side-bar',SideBar)
app.mount('#app')
