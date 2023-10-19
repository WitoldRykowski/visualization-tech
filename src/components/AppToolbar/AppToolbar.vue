<script setup lang="ts">
import { QToolbar, QToolbarTitle } from 'quasar'
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>Visualize Tech</QToolbarTitle>

    <div id="app-toolbar-actions"></div>
  </QToolbar>
</template>

<style scoped lang="scss">
.app-toolbar {
  background: white;
  color: black;
}

#app-toolbar-actions {
  @include flex-row();
  gap: 0.25rem;
}
</style>
