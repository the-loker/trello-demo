<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import { vOnClickOutside } from '@vueuse/components';

  import { cardFormProps, cardFormEmits } from './board-card-form';
  import { useBoardCardForm } from './use-board-card-form';

  const props = defineProps(cardFormProps);
  const emits = defineEmits(cardFormEmits);

  const { formData, onCloseForm } = useBoardCardForm(props, emits);
</script>

<template>
  <form class="board-card-form" v-on-click-outside="onCloseForm">
    <textarea v-model="formData.text" />
    <div class="board-card-form__controls">
      <button>create</button>
      <button @click.prevent="onCloseForm">close</button>
    </div>
  </form>
</template>

<style lang="scss">
  .board-card-form {
    &__controls {
    }
  }

</style>
