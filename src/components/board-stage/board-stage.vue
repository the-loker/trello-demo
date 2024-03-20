<script lang="ts" setup>
  import { ref, toRefs, defineProps, onBeforeMount } from 'vue';

  import { stageProps } from './board-stage';
  import { useStage } from './use-board-stage';

  import BoardCard from '../board-card/board-card.vue';
  import BoardCardForm from '../board-card-form/board-card-form.vue';

  const props = defineProps(stageProps);

  const { stageCards, countStageCards, getCards, onDrop } = useStage(props);

  const { stage } = toRefs(props);
  const isOpenForm = ref(false);

  onBeforeMount(async () => {
    try {
      await getCards({ row: props.stage.id });
    } catch (e) {
      throw e;
    }
  });

  function onOpenForm() {
    isOpenForm.value = true;
  }

  function onCloseForm() {
    isOpenForm.value = false;
  }

  console.log(stage.value);
</script>

<template>
  <div
    @drop="onDrop($event, stage.id)"
    @dragover.prevent
    @dragenter.revent
    class="board-stage"
  >
    <div
      class="board-stage__header"
      :style="{
        color: stage.colors.text_color,
        'background-color': stage.colors.bg_color,
      }"
    >
      <span class="board-stage__title">
        {{ stage.title }} ({{ countStageCards }})
      </span>
    </div>
    <div class="board-stage__cards">
      <BoardCard v-for="card in stageCards" :key="card.id" :card="card" />
    </div>
    <div class="board-stage__form">
      <template v-if="isOpenForm">
        <BoardCardForm
          v-model="isOpenForm"
          :stage-id="stage.id"
          @close-form="onCloseForm"
        />
      </template>

      <template v-else>
        <button @click="onOpenForm" class="button button--primary">
          Добавить карточку
        </button>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
  .board-stage {
    &__header {
      padding: 10px;
    }

    &__title {
      text-transform: uppercase;
    }

    &__cards {
      display: flex;
      flex-direction: column;

      gap: 10px;
    }

    &__form {
      padding-top: 10px;
    }

    &__cards,
    &__form {
      padding: 10px;

      background-color: #292b31;
    }
  }

</style>
./use-board-stage./board-stage
