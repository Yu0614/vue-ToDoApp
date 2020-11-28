import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/home/Home.vue';
import ToDo from '@/views/todo/todo.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'ToDo',
        component: ToDo
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
