<script setup lang="ts">
import { useVariant } from '@/composable/useVariant'
import { defineAsyncComponent } from 'vue'

const VariantComponentMap = {
  BinarySearch: defineAsyncComponent(() => import('@/components/BinarySearch/BinarySearch.vue')),
  BubbleSort: defineAsyncComponent(() => import('@/components/BubbleSort/BubbleSort.vue')),
  QuickSort: defineAsyncComponent(() => import('@/components/BubbleSort/QuickSort.vue')),
  Stack: defineAsyncComponent(() => import('@/components/BubbleSort/TheStack.vue')),
  Queue: defineAsyncComponent(() => import('@/components/BubbleSort/TheQueue.vue'))
}

const { variant } = useVariant()
</script>

<template>
  <component :is="VariantComponentMap[variant]" />
</template>

<style scoped lang="scss"></style>
