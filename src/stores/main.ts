import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { VariantName } from '@/services/Sandbox/sandbox.service'

export type MainState = {
  variant: VariantName
}

export const useMainStore = defineStore('main', () => {
  const state = reactive<MainState>({
    variant: undefined
  })

  const setVariant = (variant: VariantName) => {
    state.variant = variant
  }

  return {
    state: readonly(state),
    setVariant
  }
})
