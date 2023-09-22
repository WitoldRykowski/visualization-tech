import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { Variant } from '@/services/sandbox.service'

export type MainState = {
  search: string
  variant: Variant
}

export const useMainStore = defineStore('main', () => {
  const state = reactive<MainState>({
    search: '',
    variant: undefined
  })

  const setSearch = (value: string) => {
    state.search = value
  }

  const setVariant = (variant: Variant) => {
    state.variant = variant
  }

  return {
    state: readonly(state),
    setSearch,
    setVariant
  }
})
