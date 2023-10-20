<script setup lang="ts">
import { AppCard } from '@/components'
import { useMainStore } from '@/stores/main'
import type { Variant } from '@/services/SandboxService/sandbox.service'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const store = useMainStore()
const router = useRouter()

const props = defineProps<{
  variant: Variant
}>()

const setVariant = () => {
  store.setVariant(props.variant)

  router.push({ name: 'Sandbox' })
}

const variant = computed(() => {
  return props.variant.replace(/([a-z])([A-Z])/g, '$1 $2')
})
</script>

<template>
  <AppCard class="app-list-card" @click="setVariant">
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
