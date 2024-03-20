<script lang="ts" setup>
  import { toRefs, defineProps } from 'vue';
  import { cardProps } from './board-card';
  import { useCard } from './use-board-card';

  const props = defineProps(cardProps);

  const { isLoading, onRemove, onDragStart, onDragStop } = useCard(props);

  const { card } = toRefs(props);
</script>

<template>
  <div
    @dragstart="onDragStart($event, card)"
    @dragend="onDragStop($event)"
    class="board-card"
    draggable="true"
  >
    <div class="board-card__header">
      <div class="board-card__header-title">
        <span class="board-card__id">id:</span>
        <span>{{ card.id }}</span>
      </div>
      <button
        @click="onRemove"
        :disabled="isLoading"
        class="button button--icon"
      >
        &#x2715;
      </button>
    </div>
    <div class="board-card__content">
      {{ card.text }}
    </div>
  </div>
</template>

<style lang="scss">
  .board-card {
    padding: 10px;

    cursor: move;

    color: #b3b3b9;
    background-color: #202325;

    &__header {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;

      margin-bottom: 10px;

      &-title {
        display: flex;
        flex-direction: row;

        gap: 5px;
      }
    }

    &__id {
      color: #ffffff;
    }
  }

</style>
