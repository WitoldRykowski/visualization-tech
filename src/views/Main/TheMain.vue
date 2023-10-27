<script setup lang="ts">
import VariantsListCard from './components/VariantsListCard.vue'
import { ALGORITHMS, type VariantName } from '@/services/SandboxService/sandbox.service'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()

const search = computed(() => store.state.search)

const compareSearchToVariant = (variant: VariantName) => {
  const transformedSearch = search.value.replace(/\s/g, '').toLowerCase()

  return (variant as string).toLowerCase().includes(transformedSearch)
}

const algorithmsList = computed(() => {
  if (!search.value) return ALGORITHMS

  return ALGORITHMS.filter(({ name }) => compareSearchToVariant(name))
})
</script>

<template>
  <div class="variants-list">
    <div class="variants-list__algorithms">
      <VariantsListCard v-for="algorithm in algorithmsList" :key="algorithm" :variant="algorithm" />

      <div v-show="algorithmsList.length === 0" class="empty-list">
        List is empty! Try to search for another algorithm.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.variants-list {
  @include flex-column();
  padding: 1rem;
  gap: 1rem;
}

.variants-list__algorithms {
  @include flex-row(start, start, wrap);
  gap: 0.5rem;
  width: 100%;
}

.list-title {
  font-weight: 600;
  font-size: 1.5rem;
}

.empty-list {
  text-align: center;
  width: 100%;
}
</style>
