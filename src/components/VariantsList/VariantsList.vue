<script setup lang="ts">
import VariantsListCard from './VariantsListCard.vue'
import { ALGORITHMS_LIST, DATA_STRUCTURES_LIST } from '@/services/sandbox.service'
</script>

<template>
  <div>
    <div class="main-list__algorithms">
      <VariantsListCard
        v-for="algorithm in ALGORITHMS_LIST"
        :key="algorithm"
        :variant="algorithm"
      />
    </div>

    <div class="main-list__data-structures">
      <VariantsListCard
        v-for="dataStructure in DATA_STRUCTURES_LIST"
        :key="dataStructure"
        :variant="dataStructure"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-list__algorithms {
  margin-bottom: 1rem;
}

.main-list__algorithms,
.main-list__data-structures {
  @include flex-row(start, start, wrap);
  gap: 0.5rem;
  width: 100%;
}
</style>
