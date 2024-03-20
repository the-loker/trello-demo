import { object, string } from 'yup';
import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IStage } from '@/types';

export const useStagesStore = defineStore('stagesStore', () => {
  const stageSchema = object({
    id: string().default(''),
    title: string().default(''),
    colors: object({
      text_color: string().default('#fff'),
      bg_color: string().default('#1a1a1a'),
    }),
  });

  const defaultStages = [
    {
      id: '0',
      title: 'on-hold',
      colors: {
        text_color: '#fff',
        bg_color: '#fb7e46',
      },
    },
    {
      id: '1',
      title: 'in-progress',
      colors: {
        text_color: '#fff',
        bg_color: '#2a92bf',
      },
    },
    {
      id: '2',
      title: 'needs-review',
      colors: {
        text_color: '#fff',
        bg_color: '#f4ce46',
      },
    },
    {
      id: '3',
      title: 'approved',
      colors: {
        text_color: '#fff',
        bg_color: '#01b962',
      },
    },
  ];

  const stages = ref<IStage[]>(
    defaultStages.map((stage) => stageSchema.cast(stage))
  );

  return { stages };
});
