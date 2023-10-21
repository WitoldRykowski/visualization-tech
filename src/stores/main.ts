import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { VariantName } from '@/services/SandboxService/sandbox.service'

export type MainState = {
  search: string
  variant: VariantName
}

export const useMainStore = defineStore('main', () => {
  const state = reactive<MainState>({
    search: '',
    variant: undefined
  })

  const setSearch = (value: string) => {
    state.search = value
  }

  const setVariant = (variant: VariantName) => {
    state.variant = variant
  }

  return {
    state: readonly(state),
    setSearch,
    setVariant
  }
})
