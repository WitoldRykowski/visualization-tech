<script setup lang="ts">
import { AppToolbar, TheSandbox } from '@/components'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { ALGORITHMS_LIST } from '@/services/algorithms.service'
import { DATA_STRUCTURES_LIST } from '@/services/data-structures.service'
import { useVariant } from '@/composable/useVariant'

const { variant, setVariant } = useVariant()
</script>

<template>
  <AppToolbar />

  <div class="main">
    <TheSandbox v-show="variant" />

    <div v-show="!variant" class="main-list">
      <div class="main-list__algorithms">
        <Card class="main-list__card" v-for="algorithm in ALGORITHMS_LIST" :key="algorithm">
          <template #content>
            {{ algorithm }}
            <Button @click="setVariant(algorithm)"></Button>
          </template>
        </Card>
      </div>
      <div class="main-list__data-structures">
        <Card
          class="main-list__card"
          v-for="dataStructure in DATA_STRUCTURES_LIST"
          :key="dataStructure"
        >
          <template #content>
            {{ dataStructure }}
            <Button @click="setVariant(dataStructure)"></Button>
          </template>
        </Card>
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

.main-list__card {
  width: 100%;
}
</style>
