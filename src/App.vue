<script setup lang="ts">
import { VariantsList, AppToolbar, TheSandbox } from '@/components'
import { QPageContainer, QPage, QHeader, QLayout } from 'quasar'
import { useMainStore } from '@/stores/main'

import { computed, onMounted, provide } from 'vue'
import { initSandbox, VariantInjectionKey } from '@/services/SandboxService/sandbox.service'

const store = useMainStore()

const variant = computed(() => store.state.variant)

provide(VariantInjectionKey, variant)

onMounted(initSandbox)
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QHeader elevated class="bg-primary text-white">
      <AppToolbar />
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <div id="main-container">
          <VariantsList />

          <TheSandbox />
        </div>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped>
#main-container {
  @include flex-row();
  gap: 1rem;
  height: calc(100vh - 98px);
}
</style>
