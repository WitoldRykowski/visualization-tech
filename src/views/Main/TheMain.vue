<script setup lang="ts">
import SearchField from './components/SearchField.vue'
import VariantsListCard from './components/VariantsListCard.vue'
import {
  ALGORITHMS_LIST,
  DATA_STRUCTURES_LIST,
  Variant
} from '@/services/SandboxService/sandbox.service'
import { QCard, QSeparator, QExpansionItem } from 'quasar'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()

const search = computed(() => store.state.search)

const compareSearchToVariant = (variant: Variant) => {
  const transformedSearch = search.value.replace(/\s/g, '').toLowerCase()

  return (variant as string).toLowerCase().includes(transformedSearch)
}

const dataStructuresList = computed(() => {
  if (!search.value) return DATA_STRUCTURES_LIST

  return DATA_STRUCTURES_LIST.filter(compareSearchToVariant)
})

const algorithmsList = computed(() => {
  if (!search.value) return ALGORITHMS_LIST

  return ALGORITHMS_LIST.filter(compareSearchToVariant)
})

const isDataStructuresListVisible = computed(() => {
  return dataStructuresList.value.length > 0
})

const isAlgorithmsListVisible = computed(() => {
  return algorithmsList.value.length > 0
})
</script>

<template>
  <QCard class="variants-list">
    <SearchField />

    <QSeparator spaced />

    <QExpansionItem
      v-show="isDataStructuresListVisible"
      class="data-structures"
      label="Data Structures"
      default-opened
    >
      <div class="main-list__data-structures">
        <VariantsListCard
          v-for="dataStructure in dataStructuresList"
          :key="dataStructure"
          :variant="dataStructure"
        />
      </div>
    </QExpansionItem>

    <QSeparator spaced v-show="isAlgorithmsListVisible && isDataStructuresListVisible" />

    <QExpansionItem
      v-show="isAlgorithmsListVisible"
      class="algorithms"
      label="Algorithms"
      default-opened
    >
      <div class="main-list__algorithms">
        <VariantsListCard
          v-for="algorithm in algorithmsList"
          :key="algorithm"
          :variant="algorithm"
        />
      </div>
    </QExpansionItem>
  </QCard>
</template>

<style scoped lang="scss">
.variants-list {
  @include flex-column(start, center);
  width: 250px;
  height: 100%;
  padding: 1rem;
  overflow: auto;
  border: 1px solid #ccc;
}

.variants-list::-webkit-scrollbar {
  width: 2px;
}

.variants-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.variants-list::-webkit-scrollbar-thumb {
  background: #888;
}

.variants-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.main-list__algorithms,
.main-list__data-structures {
  @include flex-row(start, start, wrap);
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  padding: 0.25rem;
}

.main-list__algorithms {
  margin-bottom: 1rem;
}

.algorithms,
.data-structures {
  width: 100%;
}

hr {
  width: 100%;
}
</style>
