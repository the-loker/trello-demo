import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@store/auth';
import { useUserStore } from '@store/user';

import publicRoutes from './public';
import privateRoutes from './private';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
  strict: true,
  sensitive: true,
});

router.beforeEach(async (to, from, next) => {
  const { resetAuthData, getRefreshToken, hasRefreshToken, refresh } =
    useAuthStore();
  const { hasUser } = useUserStore();

  if (hasRefreshToken() && !hasUser) {
    try {
      const tokenData = getRefreshToken();

      await refresh(tokenData.token);

      return next();
    } catch (e) {
      resetAuthData();

      return next({ name: 'public-signin' });
    }
  }

  next();
});

router.beforeEach((to, from, next) => {
  if (!to.meta.needAuth) return next();

  const { isAuth } = useAuthStore();
  const { hasUser } = useUserStore();

  if (!isAuth && !hasUser() && to.meta.needAuth) {
    return next({ name: 'public-signin' });
  }

  return next();
});

export default router;
