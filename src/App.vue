<script setup lang="ts">
import { TheSandbox, VariantsList, AppToolbar } from '@/components'
import { useVariant } from '@/composable/useVariant'
import { QPageContainer, QPage, QToolbar, QToolbarTitle, QHeader, QLayout } from 'quasar'

const { variant } = useVariant()
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
