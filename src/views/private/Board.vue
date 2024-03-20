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

    gap: 20px;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
    }
  }

</style>
