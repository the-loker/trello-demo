import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    path: '/board',
    name: 'private-board',
    component: () => import('@views/private/Board.vue'),
    meta: {
      layout: 'private-layout',
      needAuth: true,
    },
  },
];
