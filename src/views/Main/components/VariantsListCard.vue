<script setup lang="ts">
import { AppCard } from '@/components'
import { useMainStore } from '@/stores/main'
import type { Variant } from '@/services/Sandbox/sandbox.service'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { QChip } from 'quasar'
import { Sandbox } from '@/router/routes'
import { convertCamelCaseToText } from '@/utils'
import AppTag from '@/components/AppTag/AppTag.vue'

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
  return convertCamelCaseToText(props.variant.name)
})
</script>

<template>
  <AppCard class="app-list-card" @click="setVariant">
    <span class="variant-name">{{ variantName }}</span>

    <div class="tags">
      <AppTag v-for="tag in variant.tags" :key="tag" :tag="tag" />
    </div>
  </AppCard>
</template>

<style scoped lang="scss">
$transition: 0.3s;

.app-list-card {
  height: 150px;
  cursor: pointer;
  transition: $transition;
}

:deep(.q-card__section) {
  @include flex-column(center, center);
  gap: 1rem;
  height: 100%;
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

:deep(.tag) {
  transition: $transition;
}

.app-list-card:hover .tag {
  background: white;
  color: $primary;
}
</style>
