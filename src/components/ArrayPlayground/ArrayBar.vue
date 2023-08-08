<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
}>()

const barHeight = computed(() => `height: ${props.value * 4}px`)
</script>

<template>
  <div class="array-bar">
    <div class="array-value" :style="barHeight"></div>
  </div>
</template>

<style scoped lang="scss">
.array-bar {
  width: calc(100% / 100);
}

.array-value {
  background: $primary;
  border: 1px solid white;
  width: 100%;
}
</style>
