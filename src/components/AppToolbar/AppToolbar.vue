<script setup lang="ts">
import { QToolbar, QToolbarTitle } from 'quasar'
import { AppButton } from '@/components'
import SearchField from '@/components/AppToolbar/SearchField.vue'
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>Visualize Tech</QToolbarTitle>

    <AppButton />
    <SearchField />
  </QToolbar>
</template>

<style scoped lang="scss">
.app-toolbar {
  background: white;
  color: black;
}
</style>
