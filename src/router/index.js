import Home from '@/views/HomePage.vue';
import Room from '@/views/RoomPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/room/:id',
            name: 'Room',
            component: Room,
        },
    ],
});

export default router;
