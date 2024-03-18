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
  'update:modelValue': (value: boolean) => value,
  'close-form': (value: boolean) => value,
};

export type TCardFormEmits = typeof cardFormEmits;
