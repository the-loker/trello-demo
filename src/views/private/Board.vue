<script lang="ts" setup>
  import BoardStages from '@/components/board-stages/board-stages.vue';
</script>

<template>
  <div class="board">
    <BoardStages />
  </div>
</template>

<style lang="scss">
  .board {
    display: grid;

    padding: 30px;

    grid-auto-flow: column;
  }

</style>
