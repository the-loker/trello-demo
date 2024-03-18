<script lang="ts" setup>
  import { toRefs, defineProps } from 'vue';
  import { cardProps } from './card';
  import { useCard } from './use-card';

  const props = defineProps(cardProps);

  useCard(props);

  const { card } = toRefs(props);
</script>

<template>
  <div class="board-card">
    <div class="board-card__header">
      <span>id {{ card.id }}</span>
    </div>
    <div class="board-card__content">
      {{ card.text }}
    </div>
  </div>
</template>

<style lang="scss">
  .board-card {
  }

</style>
