import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IStage } from '@/types';

export const useStagesStore = defineStore('stagesStore', () => {
  const stages = ref<IStage[]>([
    {
      id: '0',
      title: 'on-hold',
    },
    {
      id: '1',
      title: 'in-progress',
    },
    {
      id: '2',
      title: 'needs-review',
    },
    {
      id: '3',
      title: 'approved',
    },
  ]);

  return { stages };
});
