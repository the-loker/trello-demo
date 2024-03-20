import { ref } from 'vue';
import { useCardsStore } from '@store/cards';

import type { TCardProps } from './board-card';

export const useCard = (props: TCardProps) => {
  const { remove } = useCardsStore();

  const isLoading = ref(false);

  async function onRemove() {
    isLoading.value = true;

    try {
      await remove(props.card.id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return alert(e.message);
      }

      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, onRemove };
};
