<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import { computed } from 'vue'

const toolbarStyle = computed(() => ({
  root: { style: { background: '#34495e', color: 'white', height: '90px' } }
}))
</script>

<template>
  <Toolbar :pt="toolbarStyle">
    <template #start>
      <span class="toolbar-title">Visualize Tech</span>
    </template>

    <template #end>
      <div id="toolbar-tools"></div>
    </template>
  </Toolbar>
</template>

<style scoped lang="scss">
@import 'src/style/tools';

#toolbar-tools {
  @include flex-row(end, center);
  gap: 0.5rem;
}
</style>
