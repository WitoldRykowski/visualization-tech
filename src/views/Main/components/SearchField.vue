<script setup lang="ts">
import { QInput } from 'quasar'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

const search = computed({
  get: () => mainStore.state.search,
  set: mainStore.setSearch
})
</script>

<template>
  <QInput v-model="search" outlined dense label="Search" style="width: 100%" />
</template>

<style scoped lang="scss"></style>
