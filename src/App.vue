<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppToolbar } from '@/components'
</script>

<template>
  <AppToolbar />

  <div class="main">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import '@/style/index.scss';

.main {
  padding: 1rem;
}
</style>
