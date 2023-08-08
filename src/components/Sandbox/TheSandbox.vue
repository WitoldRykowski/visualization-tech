<script setup lang="ts">
import { useVariant } from '@/composable/useVariant'
import { BinarySearch, BubbleSort, QuickSort, TheQueue, TheStack } from '@/components'

const VariantComponentMap = {
  BinarySearch,
  BubbleSort,
  QuickSort,
  Stack: TheStack,
  Queue: TheQueue
}

const { variant } = useVariant()
</script>

<template>
  <component :is="VariantComponentMap[variant]" />
</template>

<style scoped lang="scss"></style>
