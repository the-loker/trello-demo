<script lang="ts" setup>
  import { watch, shallowRef, defineAsyncComponent } from 'vue';
  import { useRoute } from 'vue-router';

  import type { Component } from 'vue';
  import type { RouteMeta } from 'vue-router';

  const route = useRoute();
  const layout = shallowRef<Component>();

  watch(() => route.meta, setLayout, { immediate: true });

  function setLayout(meta: RouteMeta): void {
    const currentLayout = meta.layout ?? 'public-layout';

    layout.value = defineAsyncComponent(
      () => import(`@layouts/${currentLayout}.vue`)
    );
  }
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
