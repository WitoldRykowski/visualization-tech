<script setup lang="ts">
import { QToolbar, QToolbarTitle } from 'quasar'
import { AppButton } from '@/components'
import { useVariant } from '@/composable/useVariant'
import SearchField from '@/components/AppToolbar/SearchField.vue'

const { variant, setVariant } = useVariant()
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>Visualize Tech</QToolbarTitle>

    <AppButton v-show="variant" @click="setVariant(undefined)" />
    <SearchField />
  </QToolbar>
</template>

<style scoped lang="scss">
.app-toolbar {
  background: white;
  color: black;
}
</style>
