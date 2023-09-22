<script setup lang="ts">
import { VariantsList, AppToolbar, TheSandbox } from '@/components'
import { QPageContainer, QPage, QHeader, QLayout } from 'quasar'
import { useMainStore } from '@/stores/main'

import { computed, onMounted, provide } from 'vue'
import { initSandbox, VariantInjectionKey } from '@/services/sandbox.service'

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
        <TheSandbox v-show="variant" />

        <VariantsList v-show="!variant" />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped></style>
