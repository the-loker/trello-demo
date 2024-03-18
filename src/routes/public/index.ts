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
];
