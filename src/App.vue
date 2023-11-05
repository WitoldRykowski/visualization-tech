<script setup lang="ts">
import { AppToolbar } from '@/components'
import { QPageContainer, QPage, QHeader, QLayout } from 'quasar'
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QHeader elevated class="bg-primary text-white">
      <AppToolbar />
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <div id="main-container">
          <RouterView />
        </div>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped>
#main-container {
  height: calc(100vh - 98px);
}
</style>
