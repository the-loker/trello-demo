<script lang="ts" setup>
  import { ref, toRefs, defineProps } from 'vue';

  import { stageProps } from './board-stage';
  import { useStage } from './use-board-stage';

  import BoardCardForm from '../board-card-form/board-card-form.vue';

  const props = defineProps(stageProps);

  useStage(props);

  const { stage } = toRefs(props);
  const isOpenForm = ref(false);

  function onOpenForm() {
    isOpenForm.value = true;
  }

  function onCloseForm() {
    isOpenForm.value = false;
  }
</script>

<template>
  <div class="board-stage">
    <div class="board-stage__header">
      <span class="board-stage__title">{{ stage.title }}</span>
    </div>
    <div class="board-stage__cards"></div>
    <div class="board-stage__form">
      <template v-if="isOpenForm">
        <BoardCardForm
          v-model="isOpenForm"
          :stage-id="stage.id"
          @close-form="onCloseForm"
        />
      </template>

      <template v-else><button @click="onOpenForm">add</button></template>
    </div>
  </div>
</template>

<style lang="scss">
  .board-stage {
    &__header {
    }

    &__title {
      text-transform: uppercase;
    }

    &__cards {
      background-color: #292b31;
    }

    &__form {
    }
  }

</style>
./use-board-stage./board-stage
