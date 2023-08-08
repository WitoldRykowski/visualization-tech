<script setup lang="ts">
import { AppCard, AppButton } from '@/components'
import { useVariant } from '@/composable/useVariant'
import type { ContentVariant } from '@/types'

defineProps<{
  variant: ContentVariant
}>()

const { setVariant } = useVariant()
</script>

<template>
  <AppCard class="app-list-card" @click="setVariant(variant)">
    {{ variant }}
  </AppCard>
</template>

<style scoped lang="scss">
.app-list-card {
  width: clamp(250px, 250px, 10%);
  cursor: pointer;
  transition: 0.3s;
}

:deep(.q-card__section) {
  @include flex-row(center, center);
}

.app-list-card:hover {
  background: $primary;
  color: white;
}
</style>
