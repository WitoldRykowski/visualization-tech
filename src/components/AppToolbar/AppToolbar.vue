<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import { useVariant } from '@/composable/useVariant'

const mainStore = useMainStore()
const { variant, setVariant } = useVariant()

const search = computed({
  get: () => mainStore.state.search,
  set: mainStore.setSearch
})

const toolbarStyle = computed(() => ({
  root: { style: { background: '#34495e', color: 'white', height: '90px' } }
}))
</script>

<template>
  <Toolbar :pt="toolbarStyle">
    <template #start>
      <span class="toolbar-title">Visualize Tech</span>
    </template>

    <template #end>
      <InputText v-show="!variant" v-model="search" placeholder="Search" />
      <Button v-show="variant" @click="setVariant(undefined)"></Button>
    </template>
  </Toolbar>
</template>

<style scoped lang="scss">
@import 'src/style/tools';
</style>
