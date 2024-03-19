import { useAuthStore } from '@store/auth';
import { useRouter } from 'vue-router';

export const useHeader = () => {
  const router = useRouter();
  const { isAuth, logout } = useAuthStore();

  async function onLogout() {
    logout();

    await router.push({ name: 'public-home' });
  }

  return { isAuth, onLogout };
};
