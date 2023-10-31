<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  initSandbox,
  stopAnimation,
  VariantInjectionKey,
  Variants
} from '@/services/SandboxService/sandbox.service'
import { AppButton } from '@/components'
import { useRouter } from 'vue-router'
import { Main } from '@/router/routes'

const router = useRouter()
const variant = inject(VariantInjectionKey)
const isFirstRun = ref(true)

const visualize = () => {
  if (!variant?.value) return

  if (!isFirstRun.value) {
    Variants[variant.value].init()
  }

  isFirstRun.value = false

  setTimeout(Variants[variant.value].visualize, 300)
}

const createSandbox = () => {
  if (!variant?.value) {
    router.push(Main)
  }

  initSandbox()

  if (!variant?.value) return

  Variants[variant.value].init()
}

onMounted(createSandbox)
onBeforeUnmount(stopAnimation)
</script>

<template>
  <canvas id="sandbox" />
  <Teleport to="#app-toolbar-actions">
    <AppButton @click="visualize" label="Visualize" id="visualize-button" />
  </Teleport>
</template>

<style scoped lang="scss">
.actions-delays {
  @include flex-row();
  gap: 0.25rem;
}

#visualize-button {
  min-width: 300px;
}
</style>
