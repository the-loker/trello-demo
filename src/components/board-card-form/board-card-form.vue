<script lang="ts" setup>
  import { defineProps, defineEmits, onBeforeUnmount } from 'vue';
  import { vOnClickOutside } from '@vueuse/components';

  import { cardFormProps, cardFormEmits } from './board-card-form';
  import { useBoardCardForm } from './use-board-card-form';

  const props = defineProps(cardFormProps);
  const emits = defineEmits(cardFormEmits);

  const { formData, errors, hasErrors, clearErrors, onCreate, onCloseForm } =
    useBoardCardForm(props, emits);

  onBeforeUnmount(() => clearErrors());
</script>

<template>
  <div v-if="hasErrors" class="errors">
    <div v-for="(error, idx) in errors" :key="idx" class="errors__message">
      <span>{{ error }}</span>
    </div>
  </div>

  <form
    class="board-card-form"
    v-on-click-outside="onCloseForm"
    @submit.prevent="onCreate"
  >
    <textarea
      v-model="formData.text"
      class="input"
      rows="4"
      placeholder="Текст карточки"
    />
    <div class="board-card-form__controls">
      <button type="submit" class="button button--primary">
        Добавить карточку
      </button>
      <button @click.prevent="onCloseForm" class="button button--danger">
        Отменить
      </button>
    </div>
  </form>
</template>

<style lang="scss">
  .board-card-form {
    display: flex;
    flex-direction: column;

    gap: 10px;

    &__controls {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }
  }

</style>
