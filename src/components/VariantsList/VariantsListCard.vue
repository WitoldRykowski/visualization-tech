<script setup lang="ts">
import { AppCard } from '@/components'
import { Sandbox } from '@/services/SandboxService/sandbox.service'
import type { Variant } from '@/services/SandboxService/types'

defineProps<{
  variant: Variant
}>()
</script>

<template>
  <AppCard class="app-list-card" @click="Sandbox.createPlaygroundByVariant(variant)">
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
