
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"
import { createRouter, createWebHashHistory } from "vue-router"


const routes = [
    {
        path: '/',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        component: () => import('../views/register/index.vue')
    },
    {
        path: '/contact',
        component: () => import('../views/contact/index.vue')
    },
    {
        path: '/member',
        component: () => import('../views/member/index.vue')
    },
    {
        path: '/multiple',
        component: () => import('../views/multiple/index.vue')
    },
]


const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router