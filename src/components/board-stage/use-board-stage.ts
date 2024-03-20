import { computed } from 'vue';
import { useCardsStore } from '@store/cards';

import type { ICard } from '@/types';
import type { TStageProps } from './board-stage';

export const useStage = (props: TStageProps) => {
  const { cards, getCards, update } = useCardsStore();

  const stageCards = computed(() =>
    Object.values(cards)
      .filter((card) => card.row === props.stage.id)
      .sort((a, b) => a.seq_num - b.seq_num)
  );

  const countStageCards = computed(() => stageCards.value.length);

  async function onDrop(e: DragEvent, stageId: string) {
    if (e.dataTransfer) {
      const card: ICard = JSON.parse(e.dataTransfer.getData('card'));

      if (card.row === stageId) return;

      try {
        await update({
          cardId: card.id,
          row: stageId,
          seq_num: card.seq_num,
          text: card.text,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return { stageCards, getCards, countStageCards, onDrop };
};
