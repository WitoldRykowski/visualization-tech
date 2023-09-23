<script setup lang="ts">
import { VariantInjectionKey } from '@/services/sandbox.service'
import { inject, reactive, watch } from 'vue'
import { VariantInitFunctions } from '@/services/sandbox.service'
import { noop } from '@/utils'
import { VariantActionsForRef } from './types'

const variant = inject(VariantInjectionKey)

const actions = reactive<VariantActionsForRef>({ init: noop, visualize: noop })

watch(
  () => variant?.value,
  (current) => {
    actions.init = VariantInitFunctions[current].init
    actions.visualize = VariantInitFunctions[current].visualize

    actions.init()
  }
)
</script>

<template>
  <div class="sandbox-container">
    <canvas id="sandbox" />

    <button @click="actions.visualize">Run</button>
    <button @click="actions.init">init</button>
  </div>
</template>

<style scoped lang="scss">
.sandbox-container {
  @include flex-row(center, center, wrap);
}
</style>
