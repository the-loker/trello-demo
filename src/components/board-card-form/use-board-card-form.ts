import { object, string } from 'yup';
import { ref, computed, reactive } from 'vue';
import { useCardsStore } from '@store/cards';

import type { SetupContext } from 'vue';
import type { TCardFormProps, TCardFormEmits } from './board-card-form';

export const useBoardCardForm = (
  props: TCardFormProps,
  emit: SetupContext<TCardFormEmits>['emit']
) => {
  const { create } = useCardsStore();

  const isOpen = computed<boolean>({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const formDataSchema = object({
    text: string().label('Text').min(3).required(),
  });

  const formData = reactive({
    text: '',
  });

  const errors = ref<string[]>([]);

  const hasErrors = computed<boolean>(() => Boolean(errors.value.length));

  function clearErrors() {
    errors.value = [];
  }

  async function onCreate() {
    try {
      await formDataSchema.validate(formData, { abortEarly: true });

      await create({ row: props.stageId, text: formData.text });

      isOpen.value = false;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return errors.value.push(e.message);
      }

      console.error(e);
    }
  }

  function onCloseForm() {
    isOpen.value = false;

    emit('close-form', isOpen.value);
  }

  return {
    isOpen,
    formData,
    errors,
    hasErrors,
    clearErrors,
    onCreate,
    onCloseForm,
  };
};
