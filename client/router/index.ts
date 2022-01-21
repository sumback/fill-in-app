import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Cookies from 'js-cookie';
import store from '@/store';

const Cards = () => import('@/views/Cards.vue');
const Game = () => import('@/views/Game.vue');
const Games = () => import('@/views/Games.vue');
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
    path: '/cards',
    name: 'card-list',
    component: Cards,
    meta: { requiresAuth: true },
  },
  {
    path: '/game/:id',
    name: 'game',
    component: Game,
    meta: { requiresAuth: true },
  },
  {
    path: '/games',
    name: 'games',
    component: Games,
    meta: { requiresAuth: true },
  },
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
    const unauthorized = { path: '/401' };
    if (store.getters['getCurrentUser']) {
      next();
    } else if (Cookies.get('currentUser')) {
      store.dispatch('autoLogin').then(
        () => next(),
        () => next(unauthorized),
      );
    } else {
      next(unauthorized);
    }
  } else {
    next();
  }
});

export default router;
