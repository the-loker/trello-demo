import { createRouter, createWebHistory } from 'vue-router';

import publicRoutes from './public';
import privateRoutes from './private';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
  strict: true,
  sensitive: true,
});
