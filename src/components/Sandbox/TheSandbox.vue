<script setup lang="ts">
import { VariantInjectionKey } from '@/services/sandbox.service'
import { inject, watch } from 'vue'
import { VariantInitFunctions } from '@/services/sandbox.service'

const variant = inject(VariantInjectionKey)

let visualize = undefined

watch(
  () => variant?.value,
  (current) => {
    visualize = VariantInitFunctions[current]()
  }
)
</script>

<template>
  <div class="sandbox-container">
    <canvas id="sandbox" />

    <button @click="visualize">Run</button>
  </div>
</template>

<style scoped lang="scss">
.sandbox-container {
  @include flex-row(center, center, wrap);
}
</style>
