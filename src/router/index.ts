import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '../store';
const Home = () => import('@/views/Home.vue');
const Parameter = () => import('@/views/Parameter.vue');
const Profile = () => import('@/views/Profile.vue');
const Signin = () => import('@/views/Signin.vue');
const Signup = () => import('@/views/Signup.vue');

const BadRequest = () => import('@/views/BadRequest.vue');
const Unauthorized = () => import('@/views/Unauthorized.vue');
const NotFound = () => import('@/views/NotFound.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: '/parameter',
    name: 'parameter',
    component: Parameter,
    meta: { requiresAuth: false },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: Signin,
    props: true,
    meta: { requiresAuth: false },
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: '/400',
    name: '400',
    component: BadRequest,
    meta: { requiresAuth: false },
  },
  {
    path: '/401',
    name: '401',
    component: Unauthorized,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['getCurrentUser']) {
      next({
        path: '/401',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
