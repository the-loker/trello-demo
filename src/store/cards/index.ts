import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { ICard } from '@/types';

export const useCardsStore = defineStore('cardsStore', () => {
  const cards = ref<ICard[]>([]);

  return { cards };
});
