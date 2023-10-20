<script setup lang="ts">
import { QInput, QToolbar, QToolbarTitle } from 'quasar'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

const search = computed({
  get: () => mainStore.state.search,
  set: mainStore.setSearch
})
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>Visualize Tech</QToolbarTitle>

    <div id="app-toolbar-actions"></div>
    <QInput v-model="search" outlined dense label="Search" />
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
  margin-right: 1rem;
}
</style>
