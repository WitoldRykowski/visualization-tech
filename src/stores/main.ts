import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { ContentVariant } from '@/types'

export type SandboxVariant = ContentVariant

export type MainState = {
  contentVariant: SandboxVariant
  search: string
}

export const useMainStore = defineStore('main', () => {
  const state = reactive<MainState>({
    contentVariant: undefined,
    search: ''
  })

  const setContentVariant = (value: SandboxVariant) => {
    state.contentVariant = value
  }

  const setSearch = (value: string) => {
    state.search = value
  }

  return {
    state: readonly(state),
    setContentVariant,
    setSearch
  }
})
