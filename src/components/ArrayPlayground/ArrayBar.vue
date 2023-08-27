<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BAR_GROWTH_DELAY, BAR_HEIGHT_MULTIPLIER } from '@/utils'

const props = defineProps<{
  value: number
}>()

const isGrowth = ref(false)
const barHeight = computed(() => `${props.value * BAR_HEIGHT_MULTIPLIER}px`)

onMounted(() => {
  setTimeout(() => {
    isGrowth.value = true
  }, BAR_GROWTH_DELAY)
})
</script>

<template>
  <div class="array-bar">
    <div class="array-value" :class="{ growth: isGrowth }"></div>
  </div>
</template>

<style scoped lang="scss">
.array-bar {
  width: calc(100% / 100);
}

.array-value {
  height: 0;
  background: $primary;
  border: 1px solid white;
  width: 100%;
  transition: height 0.5s;
}

.array-value.growth {
  height: v-bind(barHeight);
}
</style>
