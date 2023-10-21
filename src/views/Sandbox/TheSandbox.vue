<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from 'vue'
import {
  initSandbox,
  stopAnimation,
  VariantInjectionKey,
  VariantSetups
} from '@/services/SandboxService/sandbox.service'
import { noop } from '@/utils'
import { AppButton } from '@/components'

const variant = inject(VariantInjectionKey)

const actions = computed(() => {
  if (variant?.value) {
    return VariantSetups[variant.value].actions
  }

  return { init: noop, visualize: noop }
})

onMounted(() => {
  initSandbox()

  actions.value.init()
})

onBeforeUnmount(stopAnimation)
</script>

<template>
  <canvas id="sandbox" />
  <Teleport to="#app-toolbar-actions">
    <AppButton @click="actions.visualize" label="Visualize" />
    <AppButton @click="actions.init" label="Init" />
  </Teleport>
</template>

<style scoped lang="scss">
.actions-delays {
  @include flex-row();
  gap: 0.25rem;
}
</style>
