<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  initSandbox,
  stopAnimation,
  VariantInjectionKey,
  Variants
} from '@/services/Sandbox/sandbox.service'
import { AppButton } from '@/components'
import { useRouter } from 'vue-router'
import { Main } from '@/router/routes'

const router = useRouter()
const variant = inject(VariantInjectionKey)
const isFirstRun = ref(true)

const visualize = () => {
  if (!variant?.value) return

  if (!isFirstRun.value) {
    generateSandbox()
  }

  isFirstRun.value = false

  setTimeout(Variants[variant.value].visualize, 300)
}

const generateSandbox = () => {
  if (!variant?.value) return

  isFirstRun.value = true

  Variants[variant.value].init()
}

const createSandbox = () => {
  if (!variant?.value) {
    router.push(Main)
  }

  initSandbox()
  generateSandbox()
}

onMounted(createSandbox)
onBeforeUnmount(stopAnimation)
</script>

<template>
  <canvas id="sandbox" />
  <Teleport to="#app-toolbar-actions">
    <AppButton @click="visualize" label="Visualize" id="visualize-button" textColor="white" />
    <AppButton @click="generateSandbox" label="Generate Sandbox" id="generate-button" />
  </Teleport>
</template>

<style scoped lang="scss">
.actions-delays {
  @include flex-row();
  gap: 0.25rem;
}

#visualize-button,
#generate-button {
  min-width: 300px;
}
</style>
