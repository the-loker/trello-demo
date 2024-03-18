import { computed, reactive } from 'vue';

import type { SetupContext } from 'vue';
import type { TCardFormProps, TCardFormEmits } from './board-card-form';

export const useBoardCardForm = (
  props: TCardFormProps,
  emit: SetupContext<TCardFormEmits>['emit']
) => {
  const isOpen = computed<boolean>({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const formData = reactive({
    text: '',
  });

  function onCloseForm() {
    isOpen.value = false;

    emit('close-form', isOpen.value);
  }

  return { isOpen, formData, onCloseForm };
};
