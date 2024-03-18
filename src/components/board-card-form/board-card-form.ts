import { PropType, ExtractPropTypes } from 'vue';

export const cardFormProps = {
  modelValue: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  stageId: {
    type: String as PropType<string>,
    required: true,
  },
} as const;

export type TCardFormProps = ExtractPropTypes<typeof cardFormProps>;

export const cardFormEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  'close-form': (value: boolean) => typeof value === 'boolean',
};

export type TCardFormEmits = typeof cardFormEmits;
