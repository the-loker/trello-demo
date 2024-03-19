import { object, string } from 'yup';
import { ref, computed, reactive } from 'vue';
import { useAuthStore } from '@store/auth';

export const useSignupForm = () => {
  const { signup } = useAuthStore();

  const formDataSchema = object({
    username: string()
      .label('Username')
      .min(3)
      .max(150)
      .required('User name is required field'),
    email: string().label('Email'),
    password: string()
      .label('Password')
      .min(8)
      .required('Password is required field'),
  });

  const formData = reactive({
    username: '',
    email: '',
    password: '',
  });

  const isLoading = ref<boolean>(false);
  const errors = ref<string[]>([]);

  const hasErrors = computed<boolean>(() => Boolean(errors.value.length));

  function clearErrors() {
    errors.value = [];
  }

  async function onSignup() {
    clearErrors();

    isLoading.value = true;

    try {
      await formDataSchema.validate(formData, { abortEarly: true });

      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        return errors.value.push(e.message);
      }

      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  return { formData, isLoading, errors, hasErrors, clearErrors, onSignup };
};
