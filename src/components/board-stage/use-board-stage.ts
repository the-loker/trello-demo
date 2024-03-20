import { computed } from 'vue';
import { useCardsStore } from '@store/cards';

import type { TStageProps } from './board-stage';

export const useStage = (props: TStageProps) => {
  const { cards, getCards } = useCardsStore();

  const stageCards = computed(() =>
    Object.values(cards)
      .filter((card) => card.row === props.stage.id)
      .sort((a, b) => a.seq_num - b.seq_num)
  );

  const countStageCards = computed(() => stageCards.value.length);

  return { stageCards, getCards, countStageCards };
};
