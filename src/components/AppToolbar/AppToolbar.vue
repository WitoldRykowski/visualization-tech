<script setup lang="ts">
import { QToolbar, QToolbarTitle } from 'quasar'
import { AppButton } from '@/components'
import SearchField from '@/components/AppToolbar/SearchField.vue'
import { computed } from 'vue'
import { Sandbox } from '@/services/SandboxService/sandbox.service'

const variant = computed(() => Sandbox.state.variant.value)
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>Visualize Tech</QToolbarTitle>

    <AppButton v-show="variant" @click="Sandbox.createPlaygroundByVariant(undefined)" />
    <SearchField />
  </QToolbar>
</template>

<style scoped lang="scss">
.app-toolbar {
  background: white;
  color: black;
}
</style>
