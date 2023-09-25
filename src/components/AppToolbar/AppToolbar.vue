<script setup lang="ts">
import { QToolbar, QToolbarTitle, QSeparator } from 'quasar'
import {
  clearSandbox,
  DEFAULT_FRAME_COUNT,
  setFrameCount,
  stopAnimation,
  VariantInjectionKey,
  VariantSetups
} from '@/services/SandboxService/sandbox.service'
import { computed, inject, watch } from 'vue'
import { noop } from '@/utils'
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

watch(
  () => variant?.value,
  (current) => {
    if (!current) return

    clearSandbox()
    setFrameCount(VariantSetups[current].delays[0])
    actions.value.init()
  }
)
</script>

<template>
  <QToolbar class="app-toolbar">
    <QToolbarTitle>Visualize Tech</QToolbarTitle>

    <div class="app-toolbar-actions">
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
    </div>
  </QToolbar>
</template>

<style scoped lang="scss">
.app-toolbar {
  background: white;
  color: black;
}

.app-toolbar-actions,
.actions-delays {
  @include flex-row();
  gap: 0.25rem;
}
</style>
