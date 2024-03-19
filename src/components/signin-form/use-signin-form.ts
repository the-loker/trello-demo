import { reactive } from 'vue';

export const useSigninForm = () => {
  const formData = reactive({
    username: '',
    password: '',
  });

  return { formData };
};
