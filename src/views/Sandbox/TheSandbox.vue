<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  initSandbox,
  stopAnimation,
  VariantInjectionKey,
  VariantSetups
} from '@/services/SandboxService/sandbox.service'
import { AppButton } from '@/components'

const variant = inject(VariantInjectionKey)
const isFirstRun = ref(true)

const visualize = () => {
  if (!variant?.value) return

  if (!isFirstRun.value) {
    VariantSetups[variant.value].init()
  }

  isFirstRun.value = false
  VariantSetups[variant.value].visualize()
}

const createSandbox = () => {
  initSandbox()

  if (!variant?.value) return

  VariantSetups[variant.value].init()
}

onMounted(createSandbox)
onBeforeUnmount(stopAnimation)
</script>

<template>
  <canvas id="sandbox" />
  <Teleport to="#app-toolbar-actions">
    <AppButton @click="visualize" label="Visualize" />
  </Teleport>
</template>

<style scoped lang="scss">
.actions-delays {
  @include flex-row();
  gap: 0.25rem;
}
</style>
