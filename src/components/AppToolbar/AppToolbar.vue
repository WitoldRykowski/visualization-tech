<script setup lang="ts">
import { QInput, QToolbar, QToolbarTitle } from 'quasar'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import AppButton from '@/components/AppButton/AppButton.vue'
import { Main } from '@/router/routes'

const mainStore = useMainStore()

const search = computed({
  get: () => mainStore.state.search,
  set: mainStore.setSearch
})
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>
      <AppButton flat label="Visualize Tech" @click="$router.push(Main)"></AppButton>
    </QToolbarTitle>

    <div id="app-toolbar-actions"></div>
    <QInput v-model="search" outlined dense label="Search" />
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
