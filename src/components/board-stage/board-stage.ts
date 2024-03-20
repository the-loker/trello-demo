import type { PropType, ExtractPropTypes } from 'vue';

export interface IStage {
  id: string;
  title: string;
  colors: {
    text_color: string;
    bg_color: string;
  };
}

export const stageProps = {
  stage: {
    type: Object as PropType<IStage>,
    required: true,
  },
} as const;

export type TStageProps = ExtractPropTypes<typeof stageProps>;
