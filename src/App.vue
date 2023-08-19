<script setup lang="ts">
import { TheSandbox, VariantsList, AppToolbar } from '@/components'
import { QPageContainer, QPage, QHeader, QLayout } from 'quasar'
import { Sandbox } from '@/services/SandboxService/sandbox.service'
import { computed } from 'vue'

const variant = computed(() => Sandbox.state.variant.value)
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QHeader elevated class="bg-primary text-white">
      <AppToolbar />
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <TheSandbox v-show="variant" />

        <VariantsList />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped></style>
