<script setup lang="ts">
import ArrayBar from './ArrayBar.vue'
import { BAR_HEIGHT_MULTIPLIER } from '@/utils'

const props = defineProps<{
  values: number[]
}>()

const calculateArrayPlaygroundHeight = (values: number[]) => {
  const theGreatestValue = Math.max(...values)

  return `${theGreatestValue * BAR_HEIGHT_MULTIPLIER}px`
}

const arrayPlaygroundHeight = calculateArrayPlaygroundHeight(props.values)
</script>

<template>
  <div class="array-playground">
    <ArrayBar v-for="value in values" :key="value" :value="value" />
  </div>
</template>

<style scoped lang="scss">
.array-playground {
  @include flex-row(start, end);
  height: v-bind(arrayPlaygroundHeight);
}
</style>
