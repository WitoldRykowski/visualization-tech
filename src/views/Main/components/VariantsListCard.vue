<script setup lang="ts">
import { AppCard } from '@/components'
import { useMainStore } from '@/stores/main'
import type { Variant } from '@/services/SandboxService/sandbox.service'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { QChip } from 'quasar'
import { Sandbox } from '@/router/routes'

const store = useMainStore()
const router = useRouter()

const props = defineProps<{
  variant: Variant
}>()

const setVariant = () => {
  store.setVariant(props.variant.name)

  router.push(Sandbox)
}

const variantName = computed(() => {
  return props.variant.name.replace(/([a-z])([A-Z])/g, '$1 $2')
})
</script>

<template>
  <AppCard class="app-list-card" @click="setVariant">
    <span class="variant-name">{{ variantName }}</span>

    <div class="tags">
      <QChip class="tag" v-for="tag in variant.tags" :key="tag" :label="`#${tag}`" />
    </div>
  </AppCard>
</template>

<style scoped lang="scss">
$transition: 0.3s;

.app-list-card {
  width: clamp(250px, 250px, 10%);
  cursor: pointer;
  transition: $transition;
}

:deep(.q-card__section) {
  @include flex-column(start, center);
  gap: 1rem;
}

.app-list-card:hover {
  background: $primary;
  color: white;
}

.variant-name {
  font-weight: 600;
}

.tags {
  @include flex-row(center, center, wrap);
  gap: 0.5rem;
}

.tag {
  background: $primary;
  color: white;
  transition: $transition;
}

.app-list-card:hover .tag {
  background: white;
  color: $primary;
}
</style>
