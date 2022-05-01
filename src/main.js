import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Home from './view/Home.vue';
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import SideBar from './components/SideBar.vue'
import StudentGrades from './view/StudentGrades.vue'

const routes = [
  {
    path: '/',
    component: Home,
    alias: '/index.html',
    children: [
      {
        path: '/student/grades',
        name: 'StudentGrades',
        component: StudentGrades
      }  
    ],
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


const app = createApp({
  el: '#app',
  render: h => h(App)
});
app.use(ElementPlus);
app.component('Home',Home);
app.component('my-header',MyHeader);
app.component('my-footer',MyFooter);
app.component('side-bar',SideBar);

app.use(router);
