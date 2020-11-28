import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '@/views/todo/list/list.vue';
import ToDo from '@/views/todo/todo.vue';
import Edit from '@/views/todo/edit/edit.vue';
import NotFound from '@/views/errors/not_found/not-found.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'ToDo',
        component: ToDo
    },
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/edit',
        name: 'Edit',
        component: Edit
    },
    {   path: '/:catchAll(.*)',
        name: 'NotFound', 
        component: NotFound 
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
