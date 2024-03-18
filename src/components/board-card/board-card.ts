import { PropType, ExtractPropTypes } from 'vue';

export interface ICard {
  id: number;
  row: string;
  seq_num: number;
  text: string;
}

export const cardProps = {
  card: {
    type: Object as PropType<ICard>,
    required: true,
  },
} as const;

export type TCardProps = ExtractPropTypes<typeof cardProps>;
