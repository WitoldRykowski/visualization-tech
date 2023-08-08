<script setup lang="ts">
import { ArrayPlayground } from '@/components'
import { ref } from 'vue'
import { generateSortedArray } from '@/services/sandbox.service'

const values = ref(generateSortedArray())
</script>

<template>
  <div>
    <ArrayPlayground :values="values" />
  </div>
</template>

<style scoped lang="scss"></style>
