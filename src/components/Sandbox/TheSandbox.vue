<script setup lang="ts">
import {
  DEFAULT_FRAME_COUNT,
  setFrameCount,
  stopAnimation,
  VariantInjectionKey
} from '@/services/sandbox.service'
import { computed, inject, watch } from 'vue'
import { VariantSetups } from '@/services/sandbox.service'
import { noop } from '@/utils'

const variant = inject(VariantInjectionKey)

const actions = computed(() => {
  if (variant?.value) {
    return VariantSetups[variant.value].actions
  }

  return { init: noop, visualize: noop }
})

const delays = computed(() => {
  if (variant?.value) {
    return VariantSetups[variant.value].delays
  }

  return [DEFAULT_FRAME_COUNT]
})

watch(
  () => variant?.value,
  (current) => {
    if (!current) return

    stopAnimation()
    setFrameCount(VariantSetups[current].delays[0])
    actions.value.init()
  }
)
</script>

<template>
  <div class="sandbox-container">
    <canvas id="sandbox" />

    <div v-if="delays.length > 1">
      <button v-for="delay in delays" :key="delay" @click="setFrameCount(delay)">
        {{ delay }}
      </button>
    </div>

    <button @click="actions.visualize">Run</button>
    <button @click="actions.init">init</button>
  </div>
</template>

<style scoped lang="scss">
.sandbox-container {
  @include flex-row(center, center, wrap);
}
</style>
