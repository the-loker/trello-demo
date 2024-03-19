import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    path: '/',
    name: 'public-home',
    component: () => import('@views/public/Home.vue'),
    meta: {
      layout: 'public-layout',
      needAuth: false,
    },
  },
  {
    path: '/signin',
    name: 'public-signin',
    component: () => import('@views/public/Signin.vue'),
    meta: {
      layout: 'public-layout',
      needAuth: false,
    },
  },
  {
    path: '/signup',
    name: 'public-signup',
    component: () => import('@views/public/Signup.vue'),
    meta: {
      layout: 'public-layout',
      needAuth: false,
    },
  },
];
