<script setup lang="ts">
import { QCard, QCardSection } from 'quasar'
</script>

<template>
  <QCard class="app-card">
    <QCardSection>
      <slot />
    </QCardSection>
  </QCard>
</template>

<style scoped lang="scss">
:deep(.q-card__section) {
  @include flex-row(space-between, center);
}
</style>
