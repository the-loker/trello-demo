import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => {
  const user = reactive({
    id: 0,
  });

  function setUser(userId: number): void {
    user.id = userId;
  }

  function resetUser(): void {
    user.id = 0;
  }

  function hasUser(): boolean {
    return Boolean(user.id);
  }

  return { user, setUser, resetUser, hasUser };
});
