<script lang="ts" setup>
  import { useBoardStages } from './use-board-stages';

  import BoardStage from '../board-stage/board-stage.vue';

  const { stages } = useBoardStages();
</script>

<template>
  <BoardStage v-for="stage in stages" :key="stage.id" :stage="stage" />
</template>
