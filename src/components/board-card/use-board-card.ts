import { ref } from 'vue';
import { useCardsStore } from '@store/cards';

import type { ICard } from '@/types';
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

  function onDragStart(e: DragEvent, card: ICard) {
    const elem = e.target as HTMLDivElement;

    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('card', JSON.stringify(card));
    }

    setTimeout(() => {
      elem.style.visibility = 'hidden';
    }, 0);
  }

  function onDragStop(e: DragEvent) {
    const elem = e.target as HTMLDivElement;

    elem.style.visibility = '';
  }

  return { isLoading, onRemove, onDragStart, onDragStop };
};
