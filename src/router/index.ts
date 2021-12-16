import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const NotFound = () => import('@/views/NotFound.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: { requiresAuth: false },
  },
  { path: '/:pathMatch(.*)*', redirect: '404' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
