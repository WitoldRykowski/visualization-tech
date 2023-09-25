<script setup lang="ts">
import { AppCard } from '@/components'
import { useMainStore } from '@/stores/main'
import type { Variant } from '@/services/SandboxService/sandbox.service'

const store = useMainStore()

defineProps<{
  variant: Variant
}>()
</script>

<template>
  <AppCard class="app-list-card" @click="store.setVariant(variant)">
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
