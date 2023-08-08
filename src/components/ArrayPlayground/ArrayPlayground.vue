<script setup lang="ts">
import ArrayBar from './ArrayBar.vue'

defineProps<{
  values: number[]
}>()
</script>

<template>
  <div class="array-playground">
    <ArrayBar v-for="value in values" :key="value" :value="value" />
  </div>
</template>

<style scoped lang="scss">
.array-playground {
  @include flex-row(start, end);
}
</style>
