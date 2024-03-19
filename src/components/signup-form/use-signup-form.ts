import { reactive } from 'vue';

export const useSignupForm = () => {
  const formData = reactive({
    username: '',
    email: '',
    password: '',
  });

  return { formData };
};
