<script setup lang="ts">
import Card from 'primevue/card'
</script>

<template>
  <Card class="app-card">
    <template #title>
      <slot name="title" />
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<style scoped lang="scss">
.app-card {
  width: 100%;
}
</style>
