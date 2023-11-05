<script setup lang="ts">
import { QToolbar, QToolbarTitle } from 'quasar'
import AppButton from '@/components/AppButton/AppButton.vue'
import { Main } from '@/router/routes'
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>
      <AppButton flat label="Visualize Tech" @click="$router.push(Main)"></AppButton>
    </QToolbarTitle>

    <div id="app-toolbar-actions"></div>
  </QToolbar>
</template>

<style scoped lang="scss">
.app-toolbar {
  background: $dark;
}

#app-toolbar-actions {
  @include flex-row();
  gap: 0.25rem;
  margin-right: 1rem;
}
</style>
