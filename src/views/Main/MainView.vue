<script setup lang="ts">
import { ViewTools } from '@/components'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import { useMainStore } from '@/stores/counter'
import { algorithms } from '@/services/algorithms.service'
import { dataStructures } from '@/services/data-structures.service'

const mainStore = useMainStore()

const search = computed({
  get: () => mainStore.state.search,
  set: mainStore.setSearch
})
</script>

<template>
  <ViewTools>
    <InputText v-model="search" />
  </ViewTools>

  <div class="list">
    <div class="list-algorithms">
      <div v-for="algorithm in algorithms" :key="algorithm.name"></div>
    </div>
    <div class="list-data-structures">
      <div v-for="structure in dataStructures" :key="structure.name">
        <button @click="$router.push(structure.path)">
          {{ structure.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/tools';

.list {
  @include flex-row();
  gap: 1rem;
}

.list-algorithms,
.list-data-structures {
  width: clamp(500px, 50%, 50%);
}
</style>
