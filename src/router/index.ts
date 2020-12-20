import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '@/views/todo/list/list.vue';
import ToDo from '@/views/todo/todo.vue';
import Add from '@/views/todo/add/add.vue';
import Edit from '@/views/todo/edit/edit.vue';
import NotFound from '@/views/errors/not_found/not-found.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'List',
        component: List
    },
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/todo/:id',
        name: 'ToDo',
        component: ToDo
    },
    {
        path: '/add',
        name: 'Add',
        component: Add
    },
    {
        path: '/edit/todo/:id',
        name: 'Edit',
        component: Edit
    },
    {   path: '/not-found',
        name: 'NotFound', 
        component: NotFound 
    },
    {   path: '/:catchAll(.*)',
        name: 'List', 
        component: List 
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
