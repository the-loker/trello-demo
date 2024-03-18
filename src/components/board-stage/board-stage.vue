<script lang="ts" setup>
  import { toRefs, defineProps } from 'vue';
  import { stageProps } from './board-stage';
  import { useStage } from './use-board-stage';

  const props = defineProps(stageProps);

  useStage(props);

  const { stage } = toRefs(props);
</script>

<template>
  <div class="board-stage">
    <div class="board-stage__header">
      <span class="board-stage__title">{{ stage.title }}</span>
    </div>
    <div class="board-stage__cards"></div>
  </div>
</template>

<style lang="scss">
  .board-stage {
    &__header {
    }

    &__title {
    }

    &__cards {
    }
  }
</style>
./use-board-stage./board-stage
