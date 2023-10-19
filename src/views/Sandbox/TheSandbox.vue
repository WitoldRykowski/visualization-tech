<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import {
  DEFAULT_FRAME_COUNT,
  initSandbox,
  setFrameCount,
  VariantInjectionKey,
  VariantSetups
} from '@/services/SandboxService/sandbox.service'
import { noop } from '@/utils'
import { QSeparator } from 'quasar'
import { AppButton } from '@/components'

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

onMounted(() => {
  initSandbox()

  setFrameCount(VariantSetups[variant?.value].delays[0])
  actions.value.init()
})
</script>

<template>
  <canvas id="sandbox" />
  <Teleport to="#app-toolbar-actions">
    <div v-if="delays.length > 1" class="actions-delays">
      <AppButton
        v-for="delay in delays"
        :key="delay"
        @click="setFrameCount(delay)"
        :label="delay"
      />
    </div>

    <QSeparator vertical spaced />

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
