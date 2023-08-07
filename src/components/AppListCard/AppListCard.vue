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
  <AppCard class="app-list-card">
    {{ variant }}
    <AppButton @click="setVariant(variant)"></AppButton>
  </AppCard>
</template>

<style scoped lang="scss">
.app-list-card {
  width: 100%;
}
</style>
