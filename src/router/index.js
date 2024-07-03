import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Layout from "@/layout/index.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
        meta: {title: "登录", icon: "dashboard", affix: true},
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/register/index.vue"),
        meta: {title: "注册", icon: "dashboard", affix: true},
    },
    {
        path: "/",
        component: Layout,
        name: "index",
        meta: {
            title: "首页",
            icon: "dashboard",
        },
        children: [
            {
                path: "/dubbing",
                component: () => import("@/views/home/index.vue"),
                name: "dubbing",
                meta: {title: "首页", icon: "dashboard", affix: true},
            },
            {
                path: "/contact",
                name: "contact",
                component: () => import("@/views/contact/index.vue"),
                meta: {title: "首页", icon: "dashboard", affix: true},
            },
            {
                path: "/member",
                name: "member",
                component: () => import("@/views/member/index.vue"),
                meta: {title: "首页", icon: "dashboard", affix: true},
            },
            {
                path: "/multiple",
                name: "multiple",
                component: () => import("@/views/multiple/index.vue"),
                meta: {title: "首页", icon: "dashboard", affix: true},
            },
        ],
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
