import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import Home from '../view/Home.vue'
import StudentGrades from '../view/StudentGrades.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '/student/grades', component: StudentGrades } 
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


