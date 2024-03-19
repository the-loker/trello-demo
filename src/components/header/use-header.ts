import { useAuthStore } from '@store/auth';

export const useHeader = () => {
  const { isAuth } = useAuthStore();

  return { isAuth };
};
