<script setup lang="ts">
import { AppToolbar, TheSandbox, AppListCard } from '@/components'
import { ALGORITHMS_LIST } from '@/services/algorithms.service'
import { DATA_STRUCTURES_LIST } from '@/services/data-structures.service'
import { useVariant } from '@/composable/useVariant'

const { variant } = useVariant()
</script>

<template>
  <AppToolbar />

  <div class="main">
    <TheSandbox v-show="variant" />

    <div v-show="!variant" class="main-list">
      <div class="main-list__algorithms">
        <AppListCard v-for="algorithm in ALGORITHMS_LIST" :key="algorithm" :variant="algorithm" />
      </div>

      <div class="main-list__data-structures">
        <AppListCard
          v-for="dataStructure in DATA_STRUCTURES_LIST"
          :key="dataStructure"
          :variant="dataStructure"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/style/index.scss';

$cardWidth: calc(50% - 0.5rem);

.main {
  padding: 1rem;
}

.main-list {
  @include flex-row($wrap: wrap);
  gap: 1rem;
}

.main-list__algorithms,
.main-list__data-structures {
  @include flex-column();
  gap: 0.5rem;
  width: clamp(500px, $cardWidth, $cardWidth);
}
</style>
